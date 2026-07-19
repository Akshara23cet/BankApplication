import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Withdraw() {
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Get token from localStorage
  const token = localStorage.getItem("token");

  const withdraw = async () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      alert("Please enter a valid positive withdrawal amount");
      return;
    }
    if (!pin) {
      alert("Please enter your PIN to confirm");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/bank/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // ✅ Send JWT token in header
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ pin, amount }),
      });

      const data = await res.text();
      alert(data);

      if (res.ok) {
        setAmount("");
        setPin("");
      }
    } catch (err) {
      console.error(err);
      alert("Could not connect to backend server. Make sure Spring Boot is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content">
      <h2>💳 Withdraw Funds</h2>
      <p style={{ color: "var(--text-muted)", marginBottom: "30px" }}>
        Withdraw funds from your FinVault account.
      </p>
      <div className="card">
        <div style={{ textAlign: "left" }}>
          <label>Withdrawal Amount (₹)</label>
          <input
            type="number"
            placeholder="Enter amount (e.g., 150)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={loading}
          />

          <label>Confirm PIN</label>
          <input
            type="password"
            placeholder="Enter your PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            disabled={loading}
            maxLength={4}
          />
        </div>

        <button className="action-btn" onClick={withdraw} disabled={loading}>
          {loading ? "Processing..." : "💳 Withdraw"}
        </button>

        <button
          className="action-btn secondary-btn"
          onClick={() => navigate("/dashboard")}
          disabled={loading}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Withdraw;