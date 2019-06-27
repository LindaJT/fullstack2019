import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import './index.css'

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
    const persons = props.persons
    const setPersons = props.setPersons
    const rows = () => persons.map(person =>
        <Henkilo
        persons={persons}
        key={person.id}
        name={person.name}
        number={person.number}
        setPersons={setPersons}
        ident={person.id}
        />
        )
        return (
            <ul>
          {rows()}
      </ul>
        )
}

const Henkilo = ( props ) => {
  const persons = props.persons
  const setPersons = props.setPersons
  const deletePerson = (event) => {
    console.log('delete', props.ident )
    if (window.confirm('Haluatko varmasti poistaa taman henkilon?')) {
      personService.remove(props.ident)
      .then(response => {
        setPersons(persons.filter(person => person.id !== props.ident))
      })
    }
  }
    return (
        <li>{props.name} {props.number}
        <form onSubmit={deletePerson}>
          <button type="submit">poista</button>
        </form>
        </li>
    )
}

const Notification = ({message}) => {
  if (message === null) {
    return null
  }
  return (
    <div className='added'>
      {message}
    </div>
  )
}


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('050-')
  const [addMessage, setAddMessage] = useState(null)

  useEffect (() => {
    personService.getAll()
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const addPerson = (event) => {
      event.preventDefault()
      const newId = persons[persons.length-1].id +1
      const personObject = {
          name: newName,
          id: newId,
          number: newNumber
      }
      const names = (
          persons.map(person => person.name)
      )
      personService
      .create(personObject)
      .then(response => {
        names.includes(newName) ?
       window.alert(newName + ' on jo luettelossa') : setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber(0)
        console.log(response)

      })
      setAddMessage(
        'Henkilo ' + newName + ' lisatty puhelinluetteloon'
      )
      setTimeout(() => {
        setAddMessage(null)
      }, 5000)

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
      <Notification message={addMessage} />
      <PersonForm addPerson={addPerson} handle={handleNameChange} 
      handle2={handleNumberChange} newName={newName} newNumber={newNumber}/>
      <h2>Numerot</h2>
      <Persons persons={persons} setPerson={setPersons} />
    </div>
  )

}

export default App