// admin/components/CategoryModal.tsx
import { useEffect, useMemo, useState } from "react";
import type { CreateCategoryDto } from "../../types/CategoryType";
import { ImageUploader } from "./ImageUploader";

type CategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: CreateCategoryDto) => Promise<void> | void;
  onUpdate: (id: number, data: CreateCategoryDto) => Promise<void> | void;
  category: ({ id: number } & CreateCategoryDto) | null;
};

const emptyForm: CreateCategoryDto = {
  name: "",
  description: "",
  imageUrl: "",
};

export function CategoryModal({
  isOpen,
  onClose,
  onCreate,
  onUpdate,
  category,
}: CategoryModalProps) {
  const isEdit = useMemo(() => Boolean(category?.id), [category]);

  const [form, setForm] = useState<CreateCategoryDto>(emptyForm);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setForm(
        category
          ? {
              name: category.name ?? "",
              description: category.description ?? "",
              imageUrl: category.imageUrl ?? "",
            }
          : emptyForm,
      );
    }
  }, [isOpen, category]);

  const setField = (key: keyof CreateCategoryDto, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "Введите название";
    if (!form.description.trim()) return "Введите описание";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      alert(err);
      return;
    }

    setIsSaving(true);
    try {
      if (isEdit && category) {
        await onUpdate(category.id, form);
      } else {
        await onCreate(form);
      }
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4">
      {/* overlay */}
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
        aria-label="Close modal overlay"
      />

      {/* modal */}
      <div className="relative z-10 w-full max-w-xl bg-white rounded-lg shadow-lg max-h-[90vh] flex flex-col overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">
            {isEdit ? "Редактировать категорию" : "Добавить категорию"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="px-2 py-1 rounded hover:bg-gray-100 text-gray-600"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="px-4 sm:px-6 py-5 space-y-4 overflow-y-auto"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Название
            </label>
            <input
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Например: Торты"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Описание
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 min-h-22.5"
              placeholder="Короткое описание категории"
            />
          </div>

          <ImageUploader
            label="Изображение категории"
            value={form.imageUrl}
            onChange={(url) => setField("imageUrl", url)}
            folder="categories"
          />

          <div className="pt-2 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 rounded-lg border hover:bg-gray-50"
              disabled={isSaving}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#ff398b] text-white hover:bg-[#e0327a] disabled:opacity-60"
              disabled={isSaving}
            >
              {isSaving ? "Сохранение..." : isEdit ? "Сохранить" : "Создать"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
