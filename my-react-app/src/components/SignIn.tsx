import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Regular expression for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
  const [Email, setEmail] = useState<string>('');
  const [Password, setPassword] = useState<string>('');
  const [EmailError, setEmailError] = useState<string | null>(null);
  const [PasswordError, setPasswordError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    axios
      .post('http://localhost:3002/login', { Email, Password },{ withCredentials: true })
      .then((result) => {
        console.log(result);
        if (result.data.message === 'Login successful! Redirecting to home page.') {
          alert(result.data.message);
          if (result.data.role==="admin"){
            navigate('/import');
          }if(result.data.role==="user"){
            navigate('/chat');
          }
        }else{
          alert(result.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const validateForm = () => {
    let valid = true;
    if (!Email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!emailRegex.test(Email)) {
      setEmailError('Invalid email format');
      valid = false;
    } else {
      setEmailError(null);
    }
    if (!Password) {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError(null);
    }
    return valid;
  };

  const handleSignUpClick = () => {
    navigate('/register');
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography component="h1" variant="h1">
              Welcome back!
            </Typography>
          </Box>

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!EmailError}
                  helperText={EmailError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!PasswordError}
                  helperText={PasswordError}
                />
              </Grid>
              <Grid container justifyContent="right">
                <Typography component="p" variant="body1">
                  <Link href="#" sx={{ fontFamily: 'Abel' }}>
                    Forgot your password?
                  </Link>
                </Typography>
              </Grid>
            </Grid>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
  <Button
    fullWidth
    color="primary"
    variant="outlined"
    sx={{ mt: 3, mb: 2, width: 'calc(50% - 5px)' }} // 5px accounts for margin
    onClick={handleSignUpClick}
  >
    Sign Up instead
  </Button>
  <Button
    type="submit"
    fullWidth
    variant="contained"
    style={{ backgroundColor: '#BE4A31', color: '#FFFFFF' }}
    sx={{ mt: 3, mb: 2, width: 'calc(50% - 5px)' }} // 5px accounts for margin
  >
    Sign In
  </Button>
</div>
        
          </Box>
        </Box>
        <Footer />
      </Container>
    </ThemeProvider>
  );
}
