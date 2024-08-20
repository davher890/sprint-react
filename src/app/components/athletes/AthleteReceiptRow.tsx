import * as React from "react"
import moment from 'moment'
import { connect } from "react-redux";

import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, Button, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

import SaveButton from "../custom/SaveButton";
import DeleteButton from '../custom/DeleteButton'
import TextField from '../custom/TextField';
import ConfirmDialog from "../custom/ConfirmDialog";
import Select from '../custom/Select'

import Functions from "../../utils/Functions";

import { getReceiptAthleteObservations } from "../../redux/actions/receipts"
import { addObservations, removeObservation } from "../../redux/actions/receiptAthleteObservations";
import { setAthleteReceiptStatus } from "../../redux/actions/athletes";

const AthleteReceiptRow: React.FC<any> = (props) => {

    const [ receipt, setReceipt ] = React.useState<any>(props.receipt)
    const [ observations, setObservations ] = React.useState<String>()
    const [ openObservationsDialog, setOpenObservationsDialog ] = React.useState<boolean>(false)
    const [ openDeleteDialog, setOpenDeleteDialog ] = React.useState<boolean>(false)
    const [ obsId, setObsId ] = React.useState<number>(0)
    const [ receiptAthleteObservations, setReceiptAthleteObservations ] = React.useState<any[]>([])
    
    React.useEffect(() => {
        if (props.receipt){
            setReceipt(props.receipt)
        }
    }, [ props.receipt ])

    React.useEffect(() => {
        if (props.receipt_athlete_observations){
            setReceiptAthleteObservations(props.receipt_athlete_observations)
        }
        else {
            setReceiptAthleteObservations([])
        }
    }, [ props.receipt_athlete_observations ])


    React.useEffect(() => {
        if (openObservationsDialog){
            props.getReceiptAthleteObservations(receipt.id)
        }
    }, [ openObservationsDialog ])
    return (
        <Grid container direction="row">
            <Grid item xs>
                { receipt.receiptName }
            </Grid>
            <Grid item xs>
                { receipt.season?.replace('_', '-') }
            </Grid>
            <Grid item xs>
                { moment(receipt.receiptCreatedAt).format("YYYY-MM-DD") }
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
                { receipt.sportSchoolAnnualFee }
            </Grid>
            <Grid item xs>
                { receipt.totalFee }
            </Grid>
            <Grid item xs>
                { Functions.getReceiptAthleteStatus(receipt.paymentType).find(c => c.id === receipt.status)?.name }
            </Grid>
            <Grid item xs onClick={() => {
                setOpenObservationsDialog(true)
            }}>
                <Tooltip title={<h2>Observaciones</h2>}>
                    <InfoIcon/>
                </Tooltip>
            </Grid>
            <Grid item xs={1}>
                <Select fullWidth name="receiptStatus" label="Estado" 
                    options={Functions.getReceiptAthleteStatus(receipt.paymentType)} value={receipt.status}
                    error={props.error} onChange={(value: string, item: any) => {
                        props.setAthleteReceiptStatus(receipt.athleteId, receipt.receiptId, item.id).then(() => {
                            setReceipt({ ...receipt, status: item.id})
                        })
                    }}
                />
            </Grid>
            <Dialog fullWidth={true} open={openObservationsDialog} aria-labelledby="form-dialog-title"
                onClose={() => {
                    setOpenObservationsDialog(false)
                }}
            >
                <DialogTitle id="form-dialog-title">Observaciones del recibo</DialogTitle>
                <DialogContent>
                    <Grid container direction="column">
                        {
                            receiptAthleteObservations && receiptAthleteObservations.map((obs: any) => {
                                return <Grid key={`obs-${obs.id}`} container direction="row">
                                    <Grid item xs>
                                        { moment(new Date(obs.createdAt)).format('DD/MM/YYYY')} : {obs.type} {obs.text}
                                    </Grid>
                                    <Grid item xs>
                                        <DeleteButton text='Borrar' 
                                            onClick={async () => {
                                                await setObsId(obs.id)
                                                setOpenDeleteDialog(true)
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            })
                        }
                        <Grid item xs>
                            <TextField fullWidth name="observations" label="Observaciones"
                                multiline value={observations?.replace(/↵/g, "\n")}
                                onChange={(e:any) => {
                                    setObservations(e.target.value)
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={async () => { 
                        await props.addObservations({
                            receiptAthleteId: receipt.id,
                            text: observations
                        })
                        props.getReceiptAthleteObservations(receipt.id)
                        setOpenObservationsDialog(false) 
                    }}>Guardar</Button>
                </DialogActions>
            </Dialog>
            <ConfirmDialog open={openDeleteDialog} 
                confirm={async () => {
                    await props.removeObservation(obsId); 
                    setOpenDeleteDialog(false)
                    props.getReceiptAthleteObservations(receipt.id)
                }}
                cancel={() => setOpenDeleteDialog(false)}
            />

            
        </Grid>
    )
}

function mapStateToProps(state: any) {
	return {
        receipt_athlete_observations: state.receipt_reducer.receipt_athlete_observations
    };
}

const mapDispatchToProps = {
    addObservations,
    removeObservation,
    setAthleteReceiptStatus,
    getReceiptAthleteObservations
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AthleteReceiptRow);