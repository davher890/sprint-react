import React, { Component } from "react";
import { 
    Form, InputGroup
} from 'react-bootstrap';
import { Formik, Field } from 'formik';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import Button from '@material-ui/core/Button';

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

                    <Form onSubmit={handleSubmit}>
                        <Grid container>
                            <Grid item xs>
                                <Card>
                                    <CardHeader title="Datos de la Escuale Deportiva" />
                                    <CardContent>
                                        <Grid container spacing={1}>
                                            <Grid item>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Nombre</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field key="name" id='name' name="name" type="text" value={values.name}
                                                        className={`form-control ${touched.name && errors.name ? "is-invalid" : ""}`}/>
                                                </InputGroup>
                                            </Grid>
                                            <Grid item>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Municipio</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field key="municipality" id='municipality' name="municipality" type="text" value={values.municipality}
                                                        className={`form-control ${touched.municipality && errors.municipality ? "is-invalid" : ""}`}/>
                                                </InputGroup>
                                            </Grid>
                                            <Grid item>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>Dirección</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Field key="address" id='address' name="address" type="text" value={values.address}
                                                        className={`form-control ${touched.address && errors.address ? "is-invalid" : ""}`}/>
                                                </InputGroup>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Button type="submit" variant="contained" color="primary">Submit</Button>
                        </Grid>
                    </Form>
                )}
            </Formik>
        );
    }
}

export default CreateSportSchool;
