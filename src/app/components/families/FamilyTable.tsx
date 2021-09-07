import * as React from "react"
import { numberFilter } from 'react-bootstrap-table2-filter';

import { Container, Grid } from '@material-ui/core';

import Table from "../custom/Table";

import { connect } from "react-redux";
import { getFamilyTable } from "../../redux/actions/families/index";

class FamilyTable extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
        	columns : [
	        	{ dataField: 'code', text : 'Código', filter: numberFilter({}), show: true },
	        	{ dataField: 'count', text : 'Número de familiares', show: true }
        	]
        }
    }

	componentDidMount() {
		this.props.getFamilyTable();
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
								onPaginationChange={(page: number, size: number) => {
									this.props.getFamilyTable(page, size);
								}}
								onFilterChange={(filters: any) => {
									this.props.getFamilyTable(this.props.page, this.props.size, filters);
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


