import * as React from "react"

import { Grid } from '@material-ui/core';

import SaveButton from '../custom/SaveButton'
import DeleteButton from '../custom/DeleteButton'
import Table from "../custom/Table";
import TextField from "../custom/TextField"
import Utils from "../../utils/TableUtils";

import { Formik } from 'formik';

import { connect } from "react-redux";
import { getAthleteTableSportdataTable } from "../../redux/actions/athletes";
import { addSportdata } from "../../redux/actions/sportdata";
import { deleteSportdata } from "../../redux/actions/sportdata";

class AthleteSportdata extends React.Component<any, any> {

	constructor(props: any) {
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

    onRowClick(id: number, row: any){

        this.setState({
            id: row.id,
            athleteId: row.athleteId,
            season: row.season,
            attitude: row.attitude,
            implication: row.implication,
            technicalLevel: row.technicalLevel,
            motivations: row.motivations,
            outstandingResults: row.outstandingResults,
            injuries: row.injuries,
            observations: row.observations,
            numCompetitions: row.numCompetitions
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
            injuries: '',
            observations: '',
            numCompetitions: ''
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
                            injuries: this.state.injuries || '',
                            observations: this.state.observations || '',
                            numCompetitions: this.state.numCompetitions || ''
                        }}
                        validate={(values) => {
                            let errors: any = {};

                            if (values.season === '') errors.season = true;
                            if (values.attitude === '') errors.attitude = true;
                            if (values.implication === '') errors.implication = true;
                            if (values.technicalLevel === '') errors.technicalLevel = true;
                            if (values.motivations === '') errors.motivations = true;
                            if (values.outstandingResults === '') errors.outstandingResults = true;
                            if (values.injuries === '') errors.injuries = true;
                            if (values.observations === '') errors.observations = true
                            if (values.numCompetitions === '') errors.numCompetitions = true

                            //check if my values have errors
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            this.setState(values)
                            setSubmitting(false);
                            this.saveData()
                        }}
                        >
                        {({ handleSubmit, values, touched, errors, handleChange }) => (

                            <form onSubmit={handleSubmit}>
                                <Grid container direction="column" spacing={2}>
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
                                    <Grid container item spacing={1}>
                                        <Grid item xs>
                                            <TextField name="numCompetitions" label="Competiciones en la temporada" value={values.numCompetitions}
                                                error={touched.numCompetitions && errors.numCompetitions} onChange={handleChange} />
                                        </Grid>
                                        <Grid item xs>
                                            <TextField name="observations" label="Observaciones" value={values.observations}
                                                error={touched.observations && errors.observations} onChange={handleChange} />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1}>
                                        <Grid item xs={3}>
                                            <SaveButton type="submit"/>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <DeleteButton color="secondary" onClick={this.cleanForm}>Reset</DeleteButton>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <DeleteButton color="secondary" 
                                                onClick={() => {this.props.deleteSportdata(values.id).then(() => {
                                                    this.props.getAthleteTableSportdataTable(this.state.athleteId);
                                                })}}>Borrar</DeleteButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                </Grid>
            </Grid>
    	)
    }
}

function mapStateToProps(state: any) {
	return {
		table_data: state.table_reducer.table_data,
		page: state.table_reducer.page,
		size: state.table_reducer.size,
		total: state.table_reducer.total,
        sportdata: state.athlete_reducer.athlete_sportdata
	};
}

const mapDispatchToProps = {
    getAthleteTableSportdataTable, 
    addSportdata,
    deleteSportdata
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AthleteSportdata);