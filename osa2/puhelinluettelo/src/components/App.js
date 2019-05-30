import React, { useState } from 'react'

const PersonForm = (props) => {
    return (
        <form onSubmit={props.addPerson}>
        <div>
          nimi: <input 
          value={props.newName}
          onChange={props.handle}
          />
        </div>
        <div>
          puhelinnumero: <input 
          value={props.newNumber}
          onChange={props.handle2}
          />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
    )
}

const Persons = (props) => {
    const { persons } = props
    const rows = () => persons.map(person =>
        <Henkilo
        key={person.id}
        person={person}
        />
        )
        return (
            <ul>
          {rows()}
      </ul>
        )
}

const Henkilo = ({ person }) => {
    return (
        <li>{person.name} {person.number}</li>
    )
}


const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', id:1, number: '040-123'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('050-')

  const addPerson = (event) => {
      event.preventDefault()
      const personObject = {
          name: newName,
          id: persons.length +1,
          number: newNumber
      }
      const names = (
          persons.map(person => person.name)
      )
      names.includes(newName) ?
       window.alert(newName + ' on jo luettelossa') : setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber(0)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <PersonForm addPerson={addPerson} handle={handleNameChange} 
      handle2={handleNumberChange} newName={newName} newNumber={newNumber}/>
      <h2>Numerot</h2>
      <Persons persons={persons} />
    </div>
  )

}

export default App