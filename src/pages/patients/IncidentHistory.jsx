import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Chip,
  Button,
  Stack
} from '@mui/material';
import dayjs from 'dayjs';

const IncidentHistory = () => {
  const [patient, setPatient] = useState(null);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser')) || null;
    const allIncidents = JSON.parse(localStorage.getItem('incidents')) || [];
    setPatient(user);
    const userIncidents = allIncidents.filter((i) => i.patientId === user?.id);
    setIncidents(userIncidents);
  }, []);

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1100, mx: 'auto' }}>
      <Typography variant="h4" fontWeight={600} gutterBottom textAlign="center">
        Appointment History
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 4 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Cost</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Files</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {incidents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="body1" color="text.secondary">
                    No appointment history available.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              incidents.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>
                    {dayjs(row.appointmentDate).format('DD MMM YYYY hh:mm A')}
                  </TableCell>
                  <TableCell>₹{row.cost}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      color={
                        row.status === 'Completed'
                          ? 'success'
                          : row.status === 'Pending'
                          ? 'warning'
                          : 'info'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {row.files?.length ? (
                      <Stack spacing={1}>
                        {row.files.map((file, i) => (
                          <Button
                            key={i}
                            href={file.url}
                            target="_blank"
                            size="small"
                            variant="outlined"
                          >
                            {file.name}
                          </Button>
                        ))}
                      </Stack>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        None
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default IncidentHistory;
