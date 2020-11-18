import React, { Suspense } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  useParams
} from "react-router-dom";

import AthletesTable from "../../components/AthletesTable";
import GroupAthletesTable from "../../components/GroupAthletesTable";
import CreateAthlete from "../../components/CreateAthlete";

import Grid from '@material-ui/core/Grid';

export function Athletes() {
  return (
  	<Grid container column>
	    <Grid item>
	    	<Suspense fallback={<div>Cargando...</div>}>
				<AthletesTable/>
			</Suspense>
	    </Grid>
	    <Grid item>
	    	<Suspense fallback={<div>Cargando...</div>}>
				<GroupAthletesTable/>
			</Suspense>
	    </Grid>
	</Grid>
  );
}

export function NewAthlete() {

	let { id } = useParams();
	return (
  	<Grid container spacing={1}>
    	<Suspense fallback={<div>Cargando...</div>}>
			<CreateAthlete id={id}/>
		</Suspense>
	</Grid>
  );
}
