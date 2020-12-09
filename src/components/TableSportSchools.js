import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "./custom/Table";
import { textFilter } from 'react-bootstrap-table2-filter';
import SprintButton from './buttons/SprintButton'
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
			<div>
				<SprintButton text="Nueva Escuela Deportiva" href={`/${this.state.entityName}`}/>
				<Grid container spacing={1}>
					<Grid item xs>
						<Table 
							columns={this.state.columns} 
							entityName={this.state.entityName}
							dataConversor={this.dataConversor}
							showCreate={true}>
						</Table>
					</Grid>
				</Grid>
			</div>
		)
	}
}

export default TableSportSchools;


