# 🏋️ FitPulse 360 - Docker Cheat Sheet & Commands Guide

Indha guide-la Docker and project-ah yepidi run, stop, and debug panradhunu full commands iruku.

---

## 🚀 1. PROJECT START PANRA COMMANDS

### A. First Time or Code Changes Appram (Build + Run):
```bash
cd "/home/luca/Code/Personal/Gym management system"
docker compose up -d --build
```
> **Explanation:**
> - `-d` (Detached mode): Background-la run aagum.
> - `--build`: Frontend and Backend code-ah pudhusa compile & package panni build pannum.

### B. Daily Normal Start (Fast Start without rebuild):
```bash
docker compose up -d
```

---

## 🛑 2. PROJECT STOP / RESTART PANRA COMMANDS

### A. Stop All Containers (Data will be preserved):
```bash
docker compose down
```

### B. Restart All Containers:
```bash
docker compose restart
```

### C. Complete Reset (Stop + Remove Containers & Networks):
```bash
docker compose down -v
```
*(Warning: `-v` flag DB data volume-ah wipe pannidum).*

---

## 📊 3. MONITORING & LOGS COMMANDS

### A. Check Running Status (Status of all 4 containers):
```bash
docker compose ps
```

### B. Live Real-Time Logs Paarka (Debug errors):
```bash
# All containers logs
docker compose logs -f

# Only Backend Logs:
docker compose logs -f backend

# Only Frontend Logs:
docker compose logs -f frontend

# Only Database Logs:
docker compose logs -f postgres
```
*(Exit panna `Ctrl + C` press pannunga).*

---

## 🌐 4. ACCESS URLS & PORTS

| Service | Local URL / Port | Purpose |
| :--- | :--- | :--- |
| **Frontend Web App** | [http://localhost](http://localhost) or [http://localhost:3000](http://localhost:3000) | Main React SaaS UI |
| **Backend REST API** | [http://localhost:8080](http://localhost:8080) | Spring Boot 3 API |
| **Swagger API Docs** | [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html) | Interactive API Documentation |
| **Health Monitor** | [http://localhost:8080/actuator/health](http://localhost:8080/actuator/health) | System Health Check |
| **PostgreSQL Database** | `localhost:5433` (DB: `fitpulse_gym`) | DB Container |
| **Redis Cache** | `localhost:6380` | Cache Container |

---

## 🔑 5. PRE-SEEDED TEST CREDENTIALS

- **Admin Portal**: `admin@fitlife.com` | `admin123`
- **Trainer Portal**: `trainer@fitlife.com` | `trainer123`
- **Member Portal**: `user@fitlife.com` | `user123`
