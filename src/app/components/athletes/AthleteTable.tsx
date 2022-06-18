import * as React from "react"

import { Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

import Table from "../custom/Table";
import Button from '../custom/AddButton'
import DeleteButton from '../custom/DeleteButton'

import Utils from "../../utils/TableUtils";

import { connect } from "react-redux";
import { getAthleteTable, downloadAthletes } from "../../redux/actions/athletes";
import { swapGroup } from "../../redux/actions/groups";

import { Order } from '../../types/order'
import GroupSelect from "../custom/GroupSelect";
import ConfirmDialog from "../custom/ConfirmDialog";
import SportSchoolSelect from "../custom/SportSchoolSelect";

class AthleteTable extends React.Component<any, any> {
	constructor(props: any) {
        super(props);
        this.state = {
        	columns: Utils.getAthleteColumns(),
			selectedIds: [],
			openGroupChangeDialog: false,
			openGroupChangeConfirmDialog: false,
			groupChangeId: 0,
			sportSchoolId: 0
		}
		this.downloadData = this.downloadData.bind(this)
    }

	componentDidMount() {
		this.props.getAthleteTable();
	}

	downloadData(columns: any, filters: any) {
		this.props.downloadAthletes(columns, filters)
	}

	render() {
		return (
			<React.Suspense fallback={<div>Cargando...</div>}>
				<ConfirmDialog open={this.state.openGroupChangeConfirmDialog} 
					confirm={() => {
						this.props.swapGroup(this.state.groupChangeId, this.state.selectedIds);
						this.setState({
							openGroupChangeConfirmDialog: false,
							openGroupChangeDialog: false
						})
					}}
					cancel={() => this.setState({
						openGroupChangeConfirmDialog: false
					})}
				/>
				<Dialog fullWidth={true} maxWidth="xl" open={this.state.openGroupChangeDialog} aria-labelledby="form-dialog-title"
					onClose={() => {
						this.setState({
							openGroupChangeDialog: false
						})
					}}
				>
					<DialogTitle id="form-dialog-title">Cambio de grupo</DialogTitle>
					<DialogContent>
						<Grid container spacing={3}>
							<Grid item xs={2}>
								<SportSchoolSelect sportSchoolId={this.state.sportSchoolId}
									onChange={(id: number) => {
										this.setState({
											sportSchoolId: id
										})
									}}
								/>
							</Grid>
							<Grid item xs>
								<GroupSelect
									groupId={this.state.groupChangeId}
									sportSchoolId={this.state.sportSchoolId}
									onChange={(groupId: number, specialization: boolean) => {
										this.setState({
											groupChangeId: groupId
										})
									}}
								/>
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions>
						<Button text="Aceptar"
							onClick={(a: any) => {
								this.setState({
									openGroupChangeConfirmDialog: true
								})
							}}
						></Button>
						<DeleteButton 
							onClick={(a: any) => { this.setState({openGroupChangeDialog: false}) }}
						>Cerrar</DeleteButton>
					</DialogActions>
				</Dialog>
				<Grid container direction="column" spacing={3}>
					<Grid container item >
						<Grid item xs={3}>
							<Button text="Nuevo Atleta" href={'/athletes'}/>
						</Grid>
						{this.state.selectedIds.length > 0 ? 
							<Grid item xs={3}>
								<Button text="Cambiar de grupo" 
									onClick={() => this.setState({openGroupChangeDialog: true})}/>
							</Grid>
						: null}
					</Grid>
					<Grid container item xs>
						<Table 
							data={this.props.table_data}
							page={this.props.page}
							size={this.props.size}
							total={this.props.total}
							columns={this.state.columns} 
							downloadData={this.downloadData}
							showColumns={true}
							selectableRows={true}
							selectedIds={this.state.selectedIds}
							onPaginationFilterChange={(page: number, size: number, filters:any, sort: string, sortDirection: Order) => {
								this.props.getAthleteTable(page, size, filters, sort, sortDirection);
							}}
							onRowClick={(id: number) => {
								window.open("/athletes/" + id, "_self");
							}}
							onSelectedIds={(id: number, checked: boolean) =>{
								let ids = this.state.selectedIds
								if (checked){
									ids.push(id)
								}
								else {
									const index = ids.indexOf(id);
									if (index > -1){
										ids.splice(index, 1)
									}
								}
								this.setState({
									selectedIds: ids
								})
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

const mapDispatchToProps = {
	getAthleteTable, downloadAthletes, swapGroup
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AthleteTable);