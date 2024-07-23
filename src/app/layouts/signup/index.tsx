import React from "react";
import { connect } from "react-redux";

// import { signUp } from "../../redux/actions/login"

import { Container, Typography, Box, Paper } from '@mui/material';

import Button from '../../components/custom/Button'
import TextField from '../../components/custom/TextField'

import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Debe ser un correo electrónico válido')
    .required('El correo electrónico es obligatorio'),
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .required('La contraseña es obligatoria'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Las contraseñas deben coincidir')
    .required('Confirmar contraseña es obligatorio'),
  userName: Yup.string()
    .required('El nombre de usuario es obligatorio')
});

const SignupForm: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      userName: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography component="h1" variant="h5" align="center">
          Registro
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Correo Electrónico"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
          />
          <TextField
            fullWidth
            id="userName"
            name="userName"
            label="Nombre de Usuario"
            value={formik.values.userName}
            onChange={formik.handleChange}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            helperText={formik.touched.userName && formik.errors.userName}
            margin="normal"
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Contraseña"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            margin="normal"
          />
          <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirmar Contraseña"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            margin="normal"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
          >
            Registrarse
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};



const mapDispatchToProps = {
    // signUp
}

const mapStateToProps = (state: any) => {
    return { 
        login: state.auth_reducer.login
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignupForm);
