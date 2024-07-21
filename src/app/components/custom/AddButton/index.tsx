import React from 'react'
import { Grid, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

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