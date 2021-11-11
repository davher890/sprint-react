import * as React from "react"

import CustomCard from '../Card';
import { Grid, Checkbox } from '@material-ui/core';

import utils from "../../../utils/Functions"

const ScheduleSelect: React.FC<any> = (props) => {

    const [schedules, setSchedules] = React.useState(props.schedules)
    const [scheduleIds, setScheduleIds] = React.useState(props.scheduleIds)
    const [specialization, setSpecialization] = React.useState(props.specialization)

    React.useEffect(() => {
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

    const onChange = (scheduleIds: number[]) => {
        if (props.onChange){
            props.onChange(scheduleIds)
        }
    }

    return (
        <Grid container>
            <Grid item xs>
                <CustomCard title="Horarios">
                    {  
                        schedules.map((sch: {id: number, startHour: number, startMinute: number, endHour: number, endMinute: number, dayTranslate: string}) => {
                            return (
                                <Grid item key={`row_sch${sch.id}`} >
                                    <Checkbox
                                        disabled={props.disabled || specialization}
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
                                    {sch.dayTranslate} - {utils.leftPadding(sch.startHour.toString(), 2, "0")}:{utils.leftPadding(sch.startMinute.toString(), 2, "0")} - {utils.leftPadding(sch.endHour.toString(), 2, "0")}:{utils.leftPadding(sch.endMinute.toString(), 2, "0")}
                                </Grid>
                            )
                        })
                    }
                </CustomCard>
            </Grid>
        </Grid>
    )
}

export default ScheduleSelect;