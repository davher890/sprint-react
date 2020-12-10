import React, { Component } from "react";
import { Formik } from 'formik';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import SubmitButton from './custom/SubmitButton'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

class CreateSportSchool extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentDidMount(){
        if (this.props.id) {
            let id = this.props.id
            if (id){
                const headers = { 'Content-Type': 'application/json' }
                fetch(process.env.REACT_APP_SERVER_URL + "/sport_schools/" + id,  { headers })
                    .then(res => res.json())
                    .then(data => this.setState(data));
            }
        }
    }

    handleFormSubmit(event) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        }

        fetch(process.env.REACT_APP_SERVER_URL + "/sport_schools", requestOptions)
            .then(res => res.json())
            .then(data => this.setState(data));
    }

    render() {
        return (

            <Formik enableReinitialize 
                initialValues={{
                    name: this.state.name || '',
                    municipality: this.state.municipality || '',
                    address: this.state.address || '',
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
                    this.setState(values)
                    setSubmitting(false);
                    this.handleFormSubmit()
                }}
            >
                {({ handleSubmit, handleChange, values, touched, setFieldValue, setFieldTouched, errors }) => (

                    <form onSubmit={handleSubmit}>
                        <Grid container>
                            <Grid item xs>
                                <Card>
                                    <CardHeader title="Datos de la Escuela deportiva" />
                                    <CardContent>
                                        <Grid container spacing={1}>
                                            <Grid item>
                                                <TextField key="name" id='name' name="name" label="Nombre" value={values.name} onChange={handleChange}
                                                    className={`${touched.name && errors.name ? "is-invalid" : ""}`}/>
                                            </Grid>
                                            <Grid item>
                                                <TextField key="municipality" id='municipality' name="municipality" label="Municipio" value={values.municipality} onChange={handleChange}
                                                    className={`${touched.municipality && errors.municipality ? "is-invalid" : ""}`}/>
                                            </Grid>
                                            <Grid item>
                                                <TextField key="address" id='address' name="address" label="Dirección" value={values.address} onChange={handleChange}
                                                    className={`${touched.address && errors.address ? "is-invalid" : ""}`}/>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <SubmitButton/>
                        </Grid>
                    </form>
                )}
            </Formik>
        );
    }
}

export default CreateSportSchool;
