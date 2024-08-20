import React from 'react'
import { Button } from '@mui/material';
import Icon from '@mui/icons-material/Delete';

const DeleteButton: React.FC<any> = (props) => (
	<Button color={props.color || "secondary"} {...props}>
		<Icon />{props.children || 'Borrar'}
	</Button>
)

export default DeleteButton;