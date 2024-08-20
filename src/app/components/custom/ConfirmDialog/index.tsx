import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const ConfirmDialog: React.FC<any> = (props) => {

	const [open, setOpen] = React.useState<boolean>(props.open || false)

    React.useEffect(() => {
        setOpen(props.open)
    }, [props.open])

	return (
		<Dialog maxWidth="xl" open={open} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Esta acción necesita confirmación</DialogTitle>
			<DialogContent>
			</DialogContent>
			<DialogActions>
				<Button color="primary" variant="contained" onClick={() => {
					if (props.cancel){
						props.cancel()
					}
				}}>Cancelar</Button>
				<Button color="secondary" variant="contained" onClick={() => {
					if (props.confirm){
						props.confirm()
					}
				}}>Aceptar</Button>
		</DialogActions>
		</Dialog>
	)
}

export default ConfirmDialog;