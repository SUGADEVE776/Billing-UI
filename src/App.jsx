import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import AuthPage from "./components/AuthPage"; 
import CustomersPage from "./components/Customers";
import ProductPage from "./components/Product";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/products" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;