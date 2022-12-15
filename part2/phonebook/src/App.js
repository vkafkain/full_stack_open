import React, { useState } from "react";
import Person from './components/Person';

const App = () => {
  const [persons, setPersons] = useState([ ])
  const [newName, setNewName] = useState("")
  // const [searchName, setSearchName] = useState("")

  const addPerson = (event) => {
    event.preventDefault()
    const filterName = persons.filter(person => newName === person.name)
  
    if(filterName.length > 0 ) {
      alert(`${newName} already added to phonebook`)
    }else {
      const personObject = {name: newName}
      setPersons(persons.concat(personObject))
      setNewName("")
    }
  }

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
      {persons.map(person => 
        <Person person={person} key={person.name}/>
        )}
      </div>
    </div>
  );
};

export default App;
