import React from 'react'; 
import { CoursePart } from '../types';
import Part from './Part'

interface ContentProps {
    courses: CoursePart[];
}

// vanha versio (harjoitus 9.14):
/* 
const Content: React.FC<ContentProps> = ({ courses }) => {
    return (
        <div>
            {courses.map((c, index) => (
                <p key={index}>
                    {c.name} {c.exerciseCount}
                </p>
            ))}
        </div>
    );
};
*/ 

const Content: React.FC<ContentProps> = ({ courses }) => {
    return (
        <div>
            {courses.map((c, index) => (
                 <div key={index}>
                    <Part course= {c} />  
                 </div>
                  
            ))}
        </div>
    );
};
export default Content;