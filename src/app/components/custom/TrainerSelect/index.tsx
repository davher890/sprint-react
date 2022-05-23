import * as React from "react"
// import { withRouter } from 'react-router-dom';

import { Grid } from '@material-ui/core';

import Select from '../Select'

// Redux
import { connect } from "react-redux";
import { getSportSchoolTrainers } from "../../../redux/actions/sportSchools";

const TrainerSelect: React.FC<any> = (props) => {

    const [trainerId, setTrainerId] = React.useState<number>(props.trainerId)
    const [sportSchoolId, setSportSchoolId] = React.useState<number>(props.sportSchoolId)

    React.useEffect(() => {
        if (props.trainerId !== trainerId){
            setTrainerId(props.trainerId)
        }
        if (props.sportSchoolId !== sportSchoolId){
            setSportSchoolId(props.sportSchoolId)
            if (props.sportSchoolId > 0){
                props.getSportSchoolTrainers(props.sportSchoolId)
            }
        }
        
    }, [props.trainerId, props.sportSchoolId, trainerId, sportSchoolId])

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
                <Select name="trainerId" label="Entrenador" 
                    options={props.trainers} value={trainerId}
                    error={props.error} onChange={onChange}
                />
            </Grid>
        </Grid>
    )
}

const mapDispatchToProps = {
    getSportSchoolTrainers
}

const mapStateToProps = (state: any) => {
    return {
        trainers: state.trainer_reducer.trainers,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TrainerSelect);