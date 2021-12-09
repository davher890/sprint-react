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

          <Route exact path="/login" component={Login}/>

          <Route exact path="/sport_schools/list" render={(props) => <div><CustomAppBar /><Box m="2%" display="flex"><SportSchoolTable {...props}/></Box></div>}/>

          <Route exact path="/sport_schools/:id" render={(props) => <div><CustomAppBar /><Box m="2%" display="flex"><SportSchoolData {...props}/></Box></div>}/>

          <Route exact path="/sport_schools" render={(props) => <div><CustomAppBar /><Box m="2%" display="flex"><SportSchoolData {...props}/></Box></div>}/>

          <Route path="/families/list" render={(props) => <div><CustomAppBar /><Box m="2%" display="flex"><FamilyTable {...props}/></Box></div>}/>

          <Route path="/families/:id" render={(props) => <div><CustomAppBar/><Box m="2%" display="flex"><FamilyData {...props}/></Box></div>}/>

          <Route path="/families" render={(props) => <div><CustomAppBar/><Box m="2%" display="flex"><FamilyData {...props}/></Box></div>}/>

          <Route path="/athletes/list" render={(props) => <div><CustomAppBar/><Box m="2%" display="flex"><AthleteTable {...props}/></Box></div>}/>

          <Route exact path="/athletes/:id/historic" render={(props) => <div><CustomAppBar /><Box m="2%" display="flex"><AthleteData {...props}/></Box></div>}/>

          <Route exact path="/athletes/:id/sport_data" render={(props) => <div><CustomAppBar /><Box m="2%" display="flex"><AthleteSportdata {...props}/></Box></div>}/>
          
          <Route exact path="/athletes/historic" render={(props) => <div><CustomAppBar /><Box m="2%" display="flex"><HistoricTable {...props}/></Box></div>}/>

          <Route exact path="/athletes/:id" render={(props) => <div><CustomAppBar /><Box m="2%" display="flex"><AthleteData {...props}/></Box></div>}/>

          <Route exact path="/athletes" render={(props) => <div><CustomAppBar /><Box m="2%" display="flex"><AthleteData {...props}/></Box></div>}/>

          <Route exact path="/groups/attendance" render={(props) => <div><CustomAppBar /><Box m="2%" display="flex"><GroupAttendance {...props}/></Box></div>}/>

          <Route exact path="/groups/athletes" render={(props) => <div><CustomAppBar /><Box m="2%" display="flex"><GroupAthletesTable {...props}/></Box></div>}/>
          
          <Route exact path="/groups/list" render={(props) => <div><CustomAppBar /><Box m="2%" display="flex"><GroupTable {...props}/></Box></div>}/>

          <Route exact path="/groups/:id" render={(props) => <div><CustomAppBar /><Box m="2%" display="flex"><GroupData {...props}/></Box></div>}/>

          <Route exact path="/groups" render={(props) => <div><CustomAppBar /><Box m="2%" display="flex"><GroupData {...props}/></Box></div>}/>
          
          <Route exact path="/schedules/list" render={(props) => <div><CustomAppBar /><Box m="2%" display="flex"><ScheduleTable {...props}/></Box></div>}/>

          <Route exact path="/schedules/:id" render={(props) => <div><CustomAppBar /><Box m="2%" display="flex"><ScheduleData {...props}/></Box></div>}/>

          <Route exact path="/schedules" render={(props) => <div><CustomAppBar /><Box m="2%" display="flex"><ScheduleData {...props}/></Box></div>}/>
          
          <Route exact path="/trainers/list" render={(props) => <div><CustomAppBar /><Box m="2%" display="flex"><TrainerTable {...props}/></Box></div>}/>

          <Route exact path="/trainers/:id" render={(props) => <div><CustomAppBar /><Box m="2%" display="flex"><TrainerData {...props}/></Box></div>}/>

          <Route exact path="/trainers" render={(props) => <div><CustomAppBar /><Box m="2%" display="flex"><TrainerData {...props}/></Box></div>}/>

        </Switch>
    </Router>
  );
}

export default AppBar