import React from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'

const Navbar = () => {

  const theme = useTheme()

  const navigate = useNavigate()

  const loggedIn = JSON.parse(localStorage.getItem('authToken'))

  //handle
  const handleLogout = async () => {

    try {
      await axios.post('/api/v1/auth/logout')
      localStorage.removeItem('authToken')
      toast.success('Logout successfully')
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Box width={'100%'} backgroundColor={theme.palette.background.alt} p='1rem 6%' textAlign={'center'} sx={{ boxShadow: 3, mb: 10 }}>
        <Typography variant='h1' color={'primary'} fontWeight='bold'>
          GPT Text analysis & statistics
        </Typography>

        <Box sx={{ mt: 2 }}>
          {
            loggedIn
              ? (
                <>
                  <NavLink to='/' p={1}>Home</NavLink>
                  <NavLink to='/login' onClick={handleLogout} p={1}>Logout</NavLink>
                </>
              )
              : (
                <>
                  <NavLink to='/register' p={1}>Register</NavLink>
                  <NavLink to='/login' p={1}>Login</NavLink>
                </>

              )
          }
        </Box>
      </Box>
    </div>
  )
}

export default Navbar

