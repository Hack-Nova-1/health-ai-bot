import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI healthcare assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Animate chat container on mount
    gsap.fromTo('.chat-container', 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );
  }, []);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "I understand your concern. Based on your symptoms, I recommend consulting with a healthcare professional for a proper diagnosis.",
        "That's a common condition. Here are some general guidelines, but please consult your doctor for personalized advice.",
        "I can help you find nearby healthcare providers. Would you like me to search for specialists in your area?",
        "For emergency situations, please call emergency services immediately. I can also help you locate the nearest hospital.",
        "I'm here to provide general health information. For specific medical advice, please consult with a qualified healthcare provider.",
        "Let me help you understand this better. Can you provide more details about your symptoms or concerns?"
      ];

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: randomResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-page" style={{
      minHeight: '100vh',
      padding: '120px 0 80px',
      background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A2E 50%, #16213E 100%)'
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Header */}
            <div className="text-center mb-5">
              <h1 style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                marginBottom: '20px',
                background: 'linear-gradient(135deg, #C8AFFF 0%, #A47CF3 50%, #D8C4FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                AI HEALTHCARE CHAT
              </h1>
              <p style={{ fontSize: '1.2rem', color: '#ccc' }}>
                Get instant medical advice from our advanced AI assistant
              </p>
            </div>

            {/* Chat Container */}
            <div 
              ref={chatContainerRef}
              className="chat-container card-3d" 
              style={{
                height: '600px',
                display: 'flex',
                flexDirection: 'column',
                background: 'rgba(234, 244, 242, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(200, 175, 255, 0.2)',
                borderRadius: '20px',
                overflow: 'hidden'
              }}
            >
              {/* Messages Area */}
              <div 
                className="messages-area" 
                style={{
                  flex: 1,
                  padding: '30px',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px'
                }}
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`message ${message.isUser ? 'user-message' : 'ai-message'}`}
                    style={{
                      display: 'flex',
                      justifyContent: message.isUser ? 'flex-end' : 'flex-start',
                      animation: 'messageSlideIn 0.5s ease-out'
                    }}
                  >
                    <div
                      style={{
                        maxWidth: '70%',
                        padding: '20px 25px',
                        borderRadius: message.isUser ? '25px 25px 5px 25px' : '25px 25px 25px 5px',
                        background: message.isUser 
                          ? 'linear-gradient(135deg, #C8AFFF 0%, #A47CF3 100%)'
                          : 'rgba(200, 175, 255, 0.1)',
                        color: message.isUser ? '#000' : '#fff',
                        position: 'relative',
                        boxShadow: message.isUser 
                          ? '0 10px 30px rgba(200, 175, 255, 0.3)'
                          : '0 10px 30px rgba(0, 0, 0, 0.2)',
                        backdropFilter: 'blur(10px)',
                        border: message.isUser 
                          ? '1px solid rgba(200, 175, 255, 0.3)'
                          : '1px solid rgba(200, 175, 255, 0.1)',
                        transform: message.isUser ? 'perspective(1000px) rotateY(-5deg)' : 'perspective(1000px) rotateY(5deg)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        gsap.to(e.currentTarget, { 
                          scale: 1.05, 
                          rotationY: 0,
                          duration: 0.3 
                        });
                      }}
                      onMouseLeave={(e) => {
                        gsap.to(e.currentTarget, { 
                          scale: 1, 
                          rotationY: message.isUser ? -5 : 5,
                          duration: 0.3 
                        });
                      }}
                    >
                      <div style={{
                        fontSize: '1rem',
                        lineHeight: '1.5',
                        marginBottom: '5px'
                      }}>
                        {message.text}
                      </div>
                      <div style={{
                        fontSize: '0.8rem',
                        opacity: 0.7,
                        textAlign: 'right'
                      }}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      
                      {/* 3D Effect Overlay */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
                        borderRadius: 'inherit',
                        pointerEvents: 'none'
                      }} />
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="typing-indicator" style={{
                    display: 'flex',
                    justifyContent: 'flex-start'
                  }}>
                    <div style={{
                      padding: '20px 25px',
                      borderRadius: '25px 25px 25px 5px',
                      background: 'rgba(200, 175, 255, 0.1)',
                      border: '1px solid rgba(200, 175, 255, 0.2)',
                      backdropFilter: 'blur(10px)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <div style={{
                        display: 'flex',
                        gap: '5px'
                      }}>
                        <div style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: '#C8AFFF',
                          animation: 'typingDot 1.4s infinite ease-in-out'
                        }} />
                        <div style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: '#C8AFFF',
                          animation: 'typingDot 1.4s infinite ease-in-out 0.2s'
                        }} />
                        <div style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: '#C8AFFF',
                          animation: 'typingDot 1.4s infinite ease-in-out 0.4s'
                        }} />
                      </div>
                      <span style={{ color: '#C8AFFF', fontSize: '0.9rem' }}>
                        AI is thinking...
                      </span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div style={{
                padding: '20px 30px',
                borderTop: '1px solid rgba(200, 175, 255, 0.2)',
                background: 'rgba(0, 0, 0, 0.2)'
              }}>
                <div className="input-group" style={{ display: 'flex', gap: '15px' }}>
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about your health..."
                    style={{
                      flex: 1,
                      padding: '15px 20px',
                      border: '2px solid rgba(200, 175, 255, 0.3)',
                      borderRadius: '25px',
                      background: 'rgba(0, 0, 0, 0.3)',
                      color: 'white',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#C8AFFF';
                      e.target.style.boxShadow = '0 0 20px rgba(200, 175, 255, 0.3)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(200, 175, 255, 0.3)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isTyping}
                    className="btn btn-futuristic"
                    style={{
                      padding: '15px 25px',
                      border: 'none',
                      borderRadius: '25px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: inputText.trim() && !isTyping ? 'pointer' : 'not-allowed',
                      opacity: inputText.trim() && !isTyping ? 1 : 0.5,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions mt-4" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '15px',
              flexWrap: 'wrap'
            }}>
              {[
                'General Health Check',
                'Find a Doctor',
                'Emergency Help',
                'Medication Info'
              ].map((action, index) => (
                <button
                  key={index}
                  onClick={() => setInputText(action)}
                  style={{
                    padding: '10px 20px',
                    border: '1px solid rgba(200, 175, 255, 0.3)',
                    borderRadius: '20px',
                    background: 'rgba(200, 175, 255, 0.1)',
                    color: '#C8AFFF',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(200, 175, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(200, 175, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes messageSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes typingDot {
          0%, 80%, 100% {
            transform: scale(0);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
