// src/components/Dashboard.jsx
import Header from './Header';
import Sidebar from './Sidebar';
import './Dashboard.css';

const Dashboard = ({ children }) => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content-area">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
