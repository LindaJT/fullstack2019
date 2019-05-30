import React from 'react'

const Course = ( { course }) => {
    return (
        <div>
            <Header header={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Header = (props) => {
    return (
        <div>
            <h1>{props.header}</h1>
        </div>
    )
}

const Content = (props) => {
    const { parts } = props
    const rows = () => parts.map(part =>
        <Part key={part.id}
        part={part}
        />
        )
    
    return (
        <div>
            <ul>
             {rows()}
            </ul>
        </div>
    )
}

const Part = ( { part }) => {
    return (
        <li>{part.name} {part.exercises}</li>
    )
}

const Total = (props) => {
    const { parts } = props
    const total = () => 
    parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <div>
            <p>yhteensa {total()} tehtavaa</p>
        </div>
    )
}

export default Course