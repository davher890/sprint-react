import React, { Suspense } from "react";
import GroupAttendance from "../../components/GroupAttendance";
import GroupAthletesTable from "../../components/GroupAthletesTable";

import Grid from '@material-ui/core/Grid';

export function GroupListing() {
  return (
  	<Grid container direction="column">
    	<Grid item xs>
    		<Suspense fallback={<div>Cargando...</div>}>
				<GroupAttendance/>
			</Suspense>
	    </Grid>
	</Grid>
  );
}

export function GroupAthletes() {
  return (
  	<Grid container direction="column">
		<Grid item xs>
	    	<Suspense fallback={<div>Cargando...</div>}>
				<GroupAthletesTable/>
			</Suspense>
	    </Grid>
	</Grid>
  );
}