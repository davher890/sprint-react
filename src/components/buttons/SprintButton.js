import React, { Component } from "react";

import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import Grid from '@material-ui/core/Grid';

class SprintButton extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	text : props.text
       }
   }

   render() {
		return (
			<div>
				<Grid container spacing={1}>
			 		<Grid item xs>
						<Fab variant="extended" size="big" color="secondary" aria-label="add" onClick={this.downloadData}>
				          <NavigationIcon/>{this.state.text}
				        </Fab>
					</Grid>
				</Grid>
			</div>
		)
	}
}


export default SprintButton;