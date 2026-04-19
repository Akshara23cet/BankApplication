import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Withdraw() {
  const [amount, setAmount] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const { accNo, pin } = location.state || {};

  const withdraw = async () => {
    const res = await fetch(
      `http://localhost:8080/bank/withdraw?accNo=${accNo}&pin=${pin}&amount=${amount}`
    );
    const data = await res.text();
    alert(data);
    setAmount("");
  };

  return (
    <div className="content">
      <div className="card">
        <h2>💳 Withdraw</h2>

        <input
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button className="action-btn" onClick={withdraw}>Withdraw</button>

        <br /><br />

        <button onClick={() => navigate("/dashboard", { state: { accNo, pin } })}>
          Back
        </button>
      </div>
    </div>
  );
}

export default Withdraw;