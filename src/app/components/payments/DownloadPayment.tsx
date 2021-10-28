import React, { useState } from "react";
import { Container, Grid, Checkbox } from '@material-ui/core';

import moment from "moment";

import DownloadButton from '../custom/DownloadButton'
import CustomCard from '../custom/Card'
import TextField from '../custom/TextField'


import { connect } from "react-redux";
import { downloadAthletesPayments } from "../../redux/actions/payments";

const DownloadPayment: React.FC<any> = (props) => {

    let d = new Date()

    const [membership, setMembership] = useState<boolean>(false)
    const [membershipStartDate, setMembershipStartDate] = useState<Date>(new Date())
    const [membershipEndDate, setMembershipEndDate] = useState<Date>(new Date())
    const [enrollment, setEnrollment] = useState<boolean>(false)
    const [enrollmentStartDate, setEnrollmentStartDate] = useState<Date>(new Date())
    const [enrollmentEndDate, setEnrollmentEndDate] = useState<Date>(new Date())
    
    const [september, setSeptember] = useState<boolean>(false)
    const [q1, setQ1] = useState<boolean>(false)
    const [q2, setQ2] = useState<boolean>(false)
    const [q4, setQ4] = useState<boolean>(false)
    
	const handleFormSubmit = () => {
        props.downloadAthletesPayments()
    }

    const dateMinus15Days = () => {
        var d = new Date();
        d.setDate(d.getDate()-15);
        return moment(d).format('DD/MM/YYYY')
    }

    return (
        <Container fixed>
            <CustomCard>
                <Grid container direction='column'>
                    <Grid container>
                        <Grid item xs>
                            <Checkbox name="membership" checked={membership} 
                                onChange={e => {
                                    setMembership(e.target.checked)
                                }}
                            />
                            Cuota de Socio
                        </Grid>
                        {membership ? 
                            <Grid container item xs>
                                <Grid item xs>
                                    <TextField value={membershipStartDate} margin="dense" label="Desde" type="date"
                                        onChange={(e: any) => {
                                            setMembershipStartDate(e.target.value)
                                        }}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <TextField value={membershipEndDate} margin="dense" label="Desde" type="date"
                                        onChange={(e: any) => {
                                            setMembershipEndDate(e.target.value)
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        : null }
                    </Grid>
                    <Grid container>
                        <Grid item xs={3}>
                            <Checkbox name="enrollment" checked={enrollment} 
                                onChange={e => {
                                    setEnrollment(e.target.checked)
                                }}
                            />
                            Matrícula
                        </Grid>
                        {enrollment ? 
                            <Grid item xs>
                                Se cobrara la matrícula a aquellos atletas nuevos que se inscribieron antes de {dateMinus15Days()}
                            </Grid> 
                        : null}
                    </Grid>
                    <Grid container direction="column">
                        <Grid item xs>
                            <Checkbox name="september" checked={september} 
                                onChange={e => {
                                    let checked = e.target.checked
                                    if (checked === true){
                                        setQ1(false)
                                        setQ2(false)
                                        setQ4(false)
                                    }
                                    setSeptember(e.target.checked)
                                }}
                            />
                            Septiembre
                        </Grid>
                        <Grid item xs>
                            <Checkbox name="q4" checked={q4} 
                                onChange={e => {
                                    let checked = e.target.checked
                                    if (checked === true){
                                        setSeptember(false)
                                        setQ1(false)
                                        setQ2(false)
                                    }
                                    setQ4(e.target.checked)
                                }}
                            />
                            Octubre - Noviembre - Diciembre
                        </Grid>
                        <Grid item xs>
                            <Checkbox name="q1" checked={q1} 
                                onChange={e => {
                                    let checked = e.target.checked
                                    if (checked === true){
                                        setSeptember(false)
                                        setQ2(false)
                                        setQ4(false)
                                    }
                                    setQ1(e.target.checked)
                                }}
                            />
                            Enero - Febrero - Marzo
                        </Grid>
                        <Grid item xs>
                            <Checkbox name="q2" checked={q2} 
                                onChange={e => {
                                    let checked = e.target.checked
                                    if (checked === true){
                                        setSeptember(false)
                                        setQ1(false)
                                        setQ4(false)
                                    }
                                    setQ2(checked)
                                }}
                            />
                            Abril - Mayo - Junio
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs>
                            <DownloadButton type="submit" text="Descargar" onClick={handleFormSubmit}/>
                        </Grid>
                    </Grid>
                </Grid>
            </CustomCard>
        </Container>
    )
}


function mapStateToProps(state: any) {
	return {};
}

const mapDispatchToProps = {
	downloadAthletesPayments
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DownloadPayment);