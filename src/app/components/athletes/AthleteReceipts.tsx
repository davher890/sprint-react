import * as React from "react";
import { Grid, Box, Typography } from "@material-ui/core";

import { connect } from "react-redux";
import {
    getAthleteReceipts,
    setAthleteReceiptStatus,
} from "../../redux/actions/athletes";

import {
    addObservations,
    removeObservation,
} from "../../redux/actions/receiptAthleteObservations";
import AthleteReceiptRow from "./AthleteReceiptRow";

const AthleteReceipts: React.FC<any> = (props) => {
    const [receipts, setReceipts] = React.useState<any[]>([]);

    React.useEffect(() => {
        if (props.athleteId) {
            props.getAthleteReceipts(props.athleteId);
        }
    }, [props.athleteId]);

    React.useEffect(() => {
        if (props.receipts) {
            setReceipts(props.receipts);
        }
    }, [props.receipts]);

    return (
        <React.Fragment>
            <Grid container direction="column" spacing={1}>
                <Grid container item direction="row" xs>
                    <Grid item xs>
                        <Typography variant="h6">
                            <Box fontWeight="bold">Nombre</Box>
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h6">
                            <Box fontWeight="bold">Temporada</Box>
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h6">
                            <Box fontWeight="bold">Fecha de creación</Box>
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h6">
                            <Box fontWeight="bold">Cuota de socio</Box>
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h6">
                            <Box fontWeight="bold">Mensualidad</Box>
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h6">
                            <Box fontWeight="bold">Matricula</Box>
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h6">
                            <Box fontWeight="bold">Licencia territorial</Box>
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h6">
                            <Box fontWeight="bold">Licencia nacional</Box>
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h6">
                            <Box fontWeight="bold">Cuota anual de escuela</Box>
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h6">
                            <Box fontWeight="bold">Total</Box>
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h6">
                            <Box fontWeight="bold">Estado</Box>
                        </Typography>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs></Grid>
                </Grid>
                {receipts.map((receipt: any) => {
                    return (
                        <AthleteReceiptRow key={receipt.id} receipt={receipt} />
                    );
                })}
            </Grid>
        </React.Fragment>
    );
};

function mapStateToProps(state: any) {
    return {
        receipts: state.athlete_reducer.athlete_receipts,
        receipt: state.receipt_reducer.receipt,
    };
}

const mapDispatchToProps = {
    addObservations,
    removeObservation,
    getAthleteReceipts,
    setAthleteReceiptStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(AthleteReceipts);
