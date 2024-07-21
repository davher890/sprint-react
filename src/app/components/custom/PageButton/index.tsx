import React from 'react'
import { Grid, Fab } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
	root: {
		borderRadius: -1
	}
});

const PageButton: React.FC<any> = (props) => {
	const classes = useStyles();
	
	return (
		<Grid container spacing={1}>
			<Grid item xs>
				<Fab variant="extended" size="small" aria-label="add"
					color={props.color || "secondary"}
					{...props}
					// classes={{
					// 	root: classes.root, // class name, e.g. `classes-nesting-root-x`
					// 	// label: classes.label, // class name, e.g. `classes-nesting-label-x`
					// }}
				>
					{props.children}
					{/* {props.text || "Guardar"} */}
				</Fab>
			</Grid>
		</Grid>
	)
}
export default PageButton