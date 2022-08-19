import * as React from "react"
// import { withRouter } from 'react-router-dom';

import RadioList from '../RadioList';
import { Grid } from '@material-ui/core';

// Redux
import { connect } from "react-redux";
import { getSportSchoolGroups } from "../../../redux/actions/sportSchools";

const GroupSelect: React.FC<any> = (props) => {

    const [sportSchoolId, setSportSchoolId] = React.useState(props.sportSchoolId)
    const [groupId, setGroupId] = React.useState(props.groupId)

    React.useEffect(() => {
        if (sportSchoolId !== props.sportSchoolId){
            setSportSchoolId(props.sportSchoolId)
            props.getSportSchoolGroups(props.sportSchoolId)
        }
        if (groupId !== props.groupId){
            setGroupId(props.groupId)
        }
    }, [props.sportSchoolId, props.groupId, sportSchoolId, groupId])

    const groupOnChange = (groupId: number, specialization: boolean) => {
        if (props.onChange){
            props.onChange(groupId, specialization)
        }
        else {
            setGroupId(groupId)
        }
    }

    const getGroups = (specialization: boolean) =>{
        return props.groups.filter((gr: any) => {
            return gr.specialization === specialization
        })
    }
    
    return (
        <Grid container direction="row" spacing={3}>
            {/* { getGroups(true).length > 0 ? */}
            <Grid item xs>
                <RadioList title="Especialización"
                    disabled={props.disabled || false}
                    options={getGroups(true)}
                    value={groupId}
                    onChange={(value: number) => {
                        groupOnChange(value, true)
                    }}
                />
            </Grid>
            {/* : null } */}
            {/* { getGroups(false).length > 0 ? */}
            <Grid item xs>
                <RadioList title="No especialización"
                    disabled={props.disabled || false}
                    options={getGroups(false)}
                    value={groupId}
                    onChange={(value: number) => {
                        groupOnChange(value, false)
                    }}
                />
            </Grid>
            {/* : null } */}
        </Grid>
    )

}

const mapDispatchToProps = {
    getSportSchoolGroups
}

const mapStateToProps = (state: any) => {
    return {
        groups: state.group_reducer.groups
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupSelect);