import * as React from "react"
import moment, { Moment } from 'moment'
import { withRouter } from 'react-router-dom';

import utils from "../../utils/Functions"
import { Formik } from 'formik';

import { CardHeader, Grid, AppBar, Toolbar, Snackbar, Typography, Box, Checkbox } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

import CustomCard from '../custom/Card'
import GroupScheduleSelect from '../custom/GroupScheduleSelect'
import SportSchoolSelect from '../custom/SportSchoolSelect'
import SaveButton from '../custom/SaveButton'
import Select from '../custom/Select'
import Button from '../custom/Button'
import MemoTextField from '../custom/TextField'

import AthleteSportdata from './AthleteSportdata'
import DuplicatedAthletes from './DuplicatedAthletes'

// Redux
import { connect } from "react-redux";
import { addAthlete, getAthlete, getAthleteFee, getDuplicatedAthletesTable } from "../../redux/actions/athletes";

class CreateAthlete extends React.Component<any, any> {

    feeTypes: { id: string, name: string }[] = []
    sportSchools = []

    constructor(props: {}) {
        super(props);
        this.state = {};

        this.handleFormSubmit = this.handleFormSubmit.bind(this);

        
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            this.getAthlete(id)
        }
    }

    getAthlete(id: Number) {
        this.props.getAthlete(id).then((data: Object) => {
            this.feeTypes = utils.getFeeTypes(this.props.athlete.sportSchoolId)
            this.props.getAthleteFee(this.props.athlete)
        });
    }

    fillFee(values: Object) {
        this.props.getAthleteFee(values)
    }

    handleFormSubmit() {
        this.props.addAthlete(this.state).then((data: Object) => {

            if (this.state.exit) {
                this.props.history.push("/athletes");
                window.location.reload();
            }
        })
    }

    isValidDni(dni: string) {
        
        const dniRegex = /^[0-9]{8,8}[A-Za-z]$/
        
        if(dniRegex.test(dni)){
            var number = Number.parseInt(dni.substr(0, dni.length-1));
            var letr = dni.substr(dni.length-1,1);
            number = number % 23;
            let letter = 'TRWAGMYFPDXBNJZSQVHLCKET';
            letter = letter.substring(number, number+1);
            if (letter !== letr.toUpperCase()) {
                return false
            }else{
                return true
            }
        }
        else{
            return false
        }
    }

    render() {

        return (

            <Formik enableReinitialize
                initialValues={{
                    id: this.props.athlete.id || 0,
                    code: this.props.athlete.code || 0,
                    familyCode: this.props.athlete.familyCode || 0,
                    // Extra fields
                    sportSchools: this.props.sportSchools || [],
                    feeTypes: this.feeTypes || [],
                    age: this.props.athlete.age || 0,
                    // Personal info
                    sportSchoolId: this.props.athlete.sportSchoolId || '',
                    imageAuth: this.props.athlete.imageAuth,
                    observations: this.props.athlete.observations || '',
                    name: this.props.athlete.name || '',
                    firstSurname: this.props.athlete.firstSurname || '',
                    secondSurname: this.props.athlete.secondSurname || '',
                    birthDate: this.props.athlete.birthDate || '',
                    birthDateStr: this.props.athlete.birthDateStr || '',
                    birthPlace: this.props.athlete.birthPlace || '',
                    dni: this.props.athlete.dni || '',
                    nationality: this.props.athlete.nationality || '',
                    gender: this.props.athlete.gender || 'male',
                    // Familiar info
                    familiarOneName: this.props.athlete.familiarOneName || '',
                    familiarOneFirstSurname: this.props.athlete.familiarOneFirstSurname || '',
                    familiarOneSecondSurname: this.props.athlete.familiarOneSecondSurname || '',
                    familiarOneDni: this.props.athlete.familiarOneDni || '',
                    familiarOneMail: this.props.athlete.familiarOneMail || '',
                    familiarTwoName: this.props.athlete.familiarTwoName || '',
                    familiarTwoFirstSurname: this.props.athlete.familiarTwoFirstSurname || '',
                    familiarTwoSecondSurname: this.props.athlete.familiarTwoSecondSurname || '',
                    familiarTwoDni: this.props.athlete.familiarTwoDni || '',
                    familiarTwoMail: this.props.athlete.familiarTwoMail || '',
                    // Sport info
                    category: this.props.athlete.category || '',
                    nextCategory: this.props.athlete.nextCategory || '',
                    dorsalCategory: this.props.athlete.dorsalCategory || '',
                    dorsalNumber: this.props.athlete.dorsalNumber || '',
                    license: this.props.athlete.license || '',
                    licenseType: this.props.athlete.licenseType || '',
                    specialization: this.props.athlete.specialization || false,
                    groupId: this.props.athlete.groupId || '',
                    scheduleIds: this.props.athlete.scheduleIds || [],
                    // Contact info
                    mail: this.props.athlete.mail || '',
                    phone1: this.props.athlete.phone1 || '',
                    phone2: this.props.athlete.phone2 || '',
                    phone3: this.props.athlete.phone3 || '',
                    municipality: this.props.athlete.municipality || '',
                    postalCode: this.props.athlete.postalCode || '',
                    address: this.props.athlete.address || '',
                    // Bank info
                    iban: this.props.athlete.iban || '',
                    paymentType: this.props.athlete.paymentType || '',
                    feeType: this.props.athlete.feeType || '',
                    holderName: this.props.athlete.holderName || '',
                    holderFirstSurname: this.props.athlete.holderFirstSurname || '',
                    holderSecondSurname: this.props.athlete.holderSecondSurname || '',
                    holderDni: this.props.athlete.holderDni || '',
                    //Calculated Fee
                    enrollmentFee: (this.props.athlete_fee ? this.props.athlete_fee.enrollmentFee : 0) || 0,
                    membershipFee: (this.props.athlete_fee ? this.props.athlete_fee.membershipFee : 0) || 0,
                    monthlyFee: (this.props.athlete_fee ? this.props.athlete_fee.monthlyFee : 0) || 0,
                    // Dialogs
                    registered: this.props.athlete.registered || false,
                    registerDate: moment(new Date()).format("YYYY-MM-DD"),
                    openRegisterDialog: false,
                    openSportdataDialog: false,
                    openDuplicatedAthletes: false,

                    exit: false,

                    errorMessage: this.props.athlete.errorMessage || '',
                    successMessage: this.props.athlete.successMessage || '',
                }}
                validate={(values) => {
                    let errors: any = {};

                    if (values.sportSchoolId  === '') errors.sportSchoolId = true;
                    if (values.imageAuth  === '') errors.imageAuth = true;
                    if (values.name  === '') errors.name = true;
                    if (values.firstSurname  === '') errors.firstSurname = true;
                    if (values.birthDate  === '') errors.birthDate = true;
                    if (values.gender  === '') errors.gender = true;
                    if (values.phone1  === '') errors.phone1 = true;
                    if (values.mail  === '') errors.mail = true;
                    if (values.municipality  === '') errors.municipality = true;
                    if (values.postalCode  === '') errors.postalCode = true;
                    if (values.address  === '') errors.address = true;
                    if (values.paymentType  === '') errors.paymentType = true;
                    if (values.feeType  === '') errors.feeType = true;
                                    
                    if (values.iban === '' && values.paymentType === "DOM") {
                        errors.iban = true;
                    }
                    if (values.holderName === '' && values.paymentType === "DOM") {
                        errors.holderName = true;
                    }
                    if (values.holderFirstSurname === '' && values.paymentType === "DOM") {
                        errors.holderFirstSurname = true;
                    }
                    if (values.holderSecondSurname === '' && values.paymentType === "DOM") {
                        errors.holderSecondSurname = true;
                    }
                    if (values.holderDni === '' && values.paymentType === "DOM") {
                        errors.holderDni = true;
                    }
                    if (!this.isValidDni(values.dni)){
                        errors.dni = true
                    }

                    //check if my values have errors
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    this.setState(values)
                    setSubmitting(false);
                    this.handleFormSubmit()
                }}
            >
                {({ handleSubmit, values, touched, setFieldValue, errors, handleChange, setFieldTouched }) => {
                    
                    return (

                    <form onSubmit={handleSubmit}>

                        <Snackbar open={values.errorMessage !== undefined && values.errorMessage !== ''}
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000}>
                            <Alert severity="error" onClose={() => { setFieldValue("errorMessage", "") }}>
                                <AlertTitle>Error</AlertTitle>
                                <strong>{values.errorMessage}</strong>
                            </Alert>
                        </Snackbar>
                        <Snackbar open={values.successMessage !== undefined && values.successMessage !== ''}
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000}>
                            <Alert severity="success" onClose={() => { setFieldValue("successMessage", "") }}>
                                <AlertTitle>Ok!</AlertTitle>
                                <strong>{values.successMessage}</strong>
                            </Alert>
                        </Snackbar>

                        <Dialog fullWidth={true} maxWidth="xl" open={values.openDuplicatedAthletes} aria-labelledby="form-dialog-title"
                            onClose={() => {
                                setFieldValue('openDuplicatedAthletes', false)
                            }}
                        >
                            <DialogTitle id="form-dialog-title">Histórico deportivo</DialogTitle>
                            <DialogContent>
                                <Grid container>
                                    <DuplicatedAthletes 
                                        id={values.id}
                                        name={values.name}
                                        firstSurname={values.firstSurname}
                                        dni={values.dni} />
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => { setFieldValue('openDuplicatedAthletes', false) }} color="secondary" text="Cerrar" />
                            </DialogActions>
                        </Dialog>

                        <Box paddingBottom={7}>
                            <Grid container spacing={3}>
                                <Grid container item spacing={3}>
                                    <Grid container item spacing={1}>
                                        <Grid item xs={6}>
                                            <CustomCard>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={5}>
                                                        <SportSchoolSelect sportSchoolId={values.sportSchoolId} error={touched.sportSchoolId && errors.sportSchoolId}
                                                            onChange={(sportSchoolId: number) => {
                                                                if (sportSchoolId) {
                                                                    values.feeTypes = utils.getFeeTypes(sportSchoolId)
                                                                    setFieldValue('sportSchoolId', sportSchoolId);
                                                                    if (values.feeType) {
                                                                        setFieldValue('feeType', values.feeType);
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <MemoTextField name="code" label="Código de atleta" type="number" disabled value={values.code} />
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <MemoTextField name="familyCode" label="Código de familia" type="number" disabled value={values.familyCode} />
                                                    </Grid>
                                                </Grid>
                                            </CustomCard>
                                        </Grid>
                                        <Grid item xs={3}>
                                            {values.id ? <Button text={values.registered ? 'Dar de baja' : 'Dar de alta'} onClick={() => { setFieldValue('openRegisterDialog', true) }} /> : null}
                                            <Dialog fullWidth={true} open={values.openRegisterDialog} aria-labelledby="form-dialog-title"
                                                onClose={() => {
                                                    setFieldValue('openRegisterDialog', false)
                                                }}
                                            >
                                                <DialogTitle id="form-dialog-title">Fecha de {values.registered ? 'baja' : 'alta'}</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText>
                                                        Introduce la fecha de {values.registered ? 'baja' : 'alta'}.
                                                </DialogContentText>
                                                    <MemoTextField id="registerDate" name="registerDate" value={values.registerDate} margin="dense" onChange={handleChange}
                                                        type="date" />
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={() => {
                                                        const requestOptions = {
                                                            method: 'POST',
                                                            headers: { 'Content-Type': 'application/json' },
                                                            body: JSON.stringify({ date: values.registerDate })
                                                        }

                                                        fetch(process.env.REACT_APP_SERVER_URL + "/athletes/" + values.id + (values.registered ? "/unregister" : "/register"), requestOptions)
                                                            .then(res => res.json())
                                                            .then(data => {
                                                                setFieldValue('openRegisterDialog', false)
                                                                this.getAthlete(values.id)
                                                            });
                                                    }} color="primary"
                                                        text={values.registered ? 'Dar de baja' : 'Dar de alta'} />
                                                    <Button onClick={() => { setFieldValue('openRegisterDialog', false) }} color="secondary"
                                                        text="Cancelar" />
                                                </DialogActions>
                                            </Dialog>
                                        </Grid>
                                        <Grid item xs={3}>
                                            {values.id ? <Button text={'Histórico deportivo'} onClick={() => { setFieldValue('openSportdataDialog', true) }} /> : null}
                                            <Dialog fullWidth={true} maxWidth="xl" open={values.openSportdataDialog} aria-labelledby="form-dialog-title"
                                                onClose={() => {
                                                    setFieldValue('openSportdataDialog', false)
                                                }}
                                            >
                                                <DialogTitle id="form-dialog-title">Histórico deportivo</DialogTitle>
                                                <DialogContent>
                                                    <Grid container>
                                                        <AthleteSportdata id={values.id} />
                                                    </Grid>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={() => { setFieldValue('openSportdataDialog', false) }} color="secondary"
                                                        text="Cerrar" />
                                                </DialogActions>
                                            </Dialog>
                                        </Grid>
                                    </Grid>
                                    <Grid container item spacing={2}>
                                        <Grid item xs>
                                            <CustomCard title="Datos Personales">
                                                <Grid container direction="column" spacing={2}>
                                                    <Grid container item spacing={1}>
                                                        <Grid item xs>
                                                            <MemoTextField name="name" label="Nombre" value={values.name} margin="dense"
                                                                error={touched.name && errors.name} onChange={handleChange} 
                                                                onBlur={() => {
                                                                    if (values.name && values.firstSurname && values.dni){
                                                                        this.props.getDuplicatedAthletesTable(values.id, values.name, values.firstSurname, values.dni).then((d: any) => {
                                                                            setFieldValue('openDuplicatedAthletes', this.props.duplicated_athletes && this.props.duplicated_athletes.length > 0)
                                                                        })
                                                                    }
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <MemoTextField name="firstSurname" label="Primer Apellido" value={values.firstSurname} margin="dense"
                                                                error={touched.firstSurname && errors.firstSurname}
                                                                onBlur={(e: any) => {
                                                                    if (values.familiarOneFirstSurname === '') {
                                                                        setFieldValue('familiarOneFirstSurname', e.target.value);
                                                                    }
                                                                    if (values.name && values.firstSurname && values.dni){
                                                                        this.props.getDuplicatedAthletesTable(values.id, values.name, values.firstSurname, values.dni).then((d: any) => {
                                                                            setFieldValue('openDuplicatedAthletes', this.props.duplicated_athletes && this.props.duplicated_athletes.length > 0)
                                                                        })
                                                                    }
                                                                }}
                                                                onChange={handleChange}
                                                            />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <MemoTextField name="secondSurname" label="Segundo Apellido" value={values.secondSurname} margin="dense"
                                                                error={touched.secondSurname && errors.secondSurname}
                                                                onBlur={(e: any) => {
                                                                    if (values.familiarTwoFirstSurname === '') {
                                                                        setFieldValue('familiarTwoFirstSurname', e.target.value);
                                                                    }
                                                                }}
                                                                onChange={handleChange}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container item spacing={1}>
                                                        <Grid item xs>
                                                            <MemoTextField value={values.birthDateStr} margin="dense"
                                                                label="Fecha de nacimiento" type="date"
                                                                error={touched.birthDateStr && errors.birthDateStr}
                                                                onChange={(e: any) => {
                                                                    let d: Moment = moment(e.target.value, "YYYY-MM-DD")
                                                                    let age: number = utils.ageCalculator(d.milliseconds())
                                                                    setFieldValue('age', age);
                                                                    setFieldValue('birthDateStr', e.target.value);
                                                                    setFieldValue('birthDate', d.toDate().getTime());
                                                                    setFieldValue('category', utils.calculateCategory(new Date(d.milliseconds()).getFullYear()));
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <MemoTextField label="Edad" type="number" disabled value={values.age} margin="dense" />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <MemoTextField name="birthPlace" label="Lugar de nacimiento" type="text" value={values.birthPlace}
                                                                error={touched.nationality && errors.nationality} onChange={handleChange}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container item spacing={1}>
                                                        <Grid item xs>
                                                            <MemoTextField name="dni" label="DNI/NIE" type="text" value={values.dni}
                                                                error={touched.dni && errors.dni} onChange={handleChange}
                                                                onBlur={() => {
                                                                    if (values.name && values.firstSurname && values.dni){
                                                                        this.props.getDuplicatedAthletesTable(values.id, values.name, values.firstSurname, values.dni).then((d: any) => {
                                                                            setFieldValue('openDuplicatedAthletes', this.props.duplicated_athletes && this.props.duplicated_athletes.length > 0)
                                                                        })
                                                                        
                                                                    }
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <Select fullWidth name="gender" label="Género" error={touched.gender && errors.gender}
                                                                options={[{ id: "male", name: "Hombre" }, { id: "female", name: "Mujer" }]} value={values.gender}
                                                                onChange={(e: any, value: any) => setFieldValue('gender', value ? value.id : "")}
                                                            />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <MemoTextField name="nationality" label="Nacionalidad" type="text" value={values.nationality}
                                                                error={touched.nationality && errors.nationality}
                                                                onChange={handleChange}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </CustomCard>
                                        </Grid>
                                        <Grid item xs>
                                            <CustomCard title="Datos de contacto" >
                                                <Grid container direction="column" spacing={2}>
                                                    <Grid container item spacing={1}>
                                                        <Grid item xs>
                                                            <MemoTextField fullWidth name="mail" label="Email" type="email" value={values.mail} 
                                                                onChange={handleChange} error={touched.mail && errors.mail} />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container item spacing={1}>
                                                        <Grid item xs>
                                                            <MemoTextField name="phone1" type="tel" value={values.phone1} label="Teléfono 1" 
                                                                onChange={handleChange} error={touched.phone1 && errors.phone1}
                                                            />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <MemoTextField name="phone2" type="tel" value={values.phone2} label="Teléfono 2" 
                                                                onChange={handleChange} error={touched.phone2 && errors.phone2}
                                                            />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <MemoTextField name="phone3" type="tel" value={values.phone3} label="Teléfono 3"
                                                                onChange={handleChange} error={touched.phone3 && errors.phone3}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container item spacing={1}>
                                                        <Grid item xs>
                                                            <MemoTextField name="municipality" label="Municipio" value={values.municipality} onChange={handleChange}
                                                                error={touched.municipality && errors.municipality} />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <MemoTextField name="postalCode" label="C.P." value={values.postalCode} onChange={handleChange}
                                                                error={touched.postalCode && errors.postalCode} />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container item spacing={1}>
                                                        <Grid item xs>
                                                            <MemoTextField fullWidth name="address" label="Dirección" value={values.address} onChange={handleChange}
                                                                error={touched.address && errors.address} />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </CustomCard>
                                        </Grid>
                                        
                                    </Grid>
                                    <Grid container item spacing={2}>
                                    <Grid item xs>
                                            <CustomCard title="Datos Familiares">
                                                <Typography color="textSecondary">Familiar 1</Typography>
                                                <Grid container direction="column" spacing={2}>
                                                    <Grid container item spacing={1}>
                                                        <Grid item xs>
                                                            <MemoTextField name="familiarOneName" label="Nombre" value={values.familiarOneName} margin="dense" onChange={handleChange} />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <MemoTextField name="familiarOneFirstSurname" label="Primer Apellido" value={values.familiarOneFirstSurname} margin="dense" onChange={handleChange} />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <MemoTextField name="familiarOneSecondSurname" label="Segundo Apellido" value={values.familiarOneSecondSurname} margin="dense" onChange={handleChange} />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container item spacing={1}>
                                                        <Grid item xs>
                                                            <MemoTextField name="familiarOneDni" type="text" label="Dni" value={values.familiarOneDni} margin="dense" onChange={handleChange} />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <MemoTextField name="familiarOneMail" type="text" label="Email" value={values.familiarOneMail} margin="dense" onChange={handleChange} />
                                                        </Grid>
                                                    </Grid>
                                                    <Typography color="textSecondary">Familiar 2</Typography>
                                                    <Grid container item spacing={1}>
                                                        <Grid item xs>
                                                            <MemoTextField name="familiarTwoName" type="text" label="Nombre" value={values.familiarTwoName} margin="dense" onChange={handleChange} />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <MemoTextField name="familiarTwoFirstSurname" type="text" label="Primer Apellido" value={values.familiarTwoFirstSurname} margin="dense" onChange={handleChange} />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <MemoTextField name="familiarTwoSecondSurname" type="text" label="Segundo Apellido" value={values.familiarTwoSecondSurname} margin="dense" onChange={handleChange} />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container item spacing={1}>
                                                        <Grid item xs>
                                                            <MemoTextField name="familiarTwoDni" type="text" label="Dni" value={values.familiarTwoDni} margin="dense" onChange={handleChange} />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <MemoTextField name="familiarTwoMail" type="text" label="Email" value={values.familiarTwoMail} margin="dense" onChange={handleChange} />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </CustomCard>
                                        </Grid>
                                        <Grid item xs>
                                            <CustomCard title="Datos Bancarios" >
                                                <Grid container direction="column" spacing={2}>
                                                    <Grid container item spacing={1}>
                                                        <Grid item xs={3}>
                                                            <Select fullWidth name="paymentType" label="Forma de pago"
                                                                options={utils.getPaymentTypes()} value={values.paymentType} error={touched.paymentType && errors.paymentType}
                                                                onChange={(e: any, value: any) => {
                                                                    setFieldValue('paymentType', value ? value.id : "")
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            <Select name="feeType" label="Tipo de cuota"
                                                                options={values.feeTypes} value={values.feeType} error={touched.feeType && errors.feeType}
                                                                onChange={(e: any, value: any) => {
                                                                    setFieldValue('feeType', value ? value.id : "")
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <MemoTextField name="iban" label="Iban" value={values.iban} onChange={handleChange}
                                                                error={touched.iban && errors.iban}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <CardHeader subheader="Titular de la cuenta" />
                                                    <Grid container item spacing={1}>
                                                        <Grid item xs>
                                                            <MemoTextField name="holderName" label="Nombre" value={values.holderName} onChange={handleChange}
                                                                error={touched.holderName && errors.holderName}
                                                            />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <MemoTextField name="holderFirstSurname" label="Primer apellido" value={values.holderFirstSurname} onChange={handleChange}
                                                                error={touched.holderFirstSurname && errors.holderFirstSurname}
                                                            />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <MemoTextField name="holderSecondSurname" label="Segundo apellido" value={values.holderSecondSurname} onChange={handleChange}
                                                                error={touched.holderSecondSurname && errors.holderSecondSurname}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container item spacing={1}>
                                                        <Grid item xs={3}>
                                                            <MemoTextField name="holderDni" label="Dni/Nie" value={values.holderDni} onChange={handleChange}
                                                                error={touched.holderDni && errors.holderDni}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </CustomCard>
                                        </Grid>
                                    </Grid>
                                    <Grid container item style={{ display: values.feeType !== 'SOCIO' ? "block" : "none" }}>
                                        <Grid item>
                                            <CustomCard title="Datos Deportivos" >
                                                <Grid container item spacing={1}>
                                                    <Grid item xs={2}>
                                                        <Select fullWidth name="category" label="Categoría"
                                                            options={utils.getCategories()} value={values.category || utils.calculateCategory(new Date(values.birthDate).getFullYear())}
                                                            onChange={(e: any, value: any) => setFieldValue('category', value ? value.id : "")}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <Select fullWidth name="nextCategory" label="Siguiente categoría"
                                                            options={utils.getCategories()} value={utils.calculateCategory(new Date(values.birthDate).getFullYear() - 1)}
                                                            onChange={(e: any, value: any) => setFieldValue('nextCategory', value ? value.id : "")}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <Select fullWidth name="dorsalCategory" label="Categoría dorsal"
                                                            options={utils.getDorsalCategories()} value={values.dorsalCategory}
                                                            onChange={(e: any, value: any) => setFieldValue('dorsalCategory', value ? value.id : "")}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <MemoTextField fullWidth name="dorsalNumber" label="Dorsal" type="number" value={values.dorsalNumber} onChange={handleChange} />
                                                    </Grid>
                                                </Grid>
                                                <Grid container item spacing={1}>
                                                    <Grid item xs={2}>
                                                        <Select fullWidth name="licenseType" label="Tipo de Licencia"
                                                            value={values.licenseType} options={[{ id: "N", name: "Nacional" }, { id: "T", name: "Territorial" }]}
                                                            onChange={(e: any, value: any) => setFieldValue('licenseType', value ? value.id : "")}
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                        <MemoTextField fullWidth name="license" label="Licencia" value={values.license} onChange={handleChange} />
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={1} direction="row">
                                                    <Grid item xs>
                                                        <GroupScheduleSelect 
                                                            groupId={values.groupId}
                                                            specialization={values.specialization}
                                                            scheduleIds={values.scheduleIds}
                                                            onChange={(groupId: number, specialization: boolean, scheduleIds: number[]) => {
                                                                setFieldValue('specialization', specialization)
                                                                setFieldValue('groupId', groupId)
                                                                setFieldValue('scheduleIds', scheduleIds)
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </CustomCard>
                                        </Grid>
                                    </Grid>
                                    <Grid container item style={{ display: values.feeType !== "SOCIO" ? "block" : "none" }}>
                                        <Grid item>
                                            <CustomCard title="Calculo de cuota">
                                                <Grid container spacing={1}>
                                                    <Grid item>
                                                        <MemoTextField name="membershipFee" label="Cuota de socio" type="number" disabled value={values.membershipFee} />
                                                    </Grid>
                                                    <Grid item>
                                                        <MemoTextField name="enrollmentFee" label="Matricula" type="number" disabled value={values.enrollmentFee} />
                                                    </Grid>
                                                    <Grid item>
                                                        <MemoTextField name="monthlyFee" label="Mensualidad" type="number" disabled value={values.monthlyFee} />
                                                    </Grid>
                                                </Grid>
                                            </CustomCard>
                                        </Grid>
                                    </Grid>
                                    <Grid container item style={{ display: "block" }}>
                                        <Grid item>
                                            <CustomCard>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={3}>
                                                        <Checkbox name="scheduleIds" checked={values.imageAuth === true} 
                                                            onChange={e => {
                                                                setFieldValue('imageAuth', e.target.checked)
                                                            }}
                                                        />
                                                        Autorización de Imágenes
                                                    </Grid>
                                                    <Grid item xs={9}>
                                                        <MemoTextField fullWidth name="observations" label="Observaciones" multiline
                                                            value={values.observations} onChange={handleChange} />
                                                    </Grid>
                                                </Grid>
                                            </CustomCard>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                        <AppBar position="fixed" style={{ bottom: 0, top: 'auto' }}>
                            <Toolbar>
                                <SaveButton text='Guardar y salir' type="submit" 
                                    onClick={() => {
                                        values.exit = true;
                                        console.log(values.exit)
                                        return false;
                                    }}
                                />
                                <SaveButton type="submit" text='Guardar y continuar' />
                            </Toolbar>
                        </AppBar>
                    </form>
                )}}
            </Formik>

        );
    }
}

const mapDispatchToProps = {
    addAthlete, 
    getAthlete, 
    getAthleteFee, 
    getDuplicatedAthletesTable
}

const mapStateToProps = (state: any) => {
    return {
        athlete: state.athlete_reducer.athlete,
        athlete_fee: state.athlete_reducer.athlete_fee,
        duplicated_athletes: state.table_reducer.table_data
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateAthlete));