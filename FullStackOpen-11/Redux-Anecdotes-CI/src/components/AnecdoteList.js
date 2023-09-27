import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from 'reselect'
import { updateVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'

const Anecdote = ({ content, votes, handleClick }) => {
  return (
    <div>
      <div>
        {content}
      </div>
      <div>
            has {votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const getAnecdotes = state => state.anecdotes
const getFilter = state => state.filter

const getFilteredAnecdotes = createSelector(
  [getAnecdotes, getFilter],
  (anecdotes, filter) => {
    return anecdotes.filter(a =>
      a.content.toLowerCase().includes(filter.toLowerCase())
    ).sort((a, b) => b.votes - a.votes)
  }
)

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const incVote = a => {
    const changedAnecdote = {
      ...a,
      votes: a.votes + 1
    }
    dispatch(updateVote(changedAnecdote))
  }

  const anecdotes = useSelector(getFilteredAnecdotes)

  return (
    <div>
      {anecdotes.map(a =>
        <Anecdote
          key={a.id}
          content={a.content}
          votes={a.votes}
          handleClick={() => {
            incVote(a)
            dispatch(setNotification(`you voted '${a.content}'`, 2))
          }}
        />
      )}
    </div>
  )
}

Anecdote.propTypes = {
  content: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default AnecdoteList
