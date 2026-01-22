import { Dialog } from "@headlessui/react";
import { useState, useEffect } from "react";
import type { Order, OrderItem, OrderStatusKey } from "../../types/OrderType";
import { OrderStatusLabels } from "../../types/OrderType";
import type { OrderUpdateDto } from "../context/OrderContext";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    order: Order;
    onUpdate: (id: number, data: OrderUpdateDto) => Promise<void>;
};

export const OrderModal = ({ isOpen, onClose, order, onUpdate }: Props) => {
    const [status, setStatus] = useState<OrderStatusKey>(order.status);
    const [totalPrice, setTotalPrice] = useState<number>(order.totalPrice);
    const [items, setItems] = useState<OrderItem[]>(order.items.map(i => ({ ...i })));

    // Автоматический пересчёт totalPrice при изменении товаров
    useEffect(() => {
        const sum = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(sum);
    }, [items]);

    const handleSave = async () => {
        await onUpdate(order.id, {
            status,
            totalPrice,
            items: items.map(({ productId, quantity }) => ({ productId, quantity })),
        });
        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />
            <div className="bg-white rounded-lg shadow p-6 z-10 w-96">
                <Dialog.Title className="text-lg font-bold mb-4">Заказ #{order.id}</Dialog.Title>

                <div className="mb-4">
                    <p className="font-semibold">Пользователь ID: {order.userId}</p>
                    <p className="font-semibold">
                        Сумма: {totalPrice} ₽
                    </p>
                </div>

                <div className="mb-4">
                    <label className="block font-semibold mb-1">Статус:</label>
                    <select
                        className="w-full border rounded px-2 py-1"
                        value={status}
                        onChange={(e) => setStatus(e.target.value as OrderStatusKey)}
                    >
                        {Object.entries(OrderStatusLabels).map(([key, label]) => (
                            <option key={key} value={key}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block font-semibold mb-1">Товары:</label>
                    <ul className="max-h-40 overflow-auto">
                        {items.map((item, idx) => (
                            <li key={item.id || idx}>
                                {item.productName}:
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => {
                                        const newItems = [...items];
                                        newItems[idx].quantity = Number(e.target.value);
                                        setItems(newItems);
                                    }}
                                    
                                    className="border rounded px-1 py-0.5 w-16 mx-2"
                                    min={0}
                                /> × {item.price} ₽
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 rounded border hover:bg-gray-100">
                        Закрыть
                    </button>
                    <button onClick={handleSave} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
                        Сохранить
                    </button>
                </div>
            </div>
        </Dialog>
    );
};
