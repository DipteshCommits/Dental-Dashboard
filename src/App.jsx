import { useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import LoginPage from './pages/auth/LoginPage';
import { initMockData } from './data/initData';

// Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import Dashboard from './pages/admin/Dashboard';
import PatientList from './pages/admin/patients/PatientList';
import PatientIncidents from './pages/admin/patients/PatientIncidents';
import CalendarView from './pages/admin/CalendarView';

// Patient
import PatientLayout from './pages/patients/components/PatientLayout';
import PatientDashboard from './pages/patients/PatientDashboard';
import IncidentHistory from './pages/patients/IncidentHistory';
import PatientCalendar from './pages/patients/PatientCalendar';
import PatientProfile from './pages/patients/PatientProfile';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

function App() {
  useEffect(() => {
    initMockData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<LoginPage />} />

        {/* Admin Routes with Layout */}
        <Route path="/admin/*" element={<AdminDashboard />}>
          <Route index element={<Dashboard />} />
          <Route path="patients" element={<PatientList />} />
          <Route path="patients/:patientId/incidents" element={<PatientIncidents />} />
          <Route path="calendar" element={<CalendarView />} />
          <Route path="*" element={<Navigate to="/admin" />} />
        </Route>

        {/* Patient Routes with Layout */}
        <Route path="/patients/*" element={<PatientLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<PatientDashboard />} />
          <Route path="history" element={<IncidentHistory />} />
          <Route path="calendar" element={<PatientCalendar />} />
          <Route path="profile" element={<PatientProfile />} />
          <Route path="*" element={<Navigate to="/patients/dashboard" />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
