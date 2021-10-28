
const Utils = {

    getAthleteColumns: () => {
        return [
            { dataField: 'id', text: 'Id', show: false },
            { dataField: 'name', text : 'Nombre', filter: { type: "text" } }, 
            { dataField: 'firstSurname', text : 'Primer apellido', filter: { type: "text" } }, 
            { dataField: 'secondSurname', text : 'Segundo apellido', filter: { type: "text" } }, 
            { dataField: 'birthDate', text : 'Fecha de Nacimiento' }, 
            { dataField: 'gender', text : 'Género', filter: { 
                type: "options",
                options : [
                    { id: 'male', name: 'Masculino' },
                    { id: 'female', name: 'Femenino' }
                ]
            }}, 
            { dataField: 'dni', text : 'Dni', filter: { type: "text" } }, 
            { dataField: 'firstRegisterDate', text : 'Fecha incorporacion' },
            { dataField: 'sportSchoolId', text : 'Escuela', filter: { 
                type: "options",
                options : [
                    { id : '1', name: 'Santa Ana' },
                    { id : '2', name: 'Paracuellos' },
                    { id : '3', name: 'Externos' }
                ]
            }}, 
            { dataField: 'groupName', text : 'Grupo', filter: { type: "text" } }, 
            { dataField: 'schedules', text : 'Dias', filter: { type: "text" } }, 
            { dataField: 'nationality', text : 'Nacionalidad', show: false, filter: { type: "text" } }, 
            { dataField: 'birthPlace', text : 'Lugar de Nacimiento', show: false, filter: { type: "text" } }, 
            { dataField: 'postalCode', text : 'C.Postal', show: false, filter: { type: "text" } }, 
            { dataField: 'category', text : 'Categoría', show: false, filter: { type: "text" } }, 
            { dataField: 'license', text : 'Licencia', show: false }, 
            { dataField: 'licenseType', text : 'Tipo de licencia', show: false }, 
            { dataField: 'dorsalNumber', text : 'Dorsal', show: false, filter: { type: "number" } },
            { dataField: 'dorsalCategory', text : 'Categoría de dorsal', show: false, filter: { type: "text" } },
            { dataField: 'iban', text : 'IBAN', show: false, filter: { type: "text" } }
        ]
    },

    getSportdataColumns: () => {
        return [
            { dataField: 'id', text: 'id', show: false },
            { dataField: 'season', text: 'Temporada' },
            { dataField: 'category', text: 'Categoría' },
            { dataField: 'attitude', text: 'Actitud' },
            { dataField: 'implication', text: 'Implicación' },
            { dataField: 'technicalLevel', text: 'Nivel técnico' },
            { dataField: 'motivations', text: 'Motivaciones' },
            { dataField: 'outstandingResults', text: 'Resultados destacados' },
            { dataField: 'injuries', text: 'Lesiones' }
        ]
    },

    getTrainerColumns: () => {
        return [
            { dataField: 'name', text: 'Nombre', filter: { type: "text" } }
        ]
    },

    getSportSchoolColumns: () => {
        return [
            { dataField: 'id', text: 'Id', show: false },
            { dataField: 'name', text: 'Nombre', filter: { type: "text" } },
            { dataField: 'municipality', text: 'Municipio', filter: { type: "text" } },
            { dataField: 'address', text: 'Dirección', filter: { type: "text" } }
        ]
    },

    getScheduleColumns: () => {
        return [ 
            { dataField: 'day', text : 'Día' }, 
            { dataField: 'start', text : 'Inicio' }, 
            { dataField: 'end', text : 'Fin' }
        ]
    },

    getGroupColumns: () => {
        return [
            { dataField: 'name', text : 'Nombre', filter: { type: "text" } },
            { dataField: 'sportSchoolName', text : 'Escuela Deportiva' } 
        ]
    },

    getFamilyColumns: () => {
        return [
            { dataField: 'code', text : 'Código', filter: { type: "number" } },
            { dataField: 'count', text : 'Número de familiares' }
        ]
    },

    getFilterParams: (filterObj: any) => {
        return Object.keys(filterObj).map((field: string) => {

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