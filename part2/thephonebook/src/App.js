import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {PersonForm, Filter, Persons} from './components/Phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState("")
  const [ newFilter, setNewFilter ] = useState("")

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
        .then(response => setPersons(response.data))
  }
  useEffect(hook, [])
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  const addPerson = (event) => {
    if (persons.filter(person => person.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`)
    } 
    else {
      event.preventDefault()
      setPersons(persons.concat({name:newName, number:newNumber}))
      setNewName("")
      setNewNumber("")
    }
  }
  
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
      newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} filters={newFilter} />
    </div>
  )
}

export default App