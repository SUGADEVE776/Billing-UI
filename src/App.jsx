import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthPage from "./pages/Auth/AuthPage";
import ProductPage from "./pages/Products/Product";
import CustomersPage from "./pages/Customers/Customers";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "../src/routes/ProtectedRoute";
import InvoicePage from "./pages/Invoices/InvoicePage";
import PublicRoute from "./routes/PublicRoute";
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
  element={
    <PublicRoute>
      <AuthPage />
    </PublicRoute>
  }
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
            <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
            </ProtectedRoute>
          }
        />
         <Route
          path="/billing"
          element={
            <Layout>
              <InvoicePage />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;