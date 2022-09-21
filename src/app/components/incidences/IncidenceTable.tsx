import React, { useState } from "react"

import { Grid } from '@material-ui/core';

import Table from "../custom/Table";
import Button from '../custom/AddButton'

import { connect } from "react-redux";
import { getIncidenceTable } from "../../redux/actions/incidences/index";
import Utils from "../../utils/TableUtils";

const IncidenceTable: React.FC<any> = (props) => {
	
	const [columns, setColumns] = useState<any[]>(Utils.getIncidenceColumns())
    
	React.useEffect(() => {
		props.getIncidenceTable();
	}, [])

	return (
		<Grid container direction="column" spacing={3}>
			<Grid item xs>
				<Button text="Nueva Incidencia" href={'/incidences'} />
			</Grid>
			<Grid item xs>
				<Table
					data={props.table_data}
					page={props.page}
					size={props.size}
					total={props.total}
					columns={columns}
					showColumns={false}
					onRowClick={(id: number) => {
						window.open("/incidences/" + id, "_self");
					}}
				/>
			</Grid>
		</Grid>
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
	getIncidenceTable
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(IncidenceTable);


