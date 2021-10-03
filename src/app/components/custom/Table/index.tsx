import * as React from "react"

import { withTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Table, TableBody, TableHead, TableRow, TablePagination, TableCell, TableContainer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ColumnsSelect from "../ColumnsSelect";
import TextField from "../TextField";
import TablePaginationActions from "../TablePagination";


const CustomTable: React.FC<any> = (props) => {

	const styles = makeStyles({
		root: {
			background: props.theme.palette.primary.main,
			borderColor: 'white',
		},
		focused: {
			borderColor: props.theme.palette.secondary.main,
		},
		input: {
			  color: props.theme.palette.secondary.main
		},
		label: {
			color : props.theme.palette.secondary.main
		},
	});

	const classes = styles();

	const [columns, setColumns] = React.useState<any[]>(props.columns || []);
	const [page, setPage] = React.useState<number>(props.page || 0)
	const [pageSize, setPageSize] = React.useState<number>(props.pageSize || 10)
	const [visibleColumns, setVisibleColumns] = React.useState<any[]>(props.columns.filter((c: any) => c.show === undefined || c.show === true) || []);
	const [filterObj, setFilterObj] = React.useState<any>(props.filters || {});


	const handleFilterChange = (filterType: string, filterField: string, filterValue: string, filterOptions?: any[]) => {

		if (!filterValue || filterValue === ''){
			delete filterObj[filterField]
		}
		else {
			filterObj[filterField] = {
				filterVal : filterValue,
				comparator: "LIKE"
			}
			if (filterType === 'number'){
				filterObj[filterField].comparator = "="
			}
		}
		setFilterObj(filterObj)

		setPage(0)
		props.onPaginationFilterChange(0, pageSize, filterObj)
	}

	const handlePageChange = (event: any, newPage: number) => {
		setPage(newPage)
		if (props.onPaginationFilterChange){
			props.onPaginationFilterChange(newPage, pageSize, filterObj)
		}
	}
	const handlePageSizeChange = (event: any) => {
		setPageSize(parseInt(event.target.value))
		if (props.onPaginationFilterChange){
			props.onPaginationFilterChange(page, event.target.value, filterObj)
		}
	}
	const downloadData = () => {
		if (props.downloadData){
			props.downloadData(columns)
		}
	}
	const onRowClick = (id: number) => {
		if (props.onRowClick){
			props.onRowClick(id)
		}
	}

	const getRowData = (row: any) => {
		let columnNames : string[] = visibleColumns.map((c: any) => c.dataField)
		return columnNames.map(column => (
			<TableCell key={ row.id + "_" + column } component="th" scope="row">
				{row[column]}
			</TableCell>
		))
	}

	return (
		<Grid container spacing={3} direction="column">
			<Grid container item style={{ display: props.showColumns ? "block" : "none" }}>
				<Grid item xs>
					<ColumnsSelect 
						columns={columns}
						changeEvent={(cols: any) => { 
							setColumns(cols) 
							setVisibleColumns(cols.filter((c: any) => c.show === undefined || c.show === true))
						}}
						showDownloadData={props.downloadData !== undefined}
						downloadData={downloadData}
					/>
				</Grid>
			</Grid>
			<Grid container item spacing={1}>
				<Grid item xs>
					<TableContainer>
						<Table stickyHeader>
							<TableHead>
								<TableRow>
									{visibleColumns.map((column) => (
										<TableCell key={column.dataField}>
										{ column.filter ?
											<TextField dense='true' label={column.text} className={classes.root} 
												InputProps={{ className: classes.input }}
												InputLabelProps={{
													classes: {
													  root: classes.label,
													  focused: classes.focused,
													},
												  }}
												onChange={(e: any) => {
													handleFilterChange(column.filter.type, column.dataField, e.target.value)
												}} 
											>	
											</TextField>
											: column.text
										}
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
							{
								props.data.map((row:any) => (
									<TableRow hover key={row.id} onClick={() => onRowClick(row.id)}>
										{ getRowData(row) }
									</TableRow>
								))
							}
							</TableBody>
							
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component="div"
						count={props.total}
						page={page}
						rowsPerPage={pageSize}
						onPageChange={handlePageChange}
						onRowsPerPageChange={handlePageSizeChange}
						ActionsComponent={TablePaginationActions}
					/>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default withTheme(CustomTable)