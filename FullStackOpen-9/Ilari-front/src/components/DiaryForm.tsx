import React from 'react'; 
import { useState, } from 'react';
import { NewDiaryEntry, Weather, Visibility } from '../types';

interface DiaryFormProps {
    diaryCreation: (addedDiary: NewDiaryEntry) => void; 
  }

  const DiaryForm: React.FC<DiaryFormProps> = ({ diaryCreation }) => {
    // const [newDate, setDate] = useState('');
    // const [newVisibility, setVisibility] = useState('');
    // const [newWeather, setWeather] = useState('');    
    const [newDate, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [newVisibility, setVisibility] = useState(Visibility.Great);
    const [newWeather, setWeather] = useState(Weather.Sunny);
    const [newComment, setComment] = useState('');

    
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
    }; 
    /*
    const handleVisibilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVisibility(event.target.value);
    }; */
    /* 
    const handleWeatherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWeather(event.target.value);
    }; */
    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    };
    
    const addDiary = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const newDiaryEntry: NewDiaryEntry = {
            date: newDate,
            weather: newWeather as Weather,  
            visibility: newVisibility as Visibility, 
            comment: newComment
        };
    
        diaryCreation(newDiaryEntry);
        // setDate('');
        // setVisibility('');
        // setWeather('');
        setComment('');
    };

    return (
    <div>
      <form onSubmit= {addDiary}>
        <div>
            Date:
            <input
                type="date"
                value={newDate}
                onChange={handleDateChange}
            />
        </div>
        <div>
            Visibility:
            {Object.values(Visibility).map((visibilityOption) => (
                <label key={visibilityOption}>
                    <input
                        type="radio"
                        value={visibilityOption}
                        checked={newVisibility === visibilityOption}
                        onChange={() => setVisibility(visibilityOption)}
                    />
                    {visibilityOption}
                </label>
            ))}
        </div>    
        <div>
            Weather:
            {Object.values(Weather).map((weatherOption) => (
                <label key={weatherOption}>
                    <input
                        type="radio"
                        value={weatherOption}
                        checked={newWeather === weatherOption}
                        onChange={() => setWeather(weatherOption)}
                    />
                    {weatherOption}
                </label>
            ))}
        </div>
        <div>
            Comment:
            <input
                value={newComment}
                onChange={handleCommentChange}
            />
        </div>        
        <div>
            <button type="submit">Add Diary Entry</button>
        </div>        
       </form>
    </div>
    );
}

export default DiaryForm;

// esimerkki vasnhasta (tehtävä 9.17) toteutuksesta:
/*
        <div>
            Weather:
            <input
                value={newWeather}
                onChange={handleWeatherChange}
            />
        </div>    
*/