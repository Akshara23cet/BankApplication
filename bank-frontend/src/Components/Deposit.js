import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Deposit() {
  const [amount, setAmount] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const { accNo, pin } = location.state || {};

  const deposit = async () => {
    const res = await fetch(
      `http://localhost:8080/bank/deposit?accNo=${accNo}&pin=${pin}&amount=${amount}`
    );
    const data = await res.text();
    alert(data);
    setAmount("");
  };

  return (
    <div className="content">
      <div className="card">
        <h2>💰 Deposit</h2>

        <input
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button className="action-btn" onClick={deposit}>Deposit</button>

        <br /><br />

        <button onClick={() => navigate("/dashboard", { state: { accNo, pin } })}>
          Back
        </button>
      </div>
    </div>
  );
}

export default Deposit;