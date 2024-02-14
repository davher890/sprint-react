import * as React from "react"
import { Grid, Snackbar, AppBar, Toolbar, Box } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import { Formik } from 'formik';

import TextField from "../../components/custom/TextField";
import Card from "../../components/custom/Card";
import SaveButton from "../../components/custom/SaveButton";
import DeleteButton from '../../components/custom/DeleteButton'
import ConfirmDialog from "../../components/custom/ConfirmDialog";
import SportSchoolSelect from "../../components/custom/SportSchoolSelect";
import Spinner from '../../components/custom/Spinner'

import { connect } from "react-redux";
import { useParams } from 'react-router-dom';

import { addTrainer, getTrainer , removeTrainer} from "../../redux/actions/trainers";

import { isManager, isAdmin } from "../../services/LoginService";

const CreateTrainer: React.FC<any> = (props) => {
    
    const [trainer, setTrainer] = React.useState<any>({})

    React.useEffect(() => {
        if (props.id) {
            let id = props.id
            if (id) {
                props.getTrainer(id)
            }
        }
    })

    const handleSubmit = (values: any) => {
        props.addTrainer(values);
    }

    const deleteTrainer = ((trainerId: number) => {
        props.removeTrainer(trainerId)
    })

    return (
        <React.Suspense fallback={<div>Cargando...</div>}>

            <Formik enableReinitialize
                initialValues={{
                    id: props.trainer.id || 0,
                    createdAt: props.trainer.createdAt || 0,
                    name: props.trainer.name || '',
                    mail: props.trainer.mail || '',
                    sportSchoolId: props.trainer.sportSchoolId || '',

                    openDeleteDialog: false,

                    errorMessage: props.trainer.errorMessage || '',
                    successMessage: props.trainer.successMessage || ''
                }}
                validate={(values) => {
                    let errors: any = {};

                    if (values.name === '') errors.name = true
                    if (values.sportSchoolId === '') errors.sportSchoolId = true

                    //check if my values have errors
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTrainer(values)
                    setSubmitting(false);
                    handleSubmit(values)
                }}
            >
            {({ handleSubmit, handleChange, values, touched, setFieldValue, errors, isSubmitting }) => (

                <form onSubmit={handleSubmit}>
                    <ConfirmDialog open={values.openDeleteDialog} 
                            confirm={() => {
                                deleteTrainer(props.id); 
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
                    { (isAdmin() || isManager()) &&
                        <AppBar position="fixed" style={{ bottom: 0, top: 'auto' }}>
                            <Toolbar>
                                { props.loading ? <Spinner/> : <>
                                    <SaveButton type="submit" disabled={isSubmitting}/>
                                    { props.id ? 
                                        <DeleteButton text='Borrar' onClick={() => setFieldValue("openDeleteDialog", true)}/>
                                        : null
                                    }
                                </>
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

const mapDispatchToProps = {
    addTrainer,
    getTrainer,
    removeTrainer
}

const mapStateToProps = (state: any) => {
    return { 
        trainer: state.trainer_reducer.trainer,
        loading: state.api_reducer.loading
    };
};

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(CreateTrainer);

const WithRouterWrapper = () => {
    let { id } = useParams()

    return (
        <ConnectedComponent id={id}></ConnectedComponent>
    )
}
export default WithRouterWrapper
