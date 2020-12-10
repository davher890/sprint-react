import React, { Component } from "react";
import { 
    Form
} from 'react-bootstrap';
import Table from "./custom/Table";
import { textFilter } from 'react-bootstrap-table2-filter';
import { Formik } from 'formik';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import SubmitButton from './custom/SubmitButton'

class GroupAthletesTable extends Component {

	constructor(props) {
		super(props);
		this.state = {}

		this.columns = [
            { dataField: 'name', text : 'Nombre', filter: textFilter(), type: 'string', show: true  }, 
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
                {({ handleSubmit, handleChange, values, setFieldValue }) => (

                    <Form onSubmit={handleSubmit}>
                        <Grid container>
                            <Card><CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={2}>
                                        <TextField select fullWidth name="groupId" value={values.groupId} label="Grupos"
                                            onChange={e => {
                                                
                                                this.fillSchedules(e.target.value, setFieldValue)
                                                setFieldValue('groupId', e.target.value)
                                            }}>
                                            {
                                                values.groups.map(group => {
                                                    return (<MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>)
                                                })
                                            }
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TextField select fullWidth name="scheduleId" value={values.scheduleId} label="Horarios" onChange={handleChange}>
                                            <MenuItem></MenuItem>
                                            {
                                                values.schedules.map(sch => {
                                                    return <MenuItem key={sch.id} value={sch.id}>{sch.day} {sch.startHour}:{sch.startMinute} - {sch.endHour}:{sch.endMinute}</MenuItem>
                                                })
                                            }
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={2}>
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
                            </CardContent></Card>
                        </Grid>
                    </Form>
                )}
            </Formik>
		)
	}
}

export default GroupAthletesTable
