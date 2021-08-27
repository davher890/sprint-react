import React from "react";
// import "./App.css";

import TrainerData from './components/trainers/TrainerData';
import TrainerTable from './components/trainers/TrainerTable';
import ScheduleData from './components/schedules/ScheduleData';
import ScheduleTable from './components/schedules/ScheduleTable';
import SportSchoolData from './components/sport_schools/SportSchoolData';
import SportSchoolTable from './components/sport_schools/SportSchoolTable';
import AthleteData from './components/athletes/AthleteData';
import AthleteSportdata from './components/athletes/AthleteSportdata';
import AthleteTable from './components/athletes/AthleteTable';
import HistoricTable from './components/athletes/HistoricTable';
import GroupData from './components/groups/GroupData';
import GroupTable from './components/groups/GroupTable';
import FamilyTable from './components/families/FamilyTable';
import FamilyData from './components/families/FamilyData';

import AppBar from './components/custom/AppBar'

import GroupAthletesTable from './components/listings/GroupAthletesTable';
import GroupAttendance from './components/listings/GroupAttendance';
import { Box } from '@material-ui/core';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

export default () => {

  return (
    <Router>
      <AppBar />
      <Box display="flex" m={2}>
        <Switch>
          <Route path="/sport_schools/list">
            <SportSchoolTable/>
          </Route>

          <Route exact path="/sport_schools/:id" component={SportSchoolData}/>

          <Route path="/sport_schools">
            <SportSchoolData/>
          </Route>

          <Route path="/families/list">
            <FamilyTable/>
          </Route>

          <Route path="/families/:id">
            <FamilyData/>
          </Route>

          <Route path="/families">
            <FamilyData/>
          </Route>

          <Route path="/athletes/list">
            <AthleteTable/>
          </Route>

          <Route exact path="/athletes/:id/historic" component={AthleteData} />

          <Route exact path="/athletes/:id/sport_data" component={AthleteSportdata} />
          
          <Route exact path="/athletes/historic" component={HistoricTable} />

          <Route exact path="/athletes/:id" component={AthleteData} />

          <Route exact path="/athletes" component={AthleteData} />

          <Route exact path="/groups/attendance" component={GroupAttendance}/>

          <Route exact path="/groups/athletes" component={GroupAthletesTable}/>
          
          <Route exact path="/groups/list" component={GroupTable}/>

          <Route exact path="/groups/:id" component={GroupData}/>

          <Route exact path="/groups" component={GroupData} />
          
          <Route exact path="/schedules/list" component={ScheduleTable}/>

          <Route exact path="/schedules/:id" component={ScheduleData}/>

          <Route exact path="/schedules" component={ScheduleData}/>
          
          <Route exact path="/trainers/list" component={TrainerTable}/>

          <Route exact path="/trainers/:id" component={TrainerData}/>

          <Route exact path="/trainers" component={TrainerData}/>

        </Switch>
      </Box>
    </Router>
  );
}





