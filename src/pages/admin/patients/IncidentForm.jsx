import React, { useState, useEffect } from 'react';
import {
  TextField,
  DialogActions,
  Button,
  MenuItem,
  Box,
  InputLabel,
  FormControl,
  Select
} from '@mui/material';

const statusOptions = ['Pending', 'Completed', 'Ongoing'];

const IncidentForm = ({ initialValues = {}, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    comments: '',
    appointmentDate: '',
    cost: '',
    treatment: '',
    status: '',
    nextDate: '',
    files: []
  });

  useEffect(() => {
    if (initialValues) {
      setForm({
        ...form,
        ...initialValues,
        cost: initialValues.cost || '',
        status: initialValues.status || ''
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const filePromises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (ev) =>
          resolve({ name: file.name, url: ev.target.result });
        reader.readAsDataURL(file);
      });
    });

    Promise.all(filePromises).then((base64Files) => {
      setForm((prev) => ({ ...prev, files: [...prev.files, ...base64Files] }));
    });
  };

  const handleSubmit = () => {
    onSubmit({ ...form, cost: parseFloat(form.cost) || 0 });
  };

  return (
    <Box sx={{ mt: 1 }}>
      <TextField
        name="title"
        label="Title"
        fullWidth
        margin="dense"
        value={form.title}
        onChange={handleChange}
      />
      <TextField
        name="description"
        label="Description"
        fullWidth
        margin="dense"
        multiline
        rows={2}
        value={form.description}
        onChange={handleChange}
      />
      <TextField
        name="comments"
        label="Comments"
        fullWidth
        margin="dense"
        multiline
        rows={2}
        value={form.comments}
        onChange={handleChange}
      />
      <TextField
        name="appointmentDate"
        label="Appointment Date & Time"
        type="datetime-local"
        fullWidth
        margin="dense"
        InputLabelProps={{ shrink: true }}
        value={form.appointmentDate}
        onChange={handleChange}
      />
      <TextField
        name="cost"
        label="Cost (₹)"
        fullWidth
        margin="dense"
        type="number"
        value={form.cost}
        onChange={handleChange}
      />
      <TextField
        name="treatment"
        label="Treatment"
        fullWidth
        margin="dense"
        value={form.treatment}
        onChange={handleChange}
      />
      <FormControl fullWidth margin="dense">
        <InputLabel>Status</InputLabel>
        <Select
          name="status"
          label="Status"
          value={form.status}
          onChange={handleChange}
        >
          {statusOptions.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        name="nextDate"
        label="Next Appointment Date"
        type="date"
        fullWidth
        margin="dense"
        InputLabelProps={{ shrink: true }}
        value={form.nextDate}
        onChange={handleChange}
      />
      <Box sx={{ mt: 2 }}>
        <Button variant="outlined" component="label">
          Upload Files
          <input
            type="file"
            multiple
            hidden
            onChange={handleFileUpload}
            accept="image/*,application/pdf"
          />
        </Button>
      </Box>
      <Box sx={{ mt: 1 }}>
        {form.files.map((file, idx) => (
          <Box key={idx} sx={{ mt: 1 }}>
            <a href={file.url} target="_blank" rel="noopener noreferrer">
              {file.name}
            </a>
          </Box>
        ))}
      </Box>

      <DialogActions sx={{ mt: 2 }}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Box>
  );
};

export default IncidentForm;
