import { useState } from "react";
import * as StellarSdk from "@stellar/stellar-sdk";
import {
  sendPayment,
  getBalance,
  getTransactions,
} from "../services/stellar";

function SendPayment({
  address,
  balance,
  setBalance,
  setTxStatus,
  setTxHash,
  setTransactions,
}) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (loading) return;

    // Wallet not connected
    if (!address) {
      alert("Please connect your Freighter wallet first.");
      return;
    }

    // Recipient required
    if (!recipient.trim()) {
      alert("Recipient wallet address is required.");
      return;
    }

    // Amount required
    if (!amount.trim()) {
      alert("Please enter an amount.");
      return;
    }

    const numericAmount = Number(amount);

    // Amount must be positive
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert("Amount must be greater than 0 XLM.");
      return;
    }

    // Maximum 7 decimal places
    if (!/^\d+(\.\d{1,7})?$/.test(amount)) {
      alert("XLM supports a maximum of 7 decimal places.");
      return;
    }

    // Cannot send to yourself
    if (recipient.trim() === address.trim()) {
      alert("You cannot send XLM to your own wallet.");
      return;
    }

    // Validate Stellar address
    if (
      !StellarSdk.StrKey.isValidEd25519PublicKey(
        recipient.trim()
      )
    ) {
      alert("Invalid Stellar wallet address.");
      return;
    }

    // Memo validation
    if (memo.length > 28) {
      alert("Memo cannot exceed 28 characters.");
      return;
    }

    // ===============================
    // FETCH LATEST BALANCE FROM NETWORK
    // ===============================
    const latestBalance = await getBalance(address);
    const numericBalance = Number(latestBalance);

    // Refresh UI balance
    setBalance(latestBalance);

    // Keep 1 XLM reserve
    const reserve = 1;
    const spendableBalance = numericBalance - reserve;

    if (numericAmount > spendableBalance) {
      alert(
        `Insufficient balance.\n\nCurrent Balance: ${numericBalance.toFixed(
          7
        )} XLM\nAvailable to Spend: ${spendableBalance.toFixed(
          7
        )} XLM`
      );
      return;
    }

    try {
      setLoading(true);

      setTxStatus("");
      setTxHash("");

      const result = await sendPayment(
        address,
        recipient.trim(),
        amount,
        memo.trim()
      );

      if (result.success) {
        setTxStatus("✅ Transaction Successful");
        setTxHash(result.hash);

        // Refresh balance
        const updatedBalance = await getBalance(address);
        setBalance(updatedBalance);

        // Refresh history
        if (setTransactions) {
          const history = await getTransactions(address);
          setTransactions(history);
        }

        // Clear form
        setRecipient("");
        setAmount("");
        setMemo("");
      } else {
        setTxStatus("❌ Transaction Failed");
        setTxHash(result.error);
      }
    } catch (error) {
      console.error(error);

      setTxStatus("❌ Transaction Failed");

      setTxHash(
        error.message ||
          "Something went wrong while sending the transaction."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass-panel payment-form-panel">
      <div className="card-header-accent">
        <div className="accent-pill primary-accent"></div>
        <h3>Send XLM</h3>
      </div>

      <form
        onSubmit={handleSubmit}
        className="premium-form-flow"
      >
        <div className="input-group-wrapper">
          <label className="input-field-label">
            Recipient Destination
          </label>

          <div className="input-icon-container">
            <input
              type="text"
              placeholder="GXXXXXXXXXXXXXXXXXXXXXXXX"
              value={recipient}
              disabled={loading}
              onChange={(e) => setRecipient(e.target.value)}
              className="wallet-input-field"
            />
          </div>
        </div>

        <div className="input-group-wrapper">
          <label className="input-field-label">
            Asset Amount
          </label>

          <div className="input-icon-container balance-input-style">
            <input
              type="number"
              step="0.0000001"
              min="0.0000001"
              placeholder="0.0000000"
              value={amount}
              disabled={loading}
              onChange={(e) => setAmount(e.target.value)}
              className="wallet-input-field"
            />

            <span className="input-inner-badge">
              XLM
            </span>
          </div>
        </div>

        <div className="input-group-wrapper">
          <label className="input-field-label">
            Transaction Memo
          </label>

          <div className="input-icon-container">
            <input
              type="text"
              maxLength={28}
              placeholder="Optional"
              value={memo}
              disabled={loading}
              onChange={(e) => setMemo(e.target.value)}
              className="wallet-input-field"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`submit-action-btn ${
            loading ? "btn-loading-state" : ""
          }`}
        >
          {loading ? (
            <div className="btn-spinner-flow">
              <span className="spinner-dot-node"></span>
              Sending Transaction...
            </div>
          ) : (
            "Send XLM"
          )}
        </button>
      </form>
    </div>
  );
}

export default SendPayment;