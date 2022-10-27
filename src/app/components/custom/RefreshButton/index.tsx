import React from 'react'
import { Button } from '@material-ui/core';
import Icon from '@material-ui/icons/Refresh';

const RefreshButton: React.FC<any> = (props) => (
	<Button color={props.color || "secondary"} {...props}>
		<Icon />{props.children}
	</Button>
)
export default RefreshButton