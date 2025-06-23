import { useState } from 'react';
import axios from 'axios';

function TaskForm({ selectedDate, fetchTasks }) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await axios.post('http://localhost:5000/api/tasks', {
      title,
      date: selectedDate
    });

    setTitle('');
    fetchTasks(); // refresh tasks after add
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
