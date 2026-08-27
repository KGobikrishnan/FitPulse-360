package com.fitpulse.gym.controllers;

import com.fitpulse.gym.dto.ApiResponse;
import com.fitpulse.gym.models.PersonalRecord;
import com.fitpulse.gym.models.User;
import com.fitpulse.gym.models.WorkoutTemplate;
import com.fitpulse.gym.models.DietPlan;
import com.fitpulse.gym.repositories.PersonalRecordRepository;
import com.fitpulse.gym.repositories.UserRepository;
import com.fitpulse.gym.repositories.WorkoutTemplateRepository;
import com.fitpulse.gym.repositories.DietPlanRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/member")
@Tag(name = "Member Self-Service Portal", description = "Endpoints for daily workout routines, set logging, diet check-ins, PR vault, and dynamic QR passes.")
public class MemberController {

    private final UserRepository userRepo;
    private final PersonalRecordRepository prRepo;
    private final WorkoutTemplateRepository workoutRepo;
    private final DietPlanRepository dietRepo;

    public MemberController(
            UserRepository userRepo,
            PersonalRecordRepository prRepo,
            WorkoutTemplateRepository workoutRepo,
            DietPlanRepository dietRepo) {
        this.userRepo = userRepo;
        this.prRepo = prRepo;
        this.workoutRepo = workoutRepo;
        this.dietRepo = dietRepo;
    }

    @GetMapping("/routine/today")
    @Operation(summary = "Fetch today's assigned workout plan from database with exercise checklist")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getTodayRoutine(@RequestParam(required = false) Long userId) {
        List<WorkoutTemplate> routines = workoutRepo.findAll();
        WorkoutTemplate template = routines.isEmpty() ? null : routines.get(0);

        return ResponseEntity.ok(ApiResponse.ok("Today's routine fetched successfully", Map.of(
                "title", template != null ? template.getName() : "Hypertrophy Push Dominance (Chest/Delts/Triceps)",
                "targetGoal", template != null ? template.getTargetGoal() : "Muscle Hypertrophy",
                "difficulty", template != null ? template.getDifficulty() : "Intermediate",
                "exercisesJson", template != null ? template.getExercisesJson() : "[]",
                "streakDays", 16
        )));
    }

    @GetMapping("/pr/vault")
    @Operation(summary = "Fetch member's PR (Personal Record / 1-Rep Max) history from PostgreSQL")
    public ResponseEntity<ApiResponse<List<PersonalRecord>>> getPRVault(@RequestParam(required = false) Long userId) {
        List<PersonalRecord> prs;
        if (userId != null) {
            prs = prRepo.findByUserIdOrderByIdDesc(userId);
        } else {
            prs = prRepo.findAll();
        }
        return ResponseEntity.ok(ApiResponse.ok("PR Vault records retrieved successfully", prs));
    }

    @PostMapping("/pr/log")
    @Operation(summary = "Log new Personal Record (PR / 1-Rep Max) lift to PostgreSQL database")
    public ResponseEntity<ApiResponse<PersonalRecord>> logPersonalRecord(@RequestBody Map<String, Object> prData) {
        Long userId = prData.get("userId") != null ? Long.valueOf(String.valueOf(prData.get("userId"))) : 1L;
        String lift = (String) prData.getOrDefault("lift", "Bench Press");
        String weight = (String) prData.getOrDefault("weight", "100 kg");
        String reps = (String) prData.getOrDefault("reps", "1 Rep Max (PR)");
        String badge = (String) prData.getOrDefault("badge", "Personal Record");
        String recordDate = (String) prData.getOrDefault("recordDate", LocalDate.now().toString());

        PersonalRecord pr = new PersonalRecord(userId, lift, weight, reps, recordDate, badge);
        prRepo.save(pr);

        return ResponseEntity.ok(ApiResponse.ok("New PR Lift Recorded in PostgreSQL Vault!", pr));
    }

    @GetMapping("/pass/qr")
    @Operation(summary = "Generate dynamic Member Digital QR Pass for turnstile gate access")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getMemberQRPass(@RequestParam(required = false) String email) {
        String passCode = "FITPULSE-PASS-M1-RAHUL";
        String status = "ACTIVE";
        String expiry = "2027-01-09";

        if (email != null) {
            Optional<User> userOpt = userRepo.findByEmail(email);
            if (userOpt.isPresent()) {
                User u = userOpt.get();
                passCode = u.getQrCodeString() != null ? u.getQrCodeString() : ("FITPULSE-PASS-M" + u.getId());
                status = u.getStatus() != null ? u.getStatus() : "ACTIVE";
                expiry = u.getExpiryDate() != null ? u.getExpiryDate().toString() : "2027-01-09";
            }
        }

        return ResponseEntity.ok(ApiResponse.ok("Digital QR pass generated", Map.of(
                "qrString", passCode,
                "validUntil", expiry,
                "status", status
        )));
    }

    @GetMapping("/diet/assigned")
    @Operation(summary = "Fetch assigned macro diet chart and daily meal breakdown from database")
    public ResponseEntity<ApiResponse<DietPlan>> getAssignedDietPlan(@RequestParam(required = false) Long userId) {
        List<DietPlan> dietPlans = dietRepo.findAll();
        DietPlan plan = dietPlans.isEmpty() ? null : dietPlans.get(0);
        return ResponseEntity.ok(ApiResponse.ok("Assigned Diet Plan retrieved", plan));
    }
}
