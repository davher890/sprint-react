import React, { useState } from "react";
import { Grid } from '@material-ui/core';

import DownloadButton from '../custom/DownloadButton'
import GroupSelect from '../custom/GroupSelect'
import Select from '../custom/Select'
import CustomCard from '../custom/Card'

import utils from "../../utils/Functions"

import { connect } from "react-redux";
import { downloadGroupAttendance } from "../../redux/actions/groups";

const GroupAttendante: React.FC<any> = (props) => {

    let d = new Date()
    let previousMonth = (d.getMonth()-1 + 12) % 12
    let nextMonth = (d.getMonth()+1 + 12) % 12
    let months = [
        { id : previousMonth, name: utils.getMonth(previousMonth)},
        { id : d.getMonth(), name: utils.getMonth(d.getMonth())},
        { id : nextMonth, name: utils.getMonth(nextMonth)}
    ]
    const [month, setMonth] = useState<number>(d.getMonth())
    const [groupId, setGroupId] = useState<number>(0)

	const handleFormSubmit = () => {
        props.downloadGroupAttendance(groupId, month)
    }

    return (
        <CustomCard>
            <Grid container>
                <Grid item xs={2}>
                    <Select label="Mes"  name="month" 
                        value={month} 
                        options={months} 
                        onChange={(e: any, value: any) => {
                            value ? setMonth(value.id) : setMonth(value)
                        }} 
                    />
                </Grid>
                <Grid item xs>
                    <GroupSelect 
                        groupId={groupId}
                        onChange={(id: number) => {
                            setGroupId(id)
                        }}
                    />
                </Grid>
                <Grid item xs>
                    <DownloadButton type="submit"
                        disabled={!(groupId > 0 && month > 0)}
                        onClick={handleFormSubmit}
                    />
                </Grid>
            </Grid>
        </CustomCard>
    )
}


function mapStateToProps(state: any) {
	return {};
}

const mapDispatchToProps = {
	downloadGroupAttendance
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GroupAttendante);