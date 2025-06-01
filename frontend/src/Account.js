// Account.js
import { useEffect, useState } from 'react';
import { fetchProjectsByUser, createProject, deleteProject } from './projectService';
// import { useNavigate, Link } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './componenents/Account.css';

function Account() {
  //const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: '', description: '' });

  useEffect(() => {
    if (user?.id) {
      fetchProjectsByUser(user.id)
        .then(data => setProjects(data))
        .catch(err => console.error('Error fetching projects:', err));
    }
  }, [user]);

  const handleCreateProject = () => {
    createProject({ ...newProject, user: { id: user.id } })
      .then(createdProject => {
        setProjects(prev => [...prev, createdProject]);
        setNewProject({ name: '', description: '' });
      })
      .catch(error => console.error('Error creating project:', error));
  };

  const handleDelete = (projectId) => {
    deleteProject(projectId)
      .then(() => {
        setProjects(prev => prev.filter(p => p.id !== projectId));
      })
      .catch(error => console.error('Error deleting project:', error));
  };

  // const handleLogout = () => {
  //   localStorage.removeItem('user');
  //   navigate('/');
  // };

  return (
  <div className="project-container">
    <h2>Welcome, {user?.name}</h2>

    <h3>Create New Project</h3>
    <div className="project-form">
      <input
        type="text"
        placeholder="Project name"
        value={newProject.name}
        onChange={e => setNewProject({ ...newProject, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Project description"
        value={newProject.description}
        onChange={e => setNewProject({ ...newProject, description: e.target.value })}
      />
      <button onClick={handleCreateProject}>Create Project</button>
    </div>

    <h3>Your Projects</h3>
    <ul className="project-list">
      {projects.map(project => (
        <li className="project-item" key={project.id}>
          <div>
            <Link to={`/projects/${project.id}`}>
              <strong>{project.name}</strong>
            </Link>
            <p className="project-description">{project.description}</p>
          </div>
          <button
            className="project-delete-btn"
            onClick={() => handleDelete(project.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
);

}

export default Account;
