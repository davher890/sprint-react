import * as React from "react"

import { Formik } from 'formik';

import { Grid, Container, Checkbox } from "@material-ui/core";

import MemoTextField from '../custom/TextField';
import Select from '../custom/Select';
import SaveButton from '../custom/SaveButton'
import Card from '../custom/Card'
import ScheduleSelect from '../custom/ScheduleSelect'

import { connect } from "react-redux";
import { addGroup, getGroup } from "../../redux/actions/groups";
import { getSchedules } from "../../redux/actions/schedules";
import TrainerSelect from "../custom/TrainerSelect";

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

        this.props.addGroup(JSON.stringify(this.state))
    }

    render() {
        return (
            <Container fixed>
    	        <React.Suspense fallback={<div>Cargando...</div>}>

                    <Formik enableReinitialize 
                        initialValues={{
                            // Other
                            schedules : this.props.schedules,
                            trainers: this.props.trainers,
                            // Group data
                            name: this.props.group.name || '',
                            scheduleIds: this.props.group.scheduleIds || [],
                            specialization: this.props.group.specialization || false,
                            trainerId: this.props.group.trainerId || ''
                        }}
                        validate={(values) => {
                            let errors: any = {};

                            if (values.schedules === '') errors.schedules = 'Campo obligatorio'
                            if (values.trainers === '') errors.trainers = 'Campo obligatorio'
                            if (values.name === '') errors.name = 'Campo obligatorio'
                            if (values.scheduleIds === '') errors.scheduleIds = 'Campo obligatorio'
                            if (values.specialization === '') errors.specialization = 'Campo obligatorio'
                            if (values.trainerId === '') errors.trainerId = 'Campo obligatorio'
                            //check if my values have errors
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            alert("Guardando...");
                            this.setState(values)
                            setSubmitting(false);
                            this.handleSubmit()
                        }}
                        >
                        {({ handleSubmit, handleChange, values, touched, setFieldValue, setFieldTouched, setValues, errors }) => (
            
                            <form onSubmit={handleSubmit}>
                                <Grid container direction="column" spacing={3}>
                                    <Grid item xs>
                                        <Card title="Datos del grupo">
                                            <Grid container spacing={2}>
                                                <Grid item xs>
                                                    <MemoTextField fullWidth name="name" label="Nombre" value={values.name} onChange={handleChange}
                                                        error={touched.name && errors.name} />
                                                </Grid>
                                                <Grid item xs>
                                                    <Checkbox name="specialization" checked={values.specialization === true} 
                                                            onChange={e => {
                                                                setFieldValue('specialization', e.target.checked)
                                                            }}
                                                        />
                                                        Especialización
                                                </Grid>
                                                <Grid item xs>
                                                    <ScheduleSelect 
                                                        schedules={this.props.schedules}
                                                        scheduleIds={values.scheduleIds}
                                                        specialization={values.specialization}
                                                        onChange={(scheduleIds: number[]) => {
                                                            // this.scheduleIdsOnChange(scheduleIds)
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs>
                                                    <TrainerSelect trainerId={values.trainerId} error={touched.trainerId && errors.trainerId}
                                                            onChange={(trainerId: number) => {
                                                                if (trainerId) {
                                                                    setFieldValue('trainerId', trainerId);
                                                                }
                                                            }}
                                                        />
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    </Grid>
                                    <Grid>
                                        <SaveButton type="submit"/>
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

const mapStateToProps = (state: any) => {
    return { 
        group: state.group_reducer.group,
        schedules: state.schedule_reducer.schedules
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        addGroup: (group: any) => dispatch(addGroup(group)),
        getGroup: (id: any) => dispatch(getGroup(id)),
        getSchedules: () => dispatch(getSchedules())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedForm);
