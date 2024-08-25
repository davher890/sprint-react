import React from 'react';

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

import LicenseUpload from './layouts/licenses/LicenseUpload';

import ReceiptData from './layouts/receipts/ReceiptData';
import ReceiptTable from './layouts/receipts/ReceiptTable';
import ReceiptAthleteData from './layouts/receipts/ReceiptAthleteData';

import SportSchoolAthletesByDate from './layouts/sport_schools/SportSchoolAthletesByDate';
import SportSchoolData from './layouts/sport_schools/SportSchoolData';
import SportSchoolTable from './layouts/sport_schools/SportSchoolTable';

import AthleteData from './layouts/athletes/AthleteData';
import AthleteTable from './layouts/athletes/AthleteTable';
import HistoricTable from './layouts/athletes/HistoricTable';

import GroupData from './layouts/groups/GroupData';
import GroupTable from './layouts/groups/GroupTable';
import GroupSwap from './layouts/groups/GroupSwap';

import FamilyTable from './layouts/families/FamilyTable';
import FamilyData from './layouts/families/FamilyData';

import Signup from './layouts/signup';

import Home from './layouts/home/index';

import PublicAppBar from './components/custom/PublicAppBar'
import SideBar from './components/custom/SideBar'

import GroupAthletesTable from './layouts/listings/GroupAthletesTable';
import GroupAttendance from './layouts/listings/GroupAttendance';
import { Box } from '@mui/material';
import AuthenticatedProtected from "./components/custom/AuthenticatedProtected";
import AdminProtected from "./components/custom/AdminProtected";
import ReturnedReceiptTable from "./layouts/receipts/ReturnedReceiptTable";
import NotPaidReceiptTable from "./layouts/receipts/NotPaidReceiptTable";
import { ReactElement } from "react";
import { Pageview } from '@mui/icons-material';

type CustomRouteProps = {
  admin: boolean, 
  authenticated: boolean, 
  path: string, 
  component: ReactElement, 
  isPublic: ReactElement
};

const getRouteFromJson = ({admin, authenticated, path, component, isPublic}: CustomRouteProps) => {

  const element = (
    <>
      { isPublic ? 
        <>
          <PublicAppBar/> 
          <Box 
            component="main" 
            sx={{
              flexGrow: 1,
              textAlign: 'center',
              width: '100%',
              overflow: 'auto',
              paddingBottom: '1%'
            }}
          >
            {component}
          </Box>
        </>
      :   
        <Box sx={{ display: 'flex' }}>
          <SideBar/>
          <Box 
            component="main" 
            sx={{
              flexGrow: 1,
              // textAlign: 'center',
              width: '100%',
              overflow: 'auto'
            }}
          >
            <Box m="1%">
              {component}
            </Box>
          </Box>
        </Box>
      }
    </>)

    
  const getAuthElement = () => {

    if (!authenticated) {
      return element
    }
    else {
      if (admin){
        return <AdminProtected><AuthenticatedProtected>{element}</AuthenticatedProtected></AdminProtected>
      }
      else {
        return <AuthenticatedProtected>{element}</AuthenticatedProtected>
      }
    }
  }

  return <Route 
        path={path}
        element={getAuthElement()}
    />
}

const pathArray: any[] = [
  { path:"/", admin:false, authenticated:false, isPublic: true, component:<Home/> },
  { path:"/home", admin:false, authenticated:false, isPublic: true, component:<Home/> },
  { path:"/signup", admin:false, authenticated:false, isPublic: true, component:<Signup/> },
  { path:"/admin/athletes_by_date", admin:true, authenticated:true, isPublic: false, component:<SportSchoolAthletesByDate/> },
  { path:"/admin/users", admin:false, authenticated:true, isPublic: false, component:<UserData/>},
  { path:"/admin/users/:id", admin:false, authenticated:true, isPublic: false, component:<UserData/> },
  { path:"/admin/users/list", admin:false, authenticated:true, isPublic: false, component:<UserTable/> },
  { path:"/users/:id", admin:false, authenticated:true, isPublic: false, component:<UserData/> },
  { path:"/sport_schools/list", admin:false, authenticated:true, isPublic: false, component:<SportSchoolTable/> },
  { path:"/sport_schools/:id", admin:false, authenticated:true, isPublic: false, component:<SportSchoolData/> },
  { path:"/sport_schools", admin:false, authenticated:true, isPublic: false, component:<SportSchoolData/> },
  { path:"/families/list", admin:false, authenticated:true, isPublic: false, component:<FamilyTable/> },
  { path:"/families/:id", admin:false, authenticated:true, isPublic: false, component:<FamilyData/> },
  { path:"/families", admin:false, authenticated:true, isPublic: false, component:<FamilyData/> },
  { path:"/athletes/list", admin:false, authenticated:true, isPublic: false, component:<AthleteTable/>},
  { path:"/athletes/:id/historic",    admin:false, authenticated:true, isPublic: false, component:<AthleteData/>},
  { path:"/athletes/historic",        admin:false, authenticated:true, isPublic: false, component:<HistoricTable/> },
  { path:"/athletes/:id", admin:false, authenticated:true, isPublic: false, component:<AthleteData/> },
  { path:"/athletes/code?code::code", admin:false, authenticated:true, isPublic: false, component:<AthleteData/> },
  { path:"/athletes", admin:false, authenticated:true, isPublic: false, component:<AthleteData/> },
  { path:"/groups/attendance", admin:false, authenticated:true, isPublic: false, component:<GroupAttendance/> },
  { path:"/groups/athletes", admin:false, authenticated:true, isPublic: false, component:<GroupAthletesTable/> },
  { path:"/groups/swap", admin:false, authenticated:true, isPublic: false, component:<GroupSwap/> },
  { path:"/groups/list", admin:false, authenticated:true, isPublic: false, component:<GroupTable/> },
  { path:"/groups/:id", admin:false, authenticated:true, isPublic: false, component:<GroupData/> },
  { path:"/groups", admin:false, authenticated:true, isPublic: false, component:<GroupData/> },
  { path:"/schedules/list", admin:false, authenticated:true, isPublic: false, component:<ScheduleTable/> },
  { path:"/schedules/:id", admin:false, authenticated:true, isPublic: false, component:<ScheduleData/> },
  { path:"/schedules", admin:false, authenticated:true, isPublic: false, component:<ScheduleData/> },
  { path:"/incidences/list", admin:false, authenticated:true, isPublic: false, component:<IncidenceTable/> },
  { path:"/incidences/:id", admin:false, authenticated:true, isPublic: false, component:<IncidenceData/> },
  { path:"/incidences", admin:false, authenticated:true, isPublic: false, component:<IncidenceData/> },
  { path:"/licenses", admin:false, authenticated:true, isPublic: false, component:<LicenseUpload/> },
  { path:"/receipts/list", admin:false, authenticated:true, isPublic: false, component:<ReceiptTable/> },
  { path:"/receipts/:id", admin:false, authenticated:true, isPublic: false, component:<ReceiptData/> },
  { path:"/receipts", admin:false, authenticated:true, isPublic: false, component:<ReceiptData/> },
  { path:"/receipts/athletes/:id", admin:false, authenticated:true, isPublic: false, component:<ReceiptAthleteData/> },
  { path:"/receipts/returned/list", admin:false, authenticated:true, isPublic: false, component:<ReturnedReceiptTable/> },
  { path:"/receipts/not_paid/list", admin:false, authenticated:true, isPublic: false, component:<NotPaidReceiptTable/> },
  { path:"/trainers/list", admin:false, authenticated:true, isPublic: false, component:<TrainerTable/> },
  { path:"/trainers/:id", admin:false, authenticated:true, isPublic: false, component:<TrainerData/> },
  { path:"/trainers", admin:false, authenticated:true, isPublic: false, component:<TrainerData/> },
]

const AppBar: React.FC<any> = () => {

  return (
    <Router>
        <Pageview/>
        <Routes>
          { pathArray.map(e => { return getRouteFromJson(e) })}
        </Routes>
    </Router>
  );
}

export default AppBar