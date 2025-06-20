import React, { useState } from "react";

// Dummy data (replace with API later)
const startupsData = [
  {
    id: 1,
    name: "AgroLink",
    description: "Connecting farmers with urban markets using AI-driven logistics.",
    stage: "Seed",
    industry: "AgriTech",
    location: "Pune, India",
    tags: ["Investor-friendly", "Mentor Needed"],
  },
  {
    id: 2,
    name: "EduSpark",
    description: "Gamified learning platform for K-12 students in Tier-2 cities.",
    stage: "Series A",
    industry: "EdTech",
    location: "Bangalore, India",
    tags: ["High Growth", "Impact Startup"],
  },
  {
    id: 3,
    name: "MediChain",
    description: "Blockchain-based secure health record management system.",
    stage: "Pre-Seed",
    industry: "HealthTech",
    location: "Delhi, India",
    tags: ["Mentor Needed", "Investor-friendly"],
  },
  {
    id: 4,
    name: "FinWise",
    description: "Revolutionizing fintech through micro-investment tools.",
    stage: "Series B",
    industry: "FinTech",
    location: "Mumbai, India",
    tags: ["Mentor Needed", "Investor-friendly"],
  },
  {
    id: 5,
    name: "GreenGrid",
    description: "Smart energy optimization for sustainable homes.",
    stage: "Seed",
    industry: "CleanTech",
    location: "Hyderabad, India",
    tags: ["High Growth", "Impact Startup"],
  },
  {
    id: 6,
    name: "SkillNova",
    description: "Upskilling platform using VR simulations.",
    stage: "Seed",
    industry: "EdTech",
    location: "Ahmedabad, India",
    tags: ["Mentor Needed", "Investor-friendly"],
  },
  {
    id: 7,
    name: "SafePath",
    description: "IoT-based safety tracking for public transport.",
    stage: "Series B",
    industry: "Mobility",
    location: "Chennai, India",
    tags: ["Deep Tech", "AI-powered"],
  },
  {
    id: 8,
    name: "EcoCart",
    description: "Green ecommerce for sustainable product discovery.",
    stage: "Pre-Seed",
    industry: "E-commerce",
    location: "Kolkata, India",
    tags: ["High Growth", "Impact Startup"],
  },
  {
    id: 9,
    name: "FitSphere",
    description: "AI fitness coach with motion tracking.",
    stage: "Series B",
    industry: "HealthTech",
    location: "Indore, India",
    tags: ["Incubated", "Revenue-generating"],
  },
  {
    id: 10,
    name: "UrbanNest",
    description: "Affordable modular housing for smart cities.",
    stage: "Seed",
    industry: "PropTech",
    location: "Surat, India",
    tags: ["Scalable", "Sustainable"],
  },
  {
    id: 11,
    name: "SmartFarm",
    description: "AI-driven precision agriculture assistant.",
    stage: "Series A",
    industry: "AgriTech",
    location: "Jaipur, India",
    tags: ["High Growth", "Impact Startup"],
  },
  {
    id: 12,
    name: "CodeCraft",
    description: "Remote dev collaboration tools with gamification.",
    stage: "Pre-Seed",
    industry: "DevTools",
    location: "Lucknow, India",
    tags: ["Deep Tech", "AI-powered"],
  },
  {
    id: 13,
    name: "HealthHarbor",
    description: "AI-based chronic disease health planner.",
    stage: "Seed",
    industry: "MentalHealth",
    location: "Nagpur, India",
    tags: ["Incubated", "Revenue-generating"],
  },
  {
    id: 14,
    name: "TutorTree",
    description: "P2P tutoring marketplace for niche skills.",
    stage: "Series A",
    industry: "EduMarketplace",
    location: "Patna, India",
    tags: ["Incubated", "Revenue-generating"],
  },
  {
    id: 15,
    name: "DataDock",
    description: "Data warehousing and real-time analysis made easy.",
    stage: "Seed",
    industry: "DataTech",
    location: "Bhopal, India",
    tags: ["Deep Tech", "AI-powered"],
  },
  {
    id: 16,
    name: "VibeCheck",
    description: "Sentiment-driven product review analyzer.",
    stage: "Series B",
    industry: "AI",
    location: "Thane, India",
    tags: ["Deep Tech", "AI-powered"],
  },
  {
    id: 17,
    name: "PayPilot",
    description: "No-code invoicing for small businesses.",
    stage: "Series B",
    industry: "SMBTools",
    location: "Ranchi, India",
    tags: ["Scalable", "Sustainable"],
  },
  {
    id: 18,
    name: "MindMend",
    description: "Mental health companion with journaling + AI support.",
    stage: "Seed",
    industry: "Wellness",
    location: "Vijayawada, India",
    tags: ["Incubated", "Revenue-generating"],
  },
  {
    id: 19,
    name: "AutoPulse",
    description: "Predictive car maintenance scheduling app.",
    stage: "Series B",
    industry: "AutoTech",
    location: "Raipur, India",
    tags: ["Incubated", "Revenue-generating"],
  },
  {
    id: 20,
    name: "FoodieFox",
    description: "Hyperlocal food delivery from home chefs.",
    stage: "Series A",
    industry: "FoodTech",
    location: "Chandigarh, India",
    tags: ["Deep Tech", "AI-powered"],
  },
  {
    id: 21,
    name: "TradeTrack",
    description: "SME export-import logistics simplifier.",
    stage: "Series B",
    industry: "Logistics",
    location: "Guwahati, India",
    tags: ["Mentor Needed", "Investor-friendly"],
  },
  {
    id: 22,
    name: "BrightBuild",
    description: "Construction site productivity tracker.",
    stage: "Series A",
    industry: "ConTech",
    location: "Mysuru, India",
    tags: ["Incubated", "Revenue-generating"],
  },
  {
    id: 23,
    name: "LegalLink",
    description: "Legal document automation for startups.",
    stage: "Seed",
    industry: "LegalTech",
    location: "Coimbatore, India",
    tags: ["Deep Tech", "AI-powered"],
  }
  
];

const ExploreStartups = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStage, setFilterStage] = useState("");
  const [filterIndustry, setFilterIndustry] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarked, setBookmarked] = useState([]);
  const [modalStartup, setModalStartup] = useState(null);

  const perPage = 6;

  // Filter logic
  const filteredStartups = startupsData
    .filter((startup) =>
      startup.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((s) => (filterStage ? s.stage === filterStage : true))
    .filter((s) => (filterIndustry ? s.industry === filterIndustry : true));

  const paginatedStartups = filteredStartups.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handleBookmark = (id) => {
    setBookmarked((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>🚀 Explore Startups</h1>

      {/* Filters */}
      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.search}
        />
        <select
          value={filterStage}
          onChange={(e) => setFilterStage(e.target.value)}
          style={styles.select}
        >
          <option value="">All Stages</option>
          <option>Pre-Seed</option>
          <option>Seed</option>
          <option>Series A</option>
        </select>
        <select
          value={filterIndustry}
          onChange={(e) => setFilterIndustry(e.target.value)}
          style={styles.select}
        >
          <option value="">All Industries</option>
          <option>AgriTech</option>
          <option>EdTech</option>
          <option>HealthTech</option>
        </select>
      </div>

      {/* Cards */}
      <div style={styles.grid}>
        {paginatedStartups.length === 0 ? (
          <p style={{ textAlign: "center", color: "#555" }}>No startups found.</p>
        ) : (
          paginatedStartups.map((startup) => (
            <div key={startup.id} style={styles.card}>
              <h2 style={styles.title}>{startup.name}</h2>
              <p style={styles.description}>{startup.description}</p>
              <p style={styles.meta}><strong>Industry:</strong> {startup.industry}</p>
              <p style={styles.meta}><strong>Stage:</strong> {startup.stage}</p>
              <p style={styles.meta}><strong>Location:</strong> {startup.location}</p>

              <div style={styles.tagContainer}>
                {startup.tags.map((tag, i) => (
                  <span key={i} style={styles.tag}>{tag}</span>
                ))}
              </div>

              <div style={styles.actions}>
                <button onClick={() => setModalStartup(startup)} style={styles.btnGold}>View Profile</button>
                <button style={styles.btnBlue}>Connect</button>
                <button style={styles.btnGreen}>Invest</button>
              </div>

              <button
                onClick={() => handleBookmark(startup.id)}
                style={{
                  marginTop: "0.5rem",
                  color: bookmarked.includes(startup.id) ? "gold" : "#888",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.9rem"
                }}
              >
                {bookmarked.includes(startup.id) ? "★ Bookmarked" : "☆ Bookmark"}
              </button>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div style={styles.pagination}>
        {Array.from({ length: Math.ceil(filteredStartups.length / perPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            style={{
              ...styles.pageBtn,
              backgroundColor: currentPage === i + 1 ? "#2b6cb0" : "#eee",
              color: currentPage === i + 1 ? "#fff" : "#333"
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modal */}
      {modalStartup && (
        <div style={styles.modalOverlay} onClick={() => setModalStartup(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2>{modalStartup.name}</h2>
            <p>{modalStartup.description}</p>
            <p><strong>Industry:</strong> {modalStartup.industry}</p>
            <p><strong>Stage:</strong> {modalStartup.stage}</p>
            <p><strong>Location:</strong> {modalStartup.location}</p>
            <div style={styles.tagContainer}>
              {modalStartup.tags.map((tag, i) => (
                <span key={i} style={styles.tag}>{tag}</span>
              ))}
            </div>
            <button onClick={() => setModalStartup(null)} style={styles.btnClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const styles = {
  page: {
    padding: "2rem",
    backgroundColor: "#f4faff",
    minHeight: "100vh",
    fontFamily: "sans-serif",
  },
  heading: {
    textAlign: "center",
    fontSize: "2rem",
    color: "#2b6cb0",
    marginBottom: "1rem",
  },
  filters: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    justifyContent: "center",
    marginBottom: "2rem",
  },
  search: {
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  select: {
    padding: "0.5rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1.5rem",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "1.5rem",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    transition: "0.3s",
  },
  title: {
    color: "#2b6cb0",
  },
  description: {
    fontSize: "0.95rem",
    color: "#444",
    marginBottom: "0.8rem",
  },
  meta: {
    fontSize: "0.85rem",
    marginBottom: "0.3rem",
    color: "#555",
  },
  tagContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.4rem",
    marginTop: "0.5rem",
  },
  tag: {
    backgroundColor: "#e2f0fb",
    color: "#2b6cb0",
    padding: "0.3rem 0.6rem",
    borderRadius: "16px",
    fontSize: "0.75rem",
  },
  actions: {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "space-between",
  },
  btnBlue: {
    backgroundColor: "#2b6cb0",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    cursor: "pointer",
  },
  btnGreen: {
    backgroundColor: "#38a169",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    cursor: "pointer",
  },
  btnGold: {
    backgroundColor: "#d69e2e",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    cursor: "pointer",
  },
  pagination: {
    marginTop: "2rem",
    textAlign: "center",
  },
  pageBtn: {
    margin: "0 0.3rem",
    padding: "0.4rem 0.8rem",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "10px",
    width: "90%",
    maxWidth: "500px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  btnClose: {
    marginTop: "1rem",
    padding: "0.5rem 1.2rem",
    backgroundColor: "#2b6cb0",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default ExploreStartups;
