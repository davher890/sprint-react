import React from "react";

import {
    AppBar,
    Toolbar,
    Typography,
    Link as MuiLink,
    Grid
} from "@mui/material";
import LoginForm from "../LoginForm";

import Button from '../Button'
import { Link } from 'react-scroll';

const CustomAppBar: React.FC = () => {

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Grid container>
                    <Grid container xs={2}alignItems="center" justifyContent="center" >
                        <Typography variant="h6" component="div">
                            <MuiLink href="/home" underline="none" color="secondary">
                                Sport Clubs Manager
                            </MuiLink>
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Link to="features" smooth={true} duration={700}>
                            <Button color="secondary">Características</Button>
                        </Link>
                        <Link to="benefits" smooth={true} duration={700}>
                            <Button color="secondary">Beneficios</Button>
                        </Link>
                        <Link to="pricing" smooth={true} duration={700}>
                            <Button color="secondary">Precios</Button>
                        </Link>
                        <Link to="contact" smooth={true} duration={700}>
                            <Button color="secondary">Contacto</Button>
                        </Link>
                    </Grid>
                    <Grid item xs>
                        <LoginForm/>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default CustomAppBar;
