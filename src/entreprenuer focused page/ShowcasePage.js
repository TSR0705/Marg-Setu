import React, { useState } from 'react';

function ShowcasePage() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [gallery, setGallery] = useState([]);
  const [milestones, setMilestones] = useState([
    { date: '2023-06-01', text: 'Incorporated' },
    { date: '2023-09-10', text: 'First prototype launched' },
    { date: '2024-01-15', text: 'Seed funding secured' },
  ]);
  const [newMilestone, setNewMilestone] = useState({ date: '', text: '' });

  const addComment = () => {
    if (newComment.trim()) {
      setComments([{ text: newComment, time: new Date() }, ...comments]);
      setNewComment('');
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setGallery([...gallery, ...newImages]);
  };

  const addMilestone = () => {
    if (newMilestone.date && newMilestone.text) {
      setMilestones([...milestones, newMilestone]);
      setNewMilestone({ date: '', text: '' });
    }
  };

  const removeMilestone = (index) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🚀 Startup Showcase</h1>

      {/* Startup Overview */}
      <div style={styles.card}>
        <img src="https://via.placeholder.com/80" alt="Logo" style={styles.logo} />
        <div>
          <h2 style={styles.title}>InnoLeap</h2>
          <p style={styles.subtitle}>Transforming local solutions into global impact.</p>
          <p>
            🌐 <a href="https://example.com" target="_blank" rel="noopener noreferrer">Website</a> | 
            📄 <a href="https://example.com/pitch" target="_blank" rel="noopener noreferrer">Pitch Deck</a>
          </p>
        </div>
      </div>

      {/* Toggle Public/Private */}
      <div style={styles.section}>
        <label>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={() => setIsPublic(!isPublic)}
          />
          {' '}
          {isPublic ? '🌍 Public Showcase' : '🔒 Private Showcase'}
        </label>
      </div>

      {/* Milestones */}
      <div style={styles.section}>
        <h3>📌 Milestones</h3>
        <ul style={styles.milestoneList}>
          {milestones.map((m, idx) => (
            <li key={idx} style={styles.milestone}>
              <span>{m.date}: {m.text}</span>
              <button onClick={() => removeMilestone(idx)} style={styles.removeBtn}>❌</button>
            </li>
          ))}
        </ul>
        <div style={styles.inputRow}>
          <input
            style={styles.input}
            type="date"
            value={newMilestone.date}
            onChange={(e) => setNewMilestone({ ...newMilestone, date: e.target.value })}
          />
          <input
            style={styles.input}
            type="text"
            placeholder="Milestone..."
            value={newMilestone.text}
            onChange={(e) => setNewMilestone({ ...newMilestone, text: e.target.value })}
          />
          <button onClick={addMilestone} style={styles.button}>Add</button>
        </div>
      </div>

      {/* Gallery */}
      <div style={styles.section}>
        <h3>🖼️ Media Gallery</h3>
        <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
        <div style={styles.gallery}>
          {gallery.map((src, idx) => (
            <img key={idx} src={src} alt={`Media ${idx}`} style={styles.galleryImage} />
          ))}
        </div>
      </div>

      {/* Community Comments */}
      <div style={styles.section}>
        <h3>💬 Community Feedback</h3>
        <div style={styles.inputRow}>
          <input
            style={styles.input}
            type="text"
            value={newComment}
            placeholder="Leave feedback..."
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={addComment} style={styles.button}>Post</button>
        </div>
        <ul style={styles.commentList}>
          {comments.map((c, idx) => (
            <li key={idx} style={styles.commentItem}>
              <span>{c.text}</span>
              <div style={styles.commentTime}>{c.time.toLocaleString()}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#003366',
  },
  card: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f0f4f8',
    borderRadius: '10px',
    marginBottom: '20px',
  },
  logo: {
    width: '80px',
    height: '80px',
    borderRadius: '10px',
  },
  title: {
    margin: 0,
    color: '#222',
  },
  subtitle: {
    margin: '5px 0',
    fontStyle: 'italic',
    color: '#555',
  },
  section: {
    marginBottom: '30px',
  },
  milestoneList: {
    listStyle: 'none',
    paddingLeft: 0,
  },
  milestone: {
    backgroundColor: '#e1f5fe',
    padding: '8px 12px',
    marginBottom: '6px',
    borderRadius: '6px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  removeBtn: {
    background: 'transparent',
    border: 'none',
    color: '#d32f2f',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  inputRow: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
  },
  input: {
    flex: 1,
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '8px 12px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#1976d2',
    color: 'white',
    cursor: 'pointer',
  },
  gallery: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '10px',
  },
  galleryImage: {
    width: '120px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '6px',
  },
  commentList: {
    listStyle: 'none',
    paddingLeft: 0,
    marginTop: '10px',
  },
  commentItem: {
    backgroundColor: '#fff3e0',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '8px',
  },
  commentTime: {
    fontSize: '0.8rem',
    color: '#777',
    marginTop: '5px',
  },
};

export default ShowcasePage;
