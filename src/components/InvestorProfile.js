import React, { useState } from "react";

const investorData = {
  id: 1,
  name: "Alice Ventures",
  location: "New York, USA",
  expertise: "FinTech, AI",
  sector: "Finance",
  investmentRange: "$50K - $200K",
  stage: "Seed, Series A",
  bio: "Alice Ventures is a top-tier VC focusing on emerging fintech and AI startups. Backed over 25+ companies.",
  image: "https://via.placeholder.com/300x200",
  banner: "https://via.placeholder.com/800x200?text=Alice+Ventures",
  calendly: "https://calendly.com/aliceventures",
  tags: ["🏆 Top Investor", "🚀 Startup Friendly", "🌱 Early-Stage"],
  portfolio: [
    { name: "FinGrow", sector: "FinTech", year: 2022 },
    { name: "AiNova", sector: "AI", year: 2023 },
  ],
  testimonials: [
    {
      founder: "John Doe",
      startup: "FinGrow",
      feedback: "Alice Ventures believed in us early and helped scale from zero to Series A.",
    },
  ],
};

const tabs = ["Overview", "Portfolio", "Testimonials", "Schedule Call"];

const InvestorProfile = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [bookmarked, setBookmarked] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const colors = {
    primary: "#0047AB",
    gold: "#FFD700",
    bg: darkMode ? "#121212" : "#f9f9f9",
    card: darkMode ? "#1e1e1e" : "#fff",
    text: darkMode ? "#fff" : "#000",
  };

  const styles = {
    container: {
      fontFamily: "Segoe UI",
      backgroundColor: colors.bg,
      color: colors.text,
      minHeight: "100vh",
      padding: "1rem 2rem",
    },
    banner: {
      width: "100%",
      height: "200px",
      objectFit: "cover",
      borderRadius: "12px",
      marginBottom: "1rem",
    },
    profileCard: {
      background: colors.card,
      padding: "1.5rem",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      maxWidth: "300px",
      marginRight: "2rem",
    },
    grid: {
      display: "flex",
      flexWrap: "wrap",
    },
    tabNav: {
      display: "flex",
      gap: "1rem",
      marginBottom: "1.5rem",
    },
    tab: (tab) => ({
      padding: "0.5rem 1rem",
      borderRadius: "8px",
      cursor: "pointer",
      backgroundColor: activeTab === tab ? colors.primary : "transparent",
      color: activeTab === tab ? "#fff" : colors.text,
      border: `1px solid ${colors.primary}`,
      transition: "0.2s ease",
    }),
    content: {
      background: colors.card,
      padding: "1.5rem",
      borderRadius: "12px",
      flex: 1,
    },
    tag: {
      display: "inline-block",
      backgroundColor: "#e0e0e0",
      color: "#333",
      borderRadius: "6px",
      padding: "0.3rem 0.6rem",
      marginRight: "0.5rem",
      marginTop: "0.5rem",
      fontSize: "0.9rem",
    },
    button: {
      backgroundColor: colors.gold,
      border: "none",
      padding: "0.5rem 1rem",
      borderRadius: "8px",
      marginTop: "1rem",
      cursor: "pointer",
      fontWeight: "bold",
    },
    followBtn: {
      marginLeft: "1rem",
      backgroundColor: colors.primary,
      color: "white",
    },
    testimonialCard: {
      background: "#f0f0f0",
      padding: "1rem",
      borderRadius: "8px",
      marginBottom: "1rem",
    },
  };

  return (
    <div style={styles.container}>
      <img src={investorData.banner} alt="banner" style={styles.banner} />
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <h1>{investorData.name}</h1>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
      <div style={styles.grid}>
        {/* Left Sidebar */}
        <div style={styles.profileCard}>
          <img src={investorData.image} alt={investorData.name} style={{ width: "100%", borderRadius: "8px" }} />
          <h3>{investorData.name}</h3>
          <p>{investorData.location}</p>
          <p>{investorData.expertise}</p>
          <p><strong>Stage:</strong> {investorData.stage}</p>
          <p><strong>Investment:</strong> {investorData.investmentRange}</p>
          {investorData.tags.map((tag, i) => (
            <span key={i} style={styles.tag}>{tag}</span>
          ))}
          <div>
            <button
              style={styles.button}
              onClick={() => setBookmarked(!bookmarked)}
            >
              {bookmarked ? "🔖 Bookmarked" : "⭐ Bookmark"}
            </button>
            <button style={{ ...styles.button, ...styles.followBtn }}>
              🔔 Follow
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div style={styles.content}>
          <div style={styles.tabNav}>
            {tabs.map((tab) => (
              <div key={tab} style={styles.tab(tab)} onClick={() => setActiveTab(tab)}>
                {tab}
              </div>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "Overview" && (
            <div>
              <h2>About {investorData.name}</h2>
              <p>{investorData.bio}</p>
            </div>
          )}

          {activeTab === "Portfolio" && (
            <div>
              <h2>Portfolio</h2>
              <ul>
                {investorData.portfolio.map((p, i) => (
                  <li key={i}>
                    <strong>{p.name}</strong> – {p.sector} ({p.year})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "Testimonials" && (
            <div>
              <h2>Testimonials</h2>
              {investorData.testimonials.map((t, i) => (
                <div key={i} style={styles.testimonialCard}>
                  <p>“{t.feedback}”</p>
                  <p>- {t.founder}, {t.startup}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Schedule Call" && (
            <div>
              <h2>Book a Meeting</h2>
              <iframe
                title="Calendly"
                src={investorData.calendly}
                width="100%"
                height="600"
                frameBorder="0"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestorProfile;
