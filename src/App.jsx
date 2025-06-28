import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import PatientDashboard from './pages/patients/PatientDashboard';
import { initMockData } from './data/initData';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme= createTheme({
  typography:{
    fontFamily:'Poppins, sans-serif',
  },
});

function App() {

  useEffect(() => {
    initMockData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/patient/*" element={<PatientDashboard />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App
