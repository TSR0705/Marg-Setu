import React, { useState, useEffect } from 'react';

const dummyBlogs = [
  {
    id: 1,
    title: 'Why Tier 2/3 Cities Are the Future of Innovation',
    author: 'Riya Kapoor',
    date: '2024-12-20',
    category: 'Ecosystem',
    tags: ['Innovation', 'Tier 2/3'],
    content: `Startups from smaller cities are showing exponential growth. This blog explores why Tier 2/3 cities are uniquely positioned for disruption...`,
    image: 'https://source.unsplash.com/800x400/?city,technology',
  },
  {
    id: 2,
    title: 'How to Nail Your MVP as a First-Time Founder',
    author: 'Ankur Rao',
    date: '2025-01-08',
    category: 'Learning',
    tags: ['MVP', 'Product'],
    content: `Building your Minimum Viable Product is tricky. Here’s a practical guide for first-time founders to balance speed and substance...`,
    image: 'https://source.unsplash.com/800x400/?startup,app',
  },
  {
    id: 3,
    title: 'Top 10 Pitch Deck Mistakes to Avoid',
    author: 'Deepa Singh',
    date: '2025-03-01',
    category: 'Investment',
    tags: ['Pitch', 'Fundraising'],
    content: `A strong pitch can make or break funding chances. Learn from others’ mistakes with these top 10 pitch fails...`,
    image: 'https://source.unsplash.com/800x400/?presentation,investor',
  },
];

function BlogPage() {
  const [blogs, setBlogs] = useState(dummyBlogs);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [comments, setComments] = useState(JSON.parse(localStorage.getItem('blogComments')) || {});
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem('blogComments', JSON.stringify(comments));
  }, [comments]);

  const filteredBlogs = blogs.filter((blog) => {
    const matchCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchAuthor = !selectedAuthor || blog.author === selectedAuthor;
    const matchDate = !dateFilter || blog.date === dateFilter;
    return matchCategory && matchSearch && matchAuthor && matchDate;
  });

  const handleComment = (id, text) => {
    const updated = { ...comments, [id]: [...(comments[id] || []), text] };
    setComments(updated);
  };

  const readTime = (text) => Math.ceil(text.split(' ').length / 200);

  const scrollProgress = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    return `${(scrollTop / scrollHeight) * 100}%`;
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI', backgroundColor: darkMode ? '#121212' : '#f9f9f9', color: darkMode ? '#fff' : '#000' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, height: '4px', background: '#007bff', width: scrollProgress(), zIndex: 1000 }} />

      <h1 style={{ fontSize: '2.5rem' }}>📚 Marg Setu Blog</h1>

      <button onClick={() => setDarkMode(!darkMode)} style={{ marginBottom: '1rem' }}>
        {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>

      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {['All', 'Ecosystem', 'Learning', 'Investment'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{ background: selectedCategory === cat ? '#007bff' : '#e0e0e0', color: selectedCategory === cat ? '#fff' : '#000', padding: '0.5rem 1rem', border: 'none', borderRadius: '20px' }}>
            {cat}
          </button>
        ))}
        <input placeholder="🔍 Search title" onChange={(e) => setSearchTerm(e.target.value)} style={{ padding: '0.5rem', borderRadius: '6px' }} />
        <input placeholder="Author" onChange={(e) => setSelectedAuthor(e.target.value)} style={{ padding: '0.5rem', borderRadius: '6px' }} />
        <input type="date" onChange={(e) => setDateFilter(e.target.value)} style={{ padding: '0.5rem', borderRadius: '6px' }} />
      </div>

      {selectedBlog ? (
        <div>
          <button onClick={() => setSelectedBlog(null)} style={{ marginBottom: '1rem' }}>← Back</button>
          <h2>{selectedBlog.title}</h2>
          <img src={selectedBlog.image} alt='' style={{ width: '100%', borderRadius: '10px' }} />
          <p><em>By {selectedBlog.author} • {selectedBlog.date} • ☕ {readTime(selectedBlog.content)} min read</em></p>
          <p>{selectedBlog.content}</p>
          <div>
            <strong>Tags:</strong> {selectedBlog.tags.map((t) => <span key={t} style={{ marginRight: '0.5rem' }}>#{t}</span>)}
          </div>
          <div style={{ marginTop: '1rem' }}>
            <strong>Comments</strong>
            <ul>
              {(comments[selectedBlog.id] || []).map((c, i) => <li key={i}>{c}</li>)}
            </ul>
            <input placeholder="Write a comment..." onKeyDown={(e) => { if (e.key === 'Enter') handleComment(selectedBlog.id, e.target.value) }} style={{ padding: '0.5rem', width: '100%' }} />
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          {filteredBlogs.map((blog) => (
            <div key={blog.id} onClick={() => setSelectedBlog(blog)} style={{ cursor: 'pointer', background: darkMode ? '#1e1e1e' : '#fff', padding: '1rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', transition: '0.3s', transform: 'scale(1)', overflow: 'hidden' }}>
              <img src={blog.image} alt='' style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '6px' }} />
              <h3 style={{ marginTop: '0.5rem' }}>{blog.title}</h3>
              <p><em>{blog.author} • {blog.date} • ☕ {readTime(blog.content)} min read</em></p>
              <p>{blog.content.slice(0, 100)}...</p>
              <div>
                {blog.tags.map((t) => <span key={t} style={{ fontSize: '0.8rem', background: '#e0e0e0', padding: '0.2rem 0.4rem', marginRight: '0.4rem', borderRadius: '4px' }}>#{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BlogPage;
