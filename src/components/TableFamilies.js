import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Table from "./custom/Table";
import { numberFilter } from 'react-bootstrap-table2-filter';

class TableFamilies extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	columns : [
	        	{ dataField: 'code', text : 'Código', filter: numberFilter() },
	        	{ dataField: 'count', text : 'Número de familiares' }
        	],
        	entityName : 'families',
        }
    }

    dataConversor(d) {
    	return {
			id : d.id,
			code : d.code, 
			count : d.count
		}
    }

	render() {
		return (
			<Container>
				<Table 
					columns={this.state.columns} 
					entityName={this.state.entityName}
					dataConversor={this.dataConversor} >
				</Table>
			</Container>
		)
	}
}

export default TableFamilies;


