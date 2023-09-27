import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes } from './requests/requests'
import { useQuery } from 'react-query'
import { NotificationProvider } from './notificationContext'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  const result = useQuery('anecdotes', getAnecdotes)

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>Error: failed to retrieve data from JSON server</div>
  }

  const anecdotes = result.data

  return (
    <NotificationProvider>
      <div>
        <h3>Anecdote app</h3>
        <Notification />
        <AnecdoteForm />
        <AnecdoteList anecdotes={anecdotes} />
      </div>
    </NotificationProvider>
  );
};

export default App
