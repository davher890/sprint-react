import * as React from "react"

import { Grid } from '@material-ui/core';

import SearchButton from '../custom/SearchButton'
import Table from "../custom/Table";
import CustomCard from '../custom/Card'
import GroupScheduleSelect from '../custom/GroupScheduleSelect'
import SportSchoolSelect from "../custom/SportSchoolSelect";

import Utils from "../../utils/TableUtils"
import { connect } from "react-redux";
import { getGroupAthleteTable, getGroupSchedules, downloadGroupSchedulesAthletes } from "../../redux/actions/groups";

import { Order } from '../../types/order'

class GroupAthletesTable extends React.Component<any, any> {

	constructor(props: any) {

		super(props);
		this.state = {
        	columns: Utils.getGroupAthleteColumns()
		}
        this.handleSubmitQuery = this.handleSubmitQuery.bind(this);
        this.downloadData = this.downloadData.bind(this)
	}

    downloadData(columns: any, filters: any) {
		this.props.downloadGroupSchedulesAthletes(this.state.groupId, this.state.scheduleIds, columns, filters)
	}

	handleSubmitQuery() {
        this.props.getGroupAthleteTable(this.state.groupId, this.state.scheduleIds)
    }

    fillSchedules(groupId: number){
        this.props.getGroupSchedules(groupId)
    }

	render() {
		return (
            <Grid container direction="column" spacing={3}>
                <Grid item xs>
                    <CustomCard>
                        <Grid container direction="column" spacing={3}>
                            <Grid container item spacing={1}>
                                <Grid item xs={2}>
                                    <SportSchoolSelect sportSchoolId={this.state.sportSchoolId}
                                        onChange={(sportSchoolId: number) => {
                                            this.setState({
                                                sportSchoolId: sportSchoolId 
                                            })
                                        }}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <GroupScheduleSelect
                                        sportSchoolId={this.state.sportSchoolId}
                                        groupId={this.state.groupId}
                                        scheduleIds={this.state.scheduleIds}
                                        onChange={(groupId: number, specialization: boolean, scheduleIds: number[]) => {
                                            this.setState({
                                                groupId: groupId,
                                                scheduleIds: scheduleIds 
                                            })
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs>
                                <SearchButton type="submit"
                                    disabled={!(this.state.groupId > 0 && this.state.scheduleIds.length > 0)}
                                    onClick={this.handleSubmitQuery}>Buscar</SearchButton>
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
                        columns={this.state.columns} 
                        downloadData={this.downloadData}
                        showColumns={true}
                        onPaginationFilterChange={(page: number, size: number, filters:any, sort: string, sortDirection: Order) => {
                            this.props.getGroupAthleteTable(this.state.groupId, this.state.scheduleIds, page, size, filters, sort, sortDirection);
                        }}
                        onRowClick={(id: number) => {
                            window.open("/athletes/" + id, "_self");
                        }}
                    />
                </Grid>
            </Grid>
		)
	}
}
function mapStateToProps(state: any) {
	return {
		table_data: state.table_reducer.table_data,
		page: state.table_reducer.page,
		size: state.table_reducer.size,
		total: state.table_reducer.total,
        groups: state.group_reducer.groups,
        group_schedules: state.group_reducer.group_schedules
	};
}

const mapDispatchToProps = {
    getGroupSchedules, 
    downloadGroupSchedulesAthletes, getGroupAthleteTable
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GroupAthletesTable);
