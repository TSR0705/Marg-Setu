import React, { useState, useEffect } from "react";


const mockInvestors = [
  {
    id: 1,
    name: "Alice Ventures",
    location: "New York",
    expertise: "FinTech",
    sector: "Finance",
    investmentRange: "50K-200K",
    image: "https://via.placeholder.com/200",
    bio: "Experienced fintech investor with a track record in startups.",
    calendly: "https://calendly.com/aliceventures"
  },
  {
    id: 2,
    name: "Bob Capital",
    location: "San Francisco",
    expertise: "AI & ML",
    sector: "Tech",
    investmentRange: "200K+",
    image: "https://via.placeholder.com/200",
    bio: "Investing in cutting-edge AI and ML innovations.",
    calendly: "https://calendly.com/bobcapital"
  },
  {
    id: 3,
    name: "CureFund",
    location: "Boston",
    expertise: "Healthcare",
    sector: "Healthcare",
    investmentRange: "0-50K",
    image: "https://via.placeholder.com/200",
    bio: "Passionate about health and wellness startups.",
    calendly: "https://calendly.com/curefund"
  },
];

const InvestorDirectory = () => {
  const [investors, setInvestors] = useState(mockInvestors);
  const [filtered, setFiltered] = useState(mockInvestors);
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("");
  const [investmentRange, setInvestmentRange] = useState("");
  const [location, setLocation] = useState("");
  const [stage, setStage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalInvestor, setModalInvestor] = useState(null);
  const [bookmarked, setBookmarked] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const investorsPerPage = 6;

  useEffect(() => {
    const timeout = setTimeout(() => {
      let results = investors;

      if (search) {
        results = results.filter((i) =>
          [i.name, i.location, i.expertise, i.sector]
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase())
        );
      }
      if (sector) results = results.filter((i) => i.sector === sector);
      if (investmentRange) results = results.filter((i) => i.investmentRange === investmentRange);
      if (location) results = results.filter((i) => i.location.toLowerCase().includes(location.toLowerCase()));
      if (stage) results = results.filter((i) => i.stagePreference === stage);

      setFiltered(results);
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, sector, investmentRange, location, stage]);

  const handleBookmark = (id) => {
    setBookmarked((prev) =>
      prev.includes(id) ? prev.filter((bid) => bid !== id) : [...prev, id]
    );
  };

  const indexOfLast = currentPage * investorsPerPage;
  const indexOfFirst = indexOfLast - investorsPerPage;
  const currentInvestors = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / investorsPerPage);

  const colors = {
    primaryBlue: "#0047AB",
    growthGreen: "#28a745",
    energeticGold: "#FFD700",
    lightBackground: darkMode ? "#121212" : "#f4f4f4",
    cardBackground: darkMode ? "#1e1e1e" : "#fff",
    text: darkMode ? "#fff" : "#000",
  };

  const styles = {
    body: {
      fontFamily: "Arial",
      backgroundColor: colors.lightBackground,
      color: colors.text,
      padding: "2rem",
      minHeight: "100vh",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    filters: {
      display: "flex",
      gap: "1rem",
      margin: "1.5rem 0",
      flexWrap: "wrap",
    },
    input: {
      padding: "0.5rem",
      fontSize: "1rem",
      borderRadius: "6px",
      border: `1px solid ${colors.primaryBlue}`,
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "1.5rem",
    },
    card: {
      backgroundColor: colors.cardBackground,
      padding: "1rem",
      borderRadius: "12px",
      boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
      transition: "transform 0.3s ease",
      position: "relative",
    },
    image: {
      width: "100%",
      height: "150px",
      objectFit: "cover",
      borderRadius: "8px",
    },
    bookmark: {
      position: "absolute",
      top: "10px",
      right: "10px",
      background: colors.energeticGold,
      border: "none",
      padding: "0.3rem 0.6rem",
      borderRadius: "8px",
      cursor: "pointer",
    },
    pagination: {
      marginTop: "2rem",
      textAlign: "center",
    },
    pageButton: {
      margin: "0 0.3rem",
      padding: "0.5rem 1rem",
      border: `1px solid ${colors.primaryBlue}`,
      backgroundColor: "transparent",
      color: colors.text,
      borderRadius: "6px",
      cursor: "pointer",
    },
    modal: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    },
    modalContent: {
      background: colors.cardBackground,
      color: colors.text,
      padding: "2rem",
      borderRadius: "10px",
      maxWidth: "600px",
      width: "90%",
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.header}>
        <h2>Investor Directory</h2>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Search by name, location, firm, sector"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={styles.input}
        />
        <select value={sector} onChange={(e) => setSector(e.target.value)} style={styles.input}>
          <option value="">All Sectors</option>
          <option value="Tech">Tech</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Finance">Finance</option>
        </select>
        <select value={investmentRange} onChange={(e) => setInvestmentRange(e.target.value)} style={styles.input}>
          <option value="">All Ranges</option>
          <option value="0-50K">$0 - $50K</option>
          <option value="50K-200K">$50K - $200K</option>
          <option value="200K+">$200K+</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>No investors found. Try expanding filters.</p>
      ) : (
        <div style={styles.grid}>
          {currentInvestors.map((inv) => (
            <div key={inv.id} style={styles.card} onClick={() => setModalInvestor(inv)}>
              <img src={inv.image} alt={inv.name} style={styles.image} />
              <h3>{inv.name}</h3>
              <p>{inv.location}</p>
              <p>{inv.expertise} | {inv.sector}</p>
              <p><strong>Range:</strong> {inv.investmentRange}</p>
              <button
                style={styles.bookmark}
                onClick={(e) => {
                  e.stopPropagation();
                  handleBookmark(inv.id);
                }}
              >
                {bookmarked.includes(inv.id) ? "🔖" : "⭐"}
              </button>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div style={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                ...styles.pageButton,
                backgroundColor: currentPage === i + 1 ? colors.primaryBlue : "transparent",
                color: currentPage === i + 1 ? "#fff" : colors.text,
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {modalInvestor && (
        <div style={styles.modal} onClick={() => setModalInvestor(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2>{modalInvestor.name}</h2>
            <img src={modalInvestor.image} alt={modalInvestor.name} style={styles.image} />
            <p><strong>Location:</strong> {modalInvestor.location}</p>
            <p><strong>Expertise:</strong> {modalInvestor.expertise}</p>
            <p><strong>Sector:</strong> {modalInvestor.sector}</p>
            <p><strong>Range:</strong> {modalInvestor.investmentRange}</p>
            <p><strong>Bio:</strong> {modalInvestor.bio}</p>
            <div style={{ marginTop: "1rem" }}>
              <a
                href={modalInvestor.calendly}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: colors.energeticGold,
                  color: "black",
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  textDecoration: "none",
                }}
              >
                📅 Book Meeting
              </a>
              <button
                style={{ marginLeft: "1rem", backgroundColor: colors.primaryBlue, color: "white", border: "none", padding: "0.5rem 1rem", borderRadius: "6px" }}
              >
                🔔 Follow
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ marginTop: "3rem" }}>
        <h3>📂 Bookmarked Investors</h3>
        {bookmarked.length === 0 ? (
          <p>No investors bookmarked yet.</p>
        ) : (
          <ul>
            {bookmarked.map((id) => {
              const inv = investors.find((i) => i.id === id);
              return <li key={id}>{inv.name} – {inv.location}</li>;
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default InvestorDirectory;
