import * as React from "react";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const Select: React.FC<any> = (props) => {
    
    if (props.options && props.options.length > 0){
        return (
            <Autocomplete
                {...props}
                id={props.name}
                // name={name}
                options={props.options}
                
                getOptionLabel={(option: any) => {
                    console.log(option)
                    return option.name
                    // if (option){
                    //     return props.options.find((e: {id: string, name: string}) => e.id === option).name
                    // }
                    // else {
                    //     return "";
                    // }
                }}
                // getItemValue={(item: any) => item.label}

                getOptionSelected={(option: {id: string, name: string}, value) => option.id === value.id}
                value={
                    {id: props.value, name: props.options.find((e: { id: string }) => e.id === props.value) ? props.options.find((e: { id: string }) => e.id === props.value).name : ''}
                }
                onChange={props.onChange}
                renderInput={(params) => 
                    <TextField {...params} label={props.label} error={props.error} InputLabelProps={props.InputLabelProps}
                    />
                }
                fullWidth={props.fullWidth}

                
            />
        )
    }
    else {
        return null
    }

}
export default Select


