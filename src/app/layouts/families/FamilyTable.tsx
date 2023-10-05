import * as React from "react"

import { Container, Grid } from '@material-ui/core';

import Table from "../../components/custom/Table";

import { connect } from "react-redux";
import { getFamilyTable } from "../../redux/actions/families/index";
import Utils from "../../utils/TableUtils";

class FamilyTable extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
        	columns : Utils.getFamilyColumns()
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
								onPaginationFilterChange={(page: number, size: number, filters:any) => {
									this.props.getFamilyTable(page, size, filters);
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


