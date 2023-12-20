import React from "react"

import { connect } from "react-redux";
import { useParams } from 'react-router-dom';

import { Grid, AppBar, Toolbar, Snackbar } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import Card from '../../components/custom/Card';
import SaveButton from '../../components/custom/SaveButton'
import ReturnButton from '../../components/custom/ReturnButton'
import PayButton from '../../components/custom/PayButton'
import TextField from '../../components/custom/TextField';

import { getReceiptAthlete, addReceiptAthlete } from "../../redux/actions/receipts";
import { setAthleteReceiptStatus } from "../../redux/actions/athletes";

import SearchButton from "../../components/custom/SearchButton";

const ReceiptAthleteData: React.FC<any> = (props) => {

    const [receiptAthlete, setReceiptAthlete] = React.useState<any>(props.receipt_athlete || {})

    React.useEffect(() => {
        if (props.id){
            props.getReceiptAthlete(props.id)
        }
    }, [props.id])

    React.useEffect(() => {
        if (props.receipt_athlete){
            setReceiptAthlete(props.receipt_athlete)
        }

    }, [props.receipt_athlete])

    const saveReceiptAthlete = () => {
        props.addReceiptAthlete(receiptAthlete)
    }

    return (
        <>
            <Snackbar open={props.receipt_athlete.errorMessage !== undefined && props.receipt_athlete.errorMessage !== ''}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000}>
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    <strong>{props.receipt_athlete.errorMessage}</strong>
                </Alert>
            </Snackbar>
            <Snackbar open={props.receipt_athlete.successMessage !== undefined && props.receipt_athlete.successMessage !== ''}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000}>
                <Alert severity="success" onClose={() => {
                        window.open("/receipts/" + props.receipt_athlete.receiptId, "_self");
                    }}>
                    <AlertTitle>Ok!</AlertTitle>
                    <strong>{props.receipt_athlete.successMessage}</strong>
                </Alert>
            </Snackbar>
            <Grid container spacing={1}>
                <Grid item xs>
                    <Card title="Datos del Atleta">
                        <Grid container item spacing={2}>
                            <Grid item xs>
                                <TextField disabled name="name" label="Nombre" value={receiptAthlete.name} />
                            </Grid>
                            <Grid item xs>
                                <TextField disabled name="firstSurname" label="Primer apellido" value={receiptAthlete.firstSurname} />
                            </Grid>
                            <Grid item xs>
                                <TextField disabled name="secondSurname" label="Segundo apellido" value={receiptAthlete.secondSurname} />
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs>
                    <Card title="Datos del recibo">
                        <Grid container item spacing={2}>
                            <Grid item xs>
                                <TextField name="enrollmentFee" label="Matricula" value={receiptAthlete.enrollmentFee} type='number' 
                                    onChange={(e:any) => {
                                        setReceiptAthlete({ ...receiptAthlete, enrollmentFee: e.target.value })
                                    }}
                                />
                            </Grid>
                            <Grid item xs>
                                <TextField name="membershipFee" label="Cuota de socio" value={receiptAthlete.membershipFee} type='number'
                                    onChange={(e:any) => {
                                        setReceiptAthlete({ ...receiptAthlete, membershipFee: e.target.value })
                                    }}
                                />
                            </Grid>
                            <Grid item xs>
                                <TextField name="monthlyFee" label="Cuota" value={receiptAthlete.monthlyFee} type='number'
                                    onChange={(e:any) => {
                                        setReceiptAthlete({ ...receiptAthlete, monthlyFee: e.target.value })
                                    }}
                                />
                            </Grid>
                            <Grid item xs>
                                <TextField name="licenseNationalFee" label="Licencia nacional" value={receiptAthlete.licenseNationalFee} type='number'
                                    onChange={(e:any) => {
                                        setReceiptAthlete({ ...receiptAthlete, licenseNationalFee: e.target.value })
                                    }}
                                />
                            </Grid>
                            <Grid item xs>
                                <TextField name="licenseTerritorialFee" label="Licencia territorial" value={receiptAthlete.licenseTerritorialFee} type='number'
                                    onChange={(e:any) => {
                                        setReceiptAthlete({ ...receiptAthlete, licenseTerritorialFee: e.target.value })
                                    }}
                                />
                            </Grid>
                            <Grid item xs>
                                <TextField name="totalFee" label="Total" value={receiptAthlete.totalFee} type='number' disabled
                                />
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
            <AppBar position="fixed" style={{ bottom: 0, top: 'auto' }}>
                <Toolbar>
                    { receiptAthlete.athleteId > 0 && <SearchButton onClick={() => window.open("/athletes/" + receiptAthlete.athleteId, "_self")}>Ir al atleta</SearchButton> }
                    <SaveButton text='Guardar' onClick={saveReceiptAthlete} />
                    { (receiptAthlete.status === 'NOT_PAID' || receiptAthlete.status == 'RETURN') && <PayButton onClick={() => {
                        props.setAthleteReceiptStatus(receiptAthlete.athleteId, receiptAthlete.receiptId, 'PAID').then(() => {
                            setReceiptAthlete({ ...receiptAthlete, status: 'PAID' })
                        })
                        
                    }}/> }
                    <ReturnButton onClick={() => window.open("/receipts/" + receiptAthlete.receiptId, "_self")}/>
                </Toolbar>
            </AppBar>
        </>
                
    )
}

const mapDispatchToProps = {
    getReceiptAthlete,
    addReceiptAthlete,
    setAthleteReceiptStatus
}

const mapStateToProps = (state: any) => {
    return { 
        receipt_athlete: state.receipt_reducer.receipt_athlete
    };
};

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ReceiptAthleteData);

export default () => {
    let { id } = useParams()

    return (
        <ConnectedComponent id={id}></ConnectedComponent>
    )
}