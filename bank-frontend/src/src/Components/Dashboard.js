import { useState, useEffect } from "react";

function Dashboard() {
  const accNo = sessionStorage.getItem("accNo");
  const pin = sessionStorage.getItem("pin");
  const name = sessionStorage.getItem("name");
  const [balance, setBalance] = useState("Loading...");

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/bank/login?accNo=${accNo}&pin=${pin}`
        );
        if (res.ok) {
          const data = await res.json();
          setBalance(`$${data.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}`);
        } else {
          setBalance("Error loading");
        }
      } catch (err) {
        console.error(err);
        setBalance("Unavailable");
      }
    };

    if (accNo && pin) {
      fetchBalance();
    }
  }, [accNo, pin]);

  // Format account number for credit card display
  const formatCardNumber = (num) => {
    if (!num) return "";
    const str = num.toString().padStart(4, "0");
    return `4310  8820  1400  ${str}`;
  };

  return (
    <div className="content">
      <h2>Welcome Back, {name || "Customer"}!</h2>
      <p style={{ color: "var(--text-muted)", marginBottom: "30px" }}>
        Here is your account overview and active debit card.
      </p>

      <div className="dashboard-grid">
        <div>
          {/* Virtual Bank Card */}
          <div className="virtual-card">
            <div className="card-header">
              <span className="card-logo">APEX GOLD</span>
              <div className="card-chip"></div>
            </div>
            
            <div className="card-balance-section">
              <div className="card-balance-label">Available Balance</div>
              <div className="card-balance-amount">{balance}</div>
            </div>
            
            <div className="card-footer">
              <div className="card-holder">
                <div style={{ fontSize: "0.65rem", opacity: 0.7 }}>Card Holder</div>
                {name || "Valued Customer"}
              </div>
              <div className="card-number">{formatCardNumber(accNo)}</div>
            </div>
          </div>

          <div className="card" style={{ maxWidth: "100%", marginTop: "20px" }}>
            <h3 style={{ marginBottom: "15px", color: "var(--text-main)" }}>💡 Apex Security Tip</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.6" }}>
              Never share your 4-digit security PIN with anyone, including bank staff. Change your PIN regularly using the service menu to ensure your funds remain secure.
            </p>
          </div>
        </div>

        <div className="card" style={{ height: "fit-content" }}>
          <h3 style={{ marginBottom: "20px", color: "var(--text-main)" }}>⚙️ Quick Navigation Guide</h3>
          
          <ul style={{ color: "var(--text-muted)", paddingLeft: "20px", lineHeight: "2" }}>
            <li>
              <strong style={{ color: "var(--accent-blue)" }}>Deposit:</strong> Add funds instantly using simulate payment.
            </li>
            <li>
              <strong style={{ color: "var(--accent-blue)" }}>Withdraw:</strong> Securely cash out from your available balance.
            </li>
            <li>
              <strong style={{ color: "var(--accent-blue)" }}>Transfer:</strong> Move funds to any active Apex account in real-time.
            </li>
            <li>
              <strong style={{ color: "var(--accent-blue)" }}>Transactions:</strong> Track and filter your complete credit/debit logs.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;