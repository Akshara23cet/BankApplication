import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateAccount() {
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");

  const navigate = useNavigate();

  const createAccount = async () => {
    const res = await fetch(
      `http://localhost:8080/bank/create?name=${name}&pin=${pin}`
    );

    const data = await res.text();
    alert(data);
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>🆕 Create Account</h2>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />

        <button className="login-btn" onClick={createAccount}>
          Create Account
        </button>

        <button
          className="login-btn secondary-btn"
          onClick={() => navigate("/")}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default CreateAccount;