import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, LayoutDashboard, Globe, Settings as SettingsIcon, LogOut, Shield, AlertTriangle, CheckCircle, Mail, Key, Menu, X } from 'lucide-react';
import './Settings.css';

export default function Settings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('account');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userData] = useState({ email: 'founder@agency.com', isPro: false, apiUsageCount: 2 });
  const [notification, setNotification] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('nova_token')) navigate('/login');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('nova_token');
    navigate('/login');
  };

  const handleNavigation = (path) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  const showToast = (message) => {
    setNotification({ message });
    setTimeout(() => setNotification(null), 3000);
  };

  const renderTabContent = () => {
    if (activeTab === 'account') {
      return (
        <div className="settings-tab-pane fade-in">
          
          <div className="settings-section">
            <div className="section-title"><Mail size={16} /> Profile Information</div>
            <p className="section-desc">Manage your personal details and keep your contact info up to date.</p>
            <div className="input-group">
              <label>Registered Email</label>
              <input type="email" value={userData.email} disabled className="glass-input locked" />
              <span className="input-hint">Email address is permanently bound to this workspace.</span>
            </div>
          </div>

          <div className="settings-section">
            <div className="section-title"><Key size={16} /> Security</div>
            <p className="section-desc">Keep your account secure with extra authentication and alerts.</p>
            <button className="glass-btn" onClick={() => showToast("Reset link sent.")}>Request Password Reset</button>
          </div>

          <div className="settings-section danger-zone">
            <div className="section-title danger"><AlertTriangle size={16} /> Danger Zone</div>
            <p className="section-desc">Irreversibly purge your account and subscription data.</p>
            <button className="glass-btn danger-btn" onClick={() => setShowDeleteModal(true)}>Initiate Account Deletion</button>
          </div>

        </div>
      );
    }

    if (activeTab === 'billing') {
      return (
        <div className="settings-tab-pane fade-in">
          
          <div className="settings-section">
            <div className="section-title"><Shield size={16} /> Current Plan</div>
            <p className="section-desc">Monitor your OpenAI limits and Stripe subscription.</p>
            <div className="billing-status-card">
              <div className="status-info">
                <span className="status-badge free">FREE TIER</span>
                <p>Upgrade to PRO for unlimited generations.</p>
              </div>
              <button className="glass-btn" style={{background: '#FAFAFA', color: '#000'}}>Upgrade via Stripe</button>
            </div>
          </div>

        </div>
      );
    }
  };

  return (
    <div className="unified-app-container">
      
      {/* 1. RESTORED PREMIUM TOAST */}
      {notification && (
        <div className="glass-toast fade-in">
          <CheckCircle size={16} /><span>{notification.message}</span>
        </div>
      )}

      {/* 2. RESTORED DANGER MODAL */}
      {showDeleteModal && (
        <div className="glass-modal-overlay fade-in">
          <div className="glass-modal-card">
            <div className="modal-header"><AlertTriangle size={24} color="#EF4444" /><h2>Confirm Deletion</h2></div>
            <p>This action is irreversible. All generated scripts will be permanently purged.</p>
            <div className="modal-actions">
              <button className="glass-btn cancel" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button className="glass-btn confirm-danger" onClick={handleLogout}>Purge Account</button>
            </div>
          </div>
        </div>
      )}

      {/* 3. MOBILE NAV */}
      <div className="mobile-top-nav">
        <div className="mobile-brand"><Sparkles size={18} color="#EAB308" /><span>NOVASTACK</span></div>
        <button className="mobile-hamburger" onClick={() => setIsMobileMenuOpen(true)}><Menu size={24} /></button>
      </div>
      {isMobileMenuOpen && <div className="mobile-overlay fade-in" onClick={() => setIsMobileMenuOpen(false)}></div>}

      {/* 4. RESTORED CURTAIN REVEAL SIDEBAR */}
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
              <button className="nav-icon" onClick={() => handleNavigation('/docs')}>
                <div className="icon-wrapper"><Globe size={20} className="icon-svg" /></div>
                <span className="nav-label">Docs</span>
              </button>
              <button className="nav-icon active" onClick={() => handleNavigation('/settings')}>
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

      {/* 5. MAIN CONTENT VIEWPORT */}
      <main className="unified-viewport">
        <div className="settings-layout">
          
          <nav className="glass-subnav">
            <span className="subnav-title">Configuration</span>
            <button className={activeTab === 'account' ? 'active' : ''} onClick={() => setActiveTab('account')}>Account Settings</button>
            <button className={activeTab === 'billing' ? 'active' : ''} onClick={() => setActiveTab('billing')}>Billing & Usage</button>
          </nav>
          
          <div className="glass-vault">
            <div className="pane-header">
               <h2>{activeTab === 'account' ? 'Account Settings' : 'Billing & Usage'}</h2>
               <p>Manage your personal details and keep your contact info up to date.</p>
            </div>
            {renderTabContent()}
          </div>

        </div>
      </main>
    </div>
  );
}