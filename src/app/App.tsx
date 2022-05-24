import {
  BrowserRouter as Router, Routes, Route
} from "react-router-dom";

import UserData from './components/users/UserData';
import UserTable from './components/users/UserTable';
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
import GroupSwap from './components/groups/GroupSwap';
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
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/sport_schools/list" element={<div><CustomAppBar/><Box m="2%" display="flex"><SportSchoolTable/></Box></div>}/>
          <Route path="/sport_schools/:id" element={<div><CustomAppBar/><Box m="2%" display="flex"><SportSchoolData/></Box></div>}/>
          <Route path="/sport_schools" element={<div><CustomAppBar/><Box m="2%" display="flex"><SportSchoolData/></Box></div>}/>
          <Route path="/families/list" element={<div><CustomAppBar/><Box m="2%" display="flex"><FamilyTable/></Box></div>}/>
          <Route path="/families/:id" element={<div><CustomAppBar/><Box m="2%" display="flex"><FamilyData/></Box></div>}/>
          <Route path="/families" element={<div><CustomAppBar/><Box m="2%" display="flex"><FamilyData/></Box></div>}/>
          <Route path="/athletes/list" element={<div><CustomAppBar/><Box m="2%" display="flex"><AthleteTable/></Box></div>}/>
          <Route path="/athletes/:id/historic" element={<div><CustomAppBar/><Box m="2%" display="flex"><AthleteData/></Box></div>} />
          <Route path="/athletes/:id/sport_data" element={<div><CustomAppBar/><Box m="2%" display="flex"><AthleteSportdata/></Box></div>} />
          <Route path="/athletes/historic" element={<div><CustomAppBar/><Box m="2%" display="flex"><HistoricTable/></Box></div>} />
          <Route path="/athletes/:id" element={<div><CustomAppBar/><Box m="2%" display="flex"><AthleteData/></Box></div>} />
          <Route path="/athletes" element={<div><CustomAppBar/><Box m="2%" display="flex"><AthleteData/></Box></div>} />
          <Route path="/groups/attendance" element={<div><CustomAppBar/><Box m="2%" display="flex"><GroupAttendance/></Box></div>}/>
          <Route path="/groups/athletes" element={<div><CustomAppBar/><Box m="2%" display="flex"><GroupAthletesTable/></Box></div>}/>
          <Route path="/groups/swap" element={<div><CustomAppBar/><Box m="2%" display="flex"><GroupSwap/></Box></div>}/>
          <Route path="/groups/list" element={<div><CustomAppBar/><Box m="2%" display="flex"><GroupTable/></Box></div>}/>
          <Route path="/groups/:id" element={<div><CustomAppBar/><Box m="2%" display="flex"><GroupData/></Box></div>}/>
          <Route path="/groups" element={<div><CustomAppBar/><Box m="2%" display="flex"><GroupData/></Box></div>} />
          <Route path="/schedules/list" element={<div><CustomAppBar/><Box m="2%" display="flex"><ScheduleTable/></Box></div>}/>
          <Route path="/schedules/:id" element={<div><CustomAppBar/><Box m="2%" display="flex"><ScheduleData/></Box></div>}/>
          <Route path="/schedules" element={<div><CustomAppBar/><Box m="2%" display="flex"><ScheduleData/></Box></div>}/>
          <Route path="/trainers/list" element={<div><CustomAppBar/><Box m="2%" display="flex"><TrainerTable/></Box></div>}/>
          <Route path="/trainers/:id" element={<div><CustomAppBar/><Box m="2%" display="flex"><TrainerData/></Box></div>}/>
          <Route path="/trainers" element={<div><CustomAppBar/><Box m="2%" display="flex"><TrainerData/></Box></div>}/>
          <Route path="/users/list" element={<div><CustomAppBar/><Box m="2%" display="flex"><UserTable /></Box></div>}/>
          <Route path="/users/:id" element={<div><CustomAppBar/><Box m="2%" display="flex"><UserData /></Box></div>}/>
          <Route path="/users" element={<div><CustomAppBar/><Box m="2%" display="flex"><UserData /></Box></div>}/>
        </Routes>
      
    </Router>
  );
}

export default AppBar