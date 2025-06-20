import React, { useState, useEffect } from 'react';

const Incubators = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selectedIncubator, setSelectedIncubator] = useState(null);
  const [sort, setSort] = useState('name');
  const [bookmarked, setBookmarked] = useState([]);

  const incubators = [
    {
      id: 1,
      name: 'TechFoundry Incubator',
      location: 'San Francisco, CA',
      successRate: 89,
      equity: '5%',
      badges: ['Top Performer', 'AI Focused'],
      demoDay: 'April 25',
      applyLink: '#',
      description: 'Focused on AI and SaaS startups with strong investor backing.'
    },
    {
      id: 2,
      name: 'InnovateX Accelerator',
      location: 'New York, NY',
      successRate: 75,
      equity: '7%',
      badges: ['Global Access'],
      demoDay: 'May 5',
      applyLink: '#',
      description: 'Provides global market access and seed capital for early-stage startups.'
    },
    {
      id: 3,
      name: 'GreenSpark Labs',
      location: 'Austin, TX',
      successRate: 81,
      equity: '6%',
      badges: ['Sustainability'],
      demoDay: 'June 12',
      applyLink: '#',
      description: 'Incubator focusing on sustainable startups and clean tech innovations.'
    }
  ];

  const handleBookmark = (id) => {
    setBookmarked((prev) =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const filteredList = incubators
    .filter((i) => (filter === 'All' || i.badges.includes(filter)))
    .filter((i) => i.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'success') return b.successRate - a.successRate;
      return 0;
    });

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>🏆 Incubators & Accelerators</h1>
      <p style={styles.subheader}>Explore and apply to top startup support programs.</p>

      <div style={styles.controls}>
        <input
          type="text"
          placeholder="Search incubators..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} style={styles.select}>
          <option value="All">All</option>
          <option value="Top Performer">Top Performer</option>
          <option value="AI Focused">AI Focused</option>
          <option value="Global Access">Global Access</option>
          <option value="Sustainability">Sustainability</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} style={styles.select}>
          <option value="name">Sort by Name</option>
          <option value="success">Sort by Success Rate</option>
        </select>
      </div>

      <div style={styles.grid}>
        {filteredList.map((incubator) => (
          <div key={incubator.id} style={styles.card}>
            <h3>{incubator.name}</h3>
            <p><strong>📍 Location:</strong> {incubator.location}</p>
            <p><strong>📈 Success Rate:</strong> {incubator.successRate}%</p>
            <p><strong>💰 Equity Taken:</strong> {incubator.equity}</p>
            <p><strong>🏷️ Badges:</strong> {incubator.badges.join(', ')}</p>
            <button onClick={() => setSelectedIncubator(incubator)} style={styles.detailsBtn}>View Details</button>
            <button onClick={() => handleBookmark(incubator.id)} style={styles.bookmarkBtn}>
              {bookmarked.includes(incubator.id) ? '🔖 Bookmarked' : '📌 Bookmark'}
            </button>
          </div>
        ))}
      </div>

      {selectedIncubator && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2>{selectedIncubator.name}</h2>
            <p>{selectedIncubator.description}</p>
            <p><strong>Demo Day:</strong> {selectedIncubator.demoDay}</p>
            <a href={selectedIncubator.applyLink} target="_blank" rel="noopener noreferrer" style={styles.applyBtn}>
              🎤 Submit Pitch
            </a>
            <button onClick={() => setSelectedIncubator(null)} style={styles.closeBtn}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Segoe UI, sans-serif',
    padding: '2rem',
    background: '#f4f6f8',
    minHeight: '100vh',
  },
  header: {
    fontSize: '2.5rem',
    textAlign: 'center',
  },
  subheader: {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#555',
  },
  controls: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
  },
  input: {
    padding: '0.6rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  select: {
    padding: '0.6rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    background: '#fff',
    padding: '1rem',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
  },
  detailsBtn: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    background: '#0077ff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  bookmarkBtn: {
    marginTop: '0.5rem',
    marginLeft: '0.5rem',
    padding: '0.4rem 0.8rem',
    borderRadius: '8px',
    background: 'transparent',
    border: '1px solid #0077ff',
    color: '#0077ff',
    cursor: 'pointer',
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    width: '90%',
    maxWidth: '500px',
  },
  applyBtn: {
    display: 'inline-block',
    marginTop: '1rem',
    padding: '0.6rem 1rem',
    background: '#28a745',
    color: '#fff',
    borderRadius: '8px',
    textDecoration: 'none',
  },
  closeBtn: {
    display: 'block',
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    background: '#ccc',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  }
};

export default Incubators;
