import * as React from "react"

import { Formik } from 'formik';

import { Grid, Snackbar, AppBar, Toolbar, Box, Button, Checkbox } from "@mui/material";
import { Alert, AlertTitle } from '@mui/lab';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import TextField from "../../components/custom/TextField";
import Card from "../../components/custom/Card";
import SaveButton from "../../components/custom/SaveButton";
import Spinner from '../../components/custom/Spinner'

import { addUser, getUser, changeUserPassword } from "../../redux/actions/users";
import { getAllSportSchools, getSportSchoolsGroups } from "../../redux/actions/sportSchools";

import { connect } from "react-redux";
import { useParams } from 'react-router-dom';

import { getUserId, isAdmin, isManager } from "../../services/LoginService";
import SportSchoolMultiSelect from "../../components/custom/SportSchoolMultiSelect";
import GroupMultiSelect from "../../components/custom/GroupMultiSelect";

const CreateUser: React.FC<any> = (props) => {

    const [user, setUser] = React.useState<any>({})

    React.useEffect(() => {
        props.getAllSportSchools()
        if (props.id) {
            let id = props.id
            if (id && id === 'me'){
                id = getUserId().toString()
            }
            getUser(id)
        }
    }, [])

    React.useEffect(() => {
        if (props.user.sportSchoolIds && props.user.sportSchoolIds.length > 0){
            props.getSportSchoolsGroups(props.user.sportSchoolIds)
        }
    }, [ props.user])

    const getUser = ((id: number) => {
        props.getUser(id)
    })


    const handleSubmit = ((values: any) => {
        props.addUser(values);
    })

    return (
        <React.Suspense fallback={<div>Cargando...</div>}>

            <Formik enableReinitialize
                initialValues={{
                    id: props.user.id || 0,
                    username: props.user.username || '',
                    email: props.user.email || '',
                    password: props.user.password || '',
                    sportSchoolIds: props.user.sportSchoolIds || [],
                    groupIds: props.user.groupIds || [],
                    admin: props.user.admin || false,
                    manager: props.user.manager || false,

                    openChangePassword: false,
                    oldPassword: props.user.oldPassword,
                    newPassword: props.user.newPassword,

                    errorMessage: props.user.errorMessage || '',
                    successMessage: props.user.successMessage || ''
                }}
                validate={(values) => {
                    let errors: any = {};

                    if (values.username === '') errors.username = true

                    //check if my values have errors
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setUser(values)
                    setSubmitting(false);
                    handleSubmit(values)
                }}
            >
                {({ handleSubmit, handleChange, values, touched, setFieldValue, setFieldTouched, errors, isSubmitting }) => (

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
                                    window.open("/admin/users/list", "_self");
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
                                            <TextField name="oldPassword" label="Contraseña antigua" type="password" value={values.oldPassword} onChange={handleChange}/>
                                        </Grid>
                                    </Grid>
                                    <Grid container item>
                                        <Grid item>
                                            <TextField name="newPassword" label="Nueva contraseña" type="password" value={values.newPassword} onChange={handleChange}/>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button 
                                    onClick={(a: any) => {
                                        props.changeUserPassword(values);
                                    }}
                                >Guardar</Button>
                                <Button 
                                    onClick={(a: any) => { setFieldValue('openChangePassword', false) }}
                                >Cerrar</Button>
                            </DialogActions>
                        </Dialog>
                        <Box paddingBottom={7}>
                            <Grid container direction="column" spacing={3}>
                                <Grid container item direction="row" spacing={3}>
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
                                                { values.id > 0 ? null :
                                                    <Grid item xs>
                                                        <TextField name="password" label="Contraseña" type="password" value={values.password} onChange={handleChange}
                                                            error={touched.password && errors.password} />
                                                    </Grid>
                                                }
                                            </Grid>
                                        </Card>
                                    </Grid>
                                    { isAdmin() &&
                                        <>
                                            <Grid item xs={2}>
                                                <Checkbox name="manager" checked={values.manager === true} 
                                                    onChange={e => {
                                                        setFieldValue('manager', e.target.checked)
                                                    }}
                                                />
                                                Manager
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Checkbox name="admin" checked={values.admin === true} 
                                                    onChange={e => {
                                                        setFieldValue('admin', e.target.checked)
                                                    }}
                                                />
                                                Admin
                                            </Grid>
                                        </>
                                    }
                                </Grid>
                                
                                { (isAdmin() || isManager()) && 
                                    <Grid container item direction="row" spacing={3}>
                                        <Grid item xs>
                                            <SportSchoolMultiSelect
                                                sportSchools={props.sport_schools}
                                                sportSchoolIds={values.sportSchoolIds}
                                                onChange={((ssIds: number[]) => {
                                                    setFieldValue('sportSchoolIds', ssIds)
                                                    props.getSportSchoolsGroups(ssIds).then(() => {
                                                        // Check that every id in groupIds is in groups.id
                                                        if (Object.keys(props.sport_schools_groups).length > 0){
                                                            let grIds = props.sport_schools_groups.map((gr: {id:number}) => gr.id)
                                                            let auxIds = values.groupIds.filter((id: number) => {
                                                                return grIds.includes(id)
                                                            })
                                                            setFieldValue('groupIds', auxIds)
                                                        }
                                                    })
                                                })}
                                            />
                                        </Grid>
                                        <Grid item xs>
                                                <GroupMultiSelect
                                                    groups={props.sport_schools_groups || []}
                                                    groupIds={values.groupIds}
                                                    onChange={((grIds: number[], grId: number, checked: boolean) => {
                                                    setFieldValue('groupIds', grIds)
                                                })}
                                                />
                                        </Grid>
                                    </Grid>
                                }
                            </Grid>
                        </Box>
                        <AppBar position="fixed" style={{ bottom: 0, top: 'auto' }}>
                            <Toolbar>
                                { props.loading ? <Spinner/> : <>
                                    <SaveButton type="submit" text='Guardar' disabled={isSubmitting} />
                                    { values.id > 0 &&
                                        <SaveButton onClick={() => {
                                            setFieldValue("openChangePassword", true)
                                        }} >Cambiar contraseña</SaveButton>
                                    }
                                    </>
                                }
                            </Toolbar>
                        </AppBar>
                    </form>
                )}
            </Formik>
        </React.Suspense>
    );
}

const mapDispatchToProps = {
    addUser,
    getUser,
    changeUserPassword,
    getAllSportSchools,
    getSportSchoolsGroups
}

const mapStateToProps = (state: any) => {
    return { 
        user: state.user_reducer.user,
        sport_schools: state.sport_school_reducer.sport_schools,
        sport_schools_groups: state.group_reducer.sport_schools_groups,
        loading: state.api_reducer.loading
    };
};

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(CreateUser);

const WithRouterWrapper = () => {
    let { id } = useParams()
    return (
        <ConnectedComponent id={id}></ConnectedComponent>
    )
}
export default WithRouterWrapper
