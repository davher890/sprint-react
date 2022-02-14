import * as ACTION_TYPES from "../../constants/action_types";

let daysMap = new Map([
    ["monday", "Lunes"],
    ["tuesday", "Martes"],
    ["wednesday", "Miércoles"],
    ["thursday", "Jueves"],
    ["friday", "Viernes"],
    ["saturday", "Sábado"],
    ["sunday", "Domingo"]
])

let daysLetterMap = new Map([
    ["monday", "L"],
    ["tuesday", "M"],
    ["wednesday", "X"],
    ["thursday", "J"],
    ["friday", "V"],
    ["saturday", "S"],
    ["sunday", "D"]
])

function getSchedulesString(schedules: any[]){
   
    return schedules.map((d: any) => {
        let startMinute = parseInt(d.startMinute) < 10 ? '0' + d.startMinute : d.startMinute
        let endMinute = parseInt(d.endMinute) < 10 ? '0' + d.endMinute : d.endMinute
    
        return daysLetterMap.get(d.day.toLowerCase()) + ' ' + d.startHour + ':' + startMinute + '-' + d.endHour + ':' + endMinute
    }).join(' , ')
}

function sportSchoolDataConversor(d: { id: number, name: string, municipality: string, address: string }) {
    return {
        id: d.id,
        name: d.name,
        municipality: d.municipality,
        address: d.address
    }
}

function groupDataConversor(d: { id: number, name: string, sportSchoolName: string }) {
    return {
        id : d.id,
        name : d.name,
        sportSchoolName : d.sportSchoolName
    }
}

function athleteDataConversor(d: any) {
    return {
        id : d.id,
        name : d.name || '', 
        firstSurname : d.firstSurname || '', 
        secondSurname : d.secondSurname || '', 
        birthDate: new Intl.DateTimeFormat('sq-AL').format(new Date(d.birthDate)), 
        gender: d.gender === 'male' ? 'Masculino' : 'Femenino',
        phone1: d.phone1,
        phone2: d.phone2,
        phone3: d.phone3,
        dni: d.dni,
        nationality: d.nationality,
        birthPlace: d.birthPlace,
        postalCode: d.postalCode,
        category: d.category,
        license: d.license,
        licenseType: d.licenseType,
        dorsalNumber: d.dorsalNumber,
        dorsalCategory: d.dorsalCategory,
        iban: d.iban,
        sportSchoolId: d.sportSchoolName, 
        groupName: d.groupName,
        days: d.days !== null && d.days.length > 0 ? d.days.split(',').map((day: String) => daysMap.get(day.toLowerCase())).join(','): '',
        numDays: d.numDays,
        code: d.code,
        lastRegisterDate: d.lastRegisterDate ? new Intl.DateTimeFormat('sq-AL').format(new Date(d.lastRegisterDate)) : '',
        lastUnregisterDate: d.lastUnregisterDate ? new Intl.DateTimeFormat('sq-AL').format(new Date(d.lastUnregisterDate)) : ''
    }
}

function familyDataConversor(d: { id: number, code: number, count: number }) {
    return {
        id : d.id,
        code : d.code, 
        count : d.count
    }
}

function scheduleDataConversor(d: {id: number, day: string, startHour: number, startMinute: number, endHour: number, endMinute: number}){
    return {
        id : d.id, 
        day: daysMap.get(d.day.toLowerCase()), 
        start: d.startHour + ':' + (d.startMinute.toString().length < 2 ? (d.startMinute + '0') : d.startMinute),
        end: d.endHour + ':' + (d.endMinute.toString().length < 2 ? (d.endMinute + '0') : d.endMinute)
    }
}

function trainerDataConversor(d: { id: number, name: string }){
    return {
        id : d.id, 
        name: d.name
    }
}

function userDataConversor(d: { id: number, username: string }){
    return {
        id : d.id, 
        username: d.username
    }
}

function sportDataConversor(d: any){
    return {
        id: d.id,
        athleteId: d.athleteId,
        attitude: d.attitude,
        category: d.category,
        implication: d.implication,
        injuries: d.injuries,
        motivations: d.motivations,
        observations: d.observations,
        outstandingResults: d.outstandingResults,
        season: d.season,
        technicalLevel: d.technicalLevel
    }
}

const Utils = (action: { type: string, payload: any }) => {
    let items = []
    if (action.type === ACTION_TYPES.LOAD_SPORTSCHOOL_TABLE){
        items = action.payload.content.map((d: any) => {
            return sportSchoolDataConversor(d)
        })
    }
    else if (action.type === ACTION_TYPES.LOAD_GROUP_TABLE){
        items = action.payload.content.map((d: any) => {
            return groupDataConversor(d)
        })
    }
    else if (action.type === ACTION_TYPES.LOAD_ATHLETE_TABLE || action.type === ACTION_TYPES.LOAD_DUPLICATED_ATHLETES_TABLE || 
        action.type === ACTION_TYPES.LOAD_GROUP_ATHLETES_TABLE || action.type === ACTION_TYPES.LOAD_HISTORIC_TABLE){
        items = action.payload.content.map((d: any) => {
            return athleteDataConversor(d)
        })
    }
    else if (action.type === ACTION_TYPES.LOAD_FAMILY_TABLE){
        items = action.payload.content.map((d: any) => {
            return familyDataConversor(d)
        })
    }
    else if (action.type === ACTION_TYPES.LOAD_SCHEDULE_TABLE){
        items = action.payload.content.map((d: any) => {
            return scheduleDataConversor(d)
        })
    }
    else if (action.type === ACTION_TYPES.LOAD_TRAINER_TABLE){
        items = action.payload.content.map((d: any) => {
            return trainerDataConversor(d)
        })
    }
    else if (action.type === ACTION_TYPES.LOAD_USER_TABLE){
        items = action.payload.content.map((d: any) => {
            return userDataConversor(d)
        })
    }
    else if (action.type === ACTION_TYPES.LOAD_ATHLETE_SPORTDATA_TABLE){
        items = action.payload.content.map((d: any) => {
            return sportDataConversor(d)
        })
    }
    return items;
}

export default Utils