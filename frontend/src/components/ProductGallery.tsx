// components/ProductGallery.tsx
import { useState } from "react";

interface ProductGalleryProps {
    mainImage: string;
    alt: string;
    images?: string[];
    isMobile?: boolean; // Добавляем необязательный пропс
}

export function ProductGallery({ mainImage, alt, images = [] }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(mainImage);
    const allImages = [mainImage, ...images];

    return (
        <div className="sticky top-4">
            <div className="mb-4 bg-white rounded-lg overflow-hidden shadow-sm">
                <img
                    src={selectedImage}
                    alt={alt}
                    className="w-full h-auto max-h-125 object-contain"
                />
            </div>
            
            {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto py-2">
                    {allImages.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(img)}
                            className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                                selectedImage === img 
                                    ? "border-[#ff398b]" 
                                    : "border-transparent"
                            }`}
                        >
                            <img
                                src={img}
                                alt={`${alt} ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}