// InvestorDashboard.js

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tabs,
  Tab,
  Paper,
  Button,
  Tooltip,
  TextField,
  Divider,
  Chip,
  Switch
} from '@mui/material';
import {
  Dashboard,
  AccountBalanceWallet,
  Folder,
  Settings,
  Business,
  Assessment,
  Notifications,
  Search,
  Star,
  Favorite
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as ChartTooltip,
  ResponsiveContainer
} from 'recharts';
import { AiOutlineDownload, AiOutlineFileSearch } from 'react-icons/ai';

const drawerWidth = 260;
const COLORS = ['#A66DD4', '#60A5FA', '#F472B6', '#34D399', '#FBBF24', '#FB7185'];

const InvestorDashboard = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [startupScores, setStartupScores] = useState({});
  const [shortlisted, setShortlisted] = useState({});
  const [notifications, setNotifications] = useState({});
  const [vaultFiles, setVaultFiles] = useState([
    "PitchDeck.pdf",
    "BusinessPlan.docx"
  ]);

  useEffect(() => {
    document.body.style.background = darkMode ? '#111' : '#fafafa';
  }, [darkMode]);

  const handleScoreChange = (id, score) => {
    setStartupScores({ ...startupScores, [id]: score });
  };

  const toggleShortlist = (id) => {
    setShortlisted({ ...shortlisted, [id]: !shortlisted[id] });
  };

  const toggleNotification = (id) => {
    setNotifications({ ...notifications, [id]: !notifications[id] });
  };

  const handleDownload = (file) => alert(`Downloading ${file}`);
  const handleDelete = (fileToDelete) =>
    setVaultFiles((f) => f.filter((fName) => fName !== fileToDelete));

  const chartData = [
    { name: 'Jan', deals: 4 },
    { name: 'Feb', deals: 7 },
    { name: 'Mar', deals: 5 },
    { name: 'Apr', deals: 9 },
    { name: 'May', deals: 6 },
  ];

  const portfolioData = [
    { name: 'Tech', value: 40 },
    { name: 'Health', value: 25 },
    { name: 'Fintech', value: 15 },
    { name: 'Edtech', value: 10 },
    { name: 'Others', value: 10 },
  ];

  const startups = [
    { id: '1', name: 'AgroAI', stage: 'Seed', description: 'AI-powered agri-platform for precision farming.' },
    { id: '2', name: 'FinMate', stage: 'Series A', description: 'Personal finance SaaS for Gen Z.' },
    { id: '3', name: 'MediLink', stage: 'Pre-Seed', description: 'Decentralized health records on blockchain.' },
  ];

  return (
    <Box sx={{ display: 'flex', bgcolor: darkMode ? '#111' : '#fafafa', color: darkMode ? '#eee' : '#111', minHeight: '100vh' }}>
      <CssBaseline />

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#1e1b4b',
            color: '#fff'
          }
        }}
      >
        <Toolbar />
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Investor Panel</Typography>
          <List>
            {[
              { text: 'Dashboard Home', icon: <Dashboard /> },
              { text: 'Startup Pitches', icon: <Business /> },
              { text: 'Deal Flow Tracker', icon: <Assessment /> },
              { text: 'Portfolio', icon: <AccountBalanceWallet /> },
              { text: 'Investor Profile', icon: <Avatar /> },
              { text: 'Documents Vault', icon: <Folder /> },
              { text: 'AI Diligence', icon: <AiOutlineFileSearch size={22} /> },
              { text: 'Settings', icon: <Settings /> },
            ].map((item, idx) => (
              <ListItem
                button
                key={item.text}
                selected={tabIndex === idx}
                onClick={() => setTabIndex(idx)}
                sx={{
                  bgcolor: tabIndex === idx ? 'rgba(196,181,253,0.2)' : 'transparent'
                }}
              >
                <ListItemIcon sx={{ color: '#c4b5fd' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: `${drawerWidth}px` }}>
        <AppBar position="fixed" sx={{ ml: `${drawerWidth}px`, width: `calc(100% - ${drawerWidth}px)`, bgcolor: '#4f46e5' }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>Investor Dashboard</Typography>
            <Tooltip title="Toggle Dark Mode">
              <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
            </Tooltip>
            <IconButton color="inherit"><Search /></IconButton>
            <IconButton color="inherit"><Notifications /></IconButton>
            <Avatar sx={{ ml: 1, bgcolor: '#a855f7' }}>I</Avatar>
          </Toolbar>
        </AppBar>

        <Toolbar />

        {/* Metrics */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
          {[
            { label: 'Startups Reviewed', value: 48 },
            { label: 'Active Deals', value: 9 },
            { label: 'Investment Value', value: '₹3.2 Cr' },
            { label: 'Avg Time to Close', value: '21 Days' },
            { label: 'Portfolio Return', value: '18.4%' },
            { label: 'Pending Diligence', value: 4 },
          ].map((card, idx) => (
            <Paper key={idx} sx={{ p: 2, flex: '1 1 200px', borderLeft: `5px solid ${COLORS[idx % COLORS.length]}`, boxShadow: 3 }}>
              <Typography variant="subtitle2" color="text.secondary">{card.label}</Typography>
              <Typography variant="h6">{card.value}</Typography>
            </Paper>
          ))}
        </Box>

        {/* Tabs */}
        <Tabs value={tabIndex} onChange={(e, v) => setTabIndex(v)} sx={{ mt: 3 }}>
          <Tab label="Deal Flow" />
          <Tab label="Portfolio Insights" />
          <Tab label="Startups" />
          <Tab label="Documents" />
          <Tab label="AI Insights" />
        </Tabs>

        {/* Tab Panels */}
        {tabIndex === 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Deal Flow Over Time</Typography>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip />
                <Line type="monotone" dataKey="deals" stroke="#4f46e5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
            <Button startIcon={<AiOutlineDownload />} sx={{ mt: 1 }}>Download Chart</Button>
          </Box>
        )}

        {tabIndex === 1 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Portfolio Diversification</Typography>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={portfolioData} dataKey="value" nameKey="name" outerRadius={80} label>
                  {portfolioData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Box>
        )}

        {tabIndex === 2 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Startup Pitches</Typography>
            <Divider sx={{ my: 2 }} />
            {startups.map((startup) => (
              <Paper key={startup.id} sx={{ p: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h6">{startup.name}</Typography>
                    <Chip label={startup.stage} size="small" color="primary" sx={{ mb: 1 }} />
                    <Typography>{startup.description}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Tooltip title="Toggle Notification">
                      <IconButton onClick={() => toggleNotification(startup.id)}>
                        <Notifications color={notifications[startup.id] ? 'primary' : 'disabled'} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Shortlist">
                      <IconButton onClick={() => toggleShortlist(startup.id)}>
                        <Favorite color={shortlisted[startup.id] ? 'error' : 'disabled'} />
                      </IconButton>
                    </Tooltip>
                    <TextField
                      type="number"
                      label="Score (1-10)"
                      size="small"
                      value={startupScores[startup.id] || ''}
                      onChange={(e) => handleScoreChange(startup.id, e.target.value)}
                    />
                    <Button size="small" variant="outlined">View Pitch</Button>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Box>
        )}

        {tabIndex === 3 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Documents Vault</Typography>
            <Paper sx={{ p: 2, mt: 2 }}>
              <Typography>Pitch Decks, Term Sheets, NDAs and more. Upload or Download files here.</Typography>
              <Button variant="outlined" sx={{ mt: 1 }}>Upload Document</Button>
            </Paper>
          </Box>
        )}

        {tabIndex === 4 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">AI Diligence Insights</Typography>
            <Paper sx={{ p: 2, mt: 2 }}>
              <Typography variant="body1">AgroAI: Strong traction, but founder experience low.</Typography>
              <Typography variant="body1">FinMate: High burn rate; consider conditional funding.</Typography>
              <Typography variant="body1">MediLink: Niche space, but tech is strong; recommended for mentorship.</Typography>
            </Paper>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default InvestorDashboard;
