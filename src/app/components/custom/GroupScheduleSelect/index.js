import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

import ScheduleSelect from '../ScheduleSelect';
import GroupSelect from '../GroupSelect';
import { Grid } from '@material-ui/core';

// Redux
import { connect } from "react-redux";
import { getGroups, getGroupSchedules } from "../../../redux/actions/groups";

class GroupScheduleSelect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            groupId: props.groupId,
            specialization: props.specialization,
            scheduleIds: props.scheduleIds || [],
            group_schedules: this.props.group_schedules
        };
    }

    componentDidUpdate = (prevProps) => {
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
    
    groupOnChange = (groupId, specialization, resetSchedules=true) => {
        this.setState({
            groupId: groupId,
            specialization: specialization,
        })
        if (groupId){
            this.props.getGroupSchedules(groupId).then(() => {
                let scheduleIds = specialization ? this.props.group_schedules.map((d) => d.id) : (resetSchedules ? [] : this.state.scheduleIds)
                this.setState({
                    scheduleIds: scheduleIds
                })
                this.props.onChange(groupId, specialization, scheduleIds)
            })
        }
    }

    scheduleIdsOnChange = (scheduleIds) => {
        this.setState({
            scheduleIds: scheduleIds
        })
        this.props.onChange(this.state.groupId, this.state.specialization, scheduleIds)
    }

    render() {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs>
                    <GroupSelect
                        groupId={this.state.groupId}
                        onChange={(groupId, specialization) => {
                            console.log(groupId, specialization)
                            this.groupOnChange(groupId, specialization)
                        }}
                    />
                </Grid>
                <Grid item xs>
                    <ScheduleSelect
                        schedules={this.props.group_schedules}
                        scheduleIds={this.state.scheduleIds}
                        specialization={this.state.specialization}
                        onChange={(scheduleIds) => {
                            this.scheduleIdsOnChange(scheduleIds)
                        }}
                    />
                </Grid>
            </Grid>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getGroups: specialization => dispatch(getGroups(specialization)),
        getGroupSchedules: groupId => dispatch(getGroupSchedules(groupId))
    }
}

const mapStateToProps = state => {
    return {
        group_schedules: state.group_reducer.group_schedules
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(GroupScheduleSelect));