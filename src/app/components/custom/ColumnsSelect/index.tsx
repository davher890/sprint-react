import React, { useState } from "react";

import {Grid, Dialog, DialogContent, DialogTitle, DialogActions, Button} from '@material-ui/core';

import MultiSelect from '../MultiSelect'
import DownloadButton from '../DownloadButton'
import SelectButton from '../SelectButton'

const ColumnsSelect: React.FC<any> = (props) => {

    const [openDialog, setOpenDialog] = useState(false)

    return (
        <Grid container>
            <Grid item xs>
                <SelectButton onClick={() => { setOpenDialog(true) }}>Seleccionar columnas</SelectButton>
            </Grid>
            { props.showDownloadData ?
            <Grid item xs>
                <DownloadButton onClick={(props.downloadData)}>Descargar Excel</DownloadButton>
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
                    <Button onClick={() => { setOpenDialog(false) }}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    ) 
}

export default ColumnsSelect