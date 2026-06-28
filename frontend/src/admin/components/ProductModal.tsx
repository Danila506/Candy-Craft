// components/ProductModal.tsx
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { CreateProductDto } from "../../types/ProductType";
import { API_URL } from "../../api/config";
import { ImageUploader } from "./ImageUploader";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: CreateProductDto) => Promise<void>;
  onUpdate?: (id: number, data: CreateProductDto) => Promise<void>;
  product?: ({ id: number } & CreateProductDto) | null;
}

export function ProductModal({
  isOpen,
  onClose,
  onCreate,
  onUpdate,
  product,
}: ProductModalProps) {
  const [formData, setFormData] = useState<CreateProductDto & { id?: number }>({
    slug: "",
    name: "",
    price: 0,
    inStock: 1,
    categoryId: 1,
    description: "",
    imageUrl: "",
    isActive: true,
  });

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    [],
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      fetchCategories();

      if (product) {
        setFormData({
          id: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          inStock: product.inStock,
          categoryId: product.categoryId,
          description: product.description,
          imageUrl: product.imageUrl,
          isActive: product.isActive ?? true,
        });
      } else {
        setFormData({
          slug: "",
          name: "",
          price: 0,
          inStock: 1,
          categoryId: 1,
          description: "",
          imageUrl: "",
          isActive: true,
        });
      }

      setErrors({});
    }
  }, [isOpen, product]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/categories`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Ошибка загрузки категорий:", error);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Введите название товара";
    if (formData.price <= 0) newErrors.price = "Цена должна быть больше 0";
    if (formData.inStock < 0)
      newErrors.inStock = "Количество должно быть больше либо равно 0";
    if (!formData.imageUrl.trim())
      newErrors.imageUrl = "Добавьте ссылку на изображение";
    if (!formData.description.trim())
      newErrors.description = "Введите описание";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const submitData = {
        slug: formData.slug,
        name: formData.name,
        price: formData.price,
        inStock: formData.inStock,
        categoryId: formData.categoryId,
        description: formData.description,
        imageUrl: formData.imageUrl,
        isActive: formData.isActive,
      };

      if (product && onUpdate) {
        await onUpdate(product.id, submitData);
      } else {
        await onCreate(submitData);
      }

      onClose();
    } catch (error) {
      console.error("Ошибка сохранения:", error);
      setErrors({ submit: "Ошибка при сохранении товара" });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    field: keyof CreateProductDto,
    value: CreateProductDto[keyof CreateProductDto],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      <div className="flex items-end sm:items-center justify-center min-h-screen p-3 sm:p-4">
        <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-hidden flex flex-col">
          <div className="flex items-center justify-between gap-4 p-4 sm:p-6 border-b">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {product ? "Редактировать товар" : "Создать новый товар"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              disabled={loading}
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="product-slug"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Slug
                  </label>
                  <input
                    id="product-slug"
                    type="text"
                    value={formData.slug ?? ""}
                    onChange={(e) => handleChange("slug", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff398b] focus:border-transparent"
                    placeholder="tort-napoleon"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label
                    htmlFor="product-name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Название товара *
                  </label>
                  <input
                    id="product-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#ff398b] focus:border-transparent ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Например: Торт 'Медовик'"
                    disabled={loading}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="product-price"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Цена (₽) *
                    </label>
                    <input
                      id="product-price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) =>
                        handleChange("price", parseFloat(e.target.value) || 0)
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#ff398b] focus:border-transparent ${
                        errors.price ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="999.99"
                      disabled={loading}
                    />
                    {errors.price && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.price}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="product-stock"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Количество *
                    </label>
                    <input
                      id="product-stock"
                      type="number"
                      min="0"
                      value={formData.inStock}
                      onChange={(e) =>
                        handleChange("inStock", parseInt(e.target.value) || 0)
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#ff398b] focus:border-transparent ${
                        errors.inStock ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="10"
                      disabled={loading}
                    />
                    {errors.inStock && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.inStock}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="product-category"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Категория *
                  </label>
                  <select
                    id="product-category"
                    value={formData.categoryId}
                    onChange={(e) =>
                      handleChange("categoryId", parseInt(e.target.value))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff398b] focus:border-transparent"
                    disabled={loading || categories.length === 0}
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={Boolean(formData.isActive)}
                    onChange={(e) => handleChange("isActive", e.target.checked)}
                    disabled={loading}
                  />
                  Активен на витрине
                </label>
              </div>

              <div className="space-y-4">
                <ImageUploader
                  label="Изображение товара"
                  value={formData.imageUrl}
                  onChange={(url) => handleChange("imageUrl", url)}
                  folder="products"
                />
                <div>
                  <label
                    htmlFor="product-description"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Описание *
                  </label>
                  <textarea
                    id="product-description"
                    value={formData.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#ff398b] focus:border-transparent ${
                      errors.description ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Опишите ваш товар..."
                    disabled={loading}
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.description}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-6 mt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                disabled={loading}
              >
                Отмена
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-[#ff398b] text-white rounded-lg hover:bg-[#e0327a] transition-colors font-medium disabled:opacity-50"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Сохранение...
                  </span>
                ) : product ? (
                  "Сохранить изменения"
                ) : (
                  "Создать товар"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
