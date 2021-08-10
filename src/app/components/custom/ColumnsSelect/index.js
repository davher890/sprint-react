import React from "react";

import Grid from '@material-ui/core/Grid';

import Card from '../Card'
import MultiSelect from '../MultiSelect'
import Button from '../Button'

export default (props) => {

    return (
        <Card title="Selecciona las columnas" >
            <Grid container direction="row" spacing={0} justifyContent="flex-start" alignItems="flex-start">
                <Grid item>
                    <MultiSelect columns={props.columns} changeEvent={props.changeEvent} />
                </Grid>
                {props.downloadData ?
                    <Grid item>
                        <Button text="Descargar Excel" onClick={props.downloadData} />
                    </Grid> : null
                }
            </Grid>
        </Card>
    ) 
}