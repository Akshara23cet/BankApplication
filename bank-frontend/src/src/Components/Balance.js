import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Balance() {
  const [balance, setBalance] = useState("Loading...");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const accNo = sessionStorage.getItem("accNo");
  const pin = sessionStorage.getItem("pin");

  const getBalance = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8080/bank/balance?accNo=${accNo}&pin=${pin}`
      );
      if (res.ok) {
        const data = await res.text();
        setBalance(data);
      } else {
        setBalance("Could not retrieve balance");
      }
    } catch (err) {
      console.error(err);
      setBalance("Unavailable");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accNo && pin) {
      getBalance();
    }
  }, [accNo, pin]);

  return (
    <div className="content">
      <h2>💰 Check Balance</h2>
      <p style={{ color: "var(--text-muted)", marginBottom: "30px" }}>
        Review your real-time available funds securely.
      </p>

      <div className="card">
        <h3 style={{ color: "var(--text-muted)", fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>
          Account Balance
        </h3>
        
        <div style={{ margin: "20px 0" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--text-main)" }}>
            {balance}
          </h1>
        </div>

        <button 
          className="action-btn" 
          onClick={getBalance} 
          disabled={loading}
          style={{ marginBottom: "15px" }}
        >
          🔄 {loading ? "Refreshing..." : "Refresh Balance"}
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

export default Balance;