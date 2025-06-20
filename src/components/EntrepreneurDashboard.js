import React, { useState, useEffect } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { motion } from "framer-motion";
import {
  FiUsers,
  FiDollarSign,
  FiTrendingUp,
  FiFileText,
  FiBookOpen,
  FiSettings,
  FiSun,
  FiMoon,
  FiTrash2,
  FiDownload,
} from "react-icons/fi";
import { FaChartLine, FaClipboardCheck } from "react-icons/fa";

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

const EntrepreneurDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [milestones] = useState([
    { text: "Launch MVP", status: "Pending" },
    { text: "Get 100 Users", status: "In Progress" },
    { text: "Pitch to Investors", status: "Done" },
  ]);
  const [vaultFiles, setVaultFiles] = useState([
    "PitchDeck.pdf",
    "BusinessPlan.docx",
  ]);

  useEffect(() => {
    document.body.style.background = darkMode ? "#121212" : "#f9f9f9";
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((m) => !m);

  const metrics = [
    { title: "Total Users", value: "4,230", icon: <FiUsers />, color: "#6A5ACD" },
    { title: "Monthly Revenue", value: "$18,700", icon: <FiDollarSign />, color: "#2E8B57" },
    { title: "Funding Progress", value: "74%", icon: <FiTrendingUp />, color: "#DAA520" },
    { title: "Files Uploaded", value: vaultFiles.length.toString(), icon: <FiFileText />, color: "#DC143C" },
  ];

  const lineData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [{
      label: "User Growth",
      data: [200, 500, 900, 1500],
      backgroundColor: "rgba(106, 90, 205, 0.2)",
      borderColor: "#6A5ACD",
      fill: true,
      tension: 0.4,
    }],
  };

  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [{ label: "Revenue", data: [3000, 5000, 8000, 12000], backgroundColor: "#2E8B57" }],
  };

  const pieData = {
    labels: ["Product Dev", "Marketing", "Ops"],
    datasets: [{
      label: "Spending",
      data: [45, 25, 30],
      backgroundColor: ["#DAA520", "#6A5ACD", "#DC143C"],
    }],
  };

  const contentStyles = {
    padding: "20px 30px",
    color: darkMode ? "#eee" : "#222",
  };

  const sidebarItems = [
    { label: "Dashboard", icon: <FaChartLine /> },
    { label: "Milestones", icon: <FaClipboardCheck /> },
    { label: "Documents", icon: <FiFileText /> },
    { label: "Learning", icon: <FiBookOpen /> },
    { label: "Settings", icon: <FiSettings /> },
  ];

  const handleDownload = (file) => alert(`Downloading ${file}`);
  const handleDelete = (fileToDelete) =>
    setVaultFiles((f) => f.filter((fName) => fName !== fileToDelete));

  const renderDashboard = () => (
    <>
      {/* Metrics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          ...contentStyles,
        }}
      >
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            style={{
              background: darkMode ? "#1e1e1e" : "#fff",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div style={{ fontSize: "24px", color: m.color }}>{m.icon}</div>
            <div style={{ fontWeight: "bold", fontSize: "18px" }}>{m.value}</div>
            <div style={{ color: "#888", fontSize: "14px" }}>{m.title}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          ...contentStyles,
        }}
      >
        <div
          style={{
            flex: 1,
            background: darkMode ? "#1e1e1e" : "#fff",
            padding: "20px",
            borderRadius: "12px",
            minWidth: "300px",
          }}
        >
          <div style={{ fontWeight: "600", marginBottom: "10px" }}>User Growth</div>
          <Line data={lineData} />
        </div>
        <div
          style={{
            flex: 1,
            background: darkMode ? "#1e1e1e" : "#fff",
            padding: "20px",
            borderRadius: "12px",
            minWidth: "300px",
          }}
        >
          <div style={{ fontWeight: "600", marginBottom: "10px" }}>Revenue</div>
          <Bar data={barData} />
        </div>
        <div
          style={{
            width: "300px",
            background: darkMode ? "#1e1e1e" : "#fff",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <div style={{ fontWeight: "600", marginBottom: "10px" }}>Spending Breakdown</div>
          <Pie data={pieData} />
        </div>
      </div>

      {/* AI Insight */}
      <div style={contentStyles}>
        <motion.div
          whileHover={{ scale: 1.01 }}
          style={{
            background: darkMode ? "#1e1e1e" : "#fff",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <div style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "10px" }}>
            📌 AI Insight
          </div>
          <div style={{ fontSize: "15px", color: darkMode ? "#ccc" : "#444" }}>
            “To improve your retention by 20%, consider simplifying your onboarding
            process and adding tutorial walkthroughs.”
          </div>
        </motion.div>
      </div>

      {/* Mentors & Vault */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          ...contentStyles,
        }}
      >
        <div
          style={{
            flex: 1,
            background: darkMode ? "#1e1e1e" : "#fff",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <div style={{ fontWeight: "600", marginBottom: "10px" }}>Your Mentors</div>
          {["Asha Verma", "Rohit Singh", "Meera Patel"].map((name, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                gap: "10px",
              }}
            >
              <img
                src={`https://i.pravatar.cc/40?img=${i + 10}`}
                alt="mentor"
                style={{ borderRadius: "50%" }}
              />
              <div>
                <div style={{ fontWeight: "500" }}>{name}</div>
                <div style={{ fontSize: "13px", color: "#777" }}>Product Advisor</div>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            flex: 1,
            background: darkMode ? "#1e1e1e" : "#fff",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <div style={{ fontWeight: "600", marginBottom: "10px" }}>Vault</div>
          {vaultFiles.map((file, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <div style={{ fontSize: "15px" }}>{file}</div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => handleDownload(file)}
                  style={{
                    background: "#eee",
                    padding: "5px 10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  <FiDownload />
                </button>
                <button
                  onClick={() => handleDelete(file)}
                  style={{
                    background: "#eee",
                    padding: "5px 10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
          {vaultFiles.length === 0 && <div style={{ color: "#aaa" }}>No files in vault.</div>}
        </div>
      </div>
    </>
  );

  const renderMilestones = () => (
    <div style={contentStyles}>
      📍 <strong>Milestones:</strong>
      <div style={{ marginTop: "10px" }}>
        {milestones.map((m, i) => (
          <div
            key={i}
            style={{
              background: darkMode ? "#1e1e1e" : "#fff",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "10px",
            }}
          >
            <strong>{m.text}</strong>
            <div style={{ fontSize: "14px", color: "#777" }}>{m.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
  const [files, setFiles] = useState([
    "PitchDeck.pdf",
    "BusinessPlan.docx"
  ]);
  const renderDocuments = () => (
    <div style={{ padding: "30px" }}>
      <h2>Documents</h2>
      {files.map((file, i) => (
        <div key={i} style={{ background: "#fff", padding: "15px", marginBottom: "10px", borderRadius: "10px", display: "flex", justifyContent: "space-between" }}>
          {file}
          <div style={{ display: "flex", gap: "10px" }}>
            <button><FiDownload /></button>
            <button onClick={() => setFiles(files.filter((_, idx) => idx !== i))}><FiTrash2 /></button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderLearning = () => (
    <div style={{ padding: "30px" }}>
      <h2>Learning Resources</h2>
      {["Idea Validation 101", "Pitching Mastery", "Funding Landscape"].map((title, i) => (
        <div key={i} style={{ background: "#fff", padding: "15px", borderRadius: "10px", marginBottom: "10px" }}>
          <strong>{title}</strong>
          <div style={{ fontSize: "14px", color: "#555" }}>Tag: {i === 0 ? "Beginner" : i === 1 ? "Intermediate" : "Advanced"}</div>
        </div>
      ))}
    </div>
  );

  const [profile, setProfile] = useState({
    name: "Aarav Mehta",
    email: "aarav@startup.com",
    bio: "Founder @ SaaSify"
  });

  const renderSettings = () => (
    <div style={{ padding: "30px" }}>
      <h2>Settings</h2>
      <div style={{ marginBottom: "20px" }}>
        <label>Name:</label>
        <input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} style={{ marginLeft: 10 }} />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label>Email:</label>
        <input value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} style={{ marginLeft: 10 }} />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label>Bio:</label>
        <textarea value={profile.bio} onChange={e => setProfile({ ...profile, bio: e.target.value })} style={{ marginLeft: 10, verticalAlign: "top" }} />
      </div>
      <button onClick={() => alert("Account deleted (simulated)")}>Delete Account</button>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return renderDashboard();
      case "Milestones":
        return renderMilestones();
      case "Documents":
        return renderDocuments();
      case "Learning":
        return renderLearning();
      case "Settings":
        return renderSettings();
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        background: darkMode ? "#121212" : "#f9f9f9",
        color: darkMode ? "#eee" : "#333",
      }}
    >
      {/* Sidebar (from Code 2) */}
      <div style={{ width: "240px", background: "#121212", color: "#fff", padding: "20px 0" }}>
        <div
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          🚀 Marg Setu
        </div>
        {sidebarItems.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setActiveTab(item.label)}
            style={{
              padding: "15px 30px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              color: activeTab === item.label ? "#fff" : "#ccc",
              background: activeTab === item.label ? "#333" : "transparent",
            }}
          >
            <span style={{ marginRight: "10px" }}>{item.icon}</span>
            {item.label}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1 }}>
        {/* Topbar */}
        <div
          style={{
            background: darkMode ? "#1e1e1e" : "#fff",
            padding: "20px 30px",
            borderBottom: "1px solid #ddd",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: "20px", fontWeight: "600" }}>{activeTab}</div>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            {darkMode ? (
              <FiSun style={{ fontSize: "20px", cursor: "pointer" }} onClick={toggleTheme} />
            ) : (
              <FiMoon style={{ fontSize: "20px", cursor: "pointer" }} onClick={toggleTheme} />
            )}
            <img
              src="https://i.pravatar.cc/40"
              alt="avatar"
              style={{ width: 40, height: 40, borderRadius: "50%" }}
            />
          </div>
        </div>

        {/* Section Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default EntrepreneurDashboard;
