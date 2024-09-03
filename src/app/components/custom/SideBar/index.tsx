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
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.primary.main
  }
}))

const CustomListItem: React.FC<any> = (props) => {
    return (
        <ListItem component={props.component} to={props.to} onClick={props.onClick}
            sx={{
                color: 'inherit', // Inherit the color from the parent or set a fixed color
                '&:focus, &:active': {
                color: 'inherit', // Prevent color change on focus and active states
                },
                textDecoration: 'none', // Remove underline if present
            }}
        >{props.children}
        </ListItem>
    );
};
  

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
                <CustomListItem component={Link} to="/sport_schools/list">
                    <ListItemIcon>
                        <Business sx={{ color: "secondary.main" }}/>
                    </ListItemIcon>
                    <ListItemText primary="Escuelas" />
                </CustomListItem>
                <CustomListItem onClick={() => handleClick(athletesOpen, setAthletesOpen)}>
                    <ListItemIcon>
                        <People sx={{ color: "secondary.main" }}/>
                    </ListItemIcon>
                    <ListItemText primary="Atletas" />
                    {athletesOpen ? <ExpandLess /> : <ExpandMore />}
                </CustomListItem>
                <Collapse in={athletesOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <CustomListItem component={Link} to="/athletes/list" sx={{ pl: 4 }}>
                            <ListItemText primary="Gestión" />
                        </CustomListItem>
                        <CustomListItem component={Link} to="/athletes/historic" sx={{ pl: 4 }}>
                            <ListItemText primary="Histórico" />
                        </CustomListItem>
                    </List>
                </Collapse>
                <CustomListItem onClick={() => handleClick(groupsOpen, setGroupsOpen)}>
                    <ListItemIcon>
                        <FitnessCenter sx={{ color: "secondary.main" }}/>
                    </ListItemIcon>
                    <ListItemText primary="Grupos de entrenamiento" />
                    {groupsOpen ? <ExpandLess /> : <ExpandMore />}
                </CustomListItem>
                <Collapse in={groupsOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <CustomListItem component={Link} to="/groups/list" sx={{ pl: 4 }}>
                            <ListItemText primary="Gestión" />
                        </CustomListItem>
                        { (isAdmin() || isManager() ) && <>
                            <CustomListItem component={Link} to="/groups/swap" sx={{ pl: 4 }}>
                                <ListItemText primary="Intercambio Masivo" />
                            </CustomListItem>
                            <CustomListItem component={Link} to="/schedules/list" sx={{ pl: 4 }}>
                                <ListItemText primary="Horarios" />
                            </CustomListItem>
                            <CustomListItem component={Link} to="/trainers/list" sx={{ pl: 4 }}>
                                <ListItemText primary="Entrenadores" />
                            </CustomListItem>
                        </> }
                    </List>
                </Collapse>
                
                <CustomListItem onClick={() => handleClick(listingsOpen, setListingsOpen)}>
                    <ListItemIcon>
                        <Assignment sx={{ color: "secondary.main" }}/>
                    </ListItemIcon>
                    <ListItemText primary="Listados" />
                    {listingsOpen ? <ExpandLess /> : <ExpandMore />}
                </CustomListItem>
                <Collapse in={listingsOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <CustomListItem component={Link} to="/groups/attendance" sx={{ pl: 4 }}>
                            <ListItemText primary="Asistencia" />
                        </CustomListItem>
                        <CustomListItem component={Link} to="/groups/athletes" sx={{ pl: 4 }}>
                            <ListItemText primary="Atletas-Grupos" />
                        </CustomListItem>
                    </List>
                </Collapse>
                { (isAdmin() || isManager()) && <>
                    <CustomListItem onClick={() => handleClick(receiptsOpen, setReceiptsOpen)}>
                        <ListItemIcon>
                            <Receipt sx={{ color: "secondary.main" }}/>
                        </ListItemIcon>
                        <ListItemText primary="Recibos" />
                        {receiptsOpen ? <ExpandLess /> : <ExpandMore />}
                    </CustomListItem>
                    <Collapse in={receiptsOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <CustomListItem component={Link} to="/receipts/list" sx={{ pl: 4 }}>
                                <ListItemText primary="Remesas" />
                            </CustomListItem>
                            <CustomListItem component={Link} to="/receipts/returned/list" sx={{ pl: 4 }}>
                                <ListItemText primary="Recibos devueltos" />
                            </CustomListItem>
                            <CustomListItem component={Link} to="/receipts/not_paid/list" sx={{ pl: 4 }}>
                                <ListItemText primary="Recibos no pagados" />
                            </CustomListItem>
                        </List>
                    </Collapse>
                </> }
                <CustomListItem component={Link} to="/incidences/list">
                    <ListItemIcon>
                        <Sports sx={{ color: "secondary.main" }}/>
                    </ListItemIcon>
                    <ListItemText primary="Incidencias" />
                </CustomListItem>
                <CustomListItem component={Link} to="/communication">
                    <ListItemIcon>
                        <Message sx={{ color: "secondary.main" }}/>
                    </ListItemIcon>
                    <ListItemText primary="Comunicacion" />
                </CustomListItem>
                { (isAdmin() || isManager()) && <>
                    <CustomListItem onClick={() => handleClick(adminOpen, setAdminOpen)}>
                        <ListItemIcon>
                            <Receipt sx={{ color: "secondary.main" }}/>
                        </ListItemIcon>
                        <ListItemText primary="Admin" />
                        {adminOpen ? <ExpandLess /> : <ExpandMore />}
                    </CustomListItem>
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
                <CustomListItem component={Link} to={"/users/" + getUserId()}>
                    <ListItemIcon >
                        <AccountCircle sx={{ color: "secondary.main" }}/>
                    </ListItemIcon>
                    <ListItemText primary="Perfil" />
                </CustomListItem>
                <ListItem onClick={logout}>
                    <ListItemIcon>
                        <ExitToApp sx={{ color: "secondary.main" }}/>
                    </ListItemIcon>
                    <ListItemText primary="Salir" />
                </ListItem>
            </List>
        </StyledDrawer>
    );
};

export default Sidebar;