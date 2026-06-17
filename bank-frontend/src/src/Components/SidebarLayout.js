import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

function SidebarLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const accNo = sessionStorage.getItem("accNo");

  // Route Guard: Automatically redirect to login page if session is missing
  useEffect(() => {
    if (!accNo) {
      navigate("/");
    }
  }, [accNo, navigate]);

  if (!accNo) return null;

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="container">
      <div className="sidebar">
        <h3>🏦 APEX BANK</h3>
        
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
