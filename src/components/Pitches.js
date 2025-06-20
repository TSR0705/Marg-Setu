import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaMapMarkerAlt, FaUser, FaStar } from 'react-icons/fa';

const mockPitches = [
  {
    id: 1,
    name: 'EduSpark',
    tagline: 'Revolutionizing EdTech for the 21st century.',
    category: 'Edtech',
    founder: 'Alice Johnson',
    location: 'Bangalore, India',
    pitchDeckUrl: 'https://example.com/deck1.pdf',
    logo: 'https://via.placeholder.com/100'
  },
  {
    id: 2,
    name: 'HealthBridge',
    tagline: 'AI-powered healthcare solutions.',
    category: 'Healthtech',
    founder: 'Rahul Mehta',
    location: 'Mumbai, India',
    pitchDeckUrl: 'https://example.com/deck2.pdf',
    logo: 'https://via.placeholder.com/100'
  },
];

const Pitches = () => {
  const [pitches, setPitches] = useState([]);
  const [selectedPitch, setSelectedPitch] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    setPitches(mockPitches);
  }, []);

  const handleBookmark = (id) => {
    setBookmarks((prev) => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  };

  const filteredPitches = pitches.filter(pitch =>
    pitch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pitch.founder.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pitches-container">
      <h1>Explore Pitches</h1>
      <input
        type="text"
        placeholder="Search startups or founders..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <div className="pitches-grid">
        {filteredPitches.length === 0 ? (
          <div className="empty-state">🔍 No matching pitches found.</div>
        ) : (
          filteredPitches.map(pitch => (
            <div key={pitch.id} className="pitch-card">
              <img src={pitch.logo} alt="logo" className="pitch-logo" />
              <h2>{pitch.name}</h2>
              <p>{pitch.tagline}</p>
              <div className="pitch-meta">
                <span>🏷 {pitch.category}</span>
                <span><FaUser /> {pitch.founder}</span>
                <span><FaMapMarkerAlt /> {pitch.location}</span>
              </div>
              <div className="pitch-actions">
                <button onClick={() => setSelectedPitch(pitch)}>📄 View Deck</button>
                <button onClick={() => handleBookmark(pitch.id)}>
                  {bookmarks.includes(pitch.id) ? '✅ Bookmarked' : <><FaStar /> Bookmark</>}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedPitch && (
        <Modal
          isOpen={true}
          onRequestClose={() => setSelectedPitch(null)}
          className="modal"
          overlayClassName="overlay"
        >
          <h2>{selectedPitch.name} Pitch Deck</h2>
          <iframe
            src={`https://docs.google.com/gview?url=${selectedPitch.pitchDeckUrl}&embedded=true`}
            title="Pitch Deck"
            width="100%"
            height="500px"
            frameBorder="0"
          ></iframe>
          <button onClick={() => setSelectedPitch(null)}>Close</button>
        </Modal>
      )}
    </div>
  );
};

export default Pitches;