import * as React from "react"

import CustomCard from '../Card';
import { Grid, Checkbox } from '@mui/material';

const SportSchoolMultiSelect: React.FC<any> = (props) => {

    const [sportSchools, setSportSchools] = React.useState<any[]>(props.sportSchools || [])
    const [sportSchoolIds, setSportSchoolIds] = React.useState<number[]>(props.sportSchoolIds || [])

    React.useEffect(() => {
        // if (JSON.stringify(props.sportSchools) !== JSON.stringify(sportSchools)){
        setSportSchools(props.sportSchools)
        // }
        // if (JSON.stringify(props.sportSchoolIds) !== JSON.stringify(sportSchoolIds)){
        setSportSchoolIds(props.sportSchoolIds || [])
        // }
    }, [props.sportSchoolIds, props.sportSchools])

    // You can use the first argument to keep track of the list of selected ids
    // or you can use the second and the third argument to see the last id checked or unchecked
    const onChange = (spIds: number[], lastSpId: number, checked: boolean) => {
        if (props.onChange){
            props.onChange(spIds, lastSpId, checked)
        }
    }

    return (
        <Grid container item xs>
            <CustomCard title="Escuelas deportivas">
                {  
                    sportSchools.map((ss: {id: number, name: string}) => {
                        return (
                            <Grid item key={`row_sch${ss.id}`} >
                                <Checkbox
                                    disabled={props.disabled}
                                    name="sportSchoolIds"
                                    key={`ssch${ss.id}`}
                                    checked={sportSchoolIds.includes(ss.id)}
                                    onChange={e => {
                                        let spIds = JSON.parse(JSON.stringify(sportSchoolIds))
                                        if (e.target.checked) {
                                            spIds.push(ss.id)
                                        } else {
                                            const idx = spIds.indexOf(ss.id);
                                            spIds.splice(idx, 1);
                                        }
                                        onChange(spIds, ss.id, e.target.checked)
                                    }}
                                />
                                {ss.name}
                            </Grid>
                        )
                    })
                }
            </CustomCard>
        </Grid>
    )
}

export default SportSchoolMultiSelect;