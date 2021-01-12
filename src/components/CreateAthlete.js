import React, { Component } from "react";
import moment from 'moment'

import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css";
import utils from "../functions/Utils.js"
import { Formik } from 'formik';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import AppBar from '@material-ui/core/AppBar';
import { Alert, AlertTitle } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import SubmitButton from './custom/SubmitButton'
import Select from './custom/Select'
import Button from './custom/Button'
import AthleteSportdata from './AthleteSportdata'

class CreateAthlete extends Component {
    
    constructor(props) {
        super(props);
        this.state = {};

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.fillSchedules = this.fillSchedules.bind(this)

        this.feeTypes = []
        // Groups
        this.specializedGroups = []
        this.notSpecializedGroups = []
        this.groups = []

        this.schedules = []
        this.sportSchools = []
        this.showSportData = false
    }

    componentDidMount(){
        const headers = { 'Content-Type': 'application/json' }

        let schoolsPromise = new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_SERVER_URL + "/sport_schools/all",  { headers })
                .then(res => res.json())
                .then(data => {
                    data.push({id:'', name:''})
                    this.sportSchools = data
                    resolve()
                });
            })
        let spGroupsPromise = new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_SERVER_URL + "/groups/all?specialization=true",  { headers })
                .then(res => res.json())
                .then(data => {
                    data.push({id:'', name:''})
                    this.specializedGroups = data
                    resolve()
                });
            })
        let noSpGroupsPromise = new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_SERVER_URL + "/groups/all?specialization=false",  { headers })
                .then(res => res.json())
                .then(data => {
                    data.push({id:'', name:''})
                    this.notSpecializedGroups = data
                    resolve()
                });
            })

        Promise.all([schoolsPromise, spGroupsPromise, noSpGroupsPromise]).then(values => {
            if (this.props.id) {
                let id = this.props.id
                this.getAthlete(id)
            }
            else {
                this.setState({})
            }
        })
    }

    getAthlete(id) {
        const headers = { 'Content-Type': 'application/json' }
        fetch(process.env.REACT_APP_SERVER_URL + "/athletes/" + id,  { headers })
        .then(res => res.json())
        .then(data => {
            data.age = utils.ageCalculator(new Date(data.birthDate));
            data.birthDate = moment(new Date(data.birthDate)).format("YYYY-MM-DD")
            this.showSportData = data.feeType !== 'socio'
            this.feeTypes = utils.getFeeTypes(data.sportSchoolId)

            if (data.specialization){
                this.groups = this.specializedGroups
            }
            else {
                this.groups = this.notSpecializedGroups
            }

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }
            fetch(process.env.REACT_APP_SERVER_URL + "/athletes/fee", requestOptions)
                .then(res => res.json())
                .then(feeData => {
                    data.enrollmentFee = feeData.enrollmentFee
                    data.membershipFee = feeData.membershipFee
                    data.monthlyFee = feeData.monthlyFee
                    this.setState(data, () => {
                        if (data.groupId && data.groupId > 0){
                            fetch(process.env.REACT_APP_SERVER_URL + "/groups/" + data.groupId + "/schedules",  { headers })
                                .then(res => res.json())
                                .then(schData => {
                                    this.schedules = schData
                                    this.setState(data)
                                });
                        }
                    })
                })
        });
    }

    handleFormSubmit() {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        }

        fetch(process.env.REACT_APP_SERVER_URL + "/athletes", requestOptions)
            .then(res => res.json())
            .then(data => {
                if (!data.errorMessage){
                    data.successMessage = "Atleta guardado!"
                }
                data.age = utils.ageCalculator(new Date(data.birthDate));
                data.birthDate = moment(new Date(data.birthDate)).format("YYYY-MM-DD")
                this.setState(data)
            })
    }

    fillFee(values, setFieldValue){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        }
        fetch(process.env.REACT_APP_SERVER_URL + "/athletes/fee", requestOptions)
            .then(res => res.json())
            .then(data => {
                setFieldValue('enrollmentFee', data.enrollmentFee)
                setFieldValue('membershipFee', data.membershipFee)
                setFieldValue('monthlyFee', data.monthlyFee)
            });
    }

    fillSchedules(groupId, setFieldValue){
        const headers = { 'Content-Type': 'application/json' }
        fetch(process.env.REACT_APP_SERVER_URL + "/groups/" + groupId + "/schedules",  { headers })
            .then(res => res.json())
            .then(data => {
                this.schedules = data
                setFieldValue('schedules', this.schedules)
            });
    }

    render() {
    
        return (

            <Formik enableReinitialize
                initialValues={{
                    id : this.state.id,
                    code: this.state.code || 0,
                    familyCode: this.state.familyCode || 0,
                    // Extra fields
                    groups: this.groups || [],
                    schedules: this.schedules || [],
                    sportSchools: this.sportSchools || [],
                    feeTypes: this.feeTypes || [],
                    showSportData: this.showSportData,
                    age : this.state.age || 0,
                    // Personal info
                    sportSchoolId: this.state.sportSchoolId || '',
                    imageAuth: this.state.imageAuth || false,
                    observations: this.state.observations || '',
                    name: this.state.name || '',
                    firstSurname: this.state.firstSurname || '',
                    secondSurname: this.state.secondSurname || '',
                    birthDate: this.state.birthDate || '',
                    dni: this.state.dni || '',
                    gender: this.state.gender || 'male',
                    // Familiar info
                    familiarOneName: this.state.familiarOneName || '',
                    familiarOneFirstSurname: this.state.familiarOneFirstSurname || '',
                    familiarOneSecondSurname: this.state.familiarOneSecondSurname || '',
                    familiarOneDni: this.state.familiarOneDni || '',
                    familiarOneMail: this.state.familiarOneMail || '',
                    familiarTwoName: this.state.familiarTwoName || '',
                    familiarTwoFirstSurname: this.state.familiarTwoFirstSurname || '',
                    familiarTwoSecondSurname: this.state.familiarTwoSecondSurname || '',
                    familiarTwoDni: this.state.familiarTwoDni || '',
                    familiarTwoMail: this.state.familiarTwoMail || '',
                    // Sport info
                    category:  this.state.category || '',
                    nextCategory: this.state.nextCategory || '',
                    dorsalCategory: this.state.dorsalCategory || '',
                    dorsalNumber: this.state.dorsalNumber || '',
                    license: this.state.license || '',
                    licenseType: this.state.licenseType || '',
                    specialization: this.state.specialization || false,
                    groupId: this.state.groupId || '',
                    scheduleIds: this.state.scheduleIds || [],
                    // Contact info
                    mail: this.state.mail || '',
                    phone1: this.state.phone1 || '',
                    phone2: this.state.phone2 || '',
                    phone3: this.state.phone3 || '',
                    municipality: this.state.municipality || '',
                    postalCode: this.state.postalCode || '',
                    address: this.state.address || '',
                    // Bank info
                    iban: this.state.iban || '',
                    paymentType: this.state.paymentType || '',
                    feeType: this.state.feeType || '',
                    holderName: this.state.holderName || '',
                    holderFirstSurname: this.state.holderFirstSurname || '',
                    holderSecondSurname: this.state.holderSecondSurname || '',
                    holderDni: this.state.holderDni || '',
                    //Calculated Fee
                    enrollmentFee: this.state.enrollmentFee || 0,
                    membershipFee: this.state.membershipFee || 0,
                    monthlyFee: this.state.monthlyFee || 0,
                    // Dialogs
                    registered: this.state.registered || false,
                    registerDate: moment(new Date()).format("YYYY-MM-DD"),
                    openRegisterDialog: false,
                    openSportdataDialog: false,

                    errorMessage: this.state.errorMessage || '',
                    successMessage: this.state.successMessage || '',
                    required :[
                        'sportSchoolId',
                        'imageAuth',
                        'name',
                        'firstSurname',
                        'secondSurname',
                        'birthDate',
                        'dni',
                        'gender',
                        'phone1',
                        'municipality',
                        'postalCode',
                        'address',
                        'paymentType',
                        'feeType',
                        'holderName',
                        'holderFirstSurname',
                        'holderSecondSurname',
                        'holderDni'
                    ]
                }}
                validate={(values) => {
                    let errors = {};

                    Object.keys(values).forEach(value => {
                        if (value === 'iban'){
                            if (values.iban === '' && values.paymentType === "DOM"){
                                errors.iban = true;
                            }
                        }
                        else if((values[value] === '') && values.required.includes(value)){
                            errors[value] = true;
                        }
                    })

                    //check if my values have errors
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    this.setState(values)
                    setSubmitting(false);
                    this.handleFormSubmit()
                }}
                >
                {({ handleSubmit, values, touched, setFieldValue, errors, handleChange }) => (

                    <form onSubmit={handleSubmit}>

                    <Snackbar open={values.errorMessage !== undefined && values.errorMessage !== ''} 
                        anchorOrigin={{ vertical:'top', horizontal:'center' }} autoHideDuration={6000}>
                        <Alert severity="error" onClose={() => { setFieldValue("errorMessage", "")}}>
                            <AlertTitle>Error</AlertTitle>
                                <strong>{values.errorMessage}</strong>
                        </Alert>
                    </Snackbar>
                    <Snackbar open={values.successMessage !== undefined && values.successMessage !== ''} 
                        anchorOrigin={{ vertical:'top', horizontal:'center' }} autoHideDuration={6000}>
                        <Alert severity="success" onClose={() => { setFieldValue("successMessage", "")}}>
                            <AlertTitle>Ok!</AlertTitle>
                                <strong>{values.successMessage}</strong>
                        </Alert>
                    </Snackbar>
                        
                    <Grid container spacing={3}>
                        <Grid container item spacing={3}>
                            <Grid container item spacing={1}>
                                <Grid item>
                                    <Card><CardContent>
                                        <Grid container spacing={2}>
                                            <Grid item xs={5}>
                                                <Select name="sportSchoolId" label="Escuela Deportiva" options={values.sportSchools}
                                                    value={values.sportSchoolId} error={touched.sportSchoolId && errors.sportSchoolId} 
                                                    onChange={(e, value) => {
                                                        values.feeTypes = utils.getFeeTypes(parseInt(value.id))
                                                        setFieldValue('sportSchoolId', value.id);
                                                        if (values.feeType){
                                                            setFieldValue('feeType', values.feeType);
                                                            setFieldValue('showSportData', values.feeType !== 'socio')
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={3}>
                                                <TextField name="code" label="Código de atleta" type="number" disabled value={values.code}/>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <TextField name="familyCode" label="Código de familia" type="number" disabled value={values.familyCode}/>
                                            </Grid>
                                        </Grid>
                                    </CardContent></Card>
                                </Grid>
                                <Grid item>
                                    <Button text={values.registered ? 'Dar de baja' : 'Dar de alta' } onClick={() => {
                                        setFieldValue('openRegisterDialog', true)
                                    }} />
                                    <Dialog fullWidth={true} open={values.openRegisterDialog} aria-labelledby="form-dialog-title"
                                        onClose={() => {
                                            setFieldValue('openRegisterDialog', false)
                                        }} 
                                    >
                                        <DialogTitle id="form-dialog-title">Fecha de {values.registered ? 'baja' : 'alta' }</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Introduce la fecha de {values.registered ? 'baja' : 'alta' }.
                                            </DialogContentText>
                                            <TextField id="registerDate" name="registerDate" value={values.registerDate} margin="dense" onChange={handleChange}
                                                type="date"/>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={() => { 
                                                const requestOptions = {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({ date : values.registerDate })
                                                }

                                                fetch(process.env.REACT_APP_SERVER_URL + "/athletes/" + values.id + (values.registered ? "/unregister" : "/register"), requestOptions)
                                                    .then(res => res.json())
                                                    .then(data => {
                                                        setFieldValue('openRegisterDialog', false)
                                                        this.getAthlete(values.id)
                                                    });
                                            }} color="primary"
                                                text={values.registered ? 'Dar de baja' : 'Dar de alta' }/>
                                            <Button onClick={() => { setFieldValue('openRegisterDialog', false) }} color="secondary"
                                                text="Cancelar"/>
                                        </DialogActions>
                                    </Dialog>
                                </Grid>
                                <Grid item>
                                    <Button text={'Histórico deportivo'} onClick={() => {
                                        setFieldValue('openSportdataDialog', true)
                                    }} />
                                    <Dialog fullWidth={true} maxWidth="xl" open={values.openSportdataDialog} aria-labelledby="form-dialog-title"
                                        onClose={() => {
                                            setFieldValue('openSportdataDialog', false)
                                        }} 
                                    >
                                        <DialogTitle id="form-dialog-title">Histórico deportivo</DialogTitle>
                                        <DialogContent>
                                            <Grid container>
                                                <AthleteSportdata id={values.id}/>
                                            </Grid>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={() => { setFieldValue('openSportdataDialog', false) }} color="secondary"
                                                text="Cerrar"/>
                                        </DialogActions>
                                    </Dialog>
                                </Grid>
                            </Grid>
                            <Grid container item spacing={1}>
                                <Grid item>
                                    <Card><CardHeader title="Datos Personales"/>
                                        <CardContent>
                                            <Grid container spacing={1}>
                                                <Grid item>
                                                    <TextField name="name" label="Nombre" value={values.name} margin="dense" 
                                                        error={touched.name && errors.name}
                                                        onBlur={e => {
                                                            if (values.holderName === ''){
                                                                setFieldValue('holderName', e.target.value);
                                                            }
                                                        }}
                                                        onChange={handleChange}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <TextField name="firstSurname" label="Primer Apellido" value={values.firstSurname} margin="dense" 
                                                        error={touched.firstSurname && errors.firstSurname}
                                                        onBlur={e => {
                                                            if (values.holderFirstSurname === ''){
                                                                setFieldValue('holderFirstSurname', e.target.value);
                                                            }
                                                            if (values.familiarOneFirstSurname === ''){
                                                                setFieldValue('familiarOneFirstSurname', e.target.value);
                                                            }
                                                        }}
                                                        onChange={handleChange}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <TextField name="secondSurname" label="Segundo Appellido" value={values.secondSurname} margin="dense" 
                                                        error={touched.secondSurname && errors.secondSurname}
                                                        onBlur={e => {
                                                            if (values.holderSecondSurname === ''){
                                                                setFieldValue('holderSecondSurname', e.target.value);
                                                            }
                                                            if (values.familiarTwoFirstSurname === ''){
                                                                setFieldValue('familiarTwoFirstSurname', e.target.value);
                                                            }
                                                        }}
                                                        onChange={handleChange}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid item>
                                                    <TextField id="birthDate" name="birthDate" value={values.birthDate} margin="dense"
                                                        label="Fecha de nacimiento" type="date"
                                                        error={touched.birthDate && errors.birthDate}
                                                        onChange={e => {
                                                            let d = moment(e.target.value, "YYYY-MM-DD")
                                                            setFieldValue('age', utils.ageCalculator(d));
                                                            setFieldValue('birthDate', e.target.value);
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <TextField name="age" label="Edad" type="number" disabled value={values.age} margin="dense"/>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid item xs>
                                                    <TextField fullWidth name="dni" label="Dni/Nie" type="text" value={values.dni}
                                                        error={touched.dni && errors.dni}
                                                        onBlur={e => {
                                                            if (values.holderDni === ''){
                                                                setFieldValue('holderDni', e.target.value);
                                                            }
                                                        }}
                                                        onChange={handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs>
                                                    <Select fullWidth name="gender" label="Género" error={touched.gender && errors.gender}
                                                        options={[{id:"male", name:"Hombre"},{id:"female", name:"Mujer"}]} value={values.gender}
                                                        onChange={(e, value) => setFieldValue('gender', value.id)} 
                                                    />
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>                  
                                <Grid item>
                                    <Card><CardHeader title="Datos Familiares"/>
                                        <CardContent>
                                            <Typography color="textSecondary">Familiar 1</Typography>
                                            <Grid container spacing={1}>
                                                <Grid item>
                                                    <TextField name="familiarOneName" label="Nombre" value={values.familiarOneName} margin="dense" onChange={handleChange}/>
                                                </Grid>
                                                <Grid item>
                                                    <TextField name="familiarOneFirstSurname" label="Primer Apellido" value={values.familiarOneFirstSurname} margin="dense" onChange={handleChange}/>
                                                </Grid>
                                                <Grid item>
                                                    <TextField name="familiarOneSecondSurname" label="Segundo Apellido" value={values.familiarOneSecondSurname} margin="dense" onChange={handleChange}/>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid item>
                                                    <TextField name="familiarOneDni" type="text" label="Dni" value={values.familiarOneDni} margin="dense" onChange={handleChange}/>
                                                </Grid>
                                                <Grid item>
                                                    <TextField name="familiarOneMail" type="text" label="Email" value={values.familiarOneMail} margin="dense" onChange={handleChange}/>
                                                </Grid>
                                            </Grid>
                                            <Typography color="textSecondary">Familiar 2</Typography>
                                            <Grid container spacing={1}>
                                                <Grid item>
                                                    <TextField name="familiarTwoName" type="text" label="Nombre" value={values.familiarTwoName} margin="dense" onChange={handleChange}/>
                                                </Grid>
                                                <Grid item>
                                                    <TextField name="familiarTwoFirstSurname" type="text" label="Primer Apellido" value={values.familiarTwoFirstSurname} margin="dense" onChange={handleChange}/>
                                                </Grid>
                                                <Grid item>
                                                    <TextField name="familiarTwoSecondSurname" type="text" label="Segundo Apellido" value={values.familiarTwoSecondSurname} margin="dense" onChange={handleChange}/>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid item>
                                                    <TextField name="familiarTwoDni" type="text" label="Dni" value={values.familiarTwoDni} margin="dense" onChange={handleChange}/>
                                                </Grid>
                                                <Grid item>
                                                    <TextField name="familiarTwoMail" type="text" label="Email" value={values.familiarTwoMail} margin="dense" onChange={handleChange}/>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                            <Grid container item spacing={1}>
                                <Grid item>
                                    <Card><CardHeader title="Datos de contacto"/>
                                        <CardContent>
                                            <Grid container spacing={1}>
                                                <Grid container item>
                                                    <TextField name="mail" label="Email" type="email" fullWidth value={values.mail} onChange={handleChange} 
                                                        error={touched.mail && errors.mail}/>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid item>
                                                    <TextField name="phone1" type="tel" value={values.phone1} label="Teléfono 1" onChange={handleChange} 
                                                        error={touched.phone1 && errors.phone1}
                                                    />
                                                    <TextField name="phone2" type="tel" value={values.phone2} label="Teléfono 2" onChange={handleChange} 
                                                        error={touched.phone2 && errors.phone2}
                                                    />
                                                    <TextField name="phone3" type="tel" value={values.phone3} label="Teléfono 3" onChange={handleChange} 
                                                        error={touched.phone3 && errors.phone3}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid item xs>
                                                    <TextField fullWidth name="municipality" label="Municipio" value={values.municipality} onChange={handleChange}
                                                            error={touched.municipality && errors.municipality}/>
                                                </Grid>
                                                <Grid item xs>
                                                    <TextField fullWidth name="postalCode" label="C.P." value={values.postalCode} onChange={handleChange} 
                                                        error={touched.postalCode && errors.postalCode}/>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid container item>
                                                    <TextField name="address" label="Dirección" fullWidth value={values.address} onChange={handleChange} 
                                                        error={touched.address && errors.address}/>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item>
                                    <Card><CardHeader title="Datos Bancarios"/>
                                        <CardContent>
                                            <Grid container spacing={1}>
                                                <Grid item xs>
                                                    <Select fullWidth name="paymentType" label="Forma de pago" 
                                                        options={utils.getPaymentTypes()} value={values.paymentType} error={touched.paymentType && errors.paymentType}
                                                        onChange={(e, value) => {
                                                            setFieldValue('paymentType', value.id)
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs>
                                                    <Select fullWidth name="feeType" label="Tipo de cuota" 
                                                        options={values.feeTypes} value={values.feeType} error={touched.feeType && errors.feeType}
                                                        onChange={(e, value) => {
                                                            setFieldValue('showSportData', value.id !== 'socio')
                                                            setFieldValue('feeType', value.id)
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid container item>
                                                    <TextField name="iban" label="Iban" fullWidth value={values.iban} onChange={handleChange}
                                                        error={touched.iban && errors.iban}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <CardHeader subheader="Titular de la cuenta"/>
                                            <Grid container spacing={1}>
                                                <Grid item>
                                                    <TextField name="holderName" label="Nombre" value={values.holderName} onChange={handleChange} 
                                                        error={touched.holderName && errors.holderName}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <TextField name="holderFirstSurname" label="Primer apellido" value={values.holderFirstSurname} onChange={handleChange} 
                                                        error={touched.holderFirstSurname && errors.holderFirstSurname}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <TextField name="holderSecondSurname" label="Segundo apellido" value={values.holderSecondSurname} onChange={handleChange}
                                                        error={touched.holderSecondSurname && errors.holderSecondSurname}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid item xs>
                                                    <TextField fullWidth name="holderDni" label="Dni/Nie" value={values.holderDni} onChange={handleChange}
                                                        error={touched.holderDni && errors.holderDni}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                            <Grid container item style={{ display: values.showSportData ? "block" : "none" }}>
                                <Grid item>
                                    <Card><CardHeader title="Datos Deportivos"/>
                                        <CardContent>
                                            <Grid container spacing={1}>
                                                <Grid item xs={2}>
                                                    <Select fullWidth name="category" label="Categoría"
                                                        options={utils.getCategories()} value={values.category}
                                                        onChange={(e, value) => setFieldValue('category', value.id) }
                                                    />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Select fullWidth name="nextCategory" label="Siguiente categoría" 
                                                        options={utils.getCategories()} value={values.nextCategory}
                                                        onChange={(e, value) => setFieldValue('nextCategory', value.id) }
                                                    />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Select fullWidth name="dorsalCategory" label="Categoría dorsal" 
                                                        options={utils.getDorsalCategories()} value={values.dorsalCategory} 
                                                        onChange={(e, value) => setFieldValue('dorsalCategory', value.id) }
                                                    />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <TextField fullWidth name="dorsalNumber" label="Dorsal" type="number" value={values.dorsalNumber} onChange={handleChange}/>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid item xs={2}>
                                                    <Select fullWidth name="licenseType" label="Tipo de Licencia"
                                                        value={values.licenseType} options={[{id:"N", name:"Nacional"},{id:"T", name:"Territorial"}]}
                                                        onChange={(e, value) => setFieldValue('licenseType', value.id) }
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <TextField fullWidth name="license" label="Licencia" value={values.license} onChange={handleChange}/>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid item xs={2}>
                                                    <Select fullWidth name="specialization" label="Especialización" 
                                                        value={values.specialization} options={[{id:true, name:"Si"},{id:false, name:"No"}]}
                                                        onChange={(e, value) => {
                                                            
                                                            if (value.id === true){
                                                                setFieldValue('groups', this.specializedGroups)
                                                            }
                                                            else if (value.id === false){
                                                                setFieldValue('groups', this.notSpecializedGroups)
                                                            }
                                                            else {
                                                                setFieldValue('groups', [])
                                                            }
                                                            this.fillFee(values, setFieldValue)
                                                            setFieldValue('specialization', value.id);
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Select fullWidth name="groupId" label="Grupos" type="number"
                                                        value={values.groupId} options={values.groups}
                                                        onChange={(e, value) => {
                                                            this.fillSchedules(value.id, setFieldValue)
                                                            setFieldValue('groupId', value.id)
                                                            setFieldValue('scheduleIds', [])
                                                            this.fillFee(values, setFieldValue)
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Card><CardHeader title="Horarios"/>
                                                        <CardContent>  
                                                                {
                                                                    values.schedules.map(sch => {
                                                                        return (
                                                                            <Grid item key={`row_sch${sch.id}`} >
                                                                                <Checkbox
                                                                                    name="scheduleIds" 
                                                                                    key={`sch${sch.id}`} 
                                                                                    checked={values.scheduleIds.includes(sch.id)}
                                                                                    onChange={e => {
                                                                                        if (e.target.checked) {
                                                                                            values.scheduleIds.push(sch.id)
                                                                                        } else {
                                                                                            const idx = values.scheduleIds.indexOf(sch.id);
                                                                                            values.scheduleIds.splice(idx, 1);
                                                                                        }
                                                                                        setFieldValue('scheduleIds', values.scheduleIds)
                                                                                        this.fillFee(values, setFieldValue)
                                                                                    }}
                                                                                />
                                                                                {sch.dayTranslate} - {utils.leftPadding(sch.startHour, 2,"0")}:{utils.leftPadding(sch.startMinute, 2,"0")} - {utils.leftPadding(sch.endHour, 2,"0")}:{utils.leftPadding(sch.endMinute, 2,"0")}
                                                                            </Grid> 
                                                                        )
                                                                    })
                                                                }
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                            <Grid container item style={{ display: values.showSportData ? "block" : "none" }}>
                                <Grid item>
                                    <Card><CardHeader title="Calculo de cuota"/>
                                        <CardContent>
                                            <Grid container spacing={1}>
                                                <Grid item>
                                                    <TextField name="membershipFee" label="Cuota de socio" type="number" disabled value={values.membershipFee}/>
                                                </Grid>
                                                <Grid item>
                                                    <TextField name="enrollmentFee" label="Matricula" type="number" disabled value={values.enrollmentFee}/>
                                                </Grid>
                                                <Grid item>
                                                    <TextField name="monthlyFee" label="Mensualidad" type="number" disabled value={values.monthlyFee}/>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                            <Grid container item style={{ display: "block" }}>
                                <Grid item>
                                    <Card>
                                        <CardContent>
                                            <Grid container spacing={1}>
                                                <Grid item xs={3}>
                                                    <Select fullWidth name="imageAuth" label="Aut. Imágenes" value={values.imageAuth}
                                                        error={touched.imageAuth && errors.imageAuth} onChange={handleChange}
                                                        options={[{id: true, name: 'Si'}, {id: false, name: 'No'}]}
                                                    />
                                                </Grid>
                                                <Grid item xs={9}>
                                                    <TextField fullWidth name="observations" label="Observaciones" multiline
                                                        value={values.observations} onChange={handleChange}/>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <AppBar position="fixed" style={{ bottom : 0, top: 'auto'}}>
                        <SubmitButton/>
                    </AppBar>
                </form>
            )}
        </Formik>
        
        );
    }
}

export default CreateAthlete;
