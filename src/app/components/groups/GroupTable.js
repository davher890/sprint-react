import React, { Component, Suspense } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { textFilter } from 'react-bootstrap-table2-filter';

import { Container, Grid } from '@material-ui/core';

import Table from "../custom/Table_copy";

import { connect } from "react-redux";
import { getGroupTable } from "../../redux/actions/groups/index";

class GroupTable extends Component {
    constructor(props) {
        super(props);
        this.state = { 
    		columns : [
                { dataField: 'name', text : 'Nombre', filter: textFilter(), show: true }, 
            ]
        };
    }

	componentDidMount() {
		this.props.getGroupTable();
	}

    render() {
		return (
			<Container fixed>
				<Suspense fallback={<div>Cargando...</div>}>
					<Grid container direction="column">
						<Grid item xs>
							<Table 
								data={this.props.table_data}
								page={this.props.page}
								size={this.props.size}
								total={this.props.total}
								columns={this.state.columns} 
								onPaginationChange={(page, size) => {
									this.props.getGroupTable(page, size);
								}}
								onFilterChange={(filters) => {
									this.props.getGroupTable(this.props.page, this.props.size, filters);
								}}
								onRowClick={(id) => {
									window.open("/groups/" + id, "_self");
								}}
							/>
						</Grid>
					</Grid>
				</Suspense>
			</Container>
		)
	}
}

function mapStateToProps(state) {
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

