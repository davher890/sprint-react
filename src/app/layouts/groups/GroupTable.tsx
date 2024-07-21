import * as React from "react"

import { Grid } from '@mui/material';

import Table from "../../components/custom/Table";
import Button from '../../components/custom/AddButton'

import { connect } from "react-redux";
import { getGroupTable } from "../../redux/actions/groups/index";
import Utils from "../../utils/TableUtils";

import { Order } from '../../types/order'

import { isManager, isAdmin } from "../../services/LoginService";

const GroupTable: React.FC<any> = (props) => {

	React.useEffect(() => {
		props.getGroupTable();
	}, [])

	return (
		<React.Suspense fallback={<div>Cargando...</div>}>
			<Grid container direction="column" spacing={3}>
				{ (isAdmin() || isManager()) &&	
					<Grid item xs>
						<Button text="Nuevo Grupo" href={'/groups'}/>
					</Grid>
				}
				<Grid item xs>
					<Table 
						data={props.table_data}
						page={props.page}
						size={props.size}
						total={props.total}
						orderBy="name"
						columns={Utils.getGroupColumns()}
						onPaginationFilterChange={(page: number, size: number, filters:any, sort: string, sortDirection: Order) => {
							props.getGroupTable(page, size, filters, sort, sortDirection);
						}}
						onRowClick={(id: number) => {
							window.open("/groups/" + id, "_self");
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
	getGroupTable
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GroupTable);

