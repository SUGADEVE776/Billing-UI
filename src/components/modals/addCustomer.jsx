import { useState } from "react";
import "./addCustomer.css";
import { IoCloseSharp } from "react-icons/io5";
import API_BASE_URL from "../../config/api";

function AddCustomerModal({ open, onClose }) {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone_number: "",
        gst_number: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
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
                `${API_BASE_URL}api/v1/customers`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        phone_number: formData.phone_number,
                        gst_number: formData.gst_number,
                        address: formData.address,
                        city: formData.city,
                        state: formData.state,
                        pincode: formData.pincode,
                        country: formData.country,
                    }),
                }
            );

            const data = await response.json();

            console.log("Add Customer:", data);

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to add customer"
                );
            }

            alert("Customer added successfully");

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

                    <h2>Add Customer</h2>

                    <button
                        className="close-btn"
                        onClick={onClose}
                    >
                        <IoCloseSharp />
                    </button>

                </div>

                <form
                    className="product-form"
                    onSubmit={handleSubmit}
                >

                    <input
                        type="text"
                        name="name"
                        placeholder="Customer Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="phone_number"
                        placeholder="Phone Number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="gst_number"
                        placeholder="GST Number"
                        value={formData.gst_number}
                        onChange={handleChange}
                    />

                    <textarea
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="pincode"
                        placeholder="Pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleChange}
                    />

                    <button
                        type="submit"
                        className="submit-btn"
                    >
                        Save Customer
                    </button>

                </form>

            </div>

        </div>
    );
}

export default AddCustomerModal;