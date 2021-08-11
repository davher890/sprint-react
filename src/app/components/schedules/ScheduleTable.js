import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

import Table from "../custom/Table";

import { connect } from "react-redux";
import { getScheduleTable } from "../../redux/actions/schedules";

class ScheduleTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	columns : [ 
        		{ dataField: 'day', text : 'Día', show: true} , 
        		{ dataField: 'start', text : 'Inicio', show: true }, 
        		{ dataField: 'end', text : 'Fin', show: true }
    		]
        }
    }

    componentDidMount() {
		this.props.getScheduleTable();
	}

	render() {
		return (
			<Container>
				<Table 
					data={this.props.table_data}
					page={this.props.page}
					size={this.props.size}
					total={this.props.total}
					columns={this.state.columns}
					showColumns={false}
					onPaginationChange={(page, size) => {
						this.props.getScheduleTable(page, size);
					}}
					onFilterChange={(filters) => {
						this.props.getScheduleTable(this.props.page, this.props.size, filters);
					}}
					onRowClick={(id) => {
						window.open("/schedules/" + id, "_self");
					}}		
				>
				</Table>
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

const mapDispatchToProps = {
	getScheduleTable
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ScheduleTable);



