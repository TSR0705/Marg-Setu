import React, { useState, useEffect } from 'react';

const EventsNetworking = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [registeredEvents, setRegisteredEvents] = useState([]);

  const events = [
    { id: 1, title: 'Global Startup Meetup 2025', type: 'Networking', date: '2025-04-12', location: 'Online', description: 'Meet global founders, investors, and mentors.', recording: '', featured: true },
    { id: 2, title: 'Pitch Battle Finale', type: 'Pitch Competition', date: '2025-04-20', location: 'Bangalore', description: 'Top 10 startups pitch to win funding.', recording: '', featured: true },
    { id: 3, title: 'Legal Essentials for Startups', type: 'Webinar', date: '2025-04-18', location: 'Online', description: 'Learn legal must-knows for early-stage founders.', recording: '' },
    { id: 4, title: 'Product AMA with YC Alumni', type: 'AMA', date: '2025-04-22', location: 'Online', description: 'Live Q&A on product-market fit and early growth.', recording: '' },
  ];

  const filteredEvents = events.filter(
    (event) =>
      (filter === 'All' || event.type === filter) &&
      event.title.toLowerCase().includes(search.toLowerCase())
  );

  const toggleRegister = (id) => {
    setRegisteredEvents((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ ...styles.wrapper, background: darkMode ? '#111' : '#f9fafc', color: darkMode ? '#f9f9f9' : '#111' }}>
      <header style={styles.header}>
        <h1 style={styles.title}>🚀 Events & Networking Hub</h1>
        <p style={styles.subtitle}>Engage with the startup world – pitch, learn, and connect in real-time.</p>
        <button style={styles.toggleBtn} onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>

      <div style={styles.announcement}>📢 Next Up: Pitch Battle Finale on April 20 – <strong>Register now!</strong></div>

      <div style={styles.controls}>
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
        <select style={styles.select} value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Networking">Networking</option>
          <option value="Pitch Competition">Pitch Competition</option>
          <option value="Webinar">Webinar</option>
          <option value="AMA">AMA</option>
        </select>
      </div>

      <div style={styles.carousel}>
        {events.filter(e => e.featured).map(event => (
          <div key={event.id} style={styles.featuredCard}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p><strong>{event.date}</strong> • {event.location}</p>
          </div>
        ))}
      </div>

      <div style={styles.grid}>
        {filteredEvents.map((event) => (
          <div key={event.id} style={styles.card}>
            <h3>{event.title}</h3>
            <p style={styles.meta}>{event.type} • {event.date} • {event.location}</p>
            <p>{event.description}</p>
            <button
              onClick={() => toggleRegister(event.id)}
              style={registeredEvents.includes(event.id) ? styles.registeredBtn : styles.registerBtn}
            >
              {registeredEvents.includes(event.id) ? '✅ Registered' : '🎟️ Register'}
            </button>
          </div>
        ))}
      </div>

      <div style={styles.bottomPanel}>
        <div style={styles.section}>
          <h3>🎥 Event Recordings</h3>
          <p>Coming soon with filterable video archives.</p>
        </div>
        <div style={styles.section}>
          <h3>🗣️ Live AMA & Chat</h3>
          <p>Join real-time Q&As with industry leaders and submit your questions.</p>
        </div>
        <div style={styles.section}>
          <h3>🏆 Pitch Submission & Leaderboards</h3>
          <p>Submit your pitch and track competition stats.</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    padding: '2rem',
    fontFamily: 'Segoe UI, sans-serif',
    minHeight: '100vh',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2.5rem',
    margin: 0,
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#555',
  },
  toggleBtn: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    backgroundColor: '#0077ff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  announcement: {
    backgroundColor: '#fffbe6',
    padding: '1rem',
    borderRadius: '10px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2rem',
  },
  searchInput: {
    padding: '0.75rem',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  select: {
    padding: '0.75rem',
    borderRadius: '10px',
    fontSize: '1rem',
    border: '1px solid #ccc',
  },
  carousel: {
    display: 'flex',
    gap: '1rem',
    overflowX: 'auto',
    paddingBottom: '1rem',
    marginBottom: '2rem',
  },
  featuredCard: {
    minWidth: '280px',
    background: '#e6f0ff',
    padding: '1rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    transition: 'transform 0.3s ease',
  },
  meta: {
    fontSize: '0.9rem',
    color: '#0077ff',
    marginBottom: '0.5rem',
  },
  registerBtn: {
    marginTop: '1rem',
    padding: '0.6rem 1.2rem',
    borderRadius: '8px',
    border: '1px solid #0077ff',
    background: 'transparent',
    color: '#0077ff',
    cursor: 'pointer',
  },
  registeredBtn: {
    marginTop: '1rem',
    padding: '0.6rem 1.2rem',
    borderRadius: '8px',
    background: '#0077ff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  bottomPanel: {
    marginTop: '3rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
  },
  section: {
    backgroundColor: '#f4f6f8',
    padding: '1rem',
    borderRadius: '10px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
  },
};

export default EventsNetworking;
