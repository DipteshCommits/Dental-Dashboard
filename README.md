# Dental Center Management Dashboard 🦷

A responsive and role-based dental clinic management system built using React and Material UI. Features separate panels for **Admin** and **Patients**, with localStorage-based mock data simulation.

---

## 🔗 Deployed App Link
(https://dental-dashboard-git-main-dipteshcommits-projects.vercel.app)

---

## 📁 Folder Structure

```
src/
├── components/           # Shared UI components (e.g. Sidebar, Header)
├── pages/
│   ├── admin/            # Admin dashboard views
│   ├── patients/         # Patient dashboard views
│   └── auth/             # Login page
├── data/                 # Mock data initializer for localStorage
├── App.jsx               # Root component with routes
└── main.jsx              # Entry point
```

---

## ✅ Features

### 🛡 Admin Panel
- Dashboard overview with patient stats
- Full patient list with add/edit/delete
- Incident management per patient with file uploads
- Calendar showing all appointments

### 🧑‍⚕️ Patient Panel
- View upcoming appointments
- Appointment history with downloadable files
- Profile section with contact info
- Navigation drawer with logout

---

## 🏗️ Architecture & Tech Stack

- **React + Vite**
- **React Router** for routing
- **Material UI (MUI)** for UI components
- **LocalStorage** for simulated backend
- **Day.js** for date/time formatting

---

## ⚙️ Setup Instructions

```bash
# 1. Clone the repo
git clone https://github.com/your-username/dental-dashboard.git

# 2. Navigate to project
cd dental-dashboard

# 3. Install dependencies
npm install

# 4. Run locally
npm run dev
```

---

## 📌 Known Issues / Limitations

- No real authentication — simulated via email-based mock login.
- No backend — uses `localStorage`, so data is lost on browser clear.
- All file uploads are stored as base64 in localStorage (inefficient for large files).

---

## 🧠 Technical Decisions

- Used `localStorage` to simulate CRUD operations without needing a backend.
- Chose **MUI** for faster development and responsive design.
- Role-based routing to keep Admin and Patient views separate.
- Incident data is linked to patients via patientId for consistent filtering.

---
