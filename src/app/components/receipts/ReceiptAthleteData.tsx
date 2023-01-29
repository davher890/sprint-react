import React from "react"

import { connect } from "react-redux";
import { useParams } from 'react-router-dom';

import { Grid, AppBar, Toolbar } from '@material-ui/core';

import Card from '../custom/Card';
import SaveButton from '../custom/SaveButton'
import TextField from '../custom/TextField';

import { getReceiptAthlete, addReceiptAthlete } from "../../redux/actions/receipts";

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
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
            <AppBar position="fixed" style={{ bottom: 0, top: 'auto' }}>
                <Toolbar>
                    <SaveButton text='Guardar' onClick={saveReceiptAthlete} />
                </Toolbar>
            </AppBar>
        </>
                
    )
}


const mapDispatchToProps = {
    getReceiptAthlete,
    addReceiptAthlete
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