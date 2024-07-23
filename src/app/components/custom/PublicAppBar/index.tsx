import React from "react";

import {
    AppBar,
    Toolbar,
    Typography,
} from "@mui/material";
import LoginForm from "../LoginForm";

import Button from '../Button'
import { Link } from 'react-scroll';

const CustomAppBar: React.FC = () => {

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Gestor de Clubes Deportivos
                </Typography>
                <Link to="features" smooth={true} duration={500}>
                    <Button>Características</Button>
                </Link>
                <Link to="pricing" smooth={true} duration={500}>
                    <Button>Precios</Button>
                </Link>
                <Link to="testimonials" smooth={true} duration={500}>
                    <Button>Testimonios</Button>
                </Link>
                <Link to="about" smooth={true} duration={500}>
                    <Button>Sobre Nosotros</Button>
                </Link>
                <Link to="contact" smooth={true} duration={500}>
                    <Button>Contacto</Button>
                </Link>
                <LoginForm/>
            </Toolbar>
        </AppBar>
    );
};

export default CustomAppBar;
