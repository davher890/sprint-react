import * as React from "react"

import { connect } from "react-redux";
import { withTheme } from '@mui/styles';

import { Box, Grid, TablePagination } from '@mui/material';

import TablePaginationActions from "../TablePagination";
import Spinner from '../Spinner'

import UserCard from "../UserCard";
import DownloadButton from "../DownloadButton";

const DataGrid: React.FC<any> = (props) => {

	const [page, setPage] = React.useState<number>(props.page || 0)
	const [pageSize, setPageSize] = React.useState<number>(localStorage.getItem('pageSize') || props.size || 10)

	const handlePageChange = (event: any, newPage: number) => {
		setPage(newPage)
		if (props.onPaginationFilterChange){
			props.onPaginationFilterChange(newPage, pageSize, {}, 'id', 'asc')
		}
	}
	const handlePageSizeChange = (event: any) => {
		
		localStorage.setItem('pageSize', event.target.value)
		setPageSize(parseInt(event.target.value))
		if (props.onPaginationFilterChange){
			props.onPaginationFilterChange(page, event.target.value, {}, 'id', 'asc')
		}
	}
	const downloadData = () => {
		if (props.downloadData){
			props.downloadData([], {})
		}
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
                            <Grid container item xs spacing={3}>
                                { props.data.map((u:any) => props.renderData(u)) }
                            </Grid>
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
)(withTheme(DataGrid))