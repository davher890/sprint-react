import * as React from "react"
import moment from 'moment'
import { Grid, Typography } from '@material-ui/core'

import { connect } from "react-redux";
import { getAthleteReceipts } from "../../redux/actions/athletes";
import { saveReceipt } from "../../redux/actions/receipts";

import SaveButton from "../custom/SaveButton";
import Functions from "../../utils/Functions";


const AthleteReceipts: React.FC<any> = (props) => {
    
    React.useEffect(() => {
        if (props.id){
            props.getAthleteReceipts(props.id)
        }
    }, [props.id])

    React.useEffect(() => {
        props.getAthleteReceipts(props.id)
    }, [props.receipt])


    return (
        <>
            <Grid container direction="column" spacing={1}>
                <Grid container direction="row">
                    <Grid item xs>
                        <Typography variant="h5">Cuota de socio</Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5">Mensualidad</Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5">Matricula</Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5">Remesa</Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5">Fecha de creación</Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5">Estado</Typography>
                    </Grid>
                    <Grid item xs>
                    </Grid>
                </Grid>
                { 
                props.receipts.map((receipt : any) => {
                    return <Grid container direction="row">
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
                            { Functions?.getReceiptCollections().find(c => c.id === receipt.receiptCollection)?.name }
                        </Grid>
                        <Grid item xs>
                            { moment(receipt.receiptCreatedAt).format("YYYY-MM-DD hh:mm:ss") }
                        </Grid>
                        <Grid item xs>
                            { Functions?.getReceiptStatuses().find(c => c.id === receipt.status)?.name }
                        </Grid>
                        <Grid item xs>
                        { (receipt.status === 'pending') && 
                                <SaveButton onClick={() => {
                                    props.saveReceipt(receipt.id, { ...receipt, status: 'paid'})
                                }}>Pagar</SaveButton>
                        }
                        </Grid>
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
	};
}

const mapDispatchToProps = {
    getAthleteReceipts,
    saveReceipt
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AthleteReceipts);