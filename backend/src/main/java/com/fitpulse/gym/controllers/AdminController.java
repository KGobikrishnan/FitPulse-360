package com.fitpulse.gym.controllers;

import com.fitpulse.gym.dto.ApiResponse;
import com.fitpulse.gym.models.*;
import com.fitpulse.gym.repositories.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/admin")
@Tag(name = "Admin Operations", description = "Endpoints for database-backed operations")
public class AdminController {

    private final UserRepository userRepo;
    private final MembershipPlanRepository planRepo;
    private final EquipmentRepository eqRepo;
    private final InventoryItemRepository invRepo;
    private final LockerRepository lockerRepo;
    private final AttendanceLogRepository attRepo;
    private final ExpenseRepository expRepo;
    private final PasswordEncoder passwordEncoder;

    public AdminController(
            UserRepository userRepo,
            MembershipPlanRepository planRepo,
            EquipmentRepository eqRepo,
            InventoryItemRepository invRepo,
            LockerRepository lockerRepo,
            AttendanceLogRepository attRepo,
            ExpenseRepository expRepo,
            PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.planRepo = planRepo;
        this.eqRepo = eqRepo;
        this.invRepo = invRepo;
        this.lockerRepo = lockerRepo;
        this.attRepo = attRepo;
        this.expRepo = expRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/overview")
    @Operation(summary = "Get full database metrics for Admin Dashboard")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getAdminOverview() {
        List<User> members = userRepo.findByRole(Role.ROLE_USER);
        List<User> trainers = userRepo.findByRole(Role.ROLE_TRAINER);
        List<MembershipPlan> plans = planRepo.findAll();
        List<Equipment> equipment = eqRepo.findAll();
        List<InventoryItem> inventory = invRepo.findAll();
        List<Locker> lockers = lockerRepo.findAll();
        List<AttendanceLog> recentAttendance = attRepo.findTop20ByOrderByIdDesc();
        List<Expense> expenses = expRepo.findAll();

        double totalRevenue = members.stream().mapToDouble(m -> m.getTotalPaid() != null ? m.getTotalPaid() : 0).sum() + 120000;
        double totalExpense = expenses.stream().mapToDouble(e -> e.getAmount() != null ? e.getAmount() : 0).sum() + 85000;

        Map<String, Object> data = new HashMap<>();
        data.put("members", members);
        data.put("trainers", trainers);
        data.put("plans", plans);
        data.put("equipmentList", equipment);
        data.put("inventoryStore", inventory);
        data.put("lockers", lockers);
        data.put("recentAttendance", recentAttendance);
        data.put("expenses", expenses);
        data.put("totalRevenue", totalRevenue);
        data.put("totalExpense", totalExpense);
        data.put("netProfit", totalRevenue - totalExpense);

        return ResponseEntity.ok(ApiResponse.ok("Overview fetched successfully", data));
    }

    @GetMapping("/members")
    @Operation(summary = "Get paginated members list with sorting")
    public ResponseEntity<ApiResponse<Page<User>>> getMembersPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {

        Sort sort = direction.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<User> users = userRepo.findAll(pageable);

        return ResponseEntity.ok(ApiResponse.ok("Members fetched successfully", users));
    }

    @PostMapping("/members/enroll")
    @Operation(summary = "Enroll member directly into PostgreSQL database")
    public ResponseEntity<ApiResponse<User>> enrollMember(@RequestBody Map<String, Object> form) {
        String name = (String) form.get("name");
        String email = (String) form.get("email");
        String phone = (String) form.get("phone");
        String planName = (String) form.getOrDefault("planName", "Monthly Elite");
        Double totalPaid = Double.valueOf(String.valueOf(form.getOrDefault("totalPaid", "2499")));
        Double pendingDue = Double.valueOf(String.valueOf(form.getOrDefault("pendingDue", "0")));
        String lockerNo = (String) form.getOrDefault("lockerNo", "L-01");

        User user = new User(
                null,
                name,
                email.trim().toLowerCase(),
                passwordEncoder.encode("user123"),
                phone,
                Role.ROLE_USER,
                planName,
                "ACTIVE",
                LocalDate.now(),
                LocalDate.now().plusMonths(1),
                "FITPULSE-PASS-" + System.currentTimeMillis(),
                lockerNo,
                totalPaid,
                pendingDue,
                1
        );

        userRepo.save(user);
        return ResponseEntity.ok(ApiResponse.ok("Member enrolled successfully", user));
    }

    @PatchMapping("/members/{id}/status")
    @Operation(summary = "Update member status in database")
    public ResponseEntity<ApiResponse<User>> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        Optional<User> userOpt = userRepo.findById(id);
        if (userOpt.isEmpty()) return ResponseEntity.notFound().build();
        User user = userOpt.get();
        user.setStatus(body.get("status"));
        userRepo.save(user);
        return ResponseEntity.ok(ApiResponse.ok("Status updated successfully", user));
    }

    @PostMapping("/expenses")
    @Operation(summary = "Record new expense into database")
    public ResponseEntity<ApiResponse<Expense>> recordExpense(@RequestBody Map<String, Object> body) {
        String name = (String) body.get("name");
        Double amount = Double.valueOf(String.valueOf(body.get("amount")));
        String category = (String) body.getOrDefault("category", "General");
        String date = (String) body.getOrDefault("expenseDate", LocalDate.now().toString());

        Expense expense = new Expense(name, amount, category, date);
        expRepo.save(expense);

        return ResponseEntity.ok(ApiResponse.ok("Expense recorded successfully", expense));
    }

    @PatchMapping("/lockers/{id}/status")
    @Operation(summary = "Update locker status in database")
    public ResponseEntity<ApiResponse<Locker>> updateLockerStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        Optional<Locker> lockerOpt = lockerRepo.findById(id);
        if (lockerOpt.isEmpty()) return ResponseEntity.notFound().build();

        Locker locker = lockerOpt.get();
        if (body.containsKey("status")) locker.setStatus(body.get("status"));
        if (body.containsKey("assignedTo")) locker.setAssignedTo(body.get("assignedTo"));

        lockerRepo.save(locker);
        return ResponseEntity.ok(ApiResponse.ok("Locker updated successfully", locker));
    }

    @PostMapping("/attendance/qr-scan")
    @Operation(summary = "Process QR check-in and record to PostgreSQL")
    public ResponseEntity<ApiResponse<Map<String, Object>>> processQRScan(@RequestBody Map<String, String> payload) {
        String code = payload.get("passCode");
        Optional<User> userOpt = userRepo.findByQrCodeString(code);
        if (userOpt.isEmpty()) {
            userOpt = userRepo.findByEmail(code);
        }

        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Invalid Pass"));
        }

        User user = userOpt.get();
        String status = "EXPIRED".equalsIgnoreCase(user.getStatus()) ? "Denied (Membership Expired)" : "Granted";
        AttendanceLog log = new AttendanceLog(
                user.getFullName(),
                java.time.LocalTime.now().toString().substring(0, 5),
                "QR Gate Scanner",
                status
        );
        attRepo.save(log);

        if ("Granted".equals(status)) {
            user.setStreak((user.getStreak() != null ? user.getStreak() : 0) + 1);
            userRepo.save(user);
            return ResponseEntity.ok(ApiResponse.ok("Access Granted", Map.of("granted", true, "member", user)));
        } else {
            return ResponseEntity.ok(ApiResponse.ok("Access Denied (Membership Expired)", Map.of("granted", false, "member", user)));
        }
    }
}
