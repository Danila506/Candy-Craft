import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
    return (
        <ProductsProvider>
            <CartProvider>
                <AdminProvider>
                    <BrowserRouter>
                        <Routes>
                            {/* === ПУБЛИЧНЫЕ СТРАНИЦЫ (с Header) === */}
                            <Route path="/*" element={
                                <>
                                    <Header /> {/* Header ТОЛЬКО для публичных страниц */}
                                    <Routes location={location}>
                                        <Route path="/" element={<Main />} />
                                        <Route path="/cart" element={<Cart />} />
                                        <Route path="/product/:id" element={<ProductPage />} />
                                        {/* Добавьте другие публичные страницы */}
                                    </Routes>
                                    <Footer /> {/* Footer ТОЛЬКО для публичных страниц */}
                                </>
                            } />

                            {/* === АДМИН-СТРАНИЦЫ (БЕЗ Header и Footer) === */}
                            <Route path="/admin/login" element={<LoginPage />} />
                            <Route path="/admin" element={
                                <AdminRoute>
                                    <Dashboard />
                                </AdminRoute>
                            } />
                            <Route path="/admin/products" element={
                                <AdminRoute>
                                    <ProductsAdmin />
                                </AdminRoute>
                            } />
                        </Routes>
                    </BrowserRouter>
                </AdminProvider>
            </CartProvider>
        </ProductsProvider>
    );
}

export default App;