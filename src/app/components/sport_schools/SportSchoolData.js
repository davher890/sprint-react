import React, { Component, Suspense } from "react";

import { Formik } from 'formik';

import { Grid, Container } from '@material-ui/core';

import MemoTextField from '../custom/TextField';
import Card from '../custom/Card';
import SubmitButton from '../custom/SubmitButton'

import { connect } from "react-redux";
import { addSportSchool, getSportSchool } from "../../redux/actions/sportSchools";

class ConnectedForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
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
            <Container fixed>
    	        <Suspense fallback={<div>Cargando...</div>}>

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
                                    errors[value] = true;
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
                            <Grid container direction="column" spacing={3}>
                                <Grid item xs>
                                    <Card title="Datos de la Escuela deportiva">
                                        <Grid container spacing={2}>
                                            <Grid item xs>
                                                <MemoTextField name="name" label="Nombre" value={values.name} onChange={handleChange}
                                                    error={touched.name && errors.name} />
                                            </Grid>
                                            <Grid item xs>
                                                <MemoTextField name="municipality" label="Municipio" value={values.municipality} onChange={handleChange}
                                                    error={touched.municipality && errors.municipality} />
                                            </Grid>
                                            <Grid item xs>
                                                <MemoTextField name="address" label="Dirección" value={values.address} onChange={handleChange}
                                                    error={touched.address && errors.address} />
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                                <Grid item xs>
                                    <SubmitButton />
                                </Grid>
                            </Grid>
                        </form>
                    )}
                    </Formik>
                </Suspense>
            </Container>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addSportSchool: sportSchool => dispatch(addSportSchool(sportSchool)),
        getSportSchool: id => dispatch(getSportSchool(id))
    }
}

const mapStateToProps = state => {
    return { 
        sport_school: state.sport_school_reducer.sport_school
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedForm);
