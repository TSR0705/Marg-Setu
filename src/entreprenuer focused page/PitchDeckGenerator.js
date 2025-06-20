import React, { useState, useEffect } from 'react';

const sections = [
  'Problem',
  'Solution',
  'Market Opportunity',
  'Business Model',
  'Go-to-Market Strategy',
  'Competitive Advantage',
  'Traction',
  'Financials',
  'Team',
  'Vision & Ask'
];

const MAX_CHAR = 800;

const getInitialDeck = () => {
  const saved = localStorage.getItem('pitch_deck');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Ensure all sections are present, even if saved version is partial
      return sections.reduce((acc, sec) => {
        acc[sec] = parsed[sec] || '';
        return acc;
      }, {});
    } catch {
      // corrupted JSON fallback
    }
  }
  return sections.reduce((acc, sec) => {
    acc[sec] = '';
    return acc;
  }, {});
};

const PitchDeckGenerator = () => {
  const [deck, setDeck] = useState(getInitialDeck);

  useEffect(() => {
    localStorage.setItem('pitch_deck', JSON.stringify(deck));
  }, [deck]);

  const handleChange = (section, value) => {
    setDeck(prev => ({ ...prev, [section]: value }));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Pitch Deck Generator</h1>

      {sections.map((section) => (
        <div key={section} style={styles.card}>
          <div style={styles.header}>
            <h3 style={styles.sectionTitle}>{section}</h3>
            <span
              style={{
                ...styles.charCount,
                color: (deck[section]?.length || 0) > MAX_CHAR ? 'red' : '#666'
              }}
            >
              {(deck[section]?.length || 0)}/{MAX_CHAR}
            </span>
          </div>

          <textarea
            value={deck[section] || ''}
            onChange={(e) => handleChange(section, e.target.value)}
            placeholder={`Write about ${section.toLowerCase()}...`}
            maxLength={1000}
            style={styles.textarea}
          />

          <div style={styles.previewBox}>
            <strong>Preview:</strong>
            <p style={styles.previewText}>
              {deck[section] || 'Nothing written yet.'}
            </p>
          </div>
        </div>
      ))}

      <p style={styles.footerNote}>
        Your pitch deck is auto-saved locally. You can come back anytime to finish.
      </p>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '960px',
    margin: '0 auto',
    fontFamily: 'Segoe UI, sans-serif'
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#2f3c7e'
  },
  card: {
    background: '#f4f7fb',
    borderLeft: '6px solid #3f72af',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1.5rem',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sectionTitle: {
    margin: 0,
    fontSize: '1.2rem'
  },
  textarea: {
    width: '100%',
    height: '120px',
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #bbb',
    borderRadius: '5px',
    marginTop: '0.5rem',
    resize: 'vertical',
    fontFamily: 'inherit'
  },
  previewBox: {
    background: '#fff',
    border: '1px dashed #ccc',
    padding: '0.75rem',
    marginTop: '1rem',
    fontSize: '0.95rem',
    color: '#333',
    borderRadius: '5px'
  },
  previewText: {
    margin: 0
  },
  charCount: {
    fontSize: '0.9rem'
  },
  footerNote: {
    textAlign: 'center',
    color: '#555',
    marginTop: '2rem',
    fontSize: '0.95rem'
  }
};

export default PitchDeckGenerator;
