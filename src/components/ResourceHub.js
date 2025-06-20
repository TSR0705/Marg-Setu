import React, { useState, useEffect } from 'react';

const ResourcesHub = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [bookmarks, setBookmarks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const resources = [
    { id: 1, title: 'Startup Fundraising 101', category: 'Funding', video: 'https://www.youtube.com/embed/Yd4ZkfZhbDk' },
    { id: 2, title: 'Growth Hacking Techniques', category: 'Marketing', video: 'https://www.youtube.com/embed/TmnzCE8Zp8c' },
    { id: 3, title: 'Legal Basics for Startups', category: 'Legal', video: 'https://www.youtube.com/embed/W5h-fx1-7_A' },
    { id: 4, title: 'Pitch Deck Masterclass', category: 'Pitching', video: 'https://www.youtube.com/embed/2kHLm3XyQ1I' },
  ];

  const filtered = resources.filter(
    r =>
      (filter === 'All' || r.category === filter) &&
      r.title.toLowerCase().includes(search.toLowerCase())
  );

  const toggleBookmark = (id) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{
      ...styles.wrapper,
      background: darkMode ? colors.deepNavy : '#f7f9fb',
      color: darkMode ? colors.cloudGray : '#121212'
    }}>
      <header style={styles.header}>
        <h1 style={styles.title}>📚 Resources & Learning Hub</h1>
        <p style={styles.subtext}>AI-powered personalized startup education with interactive guides & video learning.</p>
        <button
          style={{
            ...styles.toggleBtn,
            background: darkMode ? colors.amethyst : colors.sapphire
          }}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>

      <section style={{ ...styles.streakBanner, background: colors.gold }}>🔥 5-Day Learning Streak! Keep going, you're doing great!</section>

      <div style={styles.controls}>
        <input
          placeholder="🔍 Search videos, topics, guides..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
        <select style={styles.filterSelect} value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Funding">Funding</option>
          <option value="Marketing">Marketing</option>
          <option value="Legal">Legal</option>
          <option value="Pitching">Pitching</option>
        </select>
      </div>

      <section style={styles.grid}>
        {filtered.length > 0 ? (
          filtered.map(res => (
            <div key={res.id} style={{ ...styles.card, background: darkMode ? colors.charcoal : '#fff' }}>
              <iframe
                src={res.video}
                title={res.title}
                allowFullScreen
                style={styles.video}
              />
              <h3 style={styles.resourceTitle}>{res.title}</h3>
              <p style={{ ...styles.categoryTag, color: colors.sapphire }}>{res.category}</p>
              <button
                style={bookmarks.includes(res.id) ? styles.bookmarkedBtn : styles.bookmarkBtn}
                onClick={() => toggleBookmark(res.id)}
              >
                {bookmarks.includes(res.id) ? '✅ Bookmarked' : '📌 Bookmark'}
              </button>
            </div>
          ))
        ) : (
          <div style={styles.emptyState}>😕 No resources found. Try a different search.</div>
        )}
      </section>

      <section style={{ ...styles.aiAssistant, background: colors.cloudGray }}>
        🤖 <strong>Need help?</strong> Ask our AI Learning Assistant
        <input placeholder="e.g., How do I create a pitch deck?" style={styles.aiInput} />
      </section>

      <section style={{ ...styles.calendar, background: darkMode ? colors.glassWhite : '#fff' }}>
        <h2 style={styles.calendarHeading}>🗓️ Upcoming Live Learning Events</h2>
        <ul style={styles.calendarList}>
          <li>📍 April 10 - AMA with YC Alumni</li>
          <li>📍 April 12 - Pitch Deck Review Workshop</li>
          <li>📍 April 15 - Founder’s Legal Checklist</li>
        </ul>
      </section>
    </div>
  );
};

const colors = {
  emerald: '#006d5b',
  sapphire: '#0b3c5d',
  amethyst: '#563d7c',
  ruby: '#b02e3a',
  roseGold: '#b76e79',
  gold: 'linear-gradient(90deg, #ffd700, #ffb14e)',
  silver: 'linear-gradient(90deg, #cfd8dc, #eceff1)',
  charcoal: '#1e1e2f',
  deepNavy: '#131a2b',
  cloudGray: '#cfd8dc',
  glassWhite: 'rgba(255, 255, 255, 0.08)',
};

const styles = {
  wrapper: {
    fontFamily: "'Segoe UI', sans-serif",
    padding: '2rem',
    minHeight: '100vh',
    transition: 'all 0.3s ease',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2.5rem',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '0.3rem',
  },
  subtext: {
    fontSize: '1.1rem',
    color: '#888',
  },
  toggleBtn: {
    marginTop: '1rem',
    padding: '0.6rem 1.2rem',
    borderRadius: '8px',
    border: 'none',
    color: '#fff',
    fontWeight: '600',
    cursor: 'pointer',
  },
  streakBanner: {
    color: '#333',
    fontWeight: '600',
    padding: '1rem',
    textAlign: 'center',
    borderRadius: '10px',
    marginBottom: '1.5rem',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2rem',
    maxWidth: '600px',
    marginInline: 'auto',
  },
  searchInput: {
    padding: '0.9rem 1rem',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  filterSelect: {
    padding: '0.7rem 1rem',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem',
  },
  card: {
    borderRadius: '12px',
    padding: '1rem',
    boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
    transition: 'transform 0.2s ease',
  },
  video: {
    width: '100%',
    height: '200px',
    border: 'none',
    borderRadius: '8px',
    marginBottom: '1rem',
  },
  resourceTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '0.4rem',
  },
  categoryTag: {
    fontSize: '0.9rem',
    marginBottom: '1rem',
  },
  bookmarkBtn: {
    padding: '0.6rem 1rem',
    border: `1px solid ${colors.sapphire}`,
    background: 'transparent',
    color: colors.sapphire,
    fontWeight: '500',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  bookmarkedBtn: {
    padding: '0.6rem 1rem',
    border: 'none',
    background: colors.sapphire,
    color: '#fff',
    fontWeight: '600',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  emptyState: {
    textAlign: 'center',
    color: '#999',
    fontSize: '1.1rem',
  },
  aiAssistant: {
    marginTop: '3rem',
    padding: '1.5rem',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: '500',
  },
  aiInput: {
    marginTop: '0.6rem',
    width: '100%',
    padding: '0.8rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '0.95rem',
  },
  calendar: {
    marginTop: '3rem',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
  },
  calendarHeading: {
    fontSize: '1.4rem',
    fontWeight: '600',
    marginBottom: '1rem',
  },
  calendarList: {
    listStyle: 'none',
    paddingLeft: 0,
    fontSize: '1rem',
    lineHeight: '1.8rem',
  },
};

export default ResourcesHub;
