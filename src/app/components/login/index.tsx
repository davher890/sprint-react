import React, { useState } from "react";
import { connect } from "react-redux";

import { Grid, Snackbar } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import TextField from "../custom/TextField"
import SearchButton from "../custom/SearchButton"
import Card from "../custom/Card"

import { signUp } from "../../redux/actions/login"

const LoginForm: React.FC<any> = (props) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleEmailChange = (event: any) => {
        setEmail(event.target.value)
    }
    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value)
    }

    const handleKeyPress = (event: any) => {
        if(event.key === 'Enter'){
            props.signUp(email, password)
        }
    }
    
    return (
        <Grid container>
            <Snackbar open={props.login && props.login.errorMessage !== undefined && props.login.errorMessage !== ''}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000}>
                <Alert severity="error" 
                    onClose={() => { 
                        props.login.errorMessage = ''
                        //setFieldValue("errorMessage", "") 
                    }}>
                    <AlertTitle>Error</AlertTitle>
                    <strong>{props.login?.errorMessage || ''}</strong>
                </Alert>
            </Snackbar>
            <Grid item xs={4}>
                <Card>
                    <Grid item xs>
                        <TextField name="email" value={email} label="Email" onChange={handleEmailChange}/>
                    </Grid>
                    <Grid item xs>
                        <TextField name="password" value={password} label="Contraseña" type="password"
                            onKeyPress={handleKeyPress}
                            onChange={handlePasswordChange}/>
                    </Grid>
                    <Grid item xs>
                        <SearchButton onClick={() => {props.signUp(email, password)}}>Entrar</SearchButton>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    )
}

const mapDispatchToProps = {
    signUp
}

const mapStateToProps = (state: any) => {
    return { 
        login: state.auth_reducer.login
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);
