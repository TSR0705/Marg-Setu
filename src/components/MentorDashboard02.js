// MentorDashboard.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, RadarChart,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar
} from 'recharts';

const MentorDashboard = () => {
  const [activeTab, setActiveTab] = useState('sessions');

  const sessionsData = [
    { month: 'Jan', sessions: 3 },
    { month: 'Feb', sessions: 5 },
    { month: 'Mar', sessions: 6 },
    { month: 'Apr', sessions: 8 },
    { month: 'May', sessions: 7 },
  ];

  const feedbackData = [
    { category: 'Clarity', rating: 4.6 },
    { category: 'Support', rating: 4.8 },
    { category: 'Knowledge', rating: 4.7 },
    { category: 'Communication', rating: 4.5 },
  ];

  const mentees = [
    { name: 'Aarav Mehta', industry: 'FinTech', progress: 80 },
    { name: 'Sara Kapoor', industry: 'HealthTech', progress: 65 },
    { name: 'Rohit Sen', industry: 'EdTech', progress: 90 },
  ];

  const navItems = [
    { key: 'sessions', label: 'Scheduled Sessions' },
    { key: 'mentees', label: 'Mentees' },
    { key: 'impact', label: 'Mentoring Impact' },
    { key: 'feedback', label: 'Feedback' },
    { key: 'ai', label: 'AI Suggestions' },
    { key: 'chat', label: 'Chat' },
    { key: 'video', label: 'Video Call' },
    { key: 'vault', label: 'Vault' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'sessions':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2>📅 Upcoming Sessions</h2>
            <ul style={styles.list}>
              <li>Mon, 10 AM - Aarav Mehta (Zoom)</li>
              <li>Wed, 4 PM - Sara Kapoor (Google Meet)</li>
              <li>Fri, 2 PM - Rohit Sen (Jitsi)</li>
            </ul>
          </motion.div>
        );
      case 'mentees':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2>👥 Mentees Overview</h2>
            {mentees.map((m, idx) => (
              <div key={idx} style={styles.card}>
                <h4>{m.name} ({m.industry})</h4>
                <div style={styles.progressBarWrapper}>
                  <div style={{ ...styles.progressBar, width: `${m.progress}%` }} />
                </div>
                <p>{m.progress}% progress</p>
              </div>
            ))}
          </motion.div>
        );
      case 'impact':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2>📊 Mentoring Impact</h2>
            <div style={styles.chartRow}>
              <div style={styles.chartBox}>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={sessionsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sessions" stroke="#00d1ff" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div style={styles.chartBox}>
                <ResponsiveContainer width="100%" height={250}>
                  <RadarChart outerRadius={90} data={feedbackData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis angle={30} domain={[0, 5]} />
                    <Radar name="Rating" dataKey="rating" stroke="#00d1ff" fill="#00d1ff" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        );
      case 'feedback':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2>💬 Feedback</h2>
            <div style={styles.feedbackCard}>
              <strong>John</strong> ⭐⭐⭐⭐ - "Very helpful session!"
            </div>
            <div style={styles.feedbackCard}>
              <strong>Jane</strong> ⭐⭐⭐⭐⭐ - "Great insights on funding!"
            </div>
          </motion.div>
        );
      case 'ai':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2>🤖 AI Mentor Suggestions</h2>
            <ul style={styles.list}>
              <li>NeuronTrack - AI/Healthcare</li>
              <li>FinSmart - AI Budgeting Tool</li>
            </ul>
          </motion.div>
        );
      case 'chat':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2>💬 Real-time Chat</h2>
            <p>Chat feature will integrate with Firebase soon.</p>
          </motion.div>
        );
      case 'video':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2>🎥 Video Call</h2>
            <p>Integration planned for Jitsi/Zoom/Google Meet.</p>
          </motion.div>
        );
      case 'vault':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2>📂 Document Vault</h2>
            <ul style={styles.list}>
              <li>Pitch_Deck_April.pdf</li>
              <li>Mentorship_Notes_March.docx</li>
            </ul>
          </motion.div>
        );
      default:
        return <p>Welcome to your mentor dashboard!</p>;
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.sidebar}>
        <div style={styles.logo}>🎓 Mentor Panel</div>
        {navItems.map(({ key, label }) => (
          <motion.div
            key={key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              ...styles.navItem,
              backgroundColor: activeTab === key ? '#00d1ff' : 'transparent',
              color: activeTab === key ? '#000' : '#ccc',
            }}
            onClick={() => setActiveTab(key)}
          >
            {label}
          </motion.div>
        ))}
      </div>
      <div style={styles.content}>{renderContent()}</div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#0d0d0d',
    color: '#fff',
    fontFamily: 'Segoe UI, sans-serif',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#151515',
    padding: '24px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    boxShadow: '4px 0 12px rgba(0, 209, 255, 0.1)',
  },
  logo: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#00d1ff',
    marginBottom: '24px',
  },
  navItem: {
    padding: '12px 16px',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: '0.3s ease',
  },
  content: {
    flex: 1,
    padding: '32px',
    overflowY: 'auto',
  },
  chartBox: {
    backgroundColor: '#111',
    padding: '16px',
    borderRadius: '12px',
    marginBottom: '24px',
    flex: 1,
    boxShadow: '0 0 10px rgba(0,209,255,0.2)',
  },
  chartRow: {
    display: 'flex',
    gap: '32px',
    flexWrap: 'wrap',
  },
  list: {
    listStyle: 'disc',
    paddingLeft: '20px',
  },
  feedbackCard: {
    backgroundColor: '#111',
    padding: '12px 16px',
    marginBottom: '12px',
    borderRadius: '12px',
    boxShadow: '0 0 8px rgba(0,209,255,0.2)',
  },
  card: {
    backgroundColor: '#111',
    padding: '16px',
    borderRadius: '12px',
    marginBottom: '16px',
    boxShadow: '0 0 8px rgba(0,209,255,0.15)',
  },
  progressBarWrapper: {
    height: '10px',
    width: '100%',
    backgroundColor: '#333',
    borderRadius: '6px',
    marginTop: '8px',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#00d1ff',
  },
};

export default MentorDashboard;
