import * as React from "react"

import CustomCard from '../Card';
import { Grid, Checkbox } from '@material-ui/core';

import utils from "../../../utils/Functions"

const ScheduleSelect: React.FC<any> = (props) => {

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
                        props.schedules.map((sch: {id: number, startHour: number, startMinute: number, endHour: number, endMinute: number, dayTranslate: string}) => {
                            return (
                                <Grid item key={`row_sch${sch.id}`} >
                                    <Checkbox
                                        disabled={props.disabled || props.specialization}
                                        name="scheduleIds"
                                        key={`sch${sch.id}`}
                                        checked={props.scheduleIds.includes(sch.id)}
                                        onChange={e => {
                                            if (e.target.checked) {
                                                let s = props.scheduleIds.concat([sch.id])
                                                onChange(s)
                                            } else {
                                                let schIds = props.scheduleIds
                                                const idx = props.scheduleIds.indexOf(sch.id);
                                                schIds.splice(idx, 1);
                                                onChange(schIds)
                                            }
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