import * as React from "react"

import { Grid } from '@material-ui/core';

import Table from "../custom/Table";
import Button from '../custom/AddButton'

import { connect } from "react-redux";
import { getGroupTable } from "../../redux/actions/groups/index";
import Utils from "../../utils/TableUtils";

import { Order } from '../../types/order'

import { isManager, isAdmin } from "../../services/LoginService";

class GroupTable extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { 
    		columns : Utils.getGroupColumns()
        };
    }

	componentDidMount() {
		this.props.getGroupTable();
	}

    render() {
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
							data={this.props.table_data}
							page={this.props.page}
							size={this.props.size}
							total={this.props.total}
							columns={this.state.columns} 
							onPaginationFilterChange={(page: number, size: number, filters:any, sort: string, sortDirection: Order) => {
								this.props.getGroupTable(page, size, filters, sort, sortDirection);
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

