import React, { Component } from "react";
import { 
    InputGroup, Row, Col, Button, Form, Card
} from 'react-bootstrap';
import Table from "./Table";
import { textFilter } from 'react-bootstrap-table2-filter';
import { Formik, Field } from 'formik';
import SprintButton from './buttons/SprintButton'

class GroupAthletesTable extends Component {

	constructor(props) {
		super(props);
		this.state = {}

		this.columns = [
            { dataField: 'name', text : 'Nombre', filter: textFilter(), type: 'string' }, 
            { dataField: 'birthDate', text : 'Fecha de Nacimiento', type: 'date' }, 
            { dataField: 'gender', text : 'Genero', filter: textFilter(), type: 'string' }, 
            { dataField: 'category', text : 'Categoria', filter: textFilter(), type: 'string' }, 
            { dataField: 'license', text : 'Licencia', type: 'string'}, 
            { dataField: 'dorsalNumber', text : 'Dorsal', type: 'number'}
        ]

        this.handleSubmitQuery = this.handleSubmitQuery.bind(this);
	}

	componentDidMount(prevProps, nextProps){
        if(prevProps !== this.props){
    	    const headers = { 'Content-Type': 'application/json' }
    		fetch(process.env.REACT_APP_SERVER_URL + "/groups/all",  { headers })
                .then(res => res.json())
                .then(data => {
                    data.push({id:'', name:''})
                    this.setState({ groups : data})
                });
        }
	}

	handleSubmitQuery(values) {

        if (values.scheduleId){
            this.setState({
                groupId: values.groupId,
                schedules: values.schedules,
                scheduleId: values.scheduleId,
                entityName: "groups/" + values.groupId + "/schedules/" + values.scheduleId + "/athletes"
            });
        }
        else {
            this.setState({
                groupId: values.groupId,
                schedules: values.schedules,
                entityName: "groups/" + values.groupId + "/athletes"
            });
        }
    }

    athleteDataConversor(d) {
        return {
            id : d.id,
            name : d.name || '', 
            birthDate: new Intl.DateTimeFormat('sq-AL').format(new Date(d.birthDate)), 
            gender: d.gender === 'male' ? 'Masculino' : 'Femenino',
            category : d.category,
            license : d.license,
            dorsalNumber : d.dorsalNumber
        }
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
                	groups: this.state.groups || [],
                	groupId: this.state.groupId || '',
                    scheduleId: this.state.scheduleId || '', 
                    schedules: this.state.schedules || [],
                    columns: this.columns,
                    entityName: this.state.entityName || ''
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false);
                    this.handleSubmitQuery(values)
                }}
                >
                {({ handleSubmit, values, setFieldValue }) => (

                    <Form onSubmit={handleSubmit}>
                        <Form.Group><Row>
                            <Card>
                                <Card.Body>
                                    <Form.Group><Row>
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
                                                columns={values.columns} 
                                                entityName={values.entityName}
                                                dataConversor={this.athleteDataConversor}
                                                showExcel={true}>
                                            </Table>
                                        </Col>
                                    </Row></Form.Group>
                                </Card.Body>
                            </Card>
                        </Row></Form.Group>
                    </Form>
                )}
            </Formik>

		)
	}
}

export default GroupAthletesTable
