import { textFilter, selectFilter, numberFilter } from 'react-bootstrap-table2-filter';

const Utils = {

    getAthleteColumns: () => {
        return [
            { dataField: 'id', text: 'Id', hide: true },
            { dataField: 'name', text : 'Nombre', filter: textFilter(), show: true, width : 50 }, 
            { dataField: 'firstSurname', text : 'Primer apellido', filter: textFilter(), show: true, width : 50 }, 
            { dataField: 'secondSurname', text : 'Segundo apellido', filter: textFilter(), show: true, width : 50 }, 
            { dataField: 'birthDate', text : 'Fecha de Nacimiento', show: true, width : 200, type: 'dateTime' }, 
            { dataField: 'gender', text : 'Género', filter: selectFilter({
                options : {
                    'male' : 'Masculino',
                    'female' : 'Femenino'
                }
            }), width : 150 }, 
            { dataField: 'dni', text : 'Dni', filter: textFilter(), width : 150 }, 
            { dataField: 'nationality', text : 'Nacionalidad', filter: textFilter(), width : 150 }, 
            { dataField: 'birthPlace', text : 'Lugar de Nacimiento', filter: textFilter(), width : 150 }, 
            { dataField: 'postalCode', text : 'C.Postal', filter: textFilter(), width : 150 }, 
            { dataField: 'category', text : 'Categoría', filter: textFilter(), width : 150 }, 
            { dataField: 'license', text : 'Licencia', width : 150 }, 
            { dataField: 'licenseType', text : 'Tipo de licencia', width : 150 }, 
            { dataField: 'dorsalNumber', text : 'Dorsal', filter: numberFilter(), width : 150 },
            { dataField: 'dorsalCategory', text : 'Categoría de dorsal', filter: textFilter(), width : 150 },
            { dataField: 'iban', text : 'IBAN', filter: textFilter(), width : 150 }, 
    
        ]
    },

    getSportdataColumns: () => {
        return [
            { dataField: 'id', text: 'id' },
            { dataField: 'season', text: 'Temporada', show: true },
            { dataField: 'category', text: 'Categoría', show: true },
            { dataField: 'attitude', text: 'Actitud', show: true },
            { dataField: 'implication', text: 'Implicación', show: true },
            { dataField: 'technicalLevel', text: 'Nivel técnico', show: true },
            { dataField: 'motivations', text: 'Motivaciones', show: true },
            { dataField: 'outstandingResults', text: 'Resultados destacados', show: true },
            { dataField: 'injuries', text: 'Lesiones', show: true }
        ]
    },

    getFilterParams: (filterObj) => {
        return Object.keys(filterObj).map(field => {

            let f = filterObj[field]

            let filterVal = f.filterVal
            let operator
            if (filterVal.comparator !== undefined) {
                operator = filterVal.comparator
            }
            else {
                operator = f.comparator
            }

            let value
            if (filterVal.number !== undefined) {
                value = filterVal.number
            }
            else {
                value = filterVal.trim()
            }

            // if (value && value.length > 0 && operator && operator.length > 0) {
            if (value && operator && operator.length > 0) {
                return field + "__" + operator + "__" + value
            }
            else {
                return null
            }
        }).filter(x => x)
    }
}

export default Utils;