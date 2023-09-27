import React, { useContext } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { updateAnecdote } from '../requests/requests'
import { NotificationContext } from '../notificationContext'

const AnecdoteList = ({ anecdotes }) => {
  const queryClient = useQueryClient()
  const { showMessage } = useContext(NotificationContext)

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      console.log('vote added')
      showMessage('Vote added')
      queryClient.invalidateQueries('anecdotes')
    },
  });

  const handleVote = async (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    await updateAnecdoteMutation.mutateAsync(updatedAnecdote)
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList
