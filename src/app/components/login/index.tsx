import React, { useState } from "react";
import { connect } from "react-redux";

import { Grid } from '@material-ui/core';
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
    
    return (
        <Card>
            <Grid container spacing={2} direction='column'>
                <Grid item xs>
                    <TextField name="email" value={email} label="Email" onChange={handleEmailChange}/>
                </Grid>
                <Grid item xs>
                    <TextField name="password" value={password} label="Contraseña" type="password"
                        onChange={handlePasswordChange}/>
                </Grid>
                <Grid item xs>
                    <SearchButton onClick={() => {props.signUp(email, password)}}>Entrar</SearchButton>
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
