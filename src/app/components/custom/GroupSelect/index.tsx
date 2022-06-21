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
            this.props.getSportSchoolGroups(this.props.sportSchoolId)
        }
        if (this.props.groupId !== prevProps.groupId){
            this.setState({
                groupId: this.props.groupId
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

    getGroups = (specialization: boolean) =>{
        return this.props.groups.filter((gr: any) => {
            return gr.specialization === specialization
        })
    }

    render() {
        return (
            <Grid container direction="row" spacing={2}>
                { this.getGroups(true).length > 0 ?
                <Grid item xs>
                    <RadioList title="Especialización"
                        disabled={this.props.disabled || false}
                        options={this.getGroups(true)}
                        value={this.state.groupId}
                        onChange={(value: number) => {
                            this.groupOnChange(value, true)
                        }}
                    />
                </Grid>
                : null }
                { this.getGroups(false).length > 0 ?
                <Grid item xs>
                    <RadioList title="No especialización"
                        disabled={this.props.disabled || false}
                        options={this.getGroups(false)}
                        value={this.state.groupId}
                        onChange={(value: number) => {
                            this.groupOnChange(value, false)
                        }}
                    />
                </Grid>
                : null }
            </Grid>
        )
    }
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