import React, { useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Grid,
  Chip
} from '@mui/material';
import dayjs from 'dayjs';

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const allIncidents = JSON.parse(localStorage.getItem('incidents')) || [];
    const upcoming = allIncidents
      .filter((i) => i.patientId === currentUser?.id)
      .filter((i) => dayjs(i.appointmentDate).isAfter(dayjs()))
      .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));

    setAppointments(upcoming);
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        My Upcoming Appointments
      </Typography>
      <Grid container spacing={2}>
        {appointments.length === 0 ? (
          <Typography color="text.secondary" sx={{ px: 2 }}>
            No upcoming appointments found.
          </Typography>
        ) : (
          appointments.map((appt) => (
            <Grid item xs={12} md={6} key={appt.id}>
              <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {appt.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {dayjs(appt.appointmentDate).format('DD MMM YYYY hh:mm A')}
                </Typography>
                <Typography variant="body2" mt={1}>
                  Treatment: {appt.treatment}
                </Typography>
                <Typography variant="body2">
                  Cost: ₹{appt.cost}
                </Typography>
                <Chip label={appt.status} size="small" color="info" sx={{ mt: 1 }} />
              </Paper>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default PatientDashboard;
