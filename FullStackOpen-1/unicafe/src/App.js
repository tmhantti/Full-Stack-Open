import { useState } from 'react'

  // statistiikkaan liittyvä komponentti:
  const Statistics = (props) => 
  {
    
    if (props.total > 0) {
      return ( 
        <div>
          <h1>statistics</h1>
          <StatisticLine text="good" value = {props.good} />
          <StatisticLine text="neutral" value = {props.neutral} />
          <StatisticLine text="bad" value = {props.bad} />
          <StatisticLine text="all" value = {props.total} />
          <StatisticLine text="average" value = {(props.good - props.bad) / props.total} />
          <StatisticLine text="positive" value = {(props.good / props.total)*100 + ' %'}  />
        </div>
      )
    }
    else {
      return(
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
      )

    }
  }

    // statistiikka taulukkona
    const StatisticsTable = (props) => 
    {
      if (props.total > 0) {
        return ( 
          <div>
            <h1>statistics (as table)</h1>
            <table>
            <tbody>
            <tr>
              <td>good</td> 
              <td>{props.good}</td>              
            </tr>
            <tr>
              <td>neutral</td>
              <td>{props.neutral}</td>
            </tr> 
            <tr>
              <td>bad</td>
              <td>{props.bad}</td>
            </tr> 
            <tr>
              <td>all</td>
              <td>{props.total}</td>
            </tr> 
            <tr>
              <td>average</td>
              <td>{ ((props.good - props.bad) / props.total).toFixed(2)} </td>
            </tr> 
            <tr>
              <td>positive</td>
              <td>{((props.good / props.total)*100).toFixed(2) + ' %'} </td>
            </tr> 
            </tbody>
            </table>            
          </div>
        )
      }
      else {
        return(
        <div>
          <h1>statistics</h1>
          <p>No feedback given</p>
        </div>
        )
  
      }
    }
  

  const StatisticLine = props => {
    return(
      <p>{props.text} {props.value}</p>
    )
  }

  // Button - komponentti
  const Button = (props) => {
    return(
    <button onClick={props.handleClick}>
      {props.text}
    </button>)
  }

function App() {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  // nappien painamiseen liittyvät eventit
  const increaseGood = () => {
    const newGood = good + 1
    setGood(newGood)
    setTotal(newGood + neutral + bad)
  }
  const increaseNeutral = () => {
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
    setTotal(good + newNeutral + bad)
  }
  const increaseBad = () => {
    const newBad = bad + 1
    setBad(newBad)
    setTotal(good + neutral + newBad)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button
        handleClick={increaseGood}
        text='good' />
      <Button
        handleClick={increaseNeutral}
        text='neutral' />
      <Button
        handleClick={increaseBad}
        text='bad' />

      <Statistics good= {good} neutral= {neutral} bad= {bad} total= {total} />
      <StatisticsTable good= {good} neutral= {neutral} bad= {bad} total= {total} />
    </div>
  )
}

export default App