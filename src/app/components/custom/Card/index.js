import React from "react";

import { Card, Grid, CardContent, CardHeader, Box } from '@material-ui/core';



export default (props) => {

    // const styles = {
    //     bgcolor: 'background.paper',
    //     borderRadius: 25,
    //     border: 3,
    //     borderTop: 1,
    //     borderLeft: 1,
    //     // m: 1,
    //     borderColor: 'grey',
    //     // style: { width: '5rem', height: '5rem' },
    //     // borderWidth: "thick",
    //     // backgroundColor: theme.palette.primary.light,
    //     // color: theme.palette.primary.contrastText,
    //     // boxShadow: "red"
    // }

    return (
        <Grid container>
            <Grid item xs>
                <Card>
                    {props.title ? <CardHeader title={props.title} /> : null}
                    <CardContent>
                        {props.children}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}