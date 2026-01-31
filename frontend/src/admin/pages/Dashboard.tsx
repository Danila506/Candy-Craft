// admin/pages/Dashboard.tsx
import { AdminLayout } from "../components/AdminLayout";
import {
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  DollarSign,
} from "lucide-react";

export function Dashboard() {
  const stats = [
    {
      label: "Всего заказов",
      value: "1,234",
      icon: <ShoppingCart />,
      color: "bg-blue-500",
    },
    {
      label: "Всего товаров",
      value: "89",
      icon: <Package />,
      color: "bg-green-500",
    },
    {
      label: "Клиенты",
      value: "2,567",
      icon: <Users />,
      color: "bg-purple-500",
    },
    {
      label: "Выручка",
      value: "₽ 1,234,567",
      icon: <DollarSign />,
      color: "bg-yellow-500",
    },
  ];

  const recentOrders = [
    {
      id: "#00123",
      customer: "Анна Иванова",
      date: "12.01.2024",
      total: "₽ 5,600",
      status: "Доставлен",
    },
    {
      id: "#00122",
      customer: "Петр Сидоров",
      date: "11.01.2024",
      total: "₽ 8,900",
      status: "В обработке",
    },
    {
      id: "#00121",
      customer: "Мария Петрова",
      date: "10.01.2024",
      total: "₽ 3,200",
      status: "Доставлен",
    },
    {
      id: "#00120",
      customer: "Иван Кузнецов",
      date: "09.01.2024",
      total: "₽ 12,500",
      status: "Отменен",
    },
  ];

  const popularProducts = [
    { name: "Торт 'Клубничная мечта'", sales: 156, revenue: "₽ 234,000" },
    { name: "Набор 'Сладкий подарок'", sales: 89, revenue: "₽ 178,000" },
    { name: "Торт 'Шоколадный рай'", sales: 67, revenue: "₽ 100,500" },
  ];

  return (
    <AdminLayout title="Дашборд">
      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg text-white`}>
                {stat.icon}
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp size={16} />
              <span className="ml-1">+12.5% за месяц</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Последние заказы */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Последние заказы</h2>
            <button className="text-[#ff398b] hover:underline text-sm">
              Смотреть все
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 text-gray-500 font-medium">
                    ID
                  </th>
                  <th className="text-left py-3 text-gray-500 font-medium">
                    Клиент
                  </th>
                  <th className="text-left py-3 text-gray-500 font-medium">
                    Дата
                  </th>
                  <th className="text-left py-3 text-gray-500 font-medium">
                    Сумма
                  </th>
                  <th className="text-left py-3 text-gray-500 font-medium">
                    Статус
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 font-medium">{order.id}</td>
                    <td className="py-3">{order.customer}</td>
                    <td className="py-3 text-gray-500">{order.date}</td>
                    <td className="py-3 font-medium">{order.total}</td>
                    <td className="py-3">
                      <span
                        className={`
                                                px-2 py-1 rounded-full text-xs font-medium
                                                ${
                                                  order.status === "Доставлен"
                                                    ? "bg-green-100 text-green-800"
                                                    : order.status ===
                                                        "В обработке"
                                                      ? "bg-blue-100 text-blue-800"
                                                      : "bg-red-100 text-red-800"
                                                }
                                            `}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Популярные товары */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Популярные товары</h2>
            <button className="text-[#ff398b] hover:underline text-sm">
              Смотреть все
            </button>
          </div>

          <div className="space-y-4">
            {popularProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-500">
                    {product.sales} продаж
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{product.revenue}</p>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp size={14} />
                    <span className="ml-1">
                      +{Math.floor(Math.random() * 30)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-between text-gray-600">
              <span>Общая выручка:</span>
              <span className="text-xl font-bold">₽ 512,500</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
