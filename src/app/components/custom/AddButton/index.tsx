import React from 'react'
import { Grid, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const AddButton: React.FC<any> = (props) => (
	<Grid container spacing={1}>
		<Grid item xs>
			<Fab variant="extended" size="large" aria-label="add"
				color={props.color || "secondary"}
				{...props}
			>
				<AddIcon />{props.text}
			</Fab>
		</Grid>
	</Grid>
)

export default AddButton;