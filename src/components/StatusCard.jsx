import React from "react";

function StatusCard({ txStatus, txHash }) {
  // Compute context style mapping safely based on internal content keys
  const isSuccess = txStatus?.includes("Successful");
  const isFailed = txStatus?.includes("Failed");
  
  let layoutClass = "status-idle";
  if (isSuccess) layoutClass = "status-success-alert";
  if (isFailed) layoutClass = "status-error-alert";

  return (
    <div className={`glass-panel status-card-panel ${layoutClass}`}>
      <div className="card-header-accent">
        <div className="accent-pill status-accent"></div>
        <h3>Transaction Status</h3>
      </div>

      <div className="status-message-wrapper">
        <p className="status-main-text">{txStatus || "No recent transaction activity detected."}</p>
      </div>

      {txHash && (
        <div className="hash-reveal-box">
          <p className="hash-field-label">{isFailed ? "Error Context Payload" : "Network Transaction Ledger Hash"}</p>
          <code className="hash-code-block">{txHash}</code>
        </div>
      )}
    </div>
  );
}

export default StatusCard;