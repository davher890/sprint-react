import * as React from "react";
import { Grid, TextField } from '@material-ui/core';

const CustomTextField: React.FC<any> = (props) => (

    <Grid container>
        <Grid item xs>
            <TextField 

                {...props}
            
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
        </Grid>
    </Grid>
)

export default React.memo(CustomTextField)