import { useEffect, useState, useMemo } from "react";
import { Breadcrumb } from "../components/Breadcrumb";
import { H2 } from "../components/ui/H2";
import type { ProductType } from "../types/ProductType";
import { useCart } from "../contexts/CartContext";

export function Cart() {
    const { decrementCart } = useCart();
    const [cartItems, setCartItems] = useState<ProductType[]>([]);
    // console.log(cartItems);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Храним количество для каждого товара
    const [itemQuantities, setItemQuantities] = useState<
        Record<number, number>
    >({});


    useEffect(() => {
        fetch("http://localhost:3000/cart/1")
            .then((res) => {
                if (!res.ok) throw new Error("Ошибка загрузки данных");
                return res.json();
            })
            .then((data) => {
                setCartItems(data);
                // Инициализируем количество для каждого товара
                const initialQuantities: Record<number, number> = {};
                data.forEach((item: ProductType) => {
                    initialQuantities[Number(item.id)] = 1; // По умолчанию 1
                });
                setItemQuantities(initialQuantities);
            })
            .catch((err) => {
                console.error(err);
                setError("Не удалось загрузить корзину");
            })
            .finally(() => setLoading(false));
    }, []);

    // Функции для изменения количества
    const incrementQuantity = (itemId: number) => {
        setItemQuantities((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));
    };

    const decrementQuantity = (itemId: number) => {
        setItemQuantities((prev) => ({
            ...prev,
            [itemId]: Math.max((prev[itemId] || 0) - 1, 1), // Минимум 1
        }));
    };

    // Функция удаления товара
    const removeItem = async (itemId: number) => {
        try {
            fetch(`http://localhost:3000/cart/1/items/${itemId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            }).then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            });
        } catch (error) {
            console.log("Ошибка: ", error);
        }
        decrementCart();
        setCartItems((prev) => prev.filter((item) => item.id !== itemId));
        setItemQuantities((prev) => {
            const newQuantities = { ...prev };
            delete newQuantities[itemId];
            return newQuantities;
        });
        console.log(`Товар удален`);
    };

    // Подсчет общей суммы с учетом количества
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
        <main className="container mb-30">
            <div className="text-center mb-9">
                <Breadcrumb text="Корзина" path="/cart" />
                <H2 text="Ваша корзина" />
            </div>

            <div className="flex gap-x-7">
                <div className="bg-white border border-gray-200 rounded-lg flex-1">
                    {cartItems.length === 0 ? (
                        <div className="text-center py-10">Корзина пуста</div>
                    ) : (
                        cartItems.map((item) => {
                            const quantity =
                                itemQuantities[Number(item.id)] || 1;
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
                                            <h3 className="text-xl font-medium">
                                                {item.name}
                                            </h3>
                                            <p className="text-gray-500 mt-1">
                                                В наличии: {item.inStock} шт
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-x-4">
                                        <div className="flex items-center gap-x-3">
                                            <button
                                                onClick={() =>
                                                    decrementQuantity(
                                                        Number(item.id)
                                                    )
                                                }
                                                className="w-8 h-8 border border-gray-300 rounded-full flex justify-center items-center hover:bg-gray-100 disabled:opacity-50"
                                                disabled={quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="w-8 text-center">
                                                {quantity}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    incrementQuantity(
                                                        Number(item.id)
                                                    )
                                                }
                                                className="w-8 h-8 border border-gray-300 rounded-full flex justify-center items-center hover:bg-gray-100 disabled:opacity-50"
                                                disabled={
                                                    quantity >= item.inStock
                                                }
                                            >
                                                +
                                            </button>
                                        </div>

                                        <div className="w-32 text-right">
                                            <div className="font-bold text-lg">
                                                {itemTotal.toLocaleString(
                                                    "ru-RU"
                                                )}{" "}
                                                руб
                                            </div>
                                            {quantity > 1 && (
                                                <div className="text-sm text-gray-500">
                                                    {item.price} руб ×{" "}
                                                    {quantity}
                                                </div>
                                            )}
                                        </div>

                                        <button
                                            onClick={() =>
                                                removeItem(Number(item.id))
                                            }
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
                            <span>
                                {totalPrice.toLocaleString("ru-RU")} руб
                            </span>
                        </div>
                        <div className="flex justify-between text-gray-500">
                            <span>Скидка</span>
                            <span>0 руб</span>
                        </div>
                        <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between text-lg font-bold">
                                <span>Общая сумма</span>
                                <span>
                                    {totalPrice.toLocaleString("ru-RU")} руб
                                </span>
                            </div>
                        </div>
                    </div>
                    <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition">
                        Оформить заказ
                    </button>
                </div>
            </div>
        </main>
    );
}
