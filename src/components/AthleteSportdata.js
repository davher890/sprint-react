import React, { Component } from "react";

import Table from "./custom/Table";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import SubmitButton from './custom/SubmitButton'
import Button from './custom/Button'

import { Formik } from 'formik';

class AthleteSportdata extends Component {

	constructor(props) {
        super(props)

        this.state = {
            athleteId: this.props.id,
        	columns : [
        		{ dataField: 'id', text: 'id' },
        		{ dataField: 'season', text: 'Temporada', show: true },
        		{ dataField: 'category', text: 'Categoría', show: true },
        		{ dataField: 'attitude', text: 'Actitud', show: true },
        		{ dataField: 'implication', text: 'Implicación', show: true },
        		{ dataField: 'technicalLevel', text: 'Nivel técnico', show: true },
        		{ dataField: 'motivations', text: 'Motivaciones', show: true },
        		{ dataField: 'outstandingResults', text: 'Resultados destacados', show: true },
        		{ dataField: 'injuries', text: 'Lesiones', show: true }
    		],
            entityName : 'athletes/' + this.props.id + '/sportdata'
        }
        this.child = React.createRef();

        this.saveData = this.saveData.bind(this)
        this.onRowClick = this.onRowClick.bind(this)
        this.cleanForm = this.cleanForm.bind(this)
    }

    saveData(data){

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        }
        fetch(process.env.REACT_APP_SERVER_URL + "/sportdata", requestOptions)
            .then(res => res.json())
            .then(data => {
                // To refresh de table
                this.child.current.refresh();
                this.cleanForm()
            })
    }

    onRowClick(e, row, rowIndex){

        this.setState({
            id: row.id,
            athleteId: row.athleteId,
            season: row.season,
            attitude: row.attitude,
            implication: row.implication,
            technicalLevel: row.technicalLevel,
            motivations: row.motivations,
            outstandingResults: row.outstandingResults,
            injuries: row.injuries
        })
    }

    cleanForm(){

        this.setState({
            id: 0,
            // athleteId: row.athleteId,
            season: new Date().getFullYear(),
            attitude: '',
            implication: '',
            technicalLevel: '',
            motivations: '',
            outstandingResults: '',
            injuries: ''
        })
    }

    render() {
    
        return (
        	<Grid container direction="column">
                <Grid item xs>
                    <Table
                        ref={this.child} 
                        columns={this.state.columns} 
                        entityName={this.state.entityName}
                        showColumns={false}
                        onRowClick={this.onRowClick}
                    >
                    </Table>
                </Grid>
            
                <Formik enableReinitialize
                    initialValues={{
                        id: this.state.id || 0,
                        athleteId: this.state.athleteId,
                        season: this.state.season || new Date().getFullYear(),
                        attitude: this.state.attitude || '',
                        implication: this.state.implication || '',
                        technicalLevel: this.state.technicalLevel || '',
                        motivations: this.state.motivations || '',
                        outstandingResults: this.state.outstandingResults || '',
                        injuries: this.state.injuries || ''
                    }}
                    validate={(values) => {
                        let errors = {};

                        Object.keys(values).forEach(value => {
                            if((values[value] === '')){
                                errors[value] = true;
                            }
                        })

                        //check if my values have errors
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        this.setState(values)
                        setSubmitting(false);
                        this.saveData()
                    }}
                    >
                    {({ handleSubmit, values, touched, setFieldValue, errors, handleChange }) => (

                        <form onSubmit={handleSubmit}>
                            <Grid item xs>
                                <TextField name="season" label="Temporada" value={values.season} type="number"
                                    error={touched.season && errors.season} onChange={handleChange} />
                                <TextField name="attitude" label="Actitud" value={values.attitude}
                                    error={touched.attitude && errors.attitude} onChange={handleChange} />
                                <TextField name="implication" label="Implicación" value={values.implication}
                                    error={touched.implication && errors.implication} onChange={handleChange} />
                                <TextField name="technicalLevel" label="Nivel técnico" value={values.technicalLevel}
                                    error={touched.technicalLevel && errors.technicalLevel} onChange={handleChange} />
                                <TextField name="motivations" label="Motivaciones" value={values.motivations}
                                    error={touched.motivations && errors.motivations} onChange={handleChange} />
                                <TextField name="outstandingResults" label="Resultados destacados" value={values.outstandingResults}
                                    error={touched.outstandingResults && errors.outstandingResults} onChange={handleChange} />
                                <TextField name="injuries" label="Lesiones" value={values.injuries}
                                    error={touched.injuries && errors.injuries} onChange={handleChange} />
                            </Grid>
                            <Grid item xs>
                                <SubmitButton/>
                            </Grid>
                            <Grid item xs>
                                <Button text="Reset" color="secondary" onClick={this.cleanForm}/>
                            </Grid>
                        </form>
                    )}
                </Formik>
            </Grid>
    	)
    }
}

export default AthleteSportdata;
