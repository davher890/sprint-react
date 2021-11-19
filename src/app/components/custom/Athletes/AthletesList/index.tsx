import React from 'react'
import { Grid, Button } from '@material-ui/core';
import SearchButton from '../../../custom/SearchButton'

import { Table, TableBody, TableHead, TableRow, TableCell, TableContainer } from '@material-ui/core';

const AthletesList: React.FC<any> = (props) => {

    const [athletes, setAthletes] = React.useState<any[]>(props.athletes || [])

    React.useEffect(() => {
        setAthletes(props.athletes)
    }, [props.athletes])
    
    return ( 
        <Grid container>
            <TableContainer><Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Primer Apellido</TableCell>
                        <TableCell>Segundo Apellido</TableCell>   
                        <TableCell>Código Atleta</TableCell>
                        <TableCell>Código Familia</TableCell>
                        <TableCell>Teléfono 1</TableCell>
                        <TableCell>Teléfono 2</TableCell>
                        <TableCell>Teléfono 3</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        athletes.map((row: any) => {
                            return <TableRow hover key={row.id}>
                                <TableCell>{ row.name }</TableCell>
                                <TableCell>{ row.firstSurname }</TableCell>
                                <TableCell>{ row.secondSurname }</TableCell>
                                <TableCell>{ row.code }</TableCell>
                                <TableCell>{ row.familyCode }</TableCell>
                                <TableCell>{ row.phone1 }</TableCell>
                                <TableCell>{ row.phone2 }</TableCell>
                                <TableCell>{ row.phone3 }</TableCell>
                                <TableCell><Button onClick={() => { props.onSelectFamily(row.familyCode); }}>Seleccionar familia</Button>
                                </TableCell>
                                <TableCell><SearchButton onClick={() => { props.onSelectAthlete(row.id); }}>Abrir atleta</SearchButton>
                                </TableCell>
                            </TableRow>
                        })
                    }
                </TableBody>
            </Table></TableContainer>
        </Grid>
    )
}
export default AthletesList;