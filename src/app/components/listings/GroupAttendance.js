import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Grid } from '@material-ui/core';

import DownloadButton from '../custom/DownloadButton'
import GroupSelect from '../custom/GroupSelect'
import Select from '../custom/Select'
import CustomCard from '../custom/Card'

import utils from "../../utils/Functions"

import { connect } from "react-redux";
import { downloadGroupAttendance } from "../../redux/actions/groups";

const GroupAttendante = (props) => {

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
        props.downloadGroupAttendance(groupId, month)
            // .then(response => {
			// 	response.blob().then(blob => {
			// 		let url = window.URL.createObjectURL(blob);
			// 		let a = document.createElement('a');
			// 		a.href = url;
			// 		a.download = 'listado.xlsx';
			// 		a.click();
			// 	})
			// })
			// .catch(function() {
		    //     console.log("error");
		    // });
    }

    return (
        <Container fixed>
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
                        <DownloadButton type="submit" text="Descargar"
                            disabled={!(groupId > 0 && month > 0)}
                            onClick={handleFormSubmit}
                        />
                    </Grid>
                </Grid>
            </CustomCard>
        </Container>
    )
}


function mapStateToProps(state) {
	return {};
}

const mapDispatchToProps = {
	downloadGroupAttendance
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GroupAttendante);