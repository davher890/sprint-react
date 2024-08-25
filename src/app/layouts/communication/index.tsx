import * as React from "react"
import { useState } from "react";

import { Button, Grid } from '@mui/material';

import CustomCard from '../../components/custom/Card'
import GroupSelect from '../../components/custom/GroupSelect'
import SportSchoolSelect from "../../components/custom/SportSchoolSelect";

import { connect } from "react-redux";
import { getGroupAthletes, groupCommunication } from "../../redux/actions/groups";

import AthletesList from "../../components/custom/Athletes/AthletesList";
import TextField from "../../components/custom/TextField";

interface Props {
    getGroupAthletes: any;
    group_athletes: any;
    groupCommunication: any
  }

const Communication: React.FC<Props> = (props) => {

    const [sportSchoolId, setSportSchoolId] = useState<number>(0)
	const [groupId, setGroupId] = useState<number>(0)
    const [subject, setSubject] = useState<string>('');
    const [body, setBody] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (props.group_athletes && props.group_athletes.length > 0 && subject && body) {
            props.groupCommunication(groupId, subject, body)
        } else {
            alert('Please fill in all fields');
        }
    };
    

    React.useEffect(() => {
        props.getGroupAthletes(groupId)
    }, [groupId])

    return (
        <form onSubmit={handleSubmit}>
            <Grid container direction="column" spacing={3}>
                <Grid container item xs>
                    <Grid item xs>
                        <CustomCard>
                            <Grid container direction="column" spacing={3}>
                                <Grid container item spacing={1}>
                                    <Grid item xs>
                                        <SportSchoolSelect sportSchoolId={sportSchoolId}
                                            onChange={(sportSchoolId: number) => {
                                                setSportSchoolId(sportSchoolId)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <GroupSelect
                                            sportSchoolId={sportSchoolId}
                                            groupId={groupId}
                                            onChange={(grId: number) => {
                                                setGroupId(grId)
                                            }}
                                            // onScheduleChange={(scheduleIds: number[]) => {
                                            //     setScheduleIds(scheduleIds)
                                            // }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container item xs>
                                <AthletesList athletes={props.group_athletes}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Asunto"
                                    value={subject}
                                    onChange={(e:any) => setSubject(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Mensaje"
                                    value={body}
                                    onChange={(e:any) => setBody(e.target.value)}
                                    multiline
                                    rows={4}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                Enviar Correo
                                </Button>
                            </Grid>
                        </CustomCard>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    )
}

function mapStateToProps(state: any) {
	return {
        group_athletes: state.group_reducer.group_athletes
	};
}

const mapDispatchToProps = {
    getGroupAthletes,
    groupCommunication
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Communication);
