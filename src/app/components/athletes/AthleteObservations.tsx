import * as React from "react"
import moment from 'moment'
import { Grid } from '@material-ui/core'
import TextField from "../custom/TextField"

import { connect } from "react-redux";
import { getAthleteObservations, getAthleteHistoric } from "../../redux/actions/athletes";
import { addObservations } from "../../redux/actions/observations";

import SaveButton from "../custom/SaveButton";

const AthleteObservations: React.FC<any> = (props) => {
    
    const [obsText, setObsText] = React.useState<string>("")
    
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

    const getAllObs = ((observations: any[], historic: any[]) => {
        
        const obsData = observations ? observations.map((obs : any) => {
            return {
                date: obs.createdAt,
                text: obs.text,
                type: ""
            }
        }) : []
        const historicData = historic ? historic.map((h : any) => {
            return {
                date: h.date,
                text: h.observations,
                type: h.type === 'REGISTER' ? 'Alta' : 'Baja'
            }
        }) : []
        Array.prototype.push.apply(obsData, historicData)
        obsData.sort((a:{ date: any, text: any, type: string }, b:{ date: any, text: any, type: string }) => {
            return a.date < b.date ? 1 : -1
        });
        return obsData
    })

    return (
        <Grid container direction="column" spacing={1}>
            { 
            getAllObs(props.observations, props.historic).map((obs : any) => {
                return <Grid item xs>
                    { moment(new Date(obs.date)).format('DD/MM/YYYY')} : {obs.type} {obs.text}
                </Grid>
            })}
            <Grid container item direction="row" xs>
                <Grid item xs>
                    <TextField fullWidth name="obsText" value={obsText} label="Observaciones" multiline 
                        onChange={(e: any) => setObsText(e.target.value) } />
                </Grid>
                <Grid item xs>
                    <SaveButton onClick={() => saveObservations() }/>
                </Grid>
            </Grid>
        </Grid>
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
    addObservations
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AthleteObservations);