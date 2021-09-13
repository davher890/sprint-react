import * as React from "react"
import { withRouter } from 'react-router-dom';

import { Grid } from '@material-ui/core';

import Select from '../Select'

// Redux
import { connect } from "react-redux";
import { getAllTrainers } from "../../../redux/actions/trainers";

const TrainerSelect: React.FC<any> = (props) => {

    const [trainerId, setTrainerId] = React.useState<number>(props.trainerId)

    React.useEffect(() => {
        if (props.trainerId !== trainerId){
            setTrainerId(props.trainerId)
        }
        props.getAllTrainers()
    }, [props.trainerId, props.getAllTrainers, trainerId])

    const onChange = (value: String, item: any) => {
        if (props.onChange){
            props.onChange(item.id)
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
    getAllTrainers
}

const mapStateToProps = (state: any) => {
    return {
        trainers: state.trainer_reducer.trainers,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(TrainerSelect));