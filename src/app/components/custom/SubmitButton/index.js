import React from "react";

import Button from '@material-ui/core/Button';
import NavigationIcon from '@material-ui/icons/Navigation';

export default (props) => (
	<Button type="submit" variant="contained" color="primary" disabled={props.disabled}
		onClick={props.onClick}>
		<NavigationIcon />{props.text || 'Guardar'}
	</Button>
)