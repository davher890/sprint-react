import React, { Suspense } from "react";
import HistoricTable from "../../components/HistoricTable";

import Container from '@material-ui/core/Container';

export function AthletesHistoric() {
  return (
  	<Container fixed>
    	<Suspense fallback={<div>Cargando...</div>}>
			<HistoricTable/>
		</Suspense>
	</Container>
  );
}