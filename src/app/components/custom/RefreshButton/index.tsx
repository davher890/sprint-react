import React from 'react'
import { Button } from '@mui/material';
import Icon from '@mui/icons-material/Refresh';

const RefreshButton: React.FC<any> = (props) => (
	<Button color={props.color || "secondary"} {...props}>
		<Icon />{props.children}
	</Button>
)
export default RefreshButton