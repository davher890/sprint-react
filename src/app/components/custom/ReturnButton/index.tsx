import React from 'react'
import { Button } from '@mui/material';
import Icon from '@mui/icons-material/ArrowBack';

const ReturnButton: React.FC<any> = (props) => (
	<Button color={props.color || "secondary"} {...props}>
		<Icon />{props.children || 'Volver'}
	</Button>
)
export default ReturnButton