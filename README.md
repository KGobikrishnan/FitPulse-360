# FitPulse 360 - Enterprise Gym Management System

[![Frontend](https://img.shields.io/badge/Frontend-React%2019%20%2B%20TailwindCSS-emerald.svg)](file:///home/luca/Code/Personal/Gym%20management%20system/frontend)
[![Backend](https://img.shields.io/badge/Backend-Java%20Spring%20Boot%203.3-orange.svg)](file:///home/luca/Code/Personal/Gym%20management%20system/backend)
[![Security](https://img.shields.io/badge/Security-Spring%20Security%206%20%2B%20JWT-blue.svg)](file:///home/luca/Code/Personal/Gym%20management%20system/backend)
[![Swagger](https://img.shields.io/badge/API%20Docs-OpenAPI%203%20%2F%20Swagger-green.svg)](http://localhost:8080/swagger-ui.html)

A portfolio-grade, full-stack **Gym & Health Club Management Ecosystem** designed with 3 dedicated portals: **Admin Operations & Billing Dashboard**, **Trainer Performance & Client Hub**, and **Member Self-Service & Gamification Portal**.

---

## ⚡ Quick Demo Credentials (Role Switcher)

Switch instantly between roles using the one-click switcher pill on the top navigation bar or log in with:

| Role | Email | Password | Access Highlights |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@fitlife.com` | `admin123` | Gross revenue, P&L statement, Auto-invoicing, QR scanner gate, Locker grid, Asset logs |
| **Trainer** | `trainer@fitlife.com` | `trainer123` | Trainees roster, Interactive Workout & Macro Diet builders, Transformation logs, Commissions |
| **Member** | `user@fitlife.com` | `user123` | Today's Workout set logger, Rest timer, Diet checklist, Hydration tracker, PR Vault, Digital QR Pass |

---

## 🏛️ System Architecture

```
FitPulse 360 Architecture
│
├── frontend/                     # React 19 + Tailwind CSS + Lucide + Recharts
│   ├── src/
│   │   ├── components/           # Navbar (Live Crowd Meter, Gate QR Scanner), Sidebar
│   │   ├── context/GymContext.jsx# Unified state engine with localStorage persistence
│   │   ├── pages/
│   │   │   ├── admin/            # AdminDashboard (P&L, Member Invoicing, Peak Heatmaps, POS, Lockers)
│   │   │   ├── trainer/          # TrainerDashboard (Workout/Diet Builder, Trainee reviews)
│   │   │   └── member/           # MemberDashboard (Set Logger, Rest Timer, PR Vault, QR Pass)
│   │   └── data/gymData.js       # Preloaded realistic initial datasets
│
├── backend/                      # Java Spring Boot 3.3 REST API
│   ├── src/main/java/com/fitpulse/gym/
│   │   ├── config/               # SecurityConfig (RBAC), SwaggerConfig, CorsConfig
│   │   ├── controllers/          # AdminController, TrainerController, MemberController
│   │   ├── models/               # User, Role, Membership, Equipment
│   │   └── repositories/         # UserRepository (Spring Data JPA)
│   ├── pom.xml                   # Maven setup with Springdoc, Lombok, JPA, Security
│   └── application.yml           # PostgreSQL / In-Memory H2 config
│
└── docker-compose.yml            # Multi-container orchestration (PostgreSQL + API + UI)
```

---

## 🚀 Key Features Breakdown

### 1. 🏢 Gym Admin Dashboard (Business & Operations Control)
- **Membership & Billing Automation**: Plan tiers (Monthly, Quarterly, Annual, PT bundles), auto tax invoicing with UPI/Payment links, renewal reminders & pending due alerts.
- **Finance & Expense Management**: Revenue vs Expense analytics, Trainer Payroll & 35% PT Commission engine, Net Profit & Loss statement export.
- **Access Control & Attendance**: Dynamic QR entry check-in scanner simulator with instant membership status verification.
- **Peak Hour Heatmap**: Hourly crowd density matrix (e.g. 6-8 AM vs 6-8 PM) with capacity threshold indicators.
- **Asset & Facility Management**: Equipment maintenance history, breakdown reporting, Mini POS supplement store with instant stock deduction.
- **Locker Allocation Grid**: Real-time locker status manager (Available, Occupied, Under Maintenance).

### 2. 🏋️‍♂️ Trainer Portal (Performance & Client Engagement)
- **Client Management**: Assigned trainees roster with streak indicators and body metrics summary.
- **Workout Routine Builder**: Drag/add exercise sequence, customize sets, rep ranges, rest intervals, and movement cues.
- **Macro & Diet Chart Builder**: Calorie target calculations, Protein/Carb/Fat macro distribution, meal timings structure.
- **Trainee Progress Reviews**: Weekly weight progression charts, body fat curves, multi-angle photo vault (Front, Side, Back), and coach feedback notes.
- **Trainer Earnings & PT Schedule**: Active 1-on-1 booked slots calendar and live calculated monthly commissions.

### 3. 🎯 Gym User / Member Portal (Motivation & Self-Service)
- **Today's Workout Routine**: Interactive set logger (Weights lifted $\times$ Reps), completed checkboxes, and built-in rest countdown timer.
- **Diet & Hydration Tracker**: Meal checklist and interactive 10-glass daily water intake logger.
- **PR (Personal Record) Vault**: Hall of Fame logging 1-Rep Maxes for Bench Press, Squats, and Deadlifts with celebration confetti.
- **Digital Member ID & Dynamic QR Pass**: High-resolution digital pass for turnstile check-ins.
- **Community & Gamification**: 16-day streak flame tracker and gym-wide attendance leaderboard.

---

## 🛠️ Running Locally

### Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
Open: [http://localhost:5173](http://localhost:5173)

### Backend (Spring Boot 3.3)
```bash
cd backend
mvn spring-boot:run
```
Swagger UI Docs: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

### One-Click Docker Setup
```bash
docker-compose up --build
```
