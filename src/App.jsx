import { useState, useEffect } from 'react';
import axios from 'axios';
import personService from './services/persons';
import Filter from './component/Filter.jsx';
import PersonForm from './component/PersonForm.jsx';
import Persons from './component/Persons.jsx';
import Notification from './component/Notification.jsx';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchNumber, setFilterNumber] = useState('');
  const [newSearchNumber, setFilterNewNumber] = useState(persons);
  //const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null)

  useEffect(() => {
    console.log('effect');
    personService.getAll().then((initialPersons) => {
      console.log('promise fulfilled');
      setPersons(initialPersons);
      setFilterNewNumber(initialPersons);
    });
  }, []);
  console.log('render', persons.length, 'persons');

  const checkDuplicate = () => {
    const names = persons.map((person) => person.name);
    return names.some((name) => name === newName);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!checkDuplicate()) {
      const personObject = {
        name: newName,
        number: newNumber,
        important: Math.random() > 0.5,
      };
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setFilterNewNumber(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        setMessage(`${newName} added successfully`);
        setTimeout(() => {
          setMessage(null)
        }, 5000);
      });
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one`
        )
      ) {
        const getPerson = persons.find((person) => person.name === newName);
        const updatedPerson = { ...getPerson, number: newNumber };
        personService
          .update(updatedPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== updatedPerson.id ? person : returnedPerson
              )
            );
            setFilterNewNumber(
              newSearchNumber.map((person) =>
                person.id !== updatedPerson.id ? person : returnedPerson
              )
            );
            setNewName('');
            setNewNumber('');
          });
      }
    }
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService.erase(id).then(() => {
        const updatedPerson = persons.filter((person) => person.id !== id);
        setPersons(updatedPerson);
        setFilterNewNumber(newSearchNumber.filter((person) => person.id !== id));
        setMessage(`${name} deleted successfully`);
        setTimeout(() => {
          setMessage(null)
        }, 5000);
      })
      .catch((error) => {
        setMessage(`Information of ${name} has already been removed from servers`);
        setTimeout(() => {
          setMessage(null)
        }, 5000);
        setPersons(persons.filter((person) => person.id !== id));
        setFilterNewNumber(newSearchNumber.filter((person) => person.id !== id));
      })
    }
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    const searchItem = event.target.value;
    setFilterNumber(searchItem);
    const filterNumber = persons.filter((person) =>
      person.name.toLowerCase().includes(searchItem.toLowerCase())
    );
    setFilterNewNumber(filterNumber);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter
        searchNumber={searchNumber}
        handleSearchChange={handleSearchChange}
      />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={handleAdd}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={newSearchNumber} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
