import React, { useState } from 'react';
import { motion } from 'framer-motion';

const InvestorProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [bookmarked, setBookmarked] = useState(false);
  const [following, setFollowing] = useState(false);

  const investor = {
    name: 'Aarav Mehta',
    title: 'Managing Partner',
    firm: 'Bold Ventures',
    location: 'Mumbai, India',
    experience: '12 years',
    sectors: ['Fintech', 'SaaS', 'AI'],
    ticketSize: '$100K - $500K',
    verified: true,
    profileImage: 'https://via.placeholder.com/120',
    bannerImage: 'https://via.placeholder.com/800x200',
    badges: ['Top Investor', 'Startup Friendly', 'Early Stage'],
    about: `Aarav has over a decade of experience investing in early-stage startups across India. He focuses on founders with strong domain expertise and scalable models.`,
    portfolio: [
      { name: 'FinMate', logo: 'https://via.placeholder.com/60' },
      { name: 'SaaSy', logo: 'https://via.placeholder.com/60' },
      { name: 'AIgenius', logo: 'https://via.placeholder.com/60' }
    ],
    testimonials: [
      {
        name: 'Riya Kapoor',
        startup: 'FinMate',
        quote: 'Aarav supported us from idea to Series A. Insightful, responsive, and always founder-first.',
        rating: 5
      },
      {
        name: 'Kunal Das',
        startup: 'SaaSy',
        quote: 'We couldn’t have asked for a better investor. Strategic and always accessible.',
        rating: 5
      }
    ]
  };

  const toggleBookmark = () => setBookmarked(!bookmarked);
  const toggleFollow = () => setFollowing(!following);

  const TabButton = ({ tab }) => (
    <button
      onClick={() => setActiveTab(tab)}
      style={{
        padding: '10px 20px',
        borderBottom: activeTab === tab ? '2px solid #0056D2' : 'none',
        background: 'none',
        color: activeTab === tab ? '#0056D2' : '#666',
        cursor: 'pointer',
        fontWeight: 'bold',
        marginRight: '16px'
      }}
    >
      {tab.charAt(0).toUpperCase() + tab.slice(1)}
    </button>
  );

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#222', backgroundColor: '#f9f9f9' }}>
      <div style={{ position: 'relative' }}>
        <img src={investor.bannerImage} alt="banner" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
        <img
          src={investor.profileImage}
          alt="profile"
          style={{
            position: 'absolute',
            bottom: '-60px',
            left: '40px',
            borderRadius: '50%',
            width: '120px',
            height: '120px',
            border: '4px solid white'
          }}
        />
      </div>
      <div style={{ padding: '80px 40px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1>{investor.name}</h1>
            <p>{investor.title} at {investor.firm}</p>
            <p>{investor.location} • {investor.experience} • Ticket Size: {investor.ticketSize}</p>
            <div style={{ margin: '10px 0' }}>
              {investor.badges.map((badge, idx) => (
                <span key={idx} style={{ background: '#0056D2', color: 'white', padding: '4px 8px', borderRadius: '12px', marginRight: '8px', fontSize: '12px' }}>{badge}</span>
              ))}
            </div>
          </div>
          <div>
            <motion.button whileTap={{ scale: 0.95 }} onClick={toggleBookmark} style={{ marginRight: '12px' }}>
              {bookmarked ? '🔖 Bookmarked' : '📑 Bookmark'}
            </motion.button>
            <motion.button whileTap={{ scale: 0.95 }} onClick={toggleFollow} style={{ marginRight: '12px' }}>
              {following ? '✔️ Following' : '➕ Follow'}
            </motion.button>
            <motion.button whileTap={{ scale: 0.95 }}>
              💬 Message
            </motion.button>
          </div>
        </div>

        <div style={{ marginTop: '40px', borderBottom: '1px solid #ddd' }}>
          {['overview', 'portfolio', 'testimonials', 'schedule'].map(tab => (
            <TabButton key={tab} tab={tab} />
          ))}
        </div>

        <div style={{ padding: '20px 0' }}>
          {activeTab === 'overview' && (
            <p>{investor.about}</p>
          )}
          {activeTab === 'portfolio' && (
            <div style={{ display: 'flex', gap: '20px' }}>
              {investor.portfolio.map((startup, idx) => (
                <div key={idx} style={{ textAlign: 'center' }}>
                  <img src={startup.logo} alt={startup.name} style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                  <p>{startup.name}</p>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'testimonials' && (
            <div style={{ display: 'flex', overflowX: 'auto', gap: '20px' }}>
              {investor.testimonials.map((t, idx) => (
                <div key={idx} style={{ minWidth: '250px', padding: '16px', background: '#fff', borderRadius: '10px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
                  <p>⭐ {t.rating}</p>
                  <p><i>"{t.quote}"</i></p>
                  <p style={{ fontWeight: 'bold' }}>- {t.name}, {t.startup}</p>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'schedule' && (
            <div style={{ height: '600px' }}>
              <iframe
                src="https://calendly.com/your-scheduling-link"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Schedule Call"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestorProfile;
