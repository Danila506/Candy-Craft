import { lazy, Suspense } from "react";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
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

const CakeConstructorPage = lazy(() =>
  import("./features/cake-constructor/CakeConstructorPage").then((module) => ({
    default: module.CakeConstructorPage,
  })),
);

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

function NotFoundPage() {
  return (
    <main className="container px-4 py-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
      <p className="text-sm font-semibold text-[#ff398b]">404</p>
      <h1 className="mt-3 text-3xl font-bold text-gray-900">
        Страница не найдена
      </h1>
      <p className="mt-3 max-w-md text-gray-600">
        Проверьте адрес или вернитесь в каталог.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center justify-center rounded-lg bg-[#ff398b] px-5 py-3 text-sm font-semibold text-white hover:bg-[#e0327a]"
      >
        На главную
      </Link>
    </main>
  );
}

function PageLoader() {
  return (
    <main className="container px-4 py-20 min-h-[60vh] flex items-center justify-center text-center">
      <div>
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-rose-100 border-t-[#ff398b]" />
        <p className="text-sm font-semibold text-gray-600">Загружаем...</p>
      </div>
    </main>
  );
}

function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
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
                <Route
                  path="/constructor"
                  element={
                    <Suspense fallback={<PageLoader />}>
                      <CakeConstructorPage />
                    </Suspense>
                  }
                />
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
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}

export default App;
