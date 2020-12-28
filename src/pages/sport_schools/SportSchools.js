import React, { Suspense } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  useParams
} from "react-router-dom";

import SportSchoolsTable from "../../components/TableSportSchools";
import CreateSportSchool from "../../components/CreateSportSchool";
import Container from '@material-ui/core/Container';

export function SportSchools() {
  return (
  	<Container fixed>
		<Suspense fallback={<div>Cargando...</div>}>
			<SportSchoolsTable/>
		</Suspense>
	</Container>
  );
}

export function NewSportSchool() {
  
	let { id } = useParams();
	return (
  	<Container fixed>
    	<Suspense fallback={<div>Cargando...</div>}>
			<CreateSportSchool id={id}/>
		</Suspense>
    </Container>
  );
}
