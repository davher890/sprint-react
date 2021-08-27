import React from 'react'
import { Grid, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		borderRadius: -1
	}
});

export default (props) => {
	const classes = useStyles();
	
	return (
		<Grid container spacing={1}>
			<Grid item xs>
				<Fab variant="extended" size="small" aria-label="add"
					color={props.color || "secondary"}
					{...props}
					classes={{
						root: classes.root, // class name, e.g. `classes-nesting-root-x`
						// label: classes.label, // class name, e.g. `classes-nesting-label-x`
					}}
				>
					{props.text || "Guardar"}
				</Fab>
			</Grid>
		</Grid>
	)
}