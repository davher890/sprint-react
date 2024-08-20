import * as React from "react"

import { Grid } from '@mui/material';

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

const AthleteSportdata: React.FC<any> = (props) => {

    const [ data, setData ] = React.useState<any>({})

    React.useEffect(() => {
        if (props && props.id) {
            let id = props.id
            props.getAthleteTableSportdataTable(id);
        }
	}, [])

    const saveData = () => {
        props.addSportdata(data).then(() => props.getAthleteTableSportdataTable(props.id))
    }

    const onRowClick = (id: number, row: any) => {

        setData({
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

    const cleanForm = () => {

        setData({
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
    
    return (
        <Grid container direction="column">
            <Grid item xs>
                <Table
                    data={props.table_data}
                    page={props.page}
                    size={props.size}
                    total={props.total}
                    columns={Utils.getSportdataColumns()} 
                    showColumns={false}
                    onRowClick={onRowClick}
                >
                </Table>
            </Grid>
        
            <Grid item xs>
                <Formik enableReinitialize
                    initialValues={{
                        id: data.id || 0,
                        athleteId: data.athleteId,
                        season: data.season || new Date().getFullYear(),
                        attitude: data.attitude || '',
                        implication: data.implication || '',
                        technicalLevel: data.technicalLevel || '',
                        motivations: data.motivations || '',
                        outstandingResults: data.outstandingResults || '',
                        injuries: data.injuries || '',
                        observations: data.observations || '',
                        numCompetitions: data.numCompetitions || ''
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
                        setData(values)
                        setSubmitting(false);
                        saveData()
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
                                        <DeleteButton color="secondary" onClick={cleanForm}>Reset</DeleteButton>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <DeleteButton color="secondary" 
                                            onClick={() => {props.deleteSportdata(values.id).then(() => {
                                                props.getAthleteTableSportdataTable(data.athleteId);
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
