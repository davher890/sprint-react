import * as React from "react";

import { Card, CardContent, CardHeader } from '@mui/material';

type Props = {
    title?: string,
    children: JSX.Element | JSX.Element[],
};

const CustomCard: React.FC<Props> = ({ title, children }: Props) => (
    <Card raised>
        {title ? <CardHeader title={title} /> : null}
        <CardContent>
            {children}
        </CardContent>
    </Card>
)

export default  CustomCard