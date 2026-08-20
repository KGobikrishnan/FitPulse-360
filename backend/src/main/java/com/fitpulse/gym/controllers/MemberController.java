package com.fitpulse.gym.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/member")
@Tag(name = "Member Self-Service Portal", description = "Endpoints for daily workout routines, set logging, diet check-ins, PR vault, and dynamic QR passes.")
public class MemberController {

    @GetMapping("/routine/today")
    @Operation(summary = "Fetch today's assigned workout plan with exercise checklist")
    public ResponseEntity<?> getTodayRoutine() {
        return ResponseEntity.ok(Map.of(
                "title", "Hypertrophy Push Dominance (Chest/Delts/Triceps)",
                "exercisesCount", 4,
                "streakDays", 16
        ));
    }

    @PostMapping("/pr/log")
    @Operation(summary = "Log new Personal Record (PR / 1-Rep Max) lift")
    public ResponseEntity<?> logPersonalRecord(@RequestBody Map<String, Object> prData) {
        return ResponseEntity.ok(Map.of(
                "status", "SUCCESS",
                "message", "New PR Saved in Hall of Fame!"
        ));
    }

    @GetMapping("/pass/qr")
    @Operation(summary = "Generate dynamic Member Digital QR Pass for gate access")
    public ResponseEntity<?> getMemberQRPass() {
        return ResponseEntity.ok(Map.of(
                "qrString", "FITPULSE-PASS-M1-RAHUL",
                "validUntil", "2027-01-09",
                "status", "ACTIVE"
        ));
    }
}
