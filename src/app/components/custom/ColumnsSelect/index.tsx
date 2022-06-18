import React, { useState } from "react";

import {Grid, Dialog, DialogContent, DialogTitle, DialogActions, Button} from '@material-ui/core';

import MultiSelect from '../MultiSelect'
import SelectButton from '../SelectButton'

const ColumnsSelect: React.FC<any> = (props) => {

    const [openDialog, setOpenDialog] = useState(false)

    const changeEvent = (left: any, right: any) => {
        if (props.changeEvent){
            props.changeEvent(left.map((c: any) => { c.show = false; return c; }).concat(right.map((c: any) => { c.show = true; return c; })))
        }
    }

    return (
        <Grid container item xs>
            <SelectButton onClick={() => { setOpenDialog(true) }}>Seleccionar columnas</SelectButton>

            <Dialog fullWidth={true} maxWidth="xl" open={openDialog} aria-labelledby="form-dialog-title"
                onClose={() => {
                    setOpenDialog(false)
                }}
            >
                <DialogTitle id="form-dialog-title">Seleccionar columnas</DialogTitle>
                <DialogContent>
                    <Grid container direction="row" spacing={2} justifyContent="flex-start" alignItems="flex-start">
                        <Grid item xs>
                            <MultiSelect 
                                left={props.columns.filter((d: any) => d.show !== undefined && d.show === false)}
                                right={props.columns.filter((d: any) => d.show === undefined || d.show === true)}
                                changeEvent={changeEvent} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpenDialog(false) }}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    ) 
}

export default ColumnsSelect