import * as React from "react"

import { Grid } from '@material-ui/core';

import TextField from '../TextField'

const PhoneCard: React.FC<any> = (props) => {

    const [phone1, setPhone1] = React.useState<string>(props.phone1)
    const [phone2, setPhone2] = React.useState<string>(props.phone2)
    const [phone3, setPhone3] = React.useState<string>(props.phone3)

    React.useEffect(() => {
        setPhone1(props.phone1)
        setPhone2(props.phone2)
        setPhone3(props.phone3)
    }, [props.phone1, props.phone2, props.phone3])

    const onChangePhone1 = (e: any) => {
        if (props.onChange){
            props.onChange(e.target.value, phone2, phone3)
        }
    }

    const onChangePhone2 = (e: any) => {
        if (props.onChange){
            props.onChange(phone1, e.target.value, phone3)
        }
    }

    const onChangePhone3 = (e: any) => {
        if (props.onChange){
            props.onChange(phone1, phone2, e.target.value)
        }
    }

    return (
        <Grid container item spacing={1}>
            <Grid item xs>
                <TextField {...props} name="phone1" type="tel" value={phone1} label="Teléfono 1" onBlur={props.onBlur}
                    onChange={onChangePhone1} error={props.errorPhone1 || false}
                />
            </Grid>
            <Grid item xs>
                <TextField {...props} name="phone2" type="tel" value={phone2} label="Teléfono 2" onBlur={props.onBlur}
                    onChange={onChangePhone2} error={props.errorPhone2 || false}
                />
            </Grid>
            <Grid item xs>
                <TextField {...props} name="phone3" type="tel" value={phone3} label="Teléfono 3" onBlur={props.onBlur}
                    onChange={onChangePhone3} error={props.errorPhone3 || false}
                />
            </Grid>
        </Grid>
    )
}

export default PhoneCard;