import React from 'react'
import { Grid, Button } from '@mui/material';
import SearchButton from '../../../custom/SearchButton'

import { Table, TableBody, TableHead, TableRow, TableCell, TableContainer, tableCellClasses } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Props {
    athletes: any[];
    onSelectFamily?: any;
    onSelectAthlete?: any
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

const AthletesList: React.FC<Props> = (props) => {

    const [athletes, setAthletes] = React.useState<any[]>(props.athletes || [])

    React.useEffect(() => {
        setAthletes(props.athletes)
    }, [props.athletes])
    
    return ( 
        <Grid container style={{ width: "100%", overflowX: "auto" }}>
            { athletes && athletes.length > 0 && 
                <TableContainer><Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Nombre</StyledTableCell>
                            <StyledTableCell>Primer Apellido</StyledTableCell>
                            <StyledTableCell>Segundo Apellido</StyledTableCell>   
                            <StyledTableCell>Email</StyledTableCell>   
                            <StyledTableCell>Código Atleta</StyledTableCell>
                            <StyledTableCell>Código Familia</StyledTableCell>
                            <StyledTableCell>Teléfono 1</StyledTableCell>
                            <StyledTableCell>Teléfono 2</StyledTableCell>
                            <StyledTableCell>Teléfono 3</StyledTableCell>
                            <StyledTableCell>Fam 1. Email </StyledTableCell>
                            <StyledTableCell>Fam 2. Email </StyledTableCell>
                            { props.onSelectFamily ? <StyledTableCell></StyledTableCell> : null }
                            { props.onSelectAthlete ? <StyledTableCell></StyledTableCell> : null }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            athletes.map((row: any) => {
                                return <TableRow hover key={row.id}>
                                    <TableCell>{ row.name }</TableCell>
                                    <TableCell>{ row.firstSurname }</TableCell>
                                    <TableCell>{ row.secondSurname }</TableCell>
                                    <TableCell>{ row.mail }</TableCell>
                                    <TableCell>{ row.code }</TableCell>
                                    <TableCell>{ row.familyCode }</TableCell>
                                    <TableCell>{ row.phone1 }</TableCell>
                                    <TableCell>{ row.phone2 }</TableCell>
                                    <TableCell>{ row.phone3 }</TableCell>
                                    <TableCell>{ row.familiarOneMail }</TableCell>
                                    <TableCell>{ row.familiarTwoMail }</TableCell>
                                    { props.onSelectFamily ? <TableCell><Button onClick={() => { if (props.onSelectFamily) props.onSelectFamily(row); }}>Seleccionar familia</Button></TableCell> : null }
                                    { props.onSelectAthlete ? <TableCell><SearchButton onClick={() => { if (props.onSelectAthlete) props.onSelectAthlete(row.id); }}>Abrir atleta</SearchButton></TableCell> : null }
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table></TableContainer>
            }           
        </Grid>
    )
}
export default AthletesList;