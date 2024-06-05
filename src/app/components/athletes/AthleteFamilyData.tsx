import * as React from "react"
import { Grid } from '@material-ui/core'

import TextField from "../custom/TextField"


const AthleteFamilyData: React.FC<any> = (props) => {

    const onChange = (e: any) => {
        props.onChange && props.onChange({name: e.target.name, value: e.target.value})
    }

    return (
        <>
            <Grid container item spacing={1}>
                <Grid item xs>
                    <TextField { ...props } name="Name" label="Nombre" value={props.name} margin="dense" onChange={onChange} />
                </Grid>
                <Grid item xs>
                    <TextField { ...props } name="FirstSurname" label="Primer Apellido" value={props.firstSurname} margin="dense" onChange={onChange} />
                </Grid>
                <Grid item xs>
                    <TextField { ...props } name="SecondSurname" label="Segundo Apellido" value={props.secondSurname} margin="dense" onChange={onChange} />
                </Grid>
            </Grid>
            <Grid container item spacing={1}>
                <Grid item xs>
                    <TextField { ...props } name="Dni" type="text" label="Dni" value={props.dni} error={props.touchedDni && props.errorsDni} margin="dense" onChange={onChange}
                        onBlur={() => {
                            if (props.dniOnBlur){
                                props.dniOnBlur()
                            }
                        }} 
                    />
                </Grid>
                <Grid item xs>
                    <TextField { ...props } name="Mail" type="text" label="Email" value={props.mail} margin="dense" onChange={onChange} />
                </Grid>
            </Grid>
        </>
    )
}

export default React.memo(AthleteFamilyData)