import React from "react"

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Persons = ({persons, filters, deletePerson}) => {
    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filters.toLowerCase()))
    return (
        <div>
        {filteredPersons.map(person => 
            (<div key={person.id}>{person.name} {person.number} <Button 
            handleClick={deletePerson(person)} text="delete" />
            </div>))}
        </div>
    )
}

const Notification = ({message, messageColor}) => {
    const notificationStyle = {
        color: messageColor,
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    if (message === null) {
      return null
    }
  
    return (
      <div style={notificationStyle}>
        {message}
      </div>
    )
  }

const Filter = ({newFilter, handleFilterChange}) => (
    <div>
        filter shown with <input value={newFilter} onChange={handleFilterChange}/>
    </div>
)

const PersonForm =(props) => (
    <div>
        <form onSubmit={props.addPerson}>
            <div>
                name: <input value={props.newName} onChange={props.handleNameChange}/>
            </div>
            <div>
                number: <input value={props.newNumber} onChange={props.handleNumberChange}/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    </div>
)

export {PersonForm, Filter, Persons, Notification}