import { j as e, r as g, u as K, L as U } from "./react-vendor-s-vpvnqi.js";
import {
  c as k,
  S as V,
  u as X,
  a as q,
  C as G,
  A as Q,
  b as W,
} from "./index-2rEiwfDJ.js";
const H = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]],
  v = k("check", H);
const J = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]],
  Y = k("chevron-left", J);
const Z = [
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
  ee = k("layers", Z),
  c = {
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
      { id: "s", label: "S", description: "14,5см", price: 250 },
      { id: "m", label: "M", description: "19,5см", price: 1e3 },
      { id: "l", label: "L", description: "24,5см", price: 1750 },
      { id: "xl", label: "XL", description: "29,5см", price: 2500 },
    ],
    innerCandies: [
      { id: "milka", label: "Milka", mixCoefficient: 1 },
      { id: "raffaello", label: "Raffaello", mixCoefficient: 1.24 },
      { id: "kinder", label: "Kinder", mixCoefficient: 1.08 },
      { id: "ferrero", label: "Ferrero", mixCoefficient: 1.38 },
      { id: "merci", label: "Merci", mixCoefficient: 1.12 },
    ],
    colors: [
      { id: "pink", label: "Розовый", price: 0 },
      { id: "gold", label: "Золото", price: 0 },
      { id: "white", label: "Белый", price: 0 },
    ],
    outerLayers: [
      { id: "kinder-chocolate", label: "Kinder Chocolate", price: 0 },
      { id: "kinder-bueno", label: "Kinder Bueno", price: 0 },
      { id: "milka-baton", label: "Milka Baton", price: 0 },
      { id: "twix", label: "Twix", price: 0 },
      { id: "rittersport", label: "RitterSport", price: 0 },
      { id: "kitkat", label: "Kitkat", price: 0 },
      { id: "snikers", label: "Snikers", price: 0 },
      { id: "milkiway", label: "MilkiWay", price: 0 },
    ],
    wrappers: [
      {
        id: "satin",
        label: "Атласная лента",
        description: "Классическая лента вокруг торта",
        price: 0,
      },
      {
        id: "lace",
        label: "Кружевная обёртка",
        description: "Нежная фактурная отделка по борту",
        price: 0,
      },
      {
        id: "kraft",
        label: "Крафт-бортик",
        description: "Спокойная натуральная подача",
        price: 0,
      },
      {
        id: "transparent",
        label: "Прозрачный борт",
        description: "Акцент на видимые конфеты",
        price: 0,
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
    ],
    decor: [
      {
        id: "bow",
        label: "Бант",
        description: "Декоративный бант на торте",
        price: 375,
      },
      {
        id: "topper",
        label: "Топпер с надписью",
        description: "Верхний топпер с вашим текстом",
        price: 500,
      },
    ],
  },
  se = {
    type: "custom_cake",
    base: "round",
    size: "m",
    innerLayer: [{ candyId: "kinder", percentage: 100 }],
    color: "pink",
    outerLayer: "kinder-chocolate",
    wrapper: "satin",
    packaging: "standard",
    decor: [],
    messageText: "",
  };
function N(s, t) {
  return s.find((l) => l.id === t)?.label ?? t;
}
const te = { s: 950, m: 1450, l: 2050, xl: 2750 },
  re = { s: 900, m: 1300, l: 1850, xl: 2500 },
  ae = { s: 1400, m: 2100, l: 2950, xl: 3900 };
function C(s) {
  const t = s.reduce((l, a) => l + (a.percentage || 0), 0);
  return Math.round(t * 100) / 100;
}
function le(s) {
  return Number.isInteger(s) ? String(s) : s.toFixed(1).replace(/\.0$/, "");
}
function P(s) {
  const t = new Map(c.innerCandies.map((a) => [a.id, a]));
  return s
    .filter((a) => a.percentage > 0)
    .map((a) => {
      const n = t.get(a.candyId);
      return n ? `${n.label} ${le(a.percentage)}%` : null;
    })
    .filter((a) => !!a)
    .join(", ");
}
function ie(s) {
  return s.length
    ? c.decor
        .filter((l) => s.includes(l.id))
        .map((l) => l.label)
        .join(", ")
    : "Без декора";
}
function ne(s, t) {
  return Math.round(s / t) * t;
}
function z(s, t) {
  const l = te[s] ?? 0,
    a = re[s] ?? 0,
    n = ae[s] ?? Number.MAX_SAFE_INTEGER,
    x = C(t),
    p = new Map(c.innerCandies.map((m) => [m.id, m])),
    o = t
      .filter((m) => m.percentage > 0)
      .map((m) => {
        const f = p.get(m.candyId);
        return f
          ? { candyId: f.id, label: f.label, percentage: m.percentage }
          : null;
      })
      .filter((m) => !!m),
    u =
      x > 0
        ? o.reduce((m, f) => {
            const w = p.get(f.candyId);
            return w ? m + (f.percentage / x) * w.mixCoefficient : m;
          }, 0)
        : 0,
    r = l * u,
    h = ne(r, 50),
    b = x > 0 ? Math.min(n, Math.max(a, h)) : 0;
  return {
    items: o,
    totalPrice: b,
    mixCoefficient: u,
    basePrice: l,
    summary: P(t),
  };
}
function ce(s) {
  const t = c.bases.find((r) => r.id === s.base)?.price ?? 0,
    l = c.sizes.find((r) => r.id === s.size)?.price ?? 0,
    a = z(s.size, s.innerLayer).totalPrice,
    n = c.colors.find((r) => r.id === s.color)?.price ?? 0,
    x = I(s.size, s.outerLayer),
    p = c.wrappers.find((r) => r.id === s.wrapper)?.price ?? 0,
    o = c.packaging.find((r) => r.id === s.packaging)?.price ?? 0,
    u = s.decor.reduce((r, h) => {
      const b = c.decor.find((m) => m.id === h);
      return r + (b?.price ?? 0);
    }, 0);
  return t + l + a + n + x + p + o + u;
}
const de = { s: 1125, m: 1500, l: 1875, xl: 2250 };
function I(s, t) {
  return c.outerLayers.some((a) => a.id === t) ? (de[s] ?? 0) : 0;
}
function oe({ value: s, onChange: t }) {
  const l = (a) => {
    if (s.includes(a)) {
      t(s.filter((n) => n !== a));
      return;
    }
    t([...s, a]);
  };
  return e.jsxs("section", {
    className: "rounded-2xl border border-rose-100 bg-white p-4 shadow-sm",
    children: [
      e.jsxs("div", {
        className: "mb-3 flex items-center gap-3",
        children: [
          e.jsx("span", {
            className:
              "grid h-7 w-7 place-items-center rounded-full bg-[#ff398b] text-sm font-black text-white",
            children: "4",
          }),
          e.jsx("h2", {
            className: "text-base font-black text-slate-900",
            children: "Декор",
          }),
        ],
      }),
      e.jsx("div", {
        className: "grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4",
        children: c.decor.map((a) => {
          const n = s.includes(a.id);
          return e.jsxs(
            "button",
            {
              type: "button",
              onClick: () => l(a.id),
              className: `relative min-h-22 rounded-xl border p-3 text-left transition ${n ? "border-[#ff398b] bg-rose-50 text-rose-700" : "border-slate-200 bg-white text-slate-700 hover:border-rose-200"}`,
              children: [
                e.jsxs("div", {
                  className: "flex items-start justify-between gap-2",
                  children: [
                    e.jsx("div", {
                      className: "font-black",
                      children: a.label,
                    }),
                    n && e.jsx(v, { className: "h-4 w-4 shrink-0" }),
                  ],
                }),
                a.description &&
                  e.jsx("div", {
                    className: "mt-1 text-xs leading-5 text-slate-500",
                    children: a.description,
                  }),
                a.price > 0 &&
                  e.jsxs("div", {
                    className: "mt-2 text-xs font-bold text-slate-500",
                    children: ["+", a.price, " ₽"],
                  }),
              ],
            },
            a.id,
          );
        }),
      }),
    ],
  });
}
function xe(s) {
  return Number.isFinite(s) ? Math.max(0, Math.min(100, s)) : 0;
}
function me({ size: s, value: t, onChange: l }) {
  const a = new Set(t.map((r) => r.candyId)),
    n = C(t),
    x = z(s, t),
    p = Math.abs(n - 100) < 0.001,
    o = (r) => {
      if (a.has(r)) {
        l(t.filter((b) => b.candyId !== r));
        return;
      }
      const h = Math.max(0, 100 - n);
      l([...t, { candyId: r, percentage: h }]);
    },
    u = (r, h) => {
      l(t.map((b) => (b.candyId === r ? { ...b, percentage: xe(h) } : b)));
    };
  return e.jsxs("section", {
    className: "rounded-2xl border border-rose-100 bg-white p-4 shadow-sm",
    children: [
      e.jsxs("div", {
        className: "mb-3 flex items-center gap-3",
        children: [
          e.jsx("span", {
            className:
              "grid h-7 w-7 place-items-center rounded-full bg-[#ff398b] text-sm font-black text-white",
            children: "3",
          }),
          e.jsx("h2", {
            className: "text-base font-black text-slate-900",
            children: "Внутренний слой",
          }),
        ],
      }),
      e.jsx("div", {
        className: "grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-5",
        children: c.innerCandies.map((r) => {
          const h = a.has(r.id);
          return e.jsx(
            "button",
            {
              type: "button",
              onClick: () => o(r.id),
              className: `rounded-xl border px-3 py-2 text-left transition ${h ? "border-[#ff398b] bg-rose-50 text-rose-700" : "border-slate-200 bg-white text-slate-700 hover:border-rose-200"}`,
              children: e.jsx("div", {
                className: "font-black",
                children: r.label,
              }),
            },
            r.id,
          );
        }),
      }),
      e.jsxs("div", {
        className: "mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3",
        children: [
          e.jsx("div", {
            className: "mb-2 text-sm font-black text-slate-900",
            children: "Выбранные конфеты и проценты",
          }),
          t.length === 0
            ? e.jsx("div", {
                className: "text-sm text-slate-500",
                children: "Выберите хотя бы одну конфету.",
              })
            : e.jsx("div", {
                className: "space-y-2",
                children: t.map((r) => {
                  const h = c.innerCandies.find((b) => b.id === r.candyId);
                  return e.jsxs(
                    "div",
                    {
                      className:
                        "flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2",
                      children: [
                        e.jsx("div", {
                          className: "font-bold text-slate-800",
                          children: h?.label ?? r.candyId,
                        }),
                        e.jsxs("div", {
                          className: "flex items-center gap-2",
                          children: [
                            e.jsx("input", {
                              type: "number",
                              min: 0,
                              max: 100,
                              step: 1,
                              value: r.percentage,
                              onChange: (b) =>
                                u(r.candyId, Number(b.target.value || 0)),
                              className:
                                "w-20 rounded-lg border border-slate-200 px-2 py-1 text-right text-sm font-bold text-slate-900 outline-none focus:border-[#ff398b]",
                            }),
                            e.jsx("span", {
                              className: "text-sm font-bold text-slate-700",
                              children: "%",
                            }),
                          ],
                        }),
                      ],
                    },
                    r.candyId,
                  );
                }),
              }),
        ],
      }),
      e.jsxs("div", {
        className:
          "mt-3 flex items-center justify-between rounded-xl border border-rose-100 bg-rose-50 px-3 py-2",
        children: [
          e.jsx("span", {
            className: "text-sm font-black text-slate-800",
            children: "Сумма процентов",
          }),
          e.jsxs("span", {
            className: `text-sm font-black ${p ? "text-emerald-700" : "text-rose-700"}`,
            children: [n, "%"],
          }),
        ],
      }),
      !p &&
        e.jsx("div", {
          className:
            "mt-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700",
          children:
            "Сумма процентов должна быть ровно 100%. Иначе перейти дальше нельзя.",
        }),
      e.jsxs("div", {
        className: "mt-4 rounded-xl border border-slate-200 bg-white p-3",
        children: [
          e.jsx("div", {
            className: "mb-2 text-sm font-black text-slate-900",
            children: "Стоимость внутреннего слоя",
          }),
          x.items.length === 0
            ? e.jsx("div", {
                className: "text-sm text-slate-500",
                children: "Состав пока не задан.",
              })
            : e.jsx("div", {
                className: "space-y-1 text-sm text-slate-700",
                children: x.items.map((r) =>
                  e.jsxs(
                    "div",
                    {
                      className: "flex justify-between gap-2",
                      children: [
                        e.jsx("span", { children: r.label }),
                        e.jsxs("span", {
                          className: "font-semibold",
                          children: [r.percentage, "%"],
                        }),
                      ],
                    },
                    r.candyId,
                  ),
                ),
              }),
          e.jsxs("div", {
            className:
              "mt-3 border-t border-slate-200 pt-2 text-right text-sm font-black text-slate-900",
            children: [x.totalPrice.toLocaleString("ru-RU"), " ₽"],
          }),
          e.jsx("div", {
            className: "mt-1 text-xs text-slate-500",
            children:
              "Стоимость рассчитана по выбранным процентам и размеру торта.",
          }),
        ],
      }),
    ],
  });
}
const be = {
  two: "sm:grid-cols-2",
  three: "sm:grid-cols-3",
  four: "sm:grid-cols-2 xl:grid-cols-4",
};
function y({
  title: s,
  step: t,
  options: l,
  value: a,
  onChange: n,
  disabledOptions: x = {},
  columns: p = "three",
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
        className: `grid grid-cols-1 gap-2 ${be[p]}`,
        children: l.map((o) => {
          const u = o.id === a,
            r = x[o.id];
          return e.jsxs(
            "button",
            {
              type: "button",
              onClick: () => n(o.id),
              disabled: !!r,
              className: `relative min-h-22 rounded-xl border p-3 text-left transition ${u ? "border-[#ff398b] bg-rose-50 text-rose-700" : "border-slate-200 bg-white text-slate-700 hover:border-rose-200"} disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50 disabled:text-slate-400`,
              title: r,
              children: [
                e.jsxs("div", {
                  className: "flex items-start justify-between gap-2",
                  children: [
                    e.jsx("div", {
                      className: "font-black",
                      children: o.label,
                    }),
                    u && e.jsx(v, { className: "h-4 w-4 shrink-0" }),
                  ],
                }),
                o.description &&
                  e.jsx("div", {
                    className: "mt-1 text-xs leading-5 text-slate-500",
                    children: r ?? o.description,
                  }),
                o.price > 0 &&
                  e.jsxs("div", {
                    className: "mt-2 text-xs font-bold text-slate-500",
                    children: ["+", o.price, " ₽"],
                  }),
              ],
            },
            o.id,
          );
        }),
      }),
    ],
  });
}
function pe({
  config: s,
  totalPrice: t,
  quantity: l,
  isSubmitting: a,
  submitError: n,
  onQuantityChange: x,
  onAddToCart: p,
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
                children: "Шаг 5",
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
                children: [t * l, " ₽"],
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
                children: N(c.bases, s.base),
              }),
            ],
          }),
          e.jsxs("div", {
            className: "rounded-xl bg-white/8 px-3 py-2",
            children: [
              e.jsx("dt", { className: "text-slate-400", children: "Размер" }),
              e.jsx("dd", {
                className: "font-bold",
                children: N(c.sizes, s.size),
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
                children: P(s.innerLayer) || "Не задан",
              }),
            ],
          }),
          e.jsxs("div", {
            className: "rounded-xl bg-white/8 px-3 py-2",
            children: [
              e.jsx("dt", { className: "text-slate-400", children: "Цвет" }),
              e.jsx("dd", {
                className: "font-bold",
                children: N(c.colors, s.color),
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
                children: N(c.outerLayers, s.outerLayer),
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
                children: N(c.packaging, s.packaging),
              }),
            ],
          }),
          e.jsxs("div", {
            className: "rounded-xl bg-white/8 px-3 py-2 sm:col-span-2",
            children: [
              e.jsx("dt", { className: "text-slate-400", children: "Декор" }),
              e.jsx("dd", { className: "font-bold", children: ie(s.decor) }),
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
                onClick: () => x(Math.max(l - 1, 1)),
                className:
                  "grid h-9 w-9 place-items-center rounded-full bg-white/10 text-xl leading-none",
                "aria-label": "Уменьшить количество",
                children: "-",
              }),
              e.jsx("span", {
                className: "w-8 text-center font-black",
                children: l,
              }),
              e.jsx("button", {
                type: "button",
                onClick: () => x(Math.min(l + 1, 5)),
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
        onClick: p,
        disabled: a,
        className:
          "mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff398b] px-5 py-4 font-black text-white transition hover:bg-[#e0327a] disabled:cursor-not-allowed disabled:bg-slate-500",
        children: [
          e.jsx(V, { className: "h-5 w-5" }),
          a ? "Добавляем..." : "Добавить в корзину",
        ],
      }),
      n &&
        e.jsx("div", {
          className:
            "mt-3 rounded-xl border border-rose-300/40 bg-rose-500/15 px-4 py-3 text-sm text-rose-50",
          children: n,
        }),
    ],
  });
}
function he() {
  const [s, t] = g.useState(se),
    [l, a] = g.useState(0),
    [n, x] = g.useState(1),
    [p, o] = g.useState(""),
    [u, r] = g.useState(!1),
    { addCustomCandyCake: h } = X(),
    { user: b } = q(),
    m = K(),
    f = g.useMemo(() => ce(s), [s]),
    w = g.useMemo(
      () => c.outerLayers.map((i) => ({ ...i, price: I(s.size, i.id) })),
      [s.size],
    ),
    B = g.useMemo(() => C(s.innerLayer), [s.innerLayer]),
    L = s.innerLayer.length > 0 && Math.abs(B - 100) < 0.001,
    A = (i) => {
      t((d) => ({ ...d, base: i }));
    },
    T = (i) => {
      t((d) => ({ ...d, size: i }));
    },
    j = [
      { title: "Размер", caption: "Форма и габарит торта" },
      { title: "Наружный ряд", caption: "Конфеты по борту и цвет ленты" },
      { title: "Внутренний слой", caption: "Конфеты внутри сборки" },
      { title: "Декор", caption: "Детали и надпись" },
      { title: "Упаковка", caption: "Финальная подача" },
    ],
    $ = l === j.length - 1,
    _ = async () => {
      if ((o(""), !b?.id)) {
        o("Войдите в аккаунт, чтобы добавить торт в корзину");
        return;
      }
      r(!0);
      try {
        (await h({
          quantity: n,
          config: { ...s, messageText: s.messageText.trim(), totalPrice: f },
        }),
          m("/cart"));
      } catch (i) {
        o(i instanceof Q ? i.message : "Не удалось добавить торт в корзину");
      } finally {
        r(!1);
      }
    },
    R = () => {
      a((i) => Math.min(i + 1, j.length - 1));
    },
    E = () => {
      a((i) => Math.max(i - 1, 0));
    },
    O = () =>
      l === 0
        ? e.jsxs("div", {
            className: "space-y-4",
            children: [
              e.jsx(y, {
                step: 1,
                title: "Выберите размер",
                options: c.sizes,
                value: s.size,
                onChange: T,
                columns: "two",
              }),
              e.jsx(y, {
                step: 1,
                title: "Выберите форму",
                options: c.bases,
                value: s.base,
                onChange: A,
                columns: "three",
              }),
            ],
          })
        : l === 1
          ? e.jsxs("div", {
              className: "space-y-4",
              children: [
                e.jsx(y, {
                  step: 2,
                  title: "Наружный ряд конфет",
                  options: w,
                  value: s.outerLayer,
                  onChange: (i) => t((d) => ({ ...d, outerLayer: i })),
                  columns: "four",
                }),
                e.jsx(y, {
                  step: 2,
                  title: "Цвет ленты и акцентов",
                  options: c.colors,
                  value: s.color,
                  onChange: (i) => t((d) => ({ ...d, color: i })),
                  columns: "three",
                }),
              ],
            })
          : l === 2
            ? e.jsx(me, {
                size: s.size,
                value: s.innerLayer,
                onChange: (i) => t((d) => ({ ...d, innerLayer: i })),
              })
            : l === 3
              ? e.jsxs("div", {
                  className: "space-y-4",
                  children: [
                    e.jsx(oe, {
                      value: s.decor,
                      onChange: (i) =>
                        t((d) => ({
                          ...d,
                          decor: i,
                          messageText: i.includes("topper")
                            ? d.messageText
                            : "",
                        })),
                    }),
                    s.decor.includes("topper") &&
                      e.jsxs("section", {
                        className:
                          "rounded-2xl border border-rose-100 bg-white p-4 shadow-sm",
                        children: [
                          e.jsxs("label", {
                            className:
                              "block text-sm font-black text-slate-800",
                            children: [
                              "Надпись",
                              e.jsx("input", {
                                value: s.messageText,
                                onChange: (i) =>
                                  t((d) => ({
                                    ...d,
                                    messageText: i.target.value.slice(0, 40),
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
                              "До 40 символов, надпись попадёт в макет и заказ.",
                          }),
                        ],
                      }),
                  ],
                })
              : e.jsx(y, {
                  step: 5,
                  title: "Упаковка",
                  options: c.packaging,
                  value: s.packaging,
                  onChange: (i) => t((d) => ({ ...d, packaging: i })),
                  columns: "four",
                }),
    D = l === 2 && !L;
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
                        children: ["Этап ", l + 1, " из ", j.length],
                      }),
                      e.jsx("h2", {
                        className: "mt-1 text-2xl font-black text-slate-950",
                        children: j[l].title,
                      }),
                      e.jsx("p", {
                        className: "mt-1 text-sm text-slate-500",
                        children: j[l].caption,
                      }),
                    ],
                  }),
                  e.jsxs("div", {
                    className: "text-sm font-black text-slate-950",
                    children: [f.toLocaleString("ru-RU"), " ₽"],
                  }),
                ],
              }),
              e.jsx("div", {
                className: "grid gap-2 sm:grid-cols-2 xl:grid-cols-5",
                children: j.map((i, d) => {
                  const S = d < l,
                    F = d === l,
                    M = d > 2 && !L;
                  return e.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        M || a(d);
                      },
                      disabled: M,
                      className: `min-h-18 rounded-xl border px-3 py-2 text-left transition ${F ? "border-[#ff398b] bg-rose-50 text-rose-700" : S ? "border-emerald-100 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-white text-slate-600 hover:border-rose-200"} disabled:cursor-not-allowed disabled:opacity-50`,
                      children: [
                        e.jsxs("div", {
                          className:
                            "mb-1 flex items-center justify-between gap-2",
                          children: [
                            e.jsx("span", {
                              className: "text-xs font-black",
                              children: String(d + 1).padStart(2, "0"),
                            }),
                            S && e.jsx(v, { className: "h-4 w-4" }),
                          ],
                        }),
                        e.jsx("div", {
                          className: "text-sm font-black",
                          children: i.title,
                        }),
                      ],
                    },
                    i.title,
                  );
                }),
              }),
            ],
          }),
          O(),
          e.jsxs("div", {
            className:
              "flex flex-col gap-3 rounded-2xl border border-rose-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between",
            children: [
              e.jsxs("button", {
                type: "button",
                onClick: E,
                disabled: l === 0,
                className:
                  "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-black text-slate-700 transition hover:border-rose-200 hover:text-[#ff398b] disabled:cursor-not-allowed disabled:opacity-40",
                children: [e.jsx(Y, { className: "h-5 w-5" }), "Назад"],
              }),
              $
                ? e.jsx("div", {
                    className:
                      "rounded-xl bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700",
                    children: "Проверьте итог и количество в блоке справа.",
                  })
                : e.jsxs("button", {
                    type: "button",
                    onClick: R,
                    disabled: D,
                    className:
                      "inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff398b] px-6 py-3 font-black text-white transition hover:bg-[#e0327a] disabled:cursor-not-allowed disabled:bg-slate-400",
                    children: ["Далее", e.jsx(G, { className: "h-5 w-5" })],
                  }),
            ],
          }),
        ],
      }),
      e.jsx("aside", {
        className: "lg:sticky lg:top-6 lg:self-start",
        children: e.jsx(pe, {
          config: s,
          totalPrice: f,
          quantity: n,
          isSubmitting: u,
          submitError: p,
          onQuantityChange: x,
          onAddToCart: _,
        }),
      }),
    ],
  });
}
function ge() {
  return e.jsxs("main", {
    className: "min-h-screen bg-[#fff8ef]",
    children: [
      e.jsx("section", {
        className:
          "border-b border-amber-100 bg-[linear-gradient(135deg,#fff8ef,#fffafb)]",
        children: e.jsxs("div", {
          className: "container mx-auto px-4 py-8 sm:px-6 lg:px-8 lg:py-12",
          children: [
            e.jsxs(U, {
              to: "/",
              className:
                "mb-7 inline-flex items-center gap-2 rounded-full border border-rose-100 bg-white/75 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:text-[#ff398b]",
              children: [
                e.jsx(W, { className: "h-4 w-4" }),
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
                    e.jsx(ee, { className: "h-4 w-4" }),
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
                    "Сначала задайте размер и форму, затем наружный ряд конфет, внутренний слой, декор и упаковку. Итоговая стоимость обновляется на каждом шаге.",
                }),
              ],
            }),
          ],
        }),
      }),
      e.jsx("section", {
        className: "container mx-auto px-4 py-6 sm:px-6 lg:px-8 lg:py-10",
        children: e.jsx(he, {}),
      }),
    ],
  });
}
export { ge as CakeConstructorPage };
