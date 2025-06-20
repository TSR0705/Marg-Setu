import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// UI Components
import Home from './components/Home';
import { LoginPage, SignUpPage, ForgotPasswordPage } from './components/AuthPages';

import ExploreStartups from './components/ExploreStartups';


import InvestorDirectory from './components/InvestorDirectory';
import InvestorProfile from './components/InvestorProfile';

import InvestorDashboard from './components/InvestorDashboard';
import EntrepreneurDashboard from './components/EntrepreneurDashboard';
import MentorDashboard from './components/MentorDashboard';
import BrainstormerDashboard from './components/BrainstormerDashboard';
import AdminDashboard from './components/AdminDashboard';
import Mentorship from './components/Mentorship';
import Pitches from './components/Pitches';
import InvestorMatchmaking from './components/InvestorMatchmaking';
import FundingTracker from './components/FundingTracker';

import EventsNetworking from './components/EventsNetworking';

import BlogPage from './components/BlogPage';
import CommunityForum from './components/CommunityForum';
import ResourceHub from './components/ResourceHub';
import Incubators  from './components/Incubators';  
import OpportunityCenter from './components/OpportunityCentre';
import LearningEventsCalendar from './components/LearningEventsCalendar';
import LearnerDashboard from './components/LearnerDashboard';
import StartupVerification from './components/StartupVerification';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        
        <Route path="/startups discovery" element={<ExploreStartups />} />
        <Route path="/startups" element={<StartupVerification />} />
        
        <Route path="/investors" element={<InvestorDirectory />} />
        <Route path="/investor-profile" element={<InvestorProfile />} />

        <Route path="/investor/dashboard" element={<InvestorDashboard />} />
        <Route path="/entrepreneur/dashboard" element={<EntrepreneurDashboard />} />
        <Route path="/mentor/dashboard" element={<MentorDashboard />} />
        <Route path="/brainstormer/dashboard" element={<BrainstormerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/mentorship" element={<Mentorship />} />
        
        <Route path="/pitches" element={<Pitches />} />
        community
        <Route path="/matchmaking" element={<InvestorMatchmaking />} />
        <Route path="/dashboard" element={< FundingTracker/>} />
        <Route path="/events" element={<EventsNetworking />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/community" element={<CommunityForum />} />
        
        <Route path="/resourcehub" element={<ResourceHub/>} />
        <Route path="/incubator" element={<Incubators />} />
        <Route path="/opportunity" element={<OpportunityCenter />} />
        
        <Route path="/learnerdashboard" element={<LearnerDashboard />} />
        
        {/* Add more routes as needed */}

      </Routes>
    </Router>
  );
}

export default App;
