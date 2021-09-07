import * as React from "react"
import { withRouter } from 'react-router-dom';

import ScheduleSelect from '../ScheduleSelect';
import GroupSelect from '../GroupSelect';
import { Grid } from '@material-ui/core';

// Redux
import { connect } from "react-redux";
import { getGroups, getGroupSchedules } from "../../../redux/actions/groups";

class GroupScheduleSelect extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            groupId: props.groupId,
            specialization: props.specialization,
            scheduleIds: props.scheduleIds || [],
            group_schedules: this.props.group_schedules
        };
    }

    componentDidUpdate = (prevProps: any) => {
        if (this.props.groupId !== prevProps.groupId){
            this.groupOnChange(this.props.groupId.toString(), this.props.specialization, false)
        }
        if (JSON.stringify(this.props.scheduleIds) !== JSON.stringify(prevProps.scheduleIds)){
            this.scheduleIdsOnChange(this.props.scheduleIds)
        }
        if (this.props.specialization !== prevProps.specialization){
            this.setState({
                specialization: this.props.specialization,
            })
        }
    }
    
    groupOnChange = (groupId: number, specialization: boolean, resetSchedules=true) => {
        this.setState({
            groupId: groupId,
            specialization: specialization,
        })
        if (groupId){
            this.props.getGroupSchedules(groupId).then(() => {
                let scheduleIds = specialization ? this.props.group_schedules.map((d: {id: number}) => d.id) : (resetSchedules ? [] : this.state.scheduleIds)
                this.setState({
                    scheduleIds: scheduleIds
                })
                this.props.onChange(groupId, specialization, scheduleIds)
            })
        }
    }

    scheduleIdsOnChange = (scheduleIds: number[]) => {
        this.setState({
            scheduleIds: scheduleIds
        })
        this.props.onChange(this.state.groupId, this.state.specialization, scheduleIds)
    }

    render() {
        return (
            <Grid container direction="row" spacing={2}>
                <Grid item xs>
                    <GroupSelect
                        groupId={this.state.groupId}
                        onChange={(groupId: number, specialization: boolean) => {
                            this.groupOnChange(groupId, specialization)
                        }}
                    />
                </Grid>
                <Grid item xs>
                    <ScheduleSelect
                        schedules={this.props.group_schedules}
                        scheduleIds={this.state.scheduleIds}
                        specialization={this.state.specialization}
                        onChange={(scheduleIds: number[]) => {
                            this.scheduleIdsOnChange(scheduleIds)
                        }}
                    />
                </Grid>
            </Grid>
        )
    }
}

const mapDispatchToProps = {
    getGroups, getGroupSchedules
}

const mapStateToProps = (state: any) => {
    return {
        group_schedules: state.group_reducer.group_schedules
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(GroupScheduleSelect));