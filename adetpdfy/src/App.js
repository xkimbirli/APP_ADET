import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import About2 from './components/About2';
import UploadPdf from './components/UploadPdf';
import UploadedPdf from './components/UploadedPdf';
import ChatBot from './components/ChatBot'; 
import { FaArrowRight, FaUpload, FaSearch, FaCommentAlt, FaBook } from "react-icons/fa";
import { motion } from "framer-motion";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about2" element={<About2 />} />
          <Route path="/upload-pdf" element={<UploadPdf />} />
          <Route path="/uploaded-pdf" element={<UploadedPdf />} />
          <Route path="/chatbot" element={<ChatBot />} />
        </Routes>
      </Layout>
    </Router>
  );
}

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavBar = ['/upload-pdf', '/uploaded-pdf', '/chatbot'].includes(location.pathname); 

  return (
    <>
      {!hideNavBar && <NavBar />}
      {children}
    </>
  );
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const hoverEffect = {
  scale: 1.03,
  transition: { duration: 0.3 }
};

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Home Component
function Home() {
  return (
    <div className="dark-green-theme min-h-screen relative overflow-hidden">
      
      {/* Shooting Stars Background */}
      <div className="shooting-stars absolute inset-0 z-0"></div>

      {/* Hero Section */}
      <motion.div 
        className="hero-section min-h-[70vh] flex flex-col md:flex-row items-center justify-center relative z-10 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="hero-content text-center md:text-left max-w-2xl md:max-w-xl mb-8 md:mb-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-600"
            variants={itemVariants}
          >
            PDFy
          </motion.h1>
          <motion.p 
            className="tagline text-xl md:text-2xl mb-8 text-green-100"
            variants={itemVariants}
          >
            Simplify Knowledge, One PDF at a Time
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link to="/upload-pdf">
              <motion.button 
                className="cta-button flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(65, 26, 96, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                animate={pulseAnimation}
              >
                Try PDFy <FaArrowRight className="arrow-icon" />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Image Section */}
        <motion.div
          className="featured-image-card md:ml-10"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          
        </motion.div>
      </motion.div>

      {/* Value Proposition */}
      <motion.div 
        className="value-section py-20 px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="value-content max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-green-50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Why Use <span className="text-green-400">PDFy</span>
          </motion.h2>
          <motion.div 
            className="value-points grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div 
              className="value-card p-8 rounded-xl bg-green-900/30 backdrop-blur-sm border border-green-800/50 hover:border-green-500/50 transition-all"
              variants={itemVariants}
              whileHover={hoverEffect}
            >
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-green-300">
                <motion.span animate={pulseAnimation}>⏱️</motion.span> Saves Time
              </h3>
              <p className="text-green-100">No need to read long documents manually</p>
            </motion.div>
            <motion.div 
              className="value-card p-8 rounded-xl bg-green-900/30 backdrop-blur-sm border border-green-800/50 hover:border-green-500/50 transition-all"
              variants={itemVariants}
              whileHover={hoverEffect}
            >
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-green-300">
                <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }}>🧠</motion.span> Accurate & Smart
              </h3>
              <p className="text-green-100">AI-powered insights for quick information retrieval</p>
            </motion.div>
            <motion.div 
              className="value-card p-8 rounded-xl bg-green-900/30 backdrop-blur-sm border border-green-800/50 hover:border-green-500/50 transition-all"
              variants={itemVariants}
              whileHover={hoverEffect}
            >
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-green-300">
                <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>✨</motion.span> User-Friendly
              </h3>
              <p className="text-green-100">Simple interface for students and professionals</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* How It Works */}
      <motion.div 
        className="how-it-works py-20 px-4 bg:hsl(306, 67%, 33%)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-green-50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            How To Use <span className="text-green-400">PDFy</span>
          </motion.h2>
          <motion.div 
            className="steps-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div 
              className="step-card p-6 rounded-xl bg-green-900/30 backdrop-blur-sm border border-green-800/50 hover:border-green-500/50 transition-all h-full"
              variants={itemVariants}
              whileHover={{ 
                ...hoverEffect,
                boxShadow: "0 10px 25px -5px rgba(74, 222, 128, 0.2)"
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="step-number flex items-center justify-center w-10 h-10 rounded-full bg-green-700 text-white font-bold">1</span>
                <FaUpload className="text-green-400 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-green-200">Upload Your PDF</h3>
              <p className="text-green-100">Select the document you want to summarize or extract information from</p>
            </motion.div>
            
            <motion.div 
              className="step-card p-6 rounded-xl bg-green-900/30 backdrop-blur-sm border border-green-800/50 hover:border-green-500/50 transition-all h-full"
              variants={itemVariants}
              whileHover={{ 
                ...hoverEffect,
                boxShadow: "0 10px 25px -5px rgba(74, 222, 128, 0.2)"
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="step-number flex items-center justify-center w-10 h-10 rounded-full bg-green-700 text-white font-bold">2</span>
                <FaBook className="text-green-400 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-green-200">Generate a Summary</h3>
              <p className="text-green-100">AI extracts main ideas, important terms, and key details</p>
            </motion.div>
            
            <motion.div 
              className="step-card p-6 rounded-xl bg-green-900/30 backdrop-blur-sm border border-green-800/50 hover:border-green-500/50 transition-all h-full"
              variants={itemVariants}
              whileHover={{ 
                ...hoverEffect,
                boxShadow: "0 10px 25px -5px rgba(74, 222, 128, 0.2)"
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="step-number flex items-center justify-center w-10 h-10 rounded-full bg-green-700 text-white font-bold">3</span>
                <FaCommentAlt className="text-green-400 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-green-200">Ask Questions</h3>
              <p className="text-green-100">Get specific information from the PDF through conversation</p>
            </motion.div>
            
            <motion.div 
              className="step-card p-6 rounded-xl bg-green-900/30 backdrop-blur-sm border border-green-800/50 hover:border-green-500/50 transition-all h-full"
              variants={itemVariants}
              whileHover={{ 
                ...hoverEffect,
                boxShadow: "0 10px 25px -5px rgba(74, 222, 128, 0.2)"
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="step-number flex items-center justify-center w-10 h-10 rounded-full bg-green-700 text-white font-bold">4</span>
                <FaSearch className="text-green-400 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-green-200">Search Instantly</h3>
              <p className="text-green-100">Enter keywords to find relevant sections immediately</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Final CTA */}
        <motion.div 
          className="final-cta py-20 px-4 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="max-w-3xl mx-auto bg-green-900/30 backdrop-blur-sm p-8 rounded-xl border border-green-800/50"
          >
            <motion.p 
              className="summary text-lg mb-8 text-green-100 hover:text-shadow-glow transition-all duration-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <br />
              <br />
              <br />
              PDFy is an AI-powered tool that quickly summarizes PDFs, extracts key information,
              and answers questions about the content. Designed for students, researchers, and professionals.
              <br />
              <br />
              <br />
            </motion.p>

            <Link to="/upload-pdf">
              <motion.button 
                className="cta-button flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold text-lg shadow-lg mx-auto hover:text-shadow-glow"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(74, 222, 128, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Try PDFy Now <FaArrowRight className="arrow-icon" />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>


    </div>
  );
}

export default App;
