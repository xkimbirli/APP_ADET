import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RefreshCw, FileText, X, Check, AlertTriangle } from 'lucide-react';
import NavBar from './NavBar';
import './UploadedPdf.css';

const UploadedPdf = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { fileName, fileUrl, extractedText } = location.state || {};

  const [showModal, setShowModal] = useState(false);

  const handleReplaceClick = () => setShowModal(true);
  const handleConfirmReplace = () => {
    setShowModal(false);
    navigate('/upload-pdf');
  };
  const handleCancelReplace = () => setShowModal(false);

  const handleGenerateNotes = () => {
    const generatedNote = extractedText
      ? `📝 Here are your notes from the uploaded PDF:\n\n${extractedText}`
      : '📝 No content extracted from the PDF.';
    navigate('/chatbot', {
      state: {
        fileName,
        fileUrl,
        initialNote: generatedNote,
      },
    });
  };

  return (
    <div className="uploadedpdf-wrapper">
      <NavBar />

      <div className="uploadedpdf-container">
        <div className="pdf-header">
          {fileName && (
            <div className="file-info">
              <FileText size={20} className="file-icon" />
              <h2 className="file-title">{fileName}</h2>
            </div>
          )}
        </div>

        <div className="pdf-viewer-container">
          {fileUrl ? (
            <iframe
              src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
              title="PDF Viewer"
              className="pdf-frame"
            />
          ) : (
            <div className="no-pdf-message">
              <p className="no-pdf-text">No PDF to display. Please upload again.</p>
            </div>
          )}
        </div>

        {/* Optional: Display Extracted Text */}
        {extractedText && (
          <div className="extracted-text-preview">
            <h4>Extracted Text Preview:</h4>
            <div className="text-box">{extractedText.slice(0, 1000)}...</div>
          </div>
        )}

        <div className="action-buttons">
          <button className="btn replace-btn" onClick={handleReplaceClick}>
            <RefreshCw size={18} className="btn-icon" />
            Replace PDF
          </button>
          <button className="btn generate-btn" onClick={handleGenerateNotes}>
            Generate Notes
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-icon">
                <AlertTriangle size={24} />
              </div>
              <h3>Replace PDF File</h3>
              <button className="modal-close" onClick={handleCancelReplace}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <p>You're about to replace the current PDF document. This action cannot be undone.</p>
            </div>

            <div className="modal-footer">
              <button className="btn modal-btn-confirm" onClick={handleConfirmReplace}>
                <RefreshCw size={18} className="btn-icon" />
                Replace File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadedPdf;
