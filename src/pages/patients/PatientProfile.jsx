import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Avatar,
    Divider,
    TextField,
    Button,
    Stack
} from '@mui/material';

const PatientProfile = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        age: '',
        gender: ''
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('currentUser')) || {};
        setForm(user);
    }, []);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = () => {
        localStorage.setItem('currentUser', JSON.stringify(form));
        alert('Profile updated successfully!');
    };

    return (
        <>

            <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto', boxShadow: 3 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ width: 64, height: 64 }}>
                        {form.name?.[0]?.toUpperCase() || 'P'}
                    </Avatar>
                    <Box>
                        <Typography variant="h5" fontWeight="bold">
                            {form.name}
                        </Typography>
                        <Typography color="text.secondary">{form.email}</Typography>
                    </Box>
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1">
                    <strong>Phone:</strong> {form.phone || 'Not Provided'}
                </Typography>
                <Typography variant="body1">
                    <strong>Age:</strong> {form.age || 'Not Provided'}
                </Typography>
                <Typography variant="body1">
                    <strong>Gender:</strong> {form.gender || 'Not Provided'}
                </Typography>
            </Paper>


            <Box sx={{ maxWidth: 600, mx: 'auto', p: { xs: 2, sm: 3 } }}>
                <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        My Profile
                    </Typography>

                    <Stack spacing={2}>
                        <TextField
                            name="name"
                            label="Full Name"
                            value={form.name}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="email"
                            label="Email"
                            value={form.email}
                            onChange={handleChange}
                            fullWidth
                            disabled
                        />
                        <TextField
                            name="phone"
                            label="Phone"
                            value={form.phone}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="age"
                            label="Age"
                            value={form.age}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="gender"
                            label="Gender"
                            value={form.gender}
                            onChange={handleChange}
                            fullWidth
                        />

                        <Button variant="contained" onClick={handleSave}>
                            Save Changes
                        </Button>
                    </Stack>
                </Paper>
            </Box>

        </>
    );
};

export default PatientProfile;
