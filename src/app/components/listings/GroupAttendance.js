import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import Grid from '@material-ui/core/Grid';

import SubmitButton from '../custom/SubmitButton'
import GroupSelect from '../custom/GroupSelect'
import Select from '../custom/Select'
import CustomCard from '../custom/Card'

import utils from "../../utils/Functions"

import { findGroupAttendance } from "../../services/GroupService";

export default (props) => {

    let d = new Date()
    let previousMonth = (d.getMonth()-1 + 12) % 12
    let nextMonth = (d.getMonth()+1 + 12) % 12
    let months = [
        { id : previousMonth, name: utils.getMonth(previousMonth)},
        { id : d.getMonth(), name: utils.getMonth(d.getMonth())},
        { id : nextMonth, name: utils.getMonth(nextMonth)}
    ]
    const [month, setMonth] = useState(utils.getMonth(d.getMonth))
    const [groupId, setGroupId] = useState(0)

	const handleFormSubmit = () => {
        findGroupAttendance(groupId, month)
            .then(response => {
				response.blob().then(blob => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
					a.href = url;
					a.download = 'table.xlsx';
					a.click();
				})
			})
			.catch(function() {
		        console.log("error");
		    });
    }

    return (
        <CustomCard>
            <Grid container>
                <Grid item xs={2}>
                    <Select label="Mes"  name="month" 
                        value={month} 
                        options={months} 
                        onChange={(e, value) => {
                            setMonth(value.id)
                        }} 
                    />
                </Grid>
                <Grid item xs>
                    <GroupSelect 
                        groupId={groupId}
                        onChange={(id) => {
                            setGroupId(id)
                        }}
                    />
                </Grid>
                <Grid item xs>
                     <SubmitButton 
                        disabled={!(groupId > 0 && month > 0)}
                        onClick={handleFormSubmit}
                    />
                </Grid>
            </Grid>
        </CustomCard>
    )
}