import * as ACTION_TYPES from "../redux/constants/action_types";

import functions from "./Functions";

import moment from 'moment'

function sportSchoolDataConversor(d: { id: number, name: string, municipality: string, address: string }) {
    return d
}

function groupDataConversor(d: { id: number, name: string, sportSchoolName: string }) {
    return d
}

function receiptDataConversor(d: { id: number, name: string, season: string, receiptType: string, sportSchoolName: string, createdAt: number, status: string, collectionName: string, enrollmentFee: number, membershipFee: number, monthlyFee: number, licenseFee: number }) {
    return {
        ...d,
        season: d.season.replace('_', '-'),
        receiptType: d.receiptType && d.receiptType === 'LICENSE' ? 'Licencia' : 'Trimestral',
        sportSchoolId: d.sportSchoolName, 
        createdAt: moment(d.createdAt).format("YYYY-MM-DD hh:mm:ss"),
        status: functions?.getReceiptStatus().find(c => c.id === d.status)?.name,
        totalFee: d.enrollmentFee + d.membershipFee + d.monthlyFee + d.licenseFee
    }
}

function returnReceiptAthleteDataConversor(d: any) {
    return {
        ...d,
        name : d.name || '', 
        firstSurname : d.firstSurname || '', 
        secondSurname : d.secondSurname || '', 
        
        sportSchoolId: d.sportSchoolName, 

        specialization: d.specialization === true ? 'Si' : 'No',

        paymentType: functions.getPaymentTypes().find(st => st.id === d.paymentType)?.name,
        feeTypeId: d.feeTypeName,
        status: functions.getReceiptStatus().find(st => st.id === d.status)?.name,
    }
}

function receiptAthleteDataConversor(d: any) {
    return {
        ...d,

        name : d.name || '', 
        firstSurname : d.firstSurname || '', 
        secondSurname : d.secondSurname || '', 
        lastRegisterDate: d.lastRegisterDate ? new Intl.DateTimeFormat('sq-AL').format(new Date(d.lastRegisterDate)) : '',
        
        category: functions?.getCategories().find(c => c.id === d.category)?.name,
        licenseType: d.licenseType && d.licenseType === 'NATIONAL' ? 'Nacional' : 'Territorial',
        dorsalCategory: functions?.getDorsalCategories().find(c => c.id === d.dorsalCategory)?.name,
        
        sportSchoolId: d.sportSchoolName, 

        specialization: d.specialization === true ? 'Si' : 'No',

        paymentType: functions.getPaymentTypes().find(st => st.id === d.paymentType)?.name,
        feeTypeId: d.feeTypeName,
        status: functions.getReceiptStatus().find(st => st.id === d.status)?.name,
    }
}

function athleteDataConversor(d: any) {
    return { ...d, 
            name : d.name || '', 
            firstSurname : d.firstSurname || '', 
            secondSurname : d.secondSurname || '', 
            birthDate: new Intl.DateTimeFormat('sq-AL').format(new Date(d.birthDate)), 
            gender: d.gender === 'male' ? 'Masculino' : 'Femenino',
            category: functions?.getCategories().find(c => c.id === d.category)?.name,
            dorsalCategory: functions?.getDorsalCategories().find(c => c.id === d.dorsalCategory)?.name,
            paymentType: functions.getPaymentTypes().find(st => st.id === d.paymentType)?.name,
            lastRegisterDate: d.lastRegisterDate ? new Intl.DateTimeFormat('sq-AL').format(new Date(d.lastRegisterDate)) : '',
            lastUnregisterDate: d.lastUnregisterDate ? new Intl.DateTimeFormat('sq-AL').format(new Date(d.lastUnregisterDate)) : '',
    }
}

function familyDataConversor(d: { id: number, code: number, count: number }) {
    return d
}

function scheduleDataConversor(d: {id: number, day: string, startHour: number, startMinute: number, endHour: number, endMinute: number, dayTranslate: string}){
    return {
        ...d,
        day: d.dayTranslate, 
        start: d.startHour + ':' + (d.startMinute.toString().length < 2 ? (d.startMinute + '0') : d.startMinute),
        end: d.endHour + ':' + (d.endMinute.toString().length < 2 ? (d.endMinute + '0') : d.endMinute)
    }
}

function trainerDataConversor(d: { id: number, name: string, sportSchoolName: string }){
    return d
}

function userDataConversor(d: { id: number, username: string, email: string }){
    return d
}

function sportDataConversor(d: any){
    return {
        ...d,
        category: functions?.getCategories().find(c => c.id === d.category)?.name
    }
}

function incidenceConversor(d: any){
    return {
        ...d,
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
    else if (action.type === ACTION_TYPES.LOAD_RETURNED_RECEIPT_REGISTERED_ATHLETE_TABLE || action.type === ACTION_TYPES.LOAD_RETURNED_RECEIPT_UNREGISTERED_ATHLETE_TABLE || action.type === ACTION_TYPES.LOAD_NOT_PAID_RECEIPT_REGISTERED_ATHLETE_TABLE || action.type === ACTION_TYPES.LOAD_NOT_PAID_RECEIPT_UNREGISTERED_ATHLETE_TABLE){
        items = action.payload.content.map((d: any) => {
            return returnReceiptAthleteDataConversor(d)
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