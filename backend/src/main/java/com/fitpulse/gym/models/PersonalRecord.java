package com.fitpulse.gym.models;

import jakarta.persistence.*;

@Entity
@Table(name = "personal_records")
public class PersonalRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String lift;
    private String weight;
    private String reps;
    private String recordDate;
    private String badge;

    public PersonalRecord() {}

    public PersonalRecord(Long userId, String lift, String weight, String reps, String recordDate, String badge) {
        this.userId = userId;
        this.lift = lift;
        this.weight = weight;
        this.reps = reps;
        this.recordDate = recordDate;
        this.badge = badge;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getLift() { return lift; }
    public void setLift(String lift) { this.lift = lift; }
    public String getWeight() { return weight; }
    public void setWeight(String weight) { this.weight = weight; }
    public String getReps() { return reps; }
    public void setReps(String reps) { this.reps = reps; }
    public String getRecordDate() { return recordDate; }
    public void setRecordDate(String recordDate) { this.recordDate = recordDate; }
    public String getBadge() { return badge; }
    public void setBadge(String badge) { this.badge = badge; }
}
