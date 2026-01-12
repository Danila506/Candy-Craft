// admin/pages/ProductsAdmin.tsx - исправленная версия
import { AdminLayout } from "../components/AdminLayout";
import { Plus, Edit, Trash2, Search, Filter, Download } from "lucide-react";
import { useProducts } from "../../contexts/ProductContext";
import { ProductModal, type Product } from "../components/ProductModal";
import { useState } from "react";

export function ProductsAdmin() {
    const { deleteProduct, products } = useProducts();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleDelete = (id: number) => {
        if (window.confirm("Удалить товар?")) {
            deleteProduct(id);
        }
    };

    const handleEdit = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    // Обработчик добавления нового товара
    const handleAddProduct = () => {
        setSelectedProduct(null); // Сбрасываем выбранный товар
        setIsModalOpen(true);
    };

    return (
        <AdminLayout title="Управление товарами">
            <ProductModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                product={selectedProduct}
            />
            
            {/* Панель управления */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                        />
                        <input
                            type="text"
                            placeholder="Поиск товаров..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-[#ff398b]"
                        />
                    </div>

                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Filter size={18} />
                        <span>Фильтры</span>
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Download size={18} />
                        <span>Экспорт</span>
                    </button>

                    <button 
                        onClick={handleAddProduct}
                        className="flex items-center gap-2 px-4 py-2 bg-[#ff398b] text-white rounded-lg hover:bg-[#e0327a]"
                    >
                        <Plus size={18} />
                        <span>Добавить товар</span>
                    </button>
                </div>
            </div>

            {/* Таблица товаров */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left py-4 px-6 font-medium text-gray-500">
                                Название
                            </th>
                            <th className="text-left py-4 px-6 font-medium text-gray-500">
                                Цена
                            </th>
                            <th className="text-left py-4 px-6 font-medium text-gray-500">
                                На складе
                            </th>
                            <th className="text-left py-4 px-6 font-medium text-gray-500">
                                ID Категории
                            </th>
                            <th className="text-left py-4 px-6 font-medium text-gray-500">
                                Действия
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr
                                key={`product-${product.id}`} // Уникальный ключ
                                className="border-t hover:bg-gray-50"
                            >
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-200 rounded overflow-hidden">
                                            <img
                                                key={`img-${product.id}`} // Ключ для изображения
                                                src={product.imageUrl}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23e5e7eb'/%3E%3Ctext x='20' y='22' text-anchor='middle' fill='%239ca3af' font-family='Arial' font-size='10'%3EНет фото%3C/text%3E%3C/svg%3E";
                                                }}
                                            />
                                        </div>
                                        <span>{product.name}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6 font-bold">
                                    {product.price} ₽
                                </td>
                                <td className="py-4 px-6">
                                    <span
                                        key={`stock-${product.id}`}
                                        className={`
                                        px-3 py-1 rounded-full text-sm
                                        ${
                                            product.inStock > 10
                                                ? "bg-green-100 text-green-800"
                                                : product.inStock > 0
                                                ? "bg-yellow-100 text-yellow-800"
                                                : "bg-red-100 text-red-800"
                                        }
                                    `}
                                    >
                                        {product.inStock} шт
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <span
                                        key={`category-${product.id}`}
                                        className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
                                    >
                                        {product.categoryId}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-2">
                                        <button
                                            key={`edit-${product.id}`}
                                            onClick={() => handleEdit(product)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                            aria-label={`Редактировать ${product.name}`}
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            key={`delete-${product.id}`}
                                            onClick={() => handleDelete(product.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                            aria-label={`Удалить ${product.name}`}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Пагинация */}
            <div className="flex items-center justify-center mt-6">
                <div className="flex items-center gap-2">
                    {[1, 2, 3].map((page) => (
                        <button
                            key={`page-${page}`} // Ключ для кнопок пагинации
                            className={`px-3 py-2 rounded-lg ${
                                page === 1
                                    ? "bg-[#ff398b] text-white"
                                    : "border hover:bg-gray-50"
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        key="next-page"
                        className="px-3 py-2 border rounded-lg hover:bg-gray-50"
                    >
                        →
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
}