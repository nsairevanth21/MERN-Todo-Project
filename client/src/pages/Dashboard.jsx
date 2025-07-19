import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      const userEmail = localStorage.getItem('email');

      try {
        const res = await axios.get(`http://localhost:5000/api/tasks?email=${userEmail}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data);
        setFirstName(localStorage.getItem('firstName') || '');
        setEmail(userEmail);
      } catch (error) {
        if (error.response?.status === 400 || error.response?.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchTasks();
  }, [navigate]);

  const addTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('email');
    try {
      await axios.post(
        'http://localhost:5000/api/tasks',
        { title, email: userEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle('');
      window.location.reload();
    } catch (error) {
      alert('Error adding task');
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${taskId}`,
        { completed: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.reload();
    } catch (error) {
      alert('Error updating task status');
    }
  };

  const updateTaskTitle = async (taskId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${taskId}`,
        { title: editedTitle },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingTaskId(null);
      setEditedTitle('');
      window.location.reload();
    } catch (error) {
      alert('Error updating task title');
    }
  };

  const deleteTask = async (taskId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      window.location.reload();
    } catch (error) {
      alert('Error deleting task');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    localStorage.removeItem('email');
    navigate('/login');
  };

  const inProgressTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div style={{ padding: '20px' }}>
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0 }}>Schedulo</h2>
          <h3 style={{ margin: 0 }}>To-Do List {firstName && `of ${firstName}`}</h3>
        </div>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>

      <hr style={{ margin: '20px 0' }} />

      <h3>Add New Task</h3>
      <form onSubmit={addTask}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New Task"
          required
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <button type="submit">Add Task</button>
      </form>

      <hr style={{ margin: '30px 0' }} />

      <h3>In Progress Tasks</h3>
      {inProgressTasks.length === 0 ? (
        <p>No tasks in progress.</p>
      ) : (
        <div className="task-table-wrapper">
          <table className="task-table">
            <thead>
              <tr>
                <th>Mark The Status</th>
                <th>Tasks</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inProgressTasks.map((task) => (
                <tr key={task._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={false}
                      onChange={() => updateTaskStatus(task._id, true)}
                      title="Mark as Complete"
                    />
                  </td>
                  <td>
                    {editingTaskId === task._id ? (
                      <input
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                      />
                    ) : (
                      task.title
                    )}
                  </td>
                  <td>
                    <span style={{ color: 'orange', fontWeight: 'bold' }}>⏳ In Progress</span>
                  </td>
                  <td className="action-buttons">
                    {editingTaskId === task._id ? (
                      <>
                        <button onClick={() => updateTaskTitle(task._id)}>Save</button>
                        <button onClick={() => setEditingTaskId(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => {
                          setEditingTaskId(task._id);
                          setEditedTitle(task.title);
                        }}>Edit</button>
                        <button className="delete-btn" onClick={() => deleteTask(task._id)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <hr style={{ margin: '30px 0' }} />

      <h3>Completed Tasks</h3>
      {completedTasks.length === 0 ? (
        <p>No completed tasks yet.</p>
      ) : (
        <div className="task-table-wrapper">
          <table className="task-table">
            <thead>
              <tr>
                <th>Done</th>
                <th>Tasks</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {completedTasks.map((task) => (
                <tr key={task._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={true}
                      onChange={() => updateTaskStatus(task._id, false)}
                      title="Mark as In Progress"
                    />
                  </td>
                  <td>
                    {editingTaskId === task._id ? (
                      <input
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                      />
                    ) : (
                      task.title
                    )}
                  </td>
                  <td>
                    <span style={{ color: 'green', fontWeight: 'bold' }}>✔️ Completed</span>
                  </td>
                  <td className="action-buttons">
                    {editingTaskId === task._id ? (
                      <>
                        <button onClick={() => updateTaskTitle(task._id)}>Save</button>
                        <button onClick={() => setEditingTaskId(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                      <button className="delete-btn" onClick={() => deleteTask(task._id)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Dashboard;