import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

import RadioList from '../RadioList';
import { Grid } from '@material-ui/core';

// Redux
import { connect } from "react-redux";
import { getGroups } from "../../../redux/actions/groups";

class GroupSelect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            groupId: props.groupId,
        };
    }

    componentDidMount() {
        this.props.getGroups(true)
        this.props.getGroups(false)
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.groupId !== prevProps.groupId){
            this.setState({
                groupId: this.props.groupId.toString()
            })
        }
    }

    groupOnChange = (groupId, specialization) => {
        if (this.props.onChange){
            this.props.onChange(groupId, specialization)
        }
    }

    render() {
        return (
            <Grid container direction="row" spacing={2}>
                <Grid item xs>
                    <RadioList title="Especialización"
                        options={this.props.specialization_groups}
                        value={this.state.groupId}
                        onChange={(event) => {
                            this.groupOnChange(event.target.value, true)
                        }}
                    />
                </Grid>
                <Grid item xs>
                    <RadioList title="No especialización"
                        options={this.props.not_specialization_groups}
                        value={this.state.groupId}
                        onChange={(event) => {
                            this.groupOnChange(event.target.value, false)
                        }}
                    />
                </Grid>
            </Grid>
        )
    }
}

const mapDispatchToProps = {
    getGroups
}

const mapStateToProps = state => {
    return {
        specialization_groups: state.group_reducer.specialization_groups,
        not_specialization_groups: state.group_reducer.not_specialization_groups,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(GroupSelect));