import { useRef, useState } from "react";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";

type ImageUploaderProps = {
  value: string;
  onChange: (url: string) => void;
  folder?: "categories" | "products";
  label?: string;
};

export function ImageUploader({
  value,
  onChange,
  folder = "categories",
  label = "Изображение",
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

  async function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadToCloudinary(file, folder);
      onChange(url);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onPickFile}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
        placeholder="Выберите файл"
      />

      {uploading && (
        <div className="text-sm text-gray-500 mt-2">Загрузка...</div>
      )}

      <div className="mt-3">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
      </div>

      <div className="mt-3 rounded-lg border bg-gray-50 p-3">
        <div className="text-sm text-gray-600 mb-2">Превью</div>

        {value ? (
          <img
            src={value}
            alt="preview"
            className="w-full max-h-32 object-contain rounded bg-white"
          />
        ) : (
          <div className="text-sm text-gray-400">
            Загрузите файл или вставьте ссылку
          </div>
        )}
      </div>
    </div>
  );
}
