import { ProductsProvider } from "../contexts/ProductContext";
import { Footer } from "./Footer";
import { ProductList } from "./ProductList";

export function Main() {
    return (
        <>
            <main className="container min-h-full mb-20">
                <ProductsProvider>
                    <ProductList />
                </ProductsProvider>
            </main>
            <Footer />
        </>
    );
}
