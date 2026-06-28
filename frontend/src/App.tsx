import { lazy, Suspense } from "react";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import { Main } from "./components/Main";
import { CartProvider } from "./contexts/CartContext";
import { ProductsProvider } from "./contexts/ProductContext";
import { AdminRoute } from "./admin/components/AdminRoute";
import { Footer } from "./components/Footer"; // Если есть Footer
import { OrderProvider } from "./admin/context/OrderContext";
import { CheckoutProvider } from "./contexts/CheckoutContext";
import { CategoryProvider } from "./contexts/CategoryContext";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";

const CartPage = lazy(() =>
  import("./pages/CartPage").then((module) => ({ default: module.Cart })),
);
const ProductPage = lazy(() =>
  import("./pages/ProductPage").then((module) => ({
    default: module.ProductPage,
  })),
);
const ContactsPage = lazy(() =>
  import("./pages/ContactsPage").then((module) => ({
    default: module.ContactsPage,
  })),
);
const RegisterPage = lazy(() =>
  import("./pages/Auth/RegisterPage").then((module) => ({
    default: module.RegisterPage,
  })),
);
const LoginPage = lazy(() =>
  import("./pages/Auth/LoginPage").then((module) => ({
    default: module.LoginPage,
  })),
);
const AccountPage = lazy(() => import("./pages/AccountPage/AccountPage"));
const PrivacyPage = lazy(() =>
  import("./pages/PrivacyPage").then((module) => ({
    default: module.PrivacyPage,
  })),
);
const DeliveryPaymentPage = lazy(() =>
  import("./pages/DeliveryPage").then((module) => ({
    default: module.DeliveryPayment,
  })),
);
const PaymentResultPage = lazy(() =>
  import("./pages/PaymentResultPage").then((module) => ({
    default: module.PaymentResultPage,
  })),
);
const CheckoutPage = lazy(() =>
  import("./pages/CheckoutPage/CheckoutPage").then((module) => ({
    default: module.CheckoutPage,
  })),
);
const DashboardPage = lazy(() =>
  import("./admin/pages/Dashboard").then((module) => ({
    default: module.Dashboard,
  })),
);
const ProductsAdminPage = lazy(() =>
  import("./admin/pages/ProductsAdmin").then((module) => ({
    default: module.ProductsAdmin,
  })),
);
const CategoriesAdminPage = lazy(() =>
  import("./admin/pages/CategoriesAdmin").then((module) => ({
    default: module.CategoriesAdmin,
  })),
);
const OrdersAdminPage = lazy(() =>
  import("./admin/pages/OrdersAdmin").then((module) => ({
    default: module.OrdersAdmin,
  })),
);

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
  const { t } = useLanguage();

  return (
    <main className="container px-4 py-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
      <p className="text-sm font-semibold text-[#ff398b]">404</p>
      <h1 className="mt-3 text-3xl font-bold text-gray-900">
        {t("notFound.title")}
      </h1>
      <p className="mt-3 max-w-md text-gray-600">{t("notFound.description")}</p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center justify-center rounded-lg bg-[#ff398b] px-5 py-3 text-sm font-semibold text-white hover:bg-[#e0327a]"
      >
        {t("notFound.home")}
      </Link>
    </main>
  );
}

function PageLoader() {
  const { t } = useLanguage();

  return (
    <main className="container px-4 py-20 min-h-[60vh] flex items-center justify-center text-center">
      <div>
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-rose-100 border-t-[#ff398b]" />
        <p className="text-sm font-semibold text-gray-600">
          {t("common.loading")}
        </p>
      </div>
    </main>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ProductsProvider>
          <CartProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<Main />} />
                  <Route
                    path="/product/:slug"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <ProductPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/cart"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <CartPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/account"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <AccountPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/delivery"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <DeliveryPaymentPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/contacts"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <ContactsPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/privacy"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <PrivacyPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/constructor"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <CakeConstructorPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/payment/result"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <PaymentResultPage />
                      </Suspense>
                    }
                  />
                </Route>

                <Route element={<HeaderOnlyLayout />}>
                  <Route
                    path="/account/login"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <LoginPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/account/register"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <RegisterPage />
                      </Suspense>
                    }
                  />
                </Route>

                <Route
                  path="/checkout"
                  element={
                    <OrderProvider>
                      <CheckoutProvider>
                        <Suspense fallback={<PageLoader />}>
                          <CheckoutPage />
                        </Suspense>
                      </CheckoutProvider>
                    </OrderProvider>
                  }
                />

                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <OrderProvider>
                        <Suspense fallback={<PageLoader />}>
                          <DashboardPage />
                        </Suspense>
                      </OrderProvider>
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/products"
                  element={
                    <AdminRoute>
                      <Suspense fallback={<PageLoader />}>
                        <ProductsAdminPage />
                      </Suspense>
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/categories"
                  element={
                    <AdminRoute>
                      <CategoryProvider>
                        <Suspense fallback={<PageLoader />}>
                          <CategoriesAdminPage />
                        </Suspense>
                      </CategoryProvider>
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/orders"
                  element={
                    <AdminRoute>
                      <OrderProvider>
                        <Suspense fallback={<PageLoader />}>
                          <OrdersAdminPage />
                        </Suspense>
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
    </LanguageProvider>
  );
}

export default App;
