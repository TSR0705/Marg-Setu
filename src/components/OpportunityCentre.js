import React, { useState } from 'react';

const OpportunityCenter = () => {
  const [activeTab, setActiveTab] = useState('explore');
  const [bookmarked, setBookmarked] = useState([]);
  const [formData, setFormData] = useState({ title: '', type: '', description: '', location: '' });

  const sampleOpportunities = [
    { id: 1, title: 'Startup Pitch Event', type: 'Event', location: 'Bangalore', description: 'Join 50+ investors at our next pitch fest!' },
    { id: 2, title: 'Tech Co-founder Wanted', type: 'Collaboration', location: 'Remote', description: 'Looking for a technical co-founder for an AI startup.' },
    { id: 3, title: 'Seed Funding Call', type: 'Funding', location: 'Delhi', description: 'Apply for seed funding up to ₹50L for your early-stage venture.' },
  ];

  const handlePostOpportunity = () => {
    alert('Opportunity posted successfully!');
    setFormData({ title: '', type: '', description: '', location: '' });
  };

  const toggleBookmark = (id) => {
    setBookmarked((prev) =>
      prev.includes(id) ? prev.filter((bid) => bid !== id) : [...prev, id]
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Opportunity Center</h2>
      
      <div style={styles.tabBar}>
        {['explore', 'post', 'bookmarked'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ 
              ...styles.tabButton, 
              backgroundColor: activeTab === tab ? '#007bff' : '#f0f0f0',
              color: activeTab === tab ? 'white' : 'black'
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Explore Opportunities */}
      {activeTab === 'explore' && (
        <div style={styles.cardGrid}>
          {sampleOpportunities.map((opp) => (
            <div key={opp.id} style={styles.card}>
              <h3>{opp.title}</h3>
              <p><strong>Type:</strong> {opp.type}</p>
              <p><strong>Location:</strong> {opp.location}</p>
              <p>{opp.description}</p>
              <div style={styles.cardButtons}>
                <button onClick={() => alert('Applied!')} style={styles.primaryBtn}>Apply</button>
                <button onClick={() => toggleBookmark(opp.id)} style={styles.secondaryBtn}>
                  {bookmarked.includes(opp.id) ? 'Bookmarked' : 'Bookmark'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Post Opportunity */}
      {activeTab === 'post' && (
        <div style={styles.formContainer}>
          <h3>Post a New Opportunity</h3>
          <input
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            style={styles.input}
          />
          <input
            placeholder="Type (Funding, Event, Job, etc.)"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            style={styles.input}
          />
          <input
            placeholder="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            style={styles.input}
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            style={{ ...styles.input, height: '100px' }}
          />
          <button onClick={handlePostOpportunity} style={styles.primaryBtn}>Post Opportunity</button>
        </div>
      )}

      {/* Bookmarked Opportunities */}
      {activeTab === 'bookmarked' && (
        <div style={styles.cardGrid}>
          {sampleOpportunities.filter((opp) => bookmarked.includes(opp.id)).map((opp) => (
            <div key={opp.id} style={styles.card}>
              <h3>{opp.title}</h3>
              <p><strong>Type:</strong> {opp.type}</p>
              <p><strong>Location:</strong> {opp.location}</p>
              <p>{opp.description}</p>
              <button onClick={() => alert('Opening calendar...')} style={styles.primaryBtn}>Add to Calendar</button>
            </div>
          ))}
          {bookmarked.length === 0 && <p style={{ margin: 20 }}>No bookmarked opportunities.</p>}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f7f8fa',
    minHeight: '100vh',
  },
  header: {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#333',
  },
  tabBar: {
    display: 'flex',
    gap: '10px',
    marginBottom: '30px',
  },
  tabButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 2px 6px rgba(0,0,0,0.1)',
  },
  cardButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px',
  },
  primaryBtn: {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  secondaryBtn: {
    padding: '8px 16px',
    backgroundColor: '#eaeaea',
    border: '1px solid #ccc',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  formContainer: {
    maxWidth: '500px',
    margin: '0 auto',
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    fontSize: '15px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
};

export default OpportunityCenter;
