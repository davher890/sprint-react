import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "./Table";
import { textFilter, selectFilter, numberFilter } from 'react-bootstrap-table2-filter';

import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import Grid from '@material-ui/core/Grid';

class AthletesTableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	columns : [
	        	{ dataField: 'name', text : 'Nombre', filter: textFilter() }, 
	        	{ dataField: 'birthDate', text : 'Fecha de Nacimiento' }, 
	        	{ dataField: 'gender', text : 'Género', filter: selectFilter({
	        		options : {
	        			'male' : 'Masculino',
	        			'female' : 'Femenino'
	        		}
	        	}) }, 
	        	{ dataField: 'category', text : 'Categoría', filter: textFilter() }, 
	        	{ dataField: 'license', text : 'Licencia' }, 
	        	{ dataField: 'dorsalNumber', text : 'Dorsal', filter: numberFilter()}
        	],
        	entityName : 'athletes'
        }
    }

    dataConversor(d) {
    	return {
			id : d.id,
			name : d.name || '', 
			birthDate: new Intl.DateTimeFormat('sq-AL').format(new Date(d.birthDate)), 
			gender: d.gender === 'male' ? 'Masculino' : 'Femenino',
			category : d.category,
			license : d.license,
			dorsalNumber : d.dorsalNumber
		}
    }

	render() {
		return (
			<div>
				<Grid container spacing={1}>
					<Grid item xs>
						<Fab variant="extended" size="medium" color="secondary" aria-label="add" href={`/${this.entityName}`}>
				          <NavigationIcon/>Nuevo Atleta
				        </Fab>
					</Grid>
				</Grid>
				<Grid container spacing={1}>
					<Grid item xs>
						<Table 
							columns={this.state.columns} 
							entityName={this.state.entityName}
							dataConversor={this.dataConversor}
							filter={this.props.filter}
							showCreate={true} >
						</Table>
					</Grid>
				</Grid>
			</div>
		)
	}
}

export default AthletesTableComponent;


