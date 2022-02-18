import React from 'react'
import { Button } from '@material-ui/core';
import Icon from '@material-ui/icons/Delete';

const DeleteButton: React.FC<any> = (props) => (
	<Button color={props.color || "secondary"} {...props}>
		<Icon />{props.children || 'Borrar'}
	</Button>
)

export default DeleteButton;