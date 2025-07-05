import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import Dashboard from './Dashboard';
import PatientList from './patients/PatientList';
import PatientIncidents from './patients/PatientIncidents';
import CalendarView from './CalendarView';
import {Outlet} from 'react-router-dom'


const AdminDashboard = () => {
    return (
        <AdminLayout>
            <Outlet/>
        </AdminLayout>
    );
};

export default AdminDashboard;
