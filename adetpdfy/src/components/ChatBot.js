import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Volume2, Download, MessageSquare, X } from 'lucide-react';
import NavBar from './NavBar';
import './ChatBot.css';

const ChatBot = () => {
  const location = useLocation();
  const { fileUrl, fileName, initialNote } = location.state || {};
  const [notes, setNotes] = useState(initialNote || 'No notes generated yet.');
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: "Hi! I'm Pdfybot. Ask me anything about this document." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const readNotesAloud = () => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(notes);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Text-to-speech is not supported in your browser.");
    }
  };

  const downloadNotes = () => {
    const blob = new Blob([notes], { type: 'text/plain' });
    const element = document.createElement('a');
    element.href = URL.createObjectURL(blob);
    element.download = `${fileName || 'document'}-notes.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question: input,
          context: notes
        })
      });

      const data = await response.json();
      const botResponse = data.answer || "Sorry, I couldn't find an answer.";

      setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages(prev => [...prev, {
        type: 'bot',
        text: "⚠️ Sorry, something went wrong while trying to get the answer."
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pdfybot-container">
      <NavBar />

      <div className="document-viewer">
        {/* Header with document info */}
        <div className="document-header">
          <h2 className="document-title">{fileName || 'Untitled Document'}</h2>
          <div className="document-actions">
            <button onClick={readNotesAloud} className="icon-button" title="Read aloud">
              <Volume2 size={20} />
            </button>
            <button onClick={downloadNotes} className="icon-button" title="Download notes">
              <Download size={20} />
            </button>
          </div>
        </div>

        {/* Generated Notes */}
        <div className="content-container">
          <div className="notes-container full-width">
            <h3>Generated Notes</h3>
            <div className="notes-content">
              {notes.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chat Toggle */}
      <button
        className={`chat-toggle ${showChat ? 'active' : ''}`}
        onClick={() => setShowChat(!showChat)}
      >
        {showChat ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Interface */}
      {showChat && (
        <div className="chat-interface">
          <div className="chat-header">
            <h3>Pdfybot Assistant</h3>
          </div>
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.type}`}>
                <div className="message-content">{msg.text}</div>
              </div>
            ))}
            {loading && (
              <div className="message bot">
                <div className="message-content">Thinking...</div>
              </div>
            )}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Pdfybot..."
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              disabled={loading}
            />
            <button onClick={sendMessage} disabled={loading}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
