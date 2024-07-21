import React from 'react'
import { Button } from '@mui/material';
import Icon from '@mui/icons-material/Euro';

const PayButton: React.FC<any> = (props) => (
	<Button color={props.color || "secondary"} {...props}>
		<Icon />{props.children || 'Pagar'}
	</Button>
)
export default PayButton