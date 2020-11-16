import React, { Component } from "react";
import { 
    InputGroup, Form
} from 'react-bootstrap';
import Table from "./Table";
import { textFilter } from 'react-bootstrap-table2-filter';
import { Formik, Field } from 'formik';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import Button from '@material-ui/core/Button';

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
                        <Grid container>
                            <Card><CardContent>
                                <Grid container>
                                    <Grid item xs>
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
                                    </Grid>
                                    <Grid item xs>
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
                                    </Grid>
                                    <Grid item xs>
                                        <Fab variant="extended" size="big" color="secondary" aria-label="add" href={this.props.href} onClick={this.props.onClick}>
                                            <NavigationIcon/>{this.props.text}
                                        </Fab>
                                        <Button type="submit">Submit</Button>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs>
                                        <Table 
                                            columns={values.columns} 
                                            entityName={values.entityName}
                                            dataConversor={this.athleteDataConversor}
                                            showExcel={true}>
                                        </Table>
                                    </Grid>
                                </Grid>
                            </CardContent></Card>
                        </Grid>
                    </Form>
                )}
            </Formik>

		)
	}
}

export default GroupAthletesTable
