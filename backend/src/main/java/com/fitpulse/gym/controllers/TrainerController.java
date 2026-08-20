package com.fitpulse.gym.controllers;

import com.fitpulse.gym.dto.ApiResponse;
import com.fitpulse.gym.models.*;
import com.fitpulse.gym.repositories.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/trainer")
@Tag(name = "Trainer Coaching Portal", description = "Endpoints for client management, workout protocol creation, macro diet builder, and transformation logs.")
public class TrainerController {

    private final UserRepository userRepo;
    private final WorkoutTemplateRepository workoutRepo;
    private final DietPlanRepository dietRepo;

    public TrainerController(UserRepository userRepo, WorkoutTemplateRepository workoutRepo, DietPlanRepository dietRepo) {
        this.userRepo = userRepo;
        this.workoutRepo = workoutRepo;
        this.dietRepo = dietRepo;
    }

    @GetMapping("/trainees")
    @Operation(summary = "Get list of assigned PT clients and general members")
    public ResponseEntity<ApiResponse<List<User>>> getAssignedTrainees() {
        List<User> trainees = userRepo.findByRole(Role.ROLE_USER);
        return ResponseEntity.ok(ApiResponse.ok("Trainees fetched successfully", trainees));
    }

    @GetMapping("/workouts")
    @Operation(summary = "Get all workout routines")
    public ResponseEntity<ApiResponse<List<WorkoutTemplate>>> getWorkouts() {
        List<WorkoutTemplate> list = workoutRepo.findAll();
        return ResponseEntity.ok(ApiResponse.ok("Workouts fetched successfully", list));
    }

    @PostMapping("/workouts")
    @Operation(summary = "Create and publish a custom workout routine protocol into database")
    public ResponseEntity<ApiResponse<WorkoutTemplate>> createWorkoutRoutine(@RequestBody Map<String, Object> routineData) {
        String name = (String) routineData.get("name");
        String trainerId = (String) routineData.getOrDefault("trainerId", "t1");
        String goal = (String) routineData.getOrDefault("targetGoal", "Hypertrophy");
        String difficulty = (String) routineData.getOrDefault("difficulty", "Intermediate");
        String exercisesJson = (String) routineData.getOrDefault("exercisesJson", "[]");

        WorkoutTemplate template = new WorkoutTemplate(name, trainerId, goal, difficulty, exercisesJson);
        workoutRepo.save(template);

        return ResponseEntity.ok(ApiResponse.ok("Workout Routine Published Successfully", template));
    }

    @GetMapping("/diets")
    @Operation(summary = "Get all assigned diet plans")
    public ResponseEntity<ApiResponse<List<DietPlan>>> getDietPlans() {
        List<DietPlan> list = dietRepo.findAll();
        return ResponseEntity.ok(ApiResponse.ok("Diet plans fetched successfully", list));
    }

    @PostMapping("/diets")
    @Operation(summary = "Build and assign customized macro/diet chart to database")
    public ResponseEntity<ApiResponse<DietPlan>> assignDietPlan(@RequestBody Map<String, Object> dietData) {
        String name = (String) dietData.get("name");
        String trainerId = (String) dietData.getOrDefault("trainerId", "t1");
        Integer calories = Integer.valueOf(String.valueOf(dietData.getOrDefault("calorieTarget", "2400")));
        Double water = Double.valueOf(String.valueOf(dietData.getOrDefault("waterIntakeLiters", "4.0")));
        Integer protein = Integer.valueOf(String.valueOf(dietData.getOrDefault("proteinG", "180")));
        Integer carbs = Integer.valueOf(String.valueOf(dietData.getOrDefault("carbsG", "240")));
        Integer fat = Integer.valueOf(String.valueOf(dietData.getOrDefault("fatG", "60")));
        String mealsJson = (String) dietData.getOrDefault("mealsJson", "[]");

        DietPlan plan = new DietPlan(name, trainerId, calories, water, protein, carbs, fat, mealsJson);
        dietRepo.save(plan);

        return ResponseEntity.ok(ApiResponse.ok("Diet Plan Assigned Successfully", plan));
    }
}
