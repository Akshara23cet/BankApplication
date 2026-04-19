import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [acc, setAcc] = useState("");
  const [p, setP] = useState("");

  const login = async () => {
    const res = await fetch(
      `http://localhost:8080/bank/login?accNo=${acc}&pin=${p}`
    );
    const data = await res.json();

    if (data) {
  navigate("/dashboard", {
  state: { accNo: acc, pin: p }
});} else {
      alert("Invalid Login");
    }
  };

 return (
  <div className="login-container">
    <div className="login-card">
      <h2>🔐 Bank Login</h2>

      <input
        placeholder="Account Number"
        value={acc}
        onChange={(e) => setAcc(e.target.value)}
      />

      <input
        type="password"
        placeholder="PIN"
        value={p}
        onChange={(e) => setP(e.target.value)}
      />

      <button className="login-btn" onClick={login}>
        Login
      </button>
      <button
  className="login-btn secondary-btn"
  onClick={() => navigate("/create")}
>
  Create Account
</button>
    </div>
  </div>
);
}

export default Login;