import calculateBmi from './calculateBmi';

const bmiArgs = process.argv.slice(2);

if (bmiArgs.length < 2) {
    console.log('Please provide both height (in meters) and weight (in kilograms).');
    process.exit();
}

const height = parseFloat(bmiArgs[0]);
const weight = parseFloat(bmiArgs[1]);

if (isNaN(height) || isNaN(weight)) {
    console.log('Invalid input. Please enter valid numbers for height and weight.');
    process.exit();
}

console.log(`BMI Category: ${calculateBmi(height, weight)}`);