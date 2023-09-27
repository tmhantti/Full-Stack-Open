import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { Patient, Diagnosis } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import getAllDiagnoses from "./services/diagnoses";

import PatientInfo from "./components/PatientInfo";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  // fetch all patients:
  useEffect(() => {
    // void axios.get<void>(`${apiBaseUrl}/ping`);
    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);
  
    // fetch all patients:
  useEffect(() => {
    const fetchDiagnosisList = async () => {
      const diagnoses = await getAllDiagnoses();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnosisList();
  }, []);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/patients/:id" element={<PatientInfo patients= {patients} diagnoses= {diagnoses}/>} />            
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
