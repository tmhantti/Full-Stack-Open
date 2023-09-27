import express from 'express';
import cors from 'cors';
import diagnoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

/*
app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
}); */

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});