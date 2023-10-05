import * as React from "react"

import { Formik } from 'formik';

import { Grid, AppBar, Toolbar, Snackbar } from "@material-ui/core";
import { Alert, AlertTitle } from '@material-ui/lab';

import TextField from '../../components/custom/TextField';
import Select from '../../components/custom/Select';
import SaveButton from '../../components/custom/SaveButton'
import Card from '../../components/custom/Card';

import { connect } from "react-redux";
import { useParams } from 'react-router-dom';

import { addSchedule, getSchedule } from "../../redux/actions/schedules";

const LUNES = "Lunes"
const MARTES = "Martes"
const MIERCOLES = "Miércoles"
const JUEVES = "Jueves"
const VIERNES = "Viernes"
const SABADO = "Sábado"
const DOMINGO = "Domingo"

const weekDays: any = {
    [LUNES]: "MONDAY",
    [MARTES]: "TUESDAY",
    [MIERCOLES]: "WEDNESDAY",
    [JUEVES]: "THURSDAY",
    [VIERNES]: "FRIDAY",
    [SABADO]: "SATURDAY",
    [DOMINGO]: "SUNDAY"
}
const CreateSchedule: React.FC<any> = (props) => {

    React.useEffect(() => {
        if (props.id) {
            let id = props.id
            if (id){
                props.getSchedule(id)
            }
        }
    }, [])

    const handleSubmit = ((values: any) => {
        props.addSchedule(values)
    })

    return (
        <React.Suspense fallback={<div>Cargando...</div>}>

            <Formik enableReinitialize
                initialValues={{
                    id: props.schedule.id || 0,
                    createdAt: props.schedule.createdAt || 0,
                    day: props.schedule.day || '',
                    dayNumber: props.schedule.dayNumber || 0,
                    startHour: props.schedule.startHour || 0,
                    startMinute: props.schedule.startMinute || 0,
                    endHour: props.schedule.endHour || 0,
                    endMinute: props.schedule.endMinute || 0,

                    errorMessage: props.schedule.errorMessage || '',
                    successMessage: props.schedule.successMessage || ''
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
                    setSubmitting(false);
                    handleSubmit(values)
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
                                setFieldValue("successMessage", "") 
                                window.open("/schedules/list", "_self");
                            }}>
                            <AlertTitle>Ok!</AlertTitle>
                            <strong>{values.successMessage}</strong>
                        </Alert>
                    </Snackbar>
                    <Card title="Horario">
                        <Grid container direction="row" spacing={2}>
                            <Grid item xs>
                                <Select fullWidth name="dayNumber" label="Día de la semana" error={touched.dayNumber && errors.dayNumber}
                                    options={[
                                        { id: 1, name: LUNES }, 
                                        { id: 2, name: MARTES }, 
                                        { id: 3, name: MIERCOLES }, 
                                        { id: 4, name: JUEVES }, 
                                        { id: 5, name: VIERNES }, 
                                        { id: 6, name: SABADO }, 
                                        { id: 7, name: DOMINGO }
                                    ]}
                                    value={values.dayNumber}
                                    onChange={(e: any, value: any) => {
                                        setFieldValue('day', value ? weekDays[value.name] : '')
                                        setFieldValue('dayNumber', value ? value.id : 0)
                                    }}
                                />
                            </Grid>
                            <Grid container item xs spacing={2}>
                                <Grid item xs>
                                    <TextField type="number" name="startHour" label="Hora Inicio" value={values.startHour} onChange={handleChange}
                                        error={touched.startHour && errors.startHour} />
                                </Grid>
                                <Grid item xs>
                                    <TextField type="number" name="startMinute" label="Minuto Inicio" value={values.startMinute} onChange={handleChange}
                                        error={touched.startMinute && errors.startMinute} />
                                </Grid>
                            </Grid>
                            <Grid container item xs spacing={2}>
                                <Grid item xs>
                                    <TextField type="number" name="endHour" label="Hora Fin" value={values.endHour} onChange={handleChange}
                                        error={touched.endHour && errors.endHour} />
                                </Grid>
                                <Grid item xs>
                                    <TextField type="number" name="endMinute" label="Minuto Fin" value={values.endMinute} onChange={handleChange}
                                        error={touched.endMinute && errors.endMinute} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                    <Grid>
                        <AppBar position="fixed" style={{ bottom: 0, top: 'auto' }}>
                            <Toolbar>
                                <SaveButton type="submit" text='Guardar' disabled={isSubmitting} />
                            </Toolbar>
                        </AppBar>                            
                    </Grid>
                </form>
            )}
            </Formik>
        </React.Suspense>
    );
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

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(CreateSchedule);

const WithRouterWrapper = () => {
    let { id } = useParams()

    return (
        <ConnectedComponent id={id}></ConnectedComponent>
    )
}
export default WithRouterWrapper