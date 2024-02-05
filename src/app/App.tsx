import {
  BrowserRouter as Router, Routes, Route
} from "react-router-dom";

import UserData from './layouts/users/UserData';
import UserTable from './layouts/users/UserTable';

import TrainerData from './layouts/trainers/TrainerData';
import TrainerTable from './layouts/trainers/TrainerTable';

import ScheduleData from './layouts/schedules/ScheduleData';
import ScheduleTable from './layouts/schedules/ScheduleTable';

import IncidenceData from './components/incidences/IncidenceData';
import IncidenceTable from './components/incidences/IncidenceTable';

import LicenseUpload from './components/licenses/LicenseUpload';

import ReceiptData from './layouts/receipts/ReceiptData';
import ReceiptTable from './layouts/receipts/ReceiptTable';
import ReceiptAthleteData from './layouts/receipts/ReceiptAthleteData';

import SportSchoolAthletesByDate from './layouts/sport_schools/SportSchoolAthletesByDate';
import SportSchoolData from './layouts/sport_schools/SportSchoolData';
import SportSchoolTable from './layouts/sport_schools/SportSchoolTable';

import AthleteData from './layouts/athletes/AthleteData';
import AthleteSportdata from './layouts/athletes/AthleteSportdata';
import AthleteTable from './layouts/athletes/AthleteTable';
import HistoricTable from './layouts/athletes/HistoricTable';

import GroupData from './layouts/groups/GroupData';
import GroupTable from './layouts/groups/GroupTable';
import GroupSwap from './layouts/groups/GroupSwap';

import FamilyTable from './layouts/families/FamilyTable';
import FamilyData from './layouts/families/FamilyData';

import Login from './layouts/login';
import Payment from './components/payments';

import CustomAppBar from './components/custom/AppBar'

import GroupAthletesTable from './components/listings/GroupAthletesTable';
import GroupAttendance from './components/listings/GroupAttendance';
import { Box } from '@material-ui/core';
import AuthenticatedProtected from "./components/custom/AuthenticatedProtected";
import AdminProtected from "./components/custom/AdminProtected";
import ReturnedReceiptTable from "./layouts/receipts/ReturnedReceiptTable";
import NotPaidReceiptTable from "./layouts/receipts/NotPaidReceiptTable";


const AppBar: React.FC<any> = (props) => {

  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/admin/users"              element={<AdminProtected><AuthenticatedProtected><CustomAppBar/><Box m="2%" ><UserData/></Box></AuthenticatedProtected></AdminProtected>}/>
          <Route path="/admin/athletes_by_date"   element={<AdminProtected><AuthenticatedProtected><CustomAppBar/><Box m="2%" ><SportSchoolAthletesByDate/></Box></AuthenticatedProtected></AdminProtected>}/>
          
          <Route path="/admin/payments"           element={<AuthenticatedProtected><CustomAppBar/><Box m="2%" ><Payment/></Box></AuthenticatedProtected>}/>
          
          <Route path="/admin/users/:id"          element={<AdminProtected><AuthenticatedProtected><CustomAppBar/><Box m="2%"><UserData/></Box></AuthenticatedProtected></AdminProtected>}/>
          <Route path="/admin/users/list"         element={<AuthenticatedProtected><CustomAppBar/><Box m="2%" display="flex"><UserTable/></Box></AuthenticatedProtected>}/>
          <Route path="/users/:id"                element={<AuthenticatedProtected><CustomAppBar/><Box m="2%" display="flex"><UserData/></Box></AuthenticatedProtected>}/>
          
          <Route path="/sport_schools/list"       element={<AuthenticatedProtected><CustomAppBar/><Box m="2%" display="flex"><SportSchoolTable/></Box></AuthenticatedProtected>}/>
          <Route path="/sport_schools/:id"        element={<AuthenticatedProtected><CustomAppBar/><Box m="2%" display="flex"><SportSchoolData/></Box></AuthenticatedProtected>}/>
          <Route path="/sport_schools"            element={<AuthenticatedProtected><CustomAppBar/><Box m="2%" display="flex"><SportSchoolData/></Box></AuthenticatedProtected>}/>
          
          <Route path="/families/list"            element={<AuthenticatedProtected><CustomAppBar/><Box m="2%" display="flex"><FamilyTable/></Box></AuthenticatedProtected>}/>
          <Route path="/families/:id"             element={<AuthenticatedProtected><CustomAppBar/><Box m="2%" display="flex"><FamilyData/></Box></AuthenticatedProtected>}/>
          <Route path="/families"                 element={<AuthenticatedProtected><CustomAppBar/><Box m="2%" display="flex"><FamilyData/></Box></AuthenticatedProtected>}/>
          
          <Route path="/athletes/list"            element={<AuthenticatedProtected><CustomAppBar/><Box m="2%" display="flex"><AthleteTable/></Box></AuthenticatedProtected>}/>
          <Route path="/athletes/:id/historic"    element={<AuthenticatedProtected><CustomAppBar/><Box m="2%" display="flex"><AthleteData/></Box></AuthenticatedProtected>} />
          <Route path="/athletes/:id/sport_data"  element={<AuthenticatedProtected><CustomAppBar/><Box m="2%" display="flex"><AthleteSportdata/></Box></AuthenticatedProtected>} />
          <Route path="/athletes/historic"        element={<AuthenticatedProtected><CustomAppBar/><Box m="2%" display="flex"><HistoricTable/></Box></AuthenticatedProtected>} />
          <Route path="/athletes/:id"             element={<AuthenticatedProtected><CustomAppBar/><Box m="2%" display="flex"><AthleteData/></Box></AuthenticatedProtected>} />
          <Route path="/athletes/code?code=:code" element={<AuthenticatedProtected><CustomAppBar/><Box m="2%" display="flex"><AthleteData/></Box></AuthenticatedProtected>} />
          <Route path="/athletes"                 element={<AuthenticatedProtected><CustomAppBar/><Box m="2%" display="flex"><AthleteData/></Box></AuthenticatedProtected>} />
          
          <Route path="/groups/attendance"        element={<AuthenticatedProtected><CustomAppBar/><Box m="2%" display="flex"><GroupAttendance/></Box></AuthenticatedProtected>}/>
          <Route path="/groups/athletes"          element={<AuthenticatedProtected><CustomAppBar/><Box m="2%" display="flex"><GroupAthletesTable/></Box></AuthenticatedProtected>}/>
          <Route path="/groups/swap"              element={<AuthenticatedProtected><CustomAppBar/><Box m="2%" display="flex"><GroupSwap/></Box></AuthenticatedProtected>}/>
          <Route path="/groups/list"              element={<AuthenticatedProtected><CustomAppBar/><Box m="2%" display="flex"><GroupTable/></Box></AuthenticatedProtected>}/>
          <Route path="/groups/:id"               element={<AuthenticatedProtected><CustomAppBar/><Box m="2%" display="flex"><GroupData/></Box></AuthenticatedProtected>}/>
          <Route path="/groups"                   element={<AuthenticatedProtected><CustomAppBar/><Box m="2%" display="flex"><GroupData/></Box></AuthenticatedProtected>} />
          
          <Route path="/schedules/list"           element={<AuthenticatedProtected><CustomAppBar/><Box m="2%" display="flex"><ScheduleTable/></Box></AuthenticatedProtected>}/>
          <Route path="/schedules/:id"            element={<AuthenticatedProtected><CustomAppBar/><Box m="2%" display="flex"><ScheduleData/></Box></AuthenticatedProtected>}/>
          <Route path="/schedules"                element={<AuthenticatedProtected><CustomAppBar/><Box m="2%" display="flex"><ScheduleData/></Box></AuthenticatedProtected>}/>
          
          <Route path="/incidences/list"          element={<AuthenticatedProtected><CustomAppBar/><Box m="2%" display="flex"><IncidenceTable/></Box></AuthenticatedProtected>}/>
          <Route path="/incidences/:id"           element={<AuthenticatedProtected><CustomAppBar/><Box m="2%" display="flex"><IncidenceData/></Box></AuthenticatedProtected>}/>
          <Route path="/incidences"               element={<AuthenticatedProtected><CustomAppBar/><Box m="2%" display="flex"><IncidenceData/></Box></AuthenticatedProtected>}/>

          <Route path="/licenses"                 element={<AuthenticatedProtected><CustomAppBar/><Box m="2%" display="flex"><LicenseUpload/></Box></AuthenticatedProtected>}/>

          <Route path="/receipts/list"            element={<AuthenticatedProtected><CustomAppBar/><Box m="2%" display="flex"><ReceiptTable/></Box></AuthenticatedProtected>}/>
          <Route path="/receipts/:id"             element={<AuthenticatedProtected><CustomAppBar/><Box m="2%" display="flex"><ReceiptData/></Box></AuthenticatedProtected>}/>
          <Route path="/receipts"                 element={<AuthenticatedProtected><CustomAppBar/><Box m="2%" display="flex"><ReceiptData/></Box></AuthenticatedProtected>}/>
          <Route path="/receipts/athletes/:id"    element={<AuthenticatedProtected><CustomAppBar/><Box m="2%" display="flex"><ReceiptAthleteData/></Box></AuthenticatedProtected>}/>
          <Route path="/receipts/returned/list"   element={<AuthenticatedProtected><CustomAppBar/><Box m="2%" display="flex"><ReturnedReceiptTable/></Box></AuthenticatedProtected>}/>
          <Route path="/receipts/not_paid/list"   element={<AuthenticatedProtected><CustomAppBar/><Box m="2%" display="flex"><NotPaidReceiptTable/></Box></AuthenticatedProtected>}/>
          
          <Route path="/trainers/list"            element={<AuthenticatedProtected><CustomAppBar/><Box m="2%" display="flex"><TrainerTable/></Box></AuthenticatedProtected>}/>
          <Route path="/trainers/:id"             element={<AuthenticatedProtected><CustomAppBar/><Box m="2%" display="flex"><TrainerData/></Box></AuthenticatedProtected>}/>
          <Route path="/trainers"                 element={<AuthenticatedProtected><CustomAppBar/><Box m="2%" display="flex"><TrainerData/></Box></AuthenticatedProtected>}/>
          </Routes>
      
    </Router>
  );
}

export default AppBar