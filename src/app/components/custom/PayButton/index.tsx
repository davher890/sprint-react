import React from 'react'
import { Button } from '@material-ui/core';
import Icon from '@material-ui/icons/Euro';

const PayButton: React.FC<any> = (props) => (
	<Button color={props.color || "secondary"} {...props}>
		<Icon />{props.children || 'Pagar'}
	</Button>
)
export default PayButton