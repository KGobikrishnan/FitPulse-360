package com.fitpulse.gym.models;

import jakarta.persistence.*;

@Entity
@Table(name = "equipment")
public class Equipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String category;
    private String purchasedDate;
    private String lastServiced;
    private String nextDue;
    private String status; // OPERATIONAL, DUE_SERVICE, UNDER_REPAIR
    private Integer healthScore;

    public Equipment() {}

    public Equipment(String name, String category, String purchasedDate, String lastServiced, String nextDue, String status, Integer healthScore) {
        this.name = name;
        this.category = category;
        this.purchasedDate = purchasedDate;
        this.lastServiced = lastServiced;
        this.nextDue = nextDue;
        this.status = status;
        this.healthScore = healthScore;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getPurchasedDate() { return purchasedDate; }
    public void setPurchasedDate(String purchasedDate) { this.purchasedDate = purchasedDate; }
    public String getLastServiced() { return lastServiced; }
    public void setLastServiced(String lastServiced) { this.lastServiced = lastServiced; }
    public String getNextDue() { return nextDue; }
    public void setNextDue(String nextDue) { this.nextDue = nextDue; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Integer getHealthScore() { return healthScore; }
    public void setHealthScore(Integer healthScore) { this.healthScore = healthScore; }
}
