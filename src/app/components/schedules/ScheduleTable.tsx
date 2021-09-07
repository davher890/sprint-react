import * as React from "react"
import { Container } from 'react-bootstrap';

import Table from "../custom/Table";

import { connect } from "react-redux";
import { getScheduleTable } from "../../redux/actions/schedules";

class ScheduleTable extends React.Component<any, any> {
    constructor(props: any) {
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
					onPaginationChange={(page: number, size: number) => {
						this.props.getScheduleTable(page, size);
					}}
					onFilterChange={(filters: any) => {
						this.props.getScheduleTable(this.props.page, this.props.size, filters);
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



