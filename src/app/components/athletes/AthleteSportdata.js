import React, { Component } from "react";

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import SubmitButton from '../custom/SubmitButton'
import Button from '../custom/Button'
import Table from "../custom/Table_copy";

import Utils from "../../utils/TableUtils";

import { Formik } from 'formik';

import { connect } from "react-redux";
import { getAthleteTableSportdataTable, addSportdata } from "../../redux/actions/athletes";

class AthleteSportdata extends Component {

	constructor(props) {
        super(props)

        this.state = {
            athleteId: this.props.id,
        	columns : Utils.getSportdataColumns(),
        }

        this.saveData = this.saveData.bind(this)
        this.onRowClick = this.onRowClick.bind(this)
        this.cleanForm = this.cleanForm.bind(this)
    }

    componentDidMount() {
        if (this.props && this.props.id) {
            let id = this.props.id
            this.props.getAthleteTableSportdataTable(id);
        }
	}

    saveData(){
        this.props.addSportdata(this.state).then(() => this.props.getAthleteTableSportdataTable(this.props.id))
    }

    onRowClick(id, row){

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
                        data={this.props.table_data}
                        page={this.props.page}
                        size={this.props.size}
                        total={this.props.total}
                        columns={this.state.columns} 
                        showColumns={false}
                        onRowClick={this.onRowClick}
                    >
                    </Table>
                </Grid>
            
                <Grid item xs>
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
                                {/* <CustomCard> */}
                                    <Grid container direction="column" spacing={5}>
                                        <Grid container item spacing={1}>
                                            <Grid item xs>
                                                <TextField name="season" label="Temporada" value={values.season} type="number"
                                                    error={touched.season && errors.season} onChange={handleChange} />
                                            </Grid>
                                            <Grid item xs>
                                                <TextField name="attitude" label="Actitud" value={values.attitude}
                                                    error={touched.attitude && errors.attitude} onChange={handleChange} />
                                            </Grid>
                                            <Grid item xs>
                                                <TextField name="implication" label="Implicación" value={values.implication}
                                                    error={touched.implication && errors.implication} onChange={handleChange} />
                                            </Grid>
                                            <Grid item xs>
                                                <TextField name="technicalLevel" label="Nivel técnico" value={values.technicalLevel}
                                                    error={touched.technicalLevel && errors.technicalLevel} onChange={handleChange} />
                                            </Grid>
                                        </Grid>
                                        <Grid container item spacing={1}>
                                            <Grid item xs={3}>
                                                <TextField name="motivations" label="Motivaciones" value={values.motivations}
                                                    error={touched.motivations && errors.motivations} onChange={handleChange} />
                                            </Grid>
                                            <Grid item xs={3}>
                                                <TextField name="outstandingResults" label="Resultados destacados" value={values.outstandingResults}
                                                    error={touched.outstandingResults && errors.outstandingResults} onChange={handleChange} />
                                            </Grid>
                                            <Grid item xs={3}>
                                                <TextField name="injuries" label="Lesiones" value={values.injuries}
                                                    error={touched.injuries && errors.injuries} onChange={handleChange} />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={1}>
                                            <Grid item xs={3}>
                                                <SubmitButton/>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Button text="Reset" color="secondary" onClick={this.cleanForm}/>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                {/* </CustomCard> */}
                            </form>
                        )}
                    </Formik>
                </Grid>
            </Grid>
    	)
    }
}

function mapStateToProps(state) {
	return {
		table_data: state.table_reducer.table_data,
		page: state.table_reducer.page,
		size: state.table_reducer.size,
		total: state.table_reducer.total,
        sportdata: state.athlete_reducer.athlete_sportdata
	};
}

const mapDispatchToProps = {
    getAthleteTableSportdataTable, addSportdata
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AthleteSportdata);