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
      <CustomAppBar />
      <Box m="2%" display="flex">
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/sport_schools/list" element={<SportSchoolTable/>}/>
          <Route path="/sport_schools/:id" element={<SportSchoolData/>}/>
          <Route path="/sport_schools" element={<SportSchoolData/>}/>
          <Route path="/families/list" element={<FamilyTable/>}/>
          <Route path="/families/:id" element={<FamilyData/>}/>
          <Route path="/families" element={<FamilyData/>}/>
          <Route path="/athletes/list" element={<AthleteTable/>}/>
          <Route path="/athletes/:id/historic" element={<AthleteData/>} />
          <Route path="/athletes/:id/sport_data" element={<AthleteSportdata/>} />
          <Route path="/athletes/historic" element={<HistoricTable/>} />
          <Route path="/athletes/:id" element={<AthleteData/>} />
          <Route path="/athletes" element={<AthleteData/>} />
          <Route path="/groups/attendance" element={<GroupAttendance/>}/>
          <Route path="/groups/athletes" element={<GroupAthletesTable/>}/>
          <Route path="/groups/swap" element={<GroupSwap/>}/>
          <Route path="/groups/list" element={<GroupTable/>}/>
          <Route path="/groups/:id" element={<GroupData/>}/>
          <Route path="/groups" element={<GroupData/>} />
          <Route path="/schedules/list" element={<ScheduleTable/>}/>
          <Route path="/schedules/:id" element={<ScheduleData/>}/>
          <Route path="/schedules" element={<ScheduleData/>}/>
          <Route path="/trainers/list" element={<TrainerTable/>}/>
          <Route path="/trainers/:id" element={<TrainerData/>}/>
          <Route path="/trainers" element={<TrainerData/>}/>
          <Route path="/users/list" element={<UserTable />}/>
          <Route path="/users/:id" element={<UserData />}/>
          <Route path="/users" element={<UserData />}/>
        </Routes>
      </Box>
    </Router>
  );
}

export default AppBar