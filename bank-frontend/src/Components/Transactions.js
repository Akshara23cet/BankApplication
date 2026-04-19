import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("ALL");

  const location = useLocation();
  const navigate = useNavigate();

  const { accNo } = location.state || {};

  const loadTransactions = async () => {
    const res = await fetch(
      `http://localhost:8080/bank/transactions?accNo=${accNo}`
    );
    const data = await res.json();
    setTransactions(data);
  };

  return (
    <div className="content">
      <div className="card">
        <h2>📄 Transactions</h2>

        <button className="action-btn" onClick={loadTransactions}>
          Load Transactions
        </button>
        <div>
  <button className="action-btn" onClick={() => setFilter("ALL")}>All</button>
  <button className="action-btn" onClick={() => setFilter("DEPOSIT")}>Deposit</button>
  <button className="action-btn" onClick={() => setFilter("WITHDRAW")}>Withdraw</button>
</div>

        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Amount</th>
              <th>Balance</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {transactions
  .filter((t) => filter === "ALL" || t.type === filter)
  .map((t, index) => (
              <tr key={index}>
                <td>{t.type}</td>
                <td>{t.amount}</td>
                <td>{t.balance}</td>
                <td>{t.txn_time}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <br />

        <button onClick={() => navigate("/dashboard", { state: { accNo } })}>
          Back
        </button>
      </div>
    </div>
  );
}

export default Transactions;