import React, { useRef, useState } from 'react';
import { ArrowLeft, UploadCloud, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import './UploadPdf.css';

const UploadPdf = () => {
  const fileInputRef = useRef(null);
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const handleBackClick = () => {
    window.history.back();
  };

  const handleTitleClick = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length) {
      handleFileChange({ target: { files: e.dataTransfer.files } });
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file && file.type === 'application/pdf') {
      setModalMessage('Uploading and processing...');
      setShowModal(true);
      setUploadProgress(0);
      setTimeLeft(5);

      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const next = prev + 20;
          return next >= 100 ? 100 : next;
        });
      }, 300);

      const timeInterval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('http://localhost:5000/upload-pdf', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        clearInterval(progressInterval);
        clearInterval(timeInterval);

        setUploadProgress(100);
        setModalMessage('Upload successful! Redirecting...');

        setTimeout(() => {
          setShowModal(false);
          navigate('/uploaded-pdf', {
            state: {
              fileName: file.name,
              fileUrl: URL.createObjectURL(file),
              extractedText: data.text, 
            },
          });
        }, 1000);
      } catch (err) {
        clearInterval(progressInterval);
        clearInterval(timeInterval);
        setModalMessage('Failed to upload. Please try again.');
        setTimeout(() => setShowModal(false), 2500);
      }
    } else {
      setModalMessage('Invalid file type. Please upload a PDF file.');
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2500);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="uploadpdf-container">
      <NavBar />

      <button className="back-button" onClick={handleBackClick}>
        <ArrowLeft color="white" size={20} />
      </button>

      <div className="uploadpdf-content">
        <div
          className={`upload-dropzone ${isDragging ? 'dragging' : ''}`}
          onClick={handleTitleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="upload-icon">
            <UploadCloud size={48} />
          </div>
          <h1 className="upload-heading">Drag & drop to upload</h1>
          <p className="upload-subtext">or click to browse files</p>
          <p className="upload-hint">Supports: PDF</p>
        </div>

        <input
          type="file"
          accept="application/pdf"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>

      {showModal && (
        <div className="uploadpdf-modal">
          <div className="uploadpdf-modal-content">
            <button className="modal-close-btn" onClick={closeModal}>
              <X size={20} />
            </button>
            <div className="progress-container">
              <div className="progress-info">
                <span className="progress-percent">{uploadProgress}%</span>
                <span className="progress-time">{timeLeft}s left</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
            <p className="progress-message">{modalMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPdf;
