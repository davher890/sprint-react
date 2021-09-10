import * as React from "react"
import { Container, Grid } from '@material-ui/core';

import { Formik } from 'formik';

import TextField from "../custom/TextField";
import Card from "../custom/Card";
import SaveButton from "../custom/SaveButton";

import { connect } from "react-redux";
import { addTrainer, getTrainer } from "../../redux/actions/trainers";

class ConnectedForm extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {};
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentDidMount(){
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            if (id) {
                this.props.getTrainer(id)
            }
        }
    }

    handleFormSubmit() {
        this.props.addTrainer(this.state);
    }

    render() {
        return (
            <Container fixed>
    	        <React.Suspense fallback={<div>Cargando...</div>}>
                    <Formik enableReinitialize
                        initialValues={{
                            id: this.props.trainer.id || 0,
                            name: this.props.trainer.name || '',
                            mail: this.props.trainer.mail || ''
                        }}
                        validate={(values) => {
                            let errors: any = {};

                            if (values.name === '') errors.name = true
                            if (values.mail === '') errors.mail = true

                            //check if my values have errors
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            this.setState(values)
                            setSubmitting(false);
                            this.handleFormSubmit()
                        }}
                    >
                    {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (

                        <form onSubmit={handleSubmit}>
                            <Grid container direction="column" spacing={3}>
                                <Grid item xs>
                                    <Card title="Datos del entrenador">
                                        <Grid container spacing={2}>
                                            <Grid item xs>
                                                <TextField name="name" label="Nombre" value={values.name} onChange={handleChange}
                                                    error={touched.name && errors.name} />
                                            </Grid>
                                            <Grid item xs>
                                                <TextField name="mail" label="Email" value={values.mail} onChange={handleChange}
                                                    error={touched.mail && errors.mail} />
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                                <Grid item xs>
                                    <SaveButton type="submit" disabled={isSubmitting}/>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                    </Formik>
                </React.Suspense>
            </Container>
        );
    }
}

const mapDispatchToProps = {
    addTrainer,
    getTrainer
}

const mapStateToProps = (state: any) => {
    return { 
        trainer: state.trainer_reducer.trainer
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedForm);
