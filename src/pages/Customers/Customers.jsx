import { LuDownload, LuUpload } from "react-icons/lu";
import { IoMdAdd } from "react-icons/io";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";
import AddCustomerModal from "../../components/modals/addCustomer";
import "./Customers.css";

function CustomersPage() {

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {

    const fetchCustomers = async () => {

      try {

        const token = localStorage.getItem("access_token");

        const response = await fetch(
          "http://localhost:8000/api/v1/customer?page=1&size=10",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        console.log("Customers:", data);

        setCustomers(data.results);

      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();

  }, []);

  if (loading) {
    return <h2>Loading customers...</h2>;
  }

  return (
    <>
      <div className="header-container">
        <div className="header-left">
          <h2>Customers</h2>
          <span className="breadcrumbs">
            <a href="/dashboard">Dashboard</a>
            <span>&gt;</span>
            <a href="/customers">Customers</a>
          </span>
        </div>

        <div className="header-right">

          <button className="btn btn-export">
            <LuDownload className="btn-icon" />
            Export
          </button>

          <button className="btn btn-upload">
            <LuUpload className="btn-icon" />
            Bulk Upload
          </button>

          <button className="btn btn-add" onClick={()=>setOpenModal(true)}>
            <IoMdAdd className="btn-icon" />
            Add Customer
          </button>

        </div>
      </div>

      <div className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>S.no</b></TableCell>
              <TableCell><b>Customer</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Phone No</b></TableCell>
              <TableCell><b>GST</b></TableCell>
              <TableCell><b>Actions</b></TableCell>

            </TableRow>

          </TableHead>

          <TableBody>
            {customers.map((customer, index) => (
              <TableRow key={customer.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone_number}</TableCell>
                <TableCell>{customer.gst_number}</TableCell>
                <TableCell>
                  <div className="action-buttons">
                    <button className="action-btn">
                      <FaEye />
                    </button>

                    <button className="action-btn">
                      <RiEdit2Fill />
                    </button>

                    <button className="action-btn">
                      <RiDeleteBin2Fill />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </div>
      <AddCustomerModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );

}

export default CustomersPage;