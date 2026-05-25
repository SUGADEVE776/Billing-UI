import { useState, useEffect } from "react";
import "./invoicePage.css";

function InvoicePage() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [tax1, setTax1] = useState(0);
  const [tax2, setTax2] = useState(0);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(
          "http://localhost:8000/api/v1/products?page=1&size=10",
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
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const subtotal = invoiceItems.reduce((sum, item) => sum + item.total, 0);
  const discountAmount = (subtotal * discount) / 100;
  const discountedTotal = subtotal - discountAmount;
  const tax1Amount = (discountedTotal * tax1) / 100;

  const tax2Amount = (discountedTotal * tax2) / 100;

  // ================= ADD PRODUCT =================
  const addProduct = (product) => {
    const exists = invoiceItems.find((item) => item.id === product.id);

    // already exists
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
        return {
          ...item,
          quantity: Number(quantity),
          total: item.price * Number(quantity),
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

  // ================= GRAND TOTAL =================
  const grandTotal = discountedTotal + tax1Amount + tax2Amount;

  // ================= FILTER PRODUCTS =================
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );
  console.log("Filtered Products:", filteredProducts);
  return (
    <div className="invoice-container">
      <h2>Create Invoice</h2>

      {/* SEARCH */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search Product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* SEARCH RESULTS */}
        {search && (
          <div className="search-results">
            {filteredProducts?.map((product) => (
              <div
                key={product.id}
                className="search-item"
                onClick={() => addProduct(product)}
              >
                {product.name} - ₹{product.price}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* TABLE */}
      <table className="invoice-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {invoiceItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>

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

              <td>₹{item.total}</td>

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
        </tbody>
      </table>

      <div className="invoice-summary">
        {/* DISCOUNT */}
        <div className="summary-row">
          <label>Discount %</label>

          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
          />
        </div>

        {/* TAX 1 */}
        <div className="summary-row">
          <label>CGST %</label>

          <input
            type="number"
            value={tax1}
            onChange={(e) => setTax1(Number(e.target.value))}
          />
        </div>

        {/* TAX 2 */}
        <div className="summary-row">
          <label>SGST %</label>

          <input
            type="number"
            value={tax2}
            onChange={(e) => setTax2(Number(e.target.value))}
          />
        </div>

        {/* TOTALS */}

        <div className="total-row">
          <span>Subtotal:</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>

        <div className="total-row">
          <span>Discount:</span>
          <span>- ₹{discountAmount.toFixed(2)}</span>
        </div>

        <div className="total-row">
          <span>CGST:</span>
          <span>₹{tax1Amount.toFixed(2)}</span>
        </div>

        <div className="total-row">
          <span>SGST:</span>
          <span>₹{tax2Amount.toFixed(2)}</span>
        </div>

        <div className="grand-total-row">
          <span>Grand Total:</span>
          <span>₹{grandTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* GRAND TOTAL */}
      <div className="grand-total">
        <h3>Grand Total: ₹{grandTotal}</h3>
      </div>
    </div>
  );
}

export default InvoicePage;
