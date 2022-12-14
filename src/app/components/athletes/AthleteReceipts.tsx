import * as React from "react"
import moment from 'moment'
import { Grid, Box } from '@material-ui/core'

import { connect } from "react-redux";
import { getAthleteReceipts, setAthleteReceiptStatus } from "../../redux/actions/athletes";

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
            <Grid container direction="column" spacing={3}>
                <Grid container direction="row">
                    <Grid item xs>
                        <Box sx={{ fontWeight: 'bold'}}><h3>Nombre</h3></Box>
                    </Grid>
                    <Grid item xs>
                        <Box sx={{ fontWeight: 'bold' }}><h3>Remesa</h3></Box>
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
                        <Box sx={{ fontWeight: 'bold' }}><h3>Estado</h3></Box>
                    </Grid>
                    <Grid item xs></Grid>
                    
                </Grid>
                { 
                props.receipts.map((receipt : any) => {
                    return <Grid container direction="row">
                        <Grid item xs>
                            { receipt.receiptName }
                        </Grid>
                        <Grid item xs>
                            { Functions?.getReceiptCollections().find(c => c.id === receipt.receiptCollection)?.name }
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
                            { Functions?.getReceiptStatus().find(c => c.id === receipt.status)?.name }
                        </Grid>
                        <Grid item xs>
                        { (receipt.status === 'return') && 
                                <SaveButton onClick={async () => {
                                    await props.setAthleteReceiptStatus(props.id, receipt.receiptId, 'paid')
                                    props.getAthleteReceipts(props.id)
                                }}>Pagar</SaveButton>
                        }
                        { (receipt.status === 'paid') && 
                                <SaveButton onClick={async () => {
                                    await props.setAthleteReceiptStatus(props.id, receipt.receiptId, 'return')
                                    props.getAthleteReceipts(props.id)
                                }}>Devuelto</SaveButton>
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
    setAthleteReceiptStatus
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AthleteReceipts);