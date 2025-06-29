import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Stack
} from '@mui/material';
import dayjs from 'dayjs';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import PeopleIcon from '@mui/icons-material/People';

const Dashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const loadedIncidents = JSON.parse(localStorage.getItem('incidents')) || [];
    const loadedPatients = JSON.parse(localStorage.getItem('patients')) || [];
    setIncidents(loadedIncidents);
    setPatients(loadedPatients);
  }, []);

  const upcoming = incidents
    .filter((i) => dayjs(i.appointmentDate).isAfter(dayjs()))
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
    .slice(0, 10);

  const totalRevenue = incidents.reduce((acc, cur) => acc + (cur.cost || 0), 0);
  const completedCount = incidents.filter((i) => i.status === 'Completed').length;
  const pendingCount = incidents.filter((i) => i.status === 'Pending').length;

  const patientFrequency = patients.map((p) => {
    const count = incidents.filter((i) => i.patientId === p.id).length;
    return { ...p, count };
  }).sort((a, b) => b.count - a.count).slice(0, 5);

  const StatCard = ({ icon, label, value, color }) => (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        boxShadow: 3,
        height: '100%',
        bgcolor: 'background.paper',
      }}
    >
      <Avatar sx={{ bgcolor: color, width: 48, height: 48 }}>{icon}</Avatar>
      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="h6">{value}</Typography>
      </Box>
    </Paper>
  );

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1200, mx: 'auto' }}>
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        fontWeight="bold"
      >
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Total Revenue"
            value={`₹${totalRevenue}`}
            color="primary.main"
            icon={<TrendingUpIcon />}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <StatCard
            label="Completed"
            value={completedCount}
            color="success.main"
            icon={<AssignmentTurnedInIcon />}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <StatCard
            label="Pending"
            value={pendingCount}
            color="warning.main"
            icon={<PendingActionsIcon />}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Avatar sx={{ bgcolor: 'info.main', mr: 1 }}>
                <PeopleIcon />
              </Avatar>
              <Typography variant="h6">Top Patients</Typography>
            </Box>
            {patientFrequency.length === 0 && (
              <Typography variant="body2">No patients yet.</Typography>
            )}
            <Stack spacing={0.5} mt={1}>
              {patientFrequency.map((p) => (
                <Typography key={p.id} variant="body2">
                  {p.name} ({p.count})
                </Typography>
              ))}
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h6" gutterBottom>
              Next 10 Appointments
            </Typography>
            <List>
              {upcoming.length === 0 && (
                <ListItem>
                  <ListItemText primary="No upcoming appointments." />
                </ListItem>
              )}
              {upcoming.map((i) => (
                <React.Fragment key={i.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={
                        <Typography fontWeight="bold">{i.title}</Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" color="text.secondary">
                            {patients.find((p) => p.id === i.patientId)?.name ||
                              'Unknown'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {dayjs(i.appointmentDate).format('DD MMM YYYY hh:mm A')} • ₹{i.cost || 0}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
