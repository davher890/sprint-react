import * as React from "react";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

type Props = {
    name: string, 
    value: any, 
    options: any[], 
    onChange: any, 
    label: string, 
    error?: any,
    fullWidth?: boolean
}
const Select: React.FC<Props> = ({ name, value, options, onChange, label, error, fullWidth }) => {
    
    if (options && options.length > 0){
        return (
            <Autocomplete
                id={name}
                // name={name}
                options={options}
                
                getOptionLabel={(option: {id: string, name: string}) => option.name}
                // getItemValue={(item: any) => item.label}

                getOptionSelected={(option: {id: string, name: string}, value) => option.id === value.id}
                value={
                    {id: value, name: options.find((e: { id: string }) => e.id === value) ? options.find((e: { id: string }) => e.id === value).name : ''}
                }
                onChange={onChange}
                renderInput={(params) => 
                    <TextField {...params} label={label} error={error} 
                    />
                }
                fullWidth={fullWidth}

                // {...props}
            />
        )
    }
    else {
        return null
    }

}
export default Select


