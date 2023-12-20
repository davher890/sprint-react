import React, { useState } from "react"

import moment from 'moment'

import { Grid, AppBar, Checkbox, Chip, Snackbar, Toolbar } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import Table from '../../components/custom/Table';
import TextField from '../../components/custom/TextField';
import Card from '../../components/custom/Card';
import ConfirmDialog from "../../components/custom/ConfirmDialog";

import Select from '../../components/custom/Select'

import SelectButton from '../../components/custom/SelectButton'
import RefreshButton from '../../components/custom/RefreshButton'
import SearchButton from '../../components/custom/SearchButton'
import DeleteButton from '../../components/custom/DeleteButton'
import DownloadButton from '../../components/custom/DownloadButton'

import DateField from "../../components/custom/DateField";
import SportSchoolSelect from "../../components/custom/SportSchoolSelect";
import Spinner from '../../components/custom/Spinner'

import Functions from "../../utils/Functions";

import { connect } from "react-redux";
import { useParams } from 'react-router-dom';

import { addReceipt, getReceipt, getReceiptIdAthleteTable, removeReceipt, downloadReceiptAthletes, removeReceiptAthletes, validateReceipt } from "../../redux/actions/receipts";
import { getSportSchoolCollections, getSportSchoolFee } from "../../redux/actions/sportSchools";

import { Order } from '../../types/order'

import Utils from "../../utils/TableUtils"

import { isAdmin } from "../../services/LoginService";

const NewReceiptForm: React.FC<any> = (props) => {

    const [receipt, setReceipt] = useState<any>(props.receipt || {})
    const [numMonths, setNumMonths] = useState<number>(0)

    const [selectedIds, setSelectedIds] = useState<number[]>([])
    const [selectedAthleteIds, setSelectedAthleteIds] = useState<number[]>([])

    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
    const [openDeleteAthletesDialog, setOpenDeleteAthletesDialog] = useState<boolean>(false)
    
    const licenseTypes = {'national' : 'Nacional', 'territorial': 'Territorial'}

    const isValidReceipt = (r:any) => {
        return r.name && r.receiptType && r.sportSchoolId && r.sportSchoolId > 0 && r.paymentType && ((r.receiptType === 'TRIMESTRAL' && r.startDate && r.endDate && numMonths > 0 && r.creationDate && r.creationDate.length > 0) || (r.receiptType === 'LICENSE' && r.licenseTypes && r.licenseTypes.length > 0)) ;
    }
    const saveReceipt = (r: any) => {
        if (isValidReceipt(r)){
            props.addReceipt({ ...r, startDate: Date.parse(r.startDate), endDate: Date.parse(r.endDate)})
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
                startDate: moment(props.receipt.startDate).format('YYYY-MM'),
                endDate: moment(props.receipt.endDate).format('YYYY-MM'),
            })
            getReceiptIdAthletes()
        }
        if (props.receipt.sportSchoolId > 0){
            props.getSportSchoolFee(props.receipt.sportSchoolId);
        }
    }, [props.receipt])

    React.useEffect(() => {
        if (props.go_to_page){
            window.open(props.go_to_page, "_self");
        }
    }, [props.go_to_page])

    React.useEffect(() => {
        if (receipt.startDate && receipt.endDate){
            setNumMonths(Functions.monthDiff(new Date(Date.parse(receipt.startDate)), new Date(Date.parse(receipt.endDate))))
        }
    },[receipt.startDate, receipt.endDate])

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
                        <Grid container direction="column" spacing={5}>
                            <Grid container item xs spacing={3}>
                                <Grid item xs>
                                    <TextField name="name" label="Nombre de la remesa" type="text" value={receipt.name}
                                        error={!receipt.name} onChange={(e:any) => {
                                            setReceipt({ ...receipt, name: e.target.value })
                                        }}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <Select fullWidth name="season" label="Temporada" error={!receipt.season}
                                        options={[
                                            { id: "2021_2022", name: "2021 - 2022" },
                                            { id: "2022_2023", name: "2022 - 2023" },
                                            { id: "2023_2024", name: "2023 - 2024" },
                                        ]} value={receipt.season}
                                        onChange={(e: any, value: any) => {
                                            setReceipt({ ...receipt, season: value ? value.id : "", startDate: "", endDate: "", creationDate: []})
                                        }}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <SportSchoolSelect sportSchoolId={receipt.sportSchoolId} error={!receipt.sportSchoolId}
                                        onChange={(id: number) => {
                                            setReceipt({ ...receipt, sportSchoolId: id });
                                            props.getSportSchoolCollections(id)
                                            props.getSportSchoolFee(id);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <Select fullWidth name="paymentType" label="Forma de pago" error={!receipt.paymentType}
                                        options={[
                                            { id: "METTRANSF", name: "Efectivo y transferencia" },
                                            { id: "DOM", name: "Domiciliación Bancaria" },
                                        ]} value={receipt.paymentType}
                                        onChange={(e: any, value: any) => {
                                            setReceipt({ ...receipt, paymentType: value ? value.id : ""})
                                        }}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <Select fullWidth name="receiptType" label="Tipo de remesa" error={!receipt.receiptType}
                                        options={[
                                            { id: "TRIMESTRAL", name: "Trimestral" },
                                            { id: "LICENSE", name: "Cuotas de licencias federativas" },
                                        ]} value={receipt.receiptType}
                                        onChange={(e: any, value: any) => {
                                            setReceipt({ ...receipt, receiptType: value ? value.id : ""})
                                        }}
                                    />
                                </Grid>
                                { receipt.receiptType && receipt.receiptType === 'LICENSE' && 
                                    <Grid container item direction="column" xs>
                                        { Object.entries(licenseTypes).map(([licenseType, translation]) => {
                                            return <Grid item xs>
                                                <Checkbox name={licenseType} checked={receipt.licenseTypes !== undefined && receipt.licenseTypes !== null && receipt.licenseTypes.length > 0 && receipt.licenseTypes.includes(licenseType)} 
                                                    onChange={e => {
                                                        setReceipt({ 
                                                            ...receipt, 
                                                            licenseTypes: e.target.checked ? [ ...(receipt.licenseTypes || []), licenseType ] : (receipt.licenseTypes || []).filter((d:string) => d !== licenseType) })
                                                    }}
                                                />Licencia {translation}
                                            </Grid>
                                        })}
                                    </Grid>
                                }
                            </Grid>
                            <Grid container item direction="column" spacing={2} xs>
                                <Grid container item xs spacing={3}>
                                    <Grid container item xs>
                                        { receipt.receiptType && receipt.receiptType === 'TRIMESTRAL' && receipt.season && 
                                        <Grid container item direction="column" xs spacing={3}>
                                            <Grid container item xs spacing={4}>
                                                <Grid item xs={3}>
                                                    <span>Mes de inicio: </span>
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <TextField value={receipt.startDate} margin="dense" type="month" error={!receipt.startDate} 
                                                        InputProps={{inputProps: { min: `${receipt.season.split("_")[0]}-09`, max: `${receipt.season.split("_")[1]}-07`} }}
                                                        onChange={(e: any) => {
                                                            setReceipt({ ...receipt, startDate: e.target.value });
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container item xs spacing={4}>
                                                <Grid item xs={3}>
                                                    <span>Mes de fin: </span>
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <TextField value={receipt.endDate} disabled={!receipt.startDate} type="month" error={!receipt.endDate} 
                                                        InputProps={{inputProps: { min: moment(receipt.startDate, 'YYYY-MM').add(1, 'M').format('YYYY-MM') } }}
                                                        onChange={(e: any) => {
                                                            setReceipt({ ...receipt, endDate: e.target.value, creationDate: Functions.dateToLocalDate(moment(e.target.value, 'YYYY-MM-DD').add(14, 'days').toDate()) });
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                            { receipt.startDate && receipt.endDate && <Grid item xs>
                                                Numero de meses: { numMonths }
                                                </Grid>
                                            }
                                            <Grid container item xs spacing={4}>
                                                <Grid item xs={3}>
                                                    <span>Fecha de creacion de la remesa: </span>
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <DateField value={receipt.creationDate} error={!receipt.creationDate} 
                                                        min="1940-01-01" max={moment(new Date()).format("YYYY-MM-DD")}
                                                        onChange={(e: any) => {
                                                            setReceipt({ ...receipt, creationDate: e });
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        }
                                        <Grid item xs={3}>
                                            <Card title="Estado">
                                                <h3>{Functions.getReceiptStatus().find(st => st.id === receipt.status)?.name}</h3>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container item xs spacing={4}>
                                { isValidReceipt(receipt) && <Grid item xs={3}>
                                    {(props.loading ? <Spinner/> : (!receipt.id || receipt.status === 'PENDING') && <SearchButton onClick={() => {
                                        saveReceipt(receipt)
                                    }}>Guardar</SearchButton>)
                                    }
                                </Grid>
                                }
                                { receipt.status === 'PENDING' && 
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
                { props.receipt.id && props.sportSchoolFee.sportSchoolAnnualFee !== undefined && <>
                    <Grid item xs>
                        <Card title="Atletas">
                            <>
                                <Grid container xs>
                                    <RefreshButton onClick={() => {
                                        getReceiptIdAthletes()
                                        props.getReceipt(props.receipt.id)
                                    }}>Refrescar datos</RefreshButton>
                                    { selectedIds && selectedIds.length > 0 && <DeleteButton onClick={() => setOpenDeleteAthletesDialog(true)}>Eliminar de la remesa</DeleteButton> }
                                    { <DownloadButton onClick={(downloadData)}>Descargar Excel</DownloadButton> }
                                    { isAdmin() && <Grid item xs spacing={2}>
                                        <Chip label={"Socio: " + props.receipt.membershipFee} color="primary" />
                                        <Chip label={"Matricula: " + props.receipt.enrollmentFee} color="primary" />
                                        <Chip label={"Anual: " + props.receipt.sportSchoolAnnualFee} color="primary" />
                                        <Chip label={"Trimestral: " + props.receipt.monthlyFee} color="primary" />
                                        <Chip label={"Licencias: " + props.receipt.licenseFee} color="primary" />
                                        <Chip label={"Total: " + (props.receipt.monthlyFee + props.receipt.enrollmentFee+ props.receipt.membershipFee + props.receipt.licenseFee + props.receipt.sportSchoolAnnualFee)} color="secondary" />
                                    </Grid> }
                                </Grid>
                                <Table 
                                    data={props.table_data}
                                    page={props.page}
                                    size={props.size}
                                    total={props.total}
                                    columns={ Utils.getReceiptAthleteColumns(props.receipt.receiptType, props.sportSchoolFee) }
                                    onPaginationFilterChange={(page: number, size: number, filters:any, sort: string, sortDirection: Order) => {
                                        if (props.receipt.id){
                                            props.getReceiptIdAthleteTable(props.receipt.id, page, size, filters, sort, sortDirection);
                                        }
                                    }}
                                    selectableRows={props.receipt.status !== 'VALIDATED'}
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
    getSportSchoolCollections,
    getSportSchoolFee
}

const mapStateToProps = (state: any) => {
    return { 
        receipt: state.receipt_reducer.receipt,
        collections: state.sport_school_reducer.collections,
        sportSchoolFee: state.sport_school_reducer.sport_school_fee,
        table_data: state.table_reducer.table_data,
		page: state.table_reducer.page,
		size: state.table_reducer.size,
		total: state.table_reducer.total,
        loading: state.api_reducer.loading,
        go_to_page: state.api_reducer.go_to_page,
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