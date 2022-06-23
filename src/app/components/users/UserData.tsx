import * as React from "react"

import { Formik } from 'formik';

import { Grid, Snackbar, AppBar, Toolbar, Box, Button, Checkbox } from "@material-ui/core";
import { Alert, AlertTitle } from '@material-ui/lab';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

import TextField from "../custom/TextField";
import Card from "../custom/Card";
import SaveButton from "../custom/SaveButton";
import SportSchoolMultiSelect from "../custom/SportSchoolMultiSelect";
import GroupMultiSelect from "../custom/GroupMultiSelect";

import { addUser, getUser, changeUserPassword } from "../../redux/actions/users";
import { getAllSportSchools } from "../../redux/actions/sportSchools";

import { connect } from "react-redux";
import { useParams } from 'react-router-dom';

import { getUserId, isAdmin, isManager } from "../../services/LoginService";

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
                this.props.getUser(id)
            }
        }
        this.props.getAllSportSchools()
    }

    handleFormSubmit() {
        this.props.addUser(this.state);
    }

    render() {
        return (
            <React.Suspense fallback={<div>Cargando...</div>}>

                <Formik enableReinitialize
                    initialValues={{
                        id: this.props.user.id || 0,
                        username: this.props.user.username || '',
                        email: this.props.user.email || '',
                        password: this.props.user.password || '',
                        sportSchoolIds: this.props.user.sportSchoolIds || [],
                        groupIds: this.props.user.groupIds || [],
                        admin: this.props.user.admin || false,
                        manager: this.props.user.manager || false,

                        openChangePassword: false,
                        oldPassword: this.props.user.oldPassword,
                        newPassword: this.props.user.newPassword,

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
                {({ handleSubmit, handleChange, values, touched, setFieldValue, setFieldTouched, errors, isSubmitting }) => {

                    return (

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
                                        this.props.changeUserPassword(values);
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
                                                { values.id === 0 ? 
                                                    <Grid item xs>
                                                        <TextField name="password" label="Contraseña" type="password" value={values.password} onChange={handleChange}
                                                            error={touched.password && errors.password} />
                                                    </Grid>
                                                : null }
                                            </Grid>
                                        </Card>
                                    </Grid>
                                    { isAdmin() || isManager() ?
                                        <Grid item xs={2}>
                                            <Checkbox name="manager" checked={values.manager === true} 
                                                onChange={e => {
                                                    setFieldValue('manager', e.target.checked)
                                                }}
                                            />
                                            Manager
                                        </Grid>
                                        : null
                                    }
                                    { isAdmin() ?
                                        <Grid item xs={2}>
                                            <Checkbox name="admin" checked={values.admin === true} 
                                                onChange={e => {
                                                    setFieldValue('admin', e.target.checked)
                                                }}
                                            />
                                            Admin
                                        </Grid>
                                        : null
                                    }
                                    { isAdmin() || isManager() ?
                                            <Grid item xs>
                                                <SportSchoolMultiSelect 
                                                    sportSchools={this.props.sport_schools}
                                                    sportSchoolIds={values.sportSchoolIds}
                                                    onChange={(sportSchoolIds: number[], sportSchoolId: number, checked: boolean) => {
                                                        setFieldValue('sportSchoolIds', sportSchoolIds)
                                                        if (!checked){
                                                            // Remove the groupIds from the unchecked sportSchool
                                                            let grIds = values.groupIds

                                                            let sportSchoolGroups = this.props.sport_schools_groups['sport_school_' + sportSchoolId] || []
                                                            for (let gr of sportSchoolGroups){
                                                                grIds = grIds.filter((e: number) => e!== gr.id)
                                                            }
                                                            setFieldValue('groupIds', grIds)
                                                        }

                                                    }}
                                                />
                                            </Grid>
                                        : null }
                                </Grid>
                                { isAdmin() || isManager()?
                                <Grid container item direction="row" spacing={3}>
                                    {values.sportSchoolIds ? values.sportSchoolIds.map((id:number) => {
                                        return <GroupMultiSelect
                                            key={`sport_school_${id}`}
                                            sportSchool={this.props.sport_schools.find((sportSchool: any) => sportSchool.id === id )}
                                            sportSchoolId={id}
                                            selectedGroupIds={values.groupIds}
                                            onChange={(selectedGroupIds: number[], groupId: number, checked: boolean) => {
                                                let selectedIds = JSON.parse(JSON.stringify(values.groupIds))
                                                if (checked){
                                                    selectedIds.push(groupId)
                                                }
                                                else {
                                                    const idx = selectedIds.indexOf(groupId);
                                                    selectedIds.splice(idx, 1);
                                                }
                                                setFieldValue('groupIds', Array.from(new Set(selectedIds)))
                                            }}
                                        />
                                        
                                    }) : null}
                                </Grid>
                                : null }
                            </Grid>
                        </Box>
                        <AppBar position="fixed" style={{ bottom: 0, top: 'auto' }}>
                            <Toolbar>
                                <SaveButton type="submit" text='Guardar' disabled={isSubmitting} />
                            </Toolbar>
                            { values.id > 0 ? 
                                <Toolbar>
                                    <SaveButton onClick={() => {
                                        setFieldValue("openChangePassword", true)
                                    }} >Cambiar contraseña</SaveButton>
                                </Toolbar>
                            : null }
                        </AppBar>
                    </form>
                )}}
            </Formik>

            </React.Suspense>
        );
    }
}

const mapDispatchToProps = {
    addUser,
    getUser,
    getAllSportSchools,
    changeUserPassword,
}

const mapStateToProps = (state: any) => {
    return { 
        user: state.user_reducer.user,
        sport_schools: state.sport_school_reducer.sport_schools,
        sport_schools_groups: state.group_reducer.sport_schools_groups
    };
};

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ConnectedForm);

const WithRouterWrapper = () => {
    let { id } = useParams()
    if (id && id === 'me'){
        id = getUserId().toString()
    }
    return (
        <ConnectedComponent id={id}></ConnectedComponent>
    )
}
export default WithRouterWrapper
