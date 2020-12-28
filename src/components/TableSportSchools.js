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
        		{ dataField: 'name', text: 'Nombre', filter: textFilter(), show: true },
        		{ dataField: 'municipality', text: 'Municipio', filter: textFilter() },
        		{ dataField: 'address', text: 'Dirección', filter: textFilter() }
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
				<Grid item xs spacing={1}>
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


