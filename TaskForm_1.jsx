import { useState } from 'react';
import axios from 'axios';

function TaskForm({ selectedDate, fetchTasks }) {
  const [title, setTitle] = useState('');
  const [doctor, setDoctor] = useState('');
  const [medicines, setMedicines] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const formattedDescription = `Doctor Name: ${doctor}\nMedicines:\n${medicines}\nNotes/Symptoms: ${notes}`;

    await axios.post('http://localhost:5000/api/tasks', {
      title,
      description: formattedDescription,
      date: selectedDate
    });

    setTitle('');
    setDoctor('');
    setMedicines('');
    setNotes('');
    fetchTasks();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Medicine title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Doctor name..."
        value={doctor}
        onChange={(e) => setDoctor(e.target.value)}
      />
      <textarea
        placeholder="Medicines (one per line)"
        value={medicines}
        onChange={(e) => setMedicines(e.target.value)}
        rows={3}
      />
      <textarea
        placeholder="Notes / Symptoms..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={3}
      />
      <button type="submit">Add Reminder</button>
    </form>
  );
}

export default TaskForm;
