import * as React from "react"

import { Formik } from 'formik';

import { Grid, Container, Snackbar, Checkbox, AppBar, Toolbar, } from "@material-ui/core";
import { Alert, AlertTitle } from '@material-ui/lab';

import MemoTextField from '../custom/TextField';
import SaveButton from '../custom/SaveButton'
import DeleteButton from '../custom/DeleteButton'
import Card from '../custom/Card'
import ScheduleSelect from '../custom/ScheduleSelect'

import { connect } from "react-redux";
import { addGroup, getGroup, removeGroup } from "../../redux/actions/groups";
import { getSchedules } from "../../redux/actions/schedules";
import TrainerSelect from "../custom/TrainerSelect";
import SportSchoolSelect from "../custom/SportSchoolSelect";
import ConfirmDialog from "../custom/ConfirmDialog";

class ConnectedForm extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {}
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
                
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            if (id) {
                this.props.getGroup(id)
            }
        }
        this.props.getSchedules()
    }

    handleSubmit() {
        this.props.addGroup(this.state)
        window.open("/groups/list", "_self");
    }

    deleteGroup(groupId: number) {
        this.props.removeGroup(groupId)
    }

    render() {
        return (
            <Container fixed>
    	        <React.Suspense fallback={<div>Cargando...</div>}>

                    <Formik enableReinitialize 
                        initialValues={{
                            // Group data
                            id: this.props.group.id || 0,
                            name: this.props.group.name || '',
                            scheduleIds: this.props.group.scheduleIds || [],
                            specialization: this.props.group.specialization || false,
                            trainerId: this.props.group.trainerId || '',
                            sportSchoolId: this.props.group.sportSchoolId || '',

                            openDeleteDialog: false,

                            errorMessage: this.props.group.errorMessage || '',
                            successMessage: this.props.group.successMessage || ''
                        }}
                        validate={(values) => {
                            let errors: any = {};

                            if (values.name === '') errors.name = true
                            if (values.scheduleIds === '') errors.scheduleIds = true
                            if (!values.trainerId) errors.trainerId = true
                            //check if my values have errors
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            this.setState(values)
                            setSubmitting(false);
                            this.handleSubmit()
                        }}
                        >
                        {({ handleSubmit, handleChange, values, touched, setFieldValue, errors, isSubmitting }) => (
            
                            <form onSubmit={handleSubmit}>
                                <ConfirmDialog open={values.openDeleteDialog} 
                                    confirm={() => {
                                        this.deleteGroup(this.props.match.params.id); 
                                        setFieldValue("openDeleteDialog", false);
                                        window.open("/groups/list", "_self");
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
                                    <Alert severity="success" onClose={() => { setFieldValue("successMessage", "") }}>
                                        <AlertTitle>Ok!</AlertTitle>
                                        <strong>{values.successMessage}</strong>
                                    </Alert>
                                </Snackbar>
                                <Grid container direction="column" spacing={3}>
                                    <Grid item xs>
                                        <Card title="Datos del grupo">
                                            <Grid container spacing={2}>
                                                <Grid item xs={3}>
                                                    <SportSchoolSelect sportSchoolId={values.sportSchoolId} error={touched.sportSchoolId && errors.sportSchoolId}
                                                        onChange={(sportSchoolId: number) => {
                                                            setFieldValue('sportSchoolId', sportSchoolId);
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Checkbox name="specialization" checked={values.specialization === true} 
                                                            onChange={e => {
                                                                setFieldValue('specialization', e.target.checked)
                                                            }}
                                                        />
                                                        Especialización
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2}>
                                                <Grid item xs>
                                                    <MemoTextField fullWidth name="name" label="Nombre" value={values.name} onChange={handleChange}
                                                        error={touched.name && errors.name} />
                                                </Grid>
                                                
                                                
                                                <Grid item xs>
                                                    <TrainerSelect trainerId={values.trainerId} error={touched.trainerId && errors.trainerId}
                                                            onChange={(trainerId: number) => {
                                                                setFieldValue('trainerId', trainerId);
                                                            }}
                                                        />
                                                </Grid>
                                                <Grid item xs>
                                                    <ScheduleSelect 
                                                        schedules={this.props.schedules}
                                                        scheduleIds={values.scheduleIds}
                                                        specialization={false}
                                                        onChange={(scheduleIds: number[]) => {
                                                            setFieldValue('scheduleIds', scheduleIds)
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    </Grid>
                                    <AppBar position="fixed" style={{ bottom: 0, top: 'auto' }}>
                                        <Toolbar>
                                            <SaveButton type="submit" text='Guardar' disabled={isSubmitting} />
                                            {(this.props.match && this.props.match.params && this.props.match.params.id) ? 
                                                <DeleteButton text='Borrar' onClick={() => setFieldValue("openDeleteDialog", true)}/>
                                                : null
                                            }
                                        </Toolbar>
                                    </AppBar>
                                </Grid>
                            </form>
                        )}
                    </Formik>                
                </React.Suspense>
            </Container>
        );
    }
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
        schedules: state.schedule_reducer.schedules
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedForm);
