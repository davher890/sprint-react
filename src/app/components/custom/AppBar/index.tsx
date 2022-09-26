import * as React from "react";
import { AppBar, Toolbar, Menu, MenuItem, Typography, Link, IconButton } from '@material-ui/core';
import { Link as Link1 } from "react-router-dom";
import AccountCircle from '@material-ui/icons/AccountCircle';

import * as LoginService from '../../../services/LoginService'

const CustomAppBar: React.FC<any> = (props) => {

    const [groupsAnchorEl, setGroupsAnchorEl] = React.useState<any | null>();
    const [listingsAnchorEl, setListingsAnchorEl] = React.useState<any | null>();
    const [athletesAnchorEl, setAthletesAnchorEl] = React.useState<any | null>();
    
    const handleAthletesMenuClick = (event: any) => {
        setAthletesAnchorEl(event.currentTarget);
    };
  
    const handleAthletesMenuClose = () => {
        setAthletesAnchorEl(null);
    };

    const handleListingsMenuClick = (event: any) => {
        setListingsAnchorEl(event.currentTarget);
    };
  
    const handleListingsMenuClose = () => {
        setListingsAnchorEl(null);
    };

    const handleGroupsMenuClick = (event: any) => {
        setGroupsAnchorEl(event.currentTarget);
    };
  
    const handleGroupsMenuClose = () => {
        setGroupsAnchorEl(null);
    };

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="button">
                    <Link href="/sport_schools/list" color="inherit">Escuelas</Link>
                </Typography>
                
                <Typography variant="button" aria-controls="athletes-menu" aria-haspopup="true" onClick={handleAthletesMenuClick}>
                    <Link color="inherit">Atletas</Link>
                </Typography>
                <Menu id="athletes-menu"
                        anchorEl={athletesAnchorEl}
                        keepMounted
                        open={Boolean(athletesAnchorEl)}
                        onClose={handleAthletesMenuClose}>
                    <MenuItem component={Link1} to="/athletes/list">Gestión</MenuItem>
                    <MenuItem component={Link1} to="/athletes/historic">Histórico</MenuItem>
                </Menu>

                <Typography variant="button" aria-controls="groups-menu" aria-haspopup="true" onClick={handleGroupsMenuClick}>
                    <Link color="inherit">Grupos de entrenamiento</Link>
                </Typography>
                <Menu id="groups-menu"
                        anchorEl={groupsAnchorEl}
                        keepMounted
                        open={Boolean(groupsAnchorEl)}
                        onClose={handleGroupsMenuClose}>
                    <MenuItem component={Link1} to="/groups/list">Gestión</MenuItem>
                    { (LoginService.isAdmin() || LoginService.isManager()) && <MenuItem component={Link1} to="/groups/swap">Intercambio Masivo</MenuItem> }
                    { (LoginService.isAdmin() || LoginService.isManager()) &&<MenuItem component={Link1} to="/schedules/list">Horarios</MenuItem> }
                    { (LoginService.isAdmin() || LoginService.isManager()) && <MenuItem component={Link1} to="/trainers/list">Entrenadores</MenuItem> }
                </Menu>
                <Typography variant="button" aria-controls="listings-menu" aria-haspopup="true" onClick={handleListingsMenuClick}>
                    Listados
                </Typography>
                <Menu id="listings-menu"
                        anchorEl={listingsAnchorEl}
                        keepMounted
                        open={Boolean(listingsAnchorEl)}
                        onClose={handleListingsMenuClose}
                >
                    <MenuItem component={Link1} to="/groups/attendance">Asistencia</MenuItem>
                    <MenuItem component={Link1} to="/groups/athletes">Atletas-Grupos</MenuItem>
                </Menu>
                { (LoginService.isAdmin() || LoginService.isManager()) &&
                    <Typography variant="button" component={Link1} to="/admin/users/list" color="inherit">Usuarios</Typography>
                }
                {/* { (LoginService.isAdmin() || LoginService.isManager()) &&
                    <Typography variant="button" component={Link1} to="/admin/payments" color="inherit">Pagos</Typography>
                } */}
                { LoginService.isAdmin() &&
                    <Typography variant="button" component={Link1} to="/receipts/list" color="inherit">Recibos</Typography>
                }
                <Typography variant="button" component={Link1} to="/incidences/list" color="inherit">Incidencias</Typography>
                {/* <Typography variant="button">
                    <Link href="/social" color="inherit">Red Social</Link>
                </Typography> */}
                <IconButton
                    // size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    href={"/users/" + LoginService.getUserId()}
                    // onClick={handleMenu}
                    color="inherit"
                >   
                    <AccountCircle />
                </IconButton>
                
            </Toolbar>
        </AppBar>
    )
}

export default CustomAppBar;