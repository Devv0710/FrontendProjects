/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Form from "./components/Form";
import NotesList from "./components/NoteList";

function App() {
  const [inputTsk, setInputTsk] = useState("");
  const [notes, setNotes] = useState({});

  useEffect(() => {
    const objLocalStorage = { ...localStorage };
    if (objLocalStorage) {
      setNotes({ ...notes, ...objLocalStorage });
    }
  }, []);

  const deleteTask = (key) => {
    const updatedNotes = { ...notes };
    delete updatedNotes[key];
    localStorage.removeItem(key);
    setNotes(updatedNotes);
  };

  const updateTask = (key) => {
    setInputTsk(notes[key]);
    deleteTask(key);
  };

  const handleSubmit = () => {
    const newKey = Object.keys(notes).length + 1;
    localStorage.setItem(newKey, inputTsk);

    setNotes({ ...notes, [newKey]: inputTsk });
    setInputTsk("");
  };

  const handleInputChange = (event) => {
    setInputTsk(event.target.value);
  };

  return (
    <div className=" bg-slate-950 text-slate-200 h-screen text-xl">
      <main className="py-4 px-2 max-w-lg mx-auto">
        <Form
          onSubmit={handleSubmit}
          value={inputTsk}
          onChange={handleInputChange}
        />
        <NotesList notes={notes} onDelete={deleteTask} onUpdate={updateTask} />
      </main>
    </div>
  );
}

export default App;
