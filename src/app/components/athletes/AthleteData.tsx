import * as React from "react"
import moment, { Moment } from 'moment'
import { useParams } from 'react-router-dom';

import utils from "../../utils/Functions"
import { Formik } from 'formik';

import { CardHeader, Grid, AppBar, Toolbar, Snackbar, Typography, Box, Checkbox, Button } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

import CustomCard from '../custom/Card'
import GroupScheduleSelect from '../custom/GroupScheduleSelect'
import SportSchoolSelect from '../custom/SportSchoolSelect'
import SaveButton from '../custom/SaveButton'
import Select from '../custom/Select'
import TextField from '../custom/TextField'
import FeeInfo from '../custom/FeeInfo'
import PhoneCard from '../custom/PhoneCard'

import AthletesList from '../custom/Athletes/AthletesList'


import AthleteSportdata from './AthleteSportdata'

// Redux
import { connect } from "react-redux";
import { addAthlete, getAthlete, getAthletesByPhone, getAthletesBySurnames, doRegisterAthlete, doUnregisterAthlete } from "../../redux/actions/athletes";
import { getSportSchoolFeeTypes } from "../../redux/actions/sportSchools";

class CreateAthlete extends React.Component<any, any> {

    constructor(props: {}) {
        super(props);
        this.state = {};
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentDidMount() {
        if (!this.isNewAthlete()) {
            let id = this.props.id
            this.getAthlete(id)
        }
    }

    getAthlete(id: Number) {
        this.props.getAthlete(id).then((data: Object) => {
            this.props.getSportSchoolFeeTypes(this.props.athlete.sportSchoolId)
        });
    }

    handleFormSubmit() {
        this.props.addAthlete(this.state)
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

    getPhoneList(phone1: string, phone2: string, phone3: string): string[] {

        // Check relatives by phone
        let phoneList: string[] = [];
        if (phone1 && phone1 !== ''){
            phoneList.push(phone1)
        }
        if (phone2 && phone2 !== ''){
            phoneList.push(phone2)
        }
        if (phone3 && phone3 !== ''){
            phoneList.push(phone3)
        }
        return phoneList;
    }

    isNewAthlete() {
        return !(this.props.id)
    }

    isMatchingAthletes() {
        return (this.props.athletes_by_surnames && this.props.athletes_by_surnames.length > 0) || (this.props.athletes_by_phone && this.props.athletes_by_phone.length > 0)                                                                     
    }

    render() {

        return (

            <React.Suspense fallback={<div>Cargando...</div>}>

                <Formik enableReinitialize
                initialValues={{
                    id: this.props.athlete.id || 0,
                    code: this.props.athlete.code || 0,
                    familyCode: this.props.athlete.familyCode || 0,
                    historic: this.props.athlete.historic || [],
                    // Extra fields
                    sportSchools: this.props.sportSchools || [],
                    feeTypes: this.state.feeTypes || [],
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
                    scheduleIdsStr: this.props.athlete.scheduleIds ? this.props.athlete.scheduleIds.join(".") || "" : "",
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
                    registerDate: moment(new Date()).format("YYYY-MM-DD"),
                    registerDateStr: moment(new Date()).format("YYYY-MM-DD"),
                    registerObservations: '',
                    openRegisterDialog: false,
                    openSportdataDialog: false,
                    openMatchingAthletes: false,
                    
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
                    if (values.phone1  === '' && values.phone2  === '' && values.phone3  === '') errors.phone1 = true;
                    if (values.age >= 18 && values.mail  === '') errors.mail = true;
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
                    if ((values.holderDni === '' || !this.isValidDni(values.holderDni)) && values.paymentType === "DOM" ) {
                        errors.holderDni = true;
                    }
                    if (values.age >= 14 && !this.isValidDni(values.dni)){
                        errors.dni = true
                    }
             
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    this.setState(values)
                    setSubmitting(false);
                    this.handleFormSubmit()
                }}
            >
                {({ handleSubmit, values, touched, setFieldValue, errors, handleChange, isSubmitting }) => {
                    
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
                            <Alert severity="success" onClose={() => { 
                                    setFieldValue("successMessage", "");
                                    if (values.exit) {
                                        window.open("/athletes/list", "_self");
                                        // this.props.history.push("/athletes/list");
                                        // window.location.reload();
                                    }
                                    else {
                                        window.open("/athletes", "_self");
                                        // this.props.history.push("/athletes");
                                        // window.location.reload();
                                    } 
                                }}>
                                <AlertTitle>Ok!</AlertTitle>
                                <strong>{values.successMessage}</strong>
                            </Alert>
                        </Snackbar>

                        <Dialog fullWidth={true} maxWidth="xl" open={values.openMatchingAthletes} aria-labelledby="form-dialog-title"
                            onClose={() => {
                                setFieldValue('openMatchingAthletes', false)
                            }}
                        >
                            <DialogTitle id="form-dialog-title">Atletas coincidentes</DialogTitle>
                            <DialogContent>
                                <AthletesList athletes={this.props.athletes_by_phone.concat(this.props.athletes_by_surnames)}
                                    onSelectFamily={(athlete: any) => { 

                                        setFieldValue("familyCode", athlete.familyCode)
                                        // Contact data
                                        setFieldValue("mail", athlete.mail)
                                        setFieldValue("phone1", athlete.phone1)
                                        setFieldValue("phone2", athlete.phone2)
                                        setFieldValue("phone3", athlete.phone3)
                                        setFieldValue("municipality", athlete.municipality)
                                        setFieldValue("postalCode", athlete.postalCode)
                                        setFieldValue("address", athlete.address)
                                        // Family data
                                        setFieldValue("familiarOneName", athlete.familiarOneName)
                                        setFieldValue("familiarOneFirstSurname", athlete.familiarOneFirstSurname)
                                        setFieldValue("familiarOneSecondSurname", athlete.familiarOneSecondSurname)
                                        setFieldValue("familiarOneDni", athlete.familiarOneDni)
                                        setFieldValue("familiarOneMail", athlete.familiarOneMail)
                                        setFieldValue("familiarTwoName", athlete.familiarTwoName)
                                        setFieldValue("familiarTwoFirstSurname", athlete.familiarTwoFirstSurname)
                                        setFieldValue("familiarTwoSecondSurname", athlete.familiarTwoSecondSurname)
                                        setFieldValue("familiarTwoDni", athlete.familiarTwoDni)
                                        setFieldValue("familiarTwoMail", athlete.familiarTwoMail)
                                        // Payment data
                                        setFieldValue("paymentType", athlete.paymentType)
                                        setFieldValue("feeType", athlete.feeType)
                                        setFieldValue("iban", athlete.iban)
                                        setFieldValue("holderName", athlete.holderName)
                                        setFieldValue("holderFirstSurname", athlete.holderFirstSurname)
                                        setFieldValue("holderSecondSurname", athlete.holderSecondSurname)
                                        setFieldValue("holderDni", athlete.holderDni)
                                        setFieldValue('openMatchingAthletes', false)
                                    }}
                                    onSelectAthlete={(id: number) => { 
                                        window.open("/athletes/" + id, "_self");
                                    }}
                                />
                                
                            </DialogContent>
                            <DialogActions>
                                <Button 
                                    onClick={(a: any) => { setFieldValue('openMatchingAthletes', false) }}
                                >Cerrar</Button>
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
                                                                setFieldValue('sportSchoolId', sportSchoolId);
                                                                if (sportSchoolId) {
                                                                    this.props.getSportSchoolFeeTypes(sportSchoolId).then(() => {
                                                                        if (values.feeType) {
                                                                            setFieldValue('feeType', values.feeType);
                                                                        }
                                                                    })
                                                                }
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <TextField name="code" label="Código de atleta" type="number" disabled value={values.code} />
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <TextField name="familyCode" label="Código de familia" type="number" disabled value={values.familyCode} />
                                                    </Grid>
                                                </Grid>
                                            </CustomCard>
                                        </Grid>
                                        <Grid item xs={2} style={{ display: values.id > 0 ? "block" : "none" }}>
                                            {values.historic.map((historic:any) => {
                                                return <Typography variant="subtitle1" gutterBottom component="div">{historic.type === 'REGISTER' ? 'Alta' : 'Baja'}: {moment(new Date(historic.date)).format('DD/MM/YYYY')}</Typography>
                                            })}
                                        </Grid>
                                        <Grid item xs={1}>
                                            {values.id ? <Button onClick={() => { setFieldValue('openRegisterDialog', true) }} >{utils.isRegistered(values.historic) ? 'Dar de baja' : 'Dar de alta'}</Button> : null}
                                            <Dialog fullWidth={true} open={values.openRegisterDialog} aria-labelledby="form-dialog-title"
                                                onClose={() => {
                                                    setFieldValue('openRegisterDialog', false)
                                                }}
                                            >
                                                <DialogTitle id="form-dialog-title">Fecha de {utils.isRegistered(values.historic) ? 'baja' : 'alta'}</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText>
                                                        Introduce la fecha de {utils.isRegistered(values.historic) ? 'baja' : 'alta'}.
                                                </DialogContentText>
                                                    <TextField name="registerDateStr" value={values.registerDateStr} margin="dense" onChange={(e: any) => {
                                                                let d: Moment = moment(e.target.value, "YYYY-MM-DD")
                                                                setFieldValue('registerDateStr', e.target.value);
                                                                setFieldValue('registerDate', d.toDate().getTime());
                                                            }}
                                                        type="date" />
                                                    <TextField fullWidth name="registerObservations" label="Observaciones" multiline
                                                            value={values.registerObservations} onChange={handleChange}/>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={() => {
                                                        if (utils.isRegistered(values.historic)){
                                                            this.props.doUnregisterAthlete(values.id, { date: values.registerDate, observations: values.registerObservations })
                                                            .then(() => window.open("/athletes/list", "_self"))
                                                        }
                                                        else {
                                                            this.props.doRegisterAthlete(values.id, { date: values.registerDate, observations: values.registerObservations })
                                                            .then(() => window.open("/athletes/list", "_self"))
                                                        }
                                                    }}>Guardar</Button>
                                                    <Button onClick={() => { setFieldValue('openRegisterDialog', false) }}>Cancelar</Button>
                                                </DialogActions>
                                            </Dialog>
                                        </Grid>
                                        <Grid item xs={1}>
                                            {values.id ? <Button onClick={() => { setFieldValue('openSportdataDialog', true) }} >Histórico deportivo</Button> : null}
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
                                                    <Button onClick={() => { setFieldValue('openSportdataDialog', false) }}>Cerrar</Button>
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
                                                            <TextField name="name" label="Nombre" value={values.name} margin="dense"
                                                                error={touched.name && errors.name} onChange={handleChange} 
                                                            />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <TextField name="firstSurname" label="Primer Apellido" value={values.firstSurname} margin="dense"
                                                                error={touched.firstSurname && errors.firstSurname}
                                                                onBlur={(e: any) => {
                                                                    if (values.familiarOneFirstSurname === '') {
                                                                        setFieldValue('familiarOneFirstSurname', e.target.value);
                                                                    }
                                                                    if (this.isNewAthlete() && values.firstSurname !== '' && values.secondSurname !== ''){
                                                                        return this.props.getAthletesBySurnames(values.firstSurname, values.secondSurname).then(() => {
                                                                            setFieldValue('openMatchingAthletes', this.isMatchingAthletes())
                                                                        })
                                                                    }
                                                                }}
                                                                onChange={handleChange}
                                                            />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <TextField name="secondSurname" label="Segundo Apellido" value={values.secondSurname} margin="dense"
                                                                error={touched.secondSurname && errors.secondSurname}
                                                                onBlur={(e: any) => {
                                                                    if (values.familiarTwoFirstSurname === '') {
                                                                        setFieldValue('familiarTwoFirstSurname', e.target.value);
                                                                    }
                                                                    if (this.isNewAthlete() && values.firstSurname !== '' && values.secondSurname !== ''){
                                                                        return this.props.getAthletesBySurnames(values.firstSurname, values.secondSurname).then(() => {
                                                                            setFieldValue('openMatchingAthletes', this.isMatchingAthletes())
                                                                        })
                                                                    }
                                                                }}
                                                                onChange={handleChange}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container item spacing={1}>
                                                        <Grid item xs>
                                                            <TextField value={values.birthDateStr} margin="dense"
                                                                label="Fecha de nacimiento" type="date"
                                                                error={touched.birthDateStr && errors.birthDateStr}
                                                                onChange={(e: any) => {
                                                                    let d: Moment = moment(e.target.value, "YYYY-MM-DD")
                                                                    let age: number = utils.ageCalculator(parseInt(d.format('x')))
                                                                    setFieldValue('age', age);
                                                                    setFieldValue('birthDateStr', e.target.value);
                                                                    setFieldValue('birthDate', d.toDate().getTime());
                                                                    setFieldValue('category', utils.calculateCategory(new Date(d.milliseconds()).getFullYear()));
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <TextField label="Edad" type="number" disabled value={values.age} margin="dense" />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <TextField name="birthPlace" label="Lugar de nacimiento" type="text" value={values.birthPlace}
                                                                error={touched.birthPlace && errors.birthPlace} onChange={handleChange}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container item spacing={1}>
                                                        <Grid item xs>
                                                            <TextField name="dni" label="DNI/NIE" type="text" value={values.dni}
                                                                error={touched.dni && errors.dni} onChange={handleChange}
                                                            />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <Select fullWidth name="gender" label="Género" error={touched.gender && errors.gender}
                                                                options={[{ id: "male", name: "Hombre" }, { id: "female", name: "Mujer" }]} value={values.gender}
                                                                onChange={(e: any, value: any) => setFieldValue('gender', value ? value.id : "")}
                                                            />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <TextField name="nationality" label="Nacionalidad" type="text" value={values.nationality}
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
                                                            <TextField fullWidth name="mail" label="Email" type="email" value={values.mail} 
                                                                onChange={handleChange} error={touched.mail && errors.mail} />
                                                        </Grid>
                                                    </Grid>
                                                    <PhoneCard phone1={values.phone1} phone2={values.phone2} phone3={values.phone3}
                                                        errorPhone1={touched.phone1 && errors.phone1}
                                                        onChange={(phone1:string, phone2:string, phone3:string) => {
                                                            setFieldValue('phone1', phone1)
                                                            setFieldValue('phone2', phone2)
                                                            setFieldValue('phone3', phone3)
                                                        }}
                                                        onBlur={() => {
                                                            let phoneList = this.getPhoneList(values.phone1, values.phone2, values.phone3)
                                                            if (this.isNewAthlete() && phoneList.length > 0){
                                                                return this.props.getAthletesByPhone(phoneList).then(() => {
                                                                    setFieldValue('openMatchingAthletes', this.isMatchingAthletes())
                                                                })
                                                            }
                                                        }} />
                                                    <Grid container item spacing={1}>
                                                        <Grid item xs>
                                                            <TextField name="municipality" label="Municipio" value={values.municipality} onChange={handleChange}
                                                                error={touched.municipality && errors.municipality} />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <TextField name="postalCode" label="C.P." value={values.postalCode} onChange={handleChange}
                                                                error={touched.postalCode && errors.postalCode} />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container item spacing={1}>
                                                        <Grid item xs>
                                                            <TextField fullWidth name="address" label="Dirección" value={values.address} onChange={handleChange}
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
                                                            <TextField name="familiarOneName" label="Nombre" value={values.familiarOneName} margin="dense" onChange={handleChange} />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <TextField name="familiarOneFirstSurname" label="Primer Apellido" value={values.familiarOneFirstSurname} margin="dense" onChange={handleChange} />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <TextField name="familiarOneSecondSurname" label="Segundo Apellido" value={values.familiarOneSecondSurname} margin="dense" onChange={handleChange} />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container item spacing={1}>
                                                        <Grid item xs>
                                                            <TextField name="familiarOneDni" type="text" label="Dni" value={values.familiarOneDni} margin="dense" onChange={handleChange} />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <TextField name="familiarOneMail" type="text" label="Email" value={values.familiarOneMail} margin="dense" onChange={handleChange} />
                                                        </Grid>
                                                    </Grid>
                                                    <Typography color="textSecondary">Familiar 2</Typography>
                                                    <Grid container item spacing={1}>
                                                        <Grid item xs>
                                                            <TextField name="familiarTwoName" type="text" label="Nombre" value={values.familiarTwoName} margin="dense" onChange={handleChange} />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <TextField name="familiarTwoFirstSurname" type="text" label="Primer Apellido" value={values.familiarTwoFirstSurname} margin="dense" onChange={handleChange} />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <TextField name="familiarTwoSecondSurname" type="text" label="Segundo Apellido" value={values.familiarTwoSecondSurname} margin="dense" onChange={handleChange} />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container item spacing={1}>
                                                        <Grid item xs>
                                                            <TextField name="familiarTwoDni" type="text" label="Dni" value={values.familiarTwoDni} margin="dense" onChange={handleChange} />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <TextField name="familiarTwoMail" type="text" label="Email" value={values.familiarTwoMail} margin="dense" onChange={handleChange} />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </CustomCard>
                                        </Grid>
                                        <Grid item xs>
                                            <CustomCard title="Datos Bancarios" >
                                                <Grid container direction="column" spacing={2}>
                                                    <Grid container item spacing={1}>
                                                        <Grid item xs>
                                                            <Select fullWidth name="paymentType" label="Forma de pago"
                                                                options={utils.getPaymentTypes()} value={values.paymentType} error={touched.paymentType && errors.paymentType}
                                                                onChange={(e: any, value: any) => {
                                                                    setFieldValue('paymentType', value ? value.id : "")
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <Select fullWidth name="feeType" label="Tipo de cuota"
                                                                options={this.props.fee_types} value={values.feeType} error={touched.feeType && errors.feeType}
                                                                onChange={(e: any, value: any) => {
                                                                    setFieldValue('feeType', value ? value.id : "")
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <TextField name="iban" label="Iban" value={values.iban} onChange={handleChange}
                                                                error={touched.iban && errors.iban}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <CardHeader subheader="Titular de la cuenta" />
                                                    <Grid container item spacing={1}>
                                                        <Grid item xs>
                                                            <TextField name="holderName" label="Nombre" value={values.holderName} onChange={handleChange}
                                                                error={touched.holderName && errors.holderName}
                                                            />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <TextField name="holderFirstSurname" label="Primer apellido" value={values.holderFirstSurname} onChange={handleChange}
                                                                error={touched.holderFirstSurname && errors.holderFirstSurname}
                                                            />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <TextField name="holderSecondSurname" label="Segundo apellido" value={values.holderSecondSurname} onChange={handleChange}
                                                                error={touched.holderSecondSurname && errors.holderSecondSurname}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container item spacing={1}>
                                                        <Grid item xs={3}>
                                                            <TextField name="holderDni" label="Dni/Nie" value={values.holderDni} onChange={handleChange}
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
                                                        <TextField fullWidth name="dorsalNumber" label="Dorsal" type="number" value={values.dorsalNumber} onChange={handleChange} />
                                                    </Grid>
                                                </Grid>
                                                <Grid container item spacing={1}>
                                                    <Grid item xs={2}>
                                                        <Select fullWidth name="licenseType" label="Tipo de Licencia"
                                                            value={values.licenseType} options={[{ id: "National", name: "Nacional" }, { id: "Territorial", name: "Territorial" }]}
                                                            onChange={(e: any, value: any) => setFieldValue('licenseType', value ? value.id : "")}
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                        <TextField fullWidth name="license" label="Licencia" value={values.license} onChange={handleChange} />
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={1} direction="row">
                                                    <Grid item xs>
                                                        <GroupScheduleSelect 
                                                            disabled={!utils.isRegistered(values.historic)}
                                                            groupId={values.groupId}
                                                            specialization={values.specialization}
                                                            scheduleIds={values.scheduleIds}
                                                            onChange={(groupId: number, specialization: boolean, scheduleIds: number[]) => {
                                                                setFieldValue('scheduleIds', scheduleIds)
                                                                setFieldValue('scheduleIdsStr', scheduleIds.join("."))
                                                                setFieldValue('specialization', specialization)
                                                                setFieldValue('groupId', groupId)
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </CustomCard>
                                        </Grid>
                                    </Grid>
                                    <Grid container item style={{ display: values.feeType !== "SOCIO" ? "block" : "none" }}>
                                        <Grid item>
                                            <FeeInfo {...values} />
                                        </Grid>
                                    </Grid>
                                    <Grid container item style={{ display: "block" }}>
                                        <Grid item>
                                            <CustomCard>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={3}>
                                                        <Checkbox name="imageAuth" checked={values.imageAuth === true} 
                                                            onChange={e => {
                                                                setFieldValue('imageAuth', e.target.checked)
                                                            }}
                                                        />
                                                        Autorización de Imágenes
                                                    </Grid>
                                                    <Grid item xs={9}>
                                                        <TextField fullWidth name="observations" label="Observaciones" multiline
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
                                <SaveButton type="submit" 
                                    onClick={() => {
                                        setFieldValue('exit', true)
                                        return false;
                                    }}
                                >Guardar y salir</SaveButton>
                                <SaveButton type="submit" disabled={isSubmitting}>Guardar y continuar</SaveButton>
                            </Toolbar>
                        </AppBar>
                    </form>
                )}}
            </Formik>

            </React.Suspense>
        );
    }
}

const mapDispatchToProps = {
    addAthlete, 
    getAthlete,
    getAthletesByPhone,
    getAthletesBySurnames,
    getSportSchoolFeeTypes,
    doRegisterAthlete, 
    doUnregisterAthlete
}

const mapStateToProps = (state: any) => {
    return {
        athlete: state.athlete_reducer.athlete,
        athletes_by_phone: state.athlete_reducer.athletes_by_phone,
        athletes_by_surnames: state.athlete_reducer.athletes_by_surnames,
        fee_types: state.sport_school_reducer.fee_types,
    };
};

const ConnectedComponent = connect(mapStateToProps,mapDispatchToProps)(CreateAthlete)

const WithRouterWrapper = () => {
    let { id } = useParams()

    return (
        <ConnectedComponent id={id}></ConnectedComponent>
    )
}
export default WithRouterWrapper