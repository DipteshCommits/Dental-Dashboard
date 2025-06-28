import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import PatientForm from './PatientForm';
import { useNavigate } from 'react-router-dom';

const PatientList = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [open, setOpen] = useState(false);
  const [editPatient, setEditPatient] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('patients')) || [];
    setPatients(data);
  }, []);

  const saveToLocalStorage = (updated) => {
    localStorage.setItem('patients', JSON.stringify(updated));
    setPatients(updated);
  };

  const handleAdd = () => {
    setEditPatient(null);
    setOpen(true);
  };

  const handleEdit = (patient) => {
    setEditPatient(patient);
    setOpen(true);
  };

  const handleDelete = (id) => {
    const updated = patients.filter(p => p.id !== id);
    saveToLocalStorage(updated);
  };

  const handleSubmit = (formData) => {
    const updated = editPatient
      ? patients.map(p => p.id === formData.id ? formData : p)
      : [...patients, { ...formData, id: `p${Date.now()}` }];

    saveToLocalStorage(updated);
    setOpen(false);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Patient Management
      </Typography>
      <Button variant="contained" sx={{ mb: 2 }} onClick={handleAdd}>
        Add Patient
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>DOB</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Health Info</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.dob}</TableCell>
              <TableCell>{patient.contact}</TableCell>
              <TableCell>{patient.healthInfo}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(patient)} size="small">Edit</Button>
                <Button onClick={() => handleDelete(patient.id)} size="small" color="error">Delete</Button>
              </TableCell>
              <TableCell>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => navigate(`/admin/patients/${patient.id}/incidents`)}
                >
                  View Incidents
                </Button>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>{editPatient ? 'Edit Patient' : 'Add Patient'}</DialogTitle>
        <DialogContent>
          <PatientForm
            initialValues={editPatient}
            onSubmit={handleSubmit}
            onCancel={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Paper>
  );
};

export default PatientList;
