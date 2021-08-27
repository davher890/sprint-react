import React from 'react'
import { Grid, Fab } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

export default (props) => (
	<Grid container spacing={1}>
		<Grid item xs>
			<Fab variant="extended" size="large" aria-label="add"
				color={props.color || "secondary"}
				{...props}
			>
				<SaveIcon />{props.text || "Guardar"}
			</Fab>
		</Grid>
	</Grid>
)