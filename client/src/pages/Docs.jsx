import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, LayoutDashboard, Globe, Settings as SettingsIcon, LogOut, Menu, X } from 'lucide-react';
import './SystemPages.css';
import './Dashboard.css';

export default function Docs() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = (path) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <div className="dashboard-app-container">
      
      <div className="mobile-top-nav">
        <div className="mobile-brand"><Sparkles size={18} color="#EAB308" /><span>NOVASTACK</span></div>
        <button className="mobile-hamburger" onClick={() => setIsMobileMenuOpen(true)}><Menu size={24} /></button>
      </div>

      {isMobileMenuOpen && <div className="mobile-overlay fade-in" onClick={() => setIsMobileMenuOpen(false)}></div>}

      <aside className={`global-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-inner">
          <div className="sidebar-top">
            <div className="sidebar-brand-row">
              <div className="logo-box"><Sparkles size={20} color="#000" /></div>
              <span className="brand-label">NOVASTACK</span>
              <div className="mobile-close-btn" onClick={() => setIsMobileMenuOpen(false)}><X size={20} /></div>
            </div>
            <div className="nav-menu">
              <button className="nav-icon" onClick={() => handleNavigation('/dashboard')}>
                <div className="icon-wrapper"><LayoutDashboard size={20} className="icon-svg" /></div>
                <span className="nav-label">Engine</span>
              </button>
              <button className="nav-icon active" onClick={() => handleNavigation('/docs')}>
                <div className="icon-wrapper"><Globe size={20} className="icon-svg" /></div>
                <span className="nav-label">Docs</span>
              </button>
              <button className="nav-icon" onClick={() => handleNavigation('/settings')}>
                <div className="icon-wrapper"><SettingsIcon size={20} className="icon-svg" /></div>
                <span className="nav-label">Settings</span>
              </button>
            </div>
          </div>
          <div className="sidebar-bottom">
            <button className="nav-icon logout" onClick={() => navigate('/login')}>
              <div className="icon-wrapper"><LogOut size={20} className="icon-svg" /></div>
              <span className="nav-label">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      <main className="docs-viewport fade-in">
        <div className="docs-header">
          <h1>Intelligence & API Docs</h1>
        </div>
        <div className="docs-content">
          <h2>1. Engine Architecture</h2>
          <p>This boilerplate utilizes a customized MERN stack. The React frontend communicates securely with the Node/Express backend via JWT bearer tokens injected into the Authorization headers of every fetch request.</p>
          
          <h2>2. AI Neural Link (OpenAI)</h2>
          <p>The /api/ai/generate route is strictly rate-limited. Ensure your OpenAI API key is securely placed in your server's .env file.</p>
          <div className="docs-code">
            POST /api/ai/generate<br/>
            Authorization: Bearer [JWT_TOKEN]<br/>
            Body: &#123; "prompt": "Video concept..." &#125;
          </div>
        </div>
      </main>
    </div>
  );
}