import React from 'react'
import { Grid, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const AddButton: React.FC<any> = (props) => (
	<Grid container spacing={1}>
		<Grid item xs>
			<Button color={props.color || "secondary"}
				{...props}
			>
				<AddIcon />{props.text}
			</Button>
		</Grid>
	</Grid>
)

export default AddButton;