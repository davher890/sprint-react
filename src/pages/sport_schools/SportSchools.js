import React, { Suspense } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';

import {
  useParams
} from "react-router-dom";

import SportSchoolsTable from "../../components/TableSportSchools";
import CreateSportSchool from "../../components/CreateSportSchool";

export function SportSchools() {
  return (
  	<Container>
	    <Row>
	    	<Suspense fallback={<div>Cargando...</div>}>
				<SportSchoolsTable/>
			</Suspense>
	    </Row>
	</Container>
  );
}

export function NewSportSchool() {
  
	let { id } = useParams();
	return (
  	<Container>
	    <Row>
	    	<Suspense fallback={<div>Cargando...</div>}>
				<CreateSportSchool id={id}/>
			</Suspense>
	    </Row>
	</Container>
  );
}
