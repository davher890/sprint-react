import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "./custom/Table";
import { textFilter } from 'react-bootstrap-table2-filter';
import Button from './custom/Button'
import Grid from '@material-ui/core/Grid';

class TableSportSchools extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        	columns : [
        		{ dataField: 'id', text: 'Id', hide: true },
	        	{ dataField: 'name', text: 'Nombre', filter: textFilter(), show: true, width : 300 },
        		{ dataField: 'municipality', text: 'Municipio', filter: textFilter(), width : 400},
        		{ dataField: 'address', text: 'Dirección', filter: textFilter(), width : 1300 }
    		],
    		entityName : 'sport_schools'
        };
    }

    dataConversor(d) {
    	return {
			id : d.id,
			name : d.name,
			municipality : d.municipality,
			address : d.address
		}
    }

    render() {
		return (
			<Grid container direction="column">
				<Button text="Nueva Escuela Deportiva" href={`/${this.state.entityName}`}/>
				<Grid item xs>
					<Table 
						columns={this.state.columns} 
						entityName={this.state.entityName}
						dataConversor={this.dataConversor}
						showCreate={true}>
					</Table>
				</Grid>
			</Grid>
		)
	}
}

export default TableSportSchools;


