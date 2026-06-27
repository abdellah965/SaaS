import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Database, Shield, Zap, CreditCard, ChevronRight } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="elite-landing">
      {/* FLOATING GLASS NAVBAR */}
      <nav className="glass-nav">
        <div className="nav-brand">
          <Sparkles size={18} color="#EAB308" />
          <span>NOVASTACK</span>
        </div>
        <div className="nav-core-links">
          <a href="#architecture">Architecture</a>
          <a href="#pricing">Membership</a>
          <Link to="/docs">Documentation</Link>
        </div>
        <div className="nav-auth-links">
          <Link to="/login" className="login-text">Sign In</Link>
          <a href="#pricing" className="nav-buy-btn">Get the Code</a>
        </div>
      </nav>

      {/* TYPOGRAPHY-DRIVEN HERO */}
      <header className="luxury-hero">
        <span className="hero-eyebrow">PRIVATE SAAS INFRASTRUCTURE</span>
        <h1 className="hero-headline">
          Build Beyond<br />Time & Code.
        </h1>
        <p className="hero-subtext">
          Bypass 100+ hours of backend configuration. Deploy an elite AI video agency asset in a weekend, fully integrated with JWT auth, Stripe billing, and a custom OpenAI engine.
        </p>
        <div className="hero-actions">
          <a href="#pricing" className="primary-cta">
            Initialize Engine — $149 <ChevronRight size={16} />
          </a>
        </div>
      </header>

      {/* GLASSMORPHISM ARCHITECTURE GRID */}
      <section id="architecture" className="tech-stack-section">
        <div className="section-header">
          <h2>Production Infrastructure</h2>
          <p>Everything you need to launch and monetize immediately.</p>
        </div>
        
        <div className="glass-grid">
          <div className="glass-card">
            <div className="card-icon-wrapper"><Shield size={22} /></div>
            <h3>Zero-Trust Auth</h3>
            <p>Bulletproof login system using bcrypt password hashing and secure HTTP-only session cookies.</p>
          </div>
          <div className="glass-card">
            <div className="card-icon-wrapper"><CreditCard size={22} /></div>
            <h3>Stripe Subscriptions</h3>
            <p>Fully wired customer billing portal and automated webhooks to handle PRO tier upgrades instantly.</p>
          </div>
          <div className="glass-card">
            <div className="card-icon-wrapper"><Zap size={22} /></div>
            <h3>AI Neural Link</h3>
            <p>Plug-and-play API routes tailored for generating high-converting video scripts via OpenAI.</p>
          </div>
          <div className="glass-card">
            <div className="card-icon-wrapper"><Database size={22} /></div>
            <h3>Stateful Data</h3>
            <p>Scalable Mongoose schemas tracking user profiles, secure API usage counts, and active billing states.</p>
          </div>
        </div>
      </section>

      {/* HONEST, SIMPLE PRICING */}
      <section id="pricing" className="pricing-section">
        <div className="pricing-card-glass">
          <div className="pricing-header">
            <h3>Lifetime License</h3>
            <div className="price-tag">
              <span className="currency">$</span>
              <span className="amount">149</span>
            </div>
            <p>One-time payment. Build infinite applications.</p>
          </div>
          <ul className="pricing-features">
            <li>Full MERN Source Code</li>
            <li>Stripe Webhook Integration</li>
            <li>Premium Dashboard UI</li>
            <li>Lifetime Updates</li>
          </ul>
          <Link to="/login" className="pricing-cta">Get the Code Now</Link>
        </div>
      </section>

      {/* MINIMAL FOOTER */}
      <footer className="luxury-footer">
        <div className="footer-brand">
          <Sparkles size={16} color="#EAB308" />
          <span>NovaStack © 2026</span>
        </div>
        <div className="footer-links">
          <Link to="/docs">Docs</Link>
          <a href="mailto:support@novastack.com">Support</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;