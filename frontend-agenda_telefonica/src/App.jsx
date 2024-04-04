import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [info, setInfo] = useState({ message: null });

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  useEffect(() => {
    setFilteredPersons(persons);
  }, [persons]);

  const cleanForm = () => {
    setNewName("");
    setNewNumber("");
  };

  const showNotification = (message, type = "info") => {
    setInfo({ message: message, type: type });

    setTimeout(() => {
      setInfo({ message: null });
    }, 5000);
  };

  const addContact = (event) => {
    event.preventDefault();
    const isFound = persons.some((person) => person.name === newName);

    if (isFound) {
      const p = persons.find((p) => p.name === newName);
      const changedPerson = { ...p, number: newNumber };
      updateContact(p.id, changedPerson);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      personService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          showNotification(`Added ${returnedPerson.name}`);
        })
        .catch((error) => {
          showNotification(`${error.response.data.message}`, "error");
        });
      cleanForm();
    }
  };

  const updateContact = (id, changedPerson) => {
    let ok = window.confirm(
      `${changedPerson.name} is already added to phonebook, replace the old number with a new one?`
    );
    if (ok) {
      personService
        .update(id, changedPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((p) =>
              p.id !== returnedPerson.id ? p : returnedPerson
            )
          );
          showNotification(`Number of ${returnedPerson.name} updated`);
        })
        .catch((error) => {
          showNotification(`${error.response.data.message}`, "error");
        });
    }
    cleanForm();
  };
  const deletePerson = (id) => {
    personService
      .deletePerson(id)
      .then(() => {
        let deletedPerson = persons.find((p) => (p.id = id));
        setPersons(persons.filter((p) => p.id !== id));
        showNotification(`${deletedPerson.name} deleted`);
      })
      .catch((error) => {
        showNotification(`${error.response.data.message}`, "error");
      });
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const searchContact = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredList = persons.filter((person) =>
      person.name.toLowerCase().includes(searchTerm)
    );
    setFilteredPersons(filteredList);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification info={info} />
      <Filter searchContact={searchContact} />
      <h3>Add a new Contact</h3>
      <PersonForm
        addContact={addContact}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
