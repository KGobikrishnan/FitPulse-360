package com.fitpulse.gym.controllers;

import com.fitpulse.gym.dto.ApiResponse;
import com.fitpulse.gym.models.Role;
import com.fitpulse.gym.models.User;
import com.fitpulse.gym.repositories.UserRepository;
import com.fitpulse.gym.security.JwtTokenProvider;
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
    private final JwtTokenProvider tokenProvider;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    @PostMapping("/login")
    @Operation(summary = "Authenticate user with email and password, returning a signed JWT token")
    public ResponseEntity<ApiResponse<Map<String, Object>>> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Email and Password are required"));
        }

        Optional<User> userOpt = userRepository.findByEmail(email.trim().toLowerCase());
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiResponse.error("Invalid email or password"));
        }

        User user = userOpt.get();
        if (!passwordEncoder.matches(password, user.getPassword()) && !password.equals(user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiResponse.error("Invalid email or password"));
        }

        // Generate true cryptographic JWT token
        String jwt = tokenProvider.generateToken(user.getEmail(), user.getRole().name(), user.getId());

        Map<String, Object> response = new HashMap<>();
        response.put("token", jwt);
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

        return ResponseEntity.ok(ApiResponse.ok("Login successful", response));
    }

    @PostMapping("/register")
    @Operation(summary = "Register new member into database with BCrypt hashed password")
    public ResponseEntity<ApiResponse<Map<String, Object>>> register(@RequestBody Map<String, String> regData) {
        String email = regData.get("email");
        if (userRepository.existsByEmail(email)) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Email is already registered"));
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
        return ResponseEntity.ok(ApiResponse.ok("User registered successfully", Map.of("userId", user.getId())));
    }
}
