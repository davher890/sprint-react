import React, { useState } from "react";

import {Grid, Dialog, DialogContent, DialogTitle, DialogActions} from '@material-ui/core';

import MultiSelect from '../MultiSelect'
import Button from '../DownloadButton'
import SelectButton from '../SelectButton'

export default (props) => {

    const [openDialog, setOpenDialog] = useState(false)

    return (
        
        <Grid container>
            <Grid item xs>
                <SelectButton text={'Seleccionar columnas'} onClick={() => { setOpenDialog(true) }} />
            </Grid>
            { props.downloadData ?
            <Grid item xs>
                <Button text="Descargar Excel" onClick={(props.downloadData)} />
            </Grid> : null
            }

            <Dialog fullWidth={true} maxWidth="xl" open={openDialog} aria-labelledby="form-dialog-title"
                onClose={() => {
                    setOpenDialog(false)
                }}
            >
                <DialogTitle id="form-dialog-title">Seleccionar columnas</DialogTitle>
                <DialogContent>
                    <Grid container direction="row" spacing={2} justifyContent="flex-start" alignItems="flex-start">
                        <Grid item xs>
                            <MultiSelect columns={props.columns} changeEvent={props.changeEvent} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpenDialog(false) }} color="secondary" text="Cerrar" />
                </DialogActions>
            </Dialog>
        </Grid>
    ) 
}