const calculateBmi = (h: number, m: number) : string => {
    const BMI = 10000* m / (h * h);

    if (BMI < 16) {
        return "Severe Thinness";
    } else if (BMI >= 16 && BMI < 16.9) {
        return "Moderate Thinness";
    } else if (BMI >= 17 && BMI < 18.4) {
        return "Mild Thinness";
    } else if (BMI >= 18.5 && BMI < 24.9) {
        return "Normal";
    } else if (BMI >= 25 && BMI < 29.9) {
        return "Overweight";
    } else if (BMI >= 30 && BMI < 34.9) {
        return "Obese Class I";
    } else if (BMI >= 35 && BMI < 39.9) {
        return "Obese Class II";
    } else {
        return "Obese Class III";
    }
};

export default calculateBmi;