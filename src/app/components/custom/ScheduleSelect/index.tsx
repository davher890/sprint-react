import * as React from "react"

import CustomCard from '../Card';
import { Box, Grid, Checkbox, FormControlLabel } from '@mui/material';

import utils from "../../../utils/Functions"

const ScheduleItem: React.FC<any> = (props) => {

    const { specialization, disabled, scheduleIds, id, startHour, startMinute, endHour, endMinute, dayTranslate, onChange } = props

    const label = `${dayTranslate} - ${utils.leftPadding(startHour.toString(), 2, "0")}:${utils.leftPadding(startMinute.toString(), 2, "0")} - ${utils.leftPadding(endHour.toString(), 2, "0")}:${utils.leftPadding(endMinute.toString(), 2, "0")}`
    return (
        <FormControlLabel
            label={label}
            control={
                <Checkbox
                    disabled={specialization || disabled}
                    name="scheduleIds"
                    key={`sch${id}`}
                    checked={specialization || scheduleIds.includes(id)}
                    onChange={e => {
                        if (e.target.checked) {
                            let s = scheduleIds.concat([id])
                            onChange(s)
                        } else {
                            let schIds = scheduleIds
                            const idx = scheduleIds.indexOf(id);
                            schIds.splice(idx, 1);
                            onChange(schIds)
                        }
                    }}
                /> 
            }
        />
    )
}
const ScheduleSelect: React.FC<any> = (props) => {

    const [ days, setDays ] = React.useState<string[]>([])

    const translateDays: { [key: string]: string; } = {
        "monday" : "Lunes",
        "tuesday" : "Martes",
        "wednesday" : "Miercoles",
        "thursday" : "Jueves",
        "friday" : "Viernes",
        "saturday" : "Sabado",
        "sunday" : "Domingo"
    }
    const onChange = (scheduleIds: number[]) => {
        if (props.onChange){
            props.onChange(scheduleIds)
        }
    }

    return (
        <Grid container item xs>
            { props.schedules && props.schedules.length > 0 && <CustomCard title="Horarios">
                <Grid container direction="column">
                    <Grid item xs>
                        <CustomCard title="Seleccionados">
                        { props.schedules && props.schedules
                            .filter((sch: {id: number, day: string}) => {
                                return props.scheduleIds.includes(sch.id)
                            })
                            .map((sch: {id: number, startHour: number, startMinute: number, endHour: number, endMinute: number, dayTranslate: string}) => {
                                return <Grid item key={`row_sch_1_${sch.id}`} xs>
                                    <ScheduleItem 
                                        { ...props } { ...sch }
                                        onChange={onChange}
                                    />
                                   </Grid>
                            })
                        }
                        </CustomCard>
                    </Grid>
                    <Grid container>
                        <Grid container item direction="column" xs>
                            <Box >
                            { [...new Set(props.schedules.map((sch: {day: string}) => { return sch.day.toLowerCase() }))].map((d:any) => {
                                return <Grid item xs>
                                    <Checkbox
                                        name={d}
                                        key={`sch-${d}`}
                                        disabled={props.disabled || props.specialization}
                                        checked={days.includes(d)}
                                        onChange={e => {
                                            if (e.target.checked) {
                                                setDays([...days, d])
                                            } else {
                                                setDays((current) =>
                                                    current.filter((c) => c !== d)
                                                );
                                        }}}
                                    />{translateDays[d]}
                                </Grid>
                            })}
                            </Box>
                        </Grid>
                        <Grid container item direction="column" xs spacing={0}>
                            <Box style={{maxHeight: '70vh', overflow: 'auto'}}>
                            { days && days.length > 0 && props.schedules
                                .filter((sch: {id: number, day: string}) => {
                                    return days.includes(sch.day.toLowerCase())
                                })
                                .map((sch: {id: number, startHour: number, startMinute: number, endHour: number, endMinute: number, dayTranslate: string}) => {
                                    return (
                                        <Grid item key={`row_sch_2_${sch.id}`} xs>
                                            <ScheduleItem 
                                                { ...props } { ...sch }
                                                onChange={onChange}
                                            />
                                        </Grid>
                                    )
                                })
                            }
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </CustomCard>
            }
        </Grid>
    )
}

export default ScheduleSelect;