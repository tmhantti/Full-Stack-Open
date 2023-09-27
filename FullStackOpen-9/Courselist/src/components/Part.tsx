import React from 'react'; 
import { CoursePart } from '../types';

interface partProps {
    course: CoursePart;
}

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

const Part: React.FC<partProps> = ({ course }) => {
  switch (course.kind) {
    case "basic":
        return(<div>
                  <p><b>{course.name} {course.exerciseCount}</b></p>
                  <p><i>{course.description}</i></p>
                </div>);
        break;
    case "background":
        return(<div>
                  <p><b>{course.name} {course.exerciseCount}</b></p>
                  <p><i>{course.description}</i></p>
                  <p>{course.backgroundMaterial}</p>                
                </div>);
        break;
    case "group":
        return(<div>
                  <p><b>{course.name} {course.exerciseCount}</b></p>
                  <p>project exercises {course.groupProjectCount}</p>                
                </div>);
        break;    
    case "special":
        return(<div>
            <p><b>{course.name} {course.exerciseCount}</b></p>
            <p><i>{course.description}</i></p>     
            <p>required skills: {course.requirements.join(', ')}</p>            
          </div>);
          break;
    default:
        return(assertNever(course));
    }
};

export default Part;