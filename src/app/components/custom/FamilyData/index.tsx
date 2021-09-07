import React, { useState } from "react";
import { Grid } from '@material-ui/core';
import MemoTextField from '../TextField';

export const FamilyData: React.FC<any> = ({ props = {}}) => {

    const [name, setName] = useState(props.name)
    const [firstSurname, setFirstSurname] = useState(props.firstSurname)
    const [secondSurname, setSecondSurname] = useState(props.secondSurname)
    const [dni, setDni] = useState(props.dni)
    const [mail, setMail] = useState(props.mail)

    const onChange = () => {

        if (props.onChange){
            props.onChange({
                name: name,
                firstSurname: firstSurname,
                secondSurname: secondSurname,
                dni: dni,
                mail: mail
            })
        }
    } 

    return (
        <Grid container direction="column" spacing={2}>
            <Grid container item spacing={1}>
                <Grid item xs>
                    <MemoTextField name="name" label="Nombre" value={name} margin="dense" 
                        onChange={(e: any) => {setName(e.target.value)}} />
                </Grid>
                <Grid item xs>
                    <MemoTextField name="firstSurname" label="Primer Apellido" value={firstSurname} margin="dense" 
                        onChange={(e: any) => {setFirstSurname(e.target.value)}} />
                </Grid>
                <Grid item xs>
                    <MemoTextField name="secondSurname" label="Segundo Apellido" value={secondSurname} margin="dense" 
                        onChange={(e: any) => {setSecondSurname(e.target.value)}} />
                </Grid>
            </Grid>
            <Grid container item spacing={1}>
                <Grid item xs>
                    <MemoTextField name="dni" type="text" label="Dni" value={dni} margin="dense" 
                        onChange={(e: any) => {setDni(e.target.value)}} />
                </Grid>
                <Grid item xs>
                    <MemoTextField name="mail" type="text" label="Email" value={mail} margin="dense" 
                        onChange={(e: any) => {setMail(e.target.value)}} />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default FamilyData