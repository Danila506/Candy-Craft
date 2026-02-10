import { Dialog } from "@headlessui/react";
import { useState, useEffect, useMemo, useRef } from "react";
import type { Order, OrderItem, OrderStatusKey } from "../../types/OrderType";
import { OrderStatusLabels } from "../../types/OrderType";
import type { OrderUpdateDto } from "../context/OrderContext";
import { useProducts } from "../../contexts/ProductContext";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
  onUpdate: (id: number, data: OrderUpdateDto) => Promise<void>;
};

export const OrderModal = ({ isOpen, onClose, order, onUpdate }: Props) => {
  const [status, setStatus] = useState<OrderStatusKey>(order.status);
  const [totalPrice, setTotalPrice] = useState<number>(order.totalPrice);
  const [items, setItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    if (order?.items) {
      setItems(order.items.map((i) => ({ ...i })));
    }
  }, [order]);

  // Автоматический пересчёт totalPrice при изменении товаров
  useEffect(() => {
    const sum = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    setTotalPrice(sum);
  }, [items]);

  const handleSave = async () => {
    await onUpdate(order.id, {
      status,
      totalPrice,
      items: items.map(({ productId, quantity }) => ({
        productId,
        quantity,
      })),
    });
    onClose();
  };

  const baseQtyRef = useRef<Record<number, number>>({}); // ключ = productId, значение = qty из заказа при открытии

  useEffect(() => {
    if (order?.items) {
      setItems(order.items.map((i) => ({ ...i })));

      // фиксируем базовые qty один раз при смене order.id
      baseQtyRef.current = Object.fromEntries(
        order.items.map((i) => [i.productId, i.quantity]),
      );
    }
  }, [order?.id]); // ВАЖНО: именно order.id, чтобы не пересоздавалось от каждого рендера
  const { products } = useProducts();

  const productById = useMemo(() => {
    return new Map(products.map((p) => [p.id, p]));
  }, [products]);
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center "
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-30"
        aria-hidden="true"
      />
      <div className="bg-white rounded-lg shadow p-6 z-10 w-115">
        <Dialog.Title className="text-lg font-bold mb-4">
          Заказ #{order.id}
        </Dialog.Title>

        <div className="mb-4">
          <p className="font-semibold">Пользователь ID: {order.userId}</p>
          <p className="font-semibold">Сумма: {totalPrice} ₽</p>
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
            {items.map((item, idx) => {
              const product = productById.get(item.productId);
              const available = product?.inStock ?? 0;

              const baseQty =
                baseQtyRef.current[item.productId] ?? item.quantity;
              const maxQty = available + baseQty; // ✅ статично для этого заказа

              return (
                <li
                  key={item.id || idx}
                  className="flex items-center justify-between gap-2 py-1"
                >
                  <span className="truncate">
                    {item.productName}
                    <span className="ml-2 text-xs text-gray-500">
                      (доступно: {available}, максимум: {maxQty})
                    </span>
                  </span>

                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={item.quantity}
                      min={0}
                      max={maxQty}
                      onChange={(e) => {
                        const raw = Number(e.target.value);
                        const next = Number.isFinite(raw) ? raw : 0;

                        const clamped = Math.min(Math.max(next, 0), maxQty);

                        setItems((prev) =>
                          prev.map((it, i) =>
                            i === idx
                              ? {
                                  ...it,
                                  quantity: clamped,
                                }
                              : it,
                          ),
                        );
                      }}
                      className="border rounded px-2 py-1 w-20"
                    />
                    <span className="text-sm text-gray-600">
                      × {item.price} ₽
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border hover:bg-gray-100"
          >
            Закрыть
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Сохранить
          </button>
        </div>
      </div>
    </Dialog>
  );
};
