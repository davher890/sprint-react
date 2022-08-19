import * as React from "react"

import { Formik } from 'formik';

import { Grid, Snackbar, AppBar, Toolbar, Box } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import TextField from '../custom/TextField';
import Card from '../custom/Card';
import SaveButton from '../custom/SaveButton'

import { connect } from "react-redux";
import { useParams } from 'react-router-dom';

import { addSportSchool, getSportSchool, removeSportSchool } from "../../redux/actions/sportSchools";
import DeleteButton from "../custom/DeleteButton";
import ConfirmDialog from "../custom/ConfirmDialog";

import { isManager, isAdmin } from "../../services/LoginService";

class ConnectedForm extends React.Component<any, any> {
    constructor(props: any) {
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

    handleFormSubmit() {
        this.props.addSportSchool(this.state);
    }

    deleteSportSchool(groupId: number) {
        this.props.removeSportSchool(groupId)
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
                        
                        openDeleteDialog: false,
                        
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
                        <ConfirmDialog open={values.openDeleteDialog} 
                            confirm={() => {
                                this.deleteSportSchool(this.props.id); 
                                setFieldValue("openDeleteDialog", false);
                                window.open("/sport_schools/list", "_self");
                            }}
                            cancel={() => setFieldValue("openDeleteDialog", false)}
                        />
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
                                    window.open("/sport_schools/list", "_self");
                                }}>
                                <AlertTitle>Ok!</AlertTitle>
                                <strong>{values.successMessage}</strong>
                            </Alert>
                        </Snackbar>
                        <Box paddingBottom={7}>
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
                                </Grid>
                            </Grid>
                        </Box>
                        { (isAdmin() || isManager()) &&
                            <AppBar position="fixed" style={{ bottom: 0, top: 'auto' }}>
                                <Toolbar>
                                    <SaveButton type="submit" text='Guardar' disabled={isSubmitting} />
                                    {(this.props.id) ? 
                                        <DeleteButton text='Borrar' onClick={() => setFieldValue("openDeleteDialog", true)}/>
                                        : null
                                    }
                                </Toolbar>
                            </AppBar>
                        }
                    </form>
                )}
                </Formik>
            </React.Suspense>
        );
    }
}

const mapDispatchToProps = {
    addSportSchool,
    getSportSchool,
    removeSportSchool
}

const mapStateToProps = (state: any) => {
    return { 
        sport_school: state.sport_school_reducer.sport_school
    };
};

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ConnectedForm);

const WithRouterWrapper = () => {
    let { id } = useParams()

    return (
        <ConnectedComponent id={id}></ConnectedComponent>
    )
}
export default WithRouterWrapper