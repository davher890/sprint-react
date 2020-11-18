import React, { Component } from "react";

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class SubmitButton extends Component {

   render() {
		return (
			<div>
				<Grid container spacing={1}>
			 		<Grid item xs>
						<Button type="submit" variant="contained" color="primary">Guardar</Button>
					</Grid>
				</Grid>
			</div>
		)
	}
}


export default SubmitButton;