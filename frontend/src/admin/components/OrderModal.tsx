import { Dialog } from "@headlessui/react";
import { useState, useMemo } from "react";
import type { Order, OrderItem, OrderStatusKey } from "../../types/OrderType";
import { OrderStatusLabels } from "../../types/OrderType";
import type { OrderUpdateDto } from "../context/OrderContext";
import { useProducts } from "../../contexts/ProductContext";

type CustomCandyCakeConfig = {
  type?: "custom_cake";
  base?: "round" | "square" | "heart";
  layout?: "box" | "round-basket" | "tiered-tower" | "heart-box";
  shape?: "round" | "square" | "heart";
  size?: "small" | "medium" | "large" | "s" | "m" | "l" | "xl";
  innerLayer?: Array<{
    candyId?: "milka" | "raffaello" | "kinder" | "ferrero" | "merci";
    percentage?: number;
  }>;
  color?: "pink" | "gold" | "white";
  outerLayer?:
    | "kinder-chocolate"
    | "kinder-bueno"
    | "milka-baton"
    | "twix"
    | "rittersport"
    | "kitkat"
    | "snikers"
    | "milkiway";
  wrapper?: "satin" | "lace" | "kraft" | "transparent";
  packaging?: "standard" | "window" | "gift" | "premium-box";
  decor?: Array<"bow" | "topper"> | "none" | "flowers" | "bow" | "topper";
  // Legacy orders may still contain levels/tiers. New custom cakes are single-level.
  levels?: number;
  tiers?: number;
  theme?: string;
  candies?: Array<{
    id?: string;
    name?: string;
    quantity?: number;
  }>;
  decorations?: Array<{
    type?: string;
    label?: string;
  }>;
  inscription?: string;
  messageText?: string;
};

const customShapeLabels = {
  round: "круг",
  square: "квадрат",
  heart: "сердце",
} as const;

const customSizeLabels = {
  small: "малый",
  medium: "средний",
  large: "большой",
  s: "S",
  m: "M",
  l: "L",
  xl: "XL",
} as const;

const customInnerCandyLabels = {
  milka: "Milka",
  raffaello: "Raffaello",
  kinder: "Kinder",
  ferrero: "Ferrero",
  merci: "Merci",
} as const;

const customLayoutLabels = {
  box: "коробка",
  "round-basket": "корзина",
  "tiered-tower": "башня",
  "heart-box": "сердце",
} as const;

const customOuterLayerLabels = {
  "kinder-chocolate": "Kinder Chocolate",
  "kinder-bueno": "Kinder Bueno",
  "milka-baton": "Milka Baton",
  twix: "Twix",
  rittersport: "RitterSport",
  kitkat: "Kitkat",
  snikers: "Snikers",
  milkiway: "MilkiWay",
} as const;

const customPackagingLabels = {
  standard: "фирменная коробка",
  window: "коробка с окном",
  gift: "подарочная упаковка",
  "premium-box": "премиум-бокс",
} as const;

function isCustomCandyCakeConfig(
  value: unknown,
): value is CustomCandyCakeConfig {
  return Boolean(
    value &&
    typeof value === "object" &&
    ("candies" in value || (value as { type?: string }).type === "custom_cake"),
  );
}

type Props = {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
  onUpdate: (id: number, data: OrderUpdateDto) => Promise<void>;
};

export const OrderModal = ({ isOpen, onClose, order, onUpdate }: Props) => {
  const [status, setStatus] = useState<OrderStatusKey>(order.status);
  const [items, setItems] = useState<OrderItem[]>(() =>
    order.items.map((i) => ({ ...i })),
  );

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
    const hasCustomItems = items.some((item) => item.productId === null);
    await onUpdate(order.id, {
      status,
      items: hasCustomItems
        ? undefined
        : items.map(({ productId, quantity }) => ({
            productId: productId as number,
            quantity,
          })),
    });
    onClose();
  };

  const { products } = useProducts();

  const productById = useMemo(() => {
    return new Map(products.map((p) => [p.id, p]));
  }, [products]);

  const baseQtyByProductId = useMemo(() => {
    return Object.fromEntries(
      order.items
        .filter((i) => i.productId !== null)
        .map((i) => [i.productId, i.quantity]),
    );
  }, [order.items]);
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
          <ul className="max-h-72 overflow-auto">
            {items.map((item, idx) => {
              const productId = item.productId;
              const isCustom = productId === null;
              const product =
                productId === null ? undefined : productById.get(productId);
              const available = product?.inStock ?? 0;
              const customConfig = isCustomCandyCakeConfig(item.customConfig)
                ? item.customConfig
                : null;
              const candySummary =
                customConfig?.type === "custom_cake"
                  ? (customConfig.innerLayer
                      ?.filter((part) => Number(part.percentage) > 0)
                      .map(
                        (part) =>
                          `${part.candyId ? customInnerCandyLabels[part.candyId] : "конфета"} ${part.percentage}%`,
                      )
                      .join(", ") ?? "")
                  : (customConfig?.candies
                      ?.filter((candy) => Number(candy.quantity) > 0)
                      .map(
                        (candy) =>
                          `${candy.name ?? candy.id ?? "конфета"} x${candy.quantity}`,
                      )
                      .join(", ") ?? "");

              const baseQty =
                productId === null
                  ? item.quantity
                  : (baseQtyByProductId[productId] ?? item.quantity);
              const maxQty = available + baseQty; // ✅ статично для этого заказа

              return (
                <li
                  key={item.id || idx}
                  className="flex flex-col gap-2 border-b border-gray-100 py-3 last:border-b-0"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span className="truncate">
                      {item.productName}
                      <span className="ml-2 text-xs text-gray-500">
                        {isCustom
                          ? "(индивидуальная сборка)"
                          : `(доступно: ${available}, максимум: ${maxQty})`}
                      </span>
                    </span>

                    <div className="flex items-center gap-2 self-stretch sm:self-auto">
                      <input
                        type="number"
                        value={item.quantity}
                        min={0}
                        max={maxQty}
                        disabled={isCustom}
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
                        className="border rounded px-2 py-1 w-20 disabled:bg-gray-100"
                      />
                      <span className="text-sm text-gray-600">
                        × {item.price} ₽
                      </span>
                    </div>
                  </div>

                  {customConfig && (
                    <div className="rounded-lg border border-rose-100 bg-rose-50 px-3 py-2 text-xs text-gray-700">
                      <div>
                        Тип:{" "}
                        {customConfig.type === "custom_cake"
                          ? "PNG-слои"
                          : customConfig.layout
                            ? customLayoutLabels[customConfig.layout]
                            : "—"}
                        , Форма:{" "}
                        {customConfig.type === "custom_cake" &&
                        customConfig.base
                          ? customShapeLabels[customConfig.base]
                          : customConfig.shape
                            ? customShapeLabels[customConfig.shape]
                            : "—"}
                        , размер:{" "}
                        {customConfig.size
                          ? customSizeLabels[customConfig.size]
                          : "—"}
                      </div>
                      {candySummary && (
                        <div className="mt-1">
                          {customConfig.type === "custom_cake"
                            ? "Внутренний слой"
                            : "Конфеты"}
                          : {candySummary}
                        </div>
                      )}
                      {customConfig.type === "custom_cake" && (
                        <div className="mt-1">
                          {customConfig.outerLayer
                            ? customOuterLayerLabels[customConfig.outerLayer]
                            : "наружный ряд не указан"}
                          ,{" "}
                          {customConfig.packaging
                            ? customPackagingLabels[customConfig.packaging]
                            : "упаковка не указана"}
                        </div>
                      )}
                      {(customConfig.inscription ||
                        customConfig.messageText) && (
                        <div className="mt-1">
                          Надпись:{" "}
                          {customConfig.inscription || customConfig.messageText}
                        </div>
                      )}
                    </div>
                  )}
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
