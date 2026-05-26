import { j as e, r as h, u as B, L as E } from "./react-vendor-s-vpvnqi.js";
import {
  c as j,
  S as O,
  u as R,
  a as F,
  C as I,
  A as U,
  b as q,
} from "./index-D3rziFBD.js";
const D = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]],
  k = j("check", D);
const G = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]],
  Q = j("chevron-left", G);
const H = [
    [
      "path",
      {
        d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
        key: "zw3jo",
      },
    ],
    [
      "path",
      {
        d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
        key: "1wduqc",
      },
    ],
    [
      "path",
      {
        d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
        key: "kqbvx6",
      },
    ],
  ],
  J = j("layers", H),
  V = {
    two: "sm:grid-cols-2",
    three: "sm:grid-cols-3",
    four: "sm:grid-cols-2 xl:grid-cols-4",
  };
function p({
  title: s,
  step: t,
  options: r,
  value: c,
  onChange: o,
  disabledOptions: x = {},
  columns: b = "three",
}) {
  return e.jsxs("section", {
    className: "rounded-2xl border border-rose-100 bg-white p-4 shadow-sm",
    children: [
      e.jsxs("div", {
        className: "mb-3 flex items-center gap-3",
        children: [
          e.jsx("span", {
            className:
              "grid h-7 w-7 place-items-center rounded-full bg-[#ff398b] text-sm font-black text-white",
            children: t,
          }),
          e.jsx("h2", {
            className: "text-base font-black text-slate-900",
            children: s,
          }),
        ],
      }),
      e.jsx("div", {
        className: `grid grid-cols-1 gap-2 ${V[b]}`,
        children: r.map((d) => {
          const u = d.id === c,
            l = x[d.id];
          return e.jsxs(
            "button",
            {
              type: "button",
              onClick: () => o(d.id),
              disabled: !!l,
              className: `relative min-h-22 rounded-xl border p-3 text-left transition ${u ? "border-[#ff398b] bg-rose-50 text-rose-700" : "border-slate-200 bg-white text-slate-700 hover:border-rose-200"} disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50 disabled:text-slate-400`,
              title: l,
              children: [
                e.jsxs("div", {
                  className: "flex items-start justify-between gap-2",
                  children: [
                    e.jsx("div", {
                      className: "font-black",
                      children: d.label,
                    }),
                    u && e.jsx(k, { className: "h-4 w-4 shrink-0" }),
                  ],
                }),
                d.description &&
                  e.jsx("div", {
                    className: "mt-1 text-xs leading-5 text-slate-500",
                    children: l ?? d.description,
                  }),
                d.price > 0 &&
                  e.jsxs("div", {
                    className: "mt-2 text-xs font-bold text-slate-500",
                    children: ["+", d.price, " ₽"],
                  }),
              ],
            },
            d.id,
          );
        }),
      }),
    ],
  });
}
const i = {
    bases: [
      {
        id: "round",
        label: "Круглый торт",
        description: "Классическая форма",
        price: 2e3,
      },
      {
        id: "heart",
        label: "Сердце",
        description: "Подарочный акцент",
        price: 2500,
      },
      {
        id: "square",
        label: "Квадратный торт",
        description: "Ровная современная форма",
        price: 2250,
      },
    ],
    sizes: [
      { id: "m", label: "M", description: "Средний размер", price: 1e3 },
      { id: "l", label: "L", description: "Большой размер", price: 1750 },
    ],
    sweetSets: [
      {
        id: "kinder",
        label: "Kinder",
        description: "Внутренний набор Kinder-сладостей",
        price: 875,
      },
      {
        id: "merci",
        label: "Merci",
        description: "Внутри конфеты и мини-шоколад Merci",
        price: 1125,
      },
      {
        id: "mix",
        label: "Mix",
        description: "Смешанный набор конфет внутри",
        price: 750,
      },
      {
        id: "premium",
        label: "Premium",
        description: "Премиальный набор конфет внутри",
        price: 1500,
      },
    ],
    colors: [
      {
        id: "pink",
        label: "Розовый",
        description: "Розовая лента и акценты",
        price: 0,
      },
      {
        id: "gold",
        label: "Золото",
        description: "Золотая лента и праздничные детали",
        price: 250,
      },
      {
        id: "white",
        label: "Белый",
        description: "Белая лента и светлые акценты",
        price: 0,
      },
    ],
    outerLayers: [
      {
        id: "kinder-sticks",
        label: "Kinder по борту",
        description: "Наружный ряд из Kinder-шоколада",
        price: 1125,
      },
      {
        id: "kitkat",
        label: "KitKat по борту",
        description: "Плотный ряд шоколадных батончиков",
        price: 1500,
      },
      {
        id: "merci-bars",
        label: "Merci по борту",
        description: "Аккуратный внешний ряд из Merci",
        price: 1875,
      },
      {
        id: "wafer-rolls",
        label: "Вафельные трубочки",
        description: "Наружный ряд из вафельных трубочек",
        price: 1375,
      },
    ],
    wrappers: [
      {
        id: "satin",
        label: "Атласная лента",
        description: "Классическая лента вокруг торта",
        price: 375,
      },
      {
        id: "lace",
        label: "Кружевная обёртка",
        description: "Нежная фактурная отделка по борту",
        price: 625,
      },
      {
        id: "kraft",
        label: "Крафт-бортик",
        description: "Спокойная натуральная подача",
        price: 250,
      },
      {
        id: "transparent",
        label: "Прозрачный борт",
        description: "Акцент на видимые конфеты",
        price: 500,
      },
    ],
    packaging: [
      {
        id: "standard",
        label: "Фирменная коробка",
        description: "Белая коробка CandyCraft",
        price: 0,
      },
      {
        id: "window",
        label: "Коробка с окном",
        description: "Торт виден до открытия",
        price: 875,
      },
      {
        id: "gift",
        label: "Подарочная упаковка",
        description: "Бант, бирка и праздничная подача",
        price: 1250,
      },
      {
        id: "premium-box",
        label: "Премиум-бокс",
        description: "Жёсткая коробка с ложементом",
        price: 2125,
      },
    ],
    decor: [
      {
        id: "none",
        label: "Без декора",
        description: "Только торт и сладости",
        price: 0,
      },
      {
        id: "flowers",
        label: "Flowers",
        description: "Цветочный PNG-слой",
        price: 625,
      },
      {
        id: "bow",
        label: "Bow",
        description: "Бант поверх композиции",
        price: 375,
      },
      {
        id: "topper",
        label: "Topper",
        description: "Топпер с надписью",
        price: 500,
      },
    ],
  },
  W = {
    type: "custom_cake",
    base: "round",
    size: "m",
    sweetSet: "kinder",
    color: "pink",
    outerLayer: "kinder-sticks",
    wrapper: "satin",
    packaging: "standard",
    decor: "flowers",
    messageText: "",
  },
  X = i.bases.flatMap((s) =>
    i.sizes.flatMap((t) =>
      i.sweetSets.map((r) => ({
        base: s.id,
        size: t.id,
        sweetSet: r.id,
        imageUrl: `/constructor/sweets/${s.id}_${t.id}_${r.id}.png`,
        available: !(s.id === "heart" && t.id === "l" && r.id === "premium"),
      })),
    ),
  );
function m(s, t) {
  return s.find((r) => r.id === t)?.label ?? t;
}
function Y(s) {
  return X.find(
    (t) =>
      t.base === s.base &&
      t.size === s.size &&
      t.sweetSet === s.sweetSet &&
      t.available,
  );
}
function w(s, t) {
  return !!Y({ ...s, sweetSet: t });
}
function Z(s) {
  return i.sweetSets.find((t) => w(s, t.id))?.id ?? "kinder";
}
function ee(s) {
  const t = i.bases.find((l) => l.id === s.base)?.price ?? 0,
    r = i.sizes.find((l) => l.id === s.size)?.price ?? 0,
    c = i.sweetSets.find((l) => l.id === s.sweetSet)?.price ?? 0,
    o = i.colors.find((l) => l.id === s.color)?.price ?? 0,
    x = i.outerLayers.find((l) => l.id === s.outerLayer)?.price ?? 0,
    b = i.wrappers.find((l) => l.id === s.wrapper)?.price ?? 0,
    d = i.packaging.find((l) => l.id === s.packaging)?.price ?? 0,
    u = i.decor.find((l) => l.id === s.decor)?.price ?? 0;
  return t + r + c + o + x + b + d + u;
}
function se({
  config: s,
  totalPrice: t,
  quantity: r,
  isSubmitting: c,
  submitError: o,
  onQuantityChange: x,
  onAddToCart: b,
}) {
  return e.jsxs("section", {
    className:
      "rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white shadow-xl",
    children: [
      e.jsxs("div", {
        className: "mb-4 flex items-start justify-between gap-4",
        children: [
          e.jsxs("div", {
            children: [
              e.jsx("div", {
                className: "text-xs uppercase tracking-[0.22em] text-rose-200",
                children: "Шаг 6",
              }),
              e.jsx("h2", {
                className: "mt-1 text-xl font-black",
                children: "Итог",
              }),
            ],
          }),
          e.jsxs("div", {
            className: "text-right",
            children: [
              e.jsx("div", {
                className: "text-xs text-slate-300",
                children: "Итого",
              }),
              e.jsxs("div", {
                className: "text-3xl font-black",
                children: [t * r, " ₽"],
              }),
            ],
          }),
        ],
      }),
      e.jsxs("dl", {
        className:
          "grid grid-cols-1 gap-2 text-sm text-slate-200 sm:grid-cols-2",
        children: [
          e.jsxs("div", {
            className: "rounded-xl bg-white/8 px-3 py-2",
            children: [
              e.jsx("dt", { className: "text-slate-400", children: "Форма" }),
              e.jsx("dd", {
                className: "font-bold",
                children: m(i.bases, s.base),
              }),
            ],
          }),
          e.jsxs("div", {
            className: "rounded-xl bg-white/8 px-3 py-2",
            children: [
              e.jsx("dt", { className: "text-slate-400", children: "Размер" }),
              e.jsx("dd", {
                className: "font-bold",
                children: m(i.sizes, s.size),
              }),
            ],
          }),
          e.jsxs("div", {
            className: "rounded-xl bg-white/8 px-3 py-2",
            children: [
              e.jsx("dt", {
                className: "text-slate-400",
                children: "Внутренний слой",
              }),
              e.jsx("dd", {
                className: "font-bold",
                children: m(i.sweetSets, s.sweetSet),
              }),
            ],
          }),
          e.jsxs("div", {
            className: "rounded-xl bg-white/8 px-3 py-2",
            children: [
              e.jsx("dt", { className: "text-slate-400", children: "Цвет" }),
              e.jsx("dd", {
                className: "font-bold",
                children: m(i.colors, s.color),
              }),
            ],
          }),
          e.jsxs("div", {
            className: "rounded-xl bg-white/8 px-3 py-2",
            children: [
              e.jsx("dt", {
                className: "text-slate-400",
                children: "Наружный ряд",
              }),
              e.jsx("dd", {
                className: "font-bold",
                children: m(i.outerLayers, s.outerLayer),
              }),
            ],
          }),
          e.jsxs("div", {
            className: "rounded-xl bg-white/8 px-3 py-2",
            children: [
              e.jsx("dt", { className: "text-slate-400", children: "Обёртка" }),
              e.jsx("dd", {
                className: "font-bold",
                children: m(i.wrappers, s.wrapper),
              }),
            ],
          }),
          e.jsxs("div", {
            className: "rounded-xl bg-white/8 px-3 py-2",
            children: [
              e.jsx("dt", {
                className: "text-slate-400",
                children: "Упаковка",
              }),
              e.jsx("dd", {
                className: "font-bold",
                children: m(i.packaging, s.packaging),
              }),
            ],
          }),
          e.jsxs("div", {
            className: "rounded-xl bg-white/8 px-3 py-2 sm:col-span-2",
            children: [
              e.jsx("dt", { className: "text-slate-400", children: "Декор" }),
              e.jsx("dd", {
                className: "font-bold",
                children: m(i.decor, s.decor),
              }),
            ],
          }),
        ],
      }),
      e.jsxs("div", {
        className: "mt-4 flex items-center justify-between gap-3",
        children: [
          e.jsx("span", {
            className: "text-sm font-bold text-slate-200",
            children: "Количество",
          }),
          e.jsxs("div", {
            className: "flex items-center gap-2 rounded-full bg-white/10 p-1",
            children: [
              e.jsx("button", {
                type: "button",
                onClick: () => x(Math.max(r - 1, 1)),
                className:
                  "grid h-9 w-9 place-items-center rounded-full bg-white/10 text-xl leading-none",
                "aria-label": "Уменьшить количество",
                children: "-",
              }),
              e.jsx("span", {
                className: "w-8 text-center font-black",
                children: r,
              }),
              e.jsx("button", {
                type: "button",
                onClick: () => x(Math.min(r + 1, 5)),
                className:
                  "grid h-9 w-9 place-items-center rounded-full bg-white/10 text-xl leading-none",
                "aria-label": "Увеличить количество",
                children: "+",
              }),
            ],
          }),
        ],
      }),
      e.jsxs("button", {
        type: "button",
        onClick: b,
        disabled: c,
        className:
          "mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff398b] px-5 py-4 font-black text-white transition hover:bg-[#e0327a] disabled:cursor-not-allowed disabled:bg-slate-500",
        children: [
          e.jsx(O, { className: "h-5 w-5" }),
          c ? "Добавляем..." : "Добавить в корзину",
        ],
      }),
      o &&
        e.jsx("div", {
          className:
            "mt-3 rounded-xl border border-rose-300/40 bg-rose-500/15 px-4 py-3 text-sm text-rose-50",
          children: o,
        }),
    ],
  });
}
function v(s) {
  return w(s, s.sweetSet) ? s : { ...s, sweetSet: Z(s) };
}
function te() {
  const [s, t] = h.useState(W),
    [r, c] = h.useState(0),
    [o, x] = h.useState(1),
    [b, d] = h.useState(""),
    [u, l] = h.useState(!1),
    { addCustomCandyCake: y } = R(),
    { user: C } = F(),
    S = B(),
    g = h.useMemo(() => ee(s), [s]),
    L = h.useMemo(
      () =>
        Object.fromEntries(
          i.sweetSets
            .filter((a) => !w(s, a.id))
            .map((a) => [
              a.id,
              "Эта комбинация формы и размера пока недоступна",
            ]),
        ),
      [s.base, s.size],
    ),
    M = (a) => {
      t((n) => v({ ...n, base: a }));
    },
    z = (a) => {
      t((n) => v({ ...n, size: a }));
    },
    f = [
      { title: "Размер", caption: "Форма и габарит торта" },
      { title: "Наружный ряд", caption: "Конфеты по борту и цвет ленты" },
      { title: "Внутренний слой", caption: "Конфеты внутри сборки" },
      { title: "Обёртка", caption: "Оформление борта" },
      { title: "Декор", caption: "Детали и надпись" },
      { title: "Упаковка", caption: "Финальная подача" },
    ],
    P = r === f.length - 1,
    A = async () => {
      if ((d(""), !C?.id)) {
        d("Войдите в аккаунт, чтобы добавить торт в корзину");
        return;
      }
      l(!0);
      try {
        (await y({
          quantity: o,
          config: { ...s, messageText: s.messageText.trim(), totalPrice: g },
        }),
          S("/cart"));
      } catch (a) {
        d(a instanceof U ? a.message : "Не удалось добавить торт в корзину");
      } finally {
        l(!1);
      }
    },
    _ = () => {
      c((a) => Math.min(a + 1, f.length - 1));
    },
    T = () => {
      c((a) => Math.max(a - 1, 0));
    },
    $ = () =>
      r === 0
        ? e.jsxs("div", {
            className: "space-y-4",
            children: [
              e.jsx(p, {
                step: 1,
                title: "Выберите размер",
                options: i.sizes,
                value: s.size,
                onChange: z,
                columns: "two",
              }),
              e.jsx(p, {
                step: 1,
                title: "Выберите форму",
                options: i.bases,
                value: s.base,
                onChange: M,
                columns: "three",
              }),
            ],
          })
        : r === 1
          ? e.jsxs("div", {
              className: "space-y-4",
              children: [
                e.jsx(p, {
                  step: 2,
                  title: "Наружный ряд конфет",
                  options: i.outerLayers,
                  value: s.outerLayer,
                  onChange: (a) => t((n) => ({ ...n, outerLayer: a })),
                  columns: "four",
                }),
                e.jsx(p, {
                  step: 2,
                  title: "Цвет ленты и акцентов",
                  options: i.colors,
                  value: s.color,
                  onChange: (a) => t((n) => ({ ...n, color: a })),
                  columns: "three",
                }),
              ],
            })
          : r === 2
            ? e.jsx(p, {
                step: 3,
                title: "Внутренний слой",
                options: i.sweetSets,
                value: s.sweetSet,
                onChange: (a) => t((n) => ({ ...n, sweetSet: a })),
                disabledOptions: L,
                columns: "four",
              })
            : r === 3
              ? e.jsx(p, {
                  step: 4,
                  title: "Обёртка и борт",
                  options: i.wrappers,
                  value: s.wrapper,
                  onChange: (a) => t((n) => ({ ...n, wrapper: a })),
                  columns: "four",
                })
              : r === 4
                ? e.jsxs("div", {
                    className: "space-y-4",
                    children: [
                      e.jsx(p, {
                        step: 5,
                        title: "Декор",
                        options: i.decor,
                        value: s.decor,
                        onChange: (a) => t((n) => ({ ...n, decor: a })),
                        columns: "four",
                      }),
                      e.jsxs("section", {
                        className:
                          "rounded-2xl border border-rose-100 bg-white p-4 shadow-sm",
                        children: [
                          e.jsxs("label", {
                            className:
                              "block text-sm font-black text-slate-800",
                            children: [
                              "Текст поздравления",
                              e.jsx("input", {
                                value: s.messageText,
                                onChange: (a) =>
                                  t((n) => ({
                                    ...n,
                                    messageText: a.target.value.slice(0, 40),
                                  })),
                                className:
                                  "mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-[#ff398b]",
                                placeholder: "Например: С днём рождения",
                              }),
                            ],
                          }),
                          e.jsx("div", {
                            className:
                              "mt-2 text-xs font-medium text-slate-500",
                            children:
                              "До 40 символов, текст попадёт в макет и заказ.",
                          }),
                        ],
                      }),
                    ],
                  })
                : e.jsx(p, {
                    step: 6,
                    title: "Упаковка",
                    options: i.packaging,
                    value: s.packaging,
                    onChange: (a) => t((n) => ({ ...n, packaging: a })),
                    columns: "four",
                  });
  return e.jsxs("div", {
    className: "grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]",
    children: [
      e.jsxs("div", {
        className: "space-y-4",
        children: [
          e.jsxs("section", {
            className:
              "rounded-2xl border border-rose-100 bg-white p-4 shadow-sm",
            children: [
              e.jsxs("div", {
                className:
                  "mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between",
                children: [
                  e.jsxs("div", {
                    children: [
                      e.jsxs("div", {
                        className:
                          "text-xs font-bold uppercase tracking-[0.22em] text-rose-500",
                        children: ["Этап ", r + 1, " из ", f.length],
                      }),
                      e.jsx("h2", {
                        className: "mt-1 text-2xl font-black text-slate-950",
                        children: f[r].title,
                      }),
                      e.jsx("p", {
                        className: "mt-1 text-sm text-slate-500",
                        children: f[r].caption,
                      }),
                    ],
                  }),
                  e.jsxs("div", {
                    className: "text-sm font-black text-slate-950",
                    children: [g.toLocaleString("ru-RU"), " ₽"],
                  }),
                ],
              }),
              e.jsx("div", {
                className: "grid gap-2 sm:grid-cols-2 xl:grid-cols-6",
                children: f.map((a, n) => {
                  const N = n < r,
                    K = n === r;
                  return e.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => c(n),
                      className: `min-h-18 rounded-xl border px-3 py-2 text-left transition ${K ? "border-[#ff398b] bg-rose-50 text-rose-700" : N ? "border-emerald-100 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-white text-slate-600 hover:border-rose-200"}`,
                      children: [
                        e.jsxs("div", {
                          className:
                            "mb-1 flex items-center justify-between gap-2",
                          children: [
                            e.jsx("span", {
                              className: "text-xs font-black",
                              children: String(n + 1).padStart(2, "0"),
                            }),
                            N && e.jsx(k, { className: "h-4 w-4" }),
                          ],
                        }),
                        e.jsx("div", {
                          className: "text-sm font-black",
                          children: a.title,
                        }),
                      ],
                    },
                    a.title,
                  );
                }),
              }),
            ],
          }),
          $(),
          e.jsxs("div", {
            className:
              "flex flex-col gap-3 rounded-2xl border border-rose-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between",
            children: [
              e.jsxs("button", {
                type: "button",
                onClick: T,
                disabled: r === 0,
                className:
                  "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-black text-slate-700 transition hover:border-rose-200 hover:text-[#ff398b] disabled:cursor-not-allowed disabled:opacity-40",
                children: [e.jsx(Q, { className: "h-5 w-5" }), "Назад"],
              }),
              P
                ? e.jsx("div", {
                    className:
                      "rounded-xl bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700",
                    children: "Проверьте итог и количество в блоке справа.",
                  })
                : e.jsxs("button", {
                    type: "button",
                    onClick: _,
                    className:
                      "inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff398b] px-6 py-3 font-black text-white transition hover:bg-[#e0327a]",
                    children: ["Далее", e.jsx(I, { className: "h-5 w-5" })],
                  }),
            ],
          }),
        ],
      }),
      e.jsx("aside", {
        className: "lg:sticky lg:top-6 lg:self-start",
        children: e.jsx(se, {
          config: s,
          totalPrice: g,
          quantity: o,
          isSubmitting: u,
          submitError: b,
          onQuantityChange: x,
          onAddToCart: A,
        }),
      }),
    ],
  });
}
function re() {
  return e.jsxs("main", {
    className: "min-h-screen bg-[#fff8ef]",
    children: [
      e.jsx("section", {
        className:
          "border-b border-amber-100 bg-[linear-gradient(135deg,#fff8ef,#fffafb)]",
        children: e.jsxs("div", {
          className: "container mx-auto px-4 py-8 sm:px-6 lg:px-8 lg:py-12",
          children: [
            e.jsxs(E, {
              to: "/",
              className:
                "mb-7 inline-flex items-center gap-2 rounded-full border border-rose-100 bg-white/75 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:text-[#ff398b]",
              children: [
                e.jsx(q, { className: "h-4 w-4" }),
                "Вернуться в каталог",
              ],
            }),
            e.jsxs("div", {
              className: "max-w-4xl",
              children: [
                e.jsxs("div", {
                  className:
                    "mb-4 inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-2 text-sm font-bold text-rose-700",
                  children: [
                    e.jsx(J, { className: "h-4 w-4" }),
                    "Пошаговый конструктор",
                  ],
                }),
                e.jsx("h1", {
                  className:
                    "text-4xl font-black tracking-tight text-slate-950 sm:text-6xl",
                  children: "Соберите торт по этапам",
                }),
                e.jsx("p", {
                  className:
                    "mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg",
                  children:
                    "Сначала задайте размер и форму, затем наружный ряд конфет, внутренний слой, обёртку, декор и упаковку. Итоговая стоимость обновляется на каждом шаге.",
                }),
              ],
            }),
          ],
        }),
      }),
      e.jsx("section", {
        className: "container mx-auto px-4 py-6 sm:px-6 lg:px-8 lg:py-10",
        children: e.jsx(te, {}),
      }),
    ],
  });
}
export { re as CakeConstructorPage };
