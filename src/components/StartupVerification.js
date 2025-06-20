import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const StartupVerification = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(() => JSON.parse(localStorage.getItem('startupVerificationForm')) || {
    companyName: '',
    registrationDoc: '',
    pitchDeck: '',
    idProof: '',
    status: 'Pending',
    adminFeedback: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    localStorage.setItem('startupVerificationForm', JSON.stringify(form));
  }, [form]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? URL.createObjectURL(files[0]) : value });
  };

  const handleNext = () => {
    if ((step === 1 && !form.companyName) || (step === 2 && (!form.registrationDoc || !form.pitchDeck || !form.idProof))) {
      alert('⚠️ Please complete all required fields.');
      return;
    }
    setStep(step + 1);
  };
  const handleBack = () => setStep(step - 1);

  const submitForm = () => {
    confetti();
    alert('📤 Submitted to Admin for Verification');
    localStorage.removeItem('startupVerificationForm');
    setShowSuccess(true);
  };

  const dummyFeedback = '✔️ Documents look good. Awaiting blockchain verification.';

  return (
    <div style={styles.pageBackground}>
      <div style={styles.container}>
        <h1 style={styles.title}>📄 Startup Verification</h1>
        <div style={styles.stepsContainer}>
          {['Startup Info', 'Documents', 'Review'].map((label, index) => (
            <motion.div key={index} style={{
              ...styles.step,
              background: step === index + 1 ? '#00796b' : '#eeeeee',
              color: step === index + 1 ? '#fff' : '#333',
            }} whileHover={{ scale: 1.05 }}>
              {label}
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {step === 1 && (
            <motion.div key="step1" {...fadeVariant} style={styles.form}>
              <label>🧾 Company Name</label>
              <input name="companyName" value={form.companyName} onChange={handleChange} style={styles.input} placeholder="Enter startup name" />
              <button onClick={handleNext} style={styles.nextBtn}>Next ➡️</button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" {...fadeVariant} style={styles.form}>
              <DropZone label="📎 Registration Document (PDF)" name="registrationDoc" handleChange={handleChange} file={form.registrationDoc} />
              <DropZone label="📤 Pitch Deck (PDF)" name="pitchDeck" handleChange={handleChange} file={form.pitchDeck} />
              <DropZone label="🪪 ID Proof (PDF)" name="idProof" handleChange={handleChange} file={form.idProof} />

              <p style={styles.hint}>📷 Document Scanner Coming Soon</p>
              <div style={styles.buttonGroup}>
                <button onClick={handleBack} style={styles.backBtn}>⬅️ Back</button>
                <button onClick={handleNext} style={styles.nextBtn}>Next ➡️</button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" {...fadeVariant} style={styles.form}>
              <h2>✅ Review & Submit</h2>
              <p><strong>Company:</strong> {form.companyName}</p>
              <p><strong>Status:</strong> <span style={{ color: '#43a047' }}>{form.status}</span></p>
              <div style={styles.blockchainStatus}>
                <p>🔗 <strong>Blockchain Verified</strong></p>
                <p>⛓️ On-chain ID: #0x892fa...c97d</p>
              </div>
              <p><strong>Admin Feedback:</strong> {dummyFeedback}</p>
              <div style={styles.buttonGroup}>
                <button onClick={handleBack} style={styles.backBtn}>⬅️ Back</button>
                <button onClick={submitForm} style={styles.submitBtn}>📬 Submit for Review</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {showSuccess && (
          <motion.div {...fadeVariant} style={styles.successModal}>
            <h2>🎉 Submission Successful</h2>
            <p>You're now under review. Admin will verify your documents soon.</p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button style={styles.nextBtn}>🚀 Go to Crowdfunding</button>
              <button style={styles.backBtn}>✏️ Edit Again</button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const DropZone = ({ label, name, handleChange, file }) => (
  <div style={styles.dropZone}>
    <label>{label}</label>
    <input name={name} type="file" accept="application/pdf" onChange={handleChange} style={styles.fileInput} />
    {file && <iframe src={file} style={styles.preview} title={name} />}
  </div>
);

const fadeVariant = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3 }
};

const styles = {
  pageBackground: {
    background: '#f5f5f5',
    minHeight: '100vh',
    padding: '3rem 1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    maxWidth: '850px',
    padding: '2rem',
    background: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
    color: '#333',
    fontFamily: 'Segoe UI, sans-serif',
  },
  title: {
    fontSize: '2.4rem',
    marginBottom: '1rem',
    color: '#004d40',
    textAlign: 'center',
  },
  stepsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '2rem',
  },
  step: {
    flex: 1,
    padding: '0.8rem',
    textAlign: 'center',
    fontWeight: '600',
    borderRadius: '10px',
    marginRight: '0.5rem',
    transition: 'all 0.3s ease',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.9rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  dropZone: {
    border: '2px dashed #ccc',
    borderRadius: '12px',
    padding: '1rem',
    textAlign: 'center',
    background: '#fafafa',
  },
  fileInput: {
    marginTop: '0.5rem',
  },
  preview: {
    width: '100%',
    height: '200px',
    border: 'none',
    borderRadius: '8px',
    marginTop: '0.5rem',
  },
  blockchainStatus: {
    padding: '1rem',
    background: '#e0f2f1',
    borderRadius: '10px',
    color: '#004d40',
    marginTop: '1rem',
  },
  hint: {
    fontStyle: 'italic',
    color: '#777',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1.5rem',
  },
  nextBtn: {
    background: '#26a69a',
    color: '#fff',
    padding: '0.8rem 1.5rem',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
  },
  backBtn: {
    background: '#90a4ae',
    color: '#fff',
    padding: '0.8rem 1.5rem',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
  },
  submitBtn: {
    background: '#f44336',
    color: '#fff',
    padding: '0.8rem 1.5rem',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  successModal: {
    marginTop: '2rem',
    padding: '2rem',
    borderRadius: '16px',
    background: '#e8f5e9',
    color: '#2e7d32',
    textAlign: 'center',
    animation: 'fadeIn 0.3s ease',
  },
};

export default StartupVerification;
