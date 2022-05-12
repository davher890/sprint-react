import * as React from "react"

import { withTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Table, TableBody, TableHead, TableRow, TablePagination, TableCell, TableContainer, TableSortLabel, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ColumnsSelect from "../ColumnsSelect";
import TextField from "../TextField";
import TablePaginationActions from "../TablePagination";
import Select from '../Select'

import { Order } from '../../../types/order'
import functions from '../../../utils/Functions'

const CustomTable: React.FC<any> = (props) => {

	const styles = makeStyles({
		root: {
			// background: props.theme.palette.primary.main,
			color : props.theme.palette.secondary.main,
			borderColor: props.theme.palette.secondary.main,
			// "&.Mui-focused": {
			// 	color: props.theme.palette.secondary.main
			// }
			// width: "100%",
			// marginTop: theme.spacing.unit * 3,
			overflowX: "auto"
		},
		focused: {
			color : props.theme.palette.secondary.main,
			borderColor: props.theme.palette.secondary.main,
			borderBottomColor: props.theme.palette.secondary.main,
		},
		input: {
			// borderWidth: "2px",
			// borderColor: props.theme.palette.secondary.main,
			color : props.theme.palette.secondary.main,
			// background: props.theme.palette.primary.main,
		},
		yellowText: {
			// borderWidth: "2px",
			// borderColor: props.theme.palette.secondary.main,
			color : props.theme.palette.secondary.main,
			// background: props.theme.palette.primary.main,
		},
		sortLabelIcon: {
			color: props.theme.palette.secondary.main,
			// fontSize: 30,
			opacity: 1
		}
	});

	const classes = styles();

	const [columns, setColumns] = React.useState<any[]>(props.columns || []);
	const [page, setPage] = React.useState<number>(props.page || 0)
	const [pageSize, setPageSize] = React.useState<number>(props.pageSize || 10)
	const [visibleColumns, setVisibleColumns] = React.useState<any[]>(props.columns.filter((c: any) => c.show === undefined || c.show === true) || []);
	const [filterObj, setFilterObj] = React.useState<any>(props.filters || {});

	const [orderBy, setOrderBy] = React.useState<string>('id')
    const [order, setOrder] = React.useState<Order>('asc')

	const [selectableRows, setSelectableRows] = React.useState<boolean>(props.selectableRows || false)
	const [selectedIds, setSelectedIds] = React.useState<number[]>(props.selectedIds || []);

	const handleFilterChange = (filterType: string, filterField: string, filterValue: string, filterOptions?: any[]) => {

		if (!filterValue || filterValue === ''){
			delete filterObj[filterField]
			setFilterObj(filterObj)

			setPage(0)
			props.onPaginationFilterChange(0, pageSize, filterObj, orderBy, order)
		}
		else {
			if (filterValue.length > 2 || filterType === 'options'){
				filterObj[filterField] = {
					filterVal : filterValue,
					comparator: "LIKE"
				}
				if (filterType === 'number' || filterType === 'options'){
					filterObj[filterField].comparator = "="
				}
				setFilterObj(filterObj)

				setPage(0)
				props.onPaginationFilterChange(0, pageSize, filterObj, orderBy, order)
			}
		}
		
	}
	const handlePageChange = (event: any, newPage: number) => {
		setPage(newPage)
		if (props.onPaginationFilterChange){
			props.onPaginationFilterChange(newPage, pageSize, filterObj, orderBy, order)
		}
	}
	const handlePageSizeChange = (event: any) => {
		setPageSize(parseInt(event.target.value))
		if (props.onPaginationFilterChange){
			props.onPaginationFilterChange(page, event.target.value, filterObj, orderBy, order)
		}
	}
	const downloadData = () => {
		if (props.downloadData){
			props.downloadData(columns, filterObj)
		}
	}
	const onRowClick = (id: number) => {
		if (props.onRowClick){
			props.onRowClick(id)
		}
	}
	const getRowData = (row: any) => {

		let rowId = row.id
		let columnNames : string[] = visibleColumns.map((c: any) => c.dataField)
		let cells = []
		let rowChecked = selectedIds.indexOf(rowId) > -1
		if (selectableRows){
			cells.push(
				<TableCell style={{ minWidth: '50px' }}  key={'select'}>
					<Checkbox
						color="primary"
						checked={rowChecked}
						onChange={e => {
							if (props.onSelectedIds){
								props.onSelectedIds(rowId, e.target.checked)
							}
						}}
					/>
				</TableCell>
			)
		} 
		return cells.concat(columnNames.map(column => (
			<TableCell key={ rowId + "_" + column } onClick={() => onRowClick(rowId)}>
				{row[column]}
			</TableCell>
		)))
	}
	const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
		const or = orderBy === property && order === 'asc' ? 'desc' : 'asc';
		setOrder(or);
		setOrderBy(property);
		if (props.onPaginationFilterChange){
			props.onPaginationFilterChange(page, pageSize, filterObj, property, or)
		}
    };

	const getCell = (column: any) => { 
		return (() => {
			if (column.filter){
				if (column.filter.options && column.filter.options.length > 0){
					return <Grid item xs>
						<Select name={column.dataField} label={column.text} 
							InputLabelProps={{
								classes: {
									root: classes.root,
									// focused: classes.yellowText,
									// active: classes.yellowText,
									// focusVisible: classes.yellowText,
									// selected: classes.yellowText,
								},
							}}
							InputProps={{ 
								classes: {
									root: classes.yellowText,
									focused: classes.yellowText,
									active: classes.yellowText,
									focusVisible: classes.yellowText,
									selected: classes.yellowText,
								},
							}}
							options={column.filter.options} value={1}
							onChange={(value: string, item: any) => {
								handleFilterChange(column.filter.type, column.dataField, item ? item.id : '')
							}}
						/>
					</Grid>
				}
				else {
					return <Grid item xs>
						<TextField label={column.text} className={classes.root} 
							InputProps={{ 
								className: classes.input
							}} 
							InputLabelProps={{
								classes: {
									root: classes.root,
									focused: classes.focused
								},
							}}
							onChange={(e: any) => {
								handleFilterChange(column.filter.type, column.dataField, e.target.value)
							}} 
						/>
					</Grid>
				}
			}
			else {
				return <div>{column.text}</div>
			}
		})()
	}

	return (
		<Grid container direction="column">
			<Grid item style={{ display: props.showColumns ? "block" : "none" }}>
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
			<Grid item style={{ width: "100%", overflowX: "auto" }}>
				<TableContainer>
					<Table stickyHeader>
						<TableHead>
							<TableRow>
								{selectableRows ? <TableCell style={{ minWidth: '50px' }} key={'select'}>
									<Checkbox
										color="secondary"
										checked={functions.arrayContains(selectedIds, props.data.map((row: any) => row.id))}
										onChange={e => {
											if (props.onSelectedIds){
												props.data.map((row: any) => props.onSelectedIds(row.id, e.target.checked))
											}
										}}
									/>
								</TableCell> : null }
								{visibleColumns.map((column) => (
									<TableCell style={{ minWidth: '200px' }} key={column.dataField}>
										{ column.sort === false ? getCell(column) : 
											<Grid container direction="row" spacing={2}>
												{ getCell(column) }
												<Grid item xs>
													<TableSortLabel
														active={orderBy === column.dataField}
														direction={orderBy === column.dataField ? order : 'asc'}
														onClick={createSortHandler(column.dataField)}
														classes={{
															icon: classes.sortLabelIcon,
															active: classes.sortLabelIcon
														}}
													/>
												</Grid>
											</Grid>
										}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
						{
							props.data.map((row:any) => (
								<TableRow hover key={row.id}>
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
	)
}

export default withTheme(CustomTable)