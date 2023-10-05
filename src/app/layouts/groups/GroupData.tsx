import * as React from "react"

import { Formik } from 'formik';

import { Grid, Snackbar, Checkbox, AppBar, Toolbar, Box } from "@material-ui/core";
import { Alert, AlertTitle } from '@material-ui/lab';

import TextField from '../../components/custom/TextField';
import SaveButton from '../../components/custom/SaveButton'
import DeleteButton from '../../components/custom/DeleteButton'
import Card from '../../components/custom/Card'
import ScheduleSelect from '../../components/custom/ScheduleSelect'
import Spinner from '../../components/custom/Spinner'

import { connect } from "react-redux";
import { useParams } from 'react-router-dom';

import { addGroup, getGroup, removeGroup } from "../../redux/actions/groups";
import { getSchedules } from "../../redux/actions/schedules";
import TrainerSelect from "../../components/custom/TrainerSelect";
import SportSchoolSelect from "../../components/custom/SportSchoolSelect";
import ConfirmDialog from "../../components/custom/ConfirmDialog";

import { isManager, isAdmin } from "../../services/LoginService";

const CreateGroup: React.FC<any> = (props) => {

    const [group, setGroup] = React.useState<any>({})

    React.useEffect(() => {
        if (props.id) {
            let id = props.id
            if (id) {
                props.getGroup(id)
            }
        }
        props.getSchedules()
    }, [])

    const handleSubmit = ((values: any) => {
        props.addGroup(values)
    })

    const deleteGroup = ((groupId: number) => {
        props.removeGroup(groupId)
    })

    return (
        <React.Suspense fallback={<div>Cargando...</div>}>

            <Formik enableReinitialize 
                initialValues={{
                    // Group data
                    id: props.group.id || 0,
                    createdAt: props.group.createdAt || 0,
                    name: props.group.name || '',
                    scheduleIds: props.group.scheduleIds || [],
                    specialization: props.group.specialization || false,
                    trainerId: props.group.trainerId || '',
                    sportSchoolId: props.group.sportSchoolId || '',

                    openDeleteDialog: false,

                    errorMessage: props.group.errorMessage || '',
                    successMessage: props.group.successMessage || ''
                }}
                validate={(values) => {
                    let errors: any = {};

                    if (values.name === '') errors.name = true
                    if (values.scheduleIds === '') errors.scheduleIds = true
                    if (!values.trainerId) errors.trainerId = true
                    if (!values.sportSchoolId) errors.sportSchoolId = true
                    //check if my values have errors
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setGroup(values)
                    setSubmitting(false);
                    handleSubmit(values)
                }}
                >
                {({ handleSubmit, handleChange, values, touched, setFieldValue, errors, isSubmitting }) => (
    
                    <form onSubmit={handleSubmit}>
                        <ConfirmDialog open={values.openDeleteDialog} 
                            confirm={() => {
                                deleteGroup(props.id); 
                                setFieldValue("openDeleteDialog", false);
                                window.open("/groups/list", "_self");
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
                                    window.open("/groups/list", "_self");
                                }}>
                                <AlertTitle>Ok!</AlertTitle>
                                <strong>{values.successMessage}</strong>
                            </Alert>
                        </Snackbar>
                        <Box paddingBottom={7}>
                            <Grid container direction='row' spacing={3}>
                                <Grid item xs>
                                    <Card title="Datos del grupo">
                                        <Grid container spacing={2}>
                                            <Grid container item spacing={2}>
                                                <Grid item xs>
                                                    <SportSchoolSelect sportSchoolId={values.sportSchoolId} error={touched.sportSchoolId && errors.sportSchoolId}
                                                        onChange={(sportSchoolId: number) => {
                                                            setFieldValue('sportSchoolId', sportSchoolId);
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs>
                                                    <Checkbox name="specialization" checked={values.specialization === true} 
                                                            onChange={e => {
                                                                setFieldValue('specialization', e.target.checked)
                                                            }}
                                                        />
                                                        Especialización
                                                </Grid>
                                            </Grid>
                                            <Grid container item spacing={2}>
                                                <Grid item xs>
                                                    <TextField fullWidth name="name" label="Nombre" value={values.name} onChange={handleChange}
                                                        error={touched.name && errors.name} />
                                                </Grid>
                                                <Grid item xs>
                                                    <TrainerSelect 
                                                        trainerId={values.trainerId} 
                                                        sportSchoolId={values.sportSchoolId}  
                                                        error={touched.trainerId && errors.trainerId}
                                                        onChange={(trainerId: number) => {
                                                            setFieldValue('trainerId', trainerId);
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                                <Grid container item xs spacing={2}>
                                    <ScheduleSelect 
                                        schedules={props.schedules}
                                        scheduleIds={values.scheduleIds}
                                        specialization={false}
                                        onChange={(scheduleIds: number[]) => {
                                            setFieldValue('scheduleIds', scheduleIds)
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        { (isAdmin() || isManager()) &&
                            <AppBar position="fixed" style={{ bottom: 0, top: 'auto' }}>
                                <Toolbar>
                                    { props.loading ? <Spinner/> : <>
                                        <SaveButton type="submit" text='Guardar' disabled={isSubmitting} />
                                        {props.id ? 
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

const mapDispatchToProps =  {
    addGroup,
    getGroup,
    removeGroup,
    getSchedules
}

const mapStateToProps = (state: any) => {
    return { 
        group: state.group_reducer.group,
        schedules: state.schedule_reducer.schedules,
        loading: state.api_reducer.loading
    };
};

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(CreateGroup);

const WithRouterWrapper = () => {
    let { id } = useParams()

    return (
        <ConnectedComponent id={id}></ConnectedComponent>
    )
}
export default WithRouterWrapper