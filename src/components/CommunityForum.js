import React, { useState } from 'react';

const CommunityForum = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'How to Raise Pre-Seed Funding in 2025?',
      author: 'Anjali Rao',
      tag: 'Funding',
      content: 'We just closed our pre-seed round and here’s what we learned...',
      verified: true,
    },
    {
      id: 2,
      title: 'AMA with Rajesh Mehta: Angel Investor',
      author: 'Rajesh Mehta',
      tag: 'AMA',
      content: 'Ask me anything about investing in Indian startups!',
      verified: true,
    },
    {
      id: 3,
      title: 'Hiring a Tech Co-founder?',
      author: 'Neha Sharma',
      tag: 'Hiring',
      content: 'Tips on attracting great technical co-founders to your idea...',
      verified: false,
    },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTag, setNewTag] = useState('Funding');

  const filteredPosts = posts.filter(
    post =>
      (selectedTag === 'All' || post.tag === selectedTag) &&
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tags = ['All', 'Funding', 'AMA', 'Hiring'];

  const handlePostSubmit = () => {
    if (!newTitle.trim() || !newContent.trim()) return alert('Please fill all fields');

    const newPost = {
      id: posts.length + 1,
      title: newTitle,
      author: 'You',
      tag: newTag,
      content: newContent,
      verified: false,
    };

    setPosts([newPost, ...posts]);
    setShowModal(false);
    setNewTitle('');
    setNewContent('');
    setNewTag('Funding');
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <h1 style={styles.title}>🔥 Marg Setu Community Forum</h1>
        <p style={styles.subtitle}>Engage in startup conversations, join AMAs & grow together!</p>
      </div>

      <div style={styles.controls}>
        <input
          type="text"
          placeholder="Search discussions..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />

        <div style={styles.tagContainer}>
          {tags.map(tag => (
            <button
              key={tag}
              style={{
                ...styles.tag,
                backgroundColor: selectedTag === tag ? '#0077ff' : '#f0f0f0',
                color: selectedTag === tag ? '#fff' : '#333',
              }}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.grid}>
        {filteredPosts.map(post => (
          <div key={post.id} style={styles.card}>
            <h3 style={styles.cardTitle}>{post.title}</h3>
            <p style={styles.author}>
              {post.author} {post.verified && <span style={styles.verified} title="Verified user">✔</span>}
            </p>
            <p style={styles.cardContent}>{post.content}</p>
            <span style={styles.postTag}>{post.tag}</span>
          </div>
        ))}
      </div>

      <button style={styles.fab} onClick={() => setShowModal(true)}>＋</button>

      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>Create New Discussion</h2>

            <input
              placeholder="Title"
              style={styles.modalInput}
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
            />

            <textarea
              placeholder="Details..."
              style={styles.modalTextarea}
              value={newContent}
              onChange={e => setNewContent(e.target.value)}
            ></textarea>

            <select
              style={styles.modalInput}
              value={newTag}
              onChange={e => setNewTag(e.target.value)}
            >
              {tags.filter(tag => tag !== 'All').map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>

            <button style={styles.submitButton} onClick={handlePostSubmit}>Post</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  wrapper: {
    padding: '2rem',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f9fafa',
    minHeight: '100vh',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2.2rem',
    margin: 0,
    color: '#1a1a1a',
  },
  subtitle: {
    color: '#555',
    marginTop: '0.5rem',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2rem',
  },
  searchInput: {
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    width: '100%',
  },
  tagContainer: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
  tag: {
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    padding: '1.5rem',
    borderRadius: '12px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
    position: 'relative',
    transition: 'transform 0.2s ease',
  },
  cardTitle: {
    fontSize: '1.1rem',
    margin: '0 0 0.5rem 0',
    color: '#111',
  },
  author: {
    fontSize: '0.9rem',
    color: '#888',
    marginBottom: '0.5rem',
  },
  verified: {
    color: '#00cc66',
    marginLeft: '6px',
    fontSize: '0.9rem',
  },
  cardContent: {
    fontSize: '0.95rem',
    color: '#333',
    marginBottom: '1rem',
  },
  postTag: {
    position: 'absolute',
    bottom: '1rem',
    right: '1rem',
    backgroundColor: '#0077ff',
    color: '#fff',
    padding: '0.3rem 0.8rem',
    borderRadius: '12px',
    fontSize: '0.75rem',
  },
  fab: {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    backgroundColor: '#0077ff',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '3.5rem',
    height: '3.5rem',
    fontSize: '2rem',
    cursor: 'pointer',
    boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
    transition: 'transform 0.2s ease',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, bottom: 0, right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '2rem',
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
  },
  modalTitle: {
    margin: 0,
    fontSize: '1.5rem',
    color: '#222',
    marginBottom: '1rem',
  },
  modalInput: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    borderRadius: '10px',
    border: '1px solid #ccc',
  },
  modalTextarea: {
    width: '100%',
    height: '100px',
    padding: '0.75rem',
    borderRadius: '10px',
    border: '1px solid #ccc',
    resize: 'vertical',
    marginBottom: '1rem',
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#0077ff',
    color: '#fff',
    padding: '0.75rem',
    borderRadius: '10px',
    border: 'none',
    fontWeight: '600',
    fontSize: '1rem',
    cursor: 'pointer',
  },
};

export default CommunityForum;
