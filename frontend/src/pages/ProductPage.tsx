// pages/ProductPage.tsx - Адаптивная версия
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../contexts/ProductContext";
import { useCart } from "../contexts/CartContext";
import { Breadcrumb } from "../components/ui/Breadcrumb";
import { ProductGallery } from "../components/ProductGallery";
import { ProductInfo } from "../components/ProductInfo";
import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export function ProductPage() {
  const { t } = useLanguage();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { getProductById, getProductBySlug, loading } = useProducts();
  const { isItemInCart, addToCart } = useCart();
  const [isMobile, setIsMobile] = useState(false);

  // Определение мобильного устройства
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const numericId = slug ? Number(slug) : Number.NaN;
  const product =
    slug && Number.isNaN(numericId)
      ? getProductBySlug(slug)
      : getProductById(numericId);

  // Адаптивный лоадер
  if (loading) {
    return (
      <div className="container py-10 md:py-20">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-t-2 border-b-2 border-[#ff398b]"></div>
          <p className="mt-4 text-gray-600 text-sm md:text-base">
            {t("productPage.loading")}
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-10 md:py-20 px-4">
        <div className="text-center max-w-md mx-auto">
          <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
            {t("productPage.notFound")}
          </h2>
          <p className="text-gray-600 text-sm md:text-base mb-6 md:mb-8">
            {t("productPage.notFoundDescription")}
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-[#ff398b] text-white px-5 py-2.5 md:px-6 md:py-3 rounded-lg hover:bg-[#e0327a] transition-colors text-sm md:text-base w-full md:w-auto"
          >
            {t("productPage.backCatalog")}
          </button>
        </div>
      </div>
    );
  }

  const isInCart = isItemInCart(product.id);

  const handleAddToCart = async () => {
    if (isInCart) return;
    await addToCart(product.id);
  };

  return (
    <main className="container py-4 md:py-8 px-4 sm:px-6">
      {/* Хлебные крошки - адаптивные */}
      <div className="mb-4 md:mb-6">
        <Breadcrumb
          items={[
            { text: t("productPage.home"), path: "/" },
            { text: t("header.catalog"), path: "/" },
            {
              text: product.name,
              path: `/product/${product.slug || product.id}`,
            },
          ]}
          isMobile={isMobile}
        />
      </div>

      {/* Основной контент - адаптивная сетка */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 mb-10 md:mb-16">
        <div className="lg:sticky lg:top-4">
          <ProductGallery
            mainImage={product.imageUrl}
            alt={product.name}
            isMobile={isMobile}
          />
        </div>

        <div className="lg:pl-0">
          <ProductInfo
            product={product}
            isInCart={isInCart}
            onAddToCart={handleAddToCart}
            isMobile={isMobile}
          />
        </div>
      </div>

      {/* Кнопка "Назад" для мобильных */}
      {isMobile && (
        <div className="sticky bottom-0 bg-white border-t border-gray-200 py-3 px-4 -mx-4">
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            {t("productPage.back")}
          </button>
        </div>
      )}
    </main>
  );
}
