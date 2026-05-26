import { useState } from "react";
import "./addProduct.css";
import { IoCloseSharp } from "react-icons/io5";
import API_BASE_URL from "../../config/api";

function AddProductModal({ open, onClose }) {

    const [formData, setFormData] = useState({
        name: "",
        sku: "",
        description: "",
        barcode: "",
        brand: "",
        price: "",
        stock: "",
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("access_token");

            const response = await fetch(
                `${API_BASE_URL}api/v1/products`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                        name: formData.name, 
                        sku: formData.sku,
                        description: formData.description,
                        barcode: formData.barcode,
                        brand: formData.brand,
                        price: Number(formData.price),
                        stock: Number(formData.stock),
                    }),
                }
            );

            const data = await response.json();

            console.log("Add Product:", data);

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to add product"
                );
            }

            alert("Product added successfully");

            onClose();

        } catch (error) {

            console.error(error);

            alert(error.message);
        }
    };

    // hide modal
    if (!open) return null;

    return (

        <div className="modal-overlay">

            <div className="modal-content">

                <div className="modal-header">

                    <h2>Add Product</h2>

                    <button
                        className="close-btn"
                        onClick={onClose}
                    >
                        <IoCloseSharp></IoCloseSharp>
                    </button>

                </div>

                <form
                    className="product-form"
                    onSubmit={handleSubmit}
                >

                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="sku"
                        placeholder="SKU"
                        value={formData.sku}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="barcode"
                        placeholder="Barcode"
                        value={formData.barcode}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="brand"
                        placeholder="Brand"
                        value={formData.brand}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={formData.stock}
                        onChange={handleChange}
                    />

                    <button
                        type="submit"
                        className="submit-btn"
                    >
                        Save Product
                    </button>

                </form>

            </div>

        </div>
    );
}

export default AddProductModal;