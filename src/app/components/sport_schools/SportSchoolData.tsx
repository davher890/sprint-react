import * as React from "react"

import { Formik } from 'formik';

import { Grid, Snackbar } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import TextField from '../custom/TextField';
import Card from '../custom/Card';
import SaveButton from '../custom/SaveButton'

import { connect } from "react-redux";
import { addSportSchool, getSportSchool } from "../../redux/actions/sportSchools";

class ConnectedForm extends React.Component<any, any> {
    constructor(props: any) {
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

    handleFormSubmit() {
        this.props.addSportSchool(this.state);
    }

    render() {
        return (
            <React.Suspense fallback={<div>Cargando...</div>}>

                <Formik enableReinitialize
                    initialValues={{
                        id: this.props.sport_school.id || 0,
                        name: this.props.sport_school.name || '',
                        municipality: this.props.sport_school.municipality || '',
                        address: this.props.sport_school.address || '',
                        errorMessage: this.props.sport_school.errorMessage || '',
                        successMessage: this.props.sport_school.successMessage || ''
                    }}
                    validate={(values) => {
                        let errors: any = {};

                        if (values.name === '') errors.name = true
                        if (values.municipality === '') errors.municipality = true
                        if (values.address === '') errors.address = true

                        //check if my values have errors
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        this.setState(values)
                        setSubmitting(false);
                        this.handleFormSubmit()
                    }}
                >
                {({ handleSubmit, handleChange, values, touched, setFieldValue, errors, isSubmitting }) => (

                    <form onSubmit={handleSubmit}>
                        <Snackbar open={values.errorMessage !== undefined && values.errorMessage !== ''}
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000}>
                            <Alert severity="error" onClose={() => { setFieldValue("errorMessage", "") }}>
                                <AlertTitle>Error</AlertTitle>
                                <strong>{values.errorMessage}</strong>
                            </Alert>
                        </Snackbar>
                        <Snackbar open={values.successMessage !== undefined && values.successMessage !== ''}
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000}>
                            <Alert severity="success" onClose={() => { 
                                    setFieldValue("successMessage", "");
                                    this.props.history.push("/sport_schools/list");
                                    window.location.reload();
                                }}>
                                <AlertTitle>Ok!</AlertTitle>
                                <strong>{values.successMessage}</strong>
                            </Alert>
                        </Snackbar>
                        <Grid container direction="column" spacing={3}>
                            <Grid item xs>
                                <Card title="Datos de la Escuela deportiva">
                                    <Grid container spacing={2}>
                                        <Grid item xs>
                                            <TextField name="name" label="Nombre" value={values.name} onChange={handleChange}
                                                error={touched.name && errors.name} />
                                        </Grid>
                                        <Grid item xs>
                                            <TextField name="municipality" label="Municipio" value={values.municipality} onChange={handleChange}
                                                error={touched.municipality && errors.municipality} />
                                        </Grid>
                                        <Grid item xs>
                                            <TextField name="address" label="Dirección" value={values.address} onChange={handleChange}
                                                error={touched.address && errors.address} />
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                            <Grid item xs>
                                <SaveButton type="submit" disabled={isSubmitting}/>
                            </Grid>
                        </Grid>
                    </form>
                )}
                </Formik>
            </React.Suspense>
        );
    }
}

const mapDispatchToProps = {
    addSportSchool,
    getSportSchool
}

const mapStateToProps = (state: any) => {
    return { 
        sport_school: state.sport_school_reducer.sport_school
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedForm);
