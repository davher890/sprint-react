import React, { Suspense } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';

import {
  useParams
} from "react-router-dom";

import AthletesTable from "../../components/AthletesTable";
import GroupAthletesTable from "../../components/GroupAthletesTable";
import CreateAthlete from "../../components/CreateAthlete";


export function Athletes() {
  return (
  	<Container>
	    <Row>
	    	<Suspense fallback={<div>Cargando...</div>}>
				<AthletesTable/>
			</Suspense>
	    </Row>
	    <Row>
	    	<Suspense fallback={<div>Cargando...</div>}>
				<GroupAthletesTable/>
			</Suspense>
	    </Row>
	</Container>
  );
}

export function NewAthlete() {

	let { id } = useParams();
	return (
  	<Container>
	    <Row>
	    	<Suspense fallback={<div>Cargando...</div>}>
				<CreateAthlete id={id}/>
			</Suspense>
	    </Row>
	</Container>
  );
}
