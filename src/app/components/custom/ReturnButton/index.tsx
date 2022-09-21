import React from 'react'
import { Button } from '@material-ui/core';
import Icon from '@material-ui/icons/ArrowBack';

const ReturnButton: React.FC<any> = (props) => (
	<Button color={props.color || "secondary"} {...props}>
		<Icon />{props.children || 'Volver'}
	</Button>
)
export default ReturnButton