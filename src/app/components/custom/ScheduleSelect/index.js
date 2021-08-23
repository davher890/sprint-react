import React, { useState, useEffect } from "react";

import CustomCard from '../Card';
import { Grid, Checkbox } from '@material-ui/core';

import utils from "../../../utils/Functions"

export default (props) => {

    const [schedules, setSchedules] = useState(props.schedules)
    const [scheduleIds, setScheduleIds] = useState(props.scheduleIds)
    const [specialization, setSpecialization] = useState(props.specialization)

    useEffect(() => {
        if (JSON.stringify(props.schedules) !== JSON.stringify(schedules)){
            setSchedules(props.schedules)
        }
        if (JSON.stringify(props.scheduleIds) !== JSON.stringify(scheduleIds)){
            setScheduleIds(props.scheduleIds)
        }
        if (props.specialization !== specialization){
            setSpecialization(props.specialization)
        }
    }, [props.schedules, props.scheduleIds, props.specialization, schedules, scheduleIds, specialization])

    const onChange = (scheduleIds) => {
        if (props.onChange){
            props.onChange(scheduleIds)
        }
    }

    return (
        <Grid container>
            <Grid item xs>
                <CustomCard title="Horarios">
                    {  
                        schedules.map(sch => {
                            return (
                                <Grid item key={`row_sch${sch.id}`} >
                                    <Checkbox
                                        disabled={specialization}
                                        name="scheduleIds"
                                        key={`sch${sch.id}`}
                                        checked={scheduleIds.includes(sch.id)}
                                        onChange={e => {
                                            if (e.target.checked) {
                                                scheduleIds.push(sch.id)
                                            } else {
                                                const idx = scheduleIds.indexOf(sch.id);
                                                scheduleIds.splice(idx, 1);
                                            }
                                            onChange(scheduleIds)
                                        }}
                                    />
                                    {sch.dayTranslate} - {utils.leftPadding(sch.startHour, 2, "0")}:{utils.leftPadding(sch.startMinute, 2, "0")} - {utils.leftPadding(sch.endHour, 2, "0")}:{utils.leftPadding(sch.endMinute, 2, "0")}
                                </Grid>
                            )
                        })
                    }
                </CustomCard>
            </Grid>
        </Grid>
    )
}