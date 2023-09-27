import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useRef } from 'react'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const anecdoteRef = useRef(null)

  const addAnecdote = async (event) => {
    event.preventDefault()
    // const content = event.target.anecdote.value
    // event.target.anecdote.value = ''
    const content = anecdoteRef.current.value
    anecdoteRef.current.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotification(`you created anecdote '${content}'`, 10))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit= {addAnecdote} role='form'>
        <div><input name="anecdote" ref={anecdoteRef}/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm


/*


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = anecdoteRef.current.value;
    anecdoteRef.current.value = '';
    // ... rest of your function ...
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit= {addAnecdote} role='form'>
        <div><input name="anecdote" ref={anecdoteRef} /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}


*/


