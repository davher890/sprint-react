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

const CustomAppBar: React.FC = (props) => {
    const [athletesAnchorEl, setAthletesAnchorEl] =
        useState<null | HTMLElement>(null);
    const [groupsAnchorEl, setGroupsAnchorEl] = useState<null | HTMLElement>(
        null
    );
    const [listingsAnchorEl, setListingsAnchorEl] =
        useState<null | HTMLElement>(null);
    const [receiptsAnchorEl, setReceiptsAnchorEl] =
        useState<null | HTMLElement>(null);

    const handleMenuOpen = (
        event: React.MouseEvent<HTMLElement>,
        setAnchorEl: React.Dispatch<React.SetStateAction<null | HTMLElement>>
    ) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (
        setAnchorEl: React.Dispatch<React.SetStateAction<null | HTMLElement>>
    ) => {
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
                    <MenuItem component={RouterLink} to="/athletes/list">
                        Gestión
                    </MenuItem>
                    <MenuItem component={RouterLink} to="/athletes/historic">
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
                    <MenuItem component={RouterLink} to="/groups/list">
                        Gestión
                    </MenuItem>
                    <MenuItem component={RouterLink} to="/groups/swap">
                        Intercambio Masivo
                    </MenuItem>
                    <MenuItem component={RouterLink} to="/schedules/list">
                        Horarios
                    </MenuItem>
                    <MenuItem component={RouterLink} to="/trainers/list">
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
                    <MenuItem component={RouterLink} to="/groups/attendance">
                        Asistencia
                    </MenuItem>
                    <MenuItem component={RouterLink} to="/groups/athletes">
                        Atletas-Grupos
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
                    <MenuItem component={RouterLink} to="/receipts/list">
                        Remesas
                    </MenuItem>
                    <MenuItem
                        component={RouterLink}
                        to="/receipts/returned/list"
                    >
                        Recibos devueltos
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
