import React from "react";

function TransactionHistory({ transactions }) {
  function shortAddress(address) {
    if (!address) return "...";
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  }

  async function copyHash(hash) {
    await navigator.clipboard.writeText(hash);
    // Keeping alert functional logic identical as requested
    alert("Transaction hash copied!");
  }

  // Beautiful Premium Empty State
  if (!transactions || transactions.length === 0) {
    return (
      <div className="glass-panel ledger-history-panel">
        <div className="card-header-accent">
          <div className="accent-pill primary-accent"></div>
          <h3>Recent Ledger Activity</h3>
        </div>
        <div className="empty-ledger-wrapper">
          <svg className="empty-ledger-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM12 6C13.66 6 15 7.34 15 9C15 10.66 13.66 12 12 12C10.34 12 9 10.66 9 9C9 7.34 10.34 6 12 6ZM18 18H6V17C6 15 10 13.9 12 13.9C14 13.9 18 15 18 17V18Z" fill="currentColor"/>
          </svg>
          <p className="empty-ledger-text">No localized ledger historical streams detected.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel ledger-history-panel">
      <div className="card-header-accent">
        <div className="accent-pill primary-accent"></div>
        <h3>Recent Ledger Activity</h3>
      </div>

      {/* Styled Modern Web3 Timeline Stream Container */}
      <div className="timeline-stream-wrapper">
        {transactions.map((tx) => (
          <div key={tx.id} className="timeline-block-item">
            <div className="timeline-connector-node">
              <div className="node-center-dot"></div>
            </div>

            <div className="timeline-card-content">
              <div className="timeline-card-header">
                <span className="timeline-tx-amount">{tx.amount} <span className="ticker-label">XLM</span></span>
                <span className="timeline-timestamp">{new Date(tx.created_at).toLocaleString()}</span>
              </div>

              <div className="timeline-addresses-grid">
                <div className="address-pair-row">
                  <span className="address-role-tag">Sender:</span>
                  <code className="address-mono-str" title={tx.from}>{shortAddress(tx.from)}</code>
                </div>
                <div className="address-pair-row">
                  <span className="address-role-tag">Recipient:</span>
                  <code className="address-mono-str" title={tx.to}>{shortAddress(tx.to)}</code>
                </div>
              </div>

              <div className="timeline-hash-row">
                <code className="timeline-hash-string">{tx.transaction_hash}</code>
              </div>

              <div className="timeline-action-buttons">
                <button 
                  onClick={() => copyHash(tx.transaction_hash)}
                  className="timeline-action-btn copy-btn-utility"
                >
                  Copy Signature
                </button>
                <a
                  href={`https://stellar.expert/explorer/testnet/tx/${tx.transaction_hash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="timeline-explorer-anchor"
                >
                  Stellar.Expert Explorer
                  <svg className="explorer-arrow-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 19L19 5M19 5H10M19 5V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionHistory;