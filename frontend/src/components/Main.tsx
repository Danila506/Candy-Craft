import { ProductsProvider } from "../contexts/ProductContext";
import { ProductList } from "./ProductList";

export function Main() {
    return (
        <main className="min-h-screen bg-linear-to-b from-rose-50/30 via-pink-50/20 to-white">
            <div className="container mx-auto min-h-full py-8 md:py-12">
                <ProductsProvider>
                    <ProductList />
                </ProductsProvider>
            </div>
        </main>
    );
}
