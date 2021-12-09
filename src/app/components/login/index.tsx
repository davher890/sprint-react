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
        <Container fixed>
            <Card>
                <Grid container spacing={1}>
                    <Grid item xs>
                        <TextField name="username" value={username} label="Usuario" onChange={handleUserChange}/>
                        <TextField name="password" value={password} label="Contraseña" onChange={handlePasswordChange}/>
                    </Grid>
                    <Grid item xs>
                        <SearchButton onClick={() => {props.signUp(username, password)}}></SearchButton>
                    </Grid>
                </Grid>
            </Card>
        </Container>
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
