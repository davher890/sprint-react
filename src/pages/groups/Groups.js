import React, { Suspense } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';

import GroupsTable from "../../components/TableGroups";
import CreateGroup from "../../components/CreateGroup";

export function Groups() {
  return (
  	<Container>
	    <Row>
	    	<Suspense fallback={<div>Cargando...</div>}>
				<GroupsTable/>
			</Suspense>
	    </Row>
	</Container>
  );
}

export function NewGroup() {
  return (
  	<Container>
	    <Row>
	    	<Suspense fallback={<div>Cargando...</div>}>
				<CreateGroup/>
			</Suspense>
	    </Row>
	</Container>
  );
}
