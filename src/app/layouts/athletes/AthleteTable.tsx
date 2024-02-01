import * as React from "react"

import { Grid, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

import Table from "../../components/custom/Table";
import Button from '../../components/custom/AddButton'
import DeleteButton from '../../components/custom/DeleteButton'

import Utils from "../../utils/TableUtils";

import { connect } from "react-redux";
import { getAthleteTable, downloadAthletes } from "../../redux/actions/athletes";
import { saveReceiptAthletes } from "../../redux/actions/receipts";
import { swapGroup } from "../../redux/actions/groups";

import { Order } from '../../types/order'
import GroupSelect from "../../components/custom/GroupSelect";
import ReceiptSelect from "../../components/custom/ReceiptSelect";
import ConfirmDialog from "../../components/custom/ConfirmDialog";
import SportSchoolSelect from "../../components/custom/SportSchoolSelect";

import { isManager, isAdmin } from "../../services/LoginService";
import { useState } from "react";

const AthleteTable: React.FC<any> = (props) => {
	
    const [selectedIds, setSelectedIds] = useState<number[]>([])
	const [openGroupChangeDialog, setOpenGroupChangeDialog] = useState<boolean>(false)
	const [openAddReceiptDialog, setOpenAddReceiptDialog] = useState<boolean>(false)
	const [openGroupChangeConfirmDialog, setOpenGroupChangeConfirmDialog] = useState<boolean>(false)
	const [groupChangeId, setGroupChangeId] = useState<number>(0)
	const [sportSchoolId, setSportSchoolId] = useState<number>(0)
	const [receiptId, setReceiptId] = useState<number>(0)
	
	React.useEffect(() => {
        props.getAthleteTable();
    }, [])

	const downloadData = (columns: any, filters: any) => {
		props.downloadAthletes(columns, filters)
	}

	return (
		<>
			<ConfirmDialog open={openGroupChangeConfirmDialog} 
				confirm={() => {
					props.swapGroup(groupChangeId, selectedIds);
					setOpenGroupChangeConfirmDialog(false)
					setOpenGroupChangeDialog(false)
				}}
				cancel={() => setOpenGroupChangeConfirmDialog(false)}
			/>
			<Dialog fullWidth={true} maxWidth="xl" open={openGroupChangeDialog} aria-labelledby="form-dialog-title"
				onClose={() => { setOpenGroupChangeDialog(false)}}
			>
				<DialogTitle id="form-dialog-title">Cambio de grupo</DialogTitle>
				<DialogContent>
					<Grid container spacing={3}>
						<Grid item xs={2}>
							<SportSchoolSelect sportSchoolId={sportSchoolId}
								onChange={(id: number) => { setSportSchoolId(id) }}
							/>
						</Grid>
						<Grid item xs>
							<GroupSelect
								groupId={groupChangeId}
								sportSchoolId={sportSchoolId}
								onChange={(groupId: number, specialization: boolean) => {
									setGroupChangeId(groupId)
								}}
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button text="Aceptar"
						onClick={(a: any) => {
							setOpenGroupChangeConfirmDialog(true)
						}}
					></Button>
					<DeleteButton 
						onClick={(a: any) => { setOpenGroupChangeDialog(false) }}
					>Cerrar</DeleteButton>
				</DialogActions>
			</Dialog>
			<Dialog fullWidth={true} maxWidth="xl" open={openAddReceiptDialog} aria-labelledby="form-dialog-title"
				onClose={() => { setOpenAddReceiptDialog(false)}}
			>
				<DialogTitle id="form-dialog-title">Selecciona la remesa</DialogTitle>
				<DialogContent>
					<Grid container spacing={3}>
						<Grid item xs={2}>
							<ReceiptSelect receiptId={receiptId}
								onChange={(id: number) => { setReceiptId(id) }}
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button text="Aceptar"
						onClick={(a: any) => {
							props.saveReceiptAthletes(receiptId, selectedIds)
							setOpenAddReceiptDialog(false)
							props.getAthleteTable();
						}}
					></Button>
				</DialogActions>
			</Dialog>
			<Grid container direction="column" spacing={3}>
				{ (isAdmin() || isManager()) &&
					<Grid container item >
						<Grid item xs={3}>
							<Button text="Nuevo Atleta" href={'/athletes'}/>
						</Grid>
						{selectedIds.length > 0 ? 
							<><Grid item xs={3}>
								<Button text="Cambiar de grupo" 
									onClick={() => setOpenGroupChangeDialog(true)}/>
							</Grid>
							<Grid item xs={3}>
								<Button text="Añadir a remesa" 
									onClick={() => setOpenAddReceiptDialog(true)}/>
							</Grid>
							</>
							
						: null}
					</Grid>
				}
				<Grid container item xs>
					<Table 
						data={props.table_data}
						page={props.page}
						size={props.size}
						total={props.total}
						columns={Utils.getAthleteColumns()} 
						downloadData={downloadData}
						showColumns={true}
						selectableRows={true}
						selectedIds={selectedIds}
						onPaginationFilterChange={(page: number, size: number, filters:any, sort: string, sortDirection: Order) => {
							props.getAthleteTable(page, size, filters, sort, sortDirection);
						}}
						onRowClick={(id: number) => {
							window.open("/athletes/" + id, "_self");
						}}
						onSelectedIds={(id: number, checked: boolean) =>{
							let ids = selectedIds
							if (checked){
								ids.push(id)
							}
							else {
								ids = ids.filter(t => t !== id)
							}
							ids = Array.from(new Set(ids))
							setSelectedIds(ids)
						}}
					/>
				</Grid>
			</Grid>
		</>
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

const mapDispatchToProps = {
	getAthleteTable, downloadAthletes, swapGroup, saveReceiptAthletes
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AthleteTable);