import React, { Component } from "react";
import { 
    Form
} from 'react-bootstrap';
import Table from "./custom/Table";
import { textFilter } from 'react-bootstrap-table2-filter';
import { Formik } from 'formik';

import Grid from '@material-ui/core/Grid';
import SubmitButton from './custom/SubmitButton'

import Select from './custom/Select'

class GroupAthletesTable extends Component {

	constructor(props) {
		super(props);
		this.state = {}

		this.columns = [
            { dataField: 'id', text: 'Id', hide: true, width : 80 },
            { dataField: 'name', text : 'Nombre', filter: textFilter(), type: 'string', show: true, width : 80 }, 
            { dataField: 'birthDate', text : 'Fecha de Nacimiento', type: 'date', width : 80 }, 
            { dataField: 'gender', text : 'Genero', filter: textFilter(), type: 'string', width : 80 }, 
            { dataField: 'category', text : 'Categoria', filter: textFilter(), type: 'string', width : 80 }, 
            { dataField: 'license', text : 'Licencia', type: 'string', width : 80 }, 
            { dataField: 'dorsalNumber', text : 'Dorsal', type: 'number', width : 80 }
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
                this.schedules = data.map(sch => { 
                    return {id : sch.id, name: sch.day + " " + sch.startHour + ":" + sch.startMinute + " - " + sch.endHour + ":" + sch.endMinute}
                })
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
                {({ handleSubmit, handleChange, values, setFieldValue }) => (

                    <Form onSubmit={handleSubmit}>
                        <Grid container direction="column">
                            <Grid item xs container spacing={1}>
                                <Grid item xs>
                                    <Select name="groupId" value={values.groupId} label="Grupos"
                                        onChange={(e, value) => {
                                            this.fillSchedules(value.id, setFieldValue)
                                            setFieldValue('groupId', value.id)
                                        }} options={values.groups} 
                                    />
                                </Grid>
                                <Grid item xs>
                                    <Select name="scheduleId" value={values.scheduleId} label="Horarios" 
                                        onChange={(e, value) => { 
                                            setFieldValue('scheduleId', value.id) 
                                        }} options={values.schedules}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <SubmitButton/>
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
                        </Grid>
                    </Form>
                )}
            </Formik>
		)
	}
}

export default GroupAthletesTable
