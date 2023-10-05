import * as React from "react"

import moment from "moment"

import { Grid } from '@material-ui/core';

import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { connect } from "react-redux";
import { getSportSchoolAthletesByDate } from "../../redux/actions/sportSchools";

import SportSchoolSelect from "../../components/custom/SportSchoolSelect";

import { useState } from "react";

const SportSchoolAthletesByDate: React.FC<any> = (props) => {
	
    const [sportSchoolId, setSportSchoolId] = useState<number>(0)
	
	React.useEffect(() => {
		if (sportSchoolId > 0){
			props.getSportSchoolAthletesByDate(sportSchoolId, moment().subtract(90, "days").format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'))
		}
    }, [sportSchoolId])

	return (
		<Grid container direction="column" spacing={5}>
			<Grid item xs>
				<SportSchoolSelect full-width sportSchoolId={sportSchoolId}
					onChange={(id: number) => { setSportSchoolId(id) }}
				/>
			</Grid>
			{ props.athletes_by_date && props.athletes_by_date.length > 0 && 
				<Grid item xs>
					{/* <ResponsiveContainer width="100%" height="100%"> */}
						<LineChart width={1200} height={400} 
							data={props.athletes_by_date.map((d:any) => { return { athletes: d.count, date: moment.unix(d.date_limit/1000).format("YYYY/MM/DD")}})}
							margin={{
								top: 5,
								right: 30,
								left: 20,
								bottom: 5,
							}}	
						>
							<XAxis dataKey="date"/>
							<YAxis/>
							<Tooltip />
							<Legend />
							<CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
							<Line type="monotone" dataKey="athletes" stroke="#8884d8" dot={false} />
						</LineChart>
					{/* </ResponsiveContainer> */}
				</Grid>
			}
		</Grid>
	)
}

function mapStateToProps(state: any) {
	return {
		athletes_by_date: state.sport_school_reducer.athletes_by_date
	};
}

const mapDispatchToProps = {
	getSportSchoolAthletesByDate
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SportSchoolAthletesByDate);