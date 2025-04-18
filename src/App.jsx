import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Register from "./Register";
import DownlineView from "./DownlineView";
import Profile from "./Profile";
import BankData from "./BankData";
import ForgotPassword from "./ForgotPassword"
import AdminDashboard from "./AdminDashboard";
import UserManage from "./UserManage";
import DepositPage from "./DepositPage";
import { ToastContainer } from "react-toastify";
import CapitalPage from "./CapitalPage";
import Invest from "./Invest";
import Transactions from "./Transactions";
import ViewInvestmentsPage from "./ViewInvestmentsPage";
import ViewWithdrawlsPage from "./ViewWithdrawlsPage";
import ViewDepositsPage from "./ViewDepositsPage";
import CreditsPage from "./CreditsPage";
import TransferPage from "./TransferPage";
import NewJoining from "./NewJoining";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        {/* <Route path="/" element={<Login />}/> */}
        <Route path="/login" element={<Login />}/>
        <Route path="/admin/login" element={<Login isAdmin={true} />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/credits" element={<CreditsPage />}/>
        <Route path="/withdrawals" element={<CreditsPage from="withdrawals" />}/>
        <Route path="/transfer" element={<TransferPage />}/>
        <Route path="/Dashboard" element={<Dashboard />}/>
        <Route path="/new-joining/:sponsorId" element={<Register from="dashboard" />}/>
        <Route path="/ih/register/:sponsorId" element={<Register from="dashboard" />}/>
        <Route path="/deposit" element={<DepositPage />}/>
        <Route path="/fundwallet" element={<CapitalPage />}/>
        <Route path="/tokenwallet" element={<Invest />}/> 
        <Route path="/forgot-pass" element={<ForgotPassword />}/> 
        <Route path="/transactions/:userId" element={<Transactions />}/>
        <Route path="/admin" element={<AdminDashboard />}/>
        <Route path="/admin/manage-users" element={<UserManage />}/>
        <Route path="/admin/investments" element={<ViewInvestmentsPage />}/>
        <Route path="/admin/request/withdrawal" element={<ViewWithdrawlsPage />}/>
        <Route path="/admin/request/deposit" element={<ViewDepositsPage />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/profile/bank" element={<BankData />}/>
        <Route path="/downline/:userId" element={<DownlineView />}/>
        <Route path="/downline/direct/:userId" element={<DownlineView type='direct' />}/>
      </Routes>
      <ToastContainer />
    </Router>
  )
}

export default App
