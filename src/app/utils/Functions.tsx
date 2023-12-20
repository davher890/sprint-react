import moment from 'moment'

const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

function modulo97(iban: string) {
    var parts = Math.ceil(iban.length/7);
    var remainer = "";

    for (var i = 1; i <= parts; i++) {
        remainer = String(parseFloat(remainer+iban.substr((i-1)*7, 7))%97);
    }

    return parseInt(remainer);
}

function getnumIBAN(letra: string) {
    let ls_letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return ls_letras.search(letra) + 10;
}

const functions = {

    localDatetoStr: function(localDate: number[]) {
        if (localDate && localDate.length > 0){
            return `${localDate[0]}-${this.leftPadding(localDate[1], 2, '0')}-${this.leftPadding(localDate[2], 2, '0')}`
        }
        return ''
    },

    dateToLocalDate: function(date: Date) {
        if (date && isFinite(+date)){
            return [date.getFullYear(), date.getMonth()+1, date.getDate()]
        }
        return []
    },

    localDateToDate: function(localDate: number[]) {
        if (localDate && localDate.length > 0){
            return new Date(Date.UTC(localDate[0], localDate[1]-1, localDate[2]));
        }
        return null
    },

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
            } else{
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

    isValidIban: function(iban: string) {
        // if (iban.toLowerCase().startsWith('es')){
        //     const ibanRegex = /^ES\d{2}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{4}|ES\d{22}$/i
        //     return ibanRegex.test(iban.toUpperCase())
        // }
        // else {
        //     return true;
        // }
        //Se pasa a Mayusculas
        iban = iban.toUpperCase().trim().replace(/\s/g, ""); 
        
        var letra1,letra2,num1,num2;
        var isbanaux;
        //La longitud debe ser siempre de 24 caracteres
        if (iban.length !== 24) {
            return false;
        }

        // Se coge las primeras dos letras y se pasan a números
        letra1 = iban.substring(0, 1);
        letra2 = iban.substring(1, 2);
        num1 = getnumIBAN(letra1);
        num2 = getnumIBAN(letra2);
        //Se sustituye las letras por números.
        isbanaux = String(num1) + String(num2) + iban.substring(2);
        // Se mueve los 6 primeros caracteres al final de la cadena.
        isbanaux = isbanaux.substring(6) + isbanaux.substring(0,6);

        //Se calcula el resto, llamando a la función modulo97, definida más abajo
        let resto = modulo97(isbanaux);
        if (resto === 1){
            return true;
        }else{
            return false;
        }
    },

    monthDiff: function(d1: Date, d2: Date) {
        if (!d1 || !d2){
            return 0;
        }
        const monthDiff = d1.getMonth() - d2.getMonth();
        const yearDiff = d1.getFullYear() - d2.getFullYear();

        return Math.abs(monthDiff + yearDiff * 12);
    },

    isRegistered: function (historic: {type: string, date: number[]}[]) {

        if (historic && historic.length > 0){
            let filtered = historic
                .filter((h: {type: string, date: number[]}) => { 
                    let d = this.localDateToDate(h.date)
                    return d != null && (d.getTime() <= new Date().getTime())
                })
                .sort((a: {type: string, date: number[]}, b: {type: string, date: number[]}) => { 
                    let aDate = this.localDateToDate(a.date)
                    let bDate = this.localDateToDate(b.date)
                    return aDate !== null && bDate !== null && aDate?.getTime() < bDate?.getTime() ? 1 : -1
                })
            if (filtered.length > 0){
                return filtered[0].type === 'REGISTER'
            }
        }
        return true
    },

    getLastHistoricDate: function (historic: {type: string, date: number}[]) {
        let filtered = historic
        .filter((h: {type: string, date: number}) => { return h.date <= new Date().getTime() })
        .sort((a: {type: string, date: number}, b: {type: string, date: number}) => { return a.date < b.date ? 1 : -1})
        if (filtered.length > 0){
            return moment(new Date(filtered[0].date)).add(1, 'days').format('YYYY-MM-DD')
        }
        return null
    },
        
    getMonth: function (month: number) {
        return monthNames[month]
    },

    ageCalculator: function (birthDate: number[]) {
        var curr = new Date();
        var diff = curr.getTime() - Date.UTC(birthDate[0], birthDate[1]-1, birthDate[2]);
        return Math.max(Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25)), 0)
    },

    calculateDorsalCategory: function(year: number, gender: string) {

        let dorsalCategory = null
        let category = this.calculateCategory(year)
        switch (category) {
            case 'master':
                dorsalCategory = 'm'
                break
            case 'senior':
                dorsalCategory = 's'
                break
            case 'sub8':
                dorsalCategory = 'u8'
                break
            case 'sub10':
                dorsalCategory = 'u10'
                break
            case 'sub12':
                dorsalCategory = 'u12'
                break
            case 'sub14':
                dorsalCategory = 'u14'
                break
            case 'sub16':
                dorsalCategory = 'u16'
                break
            case 'sub18':
                dorsalCategory = 'u18'
                break
            case 'sub20':
                dorsalCategory = 'u20'
                break
            case 'sub23':
                dorsalCategory = 'u23'
                break
            default:
                dorsalCategory = null
        }
        if (dorsalCategory){
            if (gender === 'male'){
                dorsalCategory += 'm'
            }
            else {
                dorsalCategory += 'f'
            }
        }
        return dorsalCategory
    },

    calculateCategory: function (year: number) {
        const currentYear = new Date().getFullYear()
        let category = null
        if (year){
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
        }
        return category
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
            { id: "mf", name: "MF" },
            { id: "sm", name: "SM" },
            { id: "sf", name: "SF" },
            { id: "u23m", name: "U23M" },
            { id: "u23f", name: "U23F" },
            { id: "u20m", name: "U20M" },
            { id: "u20f", name: "U20F" },
            { id: "u18m", name: "U18M" },
            { id: "u18f", name: "U18F" },
            { id: "u16m", name: "U16M" },
            { id: "u16f", name: "U16F" },
            { id: "u14m", name: "U14M" },
            { id: "u14f", name: "U14F" },
            { id: "u12m", name: "U12M" },
            { id: "u12f", name: "U12F" },
            { id: "u10m", name: "U10M" },
            { id: "u10f", name: "U10F" },
            { id: "u8m", name: "U8M" },
            { id: "u8f", name: "U8F" }
        ]
    },

    getIncidenceStatus: function () {
        return [ 
            { id: "open", name: "Abierta"}, 
            { id: "solved", name: "Resuelta"} 
        ]
    },

    getReceiptStatus: function () { 
        return [ 
            { id: "PROCESSING", name: "Procesando cuota de atletas" },
            { id: "PENDING", name: "Pendiente" },
            { id: "VALIDATED", name: "Validado" },
        ]
    },

    getReceiptAthleteStatus: function (paymentTypeId: string) { 
        let statuses = [ 
            { id: "PAID", name: "Pagado" },
        ]
        if (paymentTypeId !== 'DOM'){
            statuses.push({ id: "NOT_PAID", name: "No pagado" })
        }
        else {
            statuses.push({ id: "RETURN", name: "Devuelto" })
            statuses.push({ id: "SENT_BY_ERROR", name: "Enviado por error"})
        }
        return statuses
    },

    getSportSchools: function() {
        return JSON.parse(sessionStorage.getItem('sport_schools') || '[]')
    },

    getPaymentTypes: function () {
        return [
            { id: "MET", name: "Efectivo" },
            { id: "DOM", name: "Domiciliación Bancaria" },
            { id: "SUBV", name: "Subvencionado" },
        ]
    },

    getFeeTypes: function () {
        return JSON.parse(sessionStorage.getItem('fee_types') || '[]')
    },

    leftPadding: (str: any, max: number, c: string): string => {
        if (!str){
            return ''
        }
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