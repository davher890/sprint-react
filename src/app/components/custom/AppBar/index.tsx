import * as React from "react";
import { AppBar, Toolbar, Menu, MenuItem, Typography, Link } from '@material-ui/core';

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
                    <MenuItem><Link href="/athletes/list">Gestión</Link></MenuItem>
                    <MenuItem><Link href="/athletes/historic">Histórico</Link></MenuItem>
                </Menu>

                <Typography variant="button" aria-controls="groups-menu" aria-haspopup="true" onClick={handleGroupsMenuClick}>
                    <Link color="inherit">Grupos de entrenamiento</Link>
                </Typography>
                <Menu id="groups-menu"
                        anchorEl={groupsAnchorEl}
                        keepMounted
                        open={Boolean(groupsAnchorEl)}
                        onClose={handleGroupsMenuClose}>
                    <MenuItem><Link href="/groups/list">Gestión</Link></MenuItem>
                    <MenuItem><Link href="/groups/swap">Intercambio Masivo</Link></MenuItem>
                    <MenuItem><Link href="/schedules/list">Horarios</Link></MenuItem>
                    <MenuItem><Link href="/trainers/list">Entrenadores</Link></MenuItem>
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
                    <MenuItem><Link href="/groups/athletes">Atletas-Grupos</Link></MenuItem>
                </Menu>
                {/* <Typography variant="button">
                    <Link href="/users/list" color="inherit">Usuarios</Link>
                </Typography>
                <Typography variant="button">
                    <Link href="/social" color="inherit">Red Social</Link>
                </Typography> */}
                
            </Toolbar>
        </AppBar>
    )
}

export default CustomAppBar;