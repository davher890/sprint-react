import * as React from "react"

import { connect } from "react-redux";
import { withTheme, makeStyles, styled } from '@mui/styles';

import { Box, Grid, Table, TableBody, TableHead, TableRow, TablePagination, TableCell, TableContainer, TableSortLabel, Checkbox } from '@mui/material';

import ColumnsSelect from "../ColumnsSelect";
import TextField from "../TextField";
import TablePaginationActions from "../TablePagination";
import Select from '../Select'
import DownloadButton from '../DownloadButton'
import Spinner from '../Spinner'

import { Order } from '../../../types/order'
import functions from '../../../utils/Functions'

import { debounce } from "lodash"

const StyledTableHead = styled(TableHead)(({ theme }) => ({
	"& .MuiTableCell-head": {
		color: theme.palette.secondary.main,
		backgroundColor: theme.palette.primary.main
	},
	'& .MuiFormLabel-root.Mui-disabled': {
		color: 'red',
	},
	"& .MuiFormLabel-root": {
		color: theme.palette.secondary.main,
	},
	"& .MuiFormLabel-root.Mui-focused": {
		color: theme.palette.secondary.main,
	},
	"& .MuiInputBase-input.MuiInput-input": {
		color: theme.palette.secondary.main,
	}
}))

const StyledTable = styled(Table)(({ theme }) => ({
	borderWidth: 'thin',
	border: 'solid',
	borderColor: theme.palette.primary.main,
	"& .MuiTableCell-head": {
		color: theme.palette.secondary.main,
		backgroundColor: theme.palette.primary.main
	},
	'& .MuiFormLabel-root.Mui-disabled': {
		color: 'red',
	},
	"& .MuiFormLabel-root": {
		color: theme.palette.secondary.main,
	},
	"& .MuiFormLabel-root.Mui-focused": {
		color: theme.palette.secondary.main,
	},
	"& .MuiInputBase-input.MuiInput-input": {
		color: theme.palette.secondary.main,
	}
}))

const StyledTableSortLabel = styled(TableSortLabel)(({ theme }) => ({
	"& .MuiTableSortLabel-icon": {
		color: theme.palette.secondary.main,
		opacity: 1
	}
}))

const CustomTable: React.FC<any> = (props) => {

	const [columns, setColumns] = React.useState<any[]>(props.columns || []);
	const [page, setPage] = React.useState<number>(props.page || 0)
	const [pageSize, setPageSize] = React.useState<number>(localStorage.getItem('pageSize') || props.size || 10)
	const [visibleColumns, setVisibleColumns] = React.useState<any[]>(props.columns.filter((c: any) => c.show === undefined || c.show === true) || []);
	const [filterObj, setFilterObj] = React.useState<any>(props.filters || {});

	const [orderBy, setOrderBy] = React.useState<string>('id')
    const [order, setOrder] = React.useState<Order>('asc')

	const [localFilters, setLocalFilters] = React.useState<any>({})

	const handleFilterChange = (filterType: string, filterField: string, filterValue: string, filterOptions?: any[]) => {

		if (!filterValue || filterValue === ''){
			delete filterObj[filterField]
			setFilterObj(filterObj)

			setPage(0)
			debounceFilterChange(0, pageSize, filterObj, orderBy, order)
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
				debounceFilterChange(0, pageSize, filterObj, orderBy, order)
			}
		}
	}

	const debounceFilterChange = debounce((page: number, size: number, filters:any, sort: string, sortDirection: Order) => {
		props.onPaginationFilterChange(page, size, filters, sort, sortDirection)
	}, 1000)

	React.useEffect(() => {
		return () => {
			debounceFilterChange.cancel();
		};
	  }, [debounceFilterChange]);

	const handlePageChange = (event: any, newPage: number) => {
		setPage(newPage)
		if (props.onPaginationFilterChange){
			props.onPaginationFilterChange(newPage, pageSize, filterObj, orderBy, order)
		}
	}
	const handlePageSizeChange = (event: any) => {
		
		localStorage.setItem('pageSize', event.target.value)
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
	const onRowClick = (id: number, row:any) => {
		if (props.onRowClick){
			props.onRowClick(id, row)
		}
	}
	const getRowData = (row: any) => {

		let rowId = row.id
		let columnNames : string[] = visibleColumns.map((c: any) => c.dataField)
		let cells = []
		let rowChecked = false 
		if (props.selectableRows){
			rowChecked = props.selectedIds.indexOf(rowId) > -1
			cells.push(
				<TableCell key={'select'}>
					<Checkbox
						color="primary"
						checked={rowChecked}
						onChange={e => {
							if (props.onSelectedIds){
								props.onSelectedIds(rowId, e.target.checked, row)
							}
						}}
					/>
				</TableCell>
			)
		} 
		return cells.concat(columnNames.map(column => (
			<TableCell key={ rowId + "_" + column } onClick={() => onRowClick(rowId, row)}>
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

	const getTableHead = () => {
		return <StyledTableHead>
			<TableRow>
				{props.selectableRows ? <TableCell style={{ minWidth: '50px' }} key={'select'}>
					<Checkbox
						color="secondary"
						checked={functions.arrayContains(props.selectedIds, props.data.map((row: any) => row.id))}
						onChange={e => {
							if (props.onSelectedIds){
								props.data.map((row: any) => props.onSelectedIds(row.id, e.target.checked, row))
							}
						}}
					/>
				</TableCell> : null }
				{visibleColumns.map((column) => (
					<TableCell style={{ minWidth: '250px' }} key={column.dataField}>
						{ column.sort === false ? getCell(column) : 
							<Grid container direction="row" style={{alignItems: "center"}}>
								<Grid item xs>
									{ getCell(column) }
								</Grid>
								<Grid item xs={1}>
									<StyledTableSortLabel
										active={orderBy === column.dataField}
										direction={orderBy === column.dataField ? order : 'asc'}
										onClick={createSortHandler(column.dataField)}
									/>
								</Grid>
							</Grid>
						}
					</TableCell>
				))}
			</TableRow>
		</StyledTableHead>

	}

	const getCell = (column: any) => { 
		return (() => {
			if (column.filter){
				if (column.filter.options && column.filter.options.length > 0){
					return <Select name={column.dataField} label={column.text}
						options={column.filter.options} value={1}
						onChange={(value: string, item: any) => {
							handleFilterChange(column.filter.type, column.dataField, item ? item.id : '')
						}}
					/>
				}
				else {
					return <TextField label={column.text} value={localFilters[column.text] || ''}
						onChange={async (e: any) => {
							await setLocalFilters({ ...localFilters, [column.text]: e.target.value })
							handleFilterChange(column.filter.type, column.dataField, e.target.value)
						}}
					/>
				}
			}
			else {
				return <strong>{column.text}</strong>
			}
		})()
	}

	return (
		<Grid container>
			{ props.loading && <Spinner/> }
			{!props.loading && (
				<Grid container item direction="column" spacing={3}
					style={{
						width: '100%'
					}}
				>
					<Grid container item xs direction="row">
						{ props.showColumns && (
							<ColumnsSelect 
								columns={columns}
								changeEvent={(cols: any) => { 
									setColumns(cols) 
									setVisibleColumns(cols.filter((c: any) => c.show === undefined || c.show === true))
								}}
							/>
						)}
						{ props.downloadData && (
							<DownloadButton onClick={(downloadData)}>
								Descargar Excel
							</DownloadButton>
						)}
					</Grid>
					
					<Grid item xs style={{
						width: '100%'
					}}>
						<Box overflow="auto">
							<TableContainer>
								<StyledTable stickyHeader size="small">
									{ getTableHead() }
									<TableBody>
									{
										props.data.map((row:any) => (
											<TableRow hover key={row.id}>
												{ getRowData(row) }
											</TableRow>
										))
									}
									</TableBody>
								</StyledTable>
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
						</Box>
					</Grid>
				</Grid>
			)
		}
		</Grid>
	)
}

function mapStateToProps(state: any) {
	return {
        loading: state.api_reducer.loading
    };
}


export default connect(
	mapStateToProps
)(withTheme(CustomTable))