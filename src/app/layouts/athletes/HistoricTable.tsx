import * as React from "react"

import { Grid } from '@material-ui/core';

import Table from "../../components/custom/Table";

import Utils from "../../utils/TableUtils";

import { connect } from "react-redux";
import { getHistoricTable, downloadHistoricAthletes } from "../../redux/actions/athletes";

import { Order } from '../../types/order'

const HistoricTableComponent: React.FC<any> = (props) => {

	React.useEffect(() => {
		props.getHistoricTable();
	}, [])

	const downloadData = (columns: any, filters: any) => {
		props.downloadHistoricAthletes(columns, filters)
	}

	return (
		<React.Suspense fallback={<div>Cargando...</div>}>
			<Grid container direction="column">
				<Grid item xs >
					<Table 
						data={props.table_data}
						page={props.page}
						size={props.size}
						total={props.total}
						columns={Utils.getAthleteColumns()} 
						downloadData={downloadData}
						showColumns={true}
						onPaginationFilterChange={(page: number, size: number, filters: any, sort: string, sortDirection: Order) => {
							props.getHistoricTable(page, size, filters, sort, sortDirection);
						}}
						onRowClick={(id: number) => {
							window.open("/athletes/" + id, "_self");
						}}>
					</Table>
				</Grid>
			</Grid>
		</React.Suspense>
	)
}

function mapStateToProps(state: any) {
	return {
		table_data: state.table_reducer.table_data,
		page: state.table_reducer.page,
		size: state.table_reducer.size,
		total: state.table_reducer.total
	};
}

// Object of action creators
const mapDispatchToProps = {
	getHistoricTable, downloadHistoricAthletes
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HistoricTableComponent);