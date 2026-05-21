import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthPage from "./pages/Auth/AuthPage";
import ProductPage from "./pages/Products/Product";
import CustomersPage from "./pages/Customers/Customers";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "../src/routes/ProtectedRoute";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={<AuthPage />}
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Layout>
                <ProductPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <Layout>
                <CustomersPage />
              </Layout>
            </ProtectedRoute>

          }
        />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;