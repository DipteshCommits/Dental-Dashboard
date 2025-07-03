import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip
} from '@mui/material';
import dayjs from 'dayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const PatientCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const allIncidents = JSON.parse(localStorage.getItem('incidents')) || [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const filtered = allIncidents.filter(
      (i) => i.patientId === currentUser?.id
    );
    setAppointments(filtered);
  }, []);

  const getAppointmentsForDate = () =>
    appointments.filter((a) =>
      dayjs(a.appointmentDate).isSame(selectedDate, 'day')
    );

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Appointment Calendar
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar value={selectedDate} onChange={setSelectedDate} />
        </LocalizationProvider>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            Appointments on {selectedDate.format('DD MMM YYYY')}
          </Typography>
          <List>
            {getAppointmentsForDate().length === 0 && (
              <Typography color="text.secondary">No appointments.</Typography>
            )}
            {getAppointmentsForDate().map((appt) => (
              <ListItem key={appt.id} divider>
                <ListItemText
                  primary={appt.title}
                  secondary={`${dayjs(appt.appointmentDate).format(
                    'hh:mm A'
                  )} • ₹${appt.cost}`}
                />
                <Chip label={appt.status} size="small" color="primary" />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Paper>
  );
};

export default PatientCalendar;
