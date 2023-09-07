import * as ACTION_TYPES from "../redux/constants/action_types";

import functions from "./Functions";

import moment from 'moment'

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
        sportSchoolId: d.sportSchoolName, 
    }
}

function receiptDataConversor(d: { id: number, name: string, season: string, receiptType: string, sportSchoolName: string, createdAt: number, status: string, collectionName: string, enrollmentFee: number, membershipFee: number, monthlyFee: number, licenseFee: number }) {
    return {
        id : d.id,
        name: d.name,
        season: d.season.replace('_', '-'),
        receiptType: d.receiptType && d.receiptType === 'LICENSE' ? 'Licencia' : 'Trimestral',
        sportSchoolId: d.sportSchoolName, 
        createdAt: moment(d.createdAt).format("YYYY-MM-DD hh:mm:ss"),
        status: functions?.getReceiptStatus().find(c => c.id === d.status)?.name,
        enrollmentFee: d.enrollmentFee, 
        membershipFee: d.membershipFee, 
        monthlyFee: d.monthlyFee, 
        licenseFee: d.licenseFee, 
        totalFee: d.enrollmentFee + d.membershipFee + d.monthlyFee + d.licenseFee
    }
}

function receiptAthleteDataConversor(d: any) {
    return {
        id : d.id,
        athleteId : d.athleteId,
        name : d.name || '', 
        firstSurname : d.firstSurname || '', 
        secondSurname : d.secondSurname || '', 
        lastRegisterDate: d.lastRegisterDate ? new Intl.DateTimeFormat('sq-AL').format(new Date(d.lastRegisterDate)) : '',
        
        category: functions?.getCategories().find(c => c.id === d.category)?.name,
        license: d.license,
        licenseType: d.licenseType && d.licenseType === 'NATIONAL' ? 'Nacional' : 'Territorial',
        dorsalNumber: d.dorsalNumber,
        dorsalCategory: functions?.getDorsalCategories().find(c => c.id === d.dorsalCategory)?.name,
        
        iban: d.iban,
        sportSchoolId: d.sportSchoolName, 
        groupName: d.groupName,
        days: d.days,
        numDays: d.numDays,
        code: d.code,
        familyCode: d.familyCode,

        specialization: d.specialization === true ? 'Si' : 'No',

        paymentType: functions.getPaymentTypes().find(st => st.id === d.paymentType)?.name,
        feeType: d.feeType,
        monthlyFee: d.monthlyFee,
        enrollmentFee: d.enrollmentFee,
        membershipFee: d.membershipFee,
        licenseTerritorialFee: d.licenseTerritorialFee,
        licenseNationalFee: d.licenseNationalFee,
        status: functions.getReceiptStatus().find(st => st.id === d.status)?.name,
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
        category: functions?.getCategories().find(c => c.id === d.category)?.name,
        license: d.license,
        licenseType: d.licenseType,
        dorsalNumber: d.dorsalNumber,
        dorsalCategory: functions?.getDorsalCategories().find(c => c.id === d.dorsalCategory)?.name,
        iban: d.iban,
        paymentType: functions.getPaymentTypes().find(st => st.id === d.paymentType)?.name,
        feeType: d.feeType,
        holderName: d.holderName,
        holderFirstSurname: d.holderFirstSurname,
        holderSecondSurname: d.holderSecondSurname,
        holderDni: d.holderDni,
        sportSchoolId: d.sportSchoolName, 
        groupName: d.groupName,
        days: d.days,
        numDays: d.numDays,
        code: d.code,
        familyCode: d.familyCode,
        lastRegisterDate: d.lastRegisterDate ? new Intl.DateTimeFormat('sq-AL').format(new Date(d.lastRegisterDate)) : '',
        lastUnregisterDate: d.lastUnregisterDate ? new Intl.DateTimeFormat('sq-AL').format(new Date(d.lastUnregisterDate)) : '',
        mail: d.mail,
        address: d.address,
        municipality: d.municipality,
        familiarOneName: d.familiarOneName,
        familiarOneFirstSurname: d.familiarOneFirstSurname,
        familiarOneSecondSurname: d.familiarOneSecondSurname,
        familiarOneDni: d.familiarOneDni,
        familiarOneMail: d.familiarOneMail,
        familiarTwoName: d.familiarTwoName,
        familiarTwoFirstSurname: d.familiarTwoFirstSurname,
        familiarTwoSecondSurname: d.familiarTwoSecondSurname,
        familiarTwoDni: d.familiarTwoDni,
        familiarTwoMail: d.familiarTwoMail
    }
}

function familyDataConversor(d: { id: number, code: number, count: number }) {
    return {
        id : d.id,
        code : d.code, 
        count : d.count
    }
}

function scheduleDataConversor(d: {id: number, day: string, startHour: number, startMinute: number, endHour: number, endMinute: number, dayTranslate: string}){
    return {
        id : d.id, 
        day: d.dayTranslate, 
        start: d.startHour + ':' + (d.startMinute.toString().length < 2 ? (d.startMinute + '0') : d.startMinute),
        end: d.endHour + ':' + (d.endMinute.toString().length < 2 ? (d.endMinute + '0') : d.endMinute)
    }
}

function trainerDataConversor(d: { id: number, name: string, sportSchoolName: string }){
    return {
        id : d.id, 
        name: d.name,
        sportSchoolId: d.sportSchoolName
    }
}

function userDataConversor(d: { id: number, username: string, email: string }){
    return {
        id : d.id, 
        username: d.username,
        email: d.email
    }
}

function sportDataConversor(d: any){
    return {
        id: d.id,
        athleteId: d.athleteId,
        attitude: d.attitude,
        category: functions?.getCategories().find(c => c.id === d.category)?.name,
        implication: d.implication,
        injuries: d.injuries,
        motivations: d.motivations,
        observations: d.observations,
        outstandingResults: d.outstandingResults,
        season: d.season,
        technicalLevel: d.technicalLevel,
        numCompetitions: d.numCompetitions
    }
}

function incidenceConversor(d: any){
    return {
        id: d.id,
        title: d.title,
        description: d.description,
        status: functions?.getIncidenceStatus().find(c => c.id === d.status)?.name,
        
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
    else if (action.type === ACTION_TYPES.LOAD_RECEIPT_ATHLETE_TABLE){
        items = action.payload.content.map((d: any) => {
            return receiptAthleteDataConversor(d)
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
    else if (action.type === ACTION_TYPES.LOAD_INCIDENCE_TABLE){
        items = action.payload.content.map((d: any) => {
            return incidenceConversor(d)
        })
    }
    else if (action.type === ACTION_TYPES.LOAD_RECEIPT_TABLE){
        items = action.payload.content.map((d: any) => {
            return receiptDataConversor(d)
        })
    }
    return items;
}

export default Utils