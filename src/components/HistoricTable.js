import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "./custom/Table";
import { textFilter, selectFilter, numberFilter } from 'react-bootstrap-table2-filter';
import Grid from '@material-ui/core/Grid';

class HistoricTableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	columns : [
	        	{ dataField: 'name', text : 'Nombre', filter: textFilter(), show: true }, 
	        	{ dataField: 'birthDate', text : 'Fecha de Nacimiento', show: true }, 
	        	{ dataField: 'gender', text : 'Género', filter: selectFilter({
	        		options : {
	        			'male' : 'Masculino',
	        			'female' : 'Femenino'
	        		}
	        	})  }, 
	        	{ dataField: 'category', text : 'Categoría', filter: textFilter() }, 
	        	{ dataField: 'license', text : 'Licencia' }, 
	        	{ dataField: 'dorsalNumber', text : 'Dorsal', filter: numberFilter()}
        	],
        	entityName : 'athletes/:id/historic'
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
            <Grid container direction="column">
           		<Grid item xs spacing={1}>
					<Table 
						columns={this.state.columns} 
						entityName={this.state.entityName}
						dataConversor={this.dataConversor}
						filter={this.props.filter}
						showCreate={true} >
					</Table>
				</Grid>
			</Grid>
		)
	}
}

export default HistoricTableComponent;


