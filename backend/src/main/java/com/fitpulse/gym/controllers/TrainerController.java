package com.fitpulse.gym.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/trainer")
@Tag(name = "Trainer Coaching Portal", description = "Endpoints for client management, workout protocol creation, macro diet builder, and transformation logs.")
public class TrainerController {

    @GetMapping("/trainees")
    @Operation(summary = "Get list of assigned PT clients and general members")
    public ResponseEntity<?> getAssignedTrainees() {
        return ResponseEntity.ok(Map.of("status", "SUCCESS", "traineesCount", 8));
    }

    @PostMapping("/workouts/create")
    @Operation(summary = "Create and publish a custom workout routine protocol")
    public ResponseEntity<?> createWorkoutRoutine(@RequestBody Map<String, Object> routineData) {
        return ResponseEntity.ok(Map.of(
                "message", "Workout Routine Published Successfully",
                "routineId", "TPL-" + System.currentTimeMillis()
        ));
    }

    @PostMapping("/diet/assign")
    @Operation(summary = "Build and assign customized macro/diet chart to trainee")
    public ResponseEntity<?> assignDietPlan(@RequestBody Map<String, Object> dietData) {
        return ResponseEntity.ok(Map.of(
                "message", "Diet Plan Assigned Successfully",
                "dietId", "DP-" + System.currentTimeMillis()
        ));
    }
}
