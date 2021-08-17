import React, { Component, Suspense } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { textFilter } from 'react-bootstrap-table2-filter';

import { Container, Grid } from '@material-ui/core';

import Table from "../custom/Table";
import Button from '../custom/Button'

import { connect } from "react-redux";
import { getSportSchoolTable, downloadSportSchools } from "../../redux/actions/sportSchools/index";

class SportSchoolTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			columns: [
				{ dataField: 'id', text: 'Id', show: false },
				{ dataField: 'name', text: 'Nombre', filter: textFilter(), show: true, width: 300 },
				{ dataField: 'municipality', text: 'Municipio', filter: textFilter(), width: 400 },
				{ dataField: 'address', text: 'Dirección', filter: textFilter(), width: 1300 }
			]
		};
		this.downloadData = this.downloadData.bind(this)
	}

	componentDidMount() {
		this.props.getSportSchoolTable();
	}

	downloadData() {
		this.props.downloadSportSchools(this.state.columns)
	}

	render() {
		return (
			<Container fixed>
				<Suspense fallback={<div>Cargando...</div>}>
					<Grid container direction="column" spacing={3}>
						<Grid item xs>
							<Button text="Nueva Escuela Deportiva" href={'/sport_schools'} />
						</Grid>
						<Grid item xs>
							<Table
								data={this.props.table_data}
								page={this.props.page}
								size={this.props.size}
								columns={this.state.columns}
								downloadData={this.downloadData}
								showColumns={true}
								onPaginationChange={(page, size) => {
									this.props.getSportSchoolTable(page, size);
								}}
								onFilterChange={(filters) => {
									this.props.getSportSchoolTable(this.props.page, this.props.size, filters);
								}}
								onRowClick={(id) => {
									window.open("/sport_schools/" + id, "_self");
								}}
							/>
						</Grid>
					</Grid>
				</Suspense>
			</Container>
		)
	}
}

function mapStateToProps(state) {
	return {
		table_data: state.table_reducer.table_data,
		page: state.table_reducer.page,
		size: state.table_reducer.size,
		total: state.table_reducer.total
	};
}

// Object of action creators
const mapDispatchToProps = {
	getSportSchoolTable, downloadSportSchools
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SportSchoolTable);


