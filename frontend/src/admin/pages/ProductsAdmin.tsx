// admin/pages/ProductsAdmin.tsx
import { useState } from "react";
import { AdminLayout } from "../components/AdminLayout";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useProducts } from "../../contexts/ProductContext";
import { ProductModal } from "../components/ProductModal";
import type { CreateProductDto } from "../../types/ProductType";

export function ProductsAdmin() {
  const { products, createProduct, updateProduct, deleteProduct } =
    useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<
    ({ id: number } & CreateProductDto) | null
  >(null);

  const handleCreate = async (data: CreateProductDto) => {
    await createProduct(data);
    // Контекст сам обновит список продуктов
  };

  const handleUpdate = async (id: number, data: CreateProductDto) => {
    await updateProduct(id, data);
    // Контекст сам обновит список продуктов
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Удалить товар?")) {
      await deleteProduct(id);
    }
  };

  const handleEdit = (product: { id: number } & CreateProductDto) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  return (
    <AdminLayout title="Управление товарами">
      {/* Кнопка добавления */}
      <button
        onClick={handleAddNew}
        className="mb-6 flex items-center gap-2 px-4 py-2 bg-[#ff398b] text-white rounded-lg hover:bg-[#e0327a]"
      >
        <Plus size={18} />
        <span>Добавить товар</span>
      </button>

      {/* Модальное окно */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        product={selectedProduct}
      />

      {/* Таблица товаров */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Изображение</th>
              <th className="px-6 py-3 text-left">Название</th>
              <th className="px-6 py-3 text-left">Цена</th>
              <th className="px-6 py-3 text-left">В наличии</th>
              <th className="px-6 py-3 text-left">Действия</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">
                  {" "}
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-14 h-14 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.price} ₽</td>
                <td className="px-6 py-4">{product.inStock} шт</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
