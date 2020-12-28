import React, { Suspense } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  useParams
} from "react-router-dom";

import AthletesTable from "../../components/AthletesTable";
import GroupAthletesTable from "../../components/GroupAthletesTable";
import CreateAthlete from "../../components/CreateAthlete";

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

export function Athletes() {
  return (
  	<Container fixed>
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
	</Container>
  );
}

export function NewAthlete() {

	let { id } = useParams();
	return (
  	<Container fixed>
    	<Suspense fallback={<div>Cargando...</div>}>
			<CreateAthlete id={id}/>
		</Suspense>
	</Container>
  );
}
