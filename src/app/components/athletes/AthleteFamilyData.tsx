import * as React from "react"
import { connect } from "react-redux";
import moment from 'moment'

import { Grid, Typography } from '@material-ui/core'

import { getAthleteObservations, getAthleteHistoric } from "../../redux/actions/athletes";
import { addObservations, removeObservation } from "../../redux/actions/observations";

import utils from "../../utils/Functions"

import TextField from "../custom/TextField"
import CustomCard from '../custom/Card'
import SaveButton from "../custom/SaveButton";
import DeleteButton from '../custom/DeleteButton'
import ConfirmDialog from "../custom/ConfirmDialog";

import { isManager, isAdmin } from "../../services/LoginService";

const AthleteFamilyData: React.FC<any> = (props) => {

    const onChange = (e: any) => {
        props.onChange && props.onChange({name: e.target.name, value: e.target.value})
    }

    return (
        <>
            <Grid container item spacing={1}>
                <Grid item xs>
                    <TextField name="Name" label="Nombre" value={props.name} margin="dense" onChange={onChange} />
                </Grid>
                <Grid item xs>
                    <TextField name="FirstSurname" label="Primer Apellido" value={props.firstSurname} margin="dense" onChange={onChange} />
                </Grid>
                <Grid item xs>
                    <TextField name="SecondSurname" label="Segundo Apellido" value={props.secondSurname} margin="dense" onChange={onChange} />
                </Grid>
            </Grid>
            <Grid container item spacing={1}>
                <Grid item xs>
                    <TextField name="Dni" type="text" label="Dni" value={props.dni} error={props.touchedDni && props.errorsDni} margin="dense" onChange={onChange}
                        onBlur={() => {
                            if (props.dniOnBlur){
                                props.dniOnBlur()
                            }
                        }} 
                    />
                </Grid>
                <Grid item xs>
                    <TextField name="Mail" type="text" label="Email" value={props.mail} margin="dense" onChange={onChange} />
                </Grid>
            </Grid>
        </>
    )
}

export default React.memo(AthleteFamilyData)