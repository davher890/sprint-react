import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
    Form
} from 'react-bootstrap';
import { Formik } from 'formik';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import SubmitButton from './buttons/SubmitButton'

class GroupAttendance extends Component {

	constructor(props) {
		super(props);
		this.state = {}
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

        fetch(process.env.REACT_APP_SERVER_URL + "/groups/" + this.state.groupId + "/attendance")
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
                    groupId: this.state.groupId || ''
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
									<TextField select fullWidth name="groupId" value={values.groupId} label="Grupos" onChange={handleChange}>
                                        {
                                            values.groups.map(group => {
                                                return (<MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>)
                                            })
                                        }
                                    </TextField>
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
