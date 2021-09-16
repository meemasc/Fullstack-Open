import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
const StatisticLine = ({value, text}) => (
  <tr>
  <td>{text}</td>
  <td>{value}</td>
  </tr>
)
const StatisticLinePercentage = ({value, text}) => (
    <tr>
    <td>{text}</td>
    <td>{value} %</td>
    </tr>
)

const Statistics = ({goodState, neutralState, badState}) => {
  const all = goodState + neutralState + badState

  if (all === 0) {
    return (<p>No feedback given</p>)
  }
  return (
    <table>
      <tbody>
        <StatisticLine  value={goodState} text="good" />
        <StatisticLine  value={neutralState} text="neutral" />
        <StatisticLine  value={badState} text="bad" />
        <StatisticLine  value={goodState+neutralState+badState} text="all" />
        <StatisticLine  value={(goodState-badState)/all} text="average" />
        <StatisticLinePercentage  value={goodState/all*100} text="positive" />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToValue = (state, setState) => () => setState(state)
  const increaseGood = setToValue(good + 1, setGood)
  const increaseNeutral = setToValue(neutral + 1, setNeutral)
  const increaseBad = setToValue(bad + 1, setBad)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={increaseGood} text="good" />
      <Button handleClick={increaseNeutral} text="neutral" />
      <Button handleClick={increaseBad} text="bad" />
      <h1>statistics</h1>
      <Statistics goodState={good} neutralState={neutral} badState={bad} />
    </div>
  )
}

export default App