import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
    Form
} from 'react-bootstrap';
import { Formik } from 'formik';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import SubmitButton from './custom/SubmitButton'
import Select from './custom/Select'

import utils from "../functions/Utils.js"

class GroupAttendance extends Component {

	constructor(props) {
		super(props)

        let d = new Date()
        let previousMonth = (d.getMonth()-1 + 12) % 12
        let nextMonth = (d.getMonth()+1 + 12) % 12
        console.log(previousMonth, nextMonth)
		this.state = {
            months : [
                { id : previousMonth, name: utils.getMonth(previousMonth)},
                { id : d.getMonth(), name: utils.getMonth(d.getMonth())},
                { id : nextMonth, name: utils.getMonth(nextMonth)}
            ],
            month: utils.getMonth(d.getMonth),
        }
	}

	componentDidMount(){
	    const headers = { 'Content-Type': 'application/json' }
		fetch(process.env.REACT_APP_SERVER_URL + "/groups/all",  { headers })
            .then(res => res.json())
            .then(data => {
                data.push({id:0, name:'Todos'})
                this.setState({ groups : data})
            });
	}

	handleFormSubmit() {

        fetch(process.env.REACT_APP_SERVER_URL + "/groups/" + this.state.groupId + "/attendance?month=" + this.state.month)
            .then(response => {
				response.blob().then(blob => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
					a.href = url;
					a.download = 'table.xlsx';
					a.click();
				})
			})
			.catch(function() {
		        console.log("error");
		    });
    }

	render() {
		return (
			<Formik enableReinitialize
                initialValues={{
                    groups : this.state.groups || [],
                    groupId : this.state.groupId || '',
                    month : this.state.month,
                    months : this.state.months
                }}
                validate={(values) => {
                	let errors = {};
                	return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    this.setState(values)
                    setSubmitting(false);
                    this.handleFormSubmit()
                }}
                >
            	{({ handleSubmit, handleChange, values, touched, setFieldValue, setFieldTouched, setValues, errors }) => (
            		<Form onSubmit={handleSubmit}>
						<Grid container>
	            			<Grid item xs>
                                <Card><CardContent>
                                    <Select name="month" value={values.month} label="Mes" 
                                        options={values.months} onChange={(e, value) => setFieldValue('month', value.id)} />
                                </CardContent></Card>
                            </Grid>
                            <Grid item xs>
	            				<Card><CardContent>
									<Select name="groupId" value={values.groupId} label="Grupos" 
                                        options={values.groups} onChange={(e, value) => setFieldValue('groupId', value.id)}/>
                            	</CardContent></Card>
                            </Grid>
                            <Grid container>
	                            <SubmitButton/>
	                        </Grid>
                        </Grid>
		           	</Form>
                )}
            </Formik>
		)
	}
}
export default GroupAttendance;
