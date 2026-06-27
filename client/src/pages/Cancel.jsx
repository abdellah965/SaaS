import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import './SystemPages.css';

export default function Cancel() {
  return (
    <div className="system-layout fade-in">
      <div className="system-glass-card">
        <div className="system-icon"><AlertTriangle size={48} color="#EAB308" /></div>
        <h1>Transaction Aborted</h1>
        <p>The Stripe checkout process was cancelled or failed. No charges were made to your account.</p>
        <Link to="/settings" className="system-btn">Return to Settings</Link>
      </div>
    </div>
  );
}