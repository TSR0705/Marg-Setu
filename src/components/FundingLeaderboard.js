import React, { useState, useEffect } from 'react';

const FundingLeaderboard = () => {
  const [startups, setStartups] = useState([]);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [adminMode, setAdminMode] = useState(false);
  const [viewGraph, setViewGraph] = useState(false);

  useEffect(() => {
    // Fetch or simulate startup data
    const data = [
      { name: "InnovateX", funding: 12000000, industry: "AI", region: "Maharashtra", tag: "Top Performer" },
      { name: "AgroNext", funding: 9500000, industry: "AgriTech", region: "Punjab", tag: "Rising Star" },
      { name: "FinSage", funding: 7300000, industry: "Fintech", region: "Delhi NCR", tag: "New Entry" }
    ];
    setStartups(data);
  }, []);

  const handleCSVExport = () => {
    const csv = startups.map(s => `${s.name},₹${s.funding},${s.industry},${s.region}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "funding_leaderboard.csv";
    a.click();
  };

  const filteredStartups = startups.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) &&
    (filter === '' || s.industry === filter)
  );

  return (
    <div style={{ backgroundColor: '#004225', minHeight: '100vh', padding: '20px' }}>
      <div style={{
        background: '#fff',
        borderRadius: '10px',
        padding: '30px',
        maxWidth: '1200px',
        margin: '0 auto',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
      }}>
        <h1 style={{ color: '#004225', fontSize: '28px' }}>📈 Funding Leaderboard</h1>

        <div style={{ display: 'flex', gap: '10px', margin: '20px 0', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search startups..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              flex: '1'
            }}
          />
          <select
            onChange={(e) => setFilter(e.target.value)}
            style={{ padding: '10px', borderRadius: '6px' }}>
            <option value="">All Industries</option>
            <option value="AI">AI</option>
            <option value="Fintech">Fintech</option>
            <option value="AgriTech">AgriTech</option>
          </select>
          <button onClick={() => setViewGraph(!viewGraph)} style={{ padding: '10px 15px' }}>
            Toggle Graph View
          </button>
          <button onClick={handleCSVExport} style={{ padding: '10px 15px' }}>
            📤 Export CSV
          </button>
          <button onClick={() => setAdminMode(!adminMode)} style={{ padding: '10px 15px' }}>
            {adminMode ? 'Exit Admin Mode' : 'Admin Edit'}
          </button>
        </div>

        {viewGraph ? (
          <div style={{ backgroundColor: '#f0f0f0', height: '250px', marginBottom: '20px' }}>
            📊 <em>Graph View Placeholder (Bar Chart of Top 5 Funded)</em>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '15px' }}>
            {filteredStartups.map((startup, idx) => (
              <div key={idx} style={{
                padding: '20px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                background: '#fafafa',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap'
              }}>
                <div>
                  <h3>{startup.name} {startup.tag && <span style={{
                    backgroundColor: '#ffc107',
                    padding: '3px 6px',
                    borderRadius: '5px',
                    fontSize: '12px',
                    marginLeft: '10px'
                  }}>{startup.tag}</span>}</h3>
                  <p>Industry: {startup.industry} | Region: {startup.region}</p>
                </div>
                <div>
                  <strong style={{ fontSize: '18px' }}>₹{startup.funding.toLocaleString()}</strong>
                  {adminMode && <div>
                    <button style={{ marginLeft: '10px', padding: '4px 8px' }}>✏️ Edit</button>
                    <button style={{ marginLeft: '5px', padding: '4px 8px' }}>🗑️ Delete</button>
                  </div>}
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{
          marginTop: '30px',
          background: '#e0ffe5',
          padding: '20px',
          borderRadius: '10px'
        }}>
          <h3>🧠 AI-Powered Insights</h3>
          <p>“AgroNext” is trending in AgriTech due to increased rural funding initiatives. Consider shortlisting for mentorship and partnership opportunities.</p>
        </div>

        <div style={{
          marginTop: '20px',
          background: '#fff3cd',
          padding: '20px',
          borderRadius: '10px'
        }}>
          <h3>📍 Regional Heatmap (Coming Soon)</h3>
          <p>Interactive map to visualize state-wise startup funding performance.</p>
        </div>

        <p style={{ marginTop: '30px', fontStyle: 'italic', fontSize: '14px' }}>
          ⏱️ Last updated: {new Date().toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default FundingLeaderboard;
