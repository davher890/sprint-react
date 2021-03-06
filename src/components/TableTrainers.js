import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Table from "./custom/Table";
import { textFilter } from 'react-bootstrap-table2-filter';

class TableTrainers extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	columns : [
        		{ dataField: 'name', text: 'Nombre', filter: textFilter() }
    		],
    		entityName : 'trainers'
        }
    }

    dataConversor(d){
    	return {
			id : d.id, 
			name: d.name
		}
    }

	render() {
		return (
			<Container>
				<Table 
					columns={this.state.columns} 
					entityName={this.state.entityName}
					dataConversor={this.dataConversor}
					showCreate={true}>
				</Table>
			</Container>
		)
	}
}

export default TableTrainers;


