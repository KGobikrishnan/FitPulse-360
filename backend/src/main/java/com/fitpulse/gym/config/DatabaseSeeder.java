package com.fitpulse.gym.config;

import com.fitpulse.gym.models.*;
import com.fitpulse.gym.repositories.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

@Configuration
public class DatabaseSeeder {

    @Bean
    public CommandLineRunner seedDatabase(
            UserRepository userRepo,
            MembershipPlanRepository planRepo,
            EquipmentRepository eqRepo,
            InventoryItemRepository invRepo,
            LockerRepository lockerRepo,
            AttendanceLogRepository attRepo,
            PersonalRecordRepository prRepo,
            PasswordEncoder passwordEncoder) {

        return args -> {
            // 1. Seed Default Users if empty
            if (userRepo.count() == 0) {
                // Admin
                User admin = new User(
                        null,
                        "Vikram Malhotra",
                        "admin@fitlife.com",
                        passwordEncoder.encode("admin123"),
                        "+91 98765 43210",
                        Role.ROLE_ADMIN,
                        "Executive Admin",
                        "ACTIVE",
                        LocalDate.now().minusMonths(6),
                        LocalDate.now().plusYears(1),
                        "FITPULSE-ADMIN-01",
                        "L-ADMIN",
                        0.0,
                        0.0,
                        30
                );
                userRepo.save(admin);

                // Trainer
                User trainer = new User(
                        null,
                        "Marcus Vance",
                        "trainer@fitlife.com",
                        passwordEncoder.encode("trainer123"),
                        "+91 99001 11223",
                        Role.ROLE_TRAINER,
                        "Lead Strength Coach",
                        "ACTIVE",
                        LocalDate.now().minusMonths(4),
                        LocalDate.now().plusYears(1),
                        "FITPULSE-TRAINER-01",
                        "L-TR01",
                        0.0,
                        0.0,
                        25
                );
                userRepo.save(trainer);

                // Member
                User member = new User(
                        null,
                        "Rahul Sharma",
                        "user@fitlife.com",
                        passwordEncoder.encode("user123"),
                        "+91 98111 22334",
                        Role.ROLE_USER,
                        "Annual Beast Mode",
                        "ACTIVE",
                        LocalDate.now().minusMonths(2),
                        LocalDate.now().plusMonths(10),
                        "FITPULSE-PASS-M1-RAHUL",
                        "L-14",
                        18999.0,
                        0.0,
                        16
                );
                userRepo.save(member);

                // Additional Members
                userRepo.save(new User(
                        null,
                        "Ananya Iyer",
                        "ananya.fit@gmail.com",
                        passwordEncoder.encode("user123"),
                        "+91 98222 33445",
                        Role.ROLE_USER,
                        "Quarterly Pro",
                        "ACTIVE",
                        LocalDate.now().minusMonths(1),
                        LocalDate.now().plusMonths(2),
                        "FITPULSE-PASS-M2-ANANYA",
                        "L-08",
                        6499.0,
                        0.0,
                        9
                ));

                userRepo.save(new User(
                        null,
                        "Karthik Raja",
                        "karthik.r@yahoo.com",
                        passwordEncoder.encode("user123"),
                        "+91 98333 44556",
                        Role.ROLE_USER,
                        "Monthly Elite",
                        "DUE",
                        LocalDate.now().minusMonths(1),
                        LocalDate.now(),
                        "FITPULSE-PASS-M3-KARTHIK",
                        "L-22",
                        1500.0,
                        1499.0,
                        4
                ));

                userRepo.save(new User(
                        null,
                        "Sneha Patel",
                        "sneha.fit@outlook.com",
                        passwordEncoder.encode("user123"),
                        "+91 98444 55667",
                        Role.ROLE_USER,
                        "Monthly Elite",
                        "EXPIRED",
                        LocalDate.now().minusMonths(2),
                        LocalDate.now().minusDays(10),
                        "FITPULSE-PASS-M4-SNEHA",
                        "None",
                        2999.0,
                        0.0,
                        0
                ));
            }

            // 2. Seed Membership Plans
            if (planRepo.count() == 0) {
                planRepo.save(new MembershipPlan("Monthly Elite", 1, 2499.0, 500.0, false, 0, "Full gym floor + Locker access + Cardio zone"));
                planRepo.save(new MembershipPlan("Quarterly Pro", 3, 6499.0, 0.0, false, 0, "3 Months unlimited access + 1 Free InBody Scan"));
                planRepo.save(new MembershipPlan("Annual Beast Mode", 12, 18999.0, 0.0, true, 12, "All-access + 12 PT sessions + Free protein shaker"));
                planRepo.save(new MembershipPlan("PT Intensive (10 Sessions)", 2, 8000.0, 0.0, true, 10, "Dedicated 1-on-1 certified trainer guidance"));
            }

            // 3. Seed Equipment
            if (eqRepo.count() == 0) {
                eqRepo.save(new Equipment("Olympic Cable Crossover Station", "Strength", "2024-03-12", "2026-06-10", "2026-09-10", "OPERATIONAL", 94));
                eqRepo.save(new Equipment("Matrix Commercial Treadmill T70", "Cardio", "2023-11-05", "2026-07-02", "2026-08-25", "DUE_SERVICE", 78));
                eqRepo.save(new Equipment("Hammer Strength Iso-Lateral Chest Press", "Strength", "2024-01-20", "2026-05-18", "2026-08-18", "UNDER_REPAIR", 50));
                eqRepo.save(new Equipment("Rogue 45-Degree Leg Press Beast", "Plate Loaded", "2024-05-10", "2026-07-20", "2026-10-20", "OPERATIONAL", 98));
                eqRepo.save(new Equipment("Concept2 RowErg Model D", "Cardio / HIIT", "2024-08-15", "2026-06-25", "2026-09-25", "OPERATIONAL", 91));
            }

            // 4. Seed Inventory Mini-POS
            if (invRepo.count() == 0) {
                invRepo.save(new InventoryItem("Optimum Nutrition Gold Standard Whey 5lb", "Protein", 6899.0, 14, 5, "ON-WHEY-5LB"));
                invRepo.save(new InventoryItem("MuscleTech Platinum Creatine 250g", "Creatine", 1499.0, 22, 8, "MT-CREAT-250G"));
                invRepo.save(new InventoryItem("Cellucor C4 Original Pre-Workout 30s", "Pre-Workout", 2699.0, 7, 4, "C4-ORIG-30S"));
                invRepo.save(new InventoryItem("FitPulse Stainless Steel Shaker (750ml)", "Merchandise", 899.0, 35, 10, "FP-SHAKER-750"));
                invRepo.save(new InventoryItem("Monster Energy Ultra Zero 500ml Can", "Energy Drink", 199.0, 48, 15, "MNS-ZERO-500"));
            }

            // 5. Seed Lockers
            if (lockerRepo.count() == 0) {
                for (int i = 1; i <= 24; i++) {
                    String code = "L-" + (i < 10 ? "0" + i : i);
                    String gender = i <= 12 ? "Male" : "Female";
                    if (i == 14) lockerRepo.save(new Locker(code, "OCCUPIED", "Rahul Sharma", gender));
                    else if (i == 8) lockerRepo.save(new Locker(code, "OCCUPIED", "Ananya Iyer", gender));
                    else if (i == 22) lockerRepo.save(new Locker(code, "OCCUPIED", "Karthik Raja", gender));
                    else if (i == 11 || i == 19) lockerRepo.save(new Locker(code, "MAINTENANCE", null, "Unisex"));
                    else lockerRepo.save(new Locker(code, "AVAILABLE", null, gender));
                }
            }

            // 6. Seed Attendance Logs
            if (attRepo.count() == 0) {
                attRepo.save(new AttendanceLog("Rahul Sharma", "06:14 AM", "QR Scanner Gate 1", "Granted"));
                attRepo.save(new AttendanceLog("David Miller", "06:35 AM", "QR Scanner Gate 1", "Granted"));
                attRepo.save(new AttendanceLog("Marcus Vance (Trainer)", "06:40 AM", "Biometric Staff Terminal", "Granted"));
                attRepo.save(new AttendanceLog("Ananya Iyer", "07:10 AM", "QR Scanner Gate 2", "Granted"));
                attRepo.save(new AttendanceLog("Sneha Patel", "07:32 AM", "QR Scanner Gate 1", "Denied (Membership Expired)"));
            }

            // 7. Seed Personal Records
            if (prRepo.count() == 0) {
                prRepo.save(new PersonalRecord(3L, "Bench Press", "105 kg", "1 Rep Max (PR)", "Aug 12, 2026", "Gold Standard"));
                prRepo.save(new PersonalRecord(3L, "Barbell Back Squat", "140 kg", "1 Rep Max (PR)", "Jul 28, 2026", "Double Bodyweight"));
                prRepo.save(new PersonalRecord(3L, "Conventional Deadlift", "175 kg", "1 Rep Max (PR)", "Aug 04, 2026", "Elite Puller"));
            }
        };
    }
}
