import * as React from "react"
import { Container, Grid, Snackbar } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import { Formik } from 'formik';

import TextField from "../custom/TextField";
import Card from "../custom/Card";
import SaveButton from "../custom/SaveButton";

import { connect } from "react-redux";
import { addUser, getUser } from "../../redux/actions/users";

class ConnectedForm extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {};
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentDidMount(){
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            if (id) {
                this.props.getUser(id)
            }
        }
    }

    handleFormSubmit() {
        this.props.addUser(this.state);
    }

    render() {
        return (
            <Container fixed>
    	        <React.Suspense fallback={<div>Cargando...</div>}>

                    <Formik enableReinitialize
                        initialValues={{
                            id: this.props.user.id || 0,
                            username: this.props.user.username || '',
                            email: this.props.user.email || '',

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
                                        this.props.history.push("/users/list");
                                        window.location.reload(); 
                                    }}>
                                    <AlertTitle>Ok!</AlertTitle>
                                    <strong>{values.successMessage}</strong>
                                </Alert>
                            </Snackbar>
                            <Grid container direction="column" spacing={3}>
                                <Grid item xs>
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
                                <Grid item xs>
                                    <SaveButton type="submit" disabled={isSubmitting}/>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                    </Formik>
                </React.Suspense>
            </Container>
        );
    }
}

const mapDispatchToProps = {
    addUser,
    getUser
}

const mapStateToProps = (state: any) => {
    return { 
        user: state.user_reducer.user
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedForm);
