import * as React from "react"

import { Grid } from '@mui/material';

import Table from "../../components/custom/Table";
import Button from '../../components/custom/AddButton'

import { connect } from "react-redux";
import { getSportSchoolTable, downloadSportSchools } from "../../redux/actions/sportSchools/index";
import Utils from "../../utils/TableUtils";

import { Order } from '../../types/order'

import { isManager, isAdmin } from "../../services/LoginService";

const SportSchoolTable: React.FC<any> = (props) => {

	React.useEffect(() => {
		props.getSportSchoolTable();
	}, [])

	const downloadData = (columns: any) => {
		props.downloadSportSchools(columns)
	}

	return (
		<React.Suspense fallback={<div>Cargando...</div>}>
			<Grid container direction="column" spacing={3}>
				{ (isAdmin() || isManager()) &&
					<Grid item xs>
						<Button
							text="Nueva Escuela Deportiva" 
							href={'/sport_schools'} 
						/>
					</Grid>
				}
				<Grid item xs>
					<Table
						data={props.table_data}
						page={props.page}
						size={props.size}
						total={props.total}
						columns={Utils.getSportSchoolColumns()}
						downloadData={downloadData}
						showColumns={true}
						onPaginationFilterChange={(page: number, size: number, filters:any, sort: string, sortDirection: Order) => {
							props.getSportSchoolTable(page, size, filters, sort, sortDirection);
						}}
						onRowClick={(id: number) => {
							window.open("/sport_schools/" + id, "_self");
						}}
					/>
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
	getSportSchoolTable, downloadSportSchools
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SportSchoolTable);


