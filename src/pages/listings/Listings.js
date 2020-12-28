import React, { Suspense } from "react";
import GroupAttendance from "../../components/GroupAttendance";

import Container from '@material-ui/core/Container';

export function GroupListing() {
  return (
  	<Container fixed>
    	<Suspense fallback={<div>Cargando...</div>}>
			<GroupAttendance/>
		</Suspense>
    </Container>
  );
}