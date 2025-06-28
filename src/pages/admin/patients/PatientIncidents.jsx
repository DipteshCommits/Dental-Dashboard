import React, { useState, useEffect } from 'react';
import {
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Dialog,
  DialogTitle,
  DialogContent
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import IncidentForm from './IncidentForm';

const PatientIncidents = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [open, setOpen] = useState(false);
  const [editIncident, setEditIncident] = useState(null);

  useEffect(() => {
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    const foundPatient = patients.find((p) => p.id === patientId);
    setPatient(foundPatient);

    const allIncidents = JSON.parse(localStorage.getItem('incidents')) || [];
    const patientIncidents = allIncidents.filter((i) => i.patientId === patientId);
    setIncidents(patientIncidents);
  }, [patientId]);

  const saveToStorage = (updatedIncidents) => {
    const allIncidents = JSON.parse(localStorage.getItem('incidents')) || [];
    const newData = [
      ...allIncidents.filter((i) => i.patientId !== patientId),
      ...updatedIncidents
    ];
    localStorage.setItem('incidents', JSON.stringify(newData));
    setIncidents(updatedIncidents);
  };

  const handleAdd = () => {
    setEditIncident(null);
    setOpen(true);
  };

  const handleEdit = (incident) => {
    setEditIncident(incident);
    setOpen(true);
  };

  const handleDelete = (id) => {
    const updated = incidents.filter((i) => i.id !== id);
    saveToStorage(updated);
  };

  const handleSubmit = (formData) => {
    const updated = editIncident
      ? incidents.map((i) => (i.id === formData.id ? formData : i))
      : [...incidents, { ...formData, id: `i${Date.now()}`, patientId }];
    saveToStorage(updated);
    setOpen(false);
  };

  if (!patient) return <Typography>Patient not found</Typography>;

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Incidents for {patient.name}
      </Typography>

      <Button variant="contained" sx={{ mb: 2 }} onClick={handleAdd}>
        Add Incident
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Cost</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {incidents.map((incident) => (
            <TableRow key={incident.id}>
              <TableCell>{incident.title}</TableCell>
              <TableCell>{incident.description}</TableCell>
              <TableCell>{new Date(incident.appointmentDate).toLocaleString()}</TableCell>
              <TableCell>{incident.status || 'Pending'}</TableCell>
              <TableCell>{incident.cost ? `₹${incident.cost}` : '-'}</TableCell>
              <TableCell>
                <Button size="small" onClick={() => handleEdit(incident)}>
                  Edit
                </Button>
                <Button size="small" color="error" onClick={() => handleDelete(incident.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>{editIncident ? 'Edit Incident' : 'Add Incident'}</DialogTitle>
        <DialogContent>
          <IncidentForm
            initialValues={editIncident}
            onSubmit={handleSubmit}
            onCancel={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Button variant="text" sx={{ mt: 2 }} onClick={() => navigate(-1)}>
        ← Back to Patients
      </Button>
    </Paper>
  );
};

export default PatientIncidents;
