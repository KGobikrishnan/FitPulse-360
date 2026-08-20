package com.fitpulse.gym.models;

import jakarta.persistence.*;

@Entity
@Table(name = "workout_templates")
public class WorkoutTemplate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String trainerId;
    private String targetGoal;
    private String difficulty;

    @Column(columnDefinition = "TEXT")
    private String exercisesJson;

    public WorkoutTemplate() {}

    public WorkoutTemplate(String name, String trainerId, String targetGoal, String difficulty, String exercisesJson) {
        this.name = name;
        this.trainerId = trainerId;
        this.targetGoal = targetGoal;
        this.difficulty = difficulty;
        this.exercisesJson = exercisesJson;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getTrainerId() { return trainerId; }
    public void setTrainerId(String trainerId) { this.trainerId = trainerId; }
    public String getTargetGoal() { return targetGoal; }
    public void setTargetGoal(String targetGoal) { this.targetGoal = targetGoal; }
    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
    public String getExercisesJson() { return exercisesJson; }
    public void setExercisesJson(String exercisesJson) { this.exercisesJson = exercisesJson; }
}
