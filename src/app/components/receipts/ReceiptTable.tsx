import React, { useState } from "react"

import { Grid } from '@material-ui/core';

import Table from "../custom/Table";
import Button from '../custom/AddButton'

import { connect } from "react-redux";
import { getReceiptTable } from "../../redux/actions/receipts/index";

import { Order } from '../../types/order'
import Utils from "../../utils/TableUtils";

const ReceiptTable: React.FC<any> = (props) => {
    
	React.useEffect(() => {
		props.getReceiptTable();
	}, [])

	return (
		<Grid container direction="column" spacing={3}>
			<Grid item xs>
				<Button text="Nuevo recibo" href={'/receipts'} />
			</Grid>
			<Grid item xs>
				<Table
					data={props.table_data}
					page={props.page}
					size={props.size}
					total={props.total}
					columns={Utils.getReceiptColumns()}
					showColumns={false}
					onPaginationFilterChange={(page: number, size: number, filters:any, sort: string, sortDirection: Order) => {
						props.getReceiptTable(page, size, filters, sort, sortDirection);
					}}
					onRowClick={(id: number) => {
						window.open("/receipts/" + id, "_self");
					}}
				/>
			</Grid>
		</Grid>
	)
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
	getReceiptTable
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ReceiptTable);


