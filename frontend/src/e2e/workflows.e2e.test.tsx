import {
  cleanup,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "../App";

vi.mock("canvas-confetti", () => ({
  default: vi.fn(),
}));

const product = {
  id: 10,
  slug: "berry-cake",
  name: "Berry cake",
  description: "Fresh cake",
  price: 1200,
  isActive: true,
  deletedAt: null,
  inStock: 5,
  reservedQty: 0,
  imageUrl: "https://example.test/cake.jpg",
  categoryId: 1,
  category: { id: 1, name: "Cakes" },
};

const order = {
  id: 77,
  publicOrderNumber: "ORD-2026-000077",
  userId: 2,
  fullName: "User Buyer",
  status: "PENDING",
  totalPrice: 1700,
  currency: "RUB",
  subtotalMinor: 120000,
  discountTotalMinor: 0,
  taxTotalMinor: 0,
  deliveryFeeMinor: 50000,
  giftTotalMinor: 0,
  finalAmountMinor: 170000,
  createdAt: "2026-04-26T00:00:00.000Z",
  items: [
    {
      id: 1,
      orderId: 77,
      productId: 10,
      productName: "Berry cake",
      quantity: 1,
      price: 1200,
    },
  ],
};

function jsonResponse(body: unknown, status = 200) {
  return Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    headers: new Headers({ "content-type": "application/json" }),
    json: async () => body,
  } as Response);
}

function renderAt(path: string) {
  window.history.pushState({}, "", path);
  return render(<App />);
}

describe("frontend checkout and admin workflows", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    vi.spyOn(console, "log").mockImplementation(() => undefined);
    vi.stubGlobal(
      "confirm",
      vi.fn(() => true),
    );
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    window.history.pushState({}, "", "/");
  });

  it("logs in an admin, creates and updates a product, and updates an order", async () => {
    const user = userEvent.setup();
    const products = [product];
    const orders = [order];

    const fetchMock = vi.fn(
      async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = String(input);
        const path = new URL(url, "http://localhost:3000").pathname;
        const search = new URL(url, "http://localhost:3000").search;
        const method = init?.method ?? "GET";

        if (path === "/auth/me")
          return jsonResponse({ message: "Unauthorized" }, 401);
        if (path === "/auth/login" && method === "POST") {
          return jsonResponse({
            user: {
              id: 1,
              email: "admin@example.test",
              firstName: "Admin",
              lastName: "User",
              role: "ADMIN",
            },
          });
        }
        if (path === "/products" && method === "GET") {
          expect(search).toContain("includeInactive=true");
          return jsonResponse([...products]);
        }
        if (path === "/categories") {
          return jsonResponse([{ id: 1, name: "Cakes" }]);
        }
        if (path === "/products" && method === "POST") {
          const body = JSON.parse(String(init?.body));
          const created = {
            ...product,
            ...body,
            id: 11,
            category: { id: body.categoryId, name: "Cakes" },
          };
          products.push(created);
          return jsonResponse(created, 201);
        }
        if (path === "/products/11" && method === "PUT") {
          const body = JSON.parse(String(init?.body));
          const updated = {
            ...products.find((candidate) => candidate.id === 11)!,
            ...body,
            category: { id: body.categoryId, name: "Cakes" },
          };
          products.splice(
            products.findIndex((candidate) => candidate.id === 11),
            1,
            updated,
          );
          return jsonResponse({
            message: "Товар изменен",
            changedProduct: updated,
          });
        }
        if (path === "/orders" && method === "GET") return jsonResponse(orders);
        if (path === "/orders/77" && method === "PATCH") {
          const body = JSON.parse(String(init?.body));
          const updated = { ...orders[0], status: body.status };
          orders[0] = updated;
          return jsonResponse(updated);
        }

        return jsonResponse({ message: `Unhandled ${method} ${path}` }, 500);
      },
    );
    vi.stubGlobal("fetch", fetchMock);

    renderAt("/admin/products");

    await user.type(
      await screen.findByLabelText(/email/i),
      "admin@example.test",
    );
    await user.type(screen.getByLabelText(/пароль/i), "secret123");
    await user.click(screen.getByRole("button", { name: "Войти" }));

    expect(await screen.findByText("Управление товарами")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /добавить товар/i }));
    await user.type(
      screen.getByLabelText(/название товара/i),
      "Chocolate tart",
    );
    await user.clear(screen.getByLabelText(/цена/i));
    await user.type(screen.getByLabelText(/цена/i), "900");
    await user.clear(screen.getByLabelText(/количество/i));
    await user.type(screen.getByLabelText(/количество/i), "4");
    await user.type(
      screen.getByPlaceholderText("https://..."),
      "https://example.test/tart.jpg",
    );
    await user.type(screen.getByLabelText(/описание/i), "Dark chocolate tart");
    await user.click(screen.getByRole("button", { name: "Создать товар" }));

    expect(await screen.findByText("Chocolate tart")).toBeInTheDocument();
    await user.click(
      screen.getByRole("button", {
        name: /редактировать товар chocolate tart/i,
      }),
    );
    const nameInput = screen.getByLabelText(/название товара/i);
    await user.clear(nameInput);
    await user.type(nameInput, "Chocolate tart XL");
    await user.click(
      screen.getByRole("button", { name: "Сохранить изменения" }),
    );

    expect(await screen.findByText("Chocolate tart XL")).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: "Заказы" }));
    expect(await screen.findByText("Управление заказами")).toBeInTheDocument();
    expect(await screen.findByText("User Buyer")).toBeInTheDocument();
    await user.click(
      screen.getByRole("button", { name: /редактировать заказ 77/i }),
    );
    await user.selectOptions(screen.getByLabelText(/статус/i), "PAID");
    await user.click(screen.getByRole("button", { name: "Сохранить" }));

    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringMatching(/\/orders\/77$/),
        expect.objectContaining({
          method: "PATCH",
          body: expect.stringContaining('"status":"PAID"'),
        }),
      ),
    );
  });

  it("lets a user complete checkout and create a paid order", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn(
      async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = String(input);
        const path = new URL(url, "http://localhost:3000").pathname;
        const method = init?.method ?? "GET";

        if (path === "/auth/me") {
          return jsonResponse({
            id: 2,
            email: "buyer@example.test",
            firstName: "Buyer",
            lastName: "User",
            role: "USER",
          });
        }
        if (path === "/products") return jsonResponse([product]);
        if (path === "/cart/2" && method === "GET") {
          return jsonResponse([
            { ...product, productId: product.id, quantity: 1 },
          ]);
        }
        if (path === "/cart/2" && method === "DELETE")
          return jsonResponse({ ok: true });
        if (path === "/auth/me/addresses") return jsonResponse([]);
        if (path === "/orders/options") {
          return jsonResponse({
            delivery: [
              {
                id: 1,
                name: "Экспресс доставка",
                description: "Доставим в течение 2 часов",
                price: 500,
                priceMinor: 50000,
                time: "2 часа",
                available: true,
              },
            ],
            gifts: [
              {
                id: 3,
                name: "Волшебная пыль",
                description: "Съедобные блестки",
                price: 100,
                priceMinor: 10000,
                available: true,
              },
            ],
          });
        }
        if (path === "/suggest/address") {
          return jsonResponse({ suggestions: [] });
        }
        if (path === "/orders/2" && method === "POST") {
          const body = JSON.parse(String(init?.body));
          expect(body).toMatchObject({
            address: "Vladivostok, Test street 1",
            deliveryOptionId: 1,
            giftOptionId: 3,
          });
          return jsonResponse(
            {
              id: 101,
              publicOrderNumber: "ORD-2026-000101",
              status: "PENDING",
            },
            201,
          );
        }
        if (path === "/payments/orders/101/yookassa" && method === "POST") {
          return jsonResponse(
            { status: "SUCCEEDED", confirmationUrl: null },
            201,
          );
        }

        return jsonResponse({ message: `Unhandled ${method} ${path}` }, 500);
      },
    );
    vi.stubGlobal("fetch", fetchMock);

    renderAt("/checkout");

    await user.type(
      await screen.findByPlaceholderText("Город, улица, дом"),
      "Vladivostok, Test street 1",
    );
    await user.click(screen.getByRole("button", { name: /продолжить/i }));
    await user.click(
      await screen.findByRole("button", { name: /экспресс доставка/i }),
    );
    await user.click(screen.getByRole("button", { name: /продолжить/i }));
    await user.click(
      await screen.findByRole("button", { name: /волшебная пыль/i }),
    );
    await user.click(screen.getByRole("button", { name: /продолжить/i }));

    expect(await screen.findByText("Berry cake")).toBeInTheDocument();
    const submit = screen.getByRole("button", { name: /завершить заказ/i });
    expect(within(submit).getByText(/итого:/i)).toHaveTextContent(
      "Итого: 1 800 ₽",
    );
    await user.click(submit);

    expect(await screen.findByText(/заказ создан/i)).toBeInTheDocument();
    expect(screen.getByText(/ORD-2026-000101/)).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringMatching(/\/payments\/orders\/101\/yookassa$/),
      expect.objectContaining({ method: "POST" }),
    );
  });
});
