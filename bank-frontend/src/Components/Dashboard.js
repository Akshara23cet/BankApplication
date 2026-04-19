import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


function Dashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const { accNo, pin } = location.state || {};  
    const [transactions, setTransactions] = useState([]);
    console.log("Dashboard:", accNo, pin);


  const [amount, setAmount] = useState("");
  const [toAcc, setToAcc] = useState("");

  const getTransactions = async () => {
    const res = await fetch(
      `http://localhost:8080/bank/transactions?accNo=${accNo}`
    );
    const data = await res.json();
    setTransactions(data);
  };
  const deposit = async () => {
  const res = await fetch(
    `http://localhost:8080/bank/deposit?accNo=${accNo}&pin=${pin}&amount=${amount}`
  );
  const data = await res.text();
  alert(data);
};

const withdraw = async () => {
  const res = await fetch(
    `http://localhost:8080/bank/withdraw?accNo=${accNo}&pin=${pin}&amount=${amount}`
  );
  const data = await res.text();
  alert(data);
};

const transfer = async () => {
  const res = await fetch(
    `http://localhost:8080/bank/transfer?fromAcc=${accNo}&pin=${pin}&toAcc=${toAcc}&amount=${amount}`
  );
  const data = await res.text();
  alert(data);
};

  return (
  <div className="container">

  <div className="sidebar">
    <h3>🏦 Bank</h3>

    <button onClick={() => navigate("/deposit", { state: { accNo, pin } })}>Deposit</button>
    <button onClick={() => navigate("/withdraw", { state: { accNo, pin } })}>Withdraw</button>
    <button onClick={() => navigate("/transfer", { state: { accNo, pin } })}>Transfer</button>
    <button onClick={() => navigate("/transactions", { state: { accNo, pin } })}>Transactions</button>
    <button onClick={() => navigate("/balance", { state: { accNo, pin } })}>Balance</button>

    <button onClick={() => navigate("/")}>Logout</button>
  </div>

  <div className="content">
    <h2>Welcome to Dashboard</h2>
    <p>Select an option from sidebar</p>
  </div>

</div>
  );
}

export default Dashboard;