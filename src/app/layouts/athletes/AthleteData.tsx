import * as React from "react"
import moment from 'moment'
import { useParams, useSearchParams } from 'react-router-dom';

import utils from "../../utils/Functions"
import { Formik } from 'formik';

import { CardHeader, Grid, AppBar, Toolbar, Snackbar, Typography, Box, Checkbox, Button, Modal } from '@mui/material';
import { Alert, AlertTitle } from '@mui/lab';

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import CustomCard from '../../components/custom/Card'
import DateField from '../../components/custom/DateField'
import GroupScheduleSelect from '../../components/custom/GroupScheduleSelect'
import FeeTypeSelect from '../../components/custom/FeeTypeSelect'
import SportSchoolSelect from '../../components/custom/SportSchoolSelect'
import SaveButton from '../../components/custom/SaveButton'
import ReturnButton from '../../components/custom/ReturnButton'
import DeleteButton from "../../components/custom/DeleteButton";
import ConfirmDialog from "../../components/custom/ConfirmDialog";

import Select from '../../components/custom/Select'
import TextField from '../../components/custom/TextField'
// import FeeInfo from '../custom/FeeInfo'
import PhoneCard from '../../components/custom/PhoneCard'
import Spinner from '../../components/custom/Spinner'

import AthletesList from '../../components/custom/Athletes/AthletesList'
import AthleteFamilyData from '../../components/athletes/AthleteFamilyData'
import AthletesObservations from '../../components/athletes/AthleteObservations'
import AthleteReceipts from '../../components/athletes/AthleteReceipts'

import AthleteSportdata from './AthleteSportdata'

// Redux
import { connect } from "react-redux";
import { addAthlete, getAthlete, getAthletesByPhone, getAthleteByCode, getAthletesBySurnames, getAthleteReceipts, doRegisterAthlete, doUnregisterAthlete, removeAthlete } from "../../redux/actions/athletes";
import { getSportSchoolFee } from "../../redux/actions/sportSchools";

import { isManager, isAdmin } from "../../services/LoginService";

const CreateAthlete: React.FC<any> = (props) => {

    const [athlete, setAthlete] = React.useState<any>({})

    const getAthlete = (props:any) => { 
        if (!isNewAthlete()) {
            if (props.searchParams, props.searchParams.get('code')){
                let code = props.searchParams.get('code')
                props.getAthleteByCode(code)
            }
            else if (props.id && props.id ){
                let id = props.id
                props.getAthlete(id)
            }
        }
    }
    React.useEffect(() => {
        getAthlete(props)
    }, [props.id, props.searchParams])

    React.useEffect(() => {
        if (props.athlete){
            setAthlete(props.athlete)
            props.getSportSchoolFee(props.athlete.sportSchoolId);
            if (props.athlete.id){
                props.getAthleteReceipts(props.athlete.id)
            }
        }
    }, [props.athlete])

    const handleFormSubmit = (values: any) => {
        props.addAthlete(values)
    }

    const getPhoneList = (phone1: string, phone2: string, phone3: string): string[] => {

        // Check relatives by phone
        let phoneList: string[] = [];
        if (phone1 && phone1 !== ''){
            phoneList.push(phone1)
        }
        if (phone2 && phone2 !== ''){
            phoneList.push(phone2)
        }
        if (phone3 && phone3 !== ''){
            phoneList.push(phone3)
        }
        return phoneList;
    }

    const isNewAthlete = () => {
        return !(props.id) && !(props.code)
    }

    const isMatchingAthletes = (selectedFamily: boolean) => {
        return !selectedFamily && (!props.athlete.id || props.athlete.id === 0) && 
            ((props.athletes_by_surnames && props.athletes_by_surnames.length > 0) || 
            (props.athletes_by_phone && props.athletes_by_phone.length > 0))                                                                    
    }

    return (
        <React.Suspense fallback={<div>Cargando...</div>}>

            <Formik enableReinitialize
                initialValues={{
                    id: athlete.id || 0,
                    createdAt: athlete.createdAt || 0,
                    code: athlete.code || 0,
                    familyCode: athlete.familyCode || 0,
                    historic: athlete.historic || [],
                    // Extra fields
                    sportSchools: props.sportSchools || [],
                    age: athlete.age || 0,
                    // Personal info
                    sportSchoolId: athlete.sportSchoolId || '',
                    imageAuth: athlete.imageAuth,
                    enrollmentFeePaid: athlete.enrollmentFeePaid,
                    sportSchoolAnnualFeePaid: athlete.sportSchoolAnnualFeePaid,
                    membershipFeePaid: athlete.membershipFeePaid,
                    observations: athlete.observations || [],
                    name: athlete.name || '',
                    firstSurname: athlete.firstSurname || '',
                    secondSurname: athlete.secondSurname || '',
                    birthDate: athlete.birthDate || [],
                    birthPlace: athlete.birthPlace || '',
                    dni: athlete.dni || '',
                    nationality: athlete.nationality || '',
                    gender: athlete.gender || 'male',
                    // Familiar info
                    familiarOneName: athlete.familiarOneName || '',
                    familiarOneFirstSurname: athlete.familiarOneFirstSurname || '',
                    familiarOneSecondSurname: athlete.familiarOneSecondSurname || '',
                    familiarOneDni: athlete.familiarOneDni || '',
                    familiarOneMail: athlete.familiarOneMail || '',
                    familiarTwoName: athlete.familiarTwoName || '',
                    familiarTwoFirstSurname: athlete.familiarTwoFirstSurname || '',
                    familiarTwoSecondSurname: athlete.familiarTwoSecondSurname || '',
                    familiarTwoDni: athlete.familiarTwoDni || '',
                    familiarTwoMail: athlete.familiarTwoMail || '',
                    // Sport info
                    category: athlete.category || '',
                    nextCategory: (athlete.birthDate && athlete.birthDate.length > 0 ? utils.calculateCategory(athlete.birthDate[0] - 1) : '') || '',
                    dorsalCategory: athlete.dorsalCategory || '',
                    dorsalNumber: athlete.dorsalNumber || '',
                    membershipType: athlete.membershipType || '',
                    license: athlete.license || '',
                    licenseType: athlete.licenseType || '',
                    licenseNationalFee: athlete.licenseNationalFee || '',
                    licenseTerritorialFee: athlete.licenseTerritorialFee || '',
                    licenseOtherFee: athlete.licenseOtherFee || '',
                    groupId: athlete.groupId || '',
                    scheduleIds: athlete.scheduleIds || [],
                    trackHours: athlete.trackHours,
                    // Contact info
                    mail: athlete.mail || '',
                    phone1: athlete.phone1 || '',
                    phone2: athlete.phone2 || '',
                    phone3: athlete.phone3 || '',
                    municipality: athlete.municipality || '',
                    postalCode: athlete.postalCode || '',
                    address: athlete.address || '',
                    // Bank info
                    iban: athlete.iban || '',
                    paymentType: athlete.paymentType || '',
                    feeTypeId: athlete.feeTypeId || '',
                    holderName: athlete.holderName || '',
                    holderFirstSurname: athlete.holderFirstSurname || '',
                    holderSecondSurname: athlete.holderSecondSurname || '',
                    holderDni: athlete.holderDni || '',
                    // Calculated Fee
                    enrollmentFee: (props.athlete_fee ? props.athlete_fee.enrollmentFee : 0) || 0,
                    membershipFee: (props.athlete_fee ? props.athlete_fee.membershipFee : 0) || 0,
                    monthlyFee: (props.athlete_fee ? props.athlete_fee.monthlyFee : 0) || 0,
                    // receipts: props.receipts,
                    // Dialogs
                    registerDate: utils.dateToLocalDate(new Date()),
                    registerObservations: '',
                    openRegisterDialog: false,
                    openSportdataDialog: false,
                    openReceiptsDialog: false,
                    openMatchingAthletes: false,
                    openDeleteDialog: false,
                    pendingReceipts: props.receipts && props.receipts.length > 0 && props.receipts.some((d:any) => d.status.toUpperCase() === 'RETURN'),
                    openPendingReceipts: props.receipts && props.receipts.length > 0 && props.receipts.some((d:any) => d.status.toUpperCase() === 'RETURN'),
                    selectedFamily: false,

                    lastRegisterDate: utils.dateToLocalDate(new Date()),
                    
                    exit: athlete.exit || false,

                    errorMessage: athlete.errorMessage || '',
                    successMessage: athlete.successMessage || '',
                }}
                validate={(values) => {
                    let errors: any = {};

                    if (values.sportSchoolId  === '') errors.sportSchoolId = true;
                    if (values.enrollmentFeePaid === '') errors.enrollmentFeePaid = true;
                    if (values.imageAuth  === '') errors.imageAuth = true;
                    if (values.name  === '') errors.name = true;
                    if (values.firstSurname  === '') errors.firstSurname = true;
                    if (!values.birthDate || values.birthDate.length === 0) errors.birthDate = true;
                    if (values.gender  === '') errors.gender = true;
                    if (values.phone1  === '' && values.phone2  === '' && values.phone3  === '') errors.phone1 = true;
                    if (values.age >= 18 && values.mail  === '') errors.mail = true;
                    if (values.municipality  === '') errors.municipality = true;
                    if (values.postalCode  === '') errors.postalCode = true;
                    if (values.address  === '') errors.address = true;
                    if (values.paymentType  === '') errors.paymentType = true;
                    if (values.feeTypeId  === '') errors.feeTypeId = true;
                                    
                    if(values.paymentType === "DOM") {
                        if (!values.iban || values.iban === '') {
                            errors.iban = true;
                        }
                        else if(!utils.isValidIban(values.iban)) {
                            errors.iban = true;
                        }
                    }
                    if (values.holderName === '' && values.paymentType === "DOM") {
                        errors.holderName = true;
                    }
                    if (values.holderFirstSurname === '' && values.paymentType === "DOM") {
                        errors.holderFirstSurname = true;
                    }
                    if ((values.holderDni === '' || !utils.isValidDni(values.holderDni)) && values.paymentType === "DOM" ) {
                        errors.holderDni = true;
                    }
                    if (values.familiarOneDni !== '' && !utils.isValidDni(values.familiarOneDni)) {
                        errors.familiarOneDni = true;
                    }
                    if (values.familiarTwoDni !== '' && !utils.isValidDni(values.familiarTwoDni)) {
                        errors.familiarTwoDni = true;
                    }
                    if (values.age >= 14 && !utils.isValidDni(values.dni)){
                        errors.dni = true
                    }
            
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setAthlete(values)
                    setSubmitting(false);
                    handleFormSubmit(values)
                }}
            >
            {({ handleSubmit, values, touched, setFieldValue, errors, handleChange, isSubmitting, setFieldError, setFieldTouched }) => {
                
                return (

                <form onSubmit={handleSubmit}>
                    <Dialog fullWidth={true} open={values.openPendingReceipts} aria-labelledby="form-dialog-title"
                        onClose={() => {
                            setFieldValue("openPendingReceipts", false)
                        }}
                    >
                        <DialogTitle id="form-dialog-title">El atleta tiene recibos pendientes de pago</DialogTitle>
                        <DialogActions>
                            <Button 
                                onClick={(a: any) => { 
                                    setFieldValue("openPendingReceipts", false)
                            }}
                            >Cerrar</Button>
                        </DialogActions>

                    </Dialog>
                    <Snackbar open={values.errorMessage !== undefined && values.errorMessage !== ''}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000}>
                        <Alert severity="error" onClose={() => { setFieldValue("errorMessage", "") }}>
                            <AlertTitle>Error</AlertTitle>
                            <strong>{values.errorMessage}</strong>
                        </Alert>
                    </Snackbar>
                    <Snackbar open={values.successMessage !== undefined && values.successMessage !== ''}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000}>
                        <Alert severity="success" onClose={() => { 
                                setFieldValue("successMessage", "");
                                if (values.exit) {
                                    window.open("/athletes/list", "_self");
                                }
                                else {
                                    window.open("/athletes", "_self");
                                } 
                            }}>
                            <AlertTitle>Ok!</AlertTitle>
                            <strong>{values.successMessage}</strong>
                        </Alert>
                    </Snackbar>
                    <ConfirmDialog open={values.openDeleteDialog} 
                        confirm={() => {
                            props.removeAthlete(values.id);
                            setFieldValue("openDeleteDialog", false);
                            window.open("/athletes/list", "_self");
                        }}
                        cancel={() => setFieldValue("openDeleteDialog", false)}
                    />
                    <ConfirmDialog open={values.openDeleteDialog} 
                        confirm={() => {
                            props.removeAthlete(values.id);
                            setFieldValue("openDeleteDialog", false);
                            window.open("/athletes/list", "_self");
                        }}
                        cancel={() => setFieldValue("openDeleteDialog", false)}
                    />

                    <Dialog fullWidth={true} maxWidth="xl" open={values.openMatchingAthletes} aria-labelledby="form-dialog-title"
                        onClose={() => {
                            setFieldValue('openMatchingAthletes', false)
                            setFieldValue("selectedFamily", false)
                        }}
                    >
                        <DialogTitle id="form-dialog-title">Atletas coincidentes</DialogTitle>
                        <DialogContent>
                            <AthletesList athletes={props.athletes_by_phone.concat(props.athletes_by_surnames)
                                    .reduce((accumulator:any[], currentValue:any) => {
                                        if (accumulator.some((d:any) => d.id == currentValue.id)){
                                            return accumulator;
                                        }
                                        else {
                                            return [...accumulator, currentValue]
                                        }
                                    }, [])
                                }
                                onSelectFamily={(athlete: any) => { 

                                    setFieldValue("familyCode", athlete.familyCode)
                                    // Contact data
                                    setFieldValue("mail", athlete.mail)
                                    setFieldValue("phone1", athlete.phone1)
                                    setFieldValue("phone2", athlete.phone2)
                                    setFieldValue("phone3", athlete.phone3)
                                    setFieldValue("municipality", athlete.municipality)
                                    setFieldValue("postalCode", athlete.postalCode)
                                    setFieldValue("address", athlete.address)
                                    // Family data
                                    setFieldValue("familiarOneName", athlete.familiarOneName)
                                    setFieldValue("familiarOneFirstSurname", athlete.familiarOneFirstSurname)
                                    setFieldValue("familiarOneSecondSurname", athlete.familiarOneSecondSurname)
                                    setFieldValue("familiarOneDni", athlete.familiarOneDni)
                                    setFieldValue("familiarOneMail", athlete.familiarOneMail)
                                    setFieldValue("familiarTwoName", athlete.familiarTwoName)
                                    setFieldValue("familiarTwoFirstSurname", athlete.familiarTwoFirstSurname)
                                    setFieldValue("familiarTwoSecondSurname", athlete.familiarTwoSecondSurname)
                                    setFieldValue("familiarTwoDni", athlete.familiarTwoDni)
                                    setFieldValue("familiarTwoMail", athlete.familiarTwoMail)
                                    // Payment data
                                    setFieldValue("paymentType", athlete.paymentType)
                                    setFieldValue("feeTypeId", athlete.feeTypeId)
                                    setFieldValue("iban", athlete.iban)
                                    setFieldValue("holderName", athlete.holderName)
                                    setFieldValue("holderFirstSurname", athlete.holderFirstSurname)
                                    setFieldValue("holderSecondSurname", athlete.holderSecondSurname)
                                    setFieldValue("holderDni", athlete.holderDni)
                                    setFieldValue("openMatchingAthletes", false)
                                    setFieldValue("selectedFamily", true)
                                }}
                                onSelectAthlete={(id: number) => { 
                                    window.open("/athletes/" + id, "_self");
                                }}
                            />
                            
                        </DialogContent>
                        <DialogActions>
                            <Button 
                                onClick={(a: any) => { 
                                    setFieldValue('selectedFamily', false) 
                                    setFieldValue('openMatchingAthletes', false)
                                }}
                            >Cerrar</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog fullWidth={true} open={values.openRegisterDialog} aria-labelledby="form-dialog-title"
                        onClose={() => {
                            setFieldValue('openRegisterDialog', false)
                            getAthlete(values.id)
                        }}
                    >
                        <DialogTitle id="form-dialog-title">Fecha de {utils.isRegistered(values.historic) ? 'baja' : 'alta'}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Introduce la fecha de {utils.isRegistered(values.historic) ? 'baja' : 'alta'}.
                        </DialogContentText>
                            <div style={{ display:'flex', justifyContent:"space-between" }}>
                                <DateField name="registerDate" value={values.registerDate} 
                                    min={utils.getLastHistoricDate(values.historic) }
                                    label={utils.isRegistered(values.historic) ? 'Fecha de baja' : 'Fecha de alta'} margin="dense" 
                                    onChange={(e: any) => {
                                        setFieldValue('registerDate', e);
                                    }} 
                                />
                            </div>
                            <TextField fullWidth name="registerObservations" label="Observaciones" multiline
                                    value={values.registerObservations} onChange={handleChange}/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => {
                                if (utils.isRegistered(values.historic)){
                                    props.doUnregisterAthlete(values.id, { date: values.registerDate, observations: values.registerObservations })
                                    .then(() => window.open("/athletes/list", "_self"))
                                }
                                else {
                                    props.doRegisterAthlete(values.id, { date: values.registerDate, observations: values.registerObservations })
                                    .then(() => window.open("/athletes/" + values.id, "_self"))
                                }
                            }}>Guardar</Button>
                            <Button onClick={() => { setFieldValue('openRegisterDialog', false) }}>Cancelar</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog fullWidth={true} maxWidth="xl" open={values.openSportdataDialog} aria-labelledby="form-dialog-title"
                        onClose={() => {
                            setFieldValue('openSportdataDialog', false)
                        }}
                    >
                        <DialogTitle id="form-dialog-title">Histórico deportivo</DialogTitle>
                        <DialogContent>
                            <Grid container>
                                <AthleteSportdata id={values.id} />
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => { setFieldValue('openSportdataDialog', false) }}>Cerrar</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog fullWidth={true} maxWidth="xl" open={values.openReceiptsDialog} aria-labelledby="form-dialog-title"
                        onClose={async () => {
                            setFieldValue('openReceiptsDialog', false)
                            await getAthlete(props)
                        }}
                    >
                        <DialogContent>
                            <Grid container>
                                <AthleteReceipts athleteId={values.id} />
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={async () => { 
                                setFieldValue('openReceiptsDialog', false) 
                                await getAthlete(props)
                            }}>Cerrar</Button>
                        </DialogActions>
                    </Dialog>
                    
                    <Box paddingBottom={7}>
                        <Grid container spacing={3}>
                            <Grid container item spacing={3}>
                                <Grid container item spacing={1}>
                                    <Grid item xs={6}>
                                        <CustomCard>
                                            <Grid container spacing={2}>
                                                <Grid item xs>
                                                    <SportSchoolSelect sportSchoolId={values.sportSchoolId} error={touched.sportSchoolId && errors.sportSchoolId}
                                                        disabled={!(isManager() || isAdmin())} onChange={(sportSchoolId: number) => {
                                                            setFieldValue('sportSchoolId', sportSchoolId);
                                                            if (sportSchoolId !== values.sportSchoolId){
                                                                setFieldValue('groupId', 0);
                                                                setFieldValue('schedueIds', []);
                                                                props.getSportSchoolFee(sportSchoolId);
                                                            }
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <TextField name="code" label="Código de atleta" type="number" disabled value={values.code} />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <TextField name="familyCode" label="Código de familia" type="number" disabled value={values.familyCode} />
                                                </Grid>
                                                { values.id === 0 && <div style={{ display:'flex', justifyContent:'space-around'}}>
                                                    <DateField value={values.lastRegisterDate} label="Fecha de alta"
                                                        error={touched.lastRegisterDate && errors.lastRegisterDate}
                                                        onChange={(e: any) => {
                                                            setFieldValue('lastRegisterDate', e);
                                                        }}
                                                    />
                                                </div>
                                                }
                                            </Grid>
                                        </CustomCard>
                                    </Grid>
                                    <Grid item xs={2} style={{ display: values.id > 0 ? "block" : "none" }}>
                                        {values.historic.sort((a: {type: string, date: number[]}, b: {type: string, date: number[]}) => { 
                                            let aDate = utils.localDateToDate(a.date)
                                            let bDate = utils.localDateToDate(b.date)
                                            return aDate !== null && bDate !== null && aDate?.getTime() < bDate?.getTime() ? 1 : -1
                                        })
                                        .map((historic:any) => {
                                            return <Typography variant="subtitle1" gutterBottom component="div">{historic.type === 'REGISTER' ? 'Alta' : 'Baja'}: {moment(new Date(historic.date)).format('DD/MM/YYYY')}</Typography>
                                        })}
                                    </Grid>
                                    { (isAdmin() || isManager()) &&
                                        <Grid item xs={1}>
                                            {values.id ? <Button onClick={() => { setFieldValue('openRegisterDialog', true) }} >{utils.isRegistered(values.historic) ? 'Dar de baja' : 'Dar de alta'}</Button> : null}
                                        </Grid>
                                    }
                                    <Grid container item direction="column" xs={1}>
                                        <Grid item xs>
                                            {values.id ? <Button onClick={() => { setFieldValue('openSportdataDialog', true) }} >Histórico deportivo</Button> : null}
                                        </Grid>
                                        <Grid item xs>
                                            {values.id && (isAdmin() || isManager()) ? <Button onClick={() => { setFieldValue('openReceiptsDialog', true) }} >Recibos</Button> : null}
                                        </Grid>
                                    </Grid>
                                    <Grid item xs>
                                        <Grid item xs>
                                            <Checkbox name="enrollmentFeePaid" disabled={!(isManager() || isAdmin())} checked={values.enrollmentFeePaid === true} 
                                                onChange={e => {
                                                    setFieldValue('enrollmentFeePaid', e.target.checked)
                                                }}
                                            />
                                            Matricula pagada
                                        </Grid>
                                        <Grid item xs>
                                            <Checkbox name="membershipFeePaid" disabled={!(isManager() || isAdmin())} checked={values.membershipFeePaid === true} 
                                                onChange={e => {
                                                    setFieldValue('membershipFeePaid', e.target.checked)
                                                }}
                                            />
                                            Cuota de socio pagada
                                        </Grid>
                                        { props.sportSchoolFee && props.sportSchoolFee.sportSchoolAnnualFee > 0 && <Grid item xs>
                                            <Checkbox name="sportSchoolAnnualFeePaid" checked={values.sportSchoolAnnualFeePaid === true} 
                                                onChange={e => {
                                                    setFieldValue('sportSchoolAnnualFeePaid', e.target.checked)
                                                }}
                                            />
                                            Cuota anual de escuela
                                        </Grid>
                                        }
                                        { values.pendingReceipts && <>
                                            <h3 style={{ color: 'red' }}>Recibos pendientes de pago</h3>
                                        </>
                                        }
                                    </Grid>
                                </Grid>
                                <Grid container item spacing={2}>
                                    <Grid item xs>
                                        <CustomCard title="Datos Personales">
                                            <Grid container direction="column" spacing={2}>
                                                <Grid container item spacing={1}>
                                                    <Grid item xs>
                                                        <TextField name="name" label="Nombre" value={values.name} disabled={!(isManager() || isAdmin())} margin="dense"
                                                            error={touched.name && errors.name} onChange={handleChange} 
                                                        />
                                                    </Grid>
                                                    <Grid item xs>
                                                        <TextField name="firstSurname" label="Primer Apellido" value={values.firstSurname} disabled={!(isManager() || isAdmin())} margin="dense"
                                                            error={touched.firstSurname && errors.firstSurname}
                                                            onBlur={(e: any) => {
                                                                if (values.familiarOneFirstSurname === '') {
                                                                    setFieldValue('familiarOneFirstSurname', e.target.value);
                                                                }
                                                                if (isNewAthlete() && values.firstSurname !== '' && values.secondSurname !== ''){
                                                                    return props.getAthletesBySurnames(values.firstSurname, values.secondSurname).then(() => {
                                                                        setFieldValue('openMatchingAthletes', isMatchingAthletes(values.selectedFamily))
                                                                    })
                                                                }
                                                            }}
                                                            onChange={handleChange}
                                                        />
                                                    </Grid>
                                                    <Grid item xs>
                                                        <TextField name="secondSurname" label="Segundo Apellido" value={values.secondSurname} disabled={!(isManager() || isAdmin())} margin="dense"
                                                            error={touched.secondSurname && errors.secondSurname}
                                                            onBlur={(e: any) => {
                                                                if (values.familiarTwoFirstSurname === '') {
                                                                    setFieldValue('familiarTwoFirstSurname', e.target.value);
                                                                }
                                                                if (isNewAthlete() && values.firstSurname !== '' && values.secondSurname !== ''){
                                                                    return props.getAthletesBySurnames(values.firstSurname, values.secondSurname).then(() => {
                                                                        setFieldValue('openMatchingAthletes', isMatchingAthletes(values.selectedFamily))
                                                                    })
                                                                }
                                                            }}
                                                            onChange={handleChange}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid container item spacing={1}>
                                                    <Grid item xs>
                                                        <DateField value={values.birthDate} label="Fecha de nacimiento"
                                                            error={touched.birthDate && errors.birthDate} disabled={!(isManager() || isAdmin())} 
                                                            max={moment(new Date()).format("YYYY-MM-DD")}
                                                            onChange={(e: any) => {
                                                                let age: number = utils.ageCalculator(e)
                                                                setFieldValue('age', age);
                                                                setFieldValue('birthDate', e);
                                                                // if (!values.category){ 
                                                                let cat = utils.calculateCategory(e[0])
                                                                let nextCat = utils.calculateCategory(e[0] - 1)
                                                                setFieldValue('category', cat);
                                                                setFieldValue('nextCategory', nextCat);
                                                                // }
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs>
                                                        <TextField label="Edad" type="number" disabled value={values.age} margin="dense" />
                                                    </Grid>
                                                    <Grid item xs>
                                                        <TextField name="birthPlace" label="Lugar de nacimiento" type="text" value={values.birthPlace} disabled={!(isManager() || isAdmin())}
                                                            error={touched.birthPlace && errors.birthPlace} onChange={handleChange}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid container item spacing={1}>
                                                    <Grid item xs>
                                                        <TextField name="dni" label="Dni/Nie" type="text" value={values.dni} error={touched.dni && errors.dni} disabled={!(isManager() || isAdmin())}
                                                            onChange={handleChange}
                                                            onBlur={() => {
                                                                if (!utils.isValidDni(values.dni)){
                                                                    setFieldTouched("dni", true, false);
                                                                    setFieldError("dni", "Dni/Nie incorrecto");
                                                                }
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs>
                                                        <Select fullWidth name="gender" label="Género" error={touched.gender && errors.gender}
                                                            options={[{ id: "male", name: "Hombre" }, { id: "female", name: "Mujer" }]} value={values.gender}
                                                            disabled={!(isManager() || isAdmin())}
                                                            onChange={(e: any, value: any) => {
                                                                setFieldValue('gender', value ? value.id : "")
                                                                if (values.gender && values.birthDate && values.birthDate.length > 0){
                                                                    setFieldValue('dorsalCategory', utils.calculateDorsalCategory(values.birthDate[0], values.gender))
                                                                }
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs>
                                                        <TextField name="nationality" label="Nacionalidad" type="text" value={values.nationality}
                                                            disabled={!(isManager() || isAdmin())}
                                                            error={touched.nationality && errors.nationality}
                                                            onChange={handleChange}
                                                        />
                                                    </Grid>
                                                    <Grid container >
                                                    { (isManager() || isAdmin()) && <Button style={{maxWidth: '30%'}} onClick={() => {
                                                        setFieldValue('holderName', values.name)
                                                        setFieldValue('holderFirstSurname', values.firstSurname)
                                                        setFieldValue('holderSecondSurname', values.secondSurname)
                                                        setFieldValue('holderDni', values.dni)
                                                    }}>Titular de la cuenta</Button>
                                                    }
                                                </Grid>
                                                </Grid>
                                            </Grid>
                                        </CustomCard>
                                    </Grid>
                                    <Grid item xs>
                                        <CustomCard title="Datos de contacto" >
                                            <Grid container direction="column" spacing={2}>
                                                <Grid container item spacing={1}>
                                                    <Grid item xs>
                                                        <TextField fullWidth name="mail" label="Email" type="email" value={values.mail} 
                                                            disabled={!(isManager() || isAdmin())}
                                                            onChange={handleChange} error={touched.mail && errors.mail} />
                                                    </Grid>
                                                </Grid>
                                                <PhoneCard phone1={values.phone1} phone2={values.phone2} phone3={values.phone3}
                                                    disabled={!(isManager() || isAdmin())}
                                                    errorPhone1={touched.phone1 && errors.phone1}
                                                    onChange={(phone1:string, phone2:string, phone3:string) => {
                                                        setFieldValue('phone1', phone1)
                                                        setFieldValue('phone2', phone2)
                                                        setFieldValue('phone3', phone3)
                                                    }}
                                                    onBlur={() => {
                                                        let phoneList = getPhoneList(values.phone1, values.phone2, values.phone3)
                                                        if (isNewAthlete() && phoneList.length > 0){
                                                            return props.getAthletesByPhone(phoneList).then(() => {
                                                                setFieldValue('openMatchingAthletes', isMatchingAthletes(values.selectedFamily))
                                                            })
                                                        }
                                                    }} />
                                                { (isAdmin() || isManager()) &&
                                                    <> 
                                                        <Grid container item spacing={1}>
                                                            <Grid item xs>
                                                                <TextField disabled={!(isManager() || isAdmin())} name="municipality" label="Municipio" value={values.municipality} onChange={handleChange}
                                                                    error={touched.municipality && errors.municipality} />
                                                            </Grid>
                                                            <Grid item xs>
                                                                <TextField disabled={!(isManager() || isAdmin())} name="postalCode" label="C.P." value={values.postalCode} onChange={handleChange}
                                                                    error={touched.postalCode && errors.postalCode} />
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container item spacing={1}>
                                                            <Grid item xs>
                                                                <TextField disabled={!(isManager() || isAdmin())} fullWidth name="address" label="Dirección" value={values.address} onChange={handleChange}
                                                                    error={touched.address && errors.address} />
                                                            </Grid>
                                                        </Grid>
                                                    </>
                                                }
                                            </Grid>
                                        </CustomCard>
                                    </Grid>
                                </Grid>
                                <Grid container item spacing={2}>
                                    <Grid item xs>
                                        <CustomCard title="Datos Familiares">
                                            <Grid container item direction="column" spacing={2}>
                                                <Grid container alignItems="flex-start">
                                                    <Typography color="textSecondary">Familiar 1</Typography>
                                                    { (isManager() || isAdmin()) && <Button style={{maxWidth: '30%'}} onClick={() => {
                                                        setFieldValue('holderName', values.familiarOneName)
                                                        setFieldValue('holderFirstSurname', values.familiarOneFirstSurname)
                                                        setFieldValue('holderSecondSurname', values.familiarOneSecondSurname)
                                                        setFieldValue('holderDni', values.familiarOneDni)
                                                    }}>Titular de la cuenta</Button>
                                                    }
                                                </Grid>
                                                <AthleteFamilyData key={`familiar-one-${values.id}`} name={values.familiarOneName} firstSurname={values.familiarOneFirstSurname} secondSurname={values.familiarOneSecondSurname}
                                                    dni={values.familiarOneDni} touchedDni={touched.familiarOneDni} errorsDni={errors.familiarOneDni}
                                                    mail={values.familiarOneMail}
                                                    disabled={!(isManager() || isAdmin())}
                                                    dniOnBlur={() => {
                                                        if (values.familiarOneDni && !utils.isValidDni(values.familiarOneDni)){
                                                            setFieldTouched("familiarOneDni", true, false);
                                                            setFieldError("familiarOneDni", "Dni/Nie incorrecto");
                                                        }
                                                    }} 
                                                    onChange={(p: { name: string, value: string }) => {
                                                        setFieldValue('familiarOne' + p.name, p.value)
                                                    }}
                                                />
                                                <Grid container alignItems="flex-start">
                                                    <Typography color="textSecondary">Familiar 2</Typography>
                                                    { (isManager() || isAdmin()) && <Button style={{maxWidth: '30%'}} onClick={() => {
                                                        setFieldValue('holderName', values.familiarTwoName)
                                                        setFieldValue('holderFirstSurname', values.familiarTwoFirstSurname)
                                                        setFieldValue('holderSecondSurname', values.familiarTwoSecondSurname)
                                                        setFieldValue('holderDni', values.familiarTwoDni)
                                                    }}>Titular de la cuenta</Button>
                                                    }
                                                </Grid>
                                                <AthleteFamilyData key={`familiar-two-${values.id}`} name={values.familiarTwoName} firstSurname={values.familiarTwoFirstSurname} secondSurname={values.familiarTwoSecondSurname}
                                                    dni={values.familiarTwoDni} touchedDni={touched.familiarTwoDni} errorsDni={errors.familiarTwoDni}
                                                    mail={values.familiarTwoMail}
                                                    disabled={!(isManager() || isAdmin())}
                                                    dniOnBlur={() => {
                                                        if (values.familiarTwoDni && !utils.isValidDni(values.familiarTwoDni)){
                                                            setFieldTouched("familiarTwoDni", true, false);
                                                            setFieldError("familiarTwoDni", "Dni/Nie incorrecto");
                                                        }
                                                    }} 
                                                    onChange={(p: { name: string, value: string }) => {
                                                        setFieldValue('familiarTwo' + p.name, p.value)
                                                    }}

                                                />
                                            </Grid>
                                        </CustomCard>
                                    </Grid>
                                    { (isAdmin() || isManager()) && 
                                        <Grid item xs>
                                            <CustomCard title="Datos Bancarios" >
                                                <Grid container direction="column" spacing={2}>
                                                    <Grid container item spacing={1}>
                                                        <Grid item xs={4}>
                                                            <Select fullWidth name="paymentType" label="Forma de pago"
                                                                options={utils.getPaymentTypes()} value={values.paymentType} error={touched.paymentType && errors.paymentType}
                                                                onChange={(e: any, value: any) => {
                                                                    setFieldValue('paymentType', value ? value.id : "")
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <FeeTypeSelect feeType={values.feeTypeId} sportSchoolId={values.sportSchoolId}
                                                                error={touched.feeTypeId && errors.feeTypeId}
                                                                onChange={(feeTypeId: string) => {
                                                                    setFieldValue('feeTypeId', feeTypeId);
                                                                }}
                                                            />
                                                        </Grid>
                                                        { values.feeTypeId === 4 &&
                                                            <Grid item xs>
                                                                <Select fullWidth name="membershipType" label="Tipo de socio"
                                                                    options={utils.getMembershipTypes()} 
                                                                    value={values.membershipType}
                                                                    onChange={(e: any, value: any) => {
                                                                        setFieldValue('membershipType', value ? value.id : "")
                                                                    }}
                                                                />
                                                            </Grid>
                                                        }
                                                        <Grid item xs={4}>
                                                            <TextField fullWidth name="iban" label="Iban" value={values.iban} onChange={handleChange}
                                                                error={touched.iban && errors.iban}
                                                                onBlur={() => {
                                                                    if (values.paymentType === "DOM" && !utils.isValidIban(values.iban)){
                                                                        setFieldTouched("iban", true, false);
                                                                        setFieldError("iban", "IBAN incorrecto");
                                                                    }
                                                                }}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <CardHeader subheader="Titular de la cuenta" />
                                                    <Grid container item spacing={1}>
                                                        <Grid item xs>
                                                            <TextField name="holderName" label="Nombre" value={values.holderName} onChange={handleChange}
                                                                error={touched.holderName && errors.holderName}
                                                            />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <TextField name="holderFirstSurname" label="Primer apellido" value={values.holderFirstSurname} onChange={handleChange}
                                                                error={touched.holderFirstSurname && errors.holderFirstSurname}
                                                            />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <TextField name="holderSecondSurname" label="Segundo apellido" value={values.holderSecondSurname} onChange={handleChange}
                                                                error={touched.holderSecondSurname && errors.holderSecondSurname}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container item spacing={1}>
                                                        <Grid item xs={3}>
                                                            <TextField name="holderDni" label="Dni/Nie" type="text" value={values.holderDni} error={touched.holderDni && errors.holderDni} onChange={handleChange}
                                                                onBlur={() => {
                                                                    if (values.holderDni && !utils.isValidDni(values.holderDni)){
                                                                        setFieldTouched("holderDni", true, false);
                                                                        setFieldError("holderDni", "Dni/Nie incorrecto");
                                                                    }
                                                                }}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </CustomCard>
                                        </Grid>
                                    }  
                                </Grid>
                                <Grid container item>
                                    <Grid item xs>
                                        <CustomCard title="Datos Deportivos" >
                                            <Grid container spacing={1} direction="column">
                                                <Grid container item xs spacing={1}>
                                                    <Grid item xs={2}>
                                                        <TextField fullWidth name="category" label="Categoría" value={values.category} 
                                                            disabled={true} />
                                                        {/* <Select fullWidth name="category" label="Categoría"
                                                            disabled={!(isManager() || isAdmin())}
                                                            options={utils.getCategories()} 
                                                            value={values.category}
                                                            onChange={(e: any, value: any) => {
                                                                setFieldValue('category', value ? value.id : "")
                                                            }}
                                                        /> */}
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        {/* <Select fullWidth name="nextCategory" label="Siguiente categoría"
                                                            disabled={!(isManager() || isAdmin())}
                                                            options={utils.getCategories()} 
                                                            value={values.nextCategory}
                                                            onChange={(e: any, value: any) => {
                                                                setFieldValue('nextCategory', value ? value.id : "")
                                                            }}
                                                        /> */}
                                                        <TextField fullWidth name="nextCategory" label="Siguiente categoría" value={values.nextCategory} 
                                                            disabled={true} />
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <Select fullWidth name="dorsalCategory" label="Categoría dorsal"
                                                            disabled={!(isManager() || isAdmin())}
                                                            options={utils.getDorsalCategories()} 
                                                            value={values.dorsalCategory}
                                                            onChange={(e: any, value: any) => {
                                                                setFieldValue('selectedDorsalCategory', 'true')
                                                                setFieldValue('dorsalCategory', value ? value.id : "")
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <TextField fullWidth name="dorsalNumber" label="Dorsal" type="number" value={values.dorsalNumber} 
                                                            disabled={!(isManager() || isAdmin())} onChange={handleChange} />
                                                    </Grid>
                                                </Grid>
                                                <Grid container item xs spacing={1}>
                                                    <Grid item xs={2}>
                                                        <Select fullWidth name="licenseType" label="Tipo de Licencia"
                                                            disabled={!(isManager() || isAdmin())}
                                                            value={values.licenseType} options={utils.getLicenseTypes()}
                                                            onChange={(e: any, value: any) => setFieldValue('licenseType', value ? value.id : "")}
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                        <TextField fullWidth name="license" label="Licencia" value={values.license} 
                                                            disabled={!(isManager() || isAdmin())}
                                                            onChange={handleChange} 
                                                        />
                                                    </Grid>
                                                    { (isManager() || isAdmin()) && <>
                                                        <Grid item>
                                                            <TextField fullWidth name="licenseNationalFee" label="Cuota licencia nacional" type="number" value={values.licenseNationalFee} onChange={handleChange} />
                                                        </Grid>
                                                        <Grid item>
                                                            <TextField fullWidth name="licenseTerritorialFee" label="Cuota licencia territorial" type="number" value={values.licenseTerritorialFee} onChange={handleChange} />
                                                        </Grid>
                                                        <Grid item>
                                                            <TextField fullWidth name="licenseOtherFee" label="Otros conceptos de licencia" type="number" value={values.licenseOtherFee} onChange={handleChange} />
                                                        </Grid>
                                                    </>
                                                    }
                                                </Grid>
                                                
                                                { values.sportSchoolId > 0 && values.feeTypeId == 1 &&
                                                    <Grid container item xs spacing={1} direction="row">
                                                        { values.feeTypeId === 5 || values.feeTypeId === 6 ?
                                                        <Grid item xs={2}>
                                                            <Select name="trackHours" label="Num horas de pista" error={touched.trackHours && errors.trackHours}
                                                                    disabled={!(isManager() || isAdmin())}
                                                                    options={[{ id: "h_1_5", name: "1.5 h" }, { id: "h_3", name: "3 h" } ]} value={values.trackHours}
                                                                    onChange={(e: any, value: any) => {
                                                                        setFieldValue('trackHours', value ? value.id : "")
                                                                    }}
                                                            />
                                                        </Grid>
                                                        :
                                                            <Grid item xs>
                                                                <GroupScheduleSelect 
                                                                    groupId={values.groupId}
                                                                    sportSchoolId={values.sportSchoolId}
                                                                    scheduleIds={values.scheduleIds}
                                                                    disabled={!(isManager() || isAdmin())}
                                                                    onGroupChange={(grId: number) => {
                                                                        setFieldValue('groupId', grId)
                                                                        if (grId === athlete.groupId){
                                                                            setFieldValue('scheduleIds', athlete.scheduleIds)
                                                                        }
                                                                    }}
                                                                    onScheduleChange={(scheduleIds: number[]) => {
                                                                        setFieldValue('scheduleIds', scheduleIds)
                                                                    }}
                                                                />
                                                            </Grid>
                                                        }
                                                    </Grid>
                                                }
                                            </Grid>
                                        </CustomCard>
                                    </Grid>
                                </Grid>
                                <Grid container item style={{ display: "block" }}>
                                    <Grid item>
                                        <CustomCard>
                                            <Grid container spacing={1}>
                                                <Grid item xs={3}>
                                                    <Checkbox name="imageAuth" checked={values.imageAuth === true} 
                                                        disabled={!(isManager() || isAdmin())}
                                                        onChange={e => {
                                                            setFieldValue('imageAuth', e.target.checked)
                                                        }}
                                                    />
                                                    Autorización de Imágenes
                                                </Grid>
                                                <Grid item xs={9}>
                                                    <AthletesObservations athleteId={values.id} disabled={!(isManager() || isAdmin())}/>
                                                </Grid>
                                            </Grid>
                                        </CustomCard>
                                    </Grid>
                                </Grid>
                                {/* <Grid container item style={{ display: values.feeType !== "SOCIO" ? "block" : "none" }}>
                                    <Grid item>
                                        <FeeInfo {...values} />
                                    </Grid>
                                </Grid> */}
                            </Grid>
                        </Grid>
                    </Box>
                    { (isAdmin() || isManager()) && 
                        <AppBar position="fixed" style={{ bottom: 0, top: 'auto' }}>
                            <Toolbar>
                                { props.loading ? <Spinner/> : <>
                                    <SaveButton type="submit" disabled={isSubmitting}
                                            onClick={() => {
                                                setFieldValue('exit', true)
                                                return false;
                                            }}
                                        >Guardar y salir</SaveButton>
                                    <SaveButton type="submit" disabled={isSubmitting}>Guardar y continuar</SaveButton>
                                    {props.id ? <DeleteButton onClick={() => setFieldValue("openDeleteDialog", true)}/> : null }
                                    <ReturnButton onClick={() => window.open("/athletes/list", "_self")}/>
                                </>
                                }
                            </Toolbar>
                        </AppBar>
                    }
                </form>
            )}}
            </Formik>

        </React.Suspense>
    )
}

const mapDispatchToProps = {
    addAthlete, 
    getAthlete,
    getAthleteByCode,
    getAthletesByPhone,
    getAthletesBySurnames,
    getAthleteReceipts,
    doRegisterAthlete, 
    doUnregisterAthlete,
    removeAthlete,
    getSportSchoolFee
}

const mapStateToProps = (state: any) => {
    return {
        athlete: state.athlete_reducer.athlete,
        athletes_by_phone: state.athlete_reducer.athletes_by_phone,
        athletes_by_surnames: state.athlete_reducer.athletes_by_surnames,
        receipts: state.athlete_reducer.athlete_receipts,
        sportSchoolFee: state.sport_school_reducer.sport_school_fee,
        loading: state.api_reducer.loading
    };
};

const ConnectedComponent = connect(mapStateToProps,mapDispatchToProps)(CreateAthlete)

const WithRouterWrapper = () => {
    let { id } = useParams()
    const [searchParams] = useSearchParams();

    return (
        <ConnectedComponent id={id} searchParams={searchParams}></ConnectedComponent>
    )
}
export default WithRouterWrapper