import React, { Suspense } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';

import FamiliesTable from "../../components/TableFamilies";
import CreateFamily from "../../components/CreateFamily";

export function Families() {
  return (
  	<Container>
	    <Row>
	    	<Suspense fallback={<div>Cargando...</div>}>
				<FamiliesTable/>
			</Suspense>
	    </Row>
	</Container>
  );
}

export function NewFamily() {
  return (
  	<Container>
	    <Row>
	    	<Suspense fallback={<div>Cargando...</div>}>
				<CreateFamily/>
			</Suspense>
	    </Row>
	</Container>
  );
}
