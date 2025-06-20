import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from "uuid";
import emailjs from "emailjs-com";

const mentors = [
  {
    id: 1,
    name: "Anita Sharma",
    expertise: "Startup Strategy",
    location: "Bangalore, India",
    availability: "Mon-Fri",
    rating: 4.8,
    calendlyLink: "https://calendly.com/anita-sharma/mentorship",
    email: "anita@example.com",
    bio: "10+ years mentoring early-stage startups. Ex-founder, now angel investor.",
    tags: ["Strategy", "Growth", "Seed Stage"],
    testimonials: ["Helped us pivot and secure seed funding!", "Her insights changed our go-to-market strategy."]
  },
  {
    id: 2,
    name: "Rahul Verma",
    expertise: "Product Development",
    location: "Delhi, India",
    availability: "Weekends",
    rating: 4.7,
    calendlyLink: "https://calendly.com/rahul-verma/product-chat",
    email: "rahul@example.com",
    bio: "Ex-Google Product Manager, loves helping product-first startups.",
    tags: ["MVP", "UX", "Tech"],
    testimonials: ["Great advice on MVP building.", "Simplified our tech stack decisions."]
  },
  {
    id: 3,
    name: "Sneha Kapoor",
    expertise: "Fundraising",
    location: "Mumbai, India",
    availability: "Flexible",
    rating: 4.9,
    calendlyLink: "https://calendly.com/sneha-kapoor/fundraising-call",
    email: "sneha@example.com",
    bio: "VC partner and pitch coach. Helped 50+ startups raise capital.",
    tags: ["Pitching", "Investor Connect", "Valuation"],
    testimonials: ["We raised $500k after her sessions!", "Invaluable investor insights."]
  },

  {
    id: 4,
    name: "Karan Mehta",
   expertise: "Marketing",
    location: "Ahmedabad, India",
    availability: "Weekends",
    rating: 4.6,
    calendlyLink: "https://calendly.com/karan-mehta/mentorship",
    email: "karanmehta@example.com",
    bio: "Ex-founder with 8 years of experience.",
   tags: ["AI", "ML"],
    testimonials: ["Incredible help in our funding round.", "Helped scale to 100k users."]
  },
  {
    id: 5,
   name: "Priya Nair",
   expertise: "Finance",
    location: "Ahmedabad, India",
    availability: "Weekends",
    rating: 4.9,
    calendlyLink: "https://calendly.com/priya-nair/mentorship",
    email: "priyanair@example.com",
    bio: "Ex-founder with 9 years of experience.",
   tags: ["Fundraising", "Pitch"],
    testimonials: ["Real-world experience that shows.", "Amazing mentor and motivator."]
  },
  {
    id: 6,
   name: "Amit Joshi",
   expertise: "Team Building",
    location: "Mumbai, India",
    availability: "Mon-Fri",
    rating: 4.7,
    calendlyLink: "https://calendly.com/amit-joshi/mentorship",
    email: "amitjoshi@example.com",
    bio: "Product leader with 14 years of experience.",
   tags: ["Hiring", "Culture"],
    testimonials: ["Amazing mentor and motivator.", "Incredible help in our funding round."]
  },
   

  
    {
      id: 7,
     name: "Siddharth Menon",
     expertise: "Marketing",
      location: "Ahmedabad, India",
      availability: "Mon-Fri",
      rating: 4.5,
      calendlyLink: "https://calendly.com/siddharth-menon/mentorship",
      email: "siddharthmenon@example.com",
      bio: "Startup advisor with 7 years of experience.",
     tags: ["Hiring", "Culture"],
      testimonials: ["Incredible help in our funding round.", "Helped us save months of work."]
    },
    {
      id: 8,
     name: "Tanya Malhotra",
     expertise: "Scaling",
      location: "Ahmedabad, India",
      availability: "Weekends",
      rating: 4.8,
      calendlyLink: "https://calendly.com/tanya-malhotra/mentorship",
      email: "tanyamalhotra@example.com",
      bio: "Product leader with 14 years of experience.",
     tags: ["Scaling", "Growth"],
      testimonials: ["Helped us save months of work.", "Incredible help in our funding round."]
    },
    {
      id: 9,
     name: "Manish Patel",
     expertise: "Marketing",
      location: "Pune, India",
      availability: "Flexible",
      rating: 4.7,
      calendlyLink: "https://calendly.com/manish-patel/mentorship",
      email: "manishpatel@example.com",
      bio: "Ex-founder with 12 years of experience.",
     tags: ["Finance", "Revenue"],
      testimonials: ["Helped scale to 100k users.", "Helped us save months of work."]
    },
    {
      id: 10,
     name: "Swati Rao",
     expertise: "Tech Strategy",
      location: "Ahmedabad, India",
      availability: "Flexible",
      rating: 4.6,
      calendlyLink: "https://calendly.com/swati-rao/mentorship",
      email: "swatirao@example.com",
      bio: "Startup advisor with 12 years of experience.",
     tags: ["Product", "UX"],
      testimonials: ["Amazing mentor and motivator.", "Incredible help in our funding round."]
    },
    {
      id: 11,
     name: "Vikas Shah",
     expertise: "Finance",
      location: "Hyderabad, India",
      availability: "Flexible",
      rating: 4.8,
      calendlyLink: "https://calendly.com/vikas-shah/mentorship",
      email: "vikasshah@example.com",
      bio: "Startup advisor with 11 years of experience.",
     tags: ["Product", "UX"],
      testimonials: ["Real-world experience that shows.", "Incredible help in our funding round."]
    },
    {
      id: 12,
     name: "Isha Bhatia",
     expertise: "Marketing",
      location: "Delhi, India",
      availability: "Mon-Fri",
      rating: 4.6,
      calendlyLink: "https://calendly.com/isha-bhatia/mentorship",
      email: "ishabhatia@example.com",
      bio: "Startup advisor with 6 years of experience.",
     tags: ["Hiring", "Culture"],
      testimonials: ["Real-world experience that shows.", "Incredible help in our funding round."]
    },
    {
      id: 13,
     name: "Deepak Kumar",
     expertise: "Tech Strategy",
      location: "Ahmedabad, India",
      availability: "Flexible",
      rating: 4.9,
      calendlyLink: "https://calendly.com/deepak-kumar/mentorship",
      email: "deepakkumar@example.com",
      bio: "Startup advisor with 13 years of experience.",
     tags: ["Hiring", "Culture"],
      testimonials: ["Incredible help in our funding round.", "Helped scale to 100k users."]
    },
    {
      id: 14,
     name: "Anjali Desai",
     expertise: "Finance",
      location: "Chennai, India",
      availability: "Mon-Fri",
      rating: 4.8,
      calendlyLink: "https://calendly.com/anjali-desai/mentorship",
      email: "anjalidesai@example.com",
      bio: "Product leader with 11 years of experience.",
     tags: ["Product", "UX"],
      testimonials: ["Real-world experience that shows.", "Amazing mentor and motivator."]
    },
    {
      id: 15,
     name: "Harsh Vardhan",
     expertise: "Marketing",
      location: "Bangalore, India",
      availability: "Flexible",
      rating: 4.6,
      calendlyLink: "https://calendly.com/harsh-vardhan/mentorship",
      email: "harshvardhan@example.com",
      bio: "Startup advisor with 6 years of experience.",
     tags: ["Product", "UX"],
      testimonials: ["Real-world experience that shows.", "Their advice shaped our business model."]
    },
    {
      id: 16,
     name: "Meera Iyer",
     expertise: "Product-Market Fit",
      location: "Hyderabad, India",
      availability: "Mon-Fri",
      rating: 4.8,
      calendlyLink: "https://calendly.com/meera-iyer/mentorship",
      email: "meeraiyer@example.com",
      bio: "Product leader with 15 years of experience.",
     tags: ["Scaling", "Growth"],
      testimonials: ["Real-world experience that shows.", "Amazing mentor and motivator."]
    },
    {
      id: 17,
     name: "Rajat Singh",
     expertise: "Product-Market Fit",
      location: "Bangalore, India",
      availability: "Flexible",
      rating: 4.9,
      calendlyLink: "https://calendly.com/rajat-singh/mentorship",
      email: "rajatsingh@example.com",
      bio: "Product leader with 14 years of experience.",
     tags: ["Fundraising", "Pitch"],
      testimonials: ["Real-world experience that shows.", "Their advice shaped our business model."]
    },
    {
      id: 18,
     name: "Preeti Kaur",
     expertise: "Finance",
      location: "Chennai, India",
      availability: "Flexible",
      rating: 4.7,
      calendlyLink: "https://calendly.com/preeti-kaur/mentorship",
      email: "preetikaur@example.com",
      bio: "Startup advisor with 8 years of experience.",
     tags: ["Scaling", "Growth"],
      testimonials: ["Real-world experience that shows.", "Helped us save months of work."]
    },
    {
      id: 19,
     name: "Varun Khanna",
     expertise: "Marketing",
      location: "Ahmedabad, India",
      availability: "Mon-Fri",
      rating: 4.9,
      calendlyLink: "https://calendly.com/varun-khanna/mentorship",
      email: "varunkhanna@example.com",
      bio: "Ex-founder with 15 years of experience.",
     tags: ["Fundraising", "Pitch"],
      testimonials: ["Helped scale to 100k users.", "Incredible help in our funding round."]
    },
    {
      id: 20,
     name: "Shreya Sharma",
     expertise: "Team Building",
      location: "Hyderabad, India",
      availability: "Flexible",
      rating: 4.8,
      calendlyLink: "https://calendly.com/shreya-sharma/mentorship",
      email: "shreyasharma@example.com",
      bio: "Startup advisor with 8 years of experience.",
     tags: ["Finance", "Revenue"],
      testimonials: ["Amazing mentor and motivator.", "Real-world experience that shows."]
    }
  ]
  
  


const Mentorship = () => {
  const [search, setSearch] = useState("");
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [scheduledSessions, setScheduledSessions] = useState([]);
  const [topMatches, setTopMatches] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [darkMode, setDarkMode] = useState(false);


  
  const filteredMentors = mentors.filter((mentor) =>
    mentor.name.toLowerCase().includes(search.toLowerCase()) ||
    mentor.expertise.toLowerCase().includes(search.toLowerCase()) ||
    mentor.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleSchedule = (mentor) => {
    setSelectedMentor(mentor);
  };

  const confirmSchedule = () => {
    const newSession = {
      id: uuidv4(),
      mentor: selectedMentor.name,
      time: startDate.toString(),
      feedback
    };
    setScheduledSessions([...scheduledSessions, newSession]);
    sendEmailConfirmation(selectedMentor);
    setFeedback("");
    setSelectedMentor(null);
    alert("✅ Session Scheduled!");
  };

  const sendEmailConfirmation = (mentor) => {
    const templateParams = {
      to_name: mentor.name,
      from_name: "Mentorship Platform",
      message: `A session has been booked with ${mentor.name} on ${startDate}`,
      user_email: mentor.email
    };
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams, "YOUR_USER_ID")
      .then(() => console.log("📬 Email sent successfully"))
      .catch((error) => console.error("❌ Email send error", error));
  };

  const handleChat = (mentor) => {
    alert(`💬 Starting chat with ${mentor.name}...`);
  };

  const handleVideoCall = (mentor) => {
    window.open(`https://meet.jit.si/${mentor.name.replace(/\s/g, '')}`, '_blank');
  };

  const openCalendly = (link) => {
    window.open(link, "_blank");
  };

  const runMatchmaking = () => {
    const sorted = [...mentors].sort((a, b) => b.rating - a.rating);
    setTopMatches(sorted.slice(0, 3));
  };

  return (
    <div style={{...styles.page, backgroundColor: darkMode ? '#1a202c' : '#f5faff', color: darkMode ? '#fff' : '#000'}}>
      <button onClick={toggleDarkMode} style={{ position: 'absolute', right: 20, top: 20 }}>🌓 Toggle Mode</button>

      <h1 style={styles.heading}>🤝 Mentorship Network</h1>

      <div style={styles.controls}>
        <input
          type="text"
          placeholder="Search by name, expertise or tag..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />
        <button onClick={runMatchmaking} style={styles.matchBtn}>🔮 Find Top Matches</button>
      </div>

      {topMatches.length > 0 && (
        <div style={{ marginBottom: "2rem" }}>
          <h3>✨ Top Mentor Matches:</h3>
          <ul>
            {topMatches.map((m) => (
              <li key={m.id}>{m.name} - ⭐ {m.rating}</li>
            ))}
          </ul>
        </div>
      )}

      <div style={styles.grid}>
        {filteredMentors.map((mentor) => (
          <div key={mentor.id} style={styles.card}>
            <h2 style={styles.name}>{mentor.name}</h2>
            <p><strong>Expertise:</strong> {mentor.expertise}</p>
            <p><strong>Location:</strong> {mentor.location}</p>
            <p><strong>Availability:</strong> {mentor.availability}</p>
            <p><strong>Rating:</strong> ⭐ {mentor.rating}</p>
            <p style={styles.bio}>{mentor.bio}</p>

            <div style={styles.tags}>
              {mentor.tags.map((tag, idx) => (
                <span key={idx} style={styles.tag}>{tag}</span>
              ))}
            </div>

            <div style={styles.actions}>
              <button onClick={() => handleChat(mentor)} style={styles.chatBtn}>💬 Chat</button>
              <button onClick={() => handleVideoCall(mentor)} style={styles.videoBtn}>📹 Video Call</button>
              <button onClick={() => handleSchedule(mentor)} style={styles.scheduleBtn}>📅 Schedule</button>
              <button onClick={() => openCalendly(mentor.calendlyLink)} style={styles.chatBtn}>🔗 Calendly</button>
            </div>

            <div style={styles.testimonialSection}>
              <strong>Testimonials:</strong>
              <ul>
                {mentor.testimonials.map((text, i) => (
                  <li key={i} style={styles.testimonial}>“{text}”</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {selectedMentor && (
        <div style={styles.schedulePopup}>
          <h2>Schedule with {selectedMentor.name}</h2>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} showTimeSelect dateFormat="Pp" />
          <textarea placeholder="Feedback or notes (optional)" value={feedback} onChange={(e) => setFeedback(e.target.value)} style={{ width: '100%', marginTop: '1rem', padding: '0.5rem' }} />
          <button onClick={confirmSchedule} style={styles.confirmBtn}>Confirm</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  page: { padding: "2rem", minHeight: "100vh", fontFamily: "sans-serif", transition: "all 0.3s ease" },
  heading: { textAlign: "center", color: "#2b6cb0", marginBottom: "1rem", fontSize: "2rem" },
  controls: { display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" },
  search: { padding: "0.6rem 1rem", borderRadius: "8px", border: "1px solid #ccc", width: "300px", fontSize: "1rem" },
  matchBtn: { backgroundColor: "#805ad5", color: "#fff", border: "none", borderRadius: "8px", padding: "0.6rem 1.2rem", cursor: "pointer", fontWeight: "bold" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" },
  card: { backgroundColor: "#fff", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.08)" },
  name: { color: "#2b6cb0", marginBottom: "0.3rem" },
  bio: { fontStyle: "italic", color: "#555", margin: "0.5rem 0" },
  tags: { marginTop: "0.5rem", display: "flex", flexWrap: "wrap", gap: "0.4rem" },
  tag: { backgroundColor: "#edf2f7", color: "#2b6cb0", padding: "0.3rem 0.6rem", borderRadius: "12px", fontSize: "0.75rem" },
  actions: { marginTop: "1rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" },
  chatBtn: { backgroundColor: "#3182ce", color: "#fff", border: "none", borderRadius: "6px", padding: "0.5rem", cursor: "pointer", flex: 1 },
  videoBtn: { backgroundColor: "#38a169", color: "#fff", border: "none", borderRadius: "6px", padding: "0.5rem", cursor: "pointer", flex: 1 },
  scheduleBtn: { backgroundColor: "#d69e2e", color: "#fff", border: "none", borderRadius: "6px", padding: "0.5rem", cursor: "pointer", flex: 1 },
  testimonialSection: { marginTop: "1rem", fontSize: "0.85rem", color: "#444" },
  testimonial: { marginTop: "0.3rem", paddingLeft: "1rem" },
  schedulePopup: { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "white", padding: "2rem", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.2)", zIndex: 999 },
  confirmBtn: { marginTop: "1rem", backgroundColor: "#3182ce", color: "#fff", padding: "0.5rem 1rem", borderRadius: "8px", border: "none", cursor: "pointer" }
};

export default Mentorship;
