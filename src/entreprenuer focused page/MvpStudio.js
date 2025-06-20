import React, { useState, useEffect } from "react";

const MvpStudio = () => {
  const [mvpData, setMvpData] = useState({
    userFlows: "",
    features: "",
    techStack: "",
    wireframeNotes: "",
    devPlan: ""
  });

  useEffect(() => {
    const saved = localStorage.getItem("mvpStudioDraft");
    if (saved) setMvpData(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("mvpStudioDraft", JSON.stringify(mvpData));
  }, [mvpData]);

  const handleChange = (field) => (e) => {
    setMvpData({ ...mvpData, [field]: e.target.value });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🚀 MVP Studio</h1>
      <p style={styles.subtitle}>Turn your startup idea into a Minimum Viable Product.</p>

      <div style={styles.card}>
        <label style={styles.label}>User Flows</label>
        <textarea
          style={styles.textarea}
          value={mvpData.userFlows}
          onChange={handleChange("userFlows")}
          placeholder="Describe core user journeys..."
        />
      </div>

      <div style={styles.card}>
        <label style={styles.label}>Feature Prioritization</label>
        <textarea
          style={styles.textarea}
          value={mvpData.features}
          onChange={handleChange("features")}
          placeholder="List features by priority..."
        />
      </div>

      <div style={styles.card}>
        <label style={styles.label}>Tech Stack Suggestions</label>
        <input
          style={styles.input}
          type="text"
          value={mvpData.techStack}
          onChange={handleChange("techStack")}
          placeholder="React, Node.js, Firebase, etc."
        />
      </div>

      <div style={styles.card}>
        <label style={styles.label}>Wireframe Notes / Upload URL</label>
        <input
          style={styles.input}
          type="text"
          value={mvpData.wireframeNotes}
          onChange={handleChange("wireframeNotes")}
          placeholder="Figma/Sketch link or notes..."
        />
      </div>

      <div style={styles.card}>
        <label style={styles.label}>Development Plan</label>
        <textarea
          style={styles.textarea}
          value={mvpData.devPlan}
          onChange={handleChange("devPlan")}
          placeholder="High-level steps and timeline..."
        />
      </div>

      <div style={styles.footer}>
        <p>✅ Auto-saving to your browser as you type.</p>
      </div>
    </div>
  );
};

// Inline styles (vanilla CSS-in-JS)
const styles = {
  container: {
    padding: "40px",
    maxWidth: "900px",
    margin: "0 auto",
    fontFamily: "Segoe UI, sans-serif"
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "10px"
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#666",
    marginBottom: "30px"
  },
  card: {
    marginBottom: "25px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
  },
  label: {
    display: "block",
    marginBottom: "10px",
    fontWeight: "bold"
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "6px"
  },
  textarea: {
    width: "100%",
    height: "120px",
    padding: "10px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "6px",
    resize: "vertical"
  },
  footer: {
    marginTop: "40px",
    textAlign: "center",
    color: "#777"
  }
};

export default MvpStudio;
