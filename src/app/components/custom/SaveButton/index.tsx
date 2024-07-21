import React from 'react'
import { Button } from '@mui/material';
import Icon from '@mui/icons-material/Save';

const SaveButton: React.FC<any> = (props) => (
	<Button color={props.color || "secondary"} {...props}>
		<Icon />{props.children || 'Guardar'}
	</Button>
)
export default SaveButton