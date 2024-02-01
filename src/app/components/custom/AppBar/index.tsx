import React, { useState } from "react";

import {
    AppBar,
    Toolbar,
    Menu,
    MenuItem,
    IconButton,
    Button,
    Avatar,
} from "@material-ui/core";

import { Link as RouterLink } from "react-router-dom";

import {
    AccountCircle,
    ArrowDropDown,
    Business,
    FitnessCenter,
    Sports,
    People,
    Assignment,
    Receipt,
} from "@material-ui/icons";

import * as LoginService from "../../../services/LoginService";

const CustomAppBar: React.FC = () => {
    const [athletesAnchorEl, setAthletesAnchorEl] = useState<null | HTMLElement>(null);
    const [groupsAnchorEl, setGroupsAnchorEl] = useState<null | HTMLElement>(null);
    const [listingsAnchorEl, setListingsAnchorEl] = useState<null | HTMLElement>(null);
    const [receiptsAnchorEl, setReceiptsAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, setAnchorEl: React.Dispatch<React.SetStateAction<null | HTMLElement>>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (setAnchorEl: React.Dispatch<React.SetStateAction<null | HTMLElement>>) => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Button
                    component={RouterLink}
                    to="/sport_schools/list"
                    startIcon={<Business />}
                >
                    Escuelas
                </Button>

                <Button
                    onClick={(event) =>
                        handleMenuOpen(event, setAthletesAnchorEl)
                    }
                    startIcon={<People />}
                    endIcon={<ArrowDropDown />}
                >
                    Atletas
                </Button>
                <Menu
                    anchorEl={athletesAnchorEl}
                    open={Boolean(athletesAnchorEl)}
                    onClose={() => handleMenuClose(setAthletesAnchorEl)}
                >
                    <MenuItem component={RouterLink} onClick={() => handleMenuClose(setAthletesAnchorEl)} to="/athletes/list">
                        Gestión
                    </MenuItem>
                    <MenuItem component={RouterLink} onClick={() => handleMenuClose(setAthletesAnchorEl)} to="/athletes/historic">
                        Histórico
                    </MenuItem>
                </Menu>

                <Button
                    onClick={(event) =>
                        handleMenuOpen(event, setGroupsAnchorEl)
                    }
                    startIcon={<FitnessCenter />}
                    endIcon={<ArrowDropDown />}
                >
                    Grupos de entrenamiento
                </Button>
                <Menu
                    anchorEl={groupsAnchorEl}
                    open={Boolean(groupsAnchorEl)}
                    onClose={() => handleMenuClose(setGroupsAnchorEl)}
                >
                    <MenuItem component={RouterLink} onClick={() => handleMenuClose(setGroupsAnchorEl)} to="/groups/list">
                        Gestión
                    </MenuItem>
                    <MenuItem component={RouterLink} onClick={() => handleMenuClose(setGroupsAnchorEl)} to="/groups/swap">
                        Intercambio Masivo
                    </MenuItem>
                    <MenuItem component={RouterLink} onClick={() => handleMenuClose(setGroupsAnchorEl)} to="/schedules/list">
                        Horarios
                    </MenuItem>
                    <MenuItem component={RouterLink} onClick={() => handleMenuClose(setGroupsAnchorEl)} to="/trainers/list">
                        Entrenadores
                    </MenuItem>
                </Menu>

                <Button
                    onClick={(event) =>
                        handleMenuOpen(event, setListingsAnchorEl)
                    }
                    startIcon={<Assignment />}
                    endIcon={<ArrowDropDown />}
                >
                    Listados
                </Button>
                <Menu
                    anchorEl={listingsAnchorEl}
                    open={Boolean(listingsAnchorEl)}
                    onClose={() => handleMenuClose(setListingsAnchorEl)}
                >
                    <MenuItem component={RouterLink} onClick={() => handleMenuClose(setListingsAnchorEl)} to="/groups/attendance">
                        Asistencia
                    </MenuItem>
                    <MenuItem component={RouterLink} onClick={() => handleMenuClose(setListingsAnchorEl)} to="/groups/athletes">
                        Atletas-Grupos
                    </MenuItem>
                    <MenuItem component={RouterLink} onClick={() => handleMenuClose(setListingsAnchorEl)} to="/licenses">
                        Licencias
                    </MenuItem>
                </Menu>

                <Button
                    onClick={(event) =>
                        handleMenuOpen(event, setReceiptsAnchorEl)
                    }
                    startIcon={<Receipt />}
                    endIcon={<ArrowDropDown />}
                >
                    Recibos
                </Button>
                <Menu
                    anchorEl={receiptsAnchorEl}
                    open={Boolean(receiptsAnchorEl)}
                    onClose={() => handleMenuClose(setReceiptsAnchorEl)}
                >
                    <MenuItem component={RouterLink} onClick={() => handleMenuClose(setReceiptsAnchorEl)} to="/receipts/list">
                        Remesas
                    </MenuItem>
                    <MenuItem
                        component={RouterLink}
                        onClick={() => handleMenuClose(setReceiptsAnchorEl)}
                        to="/receipts/returned/list"
                    >
                        Recibos devueltos
                    </MenuItem>
                    <MenuItem
                        component={RouterLink}
                        onClick={() => handleMenuClose(setReceiptsAnchorEl)}
                        to="/receipts/not_paid/list"
                    >
                        Recibos no pagados
                    </MenuItem>
                </Menu>

                <Button
                    component={RouterLink}
                    to="/incidences/list"
                    startIcon={<Sports />}
                >
                    Incidencias
                </Button>

                <IconButton
                    component={RouterLink}
                    to={"/users/" + LoginService.getUserId()}
                >
                    <Avatar>
                        <AccountCircle />
                    </Avatar>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default CustomAppBar;
