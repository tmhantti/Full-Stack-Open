import express from 'express';
import calculateBmi from './calculateBmi';
import calculateExercises  from './calculateExercises';
const app = express();
app.use(express.json());  

// ---------------------------------------------------------------------------------------------
app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (!height || !weight || isNaN(height) || isNaN(weight)) {
        res.status(400).send({ error: "malformatted parameters" });
        return;  
    } else {

    const bmi = calculateBmi(height, weight);

    const response = {
        weight: weight,
        height: height,
        bmi: bmi
    };

    res.json(response); }
});

// ---------------------------------------------------------------------------------------------
interface ExerciseRequestBody {
    daily_exercises: number[];
    target: number;
}

app.post('/exercises', (req, res) => {
    const { daily_exercises, target }: ExerciseRequestBody = req.body as ExerciseRequestBody;

    if (!daily_exercises || target === undefined || !Array.isArray(daily_exercises) || typeof target !== 'number') {
        res.status(400).send({ error: "parameters missing" });
        return;
    }

    if (daily_exercises.some(hour => typeof hour !== 'number')) {
        res.status(400).send({ error: "malformatted parameters" });
        return;
    }

    try {
        const result = calculateExercises(daily_exercises, target);
        res.json(result);
    } catch (e) {
        res.status(500).send({ error: "Something went wrong" });
    }
});
// ---------------------------------------------------------------------------------------------

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});