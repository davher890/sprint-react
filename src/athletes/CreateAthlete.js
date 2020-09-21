import React, { Component } from "react";
import { 
    InputGroup,
    Button, Col, 
    Row, Card, Form
} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";
import utils from "../functions/Utils.js"
import { Formik, Field } from 'formik';

class CreateAthlete extends Component {
    
    constructor(props) {
        super(props);
        this.state = {};

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.getSportSchoolFeeType = this.getSportSchoolFeeType.bind(this);
        this.handleMultipleSelectChange = this.handleMultipleSelectChange.bind(this);
        this.fillSchedules = this.fillSchedules.bind(this)

        // Santa Ana
        this.feeType1 = [
            { id : '', name : ''},
            { id : 'CLUB', name : 'Club'},
            { id : 'PISTAS', name : 'Pistas'},
            { id : 'LIC_PISTAS', name : 'Licencia/Pistas'},
            { id : 'ENTRENADOR', name : 'Entrenadores'},
        ]

        // Paracuellos
        this.feeType2 = [
            { id : '', name : ''},
            { id : 'club', name : 'Club'}
        ]

        // Externos
        this.feeType3 = [
            { id : '', name : ''},
            { id : 'licencia', name : 'Licencia'},
            { id : 'socio', name : 'Socio'},
            { id : 'entrenadores', name : 'Entrenadores'},
        ]

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
                    this.specializedGroups = data
                    resolve()
                });
            })
        let noSpGroupsPromise = new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_SERVER_URL + "/groups/all?specialization=false",  { headers })
                .then(res => res.json())
                .then(data => {
                    this.notSpecializedGroups = data
                    resolve()
                });
            })

        Promise.all([schoolsPromise, spGroupsPromise, noSpGroupsPromise]).then(values => {
            if (this.props.match.params.id) {
                let id = this.props.match.params.id
                fetch(process.env.REACT_APP_SERVER_URL + "/athletes/" + id,  { headers })
                .then(res => res.json())
                .then(data => {
                    data.age = utils.ageCalculator(Date.parse(data.birthDate));

                    this.showSportData = data.feeType !== 'socio'
                    if (data.sportSchoolId === 1){
                        this.feeTypes = this.feeType1
                    }
                    else if (data.sportSchoolId === 2){
                        this.feeTypes = this.feeType2
                    }
                    else {
                        this.feeTypes = this.feeType3
                    }
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

    fillSchedules(groupId, setFieldValue){
        const headers = { 'Content-Type': 'application/json' }
        fetch(process.env.REACT_APP_SERVER_URL + "/groups/" + groupId + "/schedules",  { headers })
            .then(res => res.json())
            .then(data => {
                this.schedules = data
                setFieldValue('schedules', this.schedules)
            });
    }

    getSportSchoolFeeType(value) {
        
        // Santa Ana
        if (value === '1'){
            return this.feeType1
        }

        // Paracuellos
        else if (value === '2'){
            return this.feeType2
        }

        else {
            return this.feeType3
        } 
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
                    code: this.state.code,
                    familyCode: this.state.familyCode,
                    // Extra fields
                    groups: this.groups || [],
                    schedules: this.schedules || [],
                    sportSchools: this.sportSchools || [],
                    feeTypes: this.feeTypes,
                    showSportData: this.showSportData,
                    age : this.state.age || 0,
                    // Personal info
                    sportSchoolId: this.state.sportSchoolId || '',
                    imageAuth: this.state.imageAuth,
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
                        'category',
                        'dorsalCategory',
                        'dorsalNumber',
                        'license',
                        'licenseType',
                        'specialization',
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
                        'holderDni',
                        'groupId',
                        'scheduleIds'
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
                    alert("Guardando...");
                    this.setState(values)
                    setSubmitting(false);
                    this.handleFormSubmit()
                    
                }}
                >
                {({ handleSubmit, handleChange, values, touched, setFieldValue, setFieldTouched, setValues, errors }) => (

                    <Form onSubmit={handleSubmit}>
                        <Form.Group><Row>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Row>
                                            <Col md="auto">
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                      <InputGroup.Text>Escuala Deportiva</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="sportSchoolId" value={values.sportSchoolId} as="select" className={`form-control ${touched.sportSchoolId && errors.sportSchoolId ? "is-invalid" : ""}`}
                                                        onChange={e => {
                                                            values.feeTypes = this.getSportSchoolFeeType(e.target.value)
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
                                            </Col> 
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row></Form.Group>
                        <Form.Group><Row>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Datos Personales</Card.Title>
                                        <Form.Group><Row>
                                            <Col>
                                                <Field name="name" type="text" placeholder="Nombre" value={values.name} 
                                                    className={`form-control ${touched.name && errors.name ? "is-invalid" : ""}`}
                                                    onBlur={e => {
                                                        if (values.holderName === ''){
                                                            setFieldValue('holderName', e.target.value);
                                                        }
                                                    }}
                                                />
                                            </Col>
                                            <Col>
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
                                            </Col>
                                            <Col>
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
                                            </Col>
                                        </Row></Form.Group>
                                        <Form.Group><Row>
                                            <Col >
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
                                            </Col>
                                            <Col>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Edad</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="age" type="number" disabled value={values.age}/>
                                                </InputGroup>
                                            </Col>
                                        </Row></Form.Group>
                                        <Form.Group><Row>
                                            <Col>
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
                                            </Col>
                                            <Col>
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
                                            </Col>
                                        </Row></Form.Group>
                                    </Card.Body>
                                </Card>
                            </Col>                  
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Datos Familiares</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Familiar 1</Card.Subtitle>
                                        <Form.Group><Row>
                                            <Col>
                                                <Field name="familiarOneName" type="text" placeholder="Nombre" value={values.familiarOneName} 
                                                    className='form-control'/>
                                            </Col>
                                            <Col>
                                                <Field name="familiarOneFirstSurname" type="text" placeholder="Primer Apellido" value={values.familiarOneFirstSurname} 
                                                    className='form-control'/>
                                            </Col>
                                            <Col>
                                                <Field name="familiarOneSecondSurname" type="text" placeholder="Segundo Apellido" value={values.familiarOneSecondSurname} 
                                                    className='form-control'/>
                                            </Col>
                                        </Row></Form.Group>
                                        <Form.Group><Row>
                                            <Col>
                                                <Field name="familiarOneDni" type="text" placeholder="Dni" value={values.familiarOneDni} 
                                                    className='form-control'/>
                                            </Col>
                                            <Col>
                                                <Field name="familiarOneMail" type="text" placeholder="Email" value={values.familiarOneMail} 
                                                    className='form-control'/>
                                            </Col>
                                        </Row></Form.Group>
                                        
                                        <Card.Subtitle className="mb-2 text-muted">Familiar 2</Card.Subtitle>
                                        <Form.Group><Row>
                                            <Col>
                                                <Field name="familiarTwoName" type="text" placeholder="Nombre" value={values.familiarTwoName} 
                                                    className='form-control'/>
                                            </Col>
                                            <Col>
                                                <Field name="familiarTwoFirstSurname" type="text" placeholder="Primer Apellido" value={values.familiarTwoFirstSurname} 
                                                    className='form-control'/>
                                            </Col>
                                            <Col>
                                                <Field name="familiarTwoSecondSurname" type="text" placeholder="Segundo Apellido" value={values.familiarTwoSecondSurname} 
                                                    className='form-control'/>
                                            </Col>
                                        </Row></Form.Group>
                                        <Form.Group><Row>
                                            <Col>
                                                <Field name="familiarTwoDni" type="text" placeholder="Dni" value={values.familiarTwoDni} 
                                                    className='form-control'/>
                                            </Col>
                                            <Col>
                                                <Field name="familiarTwoMail" type="text" placeholder="Email" value={values.familiarTwoMail} 
                                                    className='form-control'/>
                                            </Col>
                                        </Row></Form.Group>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row></Form.Group>
                        <Form.Group><Row>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Datos de Cotacto</Card.Title>
                                        <Form.Group><Row>
                                            <Col>
                                                <InputGroup>
                                                    <Field name="mail" placeholder="Email" type="email" value={values.mail} 
                                                        className={`form-control ${touched.mail && errors.mail ? "is-invalid" : ""}`}
                                                    />
                                                </InputGroup>
                                            </Col>
                                        </Row></Form.Group>
                                        <Form.Group><Row>
                                            <Col>
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
                                            </Col>
                                        </Row></Form.Group>
                                        <Form.Group><Row>
                                            <Col>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Municipio</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="municipality" type="text" value={values.municipality} 
                                                        className={`form-control ${touched.municipality && errors.municipality ? "is-invalid" : ""}`}/>
                                                </InputGroup>
                                            </Col>
                                            <Col>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>C.P.</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="postalCode" type="text" value={values.postalCode} 
                                                        className={`form-control ${touched.postalCode && errors.postalCode ? "is-invalid" : ""}`}/>
                                                </InputGroup>
                                            </Col>
                                        </Row></Form.Group>
                                        <Form.Group><Row>
                                            <Col>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Dirección</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="address" type="text" value={values.address || ''} 
                                                        className={`form-control ${touched.address && errors.address ? "is-invalid" : ""}`}/>
                                                </InputGroup>
                                            </Col>
                                        </Row></Form.Group>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Datos Bancarios</Card.Title>
                                        <Form.Group><Row>
                                            <Col>
                                                <InputGroup>
                                                    <Field name="iban" placeholder="Iban" type="iban" value={values.iban} onChange={handleChange} 
                                                        className={`form-control ${touched.iban && errors.iban ? "is-invalid" : ""}`}
                                                    />
                                                </InputGroup>
                                            </Col>
                                        </Row></Form.Group>
                                        <Form.Group><Row>
                                            <Col>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                      <InputGroup.Text>Forma de pago</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="paymentType" value={values.paymentType} as="select"
                                                        className='form-control'>
                                                        {
                                                            utils.getPaymentTypes().map(pt => {
                                                                return (<option key={`pt${pt.id}`} value={pt.id}>{pt.name}</option>)
                                                            })
                                                        }
                                                    </Field>
                                                </InputGroup>
                                            </Col>
                                            <Col>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                      <InputGroup.Text>Tipo de cuota</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="feeType" value={values.feeType} as="select" 
                                                        onChange={(e) => {
                                                            setFieldValue('showSportData', e.target.value !== 'socio')
                                                            setFieldValue('feeType', e.target.value)
                                                        }}
                                                        className='form-control'>
                                                        {
                                                            values.feeTypes.map(ft => {
                                                                return (<option key={`fet${ft.id}`} value={ft.id}>{ft.name}</option>)
                                                            })
                                                        }
                                                    </Field>
                                                </InputGroup>
                                            </Col>
                                        </Row></Form.Group>
                                        <Card.Subtitle className="mb-2 text-muted">Titular de la cuenta</Card.Subtitle>
                                        <Form.Group><Row>
                                            <Col>
                                                <Field name="holderName" type="text" placeholder="Nombre" value={values.holderName} 
                                                    className={`form-control ${touched.holderName && errors.holderName ? "is-invalid" : ""}`}
                                                />
                                            </Col>
                                            <Col>
                                                <Field name="holderFirstSurname" type="text" placeholder="Primer Apellido" value={values.holderFirstSurname || ''} 
                                                    className={`form-control ${touched.holderFirstSurname && errors.holderFirstSurname ? "is-invalid" : ""}`}
                                                />
                                            </Col>
                                            <Col>
                                                <Field name="holderSecondSurname" type="text" placeholder="Segundo Appellido" value={values.holderSecondSurname || ''} 
                                                    className={`form-control ${touched.holderSecondSurname && errors.holderSecondSurname ? "is-invalid" : ""}`}
                                                />
                                            </Col>
                                        </Row></Form.Group>
                                        <Form.Group><Row>
                                            <Col>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                      <InputGroup.Text>Dni</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="dni" type="text" value={values.holderDni} 
                                                        className={`form-control ${touched.holderDni && errors.holderDni ? "is-invalid" : ""}`}
                                                    />
                                                </InputGroup>
                                            </Col>
                                        </Row></Form.Group>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row></Form.Group>
                        <Form.Group><Row style={{ display: values.showSportData ? "block" : "none" }}>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Datos Deportivos</Card.Title>
                                        <Form.Group><Row>
                                            <Col md="auto"> 
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Categoria</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="category" value={values.category} as="select" className='form-control'>
                                                        {
                                                            utils.getCategories().map(c => {
                                                                return (<option key={`cat${c.id}`} value={c.id}>{c.name}</option>)
                                                            })
                                                        }
                                                    </Field>
                                                </InputGroup>
                                            </Col>
                                            <Col md="auto">
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Categoria Dorsal</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="dorsalCategory" value={values.dorsalCategory} as="select" className='form-control'>
                                                        {
                                                            utils.getDorsalCategories().map(dc => {
                                                                return (<option key={`dc${dc.id}`} value={dc.id}>{dc.name}</option>)
                                                            })
                                                        }
                                                    </Field>                              
                                                </InputGroup>
                                            </Col>
                                            <Col md="auto">
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Dorsal</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="dorsalNumber" type="number" value={values.dorsalNumber} className='form-control'/>
                                                </InputGroup>
                                            </Col>
                                            <Col md="auto">
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
                                            </Col>
                                            <Col md="auto">
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Licencia</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="license" type="text" value={values.license} className='form-control'/>
                                                </InputGroup>
                                            </Col>
                                        </Row></Form.Group>
                                        <Form.Group><Row>
                                            <Col md="auto">
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Especialización</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="specialization" value={values.specialization} as="select" className='form-control'
                                                        onChange={e => {
                                                            setFieldValue('specialization', e.target.value);
                                                            if (e.target.value === true){
                                                                setFieldValue('groups', this.specializedGroups)
                                                            }
                                                            else {
                                                                setFieldValue('groups', this.notSpecializedGroups)
                                                            }
                                                        }}>
                                                        <option></option>
                                                        <option value={true}>Si</option>
                                                        <option value={false}>No</option>
                                                    </Field>
                                                </InputGroup>
                                            </Col>
                                            <Col md="auto">
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                      <InputGroup.Text>Grupos</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="groupId" value={values.groupId} as="select" className='form-control'
                                                        onChange={e => {
                                                            
                                                            this.fillSchedules(e.target.value, setFieldValue)
                                                            setFieldValue('groupId', e.target.value)
                                                        }}>
                                                        {
                                                            values.groups.map(group => {
                                                                return (<option key={group.id} value={group.id}>{group.name}</option>)
                                                            })
                                                        }
                                                    </Field>
                                                </InputGroup>
                                            </Col>
                                            <Col>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                      <InputGroup.Text>Horarios</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="scheduleIds" value={values.scheduleIds} as="select" multiple className='form-control'>
                                                        {
                                                            values.schedules.map(sch => {
                                                                return (<option key={sch.id} value={sch.id}>{sch.day} - {sch.startHour}:{sch.startMinute} - {sch.endHour}:{sch.endMinute}</option>)
                                                            })
                                                        }
                                                    </Field>
                                                </InputGroup>
                                            </Col>
                                        </Row></Form.Group>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row></Form.Group>
                        <Form.Group><Row>
                            <Col md="auto">
                                <InputGroup>
                                    <InputGroup.Prepend>
                                      <InputGroup.Text>Aut. Imágenes</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Field name="imageAuth" value={values.imageAuth} as="select" 
                                        className={`form-control ${touched.gender && errors.gender ? "is-invalid" : ""}`}>
                                        <option></option>
                                        <option value={true}>Si</option>
                                        <option value={false}>No</option>
                                    </Field>
                                </InputGroup>
                            </Col>
                        </Row></Form.Group>
                        <Form.Group><Row>
                            <Col md="auto">
                                <Button type="submit">Submit</Button>
                            </Col>
                        </Row></Form.Group>
                    </Form>
                )}
            </Formik>
        );
    }
}

export default CreateAthlete;
