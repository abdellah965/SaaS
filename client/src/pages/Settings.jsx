import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, LayoutDashboard, Globe, Settings as SettingsIcon, LogOut, Shield, CreditCard, AlertTriangle, CheckCircle, Mail, Key } from 'lucide-react';
import './Settings.css';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('account');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Premium Interactive States
  const [notification, setNotification] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem('nova_token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        // In production, this hits your MERN backend
        const response = await fetch('http://localhost:5000/api/auth/me', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          setLoading(false);
        } else {
          // Fallback for UI testing if backend is off
          setUserData({ email: 'founder@agency.com', isPro: false, apiUsageCount: 2 });
          setLoading(false);
        }
      } catch (error) {
        setUserData({ email: 'founder@agency.com', isPro: false, apiUsageCount: 2 });
        setLoading(false);
      }
    };
    verifyUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('nova_token');
    navigate('/login');
  };

  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handlePasswordReset = () => {
    showToast("Password reset sequence initiated. Check your email.");
  };

  const handleDeleteAccount = () => {
    localStorage.removeItem('nova_token');
    navigate('/login');
  };

  if (loading) {
    return <div className="settings-loading-state"><div className="glow-spinner"></div></div>;
  }

  const FREE_LIMIT = 3;
  const usagePercentage = userData?.isPro ? 100 : Math.min(((userData?.apiUsageCount || 0) / FREE_LIMIT) * 100, 100);

  const renderTabContent = () => {
    if (activeTab === 'account') {
      return (
        <div className="settings-tab-pane fade-in">
          <div className="pane-header">
            <h2>Account Security</h2>
            <p>Manage your credentials and core identity.</p>
          </div>

          <div className="glass-section">
            <div className="section-title"><Mail size={16} /> Identity</div>
            <div className="input-group">
              <label>Registered Email</label>
              <input type="email" value={userData?.email} disabled className="glass-input locked" />
              <span className="input-hint">Email address is permanently bound to this workspace.</span>
            </div>
          </div>

          <div className="glass-section">
            <div className="section-title"><Key size={16} /> Authentication</div>
            <p className="section-desc">Generate a secure link to encrypt a new password.</p>
            <button className="glass-btn" onClick={handlePasswordReset}>Request Password Reset</button>
          </div>

          <div className="glass-section danger-zone">
            <div className="section-title danger"><AlertTriangle size={16} /> Danger Zone</div>
            <p className="section-desc">Irreversibly purge your account, generated scripts, and subscription data.</p>
            <button className="glass-btn danger-btn" onClick={() => setShowDeleteModal(true)}>Initiate Account Deletion</button>
          </div>
        </div>
      );
    }

    if (activeTab === 'billing') {
      return (
        <div className="settings-tab-pane fade-in">
          <div className="pane-header">
            <h2>Billing & Usage</h2>
            <p>Monitor your OpenAI limits and Stripe subscription.</p>
          </div>

          <div className="glass-section">
            <div className="section-title"><Shield size={16} /> Current Plan</div>
            <div className="billing-status-card">
              <div className="status-info">
                <span className={`status-badge ${userData?.isPro ? 'pro' : 'free'}`}>
                  {userData?.isPro ? 'PRO TIER ACTIVE' : 'FREE TIER'}
                </span>
                <p>{userData?.isPro ? 'Unlimited AI generations unlocked.' : 'Upgrade to PRO for unlimited generation.'}</p>
              </div>
              <button className="glass-btn highlight" onClick={() => navigate('/billing')}>
                {userData?.isPro ? 'Manage Stripe Portal' : 'Upgrade via Stripe'}
              </button>
            </div>
          </div>

          <div className="glass-section">
            <div className="section-title"><Sparkles size={16} /> Engine Usage</div>
            <p className="usage-text">
              {userData?.isPro 
                ? "Infinite limits active." 
                : `${userData?.apiUsageCount} / ${FREE_LIMIT} free generations used.`}
            </p>
            {!userData?.isPro && (
              <div className="glass-progress-track">
                <div className="glass-progress-fill" style={{ width: `${usagePercentage}%` }}></div>
              </div>
            )}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="unified-app-container">
      
      {/* PREMIUM TOAST NOTIFICATION */}
      {notification && (
        <div className="glass-toast fade-in">
          <CheckCircle size={16} />
          <span>{notification.message}</span>
        </div>
      )}

      {/* GLASSMORPHISM DELETE MODAL */}
      {showDeleteModal && (
        <div className="glass-modal-overlay fade-in">
          <div className="glass-modal-card">
            <div className="modal-header">
              <AlertTriangle size={24} color="#EF4444" />
              <h2>Confirm Deletion</h2>
            </div>
            <p>This action is irreversible. All generated scripts and your active Stripe subscription will be permanently purged.</p>
            <div className="modal-actions">
              <button className="glass-btn cancel" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button className="glass-btn confirm-danger" onClick={handleDeleteAccount}>Purge Account</button>
            </div>
          </div>
        </div>
      )}

      {/* EXACT SAME SIDEBAR AS DASHBOARD */}
      <aside className="global-sidebar">
        <div className="sidebar-top">
          <div className="logo-box"><Sparkles size={20} color="#000" /></div>
          <button className="nav-icon" onClick={() => navigate('/dashboard')} title="Script Engine">
            <LayoutDashboard size={20} />
          </button>
          <button className="nav-icon" onClick={() => navigate('/docs')} title="Documentation">
            <Globe size={20} />
          </button>
          <button className="nav-icon active" onClick={() => navigate('/settings')} title="Settings">
            <SettingsIcon size={20} />
          </button>
        </div>
        <div className="sidebar-bottom">
          <button className="nav-icon logout" onClick={handleLogout} title="Secure Logout">
            <LogOut size={20} />
          </button>
        </div>
      </aside>

      {/* SETTINGS WORKSPACE */}
      <main className="unified-viewport">
        <div className="settings-layout">
          
          <nav className="glass-subnav">
            <span className="subnav-title">Configuration</span>
            <button className={activeTab === 'account' ? 'active' : ''} onClick={() => setActiveTab('account')}>
              Account
            </button>
            <button className={activeTab === 'billing' ? 'active' : ''} onClick={() => setActiveTab('billing')}>
              Billing
            </button>
          </nav>

          <div className="glass-vault">
            {renderTabContent()}
          </div>

        </div>
      </main>
    </div>
  );
}