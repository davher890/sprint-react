import * as React from "react"

import { Container, Grid } from '@mui/material';

import Table from "../../components/custom/Table";

import { connect } from "react-redux";
import { getFamilyTable } from "../../redux/actions/families/index";
import Utils from "../../utils/TableUtils";

const FamilyTable: React.FC<any> = (props) => {

	React.useEffect(() => {
		props.getFamilyTable();
	}, [])

	return (
		<Container fixed>
			<React.Suspense fallback={<div>Cargando...</div>}>
				<Grid container direction="column">
					<Grid item xs>
						<Table 
							data={props.table_data}
							page={props.page}
							size={props.size}
							total={props.total}
							columns={Utils.getFamilyColumns()} 
							onPaginationFilterChange={(page: number, size: number, filters:any) => {
								props.getFamilyTable(page, size, filters);
							}}
							onRowClick={(id: number) => {
								window.open("/families/" + id, "_self");
							}}
						/>
					</Grid>
				</Grid>
			</React.Suspense>
		</Container>
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
	getFamilyTable
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FamilyTable);


