import * as React from "react"
// import { withRouter } from 'react-router-dom';

import RadioList from '../RadioList';
import { Grid } from '@material-ui/core';

// Redux
import { connect } from "react-redux";
import { getSportSchoolGroups } from "../../../redux/actions/sportSchools";

const GroupSelect: React.FC<any> = (props) => {

    React.useEffect(() => {
        if (props.sportSchoolId){
            props.getSportSchoolGroups(props.sportSchoolId)
        }
    }, [props.sportSchoolId])

    const groupOnChange = (groupId: number, specialization: boolean) => {
        if (props.onChange){
            props.onChange(groupId, specialization)
        }
    }

    const getGroups = (specialization: boolean) =>{
        return props.groups.filter((gr: any) => {
            return gr.specialization === specialization
        })
    }
    
    return (
        <Grid container direction="row" spacing={3}>
            { props.sportSchoolId > 0 && <>
                <Grid item xs>
                    <RadioList title="Especialización"
                        disabled={props.disabled || false}
                        options={getGroups(true)}
                        value={props.groupId}
                        onChange={(value: number) => {
                            groupOnChange(value, true)
                        }}
                    />
                </Grid>
                <Grid item xs>
                    <RadioList title="No especialización"
                        disabled={props.disabled || false}
                        options={getGroups(false)}
                        value={props.groupId}
                        onChange={(value: number) => {
                            groupOnChange(value, false)
                        }}
                    />
                </Grid>
            </>
            }
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