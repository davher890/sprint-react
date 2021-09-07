import * as React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import Paginator, { PaginationProvider } from 'react-bootstrap-table2-paginator'
import Filter from 'react-bootstrap-table2-filter';

import Grid from '@material-ui/core/Grid';

import ColumnsSelect from "../ColumnsSelect";
import Button from "../PageButton";


const RemotePagination = (props: any) => (
	<div>
		<PaginationProvider
			pagination={
				Paginator(props.paginationOptions)
			}
		>
		{
			(paginationTableProps: any) => (
			<div>
				<BootstrapTable striped bordered hover 
					remote
					keyField="id"
					data={ props.data }
					columns={ props.columns }
					onTableChange={ props.onTableChange }
					filter={props.filter}
					noDataIndication="Sin Datos"
					rowEvents={props.rowEvents}
					{ ...paginationTableProps }
				/>
			</div>
			)
		}
		</PaginationProvider>
	</div>
  );

const Table: React.FC<any> = ({ props = {}}) => {

	const [columns, setColumns] = React.useState<any[]>(props.columns || []);
	const [page, setPage] = React.useState<number>(props.page || 1)
	const [pageSize, setPageSize] = React.useState<number>(props.pageSize || 10)

	const handleTableChange = (type: any, obj: { filters: any }) => {
		props.onFilterChange(obj.filters)
	}

	const handlePageChange = (inputPage: string) => {
		
		let p: number
		if (inputPage === '>>'){
			p = Math.ceil(props.total / pageSize * 1.0)
		}
		else if (inputPage === '>'){
			p = page + 1
		}
		else if (inputPage === '<<'){
			p = 1
		}
		else if (inputPage === '<'){
			p = page - 1
		}
		else {
			p = parseInt(inputPage)
		}
		setPage(p)
		if (props.onPaginationChange){
			props.onPaginationChange(p, pageSize)
		}
	}
	const handlePageSizeChange = (pageSize: number) => {
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
	const onRowClick = (id: number, row: number) => {
		if (props.onRowClick){
			props.onRowClick(id, row)
		}
	}

	const paginationOptions = { 
		page: page, 
		sizePerPage: pageSize, 
		totalSize: props.total,
		pageButtonRenderer: (props: any) => {
			const handleClick = (e: any) => {
				e.preventDefault();
				handlePageChange(page.toString());
			};
			return (
				<Grid item xs={1} key={page} >
					<Button key={page} text={page} onClick={handleClick} color={props.active ? "primary" : "secondary"}/>
				</Grid>
			);
		},
		sizePerPageRenderer: (opts: any) => {
			return (
			<div className="btn-group" role="group">
			{
				opts.options.map((option: any) => {
					const isSelect = opts.currSizePerPage === `${option.page}`;
					return (
						<Button
							text={ option.text }
							key={ option.text }
							onClick={ (e: any)=> { e.preventDefault();handlePageSizeChange(option.page);}} 
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
						columns={columns}
						changeEvent={(cols: any) => { 
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
						columns={columns.filter((c: any) => c.show === true)}
						onTableChange={handleTableChange}
						filter={Filter()}
						rowEvents={{
							onClick: (e: any, row: any, rowIndex: number) => {
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

export default Table