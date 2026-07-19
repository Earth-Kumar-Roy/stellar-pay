import { useState } from "react";
import { sendPayment, getBalance } from "../services/stellar";

function SendPayment({
  address,
  setBalance,
  setTxStatus,
  setTxHash,
}) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!address) {
      alert("Please connect your wallet first.");
      return;
    }

    if (!recipient || !amount) {
      alert("Recipient and amount are required.");
      return;
    }

    try {
      setLoading(true);
      setTxStatus("");
      setTxHash("");

      const result = await sendPayment(
        address,
        recipient,
        amount,
        memo
      );

      if (result.success) {
        setTxStatus("✅ Transaction Successful");
        setTxHash(result.hash);

        const updatedBalance = await getBalance(address);
        setBalance(updatedBalance);

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
      setTxHash(error.message);
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

      <form onSubmit={handleSubmit} className="premium-form-flow">
        <div className="input-group-wrapper">
          <label className="input-field-label">Recipient Destination</label>
          <div className="input-icon-container">
            <input
              type="text"
              placeholder="G... or Federation Address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="wallet-input-field"
            />
          </div>
        </div>

        <div className="input-group-wrapper">
          <label className="input-field-label">Asset Liquidity Amount</label>
          <div className="input-icon-container balance-input-style">
            <input
              type="number"
              step="0.0000001"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="wallet-input-field"
            />
            <span className="input-inner-badge">XLM</span>
          </div>
        </div>

        <div className="input-group-wrapper">
          <label className="input-field-label">Transaction Memo</label>
          <div className="input-icon-container">
            <input
              type="text"
              placeholder="Text or ID (Optional)"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              className="wallet-input-field"
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className={`submit-action-btn ${loading ? 'btn-loading-state' : ''}`}
        >
          {loading ? (
            <div className="btn-spinner-flow">
              <span className="spinner-dot-node"></span>
              Executing Transaction...
            </div>
          ) : (
            "Send Asset Transfer"
          )}
        </button>
      </form>
    </div>
  );
}

export default SendPayment;