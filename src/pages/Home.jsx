import { useState } from "react";
import Navbar from "../components/Navbar";
import WalletCard from "../components/WalletCard";
import BalanceCard from "../components/BalanceCard";
import SendPayment from "../components/SendPayment";
import StatusCard from "../components/StatusCard";
import TransactionHistory from "../components/TransactionHistory";
import "./Home.css";

function Home() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("0");
  const [txStatus, setTxStatus] = useState("");
  const [txHash, setTxHash] = useState("");
  const [transactions, setTransactions] = useState([]);

  return (
    <div className="dashboard-wrapper">
      {/* Background ambient light system */}
      <div className="ambient-bg">
        <div className="blob blob-purple"></div>
        <div className="blob blob-blue"></div>
      </div>

      <Navbar />

      {/* Premium Web3 Hero Layer */}
      <header className="hero-section animate-fade-in">
        <div className="hero-content">
          <div className="logo-container">
            <svg className="stellar-logo-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="35" stroke="url(#stellarGlow)" strokeWidth="6" strokeDasharray="6 6" />
              <path d="M35 50H65M50 35V65M39 39L61 61M61 39L39 61" stroke="url(#stellarGlow)" strokeWidth="5" strokeLinecap="round"/>
              <defs>
                <linearGradient id="stellarGlow" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#22D3EE" />
                  <stop offset="100%" stopColor="#6366F1" />
                </linearGradient>
              </defs>
            </svg>
            <div className="logo-glow-ring"></div>
          </div>
          
          <span className="network-status-badge">Connected to Stellar Testnet</span>
          <h1 className="gradient-text">StellarPay</h1>
          <p className="hero-subtitle">A Modern Web3 Payment dApp powered by the Stellar Network.</p>
          <p className="hero-description">
            Connect your Freighter wallet, view your XLM balance, and send secure Stellar transactions on the Testnet with an elegant Web3 experience.
          </p>
        </div>
      </header>

      {/* Multi-Column Modern Dashboard Configuration */}
      <main className="dashboard-container animate-slide-up">
        {/* Left Hand: Identity, Liquidity, and Execution Verification States */}
        <div className="dashboard-column structural-left">
          <WalletCard
            address={address}
            setAddress={setAddress}
            setBalance={setBalance}
            setTransactions={setTransactions}
          />
          <BalanceCard balance={balance} />
          <StatusCard txStatus={txStatus} txHash={txHash} />
        </div>

        {/* Right Hand: Asset Relocation Operations & Historical Ledger Streams */}
        <div className="dashboard-column structural-right">
          <SendPayment
            address={address}
            setBalance={setBalance}
            setTxStatus={setTxStatus}
            setTxHash={setTxHash}
            setTransactions={setTransactions}
          />
          <TransactionHistory transactions={transactions} />
        </div>
      </main>
    </div>
  );
}

export default Home;