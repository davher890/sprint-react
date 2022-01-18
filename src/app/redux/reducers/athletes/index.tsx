import * as ACTION_TYPES from "../../constants/action_types";

const initialState = {
    athletes_by_phone: [],
    athletes_by_surnames: [],
    athlete: {},
    athlete_fee: {},
    athlete_sportdata: {}
};

const encrypt = (d:any) => {
    
    d.dni = d.dni ? d.dni.substring(0, 3) + '*****' : ''
    d.phone1 = d.phone1 ? d.phone1.substring(0, 3) + '*****' : ''
    d.phone2 = d.phone2 ? d.phone2.substring(0, 3) + '*****' : ''
    d.phone3 = d.phone3 ? d.phone3.substring(0, 3) + '*****' : ''
    d.firstSurname = d.firstSurname.substring(0, 3) + '*****' || '' 
    d.secondSurname = d.secondSurname.substring(0, 3) + '*****' || ''
    d.familiarOneFirstSurname = d.familiarOneFirstSurname ? d.familiarOneFirstSurname.substring(0, 3) + '*****' || '' : ''
    d.familiarOneSecondSurname = d.familiarOneSecondSurname ? d.familiarOneSecondSurname.substring(0, 3) + '*****' || '' : ''
    d.familiarOneDni = d.familiarOneDni ? d.familiarOneDni.substring(0, 3) + '*****' || '' : ''
    d.familiarOneMail = d.familiarOneMail ? d.familiarOneMail.substring(0, 3) + '*****' || '' : ''
    d.familiarTwoFirstSurname = d.familiarTwoFirstSurname ? d.familiarTwoFirstSurname.substring(0, 3) + '*****' || '' : ''
    d.familiarTwoSecondSurname = d.familiarTwoSecondSurname ? d.familiarTwoSecondSurname.substring(0, 3) + '*****' || '' : ''
    d.familiarTwoDni = d.familiarTwoDni ? d.familiarTwoDni.substring(0, 3) + '*****' || '' : ''
    d.familiarTwoMail = d.familiarTwoMail ? d.familiarTwoMail.substring(0, 3) + '*****' || '' : ''
    d.phone1 = d.phone1 ? d.phone1.substring(0, 3) + '*****' || '' : ''
    d.phone2 = d.phone2 ? d.phone2.substring(0, 3) + '*****' || '' : ''
    d.phone3 = d.phone3 ? d.phone3.substring(0, 3) + '*****' || '' : ''
    d.iban = d.iban ? d.iban.substring(0, 3) + '*****' || '' : ''
    d.mail = d.mail ? d.mail.substring(0, 3) + '*****' || '' : ''
    d.holderFirstSurname = d.holderFirstSurname ? d.holderFirstSurname.substring(0, 3) + '*****' || '' : ''
    d.holderSecondSurname = d.holderSecondSurname ? d.holderSecondSurname.substring(0, 3) + '*****' || '' : ''
    d.holderDni = d.holderDni ? d.holderDni.substring(0, 3) + '*****' || '' : ''
    d.mail = d.mail ? d.mail.substring(0, 3) + '*****' || '' : ''
    d.mail = d.mail ? d.mail.substring(0, 3) + '*****' || '' : ''
    d.mail = d.mail ? d.mail.substring(0, 3) + '*****' || '' : ''
    return d
}

function rootReducer(state = initialState, action: { type: string, payload: any }) {
    if (action.type === ACTION_TYPES.ADD_ATHLETE || action.type === ACTION_TYPES.GET_ATHLETE || action.type === ACTION_TYPES.REGISTER_ATHLETE || action.type === ACTION_TYPES.UNREGISTER_ATHLETE) {
        return {
            ...state,
            athlete: encrypt(action.payload)
        }
    }
    else if (action.type === ACTION_TYPES.GET_ATHLETES_BY_PHONE) {
        return {
            ...state,
            athletes_by_phone: action.payload.map((d: any) => encrypt(d))
        };
    }
    else if (action.type === ACTION_TYPES.GET_ATHLETES_BY_SURNAMES) {
        return {
            ...state,
            athletes_by_surnames: action.payload.map((d: any) => encrypt(d))
        };
    }
    else if (action.type === ACTION_TYPES.GET_ATHLETE_FEE) {
        return {
            ...state,
            athlete_fee: action.payload
        };
    }
    else if (action.type === ACTION_TYPES.ADD_ATHLETE_SPORTDATA) {
        return {
            ...state,
            athlete_sportdata: action.payload
        };
    }
    return state;
};

export default rootReducer;