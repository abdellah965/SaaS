import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import './SystemPages.css';

export default function Success() {
  return (
    <div className="system-layout fade-in">
      <div className="system-glass-card">
        <div className="system-icon"><CheckCircle size={48} color="#10B981" /></div>
        <h1>Payment Secured</h1>
        <p>Your transaction was successful. Your account has been upgraded to the PRO tier. Infinite engine limits are now active.</p>
        <Link to="/dashboard" className="system-btn">Initialize Engine</Link>
      </div>
    </div>
  );
}