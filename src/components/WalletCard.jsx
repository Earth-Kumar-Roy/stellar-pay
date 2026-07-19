import React from "react";
import { connectWallet, getBalance, getTransactions } from "../services/stellar";

function WalletCard({ address, setAddress, setBalance, setTransactions }) {
  async function handleConnect() {
    try {
      const walletAddress = await connectWallet();
      if (!walletAddress) return;

      setAddress(walletAddress);

      const xlmBalance = await getBalance(walletAddress);
      setBalance(xlmBalance);

      const history = await getTransactions(walletAddress);
      setTransactions(history);
    } catch (error) {
      console.error(error);
      alert("Failed to connect wallet.");
    }
  }

  function handleDisconnect() {
    setAddress("");
    setBalance("0");
  }

  // Format addresses gracefully for modern Web3 displays
  const truncatedAddress = address 
    ? `${address.slice(0, 6)}...${address.slice(-6)}`
    : "Not Connected";

  return (
    <div className="glass-panel wallet-card-panel">
      <div className="card-header-accent">
        <div className="accent-pill alternate-accent"></div>
        <h3>Account Identity</h3>
      </div>

      <div className="wallet-identity-block">
        <div className={`wallet-avatar-frame ${address ? 'wallet-active-glow' : ''}`}>
          <svg className="avatar-vector" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 7 2 12 2ZM12 6C13.93 6 15.5 7.57 15.5 9.5C15.5 11.43 13.93 13 12 13C10.07 13 8.5 11.43 8.5 9.5C8.5 7.57 10.07 6 12 6ZM12 18C9.08 18 6.54 16.5 5.07 14.22C5.11 11.91 9.69 10.65 12 10.65C14.3 10.65 18.88 11.91 18.93 14.22C17.46 16.5 14.92 18 12 18Z" fill="currentColor"/>
          </svg>
        </div>
        
        <div className="wallet-meta-content">
          <p className="address-meta-label">Active Public Key</p>
          <code className="address-display-box" title={address || "No Wallet Available"}>
            {truncatedAddress}
          </code>
        </div>
      </div>

      <div className="wallet-action-container">
        {address ? (
          <button onClick={handleDisconnect} className="disconnect-action-btn">
            Disconnect Session
          </button>
        ) : (
          <button onClick={handleConnect} className="connect-action-btn">
            Connect Freighter Wallet
          </button>
        )}
      </div>
    </div>
  );
}

export default WalletCard;