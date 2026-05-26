import { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

import { FaEye } from "react-icons/fa";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";

import "./InvoiceList.css";
import API_BASE_URL from "../../config/api";

function InvoiceList() {

  const [invoices, setInvoices] = useState([]);

  const [page, setPage] = useState(1);

  const [size] = useState(10);

  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);

  // ================= FETCH INVOICES =================

  useEffect(() => {

    const fetchInvoices = async () => {

      try {

        setLoading(true);

        const token = localStorage.getItem("access_token");

        const response = await fetch(
          `${API_BASE_URL}api/v1/invoices/list/?page=${page}&size=${size}`,
          {
            method: "GET",

            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        console.log("Invoices:", data);

        setInvoices(data.results || []);

        setTotal(data.total || 0);

      } catch (error) {

        console.error("Error fetching invoices:", error);

      } finally {

        setLoading(false);
      }
    };

    fetchInvoices();

  }, [page, size]);

  const totalPages = Math.ceil(total / size);

  return (
    <div className="invoice-list-container">

      {/* HEADER */}

      <div className="header-container">

        <div className="header-left">

          <h2>Invoices</h2>

          <span className="breadcrumbs">

            <a href="/dashboard">Dashboard</a>

            <span>&gt;</span>

            <a href="/invoices">Invoices</a>

          </span>

        </div>

      </div>

      {/* TABLE */}

      <TableContainer
        component={Paper}
        className="table-container"
      >

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>
                <b>S.No</b>
              </TableCell>

              <TableCell>
                <b>Invoice Number</b>
              </TableCell>

              <TableCell>
                <b>Customer</b>
              </TableCell>

              <TableCell>
                <b>Grand Total</b>
              </TableCell>

              <TableCell>
                <b>Invoice Date</b>
              </TableCell>

              <TableCell align="center">
                <b>Actions</b>
              </TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {loading ? (

              <TableRow>

                <TableCell colSpan={6} align="center">
                  Loading invoices...
                </TableCell>

              </TableRow>

            ) : invoices.length === 0 ? (

              <TableRow>

                <TableCell colSpan={6} align="center">
                  No invoices found
                </TableCell>

              </TableRow>

            ) : (

              invoices.map((invoice, index) => (

                <TableRow key={invoice.id}>

                  <TableCell>
                    {(page - 1) * size + index + 1}
                  </TableCell>

                  <TableCell>
                    {invoice.invoice_number}
                  </TableCell>

                  <TableCell>
                    {invoice.customer?.name || "N/A"}
                  </TableCell>

                  <TableCell>
                    ₹{invoice.grand_total}
                  </TableCell>

                  <TableCell>
                    {new Date(
                      invoice.created_at
                    ).toLocaleDateString()}
                  </TableCell>

                  <TableCell>

                    <div className="action-buttons">

                      <button className="action-btn view-btn">
                        <FaEye />
                      </button>

                      <button className="action-btn edit-btn">
                        <RiEdit2Fill />
                      </button>

                      <button className="action-btn delete-btn">
                        <RiDeleteBin2Fill />
                      </button>

                    </div>

                  </TableCell>

                </TableRow>
              ))
            )}

          </TableBody>

        </Table>

      </TableContainer>

      {/* PAGINATION */}

      <div className="pagination">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages || 1}
        </span>

        <button
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>

      </div>

    </div>
  );
}

export default InvoiceList;