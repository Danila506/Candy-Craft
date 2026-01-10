import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import { Main } from "./components/Main";
import { Cart } from "./pages/CartPage";
import { CartProvider } from "./contexts/CartContext";
import { ProductPage } from "./pages/ProductPage";
import { ProductsProvider } from "./contexts/ProductContext";

function App() {
    return (
        <CartProvider>
            <ProductsProvider>
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path="/cart" element={<Cart />}></Route>
                        <Route path="/" element={<Main />}></Route>
                        <Route
                            path="/product/:id"
                            element={<ProductPage />}
                        ></Route>
                    </Routes>
                </BrowserRouter>
            </ProductsProvider>
        </CartProvider>
    );
}

export default App;
