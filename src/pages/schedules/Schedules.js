import React, { Suspense } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';

import SchedulesTable from "../../components/TableSchedules";
import CreateSchedule from "../../components/CreateSchedule";

export function Schedules() {
  return (
  	<Container>
	    <Row>
	    	<Suspense fallback={<div>Cargando...</div>}>
				<SchedulesTable/>
			</Suspense>
	    </Row>
	</Container>
  );
}

export function NewSchedule() {
  return (
  	<Container>
	    <Row>
	    	<Suspense fallback={<div>Cargando...</div>}>
				<CreateSchedule/>
			</Suspense>
	    </Row>
	</Container>
  );
}
