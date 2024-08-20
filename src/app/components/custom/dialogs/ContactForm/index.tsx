import React from 'react';
import { 
    Container,
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Box 
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { connect } from "react-redux";

import { contact } from '../../../../redux/actions/contact'
import TextField from '../../TextField'
import Button from '../../Button'

const validationSchema = Yup.object({
    subject: Yup.string()
        .required('El asunto es obligatorio'),
    email: Yup.string()
        .email('Debe ser un correo electrónico válido')
        .required('El correo electrónico es obligatorio'),
    message: Yup.string()
        .required('El mensaje es obligatorio'),
})

const ContactFormDialog: React.FC<any> = (props) => {

    const close = () => {
        if (props.onClose) {
            props.onClose()
        }
    }
    
    const submit = (from: string, subject: string, message: string) => {
        props.contact(from, subject, message).then(() => {
            close()
        })
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            subject: '',
            message: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            close()
            submit(values.email, values.subject, values.message)
        }
    })

    return (
        <Dialog open={props.open} onClose={() => {
            close()
        }}>
        <DialogTitle>Contáctanos</DialogTitle>
        <DialogContent>
            <Box component="form" onSubmit={formik.handleSubmit}>
                <Container component="main" maxWidth="xs">
                    <TextField 
                        fullWidth
                        id="email" 
                        name="email"
                        label="Correo Electrónico"
                        margin="normal"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField 
                        fullWidth
                        id="subject" 
                        name="subject"
                        label="Asunto" 
                        margin="normal"
                        value={formik.values.subject}
                        onChange={formik.handleChange}
                        error={formik.touched.subject && Boolean(formik.errors.subject)}
                        helperText={formik.touched.subject && formik.errors.subject}
                    />
                    <TextField 
                        fullWidth
                        id="message" 
                        name="message"
                        label="Message"
                        margin="normal"
                        multiline 
                        rows={4}
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        error={formik.touched.message && Boolean(formik.errors.message)}
                        helperText={formik.touched.message && formik.errors.message}
                    />
                    <DialogActions>
                        <Button onClick={() => close()} variant="contained" fullWidth>Cancel</Button>
                        <Button type="submit" variant="contained" fullWidth>Send</Button>
                    </DialogActions>
                </Container>
            </Box>
        </DialogContent>
        </Dialog>
    );
};

const mapDispatchToProps = {
    contact, 
}

const mapStateToProps = (state: any) => {
    return { 
        signup: state.auth_reducer.signup
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactFormDialog)
