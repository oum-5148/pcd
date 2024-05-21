import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as yup from "yup";

// Regular expression for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validation schema using yup
const schema = yup.object().shape({
  AdminName: yup.string().required('Admin Name is required'),
  CompanyName: yup.string().required('Compnay Name is required'),
  Email: yup.string().email('Invalid email format').required('Email is required'),
  Password: yup.string().required('Password is required'),
});

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
  const [AdminName, setAdminName] = useState<string>('');
  const [CompanyName, setCompanyName] = useState<string>('');
  const [Email, setEmail] = useState<string>('');
  const [Password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const [errors, setErrors] = useState<any>({});

  const handleSubmit = (e) => {
    e.preventDefault();
    schema.validate({ AdminName, CompanyName, Email, Password }, { abortEarly: false })
      .then(() => {
        axios.post('http://localhost:3002/register', { AdminName, CompanyName, Email, Password })
          .then(result => {
            console.log(result);
            navigate('/login');
          })
          .catch(err => console.log(err));
      })
      .catch(err => {
        const validationErrors = {};
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      });
  };
  
  const handleSignInClick = () => {
    navigate('/login');
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography component="h2" variant="h2">
              New account
            </Typography>
          </Box>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                   required
                  fullWidth
                  id="AdminName"
                  label="Admin Name"
                  autoFocus
                  value={AdminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  error={!!errors.AdminName}
                  helperText={errors.AdminName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="CompanyName"
                  label="Company Name"
                  value={CompanyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  error={!!errors.CompanyName}
                  helperText={errors.CompanyName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Email"
                  label="Email Address"
                  name="Email"
                  autoComplete="email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!errors.Email}
                  helperText={errors.Email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="Password"
                  autoComplete="new-password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!errors.Password}
                  helperText={errors.Password}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="Agree" color="primary" />}
                  label={
                    <span>
                      Creating an account means that you are okay with our{' '}
                      <a href="#" style={{ color: 'purple' }}>Terms of Service</a>,{' '}
                      <a href="#" style={{ color: 'purple' }}>Privacy Policy</a> and our{' '}
                      <a href="#" style={{ color: 'purple' }}>Default Notification Settings</a>.
                    </span>
                  }
                />
              </Grid>
            </Grid>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
  <Button
    type="submit"
    fullWidth
    variant="contained"
    sx={{ mt: 3, mb: 2, width: 'calc(50% - 5px)' }} // 5px accounts for margin
    style={{ backgroundColor: '#BE4A31', color: '#FFFFFF' }}
  >
    Sign up
  </Button>
  <Button
    fullWidth
    variant="outlined"
    color="primary"
    onClick={handleSignInClick}
    sx={{ mt: 3, mb: 2, width: 'calc(50% - 5px)' }} // 5px accounts for margin
  >
    Sign In Instead
  </Button>
</div>

          </Box>
        </Box>
        <Footer />
      </Container>
    </ThemeProvider>
  );
}
