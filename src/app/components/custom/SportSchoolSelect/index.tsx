import * as React from "react"
// import { withRouter } from 'react-router-dom';

import { Grid } from '@material-ui/core';

import Select from '../Select'

// Redux
import { connect } from "react-redux";
import { getAllSportSchools } from "../../../redux/actions/sportSchools";

const SportSchoolSelect: React.FC<any> = (props) => {

    const [sportSchoolId, setSportSchoolId] = React.useState<number>(props.sportSchoolId)

    React.useEffect(() => {
        if (props.sportSchoolId !== sportSchoolId){
            setSportSchoolId(props.sportSchoolId)
        }
        props.getAllSportSchools()
    }, [props.sportSchoolId, props.getAllSportSchools, sportSchoolId])

    const onChange = (value: String, item: any) => {
        if (props.onChange){
            if (item){
                props.onChange(item.id)
            }
            else {
                props.onChange(null)
            }
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

const mapStateToProps = (state: any) => {
    return {
        sportSchools: state.sport_school_reducer.sport_schools,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SportSchoolSelect);