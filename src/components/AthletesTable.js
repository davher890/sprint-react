import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "./custom/Table";
import { textFilter, selectFilter, numberFilter } from 'react-bootstrap-table2-filter';
import Button from './custom/Button'
import Grid from '@material-ui/core/Grid';

class AthletesTableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	columns : [
        		{ dataField: 'id', text: 'Id', hide: true },
	        	{ dataField: 'name', text : 'Nombre', filter: textFilter(), show: true, width : 50 }, 
	        	{ dataField: 'firstSurname', text : 'Primer apellido', filter: textFilter(), show: true, width : 50 }, 
	        	{ dataField: 'secondSurname', text : 'Segundo apellido', filter: textFilter(), show: true, width : 50 }, 
	        	{ dataField: 'birthDate', text : 'Fecha de Nacimiento', show: true, width : 200, type: 'dateTime' }, 
	        	{ dataField: 'gender', text : 'Género', filter: selectFilter({
	        		options : {
	        			'male' : 'Masculino',
	        			'female' : 'Femenino'
	        		}
	        	}), width : 150 }, 
	        	{ dataField: 'category', text : 'Categoría', filter: textFilter(), width : 150 }, 
	        	{ dataField: 'license', text : 'Licencia', width : 150 }, 
	        	{ dataField: 'dorsalNumber', text : 'Dorsal', filter: numberFilter(), width : 150 }
        	],
        	entityName : 'athletes'
        }
    }

    dataConversor(d) {
    	return {
			id : d.id,
			name : d.name || '', 
			firstSurname : d.firstSurname || '', 
			secondSurname : d.secondSurname || '', 
			birthDate: new Intl.DateTimeFormat('sq-AL').format(new Date(d.birthDate)), 
			gender: d.gender === 'male' ? 'Masculino' : 'Femenino',
			category : d.category,
			license : d.license,
			dorsalNumber : d.dorsalNumber
		}
    }

	render() {
		return (
			<Grid container direction="column">
                <Grid item xs>
                	<Button text="Nuevo Atleta" href={`/${this.state.entityName}`}/>
				</Grid>
				<Grid item xs>
					<Table 
						columns={this.state.columns} 
						entityName={this.state.entityName}
						dataConversor={this.dataConversor}
						filter={this.props.filter}>
					</Table>
				</Grid>
			</Grid>
		)
	}
}

export default AthletesTableComponent;


