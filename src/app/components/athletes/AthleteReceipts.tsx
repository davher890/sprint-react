import * as React from "react"
import moment from 'moment'
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, Box, Button, Tooltip } from '@material-ui/core';

import { connect } from "react-redux";
import { getAthleteReceipts, setAthleteReceiptStatus } from "../../redux/actions/athletes";
import { getSportSchoolCollections } from "../../redux/actions/sportSchools";

import SaveButton from "../custom/SaveButton";
import TextField from '../custom/TextField'

import Functions from "../../utils/Functions";

import InfoIcon from '@material-ui/icons/Info';

const AthleteReceipts: React.FC<any> = (props) => {
    
    const [ openObservationsDialog, setOpenObservationsDialog ] = React.useState<boolean>(false)
    const [ status, setStatus ] = React.useState<String>()
    const [ observations, setObservations ] = React.useState<String>()

    React.useEffect(() => {
        if (props.id){
            props.getSportSchoolCollections(props.id)
            props.getAthleteReceipts(props.id)
        }
    }, [props.id])

    React.useEffect(() => {
        props.getAthleteReceipts(props.id)
    }, [props.receipt])


    return (
        <>
            <Grid container direction="column" spacing={1}>
                <Grid container direction="row" xs>
                    <Grid item xs>
                        <Box sx={{ fontWeight: 'bold'}}><h3>Nombre</h3></Box>
                    </Grid>
                    <Grid item xs>
                        <Box sx={{ fontWeight: 'bold'}}><h3>Temporada</h3></Box>
                    </Grid>
                    <Grid item xs>
                        <Box sx={{ fontWeight: 'bold' }}><h3>Fecha de creación</h3></Box>
                    </Grid>
                    <Grid item xs>
                        <Box sx={{ fontWeight: 'bold' }}><h3>Cuota de socio</h3></Box>
                    </Grid>
                    <Grid item xs>
                        <Box sx={{ fontWeight: 'bold' }}><h3>Mensualidad</h3></Box>
                    </Grid>
                    <Grid item xs>
                        <Box sx={{ fontWeight: 'bold' }}><h3>Matricula</h3></Box>
                    </Grid>
                    <Grid item xs>
                        <Box sx={{ fontWeight: 'bold' }}><h3>Licencia territorial</h3></Box>
                    </Grid>
                    <Grid item xs>
                        <Box sx={{ fontWeight: 'bold' }}><h3>Licencia nacional</h3></Box>
                    </Grid>
                    <Grid item xs>
                        <Box sx={{ fontWeight: 'bold' }}><h3>Estado</h3></Box>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs></Grid>
                    
                </Grid>
                { 
                props.receipts.map((receipt : any) => {
                    return <Grid container direction="row" xs>
                        <Grid item xs>
                            { receipt.receiptName }
                        </Grid>
                        <Grid item xs>
                            { receipt.season.replace('_', '-') }
                        </Grid>
                        <Grid item xs>
                            { moment(receipt.receiptCreatedAt).format("YYYY-MM-DD hh:mm:ss") }
                        </Grid>
                        <Grid item xs>
                            { receipt.membershipFee }
                        </Grid>
                        <Grid item xs>
                            { receipt.monthlyFee }
                        </Grid>
                        <Grid item xs>
                            { receipt.enrollmentFee }
                        </Grid>
                        <Grid item xs>
                            { receipt.licenseTerritorialFee }
                        </Grid>
                        <Grid item xs>
                            { receipt.licenseNationalFee }
                        </Grid>
                        <Grid item xs>
                            { Functions?.getReceiptStatus().find(c => c.id === receipt.status)?.name }
                        </Grid>
                        <Grid item xs={1}>
                            <Tooltip title={<h2>{receipt.observations?.replace(/↵/g, "\n")}</h2>}>
                                <InfoIcon/>
                            </Tooltip>
                        </Grid>
                        <Grid item xs>
                        { (receipt.status === 'return') && 
                                <SaveButton onClick={async () => {
                                    setObservations(receipt.observations)
                                    setOpenObservationsDialog(true)
                                    setStatus('paid')
                                }}>Pagar</SaveButton>
                        }
                        { (receipt.status === 'paid') && 
                                <SaveButton onClick={async () => {
                                    setObservations(receipt.observations)
                                    setOpenObservationsDialog(true)
                                    setStatus('return')
                                }}>Devuelto</SaveButton>
                        }
                        </Grid>
                        <Dialog fullWidth={true} open={openObservationsDialog} aria-labelledby="form-dialog-title"
                            onClose={() => {
                                setOpenObservationsDialog(false)
                            }}
                        >
                            <DialogTitle id="form-dialog-title">Observaciones para el recibo {status == 'return' ? 'devuelto' : 'pagado'}</DialogTitle>
                            <DialogContent>
                                <Grid container>
                                    <TextField fullWidth name="observations" label="Observaciones"
                                        multiline value={observations?.replace(/↵/g, "\n")}
                                        onChange={(e:any) => {
                                            setObservations(e.target.value)
                                        }}
                                    />
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={async () => { 
                                    await props.setAthleteReceiptStatus(props.id, receipt.receiptId, status, observations)
                                    props.getAthleteReceipts(props.id)
                                    setOpenObservationsDialog(false) 
                                }}>Guardar</Button>
                            </DialogActions>
                        </Dialog>
                        
                        
                    </Grid>
                })}
            </Grid>
        </>
    )
}

function mapStateToProps(state: any) {
	return {
        receipts: state.athlete_reducer.athlete_receipts,
        receipt: state.receipt_reducer.receipt,
        collections: state.sport_school_reducer.collections
	};
}

const mapDispatchToProps = {
    getAthleteReceipts,
    setAthleteReceiptStatus,
    getSportSchoolCollections
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AthleteReceipts);