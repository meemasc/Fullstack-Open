import React, { useState, useEffect } from 'react'
import {PersonForm, Filter, Persons, Notification} from './components/Phonebook'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState("")
  const [ newFilter, setNewFilter ] = useState("")
  const [ addMessage, setAddMessage ] = useState(null)
  const [ messageColor, setMessageColor ] = useState('red')

  useEffect(() => {
    personService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
      .catch(error => console.log("initialization failed"))
  }, [])
  
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
    event.preventDefault()
    const existingNames = (persons.filter(person => 
      (person.name.toLowerCase() === newName.toLowerCase())))
    if (existingNames.length !== 0) {
        if (window.confirm(`${newName} is already added to phonebook,
        replace the old number with a new one?`)) {
          personService
          .update(existingNames[0].id, {...existingNames[0], number:newNumber})
          .then(response => {
            setPersons(persons.map(person => person.id !== response.id ? person : response))
            setNewName("")
            setNewNumber("")
            setTimeout(() => {
              setAddMessage(null)
            }, 5000)
          })
          .catch(error => {
            setMessageColor('red')
            setAddMessage(`Information of ${newName} has been removed from server`)
            setNewName("")
            setNewNumber("")
            setTimeout(() => {
              setAddMessage(null)
            }, 5000)
          })
        }
    } 
    else {
      personService
        .create({name:newName, number:newNumber})
        .then(response => {
          setPersons(persons.concat(response))
          setMessageColor('green')
          setAddMessage(`Added ${newName}`)
          setNewName("")
          setNewNumber("")
          setTimeout(() => {
            setAddMessage(null)
          }, 3000)
        })
        .catch(error => console.log("adding person failed"))
    }
  }
  const deletePerson = (person) => () => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
      .clean(person.id)
      .then(response => {
        setMessageColor('green')
        setAddMessage(`Deleted ${person.name}`)
        setPersons(persons.filter(p => p.id !== person.id))
        setTimeout(() => {
          setAddMessage(null)
        }, 3000)
        
      })
      .catch(error => console.log("deleting person failed"))
    }  
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addMessage} messageColor={messageColor} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
      newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} filters={newFilter} deletePerson={deletePerson} />
    </div>
  )
}

export default App