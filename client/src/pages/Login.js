import React, { useState } from 'react';
import { Box, Typography, useTheme, useMediaQuery, TextField, Button, Alert, Collapse, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery('(min-width: 1000px)');
  
  // States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Xử lý đăng nhập
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/v1/auth/login', { email, password });
      toast.success('Login successfully');
      localStorage.setItem('authToken', true);
      navigate('/');
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
    <Typography variant='h3' mb={2} sx={{fontWeight: 'bold'}}>Login</Typography>
    <Grid container spacing={2} mb={2}>
      <Grid item xs={12}>
        <TextField label='Email' type='email' required fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
      </Grid>
      <Grid item xs={12}>
        <TextField label='Password' type='password' required fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
      </Grid>
    </Grid>
    <Button type='submit' fullWidth variant='contained' sx={{ mt: 2, padding: '1rem', color: 'white', fontSize: 14, fontWeight: 'bold' }}>LOGIN</Button>
    <Typography mt={2}>
      Don't have an account <Link to='/register'>Register</Link>
    </Typography>
  </form>
</Box>

  );
};

export default Login;
