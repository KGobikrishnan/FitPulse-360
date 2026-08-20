package com.fitpulse.gym.models;

import jakarta.persistence.*;

@Entity
@Table(name = "diet_plans")
public class DietPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String trainerId;
    private Integer calorieTarget;
    private Double waterIntakeLiters;
    private Integer proteinG;
    private Integer carbsG;
    private Integer fatG;

    @Column(columnDefinition = "TEXT")
    private String mealsJson;

    public DietPlan() {}

    public DietPlan(String name, String trainerId, Integer calorieTarget, Double waterIntakeLiters, Integer proteinG, Integer carbsG, Integer fatG, String mealsJson) {
        this.name = name;
        this.trainerId = trainerId;
        this.calorieTarget = calorieTarget;
        this.waterIntakeLiters = waterIntakeLiters;
        this.proteinG = proteinG;
        this.carbsG = carbsG;
        this.fatG = fatG;
        this.mealsJson = mealsJson;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getTrainerId() { return trainerId; }
    public void setTrainerId(String trainerId) { this.trainerId = trainerId; }
    public Integer getCalorieTarget() { return calorieTarget; }
    public void setCalorieTarget(Integer calorieTarget) { this.calorieTarget = calorieTarget; }
    public Double getWaterIntakeLiters() { return waterIntakeLiters; }
    public void setWaterIntakeLiters(Double waterIntakeLiters) { this.waterIntakeLiters = waterIntakeLiters; }
    public Integer getProteinG() { return proteinG; }
    public void setProteinG(Integer proteinG) { this.proteinG = proteinG; }
    public Integer getCarbsG() { return carbsG; }
    public void setCarbsG(Integer carbsG) { this.carbsG = carbsG; }
    public Integer getFatG() { return fatG; }
    public void setFatG(Integer fatG) { this.fatG = fatG; }
    public String getMealsJson() { return mealsJson; }
    public void setMealsJson(String mealsJson) { this.mealsJson = mealsJson; }
}
