import patients from '../../data/patients';
// import { Patient, NonSensitivePatient, NewPatientEntry, Entry } from '../types';
import { Patient, NonSensitivePatient, NewPatientEntry} from '../types';
import { v4 as uuidv4 } from 'uuid';

 const getPatients = (): Patient[] => {
    return patients;
  };

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, ssn, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        ssn,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
      }));
  };

const findById = (id: string): Patient | undefined => {
  const entry = patients.find(d => d.id === id);
  return entry;
};

const addPatient = ( entry: NewPatientEntry ): Patient => {
  const newPatient = {
    id: String(uuidv4),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
    getPatients,
    getNonSensitivePatients,
    findById,
    addPatient};