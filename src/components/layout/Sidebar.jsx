import { Link } from "react-router-dom";
import "./Sidebar.css";
import { MdDashboard } from "react-icons/md";
import { MdInventory2 } from "react-icons/md";
import { FaCalculator, FaUsers } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { BsClockHistory } from "react-icons/bs";
import { GiClassicalKnowledge, GiExpense } from "react-icons/gi";
import { CiLogout } from "react-icons/ci";

function Sidebar() {
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  return (
    <div className="sidebar">
      <div className="app-name">
        <button className="app-icon">
          <GiClassicalKnowledge />
          DevLegder
        </button>
      </div>

      <nav className="nav-links">
        <Link to="/dashboard">
          <MdDashboard className="nav-icon" />
          Dashboard
        </Link>

        <Link to="/billing">
          <FaCalculator className="nav-icon" />
          Billing
        </Link>

        <Link to="/products">
          <MdInventory2 className="nav-icon" />
          Products
        </Link>

        <Link to="/customers">
          <FaUsers className="nav-icon" />
          Customers
        </Link>

        <Link to="/estimates">
          <HiDocumentText className="nav-icon" />
          Estimates
        </Link>

        <Link to="/invoices">
          <FaFileInvoiceDollar className="nav-icon" />
          Invoices
        </Link>

        <Link to="/timesheet">
          <BsClockHistory className="nav-icon" />
          Time Sheet
        </Link>

        <Link to="/expenses">
          <GiExpense className="nav-icon" />
          Expenses
        </Link>

        <button className="logout-button" onClick={handleLogout}>
          <CiLogout className="logout-icon" />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;
