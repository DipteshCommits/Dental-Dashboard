import React, { useState, useEffect } from 'react';
import { TextField, DialogActions, Button, Box } from '@mui/material';

const PatientForm = ({ initialValues = {}, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    name: '',
    dob: '',
    contact: '',
    healthInfo: ''
  });

  useEffect(() => {
    if (initialValues) {
      setForm(initialValues);
    }
  }, [initialValues]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit({ ...form, id: initialValues?.id || undefined });
  };

  return (
    <Box sx={{ mt: 1 }}>
      <TextField
        name="name"
        label="Full Name"
        fullWidth
        margin="dense"
        value={form.name}
        onChange={handleChange}
      />
      <TextField
        name="dob"
        label="Date of Birth"
        fullWidth
        margin="dense"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={form.dob}
        onChange={handleChange}
      />
      <TextField
        name="contact"
        label="Contact Number"
        fullWidth
        margin="dense"
        value={form.contact}
        onChange={handleChange}
      />
      <TextField
        name="healthInfo"
        label="Health Info"
        fullWidth
        margin="dense"
        multiline
        rows={2}
        value={form.healthInfo}
        onChange={handleChange}
      />
      <DialogActions sx={{ mt: 1 }}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Box>
  );
};

export default PatientForm;
