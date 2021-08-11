import React from 'react'
import { Grid, Fab } from '@material-ui/core';
import NavigationIcon from '@material-ui/icons/Navigation';

export default (props) => (
	<div>
		<Grid container spacing={1}>
			<Grid item xs>
				<Fab variant="extended" size="large" aria-label="add"
					color={props.color || "secondary"}
					href={props.href}
					onClick={props.onClick}
				>
					<NavigationIcon />{props.text}
				</Fab>
			</Grid>
		</Grid>
	</div>
)