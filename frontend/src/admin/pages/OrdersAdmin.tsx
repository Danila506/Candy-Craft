// admin/pages/OrdersAdmin.tsx
import { useState } from "react";
import { AdminLayout } from "../components/AdminLayout";
import { Edit, Trash2 } from "lucide-react";
import { useOrders, type OrderUpdateDto } from "../context/OrderContext"; // контекст заказов
import { OrderModal } from "../components/OrderModal"; // модальное окно для редактирования/просмотра заказа
import type { Order, OrderItem } from "../../types/OrderType";
import { OrderStatusLabels } from "../../types/OrderType";

function formatOrderAmount(order: Order) {
  if (typeof order.finalAmountMinor !== "number") return "—";
  const currency = order.currency || "RUB";
  const minor = order.finalAmountMinor;

  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(minor / 100);
}

export function OrdersAdmin() {
  const { orders, updateOrder, deleteOrder } = useOrders();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleUpdate = async (id: number, data: OrderUpdateDto) => {
    await updateOrder(id, data);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Удалить заказ?")) {
      await deleteOrder(id);
    }
  };

  const handleEdit = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  return (
    <AdminLayout title="Управление заказами">
      {/* Таблица заказов */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">ID заказа</th>
                <th className="px-6 py-3 text-left">Пользователь</th>
                <th className="px-6 py-3 text-left">Статус</th>
                <th className="px-6 py-3 text-left">Сумма</th>
                <th className="px-6 py-3 text-left">Товары</th>
                <th className="px-6 py-3 text-left">Действия</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: Order) => (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">{order.id}</td>
                  <td className="px-6 py-4">{order.fullName}</td>
                  <td className="px-6 py-4">
                    {
                      OrderStatusLabels[
                        order.status as keyof typeof OrderStatusLabels
                      ]
                    }
                  </td>
                  <td className="px-6 py-4">{formatOrderAmount(order)}</td>
                  <td className="px-6 py-4">
                    <ul>
                      {order.items?.map((item: OrderItem) => (
                        <li key={item.id}>
                          {item.productName} — {item.quantity}шт.
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(order)}
                        aria-label={`Редактировать заказ ${order.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(order.id)}
                        aria-label={`Удалить заказ ${order.id}`}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Модальное окно для заказа */}
      {isModalOpen && selectedOrder && (
        <OrderModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          order={selectedOrder}
          onUpdate={handleUpdate}
        />
      )}
    </AdminLayout>
  );
}
