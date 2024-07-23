import React, { useState } from "react";
import { connect } from "react-redux";

import { Box, Grid, Snackbar } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import TextField from "../TextField"
import SearchButton from "../SearchButton"

import { logIn } from "../../../redux/actions/login"

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
            props.login(email, password)
        }
    }
    
    return (
        <Box>
            <Grid container direction='row' spacing={1}
                style={{
                    height: '100%',
                    justifyContent: "center",
                    alignItems:"center"
                }}>
                <Grid item xs>
                    <TextField name="email" value={email} label="Email" 
                        onChange={handleEmailChange}
                        sx={{
                            '& .MuiInputLabel-root': {
                              color: 'secondary.main',
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                              color: 'secondary.main',
                            },
                            '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                              color: 'secondary.main',
                            },
                            '& .MuiInputBase-input': {
                              color: 'secondary.main',
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderColor: 'secondary.main',
                                },
                                '&:hover fieldset': {
                                  borderColor: 'secondary.main',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: 'secondary.main',
                                },
                            },
                        }}
                    />
                </Grid>
                <Grid item xs>
                    <TextField name="password" value={password} label="Contraseña" type="password"
                        onKeyPress={handleKeyPress}
                        onChange={handlePasswordChange}
                        sx={{
                            '& .MuiInputLabel-root': {
                              color: 'secondary.main',
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                              color: 'secondary.main',
                            },
                            '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                              color: 'secondary.main',
                            },
                            '& .MuiInputBase-input': {
                              color: 'secondary.main',
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderColor: 'secondary.main',
                                },
                                '&:hover fieldset': {
                                  borderColor: 'secondary.main',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: 'secondary.main',
                                },
                            },
                        }}
                    />
                </Grid>
                <Grid item xs>
                    <SearchButton onClick={() => {props.logIn(email, password)}}>Entrar</SearchButton>
                </Grid>
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
    logIn
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