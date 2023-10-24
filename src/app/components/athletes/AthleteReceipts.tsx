import * as React from "react"
import { Grid, Box } from '@material-ui/core';

import { connect } from "react-redux";
import { getAthleteReceipts, setAthleteReceiptStatus } from "../../redux/actions/athletes";

import { addObservations, removeObservation } from "../../redux/actions/receiptAthleteObservations";
import AthleteReceiptRow from "./AthleteReceiptRow";

const AthleteReceipts: React.FC<any> = (props) => {

    const [ receipts, setReceipts] = React.useState<any[]>(props.receipts)
    
    React.useEffect(() => {
        if (props.id){
            props.getAthleteReceipts(props.id)
        }
    }, [ props.id ])

    React.useEffect(() => {
        if (props.receipts){
            setReceipts(props.receipts)
        }
    }, [ props.receipts ])

    return (
        <React.Fragment>
            <Grid container direction="column" spacing={1}>
                <Grid container item direction="row" xs>
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
                        <Box sx={{ fontWeight: 'bold' }}><h3>Cuota anual de escuela</h3></Box>
                    </Grid>
                    <Grid item xs>
                        <Box sx={{ fontWeight: 'bold' }}><h3>Total</h3></Box>
                    </Grid>
                    <Grid item xs>
                        <Box sx={{ fontWeight: 'bold' }}><h3>Estado</h3></Box>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs></Grid>
                    
                </Grid>
                { 
                    receipts.map((receipt : any) => {
                        return <AthleteReceiptRow key={receipt.id} receipt={receipt}/>
                    })
                }
            </Grid>
        </React.Fragment>
    )
}

function mapStateToProps(state: any) {
	return {
        receipts: state.athlete_reducer.athlete_receipts,
        receipt: state.receipt_reducer.receipt
	};
}

const mapDispatchToProps = {
    addObservations,
    removeObservation,
    getAthleteReceipts,
    setAthleteReceiptStatus
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AthleteReceipts);