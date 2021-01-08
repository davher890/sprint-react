import React, { Suspense } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  useParams
} from "react-router-dom";

import AthletesTable from "../../components/AthletesTable";
import AthleteSportdata from "../../components/AthleteSportdata";
import CreateAthlete from "../../components/CreateAthlete";

import Grid from '@material-ui/core/Grid';

export function Athletes() {
  return (
  	<Grid container>
    	<Suspense fallback={<div>Cargando...</div>}>
			<AthletesTable/>
		</Suspense>
	</Grid>
  );
}

export function NewAthlete() {

	let { id } = useParams();
	return (
  	<Grid container>
    	<Suspense fallback={<div>Cargando...</div>}>
			<CreateAthlete id={id}/>
		</Suspense>
	</Grid>
  );
}

export function Sportdata() {

	let { id } = useParams();
	return (
  	<Grid container>
    	<Suspense fallback={<div>Cargando...</div>}>
			<AthleteSportdata id={id}/>
		</Suspense>
	</Grid>
  );
}