import * as React from "react"

import { Container, Grid } from '@material-ui/core';

import Table from "../custom/Table";
import Button from '../custom/Button'

import { connect } from "react-redux";
import { getTrainerTable, downloadTrainers } from "../../redux/actions/trainers";
import Utils from "../../utils/TableUtils";

class TrainerTable extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
        	columns : Utils.getTrainerColumns()
        }
		this.downloadData = this.downloadData.bind(this)
    }

	componentDidMount() {
		this.props.getTrainerTable();
	}

	downloadData(columns: any) {
		this.props.downloadTrainers(columns)
	}

	render() {
		return (
			<Container fixed>
				<React.Suspense fallback={<div>Cargando...</div>}>
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
								downloadData={this.downloadData}
								showColumns={true}
								onPaginationChange={(page: number, size: number, filters:any) => {
									this.props.getTrainerTable(page, size, filters);
								}}
								onFilterChange={(filters: any) => {
									this.props.getTrainerTable(this.props.page, this.props.size, filters);
								}}
								onRowClick={(id: number) => {
									window.open("/trainers/" + id, "_self");
								}}
							/>
						</Grid>
					</Grid>
				</React.Suspense>
			</Container>
		)
	}
}

function mapStateToProps(state: any) {
	return {
		table_data: state.table_reducer.table_data,
		page: state.table_reducer.page,
		size: state.table_reducer.size,
		total: state.table_reducer.total
	};
}

const mapDispatchToProps = {
	getTrainerTable, downloadTrainers
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TrainerTable);