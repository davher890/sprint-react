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
import Protected from "./components/custom/Protected";

import { isAdmin, isAuthenticated } from "./services/LoginService";


const AppBar: React.FC<any> = (props) => {

  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/admin/users/:id" element={<Protected isAuthenticated={isAuthenticated()}><CustomAppBar/><Box m="2%" display="flex"><UserData /></Box></Protected>}/>
          <Route path="/admin/users/list" element={<Protected isAuthenticated={isAuthenticated()}><CustomAppBar/><Box m="2%" display="flex"><UserTable /></Box></Protected>}/>
          <Route path="/users/me" element={<Protected isAuthenticated={isAuthenticated()}><CustomAppBar/><Box m="2%" display="flex"><UserData /></Box></Protected>}/>
          <Route path="/sport_schools/list" element={<Protected isAuthenticated={isAuthenticated()}><CustomAppBar/><Box m="2%" display="flex"><SportSchoolTable/></Box></Protected>}/>
          <Route path="/sport_schools/:id" element={<Protected isAuthenticated={isAuthenticated()}><CustomAppBar/><Box m="2%" display="flex"><SportSchoolData/></Box></Protected>}/>
          <Route path="/sport_schools" element={<Protected isAuthenticated={isAuthenticated()}><CustomAppBar/><Box m="2%" display="flex"><SportSchoolData/></Box></Protected>}/>
          <Route path="/families/list" element={<Protected isAuthenticated={isAuthenticated()}><CustomAppBar/><Box m="2%" display="flex"><FamilyTable/></Box></Protected>}/>
          <Route path="/families/:id" element={<Protected isAuthenticated={isAuthenticated()}><CustomAppBar/><Box m="2%" display="flex"><FamilyData/></Box></Protected>}/>
          <Route path="/families" element={<Protected isAuthenticated={isAuthenticated()}><CustomAppBar/><Box m="2%" display="flex"><FamilyData/></Box></Protected>}/>
          <Route path="/athletes/list" element={<Protected isAuthenticated={isAuthenticated()}><CustomAppBar/><Box m="2%" display="flex"><AthleteTable/></Box></Protected>}/>
          <Route path="/athletes/:id/historic" element={<Protected isAuthenticated={isAuthenticated()}><CustomAppBar/><Box m="2%" display="flex"><AthleteData/></Box></Protected>} />
          <Route path="/athletes/:id/sport_data" element={<Protected isAuthenticated={isAuthenticated()}><CustomAppBar/><Box m="2%" display="flex"><AthleteSportdata/></Box></Protected>} />
          <Route path="/athletes/historic" element={<Protected isAuthenticated={isAuthenticated()}><CustomAppBar/><Box m="2%" display="flex"><HistoricTable/></Box></Protected>} />
          <Route path="/athletes/:id" element={<Protected isAuthenticated={isAuthenticated()}><CustomAppBar/><Box m="2%" display="flex"><AthleteData/></Box></Protected>} />
          <Route path="/athletes" element={<Protected isAuthenticated={isAuthenticated()}><CustomAppBar/><Box m="2%" display="flex"><AthleteData/></Box></Protected>} />
          <Route path="/groups/attendance" element={<Protected isAuthenticated={isAuthenticated()}><CustomAppBar/><Box m="2%" display="flex"><GroupAttendance/></Box></Protected>}/>
          <Route path="/groups/athletes" element={<Protected isAuthenticated={isAuthenticated()}><CustomAppBar/><Box m="2%" display="flex"><GroupAthletesTable/></Box></Protected>}/>
          <Route path="/groups/swap" element={<Protected isAuthenticated={isAuthenticated()}><CustomAppBar/><Box m="2%" display="flex"><GroupSwap/></Box></Protected>}/>
          <Route path="/groups/list" element={<Protected isAuthenticated={isAuthenticated()}><CustomAppBar/><Box m="2%" display="flex"><GroupTable/></Box></Protected>}/>
          <Route path="/groups/:id" element={<Protected isAuthenticated={isAuthenticated()}><CustomAppBar/><Box m="2%" display="flex"><GroupData/></Box></Protected>}/>
          <Route path="/groups" element={<Protected isAuthenticated={isAuthenticated()}><CustomAppBar/><Box m="2%" display="flex"><GroupData/></Box></Protected>} />
          <Route path="/schedules/list" element={<Protected isAuthenticated={isAuthenticated()}><CustomAppBar/><Box m="2%" display="flex"><ScheduleTable/></Box></Protected>}/>
          <Route path="/schedules/:id" element={<Protected isAuthenticated={isAuthenticated()}><CustomAppBar/><Box m="2%" display="flex"><ScheduleData/></Box></Protected>}/>
          <Route path="/schedules" element={<Protected isAuthenticated={isAuthenticated()}><CustomAppBar/><Box m="2%" display="flex"><ScheduleData/></Box></Protected>}/>
          <Route path="/trainers/list" element={<Protected isAuthenticated={isAuthenticated()}><CustomAppBar/><Box m="2%" display="flex"><TrainerTable/></Box></Protected>}/>
          <Route path="/trainers/:id" element={<Protected isAuthenticated={isAuthenticated()}><CustomAppBar/><Box m="2%" display="flex"><TrainerData/></Box></Protected>}/>
          <Route path="/trainers" element={<Protected isAuthenticated={isAuthenticated()}><CustomAppBar/><Box m="2%" display="flex"><TrainerData/></Box></Protected>}/>
          </Routes>
      
    </Router>
  );
}

export default AppBar