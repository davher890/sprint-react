import React from "react";
import { AppBar, Toolbar, Menu, MenuItem, Typography, Link } from '@material-ui/core';

export default (props) => {

    const [trainersAnchorEl, setTrainersAnchorEl] = React.useState(null);
    const [listingsAnchorEl, setListingsAnchorEl] = React.useState(null);
    
    const handleListingsMenuClick = (event) => {
        setListingsAnchorEl(event.currentTarget);
    };
  
    const handleListingsMenuClose = () => {
        setListingsAnchorEl(null);
    };

    const handleTrainersMenuClick = (event) => {
        setTrainersAnchorEl(event.currentTarget);
    };
  
    const handleTrainersMenuClose = () => {
        setTrainersAnchorEl(null);
    };

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                {/* <Grid direction="row"> */}
                    <Typography variant="button">
                        Sprint
                    </Typography>
                    <Typography variant="button">
                        <Link href="/sport_schools/list" color="inherit">Escuelas</Link>
                    </Typography>
                    <Typography variant="button">
                        <Link href="/athletes/list" color="inherit">Atletas</Link>
                    </Typography>
                    <Typography variant="button" aria-controls="trainers-menu" aria-haspopup="true" onClick={handleTrainersMenuClick}>
                        <Link color="inherit">Entrenadores</Link>
                    </Typography>
                    <Menu id="trainers-menu"
                            anchorEl={trainersAnchorEl}
                            keepMounted
                            open={Boolean(trainersAnchorEl)}
                            onClose={handleTrainersMenuClose}>
                        <MenuItem><Link href="/trainers/list">Listado</Link></MenuItem>
                        <MenuItem><Link href="/groups/list">Grupos</Link></MenuItem>
                        <MenuItem><Link href="/schedules/list">Horarios</Link></MenuItem>
                    </Menu>
                    <Typography variant="button" aria-controls="listings-menu" aria-haspopup="true" onClick={handleListingsMenuClick}>
                        <Link color="inherit">Listados</Link>
                    </Typography>
                    <Menu id="listings-menu"
                            anchorEl={listingsAnchorEl}
                            keepMounted
                            open={Boolean(listingsAnchorEl)}
                            onClose={handleListingsMenuClose}
                    >
                        <MenuItem><Link href="/groups/attendance">Asistencia</Link></MenuItem>
                        <MenuItem><Link href="/athletes/historic">Histórico</Link></MenuItem>
                        <MenuItem><Link href="/groups/athletes">Atletas-Grupos</Link></MenuItem>
                    </Menu>
                    {/* <Typography variant="h6">
                        <Link href="/families/list">Familias</Link>
                    </Typography> */}
                {/* </Grid> */}
            </Toolbar>
        </AppBar>
    )
}