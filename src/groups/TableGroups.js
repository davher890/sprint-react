import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
	Container, 
	Row, Col,
	Form, Button,
	InputGroup
} from 'react-bootstrap';
import Table from "../utils/Table";

class TableGroups extends Component {
    constructor(props) {
        super(props);
        this.state = { 
    		entityName : 'groups',
    		groups : [],
    		schedules : [],
    		groupId : 0,
    		scheduleId : 0,
    		entityName2 : ""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async componentDidMount(){
                
        const headers = { 'Content-Type': 'application/json' }
        await fetch(process.env.REACT_APP_SERVER_URL + "/groups/all",  { headers })
            .then(res => res.json())
            .then(data => {
                this.setState({ groups : data})
            }).catch(function() {
		        console.log("error");
		    });
    }

    dataConversor(d) {
    	return {
			id : d.id,
			name : d.name
		}
    }

    handleInputChange(event) {

        event.preventDefault();

        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.state[name] = value
        this.setState(this.state);
    }

    render() {
		return (
			<Container>
				<Table 
					columns={this.state.columns} 
					entityName={this.state.entityName}
					dataConversor={this.dataConversor}>
				</Table>
			</Container>
		)
	}
}

export default TableGroups;


