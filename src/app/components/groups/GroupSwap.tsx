import React, { useState } from "react";

import { Grid, AppBar, Toolbar, Snackbar } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import SaveButton from '../custom/SaveButton'
import CustomCard from '../custom/Card'
import GroupSelect from '../custom/GroupSelect'
import AthletesList from '../custom/Athletes/GroupSwapAthletesList'
import SportSchoolSelect from "../custom/SportSchoolSelect";

import { connect } from "react-redux";
import { getGroupAthletes, swapGroups } from "../../redux/actions/groups";

const GroupSwap: React.FC<any> = (props) => {

    const [success, setSuccess] = useState<boolean>(false)

    const [sportSchoolAId, setsportSchoolAId] = useState<number>(0)
    const [sportSchoolBId, setsportSchoolBId] = useState<number>(0)
    
    const [groupAId, setGroupAId] = useState<number>(0)
    const [groupBId, setGroupBId] = useState<number>(0)

    const [groupAAthletes, setGroupAAthletes] = useState<any[]>([])
    const [groupBAthletes, setGroupBAthletes] = useState<any[]>([])
    
    return (
        <Grid>
            <Snackbar open={success}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000}>
                <Alert severity="success" onClose={() => { 
                        setSuccess(false)
                    }}>
                    <AlertTitle>Cambios guardados!</AlertTitle>
                </Alert>
            </Snackbar>
            <Grid container direction="column" spacing={2}>
                <Grid container item direction="row" spacing={2}>
                    <Grid item xs>
                        <CustomCard>
                            <Grid container direction="column">
                                <Grid item xs>
                                    <SportSchoolSelect sportSchoolId={sportSchoolAId}
                                        onChange={(sportSchoolId: number) => {
                                            setsportSchoolAId(sportSchoolId)
                                        }}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <GroupSelect 
                                        sportSchoolId={sportSchoolAId}
                                        groupId={groupAId}
                                        onChange={(groupId: number, specialization: boolean, scheduleIds: number[]) => {
                                            props.getGroupAthletes(groupId).then(() => {
                                                setGroupAId(groupId)
                                                setGroupAAthletes([...props.group_athletes])
                                            })
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </CustomCard>
                    </Grid>
                    <Grid item xs style={{ display: groupAId ? "block" : "none" }}>
                        <CustomCard>
                            <Grid container direction="column">
                                <Grid item xs>
                                    <SportSchoolSelect sportSchoolId={sportSchoolBId}
                                        onChange={(sportSchoolId: number) => {
                                            setsportSchoolBId(sportSchoolId)
                                        }}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <GroupSelect 
                                        sportSchoolId={sportSchoolBId}
                                        groupId={groupBId}
                                        onChange={(groupId: number, specialization: boolean, scheduleIds: number[]) => {
                                            props.getGroupAthletes(groupId).then(() => {
                                                setGroupBId(groupId)
                                                setGroupBAthletes([...props.group_athletes])
                                            })
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </CustomCard>
                    </Grid>
                </Grid>
                <Grid container item direction="row" spacing={2} style={{ display: groupBId ? "" : "none" }}>
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
            </Grid>
            <AppBar position="fixed" style={{ bottom: 0, top: 'auto' }}>
                <Toolbar>
                    <SaveButton 
                        onClick={() => { 
                            props.swapGroups(
                                groupAId, groupBId, 
                                groupAAthletes.map((x:any) => x.id), 
                                groupBAthletes.map((x:any) => x.id)
                            ).then(() => {
                                setSuccess(true)
                            })
                        }}>Guardar</SaveButton>
                </Toolbar>
            </AppBar>
        </Grid>
    )
}

function mapStateToProps(state: any) {
	return {
		group_athletes: state.group_reducer.group_athletes,
        groups: state.group_reducer.groups
	};
}

const mapDispatchToProps = {
    getGroupAthletes,
    swapGroups
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GroupSwap);
