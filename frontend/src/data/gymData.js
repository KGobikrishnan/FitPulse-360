// Preloaded initial state data for Admin, Trainer, and Member flows

export const initialGymData = {
  gymProfile: {
    name: "FitPulse 360",
    tagline: "Ultra Modern High-Performance Fitness Hub",
    address: "Plot 42, Cyber Gym District, Tech Boulevard",
    phone: "+91 98765 43210",
    email: "contact@fitpulse360.com",
    gstNumber: "33AABCF1234F1Z8",
    upiId: "fitpulse@upi",
    liveOccupancy: 42,
    maxCapacity: 80,
  },

  currentUser: {
    id: "u-admin",
    name: "Vikram Malhotra",
    email: "admin@fitlife.com",
    role: "ADMIN", // ADMIN | TRAINER | USER
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    badge: "Master Gym Director",
  },

  plans: [
    { id: "p1", name: "Monthly Elite", durationMonths: 1, price: 2499, admissionFee: 500, ptIncluded: false, description: "Full gym floor + Locker access + Cardio zone" },
    { id: "p2", name: "Quarterly Pro", durationMonths: 3, price: 6499, admissionFee: 0, ptIncluded: false, description: "3 Months unlimited access + 1 Free InBody Scan" },
    { id: "p3", name: "Annual Beast Mode", durationMonths: 12, price: 18999, admissionFee: 0, ptIncluded: true, ptSessions: 12, description: "All-access + 12 PT sessions + Free protein shaker" },
    { id: "p4", name: "PT Intensive (10 Sessions)", durationMonths: 2, price: 8000, admissionFee: 0, ptIncluded: true, ptSessions: 10, description: "Dedicated 1-on-1 certified trainer guidance" },
  ],

  members: [
    {
      id: "m1",
      name: "Rahul Sharma",
      email: "user@fitlife.com",
      phone: "+91 98111 22334",
      planId: "p3",
      planName: "Annual Beast Mode",
      status: "ACTIVE", // ACTIVE, EXPIRED, DUE
      startDate: "2026-01-10",
      expiryDate: "2027-01-09",
      trainerId: "t1",
      trainerName: "Marcus Vance",
      lockerNo: "L-14",
      totalPaid: 18999,
      pendingDue: 0,
      streak: 16,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      qrCodeString: "FITPULSE-PASS-M1-RAHUL",
      weight: 78.5,
      targetWeight: 72.0,
      bodyFat: "17.2%",
      muscleMass: "36.8 kg",
    },
    {
      id: "m2",
      name: "Ananya Iyer",
      email: "ananya.fit@gmail.com",
      phone: "+91 98222 33445",
      planId: "p2",
      planName: "Quarterly Pro",
      status: "ACTIVE",
      startDate: "2026-06-15",
      expiryDate: "2026-09-14",
      trainerId: "t2",
      trainerName: "Elena Rostova",
      lockerNo: "L-08",
      totalPaid: 6499,
      pendingDue: 0,
      streak: 9,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      qrCodeString: "FITPULSE-PASS-M2-ANANYA",
      weight: 58.0,
      targetWeight: 54.0,
      bodyFat: "22.5%",
      muscleMass: "24.1 kg",
    },
    {
      id: "m3",
      name: "Karthik Raja",
      email: "karthik.r@yahoo.com",
      phone: "+91 98333 44556",
      planId: "p1",
      planName: "Monthly Elite",
      status: "DUE",
      startDate: "2026-07-20",
      expiryDate: "2026-08-20",
      trainerId: "t1",
      trainerName: "Marcus Vance",
      lockerNo: "L-22",
      totalPaid: 1500,
      pendingDue: 1499,
      streak: 4,
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
      qrCodeString: "FITPULSE-PASS-M3-KARTHIK",
      weight: 84.0,
      targetWeight: 75.0,
      bodyFat: "24.0%",
      muscleMass: "34.5 kg",
    },
    {
      id: "m4",
      name: "Sneha Patel",
      email: "sneha.fit@outlook.com",
      phone: "+91 98444 55667",
      planId: "p1",
      planName: "Monthly Elite",
      status: "EXPIRED",
      startDate: "2026-07-01",
      expiryDate: "2026-08-01",
      trainerId: null,
      trainerName: "Unassigned",
      lockerNo: "None",
      totalPaid: 2999,
      pendingDue: 0,
      streak: 0,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      qrCodeString: "FITPULSE-PASS-M4-SNEHA",
      weight: 62.0,
      targetWeight: 57.0,
      bodyFat: "26.0%",
      muscleMass: "22.8 kg",
    },
    {
      id: "m5",
      name: "David Miller",
      email: "david.m@gmail.com",
      phone: "+91 98555 66778",
      planId: "p3",
      planName: "Annual Beast Mode",
      status: "ACTIVE",
      startDate: "2026-02-01",
      expiryDate: "2027-01-31",
      trainerId: "t2",
      trainerName: "Elena Rostova",
      lockerNo: "L-03",
      totalPaid: 18999,
      pendingDue: 0,
      streak: 22,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      qrCodeString: "FITPULSE-PASS-M5-DAVID",
      weight: 88.0,
      targetWeight: 82.0,
      bodyFat: "15.0%",
      muscleMass: "42.0 kg",
    }
  ],

  trainers: [
    {
      id: "t1",
      name: "Marcus Vance",
      email: "trainer@fitlife.com",
      phone: "+91 99001 11223",
      specialization: "Hypertrophy & Strength Conditioning",
      rating: 4.9,
      activeClientsCount: 8,
      baseSalary: 35000,
      ptCommissionPct: 35, // 35% on PT revenue
      sessionsCompletedThisMonth: 48,
      monthlyCommission: 16800,
      avatar: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=150&auto=format&fit=crop&q=80",
      bio: "ACE & CSCS Certified with 8+ years coaching elite competitive lifters and body transformations."
    },
    {
      id: "t2",
      name: "Elena Rostova",
      email: "elena.trainer@fitlife.com",
      phone: "+91 99002 22334",
      specialization: "Functional Mobility & Fat Loss",
      rating: 4.8,
      activeClientsCount: 6,
      baseSalary: 32000,
      ptCommissionPct: 30,
      sessionsCompletedThisMonth: 36,
      monthlyCommission: 12600,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      bio: "Kettlebell master and clinical nutritionist guiding sustainable lifestyle transformations."
    }
  ],

  financials: {
    monthlyRevenue: 342500,
    monthlyExpense: 187200,
    netProfit: 155300,
    revenueBreakdown: [
      { name: "Subscriptions", amount: 245000, color: "#10b981" },
      { name: "Personal Training", amount: 62000, color: "#8b5cf6" },
      { name: "Mini POS / Supplements", amount: 28500, color: "#3b82f6" },
      { name: "Admission Fees", amount: 7000, color: "#f59e0b" },
    ],
    expenseBreakdown: [
      { name: "Facility Rent", amount: 85000, color: "#ef4444" },
      { name: "Trainer Payroll & Comm.", amount: 47600, color: "#f97316" },
      { name: "Electricity & AC", amount: 26000, color: "#eab308" },
      { name: "Supplement Restocking", amount: 18000, color: "#06b6d4" },
      { name: "Machine Maintenance", amount: 10600, color: "#ec4899" },
    ],
    monthlyTrend: [
      { month: "Mar", revenue: 280000, expense: 165000, profit: 115000 },
      { month: "Apr", revenue: 295000, expense: 172000, profit: 123000 },
      { month: "May", revenue: 310000, expense: 179000, profit: 131000 },
      { month: "Jun", revenue: 325000, expense: 181000, profit: 144000 },
      { month: "Jul", revenue: 338000, expense: 185000, profit: 153000 },
      { month: "Aug", revenue: 342500, expense: 187200, profit: 155300 },
    ]
  },

  peakHoursHeatmap: [
    { slot: "05:00 - 06:00", crowd: 25, label: "Warm-up early risers", status: "Moderate" },
    { slot: "06:00 - 07:00", crowd: 78, label: "Morning Rush ⚡", status: "High" },
    { slot: "07:00 - 08:00", crowd: 92, label: "Peak Peak ⚡⚡", status: "Critical" },
    { slot: "08:00 - 09:00", crowd: 65, label: "Post-Work / Commute", status: "High" },
    { slot: "09:00 - 11:00", crowd: 30, label: "Mid-day Low", status: "Low" },
    { slot: "11:00 - 16:00", crowd: 18, label: "Afternoon Quiet", status: "Low" },
    { slot: "16:00 - 17:00", crowd: 45, label: "Evening Start", status: "Moderate" },
    { slot: "17:00 - 18:00", crowd: 75, label: "Evening Hustle", status: "High" },
    { slot: "18:00 - 19:30", crowd: 98, label: "Prime Rush 🔥", status: "Critical" },
    { slot: "19:30 - 21:00", crowd: 85, label: "Night Shift", status: "High" },
    { slot: "21:00 - 22:30", crowd: 35, label: "Late Night Crew", status: "Moderate" },
  ],

  equipmentList: [
    { id: "eq-1", name: "Olympic Cable Crossover Station", category: "Strength", purchasedDate: "2024-03-12", lastServiced: "2026-06-10", nextDue: "2026-09-10", status: "OPERATIONAL", healthScore: 94 },
    { id: "eq-2", name: "Matrix Commercial Treadmill T70", category: "Cardio", purchasedDate: "2023-11-05", lastServiced: "2026-07-02", nextDue: "2026-08-25", status: "DUE_SERVICE", healthScore: 78 },
    { id: "eq-3", name: "Hammer Strength Iso-Lateral Chest Press", category: "Strength", purchasedDate: "2024-01-20", lastServiced: "2026-05-18", nextDue: "2026-08-18", status: "UNDER_REPAIR", healthScore: 50 },
    { id: "eq-4", name: "Rogue 45-Degree Leg Press Beast", category: "Plate Loaded", purchasedDate: "2024-05-10", lastServiced: "2026-07-20", nextDue: "2026-10-20", status: "OPERATIONAL", healthScore: 98 },
    { id: "eq-5", name: "Concept2 RowErg Model D", category: "Cardio / HIIT", purchasedDate: "2024-08-15", lastServiced: "2026-06-25", nextDue: "2026-09-25", status: "OPERATIONAL", healthScore: 91 },
  ],

  inventoryStore: [
    { id: "inv-1", name: "Optimum Nutrition Gold Standard Whey 5lb (Double Rich Choc)", category: "Protein", price: 6899, stock: 14, minThreshold: 5, sku: "ON-WHEY-5LB" },
    { id: "inv-2", name: "MuscleTech Platinum 100% Creatine Monohydrate 250g", category: "Creatine", price: 1499, stock: 22, minThreshold: 8, sku: "MT-CREAT-250G" },
    { id: "inv-3", name: "Cellucor C4 Original Pre-Workout (Fruit Punch 30 Servings)", category: "Pre-Workout", price: 2699, stock: 7, minThreshold: 4, sku: "C4-ORIG-30S" },
    { id: "inv-4", name: "FitPulse Stainless Steel Insulated Shaker Bottle (750ml)", category: "Merchandise", price: 899, stock: 35, minThreshold: 10, sku: "FP-SHAKER-750" },
    { id: "inv-5", name: "Monster Energy Ultra Zero 500ml Can", category: "Energy Drink", price: 199, stock: 48, minThreshold: 15, sku: "MNS-ZERO-500" },
  ],

  lockers: Array.from({ length: 24 }, (_, i) => {
    const num = i + 1;
    const code = `L-${num < 10 ? "0" + num : num}`;
    if (num === 14) return { id: code, number: code, status: "OCCUPIED", assignedTo: "Rahul Sharma", gender: "Male" };
    if (num === 8) return { id: code, number: code, status: "OCCUPIED", assignedTo: "Ananya Iyer", gender: "Female" };
    if (num === 22) return { id: code, number: code, status: "OCCUPIED", assignedTo: "Karthik Raja", gender: "Male" };
    if (num === 3) return { id: code, number: code, status: "OCCUPIED", assignedTo: "David Miller", gender: "Male" };
    if (num === 11 || num === 19) return { id: code, number: code, status: "MAINTENANCE", assignedTo: null, gender: "Unisex" };
    return { id: code, number: code, status: "AVAILABLE", assignedTo: null, gender: num <= 12 ? "Male" : "Female" };
  }),

  recentAttendance: [
    { id: "att-1", memberName: "Rahul Sharma", time: "06:14 AM", method: "QR Scanner Gate 1", status: "Granted" },
    { id: "att-2", memberName: "David Miller", time: "06:35 AM", method: "QR Scanner Gate 1", status: "Granted" },
    { id: "att-3", memberName: "Marcus Vance (Trainer)", time: "06:40 AM", method: "Biometric Staff Terminal", status: "Granted" },
    { id: "att-4", memberName: "Ananya Iyer", time: "07:10 AM", method: "QR Scanner Gate 2", status: "Granted" },
    { id: "att-5", memberName: "Sneha Patel", time: "07:32 AM", method: "QR Scanner Gate 1", status: "Denied (Membership Expired)" },
  ],

  // TRAINER PORTAL DATA
  workoutTemplates: [
    {
      id: "tpl-1",
      name: "Hypertrophy Push Dominance (Chest/Delts/Triceps)",
      trainerId: "t1",
      targetGoal: "Muscle Hypertrophy",
      difficulty: "Advanced",
      exercises: [
        { id: "ex-1", name: "Incline Barbell Bench Press", sets: 4, reps: "8-10", restSec: 90, targetMuscle: "Upper Chest", notes: "Control 3-sec eccentric lowering" },
        { id: "ex-2", name: "Dumbbell Flat Press", sets: 3, reps: "10-12", restSec: 75, targetMuscle: "Mid Chest", notes: "Full stretch at bottom" },
        { id: "ex-3", name: "Standing Dumbbell Lateral Raise", sets: 4, reps: "15-18", restSec: 60, targetMuscle: "Side Delts", notes: "Slight forward torso lean" },
        { id: "ex-4", name: "Dual Cable Tricep Pushdown (V-Bar)", sets: 3, reps: "12-15", restSec: 60, targetMuscle: "Triceps Lateral Head", notes: "Lock elbows in place" },
        { id: "ex-5", name: "Cable Overhead Tricep Extension", sets: 3, reps: "12-15", restSec: 60, targetMuscle: "Triceps Long Head", notes: "Maximum stretch" }
      ]
    },
    {
      id: "tpl-2",
      name: "Posterior Chain Power & Pull",
      trainerId: "t1",
      targetGoal: "Back Density & Biceps",
      difficulty: "Intermediate",
      exercises: [
        { id: "ex-6", name: "Conventional Deadlift", sets: 4, reps: "5-6", restSec: 120, targetMuscle: "Entire Posterior Chain", notes: "Brace core hard before pull" },
        { id: "ex-7", name: "Chest Supported T-Bar Row", sets: 4, reps: "8-10", restSec: 90, targetMuscle: "Lats & Rhomboids", notes: "Squeeze shoulder blades 1s" },
        { id: "ex-8", name: "Lat Pulldown (Neutral Grip)", sets: 3, reps: "10-12", restSec: 75, targetMuscle: "Upper Lats", notes: "Pull to upper chest" },
        { id: "ex-9", name: "Incline Dumbbell Bicep Curl", sets: 3, reps: "12-15", restSec: 60, targetMuscle: "Biceps Long Head", notes: "Supinate wrist at peak" }
      ]
    },
    {
      id: "tpl-3",
      name: "Metabolic Conditioning & Quad Builder",
      trainerId: "t2",
      targetGoal: "Fat Loss & Endurance",
      difficulty: "All Levels",
      exercises: [
        { id: "ex-10", name: "Barbell Back Squat", sets: 4, reps: "10-12", restSec: 90, targetMuscle: "Quads & Glutes", notes: "Depth below parallel" },
        { id: "ex-11", name: "Walking Dumbbell Lunges", sets: 3, reps: "20 Steps", restSec: 60, targetMuscle: "Quads & Core", notes: "Keep upright torso" },
        { id: "ex-12", name: "Leg Extension Drop-Set", sets: 3, reps: "12 + 10 drop", restSec: 60, targetMuscle: "Quad Teardrop", notes: "Explosive up, slow down" },
        { id: "ex-13", name: "Kettlebell Swings (HIIT Finisher)", sets: 4, reps: "25 reps", restSec: 45, targetMuscle: "Glutes & Hamstrings", notes: "Hinge at hips, do not squat" }
      ]
    }
  ],

  dietPlans: [
    {
      id: "dp-1",
      name: "High Protein Clean Cut (2200 kcal)",
      trainerId: "t1",
      calorieTarget: 2200,
      macros: { proteinG: 185, carbsG: 210, fatG: 55 },
      waterIntakeLiters: 4.0,
      meals: [
        { mealName: "Meal 1 - Breakfast (8:00 AM)", items: "4 Whole Eggs omelette + 2 Slices Whole Grain Toast + 1 Banana", calories: 520, protein: 32 },
        { mealName: "Meal 2 - Mid Morning (11:30 AM)", items: "Greek Yogurt 200g + 15g Almonds + Blueberries", calories: 280, protein: 22 },
        { mealName: "Meal 3 - Pre-Workout Lunch (1:30 PM)", items: "Grilled Chicken Breast 180g + Brown Rice 150g + Steamed Broccoli", calories: 580, protein: 48 },
        { mealName: "Meal 4 - Post-Workout Shake (5:30 PM)", items: "1 Scoop Gold Whey Protein + 1 Apple + Creatine 5g in water", calories: 220, protein: 26 },
        { mealName: "Meal 5 - High Satiety Dinner (8:30 PM)", items: "Grilled Fish/Paneer 150g + Quinoa Bowl + Fresh Mixed Green Salad", calories: 600, protein: 45 }
      ]
    },
    {
      id: "dp-2",
      name: "Hypertrophy Bulk & Mass Gain (3100 kcal)",
      trainerId: "t1",
      calorieTarget: 3100,
      macros: { proteinG: 210, carbsG: 380, fatG: 80 },
      waterIntakeLiters: 4.5,
      meals: [
        { mealName: "Meal 1 - Morning Power (8:00 AM)", items: "Oatmeal 100g cooked in milk + 2 tbsp Peanut Butter + 1 Scoop Whey + Banana", calories: 750, protein: 44 },
        { mealName: "Meal 2 - Mid Day Lunch (1:00 PM)", items: "Chicken Biryani/Paneer Rice 300g + Boiled Eggs (3 whites, 1 whole) + Raita", calories: 850, protein: 55 },
        { mealName: "Meal 3 - Pre-Workout Fuel (4:30 PM)", items: "2 PB&J Sandwiches + 1 Black Coffee", calories: 420, protein: 14 },
        { mealName: "Meal 4 - Post-Workout Surge (7:00 PM)", items: "Whey Protein 1.5 Scoops + Dextrose/Banana shake", calories: 340, protein: 36 },
        { mealName: "Meal 5 - Night Recovery (9:30 PM)", items: "Grilled Salmon or Chicken Breast 200g + Sweet Potatoes 200g + Olive oil sauteed veggies", calories: 740, protein: 58 }
      ]
    }
  ],

  traineeTransformations: [
    {
      id: "tr-1",
      memberId: "m1",
      memberName: "Rahul Sharma",
      startWeight: 87.5,
      currentWeight: 78.5,
      targetWeight: 72.0,
      startBodyFat: "24.5%",
      currentBodyFat: "17.2%",
      benchPR: "105 kg",
      squatPR: "140 kg",
      deadliftPR: "175 kg",
      monthsActive: 6,
      trainerNotes: "Rahul has achieved outstanding lat width and core tightness. Recommending slight carbohydrate bump on leg days to sustain high-volume squats.",
      weeklyLogs: [
        { week: "W1", weight: 87.5, bodyFat: 24.5 },
        { week: "W4", weight: 85.2, bodyFat: 23.1 },
        { week: "W8", weight: 83.0, bodyFat: 21.0 },
        { week: "W12", weight: 81.4, bodyFat: 19.5 },
        { week: "W16", weight: 79.8, bodyFat: 18.2 },
        { week: "W20", weight: 78.5, bodyFat: 17.2 },
      ],
      photos: {
        front: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&auto=format&fit=crop&q=80",
        side: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&auto=format&fit=crop&q=80",
        back: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&auto=format&fit=crop&q=80"
      }
    }
  ],

  // MEMBER LOGGED DATA & TODAY'S ROUTINE
  todayMemberRoutine: {
    routineTitle: "Hypertrophy Push Dominance (Chest/Delts/Triceps)",
    assignedBy: "Marcus Vance",
    exercises: [
      {
        id: "cur-1",
        name: "Incline Barbell Bench Press",
        targetMuscle: "Upper Chest",
        completed: false,
        targetSets: 4,
        targetReps: "8-10",
        historyBest: "90 kg × 8 reps",
        loggedSets: [
          { setNo: 1, weight: 80, reps: 10, done: true },
          { setNo: 2, weight: 85, reps: 8, done: true },
          { setNo: 3, weight: 87.5, reps: 8, done: false },
          { setNo: 4, weight: 90, reps: 6, done: false },
        ]
      },
      {
        id: "cur-2",
        name: "Dumbbell Flat Bench Press",
        targetMuscle: "Mid Chest",
        completed: false,
        targetSets: 3,
        targetReps: "10-12",
        historyBest: "32 kg DBs × 10",
        loggedSets: [
          { setNo: 1, weight: 28, reps: 12, done: false },
          { setNo: 2, weight: 30, reps: 10, done: false },
          { setNo: 3, weight: 32, reps: 8, done: false },
        ]
      },
      {
        id: "cur-3",
        name: "Standing Dumbbell Lateral Raise",
        targetMuscle: "Side Delts",
        completed: false,
        targetSets: 4,
        targetReps: "15-18",
        historyBest: "14 kg DBs × 15",
        loggedSets: [
          { setNo: 1, weight: 12, reps: 16, done: false },
          { setNo: 2, weight: 12, reps: 15, done: false },
          { setNo: 3, weight: 14, reps: 14, done: false },
          { setNo: 4, weight: 14, reps: 12, done: false },
        ]
      },
      {
        id: "cur-4",
        name: "Dual Cable Tricep Pushdown",
        targetMuscle: "Triceps Lateral Head",
        completed: false,
        targetSets: 3,
        targetReps: "12-15",
        historyBest: "35 kg × 15",
        loggedSets: [
          { setNo: 1, weight: 30, reps: 15, done: false },
          { setNo: 2, weight: 35, reps: 12, done: false },
          { setNo: 3, weight: 35, reps: 12, done: false },
        ]
      }
    ]
  },

  personalRecords: [
    { lift: "Bench Press", weight: "105 kg", reps: "1 Rep Max (PR)", date: "Aug 12, 2026", icon: "Flame", badge: "Gold Standard" },
    { lift: "Barbell Back Squat", weight: "140 kg", reps: "1 Rep Max (PR)", date: "Jul 28, 2026", icon: "Trophy", badge: "Double Bodyweight" },
    { lift: "Conventional Deadlift", weight: "175 kg", reps: "1 Rep Max (PR)", date: "Aug 04, 2026", icon: "Zap", badge: "Elite Puller" },
    { lift: "Strict Overhead Press", weight: "65 kg", reps: "3 Reps", date: "Jul 15, 2026", icon: "Shield", badge: "Iron Shoulders" },
    { lift: "Weighted Pull-Up", weight: "+25 kg Belt", reps: "6 Reps", date: "Aug 16, 2026", icon: "Award", badge: "Wings Level 3" },
  ],

  leaderboard: [
    { rank: 1, name: "David Miller", streakDays: 22, checkInsThisMonth: 25, badge: "Iron Titan 🔥", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" },
    { rank: 2, name: "Rahul Sharma (You)", streakDays: 16, checkInsThisMonth: 21, badge: "Consistent Beast ⚡", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80" },
    { rank: 3, name: "Varun Nair", streakDays: 14, checkInsThisMonth: 19, badge: "Grind Legend", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" },
    { rank: 4, name: "Ananya Iyer", streakDays: 9, checkInsThisMonth: 18, badge: "Fitness Diva", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" },
    { rank: 5, name: "Pooja Hegde", streakDays: 8, checkInsThisMonth: 16, badge: "Warrior", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" },
  ],

  announcements: [
    { id: "ann-1", title: "💥 Annual Bench Press & Squat Max Challenge", date: "Aug 25, 2026", tag: "Competition", text: "Cash prizes and free 6-month PT package for winners across Weight Classes! Register with your trainer before Aug 23." },
    { id: "ann-2", title: "📢 Labor Holiday Timing Notice", date: "Sep 01, 2026", tag: "Facility Update", text: "Morning Session: 6:00 AM - 12:00 PM. Evening Session will remain closed for full machine sanitation & deep service." },
    { id: "ann-3", title: "🥑 Nutrition & Gut Health Workshop by Elena", date: "Aug 30, 2026", tag: "Workshop", text: "Join certified nutritionist Elena Rostova at 5:00 PM in Studio B. Free entry for all active members!" }
  ]
};
