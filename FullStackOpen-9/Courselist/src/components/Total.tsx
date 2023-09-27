import React from 'react'; 
import { CoursePart } from '../types';

interface TotalProps {
    courses: CoursePart[];
}

const Total: React.FC<TotalProps> = ({ courses }) => {
    const total = courses.reduce((carry, part) => carry + part.exerciseCount, 0);

    return <p>Number of exercises {total}</p>;
};

export default Total;