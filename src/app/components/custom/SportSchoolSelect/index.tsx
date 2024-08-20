import * as React from "react"

import { Alert } from '@mui/lab';

import Select from '../Select'

// Redux
import { connect } from "react-redux";
import { getAllSportSchools } from "../../../redux/actions/sportSchools";

const SportSchoolSelect: React.FC<any> = (props) => {

    const [sportSchoolId, setSportSchoolId] = React.useState<number>(props.sportSchoolId)

    React.useEffect(() => {
        props.getAllSportSchools()
    }, [])

    React.useEffect(() => {
        if (props.sportSchoolId !== sportSchoolId){
            setSportSchoolId(props.sportSchoolId)
        }
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
        <>
            { props.sportSchools && props.sportSchools.length > 0 ?
                <Select {...props}
                    name="sportSchoolId" label="Escuela Deportiva" 
                    options={props.sportSchools} value={sportSchoolId}
                    error={props.error} onChange={onChange}
                />
            :
                <Alert severity="error">No existen escuelas deportivas. Es necesario crear al menos una para poder continuar. Escuelas - Nueva escuela deportiva</Alert>
            }
        </>
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