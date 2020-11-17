import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { NewTrainer, Trainers } from './pages/trainers/Trainers';
import { NewSchedule, Schedules } from './pages/schedules/Schedules';
import { NewSportSchool, SportSchools } from './pages/sport_schools/SportSchools';
import { NewGroup, Groups } from './pages/groups/Groups';
import { NewFamily, Families } from './pages/families/Families';
import { NewAthlete, Athletes } from './pages/athletes/Athletes';
import { GroupListing } from './pages/listings/Listings';

import Grid from '@material-ui/core/Grid';

import { 
  Navbar, Nav, NavDropdown 
} from 'react-bootstrap';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";



export default function App() {
return (
    
      <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/">Sprint</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/sport_schools/list">Escuelas</Nav.Link>
              <Nav.Link href="/athletes/list">Atletas</Nav.Link>
              <NavDropdown title="Entrenadores" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/trainers/list">Listado</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/groups/list">Grupos</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/schedules/list">Horarios</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Listados" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/groups/attendance">Asistencia</NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
              <Nav.Link href="/families/list">Familias</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Grid container>
          <Switch>
            <Route path="/sport_schools/list">
              <SportSchools/>
            </Route>

            <Route path="/sport_schools/:id">
              <NewSportSchool/>
            </Route>

            <Route path="/sport_schools">
              <NewSportSchool/>
            </Route>

            <Route path="/families/list">
              <Families/>
            </Route>

            <Route path="/families/:id">
              <NewFamily/>
            </Route>

            <Route path="/families">
              <NewFamily/>
            </Route>

            <Route path="/athletes/list">
              <Athletes/>
            </Route>

            <Route path="/athletes/:id">
              <NewAthlete/>
            </Route>

            <Route path="/athletes">
              <NewAthlete/>
            </Route>

            <Route path="/families/list">
              <Families/>
            </Route>

            <Route path="/families/:id">
              <NewFamily/>
            </Route>

            <Route path="/families">
              <NewFamily/>
            </Route>

            <Route path="/groups/attendance">
              <GroupListing/>
            </Route>
            
            <Route path="/groups/list">
              <Groups/>
            </Route>

            <Route path="/groups/:id">
              <NewGroup/>
            </Route>

            <Route path="/groups">
              <NewGroup/>
            </Route>
            
            <Route path="/schedules/list">
              <Schedules/>
            </Route>

            <Route path="/schedules/:id">
              <NewSchedule/>
            </Route>

            <Route path="/schedules">
              <NewSchedule/>
            </Route>
            
            <Route path="/trainers/list">
              <Trainers/>
            </Route>

            <Route path="/trainers/:id">
              <NewTrainer/>
            </Route>

            <Route path="/trainers">
              <NewTrainer/>
            </Route>

          </Switch>
        </Grid>
      </Router>
  );
}





