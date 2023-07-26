
import functions from "./Functions";

const Utils = {

    getAthleteColumns: () => {
        return [
            { dataField: 'name', text : 'Nombre', filter: { type: "text" } }, 
            { dataField: 'firstSurname', text : 'Primer apellido', filter: { type: "text" } }, 
            { dataField: 'secondSurname', text : 'Segundo apellido', filter: { type: "text" } }, 
            { dataField: 'birthDate', text : 'Fecha de Nacimiento', type: "date" }, 
            { dataField: 'gender', text : 'Género', filter: { 
                type: "options",
                options : [
                    { id: 'male', name: 'Masculino' },
                    { id: 'female', name: 'Femenino' }
                ]
            }}, 
            { dataField: 'dni', text : 'Dni', filter: { type: "text" } }, 
            { dataField: 'lastRegisterDate', text : 'Fecha incorporacion', type: "date" },
            { dataField: 'lastUnregisterDate', text : 'Fecha baja', type: "date" },
            { dataField: 'sportSchoolId', text : 'Escuela', filter: { 
                type: "options",
                options : functions.getSportSchools()
            }}, 
            { dataField: 'groupName', text : 'Grupo', filter: { type: "text" } }, 
            { dataField: 'days', text : 'Dias' }, 
            { dataField: 'numDays', text : 'Num. Dias' }, 
            { dataField: 'nationality', text : 'Nacionalidad', show: false, filter: { type: "text" } }, 
            { dataField: 'birthPlace', text : 'Lugar de Nacimiento', show: false, filter: { type: "text" } }, 
            { dataField: 'postalCode', text : 'C.Postal', show: false, filter: { type: "text" } }, 
            { dataField: 'category', text : 'Categoría', show: false, filter: { 
                type: "options",
                options : functions.getCategories()
            } }, 
            { dataField: 'license', text : 'Licencia', show: false }, 
            { dataField: 'licenseType', text : 'Tipo de licencia', show: false }, 
            { dataField: 'dorsalNumber', text : 'Dorsal', show: false, filter: { type: "number" } },
            { dataField: 'dorsalCategory', text : 'Categoría de dorsal', show: false, filter: { 
                type: "options",
                options : functions.getDorsalCategories()
            } },
            { dataField: 'iban', text : 'IBAN', show: false, filter: { type: "text" } },
            { dataField: 'paymentType', text : 'Forma de pago', show: false, filter: { type: "text" } },
            { dataField: 'feeType', text : 'Tipo de cuota', show: false, filter: { type: "text" } },
            { dataField: 'holderName', text : 'Nombre Tit. Cuenta', show: false, filter: { type: "text" } },
            { dataField: 'holderFirstSurname', text : '1er Apellido Tit. Cuenta', show: false, filter: { type: "text" } },
            { dataField: 'holderSecondSurname', text : '2o Apellido Tit. Cuenta', show: false, filter: { type: "text" } },
            { dataField: 'holderDni', text : 'Dni Tit. Cuenta', show: false, filter: { type: "text" } },
            { dataField: 'mail', text : 'Email', show: false, filter: { type: "text" } },
            { dataField: 'familiarOneName', text : 'Fam.1 Nombre', show: false, filter: { type: "text" } },
            { dataField: 'familiarOneFirstSurname', text : 'Fam.1 1er.Apellido', show: false, filter: { type: "text" } },
            { dataField: 'familiarOneSecondSurname', text : 'Fam.1 2o.Apellido', show: false, filter: { type: "text" } },
            { dataField: 'familiarOneDni', text : 'Fam.1 Dni', show: false, filter: { type: "text" } },
            { dataField: 'familiarOneMail', text : 'Fam.1 Email', show: false, filter: { type: "text" } },
            { dataField: 'familiarTwoName', text : 'Fam.2 Nombre', show: false, filter: { type: "text" } },
            { dataField: 'familiarTwoFirstSurname', text : 'Fam.2 1er.Apellido', show: false, filter: { type: "text" } },
            { dataField: 'familiarTwoSecondSurname', text : 'Fam.2 2o.Apellido', show: false, filter: { type: "text" } },
            { dataField: 'familiarTwoDni', text : 'Fam.2 Dni', show: false, filter: { type: "text" } },
            { dataField: 'familiarTwoMail', text : 'Fam.2 Email', show: false, filter: { type: "text" } },
            { dataField: 'phone1', text : 'Tel.1', show: false, filter: { type: "text" } },
            { dataField: 'phone2', text : 'Tel.2', show: false, filter: { type: "text" } },
            { dataField: 'phone3', text : 'Tel.3', show: false, filter: { type: "text" } },
            { dataField: 'address', text: 'Dirección', filter: { type: "text" } },
            { dataField: 'municipality', text: 'Municipio', filter: { type: "text" } },
            { dataField: 'code', text : 'Codigo atleta', show: false, filter: { type: "number" } },
            { dataField: 'familyCode', text : 'Codigo familia', show: false, filter: { type: "number" } }
        ]
    },

    getReceiptAthleteColumns: (receiptType: string) => {
        let commonColumns = [
            { dataField: 'athlete_id', text: 'athlete_id', show: false },
            { dataField: 'code', text : 'Codigo', filter: { type: "number" } }, 
            { dataField: 'familyCode', text : 'Codigo familia', filter: { type: "number" } }, 
            { dataField: 'name', text : 'Nombre', filter: { type: "text" } }, 
            { dataField: 'firstSurname', text : 'Primer apellido', filter: { type: "text" } }, 
            { dataField: 'secondSurname', text : 'Segundo apellido', filter: { type: "text" } }, 
            { dataField: 'lastRegisterDate', text : 'Fecha incorporacion', sort: false, type: "date" },
            { dataField: 'sportSchoolId', text : 'Escuela', filter: { 
                type: "options",
                options : functions.getSportSchools()
            }},
            { dataField: 'groupName', text : 'Grupo', filter: { type: "text" } }, 
            { dataField: 'days', text : 'Dias', sort: false }, 
            { dataField: 'numDays', text : 'Num. Dias', sort: false }, 
            { dataField: 'specialization', text : 'Especializacion', sort: false }, 
            { dataField: 'status', text : 'Estado' },
            { dataField: 'paymentType', text : 'Forma de pago' }
        ] 
        let trimestralColumns = [
            { dataField: 'feeType', text : 'Tipo de cuota' },
            { dataField: 'monthlyFee', text : 'Mensualidad', sort: true }, 
            { dataField: 'enrollmentFee', text : 'Matricula', sort: true }, 
            { dataField: 'membershipFee', text : 'Cuota de socio', sort: true }
        ]

        let licenseColumns = [
            { dataField: 'licenseType', text : 'Tipo de licencia'},
            { dataField: 'licenseTerritorialFee', text : 'Licencia territorial', sort: true }, 
            { dataField: 'licenseNationalFee', text : 'Licencia nacional', sort: true }
        ]
        return receiptType !== undefined && receiptType === 'LICENSE' ? [ ...commonColumns, ...licenseColumns] : [ ...commonColumns, ...trimestralColumns]
    },

    getGroupAthleteColumns: () => {
        return [
            { dataField: 'name', text : 'Nombre', filter: { type: "text" } }, 
            { dataField: 'firstSurname', text : 'Primer apellido', filter: { type: "text" } }, 
            { dataField: 'secondSurname', text : 'Segundo apellido', filter: { type: "text" } }, 
            { dataField: 'birthDate', text : 'Fecha de Nacimiento', type: "date" }, 
            { dataField: 'gender', text : 'Género', filter: { 
                type: "options",
                options : [
                    { id: 'male', name: 'Masculino' },
                    { id: 'female', name: 'Femenino' }
                ]
            }}, 
            { dataField: 'dni', text : 'Dni', filter: { type: "text" } }, 
            { dataField: 'lastRegisterDate', text : 'Fecha incorporacion', type: "date" },
            { dataField: 'lastUnregisterDate', text : 'Fecha baja', type: "date" },
            { dataField: 'sportSchoolId', text : 'Escuela', filter: { 
                type: "options",
                options : functions.getSportSchools()
            }}, 
            { dataField: 'groupName', text : 'Grupo', filter: { type: "text" } }, 
            { dataField: 'days', text : 'Dias' }, 
            { dataField: 'numDays', text : 'Num. Dias' }, 
            { dataField: 'nationality', text : 'Nacionalidad', show: false, filter: { type: "text" } }, 
            { dataField: 'birthPlace', text : 'Lugar de Nacimiento', show: false, filter: { type: "text" } }, 
            { dataField: 'category', text : 'Categoría', show: false, filter: { type: "text" } }, 
            { dataField: 'license', text : 'Licencia', show: false }, 
            { dataField: 'licenseType', text : 'Tipo de licencia', show: false }, 
            { dataField: 'dorsalNumber', text : 'Dorsal', show: false, filter: { type: "number" } },
            { dataField: 'dorsalCategory', text : 'Categoría de dorsal', show: false, filter: { type: "text" } },
            { dataField: 'mail', text : 'Email', show: false, filter: { type: "text" } },
            { dataField: 'familiarOneMail', text : 'Fam.1 Email', show: false, filter: { type: "text" } },
            { dataField: 'familiarTwoMail', text : 'Fam.2 Email', show: false, filter: { type: "text" } },
            { dataField: 'phone1', text : 'Tel.1', show: false, filter: { type: "text" } },
            { dataField: 'phone2', text : 'Tel.2', show: false, filter: { type: "text" } },
            { dataField: 'phone3', text : 'Tel.3', show: false, filter: { type: "text" } },
            { dataField: 'code', text : 'Codigo atleta', show: false, filter: { type: "number" } },
            { dataField: 'familyCode', text : 'Codigo familia', show: false, filter: { type: "number" } }
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
            { dataField: 'injuries', text: 'Lesiones' },
            { dataField: 'observations', text: 'Observaciones' },
            { dataField: 'numCompetitions', text: 'Num Competiciones' }
        ]
    },

    getTrainerColumns: () => {
        return [
            { dataField: 'name', text: 'Nombre', filter: { type: "text" } },
            { dataField: 'sportSchoolId', text : 'Escuela', filter: { 
                type: "options",
                options : functions.getSportSchools()
            }}
        ]
    },

    getUserColumns: () => {
        return [
            { dataField: 'username', text: 'Nombre', filter: { type: "text" } },
            { dataField: 'email', text: 'Email', filter: { type: "text" } }
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

    getIncidenceColumns: () => {
        return [
            { dataField: 'id', text: 'Id', show: false },
            { dataField: 'title', text: 'Title', filter: { type: "text" } },
            { dataField: 'description', text: 'Descripcion', filter: { type: "text" } },
            { dataField: 'status', text : 'Estado', filter: { 
                type: "options",
                options : functions.getIncidenceStatus()
            }},
        ]
    },

    getReceiptColumns: () => {
        return [
            { dataField: 'id', text: 'Id', show: false },
            { dataField: 'name', text: 'Nombre', filter: { type: "text" } },
            { dataField: 'season', text: 'Temporada', filter: { type: "text" } },
            { dataField: 'receiptType', text: 'Tipo de remesa', filter: { type: "text" } },
            { dataField: 'createdAt', text: 'Fecha creación', filter: { type: "text" }, type: "date" },
            { dataField: 'sportSchoolId', text : 'Escuela', filter: { 
                type: "options",
                options : functions.getSportSchools()
            }},
            { dataField: 'status', text: 'Estado', filter: { 
                type: "options",
                options : functions.getReceiptStatus()
            }}
        ]
    },

    getScheduleColumns: () => {
        return [ 
            { dataField: 'day', text : 'Día' }, 
            { dataField: 'start', text : 'Inicio', sort: false }, 
            { dataField: 'end', text : 'Fin', sort: false }
        ]
    },

    getGroupColumns: () => {
        return [
            { dataField: 'name', text : 'Nombre', filter: { type: "text" } },
            { dataField: 'sportSchoolId', text : 'Escuela', filter: { 
                type: "options",
                options : functions.getSportSchools()
            }}
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