import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import Paginator, { PaginationProvider } from 'react-bootstrap-table2-paginator'
import Filter from 'react-bootstrap-table2-filter';

import Grid from '@material-ui/core/Grid';

import ColumnsSelect from "../ColumnsSelect";
import Button from "../PageButton";


const RemotePagination = ({ data, columns, onTableChange, filter, rowEvents, paginationOptions }) => (
	<div>
		<PaginationProvider
			pagination={
				Paginator(paginationOptions)
			}
		>
		{
			({
			paginationTableProps
			}) => (
			<div>
				<BootstrapTable striped bordered hover 
					remote
					keyField="id"
					data={ data }
					columns={ columns }
					onTableChange={ onTableChange }
					filter={filter}
					noDataIndication="Sin Datos"
					rowEvents={rowEvents}
					{ ...paginationTableProps }
				/>
			</div>
			)
		}
		</PaginationProvider>
	</div>
  );

export default (props) => {

	const [columns, setColumns] = useState(props.columns);
	const [page, setPage] = useState(props.page || 1)
	const [pageSize, setPageSize] = useState(props.pageSize || 10)

	const handleTableChange = (type, { filters }) => {
		props.onFilterChange(filters)
	}

	const handlePageChange = (p) => {
		if (p === '>>'){
			p = Math.ceil(props.total / pageSize * 1.0)
		}
		else if (p === '>'){
			p = page + 1
		}
		else if (p === '<<'){
			p = 1
		}
		else if (p === '<'){
			p = page - 1
		}
		setPage(p)
		if (props.onPaginationChange){
			props.onPaginationChange(p, pageSize)
		}
	}
	const handlePageSizeChange = (pageSize) => {
		setPageSize(pageSize)
		if (props.onPaginationChange){
			props.onPaginationChange(page, pageSize)
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

	const paginationOptions = { 
		page: page, 
		sizePerPage: pageSize, 
		totalSize: props.total,
		pageButtonRenderer: ({
			page,
			active,
			disable,
			title
		  }) => {
			const handleClick = (e) => {
				e.preventDefault();
				handlePageChange(page);
			};
			return (
				<Grid item xs={1} key={page} >
					<Button key={page} text={page} onClick={handleClick} color={active ? "primary" : "secondary"}/>
				</Grid>
			);
		},
		sizePerPageRenderer: ({
			options,
			currSizePerPage,
		}) => {
			return (
			<div className="btn-group" role="group">
			{
				options.map((option) => {
					const isSelect = currSizePerPage === `${option.page}`;
					return (
						<Button
							text={ option.text }
							key={ option.text }
							onClick={ (e)=> { e.preventDefault();handlePageSizeChange(option.page);}} 
							color={isSelect ? "primary" : "secondary"}
						/>
					);
				})
			}
			</div>)
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
					<RemotePagination
						data={props.data}
						columns={columns.filter(c => c.show === true)}
						onTableChange={handleTableChange}
						filter={Filter()}
						rowEvents={{
							onClick: (e, row, rowIndex) => {
								onRowClick(row.id, row)
							}
						}}
						paginationOptions={paginationOptions}
					/>
				</Grid>
			</Grid>
		</Grid>
	)
}