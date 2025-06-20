import React from "react";
import { Brain, BookOpen, Rocket, Users, Lightbulb } from "lucide-react";

export default function LearnerDashboard() {
  return (
    <div className="dashboard-container">
      <style>
        {`
          body {
            margin: 0;
            padding: 0;
            background: #f9fafb;
            color: #1f2937;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }

          .dashboard-container {
            padding: 2rem;
            max-width: 1200px;
            margin: auto;
          }

          h1 {
            font-size: 2.5rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: 2.5rem;
            color: #111827;
          }

          .tabs-list {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 0.75rem;
            margin-bottom: 1.5rem;
          }

          .tabs-list button {
            padding: 0.7rem 1.4rem;
            border: 1px solid #d1d5db;
            background: #ffffff;
            color: #374151;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1rem;
            transition: all 0.3s ease;
          }

          .tabs-list button.active,
          .tabs-list button:hover {
            background: #3b82f6;
            color: #ffffff;
            border-color: #3b82f6;
          }

          .tab-content {
            display: none;
          }

          .tab-content.active {
            display: block;
            margin-top: 1rem;
          }

          .card-grid {
            display: grid;
            gap: 1.5rem;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          }

          .card {
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
            padding: 1.5rem;
            transition: transform 0.3s, box-shadow 0.3s;
          }

          .card:hover {
            transform: translateY(-4px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.1);
          }

          .card-title {
            font-weight: 600;
            font-size: 1.1rem;
            margin-bottom: 0.75rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #111827;
          }

          .btn {
            margin-top: 1rem;
            padding: 0.55rem 1.1rem;
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.95rem;
            transition: background 0.3s ease;
          }

          .btn:hover {
            background: #2563eb;
          }

          .progress-bar {
            width: 100%;
            height: 10px;
            background: #e5e7eb;
            border-radius: 5px;
            overflow: hidden;
            margin-top: 1rem;
          }

          .progress-bar-inner {
            height: 100%;
            background: #10b981;
            width: 35%;
          }
        `}
      </style>

      <h1>🎓 Your Startup Journey Starts Here</h1>

      <div className="tabs-list">
        <button className="active" onClick={() => showTab("learn")}>Explore Knowledge</button>
        <button onClick={() => showTab("build")}>Start Building</button>
        <button onClick={() => showTab("engage")}>Engage with Ecosystem</button>
      </div>

      <div id="learn" className="tab-content active">
        <div className="card-grid">
          <div className="card">
            <div className="card-title"><BookOpen /> Curated Learning Tracks</div>
            <ul>
              <li>How to Think Like a Founder</li>
              <li>Building MVPs Without Code</li>
              <li>Startup Finance 101</li>
              <li>How to Pitch to VCs</li>
            </ul>
            <button className="btn">Start Track</button>
          </div>
          <div className="card">
            <div className="card-title"><Rocket /> Personalized Journey</div>
            <p>Choose a goal like “Launch in 3 months” or “Solo Founder” and let AI guide your track.</p>
            <button className="btn">Set Your Goal</button>
          </div>
        </div>
      </div>

      <div id="build" className="tab-content">
        <div className="card-grid">
          <div className="card">
            <div className="card-title"><Brain /> AI Pitch Draft Assistant</div>
            <p>Step-by-step pitch builder with GPT-powered prompts.</p>
            <button className="btn">Start Drafting</button>
          </div>
          <div className="card">
            <div className="card-title"><Lightbulb /> Idea Vault</div>
            <p>Save, edit, and rate your startup ideas over time.</p>
            <button className="btn">Go to Vault</button>
          </div>
        </div>
      </div>

      <div id="engage" className="tab-content">
        <div className="card-grid">
          <div className="card">
            <div className="card-title"><Users /> Live AMAs & Mentorship</div>
            <p>Watch replays, attend live sessions, and learn from founders.</p>
            <button className="btn">View Schedule</button>
          </div>
          <div className="card">
            <div className="card-title"><BookOpen /> Public Pitch Rooms</div>
            <p>See how real pitches are judged. Learn what works and why.</p>
            <button className="btn">Join Room</button>
          </div>
        </div>
      </div>

      <div className="card-grid" style={{ marginTop: "2rem" }}>
        <div className="card">
          <div className="card-title">📊 Startup Readiness Score</div>
          <p>Progress bar based on your learning + building actions.</p>
          <div className="progress-bar">
            <div className="progress-bar-inner"></div>
          </div>
        </div>
        <div className="card">
          <div className="card-title">💬 Daily Prompt</div>
          <p>"Write your startup’s problem statement in 3 lines."</p>
        </div>
        <div className="card">
          <div className="card-title">🏆 Bonus: Learn from Winners</div>
          <p>Pitch breakdowns from real hackathons & funded startups.</p>
          <button className="btn">View Stories</button>
        </div>
      </div>
    </div>
  );
}

function showTab(tabId) {
  document.querySelectorAll(".tab-content").forEach(tab => {
    tab.classList.remove("active");
  });
  document.getElementById(tabId).classList.add("active");
  document.querySelectorAll(".tabs-list button").forEach(btn => {
    btn.classList.remove("active");
  });
  const trigger = Array.from(document.querySelectorAll(".tabs-list button"))
    .find(btn => btn.textContent.toLowerCase().includes(tabId));
  if (trigger) trigger.classList.add("active");
}
