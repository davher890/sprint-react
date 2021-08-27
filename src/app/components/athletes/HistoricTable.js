import React, { Component, Suspense } from "react";

import { Container, Grid } from '@material-ui/core';

import Table from "../custom/Table";

import Utils from "../../utils/TableUtils";

import { connect } from "react-redux";
import { getHistoricTable } from "../../redux/actions/athletes";

class HistoricTableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

	componentDidMount() {
		this.props.getHistoricTable();
	}

	render() {
		return (
            <Container fixed>
				<Suspense fallback={<div>Cargando...</div>}>
					<Grid container direction="column">
						<Grid item xs >
							<Table 
								data={this.props.table_data}
								page={this.props.page}
								size={this.props.size}
								total={this.props.total}
								columns={Utils.getAthleteColumns()} 
								showColumns={true}
								// filter={this.props.filter}
								onPaginationChange={(page, size) => {
									this.props.getHistoricTable(page, size);
								}}
								onFilterChange={(filters) => {
									this.props.getHistoricTable(this.props.page, this.props.size, filters);
								}}
								onRowClick={(id) => {
									window.open("/athletes/" + id, "_self");
								}}>
							</Table>
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
	getHistoricTable
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HistoricTableComponent);