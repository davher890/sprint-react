import React, { Component } from "react";

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

class MultiSelect extends Component {

	constructor(props) {
		super(props);
		let left = props.columns.filter(d => d.show === undefined || d.show === false)
		let right = props.columns.filter(d => d.show !== undefined && d.show === true)
		this.state = {
			left: left,
			right: right
		}
		this.handleToggle = this.handleToggle.bind(this)
		this.handleAllRight = this.handleAllRight.bind(this)
		this.handleAllLeft = this.handleAllLeft.bind(this)
	}

	fireChange(){
		this.props.changeEvent(this.state.left.map(c => { c.show = false; return c; }).concat(this.state.right.map(c => { c.show = true; return c; })))
	}

	async toggleRightChange(inRight){
		await this.setState({
			left: this.state.left.concat(inRight[0]),
			right: this.state.right.filter(d => d.dataField !== inRight[0].dataField)
		});
		this.fireChange()
	}

	async toggleLeftChange(inLeft){
		await this.setState({
			right: this.state.right.concat(inLeft[0]),
			left: this.state.left.filter(d => d.dataField !== inLeft[0].dataField)
		});
		this.fireChange()
	}

	handleToggle(value) {

		// Checked in Left
		const inLeft = this.state.left.filter(d => d.dataField === value.dataField)
		if (inLeft.length > 0){
			this.toggleLeftChange(inLeft)
		}

		// Checked in Right
		const inRight = this.state.right.filter(d => d.dataField === value.dataField)
		if (inRight.length > 0){
			this.toggleRightChange(inRight)
		}	
	}

 	async handleAllLeft(){
		await this.setState({ 
			left : this.state.left.concat(this.state.right),
			right : []
		})
		this.fireChange()
	};

	async handleAllRight(){
		await this.setState({ 
			left : [],
			right : this.state.right.concat(this.state.left)
		})
		this.fireChange()
	};

	customList(items){
		return (
			<Paper>
			  <List dense component="div" role="list">
			    {items.map((value) => {
			      const labelId = `transfer-list-item-${value.dataField}-label`;

			      return (
			        <ListItem key={value.dataField} role="listitem" button onClick={e => {
				        	this.handleToggle(value)
						}}>
						<ListItemText id={labelId} primary={value.text} />
			        </ListItem>
			      );
			    })}
			  </List>
			</Paper>
		)
	}

	render() {
    
        return (
			<Grid container spacing={2} justify="center" alignItems="center">
				<Grid item>{this.customList(this.state.left)}</Grid>
				<Grid item>
					<Grid container direction="column" alignItems="center">
						<Button variant="outlined" size="small" onClick={this.handleAllRight} 
							disabled={this.state.left.length === 0} aria-label="move all right"
						>≫</Button>
						<Button variant="outlined" size="small" onClick={this.handleAllLeft}
							disabled={this.state.right.length === 0} aria-label="move all left"
						>≪</Button>
					</Grid>
			</Grid>
				<Grid item>{this.customList(this.state.right)}</Grid>
			</Grid>
        )
    }
}
export default MultiSelect;
