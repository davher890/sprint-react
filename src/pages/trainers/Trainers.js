import React, { Suspense } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';

import TrainersTable from "../../components/TableTrainers";
import CreateTrainer from "../../components/CreateTrainer";

export function Trainers() {
  return (
  	<Container>
	    <Row>
	    	<Suspense fallback={<div>Cargando...</div>}>
				<TrainersTable/>
			</Suspense>
	    </Row>
	</Container>
  );
}

export function NewTrainer() {
  return (
  	<Container>
	    <Row>
	    	<Suspense fallback={<div>Cargando...</div>}>
				<CreateTrainer/>
			</Suspense>
	    </Row>
	</Container>
  );
}
