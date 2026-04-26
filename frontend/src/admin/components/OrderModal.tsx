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
  const [items, setItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    if (order?.items) {
      setItems(order.items.map((i) => ({ ...i })));
    }
  }, [order]);

  const totalAmountMinor = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + item.price * item.quantity * 100,
      0,
    );
  }, [items]);
  const amountLabel = useMemo(() => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: order.currency || "RUB",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(totalAmountMinor / 100);
  }, [order.currency, totalAmountMinor]);

  const handleSave = async () => {
    await onUpdate(order.id, {
      status,
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
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4"
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-30"
        aria-hidden="true"
      />
      <div className="bg-white rounded-lg shadow p-4 sm:p-6 z-10 w-full max-w-xl max-h-[92vh] overflow-y-auto">
        <Dialog.Title className="text-lg font-bold mb-4">
          Заказ #{order.id}
        </Dialog.Title>

        <div className="mb-4">
          <p className="font-semibold">Пользователь ID: {order.userId}</p>
          <p className="font-semibold">Сумма: {amountLabel}</p>
        </div>

        <div className="mb-4">
          <label htmlFor="order-status" className="block font-semibold mb-1">
            Статус:
          </label>
          <select
            id="order-status"
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
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-2"
                >
                  <span className="truncate">
                    {item.productName}
                    <span className="ml-2 text-xs text-gray-500">
                      (доступно: {available}, максимум: {maxQty})
                    </span>
                  </span>

                  <div className="flex items-center gap-2 self-stretch sm:self-auto">
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

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded border hover:bg-gray-100"
          >
            Закрыть
          </button>
          <button
            onClick={handleSave}
            className="w-full sm:w-auto px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Сохранить
          </button>
        </div>
      </div>
    </Dialog>
  );
};
