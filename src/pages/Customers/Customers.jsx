import { LuDownload, LuUpload } from "react-icons/lu";
import { IoMdAdd } from "react-icons/io";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";
import AddCustomerModal from "../../components/modals/addCustomer";
import "./Customers.css";
import API_BASE_URL from "../../config/api";

function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem("access_token");
        console.log(page, size);
        const response = await fetch(
          `${API_BASE_URL}api/v1/customer?page=${page}&size=${size}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        setCustomers(data.results);
        setTotal(data.total);

      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, [page, size]);

  const totalPages = Math.ceil(total / size);

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

          <button className="btn btn-add" onClick={() => setOpenModal(true)}>
            <IoMdAdd className="btn-icon" />
            Add Customer
          </button>
        </div>
      </div>

      <div className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>S.no</b>
              </TableCell>
              <TableCell>
                <b>Customer</b>
              </TableCell>
              <TableCell>
                <b>Email</b>
              </TableCell>
              <TableCell>
                <b>Phone No</b>
              </TableCell>
              <TableCell>
                <b>GST</b>
              </TableCell>
              <TableCell>
                <b>Actions</b>
              </TableCell>
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
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
      <AddCustomerModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}

export default CustomersPage;
