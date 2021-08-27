import React, { Component, Suspense } from "react";

import { Container, Grid } from '@material-ui/core';

import Table from "../custom/Table";
import Button from '../custom/AddButton'

import Utils from "../../utils/TableUtils";

import { connect } from "react-redux";
import { getAthleteTable, downloadAthletes } from "../../redux/actions/athletes";

class AthleteTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	columns: Utils.getAthleteColumns() 
		}
		this.downloadData = this.downloadData.bind(this)
    }

	componentDidMount() {
		this.props.getAthleteTable();
	}

	downloadData(columns) {
		this.props.downloadAthletes(columns)
	}

	render() {
		return (
			<Container fixed>
				<Suspense fallback={<div>Cargando...</div>}>
					<Grid container direction="column" spacing={3}>
						<Grid item xs>
							<Button text="Nuevo Atleta" href={'/athletes'}/>
						</Grid>
						<Grid item xs>
							<Table 
								data={this.props.table_data}
								page={this.props.page}
								size={this.props.size}
								total={this.props.total}
								columns={this.state.columns} 
								downloadData={this.downloadData}
								showColumns={true}
								onPaginationChange={(page, size) => {
									this.props.getAthleteTable(page, size);
								}}
								onFilterChange={(filters) => {
									this.props.getAthleteTable(this.props.page, this.props.size, filters);
								}}
								onRowClick={(id) => {
									window.open("/athletes/" + id, "_self");
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

const mapDispatchToProps = {
	getAthleteTable, downloadAthletes
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AthleteTable);