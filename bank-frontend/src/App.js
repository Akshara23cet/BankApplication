import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Deposit from "./Components/Deposit";
import Withdraw from "./Components/Withdraw";
import Transfer from "./Components/Transfer";
import Transactions from "./Components/Transactions";
import Balance from "./Components/Balance";
import CreateAccount from "./Components/CreateAccount";
import SidebarLayout from "./Components/SidebarLayout";
import ChangePin from "./Components/ChangePin"; // ✅ NEW

import "./styles.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create" element={<CreateAccount />} />

        <Route element={<SidebarLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/balance" element={<Balance />} />
          <Route path="/change-pin" element={<ChangePin />} /> {/* ✅ NEW */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;