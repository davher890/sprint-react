import React, { Suspense } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  useParams
} from "react-router-dom";

import SportSchoolsTable from "../../components/TableSportSchools";
import CreateSportSchool from "../../components/CreateSportSchool";
import Grid from '@material-ui/core/Grid';

export function SportSchools() {
  return (
  	<Grid container>
	    <Grid item>
	    	<Suspense fallback={<div>Cargando...</div>}>
				<SportSchoolsTable/>
			</Suspense>
	    </Grid>
	</Grid>
  );
}

export function NewSportSchool() {
  
	let { id } = useParams();
	return (
  	<Grid container>
    	<Suspense fallback={<div>Cargando...</div>}>
			<CreateSportSchool id={id}/>
		</Suspense>
    </Grid>
  );
}
