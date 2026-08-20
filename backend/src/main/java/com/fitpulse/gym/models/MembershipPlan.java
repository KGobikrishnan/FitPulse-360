package com.fitpulse.gym.models;

import jakarta.persistence.*;

@Entity
@Table(name = "membership_plans")
public class MembershipPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Integer durationMonths;
    private Double price;
    private Double admissionFee;
    private Boolean ptIncluded;
    private Integer ptSessions;
    private String description;

    public MembershipPlan() {}

    public MembershipPlan(String name, Integer durationMonths, Double price, Double admissionFee, Boolean ptIncluded, Integer ptSessions, String description) {
        this.name = name;
        this.durationMonths = durationMonths;
        this.price = price;
        this.admissionFee = admissionFee;
        this.ptIncluded = ptIncluded;
        this.ptSessions = ptSessions;
        this.description = description;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Integer getDurationMonths() { return durationMonths; }
    public void setDurationMonths(Integer durationMonths) { this.durationMonths = durationMonths; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public Double getAdmissionFee() { return admissionFee; }
    public void setAdmissionFee(Double admissionFee) { this.admissionFee = admissionFee; }
    public Boolean getPtIncluded() { return ptIncluded; }
    public void setPtIncluded(Boolean ptIncluded) { this.ptIncluded = ptIncluded; }
    public Integer getPtSessions() { return ptSessions; }
    public void setPtSessions(Integer ptSessions) { this.ptSessions = ptSessions; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
