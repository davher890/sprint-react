import React, { useState } from "react";
import { Grid } from '@mui/material';

import DownloadButton from '../../components/custom/DownloadButton'
import GroupSelect from '../../components/custom/GroupSelect'
import Select from '../../components/custom/Select'
import CustomCard from '../../components/custom/Card'
import SportSchoolSelect from "../../components/custom/SportSchoolSelect";

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
    const [sportSchoolId, setsportSchoolId] = useState<number>(0)

	const handleFormSubmit = () => {
        props.downloadGroupAttendance(groupId, month, sportSchoolId)
    }

    return (
        <CustomCard>
            <Grid container spacing={3}>
                <Grid container item direction="column">
                    <Grid item xs>
                        <SportSchoolSelect sportSchoolId={sportSchoolId}
                            onChange={(sportSchoolId: number) => {
                                setsportSchoolId(sportSchoolId)
                            }}
                        />
                    </Grid>
                    <Grid item xs>
                        <Select label="Mes"  name="month" 
                            value={month} 
                            options={months} 
                            onChange={(e: any, value: any) => {
                                value ? setMonth(value.id) : setMonth(value)
                            }} 
                        />
                    </Grid>
                </Grid>
                <Grid item xs>
                    <GroupSelect 
                        groupId={groupId}
                        sportSchoolId={sportSchoolId}
                        onChange={(id: number) => {
                            setGroupId(id)
                        }}
                    />
                </Grid>
                <Grid item xs>
                    <DownloadButton type="submit"
                        disabled={month == 0 || sportSchoolId == 0}
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