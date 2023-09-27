import { NewPatientEntry, Gender} from './types';

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if ( !object || typeof object !== 'object' ) {
      throw new Error('Incorrect or missing data');
    }
  
    if ('name' in object && 'occupation' in object && 'gender' in object && 'ssn' in object && 'dateOfBirth' in object)  {
      const newEntry: NewPatientEntry = {
        name: parseName(object.name),
        occupation: parseOccupation(object.occupation),
        dateOfBirth: parseDate(object.dateOfBirth),
        gender: parseGender(object.gender),
        ssn: parseSsn(object.ssn),
        entries: []
      };
    
      return newEntry;
    }
  
    throw new Error('Incorrect data: some fields are missing');
  };

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing comment');
    }
  
    return name;
  };

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing comment');
  }  
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing comment');
  }
  return occupation;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
  };

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
  };

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender: ' + gender);
  }
  return gender;
};

export default toNewPatientEntry;



