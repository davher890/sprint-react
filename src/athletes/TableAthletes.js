import React, { Suspense } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';

import AthletesTableComponent from "./AthletesTableComponent";
import GroupAthletesTableComponent from "../groups/GroupAthletesTableComponent";


export function TableAthletes() {
  return (
  	<Container>
	    <Row>
	    	<Suspense fallback={<div>Cargando...</div>}>
				<AthletesTableComponent/>
			</Suspense>
	    </Row>
	    <Row>
	    	<Suspense fallback={<div>Cargando...</div>}>
				<GroupAthletesTableComponent/>
			</Suspense>
	    </Row>
	</Container>
  );
}
