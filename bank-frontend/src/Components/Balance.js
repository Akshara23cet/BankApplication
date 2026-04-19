import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Balance() {
  const [balance, setBalance] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const { accNo, pin } = location.state || {};

  const getBalance = async () => {
    const res = await fetch(
      `http://localhost:8080/bank/balance?accNo=${accNo}&pin=${pin}`
    );
    const data = await res.text();
    setBalance(data);
  };

  return (
    <div className="content">
      <div className="card">
        <h2>💰 Balance</h2>

        <button className="action-btn" onClick={getBalance}>
          Check Balance
        </button>

        {balance && <h3>{balance}</h3>}

        <br />

        <button onClick={() => navigate("/dashboard", { state: { accNo, pin } })}>
          Back
        </button>
      </div>
    </div>
  );
}

export default Balance;