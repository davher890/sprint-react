import * as React from "react"

import { Container, Grid } from '@material-ui/core';

import Table from "../custom/Table";

import { connect } from "react-redux";
import { getGroupTable } from "../../redux/actions/groups/index";
import Utils from "../../utils/TableUtils";

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
			<Container fixed>
				<React.Suspense fallback={<div>Cargando...</div>}>
					<Grid container direction="column">
						<Grid item xs>
							<Table 
								data={this.props.table_data}
								page={this.props.page}
								size={this.props.size}
								total={this.props.total}
								columns={this.state.columns} 
								onPaginationChange={(page: number, size: number, filters:any) => {
									this.props.getGroupTable(page, size, filters);
								}}
								onFilterChange={(filters: any) => {
									this.props.getGroupTable(this.props.page, this.props.size, filters);
								}}
								onRowClick={(id: number) => {
									window.open("/groups/" + id, "_self");
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

// Object of action creators
const mapDispatchToProps = {
	getGroupTable
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GroupTable);

