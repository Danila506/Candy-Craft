// components/Breadcrumb.tsx
import { Link } from "react-router-dom";

interface BreadcrumbItem {
    text: string;
    path: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    isMobile?: boolean; // Добавляем необязательный пропс
}

export function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav className="mb-6">
            <ol className="flex items-center text-sm text-gray-600">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                        {index > 0 && (
                            <span className="mx-2">/</span>
                        )}
                        {index === items.length - 1 ? (
                            <span className="text-gray-900 font-medium">
                                {item.text}
                            </span>
                        ) : (
                            <Link 
                                to={item.path}
                                className="hover:text-[#ff398b] transition-colors"
                            >
                                {item.text}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}