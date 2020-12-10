import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "./custom/Table";
import { textFilter, selectFilter, numberFilter } from 'react-bootstrap-table2-filter';
import Button from './custom/Button'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class AthletesTableComponent extends Component {
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
			<Grid container>
	            <Card><CardContent>
	                <Grid container>
						<Button text="Nuevo Atleta" href={`/${this.state.entityName}`}/>
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
					</Grid>
				</CardContent></Card>
			</Grid>
		)
	}
}

export default AthletesTableComponent;


