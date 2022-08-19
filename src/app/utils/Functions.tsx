const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const functions = {

    isValidDni: function(dni: string) {
        
        const dniRegex = /^[0-9]{8,8}[A-Za-z]$/
        
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
                    category = "CHUPETIN"
                    break;
                case 6:
                case 7:
                    category = "SUB8"
                    break;
                case 8:
                case 9:
                    category = "SUB10"
                    break;
                case 10:
                case 11:
                    category = "SUB12"
                    break;
                case 12:
                case 13:
                    category = "SUB14"
                    break;
                case 14:
                case 15:
                    category = "SUB16"
                    break;
                case 16:
                case 17:
                    category = "SUB18"
                    break;
                case 18:
                case 19:
                    category = "SUB20"
                    break;
                case 20:
                case 21:
                case 22:
                    category = "SUB23"
                    break;
                default:
                    if (currentYear - year < 6) {
                        category = "SUB8"
                    }
                    if (currentYear - year <= 35) {
                        category = "SENIOR"
                    }
                    else {
                        category = "MASTER"
                    }
                    break;
            }
            return category
        }
    },

    getCategories: function () {
        return [
            // { id: "", name: "" },
            { id: "MASTER", name: "MASTER" },
            { id: "SENIOR", name: "SENIOR" },
            { id: "SUB23", name: "SUB23" },
            { id: "SUB20", name: "SUB20" },
            { id: "SUB18", name: "SUB18" },
            { id: "SUB16", name: "SUB16" },
            { id: "SUB14", name: "SUB14" },
            { id: "SUB12", name: "SUB12" },
            { id: "SUB10", name: "SUB10" },
            { id: "SUB8", name: "SUB8" },
            { id: "CHUPETIN", name: "CHUPETIN"}
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
            { id: "MM", name: "MM" },
            { id: "SM", name: "SM" },
            { id: "SF", name: "SF" },
            { id: "U23M", name: "U23M" },
            { id: "U20F", name: "U20F" },
            { id: "U18F", name: "U18F" },
            { id: "U20M", name: "U20M" },
            { id: "U16M", name: "U16M" },
            { id: "U23F", name: "U23F" },
            { id: "U14M", name: "U14M" },
            { id: "U10M", name: "U10M" },
            { id: "U14F", name: "U14F" },
            { id: "U10F", name: "U10F" },
            { id: "U18M", name: "U18M" },
            { id: "U12M", name: "U12M" }
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