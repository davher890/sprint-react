import React, { useState } from "react";
import { connect } from "react-redux";

import { Container, Grid } from '@material-ui/core';
import TextField from "../custom/TextField"
import SearchButton from "../custom/SearchButton"
import Card from "../custom/Card"

import { signUp } from "../../redux/actions/login"

const LoginForm: React.FC<any> = (props) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleUserChange = (event: any) => {
        setUsername(event.target.value)
    }
    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value)
    }
    
    return (
        <Card>
            <Grid container spacing={2} direction='column'>
                <Grid item xs>
                    <TextField name="username" value={username} label="Usuario" onChange={handleUserChange}/>
                </Grid>
                <Grid item xs>
                    <TextField name="password" value={password} label="Contraseña" type="password"
                        onChange={handlePasswordChange}/>
                </Grid>
                <Grid item xs>
                    <SearchButton onClick={() => {props.signUp(username, password)}}>Entrar</SearchButton>
                </Grid>
            </Grid>
        </Card>
    )
}

const mapDispatchToProps = {
    signUp
}

const mapStateToProps = () => {
    return { 
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);
