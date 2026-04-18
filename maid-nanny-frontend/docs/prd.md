# Product Requirements Document (PRD)
## Maid & Nanny Service Management Platform

### 1. Overview
The Maid & Nanny Service Management Platform is a centralized web-based system connecting households with verified domestic helpers (maids, babysitters, nannies). It addresses the lack of background verification, unreliability, and lack of standardized pricing in the informal domestic help market.

### 2. Objectives
- **Primary**: Digitize hiring, provide trustworthy verified providers, enable flexible plans, improve transparency.
- **Secondary**: Service history maintenance, rating mechanisms, multi-city scale.

### 3. Scope
**In-Scope:**
- Web-based platform (Frontend: React / Tailwind CSS; Backend: Node.js / Express / MongoDB)
- Maid, babysitter, and nanny listings.
- Booking and service plan management (hourly, monthly, yearly).
- Profile verification logic.

**Out-of-Scope (Phase 1):**
- Native mobile applications.
- Payroll automation.
- Real-time GPS tracking.

### 4. High-Level Architecture
- **Frontend**: React.js (Vite) offering three primary user Role-Based Views:
  - `Household/User`: Search, Filter, Book, Review.
  - `Helper`: Dashboard, Accept/Reject requests, Earnings.
  - `Admin`: KPI tracking, Verify profiles.
- **Backend API**: Node.js/Express.js routing REST requests.
- **Database**: MongoDB (Local/Compass via Mongoose).

### 5. Functional Requirements
#### 5.1 User (Household)
- Register/Login securely.
- Browse and apply robust UI filters to helper directories.
- View helper profiles with rating and skill badges.
- Send booking requests tied to specific plans.

#### 5.2 Helper
- Onboarding with identity verification requirements.
- Dashboard to manage active jobs and view earnings.
- Approve or decline pending booking requests from Households.

#### 5.3 Admin
- Overview analytics Dashboard (Bookings, Satisfaction, Count).
- Verify and approve Helper documents.
- Manage system-level constraints and dispute handling (stubbed in routing).

### 6. Non-Functional Requirements
- **Performance**: Fast UI transitions, Sub 1-second API latency.
- **Usability**: Premium responsive styling using Custom Design Tokens.
- **Database Scalability**: JSON-schema validated MongoDB Documents mapping nested Arrays for Bookings.
