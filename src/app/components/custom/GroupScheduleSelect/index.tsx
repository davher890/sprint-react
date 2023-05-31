import * as React from "react"
// import { withRouter } from 'react-router-dom';

import ScheduleSelect from '../ScheduleSelect';
import GroupSelect from '../GroupSelect';
import { Grid } from '@material-ui/core';

// Redux
import { connect } from "react-redux";
import { getGroupSchedules } from "../../../redux/actions/groups";

const GroupScheduleSelect: React.FC<any> = (props) => {

    React.useEffect(() => {
        if (props.groupId > 0){
            props.getGroupSchedules(props.groupId)
        }
    }, [props.groupId])

    React.useEffect(() => {
        let groupScheduleIds = props.group_schedules.map((d: {id: number}) => d.id)
        let schIds = []
        if (props.specialization){
            schIds = groupScheduleIds
        }
        else {
            const result = props.scheduleIds.every((val:number) => groupScheduleIds.includes(val));
            if (result){
                schIds = props.scheduleIds
            }
        }
        if (props.onChange){
            props.onChange(props.groupId, props.specialization, schIds)
        }
        if (props.onGroupChange){
            props.onGroupChange(props.groupId, props.specialization)
        }
        if (props.onScheduleChange){
            props.onScheduleChange(schIds)
        }
    }, [props.group_schedules])

    return (
        <Grid container item direction="row" spacing={2}>
            <Grid item xs>
                <GroupSelect
                    disabled={props.disabled || false}
                    sportSchoolId={props.sportSchoolId}
                    groupId={props.groupId}
                    onChange={(grId: number, spec: boolean) => {
                        props.getGroupSchedules(grId)
                        if (props.onChange){
                            props.onChange(grId, spec, props.scheduleIds)
                        }
                        if (props.onGroupChange){
                            props.onGroupChange(grId, spec)
                        }
                    }}
                />
            </Grid>
            <Grid item xs={3}>
                <ScheduleSelect
                    disabled={props.disabled || false}
                    schedules={props.group_schedules}
                    scheduleIds={props.scheduleIds}
                    specialization={props.specialization}
                    onChange={(scheduleIds: number[]) => {
                        if (props.onChange){
                            props.onChange(props.groupId, props.specialization, scheduleIds)
                        }
                        if (props.onScheduleChange){
                            props.onScheduleChange(scheduleIds)
                        }
                    }}
                />
            </Grid>
        </Grid>
    )
}

const mapDispatchToProps = {
    getGroupSchedules
}

const mapStateToProps = (state: any) => {
    return {
        group_schedules: state.group_reducer.group_schedules
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupScheduleSelect);