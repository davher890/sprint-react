import * as React from "react"

import { Container, Grid } from '@material-ui/core';

import SearchButton from '../custom/SearchButton'
import Table from "../custom/Table";
import CustomCard from '../custom/Card'
import GroupScheduleSelect from '../custom/GroupScheduleSelect'

import Utils from "../../utils/TableUtils"
import { connect } from "react-redux";
import { getAllGroups, getGroupAthleteTable, getGroupSchedules, downloadGroupSchedulesAthletes } from "../../redux/actions/groups";

class GroupAthletesTable extends React.Component<any, any> {

	constructor(props: any) {

		super(props);
		this.state = {
        	columns: Utils.getAthleteColumns() 
		}
        this.handleSubmitQuery = this.handleSubmitQuery.bind(this);
        this.downloadData = this.downloadData.bind(this)
	}

	componentDidMount(){
        this.props.getAllGroups()
	}

    downloadData(columns: any) {
		this.props.downloadGroupSchedulesAthletes(this.state.groupId, this.state.scheduleIds, columns)
	}

	handleSubmitQuery() {
        this.props.getGroupAthleteTable(this.state.groupId, this.state.scheduleIds)
    }

    fillSchedules(groupId: number){
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
                                    <GroupScheduleSelect
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
                                <Grid item xs>
                                    <SearchButton text="Buscar" type="submit"
                                        disabled={!(this.state.groupId > 0 && this.state.scheduleIds.length > 0)}
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
                            columns={this.state.columns} 
                            downloadData={this.downloadData}
                            showColumns={true}
                            onPaginationChange={(page: number, size: number, filters:any) => {
                                this.props.getGroupAthleteTable(this.state.groupId, this.state.scheduleIds, page, size);
                            }}
                            onFilterChange={(filters: any) => {
                                this.props.getGroupAthleteTable(this.state.groupId, this.state.scheduleIds, this.props.page, this.props.size, filters);
                            }}
                            onRowClick={(id: number) => {
                                window.open("/athletes/" + id, "_self");
                            }}
                        />
                    </Grid>
                </Grid>
            </Container>
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
    getAllGroups, getGroupSchedules, 
    downloadGroupSchedulesAthletes, getGroupAthleteTable
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GroupAthletesTable);
