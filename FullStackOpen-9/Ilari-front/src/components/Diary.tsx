import React from 'react'; 
import { DiaryEntry } from '../types';

interface diaryProps {
    diary: DiaryEntry;
}

const Diary: React.FC<diaryProps> = ({ diary }) => {
    return(
        <div>
            <h3>{diary.date}</h3>
            <p>visibility: {' '}{diary.visibility}</p>
            <p>weather: {' '}{diary.weather}</p>
        </div>);
};

export default Diary;