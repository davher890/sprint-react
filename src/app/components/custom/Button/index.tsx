import React from "react";

import {
    Button
} from "@mui/material";

const CustomButton: React.FC<any> = (props) => {

    return (
        <Button 
            color="secondary" { ...props }/>
    )
}

export default CustomButton;