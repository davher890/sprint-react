import React, { Suspense } from "react";
import GroupAttendance from "../../components/GroupAttendance";

import Grid from '@material-ui/core/Grid';

export function GroupListing() {
  return (
  	<Grid container>
	    <Grid item>
	    	<Suspense fallback={<div>Cargando...</div>}>
				<GroupAttendance/>
			</Suspense>
	    </Grid>
	</Grid>
  );
}