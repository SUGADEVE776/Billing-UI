function InvoiceAddOns({
    subtotal,
    discount,
    setDiscount,
    tax1,
    setTax1,
    tax2,
    setTax2,
    discountAmount,
    tax1Amount,
    tax2Amount,
    grandTotal,
  }) {
    return (
      <div className="invoice-summary">
  
        {/* DISCOUNT */}
        <div className="summary-row">
          <label>Discount %</label>
  
          <input
            type="number"
            value={discount}
            onChange={(e) =>
              setDiscount(Number(e.target.value))
            }
          />
        </div>
  
        {/* CGST */}
        <div className="summary-row">
          <label>CGST %</label>
  
          <input
            type="number"
            value={tax1}
            onChange={(e) =>
              setTax1(Number(e.target.value))
            }
          />
        </div>
  
        {/* SGST */}
        <div className="summary-row">
          <label>SGST %</label>
  
          <input
            type="number"
            value={tax2}
            onChange={(e) =>
              setTax2(Number(e.target.value))
            }
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
    );
  }
  
  export default InvoiceAddOns;