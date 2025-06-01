// src/components/Sidebar.jsx
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <aside className="sidebar">
      <h2>Menu</h2>
      <nav>
        <ul>
          <li><Link to={`/account/${user?.id}`}>My Account</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
