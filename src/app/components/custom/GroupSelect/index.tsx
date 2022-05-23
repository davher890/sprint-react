import * as React from "react"
// import { withRouter } from 'react-router-dom';

import RadioList from '../RadioList';
import { Grid } from '@material-ui/core';

// Redux
import { connect } from "react-redux";
import { getSportSchoolGroups } from "../../../redux/actions/sportSchools";

class GroupSelect extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            sportSchoolId: props.sportSchoolId,
            groupId: props.groupId,
        };
    }

    componentDidUpdate = (prevProps: any) => {
        if (this.props.sportSchoolId !== prevProps.sportSchoolId && this.props.sportSchoolId){
            this.setState({
                sportSchoolId: this.props.sportSchoolId.toString()
            })
            this.props.getSportSchoolGroups(this.props.sportSchoolId, true)
            this.props.getSportSchoolGroups(this.props.sportSchoolId, false)
        }
        if (this.props.groupId !== prevProps.groupId){
            this.setState({
                groupId: this.props.groupId.toString()
            })
        }
    }

    groupOnChange = (groupId: number, specialization: boolean) => {
        if (this.props.onChange){
            this.props.onChange(groupId, specialization)
        }
        else {
            this.setState({ groupId: groupId })
        }
    }

    render() {
        return (
            <Grid container direction="row" spacing={2}>
                <Grid item xs>
                    <RadioList title="Especialización"
                        disabled={this.props.disabled || false}
                        options={this.props.specialization_groups}
                        value={this.state.groupId}
                        onChange={(value: number) => {
                            this.groupOnChange(value, true)
                        }}
                    />
                </Grid>
                <Grid item xs>
                    <RadioList title="No especialización"
                        disabled={this.props.disabled || false}
                        options={this.props.not_specialization_groups}
                        value={this.state.groupId}
                        onChange={(value: number) => {
                            this.groupOnChange(value, false)
                        }}
                    />
                </Grid>
            </Grid>
        )
    }
}

const mapDispatchToProps = {
    getSportSchoolGroups
}

const mapStateToProps = (state: any) => {
    return {
        specialization_groups: state.group_reducer.specialization_groups,
        not_specialization_groups: state.group_reducer.not_specialization_groups,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupSelect);