import React, { useEffect, useState } from 'react';

const sections = [
  'Problem',
  'Solution',
  'Unique Value Proposition',
  'Customer Segments',
  'Key Metrics',
  'Channels',
  'Cost Structure',
  'Revenue Streams',
  'Unfair Advantage',
];

const shimmerStyle = {
  animation: 'shimmer 2s infinite',
  background: 'linear-gradient(to right, #f6f7f8 0%, #e0e0e0 20%, #f6f7f8 40%)',
  backgroundSize: '1000px 100%',
  color: 'transparent',
  position: 'relative',
};

const BuilderCanvas = () => {
  const [canvasData, setCanvasData] = useState({});
  const [shimmering, setShimmering] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('builderCanvasData');
    if (saved) {
      setCanvasData(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('builderCanvasData', JSON.stringify(canvasData));
  }, [canvasData]);

  const handleChange = (section, value) => {
    setCanvasData((prev) => ({
      ...prev,
      [section]: value,
    }));
  };

  const handleAutoGenerate = (section) => {
    setShimmering((prev) => ({ ...prev, [section]: true }));

    setTimeout(() => {
      const dummyText = `This is a suggested input for the "${section}" section based on best practices.`;
      setCanvasData((prev) => ({ ...prev, [section]: dummyText }));
      setShimmering((prev) => ({ ...prev, [section]: false }));
    }, 2000); // Simulated delay
  };

  return (
    <div className="canvas-container">
      <h1>Builder Canvas</h1>
      {sections.map((section) => (
        <div key={section} className="canvas-section">
          <div className="canvas-header">
            <label>{section}</label>
            <button onClick={() => handleAutoGenerate(section)}>Suggest</button>
          </div>
          <textarea
            value={canvasData[section] || ''}
            onChange={(e) => handleChange(section, e.target.value)}
            placeholder={`Enter details for ${section}`}
          />
          <div className="preview">
            <strong>Preview:</strong>
            <div
              className={`preview-box ${
                shimmering[section] ? 'shimmer' : ''
              }`}
            >
              {canvasData[section] || 'Nothing entered yet.'}
            </div>
          </div>
        </div>
      ))}
      <style>{`
        .canvas-container {
          max-width: 900px;
          margin: 40px auto;
          padding: 20px;
          border-radius: 12px;
          background: #fff;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          font-family: 'Segoe UI', sans-serif;
        }

        .canvas-section {
          margin-bottom: 30px;
        }

        .canvas-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .canvas-header label {
          font-weight: bold;
          font-size: 18px;
        }

        textarea {
          width: 100%;
          height: 100px;
          padding: 10px;
          margin-top: 8px;
          border-radius: 6px;
          border: 1px solid #ccc;
          resize: vertical;
          font-size: 14px;
        }

        button {
          background-color: #7d5fff;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
        }

        button:hover {
          background-color: #5a3be7;
        }

        .preview {
          margin-top: 10px;
        }

        .preview-box {
          padding: 10px;
          background: #f9f9f9;
          border-radius: 6px;
          border: 1px solid #eee;
          font-size: 14px;
          margin-top: 4px;
          min-height: 40px;
        }

        .shimmer {
          background: linear-gradient(
            to right,
            #f0f0f0 0%,
            #e0e0e0 50%,
            #f0f0f0 100%
          );
          background-size: 200% auto;
          animation: shimmer 1.5s linear infinite;
          color: transparent !important;
        }

        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
      `}</style>
    </div>
  );
};

export default BuilderCanvas;
