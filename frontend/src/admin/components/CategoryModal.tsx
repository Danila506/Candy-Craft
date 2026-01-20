// admin/components/CategoryModal.tsx
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { CategoryType } from "../../types/CategoryType";

interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (data: CategoryType) => Promise<void>;
    onUpdate: (id: number, data: CategoryType) => Promise<void>;
    category?: { id: number } & CategoryType | null;
}

export function CategoryModal({ isOpen, onClose, onCreate, onUpdate, category }: CategoryModalProps) {
    const [formData, setFormData] = useState<CategoryType>({
        name: "",
        description: "",
    });

    useEffect(() => {
        if (category) {
            setFormData({
                name: category.name,
                description: category.description || "",
            });
        } else {
            setFormData({
                name: "",
                description: "",
            });
        }
    }, [category]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (category) {
            await onUpdate(category.id, formData);
        } else {
            await onCreate(formData);
        }
        
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">
                        {category ? "Редактировать категорию" : "Новая категория"}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Название *
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff398b]"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Описание
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff398b] min-h-25"
                                rows={4}
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                        >
                            Отмена
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-[#ff398b] text-white rounded-lg hover:bg-[#e0327a]"
                        >
                            {category ? "Сохранить" : "Создать"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}