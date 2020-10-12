import React, { Component } from "react";
import { 
    InputGroup, Row, Col, Button, Form, Card
} from 'react-bootstrap';
import { Formik, Field } from 'formik';

class CreateGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.schedules = []
        this.trainers = []
        this.entityName2 = ""
        
        this.scheduleId = 0
        this.schedule = ''
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
                
        const headers = { 'Content-Type': 'application/json' }
        let schedulesPromise = new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_SERVER_URL + "/schedules/all",  { headers })
                .then(res => res.json())
                .then(data => {
                    this.schedules = data
                    this.setState({schedules : data})
                    resolve()
                });
        })

        let trainersPromise = new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_SERVER_URL + "/trainers/all",  { headers })
                .then(res => res.json())
                .then(data => {
                    this.trainers = data
                    this.setState({trainers : data})
                    resolve()
                });
        })

        Promise.all([schedulesPromise, trainersPromise]).then((v) => {
            if (this.props.match.params) {
                let id = this.props.match.params.id
                if (id){
                    fetch(process.env.REACT_APP_SERVER_URL + "/groups/" + id,  { headers })
                        .then(res => res.json())
                        .then(data => this.setState(data));
                }
            }
        })
    }

    handleSubmit() {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        }

        fetch(process.env.REACT_APP_SERVER_URL + "/groups", requestOptions)
            .then(res => res.json())
            .then(data => this.setState(data));
    }

    

    render() {
        return (
            <Formik enableReinitialize 
                initialValues={{
                    // Other
                    schedules : this.schedules,
                    trainers: this.trainers,
                    // Group data
                    name: this.state.name || '',
                    scheduleIds: this.state.scheduleIds || [],
                    specialization: this.state.specialization,
                    trainerId: this.state.trainerId || ''
                }}
                validate={(values) => {
                    let errors = {};

                    Object.keys(values).forEach(value => {
                        if(values[value] === ''){
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
                    this.handleSubmit()
                }}
                >
                {({ handleSubmit, handleChange, values, touched, setFieldValue, setFieldTouched, setValues, errors }) => (

    
                    <Form onSubmit={handleSubmit}>
                        <Form.Group><Row>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Datos Personales</Card.Title>
                                    <Form.Group><Row>
                                        <Col>
                                            <Form.Group>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Nombre</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="name" type="text" value={values.name} className='form-control'/>
                                                </InputGroup>
                                            </Form.Group>
                                            <Form.Group>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Especialización</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="specialization" value={values.specialization} as="select" 
                                                        className={`form-control ${touched.specialization && errors.specialization ? "is-invalid" : ""}`}>
                                                        <option></option>
                                                        <option value={true}>Si</option>
                                                        <option value={false}>No</option>
                                                    </Field>
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                  <InputGroup.Text>Horario</InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Field name="scheduleIds" value={values.scheduleIds} as="select" multiple className='form-control'>
                                                    {
                                                        values.schedules.map(sch => {
                                                            return <option key={sch.id} value={sch.id}>{sch.day} {sch.startHour}:{sch.startMinute} - {sch.endHour}:{sch.endMinute}</option>
                                                        })
                                                    }
                                                </Field>
                                            </InputGroup>
                                        </Col>
                                        <Col>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                  <InputGroup.Text>Entrenador</InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Field name="trainerId" value={values.trainerId} as="select" className='form-control'>
                                                    <option key="blank_trainer">-</option>
                                                    {
                                                        values.trainers.map(tr => {
                                                            return <option key={tr.id} value={tr.id}>{tr.name}</option>
                                                        })
                                                    }
                                                </Field>
                                            </InputGroup>
                                        </Col>
                                    </Row></Form.Group>
                                    <Form.Group><Row>
                                        <Col>
                                            <Button type="submit">Submit</Button>
                                        </Col>
                                    </Row></Form.Group>
                                </Card.Body>
                            </Card>
                        </Row></Form.Group>
                    </Form>
                )}
            </Formik>
            
        );
    }
}

export default CreateGroup;
