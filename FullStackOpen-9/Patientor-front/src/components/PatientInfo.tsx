import { Patient, Entry, Diagnosis } from "../types";
import { useParams } from 'react-router-dom'

interface Props {
    patients : Patient[];
    diagnoses : Diagnosis[]
}

interface EntryProps {
    entry: Entry
}

interface EntryProps {
    entry: Entry,
    diagnoses: Diagnosis[]
}

interface DiagNameProps {
    code: string;
    diagnoses: Diagnosis[]
}

// return diagnosis code + its description:
const FindDiagName = ({ code, diagnoses }: DiagNameProps) => {
    const diagnosis = diagnoses.find(d => d.code === code);
    const diagName = diagnosis ? diagnosis.name : null;
    return diagName ? <div>{code} {' '} {diagName}</div> : null;
}

// display entries for a single patient:
const EntryInfo = ({ entry, diagnoses } : EntryProps) => {
    return (
        <div>
            <p>{entry.date} {' '} <i>{entry.description}</i></p>
            {entry.diagnosisCodes &&
            (<ul>
                {entry.diagnosisCodes.map((code, index)=> ( 
                    <li key= {index}>
                        {<FindDiagName code= {code} diagnoses= {diagnoses} />}
                    </li>
                ))}
            </ul>)
            }
        </div>       
    )             
}

const PatientInfo = ({ patients, diagnoses } : Props ) => {
    const id = useParams().id;
    const patient= patients.find(p => p.id === id);
    if (!patient) {
        console.log("patient info not found!");
        return (<div>patient info not found!</div>);
      }  
    return (
        <div>
            <h3>{patient.name}</h3>
            {patient.ssn && <p> ssn: {patient.ssn}</p>}
            {patient.dateOfBirth && <p> date of birth: {patient.dateOfBirth}</p>}
            <p>gender: {' '} {patient.gender}</p>
            <p>occupation: {' '} {patient.occupation}</p>
            <h3>Entries</h3>
            {patient.entries.map((e, index)=> ( 
                <div key= {index}>
                    <EntryInfo entry= {e} diagnoses= {diagnoses}/>
                </div>
            ))}
        </div>
    )
  }

export default PatientInfo;