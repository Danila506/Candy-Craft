import { Breadcrumb } from "../ui/Breadcrumb";
import { useEffect, useMemo, useState } from "react";
import { H2 } from "../ui/H2";
import { useCart } from "../../contexts/CartContext";
import { API_URL } from "../../api/config";
import { useAuth } from "../../contexts/AuthContext";

export function CartBlock() {
  const { cartItems, refreshCart } = useCart();
  const { user } = useAuth();
  const userId = user?.id; // Убрали decrementCart
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);

  const [itemQuantities, setItemQuantities] = useState<Record<number, number>>(
    {},
  );

  useEffect(() => {
    const initialQuantities: Record<number, number> = {};
    cartItems.forEach((item) => {
      initialQuantities[Number(item.id)] = item.quantity;
    });
    setItemQuantities(initialQuantities);
    setLoading(false);
  }, [cartItems]); // Зависимость от cartItems

  // Остальные функции остаются без изменений
  const incrementQuantity = (itemId: number) => {
    setItemQuantities((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const decrementQuantity = (itemId: number) => {
    setItemQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 1),
    }));
  };

  const removeItem = async (itemId: number) => {
    try {
      if (!userId) return;

      await fetch(`${API_URL}/cart/${userId}/items/${itemId}`, {
        method: "DELETE",
        credentials: "include",
      });
      refreshCart();
    } catch (error) {
      console.error("Ошибка удаления:", error);
    }
  };

  // Подсчет общей суммы
  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const quantity = itemQuantities[Number(item.id)] ?? 1;
      return sum + Number(item.price) * quantity;
    }, 0);
  }, [cartItems, itemQuantities]);

  // Подсчет общего количества товаров
  const totalItems = useMemo(() => {
    return Object.values(itemQuantities).reduce((sum, qty) => sum + qty, 0);
  }, [itemQuantities]);

  if (loading) return <div className="text-center py-10">Загрузка...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <>
      <div className="text-center mb-9">
        <Breadcrumb
          items={[
            { text: "Главная", path: "/" },
            { text: "Корзина", path: "/cart" },
          ]}
        />
        <H2 text="Ваша корзина" />
      </div>

      <div className="flex gap-x-7">
        <div className="bg-white border border-gray-200 rounded-lg flex-1">
          {cartItems.length === 0 ? (
            <div className="text-center py-10">Корзина пуста</div>
          ) : (
            cartItems.map((item) => {
              const quantity = itemQuantities[Number(item.id)] ?? item.quantity;
              const itemTotal = Number(item.price) * quantity;

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-b-gray-200 py-5 px-4 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-x-5 flex-1">
                    <img
                      className="w-30 h-30 object-cover rounded"
                      src={item.imageUrl}
                      alt={item.name}
                    />
                    <div>
                      <h3 className="text-xl font-medium">{item.name}</h3>
                      <p className="text-gray-500 mt-1">
                        В наличии: {item.inStock} шт
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-x-4">
                    <div className="flex items-center gap-x-3">
                      <button
                        onClick={() => decrementQuantity(Number(item.id))}
                        className="w-8 h-8 border border-gray-300 rounded-full flex justify-center items-center hover:bg-gray-100 disabled:opacity-50"
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{quantity}</span>
                      <button
                        onClick={() => incrementQuantity(Number(item.id))}
                        className="w-8 h-8 border border-gray-300 rounded-full flex justify-center items-center hover:bg-gray-100 disabled:opacity-50"
                        disabled={quantity >= item.inStock}
                      >
                        +
                      </button>
                    </div>

                    <div className="w-32 text-right">
                      <div className="font-bold text-lg">
                        {itemTotal.toLocaleString("ru-RU")} руб
                      </div>
                      {quantity > 1 && (
                        <div className="text-sm text-gray-500">
                          {item.price} руб × {quantity}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => removeItem(Number(item.id))}
                      className="ml-4 text-sm text-gray-400 font-bold hover:text-red-500"
                      title="Удалить"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Боковая панель с итогами */}
        <div className="bg-white border border-gray-200 rounded-lg p-7 w-80 h-fit">
          <h3 className="text-xl font-bold mb-4">Итого</h3>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Товары ({totalItems})</span>
              <span>{totalPrice.toLocaleString("ru-RU")} руб</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Скидка</span>
              <span>0 руб</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between text-lg font-bold">
                <span>Общая сумма</span>
                <span>{totalPrice.toLocaleString("ru-RU")} руб</span>
              </div>
            </div>
          </div>
          <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition">
            Оформить заказ
          </button>
        </div>
      </div>
    </>
  );
}
