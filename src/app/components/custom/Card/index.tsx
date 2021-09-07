import * as React from "react";

import { Card, Grid, CardContent, CardHeader } from '@material-ui/core';

type Props = {
    title?: string,
    children: JSX.Element | JSX.Element[],
};

const CustomCard: React.FC<Props> = ({ title, children }: Props) => (
    <Grid container>
        <Grid item xs>
            <Card>
                {title ? <CardHeader title={title} /> : null}
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        </Grid>
    </Grid>
)

export default  CustomCard