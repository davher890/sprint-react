import React from 'react'
import { Grid, Fab } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

export default (props) => (
	<Grid container spacing={1}>
		<Grid item xs>
			<Fab variant="extended" size="large" aria-label="add"
				color={props.color || "secondary"}
				{...props}
			>
				<SearchIcon />{props.text}
			</Fab>
		</Grid>
	</Grid>
)