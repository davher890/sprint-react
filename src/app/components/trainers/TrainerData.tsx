import * as React from "react"
import { Grid, Snackbar, AppBar, Toolbar, Box } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import { Formik } from 'formik';

import TextField from "../custom/TextField";
import Card from "../custom/Card";
import SaveButton from "../custom/SaveButton";
import DeleteButton from '../custom/DeleteButton'
import ConfirmDialog from "../custom/ConfirmDialog";

import { connect } from "react-redux";
import { useParams } from 'react-router-dom';

import { addTrainer, getTrainer , removeTrainer} from "../../redux/actions/trainers";

import SportSchoolSelect from "../custom/SportSchoolSelect";

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
                this.props.getTrainer(id)
            }
        }
    }

    deleteTrainer(trainerId: number) {
        this.props.removeTrainer(trainerId)
    }

    handleFormSubmit() {
        this.props.addTrainer(this.state);
    }

    render() {
        return (
            <React.Suspense fallback={<div>Cargando...</div>}>

                <Formik enableReinitialize
                    initialValues={{
                        id: this.props.trainer.id || 0,
                        createdAt: this.props.createdAt || 0,
                        name: this.props.trainer.name || '',
                        mail: this.props.trainer.mail || '',
                        sportSchoolId: this.props.trainer.sportSchoolId || '',

                        openDeleteDialog: false,

                        errorMessage: this.props.trainer.errorMessage || '',
                        successMessage: this.props.trainer.successMessage || ''
                    }}
                    validate={(values) => {
                        let errors: any = {};

                        if (values.name === '') errors.name = true

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
                                    this.deleteTrainer(this.props.id); 
                                    setFieldValue("openDeleteDialog", false);
                                    window.open("/trainers/list", "_self");
                                }}
                                cancel={() => setFieldValue("openDeleteDialog", false)}
                            />
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
                                    window.open("/trainers/list", "_self");
                                }}>
                                <AlertTitle>Ok!</AlertTitle>
                                <strong>{values.successMessage}</strong>
                            </Alert>
                        </Snackbar>
                        <Box paddingBottom={7}>
                            <Grid container direction="column" spacing={3}>
                                <Grid item xs>
                                    <Card title="Datos del entrenador">
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <SportSchoolSelect sportSchoolId={values.sportSchoolId} error={touched.sportSchoolId && errors.sportSchoolId}
                                                    onChange={(sportSchoolId: number) => {
                                                        setFieldValue('sportSchoolId', sportSchoolId);
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs>
                                                <TextField name="name" label="Nombre" value={values.name} onChange={handleChange}
                                                    error={touched.name && errors.name} />
                                            </Grid>
                                            <Grid item xs>
                                                <TextField name="mail" label="Email" value={values.mail} onChange={handleChange}
                                                    error={touched.mail && errors.mail} />
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Box>
                        <AppBar position="fixed" style={{ bottom: 0, top: 'auto' }}>
                            <Toolbar>
                                <SaveButton type="submit" disabled={isSubmitting}/>
                                {(this.props.id) ? 
                                    <DeleteButton text='Borrar' onClick={() => setFieldValue("openDeleteDialog", true)}/>
                                    : null
                                }
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
    addTrainer,
    getTrainer,
    removeTrainer
}

const mapStateToProps = (state: any) => {
    return { 
        trainer: state.trainer_reducer.trainer
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
