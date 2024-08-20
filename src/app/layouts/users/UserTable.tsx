import * as React from "react"

import { Grid } from '@mui/material';

import Table from "../../components/custom/Table";
import Button from '../../components/custom/AddButton'

import { connect } from "react-redux";
import { getUserTable } from "../../redux/actions/users";
import Utils from "../../utils/TableUtils";

import { Order } from '../../types/order'

import { isAdmin, isManager } from "../../services/LoginService";

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
			<>
				<Grid container direction="column" spacing={3}>
					{ isAdmin() || isManager() ?
						<Grid item xs>
							<Button text="Nuevo Usuario" href={'/admin/users'}/>
						</Grid>
					: null }
					<Grid item xs>
						<Table 
							data={this.props.table_data}
							page={this.props.page}
							size={this.props.size}
							total={this.props.total}
							columns={this.state.columns} 
							showColumns={true}
							onPaginationFilterChange={(page: number, size: number, filters:any, sort: string, sortDirection: Order) => {
								this.props.getUserTable(page, size, filters, sort, sortDirection);
							}}
							onRowClick={(id: number) => {
								window.open("/admin/users/" + id, "_self");
							}}
						/>
					</Grid>
				</Grid>
			</>
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