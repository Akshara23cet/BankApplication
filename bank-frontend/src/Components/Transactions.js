import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Get token from localStorage
  const token = localStorage.getItem("token");

  const loadTransactions = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/bank/transactions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // ✅ Send JWT token in header
          "Authorization": `Bearer ${token}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        setTransactions(data);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to load transaction history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadTransactions();
    } else {
      navigate("/");
    }
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getBadgeClass = (type) => {
    switch (type) {
      case "DEPOSIT": return "badge badge-deposit";
      case "WITHDRAW": return "badge badge-withdraw";
      case "TRANSFER_IN": return "badge badge-transfer-in";
      case "TRANSFER_OUT": return "badge badge-transfer-out";
      default: return "badge";
    }
  };

  const formatType = (type) => {
    return type.replace("_", " ");
  };

  const filteredTransactions = transactions.filter((t) => {
    if (filter === "ALL") return true;
    if (filter === "TRANSFERS") return t.type.startsWith("TRANSFER");
    return t.type === filter;
  });

  return (
    <div className="content" style={{ maxWidth: "100%" }}>
      <h2>📄 Transaction History</h2>
      <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>
        Review and filter your account credit and debit history.
      </p>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", flexWrap: "wrap", gap: "15px" }}>
        <div className="tab-container" style={{ margin: 0 }}>
          <button className={`tab-btn ${filter === "ALL" ? "active" : ""}`} onClick={() => setFilter("ALL")}>All</button>
          <button className={`tab-btn ${filter === "DEPOSIT" ? "active" : ""}`} onClick={() => setFilter("DEPOSIT")}>Deposits</button>
          <button className={`tab-btn ${filter === "WITHDRAW" ? "active" : ""}`} onClick={() => setFilter("WITHDRAW")}>Withdrawals</button>
          <button className={`tab-btn ${filter === "TRANSFERS" ? "active" : ""}`} onClick={() => setFilter("TRANSFERS")}>Transfers</button>
        </div>
        <button className="action-btn" onClick={loadTransactions} disabled={loading} style={{ width: "auto" }}>
          🔄 {loading ? "Loading..." : "Refresh Logs"}
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Amount</th>
              <th>Balance Post-Txn</th>
              <th>Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ padding: "40px", color: "var(--text-muted)" }}>
                  No transactions found matching this filter.
                </td>
              </tr>
            ) : (
              filteredTransactions.map((t, index) => (
                <tr key={index}>
                  <td>
                    <span className={getBadgeClass(t.type)}>
                      {formatType(t.type)}
                    </span>
                  </td>
                  <td style={{
                    fontWeight: "bold",
                    color: t.type === "DEPOSIT" || t.type === "TRANSFER_IN" ? "var(--success)" : "var(--danger)"
                  }}>
                    {t.type === "DEPOSIT" || t.type === "TRANSFER_IN" ? "+" : "-"}₹{t.amount.toFixed(2)}
                  </td>
                  <td style={{ fontWeight: "600" }}>₹{t.balance.toFixed(2)}</td>
                   <td style={{ color: "var(--text-muted)" }}>{formatDate(t.txn_time)}</td>                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <button
        className="action-btn secondary-btn"
        onClick={() => navigate("/dashboard")}
        style={{ marginTop: "25px", width: "auto" }}
      >
        Go to Dashboard
      </button>
    </div>
  );
}

export default Transactions;