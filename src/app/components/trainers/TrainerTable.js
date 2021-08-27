import React, { Component, Suspense } from "react";

import { Container, Grid } from '@material-ui/core';

import { textFilter } from 'react-bootstrap-table2-filter';

import Table from "../custom/Table";
import Button from '../custom/Button'

import { connect } from "react-redux";
import { getTrainerTable } from "../../redux/actions/trainers";

class TrainerTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	columns : [
        		{ dataField: 'name', text: 'Nombre', filter: textFilter(), show: true }
    		]
        }
    }

	componentDidMount() {
		this.props.getTrainerTable();
	}

	render() {
		return (
			<Container fixed>
				<Suspense fallback={<div>Cargando...</div>}>
					<Grid container direction="column" spacing={3}>
						<Grid item xs>
							<Button text="Nuevo Entrenador" href={'/trainers'}/>
						</Grid>
						<Grid item xs>
							<Table 
								data={this.props.table_data}
								page={this.props.page}
								size={this.props.size}
								total={this.props.total}
								columns={this.state.columns} 
								showColumns={true}
								// filter={this.props.filter}>
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
	getTrainerTable
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TrainerTable);