import * as React from "react"

import { Alert } from '@material-ui/lab';

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
            // if (props.sportSchoolId > 0){
            //     props.getSportSchoolTrainers(props.sportSchoolId)
            // }
        }
        
    }, [props.trainerId, props.sportSchoolId])

    React.useEffect(() => {
        if (sportSchoolId > 0){
            props.getSportSchoolTrainers(sportSchoolId)
        }
    }, [sportSchoolId])

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
        <>
            { props.trainers && props.trainers.length > 0 ?
                <Select name="trainerId" label="Entrenador" 
                    options={props.trainers} value={trainerId}
                    error={props.error} onChange={onChange}
                />
            :
                <Alert severity="error">No existen entrenadores. Es necesario crear al menos una para poder continuar. Grupos de entrenamiento - Entrenadores</Alert>
            }
        </>
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