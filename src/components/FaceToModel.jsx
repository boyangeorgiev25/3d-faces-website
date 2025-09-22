import { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { generate3DModel } from '../utils/auth';
import './FaceToModel.css';

const FaceToModel = ({ translations, language = 'en' }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const { isAuthenticated } = useAuth();

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedImage(file);
        setPreviewUrl(URL.createObjectURL(file));
        setError('');
        setResult(null);
      } else {
        setError('Please select a valid image file.');
      }
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError('');
      setResult(null);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const generateModel = async () => {
    if (!selectedImage || !isAuthenticated) return;

    setIsProcessing(true);
    setProgress(0);
    setError('');

    try {
      // Start the generation process
      const data = await generate3DModel(selectedImage);
      
      if (data.status === 'processing') {
        // Start polling for status updates
        pollTaskStatus(data.model_id);
      } else {
        setResult(data);
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Generation error:', error);
      setError(error.message || 'Failed to generate 3D model. Please try again.');
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const pollTaskStatus = async (taskId) => {
    const maxAttempts = 60; // 5 minutes max (5 seconds * 60)
    let attempts = 0;

    const checkStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8001/check-model-status/${taskId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to check status');
        }

        const statusData = await response.json();
        setProgress(statusData.progress || 0);

        if (statusData.status === 'SUCCEEDED') {
          setResult({
            model_id: taskId,
            status: 'success',
            message: 'Model generated successfully!',
            download_url: statusData.download_url,
            thumbnail_url: statusData.thumbnail_url
          });
          setIsProcessing(false);
          setProgress(100);
        } else if (statusData.status === 'FAILED') {
          setError(statusData.message || 'Model generation failed');
          setIsProcessing(false);
          setProgress(0);
        } else if (attempts < maxAttempts) {
          // Continue polling
          attempts++;
          setTimeout(checkStatus, 5000); // Check every 5 seconds
        } else {
          setError('Model generation timeout. Please try again.');
          setIsProcessing(false);
          setProgress(0);
        }
      } catch (error) {
        console.error('Status check error:', error);
        if (attempts < maxAttempts) {
          attempts++;
          setTimeout(checkStatus, 5000);
        } else {
          setError('Failed to check generation status');
          setIsProcessing(false);
          setProgress(0);
        }
      }
    };

    // Start checking status
    setTimeout(checkStatus, 2000); // Wait 2 seconds before first check
  };

  const t = translations || {
    faceToModel: 'Face to 3D Model',
    uploadDescription: 'Upload a clear photo of a face to generate a 3D model',
    dragDropText: 'Drag and drop an image here, or click to select',
    selectImage: 'Select Image',
    generating: 'Generating 3D Model...',
    generate: 'Generate 3D Model',
    downloadModel: 'Download 3D Model',
    tryAnother: 'Try Another Image',
    loginRequired: 'Please log in to use this feature',
    processing: 'Processing your image...',
    almostDone: 'Almost done...',
    generationComplete: 'Generation complete!'
  };

  if (!isAuthenticated) {
    return (
      <div className="face-to-model-container">
        <div className="login-required">
          <div className="login-icon">🔒</div>
          <h2>{t.loginRequired}</h2>
          <p>You need to be logged in to generate 3D models from photos.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="face-to-model-container">
      <div className="face-to-model-header">
        <h1>{t.faceToModel}</h1>
        <p>{t.uploadDescription}</p>
      </div>

      <div className="upload-section">
        <div 
          className={`upload-area ${selectedImage ? 'has-image' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
        >
          {previewUrl ? (
            <div className="image-preview">
              <img src={previewUrl} alt="Selected face" />
              <div className="image-overlay">
                <span>Click to change image</span>
              </div>
            </div>
          ) : (
            <div className="upload-placeholder">
              <div className="upload-icon">📸</div>
              <p>{t.dragDropText}</p>
              <button className="select-btn">{t.selectImage}</button>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          style={{ display: 'none' }}
        />
      </div>

      {error && (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          {error}
        </div>
      )}

      {selectedImage && !isProcessing && !result && (
        <div className="action-section">
          <button className="generate-btn" onClick={generateModel}>
            <span className="btn-icon">⚡</span>
            {t.generate}
          </button>
        </div>
      )}

      {isProcessing && (
        <div className="processing-section">
          <div className="processing-animation">
            <div className="spinner"></div>
          </div>
          <h3>{t.generating}</h3>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="progress-text">
            {progress < 30 ? t.processing : progress < 80 ? t.almostDone : t.generationComplete}
          </p>
        </div>
      )}

      {result && (
        <div className="result-section">
          <div className="result-preview">
            <div className="model-viewer">
              {result.thumbnail_url ? (
                <div className="model-thumbnail">
                  <img src={result.thumbnail_url} alt="3D Model Preview" />
                  <div className="thumbnail-overlay">
                    <div className="model-icon">🎭</div>
                    <p>3D Model Generated Successfully!</p>
                  </div>
                </div>
              ) : (
                <div className="model-placeholder">
                  <div className="model-icon">🎭</div>
                  <p>3D Model Generated Successfully!</p>
                  <small>Model ID: {result.model_id}</small>
                </div>
              )}
            </div>
          </div>
          
          <div className="result-actions">
            <button 
              className="download-btn"
              onClick={() => {
                const token = localStorage.getItem('token');
                const downloadUrl = `http://localhost:8001${result.download_url}`;
                
                // Create a temporary link to trigger download
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = `3d_face_model_${result.model_id}.obj`;
                
                // Add authorization header for fetch
                fetch(downloadUrl, {
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                })
                .then(response => response.blob())
                .then(blob => {
                  const url = window.URL.createObjectURL(blob);
                  link.href = url;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  window.URL.revokeObjectURL(url);
                })
                .catch(error => {
                  console.error('Download failed:', error);
                  setError('Download failed. Please try again.');
                });
              }}
            >
              <span className="btn-icon">⬇️</span>
              {t.downloadModel}
            </button>
            <button className="try-another-btn" onClick={() => {
              setSelectedImage(null);
              setPreviewUrl(null);
              setResult(null);
              setError('');
            }}>
              <span className="btn-icon">🔄</span>
              {t.tryAnother}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FaceToModel;