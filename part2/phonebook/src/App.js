import React, { useState } from "react";
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filterName, setFilterName] = useState("")

  const addPerson = (event) => {
    event.preventDefault();
    const filterName = persons.filter((person) => newName.toLowerCase() === person.name.toLowerCase());
    if (filterName.length > 0) {
      alert(`${newName} already added to phonebook`)
    } else {
      const personObject = { name: newName, number: newNumber }
      setPersons(persons.concat(personObject))
      setNewName("")
      setNewNumber("")
    }
  };

/*   const filterPerson = (event) => {
    event.preventDefault()
    const filterInput = persons.filter((person) => filterName === person.name)
  } */

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  };
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  };
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterName(event.target.value)
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <form>
          filter shown with <input type="search" value={filterName} onChange={handleFilterChange} />
        </form>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <Person person={person} key={person.name} />
        ))}
      </div>
    </div>
  );
};

export default App;
