import * as React from "react"

import CustomCard from '../Card';
import { Box, Grid, Checkbox, Typography } from '@material-ui/core';

import utils from "../../../utils/Functions"

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
                                // return <Typography variant="h6">{sch.dayTranslate} - {utils.leftPadding(sch.startHour.toString(), 2, "0")}:{utils.leftPadding(sch.startMinute.toString(), 2, "0")} - {utils.leftPadding(sch.endHour.toString(), 2, "0")}:{utils.leftPadding(sch.endMinute.toString(), 2, "0")}</Typography>
                                return <Grid item key={`row_sch${sch.id}`} xs>
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
                                        <Grid item key={`row_sch${sch.id}`} xs>
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