import * as React from "react"

import { Formik } from 'formik';

import { Grid, Snackbar, AppBar, Toolbar, Box, Button } from "@material-ui/core";
import { Alert, AlertTitle } from '@material-ui/lab';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

import TextField from "../custom/TextField";
import Card from "../custom/Card";
import SaveButton from "../custom/SaveButton";

import { addUser, getUser, changeUserPassword } from "../../redux/actions/users";
import { getAllSportSchools } from "../../redux/actions/sportSchools";

import { connect } from "react-redux";
import { useParams } from 'react-router-dom';

import { isAdmin } from "../../services/LoginService";
import SportSchoolMultiSelect from "../custom/SportSchoolMultiSelect";

class ConnectedForm extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {};

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentDidMount(){
        if (this.props.id) {
            let id = this.props.id
            if (id) {
                this.props.getUser(id)
            }
        }
        this.props.getAllSportSchools()
    }

    handleFormSubmit() {
        this.props.addUser(this.state);
    }

    render() {
        return (
            <React.Suspense fallback={<div>Cargando...</div>}>

                <Formik enableReinitialize
                    initialValues={{
                        id: this.props.user.id || 0,
                        username: this.props.user.username || '',
                        email: this.props.user.email || '',
                        password: this.props.user.password || '',
                        sportSchoolIds: this.props.user.sportSchoolIds || [],

                        openChangePassword: false,
                        oldPassword: this.props.user.oldPassword,
                        newPassword: this.props.user.newPassword,

                        errorMessage: this.props.user.errorMessage || '',
                        successMessage: this.props.user.successMessage || ''
                    }}
                    validate={(values) => {
                        let errors: any = {};

                        if (values.username === '') errors.username = true

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
                            <Alert severity="error" onClose={() => { 
                                    setFieldValue("errorMessage", "");
                                }}>
                                <AlertTitle>Error</AlertTitle>
                                <strong>{values.errorMessage}</strong>
                            </Alert>
                        </Snackbar>
                        <Snackbar open={values.successMessage !== undefined && values.successMessage !== ''}
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000}>
                            <Alert severity="success" onClose={() => { 
                                    setFieldValue("successMessage", "")
                                    window.open("/users/list", "_self");
                                }}>
                                <AlertTitle>Ok!</AlertTitle>
                                <strong>{values.successMessage}</strong>
                            </Alert>
                        </Snackbar>
                        <Dialog fullWidth={true} maxWidth="xl" open={values.openChangePassword} aria-labelledby="form-dialog-title"
                            onClose={() => {
                                setFieldValue('openChangePassword', false)
                            }}
                        >
                            <DialogTitle id="form-dialog-title">Cambiar contraseña</DialogTitle>
                            <DialogContent>
                                <Grid container direction="column">
                                    <Grid container item>
                                        <Grid item>
                                            <TextField name="oldPassword" label="Contraseña antigua" value={values.oldPassword} onChange={handleChange}/>
                                        </Grid>
                                    </Grid>
                                    <Grid container item>
                                        <Grid item>
                                            <TextField name="newPassword" label="Nueva contraseña" value={values.newPassword} onChange={handleChange}/>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button 
                                    onClick={(a: any) => {
                                        this.props.changeUserPassword(values);
                                        // setFieldValue('openChangePassword', false)
                                    }}
                                >Guardar</Button>
                                <Button 
                                    onClick={(a: any) => { setFieldValue('openChangePassword', false) }}
                                >Cerrar</Button>
                            </DialogActions>
                        </Dialog>
                        <Box paddingBottom={7}>
                            <Grid container direction="row" spacing={3}>
                                <Grid item xs={6}>
                                    <Card title="Datos del usuario">
                                        <Grid container spacing={2}>
                                            <Grid item xs>
                                                <TextField name="username" label="Nombre" value={values.username} onChange={handleChange}
                                                    error={touched.username && errors.username} />
                                            </Grid>
                                            <Grid item xs>
                                                <TextField name="email" label="Email" value={values.email} onChange={handleChange}
                                                    error={touched.email && errors.email} />
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                                { isAdmin() ?
                                    <Grid item xs={6}>
                                        <SportSchoolMultiSelect 
                                            sportSchools={this.props.sportSchools}
                                            sportSchoolIds={values.sportSchoolIds}
                                            onChange={(sportSchoolIds: number[]) => {
                                                setFieldValue('sportSchoolIds', sportSchoolIds)
                                            }}
                                        />
                                    </Grid>
                                    : null }
                            </Grid>
                        </Box>
                        <AppBar position="fixed" style={{ bottom: 0, top: 'auto' }}>
                            <Toolbar>
                                <SaveButton type="submit" text='Guardar' disabled={isSubmitting} />
                            </Toolbar>
                            <Toolbar>
                                <SaveButton onClick={() => {
                                    setFieldValue("openChangePassword", true)
                                }} >Cambiar contraseña</SaveButton>
                            </Toolbar>
                        </AppBar>
                    </form>
                )}
                </Formik>
            </React.Suspense>
        );
    }
}

const mapDispatchToProps = {
    addUser,
    getUser,
    getAllSportSchools,
    changeUserPassword
}

const mapStateToProps = (state: any) => {
    return { 
        user: state.user_reducer.user,
        sportSchools: state.sport_school_reducer.sport_schools
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
