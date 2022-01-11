import * as React from "react"

import { Grid, Button } from '@material-ui/core';

import Table from "../custom/Table";

import { connect } from "react-redux";
import { getUserTable } from "../../redux/actions/users";
import Utils from "../../utils/TableUtils";

class UserTable extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
        	columns : Utils.getUserColumns()
        }
    }

	componentDidMount() {
		this.props.getUserTable();
	}

	render() {
		return (
			<React.Suspense fallback={<div>Cargando...</div>}>
				<Grid container direction="column" spacing={3}>
					<Grid item xs>
						<Button href={'/users'}>Nuevo Usuario</Button>
					</Grid>
					<Grid item xs>
						<Table 
							data={this.props.table_data}
							page={this.props.page}
							size={this.props.size}
							total={this.props.total}
							columns={this.state.columns} 
							showColumns={true}
							onPaginationFilterChange={(page: number, size: number, filters:any) => {
								this.props.getUserTable(page, size, filters);
							}}
							onRowClick={(id: number) => {
								window.open("/users/" + id, "_self");
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
	getUserTable
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserTable);