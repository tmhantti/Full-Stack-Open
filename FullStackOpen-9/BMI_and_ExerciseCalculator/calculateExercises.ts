interface ExerciseResults {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string, 
    target: number,
    average: number
  }

const calculateExercises = (trainingHours: number[], target: number): ExerciseResults => {  
    const reducedHours= trainingHours.filter(d=> d>0);
    const reducedHoursSum= trainingHours.reduce((partialSum, a) => partialSum + a, 0);
    const avgHours= reducedHoursSum / trainingHours.length;
    const performanceRatio= avgHours/target;

    let desc;
    let rating;
    if (performanceRatio < 0.75) {
        desc= "Bad performance :/";
        rating= 1;
    } else if (performanceRatio>=0.75 && performanceRatio <1.25) {
        desc= "Good enough...";
        rating= 2;
    } else {
        desc= "Excellent performance!";
        rating= 3;
    }
    
    let performanceSuccess = false;
    if (performanceRatio > 1) {
        performanceSuccess = true;
    }

    const outcome= {
        periodLength: trainingHours.length,
        trainingDays: reducedHours.length,
        success: performanceSuccess,
        rating: rating,
        ratingDescription: desc, 
        target: target,
        average: avgHours
    };
    return (outcome);
};

export default calculateExercises;