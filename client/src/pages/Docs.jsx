import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, LayoutDashboard, Globe, Settings as SettingsIcon, LogOut } from 'lucide-react';
import './SystemPages.css';
import './Dashboard.css'; // Reusing sidebar styles

export default function Docs() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-app-container">
      <aside className="global-sidebar">
        <div className="sidebar-top">
          <div className="logo-box"><Sparkles size={20} color="#000" /></div>
          <button className="nav-icon" onClick={() => navigate('/dashboard')}><LayoutDashboard size={20} /></button>
          <button className="nav-icon active" onClick={() => navigate('/docs')}><Globe size={20} /></button>
          <button className="nav-icon" onClick={() => navigate('/settings')}><SettingsIcon size={20} /></button>
        </div>
        <div className="sidebar-bottom">
          <button className="nav-icon logout" onClick={() => navigate('/login')}><LogOut size={20} /></button>
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
          <p>The /api/ai/generate route is strictly rate-limited. Ensure your OpenAI API key is securely placed in your server's .env file. The engine uses a hidden system prompt to format the output cinematically.</p>
          <div className="docs-code">
            POST /api/ai/generate<br/>
            Authorization: Bearer [JWT_TOKEN]<br/>
            Body: {`{ "prompt": "Video concept..." }`}
          </div>

          <h2>3. Stripe Webhooks</h2>
          <p>Local development requires the Stripe CLI to forward events. The webhook endpoint (/api/stripe/webhook) listens for 'checkout.session.completed' to upgrade the MongoDB user tier seamlessly.</p>
        </div>
      </main>
    </div>
  );
}