import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import Dashboard from './Dashboard';
import PatientList from './patients/PatientList';
import PatientIncidents from './patients/PatientIncidents';
import CalendarView from './CalendarView';
// Other imports (Appointments, Calendar, etc.) later

const AdminDashboard = () => {
    return (
        <AdminLayout>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/patients" element={<PatientList />} />
                <Route path="/patients/:patientId/incidents" element={<PatientIncidents />} />
                <Route path="calendar" element={<CalendarView/>} />

                {/* Add other routes like appointments, calendar etc. */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </AdminLayout>
    );
};

export default AdminDashboard;
