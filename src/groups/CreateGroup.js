import React, { Component } from "react";
import { 
    InputGroup, Container, Row, Col, Button, Form, Card
} from 'react-bootstrap';
import Table from "../utils/Table";
import { textFilter } from 'react-bootstrap-table2-filter';
import { Formik, Field } from 'formik';

class CreateGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	group : {},
            schedules : [],
            trainers : [],
            entityName2 : "",
            columns : [
                { dataField: 'name', text: 'Nombre', filter: textFilter() }
            ],
            columnsAthlete : [
                { dataField: 'name', text : 'Nombre', filter: textFilter() }, 
                { dataField: 'birthDate', text : 'Fecha de Nacimiento' }, 
                { dataField: 'gender', text : 'Genero', filter: textFilter() }, 
                { dataField: 'category', text : 'Categoria', filter: textFilter() }, 
                { dataField: 'license', text : 'Licencia' }, 
                { dataField: 'dorsal', text : 'Dorsal'}
            ],
            scheduleId : 0,
            schedule : ''
        };
        this.handleGroupInputChange = this.handleGroupInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitQuery = this.handleSubmitQuery.bind(this);
        this.handleMultipleSelectChange = this.handleMultipleSelectChange.bind(this);
    }

    componentDidMount(){
                
        const headers = { 'Content-Type': 'application/json' }
        let schedulesPromise = new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_SERVER_URL + "/schedules/all",  { headers })
                .then(res => res.json())
                .then(data => {
                    this.setState({ schedules : data})
                    resolve()
                });
        })

        let trainersPromise = new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_SERVER_URL + "/trainers/all",  { headers })
                .then(res => res.json())
                .then(data => {
                    this.setState({ trainers : data})
                    resolve()
                });
        })

        Promise.all([schedulesPromise, trainersPromise]).then((v) => {
            if (this.props.match.params) {
                let id = this.props.match.params.id
                if (id){
                    fetch(process.env.REACT_APP_SERVER_URL + "/groups/" + id,  { headers })
                        .then(res => res.json())
                        .then(data => this.setState({ group : data}));
                }
            }
        })
    }

    handleSubmit(event) {

        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.group)
        }

        fetch(process.env.REACT_APP_SERVER_URL + "/groups", requestOptions)
            .then(response => console.log(response))
            .then(data => this.setState(data));
    }

    handleGroupInputChange(event) {

        event.preventDefault();

        const target = event.target;
        const value = target.value;
        const name = target.name;

        let group = this.state.group
        group[name] = value

        this.setState({
            group : group
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
        let group = this.state.group
        group.scheduleIds = value

        this.setState({
            group : group
        });
    }

    handleSubmitQuery(event) {

        event.preventDefault()

        this.setState({
            entityName2 : "groups/" + this.state.group.id + "/schedules/" + this.state.scheduleId + "/athletes"
        });
    }

    athleteDataConversor(d) {
        return {
            id : d.id,
            name : d.name, 
            birthDate: new Intl.DateTimeFormat('sq-AL').format(new Date(d.birthDate)), 
            gender: d.gender === 'male' ? 'Masculino' : 'Femenino',
            category : d.category,
            license : d.license,
            dorsal : d.dorsalNumber
        }
    }

    render() {
        return (

            <Container>
                <Row>
                    <Formik enableReinitialize 
                        initialValues={{
                            name: this.state.group.name || '',
                            scheduleIds: this.state.group.scheduleIds || [],
                            specialization: this.state.group.specialization || '',
                            trainerId: this.state.group.trainerId || ''
                        }}
                        validate={(values) => {
                            let errors = {};

                            Object.keys(values).forEach(value => {
                                if(values[value] === ''){
                                    errors[value] = 'Valid ' + value + ' Required'; 
                                }
                            })

                            //check if my values have errors
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            alert("Form is validated! Submitting the form...");
                            setSubmitting(false);
                            this.handleSubmit()
                        }}
                        >
                        {({ handleSubmit, handleChange, values, touched, setFieldValue, setFieldTouched, setValues, errors }) => (

            
                            <Form onSubmit={this.handleSubmit}>
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
                                                </Form.Group><Form.Group>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Especialización</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field name="specialization" value={values.specialization} as="select" className='form-control'
                                                        onChange={e => {
                                                            setFieldValue('specialization', e.target.value);
                                                            this.fillGroups(e.target.value)
                                                        }}>
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
                                                            this.state.schedules.map(sch => {
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
                                                            this.state.trainers.map(tr => {
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
                            </Form>
                        )}
                    </Formik>
                </Row>
                <Row>
                    <Formik enableReinitialize 
                        initialValues={{
                            scheduleId: this.state.scheduleId || '', 
                            schedules: this.state.schedules || [],

                        }}
                        validate={(values) => {
                            let errors = {};

                            Object.keys(values).forEach(value => {
                                if(values[value] === ''){
                                    errors[value] = 'Valid ' + value + ' Required'; 
                                }
                            })

                            //check if my values have errors
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            alert("Form is validated! Submitting the form...");
                            setSubmitting(false);
                            this.handleSubmit()
                        }}
                        >
                        {({ handleSubmit, handleChange, values, touched, setFieldValue, setFieldTouched, setValues, errors }) => (

                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group><Row>
                                    <Col>
                                        <Card>
                                            <Card.Body>
                                                <Form.Group><Row>
                                                    <Col>
                                                        <InputGroup>
                                                            <InputGroup.Prepend>
                                                              <InputGroup.Text>Horarios</InputGroup.Text>
                                                            </InputGroup.Prepend>
                                                            <Field name="scheduleId" value={values.scheduleId} as="select" className='form-control'>
                                                                <option></option>
                                                                {
                                                                    values.schedules.map(sch => {
                                                                        return <option key={sch.id} value={sch.id}>{sch.day} {sch.startHour}:{sch.startMinute} - {sch.endHour}:{sch.endMinute}</option>
                                                                    })
                                                                }
                                                            </Field>
                                                        </InputGroup>
                                                    </Col>
                                                    <Col>
                                                        <Button type="submit">Submit</Button>
                                                    </Col>
                                                </Row></Form.Group>
                                                <Form.Group><Row>
                                                    <Col>
                                                        <Table 
                                                            columns={this.state.columnsAthlete} 
                                                            entityName={this.state.entityName2}
                                                            dataConversor={this.athleteDataConversor}>
                                                        </Table>
                                                    </Col>
                                                </Row></Form.Group>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row></Form.Group>
                            </Form>
                        )}
                    </Formik>
                </Row>
        </Container>
            
        );
    }
}

export default CreateGroup;
