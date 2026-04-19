import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Transfer() {
  const [toAcc, setToAcc] = useState("");
  const [amount, setAmount] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const { accNo, pin } = location.state || {};
  console.log("Transfer Page:", accNo, pin);

if (!accNo || !pin) {
  return <h2>Error: Please login again</h2>;
}
  

  const transfer = async () => {

  console.log("Sending:", accNo, pin, toAcc, amount);

  if (!accNo || !pin || !toAcc || !amount) {
    alert("Please fill all fields properly");
    return;
  }

  const res = await fetch(
    `http://localhost:8080/bank/transfer?fromAcc=${accNo}&pin=${pin}&toAcc=${toAcc}&amount=${amount}`
  );

  const data = await res.text();
  alert(data);
};

  return (
    <div className="content">
      <div className="card">
        <h2>💸 Transfer</h2>

        <input
          placeholder="To Account"
          value={toAcc}
          onChange={(e) => setToAcc(e.target.value)}
        />

        <input
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button className="action-btn" onClick={transfer}>Transfer</button>

        <br /><br />

        <button onClick={() => navigate("/dashboard", { state: { accNo, pin } })}>
          Back
        </button>
      </div>
    </div>
  );
}

export default Transfer;