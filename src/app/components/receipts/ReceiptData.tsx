import React, { useState } from "react"

import moment from 'moment'

import { Grid, AppBar, Snackbar, Toolbar } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import Table from '../custom/Table';
import TextField from '../custom/TextField';
import Card from '../custom/Card';
import Select from '../custom/Select'
import ConfirmDialog from "../custom/ConfirmDialog";

import SelectButton from '../custom/SelectButton'
import RefreshButton from '../custom/RefreshButton'
import SearchButton from '../custom/SearchButton'
import DeleteButton from '../custom/DeleteButton'
import DownloadButton from '../custom/DownloadButton'

import SportSchoolSelect from "../custom/SportSchoolSelect";
import Spinner from '../custom/Spinner'

import Functions from "../../utils/Functions";

import { connect } from "react-redux";
import { useParams } from 'react-router-dom';

import { addReceipt, getReceipt, getReceiptIdAthleteTable, removeReceipt, downloadReceiptAthletes, removeReceiptAthletes, validateReceipt } from "../../redux/actions/receipts";
import { getSportSchoolCollections } from "../../redux/actions/sportSchools";

import { Order } from '../../types/order'

import Utils from "../../utils/TableUtils"

import { isAdmin } from "../../services/LoginService";

const NewReceiptForm: React.FC<any> = (props) => {

    const [receipt, setReceipt] = useState<any>(props.receipt || {})

    const [selectedIds, setSelectedIds] = useState<number[]>([])
    const [selectedAthleteIds, setSelectedAthleteIds] = useState<number[]>([])

    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
    const [openDeleteAthletesDialog, setOpenDeleteAthletesDialog] = useState<boolean>(false)
    
    const saveReceipt = (r: any) => {
        if (r.name && r.collection && r.sportSchoolId > 0 && r.lastRegisterDate){
            let lastRegister = moment(r.lastRegisterDate, 'YYYY-MM-DD').toDate();
            let lastUnregister = moment(r.lastUnregisterDate, 'YYYY-MM-DD').toDate();
            props.addReceipt({ ...r, lastRegisterDate: lastRegister, lastUnregisterDate: lastUnregister })
        }
    }

    const getReceiptIdAthletes = () => {
        props.getReceiptIdAthleteTable(props.receipt.id, 0, 10, null, "id", "asc");
    }

    const downloadData = () => {
        props.downloadReceiptAthletes(receipt.id)
    }

    React.useEffect(() => {
        if (props.id){
            props.getReceipt(props.id)
        }
    }, [props.id])

    React.useEffect(() => {
        if (props.receipt.id){
            setReceipt({ ...props.receipt, 
                lastRegisterDate: moment.unix(props.receipt.lastRegisterDate/1000).format("YYYY-MM-DD"),
                lastUnregisterDate: moment.unix(props.receipt.lastUnregisterDate/1000).format("YYYY-MM-DD") })
            getReceiptIdAthletes()
        }
    }, [props.receipt])

    return (
        <>
            <Snackbar open={props.receipt.errorMessage !== undefined && props.receipt.errorMessage !== ''}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000}>
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    <strong>{props.receipt.errorMessage}</strong>
                </Alert>
            </Snackbar>
            <Snackbar open={props.receipt.successMessage !== undefined && props.receipt.successMessage !== ''}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000}>
                <Alert severity="success" onClose={() => {
                        window.open("/receipts/" + props.receipt.id, "_self");
                    }}>
                    <AlertTitle>Ok!</AlertTitle>
                    <strong>{props.receipt.successMessage}</strong>
                </Alert>
            </Snackbar>
            <ConfirmDialog open={openDeleteDialog} 
                confirm={() => {
                    props.removeReceipt(props.receipt.id); 
                    setOpenDeleteDialog(false)
                    window.open("/receipts/list", "_self");
                }}
                cancel={() => setOpenDeleteDialog(false)}
            />
            <ConfirmDialog open={openDeleteAthletesDialog} 
                confirm={() => {
                    props.removeReceiptAthletes(props.receipt.id, selectedAthleteIds); 
                    setOpenDeleteAthletesDialog(false)
                    getReceiptIdAthletes()
                }}
                cancel={() => setOpenDeleteAthletesDialog(false)}
            />
            <Grid container direction="column" spacing={1}>
                <Grid item xs>
                    <Card title="Datos de la remesa">
                        <Grid container direction="column" spacing={2}>
                            <Grid container item xs spacing={4}>
                                <Grid item xs={2}>
                                    <TextField name="name" label="Nombre de la remesa" type="text" value={receipt.name}
                                        error={!receipt.name} onChange={(e:any) => {
                                            setReceipt({ ...receipt, name: e.target.value })
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <SportSchoolSelect sportSchoolId={receipt.sportSchoolId} error={receipt.sportSchoolId===0}
                                        onChange={(id: number) => {
                                            setReceipt({ ...receipt, sportSchoolId: id });
                                            props.getSportSchoolCollections(id)
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Select name="collection" label="Remesa" error={!receipt.collection}
                                        options={props.collections} value={receipt.collection}
                                        onChange={(value: string, item: any) => {
                                            if (item){
                                                setReceipt({ ...receipt, collection: item.id })
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid container item xs spacing={4}>
                                    <Grid item xs={3}>
                                        {(props.loading ? <Spinner/> : (isAdmin() || !props.receipt.id) && <SearchButton onClick={() => {
                                            saveReceipt(receipt)
                                        }}>Guardar</SearchButton>)
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container item xs>
                                <Grid container item direction="column" xs>
                                    <Grid container item xs spacing={4}>
                                        <Grid item xs={3}>
                                            <span>Se seleccionaran aquellos atletas cuya fecha de alta sea anterior a: </span>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <TextField value={receipt.lastRegisterDate} margin="dense"
                                                type="date" error={!receipt.lastRegisterDate} InputProps={{inputProps: { min: "1940-01-01", max: moment(new Date()).format("YYYY-MM-DD")} }}
                                                onChange={(e: any) => {
                                                    setReceipt({ ...receipt, lastRegisterDate: e.target.value});
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container item xs spacing={4}>
                                        <Grid item xs={3}>
                                            <span>Se seleccionaran aquellos atletas cuya fecha de baja sea posterior a: </span>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <TextField value={receipt.lastUnregisterDate}
                                                type="date" error={!receipt.lastUnregisterDate} InputProps={{inputProps: { min: "1940-01-01", max: moment(new Date()).format("YYYY-MM-DD")} }}
                                                onChange={(e: any) => {
                                                    setReceipt({ ...receipt, lastUnregisterDate: e.target.value});
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={2}>
                                    <Card title="Estado">
                                        <h3>{Functions.getReceiptStatus().find(st => st.id === receipt.status)?.name}</h3>
                                    </Card>
                                </Grid>
                                { receipt.status === 'pending' && 
                                    <Grid item xs={2}>
                                        <SelectButton onClick={async () => {
                                            props.validateReceipt(props.id)
                                        }}>Validar</SelectButton>
                                    </Grid>
                                }
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                { props.receipt.id && <>
                    <Grid item xs>
                        <Card title="Atletas">
                            <>
                                <Grid container>
                                    <RefreshButton onClick={() => getReceiptIdAthletes()}>Refrescar datos</RefreshButton>
                                    { selectedIds && selectedIds.length > 0 && <DeleteButton onClick={() => setOpenDeleteAthletesDialog(true)}>Eliminar de la remesa</DeleteButton> }
                                    { <DownloadButton onClick={(downloadData)}>Descargar Excel</DownloadButton> }
                                </Grid>
                                <Table 
                                    data={props.table_data}
                                    page={props.page}
                                    size={props.size}
                                    total={props.total}
                                    columns={ Utils.getReceiptAthleteColumns() }
                                    onPaginationFilterChange={(page: number, size: number, filters:any, sort: string, sortDirection: Order) => {
                                        if (props.receipt.id){
                                            props.getReceiptIdAthleteTable(props.receipt.id, page, size, filters, sort, sortDirection);
                                        }
                                    }}
                                    selectableRows={props.receipt.status !== 'validated'}
                                    selectedIds={selectedIds}
                                    onSelectedIds={(id: number, checked: boolean, row: any) =>{
                                        let ids = selectedIds
                                        let athleteIds = selectedAthleteIds
                                        if (checked){
                                            ids.push(id)
                                            athleteIds.push(row.athleteId)
                                        }
                                        else {
                                            ids = ids.filter(t => t !== id)
                                            athleteIds = athleteIds.filter(t => t !== row.athleteId)
                                        }
                                        ids = Array.from(new Set(ids))
                                        athleteIds = Array.from(new Set(athleteIds))
                                        setSelectedIds(ids)
                                        setSelectedAthleteIds(athleteIds)
                                    }}
                                    onRowClick={(id: number) => {
                                        window.open("/receipts/athletes/" + id, "_self");
                                    }}
                                />
                            </>
                        </Card>
                    </Grid>
                </>
                }
            </Grid>
            <AppBar position="fixed" style={{ bottom: 0, top: 'auto' }}>
                <Toolbar>
                    {props.receipt.id &&
                        <DeleteButton text='Borrar' 
                            onClick={() => setOpenDeleteDialog(true)}
                        />
                    }
                </Toolbar>
            </AppBar>
        </>
    );
}

const mapDispatchToProps = {
    addReceipt,
    validateReceipt,
    downloadReceiptAthletes,
    getReceipt,
    getReceiptIdAthleteTable,
    removeReceipt,
    removeReceiptAthletes,
    getSportSchoolCollections
}

const mapStateToProps = (state: any) => {
    return { 
        receipt: state.receipt_reducer.receipt,
        collections: state.sport_school_reducer.collections,
        table_data: state.table_reducer.table_data,
		page: state.table_reducer.page,
		size: state.table_reducer.size,
		total: state.table_reducer.total,
        loading: state.api_reducer.loading
    };
};

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(NewReceiptForm);

const WithRouterWrapper = () => {
    let { id } = useParams()

    return (
        <ConnectedComponent id={id}></ConnectedComponent>
    )
}
export default WithRouterWrapper