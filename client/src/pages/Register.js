import React, { useState } from 'react';
import { Box, Typography, useTheme, useMediaQuery, TextField, Button, Alert, Collapse, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery('(min-width: 1000px)');

  // States
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Xử lý đăng ký
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/v1/auth/register', { username, email, password });
      toast.success('Register successfully');
      navigate('/login');
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.error || 'An error has occurred');
      setTimeout(() => setError(''), 5000);
    }
  };

  return (
    <Box width={isNotMobile ? '40%' : '80%'} p={'2rem'} m={'2rem auto'} borderRadius={5} sx={{ boxShadow: 5 }} backgroundColor={theme.palette.background.alt}>
  <Collapse in={error}>
    <Alert severity='error' sx={{ mb: 2 }}>{error}</Alert>
  </Collapse>
  <form onSubmit={handleSubmit}>
    <Typography variant='h3' sx={{ fontWeight: 'bold', mb: 2 }}>Register</Typography>
    <Grid container spacing={2} mb={2}>
      <Grid item xs={12}>
        <TextField label='Username' required fullWidth value={username} onChange={(e) => setUsername(e.target.value)} 
        />
      </Grid>
      <Grid item xs={12}>
        <TextField label='Email' type='email' required fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
      </Grid>
      <Grid item xs={12}>
        <TextField label='Password' type='password' required fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
      </Grid>
    </Grid>
    <Button type='submit' fullWidth variant='contained' sx={{ mt: 2, padding: '1rem', color: 'white', fontSize: 14, fontWeight: 'bold' }}>REGISTER</Button>
    <Typography mt={2}>
      Already have account <Link to='/login'>Login</Link>
    </Typography>
  </form>
</Box>

  );
};

export default Register;
