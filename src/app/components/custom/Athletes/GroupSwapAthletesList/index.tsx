import React from 'react'
import { Grid } from '@material-ui/core';

import { Table, TableBody, TableHead, TableRow, TableCell, TableContainer } from '@material-ui/core';

const GroupSwapAthletesList: React.FC<any> = (props) => {

    const [athletes, setAthletes] = React.useState<any[]>(props.athletes || [])

    React.useEffect(() => {
        setAthletes(props.athletes || [])
    }, [props.athletes])

    const onRowClick = (row: any) => {
		if (props.onRowClick){
			props.onRowClick(row)
		}
	}
    
    return ( 
        <Grid container style={{ width: "100%", overflowX: "auto" }}>
            <Grid item xs>
                <TableContainer><Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Primer Apellido</TableCell>
                            <TableCell>Segundo Apellido</TableCell>   
                            <TableCell>Fecha Nac.</TableCell>
                            <TableCell>Categoría</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            athletes.map((row: any) => {
                                return <TableRow hover key={row.id} onClick={() => onRowClick(row)}>
                                    <TableCell>{ row.name }</TableCell>
                                    <TableCell>{ row.firstSurname }</TableCell>
                                    <TableCell>{ row.secondSurname }</TableCell>
                                    <TableCell>{ new Intl.DateTimeFormat('sq-AL').format(new Date(row.birthDate)) }</TableCell>
                                    <TableCell>{ row.category }</TableCell>
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table></TableContainer>
            </Grid>
        </Grid>
    )
}
export default GroupSwapAthletesList;