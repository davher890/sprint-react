import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "./custom/Table_copy";
import { textFilter } from 'react-bootstrap-table2-filter';
import Button from './custom/Button'
import Grid from '@material-ui/core/Grid';

import { connect } from "react-redux";
import { getSportSchools, downloadSportSchools } from "../app/actions/sportSchools/index";

class TableSportSchools extends Component {
	constructor(props) {
		super(props);
		this.state = {
			columns: [
				{ dataField: 'id', text: 'Id', hide: true },
				{ dataField: 'name', text: 'Nombre', filter: textFilter(), show: true, width: 300 },
				{ dataField: 'municipality', text: 'Municipio', filter: textFilter(), width: 400 },
				{ dataField: 'address', text: 'Dirección', filter: textFilter(), width: 1300 }
			],
			entityName: 'sport_schools'
		};
		this.downloadData = this.downloadData.bind(this)
	}

	componentDidMount() {
		this.props.getSportSchools();
	}

	dataConversor(d) {
		return {
			id: d.id,
			name: d.name,
			municipality: d.municipality,
			address: d.address
		}
	}

	downloadData(){
		this.props.downloadSportSchools(this.state.columns)
	}

	render() {
		return (
			<Grid container direction="column">
				<Button text="Nueva Escuela Deportiva" href={`/${this.state.entityName}`} />
				<Grid item xs>
					<Table
						columns={this.state.columns}
						entityName={this.state.entityName}
						dataConversor={this.dataConversor}
						showCreate={true}
						downloadData={this.downloadData}>
					</Table>
				</Grid>
			</Grid>
		)
	}
}

function mapStateToProps(state) {
	return {
		sport_schools: state.sport_schools.slice(0, 10)
	};
}

export default connect(
	mapStateToProps,
	{ getSportSchools, downloadSportSchools }
)(TableSportSchools);


