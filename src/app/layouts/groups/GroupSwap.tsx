import React, { useState } from "react";

import { Grid, AppBar, Toolbar, Snackbar } from '@mui/material';
import { Alert, AlertTitle } from '@mui/lab';

import SaveButton from '../../components/custom/SaveButton'
import SelectButton from '../../components/custom/SelectButton'
import CustomCard from '../../components/custom/Card'
import GroupSelect from '../../components/custom/GroupSelect'
import AthletesList from '../../components/custom/Athletes/GroupSwapAthletesList'
import SportSchoolSelect from "../../components/custom/SportSchoolSelect";
import Spinner from '../../components/custom/Spinner'


import { connect } from "react-redux";
import { getGroupAAthletes, getGroupBAthletes, swapGroups } from "../../redux/actions/groups";
import BottomAppBar from "../../components/custom/BottomAppBar";

const GroupSwap: React.FC<any> = (props) => {

    const [success, setSuccess] = useState<boolean>(false)

    const [sportSchoolAId, setsportSchoolAId] = useState<number>(0)
    const [sportSchoolBId, setsportSchoolBId] = useState<number>(0)
    
    const [groupAId, setGroupAId] = useState<number>(0)
    const [groupBId, setGroupBId] = useState<number>(0)

    const [groupAAthletes, setGroupAAthletes] = useState<any[]>([])
    const [groupBAthletes, setGroupBAthletes] = useState<any[]>([])

    React.useEffect(() => {
        setGroupAAthletes(props.group_a_athletes)
    }, [props.group_a_athletes])

    React.useEffect(() => {
        setGroupBAthletes(props.group_b_athletes)
    }, [props.group_b_athletes])

    React.useEffect(() => {
        props.getGroupAAthletes(groupAId)
    }, [groupAId])

    React.useEffect(() => {
        props.getGroupBAthletes(groupBId)
    }, [groupBId])
    
    return (
        <>
            <Snackbar open={success}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000}>
                <Alert severity="success" onClose={() => { 
                        setSuccess(false)
                        window.open("/groups/swap", "_self");
                    }}>
                    <AlertTitle>Cambios guardados!</AlertTitle>
                </Alert>
            </Snackbar>
            <Grid container direction="column" spacing={2}>
                <Grid container item xs direction="row" spacing={2}>
                    <Grid item xs>
                        <CustomCard>
                            <Grid container direction="column">
                                <Grid item xs>
                                    <SportSchoolSelect sportSchoolId={sportSchoolAId}
                                        onChange={(sportSchoolId: number) => {
                                            setsportSchoolAId(sportSchoolId)
                                            setGroupAId(0)
                                        }}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <GroupSelect 
                                        sportSchoolId={sportSchoolAId}
                                        groupId={groupAId}
                                        onChange={(groupId: number, specialization: boolean, scheduleIds: number[]) => {
                                            setGroupAId(groupId)
                                        }}
                                    />
                                </Grid>
                                { groupAId > 0 && groupBId > 0 && <Grid item xs>
                                    <SelectButton onClick={() => {
                                        let athletes = JSON.parse(JSON.stringify(groupAAthletes))
                                        setGroupBAthletes(athletes)
                                        setGroupAAthletes([])
                                    }}>Mover todos</SelectButton>
                                </Grid>
                                }
                            </Grid>
                        </CustomCard>
                    </Grid>
                    { groupAId > 0 &&
                        <Grid item xs>
                            <CustomCard>
                                <Grid container direction="column">
                                    <Grid item xs>
                                        <SportSchoolSelect sportSchoolId={sportSchoolBId}
                                            onChange={(sportSchoolId: number) => {
                                                setsportSchoolBId(sportSchoolId)
                                                setGroupBId(0)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <GroupSelect 
                                            sportSchoolId={sportSchoolBId}
                                            groupId={groupBId}
                                            onChange={(groupId: number, specialization: boolean, scheduleIds: number[]) => {
                                                setGroupBId(groupId)
                                            }}
                                        />
                                    </Grid>
                                    { groupAId > 0 && groupBId > 0 && <Grid item xs>
                                        <SelectButton onClick={() => {
                                            let athletes = JSON.parse(JSON.stringify(groupBAthletes))
                                            setGroupAAthletes(athletes)
                                            setGroupBAthletes([])
                                        }}>Mover todos</SelectButton>
                                    </Grid>
                                    }
                                </Grid>
                            </CustomCard>
                        </Grid>
                    }
                </Grid>
                <Grid container item xs direction="row" spacing={2}>
                    { groupAId > 0 && <Grid container item direction="column" xs>
                        <Grid item xs>
                            <AthletesList athletes={groupAAthletes}
                                onRowClick={(athlete: any) => {
                                    let grBAthletes = groupBAthletes
                                    grBAthletes.push(athlete)
                                    let grAAthletes = groupAAthletes.filter((a: any) => a.id !== athlete.id)
                                    setGroupAAthletes(grAAthletes)
                                    setGroupBAthletes(grBAthletes)
                                }}/>
                        </Grid>
                    </Grid>
                    }
                    { groupBId > 0 && <Grid container item direction="column" xs>
                        <Grid item xs>
                            <AthletesList athletes={groupBAthletes}
                                onRowClick={(athlete: any) => {
                                    let grAAthletes = groupAAthletes
                                    grAAthletes.push(athlete)
                                    let grBAthletes = groupBAthletes.filter((a: any) => a.id !== athlete.id)
                                    setGroupAAthletes(grAAthletes)
                                    setGroupBAthletes(grBAthletes)
                                }}/>
                        </Grid>
                        
                    </Grid>
                    }
                </Grid>
            </Grid>
            <BottomAppBar>
                {props.loading ? <Spinner/> : <SaveButton
                    disabled={!(groupAId && groupAId > 0 && groupBId && groupBId > 0)} 
                    onClick={() => { 
                        props.swapGroups(
                            groupAId, groupBId, 
                            groupAAthletes.map((x:any) => x.id), 
                            groupBAthletes.map((x:any) => x.id)
                        ).then(() => {
                            setSuccess(true)
                        })
                    }}>Guardar</SaveButton>
                }
            </BottomAppBar>
        </>
    )
}

function mapStateToProps(state: any) {
	return {
		group_a_athletes: state.group_reducer.group_a_athletes,
        group_b_athletes: state.group_reducer.group_b_athletes,
        group_a: state.group_reducer.group_a,
        group_b: state.group_reducer.group_b,
        loading: state.api_reducer.loading,
	};
}

const mapDispatchToProps = {
    getGroupAAthletes,
    getGroupBAthletes,
    swapGroups
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GroupSwap);
