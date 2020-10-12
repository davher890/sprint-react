import React, { Suspense } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';

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
  return (
  	<Container>
	    <Row>
	    	<Suspense fallback={<div>Cargando...</div>}>
				<CreateSportSchool/>
			</Suspense>
	    </Row>
	</Container>
  );
}
