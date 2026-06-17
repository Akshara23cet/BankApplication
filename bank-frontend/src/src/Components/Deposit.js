import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Deposit() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const accNo = sessionStorage.getItem("accNo");
  const pin = sessionStorage.getItem("pin");

  const deposit = async () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      alert("Please enter a valid positive deposit amount");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8080/bank/deposit?accNo=${accNo}&pin=${pin}&amount=${amount}`
      );
      
      const data = await res.text();
      alert(data);
      if (res.ok) {
        setAmount("");
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
      <h2>💵 Deposit Funds</h2>
      <p style={{ color: "var(--text-muted)", marginBottom: "30px" }}>
        Add funds directly to your Apex bank account.
      </p>

      <div className="card">
        <div style={{ textAlign: "left" }}>
          <label>Deposit Amount ($)</label>
          <input
            type="number"
            placeholder="Enter amount (e.g., 500)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={loading}
          />
        </div>

        <button className="action-btn" onClick={deposit} disabled={loading}>
          {loading ? "Processing..." : "💰 Confirm Deposit"}
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

export default Deposit;