import { useState } from "react";
import "./SaveInvoice.css";
import API_BASE_URL from "../../config/api";

function SaveInvoice({
  customerId,
  invoiceItems,
  discount,
  tax1,
  tax2,
  grandTotal,
  clearInvoice,
}) {

  const [loading, setLoading] = useState(false);

  const handleSaveInvoice = async () => {

    if (invoiceItems.length === 0) {
      alert("Add products to invoice");
      return;
    }

    try {

      setLoading(true);

      const token = localStorage.getItem("access_token");

      // ================= PAYLOAD =================

      const payload = {
        customer_id: customerId,

        discount_percentage: discount,

        cgst_percentage: tax1,

        sgst_percentage: tax2,

        items: invoiceItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      };

      console.log("Invoice Payload:", payload);

      // ================= API =================

      const response = await fetch(
        `${API_BASE_URL}api/v1/invoices/add/`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      console.log("Invoice Response:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save invoice"
        );
      }

      alert("Invoice saved successfully");

      // clear invoice
      clearInvoice();

    } catch (error) {

      console.error(error);

      alert(error.message);

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="save-invoice-container">

      <div className="invoice-total-preview">
        Grand Total:
        <span>
          ₹{grandTotal.toFixed(2)}
        </span>
      </div>

      <button
        className="save-invoice-btn"
        onClick={handleSaveInvoice}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Invoice"}
      </button>

    </div>
  );
}

export default SaveInvoice;