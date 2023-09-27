import calculateExercises  from './calculateExercises';


const exerciseArgs = process.argv.slice(2);

if (exerciseArgs.length < 2) {
    console.error('Please provide a list of training hours and a target as arguments. Example: 2 3 0 1.5 0 3 4 2.5');
    process.exit(1);
}

// Huom: 'target' - muuttuja on viimeinen argumentti (ei ensimmäinen)
const target = parseFloat(exerciseArgs[exerciseArgs.length - 1]);

if (isNaN(target)) {
    console.error('Invalid target value. Please provide a valid number.');
    process.exit(1);
}

const trainingHours = exerciseArgs.slice(0, -1).map(hour => {
    const parsedHour = parseFloat(hour);
    if (isNaN(parsedHour)) {
        console.error('Invalid training hour value. Please provide valid numbers.');
        process.exit(1);
    }
    return parsedHour;
});

const result = calculateExercises(trainingHours, target);

console.log(result);

                          
                          

