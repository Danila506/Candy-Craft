// admin/pages/Dashboard.tsx
import { AdminLayout } from "../components/AdminLayout";
import { ShoppingCart, Package, TrendingUp, DollarSign } from "lucide-react";
import { useProducts } from "../../contexts/ProductContext";
import { useOrders } from "../context/OrderContext";
import { OrderStatusLabels } from "../../types/OrderType";

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function formatMoneyRU(value: number) {
  // Под Израиль обычно ₪ — но если у тебя рубли/доллары, поменяй locale/currency
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(value);
}

type PopularProductRow = {
  id: number;
  name: string;
  sales: number;
  revenue: number;
  imageUrl?: string;
};

export function Dashboard() {
  const { products } = useProducts();
  const { orders } = useOrders();

  // ---------- STATS ----------
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const outOfStock = products.filter((p) => p.inStock <= 0).length;

  const totalRevenue = orders.reduce((sum, o: any) => {
    // totalPrice у тебя есть в таблице, используем его
    const val = Number(o.totalPrice ?? 0);
    return sum + (Number.isFinite(val) ? val : 0);
  }, 0);

  // ---------- POPULAR PRODUCTS (best-effort) ----------
  // Ожидаем, что в заказе есть items: [{ productId, quantity, price?, productName? }]
  // Если у тебя другая структура — скажи, подстрою.
  const getPopularProducts = (): PopularProductRow[] => {
    const counter = new Map<
      number,
      { sales: number; revenue: number; name?: string }
    >();

    for (const order of orders as any[]) {
      const items = order.items ?? order.orderItems ?? [];
      if (!Array.isArray(items)) continue;

      for (const it of items) {
        const productId = Number(it.productId);
        if (!Number.isFinite(productId)) continue;

        const qty = Number(it.quantity ?? 1);
        const price = Number(it.price ?? 0);
        const name = it.productName ?? it.name;

        const prev = counter.get(productId) ?? { sales: 0, revenue: 0, name };
        prev.sales += Number.isFinite(qty) ? qty : 1;
        prev.revenue +=
          (Number.isFinite(qty) ? qty : 1) *
          (Number.isFinite(price) ? price : 0);
        prev.name = prev.name ?? name;

        counter.set(productId, prev);
      }
    }

    const rows: PopularProductRow[] = Array.from(counter.entries())
      .map(([id, v]) => {
        const prod = products.find((p) => p.id === id);
        return {
          id,
          name: prod?.name ?? v.name ?? `Product #${id}`,
          sales: v.sales,
          revenue: v.revenue,
          imageUrl: prod?.imageUrl,
        };
      })
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 6);

    // Если заказов ещё нет — просто покажем первые товары как заглушку
    if (rows.length === 0) {
      return products.slice(0, 6).map((p) => ({
        id: p.id,
        name: p.name,
        sales: 0,
        revenue: 0,
        imageUrl: p.imageUrl,
      }));
    }

    return rows;
  };

  const popularProducts = getPopularProducts();

  return (
    <AdminLayout title="Дашборд">
      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-[#ff398b] p-3 rounded-lg text-white">
              <ShoppingCart size={20} />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{totalOrders}</p>
              <p className="text-gray-500 text-sm">Заказов</p>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <TrendingUp size={16} />
            <span className="ml-1">Обновляется автоматически</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gray-900 p-3 rounded-lg text-white">
              <Package size={20} />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{totalProducts}</p>
              <p className="text-gray-500 text-sm">Товаров</p>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <span>Каталог</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-red-500 p-3 rounded-lg text-white">
              <Package size={20} />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{outOfStock}</p>
              <p className="text-gray-500 text-sm">Нет в наличии</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">Проверь остатки</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-emerald-600 p-3 rounded-lg text-white">
              <DollarSign size={20} />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{totalRevenue}</p>
              <p className="text-gray-500 text-sm">Выручка</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">Сумма всех заказов</div>
        </div>
      </div>

      {/* MAIN GRID */}
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
                {(orders as any[])
                  .slice()
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime(),
                  )
                  .slice(0, 8)
                  .map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 font-medium">{order.id}</td>
                      <td className="py-3 font-medium">
                        {order.fullName ?? "—"}
                      </td>
                      <td className="py-3">
                        {order.createdAt ? formatDate(order.createdAt) : "—"}
                      </td>
                      <td className="py-3 text-gray-500">
                        {formatMoneyRU(Number(order.totalPrice ?? 0))}
                      </td>
                      <td className="py-3 font-medium">
                        {OrderStatusLabels[
                          order.status as keyof typeof OrderStatusLabels
                        ] ??
                          order.status ??
                          "—"}
                      </td>
                    </tr>
                  ))}

                {orders.length === 0 && (
                  <tr>
                    <td className="py-8 text-gray-500" colSpan={5}>
                      Заказов пока нет
                    </td>
                  </tr>
                )}
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
            {popularProducts.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {p.imageUrl ? (
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="h-10 w-10 rounded-lg object-cover border"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-lg bg-gray-100 border flex items-center justify-center text-gray-500">
                      <Package size={18} />
                    </div>
                  )}

                  <div className="min-w-0">
                    <h3 className="font-medium truncate">{p.name}</h3>
                    <p className="text-sm text-gray-500">
                      {p.sales > 0 ? `${p.sales} шт.` : "Нет продаж (пока)"}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold">
                    {p.revenue > 0 ? formatMoneyRU(p.revenue) : "—"}
                  </p>
                  <div className="flex items-center justify-end text-sm text-gray-500">
                    <TrendingUp size={14} />
                    <span className="ml-1">в топе</span>
                  </div>
                </div>
              </div>
            ))}

            {products.length === 0 && (
              <div className="py-8 text-gray-500">Товаров пока нет</div>
            )}
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-between text-gray-600">
              <span>Общая выручка:</span>
              <span className="text-xl font-bold">
                {formatMoneyRU(totalRevenue)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
