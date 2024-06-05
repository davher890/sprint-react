import * as React from "react"
import moment from 'moment'
import { Grid } from '@material-ui/core'
import TextField from "../custom/TextField"

import { connect } from "react-redux";
import { getAthleteObservations, getAthleteHistoric } from "../../redux/actions/athletes";
import { addObservations, removeObservation } from "../../redux/actions/observations";

import SaveButton from "../custom/SaveButton";
import DeleteButton from '../custom/DeleteButton'
import ConfirmDialog from "../custom/ConfirmDialog";

import { isManager, isAdmin } from "../../services/LoginService";

const AthleteObservations: React.FC<any> = (props) => {
    
    const [obsText, setObsText] = React.useState<string>("")
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState<boolean>(false)
    const [obsId, setObsId] = React.useState<number>(0)

    const [allObs, setAllObs] = React.useState<any[]>([])

    const saveObservations = (() => {
        props.addObservations({
            athleteId: props.athleteId,
            text: obsText
        }).then(() => {
            setObsText("")
            props.getAthleteObservations(props.athleteId)
        })
    })

    React.useEffect(() => {
        if (props.athleteId){
            props.getAthleteObservations(props.athleteId)
            props.getAthleteHistoric(props.athleteId)
        }
    }, [props.athleteId])

    React.useEffect(() => {
        setAllObs(mergeObservations(props.observations, props.historic))
    }, [props.observations, props.historic])

    const mergeObservations = ((observations: any[], historic: any[]) => {
        
        const obsData = observations ? observations.map((obs : any) => {
            return {
                id: obs.id,
                date: obs.createdAt,
                text: obs.text,
                type: "",
                isObs: true
            }
        }) : []
        const historicData = historic ? historic.map((h : any) => {
            return {
                id: h.id,
                date: h.date,
                text: h.observations,
                type: h.type === 'REGISTER' ? 'Alta' : 'Baja'
            }
        }) : []
        Array.prototype.push.apply(obsData, historicData)
        obsData.sort((a:{ id: number, date: any, text: any, type: string }, b:{ id: number, date: any, text: any, type: string }) => {
            return a.date < b.date ? 1 : -1
        });
        return obsData
    })

    return (
        <>
            <ConfirmDialog open={openDeleteDialog} 
                                    confirm={async () => {
                                        await props.removeObservation(obsId); 
                                        setOpenDeleteDialog(false)
                                        props.getAthleteObservations(props.athleteId)
                                    }}
                                    cancel={() => setOpenDeleteDialog(false)}
                                />
            <Grid container direction="column" spacing={1}>
                { 
                allObs.map((obs : any) => {
                    return <Grid key={`obs-${obs.id}`} container direction="row">
                        <Grid item xs>
                            { moment(new Date(obs.date)).format('DD/MM/YYYY')} : {obs.type} {obs.text}
                        </Grid>
                        <Grid item xs>
                            {obs.isObs && <DeleteButton text='Borrar' onClick={async () => {
                                await setObsId(obs.id)
                                setOpenDeleteDialog(true)
                            }}
                            />}
                        </Grid>
                    </Grid>
                })}
                <Grid container item direction="row" xs>
                    <Grid item xs>
                        <TextField { ...props } fullWidth name="obsText" value={obsText} label="Observaciones" multiline 
                            onChange={(e: any) => setObsText(e.target.value) } />
                    </Grid>
                    { (isAdmin() || isManager()) && 
                        <Grid item xs>
                            <SaveButton onClick={() => saveObservations() }/>
                        </Grid>
                    }
                </Grid>
            </Grid>
        </>
    )
}

function mapStateToProps(state: any) {
	return {
        observations: state.athlete_reducer.athlete_observations,
        historic: state.athlete_reducer.athlete_historic
	};
}

const mapDispatchToProps = {
    getAthleteObservations,
    getAthleteHistoric,
    addObservations,
    removeObservation
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AthleteObservations);