import React, { useState, useEffect } from 'react';

// Mock campaigns data
const initialCampaigns = [
  {
    id: 1,
    title: 'Smart Irrigation System',
    description: 'IoT-based irrigation solution for small farmers.',
    goal: 500000,
    raised: 280000,
    endDate: '2025-06-30',
    bookmarked: false,
  },
  {
    id: 2,
    title: 'Affordable Health Clinics',
    description: 'Opening 5 low-cost clinics in rural Bihar.',
    goal: 800000,
    raised: 420000,
    endDate: '2025-05-20',
    bookmarked: true,
  }
];

const CrowdfundingPlatform = () => {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const handleBookmarkToggle = (id) => {
    const updated = campaigns.map(camp =>
      camp.id === id ? { ...camp, bookmarked: !camp.bookmarked } : camp
    );
    setCampaigns(updated);
  };

  const getTimeLeft = (endDate) => {
    const daysLeft = Math.ceil((new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24));
    return `${daysLeft} day(s) left`;
  };

  const filteredCampaigns = campaigns.filter(camp =>
    (filter === 'All' || (filter === 'Bookmarked' && camp.bookmarked)) &&
    camp.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <div style={styles.dashboard}>
        <h1 style={styles.header}>🚀 Crowdfunding Campaigns</h1>
        <div style={styles.controls}>
          <input
            style={styles.input}
            type="text"
            placeholder="🔍 Search campaigns..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select style={styles.select} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Bookmarked">Bookmarked</option>
          </select>
        </div>

        <div style={styles.grid}>
          {filteredCampaigns.map((camp) => {
            const percentage = Math.min((camp.raised / camp.goal) * 100, 100);
            return (
              <div key={camp.id} style={styles.card}>
                <h3>{camp.title}</h3>
                <p>{camp.description}</p>
                <div style={styles.progressContainer}>
                  <div style={{ ...styles.progressBar, width: `${percentage}%` }}></div>
                </div>
                <p style={{ fontWeight: 'bold' }}>₹{camp.raised.toLocaleString()} raised of ₹{camp.goal.toLocaleString()}</p>
                <p>{getTimeLeft(camp.endDate)}</p>
                <button style={styles.donateBtn}>💸 Donate</button>
                <button onClick={() => handleBookmarkToggle(camp.id)} style={styles.bookmarkBtn}>
                  {camp.bookmarked ? '🔖 Bookmarked' : '📌 Bookmark'}
                </button>
              </div>
            );
          })}
        </div>

        <div style={styles.placeholder}>
          📊 <b>Graph View:</b> (Coming soon: Live analytics of top performing campaigns with pie/bar charts.)
        </div>

        <div style={styles.placeholder}>
          🤖 <b>AI Suggestions:</b> (You’ll see recommendations based on your previous interactions.)
        </div>

        <div style={styles.placeholder}>
          📝 <b>Launch Campaign Form:</b> (Feature coming soon: Fill form to submit your startup campaign.)
        </div>
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    backgroundColor: '#0b3d2e', // Metallic Dark Green
    minHeight: '100vh',
    padding: '40px 0',
    display: 'flex',
    justifyContent: 'center',
  },
  dashboard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '1200px',
    padding: '30px',
    boxShadow: '0 0 20px rgba(0,0,0,0.2)',
  },
  header: {
    fontSize: '32px',
    marginBottom: '20px',
    color: '#333',
  },
  controls: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  input: {
    flex: 1,
    padding: '10px 15px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  select: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    padding: '20px',
    border: '1px solid #ddd',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  progressContainer: {
    width: '100%',
    backgroundColor: '#ddd',
    borderRadius: '10px',
    height: '10px',
    overflow: 'hidden',
  },
  progressBar: {
    height: '10px',
    backgroundColor: '#28a745',
    transition: 'width 0.5s ease',
  },
  donateBtn: {
    padding: '10px',
    backgroundColor: '#FFC857',
    color: '#000',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  bookmarkBtn: {
    padding: '8px',
    backgroundColor: '#eee',
    color: '#333',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  placeholder: {
    backgroundColor: '#eef5ec',
    marginTop: '30px',
    padding: '20px',
    borderRadius: '10px',
    fontSize: '16px',
    color: '#333',
  }
};

export default CrowdfundingPlatform;
