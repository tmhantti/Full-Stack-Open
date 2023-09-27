import express from 'express';
import diagnoseServices from '../services/diagnoseServices';

const router = express.Router();

router.get('/', (_req, res) => {
    console.log('Fetching all diagnoses!');
    res.send(diagnoseServices.getDiagnoses());
  });

export default router;