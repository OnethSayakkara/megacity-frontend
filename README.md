# 🚖 Mega City Cab Management System

![image](https://github.com/user-attachments/assets/d0e1eb98-cf24-45fc-8c82-2427e3b87d99)


The **Mega City Cab Management System** is a modern, scalable, and full-featured platform designed to streamline operations for *Mega City Cab* in Colombo. It replaces manual workflows with automated solutions for **cab bookings, driver assignments, real-time tracking**, and **dynamic fare calculations**.

This system was developed as part of the *Advanced Programming* module during the **BSc (Top-Up)** – Semester 1. The project was  reflecting a strong understanding of full-stack development, real-time data handling, and cloud-integrated APIs. ( **71 marks** )

Built with a powerful modern tech stack and integrated with the **Google Maps Platform**, this solution ensures **efficiency, security, and scalability** for end-users including customers, drivers, cab owners, and administrators.


## ✨ Features

### 🚘 Customer Dashboard
- Book rides with real-time tracking via **Google Maps**.
- View/manage ride history with **fare breakdowns**.
- Autocomplete pickup/drop-off using **Google Places API**.
- Instant ride status updates via **WebSockets**.
- Manage profiles, reset password, and post-trip ratings.
- Prevent duplicate booking of same car/driver at the same time.

### 👨‍✈️ Driver Dashboard
- Accept/reject rides in real time.
- View earnings, trip history, and reviews.
- Update GPS location dynamically.
- Toggle availability status.

### 🚖 Cab Owner Dashboard
- Register/manage vehicle info.
- View bookings, earnings, and assigned drivers.
- Receive maintenance/booking notifications.

### 🛠️ Admin Panel
- Approve/reject driver and owner registrations.
- Manage all entities: drivers, owners, users, bookings.
- Monitor system health and performance.
- Review feedback and configure cab categories.

### 🌐 System-Wide
- Dynamic fare via **Distance Matrix API**.
- Role-Based Access Control (RBAC).
- JWT + bcrypt-authentication.
- **Geospatial indexing** for proximity-based matching.
- **Kubernetes + Docker** for scalability and deployment.
---

## 🛠️ Tech Stack

### 🚀 Frontend
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)


### 🔧 Backend
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![Maven](https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apache-maven&logoColor=white)


### 🗄️ Database
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-2DCD59?style=for-the-badge&logo=mongodb&logoColor=white)

### 🔐 Security
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

### 🌍 APIs & Services
![Google Maps](https://img.shields.io/badge/Google_Maps_API-4285F4?style=for-the-badge&logo=google-maps&logoColor=white)
![Geocoding API](https://img.shields.io/badge/Geocoding_API-F9AB00?style=for-the-badge&logo=google&logoColor=white)
![Distance Matrix API](https://img.shields.io/badge/Distance_Matrix_API-34A853?style=for-the-badge&logo=google&logoColor=white)
![Places API](https://img.shields.io/badge/Places_API-EA4335?style=for-the-badge&logo=google&logoColor=white)

## ⚙️ Deployment & DevOps
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)


## 🗺️ Google Console API Integration

The system uses several APIs from the **Google Maps Platform** for ride-hailing features:

| API | Purpose |
|-----|---------|
| **Maps JavaScript API** | Displays interactive maps for real-time cab tracking |
| **Geocoding API** | Converts addresses to latitude/longitude |
| **Distance Matrix API** | Calculates distance and time between points |
| **Places API** | Enables location autocomplete on address fields |

---




