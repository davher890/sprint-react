import * as React from "react";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const Select: React.FC<any> = (props) => {
    
    if (props.options && props.options.length > 0){
        return (
            <Autocomplete
                id={props.name}
                // name={name}
                options={props.options}
                
                getOptionLabel={(option: {id: string, name: string}) => option.name}
                // getItemValue={(item: any) => item.label}

                getOptionSelected={(option: {id: string, name: string}, value) => option.id === value.id}
                value={
                    {id: props.value, name: props.options.find((e: { id: string }) => e.id === props.value) ? props.options.find((e: { id: string }) => e.id === props.value).name : ''}
                }
                onChange={props.onChange}
                renderInput={(params) => 
                    <TextField {...params} label={props.label} error={props.error} 
                    />
                }
                fullWidth={props.fullWidth}

                // {...props}
            />
        )
    }
    else {
        return null
    }

}
export default Select


