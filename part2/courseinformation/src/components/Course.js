import React from 'react';

const Header = ({ course }) => (
    <div>
        <h1>{course.name}</h1>
        <Content course={course} />
        <Total course={course} />
    </div>
)

const Content = ({ course }) => {
    return (
        <>
            {course.parts.map(part => <Part key={part.id} part={part} />)}
        </>
    )
}

const Part = ({part}) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>    
    )
}

const Total = ({ course }) => {
    const sum = course.parts.reduce(
        (previousValue, currentValue) => currentValue.exercises + previousValue, 0)
    return(
        <p>Number of exercises {sum}</p>
    ) 
}

const Course = ({courses}) => (
    <div>
        {courses.map(course => <Header key={course.id} course={course} />)}
    </div>
)

export default Course;
