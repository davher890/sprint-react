import React, { useState } from "react";

import {
    AppBar,
    Toolbar,
    Typography,
    Button,
} from "@mui/material";
import LoginForm from "../LoginForm";


const CustomAppBar: React.FC = () => {

    return (
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
                <LoginForm/>
            </Toolbar>
        </AppBar>
    );
};

export default CustomAppBar;
