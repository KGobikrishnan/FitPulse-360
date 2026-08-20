package com.fitpulse.gym.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String fullName;

    @Email
    @NotBlank
    @Column(unique = true, nullable = false)
    private String email;

    @NotBlank
    private String password;

    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    private String planName;

    private String status; // ACTIVE, DUE, EXPIRED

    private LocalDate startDate;
    private LocalDate expiryDate;

    private String qrCodeString;
    private String lockerNo;

    private Double totalPaid;
    private Double pendingDue;
    private Integer streak;

    public User() {
    }

    public User(Long id, String fullName, String email, String password, String phone, Role role, String planName, String status, LocalDate startDate, LocalDate expiryDate, String qrCodeString, String lockerNo, Double totalPaid, Double pendingDue, Integer streak) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.role = role;
        this.planName = planName;
        this.status = status;
        this.startDate = startDate;
        this.expiryDate = expiryDate;
        this.qrCodeString = qrCodeString;
        this.lockerNo = lockerNo;
        this.totalPaid = totalPaid;
        this.pendingDue = pendingDue;
        this.streak = streak;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getPlanName() {
        return planName;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }

    public String getQrCodeString() {
        return qrCodeString;
    }

    public void setQrCodeString(String qrCodeString) {
        this.qrCodeString = qrCodeString;
    }

    public String getLockerNo() {
        return lockerNo;
    }

    public void setLockerNo(String lockerNo) {
        this.lockerNo = lockerNo;
    }

    public Double getTotalPaid() {
        return totalPaid;
    }

    public void setTotalPaid(Double totalPaid) {
        this.totalPaid = totalPaid;
    }

    public Double getPendingDue() {
        return pendingDue;
    }

    public void setPendingDue(Double pendingDue) {
        this.pendingDue = pendingDue;
    }

    public Integer getStreak() {
        return streak;
    }

    public void setStreak(Integer streak) {
        this.streak = streak;
    }
}
