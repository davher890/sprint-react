import React from 'react'

import moment, { Moment } from 'moment'

import { TextField } from '@material-ui/core';

import utils from "../../../utils/Functions"

const DateField: React.FC<any> = (props) => {

    const [dateStr, setDateStr] = React.useState<string>(utils.localDatetoStr(props.value))

    React.useEffect(() => {
        setDateStr(utils.localDatetoStr(props.value))
    }, [ props.value ])

    // console.log(props.value, utils.localDatetoStr(props.value))
	return (
        <TextField value={dateStr} margin="dense"
            InputProps={{inputProps: { min: props.min || "1940-01-01", max: props.max || "2200-01-01"} }}                                             
            label={props.label} type="date" error={props.error}
            onChange={(e: any) => {
                setDateStr(e.target.value)
            }}
            onBlur={(e: any) => {
                if (props.onChange){
                    let d: Moment = moment(e.target.value, "YYYY-MM-DD")
                    props.onChange(utils.dateToLocalDate(d.toDate()))
                }
            }}
        />
    )
}

export default React.memo(DateField)