import * as React from "react";
import { TextField } from '@material-ui/core';

const CustomTextField: React.FC<any> = (props) => (

    <TextField 

        {...props}
        
        InputLabelProps={{
            shrink: true,
        }}
    
        // name={props.name}
        // label={props.label}
        // value={props.value} 
        // type={props.type}

        // error={props.error}
        
        // disabled={props.disabled}
        // fullWidth={props.fullWidth}
        // margin={props.margin}
        // multiline={props.multiline}

        // Events
        // onChange={props.onChange} 
        // onBlur={props.onBlur}

        // inputProps={{style: {fontSize: 16}}}

    />
)

export default React.memo(CustomTextField)