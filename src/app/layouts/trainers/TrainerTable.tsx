import * as React from "react"

import { Grid } from '@mui/material';

import Table from "../../components/custom/Table";
import Button from '../../components/custom/AddButton'

import { connect } from "react-redux";
import { getTrainerTable, downloadTrainers } from "../../redux/actions/trainers";
import Utils from "../../utils/TableUtils";

import { Order } from '../../types/order'

class TrainerTable extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
        	columns : Utils.getTrainerColumns()
        }
    }

	componentDidMount() {
		this.props.getTrainerTable();
	}

	render() {
		return (
			<React.Suspense fallback={<div>Cargando...</div>}>
				<Grid container direction="column" spacing={3}>
					<Grid item xs>
						<Button text='Nuevo Entrenador' href={'/trainers'}/>
					</Grid>
					<Grid item xs>
						<Table 
							data={this.props.table_data}
							page={this.props.page}
							size={this.props.size}
							total={this.props.total}
							columns={this.state.columns} 
							onPaginationFilterChange={(page: number, size: number, filters:any, sort: string, sortDirection: Order) => {
								this.props.getTrainerTable(page, size, filters, sort, sortDirection);
							}}
							onRowClick={(id: number) => {
								window.open("/trainers/" + id, "_self");
							}}
						/>
					</Grid>
				</Grid>
			</React.Suspense>
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