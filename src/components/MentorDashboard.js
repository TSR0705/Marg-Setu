// MentorDashboard.js

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
  FiCalendar,
  FiClock,
  FiFileText,
  FiSettings,
  FiSun,
  FiMoon,
  FiDownload,
  FiTrash2,
} from "react-icons/fi";
import { FaChalkboardTeacher, FaBookReader } from "react-icons/fa";

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

const MentorDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [mentees, setMentees] = useState(["Riya Sharma", "Dev Patel", "Ananya Singh"]);
  const [sessions] = useState([
    { date: "2025-04-10", time: "4:00 PM", mentee: "Riya Sharma" },
    { date: "2025-04-12", time: "2:00 PM", mentee: "Dev Patel" },
  ]);
  const [resources, setResources] = useState(["MentorGuide.pdf", "StartupChecklist.docx"]);
  const [profile, setProfile] = useState({
    name: "Neha Rao",
    email: "neha@mentorhub.com",
    bio: "Startup Coach & Growth Strategist",
  });

  useEffect(() => {
    document.body.style.background = darkMode ? "#121212" : "#f9f9f9";
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((m) => !m);

  const metrics = [
    { title: "Mentees", value: mentees.length.toString(), icon: <FiUsers />, color: "#6A5ACD" },
    { title: "Sessions Held", value: "18", icon: <FiCalendar />, color: "#2E8B57" },
    { title: "Avg Session Time", value: "42 mins", icon: <FiClock />, color: "#DAA520" },
    { title: "Resources Shared", value: resources.length.toString(), icon: <FiFileText />, color: "#DC143C" },
  ];

  const sidebarItems = [
    { label: "Dashboard", icon: <FaChalkboardTeacher /> },
    { label: "Sessions", icon: <FiCalendar /> },
    { label: "Mentees", icon: <FiUsers /> },
    { label: "Resources", icon: <FiFileText /> },
    { label: "Settings", icon: <FiSettings /> },
  ];

  const lineData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [{
      label: "Sessions",
      data: [2, 5, 6, 5],
      backgroundColor: "rgba(106, 90, 205, 0.2)",
      borderColor: "#6A5ACD",
      fill: true,
      tension: 0.4,
    }],
  };

  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [{
      label: "Mentees Helped",
      data: [3, 5, 7, 6],
      backgroundColor: "#2E8B57",
    }],
  };

  const pieData = {
    labels: ["Product", "Pitching", "Marketing"],
    datasets: [{
      label: "Mentorship Focus",
      data: [40, 30, 30],
      backgroundColor: ["#DAA520", "#DC143C", "#6A5ACD"],
    }],
  };

  const contentStyles = {
    padding: "20px 30px",
    color: darkMode ? "#eee" : "#222",
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Segoe UI, sans-serif" }}>
      {/* Sidebar */}
      <div style={{
        width: "240px",
        background: darkMode ? "#1f1f1f" : "#fff",
        padding: "20px",
        borderRight: darkMode ? "1px solid #333" : "1px solid #ddd"
      }}>
        <h2 style={{ color: "#6A5ACD", marginBottom: "30px" }}>Mentor Panel</h2>
        {sidebarItems.map((item) => (
          <div
            key={item.label}
            onClick={() => setActiveTab(item.label)}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
              cursor: "pointer",
              background: activeTab === item.label ? "#6A5ACD" : "transparent",
              color: activeTab === item.label ? "#fff" : darkMode ? "#ccc" : "#333"
            }}
          >
            <span style={{ marginRight: "10px" }}>{item.icon}</span>
            {item.label}
          </div>
        ))}
        <div onClick={toggleTheme} style={{ marginTop: "30px", cursor: "pointer", display: "flex", alignItems: "center", color: darkMode ? "#aaa" : "#444" }}>
          {darkMode ? <FiSun /> : <FiMoon />}
          <span style={{ marginLeft: "10px" }}>{darkMode ? "Light Mode" : "Dark Mode"}</span>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflowY: "auto", background: darkMode ? "#181818" : "#f9f9f9" }}>
        <motion.div style={contentStyles} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 style={{ marginBottom: "20px" }}>{activeTab}</h2>

          {activeTab === "Dashboard" && (
            <>
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "30px" }}>
                {metrics.map((metric) => (
                  <div key={metric.title} style={{
                    flex: "1 1 200px",
                    background: darkMode ? "#262626" : "#fff",
                    padding: "20px",
                    borderRadius: "12px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    color: darkMode ? "#eee" : "#333"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", color: metric.color }}>
                      {metric.icon}
                      <span style={{ marginLeft: "10px", fontWeight: "bold" }}>{metric.title}</span>
                    </div>
                    <h3 style={{ fontSize: "1.5em", marginTop: "10px" }}>{metric.value}</h3>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                <div style={{ flex: 1, background: "#fff", padding: "20px", borderRadius: "12px", background: darkMode ? "#262626" : "#fff" }}>
                  <Line data={lineData} />
                </div>
                <div style={{ flex: 1, background: "#fff", padding: "20px", borderRadius: "12px", background: darkMode ? "#262626" : "#fff" }}>
                  <Bar data={barData} />
                </div>
                <div style={{ flex: 1, background: "#fff", padding: "20px", borderRadius: "12px", background: darkMode ? "#262626" : "#fff" }}>
                  <Pie data={pieData} />
                </div>
              </div>
            </>
          )}

          {activeTab === "Sessions" && (
            <div>
              {sessions.map((s, i) => (
                <div key={i} style={{
                  marginBottom: "15px",
                  padding: "15px",
                  background: darkMode ? "#2c2c2c" : "#fff",
                  borderRadius: "10px"
                }}>
                  <strong>{s.date}</strong> at {s.time} with {s.mentee}
                </div>
              ))}
            </div>
          )}

          {activeTab === "Mentees" && (
            <div>
              {mentees.map((m, i) => (
                <div key={i} style={{
                  marginBottom: "10px",
                  padding: "12px",
                  background: darkMode ? "#2c2c2c" : "#fff",
                  borderRadius: "10px"
                }}>
                  {m}
                </div>
              ))}
            </div>
          )}

          {activeTab === "Resources" && (
            <div>
              {resources.map((file, i) => (
                <div key={i} style={{
                  background: darkMode ? "#2c2c2c" : "#fff",
                  padding: "12px",
                  marginBottom: "10px",
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "space-between"
                }}>
                  <span>{file}</span>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <FiDownload style={{ cursor: "pointer" }} />
                    <FiTrash2 style={{ cursor: "pointer", color: "#DC143C" }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Settings" && (
            <div style={{ maxWidth: "400px" }}>
              <label>Name</label>
              <input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} style={{ width: "100%", padding: "10px", marginBottom: "10px" }} />
              <label>Email</label>
              <input value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} style={{ width: "100%", padding: "10px", marginBottom: "10px" }} />
              <label>Bio</label>
              <textarea value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} style={{ width: "100%", padding: "10px" }} />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MentorDashboard;
