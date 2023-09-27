const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)

  switch (action.type) {
    case 'GOOD':
      console.log(state)    
      const goodState = {
        good: state.good + 1,
        ok: state.ok,
        bad: state.bad
      }  
      return goodState
    case 'OK':
      console.log(state)    
      const okState = {
        good: state.good,
        ok: state.ok + 1,
        bad: state.bad
      }  
      return okState    
    case 'BAD':
      const badState = {
        good: state.good,
        ok: state.ok,
        bad: state.bad + 1
      }  
      return badState
      case 'RESET':
        const resetState = {
          good: 0,
          ok: 0,
          bad: 0
        }  
        return resetState      
    case 'ZERO':
      return state
    default: return state
  }
  
}

export default counterReducer
