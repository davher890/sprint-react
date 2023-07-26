import * as React from "react"

import Select from '../Select'

// Redux
import { connect } from "react-redux";
import { getSportSchoolFeeTypes } from "../../../redux/actions/sportSchools";

const FeeTypeSelect: React.FC<any> = (props) => {

    const [feeType, setFeeType] = React.useState<string>(props.feeType)

    React.useEffect(() => {
        if (props.sportSchoolId){
            props.getSportSchoolFeeTypes(props.sportSchoolId)
        }
    }, [props.sportSchoolId])

    React.useEffect(() => {
        setFeeType(props.feeType)
    }, [props.feeType])

    const onChange = ((e: any, value: any) => {
        if (props.onChange){
            props.onChange(value ? value.id : null)
        }
    })
    
    return (
        <Select fullWidth name="feeType" label="Tipo de cuota"
            options={props.fee_types} value={feeType} 
            error={props.error} onChange={onChange}
        />
    )
}

const mapDispatchToProps = {
    getSportSchoolFeeTypes
}

const mapStateToProps = (state: any) => {
    return {
        fee_types: state.sport_school_reducer.fee_types
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeeTypeSelect);