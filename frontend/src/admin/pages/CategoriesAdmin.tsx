// admin/pages/CategoriesAdmin.tsx
import { useState } from "react";
import { AdminLayout } from "../components/AdminLayout";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useCategories } from "../../contexts/CategoryContext";
import { CategoryModal } from "../components/CategoryModal";
import type { CreateCategoryDto } from "../../types/CategoryType";

type CategoryRow = { id: number } & CreateCategoryDto;

export function CategoriesAdmin() {
  const { categories, createCategory, updateCategory, deleteCategory } =
    useCategories();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryRow | null>(
    null,
  );

  const handleCreate = async (data: CreateCategoryDto) => {
    await createCategory(data);
    // Контекст сам обновит список категорий
  };

  const handleUpdate = async (id: number, data: CreateCategoryDto) => {
    await updateCategory(id, data);
    // Контекст сам обновит список категорий
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Удалить категорию?")) {
      await deleteCategory(id);
    }
  };

  const handleEdit = (category: CategoryRow) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  return (
    <AdminLayout title="Управление категориями">
      {/* Кнопка добавления */}
      <button
        onClick={handleAddNew}
        className="mb-6 inline-flex w-full sm:w-auto items-center justify-center gap-2 px-4 py-2 bg-[#ff398b] text-white rounded-lg hover:bg-[#e0327a]"
      >
        <Plus size={18} className="shrink-0" />
        <span>Добавить категорию</span>
      </button>

      {/* Модальное окно */}
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        category={selectedCategory}
      />

      {/* Таблица категорий */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">Картинка</th>
                <th className="px-6 py-3 text-left">Название</th>
                <th className="px-6 py-3 text-left">Описание</th>
                <th className="px-6 py-3 text-left">Действия</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="w-14 h-14 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4">{category.name}</td>
                  <td className="px-6 py-4">
                    <div className="max-w-md text-gray-700 line-clamp-2">
                      {category.description}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(category)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td className="px-6 py-8 text-gray-500" colSpan={4}>
                    Категорий пока нет
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
