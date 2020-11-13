import React, { Component } from "react";

import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import Grid from '@material-ui/core/Grid';

class SprintButton extends Component {
	constructor(props) {
        super(props);

        console.log(props)
   }

   render() {
		return (
			<div>
				<Grid container spacing={1}>
			 		<Grid item xs>
						<Fab variant="extended" size="big" color="secondary" aria-label="add" href={this.props.href} onClick={this.props.onClick}>
				          <NavigationIcon/>{this.props.text}
				        </Fab>
					</Grid>
				</Grid>
			</div>
		)
	}
}


export default SprintButton;