import React, { useState, useEffect } from 'react';
import { Grid, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, List, ListItem } from '@material-ui/core';

const RadioList: React.FC<any> = (props) => {

    const [value, setValue] = useState<any | null>(props.value || "");
    
    const onChange = (event: any) => {
        setValue(event.target.value)
        props.onChange(event)
    }

    useEffect(() => {
        if (props.value !== value){
            setValue(props.value)
        }
    }, [props.value, value])

    const getFormControlLabel = (id: any, name: any) => {
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
                                props.options.map((opt: any) => {
                                    return <ListItem key={opt.id.toString()}>{getFormControlLabel(opt.id, opt.name)}</ListItem>
                                })
                            }/>
                    </RadioGroup>
                </FormControl>
            </Grid>
        </Grid>
    )
}

export default RadioList