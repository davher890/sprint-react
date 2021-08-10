import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';

import { Grid } from '@material-ui/core';

import Select from '../Select'

// Redux
import { connect } from "react-redux";
import { getAllSportSchools } from "../../../redux/actions/sportSchools";


const SportSchoolSelect = (props) => {

    const [sportSchoolId, setSportSchoolId] = useState(props.sportSchoolId)

    useEffect(() => {
        if (props.sportSchoolId !== sportSchoolId){
            setSportSchoolId(props.sportSchoolId)
        }
        props.getAllSportSchools()
    }, [props.sportSchoolId])

    const onChange = (e, value) => {
        if (props.onChange){
            props.onChange(value.id)
        }
    }

    return (
        <Grid container>
            <Grid item xs>
                <Select name="sportSchoolId" label="Escuela Deportiva" 
                    options={props.sportSchools} value={sportSchoolId}
                    error={props.error} onChange={onChange}
                />
            </Grid>
        </Grid>
    )
}


const mapDispatchToProps = {
    getAllSportSchools
}

const mapStateToProps = state => {
    return {
        sportSchools: state.sport_school_reducer.sport_schools,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(SportSchoolSelect));