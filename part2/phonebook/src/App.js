import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    personService.getAll().then((initialList) => {
      setPersons(initialList);
    });
  }, []);

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
        })
        .catch((err) => alert(console.error(err)))
    } else {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number witg a new one?`)){
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
     

  const deletePerson = (person) => 
    personService
      .remove(person.id).then((response) => {
        setPersons(persons.filter((n) => n.id !== person.id))
      })


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
