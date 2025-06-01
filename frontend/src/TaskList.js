
// TaskList.js
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './componenents/TaskList.css';

const API_BASE_URL = 'http://localhost:8080/api/tasks';
const username = 'admin';
const password = 'admin';
const basicAuth = 'Basic ' + btoa(username + ':' + password);

function TaskList() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', description: '', status: 'TODO' });

  useEffect(() => {
    fetch(`${API_BASE_URL}/project/${projectId}`, {
      headers: { 'Authorization': basicAuth }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch tasks');
        return res.json();
      })
      .then(data => setTasks(data))
      .catch(err => console.error('Error fetching tasks:', err));
  }, [projectId]);

  const handleCreateTask = () => {
    fetch(`${API_BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': basicAuth
      },
      body: JSON.stringify({
        ...newTask,
        project: { id: parseInt(projectId) }
      })
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to create task');
        return res.json();
      })
      .then(createdTask => {
        setTasks(prev => [...prev, createdTask]);
        setNewTask({ name: '', description: '', status: 'TODO' });
      })
      .catch(err => console.error('Error creating task:', err));
  };

  const handleStatusChange = (taskId, newStatus) => {
    fetch(`${API_BASE_URL}/${taskId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': basicAuth
      },
      body: JSON.stringify({ status: newStatus })
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update task status');
        return res.json();
      })
      .then(updatedTask => {
        setTasks(prev =>
          prev.map(t => (t.id === taskId ? updatedTask : t))
        );
      })
      .catch(err => console.error('Error updating status:', err));
  };

  const handleDeleteTask = (taskId) => {
    fetch(`${API_BASE_URL}/${taskId}`, {
        method: 'DELETE',
        headers: {
        'Authorization': basicAuth
        }
    })
        .then(res => {
        if (!res.ok) throw new Error('Failed to delete task');
        // Remove task from UI
        setTasks(prev => prev.filter(t => t.id !== taskId));
        })
        .catch(err => console.error('Error deleting task:', err));
    };

    // Render the task list and form to create new tasks
  return (
    <div className="task-container">
      <h2>Project Tasks</h2>

      <div className="task-form">
        <input
          type="text"
          placeholder="Task name"
          value={newTask.name}
          onChange={e => setNewTask({ ...newTask, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Task description"
          value={newTask.description}
          onChange={e => setNewTask({ ...newTask, description: e.target.value })}
        />
        <select
          value={newTask.status}
          onChange={e => setNewTask({ ...newTask, status: e.target.value })}
        >
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>
        <button onClick={handleCreateTask}>Add Task</button>
      </div>

      <ul className="task-list">
        {tasks.map(task => (
          <li className="task-card" key={task.id} style={{
            borderLeftColor:
              task.status === 'TODO'
                ? '#fbbf24'
                : task.status === 'IN_PROGRESS'
                ? '#3b82f6'
                : '#10b981'
          }}>
            <div>
              <strong>{task.name}</strong>
              <p style={{ margin: 0, color: '#6b7280' }}>{task.description}</p>
            </div>

            <select
              value={task.status}
              onChange={e => handleStatusChange(task.id, e.target.value)}
              className="task-status-select"
            >
              <option value="TODO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Done</option>
            </select>

            <button
              className="task-delete-btn"
              onClick={() => handleDeleteTask(task.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

}

export default TaskList;
