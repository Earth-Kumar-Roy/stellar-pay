import React from "react";

function BalanceCard({ balance }) {
  return (
    <div className="glass-panel balance-card-panel">
      <div className="card-header-accent">
        <div className="accent-pill"></div>
        <h3>XLM Balance</h3>
      </div>

      <div className="balance-display-container">
        <span className="balance-amount-xl">{balance}</span>
        <span className="balance-ticker">XLM</span>
      </div>
      
      <div className="balance-footer-deco">
        <span className="network-subtext">Stellar Testnet Horizon Asset</span>
      </div>
    </div>
  );
}

export default BalanceCard;