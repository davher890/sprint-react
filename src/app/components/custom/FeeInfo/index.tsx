import React from 'react'

import { Grid } from '@material-ui/core';

import CustomCard from '../Card'
import MemoTextField from '../TextField'

import { getAthleteFee } from "../../../redux/actions/athletes";

// Redux
import { connect } from "react-redux";

const FeeInfo: React.FC<any> = (props) => {

    React.useEffect(() => {
        props.getAthleteFee(props)
    }, [props.getAthleteFee, props.scheduleIds, props.scheduleIdsStr, props.paymentType])


    return (
        <CustomCard title="Calculo de cuota">
            <Grid container spacing={1}>
                <Grid item>
                    <MemoTextField name="membershipFee" label="Cuota de socio" type="number" disabled value={props.athlete_fee.membershipFee || 0} />
                </Grid>
                <Grid item>
                    <MemoTextField name="enrollmentFee" label="Matricula" type="number" disabled value={props.athlete_fee.enrollmentFee || 0} />
                </Grid>
                <Grid item>
                    <MemoTextField name="monthlyFee" label="Mensualidad" type="number" disabled value={props.athlete_fee.monthlyFee || 0} />
                </Grid>
            </Grid>
        </CustomCard>
    )
}


const mapDispatchToProps = {
    getAthleteFee
}

const mapStateToProps = (state: any) => {
    return {
        athlete_fee: state.athlete_reducer.athlete_fee
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeeInfo);