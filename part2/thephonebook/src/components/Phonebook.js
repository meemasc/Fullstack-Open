import React from "react"

const Persons = ({persons, filters}) => {
    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filters.toLowerCase()))
    return (
        <div>
        {filteredPersons.map(person => (<div key={person.name}>{person.name} {person.number}</div>))}
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

export {PersonForm, Filter, Persons}