import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

function SidebarLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get token from localStorage instead of sessionStorage
  const token = localStorage.getItem("token");
  const accNo = localStorage.getItem("accNo");
  const name = localStorage.getItem("name");

  // ✅ Redirect to login if no token
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  if (!token) return null;

  const handleLogout = () => {
    // ✅ Clear localStorage on logout
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="container">
      <div className="sidebar">
        <h3>🏦 APEX BANK</h3>

        {/* ✅ Show user info in sidebar */}
        <div style={{
          padding: "10px",
          marginBottom: "15px",
          borderBottom: "1px solid rgba(255,255,255,0.1)"
        }}>
          <p style={{ color: "#ccc", fontSize: "13px", margin: 0 }}>👤 {name}</p>
          <p style={{ color: "#aaa", fontSize: "12px", margin: 0 }}>Acc: {accNo}</p>
        </div>

        <div className="sidebar-menu">
          <button
            className={location.pathname === "/dashboard" ? "active" : ""}
            onClick={() => navigate("/dashboard")}
          >
            🏠 Dashboard
          </button>
          <button
            className={location.pathname === "/deposit" ? "active" : ""}
            onClick={() => navigate("/deposit")}
          >
            💵 Deposit Funds
          </button>
          <button
            className={location.pathname === "/withdraw" ? "active" : ""}
            onClick={() => navigate("/withdraw")}
          >
            💳 Withdraw Funds
          </button>
          <button
            className={location.pathname === "/transfer" ? "active" : ""}
            onClick={() => navigate("/transfer")}
          >
            💸 Transfer Funds
          </button>
          <button
            className={location.pathname === "/transactions" ? "active" : ""}
            onClick={() => navigate("/transactions")}
          >
            📄 Transactions
          </button>
          <button
            className={location.pathname === "/balance" ? "active" : ""}
            onClick={() => navigate("/balance")}
          >
            💰 Check Balance
          </button>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
      <Outlet />
    </div>
  );
}

export default SidebarLayout;