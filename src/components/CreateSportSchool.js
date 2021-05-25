import React, { Component } from "react";
import { Formik } from 'formik';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import SubmitButton from './custom/SubmitButton'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { connect } from "react-redux";
import { addSportSchool, getSportSchool } from "../app/actions/sportSchools";

function mapDispatchToProps(dispatch) {
    return {
        addSportSchool: sportSchool => dispatch(addSportSchool(sportSchool)),
        getSportSchool: id => dispatch(getSportSchool(id))
    }
}

const mapStateToProps = state => {
    return { sport_school: state.sport_school_reducer.sport_school };
};

class ConnectedForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.id) {
            let id = this.props.id
            if (id) {
                this.props.getSportSchool(id)
            }
        }
    }

    handleFormSubmit(event) {
        this.props.addSportSchool(this.state);
    }

    render() {
        return (

            <Formik enableReinitialize
                initialValues={{
                    id: this.props.sport_school.id || 0,
                    name: this.props.sport_school.name || '',
                    municipality: this.props.sport_school.municipality || '',
                    address: this.props.sport_school.address || ''
                }}
                validate={(values) => {
                    let errors = {};

                    Object.keys(values).forEach(value => {
                        if (values[value] === '') {
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
                                                    className={`${touched.name && errors.name ? "is-invalid" : ""}`} />
                                            </Grid>
                                            <Grid item>
                                                <TextField key="municipality" id='municipality' name="municipality" label="Municipio" value={values.municipality} onChange={handleChange}
                                                    className={`${touched.municipality && errors.municipality ? "is-invalid" : ""}`} />
                                            </Grid>
                                            <Grid item>
                                                <TextField key="address" id='address' name="address" label="Dirección" value={values.address} onChange={handleChange}
                                                    className={`${touched.address && errors.address ? "is-invalid" : ""}`} />
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <SubmitButton />
                        </Grid>
                    </form>
                )}
            </Formik>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedForm);
