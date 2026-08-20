package com.fitpulse.gym.models;

import jakarta.persistence.*;

@Entity
@Table(name = "lockers")
public class Locker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String lockerNumber;

    private String status; // AVAILABLE, OCCUPIED, MAINTENANCE
    private String assignedTo;
    private String gender; // Male, Female, Unisex

    public Locker() {}

    public Locker(String lockerNumber, String status, String assignedTo, String gender) {
        this.lockerNumber = lockerNumber;
        this.status = status;
        this.assignedTo = assignedTo;
        this.gender = gender;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getLockerNumber() { return lockerNumber; }
    public void setLockerNumber(String lockerNumber) { this.lockerNumber = lockerNumber; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getAssignedTo() { return assignedTo; }
    public void setAssignedTo(String assignedTo) { this.assignedTo = assignedTo; }
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
}
