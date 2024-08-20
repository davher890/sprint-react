import React from 'react'
import { Grid } from '@mui/material';

import { Table, TableBody, TableHead, TableRow, TableCell, TableContainer, TableSortLabel } from '@mui/material';

import { Order } from '../../../../types/order'

import { withTheme, makeStyles } from '@mui/styles';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
}


function getComparator<Key extends keyof any>(order: Order, orderBy: Key): 
(a: { [key in Key]: number | string }, b: { [key in Key]: number | string },) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const GroupSwapAthletesList: React.FC<any> = (props) => {

    const styles = makeStyles({
		root: {
			"& .MuiTableCell-head": {
				color: props.theme.palette.secondary.main,
				backgroundColor: props.theme.palette.primary.main
			},
			'& .MuiFormLabel-root.Mui-disabled': {
				color: 'red',
			},
			"& .MuiFormLabel-root": {
				color: props.theme.palette.secondary.main,
			},
			"& .MuiFormLabel-root.Mui-focused": {
				color: props.theme.palette.secondary.main,
			},
			"& .MuiInputBase-input.MuiInput-input": {
				color: props.theme.palette.secondary.main,
			}
		},
		sortLabelIcon: {
			color: props.theme.palette.secondary.main,
			// fontSize: 30,
			opacity: 1
		}
	});

	const classes = styles();

    const [athletes, setAthletes] = React.useState<any[]>(props.athletes || [])

    const [orderBy, setOrderBy] = React.useState<string>('')
    const [order, setOrder] = React.useState<Order>('asc')

    React.useEffect(() => {
        setAthletes(props.athletes || [])
    }, [props.athletes])

    const onRowClick = (row: any) => {
		if (props.onRowClick){
			props.onRowClick(row)
		}
	}

    const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    
    return ( 
        <TableContainer>
            <Table stickyHeader size="medium">
                <TableHead className={classes.root}>
                    <TableRow>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'name'}
                                direction={orderBy === 'name' ? order : 'asc'}
                                onClick={createSortHandler('name')}
                            >Nombre</TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'firstSurname'}
                                direction={orderBy === 'firstSurname' ? order : 'asc'}
                                onClick={createSortHandler('firstSurname')}
                            >Primer Apellido</TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'secondSurname'}
                                direction={orderBy === 'secondSurname' ? order : 'asc'}
                                onClick={createSortHandler('secondSurname')}
                            >Segundo Apellido</TableSortLabel>
                        </TableCell>   
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'birthDate'}
                                direction={orderBy === 'birthDate' ? order : 'asc'}
                                onClick={createSortHandler('birthDate')}
                            >Fecha Nac.</TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'category'}
                                direction={orderBy === 'category' ? order : 'asc'}
                                onClick={createSortHandler('category')}
                            >Categoría</TableSortLabel>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        stableSort(athletes, getComparator(order, orderBy)).map((row: any) => {
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
            </Table>
        </TableContainer>
    )
}
export default withTheme(GroupSwapAthletesList);