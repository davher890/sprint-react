import React from 'react'
import { Grid, Fab } from '@material-ui/core';
import NavigationIcon from '@material-ui/icons/CloudDownload';

export default (props) => (
	<Grid container spacing={1}>
		<Grid item xs>
			<Fab variant="extended" size="large" aria-label="add"
				color={props.color || "secondary"}
				{...props}
			>
				<NavigationIcon />{props.text}
			</Fab>
		</Grid>
	</Grid>
)