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
import SubmitButton from './buttons/SubmitButton'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';

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
                    this.setState(data, () => {
                        if (data.groupId && data.groupId > 0){
                            fetch(process.env.REACT_APP_SERVER_URL + "/groups/" + data.groupId + "/schedules",  { headers })
                                .then(res => res.json())
                                .then(data => {
                                    this.schedules = data
                                    this.setState(data)
                                });
                        }
                    })
                });
            }
            else {
                this.setState({})
            }
        })
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
                data.age = utils.ageCalculator(Date.parse(data.birthDate));
                this.setState(data)
            });
            alert("Guardado")
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
                    imageAuth: this.state.imageAuth || '',
                    observations: this.state.observations || '',
                    name: this.state.name || '',
                    firstSurname: this.state.firstSurname || '',
                    secondSurname: this.state.secondSurname || '',
                    birthDate: this.state.birthDate || '',
                    dni: this.state.dni || '',
                    gender: this.state.gender || '',
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
                    specialization: this.state.specialization || '',
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
                    required :[
                        'sportSchoolId',
                        'imageAuth',
                        'name',
                        'firstSurname',
                        'secondSurname',
                        'birthDate',
                        'dni',
                        'gender',
                        'mail',
                        'phone1',
                        'phone2',
                        'phone3',
                        'municipality',
                        'postalCode',
                        'address',
                        'iban',
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
                        if((values[value] === '') && values.required.includes(value)){
                            errors[value] = 'Campo obligatorio'; 
                        }
                    })

                    //check if my values have errors
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    this.setState(values)
                    setSubmitting(false);
                    this.handleFormSubmit()
                    alert("Guardado")
                }}
                >
                {({ handleSubmit, values, touched, setFieldValue, errors, handleChange }) => (

                    <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid container item spacing={3}>
                            <Grid container item spacing={1}>
                                <Grid item>
                                    <Card><CardContent>
                                        <Grid container spacing={2}>
                                            <Grid item xs={5}>
                                                <TextField select fullWidth name="sportSchoolId" label="Escuela Deportiva" value={values.sportSchoolId} error={touched.sportSchoolId && errors.sportSchoolId}
                                                    onChange={e => {
                                                        values.feeTypes = utils.getFeeTypes(parseInt(e.target.value))
                                                        setFieldValue('sportSchoolId', e.target.value);
                                                        if (values.feeType){
                                                            setFieldValue('feeType', values.feeType);
                                                            setFieldValue('showSportData', values.feeType !== 'socio')
                                                        }
                                                    }}
                                                    >
                                                    {
                                                        values.sportSchools.map(spe => {
                                                            return (<MenuItem key={`spe${spe.id}`} value={spe.id}>{spe.name}</MenuItem>)
                                                        })
                                                    }
                                                </TextField>
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
                                                            values.age = utils.ageCalculator(d)
                                                            setFieldValue('birthDate', e.target.value);
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <TextField name="age" label="Edad" type="number" disabled value={values.age} margin="dense"/>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid item>
                                                    <TextField name="dni" label="Dni/Nie" type="text" value={values.dni} margin="dense"
                                                        error={touched.dni && errors.dni}
                                                        onBlur={e => {
                                                            if (values.holderDni === ''){
                                                                setFieldValue('holderDni', e.target.value);
                                                            }
                                                        }}
                                                        onChange={handleChange}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <TextField select name="gender" value={values.gender} label="Género" margin="dense" 
                                                        onChange={handleChange} error={touched.gender && errors.gender}>
                                                        <option></option>
                                                        <MenuItem value="male">Hombre</MenuItem>
                                                        <MenuItem value="female">Mujer</MenuItem>
                                                    </TextField>
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
                                                <Grid container item>
                                                    <TextField name="iban" label="Iban" type="iban" fullWidth value={values.iban} onChange={handleChange}
                                                        error={touched.iban && errors.iban}/>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={1}>
                                               <Grid item xs>
                                                    <TextField select fullWidth name="paymentType" label="Forma de pago" value={values.paymentType} onChange={handleChange}
                                                        error={touched.paymentType && errors.paymentType}>
                                                        {
                                                            utils.getPaymentTypes().map(pt => {
                                                                return (<MenuItem key={`pt${pt.id}`} value={pt.id}>{pt.name}</MenuItem>)
                                                            })
                                                        }
                                                    </TextField>
                                                </Grid>
                                                <Grid item xs>
                                                    <TextField select fullWidth name="feeType" label="Tipo de cuota" value={values.feeType} error={touched.feeType && errors.feeType}
                                                        onChange={(e) => {
                                                            setFieldValue('showSportData', e.target.value !== 'socio')
                                                            setFieldValue('feeType', e.target.value)
                                                        }}
                                                        >
                                                        {
                                                            values.feeTypes.map(ft => {
                                                                return (<MenuItem key={`fet${ft.id}`} value={ft.id}>{ft.name}</MenuItem>)
                                                            })
                                                        }
                                                    </TextField>
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
                                                    <TextField select fullWidth name="category" label="Categoría" value={values.category} onChange={handleChange}>
                                                        {
                                                            utils.getCategories().map(c => {
                                                                return (<MenuItem key={`cat${c.id}`} value={c.id}>{c.name}</MenuItem>)
                                                            })
                                                        }
                                                    </TextField>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <TextField select fullWidth name="nextCategory" label="Siguiente categoría" value={values.nextCategory} onChange={handleChange}>
                                                        {
                                                            utils.getCategories().map(c => {
                                                                return (<MenuItem key={`nextcat${c.id}`} value={c.id}>{c.name}</MenuItem>)
                                                            })
                                                        }
                                                    </TextField>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <TextField select fullWidth name="dorsalCategory" label="Categoría dorsal" value={values.dorsalCategory} onChange={handleChange}>
                                                        {
                                                            utils.getDorsalCategories().map(dc => {
                                                                return (<MenuItem key={`dc${dc.id}`} value={dc.id}>{dc.name}</MenuItem>)
                                                            })
                                                        }
                                                    </TextField>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <TextField fullWidth name="dorsalNumber" label="Dorsal" type="number" value={values.dorsalNumber} onChange={handleChange}/>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid item xs={2}>
                                                    <TextField select fullWidth name="licenseType" label="Tipo de Licencia" value={values.licenseType} onChange={handleChange}>
                                                        <MenuItem></MenuItem>
                                                        <MenuItem value="N">Nacional</MenuItem>
                                                        <MenuItem value="T">Territorial</MenuItem>
                                                    </TextField>
                                                </Grid>
                                                <Grid item>
                                                    <TextField fullWidth name="license" label="Licencia" value={values.license} onChange={handleChange}/>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid item xs={2}>
                                                    <TextField select fullWidth name="specialization" label="Especialización" value={values.specialization}
                                                        onChange={e => {
                                                            
                                                            if (e.target.value === 'true'){
                                                                setFieldValue('groups', this.specializedGroups)
                                                            }
                                                            else if (e.target.value === 'false'){
                                                                setFieldValue('groups', this.notSpecializedGroups)
                                                            }
                                                            else {
                                                                setFieldValue('groups', [])
                                                            }
                                                            setFieldValue('specialization', e.target.value);
                                                        }}>
                                                        <MenuItem></MenuItem>
                                                        <MenuItem value={true}>Si</MenuItem>
                                                        <MenuItem value={false}>No</MenuItem>
                                                    </TextField>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <TextField select fullWidth name="groupId" label="Grupos" value={values.groupId} as="TextField select"
                                                        onChange={e => {
                                                            
                                                            this.fillSchedules(e.target.value, setFieldValue)
                                                            this.fillFee(values, setFieldValue)
                                                            setFieldValue('groupId', e.target.value)
                                                        }}>
                                                        {
                                                            values.groups.map(group => {
                                                                return (<MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>)
                                                            })
                                                        }
                                                    </TextField>
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
                                                                                    }}
                                                                                />
                                                                                {sch.day} - {sch.startHour}:{sch.startMinute} - {sch.endHour}:{sch.endMinute}
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
                                                    <TextField name="membershipFee" label="Cuota de socio" type="number" disabled value={values.age}/>
                                                </Grid>
                                                <Grid item>
                                                    <TextField name="enrollmentFee" label="Matricula" type="number" disabled value={values.age}/>
                                                </Grid>
                                                <Grid item>
                                                    <TextField name="monthlyFee" label="Mensualidad" type="number" disabled value={values.age}/>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                            <Grid container item spacing={1}>
                                <Grid item>
                                    <Card>
                                        <CardContent>
                                            <Grid container spacing={1}>
                                                <Grid item xs>
                                                    <TextField select fullWidth name="imageAuth" label="Aut. Imágenes" value={values.imageAuth}
                                                        error={touched.imageAuth && errors.imageAuth} onChange={handleChange}>
                                                        <MenuItem></MenuItem>
                                                        <MenuItem value={true}>Si</MenuItem>
                                                        <MenuItem value={false}>No</MenuItem>
                                                    </TextField>
                                                </Grid>
                                                <Grid item xs>
                                                    <TextField fullWidth name="observations" label="Observaciones" multiline
                                                        value={values.observations} onChange={handleChange}/>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container item spacing={3}>
                            <Grid item>
                                <SubmitButton/>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Formik>
        
        );
    }
}

export default CreateAthlete;
