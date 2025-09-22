import { useState, useRef, useEffect } from 'react';
import { sendChatMessage, getChatHistory } from '../utils/auth';
import './ChatBot.css';

const ChatBot = ({ isOpen, onClose, translations, language = 'en' }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load chat history when component opens
  useEffect(() => {
    if (isOpen && !historyLoaded) {
      loadChatHistory();
    }
  }, [isOpen]);

  // Prevent body scroll when chat is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('chat-open');
    } else {
      document.body.classList.remove('chat-open');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('chat-open');
    };
  }, [isOpen]);

  const loadChatHistory = async () => {
    try {
      const history = await getChatHistory();
      
      // Convert history to messages format and reverse to show oldest first
      const historyMessages = [];
      history.reverse().forEach(item => {
        historyMessages.push({ type: 'user', text: item.message, timestamp: item.timestamp });
        historyMessages.push({ type: 'bot', text: item.response, timestamp: item.timestamp });
      });
      
      // Add welcome message if no history
      if (historyMessages.length === 0) {
        historyMessages.push({ 
          type: 'bot', 
          text: translations.chatWelcome || 'Hello! How can I help you today?' 
        });
      }
      
      setMessages(historyMessages);
      setHistoryLoaded(true);
    } catch (error) {
      console.error('Failed to load chat history:', error);
      // Show welcome message on error
      setMessages([{ 
        type: 'bot', 
        text: translations.chatWelcome || 'Hello! How can I help you today?' 
      }]);
      setHistoryLoaded(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setError('');

    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const response = await sendChatMessage(userMessage, language);
      setMessages(prev => [...prev, { type: 'bot', text: response }]);
    } catch (error) {
      console.error('Chat error:', error);
      setError(error.message);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: translations.chatError || 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chat-overlay">
      <div className="chat-container">
        <div className="chat-header">
          <h3>{translations.chatTitle || 'AI Assistant'}</h3>
          <button className="chat-close" onClick={onClose}>×</button>
        </div>
        
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.type}`}>
              <div className="message-content">
                {message.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="message bot">
              <div className="message-content typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {error && (
          <div className="chat-error">
            {error}
          </div>
        )}

        <form className="chat-input-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={translations.chatPlaceholder || 'Type your message...'}
            maxLength={500}
            disabled={loading}
          />
          <button type="submit" disabled={loading || !input.trim()}>
            {loading ? '...' : translations.send || 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;