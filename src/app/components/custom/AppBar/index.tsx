import * as React from "react";
import { AppBar, Toolbar, Menu, MenuItem, Typography, Link } from '@material-ui/core';

const CustomAppBar: React.FC<any> = (props) => {

    const [groupsAnchorEl, setGroupsAnchorEl] = React.useState<any | null>();
    const [listingsAnchorEl, setListingsAnchorEl] = React.useState<any | null>();
    
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
                    <Typography variant="button" aria-controls="groups-menu" aria-haspopup="true" onClick={handleGroupsMenuClick}>
                        <Link color="inherit">Grupos</Link>
                    </Typography>
                    <Menu id="groups-menu"
                            anchorEl={groupsAnchorEl}
                            keepMounted
                            open={Boolean(groupsAnchorEl)}
                            onClose={handleGroupsMenuClose}>
                        <MenuItem><Link href="/groups/list">Listado</Link></MenuItem>
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

export default CustomAppBar;