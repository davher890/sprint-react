import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import Paginator from 'react-bootstrap-table2-paginator'
import Filter from 'react-bootstrap-table2-filter';

import Grid from '@material-ui/core/Grid';

import ColumnsSelect from "../ColumnsSelect";

export default (props) => {

	const [columns, setColumns] = useState(props.columns);

	const handleTableChange = (type, pageProp) => {

		if (type === 'pagination' && props.onPaginationChange){
			props.onPaginationChange(pageProp.page, pageProp.sizePerPage)
		}
		else if (type === 'filter' && props.onFilterChange) {
			props.onFilterChange(pageProp.filters)
		}
	}

	const downloadData = () => {
		if (props.downloadData){
			props.downloadData(columns)
		}
	}

	const onRowClick = (id, row) => {
		if (props.onRowClick){
			props.onRowClick(id, row)
		}
	}

	return (
		<Grid container spacing={3} direction="column">
			<Grid container item style={{ display: props.showColumns ? "block" : "none" }}>
				<Grid item xs>
					<ColumnsSelect 
						columns={props.columns}
						changeEvent={(cols) => { 
							setColumns(cols) 
						}}
						downloadData={downloadData}
					/>
				</Grid>
			</Grid>
			<Grid container item spacing={1}>
				<Grid item xs>
					<BootstrapTable striped bordered hover 
						remote
						keyField="id"
						data={props.data}
						columns={columns.filter(c => c.show === true)}
						onTableChange={handleTableChange}
						filter={Filter()}
						pagination={Paginator({ page: props.page, sizePerPage: props.size, totalSize: props.total })}
						noDataIndication="Sin Datos"
						rowEvents={{
							onClick: (e, row, rowIndex) => {
								onRowClick(row.id, row)
							}
						}}
					/>
				</Grid>
			</Grid>
		</Grid>
	)
}