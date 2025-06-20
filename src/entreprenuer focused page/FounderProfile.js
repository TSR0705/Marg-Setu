import React, { useState, useEffect } from 'react';

const FounderProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    photo: '',
    bio: '',
    startup: '',
    skills: '',
    linkedin: '',
    twitter: '',
    github: '',
    website: '',
  });

  const [isEditing, setIsEditing] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem('founderProfile');
    if (savedProfile) setProfile(JSON.parse(savedProfile));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem('founderProfile', JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setIsEditing(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Founder Profile</h2>
      
      <div style={styles.form}>
        {['name', 'email', 'phone', 'location', 'startup'].map(field => (
          <input
            key={field}
            style={styles.input}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={profile[field]}
            onChange={handleChange}
            disabled={!isEditing}
          />
        ))}

        <textarea
          name="bio"
          placeholder="Short Bio (max 500 characters)"
          maxLength={500}
          value={profile.bio}
          onChange={handleChange}
          style={styles.textarea}
          disabled={!isEditing}
        />

        <input
          name="skills"
          placeholder="Skills (comma-separated)"
          value={profile.skills}
          onChange={handleChange}
          style={styles.input}
          disabled={!isEditing}
        />

        <div style={styles.linksContainer}>
          {['linkedin', 'twitter', 'github', 'website'].map(field => (
            <input
              key={field}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={profile[field]}
              onChange={handleChange}
              style={styles.input}
              disabled={!isEditing}
            />
          ))}
        </div>

        {isEditing ? (
          <button style={styles.button} onClick={handleSave}>Save</button>
        ) : (
          <button style={styles.editBtn} onClick={() => setIsEditing(true)}>Edit</button>
        )}
      </div>

      {saved && <div style={styles.shimmer}>✓ Saved!</div>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '24px',
    border: '1px solid #ccc',
    borderRadius: '12px',
    fontFamily: 'sans-serif',
    background: '#f9f9f9',
  },
  title: {
    textAlign: 'center',
    fontSize: '28px',
    marginBottom: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  textarea: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    minHeight: '100px',
    fontSize: '16px',
  },
  linksContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '12px',
  },
  button: {
    padding: '12px',
    backgroundColor: '#2d72d9',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  editBtn: {
    padding: '12px',
    backgroundColor: '#888',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  shimmer: {
    marginTop: '20px',
    textAlign: 'center',
    color: 'green',
    fontWeight: 'bold',
    animation: 'fadein 2s ease-in-out',
  }
};

export default FounderProfile;
