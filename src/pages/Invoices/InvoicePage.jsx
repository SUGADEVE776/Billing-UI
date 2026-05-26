import { useState, useEffect } from "react";
import "./invoicePage.css";
import InvoiceAddOns from "./InvoiceAddOns";
import SaveInvoice from "./SaveInvoice";
import API_BASE_URL from "../../config/api";

function InvoicePage() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [invoiceItems, setInvoiceItems] = useState([]);

  // ADDONS
  const [discount, setDiscount] = useState(0);
  const [tax1, setTax1] = useState(0);
  const [tax2, setTax2] = useState(0);

  // ================= FETCH PRODUCTS =================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("access_token");

        const response = await fetch(
          `${API_BASE_URL}api/v1/products?page=1&size=50`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        setProducts(data.results);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // ================= ADD PRODUCT =================
  const addProduct = (product) => {
    const exists = invoiceItems.find((item) => item.id === product.id);

    if (exists) {
      const updated = invoiceItems.map((item) => {
        if (item.id === product.id) {
          const qty = item.quantity + 1;

          return {
            ...item,
            quantity: qty,
            total: qty * item.price,
          };
        }

        return item;
      });

      setInvoiceItems(updated);
    } else {
      setInvoiceItems([
        ...invoiceItems,
        {
          ...product,
          quantity: 1,
          total: product.price,
        },
      ]);
    }

    setSearch("");
  };

  // ================= UPDATE QUANTITY =================
  const updateQuantity = (id, quantity) => {
    const updated = invoiceItems.map((item) => {
      if (item.id === id) {
        const qty = Number(quantity);

        return {
          ...item,
          quantity: qty,
          total: item.price * qty,
        };
      }

      return item;
    });

    setInvoiceItems(updated);
  };

  // ================= REMOVE PRODUCT =================
  const removeProduct = (id) => {
    const filtered = invoiceItems.filter((item) => item.id !== id);

    setInvoiceItems(filtered);
  };

  // ================= CALCULATIONS =================
  const subtotal = invoiceItems.reduce((sum, item) => sum + item.total, 0);

  const discountAmount = (subtotal * discount) / 100;

  const discountedTotal = subtotal - discountAmount;

  const tax1Amount = (discountedTotal * tax1) / 100;

  const tax2Amount = (discountedTotal * tax2) / 100;

  const grandTotal = discountedTotal + tax1Amount + tax2Amount;

  // ================= FILTER PRODUCTS =================
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const clearInvoice = () => {
    setInvoiceItems([]);

    setDiscount(0);

    setTax1(0);

    setTax2(0);

    setSearch("");
  };

  return (
    <div className="invoice-container">
      <div className="invoice-header">
        <h2>Create Invoice</h2>
      </div>

      {/* TABLE */}
      <div className="invoice-table-wrapper">
        <table className="invoice-table">
          <thead>
            <tr>
              <th width="35%">Product</th>
              <th width="15%">Price</th>
              <th width="15%">Qty</th>
              <th width="20%">Total</th>
              <th width="15%">Action</th>
            </tr>
          </thead>

          <tbody>
            {/* PRODUCT ROWS */}
            {invoiceItems.map((item) => (
              <tr key={item.id}>
                <td className="product-name">{item.name}</td>

                <td>₹{item.price}</td>

                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, e.target.value)}
                    className="qty-input"
                  />
                </td>

                <td className="price-cell">₹{item.total.toFixed(2)}</td>

                <td>
                  <button
                    className="remove-btn"
                    onClick={() => removeProduct(item.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}

            {/* ADD ITEM ROW */}
            <tr className="add-item-row">
              <td colSpan="5">
                <div className="table-search-wrapper">
                  <label className="add-item-label">Add Item</label>

                  <input
                    type="text"
                    placeholder="Search product name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="table-search-input"
                  />

                  {/* SEARCH RESULTS */}
                  {search && (
                    <div className="search-results">
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                          <div
                            key={product.id}
                            className="search-item"
                            onClick={() => addProduct(product)}
                          >
                            <div className="search-product-name">
                              {product.name}
                            </div>

                            <div className="search-product-price">
                              ₹{product.price}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="no-results">No products found</div>
                      )}
                    </div>
                  )}
                </div>
              </td>
            </tr>

            {/* EMPTY STATE */}
            {invoiceItems.length === 0 && (
              <tr>
                <td colSpan="5" className="empty-row">
                  No products added yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* SUMMARY */}
      {invoiceItems.length > 0 && (
        <InvoiceAddOns
          subtotal={subtotal}
          discount={discount}
          setDiscount={setDiscount}
          tax1={tax1}
          setTax1={setTax1}
          tax2={tax2}
          setTax2={setTax2}
          discountAmount={discountAmount}
          tax1Amount={tax1Amount}
          tax2Amount={tax2Amount}
          grandTotal={grandTotal}
        />
      )}

      {invoiceItems.length > 0 && (
        <SaveInvoice
          customerId={1}
          invoiceItems={invoiceItems}
          discount={discount}
          tax1={tax1}
          tax2={tax2}
          grandTotal={grandTotal}
          clearInvoice={clearInvoice}
        />
      )}
    </div>
  );
}

export default InvoicePage;
