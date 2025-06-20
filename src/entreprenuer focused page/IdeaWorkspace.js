import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  Container,
  Paper,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const IdeaWorkspace = () => {
  const [idea, setIdea] = useState({
    title: '',
    description: '',
    problem: '',
    solution: ''
  });

  const [loadingField, setLoadingField] = useState('');
  const [toastOpen, setToastOpen] = useState(false);

  const handleChange = (field) => (e) => {
    setIdea({ ...idea, [field]: e.target.value });
  };

  const simulateAIGeneration = (field) => {
    setLoadingField(field);
    setTimeout(() => {
      setIdea((prev) => ({
        ...prev,
        [field]: `AI-generated ${field} based on "${idea.title || 'your idea'}"...`
      }));
      setLoadingField('');
    }, 1500);
  };

  const handleSubmit = () => {
    console.log('Idea Saved:', idea);
    setToastOpen(true);
  };

  const handleCloseToast = () => {
    setToastOpen(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Idea Workspace 🚀
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={4}>
        Capture, refine, and validate your startup idea with AI-powered suggestions.
      </Typography>

      <Paper elevation={4} sx={{ p: 4, borderRadius: 4, backgroundColor: '#fdfcfa' }}>
        <MotionBox
          component="form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          display="flex"
          flexDirection="column"
          gap={4}
        >
          <TextField
            label="Startup Idea Name"
            variant="outlined"
            value={idea.title}
            onChange={handleChange('title')}
            fullWidth
          />

          {/* Description */}
          <Box>
            <TextField
              label="Brief Description"
              variant="outlined"
              value={idea.description}
              onChange={handleChange('description')}
              fullWidth
              multiline
              rows={3}
            />
            <Box mt={1} display="flex" justifyContent="flex-end">
              <Button
                variant="text"
                size="small"
                onClick={() => simulateAIGeneration('description')}
                disabled={loadingField === 'description'}
              >
                {loadingField === 'description' ? (
                  <CircularProgress size={16} />
                ) : (
                  'Suggest with AI'
                )}
              </Button>
            </Box>
          </Box>

          {/* Problem */}
          <Box>
            <TextField
              label="What Problem Does It Solve?"
              variant="outlined"
              value={idea.problem}
              onChange={handleChange('problem')}
              fullWidth
              multiline
              rows={3}
            />
            <Box mt={1} display="flex" justifyContent="flex-end">
              <Button
                variant="text"
                size="small"
                onClick={() => simulateAIGeneration('problem')}
                disabled={loadingField === 'problem'}
              >
                {loadingField === 'problem' ? (
                  <CircularProgress size={16} />
                ) : (
                  'Suggest with AI'
                )}
              </Button>
            </Box>
          </Box>

          {/* Solution */}
          <Box>
            <TextField
              label="Your Proposed Solution"
              variant="outlined"
              value={idea.solution}
              onChange={handleChange('solution')}
              fullWidth
              multiline
              rows={3}
            />
            <Box mt={1} display="flex" justifyContent="flex-end">
              <Button
                variant="text"
                size="small"
                onClick={() => simulateAIGeneration('solution')}
                disabled={loadingField === 'solution'}
              >
                {loadingField === 'solution' ? (
                  <CircularProgress size={16} />
                ) : (
                  'Suggest with AI'
                )}
              </Button>
            </Box>
          </Box>

          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2, borderRadius: 2 }}
            onClick={handleSubmit}
          >
            Save & Continue
          </Button>
        </MotionBox>
      </Paper>

      <Snackbar open={toastOpen} autoHideDuration={3000} onClose={handleCloseToast}>
        <Alert severity="success" onClose={handleCloseToast}>
          Idea saved successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default IdeaWorkspace;
