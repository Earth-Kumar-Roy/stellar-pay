import React from "react";

function Navbar() {
  return (
    <header className="navbar-wrapper">
      <div className="navbar-brand">
        <svg className="brand-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="url(#brandGlow)" strokeWidth="1" />
          <defs>
            <linearGradient id="brandGlow" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#22D3EE" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
          </defs>
        </svg>
        <span className="brand-title">StellarPay</span>
      </div>

      <div className="navbar-actions">
        <span className="network-indicator">
          <span className="indicator-dot"></span>
          Testnet
        </span>
      </div>
    </header>
  );
}

export default Navbar;