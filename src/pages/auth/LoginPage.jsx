import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Auto-redirect if session already exists
    const session = JSON.parse(localStorage.getItem('currentUser'));
    if (session) {
      redirectToDashboard(session.role);
    }
  }, []);

  const redirectToDashboard = (role) => {
    if (role === 'Admin') navigate('/admin');
    else if (role === 'Patient') navigate('/patient');
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const found = users.find(
      (user) => user.email === email && user.password === password
    );

    if (found) {
      localStorage.setItem('currentUser', JSON.stringify(found));
      redirectToDashboard(found.role);
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 10, p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Dental Center Login
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <Box component="form" noValidate sx={{ mt: 2 }}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
