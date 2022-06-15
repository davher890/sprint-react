import * as React from "react"

import CustomCard from '../Card';
import { Grid, Checkbox } from '@material-ui/core';

import { getAllSportSchools, getSportSchoolGroups } from "../../redux/actions/sportSchools";

const GroupMultiSelect: React.FC<any> = (props) => {

    const [sportSchoolId, setSportSchoolId] = React.useState(props.sportSchoolId)
    const [groupIds, setGroupIds] = React.useState(props.groupIds)

    React.useEffect(() => {
        if (JSON.stringify(props.groupIds) !== JSON.stringify(groupIds)){
            setGroupIds(props.groupIds)
        }
    }, [props.groupIds, groupIds])

    const onChange = (groupIds: number[]) => {
        if (props.onChange){
            props.onChange(groupIds)
        }
    }

    return (
        <Grid container>
            <Grid item xs>
                <CustomCard title="Grupos">
                    {  
                        groups.map((group: {id: number, name: string}) => {
                            return (
                                <Grid item key={`row_g${group.id}`} >
                                    <Checkbox
                                        disabled={props.disabled}
                                        name="groupIds"
                                        key={`g${group.id}`}
                                        checked={groupIds.includes(group.id)}
                                        onChange={e => {
                                            if (e.target.checked) {
                                                groupIds.push(group.id)
                                            } else {
                                                const idx = groupIds.indexOf(group.id);
                                                groupIds.splice(idx, 1);
                                            }
                                            onChange(groupIds)
                                        }}
                                    />
                                    {group.name}
                                </Grid>
                            )
                        })
                    }
                </CustomCard>
            </Grid>
        </Grid>
    )
}


const mapDispatchToProps = {
    getAllSportSchools
}

const mapStateToProps = (state: any) => {
    return {
        groups: state.sport_school_reducer.sport_schools,
    };
};


export default GroupMultiSelect;