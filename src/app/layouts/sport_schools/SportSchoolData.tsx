import * as React from "react"

import { Formik } from 'formik';

import { AppBar, Box, Chip, Grid, Snackbar, Toolbar } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import DeleteButton from "../../components/custom/DeleteButton";
import Card from '../../components/custom/Card';
import ConfirmDialog from "../../components/custom/ConfirmDialog";
import SaveButton from '../../components/custom/SaveButton'
import TextField from '../../components/custom/TextField';


import { connect } from "react-redux";
import { useParams } from 'react-router-dom';

import { addSportSchool, getSportSchool, removeSportSchool, getSportSchoolFee } from "../../redux/actions/sportSchools";
import { addFee } from "../../redux/actions/fees";

import { isManager, isAdmin } from "../../services/LoginService";

const ConnectedForm: React.FC<any> = (props) => {

    React.useEffect(() => {
        if (props.id) {
            let id = props.id
            if (id) {
                props.getSportSchool(id)
                props.getSportSchoolFee(id)
            }
        }
    }, [])

    const handleFormSubmit = async (values: any) => {
        await props.addSportSchool(values);
        await props.addFee({ id: values.feeId, sportSchoolId: props.id, ...values });
    }

    const deleteSportSchool = (groupId: number) => {
        props.removeSportSchool(groupId)
    }


    return (
        <Box height="100vh">

            <Formik enableReinitialize
                initialValues={{
                    id: props.sport_school.id || 0,
                    createdAt: props.sport_school.createdAt || 0,
                    name: props.sport_school.name || '',
                    municipality: props.sport_school.municipality || '',
                    address: props.sport_school.address || '',

                    feeId: props.fee.id || 0,
                    sportSchoolAnnualFee: props.fee.sportSchoolAnnualFee,
                    equipmentAnnualFee: props.fee.equipmentAnnualFee,
                    enrollmentFee: props.fee.enrollmentFee,
                    membershipFee: props.fee.membershipFee,
                    quarterOneDay: props.fee.quarterOneDay,
                    quarterTwoDays: props.fee.quarterTwoDays,
                    quarterThreeDays: props.fee.quarterThreeDays,
                    quarterSpecialization: props.fee.quarterSpecialization,
                    trackFee: props.fee.trackFee,
                    feeTypeIds: props.sport_school.feeTypeIds || [],
                    feeTypes: props.sport_school.feeTypes || [],
                    
                    openDeleteDialog: false,
                    
                    errorMessage: props.sport_school.errorMessage || '',
                    successMessage: props.sport_school.successMessage || ''
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
                    // setsportSchool(values)
                    setSubmitting(false);
                    handleFormSubmit(values)
                }}
            >
            {({ handleSubmit, handleChange, values, touched, setFieldValue, errors, isSubmitting }) => (

                <form onSubmit={handleSubmit}>
                    <ConfirmDialog open={values.openDeleteDialog} 
                        confirm={() => {
                            deleteSportSchool(props.id); 
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
                        <Grid container spacing={3} direction='row' 
                            style={{
                                height: '100%',
                                // justifyContent: "flex-start",
                                alignItems:"flex-start"
                            }}
                        >
                            <Grid container direction='column' item xs spacing={3}>
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
                                    <Card title="Tipos de cuota">
                                        { values.feeTypes && values.feeTypes.length > 0 ? values.feeTypes.map((ft: any) =>
                                                <Chip label={ft.name}/>
                                            )
                                            :
                                                <Alert severity="error">No existen cuotas asociadas. Contacte con el administrador.</Alert>
                                        }
                                    </Card>
                                </Grid>
                            </Grid>
                            <Grid container direction='column' item xs spacing={3}>
                                <Grid item xs>
                                    <Card title="Cuotas">
                                        <Grid container direction='column' spacing={2}>
                                            <Grid container item spacing={2}>
                                                <Grid item xs>
                                                    <TextField name="enrollmentFee" label="Matricula" value={values.enrollmentFee} onChange={handleChange}
                                                        error={touched.enrollmentFee && errors.enrollmentFee} type='number' />
                                                </Grid>
                                                <Grid item xs>
                                                    <TextField name="membershipFee" label="Socio" value={values.membershipFee} onChange={handleChange}
                                                        error={touched.membershipFee && errors.membershipFee} type='number' />
                                                </Grid>
                                                <Grid item xs>
                                                    <TextField name="equipmentAnnualFee" label="Pack de equipación competición" value={values.equipmentAnnualFee} onChange={handleChange}
                                                        error={touched.equipmentAnnualFee && errors.equipmentAnnualFee} type='number' />
                                                </Grid>
                                                <Grid item xs>
                                                    <TextField name="sportSchoolAnnualFee" label={`Cuota Anual ${values.name}`} value={values.sportSchoolAnnualFee} onChange={handleChange}
                                                        error={touched.sportSchoolAnnualFee && errors.sportSchoolAnnualFee} type='number' />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                                <Grid item xs>
                                    <Card title="Entrenamiento">
                                        <Grid container direction='column' spacing={2}> 
                                            <Grid container item spacing={2}>
                                                <Grid item xs>
                                                    <TextField name="quarterOneDay" label="Cuota trimestral 1 dia" value={values.quarterOneDay} onChange={handleChange}
                                                        error={touched.quarterOneDay && errors.quarterOneDay} type='number' />
                                                </Grid>
                                                <Grid item xs>
                                                    <TextField name="quarterTwoDays" label="Cuota trimestral 2 dias" value={values.quarterTwoDays} onChange={handleChange}
                                                        error={touched.quarterTwoDays && errors.quarterTwoDays} type='number' />
                                                </Grid>
                                                <Grid item xs>
                                                    <TextField name="quarterThreeDays" label="Cuota trimestral 3 dias" value={values.quarterThreeDays} onChange={handleChange}
                                                        error={touched.quarterThreeDays && errors.quarterThreeDays} type='number' />
                                                </Grid>
                                                <Grid item xs>
                                                    <TextField name="quarterSpecialization" label="Cuota trimestral especializacion" value={values.quarterSpecialization} onChange={handleChange}
                                                        error={touched.quarterSpecialization && errors.quarterSpecialization} type='number' />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                                <Grid item xs>
                                    <Card title="Pista">
                                        <Grid container direction='column' spacing={2}>
                                            <Grid container item spacing={2}>
                                                <Grid item xs>
                                                    <TextField name="trackFee" label="Precio/hora" value={values.trackFee} onChange={handleChange}
                                                        error={touched.trackFee && errors.trackFee} type='number' />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                    { (isAdmin() || isManager()) &&
                        <AppBar position="fixed" style={{ bottom: 0, top: 'auto' }}>
                            <Toolbar>
                                <SaveButton type="submit" text='Guardar' disabled={isSubmitting} />
                                {(props.id) ? 
                                    <DeleteButton text='Borrar' onClick={() => setFieldValue("openDeleteDialog", true)}/>
                                    : null
                                }
                            </Toolbar>
                        </AppBar>
                    }
                </form>
            )}
            </Formik>
        </Box>
    );
}

const mapDispatchToProps = {
    addSportSchool,
    getSportSchool,
    removeSportSchool,
    getSportSchoolFee,
    addFee
}

const mapStateToProps = (state: any) => {
    return { 
        sport_school: state.sport_school_reducer.sport_school,
        fee: state.fee_reducer.fee
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