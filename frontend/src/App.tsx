import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import { Main } from "./components/Main";
import { Cart } from "./pages/Cart";
import { CartProvider } from "./contexts/CartContext";

function App() {
    return (
        <CartProvider>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/cart" element={<Cart />}></Route>
                    <Route path="/" element={<Main />}></Route>
                </Routes>
            </BrowserRouter>
        </CartProvider>
    );
}

export default App;
