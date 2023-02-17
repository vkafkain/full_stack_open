import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filterName, setFilterName] = useState("")
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
    .getAll()
    .then((initialList) => {
      setPersons(initialList)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    const filterName = persons.filter(
      (person) => newName.toLowerCase() === person.name.toLowerCase()
    );

    if(filterName.length === 0) {
      const personObject = { name: newName, number: newNumber}
      personService
        .create(personObject)
        .then((response) => {
          setPersons(persons.concat(response))
          setNewName("");
          setNewNumber("");
          setMessage(`Added ${newName}`)
          setTimeout(() =>{
            setMessage(null)
          }, 2000) 
        })
        .catch(error =>  {
          alert(`error test`)
        })
    } else {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const personObject = { name: newName, number: newNumber}
        personService
          .update(filterName[0].id, personObject)
          .then((response) => {
            const updateNumber = persons.map((person) => 
              person.id !== response.id ? person : response
          );
            setPersons(updateNumber)
            setNewName("");
            setNewNumber("");
        })
      }
    }
  }
     

  const deletePerson = (id) => {
    const filteredPerson = persons.find(person => person.id === id)   
    const personName = filteredPerson.name;
    const personId = filteredPerson.id;
    personService
      .remove(personId)
      .then(() => {
       setMessage(`Removed ${personName}`)
        setPersons(persons.filter((person) => person.id !== personId))
      })
      .catch((err) => {
        setMessage(`Error deleting person : ${err.response.data.error}`)
      })

  }


  const filterPersons = persons.filter((x) =>
    x.name.toLowerCase().includes(filterName.toLocaleLowerCase())
  );

  const handlePersonChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filterName={filterName} setFilterName={setFilterName} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <div>
        <Persons persons={filterPersons} deletePerson={deletePerson} />
      </div>
    </div>
  );
};

export default App;
