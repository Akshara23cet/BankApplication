import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [acc, setAcc] = useState("");
  const [p, setP] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!acc || !p) {
      alert("Please enter both Account Number and PIN");
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8080/bank/login?accNo=${acc}&pin=${p}`
      );
      
      if (res.ok) {
        const data = await res.json();
        if (data) {
          sessionStorage.setItem("accNo", data.accountNo);
          sessionStorage.setItem("pin", p);
          sessionStorage.setItem("name", data.name);
          navigate("/dashboard");
        } else {
          alert("Invalid Login. Please check your details.");
        }
      } else {
        alert("Invalid Account Number or PIN.");
      }
    } catch (err) {
      console.error(err);
      alert("Could not connect to backend server. Make sure Spring Boot is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>🏦 APEX BANK</h2>
        <p>Secure Online Banking Portal</p>

        <div style={{ textAlign: "left" }}>
          <label>Account Number</label>
          <input
            placeholder="e.g., 1001"
            value={acc}
            onChange={(e) => setAcc(e.target.value)}
            disabled={loading}
          />

          <label>Secret PIN</label>
          <input
            type="password"
            placeholder="••••"
            value={p}
            onChange={(e) => setP(e.target.value)}
            disabled={loading}
            maxLength={4}
          />
        </div>

        <button className="action-btn" onClick={login} disabled={loading}>
          {loading ? "Verifying..." : "🔐 Secure Login"}
        </button>
        
        <button
          className="action-btn secondary-btn"
          onClick={() => navigate("/create")}
          disabled={loading}
        >
          🆕 Create New Account
        </button>
      </div>
    </div>
  );
}

export default Login;