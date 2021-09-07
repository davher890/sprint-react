import * as React from "react"

import { Formik } from 'formik';

import { Grid, Container } from "@material-ui/core";

import MemoTextField from '../custom/TextField';
import Select from '../custom/Select';
import SaveButton from '../custom/SaveButton'

import { connect } from "react-redux";
import { addSchedule, getSchedule } from "../../redux/actions/schedules";

class ConnectedForm extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {};
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentDidMount(){
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            this.setState({ id : id})
            if (id){
                this.props.getSchedule(id)
            }
        }
    }

    handleFormSubmit() {
        this.props.addSchedule(this.state)
    }

    render() {

        return (
            <Container fixed>
    	        <React.Suspense fallback={<div>Cargando...</div>}>

                    <Formik enableReinitialize
                        initialValues={{
                            id: this.props.schedule.id || 0,
                            day: this.props.schedule.day || '',
                            startHour: this.props.schedule.startHour || 0,
                            startMinute: this.props.schedule.startMinute || 0,
                            endHour: this.props.schedule.endHour || 0,
                            endMinute: this.props.schedule.endMinute || 0,
                        }}
                        validate={(values) => {
                            let errors: any = {};

                            if (values.day === '') errors.day = true
                            if (values.startHour === '') errors.startHour = true
                            if (values.startMinute === '') errors.startMinute = true
                            if (values.endHour === '') errors.endHour = true
                            if (values.endMinute === '') errors.endMinute = true

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
                            <Grid container direction="row" spacing={2}>
                                <Grid item xs>
                                    <Select fullWidth name="day" label="Género" error={touched.day && errors.day}
                                        options={[
                                            { id: "MONDAY", name: "Lunes" }, 
                                            { id: "TUESDAY", name: "Martes" }, 
                                            { id: "WEDNESDAY", name: "Miércoles" }, 
                                            { id: "THURSDAY", name: "Jueves" }, 
                                            { id: "FRIDAY", name: "Viernes" }, 
                                            { id: "SATURDAY", name: "Sábado" }, 
                                            { id: "SUNDAY", name: "Domingo" }
                                        ]} value={values.day}
                                        onChange={(e: any, value: any) => setFieldValue('day', value ? value.id : "")}
                                    />
                                </Grid>
                                <Grid container item xs spacing={2}>
                                    <Grid item xs>
                                        <MemoTextField name="startHour" label="Hora Inicio" value={values.startHour} onChange={handleChange}
                                            error={touched.startHour && errors.startHour} />
                                    </Grid>
                                    <Grid item xs>
                                        <MemoTextField name="startMinute" label="Minuto Inicio" value={values.startMinute} onChange={handleChange}
                                            error={touched.startMinute && errors.startMinute} />
                                    </Grid>
                                </Grid>
                                <Grid container item xs spacing={2}>
                                    <Grid item xs>
                                        <MemoTextField name="endHour" label="Hora Fin" value={values.endHour} onChange={handleChange}
                                            error={touched.endHour && errors.endHour} />
                                    </Grid>
                                    <Grid item xs>
                                        <MemoTextField name="endMinute" label="Minuto Fin" value={values.endMinute} onChange={handleChange}
                                            error={touched.endMinute && errors.endMinute} />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid>
                                <SaveButton type="submit"/>
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
    addSchedule,
    getSchedule
}

const mapStateToProps = (state: any) => {
    return { 
        schedule: state.schedule_reducer.schedule
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedForm);
