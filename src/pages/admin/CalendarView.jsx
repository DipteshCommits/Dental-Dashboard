import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import dayjs from 'dayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const allIncidents = JSON.parse(localStorage.getItem('incidents')) || [];
    const allPatients = JSON.parse(localStorage.getItem('patients')) || [];

    setAppointments(allIncidents);
    setPatients(allPatients);
  }, []);

  const getAppointmentsForSelectedDate = () => {
    return appointments.filter((appt) =>
      dayjs(appt.appointmentDate).isSame(selectedDate, 'day')
    );
  };

  const getPatientName = (id) => {
    const p = patients.find((pat) => pat.id === id);
    return p?.name || 'Unknown';
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Appointment Calendar
      </Typography>

      <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
          />
        </LocalizationProvider>

        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            Appointments on {selectedDate.format('DD MMM YYYY')}
          </Typography>

          <List>
            {getAppointmentsForSelectedDate().length === 0 && (
              <Typography>No appointments.</Typography>
            )}

            {getAppointmentsForSelectedDate().map((item) => (
              <ListItem key={item.id} divider>
                <ListItemText
                  primary={item.title}
                  secondary={
                    <>
                      {getPatientName(item.patientId)} —{' '}
                      {dayjs(item.appointmentDate).format('hh:mm A')}
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Paper>
  );
};

export default CalendarView;
