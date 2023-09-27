import { useState, useEffect } from 'react';
import { DiaryEntry, NewDiaryEntry } from './types';
import { getAllDiaries, createDiary } from './services/diaryService';
import Diary from './components/Diary';
import DiaryForm from './components/DiaryForm';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // fetch diaries
  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])

  // create new diary (input is from DiaryForm): 
  const diaryCreation = (addedDiary: NewDiaryEntry) => {
    createDiary(addedDiary)
      .then(data => {
        setDiaries(diaries.concat(data));
        setErrorMessage(null);
      })
      .catch(error => {
        // virheilmoitus
        setErrorMessage(error.response?.data || error.message);        
        setTimeout(() => {
          setErrorMessage(null);
        }, 10000); 
      });
  };

  return (
    <div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <h2>Add new entry</h2>
      <DiaryForm diaryCreation= {diaryCreation}/>
      <h2>Diary entries</h2>
      {diaries.map((d, index) => (
          <div key={index}>
              <Diary diary= {d} />  
          </div>          
      ))}
  </div>
  )
}

export default App;