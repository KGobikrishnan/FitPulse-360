package com.fitpulse.gym.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@Tag(name = "Admin Operations", description = "Endpoints for business KPIs, financial analytics, memberships, QR check-ins, and asset maintenance.")
public class AdminController {

    @GetMapping("/analytics/overview")
    @Operation(summary = "Get high-level business analytics, revenue trends, and P&L metrics")
    public ResponseEntity<?> getBusinessOverview() {
        return ResponseEntity.ok(Map.of(
                "monthlyRevenue", 342500,
                "monthlyExpense", 187200,
                "netProfit", 155300,
                "activeMembersCount", 142,
                "liveOccupancy", 42
        ));
    }

    @GetMapping("/analytics/peak-heatmap")
    @Operation(summary = "Get gym floor hourly crowd density heatmap")
    public ResponseEntity<?> getPeakHourHeatmap() {
        return ResponseEntity.ok(Map.of(
                "status", "SUCCESS",
                "peakSlots", new String[]{"06:00 - 08:00 AM", "06:00 - 08:00 PM"}
        ));
    }

    @PostMapping("/members/enroll")
    @Operation(summary = "Enroll new member and trigger auto-invoicing with UPI link")
    public ResponseEntity<?> enrollMember(@RequestBody Map<String, Object> memberPayload) {
        return ResponseEntity.ok(Map.of(
                "message", "Member enrolled successfully",
                "invoiceId", "INV-" + System.currentTimeMillis(),
                "qrPass", "FITPULSE-PASS-" + System.currentTimeMillis()
        ));
    }

    @PostMapping("/attendance/qr-scan")
    @Operation(summary = "Process dynamic entrance gate QR / Biometric check-in")
    public ResponseEntity<?> processQRScan(@RequestBody Map<String, String> payload) {
        String passCode = payload.get("passCode");
        return ResponseEntity.ok(Map.of(
                "status", "GRANTED",
                "message", "Access Granted. Welcome to FitPulse 360!",
                "passCode", passCode
        ));
    }
}
