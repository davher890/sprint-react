import React, { useState } from "react"

import moment from 'moment'

import { Grid, AppBar, Toolbar } from '@material-ui/core';

import Table from '../custom/Table';
import TextField from '../custom/TextField';
import Card from '../custom/Card';
import Select from '../custom/Select'
import ConfirmDialog from "../custom/ConfirmDialog";

import SaveButton from '../custom/SaveButton'
import SearchButton from '../custom/SearchButton'
import DeleteButton from '../custom/DeleteButton'

// import Table from "../custom/Table";
import SportSchoolSelect from "../custom/SportSchoolSelect";
import Spinner from '../custom/Spinner'

import Functions from "../../utils/Functions";

import { connect } from "react-redux";
import { useParams } from 'react-router-dom';

import { addReceipt, getReceipt, getReceiptIdAthleteTable, removeReceipt, downloadReceiptAthletes, removeReceiptAthletes } from "../../redux/actions/receipts";

import { Order } from '../../types/order'

import Utils from "../../utils/TableUtils"

const NewReceiptForm: React.FC<any> = (props) => {

    const [receipt, setReceipt] = useState<any>(props.receipt || {})

    const [selectedIds, setSelectedIds] = useState<number[]>([])
    const [selectedAthleteIds, setSelectedAthleteIds] = useState<number[]>([])

    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
    const [openDeleteAthletesDialog, setOpenDeleteAthletesDialog] = useState<boolean>(false)
    
    const saveReceipt = () => {
        if (receipt.name && receipt.collection && receipt.sportSchoolId > 0 && receipt.lastRegisterDate){
            // if (props.receipt && props.receipt.id){
            //     receipt.id = props.receipt.id
            // }
            // else {
            //     receipt.year = year
            // }
            let d = moment(receipt.lastRegisterDate, 'YYYY-MM-DD').toDate();
            console.log(d)
            props.addReceipt({ ...receipt, lastRegisterDate: d })
        }
    }

    const getReceiptIdAthletes = () => {
        props.getReceiptIdAthleteTable(props.receipt.id, 0, 10, null, "id", "asc");
    }

    React.useEffect(() => {
        if (props.id){
            props.getReceipt(props.id)
        }
    }, [props.id])

    React.useEffect(() => {
        if (props.receipt.id){
            setReceipt({ ...props.receipt, lastRegisterDate: moment.unix(props.receipt.lastRegisterDate/1000).format("YYYY-MM-DD") })
            getReceiptIdAthletes()
        }
    }, [props.receipt])

    return (
        <>
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
                cancel={() => setOpenDeleteDialog(false)}
            />
            <Grid container direction="column" spacing={1}>
                <Grid item xs>
                    <Card title="Datos del recibo">
                        <Grid container direction="column" spacing={4}>
                            <Grid container item xs spacing={4}>
                                <Grid item xs={3}>
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
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container item xs direction="row" spacing={4}>
                                <Grid item xs={2}>
                                    <Select name="collection" label="Remesa" error={!receipt.collection}
                                        options={Functions.getReceiptCollections()} value={receipt.collection}
                                        onChange={(value: string, item: any) => {
                                            if (item){
                                                setReceipt({ ...receipt, collection: item.id })
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField value={receipt.lastRegisterDate} margin="dense"
                                        label="Fecha de alta" type="date" error={!receipt.lastRegisterDate}
                                        InputProps={{inputProps: { min: "1940-01-01", max: moment(new Date()).format("YYYY-MM-DD")} }}
                                        onChange={(e: any) => {
                                            setReceipt({ ...receipt, lastRegisterDate: e.target.value});
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    {(props.loading ? <Spinner/> : !props.receipt.id && <SearchButton onClick={() => {
                                        saveReceipt()
                                    }}>Guardar</SearchButton>)
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                { props.receipt.id && <>
                    <Grid item xs>
                        <Card title="Atletas">
                            <>
                                { selectedIds && selectedIds.length > 0 && <DeleteButton onClick={() => setOpenDeleteAthletesDialog(true)}>Eliminar de la remesa</DeleteButton> }
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
                                        // else if (receipt.collection &&  receipt.sportSchoolId > 0){
                                        //     props.getReceiptAthleteTable(receipt.collection, receipt.sportSchoolId, page, size, filters, sort, sortDirection);
                                        // }
                                    }}
                                    selectableRows={true}
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
                                    // downloadData={downloadData}
                                />
                            </>
                        </Card>
                    </Grid>
                </>
                }
            </Grid>
            <AppBar position="fixed" style={{ bottom: 0, top: 'auto' }}>
                <Toolbar>
                    {!props.receipt && !props.receipt.id &&
                        <SaveButton onClick={saveReceipt} />
                    }
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
    downloadReceiptAthletes,
    getReceipt,
    getReceiptIdAthleteTable,
    removeReceipt,
    removeReceiptAthletes
}

const mapStateToProps = (state: any) => {
    return { 
        receipt: state.receipt_reducer.receipt,
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