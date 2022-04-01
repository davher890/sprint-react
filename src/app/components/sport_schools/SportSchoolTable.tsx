import * as React from "react"

import { Grid } from '@material-ui/core';

import Table from "../custom/Table";
import Button from '../custom/AddButton'

import { connect } from "react-redux";
import { getSportSchoolTable, downloadSportSchools } from "../../redux/actions/sportSchools/index";
import Utils from "../../utils/TableUtils";

import { Order } from '../../types/order'

class SportSchoolTable extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			columns: Utils.getSportSchoolColumns()
		};
		this.downloadData = this.downloadData.bind(this)
	}

	componentDidMount() {
		this.props.getSportSchoolTable();
	}

	downloadData() {
		this.props.downloadSportSchools(this.state.columns)
	}

	render() {
		return (
			<React.Suspense fallback={<div>Cargando...</div>}>
				<Grid container direction="column" spacing={3}>
					<Grid item xs>
						<Button text="Nueva Escuela Deportiva" href={'/sport_schools'} />
					</Grid>
					<Grid item xs>
						<Table
							data={this.props.table_data}
							page={this.props.page}
							size={this.props.size}
							total={this.props.total}
							columns={this.state.columns}
							downloadData={this.downloadData}
							showColumns={true}
							onPaginationFilterChange={(page: number, size: number, filters:any, sort: string, sortDirection: Order) => {
								this.props.getSportSchoolTable(page, size, filters, sort, sortDirection);
							}}
							onRowClick={(id: number) => {
								window.open("/sport_schools/" + id, "_self");
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
	getSportSchoolTable, downloadSportSchools
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SportSchoolTable);


