import React from 'react';
import {  
  Box,
  Button, 
  Container, 
  Fab,
  Grid, 
  Paper,
  Typography
} from '@mui/material';

import ContactMailIcon from '@mui/icons-material/ContactMail';

import ContactForm from '../../components/custom/dialogs/ContactForm'

interface FeatureProps {
  title: string;
  desc: string;
}

interface StepProps {
  step: string;
  title: string;
  desc: string;
}

interface BenefitsProps {
  title: string;
  desc: string;
}

const features: FeatureProps[] = [
  { title: 'Gestión de Escuelas Deportivas', desc: 'Organiza y gestiona tus escuelas deportivas fácilmente.' },
  { title: 'Gestión de Atletas', desc: 'Rastrea y gestiona los perfiles y el rendimiento de los atletas.' },
  { title: 'Gestión de Grupos', desc: 'Crea y gestiona grupos de entrenamiento sin problemas.' },
  { title: 'Gestión de Entrenadores', desc: 'Asigna entrenadores a grupos y gestiona horarios.' },
  { title: 'Recibos y Facturación', desc: 'Maneja todas las transacciones financieras sin esfuerzo.' },
];

const steps: StepProps[] = [
  { step: 'Paso 1', title: 'Regístrate', desc: 'Crea una cuenta y configura tu club.' },
  { step: 'Paso 2', title: 'Añade Atletas y Entrenadores', desc: 'Llena tu base de datos.' },
  { step: 'Paso 3', title: 'Gestiona y Rastrea', desc: 'Usa la aplicación para gestionar las operaciones diarias.' },
  { step: 'Paso 4', title: 'Obtén Informes', desc: 'Genera informes y rastrea el progreso.' },
];

const benefits: BenefitsProps[] = [
  { title: 'Ahorro de Tiempo', desc: 'Automatiza tareas repetitivas y reduce la carga administrativa.' },
  { title: 'Accesibilidad', desc: 'Accede a tu información desde cualquier lugar y en cualquier momento.' },
  { title: 'Colaboración Mejorada', desc: 'Facilita la comunicación y colaboración entre entrenadores y atletas.' },
  { title: 'Informes Detallados', desc: 'Obtén informes detallados sobre el rendimiento de tus atletas y la gestión del club.' },
  { title: 'Seguridad de Datos', desc: 'Mantén tus datos seguros con medidas de seguridad avanzadas.' }
];

const Index: React.FC = () => {

  const [ contactFormOpen, setContactFormOpen ] = React.useState<boolean>(false)

  return (
    <Box
      component="main"
    >
      <Box
        sx={{
          background: 'url(hero-image.jpg) no-repeat center center/cover',
          color: '#fff',
          textAlign: 'center',
          py: 6,
        }}
      >
        <Typography variant="h3" color="primary">Gestiona Tu Club Deportivo Sin Esfuerzo</Typography>
        <Typography variant="h6" color="primary" sx={{ my: 1 }}>
          La solución definitiva para gestionar atletas, entrenadores, grupos y recibos.
        </Typography>
        <Button variant="contained" color="secondary" size="large" 
          onClick={(e) => {
            window.open("/signup", "_self")
          }}>
          Empezar
        </Button>
      </Box>
      <Container id="features" sx={{ my: 5 }}>
        <Typography variant="h4" color="primary" align="center" gutterBottom >
          Características
        </Typography>
        <Grid container spacing={3}>
          {features.map((feature) => (
            <Grid item xs={12} md={4} key={feature.title}>
              <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6" color="primary">
                  {feature.title}
                </Typography>
                <Typography>{feature.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container  id="how-it-works" sx={{ my: 5 }}>
        <Typography variant="h4" color="primary" align="center" gutterBottom>
          Cómo Funciona
        </Typography>
        <Grid container spacing={3}>
          {steps.map((step) => (
            <Grid item xs={12} md={3} key={step.title}>
              <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6" color="primary">
                  {step.step}
                </Typography>
                <Typography>{step.title}</Typography>
                <Typography>{step.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container id="benefits" sx={{ my: 5 }}>
        <Typography variant="h4" color="primary" align="center" gutterBottom>
          Beneficios
        </Typography>
        <Grid container spacing={3}>
          {benefits.map((benefit) => (
              <Grid item xs={12} md={4} key={benefit.title}>
                <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h6" color="primary">
                    {benefit.title}
                  </Typography>
                  <Typography>{benefit.desc}</Typography>
                </Paper>
              </Grid>
          ))}
        </Grid>
      </Container>
      <Box id="pricing" sx={{ backgroundColor: '#f9f9f9', py: 5 }}>
        <Container>
          <Typography variant="h4" color="primary" align="center" gutterBottom>
            Precios
          </Typography>
          <Typography variant="h6" align="center" sx={{ my: 2 }}>
            Solo 30 cnts por mes por atleta.
          </Typography>
          <Typography variant="h6" align="center" sx={{ mb: 5 }}>
            Empieza con una prueba gratuita y verás los beneficios.
          </Typography>
        </Container>
      </Box>
      <Container id="cta" sx={{ my: 5, textAlign: 'center' }}>
        <Typography variant="h4" color="primary" gutterBottom>
          ¿Listo para optimizar la gestión de tu club?
        </Typography>
        <Button variant="contained" color="secondary" size="large" onClick={(e) => {
            window.open("/signup", "_self")
        }}>
          Regístrate
        </Button>
      </Container>
      <Container sx={{ my: 5 }}>
        <ContactForm 
          open={contactFormOpen}
          onClose={() => {
            setContactFormOpen(false)
          }}/>
      </Container>
      <Fab
        color="primary"
        aria-label="contact"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setContactFormOpen(true) }
      >
        <ContactMailIcon />
      </Fab>
      <footer id="contact" style={{ backgroundColor: '#272727', color: '#ffe500', padding: '1em 0', textAlign: 'center' }}>
        <Typography variant="body1">&copy; 2024 Gestor de Clubes Deportivos</Typography>
        {/* <Typography variant="body1">
          <a href="#" style={{ color: '#ffe500', textDecoration: 'none', margin: '0 1em' }}>Política de Privacidad</a>
          <a href="#" style={{ color: '#ffe500', textDecoration: 'none', margin: '0 1em' }}>Términos de Servicio</a>
          <a href="#" style={{ color: '#ffe500', textDecoration: 'none', margin: '0 1em' }}>Soporte</a>
          <a href="#" style={{ color: '#ffe500', textDecoration: 'none', margin: '0 1em' }}>Contacto</a>
        </Typography>
        <Box>
          <a href="#" style={{ color: '#ffe500', textDecoration: 'none', margin: '0 10px' }}>Facebook</a>
          <a href="#" style={{ color: '#ffe500', textDecoration: 'none', margin: '0 10px' }}>Twitter</a>
          <a href="#" style={{ color: '#ffe500', textDecoration: 'none', margin: '0 10px' }}>LinkedIn</a>
        </Box> */}
      </footer>
    </Box>
  );
};

export default Index;