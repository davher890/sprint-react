import * as React from "react"
// Redux
import { connect } from "react-redux";

import CustomCard from '../Card';
import { Grid, Checkbox } from '@material-ui/core';

import { getSportSchoolGroups } from "../../../redux/actions/sportSchools";

const GroupMultiSelect: React.FC<any> = (props) => {

    const [sportSchool, setSportSchool] = React.useState<any>(props.sportSchool)
    const [sportSchoolId, setSportSchoolId] = React.useState<number>(props.sportSchoolId)
    const [selectedGroupIds, setSelectedGroupIds] = React.useState<number[]>(props.selectedGroupIds || [])

    React.useEffect(() => {
        if (props.sportSchoolId !== sportSchoolId){
            setSportSchool(props.sportSchool)
            setSportSchoolId(props.sportSchoolId)
        }
        if (JSON.stringify(props.selectedGroupIds) !== JSON.stringify(selectedGroupIds)){
            setSelectedGroupIds(props.selectedGroupIds)
        }
        props.getSportSchoolGroups(props.sportSchoolId)
    }, [props.selectedGroupIds, props.sportSchoolId, props.getSportSchoolGroups, sportSchoolId, selectedGroupIds])

    // You can use the first argument to keep track of the list of selected ids
    // or you can use the second and the third argument to see the last group checked or unchecked
    const onChange = (groupIds: number[], lastGrId: number, checked: boolean) => {
        if (props.onChange){
            props.onChange(groupIds, lastGrId, checked)
        }
    }

    return (
        <Grid container item xs={2}>
            <CustomCard title={sportSchool?.name} >
                {
                    props.sport_schools_groups && sportSchoolId ?
                    (props.sport_schools_groups['sport_school_' + sportSchoolId] || []).map((gr: {id: number, name: string}) => {
                        return (
                            <Grid item key={`row_sch${gr.id}`} >
                                <Checkbox
                                    disabled={props.disabled}
                                    name="groupIds"
                                    key={`ssch${gr.id}`}
                                    checked={selectedGroupIds.includes(gr.id)}
                                    onChange={e => {
                                        if (e.target.checked) {
                                            selectedGroupIds.push(gr.id)
                                        } else {
                                            const idx = selectedGroupIds.indexOf(gr.id);
                                            selectedGroupIds.splice(idx, 1);
                                        }
                                        onChange(selectedGroupIds, gr.id, e.target.checked)
                                    }}
                                />
                                {gr.name}
                            </Grid>
                        )
                    }) : null
                }
            </CustomCard>
        </Grid>
    )
}


const mapDispatchToProps = {
    getSportSchoolGroups
}

const mapStateToProps = (state: any) => {
    return {
        sport_schools_groups: state.group_reducer.sport_schools_groups
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupMultiSelect);