import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Dashboard, People, VerifiedUser, Settings, Logout, AccountCircle, Menu,
} from '@mui/icons-material';

const AdminDashboardWithSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Responsive check
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-close sidebar on mobile
  useEffect(() => {
    if (isMobile) setIsSidebarOpen(false);
    else setIsSidebarOpen(true);
  }, [isMobile]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const menuItems = [
    { icon: <Dashboard />, label: 'Dashboard' },
    { icon: <VerifiedUser />, label: 'KYC Verifications' },
    { icon: <People />, label: 'Users' },
    { icon: <Settings />, label: 'Settings' },
  ];

  const containerStyle = {
    display: 'flex',
    height: '100vh',
    fontFamily: 'sans-serif',
    background: darkMode ? '#0A1124' : '#f4f4f4',
    color: darkMode ? '#fff' : '#000',
    transition: 'background 0.3s ease',
  };

  const sidebarStyle = {
    width: isSidebarOpen ? 250 : 0,
    background: darkMode ? '#08142E' : '#fff',
    overflowX: 'hidden',
    boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'width 0.3s ease',
    zIndex: 10,
  };

  const menuBtnStyle = {
    background: 'none',
    border: 'none',
    color: darkMode ? '#fff' : '#000',
    fontSize: 28,
    margin: 16,
    cursor: 'pointer',
  };

  const sidebarItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 20px',
    cursor: 'pointer',
    color: darkMode ? '#fff' : '#333',
    transition: 'background 0.2s ease',
  };

  const sidebarItemHover = {
    background: darkMode ? '#1B2B4B' : '#f0f0f0',
  };

  const mainContentStyle = {
    flex: 1,
    padding: 24,
    overflowY: 'auto',
  };

  const buttonStyle = {
    padding: '10px 16px',
    background: '#FFC857',
    color: '#000',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    marginTop: 20,
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyle}>
      {/* Sidebar */}
      <motion.div
        style={sidebarStyle}
        animate={{ width: isSidebarOpen ? 250 : 0 }}
      >
        <div>
          <div style={{ padding: '20px 16px', fontSize: 20, fontWeight: 'bold' }}>
            Marg Setu Admin
          </div>
          {menuItems.map((item, i) => (
            <div
              key={i}
              style={sidebarItemStyle}
              onMouseOver={(e) => (e.currentTarget.style.background = sidebarItemHover.background)}
              onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 16 }}>
          <div
            style={sidebarItemStyle}
            onMouseOver={(e) => (e.currentTarget.style.background = sidebarItemHover.background)}
            onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <AccountCircle />
            <span>Profile</span>
          </div>
          <div
            style={sidebarItemStyle}
            onMouseOver={(e) => (e.currentTarget.style.background = sidebarItemHover.background)}
            onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <Logout />
            <span>Logout</span>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div style={mainContentStyle}>
        {isMobile && (
          <button onClick={toggleSidebar} style={menuBtnStyle}>
            <Menu />
          </button>
        )}
        <h2>Welcome, Admin 👋</h2>
        <p>This is your centralized dashboard to manage the Marg Setu platform.</p>

        <button onClick={toggleDarkMode} style={buttonStyle}>
          Toggle {darkMode ? 'Light' : 'Dark'} Mode
        </button>

        <div style={{ marginTop: 40 }}>
          {/* You can inject actual admin content here */}
          <p>
            Here you'll see startup verifications, platform stats, user activity, and manage key operations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardWithSidebar;
