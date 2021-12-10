import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

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
import Login from './components/login';

import CustomAppBar from './components/custom/AppBar'

import GroupAthletesTable from './components/listings/GroupAthletesTable';
import GroupAttendance from './components/listings/GroupAttendance';
import { Box } from '@material-ui/core';



const AppBar: React.FC<any> = (props) => {

  return (
    <Router>
        <Switch>

          <Route exact path="/login" render={(props) => <div><Box ml='35%' mr='45%' m="15%"><Login/></Box></div>}/>

          <Route exact path="/sport_schools/list" render={(props) => <div><CustomAppBar /><Box m="2%"><SportSchoolTable {...props}/></Box></div>}/>

          <Route exact path="/sport_schools/:id" render={(props) => <div><CustomAppBar /><Box m="2%"><SportSchoolData {...props}/></Box></div>}/>

          <Route exact path="/sport_schools" render={(props) => <div><CustomAppBar /><Box m="2%"><SportSchoolData {...props}/></Box></div>}/>

          <Route path="/families/list" render={(props) => <div><CustomAppBar /><Box m="2%"><FamilyTable {...props}/></Box></div>}/>

          <Route path="/families/:id" render={(props) => <div><CustomAppBar/><Box m="2%"><FamilyData {...props}/></Box></div>}/>

          <Route path="/families" render={(props) => <div><CustomAppBar/><Box m="2%"><FamilyData {...props}/></Box></div>}/>

          <Route path="/athletes/list" render={(props) => <div><CustomAppBar/><Box m="2%"><AthleteTable {...props}/></Box></div>}/>

          <Route exact path="/athletes/:id/historic" render={(props) => <div><CustomAppBar /><Box m="2%"><AthleteData {...props}/></Box></div>}/>

          <Route exact path="/athletes/:id/sport_data" render={(props) => <div><CustomAppBar /><Box m="2%"><AthleteSportdata {...props}/></Box></div>}/>
          
          <Route exact path="/athletes/historic" render={(props) => <div><CustomAppBar /><Box m="2%"><HistoricTable {...props}/></Box></div>}/>

          <Route exact path="/athletes/:id" render={(props) => <div><CustomAppBar /><Box m="2%"><AthleteData {...props}/></Box></div>}/>

          <Route exact path="/athletes" render={(props) => <div><CustomAppBar /><Box m="2%"><AthleteData {...props}/></Box></div>}/>

          <Route exact path="/groups/attendance" render={(props) => <div><CustomAppBar /><Box m="2%"><GroupAttendance {...props}/></Box></div>}/>

          <Route exact path="/groups/athletes" render={(props) => <div><CustomAppBar /><Box m="2%"><GroupAthletesTable {...props}/></Box></div>}/>
          
          <Route exact path="/groups/list" render={(props) => <div><CustomAppBar /><Box m="2%"><GroupTable {...props}/></Box></div>}/>

          <Route exact path="/groups/:id" render={(props) => <div><CustomAppBar /><Box m="2%"><GroupData {...props}/></Box></div>}/>

          <Route exact path="/groups" render={(props) => <div><CustomAppBar /><Box m="2%"><GroupData {...props}/></Box></div>}/>
          
          <Route exact path="/schedules/list" render={(props) => <div><CustomAppBar /><Box m="2%"><ScheduleTable {...props}/></Box></div>}/>

          <Route exact path="/schedules/:id" render={(props) => <div><CustomAppBar /><Box m="2%"><ScheduleData {...props}/></Box></div>}/>

          <Route exact path="/schedules" render={(props) => <div><CustomAppBar /><Box m="2%"><ScheduleData {...props}/></Box></div>}/>
          
          <Route exact path="/trainers/list" render={(props) => <div><CustomAppBar /><Box m="2%"><TrainerTable {...props}/></Box></div>}/>

          <Route exact path="/trainers/:id" render={(props) => <div><CustomAppBar /><Box m="2%"><TrainerData {...props}/></Box></div>}/>

          <Route exact path="/trainers" render={(props) => <div><CustomAppBar /><Box m="2%"><TrainerData {...props}/></Box></div>}/>

        </Switch>
    </Router>
  );
}

export default AppBar