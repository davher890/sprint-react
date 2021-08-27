import React, { useState, useEffect } from 'react';
import { Grid, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, List, ListItem } from '@material-ui/core';

export default (props) => {

    const [value, setValue] = useState(props.value || "");
    
    const onChange = (event) => {
        setValue(event.target.value)
        props.onChange(event)
    }

    useEffect(() => {
        if (props.value !== value){
            setValue(props.value)
        }
    }, [props.value, value])

    const getFormControlLabel = (id, name) => {
        return <FormControlLabel value={id.toString()} control={<Radio checked={value === id.toString()}/>} label={name} />
    }

    return (
        <Grid container>
            <Grid item xs>
                <FormControl component="fieldset">
                    <FormLabel component="legend">{props.title}</FormLabel>
                    <RadioGroup onChange={onChange}
                        style={{maxHeight: 200, overflow: 'auto'}}>
                        <List children={
                                props.options.map(opt => {
                                    return <ListItem key={opt.id.toString()}>{getFormControlLabel(opt.id, opt.name)}</ListItem>
                                })
                            }>
                        </List>
                    </RadioGroup>
                </FormControl>
            </Grid>
        </Grid>
    )
}