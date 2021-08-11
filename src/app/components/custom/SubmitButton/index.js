import React from "react";

import Button from '@material-ui/core/Button';
import NavigationIcon from '@material-ui/icons/Navigation';

export default (props) => (
	<Button {...props} type="submit" variant="contained" color={props.color || "secondary"} >
		<NavigationIcon />{props.text || 'Guardar'}
	</Button>
)