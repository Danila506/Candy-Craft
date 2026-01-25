import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import { Main } from "./components/Main";
import { Cart } from "./pages/CartPage";
import { CartProvider } from "./contexts/CartContext";
import { ProductPage } from "./pages/ProductPage";
import { ProductsProvider } from "./contexts/ProductContext";

// Админ-страницы
import { LoginPage } from "./admin/pages/LoginPage";
import { Dashboard } from "./admin/pages/Dashboard";
import { ProductsAdmin } from "./admin/pages/ProductsAdmin";
import { AdminRoute } from "./admin/components/AdminRoute";
import { AdminProvider } from "./admin/context/AdminContext";
import { Footer } from "./components/Footer"; // Если есть Footer
import { CheckoutPage } from "./pages/CheckoutPage";
import { OrdersAdmin } from "./admin/pages/OrdersAdmin";
import { OrderProvider } from "./admin/context/OrderContext";
import { CheckoutProvider } from "./contexts/CheckoutContext";
import { CategoriesAdmin } from "./admin/pages/CategoriesAdmin";
import { CategoryProvider } from "./contexts/CategoryContext";

function App() {
  return (
    <ProductsProvider>
      <CartProvider>
        <AdminProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/*"
                element={
                  <>
                    <Header />
                    <Routes>
                      <Route path="/" element={<Main />} />
                    </Routes>
                    <Footer />
                  </>
                }
              />

              <Route path="/product/:id" element={<ProductPage />} />

              <Route
                path="/cart"
                element={
                  <>
                    <Cart />
                  </>
                }
              />

              <Route
                path="/checkout"
                element={
                  <OrderProvider>
                    <CheckoutProvider>
                      <CheckoutPage />
                    </CheckoutProvider>
                  </OrderProvider>
                }
              />

              {/* === АДМИН-СТРАНИЦЫ (БЕЗ Header и Footer) === */}
              <Route path="/admin/login" element={<LoginPage />} />
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <Dashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <ProductsAdmin />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/categories"
                element={
                  <AdminRoute>
                    <CategoryProvider>
                      <CategoriesAdmin />
                    </CategoryProvider>
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <AdminRoute>
                    <OrderProvider>
                      <OrdersAdmin />
                    </OrderProvider>
                  </AdminRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </AdminProvider>
      </CartProvider>
      <Link to="/admin" />
    </ProductsProvider>
  );
}

export default App;
