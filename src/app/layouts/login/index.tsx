import React, { useState } from "react";
import { connect } from "react-redux";

import { Box, Grid, Snackbar } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import TextField from "../../components/custom/TextField"
import SearchButton from "../../components/custom/SearchButton"
import Card from "../../components/custom/Card"

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
        <Box height="100vh">
            <Grid container direction='column' 
                style={{
                    height: '100%',
                    justifyContent: "center",
                    alignItems:"center"
                }}
            >
                <Card>
                    <Grid container direction="column" spacing={5}
                        style={{
                            height: '100%',
                            justifyContent: "center",
                            alignItems:"center"
                        }}>
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
                    </Grid>
                </Card>
            </Grid>
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
        </Box>
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
