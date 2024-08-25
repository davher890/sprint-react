import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';

import { Link } from 'react-router-dom';

import { styled } from '@mui/material/styles';

import {
    AccountCircle,
    Assignment,
    Business,
    ExitToApp,
    ExpandLess,
    ExpandMore,
    FitnessCenter,
    Message,
    People,
    Sports,
    Receipt,
} from "@mui/icons-material";

import { isManager, isAdmin, getUserId } from "../../../services/LoginService";

import session from "../../../utils/Session";

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
}));

const Sidebar: React.FC = () => {
    
    const [athletesOpen, setAthletesOpen] = useState(false);
    const [groupsOpen, setGroupsOpen] = useState(false);
    const [listingsOpen, setListingsOpen] = useState(false);
    const [receiptsOpen, setReceiptsOpen] = useState(false);
    const [adminOpen, setAdminOpen] = useState(false);

    const handleClick = (st:any, setSt:any) => {
        setSt(!st);
    };

    const logout = (e:any) => {
        e.preventDefault()
        // handleMenuClose(setProfileAnchorEl)
        session.clear()
        window.open("/home", "_self")
    }

    return (
        <StyledDrawer
            variant="permanent"
            anchor="left"
        >
            <List>
                <ListItem component={Link} to="/sport_schools/list">
                    <ListItemIcon>
                        <Business />
                    </ListItemIcon>
                    <ListItemText primary="Escuelas" />
                </ListItem>
                <ListItem onClick={() => handleClick(athletesOpen, setAthletesOpen)}>
                    <ListItemIcon>
                        <People />
                    </ListItemIcon>
                    <ListItemText primary="Atletas" />
                    {athletesOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={athletesOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem component={Link} to="/athletes/list" sx={{ pl: 4 }}>
                            <ListItemText primary="Gestión" />
                        </ListItem>
                        <ListItem component={Link} to="/athletes/historic" sx={{ pl: 4 }}>
                            <ListItemText primary="Histórico" />
                        </ListItem>
                    </List>
                </Collapse>
                <ListItem onClick={() => handleClick(groupsOpen, setGroupsOpen)}>
                    <ListItemIcon>
                        <FitnessCenter />
                    </ListItemIcon>
                    <ListItemText primary="Grupos de entrenamiento" />
                    {groupsOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={groupsOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem component={Link} to="/groups/list" sx={{ pl: 4 }}>
                            <ListItemText primary="Gestión" />
                        </ListItem>
                        { (isAdmin() || isManager() ) && <>
                            <ListItem component={Link} to="/groups/swap" sx={{ pl: 4 }}>
                                <ListItemText primary="Intercambio Masivo" />
                            </ListItem>
                            <ListItem component={Link} to="/schedules/list" sx={{ pl: 4 }}>
                                <ListItemText primary="Horarios" />
                            </ListItem>
                            <ListItem component={Link} to="/trainers/list" sx={{ pl: 4 }}>
                                <ListItemText primary="Entrenadores" />
                            </ListItem>
                        </> }
                    </List>
                </Collapse>
                
                <ListItem onClick={() => handleClick(listingsOpen, setListingsOpen)}>
                    <ListItemIcon>
                        <Assignment />
                    </ListItemIcon>
                    <ListItemText primary="Listados" />
                    {listingsOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={listingsOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem component={Link} to="/groups/attendance" sx={{ pl: 4 }}>
                            <ListItemText primary="Asistencia" />
                        </ListItem>
                        <ListItem component={Link} to="/groups/athletes" sx={{ pl: 4 }}>
                            <ListItemText primary="Atletas-Grupos" />
                        </ListItem>
                    </List>
                </Collapse>
                { (isAdmin() || isManager()) && <>
                    <ListItem onClick={() => handleClick(receiptsOpen, setReceiptsOpen)}>
                        <ListItemIcon>
                            <Receipt />
                        </ListItemIcon>
                        <ListItemText primary="Recibos" />
                        {receiptsOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={receiptsOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem component={Link} to="/receipts/list" sx={{ pl: 4 }}>
                                <ListItemText primary="Remesas" />
                            </ListItem>
                            <ListItem component={Link} to="/receipts/returned/list" sx={{ pl: 4 }}>
                                <ListItemText primary="Recibos devueltos" />
                            </ListItem>
                            <ListItem component={Link} to="/receipts/not_paid/list" sx={{ pl: 4 }}>
                                <ListItemText primary="Recibos no pagados" />
                            </ListItem>
                        </List>
                    </Collapse>
                </> }
                <ListItem component={Link} to="/incidences/list">
                    <ListItemIcon>
                        <Sports />
                    </ListItemIcon>
                    <ListItemText primary="Incidencias" />
                </ListItem>
                <ListItem component={Link} to="/communication">
                    <ListItemIcon>
                        <Message />
                    </ListItemIcon>
                    <ListItemText primary="Comunicacion" />
                </ListItem>
                { (isAdmin() || isManager()) && <>
                    <ListItem onClick={() => handleClick(adminOpen, setAdminOpen)}>
                        <ListItemIcon>
                            <Receipt />
                        </ListItemIcon>
                        <ListItemText primary="Admin" />
                        {adminOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={adminOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem component={Link} to="/admin/users/list" sx={{ pl: 4 }}>
                                <ListItemText primary="Usuarios" />
                            </ListItem>
                            { isAdmin() && 
                                <ListItem component={Link} to="/admin/athletes_by_date" sx={{ pl: 4 }}>
                                    <ListItemText primary="Usuarios / dia" />
                                </ListItem>
                            }
                        </List>
                    </Collapse>
                </> }
                <ListItem component={Link} to={"/users/" + getUserId()}>
                    <ListItemIcon >
                        <AccountCircle />
                    </ListItemIcon>
                    <ListItemText primary="Perfil" />
                </ListItem>
                <ListItem>
                    <ListItemIcon onClick={logout}>
                        <ExitToApp />
                    </ListItemIcon>
                    <ListItemText primary="Salir" />
                </ListItem>
            </List>
        </StyledDrawer>
    );
};

export default Sidebar;