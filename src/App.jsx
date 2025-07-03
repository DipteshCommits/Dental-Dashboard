import { useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import { initMockData } from './data/initData';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import PatientLayout from './pages/patients/components/PatientLayout';
import PatientDashboard from './pages/patients/PatientDashboard';
import IncidentHistory from './pages/patients/IncidentHistory';
import PatientCalendar from './pages/patients/PatientCalendar';
import PatientProfile from './pages/patients/PatientProfile';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif'
  }
});

function App() {
  useEffect(() => {
    initMockData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* ✅ Nested Patient Routes under Layout */}
        <Route path="/patients/*" element={<PatientLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<PatientDashboard />} />
          <Route path="history" element={<IncidentHistory />} />
          <Route path="calendar" element={<PatientCalendar />} />
          <Route path="profile" element={<PatientProfile />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
