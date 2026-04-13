import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import { Main } from "./components/Main";
import { Cart } from "./pages/CartPage";
import { CartProvider } from "./contexts/CartContext";
import { ProductPage } from "./pages/ProductPage";
import { ProductsProvider } from "./contexts/ProductContext";
import { ContactsPage } from "./pages/ContactsPage";

// Админ-страницы
import { RegisterPage } from "./pages/Auth/RegisterPage";
import { Dashboard } from "./admin/pages/Dashboard";
import { ProductsAdmin } from "./admin/pages/ProductsAdmin";
import { AdminRoute } from "./admin/components/AdminRoute";
import { Footer } from "./components/Footer"; // Если есть Footer
import { CheckoutPage } from "./pages/CheckoutPage/CheckoutPage";
import { OrdersAdmin } from "./admin/pages/OrdersAdmin";
import { OrderProvider } from "./admin/context/OrderContext";
import { CheckoutProvider } from "./contexts/CheckoutContext";
import { CategoriesAdmin } from "./admin/pages/CategoriesAdmin";
import { CategoryProvider } from "./contexts/CategoryContext";
import { LoginPage } from "./pages/Auth/LoginPage";
import { AuthProvider } from "./contexts/AuthContext";
import AccountPage from "./pages/AccountPage/AccountPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { DeliveryPayment } from "./pages/DeliveryPage";
import { PaymentResultPage } from "./pages/PaymentResultPage";

function PublicLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

function HeaderOnlyLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <ProductsProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Main />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/delivery" element={<DeliveryPayment />} />
                <Route path="/contacts" element={<ContactsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/payment/result" element={<PaymentResultPage />} />
              </Route>

              <Route element={<HeaderOnlyLayout />}>
                <Route path="/account/login" element={<LoginPage />} />
                <Route path="/account/register" element={<RegisterPage />} />
              </Route>

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

              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <OrderProvider>
                      <Dashboard />
                    </OrderProvider>
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
        </CartProvider>
      </AuthProvider>
    </ProductsProvider>
  );
}

export default App;
