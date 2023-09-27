import React, { useContext } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests/requests'
import { NotificationContext } from '../notificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { showMessage } = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      showMessage('New anecdote added')
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    },
  });

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value;
    newAnecdoteMutation.mutate({ content, votes: 0 })
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm