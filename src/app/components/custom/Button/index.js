import React from 'react'
import { Grid, Fab } from '@material-ui/core';
import NavigationIcon from '@material-ui/icons/Navigation';

export default ({ color, text, href, onClick }) => (
	<div>
		<Grid container spacing={1}>
			<Grid item xs>
				<Fab variant="extended" size="large" aria-label="add"
					color={color || "primary"}
					href={href}
					onClick={onClick}
				>
					<NavigationIcon />{text}
				</Fab>
			</Grid>
		</Grid>
	</div>
)