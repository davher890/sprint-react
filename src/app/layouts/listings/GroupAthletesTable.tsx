import * as React from "react"
import { useState } from "react";

import { Grid } from '@mui/material';

import SearchButton from '../../components/custom/SearchButton'
import Table from "../../components/custom/Table";
import CustomCard from '../../components/custom/Card'
import GroupScheduleSelect from '../../components/custom/GroupScheduleSelect'
import SportSchoolSelect from "../../components/custom/SportSchoolSelect";

import Utils from "../../utils/TableUtils"
import { connect } from "react-redux";
import { getGroupAthleteTable, getGroupSchedules, downloadGroupSchedulesAthletes } from "../../redux/actions/groups";

import { Order } from '../../types/order'

const GroupAthletesTable: React.FC<any> = (props) => {

    const [sportSchoolId, setSportSchoolId] = useState<number>(0)
	const [groupId, setGroupId] = useState<number>(0)
    const [scheduleIds, setScheduleIds] = useState<number[]>([])
	
    const downloadData = (columns: any, filters: any) => {
		props.downloadGroupSchedulesAthletes(groupId, scheduleIds, columns, filters)
	}

	const handleSubmitQuery = () => {
        props.getGroupAthleteTable(groupId, scheduleIds)
    }

    return (
        <Grid container direction="column" spacing={3}>
            <Grid item xs>
                <CustomCard>
                    <Grid container direction="column" spacing={3}>
                        <Grid container item spacing={1}>
                            <Grid container item xs>
                                <SportSchoolSelect sportSchoolId={sportSchoolId}
                                    onChange={(sportSchoolId: number) => {
                                        setSportSchoolId(sportSchoolId)
                                    }}
                                />
                            </Grid>
                            <Grid item xs>
                                <GroupScheduleSelect
                                    sportSchoolId={sportSchoolId}
                                    groupId={groupId}
                                    scheduleIds={scheduleIds}
                                    // onChange={(grId: number, spec: boolean, schIds: number[]) => {
                                    //     setGroupId(grId)
                                    //     setScheduleIds(schIds)
                                    // }}
                                    onGroupChange={(grId: number) => {
                                        setGroupId(grId)
                                    }}
                                    onScheduleChange={(scheduleIds: number[]) => {
                                        setScheduleIds(scheduleIds)
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs>
                            <SearchButton type="submit"
                                disabled={!(groupId > 0 && scheduleIds.length > 0)}
                                onClick={handleSubmitQuery}>Buscar</SearchButton>
                        </Grid>
                    </Grid>
                </CustomCard>
            </Grid>
            <Grid container item xs>
                <Table 
                    data={props.table_data}
                    page={props.page}
                    size={props.size}
                    total={props.total}
                    columns={Utils.getGroupAthleteColumns()} 
                    downloadData={downloadData}
                    showColumns={true}
                    onPaginationFilterChange={(page: number, size: number, filters:any, sort: string, sortDirection: Order) => {
                        props.getGroupAthleteTable(groupId, scheduleIds, page, size, filters, sort, sortDirection);
                    }}
                    onRowClick={(id: number) => {
                        window.open("/athletes/" + id, "_self");
                    }}
                />
            </Grid>
        </Grid>
    )
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
