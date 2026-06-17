import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateAccount() {
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const createAccount = async () => {
    if (!name.trim()) {
      alert("Name cannot be empty");
      return;
    }
    if (!pin || isNaN(pin) || parseInt(pin) <= 0) {
      alert("PIN must be a valid positive number");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8080/bank/create?name=${encodeURIComponent(name)}&pin=${pin}`
      );

      const data = await res.text();
      alert(data);
      if (res.ok) {
        navigate("/");
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
        <h2>🆕 Create Account</h2>
        <p>Register as a new customer at Apex Bank</p>

        <div style={{ textAlign: "left" }}>
          <label>Full Name</label>
          <input
            placeholder="e.g., Akshat Sharma"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />

          <label>Set 4-Digit PIN</label>
          <input
            type="password"
            placeholder="e.g., 1234"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            disabled={loading}
            maxLength={4}
          />
        </div>

        <button className="action-btn" onClick={createAccount} disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </button>

        <button
          className="action-btn secondary-btn"
          onClick={() => navigate("/")}
          disabled={loading}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default CreateAccount;