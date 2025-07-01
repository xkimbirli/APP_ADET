import React, { useState } from "react";
import { motion } from "framer-motion";
import "./About2.css";
import profilePic from "../assests/IMG_2497.JPG";

export default function AboutMe() {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <div className="about-wrapper">
      {/* Shooting Stars */}
      <div className="shooting-stars"></div>

      <div className="about-container">
        {/* Left Side - Text */}
        <motion.div
          className="about-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>
            About The <span className="highlight"><strong>Creator</strong></span>
          </h1>
          <p>Hi! My name is Kimberly Nicole Cabaylo.</p>
          <p>I built the system PDFy to simplify the way users interact with PDF documents by allowing them to upload files, automatically generate summarized notes using AI, and engage in a chat-based interface to ask questions and better understand the content.</p>
          <p>Hope you enjoy it!</p>

          <div className="section">
            <h4>📧 Contact</h4>
            <p>Pdfy@gmail.com</p>
            <p>linkedin.com/in/thngnguyne20</p>
          </div>
        </motion.div>

        {/* Right Side - Photo */}
        <motion.div
          className="about-photo"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src={profilePic} alt="Profile" className="profile-img" />
        </motion.div>
      </div>

      {/* Info Grid - Below both sides */}
      <motion.div
        className="about-info"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <div className="info-grid">
          {/* Your info blocks... */}
          <div className="info-block">
            <h4>AI-Powered Note Generation</h4>
            <p>PDFy uses artificial intelligence to read uploaded PDFs and automatically generate clear, summarized notes—ideal for learners needing quick comprehension.</p>
          </div>
          <div className="info-block">
            <h4>Interactive Chat About the PDF</h4>
            <p>PDFy offers a chat-based interface where users can ask questions and receive instant answers about their uploaded PDFs, making document reading more engaging.</p>
          </div>
          <div className="info-block">
            <h4>Built for Students, Researchers, and Professionals</h4>
            <p>Whether it's class materials, academic papers, or work documents, PDFy helps users digest and understand content faster and more effectively.</p>
          </div>
          <div className="info-block">
            <h4>Privacy-First Document Handling</h4>
            <p>Uploaded files are processed safely and are not stored longer than necessary, ensuring users’ content remains private.</p>
          </div>
          <div className="info-block">
            <h4>Real-Time Learning Assistant</h4>
            <p>More than a PDF viewer, PDFy acts like a study companion that answers questions in real time—helping users break down complex information effortlessly.</p>
          </div>
          <div className="info-block">
            <h4>Supports SDG 4: Quality Education</h4>
            <p>PDFy contributes to Sustainable Development Goal 4 by promoting accessible, inclusive, and personalized learning opportunities through smart technology.</p>
          </div>
        </div>
      </motion.div>

      {/* Policy Buttons */}
      <div className="policy-buttons">
        <button className="policy-btn" onClick={() => setShowTerms(true)}>Terms & Conditions</button>
        <button className="policy-btn" onClick={() => setShowPrivacy(true)}>Privacy Policy</button>
      </div>

      {showTerms && (
  <div className="modal-overlay" onClick={() => setShowTerms(false)}>
    <div className="modal-box" onClick={(e) => e.stopPropagation()}>
      <h2>📃 PDFy – Terms and Conditions</h2>
      <p><em>Effective Date: JUNE 1, 2025 </em></p>

      <p>These Terms govern your use of PDFy. By using this service, you agree to these terms. If you disagree, DO NOT USE PDFy.</p>

      <h4>1. Service Description</h4>
      <ul>
        <li>Upload PDF documents</li>
        <li>Automatically generate notes using artificial intelligence</li>
        <li>Chat with a bot that answers questions based on the PDF content</li>
      </ul>

      <h4>2. User Responsibilities</h4>
      <ul>
        <li>Only upload files you own or have the legal right to use</li>
        <li>Avoid uploading content that is illegal, harmful, or abusive</li>
        <li>Not use the platform to attempt hacking, spamming, or extracting unauthorized data</li>
      </ul>

      <h4>3. Content Restrictions</h4>
      <ul>
        <li>Do not upload copyrighted materials without permission</li>
        <li>Do not upload pornographic, violent, or hate content</li>
      </ul>

      <h4>4. Intellectual Property</h4>
      <ul>
        <li>AI-generated notes and summaries belong to the user but may not be sold or redistributed without citation</li>
        <li>PDFy’s interface, backend logic, and visual design remain the intellectual property of the developers</li>
      </ul>

      <h4>7. File Type & Content Limitations</h4>
        <ul>
          <li>PDFy only processes text-based PDF documents. Files must contain selectable or extractable text.</li>
          <li>Image-only PDFs (e.g., scanned documents, photos, or slides with embedded text as images) cannot be processed for note generation.</li>
          <li>For best results, ensure your PDF contains readable digital text.</li>
        </ul>


      <h4>5. Limitations of Liability</h4>
      <ul>
        <li>PDFy is provided "as-is" with no warranties for accuracy, uptime, or suitability for a specific task</li>
        <li>We are not liable for any damage caused by incorrect AI-generated information or lost files</li>
      </ul>

      <h4>6. Data Handling</h4>
      <ul>
        <li>Uploaded PDFs are temporary and deleted after use</li>
        <li>We do not retain user conversations or file content</li>
        <li>No personal data is used for analytics or advertising</li>
      </ul>

      <button className="close-btn" onClick={() => setShowTerms(false)}>Close</button>
    </div>
  </div>
)}


     {showPrivacy && (
  <div className="modal-overlay" onClick={() => setShowPrivacy(false)}>
    <div className="modal-box" onClick={(e) => e.stopPropagation()}>
      <h2>🔐 PDFy – Privacy Policy</h2>
      <p><em>Effective Date: June 1 2025</em></p>
      <p>This Privacy Policy outlines how PDFy collects, uses, and protects your information when you use our system.</p>

      <h4>1. Information We Collect</h4>
      <ul>
        <li><strong>Uploaded PDFs:</strong> Files you upload are temporarily stored to generate notes and enable chatbot interactions.</li>
        <li><strong>Chat Input Data:</strong> Your questions to the chatbot may be processed for response generation but are not stored permanently.</li>
        
      </ul>

      <h4>2. How Your Data Is Used</h4>
      <ul>
        <li>To process your PDF and extract key information using AI.</li>
        <li>To support chatbot interaction by referencing the content of your uploaded file.</li>
        
      </ul>

      <h4>3. File Retention & Deletion</h4>
      <ul>
        <li>PDFs are deleted automatically after note generation or chatbot interaction is completed.</li>
        <li>If errors occur during upload, files may be logged for debugging, but are deleted promptly afterward.</li>
      </ul>

      <h4>4. Third-Party Access</h4>
      <ul>
        <li>PDFy does not share your documents or personal information with advertisers or third parties.</li>
        <li>AI processing is done via internal or trusted API services, and document data is not retained by them.</li>
      </ul>

      <h4>5. User Rights & Controls</h4>
      <ul>
        <li>You may stop using the platform at any time.</li>
        <li>If we ever add account creation or stored history, clear controls will be provided for data access and deletion.</li>
      </ul>


      <button className="close-btn" onClick={() => setShowPrivacy(false)}>Close</button>
    </div>
  </div>
)}
    </div>
  );
}
