# ⚡ FitPulse 360 - Enterprise Gym Operating System & Telemetry

[![Frontend](https://img.shields.io/badge/Frontend-React%2019%20%2B%20Vite%208-indigo.svg)](file:///home/luca/Code/Personal/Gym%20management%20system/frontend)
[![3D Engine](https://img.shields.io/badge/3D%20Engine-Three.js%20(WebGL)-purple.svg)](https://threejs.org/)
[![Styling](https://img.shields.io/badge/Styling-macOS%20Liquid%20Glass%20%2B%20TailwindCSS%20v4-blue.svg)](https://tailwindcss.com/)
[![Backend](https://img.shields.io/badge/Backend-Java%20Spring%20Boot%203.3%20(JDK%2021)-orange.svg)](file:///home/luca/Code/Personal/Gym%20management%20system/backend)
[![Database](https://img.shields.io/badge/Database-PostgreSQL%2016%20%2B%20Redis%207-blue.svg)](https://www.postgresql.org/)
[![Security](https://img.shields.io/badge/Security-Spring%20Security%206%20%2B%20JWT%20Rotation-emerald.svg)](file:///home/luca/Code/Personal/Gym%20management%20system/backend)
[![PWA](https://img.shields.io/badge/PWA-Offline%20First%20%2B%20Service%20Worker-teal.svg)](file:///home/luca/Code/Personal/Gym%20management%20system/frontend)
[![API Docs](https://img.shields.io/badge/API%20Docs-OpenAPI%203%20%2F%20Swagger-green.svg)](http://localhost:8080/swagger-ui.html)

A portfolio-grade, production-ready full-stack **Gym & Health Club Operating System** featuring a **macOS Liquid Glass aesthetic**, interactive **Three.js WebGL 3D hardware rendering**, progressive PWA offline logging, automated biometric/QR gate turnstile synchronization, and enterprise role-based dashboards (Admin Operations, Trainer Telemetry, Member Gamification).

---

## ⚡ Quick Demo Credentials (1-Click Switcher)

Switch instantly between roles using the 1-Click switcher pills or log in with:

| Role | Email | Password | Access Highlights |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@fitlife.com` | `admin123` | Three.js 3D Studio Dumbbell, Live P&L, 6-month area trends, Invoicing, QR Turnstile simulator, Locker grid, Asset logs, Mini POS |
| **Trainer** | `trainer@fitlife.com` | `trainer123` | Trainees roster, Interactive Workout & Macro Diet builders, Transformation logs, Weekly feedback loop, Commissions |
| **Member** | `user@fitlife.com` | `user123` | Today's Workout set logger, Rest stopwatch, Diet checklist, 10-glass Hydration tracker, PR Vault (Confetti), Digital QR Pass |

---

## 🎨 UI/UX & Design Philosophy

- **macOS Liquid Frosted Glass**: Multi-layer frosted glass cards (`backdrop-filter: blur(28px) saturate(210%)`), pearlescent specular edge highlights, and subtle inset light reflections.
- **Dynamic Aurora Gradient Mesh**: Apple-inspired multi-point radial gradients (Deep Indigo, Emerald Mint, Royal Violet, Coral Rose, Cyan Sky) with smooth background diffusion.
- **Three.js Interactive 3D Assembly**: Hardware-accelerated 3D Studio Dumbbell with knurled chrome bar, faceted liquid glass weight plates, orbital telemetry rings, and interactive mouse-drag inertia.
- **Editorial Typography Pairing**: **DM Sans** (`tabular-nums`) for large financial stat numbers + **Inter** for utility and label readability.
- **Mobile First UX**: 2x2 responsive KPI grids, floating liquid glass bottom capsule navigation dock, and smooth right-side slide-in drawer.

---

## 📦 Packages, Libraries & Technology Stack

### 💻 Frontend Tech Stack
| Category | Package / Library | Version | Purpose / Role |
| :--- | :--- | :--- | :--- |
| **Core Framework** | `react` & `react-dom` | `^19.2.8` | Next-gen React 19 concurrent runtime & hooks |
| **Build Tooling** | `vite` | `^8.2.0` | Ultra-fast HMR and production bundle builder |
| **3D Graphics** | `three` | `^0.174.0` | Hardware-accelerated WebGL 3D scene, materials & lighting |
| **Animations** | `framer-motion` | `^13.1.1` | Smooth spring physics, staggered entry transitions & tab morphs |
| **Data Viz** | `recharts` | `^3.10.1` | 6-Month Revenue/Expense area curves, Inflow stream donuts, progress lines |
| **Styling** | `tailwindcss` & `@tailwindcss/vite` | `^4.3.3` | Tailwind v4 engine, CSS variables & glassmorphism tokens |
| **Icons** | `lucide-react` | `^1.33.0` | Modern, clean vector iconography |
| **QR Generation** | `qrcode.react` | `^4.2.0` | High-density SVG QR code generation for digital gym passes |
| **Micro-Delight** | `canvas-confetti` | `^1.9.4` | Particle confetti physics for PR (Personal Record) achievements |
| **PWA & Offline** | `vite-plugin-pwa` | `^1.3.0` | Service worker registration, asset caching & offline manifest |
| **HTTP Client** | `axios` | `^1.19.0` | API request interceptors & JWT header injection |
| **Utilities** | `clsx` & `tailwind-merge` | `^2.1.1` | Conditional class joining and Tailwind conflict resolution |

---

### ☕ Backend & Infrastructure Stack
| Category | Technology | Version | Purpose / Role |
| :--- | :--- | :--- | :--- |
| **Runtime** | `Java / Eclipse Temurin` | `JDK 21 LTS` | Modern Java virtual machine runtime |
| **Framework** | `Spring Boot` | `3.3.x` | Enterprise REST API, dependency injection & MVC |
| **Security** | `Spring Security 6` + `JJWT` | `0.12.5` | Role-Based Access Control (RBAC), Stateless JWT Auth & Refresh Tokens |
| **Database** | `PostgreSQL` | `16-alpine` | Relational storage for users, transactions, plans, and attendance |
| **Caching / Sessions**| `Redis` | `7-alpine` | Token revocation blacklist, live turnstile rate limiting |
| **ORM** | `Spring Data JPA / Hibernate` | `3.3.x` | Type-safe persistence queries & schema migrations |
| **API Docs** | `Springdoc OpenAPI / Swagger UI` | `2.6.0` | Interactive auto-generated API specifications & sandbox |
| **Containerization** | `Docker` & `Docker Compose` | `Multi-Stage` | Lightweight Alpine containers for PostgreSQL, Redis, Backend & Nginx |
| **Web Server** | `Nginx` | `alpine` | Reverse proxy and production SPA web server |

---

## 🏛️ System Architecture

```
FitPulse 360 Enterprise Architecture
│
├── frontend/                     # React 19 + Vite 8 + Three.js + TailwindCSS v4
│   ├── src/
│   │   ├── components/           # Navbar, Sidebar, ThreeHeroTorus, MobileDrawer, MobileBottomNav, CommandPalette
│   │   ├── context/GymContext.jsx# Unified application state, telemetry & localStorage persistence
│   │   ├── hooks/                # useNetworkStatus (Online/Offline PWA sync hooks)
│   │   ├── pages/
│   │   │   ├── admin/            # AdminDashboard (3D Hero, P&L, 6-Month Charts, QR Gate, POS, Lockers)
│   │   │   ├── trainer/          # TrainerDashboard (Roster, Workout Protocol & Macro Diet builders)
│   │   │   ├── member/           # MemberDashboard (Set Logger, Stopwatch, Hydration, PR Vault, QR Pass)
│   │   │   └── auth/LoginPage.jsx# One-click demo credentials login portal
│   │   └── index.css             # macOS Aurora Glassmorphism design system & animation tokens
│   ├── public/                   # PWA Manifest, scalable SVG app icons & turnstile assets
│   └── Dockerfile                # Multi-stage Node.js build -> Alpine Nginx container
│
├── backend/                      # Java Spring Boot 3.3 REST API (JDK 21)
│   ├── src/main/java/com/fitpulse/gym/
│   │   ├── config/               # SecurityConfig (JWT + RBAC), SwaggerConfig, CorsConfig
│   │   ├── controllers/          # AdminController, TrainerController, MemberController, AuthController
│   │   ├── models/               # User, Role, Membership, Equipment, Attendance, Locker
│   │   ├── repositories/         # Spring Data JPA interfaces
│   │   └── security/             # JwtAuthenticationFilter, JwtTokenProvider
│   ├── pom.xml                   # Maven dependencies (JPA, Security, Springdoc, Lombok)
│   └── Dockerfile                # Multi-stage Maven builder -> Temurin 21 JRE Alpine image
│
└── docker-compose.yml            # Multi-service stack (Postgres:5433 + Redis:6380 + Backend:8080 + Frontend:80)
```

---

## 🚀 Key Features Breakdown

### 1. 🏢 Gym Admin Operations Hub
- **Interactive Three.js 3D Dumbbell**: Hardware-rendered 3D studio weight with real-time mouse drag rotation and ambient particles.
- **Financial Telemetry & P&L**: Live gross revenue counter-up animation, 6-month area chart, revenue stream donut, and instant operational expense logging.
- **Member Directory & Auto-Invoicing**: Full membership lifecycle tracking, renewal reminder badges, and one-click printable invoice generation.
- **QR Gate Turnstile Scanner Simulator**: Real-time barcode/pass scanner verifying active status and rejecting expired members.
- **Peak Hour Density Heatmap**: Hourly crowd density indicators (6-8 AM vs 6-8 PM) showing live gym floor capacity.
- **Asset Maintenance & Mini POS**: Equipment service interval logs, protein shake & supplement store with instant stock deduction.
- **Locker Allocation Matrix**: 24-locker interactive grid (Available, Occupied, Maintenance).

### 2. 🏋️‍♂️ Trainer Coaching & Client Hub
- **Trainee Roster**: Active client list with streak indicators, compliance percentages, and body composition snapshots.
- **Workout Routine Builder**: Build customized exercise protocols with target muscles, set/rep ranges, and rest intervals.
- **Macro & Diet Builder**: Calorie target distribution (Protein/Carb/Fat grams) with daily meal schedules.
- **Transformation Analytics**: Weekly weight & body fat progression curves with coach weekly feedback logs.
- **PT Commission & Schedule**: 1-on-1 booked slot timeline and live calculated 35% revenue share payouts.

### 3. 🎯 Member Self-Service & Gamification Portal
- **Interactive Workout Set Logger**: Live session set tracking (kg lifted $\times$ reps) with built-in 60s rest countdown timer.
- **Diet Checklist & Hydration Tracker**: Daily meal check-offs and interactive 10-glass water logger (350ml/tap).
- **PR (Personal Record) Vault**: 1-Rep Max logger with celebratory confetti animations for Bench, Squats, and Deadlifts.
- **Digital Gym Pass**: High-res QR pass for instant biometric/turnstile gate entrance.
- **Attendance Leaderboard**: Gym-wide streak leaderboards and loyalty badges.

---

## 🛠️ Running Locally

### Option 1: Full-Stack One-Click Docker (Recommended)
```bash
# Start all 4 containers (Postgres + Redis + Spring Boot + Nginx React Frontend)
docker compose up -d --build
```
- 🌐 **Frontend Application**: [http://localhost](http://localhost) (or [http://localhost:3000](http://localhost:3000) / [http://localhost:5173](http://localhost:5173))
- ☕ **Backend REST API**: [http://localhost:8080](http://localhost:8080)
- 📖 **Swagger API Docs**: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
- 🐘 **PostgreSQL (Host)**: `localhost:5433` (DB: `fitpulse_db`, User: `postgres`, Pass: `postgres`)
- 🔴 **Redis (Host)**: `localhost:6380`

### Option 2: Run Frontend Manually
```bash
cd frontend
npm install
npm run dev
```

### Option 3: Run Backend Manually
```bash
cd backend
mvn clean package -DskipTests
mvn spring-boot:run
```

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
