import { useSelector, useDispatch } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({content, votes, handleClick}) => {
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

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const incVote = a => {
        const changedAnecdote = { 
            ...a, 
            votes: a.votes + 1
          }  
          dispatch(updateVote(changedAnecdote))
    }

    const searchString = useSelector(state => state.filter)
    const anecdotes = useSelector(state => 
        state.anecdotes.filter(a=> 
            a.content.toLowerCase()
                     .includes(searchString.toLowerCase())))
       
    return (
    <div>
        {anecdotes
         .sort((a, b) => b.votes - a.votes)
         .map(a=>
            <Anecdote 
                key= {a.id}
                content= {a.content}
                votes= {a.votes}
                handleClick= {()=> {
                                    incVote(a)
                                    dispatch(setNotification(`you voted '${a.content}'`, 2))
                                   }                                
                             }
            />
        )}
    </div>
    )
}

export default AnecdoteList