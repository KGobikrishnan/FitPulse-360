package com.fitpulse.gym.models;

import jakarta.persistence.*;

@Entity
@Table(name = "attendance_logs")
public class AttendanceLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String memberName;
    private String time;
    private String method;
    private String status;

    public AttendanceLog() {}

    public AttendanceLog(String memberName, String time, String method, String status) {
        this.memberName = memberName;
        this.time = time;
        this.method = method;
        this.status = status;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getMemberName() { return memberName; }
    public void setMemberName(String memberName) { this.memberName = memberName; }
    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }
    public String getMethod() { return method; }
    public void setMethod(String method) { this.method = method; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
