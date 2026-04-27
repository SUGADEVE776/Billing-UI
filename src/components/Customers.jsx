import { useEffect, useState } from "react";

function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/customers/list/") 
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched customers:", data);
        setCustomers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching customers:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Customers List</h2>

      {customers.length === 0 ? (
        <p>No customers found</p>
      ) : (
        <ul>
          {customers.map((customer) => (
            <li key={customer.id}>
              {customer.name} - {customer.description} - {customer.phone_number} - {customer.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomersPage;