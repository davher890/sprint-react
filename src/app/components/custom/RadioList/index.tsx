import React, { useState, useEffect } from 'react';
import { Grid, Radio, RadioGroup, FormControlLabel, List, ListItem, Typography } from '@mui/material';
import { Alert } from '@mui/lab';

const RadioList: React.FC<any> = (props) => {

    const [value, setValue] = useState<number | 0>(props.value || 0);
    // const [name, setName] = useState<string | null>(null);
    const [options, setOptions] = useState<any[] | []>(props.options);
    
    const onChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
        setValue(parseInt(value))
        props.onChange(value)
        // let val = props.options.find((d: {id: number, name: string}) => d.id === parseInt(value))
        // setName(val.name)
    }

    useEffect(() => {
        if (JSON.stringify(props.options) !== JSON.stringify(options)){
            setOptions(props.options)
        }
    }, [props.options, options])

    useEffect(() => {
        if (props.value !== value){
            setValue(parseInt(props.value))
            // let val = options.find((d: {id: number, name: string}) => d.id === parseInt(props.value))
            // console.log('v', props.value, val)
            // if (val){
            //     setName(val.name)
            // }
            // else {
            //     setName(null)
            // }
        }
    }, [props.value, value])

    const getName = (options: any[], id: number) => {
        return options.find((d: {id: number, name: string}) => d.id === id)?.name
    }

    const getFormControlLabel = (id: number, name: string) => {
        return <FormControlLabel disabled={props.disabled || false} value={id} control={<Radio checked={value === id}/>} label={name} />
    }

    if (options && options.length > 0){
        return (
            <Grid container spacing={3} direction="column">
                <Grid item xs>
                    <Typography variant="subtitle1" gutterBottom component="div">
                        {props.title}
                    </Typography>
                </Grid>
                { getName(options, value) &&
                    <Grid item xs>
                        <Alert severity="info">{getName(options, value)}</Alert>
                    </Grid>
                }
                <Grid item xs>
                    <RadioGroup onChange={onChange}
                        style={{maxHeight: 200, overflow: 'auto'}}>
                        <List children={
                                options.map((opt: {id: number, name: string}) => {
                                    return <ListItem key={opt.id}>{getFormControlLabel(opt.id, opt.name) }</ListItem>
                                })
                            }/>
                    </RadioGroup>
                </Grid>
            </Grid>
        )
    }
    else {
        return <div/>
    }
}

export default RadioList