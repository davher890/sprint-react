import React, { Suspense } from "react";
import { Container, Row } from 'react-bootstrap';
import GroupAttendance from "../../components/GroupAttendance";

export function GroupListing() {
  return (
  	<Container>
	    <Row>
	    	<Suspense fallback={<div>Cargando...</div>}>
				<GroupAttendance/>
			</Suspense>
	    </Row>
	</Container>
  );
}