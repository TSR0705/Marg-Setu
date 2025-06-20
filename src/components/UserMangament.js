import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { FaSun, FaMoon, FaUserShield, FaUserTie, FaUserAstronaut } from 'react-icons/fa';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const UserManagement = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [darkMode, setDarkMode] = useState(true);

  const users = [
    {
      id: 1,
      name: 'Aarav Mehta',
      role: 'Investor',
      status: 'Active',
      online: true,
      verified: true,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: 2,
      name: 'Neha Sharma',
      role: 'Mentor',
      status: 'Blocked',
      online: false,
      verified: false,
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 3,
      name: 'Rohan Gupta',
      role: 'Entrepreneur',
      status: 'Pending',
      online: false,
      verified: true,
      avatar: 'https://randomuser.me/api/portraits/men/56.jpg'
    },
    {
      id: 4,
      name: 'Isha Patel',
      role: 'Investor',
      status: 'Active',
      online: true,
      verified: false,
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg'
    },
  ];

  const filteredUsers = users.filter(user => {
    return (roleFilter === 'All' || user.role === roleFilter) &&
           (statusFilter === 'All' || user.status === statusFilter);
  });

  const roleCounts = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});

  const roleDistribution = {
    labels: Object.keys(roleCounts),
    datasets: [
      {
        label: 'User Count',
        data: Object.values(roleCounts),
        backgroundColor: ['#FFD700', '#00BFFF', '#32CD32'],
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const toggleSelectUser = (id) => {
    setSelectedUsers(prev =>
      prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
    );
  };

  const handleBulkAction = (action) => {
    alert(`${action} applied to user IDs: ${selectedUsers.join(', ')}`);
  };

  const themeStyles = darkMode ? styles.dark : styles.light;

  return (
    <div style={{ ...styles.wrapper, ...themeStyles.wrapper }}>
      <div style={styles.headerRow}>
        <h2 style={themeStyles.header}>👥 User Management Dashboard</h2>
        <button onClick={() => setDarkMode(!darkMode)} style={styles.toggleBtn}>
          {darkMode ? <FaSun color="#FFD700" size={20} /> : <FaMoon color="#333" size={20} />}
        </button>
      </div>

      <div style={styles.filters}>
        <select onChange={(e) => setRoleFilter(e.target.value)} value={roleFilter} style={styles.select}>
          <option value="All">All Roles</option>
          <option value="Investor">Investor</option>
          <option value="Mentor">Mentor</option>
          <option value="Entrepreneur">Entrepreneur</option>
        </select>
        <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter} style={styles.select}>
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Blocked">Blocked</option>
          <option value="Pending">Pending</option>
        </select>
        {selectedUsers.length > 0 && (
          <div style={styles.bulkActions}>
            <button onClick={() => handleBulkAction('Block')}>Block Selected</button>
            <button onClick={() => handleBulkAction('Delete')}>Delete Selected</button>
          </div>
        )}
      </div>

      <div style={styles.userGrid}>
        {filteredUsers.map(user => (
          <motion.div
            whileHover={{ scale: 1.03 }}
            key={user.id}
            style={{ ...styles.userCard, ...themeStyles.userCard }}
          >
            <input
              type="checkbox"
              checked={selectedUsers.includes(user.id)}
              onChange={() => toggleSelectUser(user.id)}
              style={styles.checkbox}
            />
            <img src={user.avatar} alt={`${user.name} Avatar`} style={styles.avatarImg} />
            <h3>{user.name}</h3>
            <p>
              {user.role === 'Investor' && <FaUserShield color="#FFD700" style={styles.iconHover} />}
              {user.role === 'Mentor' && <FaUserTie color="#00BFFF" style={styles.iconHover} />}
              {user.role === 'Entrepreneur' && <FaUserAstronaut color="#32CD32" style={styles.iconHover} />} 
              {user.verified ? ' ✅' : ' ⏳'}
            </p>
            <p>Status: {user.status}</p>
            <p>
              Online: <span style={{ color: user.online ? '#0f0' : '#f00' }}>{user.online ? 'Yes' : 'No'}</span>
            </p>
          </motion.div>
        ))}
      </div>

      <div style={styles.chartContainer}>
        <h3>📊 Role Distribution</h3>
        <div style={themeStyles.chartBox}><Pie data={roleDistribution} /></div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    padding: '32px',
    fontFamily: 'Segoe UI',
    minHeight: '100vh',
    transition: 'all 0.3s ease',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  filters: {
    display: 'flex',
    gap: '16px',
    marginBottom: '20px',
    fontSize: '16px'
  },
  select: {
    padding: '8px',
    borderRadius: '6px',
    fontSize: '16px'
  },
  bulkActions: {
    display: 'flex',
    gap: '12px',
    marginLeft: 'auto',
  },
  userGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  userCard: {
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 0 10px rgba(0,0,0,0.3)',
    position: 'relative',
    fontSize: '16px'
  },
  avatarImg: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '12px',
    border: '2px solid #ccc'
  },
  checkbox: {
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
  chartContainer: {
    marginTop: '40px',
  },
  iconHover: {
    marginRight: '8px',
    transition: 'transform 0.3s ease',
  },
  dark: {
    wrapper: {
      backgroundColor: '#0e0e0e',
      color: '#fff',
    },
    header: {
      fontSize: '28px',
      color: '#fff',
      marginBottom: '24px',
    },
    userCard: {
      backgroundColor: '#1a1a1a',
      color: '#fff',
    },
    chartBox: {
      backgroundColor: '#111',
      borderRadius: '16px',
      padding: '16px',
      maxWidth: '400px',
      boxShadow: '0 0 10px rgba(0, 209, 255, 0.1)',
    },
  },
  light: {
    wrapper: {
      backgroundColor: '#f5f5f5',
      color: '#111',
    },
    header: {
      fontSize: '28px',
      color: '#111',
      marginBottom: '24px',
    },
    userCard: {
      backgroundColor: '#fff',
      color: '#111',
    },
    chartBox: {
      backgroundColor: '#fff',
      borderRadius: '16px',
      padding: '16px',
      maxWidth: '400px',
      boxShadow: '0 0 10px rgba(100, 100, 255, 0.1)',
    },
  },
};

export default UserManagement;
