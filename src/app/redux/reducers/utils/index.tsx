import { LOAD_SPORTSCHOOL_TABLE, LOAD_GROUP_TABLE, LOAD_ATHLETE_TABLE, LOAD_FAMILY_TABLE, LOAD_HISTORIC_TABLE, LOAD_SCHEDULE_TABLE, LOAD_TRAINER_TABLE, LOAD_GROUP_ATHLETES_TABLE, LOAD_ATHLETE_SPORTDATA_TABLE, LOAD_DUPLICATED_ATHLETES_TABLE } from "../../constants/action_types";

function sportSchoolDataConversor(d: { id: number, name: string, municipality: string, address: string }) {
    return {
        id: d.id,
        name: d.name,
        municipality: d.municipality,
        address: d.address
    }
}

function groupDataConversor(d: { id: number, name: string }) {
    return {
        id : d.id,
        name : d.name
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
        iban: d.iban
    }
}

function historicDataConversor(d: any) {
    return {
        id : d.id,
        name : d.name || '', 
        birthDate: new Intl.DateTimeFormat('sq-AL').format(new Date(d.birthDate)), 
        gender: d.gender === 'male' ? 'Masculino' : 'Femenino',
        category : d.category,
        license : d.license,
        dorsalNumber : d.dorsalNumber
    }
}

function familyDataConversor(d: { id: number, code: number, count: number }) {
    return {
        id : d.id,
        code : d.code, 
        count : d.count
    }
}

function scheduleDataConversor(d: any){
    return {
        id : d.id, 
        day: d.day, 
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
    if (action.type === LOAD_SPORTSCHOOL_TABLE){
        items = action.payload.content.map((d: any) => {
            return sportSchoolDataConversor(d)
        })
    }
    else if (action.type === LOAD_GROUP_TABLE){
        items = action.payload.content.map((d: any) => {
            return groupDataConversor(d)
        })
    }
    else if (action.type === LOAD_ATHLETE_TABLE || action.type === LOAD_DUPLICATED_ATHLETES_TABLE || 
        action.type === LOAD_GROUP_ATHLETES_TABLE){
        items = action.payload.content.map((d: any) => {
            return athleteDataConversor(d)
        })
    }
    else if (action.type === LOAD_HISTORIC_TABLE){
        items = action.payload.content.map((d: any) => {
            return historicDataConversor(d)
        })
    }
    else if (action.type === LOAD_FAMILY_TABLE){
        items = action.payload.content.map((d: any) => {
            return familyDataConversor(d)
        })
    }
    else if (action.type === LOAD_SCHEDULE_TABLE){
        items = action.payload.content.map((d: any) => {
            return scheduleDataConversor(d)
        })
    }
    else if (action.type === LOAD_TRAINER_TABLE){
        items = action.payload.content.map((d: any) => {
            return trainerDataConversor(d)
        })
    }
    else if (action.type === LOAD_ATHLETE_SPORTDATA_TABLE){
        items = action.payload.content.map((d: any) => {
            return sportDataConversor(d)
        })
    }
    return items;
}

export default Utils