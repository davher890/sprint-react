const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const functions = {

    isValidDni: function(dni: string) {
        
        const dniRegex = /^[0-9]{8,8}[A-Za-z]$/i
        const nieRegex = /^[XYZ][0-9]{7}[A-Z]$/i
        
        if(dniRegex.test(dni)){
            var number = Number.parseInt(dni.substr(0, dni.length-1));
            var letr = dni.substr(dni.length-1,1);
            number = number % 23;
            let letter = 'TRWAGMYFPDXBNJZSQVHLCKET';
            letter = letter.substring(number, number+1);
            if (letter !== letr.toUpperCase()) {
                return false
            }else{
                return true
            }
        }
        else if (nieRegex.test(dni)){
            return true
        }
        else{
            return false
        }
    },

    isRegistered: function (historic: {type: string, date: number}[]) {

        if (historic && historic.length > 0){
            let filtered = historic.filter((h: {type: string, date: number}) => { return h.date <= new Date().getTime() })
                .sort((a: {type: string, date: number}, b: {type: string, date: number}) => { return a.date < b.date ? 1 : -1})
            return filtered[0].type === 'REGISTER'
        }
        return true
    },
        
    getMonth: function (month: number) {
        return monthNames[month]
    },

    ageCalculator: function (birthDate: number) {
        var curr = new Date();
        var diff = curr.getTime() - birthDate;
        return Math.max(Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25)), 0)
    },

    calculateCategory: function (year: number) {
        const currentYear = new Date().getFullYear()
        let category = null
        if (!year){
            return category;
        }
        else {
            switch (currentYear - year) {
                case 2:
                case 3:
                case 4:
                case 5:
                    category = "chupetin"
                    break;
                case 6:
                case 7:
                    category = "sub8"
                    break;
                case 8:
                case 9:
                    category = "sub10"
                    break;
                case 10:
                case 11:
                    category = "sub12"
                    break;
                case 12:
                case 13:
                    category = "sub14"
                    break;
                case 14:
                case 15:
                    category = "sub16"
                    break;
                case 16:
                case 17:
                    category = "sub18"
                    break;
                case 18:
                case 19:
                    category = "sub20"
                    break;
                case 20:
                case 21:
                case 22:
                    category = "sub23"
                    break;
                default:
                    if (currentYear - year  > 22 && currentYear - year < 35) {
                        category = "senior"
                    }
                    else {
                        category = "master"
                    }
                    break;
            }
            return category
        }
    },

    getCategories: function () {
        return [
            // { id: "", name: "" },
            { id: "master", name: "MASTER" },
            { id: "senior", name: "SENIOR" },
            { id: "sub23", name: "SUB23" },
            { id: "sub20", name: "SUB20" },
            { id: "sub18", name: "SUB18" },
            { id: "sub16", name: "SUB16" },
            { id: "sub14", name: "SUB14" },
            { id: "sub12", name: "SUB12" },
            { id: "sub10", name: "SUB10" },
            { id: "sub8", name: "SUB8" },
            { id: "chupetin", name: "CHUPETIN"}
        ]
    },

    getLicenseTypes: function() {
        return [
            { id: "NATIONAL", name: "Nacional" }, 
            { id: "TERRITORIAL", name: "Territorial" },
            { id: "NATIONALTRAIL", name: "Nacional Trail" }, 
            { id: "TERRITORIALTRAIL", name: "Territorial Trail" }
        ]
    },

    getDorsalCategories: function () {
        return [
            // { id: "", name: "" },
            { id: "mm", name: "MM" },
            { id: "sm", name: "SM" },
            { id: "sf", name: "SF" },
            { id: "u23m", name: "U23M" },
            { id: "u20f", name: "U20F" },
            { id: "u18f", name: "U18F" },
            { id: "u20m", name: "U20M" },
            { id: "u16m", name: "U16M" },
            { id: "u23f", name: "U23F" },
            { id: "u14m", name: "U14M" },
            { id: "u10m", name: "U10M" },
            { id: "u14f", name: "U14F" },
            { id: "u10f", name: "U10F" },
            { id: "u18m", name: "U18M" },
            { id: "u12m", name: "U12M" }
        ]
    },

    getIncidenceStatus: function () {
        return [ 
            {id: "open", name: "Abierta"}, 
            { id: "solved", name: "Resuelta"} 
        ]
    },

    getReceiptCollections: function () {
        return [ 
            { id: "september", name: "Septiembre" },
            { id: "october", name: "Octubre" },
            { id: "january", name: "Enero" },
            { id: "april", name: "Abril" },
            { id: "july", name: "Julio"} 
        ]
    },

    getReceiptStatuses: function () { 
        return [ 
            { id: "pending", name: "Pendiente" },
            { id: "paid", name: "Pagado" }
        ]
    },

    getSportSchools: function() {
        return JSON.parse(sessionStorage.getItem('sport_schools') || '[]')
    },

    getPaymentTypes: function () {
        return [
            // { id: "", name: "" },
            { id: "MET", name: "Efectivo" },
            { id: "TRANSF", name: "Transferencia" },
            { id: "DOM", name: "Domiciliación Bancaria" },
            { id: "SUBV", name: "Subvencionado" },
        ]
    },

    leftPadding: (str: string, max: number, c: string): string => {
        str = str.toString();
        return str.length < max ? functions.leftPadding(c + str, max, c) : str;
    },

    arrayContains: (array1: number[], array2: number[]): boolean => {
        let as = new Set(array1)
        let bs = new Set(array2)
        for (const b of bs) {
            if (!as.has(b)) {
                return false;
            }
        }
        return true;
    }
}
export default functions;