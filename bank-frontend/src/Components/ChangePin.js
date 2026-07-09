import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ChangePin() {
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Get token from localStorage
  const token = localStorage.getItem("token");

  const changePin = async () => {
    // Validations
    if (!oldPin || !newPin || !confirmPin) {
      alert("Please fill all fields");
      return;
    }
    if (newPin !== confirmPin) {
      alert("New PIN and Confirm PIN do not match");
      return;
    }
    if (newPin === oldPin) {
      alert("New PIN cannot be same as old PIN");
      return;
    }
    if (newPin.length !== 4 || isNaN(newPin)) {
      alert("PIN must be a 4 digit number");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/bank/change-pin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // ✅ Send JWT token in header
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ oldPin, newPin }),
      });

      const data = await res.text();

      if (res.ok) {
        alert("PIN changed successfully! Please login again.");
        // ✅ Clear localStorage and redirect to login
        localStorage.clear();
        navigate("/");
      } else {
        alert(data);
      }
    } catch (err) {
      console.error(err);
      alert("Could not connect to backend server. Make sure Spring Boot is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content">
      <h2>🔑 Change PIN</h2>
      <p style={{ color: "var(--text-muted)", marginBottom: "30px" }}>
        Update your 4-digit security PIN regularly to keep your account safe.
      </p>
      <div className="card">
        <div style={{ textAlign: "left" }}>
          <label>Current PIN</label>
          <input
            type="password"
            placeholder="Enter current PIN"
            value={oldPin}
            onChange={(e) => setOldPin(e.target.value)}
            disabled={loading}
            maxLength={4}
          />

          <label>New PIN</label>
          <input
            type="password"
            placeholder="Enter new PIN"
            value={newPin}
            onChange={(e) => setNewPin(e.target.value)}
            disabled={loading}
            maxLength={4}
          />

          <label>Confirm New PIN</label>
          <input
            type="password"
            placeholder="Re-enter new PIN"
            value={confirmPin}
            onChange={(e) => setConfirmPin(e.target.value)}
            disabled={loading}
            maxLength={4}
          />
        </div>

        <button className="action-btn" onClick={changePin} disabled={loading}>
          {loading ? "Updating..." : "🔑 Update PIN"}
        </button>

        <button
          className="action-btn secondary-btn"
          onClick={() => navigate("/dashboard")}
          disabled={loading}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

export default ChangePin;