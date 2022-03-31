import * as React from "react"

import { Grid, AppBar, Toolbar, Snackbar } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import SaveButton from '../custom/SaveButton'
import CustomCard from '../custom/Card'
import GroupSelect from '../custom/GroupSelect'
import AthletesList from '../custom/Athletes/GroupSwapAthletesList'

import { connect } from "react-redux";
import { getGroupAthletes, swapGroups } from "../../redux/actions/groups";

class GroupSwap extends React.Component<any, any> {

	constructor(props: any) {
		super(props);
        this.state = {}
	}

	render() {
		return (
            <Grid>
                <Snackbar open={this.state.success}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000}>
                    <Alert severity="success" onClose={() => { 
                            this.setState({
                                success: false
                            })
                        }}>
                        <AlertTitle>Cambios guardados!</AlertTitle>
                    </Alert>
                </Snackbar>
                <Grid container direction="column" spacing={2}>
                    <Grid container item direction="row" spacing={2}>
                        <Grid item xs>
                            <CustomCard>
                                <Grid container>
                                    <Grid item xs>
                                        <GroupSelect groupId={this.state.groupAId}
                                            onChange={(groupId: number, specialization: boolean, scheduleIds: number[]) => {
                                                this.props.getGroupAthletes(groupId).then(() => {
                                                    this.setState({
                                                        groupAId: groupId,
                                                        groupAAthletes: this.props.group_athletes
                                                    })
                                                })
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </CustomCard>
                        </Grid>
                        <Grid item xs style={{ display: this.state.groupAId ? "block" : "none" }}>
                            <CustomCard>
                                <Grid container>
                                    <Grid item xs>
                                        <GroupSelect groupId={this.state.groupBId}
                                            onChange={(groupId: number, specialization: boolean, scheduleIds: number[]) => {
                                                this.props.getGroupAthletes(groupId).then(() => {
                                                    this.setState({
                                                        groupBId: groupId,
                                                        groupBAthletes: this.props.group_athletes
                                                    })
                                                })
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </CustomCard>
                        </Grid>
                    </Grid>
                    <Grid container item direction="row" spacing={2} style={{ display: this.state.groupBId ? "" : "none" }}>
                        <Grid item xs>
                            <AthletesList athletes={this.state.groupAAthletes}
                                onRowClick={(athlete: any) => {
                                    let grBAthletes = this.state.groupBAthletes
                                    grBAthletes.push(athlete)
                                    let grAAthletes = this.state.groupAAthletes.filter((a: any) => a.id !== athlete.id)
                                    this.setState({
                                        groupBAthletes: grBAthletes,
                                        groupAAthletes: grAAthletes
                                    })
                                }}/>
                        </Grid>
                        <Grid item xs>
                            <AthletesList athletes={this.state.groupBAthletes}
                                onRowClick={(athlete: any) => {
                                    let grAAthletes = this.state.groupAAthletes
                                    grAAthletes.push(athlete)
                                    let grBAthletes = this.state.groupBAthletes.filter((a: any) => a.id !== athlete.id)
                                    this.setState({
                                        groupAAthletes: grAAthletes,
                                        groupBAthletes: grBAthletes
                                    })
                                }}/>
                        </Grid>
                    </Grid>
                </Grid>
                <AppBar position="fixed" style={{ bottom: 0, top: 'auto' }}>
                    <Toolbar>
                        <SaveButton 
                            onClick={() => { 
                                this.props.swapGroups(
                                    this.state.groupAId, this.state.groupBId, 
                                    this.state.groupAAthletes.map((x:any) => x.id), 
                                    this.state.groupBAthletes.map((x:any) => x.id)
                                ).then(() => {
                                    this.setState({
                                        success: true
                                    })
                                })
                            }}>Guardar</SaveButton>
                    </Toolbar>
                </AppBar>
            </Grid>
		)
	}
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
