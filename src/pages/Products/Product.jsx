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

import "./Product.css";
import AddProductModal from "../../components/modals/addProduct";
import { FaEye } from "react-icons/fa";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";
import API_BASE_URL from "../../config/api";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("access_token");

        const response = await fetch(
          `${API_BASE_URL}api/v1/products?page=${page}&size=${size}`,
          {
            method: "GET",

            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        console.log("Products:", data);

        setProducts(data.results);
        setTotal(data.total);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [page, size]);

  const totalPages = Math.ceil(total / size);

  return (
    <>
      <div className="header-container">
        <div className="header-left">
          <h2>Products</h2>
          <span className="breadcrumbs">
            <a href="/dashboard">Dashboard</a>
            <span>&gt;</span>
            <a href="/products">Products</a>
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
            Add Product
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
                <b>Product</b>
              </TableCell>
              <TableCell>
                <b>SKU</b>
              </TableCell>
              <TableCell>
                <b>Barcode</b>
              </TableCell>
              <TableCell>
                <b>Brand</b>
              </TableCell>
              <TableCell>
                <b>Price</b>
              </TableCell>
              <TableCell>
                <b>Stock</b>
              </TableCell>
              <TableCell>
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((product, index) => (
              <TableRow key={product.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.barcode}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
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
      <AddProductModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}

export default ProductPage;
