import React, { Component } from "react";

import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import Grid from '@material-ui/core/Grid';

class Button extends Component {

   render() {
		return (
			<div>
				<Grid container spacing={1}>
			 		<Grid item xs>
						<Fab variant="extended" size="large" color={this.props.color || "primary"} aria-label="add" href={this.props.href} onClick={this.props.onClick}>
				          <NavigationIcon/>{this.props.text}
				        </Fab>
					</Grid>
				</Grid>
			</div>
		)
	}
}


export default Button;