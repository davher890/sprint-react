import React, { useState } from "react"

import { Box, Grid, AppBar, Toolbar } from '@material-ui/core';

import TextField from '../custom/TextField';
import Card from '../custom/Card';
import Select from '../custom/Select'
import ConfirmDialog from "../custom/ConfirmDialog";

import SaveButton from '../custom/SaveButton'
import SearchButton from '../custom/SearchButton'
import DeleteButton from '../custom/DeleteButton'

import Table from "../custom/Table";
import SportSchoolSelect from "../custom/SportSchoolSelect";
import Spinner from '../custom/Spinner'

import Functions from "../../utils/Functions";

import { connect } from "react-redux";
import { useParams } from 'react-router-dom';

import { addReceipt, getReceipt, getReceiptAthleteTable, getReceiptIdAthleteTable, removeReceipt, downloadReceiptAthletes } from "../../redux/actions/receipts";

import { Order } from '../../types/order'

import Utils from "../../utils/TableUtils"

const NewReceiptForm: React.FC<any> = (props) => {

    const [collection, setCollection] = useState<string>('')
    const [sportSchoolId, setSportSchoolId] = useState<number>(0)
    const [searchSetSearch] = useState<boolean>(false)

    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
    
    const saveReceipt = () => {
        if (collection && sportSchoolId > 0){
            let receipt:any = { collection: collection, sportSchoolId: sportSchoolId }
            if (props.receipt && props.receipt.id){
                receipt.id = props.receipt.id
            }
            props.addReceipt(receipt)
        }
    }

    const getReceiptIdAthletes = () => {
        props.getReceiptIdAthleteTable(props.receipt.id, 0, 10, null, "id", "asc");
    }

    const downloadData = () => {
        if (props.id){
            props.downloadReceiptAthletes(props.id)
        }
    }

    React.useEffect(() => {
        if (props.id){
            props.getReceipt(props.id)
        }
    }, [props.id])

    React.useEffect(() => {
        if (props.receipt.id){
            setSportSchoolId(props.receipt.sportSchoolId)
            setCollection(props.receipt.collection)
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
            <Grid container direction="column" spacing={1}>
                <Grid item xs>
                    <Card title="Datos del recibo">
                        <Grid container item xs direction="row" spacing={5}>
                            <Grid item xs={3}>
                                <SportSchoolSelect sportSchoolId={sportSchoolId} error={sportSchoolId===0}
                                    onChange={(id: number) => {
                                        setSportSchoolId(id);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Select name="collection" label="Remesa" error={!collection}
                                    options={Functions.getReceiptCollections()} value={collection}
                                    onChange={(value: string, item: any) => {
                                        if (item){
                                            setCollection(item.id)
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs>
                                {(props.loading ? <Spinner/> : !props.receipt.id && <SearchButton onClick={() => {
                                    if (collection &&  sportSchoolId > 0){
                                        props.getReceiptAthleteTable(collection, sportSchoolId);
                                    }
                                }}>Calcular cuotas</SearchButton>)
                                }
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs>
                    <Box paddingBottom={7}>
                        <Table 
                            data={props.table_data}
                            page={props.page}
                            size={props.size}
                            total={props.total}
                            columns={Utils.getReceiptAthleteColumns()} 
                            onPaginationFilterChange={(page: number, size: number, filters:any, sort: string, sortDirection: Order) => {
                                if (props.receipt.id){
                                    props.getReceiptIdAthleteTable(props.receipt.id, page, size, filters, sort, sortDirection);
                                }
                                else if (collection &&  sportSchoolId > 0){
                                    props.getReceiptAthleteTable(collection, sportSchoolId, page, size, filters, sort, sortDirection);
                                }
                            }}
                            downloadData={downloadData}
                        />
                    </Box>
                </Grid>
            </Grid>
            <AppBar position="fixed" style={{ bottom: 0, top: 'auto' }}>
                <Toolbar>
                    <SaveButton onClick={saveReceipt} />
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
    getReceipt,
    removeReceipt,
    getReceiptAthleteTable,
    getReceiptIdAthleteTable,
    downloadReceiptAthletes
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