import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Stack
} from '@mui/material';
import dayjs from 'dayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useNavigate } from 'react-router-dom';

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

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
              <ListItem>
                <ListItemText primary={<Typography>No appointments.</Typography>} />
              </ListItem>
            )}

            {/*http://localhost:5173/admin/patients/p1/incident*/}
            {getAppointmentsForSelectedDate().map((item) => (
              <React.Fragment key={item.id}>
                <ListItem
                  divider
                  button="true"
                  onClick={() => navigate(`/admin/patients/${item.patientId}/incidents`)}
                >
                
                  <ListItemText
                    primary={
                      <Box component="span">
                        <strong>{item.title}</strong>{' '}
                        <Typography component="span" variant="body2" color="text.secondary">
                          ({getPatientName(item.patientId)})
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography component="span">
                          {dayjs(item.appointmentDate).format('hh:mm A')}
                        </Typography>
                        <Chip
                          label={item.status || 'Pending'}
                          size="small"
                          color={item.status === 'Completed' ? 'success' : item.status === 'Ongoing' ? 'warning' : 'default'}
                        />
                      </Stack>
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Box>
    </Paper>
  );
};

export default CalendarView;
