import React, { useEffect } from 'react';

export default function BrainstormerDashboard() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      body {
        background-color: #0d1b2a;
        color: #e0e1dd;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }
      .dashboard-container {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2.5rem;
        padding: 2.5rem;
        background-color: #0d1b2a;
      }
      @media (min-width: 1024px) {
        .dashboard-container {
          grid-template-columns: 2fr 1fr;
          gap: 3rem;
        }
      }
      .section-title {
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 2rem;
        color: #edf2f4;
      }
      .card {
        background: linear-gradient(145deg, #f4f4f4, #ffffff);
        padding: 1.75rem;
        border-radius: 1.25rem;
        box-shadow: 0 8px 18px rgba(0,0,0,0.4);
        transition: transform 0.3s ease;
        margin-bottom: 2rem;
      }
      .card:hover {
        transform: translateY(-6px);
      }
      .card h2 {
        font-size: 1.5rem;
        color: #1b263b;
        margin-bottom: 1rem;
      }
      .card p,
      .card li,
      .card ol {
        font-size: 0.95rem;
        color: #333;
      }
      .card ul,
      .card ol {
        padding-left: 1.5rem;
        margin-top: 0.5rem;
      }
      .card button {
        background-color: #1f4068;
        color: #ffffff;
        padding: 0.6rem 1.2rem;
        border: none;
        border-radius: 0.5rem;
        font-size: 0.95rem;
        cursor: pointer;
        margin-top: 1rem;
      }
      .card button:hover {
        background-color: #162e4d;
      }
      .badges {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
        margin-top: 0.75rem;
      }
      .badge {
        background-color: #2c3e50;
        color: #e0e1dd;
        font-size: 0.75rem;
        font-weight: 600;
        padding: 0.3rem 0.75rem;
        border-radius: 9999px;
        border: 1px solid #415a77;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="dashboard-container">
      <div>
        <h1 className="section-title">🧠 Brainstormer Dashboard</h1>

        <div className="card">
          <h2>Startups Needing Feedback Today</h2>
          <ul>
            <li>Pitch #1 – “AI for Elder Care” <button>Give Feedback</button></li>
            <li>Pitch #2 – “Zero-Waste Market App” <button>Give Feedback</button></li>
          </ul>
        </div>

        <div className="card">
          <h2>🎯 Prompted Feedback Requests</h2>
          <ul>
            <li>“Is this name catchy for GenZ?”</li>
            <li>“Would you pay for this AI feature?”</li>
          </ul>
        </div>

        <div className="card">
          <h2>💡 Idea Co-Creation Zone</h2>
          <p>Add suggestions to open pitches.</p>
          <button>Browse Open Collaboration Startups</button>
        </div>

        <div className="card">
          <h2>📊 Rate Startups</h2>
          <p>Rate pitches based on innovation, clarity, and execution.</p>
          <button>Start Rating</button>
        </div>

        <div className="card">
          <h2>🔁 Brainstorm Jams</h2>
          <p>Join weekly brainstorm challenges and pitch contests.</p>
          <button>View Challenges</button>
        </div>
      </div>

      <div>
        <div className="card">
          <h2>🏆 Your Feedback Impact</h2>
          <p>You helped 5 startups increase visibility this week!</p>
          <ul>
            <li>IdeaX gained 12 upvotes after your suggestion.</li>
            <li>PitchY improved their feature roadmap.</li>
          </ul>
        </div>

        <div className="card">
          <h2>🥇 Leaderboard</h2>
          <p>Top Brainstormers This Week:</p>
          <ol>
            <li>Aarya - 98 XP</li>
            <li>Kunal - 87 XP</li>
            <li>Imran - 85 XP</li>
          </ol>
        </div>

        <div className="card">
          <h2>🎖 Your Badges</h2>
          <div className="badges">
            <span className="badge">Top Brain</span>
            <span className="badge">MVP Maker</span>
            <span className="badge">Co-Founder Vibes</span>
          </div>
        </div>

        <div className="card">
          <h2>📚 Saved Startups & Notes</h2>
          <ul>
            <li>“NeuroFit” – Note: Try reaching the founder about gamification.</li>
            <li>“GreenRentals” – Note: Expansion in tier-2 cities?</li>
          </ul>
        </div>

        <div className="card">
          <h2>🤝 Followed Founders</h2>
          <p>You’re following 3 active founders. Get notified when they post new updates.</p>
          <button>View All</button>
        </div>
      </div>
    </div>
  );
}