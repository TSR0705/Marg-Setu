import React, { useState, useEffect } from 'react';

const events = [
  {
    id: 1,
    title: '🚀 Growth Hacking Bootcamp',
    date: '2025-04-12T16:00:00',
    category: 'Marketing',
    speaker: 'Anjali Mehra',
    description: 'Learn viral growth strategies from real case studies.',
  },
  {
    id: 2,
    title: '📈 Fundraising for Early Startups',
    date: '2025-04-14T18:00:00',
    category: 'Funding',
    speaker: 'Rohit Sharma',
    description: 'How to raise your first round, pitch tips, and investor readiness.',
  },
  {
    id: 3,
    title: '⚖️ Legal Checklist for Founders',
    date: '2025-04-15T15:00:00',
    category: 'Legal',
    speaker: 'Adv. Neha Patil',
    description: 'What contracts you need, IP basics, and startup compliance.',
  },
];

const LearningEventsCalendar = () => {
  const [filter, setFilter] = useState('All');
  const [rsvps, setRsvps] = useState([]);
  const [rating, setRating] = useState({});
  const [countdown, setCountdown] = useState('');
  const [modalSpeaker, setModalSpeaker] = useState(null);

  const getNextEvent = () => {
    const upcoming = events
      .filter((e) => new Date(e.date) > new Date())
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    return upcoming[0];
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const next = getNextEvent();
      if (!next) return setCountdown('');
      const timeLeft = new Date(next.date) - new Date();
      const hrs = Math.floor(timeLeft / (1000 * 60 * 60));
      const mins = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      setCountdown(`${hrs}h ${mins}m remaining`);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const toggleRsvp = (id) => {
    setRsvps((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const handleRating = (id, value) => {
    setRating((prev) => ({ ...prev, [id]: value }));
  };

  const filtered = filter === 'All' ? events : events.filter((e) => e.category === filter);

  return (
    <div style={{ padding: '2rem', background: '#f4f7fa', minHeight: '100vh' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>📅 Learning Events Calendar</h2>
      {countdown && (
        <div style={{ marginBottom: '1rem', color: '#0070f3', fontWeight: 'bold' }}>
          ⏳ Next Event Starts In: {countdown}
        </div>
      )}

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ fontWeight: '600', marginRight: '0.8rem' }}>Filter by:</label>
        <select
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
          style={{ padding: '0.6rem 1rem', borderRadius: '8px', fontSize: '1rem' }}
        >
          <option value="All">All</option>
          <option value="Marketing">Marketing</option>
          <option value="Funding">Funding</option>
          <option value="Legal">Legal</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {filtered.map((event) => (
          <div
            key={event.id}
            style={{
              background: '#fff',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 6px 18px rgba(0,0,0,0.05)',
              position: 'relative',
            }}
          >
            <h3>{event.title}</h3>
            <p><strong>📆 Date:</strong> {new Date(event.date).toLocaleString()}</p>
            <p>
              <strong>🎙️ Speaker:</strong>{' '}
              <span onClick={() => setModalSpeaker(event.speaker)} style={{ color: '#0070f3', cursor: 'pointer' }}>
                {event.speaker}
              </span>
            </p>
            <p><strong>📚 Category:</strong> {event.category}</p>
            <p style={{ margin: '1rem 0' }}>{event.description}</p>

            <button
              onClick={() => toggleRsvp(event.id)}
              style={{
                background: rsvps.includes(event.id) ? '#0070f3' : 'transparent',
                color: rsvps.includes(event.id) ? '#fff' : '#0070f3',
                border: '1px solid #0070f3',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                marginRight: '1rem',
              }}
            >
              {rsvps.includes(event.id) ? '✅ RSVP\'d' : '📌 RSVP'}
            </button>

            <a
              href={`https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(
                event.title
              )}&dates=${new Date(event.date).toISOString().replace(/[-:.]/g, '').slice(0, 15)}/`}
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: '0.9rem', color: '#444' }}
            >
              📅 Add to Google Calendar
            </a>

            <div style={{ marginTop: '1rem' }}>
              <label style={{ fontWeight: 'bold' }}>⭐ Rate this event:</label>
              <select
                onChange={(e) => handleRating(event.id, e.target.value)}
                value={rating[event.id] || ''}
                style={{ marginLeft: '0.6rem', padding: '0.3rem', borderRadius: '6px' }}
              >
                <option value="">--</option>
                <option value="1">⭐</option>
                <option value="2">⭐⭐</option>
                <option value="3">⭐⭐⭐</option>
                <option value="4">⭐⭐⭐⭐</option>
                <option value="5">⭐⭐⭐⭐⭐</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '3rem', padding: '1rem', background: '#e8f5e9', borderRadius: '10px' }}>
        🤖 <strong>AI Suggestions:</strong> Based on your interests, you might like events about pitch strategy or product-market fit. (Coming Soon)
      </div>

      {modalSpeaker && (
        <div
          onClick={() => setModalSpeaker(null)}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div style={{
            background: '#fff',
            padding: '2rem',
            borderRadius: '12px',
            width: '90%',
            maxWidth: '400px',
            textAlign: 'center',
          }}>
            <h3>🎙️ {modalSpeaker}</h3>
            <p>Speaker bio and credentials will be shown here.</p>
            <button
              onClick={() => setModalSpeaker(null)}
              style={{
                marginTop: '1rem',
                padding: '0.6rem 1.2rem',
                background: '#0070f3',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningEventsCalendar;
