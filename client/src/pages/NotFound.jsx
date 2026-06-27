import React from 'react';
import { Link } from 'react-router-dom';
import { WifiOff } from 'lucide-react'; 
import './SystemPages.css';

export default function NotFound() {
  return (
    <div className="system-layout fade-in">
      <div className="system-glass-card">
        <div className="system-icon">
          {/* Replaced BaseStation with WifiOff */}
          <WifiOff size={48} color="#EF4444" />
        </div>
        <h1>Signal Lost (404)</h1>
        <p>The matrix cannot locate this endpoint. The page you are looking for has been moved, deleted, or never existed.</p>
        <Link to="/dashboard" className="system-btn">Return to Command Center</Link>
      </div>
    </div>
  );
}