import React, { Component } from "react";
import { 
    Form
} from 'react-bootstrap';

import { Formik } from 'formik';

import { Container, Grid } from '@material-ui/core';

import SubmitButton from '../custom/SubmitButton'
import Table from "../custom/Table_copy";
import CustomCard from '../custom/Card'
import GroupSelect from '../custom/GroupSelect'

import Utils from "../../utils/TableUtils"
import { connect } from "react-redux";
import { getAllGroups, getGroupAthleteTable, getGroupSchedules } from "../../redux/actions/groups";

class GroupAthletesTable extends Component {

	constructor(props) {

		super(props);
		this.state = {}
        this.handleSubmitQuery = this.handleSubmitQuery.bind(this);
	}

	componentDidMount(){
        this.props.getAllGroups()
	}

	handleSubmitQuery() {
        this.props.getGroupAthleteTable(this.state.groupId, this.state.scheduleIds)
    }

    fillSchedules(groupId){
        this.props.getGroupSchedules(groupId)
    }

	render() {
		return (
            <Container fixed>
                <Grid container direction="column" spacing={2}>
                    <Grid item xs>
                        <CustomCard>
                            <Grid container direction="column" spacing={1}>
                                <Grid item xs>
                                    <GroupSelect
                                        groupId={this.state.groupId}
                                        scheduleIds={this.state.scheduleIds}
                                        onChange={(groupId, specialization, scheduleIds) => {
                                            this.setState({
                                                groupId: groupId,
                                                scheduleIds: scheduleIds 
                                            })
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={1}>
                                    <SubmitButton text="Buscar"
                                        onClick={this.handleSubmitQuery}/>
                                </Grid>
                            </Grid>
                        </CustomCard>
                    </Grid>
                    <Grid item xs>
                        <Table 
                            data={this.props.table_data}
                            page={this.props.page}
                            size={this.props.size}
                            total={this.props.total}
                            columns={Utils.getAthleteColumns()} 
                            showColumns={true}
                            onPaginationChange={(page, size) => {
                                this.props.getGroupAthleteTable(this.state.groupId, this.state.scheduleIds, page, size);
                            }}
                            onFilterChange={(filters) => {
                                this.props.getAthleteTable(this.state.groupId, this.state.scheduleIds, this.props.page, this.props.size, filters);
                            }}
                            onRowClick={(id) => {
                                window.open("/athletes/" + id, "_self");
                            }}
                        />
                    </Grid>
                </Grid>
            </Container>
		)
	}
}
function mapStateToProps(state) {
	return {
		table_data: state.table_reducer.table_data,
		page: state.table_reducer.page,
		size: state.table_reducer.size,
		total: state.table_reducer.total,
        groups: state.group_reducer.groups,
        group_schedules: state.group_reducer.group_schedules
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
        getAllGroups: () => dispatch(getAllGroups()),
        getGroupSchedules: groupId => dispatch(getGroupSchedules(groupId)),
        getGroupAthleteTable: (groupId, scheduleId) => dispatch(getGroupAthleteTable(groupId, scheduleId))
    }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GroupAthletesTable);
