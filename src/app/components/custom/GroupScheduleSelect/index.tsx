import * as React from "react"
// import { withRouter } from 'react-router-dom';

import ScheduleSelect from '../ScheduleSelect';
import GroupSelect from '../GroupSelect';
import { Grid } from '@material-ui/core';

// Redux
import { connect } from "react-redux";
import { getGroupSchedules } from "../../../redux/actions/groups";

const GroupScheduleSelect: React.FC<any> = (props) => {

    const [ specialization, setSpecialization ] = React.useState<boolean>(false)
    // const [ scheduleIds, setScheduleIds ] = React.useState<any[]>(props.scheduleIds)
    const [ groupId, setGroupId ] = React.useState<number>(props.groupId)

    // React.useEffect(() => {
    //     // if (props.scheduleIds){
    //         setScheduleIds(props.scheduleIds)
    //     // }
    // }, [props.scheduleIds])

    React.useEffect(() => {
        if (props.groupId > 0){
            props.getGroupSchedules(props.groupId)
        }
    }, [props.groupId])

    React.useEffect(() => {
        let groupScheduleIds = props.group_schedules.map((d: {id: number}) => d.id)
        let schIds = []
        if (specialization){
            schIds = groupScheduleIds
        }
        else {
            const result = props.scheduleIds.every((val:number) => groupScheduleIds.includes(val));
            if (result){
                schIds = props.scheduleIds
            }
        }

        if (props.onChange){
            props.onChange(groupId, specialization, schIds)
        }
        if (props.onGroupChange){
            props.onGroupChange(groupId, specialization)
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
                        setSpecialization(spec)
                        setGroupId(grId)
                        props.getGroupSchedules(grId)
                        // if (props.onChange){
                        //     props.onChange(grId, spec, scheduleIds)
                        // }
                        // if (props.onGroupChange){
                        //     props.onGroupChange(grId, spec)
                        // }
                    }}
                />
            </Grid>
            <Grid item xs={3}>
                <ScheduleSelect
                    disabled={props.disabled || false}
                    schedules={props.group_schedules}
                    scheduleIds={props.scheduleIds}
                    specialization={specialization}
                    onChange={(schIds: number[]) => {
                        if (props.onChange){
                            props.onChange(props.groupId, specialization, schIds)
                        }
                        if (props.onScheduleChange){
                            // setScheduleIds(schIds)
                            props.onScheduleChange(schIds)
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