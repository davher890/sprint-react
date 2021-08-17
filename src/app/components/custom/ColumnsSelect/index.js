import React from "react";

import Grid from '@material-ui/core/Grid';

import Card from '../Card'
import MultiSelect from '../MultiSelect'
import Button from '../Button'

export default (props) => {

    return (
        <Card title="Selecciona las columnas" >
            <Grid container direction="row" spacing={2} justifyContent="flex-start" alignItems="flex-start">
                <Grid item xs>
                    <MultiSelect columns={props.columns} changeEvent={props.changeEvent} />
                </Grid>
                { props.downloadData ?
                <Grid item xs>
                    <Button text="Descargar Excel" onClick={props.downloadData} />
                </Grid> : null
                }
            </Grid>
        </Card>
    ) 
}