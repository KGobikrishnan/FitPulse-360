package com.fitpulse.gym.controllers;

import com.fitpulse.gym.models.Role;
import com.fitpulse.gym.models.User;
import com.fitpulse.gym.repositories.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication & Onboarding", description = "Endpoints for user login, role authorization, and registration")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    @Operation(summary = "Authenticate user with email and password from database")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email and Password are required"));
        }

        Optional<User> userOpt = userRepository.findByEmail(email.trim().toLowerCase());
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid email or password"));
        }

        User user = userOpt.get();
        if (!passwordEncoder.matches(password, user.getPassword()) && !password.equals(user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid email or password"));
        }

        Map<String, Object> response = new HashMap<>();
        response.put("token", "jwt-token-fitpulse-" + user.getId() + "-" + System.currentTimeMillis());
        response.put("id", user.getId());
        response.put("name", user.getFullName());
        response.put("email", user.getEmail());
        response.put("role", user.getRole().name().replace("ROLE_", ""));
        response.put("planName", user.getPlanName());
        response.put("status", user.getStatus());
        response.put("streak", user.getStreak());
        response.put("qrCodeString", user.getQrCodeString());
        response.put("lockerNo", user.getLockerNo());
        response.put("totalPaid", user.getTotalPaid());
        response.put("pendingDue", user.getPendingDue());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    @Operation(summary = "Register new member into database")
    public ResponseEntity<?> register(@RequestBody Map<String, String> regData) {
        String email = regData.get("email");
        if (userRepository.existsByEmail(email)) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email is already registered"));
        }

        User user = new User(
                null,
                regData.get("fullName"),
                email.trim().toLowerCase(),
                passwordEncoder.encode(regData.getOrDefault("password", "user123")),
                regData.get("phone"),
                Role.ROLE_USER,
                regData.getOrDefault("planName", "Monthly Elite"),
                "ACTIVE",
                LocalDate.now(),
                LocalDate.now().plusMonths(1),
                "FITPULSE-PASS-" + System.currentTimeMillis(),
                "L-UNASSIGNED",
                Double.valueOf(regData.getOrDefault("totalPaid", "2499")),
                0.0,
                1
        );

        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "User registered successfully", "userId", user.getId()));
    }
}
