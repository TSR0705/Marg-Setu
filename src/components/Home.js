import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ChatBox from './ChatBox';



import {
  Box,
  Container,
  Typography,
  Grid,
  Button as MUIButton,
 
  Card as MUICard,
  CardContent,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  FaLightbulb,
  FaHandshake,
  FaChartLine,
  FaRocket,
  FaLinkedinIn,
  FaTwitter,
  FaFacebookF,
  FaQuoteLeft,
} from 'react-icons/fa';

// Define the new color palette
const colors = {
  champagneGold: '#F7E7CE',
  platinumSilver: '#E5E4E2',
  roseGold: '#B76E79',
  titaniumGray: '#A9A9A9',
  imperialBlue: '#001F3F',
  emeraldGreen: '#006D5B',
  solarFlareOrange: '#D35400',
  deepBurgundy: '#800020',
  neonTeal: '#00E5EE',
};



// Styled components with new colors
const HeroSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 3),
  textAlign: 'center',
  background: `linear-gradient(135deg, ${colors.imperialBlue}, ${colors.emeraldGreen})`,
  color: colors.champagneGold,
}));

const FeatureCard = styled(MUICard)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  textAlign: 'center',
  backgroundColor: colors.platinumSilver,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: `0 8px 24px ${colors.titaniumGray}40`, // 40 is alpha in hex
  },
}));

const FooterSection = styled(Box)(({ theme }) => ({
  backgroundColor: colors.imperialBlue,
  color: colors.platinumSilver,
  padding: theme.spacing(5, 3),
}));

// Main Home component
export default function Home() {
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
  const chatRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (chatRef.current && !chatRef.current.contains(e.target)) {
        setChatOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleChat = () => setChatOpen((prev) => !prev);

  const features = [
    {
      icon: FaLightbulb,
      title: 'Startup Discovery',
      desc: 'Find innovative startups ready to scale.',
      link: '/startups',
    },
    {
      icon: FaHandshake,
      title: 'Investor Matchmaking',
      desc: 'Smart pairing between investors and founders.',
      link: '/matchmaking',
    },
    {
      icon: FaChartLine,
      title: 'Learner Dashboard',
      desc: 'Monitor your investments and portfolio growth.',
      link: '/learnerdashboard',
    },
    {
      icon: FaRocket,
      title: 'Mentorship Access',
      desc: 'Connect with experienced mentors.',
      link: '/mentorship',
    },
    {
      icon: FaRocket,
      title: 'Resource Hub',
      desc: 'Access a wealth of resources and tools.',
      link: '/resourcehub',
    },
    {
    icon: FaRocket,
    title: 'Incubator & Accelerator',
    desc: 'Connect with experienced incubators and accelerators.',
    link: '/incubator',
    
  },
  {
    icon: FaRocket,
    title: 'Post Opportunities',
    desc: 'Share and discover new opportunities.',
    link: '/opportunity',
    
    
  },
  ];

  const liveMetrics = [
    { label: 'Startups Matched', value: '1,200+' },
    { label: 'Investors Onboarded', value: '500+' },
    { label: 'Deals Closed', value: '150+' },
  ];

  const howItWorksSteps = ['Sign Up', 'Get Matched', 'Connect & Grow'];

  const testimonials = [
    {
      quote: 'Marg Setu accelerated our funding process and connected us with the perfect investors!',
      author: 'Amit Kumar, Founder',
    },
    {
      quote: 'The matchmaking algorithm is spot on. It saved me hours and countless meetings.',
      author: 'Neha Verma, Angel Investor',
    },
  ];

  const partners = [
    { name: 'Sequoia', logo: '/logos/sequoia.png' },
    { name: 'NASSCOM', logo: '/logos/nasscom.png' },
    { name: 'Startup India', logo: '/logos/startupindia.png' },
  ];

  const events = [
    {
      title: 'Pitch Night',
      desc: 'Connect with investors and get real-time feedback.',
      date: 'May 15, 2025',
    },
    {
      title: 'Investor Roundtable',
      desc: 'Engage with top investors in an exclusive session.',
      date: 'June 1, 2025',
    },
  ];

  const blogTeasers = [
    {
      title: 'Startup Metrics That Matter',
      desc: 'Discover key performance indicators that impress investors.',
      link: '/blog/startup-metrics',
    },
    {
      title: 'Angel vs VC: What’s Right for You?',
      desc: 'We break down funding options to help you make informed decisions.',
      link: '/blog/angel-vs-vc',
    },
  ];

  const faqs = [
    {
      question: 'How do I sign up?',
      answer: 'Click the Get Started button and fill in your details to join as a startup, investor, or mentor.',
    },
    {
      question: 'Is the platform free?',
      answer: 'Yes, signing up is free. We plan to introduce premium features in the future.',
    },
    {
      question: 'How secure is my data?',
      answer: 'We use state-of-the-art security measures to protect your information.',
    },
  ];

  return (
    <Box sx={{ fontFamily: 'Inter, sans-serif', backgroundColor: colors.champagneGold, color: colors.imperialBlue }}>
      
      {/* Navbar */}
<Box sx={{ backgroundColor: colors.imperialBlue, py: 2, px: 3 }}>
  <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Typography 
      variant="h6" 
      component={Link} 
      to="/" 
      sx={{ 
        color: colors.champagneGold, 
        fontWeight: 'bold', 
        textDecoration: 'none' 
      }}
    >
      Marg Setu
    </Typography>
    <Box sx={{ display: 'flex', gap: 4 }}>
      <Link to="/startups discovery" style={{ color: colors.platinumSilver, textDecoration: 'none' }}>Startups</Link>
      <Link to="/investors" style={{ color: colors.platinumSilver, textDecoration: 'none' }}>Investors</Link>
      <Link to="/mentorship" style={{ color: colors.platinumSilver, textDecoration: 'none' }}>Mentorship</Link>
      <Link to="/events" style={{ color: colors.platinumSilver, textDecoration: 'none' }}>Events</Link>
      <Link to="/blog" style={{ color: colors.platinumSilver, textDecoration: 'none' }}>Blog</Link>
    </Box>
    <MUIButton 
      variant="contained" 
      sx={{ 
        bgcolor: colors.solarFlareOrange, 
        color: colors.champagneGold, 
        fontWeight: 'bold', 
        px: 3, 
        '&:hover': { bgcolor: colors.deepBurgundy }
      }} 
      onClick={() => navigate('/signup')}
    >
      Sign Up
    </MUIButton>
  </Container>
</Box>

      
      {/* Hero Section */}
      <HeroSection>
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
            Welcome to Marg Setu
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Empowering startups and investors to build India's future together.
          </Typography>
          <MUIButton 
            variant="contained" 
            sx={{ 
              bgcolor: colors.solarFlareOrange, 
              color: colors.champagneGold, 
              px: 4, 
              py: 1.5, 
              fontWeight: '600',
              '&:hover': { bgcolor: colors.deepBurgundy }
            }} 
            onClick={() => navigate('/signup')}
          >
            Get Started
          </MUIButton>
        </motion.div>
      </HeroSection>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" align="center" sx={{ mb: 6, fontWeight: 'bold', color: colors.imperialBlue }}>
          What You Can Do on Marg Setu
        </Typography>
        <Grid container spacing={4}>
          {features.map(({ icon: Icon, title, desc, link }, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <FeatureCard onClick={() => navigate(link)}>
                  <CardContent>
                    <Icon style={{ fontSize: '2.5rem', color: colors.emeraldGreen, marginBottom: '16px' }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: colors.imperialBlue }}>
                      {title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.titaniumGray }}>
                      {desc}
                    </Typography>
                  </CardContent>
                </FeatureCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Live Metrics Section */}
      <Box sx={{ py: 6, backgroundColor: colors.platinumSilver, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, color: colors.imperialBlue }}>
          Our Impact
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {liveMetrics.map((metric, index) => (
            <Grid item key={index} xs={12} sm={4}>
              <Typography variant="h3" sx={{ color: colors.solarFlareOrange, fontWeight: 'bold' }}>
                {metric.value}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: colors.titaniumGray }}>{metric.label}</Typography>
            </Grid>
          ))}
        </Grid>
      </Box>


      

      {/* How It Works Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" align="center" sx={{ mb: 6, fontWeight: 'bold', color: colors.imperialBlue }}>
          How It Works
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {howItWorksSteps.map((step, index) => (
            <Grid item key={index} xs={12} sm={4}>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 * index, duration: 0.6 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ color: colors.emeraldGreen, fontWeight: 'bold' }}>
                    {index + 1}. {step}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, color: colors.titaniumGray }}>
                    A brief explanation of how you {step.toLowerCase()} on our platform.
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Box sx={{ py: 8, backgroundColor: colors.champagneGold }}>
        <Container>
          <Typography variant="h4" align="center" sx={{ mb: 6, fontWeight: 'bold', color: colors.imperialBlue }}>
            What People Say
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {testimonials.map((testimonial, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 * index, duration: 0.6 }}>
                  <MUICard sx={{ backgroundColor: colors.platinumSilver, p: 3, borderRadius: 2 }}>
                    <CardContent>
                      <FaQuoteLeft style={{ fontSize: '2rem', color: colors.roseGold, marginBottom: '8px' }} />
                      <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 2, color: colors.imperialBlue }}>
                        {testimonial.quote}
                      </Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: colors.deepBurgundy }}>
                        {testimonial.author}
                      </Typography>
                    </CardContent>
                  </MUICard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Partners Section */}
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, color: colors.imperialBlue }}>
          Our Partners
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
          {partners.map((partner, index) => (
            <motion.div key={index} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <img src={partner.logo} alt={partner.name} style={{ height: 50, filter: 'grayscale(1)' }} />
            </motion.div>
          ))}
        </Box>
      </Container>

      {/* Mentor CTA Section */}
      <Box sx={{ py: 8, backgroundColor: colors.titaniumGray, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ mb: 2, color: colors.imperialBlue }}>
          Become a Mentor
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 600, mx: 'auto', mb: 3, color: colors.imperialBlue }}>
          Share your expertise and help startups thrive by joining our mentorship network.
        </Typography>
        <MUIButton 
          variant="contained" 
          sx={{ 
            bgcolor: colors.emeraldGreen, 
            color: colors.champagneGold, 
            px: 4, 
            py: 1.5,
            '&:hover': { bgcolor: colors.neonTeal }
          }} 
          component={Link} 
          to="/mentors"
        >
          Join as Mentor
        </MUIButton>
      </Box>

      {/* Community Events Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" align="center" sx={{ mb: 6, fontWeight: 'bold', color: colors.imperialBlue }}>
          Upcoming Events
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {events.map((event, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <MUICard 
                  onClick={() => navigate('/events')} 
                  sx={{ 
                    cursor: 'pointer', 
                    borderRadius: 2, 
                    backgroundColor: colors.platinumSilver 
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: colors.imperialBlue }}>
                      {event.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.titaniumGray, mb: 1 }}>
                      {event.desc}
                    </Typography>
                    <Typography variant="caption" sx={{ color: colors.solarFlareOrange }}>
                      {event.date}
                    </Typography>
                  </CardContent>
                </MUICard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Blog Teasers Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" align="center" sx={{ mb: 6, fontWeight: 'bold', color: colors.imperialBlue }}>
          From Our Blog
        </Typography>
        <Grid container spacing={4}>
          {blogTeasers.map((blog, index) => (
            <Grid item key={index} xs={12} sm={6}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <MUICard 
                  onClick={() => navigate(blog.link)} 
                  sx={{ 
                    cursor: 'pointer', 
                    borderRadius: 2, 
                    backgroundColor: colors.platinumSilver 
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: colors.imperialBlue }}>
                      {blog.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.titaniumGray }}>
                      {blog.desc}
                    </Typography>
                  </CardContent>
                </MUICard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* FAQ Section */}
      <Box sx={{ py: 8, backgroundColor: colors.titaniumGray }}>
        <Container>
          <Typography variant="h4" align="center" sx={{ mb: 6, fontWeight: 'bold', color: colors.imperialBlue }}>
            Frequently Asked Questions
          </Typography>
          {faqs.map((faq, index) => (
            <Box key={index} sx={{ maxWidth: 800, mx: 'auto', mb: 3, borderBottom: `1px solid ${colors.platinumSilver}`, pb: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{ cursor: 'pointer', color: colors.neonTeal, fontWeight: 'bold' }}
                onClick={() => setFaqOpen(faqOpen === index ? null : index)}
              >
                {faq.question}
              </Typography>
              
                <Typography variant="body2" sx={{ mt: 1, color: colors.imperialBlue }}>
                  {faq.answer}
                </Typography>
              
            </Box>
          ))}
        </Container>
      </Box>

      {/* Footer Section */}
      <FooterSection>
        <Container sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Marg Setu
            </Typography>
            <Typography variant="body2" sx={{ color: colors.titaniumGray }}>
              The bridge to your entrepreneurial journey.
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Links
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, lineHeight: 1.8 }}>
              <li>
                <Link to="/about" style={{ color: colors.solarFlareOrange, textDecoration: 'none' }}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" style={{ color: colors.solarFlareOrange, textDecoration: 'none' }}>
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/community" style={{ color: colors.solarFlareOrange, textDecoration: 'none' }}>
                  Community
                </Link>
              </li>
            </Box>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Connect
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, fontSize: '1.2rem' }}>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: colors.neonTeal }}>
                <FaLinkedinIn />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: colors.neonTeal }}>
                <FaTwitter />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: colors.neonTeal }}>
                <FaFacebookF />
              </a>
            </Box>
          </Box>
        </Container>
        <Box sx={{ textAlign: 'center', mt: 4, fontSize: '0.85rem', color: colors.titaniumGray }}>
          © 2025 Marg Setu. All rights reserved.
        </Box>
      </FooterSection>

      {/* Floating Chatbot Button */}
      <Box sx={{ position: 'fixed', bottom: 3, right: 3, zIndex: 1000 }}>
        <MUIButton 
          onClick={toggleChat} 
          sx={{ 
            backgroundColor: colors.solarFlareOrange, 
            color: colors.champagneGold, 
            px: 3, 
            py: 1, 
            borderRadius: '50px', 
            fontWeight: 'bold',
            '&:hover': { bgcolor: colors.deepBurgundy }
          }}
        >
          💬 Ai chatbot
        </MUIButton>
      </Box>

    <div>
      {/* ... your Home content ... */}
      
      <ChatBox open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  
    
    </Box>
  );

  
}