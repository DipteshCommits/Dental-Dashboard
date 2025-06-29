import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination, TableRow, Typography, Box, IconButton, Button, Dialog, DialogTitle
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';
import IncidentForm from './IncidentForm';

const columns = [
  { id: 'title', label: 'Title', minWidth: 120 },
  { id: 'description', label: 'Description', minWidth: 150 },
  { id: 'status', label: 'Status', minWidth: 100 },
  { id: 'cost', label: 'Cost (₹)', minWidth: 80, align: 'right' },
  { id: 'appointmentDate', label: 'Appointment', minWidth: 160 },
  { id: 'treatment', label: 'Treatment', minWidth: 150 },
  { id: 'nextDate', label: 'Next Visit', minWidth: 130 },
  { id: 'files', label: 'Files', minWidth: 150 },
  { id: 'actions', label: 'Actions', minWidth: 100 },
];

export default function PatientIncidents() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState([]);
  const [patientName, setPatientName] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);

  useEffect(() => {
    const allIncidents = JSON.parse(localStorage.getItem('incidents')) || [];
    const allPatients = JSON.parse(localStorage.getItem('patients')) || [];

    const filtered = allIncidents.filter((i) => i.patientId === patientId);
    setIncidents(filtered);

    const patient = allPatients.find((p) => p.id === patientId);
    setPatientName(patient?.name || 'Unknown Patient');
  }, [patientId]);

  const handleDeleteFile = (incidentId, fileIndex) => {
    const updated = incidents.map((incident) => {
      if (incident.id === incidentId) {
        const newFiles = [...(incident.files || [])];
        newFiles.splice(fileIndex, 1);
        return { ...incident, files: newFiles };
      }
      return incident;
    });

    setIncidents(updated);
    const all = JSON.parse(localStorage.getItem('incidents')) || [];
    const updatedAll = all.map((i) => (i.id === incidentId ? updated.find((u) => u.id === i.id) : i));
    localStorage.setItem('incidents', JSON.stringify(updatedAll));
  };

  const handleDeleteIncident = (incidentId) => {
    const updated = incidents.filter((i) => i.id !== incidentId);
    setIncidents(updated);
    const all = JSON.parse(localStorage.getItem('incidents')) || [];
    const updatedAll = all.filter((i) => i.id !== incidentId);
    localStorage.setItem('incidents', JSON.stringify(updatedAll));
  };

  const handleOpenDialog = (incident = null) => {
    setSelectedIncident(incident);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedIncident(null);
    const all = JSON.parse(localStorage.getItem('incidents')) || [];
    const filtered = all.filter((i) => i.patientId === patientId);
    setIncidents(filtered);
  };

  const handleFormSubmit = (formData) => {
    const isEdit = !!selectedIncident;
    const all = JSON.parse(localStorage.getItem('incidents')) || [];
    let updated;

    if (isEdit) {
      updated = all.map((i) => (i.id === selectedIncident.id ? { ...selectedIncident, ...formData } : i));
    } else {
      const newIncident = {
        ...formData,
        id: `i${Date.now()}`,
        patientId,
      };
      updated = [...all, newIncident];
    }

    localStorage.setItem('incidents', JSON.stringify(updated));
    handleCloseDialog();
  };

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>

      <Paper sx={{ minWidth: 1000, overflow: 'hidden', p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Incidents for: {patientName}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog(null)}
          >
            Add Incident
          </Button>
          <Button variant="outlined" onClick={() => navigate('/admin/patients')}>
            ← Back to Patients
          </Button>
        </Box>

        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell key={col.id} align={col.align || 'left'} style={{ minWidth: col.minWidth }}>
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {incidents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((incident) => (
                <TableRow hover key={incident.id}>
                  <TableCell>{incident.title}</TableCell>
                  <TableCell>{incident.description}</TableCell>
                  <TableCell>{incident.status || 'Pending'}</TableCell>
                  <TableCell align="right">{incident.cost || '—'}</TableCell>
                  <TableCell>{dayjs(incident.appointmentDate).format('DD MMM YYYY, hh:mm A')}</TableCell>
                  <TableCell>{incident.treatment || '—'}</TableCell>
                  <TableCell>{incident.nextDate ? dayjs(incident.nextDate).format('DD MMM YYYY') : '—'}</TableCell>
                  <TableCell>
                    {incident.files?.length ? (
                      <Box>
                        {incident.files.map((file, idx) => (
                          <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
                            <IconButton size="small" onClick={() => handleDeleteFile(incident.id, idx)}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        ))}
                      </Box>
                    ) : '—'}
                  </TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => handleOpenDialog(incident)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDeleteIncident(incident.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={incidents.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(+e.target.value);
            setPage(0);
          }}
        />
      </Paper>

      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{selectedIncident ? 'Edit Incident' : 'Add Incident'}</DialogTitle>
        <IncidentForm
          initialValues={selectedIncident}
          onSubmit={handleFormSubmit}
          onCancel={handleCloseDialog}
        />
      </Dialog>
    </Box>
  );
}
