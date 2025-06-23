import axios from 'axios';
import { useState } from 'react';

export default function TaskList({ tasks, fetchTasks, title, type }) {
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const toggleComplete = async (id) => {
    await axios.put(`http://localhost:5000/api/tasks/${id}`);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    fetchTasks();
  };

  const startEdit = (task) => {
    setEditId(task._id);
    setEditTitle(task.title);
  };

  const saveEdit = async () => {
    if (!editTitle.trim()) return;
    await axios.patch(`http://localhost:5000/api/tasks/${editId}`, {
      title: editTitle,
    });
    setEditId(null);
    fetchTasks();
  };

  const getDateLabel = (task) => {
    if (type === 'completed') {
      return new Date(task.completedAt).toLocaleString();
    } else if (type === 'ongoing' || type === 'reminder') {
      return new Date(task.date).toLocaleDateString();
    } else {
      return '-';
    }
  };

  return (
    <div>
      <h2>{title}</h2>
      {tasks.length === 0 ? (
        <p>No tasks</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>{type === 'completed' ? 'Completed At' : 'Scheduled For'}</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>
                  {editId === task._id ? (
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                  ) : (
                    <span
                      style={{
                        textDecoration: task.completed ? 'line-through' : 'none',
                        cursor: 'pointer'
                      }}
                      onClick={() => toggleComplete(task._id)}
                    >
                      {task.title}
                    </span>
                  )}
                </td>
                <td>{getDateLabel(task)}</td>
                <td>
                  {type !== 'completed' && editId === task._id ? (
                    <>
                      <button onClick={saveEdit}>💾 Save</button>
                      <button onClick={() => setEditId(null)}>❌ Cancel</button>
                    </>
                  ) : (
                    <>
                      {type === 'ongoing' || type === 'reminder' ? (
                        <button onClick={() => startEdit(task)}>✏️ Edit</button>
                      ) : null}
                      <button onClick={() => toggleComplete(task._id)}>
                        {task.completed ? '↩️ Redo' : '✔️ Done'}
                      </button>
                      <button onClick={() => deleteTask(task._id)}>🗑️</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
