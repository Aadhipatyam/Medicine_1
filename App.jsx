import { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:5000/api/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const reminderTasks = tasks.filter((task) => {
    const taskDate = new Date(task.date);
    taskDate.setHours(0, 0, 0, 0);
    return !task.completed && taskDate >= today;
  });

  const ongoingTasks = tasks.filter((task) => {
    const taskDate = new Date(task.date);
    taskDate.setHours(0, 0, 0, 0);
    return !task.completed && taskDate <= today;
  });

  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="app-container">
      <div className="theme-toggle">
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <h1>📅 ToDo Calendar App</h1>

      <div className="calendar-container">
        <Calendar value={selectedDate} onChange={setSelectedDate} />
      </div>

      <TaskForm selectedDate={selectedDate} fetchTasks={fetchTasks} />

      <div className="task-table">
        <TaskList tasks={reminderTasks} fetchTasks={fetchTasks} title="🔔 Reminder Tasks" type="reminder" />
      </div>

      <div className="task-lists">
        <div className="task-table">
          <TaskList tasks={ongoingTasks} fetchTasks={fetchTasks} title="⏳ Ongoing Tasks" type="ongoing" />
        </div>
        <div className="task-table">
          <TaskList tasks={completedTasks} fetchTasks={fetchTasks} title="✅ Completed Tasks" type="completed" />
        </div>
      </div>
    </div>
  );
}

export default App;
