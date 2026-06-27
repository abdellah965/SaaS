import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Send, Settings as SettingsIcon, LayoutDashboard, Globe, LogOut, Terminal, Loader2, Menu, X } from 'lucide-react';
import './Dashboard.css';

export default function Dashboard() {
  const [prompt, setPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('nova_token');
    if (!token) navigate('/login');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('nova_token');
    navigate('/login');
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setAiResponse(''); 

    try {
      const token = localStorage.getItem('nova_token');
      const response = await fetch('http://localhost:5000/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ prompt })
      });

      const data = await response.json();
      
      if (response.ok) {
        setAiResponse(data.result);
      } else {
        setAiResponse(`[SYSTEM ERROR]: ${data.message}`);
      }
    } catch (err) {
      setAiResponse('[SYSTEM ERROR]: Failed to establish neural link with the generation framework.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderPremiumContent = () => {
    if (!aiResponse) {
      return (
        <div className="engine-empty-state fade-in">
          <div className="empty-icon-wrapper">
            <Terminal size={32} />
          </div>
          <h3>System Idle</h3>
          <p>Input your target demographic and video focus below to compile a production-ready script.</p>
        </div>
      );
    }

    return (
      <div className="script-render-engine fade-in">
        {aiResponse.split('\n').map((line, index) => {
          if (line.startsWith('🎬') || line.startsWith('⚙️') || line.startsWith('📝')) {
            return <h4 key={index} className="script-section-header">{line}</h4>;
          }
          if (line.startsWith('[00:')) {
            return (
              <div key={index} className="script-timeline-block">
                <span className="timestamp-badge">{line.substring(0, 13)}</span>
                <p className="timestamp-text">{line.substring(13)}</p>
              </div>
            );
          }
          return <p key={index} className="script-body-text">{line}</p>;
        })}
      </div>
    );
  };

  return (
    <div className="dashboard-app-container">
      
      {/* MOBILE TOP NAVIGATION */}
      <div className="mobile-top-nav">
        <div className="mobile-brand">
          <Sparkles size={18} color="#EAB308" />
          <span>NOVASTACK</span>
        </div>
        <button className="mobile-hamburger" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* MOBILE BLUR OVERLAY (Fixed z-index) */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay fade-in" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* PREMIUM EXPANDABLE SIDEBAR */}
      <aside className={`global-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-top">
          
          <div className="sidebar-brand-row">
            <div className="logo-box"><Sparkles size={20} color="#000" /></div>
            <span className="brand-label">NOVASTACK</span>
            <div className="mobile-close-btn" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={20} />
            </div>
          </div>
          
          <div className="nav-menu">
            <button className="nav-icon active" onClick={() => navigate('/dashboard')} title="Script Engine">
              <LayoutDashboard size={20} className="icon-svg" />
              <span className="nav-label">Engine</span>
            </button>
            <button className="nav-icon" onClick={() => navigate('/docs')} title="Documentation">
              <Globe size={20} className="icon-svg" />
              <span className="nav-label">Docs</span>
            </button>
            <button className="nav-icon" onClick={() => navigate('/settings')} title="Settings">
              <SettingsIcon size={20} className="icon-svg" />
              <span className="nav-label">Settings</span>
            </button>
          </div>
        </div>

        <div className="sidebar-bottom">
          <button className="nav-icon logout" onClick={handleLogout} title="Secure Logout">
            <LogOut size={20} className="icon-svg" />
            <span className="nav-label">Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN COMMAND CENTER */}
      <main className="dashboard-viewport">
        <div className="dashboard-header">
          <div>
            <h1>Script Generation Engine</h1>
            <p>Compile high-converting video assets using the OpenAI neural link.</p>
          </div>
          <div className="header-status">
            <span className="status-dot"></span> Engine Online
          </div>
        </div>

        <div className="workspace-grid">
          <div className="output-vault">
            {isLoading ? (
              <div className="engine-loading-state fade-in">
                <Loader2 size={40} className="spin-icon" />
                <p className="loading-text">COMPILING SCRIPT ASSET...</p>
                <div className="loading-bar-container">
                  <div className="loading-bar-fill"></div>
                </div>
              </div>
            ) : (
              renderPremiumContent()
            )}
          </div>

          <form onSubmit={handleGenerate} className="command-input-wrapper">
            <div className="command-box">
              <span className="prompt-prefix">~/generate</span>
              <input 
                type="text" 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., '60s TikTok ad for a high-end fitness brand...'" 
                className="command-input"
                disabled={isLoading}
              />
              <button type="submit" className="command-btn" disabled={isLoading || !prompt.trim()}>
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}