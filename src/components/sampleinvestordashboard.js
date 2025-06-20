import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBookmark, FaSearch, FaBell, FaCalendarAlt, FaChartBar, FaFilter } from 'react-icons/fa';

const mockInvestors = [
  {
    id: 1,
    name: 'Arjun Patel',
    sector: 'FinTech',
    investmentRange: '$50k - $200k',
    location: 'Mumbai',
    expertise: 'Seed, Growth',
    image: 'https://i.pravatar.cc/150?img=12',
    bookmarked: false,
  },
  {
    id: 2,
    name: 'Riya Mehra',
    sector: 'HealthTech',
    investmentRange: '$100k - $300k',
    location: 'Bangalore',
    expertise: 'Early Stage',
    image: 'https://i.pravatar.cc/150?img=32',
    bookmarked: false,
  },
  {
    id: 3,
    name: 'Kabir Shah',
    sector: 'EdTech',
    investmentRange: '$75k - $250k',
    location: 'Delhi',
    expertise: 'Series A',
    image: 'https://i.pravatar.cc/150?img=45',
    bookmarked: false,
  },
];

const InvestorDashboard = () => {
  const [investors, setInvestors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setInvestors(mockInvestors);
    setNotifications([
      'New startup matched: GreenTech AI',
      'Investor meeting scheduled with EduBoost Founder',
    ]);
  }, []);

  const toggleBookmark = (id) => {
    setInvestors((prev) =>
      prev.map((inv) =>
        inv.id === id ? { ...inv, bookmarked: !inv.bookmarked } : inv
      )
    );
  };

  const filteredInvestors = investors.filter(
    (inv) =>
      inv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>📊 Investor Dashboard</h1>
        <div style={styles.topBar}>
          <input
            type="text"
            placeholder="Search investors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          <FaSearch color="#777" />
          <FaBell size={20} color="#fff" style={{ marginLeft: 20 }} />
        </div>
      </header>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>💼 Matched Investors</h2>
        <div style={styles.grid}>
          {filteredInvestors.map((inv) => (
            <motion.div
              key={inv.id}
              style={styles.card}
              whileHover={{ scale: 1.03 }}
            >
              <img src={inv.image} alt="Investor" style={styles.avatar} />
              <h3 style={styles.cardName}>{inv.name}</h3>
              <p style={styles.detail}><strong>Sector:</strong> {inv.sector}</p>
              <p style={styles.detail}><strong>Location:</strong> {inv.location}</p>
              <p style={styles.detail}><strong>Investment:</strong> {inv.investmentRange}</p>
              <p style={styles.detail}><strong>Expertise:</strong> {inv.expertise}</p>
              <div style={styles.actions}>
                <button
                  style={{
                    ...styles.bookmarkBtn,
                    background: inv.bookmarked ? '#FFB84C' : '#004AAD',
                  }}
                  onClick={() => toggleBookmark(inv.id)}
                >
                  <FaBookmark style={{ marginRight: 8 }} />
                  {inv.bookmarked ? 'Bookmarked' : 'Bookmark'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>🔔 Notifications</h2>
        <ul style={styles.notificationList}>
          {notifications.map((note, i) => (
            <li key={i} style={styles.notification}>{note}</li>
          ))}
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>📅 Upcoming Meetings</h2>
        <div style={styles.meetingCard}>
          <FaCalendarAlt size={28} color="#004AAD" />
          <div>
            <p>With EduBoost Founder</p>
            <strong>Tomorrow at 11:00 AM</strong>
          </div>
          <button style={styles.joinBtn}>Join Call</button>
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Segoe UI, sans-serif',
    padding: '24px',
    background: 'linear-gradient(to right, #f5f9ff, #e8f0fe)',
    minHeight: '100vh',
    color: '#2c3e50',
  },
  header: {
    background: '#004AAD',
    padding: '20px 24px',
    borderRadius: '18px',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '36px',
  },
  title: {
    fontSize: '26px',
    margin: 0,
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  searchInput: {
    padding: '8px 12px',
    borderRadius: '10px',
    border: 'none',
    outline: 'none',
    fontSize: '15px',
    marginRight: '8px',
  },
  section: {
    marginBottom: '42px',
  },
  sectionTitle: {
    fontSize: '22px',
    marginBottom: '18px',
    color: '#004AAD',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '24px',
  },
  card: {
    background: '#ffffff',
    padding: '20px',
    borderRadius: '16px',
    boxShadow: '0 6px 24px rgba(0,0,0,0.07)',
    textAlign: 'center',
    transition: '0.3s ease-in-out',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: '50%',
    marginBottom: '12px',
    objectFit: 'cover',
  },
  cardName: {
    fontSize: '18px',
    color: '#004AAD',
    marginBottom: '8px',
  },
  detail: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '4px',
  },
  actions: {
    marginTop: '12px',
  },
  bookmarkBtn: {
    background: '#004AAD',
    color: '#fff',
    padding: '10px 16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationList: {
    listStyle: 'none',
    padding: 0,
  },
  notification: {
    background: '#dbeeff',
    padding: '12px',
    marginBottom: '10px',
    borderRadius: '10px',
    fontSize: '15px',
  },
  meetingCard: {
    background: '#fff',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '14px',
    boxShadow: '0 3px 16px rgba(0,0,0,0.08)',
  },
  joinBtn: {
    background: '#004AAD',
    color: '#fff',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '10px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default InvestorDashboard;
