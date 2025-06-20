import React, { useState, useEffect } from 'react';

const dummyInvestors = [
  {
    id: 1,
    name: 'Accel Partners',
    industry: 'Tech',
    stage: 'Seed',
    location: 'Bangalore',
    matchScore: 92,
    bio: 'Early-stage investor with a focus on scalable SaaS and marketplaces.',
    portfolio: ['Freshworks', 'Flipkart'],
    website: 'https://www.accel.com',
  },
  {
    id: 2,
    name: 'Sequoia India',
    industry: 'Healthcare',
    stage: 'Series A',
    location: 'Mumbai',
    matchScore: 85,
    bio: 'Investing in founders with bold visions. Deep network and expertise.',
    portfolio: ['CureFit', 'HealthifyMe'],
    website: 'https://www.sequoiacap.com/india',
  },
  {
    id: 3,
    name: 'Blume Ventures',
    industry: 'Fintech',
    stage: 'Pre-Seed',
    location: 'Delhi',
    matchScore: 78,
    bio: 'Partnering with founders from idea to scale in Tier 2/3 cities.',
    portfolio: ['Unacademy', 'Cashify'],
    website: 'https://blume.vc',
  },
];

const getIndustryColor = (industry) => {
  switch (industry) {
    case 'Tech': return '#007bff';
    case 'Healthcare': return '#28a745';
    case 'Fintech': return '#ff5733';
    default: return '#6c757d';
  }
};

const getScoreColor = (score) => {
  if (score >= 90) return '#28a745';
  if (score >= 80) return '#ffc107';
  return '#dc3545';
};

function InvestorMatchmaking() {
  const [investors, setInvestors] = useState(dummyInvestors);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [bookmarked, setBookmarked] = useState(() => JSON.parse(localStorage.getItem('bookmarkedInvestors')) || []);
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem('investorNotes')) || {});

  useEffect(() => {
    localStorage.setItem('bookmarkedInvestors', JSON.stringify(bookmarked));
    localStorage.setItem('investorNotes', JSON.stringify(notes));
  }, [bookmarked, notes]);

  const toggleBookmark = (id) => {
    setBookmarked((prev) => prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]);
  };

  const handleNoteChange = (id, value) => {
    setNotes((prev) => ({ ...prev, [id]: value }));
  };

  const filteredInvestors = investors.filter((inv) =>
    (filter === 'All' || inv.industry === filter) &&
    inv.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Investor Matchmaking</h2>

      <div style={styles.controls}>
        <input type="text" placeholder="Search investors..." value={search} onChange={(e) => setSearch(e.target.value)} style={styles.input} />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} style={styles.select}>
          <option value="All">All Industries</option>
          <option value="Tech">Tech</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Fintech">Fintech</option>
        </select>
      </div>

      <div style={styles.grid}>
        {filteredInvestors.map((inv) => (
          <div key={inv.id} style={styles.card}>
            <h3>{inv.name}</h3>
            <span style={{ ...styles.tag, backgroundColor: getIndustryColor(inv.industry) }}>{inv.industry}</span>
            <p><strong>Stage:</strong> {inv.stage}</p>
            <p><strong>Location:</strong> {inv.location}</p>
            <p>{inv.bio}</p>
            <p style={{ marginTop: '6px' }}>
              <strong>Match Score:</strong> <span style={{ color: getScoreColor(inv.matchScore), fontWeight: 'bold' }}>{inv.matchScore}%</span>
            </p>
            <textarea
              placeholder="Add a note..."
              style={styles.textarea}
              value={notes[inv.id] || ''}
              onChange={(e) => handleNoteChange(inv.id, e.target.value)}
            />
            <div style={styles.actions}>
              <button onClick={() => toggleBookmark(inv.id)} style={{ ...styles.button, backgroundColor: bookmarked.includes(inv.id) ? '#ffc107' : '#dee2e6' }}>
                {bookmarked.includes(inv.id) ? '★ Bookmarked' : '☆ Bookmark'}
              </button>
              <button style={styles.ctaButton} onClick={() => setSelectedInvestor(inv)}>View Profile</button>
            </div>
          </div>
        ))}
      </div>

      {selectedInvestor && (
        <div style={styles.modalOverlay} onClick={() => setSelectedInvestor(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3>{selectedInvestor.name}</h3>
            <p><strong>Industry:</strong> {selectedInvestor.industry}</p>
            <p><strong>Stage:</strong> {selectedInvestor.stage}</p>
            <p><strong>Location:</strong> {selectedInvestor.location}</p>
            <p><strong>Bio:</strong> {selectedInvestor.bio}</p>
            <p><strong>Portfolio:</strong> {selectedInvestor.portfolio.join(', ')}</p>
            <p><strong>Website:</strong> <a href={selectedInvestor.website} target="_blank" rel="noreferrer">{selectedInvestor.website}</a></p>
            <button onClick={() => setSelectedInvestor(null)} style={styles.ctaButton}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f4f6f9',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  controls: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
  },
  input: {
    flex: 1,
    padding: '0.6rem 1rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  select: {
    padding: '0.6rem 1rem',
    fontSize: '1rem',
    borderRadius: '4px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '1.2rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },
  tag: {
    display: 'inline-block',
    color: 'white',
    fontSize: '0.8rem',
    padding: '2px 8px',
    borderRadius: '12px',
    marginBottom: '0.5rem',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
  },
  button: {
    padding: '0.5rem 1rem',
    fontSize: '0.9rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  ctaButton: {
    padding: '0.5rem 1rem',
    fontSize: '0.9rem',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
  textarea: {
    width: '100%',
    padding: '0.4rem',
    marginTop: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    resize: 'vertical',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    maxWidth: '500px',
    width: '90%',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
  },
};

export default InvestorMatchmaking;
