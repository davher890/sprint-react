import React from 'react'
import { Grid, Fab } from '@material-ui/core';
import Icon from '@material-ui/icons/ViewColumn';

export default (props) => (
	<Grid container spacing={1}>
		<Grid item xs>
			<Fab variant="extended" size="large" aria-label="add"
				color={props.color || "secondary"}
				{...props}
			>
				<Icon />{props.text}
			</Fab>
		</Grid>
	</Grid>
)