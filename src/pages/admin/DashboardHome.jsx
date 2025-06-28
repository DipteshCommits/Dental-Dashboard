import React from 'react';
import { Typography, Box } from '@mui/material';

const DashboardHome = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome, Admin!
      </Typography>
      <Typography variant="body1">
        Use the sidebar to manage patients and appointments.
      </Typography>
    </Box>
  );
};

export default DashboardHome;
