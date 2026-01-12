// admin/components/ProductModal.tsx
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useProducts } from "../../contexts/ProductContext";

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    inStock: number;
    imageUrl: string;
    categoryId: number;
}

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
}

export const ProductModal: React.FC<ProductModalProps> = ({
    isOpen,
    onClose,
    product,
}) => {
    const { updateProduct } = useProducts();

    // Состояние для данных формы
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: 0,
        inStock: 0,
        imageUrl: "",
        categoryId: 1,
    });

    // Загружаем данные товара в форму при открытии модалки
    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                description: product.description,
                price: product.price,
                inStock: product.inStock,
                imageUrl: product.imageUrl,
                categoryId: product.categoryId,
            });
        }
    }, [product]);

    // Обработчик изменения полей
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "price" || name === "inStock" || name === "categoryId"
                    ? Number(value)
                    : value,
        }));
    };

    // Обработчик сохранения
    const handleSave = async () => {
        if (!product) return;

        try {
            await updateProduct(product.id, formData);
            onClose();
        } catch (error) {
            console.error("Ошибка при обновлении товара:", error);
        }
    };

    if (!isOpen || !product) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Заголовок */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Редактировать товар
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Контент */}
                <div className="p-6">
                    <div className="space-y-4">
                        {/* Название */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Название товара{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff398b]"
                                placeholder="Введите название товара"
                            />
                        </div>

                        {/* Описание */}
                        <div>
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Описание <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff398b]"
                                placeholder="Введите описание товара"
                            />
                        </div>

                        {/* Цена и Количество */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="price"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Цена (₽){" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    min="0"
                                    step="1"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff398b]"
                                    placeholder="0"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="inStock"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    В наличии (шт){" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="inStock"
                                    name="inStock"
                                    min="0"
                                    step="1"
                                    value={formData.inStock}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff398b]"
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        {/* ID категории */}
                        <div>
                            <label
                                htmlFor="categoryId"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                ID категории{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="categoryId"
                                name="categoryId"
                                min="1"
                                step="1"
                                value={formData.categoryId}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff398b]"
                                placeholder="1"
                            />
                        </div>

                        {/* URL изображения */}
                        <div>
                            <label
                                htmlFor="imageUrl"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                URL изображения{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="url"
                                id="imageUrl"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff398b]"
                                placeholder="https://example.com/image.jpg"
                            />

                            {/* Превью изображения */}
                            {formData.imageUrl && (
                                <div className="mt-2">
                                    <img
                                        src={formData.imageUrl}
                                        alt="Превью"
                                        className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                                        onError={(e) => {
                                            e.currentTarget.src =
                                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128'%3E%3Crect fill='%23e5e7eb' width='128' height='128'/%3E%3C/svg%3E";
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Кнопки */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Отменить
                            </button>
                            <button
                                onClick={handleSave}
                                type="button"
                                className="px-4 py-2 text-white bg-[#ff398b] rounded-lg hover:bg-[#e0327a] transition-colors"
                            >
                                Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
