<div align="center">

#  FaceFlow AI
**Enterprise Presence Intelligence & Advanced Face Recognition Ecosystem**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python)](https://www.python.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)

FaceFlow AI is a cutting-edge, biometric-first attendance and presence management platform built for large-scale enterprise and academic environments. It abandons traditional, error-prone attendance methods in favor of high-precision Deep Learning facial recognition, real-time geofencing, and predictive AI telemetry.

</div>

---

## ✨ Core Philosophy
**"An ERP Attendance Portal that feels like a Command Center."**
FaceFlow was designed from the ground up to provide a visually stunning, frictionless experience. 
- **For Admins/Security**: A dark-mode, glassmorphic Command Center featuring live telemetry, neural network metrics, and threat detection.
- **For Students/Employees**: A vibrant, modern light-mode App with Gamified Attendance Wallets, Timeline Tracking, and an intelligent Leave Hub.

## 🚀 Key Features

### 🧠 Deep Learning Identity Engine
- **Presentation Attack Detection (PAD)**: Built-in liveness checks (Blink, Smile, Yaw/Pitch head tracking) to prevent spoofing via photos or screens.
- **Live Retraining Hub**: Dynamic UI for simulating deep learning fine-tuning on custom enterprise datasets with real-time epoch and loss telemetry.
- **Multi-Camera Telemetry**: Handles live occupancy streams across hundreds of campus nodes simultaneously.

### 🛡️ Enterprise-Grade Security
- **RBAC (Role-Based Access Control)**: Strict segregation between System Admins, Faculty, Security Personnel, and Students.
- **Dispute Resolution Hub**: Automated flagging of attendance anomalies with a streamlined UI for users to upload evidence (e.g., location proofs, selfies).
- **Geofenced Operations**: Integrates spatial verification alongside biometric checks to ensure users are actually within designated zones.

### 🎨 State-of-the-Art UX/UI
- Built with **Next.js 14**, **Framer Motion**, and **Tailwind CSS**.
- **Heavy use of Glassmorphism** (`backdrop-blur-2xl`), smooth micro-animations, and dynamic 3D-effect cards.
- **Simulated HUDs**: Custom-built radar sweeps, map nodes, and terminal logs for an immersive software experience.

---

## 🛠️ Technology Stack

### Frontend Architecture
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom glassmorphism utilities
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Backend Infrastructure (WIP)
- **Framework**: FastAPI (Python 3.11)
- **Database ORM**: SQLAlchemy (Async)
- **Authentication**: JWT & OAuth2
- **AI/ML Integration**: Ready for dlib, face_recognition, and OpenCV pipelines.

---

## 📸 Platform Previews

### 1. Admin Command Center (Dark Mode)
A comprehensive telemetry dashboard tracking neural network inference times, live campus occupancy, predictive detention forecasts, and active anomalies.

### 2. Enrollment Studio
A beautiful, frictionless 4-step onboarding flow for users to register their biometric profile, featuring interactive liveness challenges (Turn Head, Nod, Blink).

### 3. Student Dashboard (Light Mode)
A clean, premium interface displaying an 'Attendance Wallet', safe margin analytics, and an interactive daily timeline.

---

## 🚦 Getting Started

### Prerequisites
- Node.js 18.x or higher
- Python 3.11 or higher
- PostgreSQL (for backend database)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/chaitu2303/FaceFlow.git
   cd FaceFlow
   ```

2. **Start the Frontend Client**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *The frontend will be available at http://localhost:3000*

3. **Start the Backend Server**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```
   *The backend will be available at http://localhost:8000*

---

## 🎯 Designed For Recruiters
**Why this project stands out:**
- **Full-Stack Competency**: Demonstrates ability to architect both a modern React/Next.js frontend and a scalable Python backend.
- **Product Thinking**: The UI isn't just functional; it's designed with *empathy* for the end-user and *power* for the administrator. It prioritizes aesthetics (Glassmorphism) and engagement (Micro-animations).
- **Domain Complexity**: Tackles complex real-world problems including biometric spoofing, multi-tenant RBAC, and telemetry visualization.

---
*Built with passion for the future of Enterprise Intelligence.*
