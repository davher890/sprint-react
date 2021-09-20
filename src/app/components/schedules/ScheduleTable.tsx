import * as React from "react"
import { Container } from '@material-ui/core';

import Table from "../custom/Table";

import { connect } from "react-redux";
import { getScheduleTable } from "../../redux/actions/schedules";
import Utils from "../../utils/TableUtils";

class ScheduleTable extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
        	columns : Utils.getScheduleColumns()
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
					onPaginationFilterChange={(page: number, size: number, filters:any) => {
						this.props.getScheduleTable(page, size, filters);
					}}
					onRowClick={(id: number) => {
						window.open("/schedules/" + id, "_self");
					}}		
				>
				</Table>
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

const mapDispatchToProps = {
	getScheduleTable
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ScheduleTable);



