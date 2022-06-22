import * as React from "react"

import CustomCard from '../Card';
import { Grid, Checkbox } from '@material-ui/core';

const SportSchoolMultiSelect: React.FC<any> = (props) => {

    const [sportSchools, setSportSchools] = React.useState(props.sportSchools)
    const [sportSchoolIds, setSportSchoolIds] = React.useState(props.sportSchoolIds)

    React.useEffect(() => {
        if (JSON.stringify(props.sportSchools) !== JSON.stringify(sportSchools)){
            setSportSchools(props.sportSchools)
        }
        if (JSON.stringify(props.sportSchoolIds) !== JSON.stringify(sportSchoolIds)){
            setSportSchoolIds(props.sportSchoolIds)
        }
    }, [props.sportSchools, props.sportSchoolIds, sportSchools, sportSchoolIds])

    const onChange = (sportSchoolIds: number[], sportSchoolId: number, checked: boolean) => {
        if (props.onChange){
            props.onChange(sportSchoolIds, sportSchoolId, checked)
        }
    }

    return (
        <Grid container>
            <Grid item xs>
                <CustomCard title="Escuelas deportivas">
                    {  
                        sportSchools.map((sch: {id: number, name: string}) => {
                            return (
                                <Grid item key={`row_sch${sch.id}`} >
                                    <Checkbox
                                        disabled={props.disabled}
                                        name="sportSchoolIds"
                                        key={`ssch${sch.id}`}
                                        checked={sportSchoolIds.includes(sch.id)}
                                        onChange={e => {
                                            if (e.target.checked) {
                                                sportSchoolIds.push(sch.id)
                                            } else {
                                                const idx = sportSchoolIds.indexOf(sch.id);
                                                sportSchoolIds.splice(idx, 1);
                                            }
                                            onChange(sportSchoolIds, sch.id, e.target.checked)
                                        }}
                                    />
                                    {sch.name}
                                </Grid>
                            )
                        })
                    }
                </CustomCard>
            </Grid>
        </Grid>
    )
}

export default SportSchoolMultiSelect;