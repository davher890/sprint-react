import React, { Component } from "react";
import { 
    InputGroup, Form
} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";
import utils from "../functions/Utils.js"
import { Formik, Field } from 'formik';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import Button from '@material-ui/core/Button';
import SubmitButton from './buttons/SubmitButton'

class CreateAthlete extends Component {
    
    constructor(props) {
        super(props);
        this.state = {};

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleMultipleSelectChange = this.handleMultipleSelectChange.bind(this);
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

    handleMultipleSelectChange(event){

        event.preventDefault();

        var options = event.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }

        this.setState({
            scheduleIds : value
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
                    birthDate: Date.parse(this.state.birthDate) || '',
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
                    specialization: this.state.specialization,
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
                }}
                >
                {({ handleSubmit, values, touched, setFieldValue, errors }) => (

                    <Form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid container item spacing={1}>
                            <Grid item>
                                <Card>
                                    <CardContent>
                                        <Grid container spacing={3}>
                                            <Grid item>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                      <InputGroup.Text>Escuala Deportiva</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="sportSchoolId" value={values.sportSchoolId} as="select" className={`form-control ${touched.sportSchoolId && errors.sportSchoolId ? "is-invalid" : ""}`}
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
                                                                return (<option key={`spe${spe.id}`} value={spe.id}>{spe.name}</option>)
                                                            })
                                                        }
                                                    </Field>
                                                </InputGroup>
                                            </Grid>
                                            <Grid item>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Código de atleta</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="code" type="number" disabled value={values.code}/>
                                                </InputGroup>
                                            </Grid>
                                            <Grid item>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Código de familia</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="familyCode" type="number" disabled value={values.familyCode}/>
                                                </InputGroup>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid container item spacing={1}>
                            <Grid item>
                                <Card><CardHeader title="Datos Personales"/>
                                    <CardContent>
                                        <Grid container spacing={1}>
                                            <Grid item>
                                                <Field name="name" type="text" placeholder="Nombre" value={values.name} 
                                                    className={`form-control ${touched.name && errors.name ? "is-invalid" : ""}`}
                                                    onBlur={e => {
                                                        if (values.holderName === ''){
                                                            setFieldValue('holderName', e.target.value);
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Field name="firstSurname" type="text" placeholder="Primer Apellido" value={values.firstSurname} 
                                                    className={`form-control ${touched.firstSurname && errors.firstSurname ? "is-invalid" : ""}`}
                                                    onBlur={e => {
                                                        if (values.holderFirstSurname === ''){
                                                            setFieldValue('holderFirstSurname', e.target.value);
                                                        }
                                                        if (values.familiarOneFirstSurname === ''){
                                                            setFieldValue('familiarOneFirstSurname', e.target.value);
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Field name="secondSurname" type="text" placeholder="Segundo Appellido" value={values.secondSurname} 
                                                    className={`form-control ${touched.secondSurname && errors.secondSurname ? "is-invalid" : ""}`}
                                                    onBlur={e => {
                                                        if (values.holderSecondSurname === ''){
                                                            setFieldValue('holderSecondSurname', e.target.value);
                                                        }
                                                        if (values.familiarTwoFirstSurname === ''){
                                                            setFieldValue('familiarTwoFirstSurname', e.target.value);
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={1}>
                                            <Grid item>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                      <InputGroup.Text>Fecha de nacimiento</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <DatePicker autoComplete="off" id="birthDate" dateFormat="yyyy-MM-dd" name="birthDate" value={values.birthDate}
                                                        selected = {values.birthDate}
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        dropdownMode="select"
                                                        className={`${touched.birthDate && errors.birthDate ? "is-invalid" : ""}`}
                                                        onChange={e => {
                                                            values.age = utils.ageCalculator(e)
                                                            setFieldValue('birthDate', e);
                                                        }}
                                                    />
                                                </InputGroup>
                                            </Grid>
                                            <Grid item>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Edad</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="age" type="number" disabled value={values.age}/>
                                                </InputGroup>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={1}>
                                            <Grid item>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                      <InputGroup.Text>Dni</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="dni" type="text" value={values.dni} 
                                                        className={`form-control ${touched.dni && errors.dni ? "is-invalid" : ""}`}
                                                        onBlur={e => {
                                                            if (values.holderDni === ''){
                                                                setFieldValue('holderDni', e.target.value);
                                                            }
                                                        }}
                                                    />
                                                </InputGroup>
                                            </Grid>
                                            <Grid item>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                      <InputGroup.Text>Género</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="gender" value={values.gender} as="select"
                                                        className={`form-control ${touched.gender && errors.gender ? "is-invalid" : ""}`}>
                                                        <option></option>
                                                        <option value="male">Hombre</option>
                                                        <option value="female">Mujer</option>
                                                    </Field>
                                                </InputGroup>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>                  
                            <Grid item>
                                <Card><CardHeader title="Datos Familiares"/>
                                    <CardContent>
                                        <CardHeader subheader="Familiar 1"/>
                                        <Grid container spacing={1}>
                                            <Grid item>
                                                <Field name="familiarOneName" type="text" placeholder="Nombre" value={values.familiarOneName} 
                                                    className='form-control'/>
                                            </Grid>
                                            <Grid item>
                                                <Field name="familiarOneFirstSurname" type="text" placeholder="Primer Apellido" value={values.familiarOneFirstSurname} 
                                                    className='form-control'/>
                                            </Grid>
                                            <Grid item>
                                                <Field name="familiarOneSecondSurname" type="text" placeholder="Segundo Apellido" value={values.familiarOneSecondSurname} 
                                                    className='form-control'/>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={1}>
                                            <Grid item>
                                                <Field name="familiarOneDni" type="text" placeholder="Dni" value={values.familiarOneDni} 
                                                    className='form-control'/>
                                            </Grid>
                                            <Grid item>
                                                <Field name="familiarOneMail" type="text" placeholder="Email" value={values.familiarOneMail} 
                                                    className='form-control'/>
                                            </Grid>
                                        </Grid>
                                        <CardHeader subheader="Familiar 2"/>
                                        <Grid container spacing={1}>
                                            
                                            <Grid item>
                                                <Field name="familiarTwoName" type="text" placeholder="Nombre" value={values.familiarTwoName} 
                                                    className='form-control'/>
                                            </Grid>
                                            <Grid item>
                                                <Field name="familiarTwoFirstSurname" type="text" placeholder="Primer Apellido" value={values.familiarTwoFirstSurname} 
                                                    className='form-control'/>
                                            </Grid>
                                            <Grid item>
                                                <Field name="familiarTwoSecondSurname" type="text" placeholder="Segundo Apellido" value={values.familiarTwoSecondSurname} 
                                                    className='form-control'/>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={1}>
                                            <Grid item>
                                                <Field name="familiarTwoDni" type="text" placeholder="Dni" value={values.familiarTwoDni} 
                                                    className='form-control'/>
                                            </Grid>
                                            <Grid item>
                                                <Field name="familiarTwoMail" type="text" placeholder="Email" value={values.familiarTwoMail} 
                                                    className='form-control'/>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid container item spacing={1}>
                            <Grid item>
                                <Card><CardHeader title="Datos de Cotacto"/>
                                    <CardContent>
                                        <Grid container spacing={1}>
                                            <Grid item>
                                                <InputGroup>
                                                    <Field name="mail" placeholder="Email" type="email" value={values.mail} 
                                                        className={`form-control ${touched.mail && errors.mail ? "is-invalid" : ""}`}
                                                    />
                                                </InputGroup>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={1}>
                                            <Grid item>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Teléfonos</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="phone1" type="tel" value={values.phone1} placeholder="Teléfono 1"
                                                        className={`form-control ${touched.phone1 && errors.phone1 ? "is-invalid" : ""}`}
                                                    />
                                                    <Field name="phone2" type="tel" value={values.phone2} placeholder="Teléfono 2"
                                                        className={`form-control ${touched.phone2 && errors.phone2 ? "is-invalid" : ""}`}
                                                    />
                                                    <Field name="phone3" type="tel" value={values.phone3} placeholder="Teléfono 3"
                                                        className={`form-control ${touched.phone3 && errors.phone3 ? "is-invalid" : ""}`}
                                                    />
                                                </InputGroup>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={1}>
                                            <Grid item>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Municipio</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="municipality" type="text" value={values.municipality} 
                                                        className={`form-control ${touched.municipality && errors.municipality ? "is-invalid" : ""}`}/>
                                                </InputGroup>
                                            </Grid>
                                            <Grid item>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>C.P.</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="postalCode" type="text" value={values.postalCode} 
                                                        className={`form-control ${touched.postalCode && errors.postalCode ? "is-invalid" : ""}`}/>
                                                </InputGroup>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={1}>
                                            <Grid item>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Dirección</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="address" type="text" value={values.address} 
                                                        className={`form-control ${touched.address && errors.address ? "is-invalid" : ""}`}/>
                                                </InputGroup>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item>
                                <Card><CardHeader title="Datos Bancarios"/>
                                    <CardContent>
                                        <Grid container spacing={1}>
                                            <Grid item>
                                                <InputGroup>
                                                    <Field name="iban" placeholder="Iban" type="iban" value={values.iban} 
                                                        className={`form-control ${touched.iban && errors.iban ? "is-invalid" : ""}`}
                                                    />
                                                </InputGroup>
                                            </Grid>
                                            <Grid item>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Forma de pago</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="paymentType" value={values.paymentType} as="select"
                                                        className={`form-control ${touched.paymentType && errors.paymentType ? "is-invalid" : ""}`}>
                                                        {
                                                            utils.getPaymentTypes().map(pt => {
                                                                return (<option key={`pt${pt.id}`} value={pt.id}>{pt.name}</option>)
                                                            })
                                                        }
                                                    </Field>
                                                </InputGroup>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={1}>
                                            <Grid item>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                      <InputGroup.Text>Tipo de cuota</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="feeType" value={values.feeType} as="select" 
                                                        onChange={(e) => {
                                                            setFieldValue('showSportData', e.target.value !== 'socio')
                                                            setFieldValue('feeType', e.target.value)
                                                        }}
                                                        className={`form-control ${touched.feeType && errors.feeType ? "is-invalid" : ""}`}>
                                                        {
                                                            values.feeTypes.map(ft => {
                                                                return (<option key={`fet${ft.id}`} value={ft.id}>{ft.name}</option>)
                                                            })
                                                        }
                                                    </Field>
                                                </InputGroup>
                                            </Grid>
                                        </Grid>
                                        <CardHeader subheader="Titular de la cuenta"/>
                                        <Grid container spacing={1}>
                                            <Grid item>
                                                <Field name="holderName" type="text" placeholder="Nombre" value={values.holderName} 
                                                    className={`form-control ${touched.holderName && errors.holderName ? "is-invalid" : ""}`}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Field name="holderFirstSurname" type="text" placeholder="Primer Apellido" value={values.holderFirstSurname} 
                                                    className={`form-control ${touched.holderFirstSurname && errors.holderFirstSurname ? "is-invalid" : ""}`}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Field name="holderSecondSurname" type="text" placeholder="Segundo Appellido" value={values.holderSecondSurname} 
                                                    className={`form-control ${touched.holderSecondSurname && errors.holderSecondSurname ? "is-invalid" : ""}`}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={1}>
                                            <Grid item>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                      <InputGroup.Text>Dni</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="holderDni" type="text" value={values.holderDni} 
                                                        className={`form-control ${touched.holderDni && errors.holderDni ? "is-invalid" : ""}`}
                                                    />
                                                </InputGroup>
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
                                            <Grid item>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Categoría</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="category" value={values.category} as="select" className='form-control'>
                                                        {
                                                            utils.getCategories().map(c => {
                                                                return (<option key={`cat${c.id}`} value={c.id}>{c.name}</option>)
                                                            })
                                                        }
                                                    </Field>
                                                </InputGroup>
                                            </Grid>
                                            <Grid item>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Siguiente Categoría</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="nextCategory" value={values.nextCategory} as="select" className='form-control'>
                                                        {
                                                            utils.getCategories().map(c => {
                                                                return (<option key={`nextcat${c.id}`} value={c.id}>{c.name}</option>)
                                                            })
                                                        }
                                                    </Field>
                                                </InputGroup>
                                            </Grid>
                                            <Grid item>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Categoría Dorsal</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="dorsalCategory" value={values.dorsalCategory} as="select" className='form-control'>
                                                        {
                                                            utils.getDorsalCategories().map(dc => {
                                                                return (<option key={`dc${dc.id}`} value={dc.id}>{dc.name}</option>)
                                                            })
                                                        }
                                                    </Field>                              
                                                </InputGroup>
                                            </Grid>
                                            <Grid item>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Dorsal</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="dorsalNumber" type="number" value={values.dorsalNumber} className='form-control'/>
                                                </InputGroup>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={1}>
                                            <Grid item>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Tipo de Licencia</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="licenseType" value={values.licenseType} as="select" className='form-control'>
                                                        <option></option>
                                                        <option value="N">Nacional</option>
                                                        <option value="T">Territorial</option>
                                                    </Field>
                                                </InputGroup>
                                            </Grid>
                                            <Grid item>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Licencia</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="license" type="text" value={values.license} className='form-control'/>
                                                </InputGroup>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={1}>
                                            <Grid item>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Especialización</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="specialization" value={values.specialization} as="select" className='form-control'
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
                                                        <option></option>
                                                        <option value={true}>Si</option>
                                                        <option value={false}>No</option>
                                                    </Field>
                                                </InputGroup>
                                            </Grid>
                                            <Grid item>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                      <InputGroup.Text>Grupos</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="groupId" value={values.groupId} as="select" className='form-control'
                                                        onChange={e => {
                                                            
                                                            this.fillSchedules(e.target.value, setFieldValue)
                                                            this.fillFee(values, setFieldValue)
                                                            setFieldValue('groupId', e.target.value)
                                                        }}>
                                                        {
                                                            values.groups.map(group => {
                                                                return (<option key={group.id} value={group.id}>{group.name}</option>)
                                                            })
                                                        }
                                                    </Field>
                                                </InputGroup>
                                            </Grid>
                                            <Grid item>
                                                <Card><CardHeader title="Horarios"/>
                                                    <CardContent>  
                                                            {
                                                                values.schedules.map(sch => {
                                                                    return (
                                                                        <Grid item key={`row_sch${sch.id}`} >
                                                                            <Field 
                                                                                type="checkbox" 
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
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Cuota de socio</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="membershipFee" type="number" disabled value={values.age}/>
                                                </InputGroup>
                                            </Grid>
                                            <Grid item>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Matricula</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="enrollmentFee" type="number" disabled value={values.age}/>
                                                </InputGroup>
                                            </Grid>
                                            <Grid item>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Mensualidad</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="monthlyFee" type="number" disabled value={values.age}/>
                                                </InputGroup>
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
                                            <Grid item>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                      <InputGroup.Text>Aut. Imágenes</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="imageAuth" value={values.imageAuth} as="select" 
                                                        className={`form-control ${touched.imageAuth && errors.imageAuth ? "is-invalid" : ""}`}>
                                                        <option></option>
                                                        <option value={true}>Si</option>
                                                        <option value={false}>No</option>
                                                    </Field>
                                                </InputGroup>
                                            </Grid>
                                            <Grid item>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                      <InputGroup.Text>Observaciones</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="observations" value={values.observations} as="textarea" className='form-control'></Field>
                                                </InputGroup>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container item spacing={5}>
                        <Grid item>
                            <SubmitButton/>
                        </Grid>
                    </Grid>
                    </Form>
                )}
            </Formik>
        );
    }
}

export default CreateAthlete;
