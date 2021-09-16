import React from 'react'


const Header = courseProp => <h1>{courseProp.course}</h1>;
const Part = (partProp) => <p>{partProp.name} {partProp.exercise}</p>
const Content = (contentProp) => {
  return (
    <div>
      <Part name={contentProp.parts[0].name} exercise={contentProp.parts[0].exercises}/>
      <Part name={contentProp.parts[1].name} exercise={contentProp.parts[1].exercises}/>
      <Part name={contentProp.parts[2].name} exercise={contentProp.parts[2].exercises}/>
    </div>
  )
}
const Total = (totalProp) => <p>Number of exercises {totalProp.parts[0].exercises + 
  totalProp.parts[0].exercises + totalProp.parts[0].exercises}</p>


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}


export default App