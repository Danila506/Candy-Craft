import { ProductList } from "./ProductList";

export function Main() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-7">
        <ProductList />
      </div>
    </main>
  );
}
