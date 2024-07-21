import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Paper, Box } from '@mui/material';

interface FeatureProps {
  title: string;
  desc: string;
}

interface StepProps {
  step: string;
  title: string;
  desc: string;
}

interface TestimonialProps {
  quote: string;
  name: string;
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

const testimonials: TestimonialProps[] = [
  { quote: "Esta aplicación ha revolucionado cómo gestionamos nuestro club. ¡Es fácil de usar y eficiente!", name: 'Juan Pérez, Club Deportivo ABC' },
  { quote: "Un imprescindible para cualquier club deportivo. Las características son increíblemente útiles.", name: 'Ana García, Atletismo XYZ' },
];

const Index: React.FC = () => {
  return (
    <Box>
    {/* <ThemeProvider theme={theme}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gestor de Clubes Deportivos
          </Typography>
          <Button color="secondary">Características</Button>
          <Button color="secondary">Precios</Button>
          <Button color="secondary">Testimonios</Button>
          <Button color="secondary">Sobre Nosotros</Button>
          <Button color="secondary">Contacto</Button>
        </Toolbar>
      </AppBar> */}
      <Box
        sx={{
          background: 'url(hero-image.jpg) no-repeat center center/cover',
          color: '#fff',
          textAlign: 'center',
          py: 10,
        }}
      >
        <Typography variant="h3">Gestiona Tu Club Deportivo Sin Esfuerzo</Typography>
        <Typography variant="h6" sx={{ my: 2 }}>
          La solución definitiva para gestionar atletas, entrenadores, grupos y recibos.
        </Typography>
        <Button variant="contained" color="secondary" size="large" 
          onClick={(e) => {
            window.open("/login", "_self")
          }}>
          Empezar
        </Button>
      </Box>
      <Container sx={{ my: 5 }}>
        <Typography variant="h4" color="primary" align="center" gutterBottom>
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
      <Container sx={{ my: 5 }}>
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
      <Container sx={{ my: 5 }}>
        <Typography variant="h4" color="primary" align="center" gutterBottom>
          Testimonios
        </Typography>
        <Grid container spacing={3}>
          {testimonials.map((testimonial) => (
            <Grid item xs={12} md={6} key={testimonial.name}>
              <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6" color="primary">
                  {testimonial.quote}
                </Typography>
                <Typography>{testimonial.name}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box sx={{ backgroundColor: '#f9f9f9', py: 5 }}>
        <Container>
          <Typography variant="h4" color="primary" align="center" gutterBottom>
            Precios
          </Typography>
          <Typography variant="h6" align="center" sx={{ my: 2 }}>
            Solo 30 centavos por mes por atleta.
          </Typography>
          <Typography variant="h6" align="center" sx={{ mb: 5 }}>
            Empieza con una prueba gratuita y ve los beneficios.
          </Typography>
        </Container>
      </Box>
      <Container sx={{ my: 5, textAlign: 'center' }}>
        <Typography variant="h4" color="primary" gutterBottom>
          ¿Listo para optimizar la gestión de tu club?
        </Typography>
        <Button variant="contained" color="secondary" size="large">
          Regístrate
        </Button>
      </Container>
      <footer style={{ backgroundColor: '#272727', color: '#ffe500', padding: '1em 0', textAlign: 'center' }}>
        <Typography variant="body1">&copy; 2024 Gestor de Clubes Deportivos</Typography>
        <Typography variant="body1">
          <a href="#" style={{ color: '#ffe500', textDecoration: 'none', margin: '0 1em' }}>Política de Privacidad</a>
          <a href="#" style={{ color: '#ffe500', textDecoration: 'none', margin: '0 1em' }}>Términos de Servicio</a>
          <a href="#" style={{ color: '#ffe500', textDecoration: 'none', margin: '0 1em' }}>Soporte</a>
          <a href="#" style={{ color: '#ffe500', textDecoration: 'none', margin: '0 1em' }}>Contacto</a>
        </Typography>
        <Box>
          <a href="#" style={{ color: '#ffe500', textDecoration: 'none', margin: '0 10px' }}>Facebook</a>
          <a href="#" style={{ color: '#ffe500', textDecoration: 'none', margin: '0 10px' }}>Twitter</a>
          <a href="#" style={{ color: '#ffe500', textDecoration: 'none', margin: '0 10px' }}>LinkedIn</a>
        </Box>
      </footer>
    {/* </ThemeProvider> */}
    </Box>
  );
};

export default Index;