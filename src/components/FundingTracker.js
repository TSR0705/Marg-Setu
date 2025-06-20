import React, { useState, useEffect } from 'react';

const dummyInvestments = [
  {
    id: 1,
    investorName: 'Accel Partners',
    amount: 200000,
    stage: 'Seed',
    status: 'Committed',
    equity: '5%',
    date: '2024-12-12',
    comments: 'Great alignment on roadmap.',
  },
  {
    id: 2,
    investorName: 'Sequoia India',
    amount: 500000,
    stage: 'Series A',
    status: 'In Discussion',
    equity: '12%',
    date: '2025-01-10',
    comments: 'Requested follow-up after MVP traction.',
  },
];

function FundingTracker() {
  const [investments, setInvestments] = useState(
    JSON.parse(localStorage.getItem('fundingTracker')) || dummyInvestments
  );
  const [newEntry, setNewEntry] = useState({
    investorName: '',
    amount: '',
    stage: '',
    status: '',
    equity: '',
    date: '',
    comments: '',
  });

  useEffect(() => {
    localStorage.setItem('fundingTracker', JSON.stringify(investments));
  }, [investments]);

  const addEntry = () => {
    if (!newEntry.investorName || !newEntry.amount) return;
    setInvestments([...investments, { ...newEntry, id: Date.now(), amount: parseFloat(newEntry.amount) }]);
    setNewEntry({ investorName: '', amount: '', stage: '', status: '', equity: '', date: '', comments: '' });
  };

  const totalRaised = investments.reduce(
    (acc, inv) => (inv.status === 'Committed' ? acc + inv.amount : acc),
    0
  );

  const avgEquity =
    investments.length > 0
      ? (
          investments.reduce((acc, inv) => acc + parseFloat(inv.equity || 0), 0) /
          investments.length
        ).toFixed(2)
      : 0;

  const handleChange = (e) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📊 Funding Tracker Dashboard</h1>

      <div style={styles.statsBar}>
        <div style={styles.card}><strong>💰 Total Raised:</strong><br /> ₹{totalRaised.toLocaleString()}</div>
        <div style={styles.card}><strong>🤝 Investors:</strong><br /> {investments.length}</div>
        <div style={styles.card}><strong>📈 Avg. Equity:</strong><br /> {avgEquity}%</div>
      </div>

      <h3 style={styles.subHeading}>➕ Add New Investment</h3>
      <div style={styles.formGrid}>
        {Object.entries(newEntry).map(([key, val]) => (
          <input
            key={key}
            name={key}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            value={val}
            onChange={handleChange}
            style={styles.input}
          />
        ))}
        <button onClick={addEntry} style={styles.addBtn}>Add</button>
      </div>

      <h3 style={styles.subHeading}>📋 Investment Log</h3>
      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Investor</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>Stage</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Equity</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Comments</th>
            </tr>
          </thead>
          <tbody>
            {investments.map((inv) => (
              <tr key={inv.id}>
                <td style={styles.td}>{inv.investorName}</td>
                <td style={styles.td}>₹{inv.amount.toLocaleString()}</td>
                <td style={styles.td}>{inv.stage}</td>
                <td style={styles.td}>{inv.status}</td>
                <td style={styles.td}>{inv.equity}</td>
                <td style={styles.td}>{inv.date}</td>
                <td style={styles.td}>{inv.comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
  },
  title: {
    fontSize: '2.2rem',
    marginBottom: '1.5rem',
    color: '#333',
  },
  subHeading: {
    fontSize: '1.2rem',
    margin: '1rem 0 0.5rem',
    color: '#555',
  },
  statsBar: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    flex: '1 1 200px',
    textAlign: 'center',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: '0.5rem',
    marginBottom: '1.5rem',
  },
  input: {
    padding: '0.6rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '0.9rem',
  },
  addBtn: {
    gridColumn: 'span 2',
    padding: '0.6rem 1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  tableWrap: {
    overflowX: 'auto',
    marginTop: '1rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  th: {
    backgroundColor: '#e9ecef',
    padding: '10px',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '0.95rem',
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #dee2e6',
    fontSize: '0.9rem',
    color: '#333',
  },
};

export default FundingTracker;
