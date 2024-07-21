import * as React from "react"

import CustomCard from '../Card';
import { Grid, Checkbox } from '@mui/material';

const GroupMultiSelect: React.FC<any> = (props) => {

    const [groups, setGroups] = React.useState<[]>(props.groups || [])
    const [groupIds, setGroupIds] = React.useState<number[]>(props.groupIds || [])
    
    React.useEffect(() => {
        setGroups(props.groups || [])
        setGroupIds(props.groupIds || [])
    }, [props.groupIds, props.groups])

    // You can use the first argument to keep track of the list of selected ids
    // or you can use the second and the third argument to see the last id checked or unchecked
    const onChange = (groupIds: number[], lastGrId: number, checked: boolean) => {
        if (props.onChange){
            props.onChange(groupIds, lastGrId, checked)
        }
    }

    return (
        <Grid container item xs>
            <CustomCard title="Grupos" >
                {   
                    (Object.keys(groups).length === 0 ? [] : groups).map((gr: {id: number, name: string}) => {
                        return (
                            <Grid item key={`row_gr${gr.id}`} >
                                <Checkbox
                                    disabled={props.disabled}
                                    name={"sportSchoolGroupIds"}
                                    key={`spgr${gr.id}`}
                                    checked={groupIds.includes(gr.id)}
                                    onChange={e => {
                                        if (e.target.checked) {
                                            groupIds.push(gr.id)
                                        } else {
                                            const idx = groupIds.indexOf(gr.id);
                                            groupIds.splice(idx, 1);
                                        }
                                        onChange(groupIds, gr.id, e.target.checked)
                                    }}
                                />
                                {gr.name}
                            </Grid>
                        )
                    })
                }
            </CustomCard>
        </Grid>
    )
}

export default GroupMultiSelect;