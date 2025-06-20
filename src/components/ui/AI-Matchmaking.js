import React, { useState } from 'react';

const AIMatchmakingPage = () => {
  const [startupData, setStartupData] = useState({
    industry: '',
    stage: '',
    goals: '',
  });

  const [suggestions, setSuggestions] = useState([]);

  const mentors = [
    { id: 1, name: 'Dr. Ayesha Kapoor', industry: 'Fintech', stage: 'Seed', expertise: 'Fundraising' },
    { id: 2, name: 'Rahul Mehta', industry: 'HealthTech', stage: 'Growth', expertise: 'Go-To-Market' },
    { id: 3, name: 'Neha Sharma', industry: 'EdTech', stage: 'Idea', expertise: 'Product Strategy' },
    { id: 4, name: 'Siddharth Patel', industry: 'Fintech', stage: 'Growth', expertise: 'Scaling Teams' },
    { id: 5, name: 'Meera Joshi', industry: 'HealthTech', stage: 'Seed', expertise: 'Pitch Refinement' },
  ];

  const handleInputChange = (e) => {
    setStartupData({ ...startupData, [e.target.name]: e.target.value });
  };

  const matchMentors = () => {
    const { industry, stage } = startupData;
    const matched = mentors.filter(
      (mentor) =>
        mentor.industry.toLowerCase().includes(industry.toLowerCase()) &&
        mentor.stage.toLowerCase().includes(stage.toLowerCase())
    );
    setSuggestions(matched.slice(0, 3));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🤖 AI-Powered Mentor Matchmaking</h1>
      <p style={styles.subtitle}>
        Fill in your startup details below to get top 3 mentor recommendations tailored just for you.
      </p>

      <div style={styles.form}>
        <input
          type="text"
          name="industry"
          placeholder="Industry (e.g., Fintech, EdTech)"
          onChange={handleInputChange}
          style={styles.input}
        />
        <input
          type="text"
          name="stage"
          placeholder="Startup Stage (Idea, Seed, Growth)"
          onChange={handleInputChange}
          style={styles.input}
        />
        <textarea
          name="goals"
          placeholder="Describe your goals or pain points..."
          onChange={handleInputChange}
          style={styles.textarea}
        ></textarea>
        <button onClick={matchMentors} style={styles.button}>
          🔍 Find My Mentors
        </button>
      </div>

      {suggestions.length > 0 && (
        <div style={styles.result}>
          <h3 style={styles.resultTitle}>✨ Top Mentor Matches</h3>
          <ul style={styles.mentorList}>
            {suggestions.map((mentor) => (
              <li key={mentor.id} style={styles.mentorCard}>
                <h4 style={styles.mentorName}>{mentor.name}</h4>
                <p>🧭 Industry: {mentor.industry}</p>
                <p>🚀 Stage: {mentor.stage}</p>
                <p>🎯 Expertise: {mentor.expertise}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '2.5rem',
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: '#f7f9fb',
    minHeight: '100vh',
    color: '#131a2b',
  },
  title: {
    fontSize: '2.2rem',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '0.8rem',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#444',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  form: {
    maxWidth: '600px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.9rem 1.1rem',
    fontSize: '1rem',
    borderRadius: '10px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '1rem',
    fontSize: '1rem',
    borderRadius: '10px',
    border: '1px solid #ccc',
    minHeight: '120px',
  },
  button: {
    backgroundColor: '#006d5b',
    color: '#fff',
    padding: '0.9rem',
    fontSize: '1rem',
    fontWeight: '600',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  result: {
    marginTop: '3rem',
    textAlign: 'center',
  },
  resultTitle: {
    fontSize: '1.4rem',
    fontWeight: '600',
    marginBottom: '1.2rem',
  },
  mentorList: {
    listStyle: 'none',
    padding: 0,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  mentorCard: {
    backgroundColor: '#ffffff',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
    textAlign: 'left',
    color: '#0b3c5d',
  },
  mentorName: {
    fontSize: '1.2rem',
    fontWeight: '700',
    marginBottom: '0.6rem',
  },
};

export default AIMatchmakingPage;
