import React from "react";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default ({name, value, options, onChange, label, error }) => (
    <Autocomplete
        id={name}
        name={name}
        options={options}
        getOptionLabel={(option) => option.name}
        getOptionSelected={(option, value) => option.id === value.id}
        value={{id:value, name:options.find(e => e.id === value) ? options.find(e => e.id === value).name : ''}}
        onChange={onChange}
        renderInput={(params) => 
            <TextField {...params} label={label} error={error} 
            />
        }
    />
)


