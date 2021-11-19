import React from 'react'
import { Button } from '@material-ui/core';
import Icon from '@material-ui/icons/Save';

const SaveButton: React.FC<any> = (props) => (
	<Button color={props.color || "secondary"} {...props}>
		<Icon />{props.children || 'Guardar'}
	</Button>
)
export default SaveButton