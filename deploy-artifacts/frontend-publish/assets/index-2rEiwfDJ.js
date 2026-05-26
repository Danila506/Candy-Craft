const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "assets/CakeConstructorPage-Dm-II_bP.js",
      "assets/react-vendor-s-vpvnqi.js",
    ]),
) => i.map((i) => d[i]);
import {
  r as c,
  j as e,
  L as G,
  N as qe,
  u as Ue,
  a as Zr,
  b as qs,
  c as os,
  G as O,
  d as Jr,
  t as cs,
  e as ea,
  f as ta,
  B as sa,
  R as ra,
  g as Y,
  O as Ws,
  h as aa,
} from "./react-vendor-s-vpvnqi.js";
(function () {
  const s = document.createElement("link").relList;
  if (s && s.supports && s.supports("modulepreload")) return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) a(n);
  new MutationObserver((n) => {
    for (const l of n)
      if (l.type === "childList")
        for (const o of l.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && a(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(n) {
    const l = {};
    return (
      n.integrity && (l.integrity = n.integrity),
      n.referrerPolicy && (l.referrerPolicy = n.referrerPolicy),
      n.crossOrigin === "use-credentials"
        ? (l.credentials = "include")
        : n.crossOrigin === "anonymous"
          ? (l.credentials = "omit")
          : (l.credentials = "same-origin"),
      l
    );
  }
  function a(n) {
    if (n.ep) return;
    n.ep = !0;
    const l = r(n);
    fetch(n.href, l);
  }
})();
const na = "modulepreload",
  la = function (t) {
    return "/" + t;
  },
  ds = {},
  ia = function (s, r, a) {
    let n = Promise.resolve();
    if (r && r.length > 0) {
      let i = function (u) {
        return Promise.all(
          u.map((x) =>
            Promise.resolve(x).then(
              (g) => ({ status: "fulfilled", value: g }),
              (g) => ({ status: "rejected", reason: g }),
            ),
          ),
        );
      };
      document.getElementsByTagName("link");
      const o = document.querySelector("meta[property=csp-nonce]"),
        d = o?.nonce || o?.getAttribute("nonce");
      n = i(
        r.map((u) => {
          if (((u = la(u)), u in ds)) return;
          ds[u] = !0;
          const x = u.endsWith(".css"),
            g = x ? '[rel="stylesheet"]' : "";
          if (document.querySelector(`link[href="${u}"]${g}`)) return;
          const h = document.createElement("link");
          if (
            ((h.rel = x ? "stylesheet" : na),
            x || (h.as = "script"),
            (h.crossOrigin = ""),
            (h.href = u),
            d && h.setAttribute("nonce", d),
            document.head.appendChild(h),
            x)
          )
            return new Promise((m, p) => {
              (h.addEventListener("load", m),
                h.addEventListener("error", () =>
                  p(new Error(`Unable to preload CSS for ${u}`)),
                ));
            });
        }),
      );
    }
    function l(o) {
      const d = new Event("vite:preloadError", { cancelable: !0 });
      if (((d.payload = o), window.dispatchEvent(d), !d.defaultPrevented))
        throw o;
    }
    return n.then((o) => {
      for (const d of o || []) d.status === "rejected" && l(d.reason);
      return s().catch(l);
    });
  },
  oa = "/assets/candyLogo-header-Ckz7bMzg.png",
  Ee = "https://api.candy-craft.ru";
class ne extends Error {
  status;
  details;
  constructor(s, r, a) {
    (super(s), (this.status = r), (this.details = a));
  }
}
function ca(t, s) {
  const r = t?.message ?? t?.error;
  return Array.isArray(r)
    ? r.join(", ")
    : typeof r == "string" && r.trim()
      ? r
      : s;
}
async function us(t) {
  return (t.headers.get("content-type") || "").includes("application/json")
    ? await t.json().catch(() => null)
    : null;
}
let at = null;
async function da() {
  return (
    at ||
      (at = (async () =>
        (
          await fetch(`${Ee}/auth/refresh`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          })
        ).ok)().finally(() => {
        at = null;
      })),
    at
  );
}
async function _e(t, s = {}) {
  const { headers: r = {}, body: a, retryOn401: n = !0, ...l } = s,
    o = await fetch(`${Ee}${t}`, {
      ...l,
      method: l.method ?? "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json", ...r },
      body: a !== void 0 ? JSON.stringify(a) : void 0,
    });
  if (o.status === 401 && n) {
    if (await da()) return _e(t, { ...s, retryOn401: !1 });
    throw new ne("Сессия истекла. Войдите снова.", 401);
  }
  if (!o.ok) {
    const i = await us(o),
      u = ca(i, `Ошибка ${o.status}`);
    throw new ne(u, o.status, i);
  }
  return o.status === 204 ? null : await us(o);
}
const z = {
    get: (t, s) => _e(t, { ...s, method: "GET" }),
    post: (t, s, r) => _e(t, { ...r, method: "POST", body: s }),
    put: (t, s, r) => _e(t, { ...r, method: "PUT", body: s }),
    patch: (t, s, r) => _e(t, { ...r, method: "PATCH", body: s }),
    del: (t, s) => _e(t, { ...s, method: "DELETE" }),
  },
  Hs = c.createContext(void 0);
function ua({ children: t }) {
  const [s, r] = c.useState(null),
    [a, n] = c.useState(!0),
    l = async () => {
      try {
        const u = await z.get("/auth/me");
        r(u);
      } catch {
        r(null);
      }
    };
  c.useEffect(() => {
    l().finally(() => n(!1));
  }, []);
  const o = async (u, x) => {
      const g = await z.post("/auth/login", { email: u, password: x });
      return (r(g.user), g.user);
    },
    d = async () => {
      (await z.post("/auth/logout"), r(null));
    },
    i = c.useMemo(
      () => ({ user: s, isLoading: a, login: o, logout: d, refreshUser: l }),
      [s, a],
    );
  return e.jsx(Hs.Provider, { value: i, children: t });
}
function xe() {
  const t = c.useContext(Hs);
  if (!t) throw new Error("useAuth must be used within an AuthProvider");
  return t;
}
const Vs = c.createContext(void 0),
  ma = ({ children: t }) => {
    const [s, r] = c.useState([]),
      a = s.reduce((w, N) => w + N.quantity, 0),
      { user: n } = xe(),
      l = n?.id,
      [o, d] = c.useState(!1),
      i = async () => {
        if (!l) {
          r([]);
          return;
        }
        try {
          const w = await z.get(`/cart/${l}`);
          r(w ?? []);
        } catch (w) {
          console.error("Ошибка загрузки корзины: ", w);
        }
      },
      u = async () => {
        try {
          if (!l) return;
          (await z.del(`/cart/${l}`), r([]));
        } catch (w) {
          console.error(w);
        }
      };
    c.useEffect(() => {
      i();
    }, [l]);
    const k = {
      cartCount: a,
      cartItems: s,
      refreshCart: () => {
        i();
      },
      isItemInCart: (w) => s.some((N) => N.productId === w),
      clearCart: u,
      addToCart: async (w) => {
        try {
          if (!l) throw new Error("Пользователь не авторизован");
          const N = await z.post(`/cart/${l}/items`, { productId: w });
          r(($) => {
            const S = $.findIndex((A) => A.id === N.item.id);
            return S === -1
              ? [...$, N.item]
              : $.map((A, q) => (q === S ? { ...A, ...N.item } : A));
          });
        } catch (N) {
          console.error("Не удалось добавить товар:", N);
        }
      },
      addCustomCandyCake: async (w) => {
        try {
          if (!l) throw new Error("Пользователь не авторизован");
          const N = await z.post(`/cart/${l}/custom-candy-cakes`, w);
          r(($) => [...$, N.item]);
        } catch (N) {
          throw (console.error("Не удалось добавить конфетный торт:", N), N);
        }
      },
      removeItem: async (w) => {
        try {
          if (!l) return;
          (await z.del(`/cart/${l}/items/${w}`),
            r((N) => N.filter(($) => $.productId !== w)));
        } catch (N) {
          console.error("Ошибка удаления:", N);
        }
      },
      removeCartEntry: async (w) => {
        try {
          if (!l) return;
          if (w.isCustom || w.productId === null) {
            (await z.del(`/cart/${l}/custom-items/${w.id}`),
              r((N) => N.filter(($) => $.id !== w.id)));
            return;
          }
          (await z.del(`/cart/${l}/items/${w.productId}`),
            r((N) => N.filter(($) => $.productId !== w.productId)));
        } catch (N) {
          console.error("Ошибка удаления:", N);
        }
      },
      updateItemQuantity: async (w, N) => {
        try {
          if (!l) return;
          (await z.patch(`/cart/${l}/items/${w}`, { quantity: N }), await i());
        } catch ($) {
          throw (console.error("Ошибка обновления количества:", $), $);
        }
      },
      updateCartEntryQuantity: async (w, N) => {
        try {
          if (!l) return;
          (w.isCustom || w.productId === null
            ? await z.patch(`/cart/${l}/custom-items/${w.id}`, { quantity: N })
            : await z.patch(`/cart/${l}/items/${w.productId}`, { quantity: N }),
            await i());
        } catch ($) {
          throw (console.error("Ошибка обновления количества:", $), $);
        }
      },
      showAuthWarn: o,
      setShowAuthWarn: d,
    };
    return e.jsx(Vs.Provider, { value: k, children: t });
  },
  ye = () => {
    const t = c.useContext(Vs);
    if (!t)
      throw new Error("useCart должен использоваться внутри CartProvider");
    return t;
  };
const xa = (t) => t.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  ha = (t) =>
    t.replace(/^([A-Z])|[\s-_]+(\w)/g, (s, r, a) =>
      a ? a.toUpperCase() : r.toLowerCase(),
    ),
  ms = (t) => {
    const s = ha(t);
    return s.charAt(0).toUpperCase() + s.slice(1);
  },
  Gs = (...t) =>
    t
      .filter((s, r, a) => !!s && s.trim() !== "" && a.indexOf(s) === r)
      .join(" ")
      .trim(),
  fa = (t) => {
    for (const s in t)
      if (s.startsWith("aria-") || s === "role" || s === "title") return !0;
  };
var pa = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
const ga = c.forwardRef(
  (
    {
      color: t = "currentColor",
      size: s = 24,
      strokeWidth: r = 2,
      absoluteStrokeWidth: a,
      className: n = "",
      children: l,
      iconNode: o,
      ...d
    },
    i,
  ) =>
    c.createElement(
      "svg",
      {
        ref: i,
        ...pa,
        width: s,
        height: s,
        stroke: t,
        strokeWidth: a ? (Number(r) * 24) / Number(s) : r,
        className: Gs("lucide", n),
        ...(!l && !fa(d) && { "aria-hidden": "true" }),
        ...d,
      },
      [
        ...o.map(([u, x]) => c.createElement(u, x)),
        ...(Array.isArray(l) ? l : [l]),
      ],
    ),
);
const R = (t, s) => {
  const r = c.forwardRef(({ className: a, ...n }, l) =>
    c.createElement(ga, {
      ref: l,
      iconNode: s,
      className: Gs(`lucide-${xa(ms(t))}`, `lucide-${t}`, a),
      ...n,
    }),
  );
  return ((r.displayName = ms(t)), r);
};
const ba = [
    ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
    ["path", { d: "M19 12H5", key: "x3x0zl" }],
  ],
  xs = R("arrow-left", ba);
const ya = [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }],
  ],
  va = R("arrow-right", ya);
const ja = [
    [
      "rect",
      { width: "20", height: "12", x: "2", y: "6", rx: "2", key: "9lu3g6" },
    ],
    ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
    ["path", { d: "M6 12h.01M18 12h.01", key: "113zkx" }],
  ],
  Na = R("banknote", ja);
const wa = [
    ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
    [
      "path",
      {
        d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
        key: "11g9vi",
      },
    ],
  ],
  ka = R("bell", wa);
const Ca = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]],
  hs = R("chevron-right", Ca);
const Sa = [
    ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
    ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }],
  ],
  Ye = R("circle-check-big", Sa);
const Ea = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
    ["path", { d: "M12 17h.01", key: "p32p05" }],
  ],
  Ks = R("circle-question-mark", Ea);
const $a = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
    ["path", { d: "m9 9 6 6", key: "z0biqf" }],
  ],
  fs = R("circle-x", $a);
const Ma = [
    ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }],
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ],
  ft = R("clock", Ma);
const Pa = [
    [
      "rect",
      { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" },
    ],
    ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }],
  ],
  ut = R("credit-card", Pa);
const Ia = [
    ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }],
    [
      "path",
      { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", key: "1b0p4s" },
    ],
  ],
  Aa = R("dollar-sign", Ia);
const Fa = [
    [
      "rect",
      { x: "3", y: "8", width: "18", height: "4", rx: "1", key: "bkv52" },
    ],
    ["path", { d: "M12 8v13", key: "1c76mn" }],
    ["path", { d: "M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7", key: "6wjy6b" }],
    [
      "path",
      {
        d: "M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5",
        key: "1ihvrl",
      },
    ],
  ],
  _t = R("gift", Fa);
const La = [
    [
      "path",
      {
        d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
        key: "mvr1a0",
      },
    ],
  ],
  Oa = R("heart", La);
const Ta = [
    ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }],
    ["path", { d: "M10.41 10.41a2 2 0 1 1-2.83-2.83", key: "1bzlo9" }],
    ["line", { x1: "13.5", x2: "6", y1: "13.5", y2: "21", key: "1q0aeu" }],
    ["line", { x1: "18", x2: "21", y1: "12", y2: "15", key: "5mozeu" }],
    [
      "path",
      {
        d: "M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59",
        key: "mmje98",
      },
    ],
    ["path", { d: "M21 15V5a2 2 0 0 0-2-2H9", key: "43el77" }],
  ],
  Ra = R("image-off", Ta);
const Da = [
    [
      "rect",
      { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" },
    ],
    [
      "rect",
      { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" },
    ],
    [
      "rect",
      { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" },
    ],
    [
      "rect",
      { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" },
    ],
  ],
  _a = R("layout-dashboard", Da);
const za = [
    ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
    ["path", { d: "M21 12H9", key: "dn1m92" }],
    ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }],
  ],
  Ua = R("log-out", za);
const Ba = [
    ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
    [
      "rect",
      { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" },
    ],
  ],
  qa = R("mail", Ba);
const Wa = [
    [
      "path",
      {
        d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
        key: "1r0f0z",
      },
    ],
    ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }],
  ],
  Gt = R("map-pin", Wa);
const Ha = [
    ["path", { d: "M4 5h16", key: "1tepv9" }],
    ["path", { d: "M4 12h16", key: "1lakjw" }],
    ["path", { d: "M4 19h16", key: "1djgab" }],
  ],
  Xs = R("menu", Ha);
const Va = [
    [
      "path",
      {
        d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
        key: "1sd12s",
      },
    ],
  ],
  Ys = R("message-circle", Va);
const Ga = [
    [
      "path",
      {
        d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
        key: "18887p",
      },
    ],
  ],
  Qs = R("message-square", Ga);
const Ka = [["path", { d: "M5 12h14", key: "1ays0h" }]],
  Xa = R("minus", Ka);
const Ya = [
    [
      "path",
      {
        d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
        key: "1a0edw",
      },
    ],
    ["path", { d: "M12 22V12", key: "d0xqtd" }],
    ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
    ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
  ],
  ge = R("package", Ya);
const Qa = [
    [
      "path",
      {
        d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
        key: "9njp5v",
      },
    ],
  ],
  Zs = R("phone", Qa);
const Za = [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }],
  ],
  Kt = R("plus", Za);
const Ja = [
    [
      "path",
      {
        d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
        key: "v9h5vc",
      },
    ],
    ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
    [
      "path",
      {
        d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
        key: "3uifl3",
      },
    ],
    ["path", { d: "M8 16H3v5", key: "1cv678" }],
  ],
  en = R("refresh-cw", Ja);
const tn = [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ],
  Js = R("search", tn);
const sn = [
    [
      "path",
      {
        d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
        key: "1i5ecw",
      },
    ],
    ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
  ],
  rn = R("settings", sn);
const an = [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
        key: "oel41y",
      },
    ],
    ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
  ],
  ps = R("shield-check", an);
const nn = [
    ["circle", { cx: "8", cy: "21", r: "1", key: "jimo8o" }],
    ["circle", { cx: "19", cy: "21", r: "1", key: "13723u" }],
    [
      "path",
      {
        d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",
        key: "9zh506",
      },
    ],
  ],
  Ze = R("shopping-cart", nn);
const ln = [
    ["path", { d: "M10 5H3", key: "1qgfaw" }],
    ["path", { d: "M12 19H3", key: "yhmn1j" }],
    ["path", { d: "M14 3v4", key: "1sua03" }],
    ["path", { d: "M16 17v4", key: "1q0r14" }],
    ["path", { d: "M21 12h-9", key: "1o4lsq" }],
    ["path", { d: "M21 19h-5", key: "1rlt1p" }],
    ["path", { d: "M21 5h-7", key: "1oszz2" }],
    ["path", { d: "M8 10v4", key: "tgpxqk" }],
    ["path", { d: "M8 12H3", key: "a7s4jb" }],
  ],
  on = R("sliders-horizontal", ln);
const cn = [
    [
      "path",
      {
        d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
        key: "1s2grr",
      },
    ],
    ["path", { d: "M20 2v4", key: "1rf3ol" }],
    ["path", { d: "M22 4h-4", key: "gwowj6" }],
    ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }],
  ],
  Fe = R("sparkles", cn);
const dn = [
    [
      "path",
      {
        d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",
        key: "1m0v6g",
      },
    ],
    [
      "path",
      {
        d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
        key: "ohrbg2",
      },
    ],
  ],
  Xt = R("square-pen", dn);
const un = [
    [
      "path",
      {
        d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
        key: "r04s7s",
      },
    ],
  ],
  mn = R("star", un);
const xn = [
    [
      "path",
      {
        d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
        key: "vktsd0",
      },
    ],
    [
      "circle",
      { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" },
    ],
  ],
  er = R("tag", xn);
const hn = [
    ["path", { d: "M10 11v6", key: "nco0om" }],
    ["path", { d: "M14 11v6", key: "outv1u" }],
    ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
    ["path", { d: "M3 6h18", key: "d0wm0j" }],
    ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }],
  ],
  pt = R("trash-2", hn);
const fn = [
    ["path", { d: "M16 7h6v6", key: "box55l" }],
    ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }],
  ],
  gs = R("trending-up", fn);
const pn = [
    [
      "path",
      {
        d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2",
        key: "wrbu53",
      },
    ],
    ["path", { d: "M15 18H9", key: "1lyqi6" }],
    [
      "path",
      {
        d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
        key: "lysw3i",
      },
    ],
    ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
    ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }],
  ],
  Qe = R("truck", pn);
const gn = [
    ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
    ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }],
  ],
  tr = R("user", gn);
const bn = [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
  ],
  sr = R("x", bn);
const yn = [
    [
      "path",
      {
        d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
        key: "1xq2db",
      },
    ],
  ],
  vn = R("zap", yn);
function rr() {
  const { cartCount: t } = ye(),
    { user: s } = xe(),
    [r, a] = c.useState(!1),
    n = s ? "/account" : "/account/login",
    l = ({ isActive: o }) =>
      `transition-colors ${o ? "text-[#ff398b]" : "text-gray-700 hover:text-[#ff398b]"}`;
  return e.jsxs("header", {
    className:
      "sticky top-0 z-50 border-b border-rose-100 bg-white/85 backdrop-blur",
    children: [
      e.jsx("div", {
        className:
          "bg-linear-to-r from-rose-50 via-pink-50 to-rose-50 text-center text-xs text-gray-700 py-2 px-4 border-b border-rose-100",
        children: "Доставка по Биробиджану • Заказы на сегодня до 18:00",
      }),
      e.jsxs("div", {
        className:
          "container mx-auto px-3 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-2 sm:gap-4",
        children: [
          e.jsxs("div", {
            className: "flex min-w-0 items-center gap-2",
            children: [
              e.jsx("button", {
                className:
                  "lg:hidden p-2 rounded-xl border border-rose-100 text-gray-700 hover:bg-rose-50",
                onClick: () => a((o) => !o),
                "aria-label": r ? "Закрыть меню" : "Открыть меню",
                children: r ? e.jsx(sr, { size: 18 }) : e.jsx(Xs, { size: 18 }),
              }),
              e.jsx(G, {
                to: "/",
                className: "inline-flex items-center",
                "aria-label": "CandyCraft — на главную",
                children: e.jsx("img", {
                  src: oa,
                  alt: "CandyCraft",
                  width: 192,
                  height: 192,
                  decoding: "async",
                  fetchPriority: "high",
                  className:
                    "h-16 sm:h-20 md:h-24 lg:h-28 w-auto max-w-[150px] sm:max-w-[190px] object-contain",
                }),
              }),
            ],
          }),
          e.jsxs("nav", {
            className: "hidden lg:flex items-center gap-6 text-sm",
            children: [
              e.jsx(qe, { to: "/", className: l, children: "Каталог" }),
              e.jsx(qe, {
                to: "/constructor",
                className: l,
                children: "Конструктор",
              }),
              e.jsx(qe, {
                to: "/delivery",
                className: l,
                children: "Доставка и оплата",
              }),
              e.jsx(qe, {
                to: "/contacts",
                className: l,
                children: "Контакты",
              }),
            ],
          }),
          e.jsxs("ul", {
            className: "flex shrink-0 items-center gap-1 sm:gap-2",
            children: [
              e.jsx("li", {
                children: e.jsx("button", {
                  className:
                    "p-2 rounded-xl text-gray-700 hover:bg-rose-50 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#ff398b]",
                  "aria-label": "Поиск",
                  type: "button",
                  children: e.jsx(Js, { size: 20 }),
                }),
              }),
              e.jsx("li", {
                children: e.jsx(G, {
                  to: n,
                  className:
                    "p-2 rounded-xl text-gray-700 hover:bg-rose-50 inline-flex focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#ff398b]",
                  "aria-label": "Аккаунт",
                  children: e.jsx(tr, { size: 20 }),
                }),
              }),
              e.jsx("li", {
                children: e.jsxs(G, {
                  to: "/cart",
                  className:
                    "relative p-2 rounded-xl text-gray-700 hover:bg-rose-50 inline-flex focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#ff398b]",
                  "aria-label": "Корзина",
                  children: [
                    e.jsx(Ze, { size: 20 }),
                    t > 0 &&
                      e.jsx("span", {
                        className:
                          "absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-[#ff398b] text-white text-[10px] font-semibold flex items-center justify-center shadow-sm",
                        children: t,
                      }),
                  ],
                }),
              }),
            ],
          }),
        ],
      }),
      r &&
        e.jsx("nav", {
          className:
            "lg:hidden border-t border-rose-100 bg-white px-4 py-3 shadow-sm",
          children: e.jsxs("ul", {
            className: "space-y-2 text-sm",
            children: [
              e.jsx("li", {
                children: e.jsx(G, {
                  className: "text-gray-700 hover:text-[#ff398b]",
                  to: "/constructor",
                  onClick: () => a(!1),
                  children: "Конструктор",
                }),
              }),
              e.jsx("li", {
                children: e.jsx(G, {
                  className: "text-gray-700 hover:text-[#ff398b]",
                  to: "/",
                  onClick: () => a(!1),
                  children: "Каталог",
                }),
              }),
              e.jsx("li", {
                children: e.jsx(G, {
                  className: "text-gray-700 hover:text-[#ff398b]",
                  to: "/delivery",
                  onClick: () => a(!1),
                  children: "Доставка и оплата",
                }),
              }),
              e.jsx("li", {
                children: e.jsx(G, {
                  className: "text-gray-700 hover:text-[#ff398b]",
                  to: "/contacts",
                  onClick: () => a(!1),
                  children: "Контакты",
                }),
              }),
            ],
          }),
        }),
    ],
  });
}
function jn(t) {
  const { user: s } = xe(),
    r = s?.id,
    { isItemInCart: a, addToCart: n } = ye(),
    {
      imageUrl: l,
      name: o,
      description: d,
      price: i,
      id: u,
      inStock: x,
      reservedQty: g,
      category: h,
    } = t,
    [m, p] = c.useState(!l),
    y = a(u),
    v = Math.max(0, x - (g ?? 0)),
    j = v < 1,
    { setShowAuthWarn: k } = ye(),
    w = async () => {
      if (!r) {
        k(!0);
        return;
      }
      y || j || (await n(u));
    };
  return e.jsx("li", {
    className: "list-none ",
    children: e.jsxs("div", {
      className:
        "group flex h-full flex-col bg-white rounded-2xl shadow-sm border border-rose-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200",
      children: [
        e.jsxs(G, {
          to: `/product/${u}`,
          className: "block flex-1",
          children: [
            e.jsxs("div", {
              className:
                "relative overflow-hidden bg-linear-to-br from-rose-100 via-pink-100 to-rose-50 aspect-square",
              children: [
                m
                  ? e.jsxs("div", {
                      className:
                        "absolute inset-0 flex flex-col items-center justify-center text-rose-300 gap-2",
                      children: [
                        e.jsx(Ra, { className: "w-8 h-8" }),
                        e.jsx("span", {
                          className: "text-xs",
                          children: "Нет фото",
                        }),
                      ],
                    })
                  : e.jsx("img", {
                      className:
                        "absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
                      src: l,
                      alt: o,
                      loading: "lazy",
                      onError: () => p(!0),
                    }),
                e.jsxs("div", {
                  className:
                    "absolute top-2 left-2 sm:top-3 sm:left-3 flex max-w-[calc(100%-1rem)] flex-col gap-1.5 sm:gap-2 z-10",
                  children: [
                    e.jsx("span", {
                      className:
                        "inline-flex max-w-full items-center rounded-full border border-rose-100 bg-white/85 px-2 sm:px-2.5 py-1 text-[10px] sm:text-[11px] font-medium text-gray-700 backdrop-blur truncate",
                      children: h?.name ?? "Категория",
                    }),
                    e.jsx("span", {
                      className: `inline-flex max-w-full items-center rounded-full px-2 sm:px-2.5 py-1 text-[10px] sm:text-[11px] font-medium border backdrop-blur truncate ${j ? "bg-white/85 text-red-600 border-red-100" : "bg-white/85 text-emerald-700 border-emerald-100"}`,
                      children: j ? "Нет в наличии" : `В наличии: ${v}`,
                    }),
                  ],
                }),
                y &&
                  e.jsxs("div", {
                    className:
                      "absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/90 text-[#ff398b] text-[11px] sm:text-xs font-semibold px-2 sm:px-2.5 py-1 rounded-full border border-rose-100 flex items-center gap-1 z-10 shadow-sm backdrop-blur",
                    children: [
                      e.jsx(Ye, { className: "w-3.5 h-3.5" }),
                      e.jsx("span", {
                        className: "hidden min-[360px]:inline",
                        children: "В корзине",
                      }),
                    ],
                  }),
                e.jsx("div", {
                  className:
                    "absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-white/70 to-transparent",
                }),
              ],
            }),
            e.jsxs("div", {
              className: "bg-white p-3 sm:p-4 flex-1",
              children: [
                e.jsx("h3", {
                  className:
                    "text-sm md:text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-[#ff398b] transition-colors",
                  children: o,
                }),
                e.jsx("p", {
                  className:
                    "mt-2 text-gray-600 text-xs line-clamp-2 leading-relaxed",
                  children: d,
                }),
              ],
            }),
          ],
        }),
        e.jsx("div", {
          className:
            "mt-auto border-t border-rose-100 bg-white px-3 sm:px-4 py-3 sm:py-3.5",
          children: e.jsxs("div", {
            className:
              "flex flex-col min-[360px]:flex-row min-[360px]:items-center justify-between gap-3",
            children: [
              e.jsxs("div", {
                className: "flex flex-col",
                children: [
                  e.jsx("span", {
                    className: "text-[11px] text-gray-500",
                    children: "Цена",
                  }),
                  e.jsxs("span", {
                    className:
                      "text-base sm:text-lg md:text-xl font-semibold text-gray-900",
                    children: [i, "₽"],
                  }),
                ],
              }),
              e.jsxs("button", {
                onClick: w,
                disabled: y || j,
                className: `inline-flex w-full min-[360px]:w-auto justify-center items-center font-semibold gap-2 px-3 py-2 rounded-xl text-xs md:text-sm transition-all duration-200 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#ff398b] ${y ? "bg-rose-50 text-[#ff398b] border border-rose-100 cursor-not-allowed" : j ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-[#ff398b] text-white hover:bg-[#ff2a81] active:scale-95 shadow-sm"}`,
                "aria-label": y
                  ? "Товар уже в корзине"
                  : j
                    ? "Товара нет в наличии"
                    : `Добавить ${o} в корзину`,
                children: [
                  y
                    ? e.jsx(Ye, { className: "w-4 h-4" })
                    : e.jsx(Ze, { className: "w-4 h-4" }),
                  y ? "В корзине" : j ? "Нет в наличии" : "В корзину",
                ],
              }),
            ],
          }),
        }),
      ],
    }),
  });
}
const ar = c.createContext(void 0),
  Nn = ({ children: t }) => {
    const { user: s } = xe(),
      [r, a] = c.useState([]),
      [n, l] = c.useState(!0),
      [o, d] = c.useState(null),
      i = async (y) => {
        l(!0);
        try {
          const v = await z.del(`/products/${y}`);
          (a((j) => j.filter((k) => k.id !== y)),
            d(null),
            console.log(v.message));
        } catch (v) {
          (d("Не удалось удалить товар"), console.error(v));
        } finally {
          l(!1);
        }
      },
      u = async (y, v) => {
        l(!0);
        try {
          const k = (await z.put(`/products/${y}`, v)).changedProduct;
          return (
            a((w) => w.map((N) => (N.id === y ? { ...N, ...k } : N))),
            d(null),
            k
          );
        } catch (j) {
          throw (d("Не удалось обновить товар"), console.error(j), j);
        } finally {
          l(!1);
        }
      },
      x = async (y) => {
        l(!0);
        try {
          const v = await z.post("/products", y);
          return (
            console.log("Товар успешно создан:", v),
            a((j) => [...j, v]),
            d(null),
            v
          );
        } catch (v) {
          const j = v instanceof Error ? v.message : "Не удалось создать товар";
          throw (d(j), console.error("Ошибка создания товара:", v), v);
        } finally {
          l(!1);
        }
      },
      g = async () => {
        l(!0);
        try {
          const y =
              s?.role === "ADMIN"
                ? "/products?includeInactive=true"
                : "/products",
            v = await z.get(y);
          (a(v ?? []), d(null));
        } catch (y) {
          (d("Не удалось загрузить товары"), console.error(y));
        } finally {
          l(!1);
        }
      };
    c.useEffect(() => {
      g();
    }, [s?.role]);
    const p = {
      products: r,
      loading: n,
      error: o,
      getProductById: (y) => r.find((v) => v.id === y),
      getProductsByCategory: (y) => r.filter((v) => v.categoryId === y),
      refreshProducts: g,
      deleteProduct: i,
      updateProduct: u,
      createProduct: x,
    };
    return e.jsx(ar.Provider, { value: p, children: t });
  },
  Je = () => {
    const t = c.useContext(ar);
    if (!t)
      throw new Error(
        "useProducts должен использоваться внутри ProductsProvider",
      );
    return t;
  },
  wn = [
    { value: "popular", label: "Сначала популярные" },
    { value: "cheap", label: "Сначала дешевле" },
    { value: "expensive", label: "Сначала дороже" },
    { value: "new", label: "Сначала новые" },
  ];
function kn() {
  return e.jsxs("div", {
    className:
      "rounded-2xl border border-rose-100 overflow-hidden bg-white shadow-sm",
    children: [
      e.jsx("div", {
        className:
          "aspect-4/5 bg-linear-to-br from-rose-100 via-pink-100 to-rose-50 animate-pulse",
      }),
      e.jsxs("div", {
        className: "p-4 space-y-2",
        children: [
          e.jsx("div", {
            className: "h-4 w-2/3 bg-rose-100 rounded animate-pulse",
          }),
          e.jsx("div", {
            className: "h-3 w-full bg-rose-50 rounded animate-pulse",
          }),
          e.jsx("div", {
            className: "h-3 w-3/4 bg-rose-50 rounded animate-pulse",
          }),
        ],
      }),
      e.jsxs("div", {
        className:
          "border-t border-rose-100 p-4 flex justify-between items-center",
        children: [
          e.jsx("div", {
            className: "h-6 w-20 bg-rose-100 rounded animate-pulse",
          }),
          e.jsx("div", {
            className: "h-9 w-28 bg-rose-100 rounded-xl animate-pulse",
          }),
        ],
      }),
    ],
  });
}
function Cn() {
  const { products: t, loading: s } = Je(),
    [r, a] = c.useState([]),
    [n, l] = c.useState(!0),
    [o, d] = c.useState(""),
    [i, u] = c.useState(null),
    [x, g] = c.useState("popular"),
    [h, m] = c.useState(!1),
    [p, y] = c.useState(null),
    [v, j] = c.useState(!1);
  c.useEffect(() => {
    fetch(`${Ee}/categories`)
      .then((S) => S.json())
      .then((S) => {
        (a(S), l(!1));
      })
      .catch(() => l(!1));
  }, []);
  const k = c.useMemo(
    () => (t.length ? Math.max(...t.map((S) => S.price)) : 0),
    [t],
  );
  c.useEffect(() => {
    !p && k > 0 && y(k);
  }, [k, p]);
  const w = c.useMemo(() => {
      const A = (i ? t.filter((D) => D.categoryId === i) : t).filter((D) => {
          const E = o.trim().toLowerCase();
          return E
            ? D.name.toLowerCase().includes(E) ||
                D.description.toLowerCase().includes(E)
            : !0;
        }),
        P = [
          ...(h ? A.filter((D) => D.inStock > 0) : A).filter((D) =>
            p ? D.price <= p : !0,
          ),
        ];
      return (
        x === "cheap" && P.sort((D, E) => D.price - E.price),
        x === "expensive" && P.sort((D, E) => E.price - D.price),
        x === "new" && P.sort((D, E) => E.id - D.id),
        P
      );
    }, [t, i, o, h, p, x]),
    N = () => {
      (u(null), g("popular"), d(""), m(!1), y(k || null));
    },
    $ = s || n;
  return e.jsxs("section", {
    className: "space-y-6 md:space-y-8",
    children: [
      e.jsx("div", {
        className: "flex flex-col gap-3 md:gap-4",
        children: e.jsxs("div", {
          className: "flex flex-col lg:flex-row lg:items-center gap-3",
          children: [
            e.jsx("div", {
              className: "-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0",
              children: e.jsxs("div", {
                className: "flex gap-2 min-w-max pb-1",
                children: [
                  e.jsx("button", {
                    onClick: () => u(null),
                    className: `px-4 py-2 rounded-full text-sm border transition-colors ${i === null ? "bg-[#ff398b] text-white border-[#ff398b] shadow-sm" : "bg-white text-gray-700 border-rose-100 hover:border-[#ff398b]/40 hover:text-[#ff398b]"}`,
                    children: "Все товары",
                  }),
                  r.map((S) =>
                    e.jsx(
                      "button",
                      {
                        onClick: () => u(S.id),
                        className: `px-4 py-2 rounded-full text-sm border whitespace-nowrap transition-colors ${i === S.id ? "bg-[#ff398b] text-white border-[#ff398b] shadow-sm" : "bg-white text-gray-700 border-rose-100 hover:border-[#ff398b]/40 hover:text-[#ff398b]"}`,
                        children: S.name,
                      },
                      S.id,
                    ),
                  ),
                ],
              }),
            }),
            e.jsxs("div", {
              className:
                "lg:ml-auto flex min-w-0 flex-col sm:flex-row gap-2 sm:items-center",
              children: [
                e.jsx("input", {
                  type: "search",
                  value: o,
                  onChange: (S) => d(S.target.value),
                  placeholder: "Поиск по каталогу",
                  className:
                    "h-10 w-full sm:w-72 rounded-xl border border-rose-100 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-[#ff398b]/15 focus:border-[#ff398b]/40",
                  "aria-label": "Поиск по товарам",
                }),
                e.jsx("select", {
                  className:
                    "h-10 rounded-xl border border-rose-100 bg-white px-3 text-sm text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#ff398b]/15 focus:border-[#ff398b]/40",
                  value: x,
                  onChange: (S) => g(S.target.value),
                  "aria-label": "Сортировка товаров",
                  children: wn.map((S) =>
                    e.jsx(
                      "option",
                      { value: S.value, children: S.label },
                      S.value,
                    ),
                  ),
                }),
                e.jsxs("button", {
                  onClick: () => j(!0),
                  className:
                    "lg:hidden h-10 px-4 rounded-xl border border-rose-100 bg-white text-sm inline-flex items-center justify-center gap-2 hover:border-[#ff398b]/40 hover:text-[#ff398b] transition-colors",
                  children: [e.jsx(on, { size: 16 }), " Фильтры"],
                }),
              ],
            }),
          ],
        }),
      }),
      e.jsxs("div", {
        className: "grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6",
        children: [
          e.jsxs("aside", {
            className:
              "hidden lg:block rounded-2xl border border-rose-100 bg-white p-4 h-fit space-y-4 shadow-sm",
            children: [
              e.jsxs("div", {
                className: "flex items-center justify-between",
                children: [
                  e.jsx("h2", {
                    className: "font-medium text-gray-900",
                    children: "Фильтры",
                  }),
                  e.jsx("button", {
                    type: "button",
                    onClick: N,
                    className: "text-xs text-[#ff398b] hover:underline",
                    children: "Сбросить",
                  }),
                ],
              }),
              e.jsxs("label", {
                className:
                  "flex items-center justify-between gap-2 text-sm text-gray-700",
                children: [
                  "Только в наличии",
                  e.jsx("input", {
                    type: "checkbox",
                    checked: h,
                    onChange: (S) => m(S.target.checked),
                    className: "h-4 w-4 accent-[#ff398b]",
                  }),
                ],
              }),
              e.jsxs("div", {
                className: "space-y-2",
                children: [
                  e.jsxs("p", {
                    className: "text-sm text-gray-700",
                    children: [
                      "До",
                      " ",
                      e.jsxs("span", {
                        className: "font-medium text-gray-900",
                        children: [p ?? k, " ₽"],
                      }),
                    ],
                  }),
                  e.jsx("input", {
                    type: "range",
                    min: 0,
                    max: k || 0,
                    value: p ?? k,
                    onChange: (S) => y(Number(S.target.value)),
                    className: "w-full accent-[#ff398b]",
                  }),
                ],
              }),
            ],
          }),
          e.jsx("div", {
            className:
              "rounded-2xl bg-rose-50/60 p-2 sm:p-3 md:p-4 border border-rose-100 min-h-[620px]",
            children: $
              ? e.jsx("div", {
                  className:
                    "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5",
                  children: Array.from({ length: 8 }).map((S, A) =>
                    e.jsx(kn, {}, A),
                  ),
                })
              : w.length === 0
                ? e.jsxs("div", {
                    className:
                      "rounded-2xl border border-dashed border-rose-200 bg-white px-6 py-14 text-center shadow-sm",
                    children: [
                      e.jsx("h3", {
                        className: "text-lg font-semibold text-gray-900 mb-2",
                        children: "Ничего не найдено",
                      }),
                      e.jsx("p", {
                        className: "text-sm text-gray-600 mb-5",
                        children:
                          "Попробуйте изменить фильтры или сбросьте их.",
                      }),
                      e.jsx("button", {
                        onClick: N,
                        className:
                          "px-5 py-2.5 rounded-xl bg-[#ff398b] text-white text-sm font-medium hover:bg-[#ff2a81] transition-colors shadow-sm",
                        children: "Сбросить фильтры",
                      }),
                    ],
                  })
                : e.jsx("ul", {
                    className:
                      "grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6 xl:gap-8",
                    children: w.map((S) =>
                      e.jsx(jn, { ...S, imageUrl: S.imageUrl }, S.id),
                    ),
                  }),
          }),
        ],
      }),
      v &&
        e.jsx("div", {
          className: "fixed inset-0 z-50 lg:hidden bg-black/40",
          onClick: () => j(!1),
          children: e.jsxs("div", {
            className:
              "absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-5 space-y-4 border-t border-rose-100",
            onClick: (S) => S.stopPropagation(),
            children: [
              e.jsx("div", {
                className: "h-1.5 w-10 bg-rose-200 rounded-full mx-auto",
              }),
              e.jsxs("div", {
                className: "flex items-center justify-between",
                children: [
                  e.jsx("h3", {
                    className: "font-semibold text-gray-900",
                    children: "Фильтры",
                  }),
                  e.jsx("button", {
                    type: "button",
                    onClick: N,
                    className: "text-sm text-[#ff398b] hover:underline",
                    children: "Сбросить",
                  }),
                ],
              }),
              e.jsxs("label", {
                className:
                  "flex items-center justify-between text-sm text-gray-700",
                children: [
                  "Только в наличии",
                  e.jsx("input", {
                    type: "checkbox",
                    checked: h,
                    onChange: (S) => m(S.target.checked),
                    className: "h-4 w-4 accent-[#ff398b]",
                  }),
                ],
              }),
              e.jsxs("div", {
                className: "space-y-2",
                children: [
                  e.jsxs("p", {
                    className: "text-sm text-gray-700",
                    children: [
                      "До",
                      " ",
                      e.jsxs("span", {
                        className: "font-medium text-gray-900",
                        children: [p ?? k, " ₽"],
                      }),
                    ],
                  }),
                  e.jsx("input", {
                    type: "range",
                    min: 0,
                    max: k || 0,
                    value: p ?? k,
                    onChange: (S) => y(Number(S.target.value)),
                    className: "w-full accent-[#ff398b]",
                  }),
                ],
              }),
              e.jsx("button", {
                className:
                  "w-full rounded-xl bg-[#ff398b] text-white py-2.5 text-sm font-medium hover:bg-[#ff2a81] transition-colors shadow-sm",
                onClick: () => j(!1),
                children: "Применить",
              }),
            ],
          }),
        }),
    ],
  });
}
function nt(...t) {
  return t.filter(Boolean).join(" ");
}
function Et(t) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(t);
}
function Sn() {
  const [t, s] = c.useState({ name: "", email: "", phone: "", message: "" }),
    [r, a] = c.useState({}),
    [n, l] = c.useState("idle"),
    [o, d] = c.useState(""),
    i = (h) => (m) => {
      const p = m.target.value;
      (s((y) => ({ ...y, [h]: p })), d(""), a((y) => ({ ...y, [h]: "" })));
    },
    u = () => {
      const h = {},
        m = t.name.trim(),
        p = t.email.trim(),
        y = t.message.trim(),
        v = t.phone.trim();
      return (
        m || (h.name = "Введите имя"),
        p
          ? Et(p) || (h.email = "Введите корректный email")
          : (h.email = "Введите email"),
        y || (h.message = "Напишите сообщение"),
        v &&
          v.replace(/[^\d]/g, "").length < 7 &&
          (h.phone = "Похоже, телефон слишком короткий"),
        a(h),
        Object.keys(h).length === 0
      );
    },
    x = c.useMemo(() => {
      if (n === "loading") return !1;
      const h = t.name.trim(),
        m = t.email.trim(),
        p = t.message.trim();
      return !(!h || !m || !p || !Et(m));
    }, [t, n]),
    g = async (h) => {
      if ((h.preventDefault(), !!u())) {
        (l("loading"), d(""));
        try {
          const m = {
            name: t.name.trim(),
            email: t.email.trim(),
            phone: t.phone.trim() || void 0,
            message: t.message.trim(),
          };
          (await z.post("/contact", m),
            l("success"),
            s({ name: "", email: "", phone: "", message: "" }),
            a({}));
        } catch (m) {
          (l("idle"),
            d(
              m instanceof ne
                ? m.message
                : "Не удалось отправить сообщение. Попробуйте ещё раз.",
            ));
        }
      }
    };
  return e.jsx("section", {
    className: "pt-24 mx-auto max-w-5xl px-4",
    children: e.jsx("div", {
      className:
        "rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden",
      children: e.jsxs("div", {
        className: "grid grid-cols-1 lg:grid-cols-2",
        children: [
          e.jsxs("div", {
            className: "relative p-6 sm:p-8",
            children: [
              e.jsx("div", {
                className:
                  "pointer-events-none absolute inset-0 bg-linear-to-br from-rose-50 via-white to-amber-50",
              }),
              e.jsxs("div", {
                className: "relative",
                children: [
                  e.jsxs("div", {
                    className: "inline-flex items-center gap-2",
                    children: [
                      e.jsx("h1", {
                        className: "text-xl sm:text-2xl font-semibold",
                        children: "Свяжитесь с нами",
                      }),
                      e.jsx("span", {
                        className:
                          "rounded-full bg-rose-100 px-2 py-0.5 text-xs text-rose-700",
                        children: "Candy Craft 🍰",
                      }),
                    ],
                  }),
                  e.jsx("p", {
                    className: "mt-2 text-sm text-gray-600",
                    children:
                      "Вопрос, индивидуальный заказ или сотрудничество — напишите, ответим быстро 💬",
                  }),
                  e.jsxs("div", {
                    className: "mt-6 space-y-3 text-sm",
                    children: [
                      e.jsxs("div", {
                        className:
                          "flex items-start gap-3 rounded-xl bg-white/70 border border-gray-100 p-3",
                        children: [
                          e.jsx("span", {
                            className: "mt-0.5",
                            children: "📍",
                          }),
                          e.jsxs("div", {
                            children: [
                              e.jsx("div", {
                                className: "text-gray-500",
                                children: "Локация",
                              }),
                              e.jsx("div", {
                                className: "font-medium",
                                children: "Россия",
                              }),
                            ],
                          }),
                        ],
                      }),
                      e.jsxs("div", {
                        className:
                          "flex items-start gap-3 rounded-xl bg-white/70 border border-gray-100 p-3",
                        children: [
                          e.jsx("span", {
                            className: "mt-0.5",
                            children: "📞",
                          }),
                          e.jsxs("div", {
                            children: [
                              e.jsx("div", {
                                className: "text-gray-500",
                                children: "Телефон",
                              }),
                              e.jsx("div", {
                                className: "font-medium",
                                children: "+7 999 123-45-67",
                              }),
                              e.jsx("div", {
                                className: "text-xs text-gray-500",
                                children: "(замени на свой)",
                              }),
                            ],
                          }),
                        ],
                      }),
                      e.jsxs("div", {
                        className:
                          "flex items-start gap-3 rounded-xl bg-white/70 border border-gray-100 p-3",
                        children: [
                          e.jsx("span", {
                            className: "mt-0.5",
                            children: "✉️",
                          }),
                          e.jsxs("div", {
                            children: [
                              e.jsx("div", {
                                className: "text-gray-500",
                                children: "Email",
                              }),
                              e.jsx("div", {
                                className: "font-medium",
                                children: "hello@candycraft.ru",
                              }),
                              e.jsx("div", {
                                className: "text-xs text-gray-500",
                                children: "(замени на свой)",
                              }),
                            ],
                          }),
                        ],
                      }),
                      e.jsxs("div", {
                        className:
                          "flex items-start gap-3 rounded-xl bg-white/70 border border-gray-100 p-3",
                        children: [
                          e.jsx("span", {
                            className: "mt-0.5",
                            children: "📷",
                          }),
                          e.jsxs("div", {
                            children: [
                              e.jsx("div", {
                                className: "text-gray-500",
                                children: "Instagram",
                              }),
                              e.jsx("div", {
                                className: "font-medium",
                                children: "@candycraft",
                              }),
                              e.jsx("div", {
                                className: "text-xs text-gray-500",
                                children: "(замени на свой)",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  e.jsxs("div", {
                    className:
                      "mt-6 rounded-xl bg-white/70 border border-gray-100 p-4",
                    children: [
                      e.jsx("div", {
                        className: "text-sm font-medium",
                        children: "Время ответа",
                      }),
                      e.jsx("p", {
                        className: "mt-1 text-sm text-gray-600",
                        children: "Обычно отвечаем в течение 24 часов.",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          e.jsx("div", {
            className:
              "p-6 sm:p-8 border-t lg:border-t-0 lg:border-l border-gray-100",
            children:
              n === "success"
                ? e.jsxs("div", {
                    className:
                      "rounded-2xl border border-emerald-200 bg-emerald-50 p-6",
                    children: [
                      e.jsx("div", {
                        className: "text-lg font-semibold text-emerald-800",
                        children: "Спасибо! Сообщение отправлено ✅",
                      }),
                      e.jsx("p", {
                        className: "mt-2 text-sm text-emerald-800/80",
                        children: "Мы свяжемся с вами как можно скорее.",
                      }),
                      e.jsx("button", {
                        type: "button",
                        onClick: () => l("idle"),
                        className:
                          "mt-5 rounded-lg bg-gray-900 px-4 py-2.5 text-sm text-white hover:bg-black",
                        children: "Отправить ещё одно",
                      }),
                    ],
                  })
                : e.jsxs("form", {
                    onSubmit: g,
                    className: "space-y-4",
                    children: [
                      e.jsxs("div", {
                        children: [
                          e.jsxs("label", {
                            className: "text-sm font-medium",
                            htmlFor: "name",
                            children: [
                              "Ваше имя ",
                              e.jsx("span", {
                                className: "text-red-600",
                                children: "*",
                              }),
                            ],
                          }),
                          e.jsx("input", {
                            id: "name",
                            value: t.name,
                            onChange: i("name"),
                            onBlur: () => {
                              t.name.trim() ||
                                a((h) => ({ ...h, name: "Введите имя" }));
                            },
                            className: nt(
                              "mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2",
                              r.name
                                ? "border-red-300 focus:ring-red-100"
                                : "border-gray-200 focus:ring-rose-100",
                            ),
                            placeholder: "Никита",
                            autoComplete: "name",
                          }),
                          r.name &&
                            e.jsx("p", {
                              className: "mt-1 text-xs text-red-600",
                              children: r.name,
                            }),
                        ],
                      }),
                      e.jsxs("div", {
                        children: [
                          e.jsxs("label", {
                            className: "text-sm font-medium",
                            htmlFor: "email",
                            children: [
                              "Email ",
                              e.jsx("span", {
                                className: "text-red-600",
                                children: "*",
                              }),
                            ],
                          }),
                          e.jsx("input", {
                            id: "email",
                            type: "email",
                            value: t.email,
                            onChange: i("email"),
                            onBlur: () => {
                              const h = t.email.trim();
                              h
                                ? Et(h) ||
                                  a((m) => ({
                                    ...m,
                                    email: "Введите корректный email",
                                  }))
                                : a((m) => ({ ...m, email: "Введите email" }));
                            },
                            className: nt(
                              "mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2",
                              r.email
                                ? "border-red-300 focus:ring-red-100"
                                : "border-gray-200 focus:ring-rose-100",
                            ),
                            placeholder: "name@example.com",
                            autoComplete: "email",
                          }),
                          r.email &&
                            e.jsx("p", {
                              className: "mt-1 text-xs text-red-600",
                              children: r.email,
                            }),
                        ],
                      }),
                      e.jsxs("div", {
                        children: [
                          e.jsx("label", {
                            className: "text-sm font-medium",
                            htmlFor: "phone",
                            children: "Телефон (опционально)",
                          }),
                          e.jsx("input", {
                            id: "phone",
                            type: "tel",
                            inputMode: "tel",
                            value: t.phone,
                            onChange: i("phone"),
                            onBlur: () => {
                              const h = t.phone.replace(/[^\d]/g, "");
                              t.phone.trim() &&
                                h.length < 7 &&
                                a((m) => ({
                                  ...m,
                                  phone: "Похоже, телефон слишком короткий",
                                }));
                            },
                            className: nt(
                              "mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2",
                              r.phone
                                ? "border-red-300 focus:ring-red-100"
                                : "border-gray-200 focus:ring-rose-100",
                            ),
                            placeholder: "+7 (999) 123-45-67",
                            autoComplete: "tel",
                          }),
                          r.phone &&
                            e.jsx("p", {
                              className: "mt-1 text-xs text-red-600",
                              children: r.phone,
                            }),
                        ],
                      }),
                      e.jsxs("div", {
                        children: [
                          e.jsxs("label", {
                            className: "text-sm font-medium",
                            htmlFor: "message",
                            children: [
                              "Сообщение ",
                              e.jsx("span", {
                                className: "text-red-600",
                                children: "*",
                              }),
                            ],
                          }),
                          e.jsx("textarea", {
                            id: "message",
                            rows: 5,
                            value: t.message,
                            onChange: i("message"),
                            onBlur: () => {
                              t.message.trim() ||
                                a((h) => ({
                                  ...h,
                                  message: "Напишите сообщение",
                                }));
                            },
                            className: nt(
                              "mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 resize-none",
                              r.message
                                ? "border-red-300 focus:ring-red-100"
                                : "border-gray-200 focus:ring-rose-100",
                            ),
                            placeholder:
                              "Например: хочу торт на день рождения, 19.5 см, на 25 человек…",
                          }),
                          r.message &&
                            e.jsx("p", {
                              className: "mt-1 text-xs text-red-600",
                              children: r.message,
                            }),
                        ],
                      }),
                      o &&
                        e.jsx("div", {
                          className:
                            "rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700",
                          children: o,
                        }),
                      e.jsx("button", {
                        type: "submit",
                        disabled: !x,
                        className:
                          "w-full rounded-lg bg-rose-500 px-4 py-3 text-sm font-medium text-white hover:bg-rose-600 disabled:opacity-50",
                        children:
                          n === "loading" ? "Отправляю..." : "Отправить 🍰",
                      }),
                      e.jsx("p", {
                        className: "text-xs text-gray-500",
                        children:
                          "Нажимая “Отправить”, вы соглашаетесь на обработку данных для ответа на запрос.",
                      }),
                    ],
                  }),
          }),
        ],
      }),
    }),
  });
}
function En() {
  const { showAuthWarn: t, setShowAuthWarn: s } = ye(),
    r = Ue();
  return e.jsxs("main", {
    className: "min-h-screen bg-white relative",
    children: [
      t &&
        e.jsx("div", {
          className:
            "fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn",
          children: e.jsxs("div", {
            className:
              "bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 relative animate-scaleIn",
            children: [
              e.jsx("button", {
                onClick: () => s(!1),
                className:
                  "absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition",
                children: e.jsx(fs, { className: "w-5 h-5" }),
              }),
              e.jsxs("div", {
                className: "flex flex-col items-center text-center",
                children: [
                  e.jsx("div", {
                    className:
                      "w-14 h-14 rounded-full bg-rose-100 flex items-center justify-center mb-4",
                    children: e.jsx(fs, {
                      className: "w-7 h-7 text-[#ff398b]",
                    }),
                  }),
                  e.jsx("h3", {
                    className: "text-lg font-semibold text-gray-900",
                    children: "Вы не авторизованы",
                  }),
                  e.jsx("p", {
                    className: "mt-2 text-sm text-gray-600",
                    children: "Авторизуйтесь, чтобы добавлять товары в корзину",
                  }),
                  e.jsxs("div", {
                    className: "mt-6 flex gap-3 w-full",
                    children: [
                      e.jsx("button", {
                        onClick: () => s(!1),
                        className:
                          "flex-1 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition",
                        children: "Закрыть",
                      }),
                      e.jsx("button", {
                        onClick: () => {
                          (s(!1), r("/account/login"));
                        },
                        className:
                          "flex-1 py-2 rounded-xl bg-[#ff398b] text-white font-semibold hover:bg-[#ff2a81] transition active:scale-95",
                        children: "Войти",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
      e.jsx("div", {
        className: "container mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-7",
        children: e.jsx(Cn, {}),
      }),
      e.jsx(Sn, {}),
    ],
  });
}
function nr({ items: t }) {
  return e.jsx("nav", {
    className: "mb-6",
    children: e.jsx("ol", {
      className: "flex items-center text-lg text-gray-600",
      children: t.map((s, r) =>
        e.jsxs(
          "li",
          {
            className: "flex items-center",
            children: [
              r > 0 && e.jsx("span", { className: "mx-2", children: "/" }),
              r === t.length - 1
                ? e.jsx("span", {
                    className: "text-gray-900 font-medium",
                    children: s.text,
                  })
                : e.jsx(G, {
                    to: s.path,
                    className: "hover:text-[#ff398b] transition-colors",
                    children: s.text,
                  }),
            ],
          },
          r,
        ),
      ),
    }),
  });
}
function $n(t) {
  return e.jsx("h2", {
    className: `text-[30px] font-semibold ${t.className}`,
    children: t.text,
  });
}
const bs = { round: "круг", square: "квадрат", heart: "сердце" },
  ys = {
    small: "малый",
    medium: "средний",
    large: "большой",
    s: "S (14,5см)",
    m: "M (19,5см)",
    l: "L (24,5см)",
    xl: "XL (29,5см)",
  },
  Mn = {
    milka: "Milka",
    raffaello: "Raffaello",
    kinder: "Kinder",
    ferrero: "Ferrero",
    merci: "Merci",
  },
  Pn = { pink: "розовый", gold: "золотой", white: "белый" },
  vs = {
    none: "без декора",
    flowers: "цветы",
    bow: "бант",
    topper: "топпер с надписью",
  },
  In = {
    "kinder-chocolate": "Kinder Chocolate",
    "kinder-bueno": "Kinder Bueno",
    "milka-baton": "Milka Baton",
    twix: "Twix",
    rittersport: "RitterSport",
    kitkat: "Kitkat",
    snikers: "Snikers",
    milkiway: "MilkiWay",
  },
  An = {
    standard: "фирменная коробка",
    window: "коробка с окном",
    gift: "подарочная упаковка",
    "premium-box": "премиум-бокс",
  };
function Fn() {
  const { cartItems: t, removeCartEntry: s, updateCartEntryQuantity: r } = ye(),
    [a, n] = c.useState(null),
    l = Ue(),
    o = async (m) => {
      n(m.id);
      try {
        await r(m, m.quantity + 1);
      } finally {
        n(null);
      }
    },
    d = async (m) => {
      if (!(m.quantity <= 1)) {
        n(m.id);
        try {
          await r(m, m.quantity - 1);
        } finally {
          n(null);
        }
      }
    },
    i = () => {
      l("/checkout");
    },
    u = c.useMemo(
      () => t.reduce((m, p) => m + Number(p.price) * p.quantity, 0),
      [t],
    ),
    x = c.useMemo(() => t.reduce((m, p) => m + p.quantity, 0), [t]),
    g = (m) =>
      (m?.length &&
        m
          .filter((y) => y.percentage > 0)
          .map((y) => `${Mn[y.candyId] ?? y.candyId} ${y.percentage}%`)
          .join(", ")) ||
      "внутренний слой не указан",
    h = (m) =>
      m
        ? Array.isArray(m)
          ? m.length === 0
            ? "без декора"
            : m.map((y) => vs[y] ?? y).join(", ") || "без декора"
          : (vs[m] ?? "без декора")
        : "без декора";
  return e.jsxs("main", {
    className:
      "min-h-screen bg-linear-to-br from-slate-50 via-blue-50/20 to-purple-50/20 relative overflow-hidden",
    children: [
      e.jsxs("div", {
        className: "absolute inset-0 overflow-hidden pointer-events-none",
        children: [
          e.jsx("div", {
            className:
              "absolute top-20 left-10 w-72 h-72 bg-blue-200/10 rounded-full blur-3xl",
          }),
          e.jsx("div", {
            className:
              "absolute top-40 right-20 w-96 h-96 bg-purple-200/10 rounded-full blur-3xl",
          }),
          e.jsx("div", {
            className:
              "absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-200/10 rounded-full blur-3xl",
          }),
        ],
      }),
      e.jsxs("div", {
        className: "container mx-auto px-4 py-6 md:py-12 relative z-10",
        children: [
          e.jsxs("div", {
            className: "text-center mb-8 md:mb-10",
            children: [
              e.jsx("div", {
                className:
                  "inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-linear-to-br from-indigo-200 to-purple-200 rounded-2xl mb-4 shadow-sm",
                children: e.jsx(Ze, {
                  className: "w-7 h-7 md:w-8 md:h-8 text-indigo-700",
                }),
              }),
              e.jsx($n, { text: "Корзина покупок" }),
              e.jsx(nr, {
                items: [
                  { text: "Главная", path: "/" },
                  { text: "Корзина", path: "/cart" },
                ],
              }),
            ],
          }),
          t.length === 0
            ? e.jsx("div", {
                className: "max-w-lg mx-auto",
                children: e.jsxs("div", {
                  className:
                    "bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-10 md:p-12 text-center",
                  children: [
                    e.jsx("div", {
                      className:
                        "w-24 h-24 bg-linear-to-br from-slate-100 to-slate-50 rounded-full flex items-center justify-center mx-auto mb-6",
                      children: e.jsx(ge, {
                        className: "w-12 h-12 text-slate-400",
                      }),
                    }),
                    e.jsx("h3", {
                      className: "text-2xl font-semibold text-slate-800 mb-3",
                      children: "Корзина пуста",
                    }),
                    e.jsx("p", {
                      className: "text-slate-500 mb-8 leading-relaxed",
                      children:
                        "Добавьте товары из каталога, чтобы начать покупки",
                    }),
                    e.jsxs(G, {
                      to: "/",
                      className:
                        "inline-flex items-center gap-2 px-8 py-3.5 bg-linear-to-r from-indigo-400 to-purple-400 text-white rounded-2xl font-medium text-base hover:shadow-lg hover:shadow-indigo-200/50 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300",
                      children: [
                        e.jsx(Fe, { className: "w-5 h-5" }),
                        "Перейти в каталог",
                      ],
                    }),
                  ],
                }),
              })
            : e.jsxs("div", {
                className: "flex flex-col lg:flex-row gap-6",
                children: [
                  e.jsx("div", {
                    className: "flex-1 space-y-4",
                    children: t.map((m) => {
                      const p = m.quantity,
                        y = Number(m.price) * p,
                        v = a === m.id,
                        j = m.isCustom
                          ? 5
                          : Math.max(0, m.inStock - (m.reservedQty ?? 0)),
                        k = m.customConfig,
                        w = k?.type === "custom_cake";
                      return e.jsx(
                        "div",
                        {
                          className:
                            "group bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md hover:border-slate-200 transition-all duration-300",
                          children: e.jsxs("div", {
                            className:
                              "flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-5 p-4 md:p-6",
                            children: [
                              e.jsx("div", {
                                className:
                                  "relative w-full sm:w-28 h-48 min-[420px]:h-56 sm:h-28 md:w-32 md:h-32 shrink-0 rounded-xl overflow-hidden bg-linear-to-br from-slate-50 to-slate-100",
                                children: m.imageUrl
                                  ? e.jsx("img", {
                                      className:
                                        "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
                                      src: m.imageUrl,
                                      alt: m.name,
                                    })
                                  : e.jsx("div", {
                                      className:
                                        "flex h-full w-full items-center justify-center bg-linear-to-br from-rose-100 via-amber-50 to-pink-100",
                                      children: e.jsxs("div", {
                                        className: "text-center",
                                        children: [
                                          e.jsx("div", {
                                            className:
                                              "mx-auto mb-2 h-14 w-14 rounded-full border-8 border-rose-200 bg-amber-100 shadow-inner",
                                          }),
                                          e.jsx("div", {
                                            className:
                                              "text-xs font-semibold text-rose-700",
                                            children: "CandyCraft",
                                          }),
                                        ],
                                      }),
                                    }),
                              }),
                              e.jsxs("div", {
                                className: "flex-1 min-w-0 w-full sm:w-auto",
                                children: [
                                  e.jsx("h3", {
                                    className:
                                      "text-lg md:text-xl font-semibold text-slate-800 mb-2 line-clamp-2",
                                    children: m.name,
                                  }),
                                  e.jsx("div", {
                                    className: "flex items-center gap-2 mb-4",
                                    children: e.jsx("div", {
                                      className:
                                        "px-2.5 py-1 bg-emerald-50 rounded-lg border border-emerald-100",
                                      children: e.jsx("span", {
                                        className:
                                          "text-xs font-medium text-emerald-700",
                                        children: m.isCustom
                                          ? "Индивидуальная сборка"
                                          : `Доступно: ${j} шт`,
                                      }),
                                    }),
                                  }),
                                  k &&
                                    e.jsx("div", {
                                      className:
                                        "mb-4 rounded-xl border border-rose-100 bg-rose-50/70 px-3 py-2 text-xs text-slate-600",
                                      children: w
                                        ? e.jsxs(e.Fragment, {
                                            children: [
                                              bs[k.base],
                                              ",",
                                              " ",
                                              ys[k.size],
                                              ",",
                                              " ",
                                              In[k.outerLayer],
                                              ", ",
                                              g(k.innerLayer),
                                              ",",
                                              " ",
                                              Pn[k.color],
                                              ",",
                                              " ",
                                              An[k.packaging],
                                              ",",
                                              " ",
                                              h(k.decor),
                                              k.messageText
                                                ? `, надпись: "${k.messageText}"`
                                                : "",
                                            ],
                                          })
                                        : e.jsxs(e.Fragment, {
                                            children: [
                                              bs[k.shape],
                                              ",",
                                              " ",
                                              ys[k.size],
                                              ", конфет:",
                                              " ",
                                              k.candies.reduce(
                                                (N, $) => N + $.quantity,
                                                0,
                                              ),
                                              k.inscription
                                                ? `, надпись: "${k.inscription}"`
                                                : "",
                                            ],
                                          }),
                                    }),
                                  e.jsxs("div", {
                                    className: "flex items-center gap-3 mb-4",
                                    children: [
                                      e.jsx("button", {
                                        onClick: () => d(m),
                                        disabled: p <= 1 || v,
                                        className:
                                          "w-9 h-9 rounded-lg border border-slate-200 bg-white flex items-center justify-center hover:border-indigo-300 hover:bg-indigo-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200",
                                        title: "Уменьшить",
                                        children: e.jsx(Xa, {
                                          className: "w-4 h-4 text-slate-600",
                                        }),
                                      }),
                                      e.jsx("div", {
                                        className: "min-w-12 text-center",
                                        children: e.jsx("span", {
                                          className:
                                            "text-lg font-semibold text-slate-800",
                                          children: p,
                                        }),
                                      }),
                                      e.jsx("button", {
                                        onClick: () => o(m),
                                        disabled: p >= j || v,
                                        className:
                                          "w-9 h-9 rounded-lg border border-slate-200 bg-white flex items-center justify-center hover:border-indigo-300 hover:bg-indigo-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200",
                                        title: "Увеличить",
                                        children: e.jsx(Kt, {
                                          className: "w-4 h-4 text-slate-600",
                                        }),
                                      }),
                                    ],
                                  }),
                                  e.jsxs("div", {
                                    className:
                                      "flex flex-wrap items-baseline gap-2",
                                    children: [
                                      e.jsxs("span", {
                                        className:
                                          "text-xl md:text-2xl font-bold text-indigo-600",
                                        children: [
                                          y.toLocaleString("ru-RU"),
                                          " ₽",
                                        ],
                                      }),
                                      p > 1 &&
                                        e.jsxs("span", {
                                          className: "text-sm text-slate-400",
                                          children: [
                                            m.price.toLocaleString("ru-RU"),
                                            " ₽ ×",
                                            " ",
                                            p,
                                          ],
                                        }),
                                    ],
                                  }),
                                ],
                              }),
                              e.jsx("div", {
                                className:
                                  "flex w-full sm:w-auto sm:flex-col items-end gap-4",
                                children: e.jsx("button", {
                                  onClick: () => s(m),
                                  className:
                                    "ml-auto p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-500 hover:text-rose-600 border border-rose-100 transition-all duration-200",
                                  title: "Удалить товар",
                                  children: e.jsx(pt, { className: "w-5 h-5" }),
                                }),
                              }),
                            ],
                          }),
                        },
                        m.id,
                      );
                    }),
                  }),
                  e.jsx("div", {
                    className: "lg:w-100 w-full",
                    children: e.jsx("div", {
                      className:
                        "bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-100 overflow-hidden sticky top-8",
                      children: e.jsxs("div", {
                        className: "p-4 sm:p-6 md:p-7",
                        children: [
                          e.jsxs("div", {
                            className: "flex items-center gap-3 mb-6",
                            children: [
                              e.jsx("div", {
                                className:
                                  "p-2 bg-linear-to-br from-indigo-100 to-purple-100 rounded-xl",
                                children: e.jsx(ut, {
                                  className: "w-5 h-5 text-indigo-600",
                                }),
                              }),
                              e.jsx("h3", {
                                className:
                                  "text-xl font-semibold text-slate-800",
                                children: "Итоговая сумма",
                              }),
                            ],
                          }),
                          e.jsxs("div", {
                            className: "space-y-3 mb-6",
                            children: [
                              e.jsxs("div", {
                                className:
                                  "flex justify-between items-center p-3.5 bg-slate-50 rounded-xl",
                                children: [
                                  e.jsxs("span", {
                                    className: "text-slate-600 font-medium",
                                    children: ["Товары (", x, ")"],
                                  }),
                                  e.jsxs("span", {
                                    className: "font-semibold text-slate-800",
                                    children: [u.toLocaleString("ru-RU"), " ₽"],
                                  }),
                                ],
                              }),
                              e.jsxs("div", {
                                className:
                                  "flex justify-between items-center p-3.5 bg-slate-50 rounded-xl",
                                children: [
                                  e.jsxs("span", {
                                    className:
                                      "text-slate-500 flex items-center gap-2",
                                    children: [
                                      e.jsx(er, { className: "w-4 h-4" }),
                                      "Скидка",
                                    ],
                                  }),
                                  e.jsx("span", {
                                    className: "text-slate-500",
                                    children: "0 ₽",
                                  }),
                                ],
                              }),
                              e.jsx("div", {
                                className:
                                  "border-t border-slate-200 pt-4 mt-4",
                                children: e.jsxs("div", {
                                  className:
                                    "flex flex-col min-[420px]:flex-row min-[420px]:items-center justify-between gap-2",
                                  children: [
                                    e.jsx("span", {
                                      className:
                                        "text-lg font-semibold text-slate-800",
                                      children: "Итого к оплате",
                                    }),
                                    e.jsxs("span", {
                                      className:
                                        "text-2xl font-bold text-indigo-600",
                                      children: [
                                        u.toLocaleString("ru-RU"),
                                        " ₽",
                                      ],
                                    }),
                                  ],
                                }),
                              }),
                            ],
                          }),
                          e.jsxs("button", {
                            onClick: i,
                            className:
                              "group w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-linear-to-r from-indigo-400 to-purple-400 text-white rounded-xl font-medium text-base hover:shadow-lg hover:shadow-indigo-200/50 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300",
                            children: [
                              e.jsx("span", { children: "Оформить заказ" }),
                              e.jsx(va, {
                                className:
                                  "w-5 h-5 group-hover:translate-x-1 transition-transform",
                              }),
                            ],
                          }),
                          e.jsx("div", {
                            className: "mt-5 space-y-3",
                            children: e.jsx("div", {
                              className:
                                "p-3.5 bg-linear-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100",
                              children: e.jsxs("div", {
                                className:
                                  "flex items-center gap-2 text-emerald-700 text-sm",
                                children: [
                                  e.jsx(Fe, { className: "w-4 h-4" }),
                                  e.jsx("span", {
                                    className: "font-medium",
                                    children: "Бесплатная доставка от 6000 ₽",
                                  }),
                                ],
                              }),
                            }),
                          }),
                        ],
                      }),
                    }),
                  }),
                ],
              }),
        ],
      }),
    ],
  });
}
function Ln({ mainImage: t, alt: s, images: r = [] }) {
  const [a, n] = c.useState(t),
    l = [t, ...r];
  return e.jsxs("div", {
    className: "sticky top-4",
    children: [
      e.jsx("div", {
        className: "mb-4 bg-white rounded-lg overflow-hidden shadow-sm",
        children: e.jsx("img", {
          src: a,
          alt: s,
          className: "w-full h-auto max-h-125 object-contain",
        }),
      }),
      l.length > 1 &&
        e.jsx("div", {
          className: "flex gap-2 overflow-x-auto py-2",
          children: l.map((o, d) =>
            e.jsx(
              "button",
              {
                onClick: () => n(o),
                className: `shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${a === o ? "border-[#ff398b]" : "border-transparent"}`,
                children: e.jsx("img", {
                  src: o,
                  alt: `${s} ${d + 1}`,
                  className: "w-full h-full object-cover",
                }),
              },
              d,
            ),
          ),
        }),
    ],
  });
}
function On(t) {
  return e.jsxs("svg", {
    width: `${t.size}`,
    height: `${t.size}`,
    viewBox: "0 0 15 21",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      e.jsx("path", {
        d: "M13.991 5.0708H0.699951V19.6999H13.991V5.0708Z",
        stroke: "black",
        strokeWidth: "1.4",
        strokeMiterlimit: "10",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }),
      e.jsx("path", {
        d: "M3.82202 6.85488V3.1084C3.82202 1.77037 4.80324 0.699951 5.96287 0.699951H8.72813C9.88775 0.699951 10.869 1.77037 10.869 3.1084V6.85488",
        stroke: "black",
        strokeWidth: "1.4",
        strokeMiterlimit: "10",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }),
    ],
  });
}
function Tn({ product: t, isInCart: s, onAddToCart: r }) {
  const [a, n] = c.useState(1),
    l = () => {
      a < t.inStock && n((d) => d + 1);
    },
    o = () => {
      a > 1 && n((d) => d - 1);
    };
  return e.jsxs("div", {
    className: "bg-white rounded-lg p-6 lg:p-8 border border-gray-200",
    children: [
      e.jsx("h1", { className: "text-3xl font-bold mb-4", children: t.name }),
      e.jsx("div", {
        className: "mb-6",
        children: e.jsxs("span", {
          className: "text-2xl font-bold text-[#ff6163]",
          children: [t.price, "₽"],
        }),
      }),
      e.jsxs("div", {
        className: "mb-6",
        children: [
          e.jsxs("div", {
            className: "flex items-center mb-4",
            children: [
              e.jsx("span", {
                className: `inline-block w-3 h-3 rounded-full mr-2 ${t.inStock > 0 ? "bg-green-500" : "bg-red-500"}`,
              }),
              e.jsx("span", {
                className: t.inStock > 0 ? "text-green-600" : "text-red-600",
                children:
                  t.inStock > 0
                    ? `В наличии: ${t.inStock} шт`
                    : "Нет в наличии",
              }),
            ],
          }),
          e.jsxs("div", {
            className: "flex items-center gap-4 mb-6",
            children: [
              e.jsxs("div", {
                className:
                  "flex items-center border border-gray-300 rounded-lg",
                children: [
                  e.jsx("button", {
                    onClick: o,
                    disabled: a <= 1,
                    className: "px-4 py-2 text-lg disabled:opacity-50",
                    children: "-",
                  }),
                  e.jsx("span", {
                    className: "px-4 py-2 text-lg w-12 text-center",
                    children: a,
                  }),
                  e.jsx("button", {
                    onClick: l,
                    disabled: a >= t.inStock,
                    className: "px-4 py-2 text-lg disabled:opacity-50",
                    children: "+",
                  }),
                ],
              }),
              e.jsx("div", {
                className: "text-lg",
                children: e.jsxs("span", {
                  className: "font-semibold",
                  children: ["Итого: ", (t.price * a).toLocaleString(), "₽"],
                }),
              }),
            ],
          }),
        ],
      }),
      e.jsxs("button", {
        onClick: r,
        disabled: s || t.inStock === 0,
        className: `w-full py-4 rounded-lg font-bold md:text-lg text-sm flex items-center justify-center gap-3 mb-4 transition-colors ${s ? "bg-gray-100 text-gray-500 cursor-not-allowed" : t.inStock === 0 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-[#ff398b] text-white hover:bg-[#e0327a]"}`,
        children: [
          e.jsx(On, { size: 24 }),
          s
            ? "✓ Товар в корзине"
            : t.inStock === 0
              ? "Нет в наличии"
              : "Добавить в корзину",
        ],
      }),
      e.jsxs("div", {
        className: "text-sm text-gray-600 space-y-2",
        children: [
          e.jsxs("div", {
            className: "flex items-start",
            children: [
              e.jsx("span", {
                className: "w-32 shrink-0",
                children: "Категория:",
              }),
              e.jsx("span", { children: "Конфетные торты" }),
            ],
          }),
          e.jsxs("div", {
            className: "flex items-start",
            children: [
              e.jsx("span", { className: "w-32 shrink-0", children: "Вес:" }),
              e.jsx("span", { children: "Индивидуально по составу" }),
            ],
          }),
          e.jsxs("div", {
            className: "flex items-start",
            children: [
              e.jsx("span", {
                className: "w-32 shrink-0",
                children: "Состав:",
              }),
              e.jsx("span", {
                children: "Конфеты, шоколад, упаковка и декоративная основа",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function Rn() {
  const { id: t } = Zr(),
    s = Ue(),
    { getProductById: r, loading: a } = Je(),
    { isItemInCart: n, addToCart: l } = ye(),
    [o, d] = c.useState(!1);
  c.useEffect(() => {
    const g = () => d(window.innerWidth < 768);
    return (
      g(),
      window.addEventListener("resize", g),
      () => window.removeEventListener("resize", g)
    );
  }, []);
  const i = r(Number(t));
  if (a)
    return e.jsx("div", {
      className: "container py-10 md:py-20",
      children: e.jsxs("div", {
        className: "flex flex-col items-center justify-center min-h-[50vh]",
        children: [
          e.jsx("div", {
            className:
              "animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-t-2 border-b-2 border-[#ff398b]",
          }),
          e.jsx("p", {
            className: "mt-4 text-gray-600 text-sm md:text-base",
            children: "Загрузка товара...",
          }),
        ],
      }),
    });
  if (!i)
    return e.jsx("div", {
      className: "container py-10 md:py-20 px-4",
      children: e.jsxs("div", {
        className: "text-center max-w-md mx-auto",
        children: [
          e.jsx("h2", {
            className: "text-xl md:text-2xl font-bold mb-3 md:mb-4",
            children: "Товар не найден",
          }),
          e.jsx("p", {
            className: "text-gray-600 text-sm md:text-base mb-6 md:mb-8",
            children:
              "Извините, запрашиваемый товар не существует или был удалён",
          }),
          e.jsx("button", {
            onClick: () => s("/"),
            className:
              "bg-[#ff398b] text-white px-5 py-2.5 md:px-6 md:py-3 rounded-lg hover:bg-[#e0327a] transition-colors text-sm md:text-base w-full md:w-auto",
            children: "Вернуться в каталог",
          }),
        ],
      }),
    });
  const u = n(i.id),
    x = async () => {
      u || (await l(i.id));
    };
  return e.jsxs("main", {
    className: "container py-4 md:py-8 px-4 sm:px-6",
    children: [
      e.jsx("div", {
        className: "mb-4 md:mb-6",
        children: e.jsx(nr, {
          items: [
            { text: "Главная", path: "/" },
            { text: "Каталог", path: "/" },
            { text: i.name, path: `/product/${i.id}` },
          ],
          isMobile: o,
        }),
      }),
      e.jsxs("div", {
        className:
          "grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 mb-10 md:mb-16",
        children: [
          e.jsx("div", {
            className: "lg:sticky lg:top-4",
            children: e.jsx(Ln, {
              mainImage: i.imageUrl,
              alt: i.name,
              isMobile: o,
            }),
          }),
          e.jsx("div", {
            className: "lg:pl-0",
            children: e.jsx(Tn, {
              product: i,
              isInCart: u,
              onAddToCart: x,
              isMobile: o,
            }),
          }),
        ],
      }),
      e.jsxs("div", {
        className: "mb-10 md:mb-16",
        children: [
          e.jsx("h2", {
            className: "text-xl md:text-2xl font-bold mb-4 md:mb-6",
            children: "Подробное описание",
          }),
          e.jsx("div", {
            className: "bg-white rounded-lg p-4 md:p-6 border border-gray-200",
            children: e.jsxs("div", {
              className: "space-y-4",
              children: [
                e.jsx("p", {
                  className:
                    "text-gray-700 leading-relaxed text-sm md:text-base",
                  children: i.description,
                }),
                e.jsxs("div", {
                  className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6",
                  children: [
                    e.jsxs("div", {
                      className: "bg-gray-50 p-3 md:p-4 rounded-lg",
                      children: [
                        e.jsx("h3", {
                          className: "font-medium text-sm md:text-base mb-2",
                          children: "Состав",
                        }),
                        e.jsx("p", {
                          className: "text-gray-600 text-xs md:text-sm",
                          children: "Бисквит, крем, ягоды, шоколад",
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className: "bg-gray-50 p-3 md:p-4 rounded-lg",
                      children: [
                        e.jsx("h3", {
                          className: "font-medium text-sm md:text-base mb-2",
                          children: "Вес",
                        }),
                        e.jsx("p", {
                          className: "text-gray-600 text-xs md:text-sm",
                          children: "1.5 кг",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
      o &&
        e.jsx("div", {
          className:
            "sticky bottom-0 bg-white border-t border-gray-200 py-3 px-4 -mx-4",
          children: e.jsx("button", {
            onClick: () => s(-1),
            className:
              "w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors",
            children: "← Назад",
          }),
        }),
    ],
  });
}
function Dn() {
  return e.jsxs("main", {
    className: "mx-auto w-full max-w-6xl px-4 py-10",
    children: [
      e.jsxs("div", {
        className: "mb-8",
        children: [
          e.jsx("h1", {
            className: "text-3xl font-semibold tracking-tight",
            children: "Contacts",
          }),
          e.jsx("p", {
            className: "mt-2 text-gray-600",
            children:
              "Свяжитесь с нами удобным способом. Мы обычно отвечаем быстро.",
          }),
        ],
      }),
      e.jsxs("div", {
        className: "grid gap-6 lg:grid-cols-3",
        children: [
          e.jsxs("section", {
            className: "grid gap-4 lg:col-span-1",
            children: [
              e.jsx("div", {
                className: "rounded-2xl border bg-white p-5 shadow-sm",
                children: e.jsxs("div", {
                  className: "flex items-start gap-3",
                  children: [
                    e.jsx(Zs, { className: "mt-1", size: 20 }),
                    e.jsxs("div", {
                      children: [
                        e.jsx("div", {
                          className: "text-sm text-gray-500",
                          children: "Phone",
                        }),
                        e.jsx("a", {
                          className: "text-base font-medium hover:underline",
                          href: "tel:+79990000000",
                          children: "+7 999 000-00-00",
                        }),
                        e.jsx("div", {
                          className: "mt-1 text-sm text-gray-500",
                          children: "WhatsApp / Calls",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              e.jsx("div", {
                className: "rounded-2xl border bg-white p-5 shadow-sm",
                children: e.jsxs("div", {
                  className: "flex items-start gap-3",
                  children: [
                    e.jsx(qa, { className: "mt-1", size: 20 }),
                    e.jsxs("div", {
                      children: [
                        e.jsx("div", {
                          className: "text-sm text-gray-500",
                          children: "Email",
                        }),
                        e.jsx("a", {
                          className: "text-base font-medium hover:underline",
                          href: "mailto:hello@candycraft.com",
                          children: "hello@candycraft.com",
                        }),
                        e.jsx("div", {
                          className: "mt-1 text-sm text-gray-500",
                          children: "Для заказов и вопросов",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              e.jsx("div", {
                className: "rounded-2xl border bg-white p-5 shadow-sm",
                children: e.jsxs("div", {
                  className: "flex items-start gap-3",
                  children: [
                    e.jsx(Gt, { className: "mt-1", size: 20 }),
                    e.jsxs("div", {
                      children: [
                        e.jsx("div", {
                          className: "text-sm text-gray-500",
                          children: "Location",
                        }),
                        e.jsx("div", {
                          className: "text-base font-medium",
                          children: "Москва, Россия",
                        }),
                        e.jsx("div", {
                          className: "mt-1 text-sm text-gray-500",
                          children: "Самовывоз по договорённости",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              e.jsx("div", {
                className: "rounded-2xl border bg-white p-5 shadow-sm",
                children: e.jsxs("div", {
                  className: "flex items-start gap-3",
                  children: [
                    e.jsx(ft, { className: "mt-1", size: 20 }),
                    e.jsxs("div", {
                      children: [
                        e.jsx("div", {
                          className: "text-sm text-gray-500",
                          children: "Working hours",
                        }),
                        e.jsx("div", {
                          className: "text-base font-medium",
                          children: "Пн–Пт: 10:00–19:00",
                        }),
                        e.jsx("div", {
                          className: "mt-1 text-sm text-gray-500",
                          children: "Сб–Вс: 11:00–16:00",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          }),
          e.jsxs("section", {
            className: "grid gap-6 lg:col-span-2",
            children: [
              e.jsxs("div", {
                className: "rounded-2xl border bg-white p-6 shadow-sm",
                children: [
                  e.jsx("h2", {
                    className: "text-xl font-semibold",
                    children: "How to order",
                  }),
                  e.jsxs("ul", {
                    className: "mt-3 list-disc space-y-2 pl-5 text-gray-700",
                    children: [
                      e.jsx("li", {
                        children:
                          "Напишите нам в WhatsApp / Telegram или на email.",
                      }),
                      e.jsx("li", {
                        children:
                          "Укажите дату, формат набора, бюджет и пожелания по шоколаду.",
                      }),
                      e.jsx("li", {
                        children:
                          "Подтверждаем детали и время получения/доставки.",
                      }),
                    ],
                  }),
                  e.jsx("div", {
                    className: "mt-6 rounded-xl bg-gray-50 p-4",
                    children: e.jsxs("div", {
                      className: "flex items-start gap-3",
                      children: [
                        e.jsx(Ys, { className: "mt-1", size: 18 }),
                        e.jsxs("div", {
                          children: [
                            e.jsx("div", {
                              className: "font-medium",
                              children: "Fast contact",
                            }),
                            e.jsx("div", {
                              className: "text-sm text-gray-600",
                              children:
                                "Заменишь ссылку на свой WhatsApp/Instagram позже.",
                            }),
                            e.jsxs("div", {
                              className: "mt-3 flex flex-wrap gap-3",
                              children: [
                                e.jsx("a", {
                                  href: "#",
                                  className:
                                    "rounded-xl border bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50",
                                  children: "WhatsApp",
                                }),
                                e.jsx("a", {
                                  href: "#",
                                  className:
                                    "rounded-xl border bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50",
                                  children: "Instagram",
                                }),
                                e.jsx("a", {
                                  href: "#",
                                  className:
                                    "rounded-xl border bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50",
                                  children: "Telegram",
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                ],
              }),
              e.jsxs("div", {
                className: "rounded-2xl border bg-white p-6 shadow-sm",
                children: [
                  e.jsx("h2", {
                    className: "text-xl font-semibold",
                    children: "Map",
                  }),
                  e.jsx("p", {
                    className: "mt-2 text-sm text-gray-600",
                    children:
                      "Тут можно вставить Google Maps iframe или картинку. Пока заглушка.",
                  }),
                  e.jsx("div", {
                    className:
                      "mt-4 flex h-72 items-center justify-center rounded-2xl bg-gray-100 text-gray-500",
                    children: "Map placeholder",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function lr({
  title: t,
  subtitle: s,
  children: r,
  bottomText: a,
  bottomLinkText: n,
  bottomLinkTo: l,
}) {
  return e.jsx("section", {
    className:
      "pt-20 px-4 bg-linear-to-b from-rose-50 via-white to-amber-50 min-h-[calc(100vh-80px)]",
    children: e.jsx("div", {
      className: "mx-auto w-full max-w-lg",
      children: e.jsxs("div", {
        className:
          "rounded-2xl border border-gray-100 bg-white/80 backdrop-blur p-6 shadow-sm",
        children: [
          e.jsxs("div", {
            className: "mb-6 flex items-center gap-2",
            children: [
              e.jsx("span", { className: "text-lg", children: "🍬" }),
              e.jsx("span", {
                className: "text-sm font-semibold tracking-wide uppercase",
                children: "Candy Craft",
              }),
              e.jsx("span", {
                className: "text-xs text-gray-400",
                children: "sweet account",
              }),
            ],
          }),
          e.jsx("h1", { className: "text-2xl font-semibold", children: t }),
          e.jsx("p", { className: "mt-2 text-sm text-gray-600", children: s }),
          e.jsx("div", { className: "mt-8", children: r }),
          e.jsxs("div", {
            className: "mt-6 text-sm text-gray-600",
            children: [
              a,
              " ",
              e.jsx(G, {
                className: "text-gray-900 underline",
                to: l,
                children: n,
              }),
            ],
          }),
          e.jsxs("ul", {
            className: "mt-6 space-y-2 text-sm text-gray-600",
            children: [
              e.jsx("li", { children: "✅ Быстрое оформление заказа" }),
              e.jsx("li", { children: "✅ История “сладких” покупок" }),
              e.jsx("li", { children: "✅ Повтор заказа в 1 клик" }),
            ],
          }),
          e.jsx("p", {
            className: "mt-6 text-[11px] text-gray-500",
            children: "Candy Craft — торты из любимых шоколадок. 🍫🍰",
          }),
        ],
      }),
    }),
  });
}
function Be() {
  return e.jsx("span", {
    className: "ml-0.5 text-red-600 align-super",
    children: "*",
  });
}
function _n(t) {
  const s = {};
  (t.firstName.trim() || (s.firstName = "Введите имя"),
    t.lastName.trim() || (s.lastName = "Введите фамилию"));
  const r = t.email.trim().toLowerCase();
  return (
    r
      ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r) || (s.email = "Некорректный email")
      : (s.email = "Введите email"),
    t.password
      ? t.password.length < 6 && (s.password = "Минимум 6 символов")
      : (s.password = "Введите пароль"),
    t.confirmPassword
      ? t.confirmPassword !== t.password &&
        (s.confirmPassword = "Пароли не совпадают")
      : (s.confirmPassword = "Повторите пароль"),
    s
  );
}
function zn() {
  const t = Ue(),
    [s, r] = c.useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    }),
    [a, n] = c.useState({}),
    [l, o] = c.useState(""),
    [d, i] = c.useState(!1),
    [u, x] = c.useState(!1),
    g = c.useMemo(
      () =>
        d
          ? !1
          : s.firstName.trim() &&
            s.lastName.trim() &&
            s.email.trim() &&
            s.password &&
            s.confirmPassword,
      [s, d],
    ),
    h = (p) => (y) => {
      (r((v) => ({ ...v, [p]: y.target.value })),
        n((v) => ({ ...v, [p]: void 0 })),
        o(""));
    },
    m = async (p) => {
      p.preventDefault();
      const y = _n(s);
      if ((n(y), !Object.keys(y).length)) {
        (i(!0), o(""));
        try {
          (await z.post("/auth/register", {
            firstName: s.firstName.trim(),
            lastName: s.lastName.trim(),
            email: s.email.trim().toLowerCase(),
            phone: s.phone?.trim() || void 0,
            password: s.password,
            confirmPassword: s.confirmPassword,
          }),
            t("/account/login", { replace: !0 }));
        } catch (v) {
          v instanceof ne ? o(v.message) : o("Не удалось зарегистрироваться");
        } finally {
          i(!1);
        }
      }
    };
  return e.jsx(lr, {
    title: "Создадим аккаунт 🍰",
    subtitle: "Пара секунд — и ваш Candy Craft профиль готов.",
    bottomText: "Уже есть аккаунт?",
    bottomLinkText: "Войти",
    bottomLinkTo: "/account/login",
    children: e.jsxs("form", {
      onSubmit: m,
      className: "space-y-5",
      children: [
        l &&
          e.jsx("div", {
            className:
              "rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700",
            children: l,
          }),
        e.jsxs("div", {
          className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
          children: [
            e.jsxs("div", {
              children: [
                e.jsxs("label", {
                  className: "text-sm font-medium",
                  htmlFor: "firstName",
                  children: ["Имя ", e.jsx(Be, {})],
                }),
                e.jsx("input", {
                  id: "firstName",
                  type: "text",
                  value: s.firstName,
                  onChange: h("firstName"),
                  placeholder: "как к вам обращаться 🍬",
                  className: `mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 ${a.firstName ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-gray-200"}`,
                  autoComplete: "given-name",
                }),
                a.firstName &&
                  e.jsx("p", {
                    className: "mt-1 text-xs text-red-600",
                    children: a.firstName,
                  }),
              ],
            }),
            e.jsxs("div", {
              children: [
                e.jsxs("label", {
                  className: "text-sm font-medium",
                  htmlFor: "lastName",
                  children: ["Фамилия ", e.jsx(Be, {})],
                }),
                e.jsx("input", {
                  id: "lastName",
                  type: "text",
                  value: s.lastName,
                  onChange: h("lastName"),
                  placeholder: "для доставки 🎁",
                  className: `mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 ${a.lastName ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-gray-200"}`,
                  autoComplete: "family-name",
                }),
                a.lastName &&
                  e.jsx("p", {
                    className: "mt-1 text-xs text-red-600",
                    children: a.lastName,
                  }),
              ],
            }),
          ],
        }),
        e.jsxs("div", {
          children: [
            e.jsxs("label", {
              className: "text-sm font-medium",
              htmlFor: "email",
              children: ["Email ", e.jsx(Be, {})],
            }),
            e.jsx("input", {
              id: "email",
              type: "email",
              value: s.email,
              onChange: h("email"),
              placeholder: "куда отправлять чек 🍫",
              className: `mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 ${a.email ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-gray-200"}`,
              autoComplete: "email",
            }),
            a.email &&
              e.jsx("p", {
                className: "mt-1 text-xs text-red-600",
                children: a.email,
              }),
          ],
        }),
        e.jsxs("div", {
          children: [
            e.jsxs("label", {
              className: "text-sm font-medium",
              htmlFor: "phone",
              children: [
                "Телефон",
                " ",
                e.jsx("span", {
                  className: "text-xs font-normal text-gray-400",
                  children: "(необязательно)",
                }),
              ],
            }),
            e.jsx("input", {
              id: "phone",
              type: "tel",
              inputMode: "tel",
              value: s.phone,
              onChange: h("phone"),
              placeholder: "+7 (999) 999-99-99",
              className:
                "mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200",
              autoComplete: "tel",
            }),
          ],
        }),
        e.jsxs("div", {
          children: [
            e.jsxs("label", {
              className: "text-sm font-medium",
              htmlFor: "password",
              children: ["Пароль ", e.jsx(Be, {})],
            }),
            e.jsxs("div", {
              className:
                "mt-1 flex rounded-lg border border-gray-200 bg-white focus-within:ring-2 focus-within:ring-gray-200",
              children: [
                e.jsx("input", {
                  id: "password",
                  type: u ? "text" : "password",
                  value: s.password,
                  onChange: h("password"),
                  placeholder: "секретный ингредиент",
                  className: "w-full rounded-lg px-3 py-2 outline-none",
                  autoComplete: "new-password",
                }),
                e.jsx("button", {
                  type: "button",
                  onClick: () => x((p) => !p),
                  className: "px-3 text-sm text-gray-600",
                  children: u ? "Скрыть" : "Показать",
                }),
              ],
            }),
            a.password &&
              e.jsx("p", {
                className: "mt-1 text-xs text-red-600",
                children: a.password,
              }),
          ],
        }),
        e.jsxs("div", {
          children: [
            e.jsxs("label", {
              className: "text-sm font-medium",
              htmlFor: "confirmPassword",
              children: ["Повтор пароля ", e.jsx(Be, {})],
            }),
            e.jsx("input", {
              id: "confirmPassword",
              type: u ? "text" : "password",
              value: s.confirmPassword,
              onChange: h("confirmPassword"),
              placeholder: "ещё раз, чтобы точно 🍰",
              onPaste: (p) => p.preventDefault(),
              onDrop: (p) => p.preventDefault(),
              className: `mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 ${a.confirmPassword ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-gray-200"}`,
              autoComplete: "new-password",
            }),
            a.confirmPassword &&
              e.jsx("p", {
                className: "mt-1 text-xs text-red-600",
                children: a.confirmPassword,
              }),
          ],
        }),
        e.jsx("button", {
          type: "submit",
          disabled: !g,
          className:
            "w-full rounded-lg bg-amber-500 px-4 py-2.5 text-white hover:bg-amber-600 disabled:opacity-50",
          children: d ? "Создаю аккаунт..." : "Зарегистрироваться",
        }),
      ],
    }),
  });
}
const Un = [
  { path: "/admin", label: "Дашборд", icon: e.jsx(_a, { size: 20 }) },
  { path: "/admin/products", label: "Товары", icon: e.jsx(ge, { size: 20 }) },
  { path: "/admin/orders", label: "Заказы", icon: e.jsx(Ze, { size: 20 }) },
  {
    path: "/admin/categories",
    label: "Категории",
    icon: e.jsx(er, { size: 20 }),
  },
  {
    path: "/admin/settings",
    label: "Настройки",
    icon: e.jsx(rn, { size: 20 }),
  },
];
function Bn({ isOpen: t, onClose: s }) {
  return e.jsxs(e.Fragment, {
    children: [
      t &&
        e.jsx("div", {
          className: "fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden",
          onClick: s,
        }),
      e.jsxs("aside", {
        className: `
                fixed top-0 left-0 h-screen bg-gray-900 text-white 
                w-64 z-50 transform transition-transform duration-300
                ${t ? "translate-x-0" : "-translate-x-full"}
                lg:translate-x-0
            `,
        children: [
          e.jsx("div", {
            className: "p-6 border-b border-gray-800",
            children: e.jsxs("h1", {
              className: "text-2xl font-bold flex items-center gap-2",
              children: [
                "🍰 Candy Craft",
                e.jsx("span", {
                  className: "text-xs bg-[#ff398b] px-2 py-1 rounded ml-2",
                  children: "Admin",
                }),
              ],
            }),
          }),
          e.jsx("nav", {
            className: "p-4",
            children: e.jsx("ul", {
              className: "space-y-2",
              children: Un.map((r) =>
                e.jsx(
                  "li",
                  {
                    children: e.jsxs(qe, {
                      to: r.path,
                      end: r.path === "/admin",
                      className: ({ isActive: a }) => `
                                        flex items-center gap-3 px-4 py-3 rounded-lg
                                        transition-colors ${a ? "" : "hover:bg-gray-800"}
                                        ${a ? "bg-[#ff398b] text-white" : "text-gray-300 hover:text-white"}
                                    `,
                      children: [r.icon, e.jsx("span", { children: r.label })],
                    }),
                  },
                  r.path,
                ),
              ),
            }),
          }),
          e.jsx("div", {
            className:
              "absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800",
            children: e.jsxs("button", {
              onClick: () => {
                (localStorage.removeItem("admin_token"),
                  (window.location.href = "/"));
              },
              className:
                "flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white w-full rounded-lg hover:bg-gray-800 transition-colors",
              children: [
                e.jsx(Ua, { size: 20 }),
                e.jsx("span", { children: "Выйти" }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
}
function qn({ title: t, onMenuClick: s, sidebarOpen: r }) {
  const [a, n] = c.useState(!1);
  return (
    c.useEffect(() => {
      const l = () => n(window.innerWidth < 768);
      return (
        l(),
        window.addEventListener("resize", l),
        () => window.removeEventListener("resize", l)
      );
    }, []),
    e.jsx("header", {
      className: "sticky top-0 z-30 bg-white border-b border-gray-200",
      children: e.jsxs("div", {
        className: "flex items-center justify-between px-4 py-3 md:px-6",
        children: [
          e.jsxs("div", {
            className: "flex items-center gap-4",
            children: [
              e.jsx("button", {
                type: "button",
                onClick: s,
                className:
                  "inline-flex lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors",
                "aria-label": r ? "Закрыть меню" : "Открыть меню",
                children: e.jsx(Xs, { size: 22, className: "text-gray-700" }),
              }),
              e.jsx("div", {
                className: "flex flex-col",
                children: e.jsx("h1", {
                  className:
                    "text-lg sm:text-xl md:text-2xl font-bold text-gray-800 line-clamp-1",
                  children: t,
                }),
              }),
            ],
          }),
          e.jsxs("div", {
            className: "flex items-center gap-2 sm:gap-4",
            children: [
              e.jsx("div", {
                className: `
                        hidden sm:block transition-all duration-300
                        ${r && a ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-40 md:w-64"}
                    `,
                children: e.jsxs("div", {
                  className: "relative",
                  children: [
                    e.jsx(Js, {
                      className:
                        "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400",
                      size: 20,
                    }),
                    e.jsx("input", {
                      type: "text",
                      placeholder: "Поиск...",
                      className:
                        "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff398b] focus:border-transparent",
                      disabled: r && a,
                    }),
                  ],
                }),
              }),
              e.jsxs("div", {
                className: "relative",
                children: [
                  e.jsx("button", {
                    className:
                      "p-2 rounded-lg hover:bg-gray-100 transition-colors",
                    "aria-label": "Уведомления",
                    children: e.jsx(ka, {
                      size: 22,
                      className: "text-gray-700",
                    }),
                  }),
                  e.jsx("span", {
                    className:
                      "absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full",
                  }),
                ],
              }),
              e.jsxs("button", {
                className:
                  "flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors",
                "aria-label": "Профиль администратора",
                children: [
                  e.jsx("div", {
                    className:
                      "w-8 h-8 bg-linear-to-r from-[#ff398b] to-[#ff6163] rounded-full flex items-center justify-center",
                    children: e.jsx(tr, { size: 18, className: "text-white" }),
                  }),
                  e.jsx("span", {
                    className:
                      "hidden md:inline text-sm font-medium text-gray-700",
                    children: "Администратор",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    })
  );
}
function gt({ children: t, title: s }) {
  const [r, a] = c.useState(!1);
  return e.jsxs("div", {
    className: "min-h-screen bg-gray-50 relative",
    children: [
      e.jsx(Bn, { isOpen: r, onClose: () => a(!1) }),
      e.jsxs("div", {
        className: `
                transition-all duration-300
                lg:ml-64
            `,
        children: [
          e.jsx(qn, { title: s, onMenuClick: () => a(!r), sidebarOpen: r }),
          e.jsx("main", { className: "p-4 md:p-6", children: t }),
        ],
      }),
    ],
  });
}
const ir = c.createContext(void 0),
  or = () => {
    const t = c.useContext(ir);
    if (!t) throw new Error("useOrders must be used within OrderProvider");
    return t;
  },
  $t = ({ children: t }) => {
    const [s, r] = c.useState([]),
      { user: a } = xe(),
      n = async () => {
        try {
          const i = await z.get("/orders");
          r(i ?? []);
        } catch (i) {
          console.error(i);
        }
      },
      l = async (i) => {
        try {
          const u = i.userId ?? a?.id;
          if (!u) throw new Error("userId is required for order creation");
          const x = await z.post(`/orders/${u}`, i);
          r((g) => [...g, x]);
        } catch (u) {
          console.error(u);
        }
      },
      o = async (i, u) => {
        try {
          const x = await z.patch(`/orders/${i}`, u);
          r((g) => g.map((h) => (h.id === i ? x : h)));
        } catch (x) {
          console.error(x);
        }
      },
      d = async (i) => {
        try {
          (await z.del(`/orders/${i}`), r((u) => u.filter((x) => x.id !== i)));
        } catch (u) {
          console.error(u);
        }
      };
    return (
      c.useEffect(() => {
        a?.role === "ADMIN" && n();
      }, [a?.role]),
      e.jsx(ir.Provider, {
        value: {
          orders: s,
          fetchOrders: n,
          updateOrder: o,
          deleteOrder: d,
          createOrder: l,
        },
        children: t,
      })
    );
  },
  Yt = {
    PENDING: "Создан",
    PAID: "Оплачен",
    PROCESSING: "Собирается",
    SHIPPED: "Отправлен",
    COMPLETED: "Выполнен",
    CANCELED: "Отменён",
  };
function Wn(t) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(t));
}
function js(t) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(t);
}
function cr(t) {
  return typeof t.finalAmountMinor == "number" ? t.finalAmountMinor : 0;
}
function Hn(t) {
  const s = t.currency || "RUB",
    r = cr(t);
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: s,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(r / 100);
}
function Vn() {
  const { products: t } = Je(),
    { orders: s } = or(),
    r = s.length,
    a = t.length,
    n = t.filter((i) => i.inStock <= 0).length,
    l = s.reduce((i, u) => {
      const x = cr(u) / 100;
      return i + (Number.isFinite(x) ? x : 0);
    }, 0),
    d = (() => {
      const i = new Map();
      for (const x of s) {
        const g = x.items ?? x.orderItems ?? [];
        if (Array.isArray(g))
          for (const h of g) {
            const m = Number(h.productId);
            if (!Number.isFinite(m)) continue;
            const p = Number(h.quantity ?? 1),
              y = Number(h.price ?? 0),
              v = h.productName ?? h.name,
              j = i.get(m) ?? { sales: 0, revenue: 0, name: v };
            ((j.sales += Number.isFinite(p) ? p : 1),
              (j.revenue +=
                (Number.isFinite(p) ? p : 1) * (Number.isFinite(y) ? y : 0)),
              (j.name = j.name ?? v),
              i.set(m, j));
          }
      }
      const u = Array.from(i.entries())
        .map(([x, g]) => {
          const h = t.find((m) => m.id === x);
          return {
            id: x,
            name: h?.name ?? g.name ?? `Product #${x}`,
            sales: g.sales,
            revenue: g.revenue,
            imageUrl: h?.imageUrl,
          };
        })
        .sort((x, g) => g.sales - x.sales)
        .slice(0, 6);
      return u.length === 0
        ? t
            .slice(0, 6)
            .map((x) => ({
              id: x.id,
              name: x.name,
              sales: 0,
              revenue: 0,
              imageUrl: x.imageUrl,
            }))
        : u;
    })();
  return e.jsxs(gt, {
    title: "Дашборд",
    children: [
      e.jsxs("div", {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
        children: [
          e.jsxs("div", {
            className:
              "bg-white rounded-xl p-6 shadow-sm border border-gray-200",
            children: [
              e.jsxs("div", {
                className: "flex items-center justify-between mb-4",
                children: [
                  e.jsx("div", {
                    className: "bg-[#ff398b] p-3 rounded-lg text-white",
                    children: e.jsx(Ze, { size: 20 }),
                  }),
                  e.jsxs("div", {
                    className: "text-right",
                    children: [
                      e.jsx("p", {
                        className: "text-2xl font-bold",
                        children: r,
                      }),
                      e.jsx("p", {
                        className: "text-gray-500 text-sm",
                        children: "Заказов",
                      }),
                    ],
                  }),
                ],
              }),
              e.jsxs("div", {
                className: "flex items-center text-sm text-gray-500",
                children: [
                  e.jsx(gs, { size: 16 }),
                  e.jsx("span", {
                    className: "ml-1",
                    children: "Обновляется автоматически",
                  }),
                ],
              }),
            ],
          }),
          e.jsxs("div", {
            className:
              "bg-white rounded-xl p-6 shadow-sm border border-gray-200",
            children: [
              e.jsxs("div", {
                className: "flex items-center justify-between mb-4",
                children: [
                  e.jsx("div", {
                    className: "bg-gray-900 p-3 rounded-lg text-white",
                    children: e.jsx(ge, { size: 20 }),
                  }),
                  e.jsxs("div", {
                    className: "text-right",
                    children: [
                      e.jsx("p", {
                        className: "text-2xl font-bold",
                        children: a,
                      }),
                      e.jsx("p", {
                        className: "text-gray-500 text-sm",
                        children: "Товаров",
                      }),
                    ],
                  }),
                ],
              }),
              e.jsx("div", {
                className: "flex items-center text-sm text-gray-500",
                children: e.jsx("span", { children: "Каталог" }),
              }),
            ],
          }),
          e.jsxs("div", {
            className:
              "bg-white rounded-xl p-6 shadow-sm border border-gray-200",
            children: [
              e.jsxs("div", {
                className: "flex items-center justify-between mb-4",
                children: [
                  e.jsx("div", {
                    className: "bg-red-500 p-3 rounded-lg text-white",
                    children: e.jsx(ge, { size: 20 }),
                  }),
                  e.jsxs("div", {
                    className: "text-right",
                    children: [
                      e.jsx("p", {
                        className: "text-2xl font-bold",
                        children: n,
                      }),
                      e.jsx("p", {
                        className: "text-gray-500 text-sm",
                        children: "Нет в наличии",
                      }),
                    ],
                  }),
                ],
              }),
              e.jsx("div", {
                className: "text-sm text-gray-500",
                children: "Проверь остатки",
              }),
            ],
          }),
          e.jsxs("div", {
            className:
              "bg-white rounded-xl p-6 shadow-sm border border-gray-200",
            children: [
              e.jsxs("div", {
                className: "flex items-center justify-between mb-4",
                children: [
                  e.jsx("div", {
                    className: "bg-emerald-600 p-3 rounded-lg text-white",
                    children: e.jsx(Aa, { size: 20 }),
                  }),
                  e.jsxs("div", {
                    className: "text-right",
                    children: [
                      e.jsx("p", {
                        className: "text-2xl font-bold",
                        children: l,
                      }),
                      e.jsx("p", {
                        className: "text-gray-500 text-sm",
                        children: "Выручка",
                      }),
                    ],
                  }),
                ],
              }),
              e.jsx("div", {
                className: "text-sm text-gray-500",
                children: "Сумма всех заказов",
              }),
            ],
          }),
        ],
      }),
      e.jsxs("div", {
        className: "grid grid-cols-1 lg:grid-cols-2 gap-8",
        children: [
          e.jsxs("div", {
            className:
              "bg-white rounded-xl p-6 shadow-sm border border-gray-200",
            children: [
              e.jsxs("div", {
                className: "flex items-center justify-between mb-6",
                children: [
                  e.jsx("h2", {
                    className: "text-xl font-bold",
                    children: "Последние заказы",
                  }),
                  e.jsx("button", {
                    className: "text-[#ff398b] hover:underline text-sm",
                    children: "Смотреть все",
                  }),
                ],
              }),
              e.jsx("div", {
                className: "overflow-x-auto",
                children: e.jsxs("table", {
                  className: "w-full",
                  children: [
                    e.jsx("thead", {
                      children: e.jsxs("tr", {
                        className: "border-b",
                        children: [
                          e.jsx("th", {
                            className:
                              "text-left py-3 text-gray-500 font-medium",
                            children: "ID",
                          }),
                          e.jsx("th", {
                            className:
                              "text-left py-3 text-gray-500 font-medium",
                            children: "Клиент",
                          }),
                          e.jsx("th", {
                            className:
                              "text-left py-3 text-gray-500 font-medium",
                            children: "Дата",
                          }),
                          e.jsx("th", {
                            className:
                              "text-left py-3 text-gray-500 font-medium",
                            children: "Сумма",
                          }),
                          e.jsx("th", {
                            className:
                              "text-left py-3 text-gray-500 font-medium",
                            children: "Статус",
                          }),
                        ],
                      }),
                    }),
                    e.jsxs("tbody", {
                      children: [
                        s
                          .slice()
                          .sort(
                            (i, u) =>
                              new Date(u.createdAt).getTime() -
                              new Date(i.createdAt).getTime(),
                          )
                          .slice(0, 8)
                          .map((i) =>
                            e.jsxs(
                              "tr",
                              {
                                className: "border-b hover:bg-gray-50",
                                children: [
                                  e.jsx("td", {
                                    className: "py-3 font-medium",
                                    children: i.id,
                                  }),
                                  e.jsx("td", {
                                    className: "py-3 font-medium",
                                    children: i.fullName ?? "—",
                                  }),
                                  e.jsx("td", {
                                    className: "py-3",
                                    children: i.createdAt
                                      ? Wn(i.createdAt)
                                      : "—",
                                  }),
                                  e.jsx("td", {
                                    className: "py-3 text-gray-500",
                                    children: Hn(i),
                                  }),
                                  e.jsx("td", {
                                    className: "py-3 font-medium",
                                    children: Yt[i.status] ?? i.status ?? "—",
                                  }),
                                ],
                              },
                              i.id,
                            ),
                          ),
                        s.length === 0 &&
                          e.jsx("tr", {
                            children: e.jsx("td", {
                              className: "py-8 text-gray-500",
                              colSpan: 5,
                              children: "Заказов пока нет",
                            }),
                          }),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          }),
          e.jsxs("div", {
            className:
              "bg-white rounded-xl p-6 shadow-sm border border-gray-200",
            children: [
              e.jsxs("div", {
                className: "flex items-center justify-between mb-6",
                children: [
                  e.jsx("h2", {
                    className: "text-xl font-bold",
                    children: "Популярные товары",
                  }),
                  e.jsx("button", {
                    className: "text-[#ff398b] hover:underline text-sm",
                    children: "Смотреть все",
                  }),
                ],
              }),
              e.jsxs("div", {
                className: "space-y-4",
                children: [
                  d.map((i) =>
                    e.jsxs(
                      "div",
                      {
                        className:
                          "flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg",
                        children: [
                          e.jsxs("div", {
                            className: "flex items-center gap-3 min-w-0",
                            children: [
                              i.imageUrl
                                ? e.jsx("img", {
                                    src: i.imageUrl,
                                    alt: i.name,
                                    className:
                                      "h-10 w-10 rounded-lg object-cover border",
                                  })
                                : e.jsx("div", {
                                    className:
                                      "h-10 w-10 rounded-lg bg-gray-100 border flex items-center justify-center text-gray-500",
                                    children: e.jsx(ge, { size: 18 }),
                                  }),
                              e.jsxs("div", {
                                className: "min-w-0",
                                children: [
                                  e.jsx("h3", {
                                    className: "font-medium truncate",
                                    children: i.name,
                                  }),
                                  e.jsx("p", {
                                    className: "text-sm text-gray-500",
                                    children:
                                      i.sales > 0
                                        ? `${i.sales} шт.`
                                        : "Нет продаж (пока)",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          e.jsxs("div", {
                            className: "text-right",
                            children: [
                              e.jsx("p", {
                                className: "font-bold",
                                children: i.revenue > 0 ? js(i.revenue) : "—",
                              }),
                              e.jsxs("div", {
                                className:
                                  "flex items-center justify-end text-sm text-gray-500",
                                children: [
                                  e.jsx(gs, { size: 14 }),
                                  e.jsx("span", {
                                    className: "ml-1",
                                    children: "в топе",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      },
                      i.id,
                    ),
                  ),
                  t.length === 0 &&
                    e.jsx("div", {
                      className: "py-8 text-gray-500",
                      children: "Товаров пока нет",
                    }),
                ],
              }),
              e.jsx("div", {
                className: "mt-6 pt-6 border-t",
                children: e.jsxs("div", {
                  className: "flex items-center justify-between text-gray-600",
                  children: [
                    e.jsx("span", { children: "Общая выручка:" }),
                    e.jsx("span", {
                      className: "text-xl font-bold",
                      children: js(l),
                    }),
                  ],
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
const Gn = 5 * 1024 * 1024,
  Kn = ["image/jpeg", "image/png", "image/webp", "image/gif"];
async function Xn(t, s) {
  if (t.size > Gn) throw new Error("Файл больше 5 МБ");
  if (!Kn.includes(t.type))
    throw new Error("Поддерживаются только JPEG, PNG, WebP и GIF");
  const r = await z.post("/uploads/cloudinary/signature", {
    folder: s,
    fileName: t.name,
    fileSize: t.size,
    contentType: t.type,
  });
  if (t.size > r.maxFileSize || !r.allowedContentTypes.includes(t.type))
    throw new Error("Файл не соответствует ограничениям загрузки");
  const a = `https://api.cloudinary.com/v1_1/${r.cloudName}/image/upload`,
    n = new FormData();
  (n.append("file", t),
    n.append("api_key", r.apiKey),
    n.append("timestamp", String(r.timestamp)),
    n.append("signature", r.signature),
    n.append("folder", r.folder),
    n.append("public_id", r.publicId),
    r.uploadPreset && n.append("upload_preset", r.uploadPreset));
  const l = await fetch(a, { method: "POST", body: n }),
    o = await l.json();
  if (!l.ok) throw new Error(JSON.stringify(o));
  if (!o.secure_url || typeof o.secure_url != "string")
    throw new Error("Cloudinary did not return image URL");
  return o.secure_url;
}
function dr({
  value: t,
  onChange: s,
  folder: r = "products",
  label: a = "Изображение",
}) {
  const n = c.useRef(null),
    [l, o] = c.useState(!1);
  async function d(i) {
    const u = i.target.files?.[0];
    if (u) {
      o(!0);
      try {
        const x = await Xn(u, r);
        s(x);
      } finally {
        (o(!1), n.current && (n.current.value = ""));
      }
    }
  }
  return e.jsxs("div", {
    children: [
      e.jsx("label", {
        className: "block text-sm font-medium text-gray-700 mb-1",
        children: a,
      }),
      e.jsx("input", {
        ref: n,
        type: "file",
        accept: "image/*",
        onChange: d,
        className:
          "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300",
      }),
      l &&
        e.jsx("div", {
          className: "text-sm text-gray-500 mt-2",
          children: "Загрузка...",
        }),
      e.jsx("div", {
        className: "mt-3",
        children: e.jsx("input", {
          type: "text",
          value: t,
          onChange: (i) => s(i.target.value),
          placeholder: "https://...",
          className:
            "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300",
        }),
      }),
      e.jsxs("div", {
        className: "mt-3 rounded-lg border bg-gray-50 p-3",
        children: [
          e.jsx("div", {
            className: "text-sm text-gray-600 mb-2",
            children: "Превью",
          }),
          t
            ? e.jsx("img", {
                src: t,
                alt: "preview",
                className: "w-full max-h-32 object-contain rounded bg-white",
              })
            : e.jsx("div", {
                className: "text-sm text-gray-400",
                children: "Загрузите файл или вставьте ссылку",
              }),
        ],
      }),
    ],
  });
}
function Yn({ isOpen: t, onClose: s, onCreate: r, onUpdate: a, product: n }) {
  const [l, o] = c.useState({
      sku: "",
      slug: "",
      name: "",
      price: 0,
      inStock: 1,
      categoryId: 1,
      description: "",
      imageUrl: "",
      isActive: !0,
    }),
    [d, i] = c.useState(!1),
    [u, x] = c.useState([]),
    [g, h] = c.useState({});
  c.useEffect(() => {
    t &&
      (m(),
      o(
        n
          ? {
              id: n.id,
              sku: n.sku,
              slug: n.slug,
              name: n.name,
              price: n.price,
              inStock: n.inStock,
              categoryId: n.categoryId,
              description: n.description,
              imageUrl: n.imageUrl,
              isActive: n.isActive ?? !0,
            }
          : {
              sku: "",
              slug: "",
              name: "",
              price: 0,
              inStock: 1,
              categoryId: 1,
              description: "",
              imageUrl: "",
              isActive: !0,
            },
      ),
      h({}));
  }, [t, n]);
  const m = async () => {
      try {
        const k = await (await fetch(`${Ee}/categories`)).json();
        x(k);
      } catch (j) {
        console.error("Ошибка загрузки категорий:", j);
      }
    },
    p = () => {
      const j = {};
      return (
        l.name.trim() || (j.name = "Введите название товара"),
        l.price <= 0 && (j.price = "Цена должна быть больше 0"),
        l.inStock < 0 &&
          (j.inStock = "Количество должно быть больше либо равно 0"),
        l.imageUrl.trim() || (j.imageUrl = "Добавьте ссылку на изображение"),
        l.description.trim() || (j.description = "Введите описание"),
        h(j),
        Object.keys(j).length === 0
      );
    },
    y = async (j) => {
      if ((j.preventDefault(), !!p())) {
        i(!0);
        try {
          const k = {
            sku: l.sku,
            slug: l.slug,
            name: l.name,
            price: l.price,
            inStock: l.inStock,
            categoryId: l.categoryId,
            description: l.description,
            imageUrl: l.imageUrl,
            isActive: l.isActive,
          };
          (n && a ? await a(n.id, k) : await r(k), s());
        } catch (k) {
          (console.error("Ошибка сохранения:", k),
            h({ submit: "Ошибка при сохранении товара" }));
        } finally {
          i(!1);
        }
      }
    },
    v = (j, k) => {
      (o((w) => ({ ...w, [j]: k })), g[j] && h((w) => ({ ...w, [j]: "" })));
    };
  return t
    ? e.jsxs("div", {
        className: "fixed inset-0 z-50 overflow-y-auto",
        children: [
          e.jsx("div", {
            className:
              "fixed inset-0 bg-black bg-opacity-50 transition-opacity",
            onClick: s,
          }),
          e.jsx("div", {
            className:
              "flex items-end sm:items-center justify-center min-h-screen p-3 sm:p-4",
            children: e.jsxs("div", {
              className:
                "relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-hidden flex flex-col",
              children: [
                e.jsxs("div", {
                  className:
                    "flex items-center justify-between gap-4 p-4 sm:p-6 border-b",
                  children: [
                    e.jsx("h2", {
                      className: "text-xl sm:text-2xl font-bold text-gray-900",
                      children: n
                        ? "Редактировать товар"
                        : "Создать новый товар",
                    }),
                    e.jsx("button", {
                      onClick: s,
                      className:
                        "p-2 hover:bg-gray-100 rounded-lg transition-colors",
                      disabled: d,
                      children: e.jsx(sr, { size: 24 }),
                    }),
                  ],
                }),
                e.jsxs("form", {
                  onSubmit: y,
                  className: "p-4 sm:p-6 overflow-y-auto",
                  children: [
                    e.jsxs("div", {
                      className:
                        "grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6",
                      children: [
                        e.jsxs("div", {
                          className: "space-y-4",
                          children: [
                            e.jsxs("div", {
                              className:
                                "grid grid-cols-1 sm:grid-cols-2 gap-4",
                              children: [
                                e.jsxs("div", {
                                  children: [
                                    e.jsx("label", {
                                      htmlFor: "product-sku",
                                      className:
                                        "block text-sm font-medium text-gray-700 mb-2",
                                      children: "SKU",
                                    }),
                                    e.jsx("input", {
                                      id: "product-sku",
                                      type: "text",
                                      value: l.sku ?? "",
                                      onChange: (j) => v("sku", j.target.value),
                                      className:
                                        "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff398b] focus:border-transparent",
                                      placeholder: "SKU-000123",
                                      disabled: d,
                                    }),
                                  ],
                                }),
                                e.jsxs("div", {
                                  children: [
                                    e.jsx("label", {
                                      htmlFor: "product-slug",
                                      className:
                                        "block text-sm font-medium text-gray-700 mb-2",
                                      children: "Slug",
                                    }),
                                    e.jsx("input", {
                                      id: "product-slug",
                                      type: "text",
                                      value: l.slug ?? "",
                                      onChange: (j) =>
                                        v("slug", j.target.value),
                                      className:
                                        "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff398b] focus:border-transparent",
                                      placeholder: "tort-napoleon",
                                      disabled: d,
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            e.jsxs("div", {
                              children: [
                                e.jsx("label", {
                                  htmlFor: "product-name",
                                  className:
                                    "block text-sm font-medium text-gray-700 mb-2",
                                  children: "Название товара *",
                                }),
                                e.jsx("input", {
                                  id: "product-name",
                                  type: "text",
                                  value: l.name,
                                  onChange: (j) => v("name", j.target.value),
                                  className: `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#ff398b] focus:border-transparent ${g.name ? "border-red-500" : "border-gray-300"}`,
                                  placeholder: "Например: Торт 'Медовик'",
                                  disabled: d,
                                }),
                                g.name &&
                                  e.jsx("p", {
                                    className: "mt-1 text-sm text-red-600",
                                    children: g.name,
                                  }),
                              ],
                            }),
                            e.jsxs("div", {
                              className:
                                "grid grid-cols-1 sm:grid-cols-2 gap-4",
                              children: [
                                e.jsxs("div", {
                                  children: [
                                    e.jsx("label", {
                                      htmlFor: "product-price",
                                      className:
                                        "block text-sm font-medium text-gray-700 mb-2",
                                      children: "Цена (₽) *",
                                    }),
                                    e.jsx("input", {
                                      id: "product-price",
                                      type: "number",
                                      step: "0.01",
                                      min: "0",
                                      value: l.price,
                                      onChange: (j) =>
                                        v(
                                          "price",
                                          parseFloat(j.target.value) || 0,
                                        ),
                                      className: `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#ff398b] focus:border-transparent ${g.price ? "border-red-500" : "border-gray-300"}`,
                                      placeholder: "999.99",
                                      disabled: d,
                                    }),
                                    g.price &&
                                      e.jsx("p", {
                                        className: "mt-1 text-sm text-red-600",
                                        children: g.price,
                                      }),
                                  ],
                                }),
                                e.jsxs("div", {
                                  children: [
                                    e.jsx("label", {
                                      htmlFor: "product-stock",
                                      className:
                                        "block text-sm font-medium text-gray-700 mb-2",
                                      children: "Количество *",
                                    }),
                                    e.jsx("input", {
                                      id: "product-stock",
                                      type: "number",
                                      min: "0",
                                      value: l.inStock,
                                      onChange: (j) =>
                                        v(
                                          "inStock",
                                          parseInt(j.target.value) || 0,
                                        ),
                                      className: `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#ff398b] focus:border-transparent ${g.inStock ? "border-red-500" : "border-gray-300"}`,
                                      placeholder: "10",
                                      disabled: d,
                                    }),
                                    g.inStock &&
                                      e.jsx("p", {
                                        className: "mt-1 text-sm text-red-600",
                                        children: g.inStock,
                                      }),
                                  ],
                                }),
                              ],
                            }),
                            e.jsxs("div", {
                              children: [
                                e.jsx("label", {
                                  htmlFor: "product-category",
                                  className:
                                    "block text-sm font-medium text-gray-700 mb-2",
                                  children: "Категория *",
                                }),
                                e.jsx("select", {
                                  id: "product-category",
                                  value: l.categoryId,
                                  onChange: (j) =>
                                    v("categoryId", parseInt(j.target.value)),
                                  className:
                                    "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff398b] focus:border-transparent",
                                  disabled: d || u.length === 0,
                                  children: u.map((j) =>
                                    e.jsx(
                                      "option",
                                      { value: j.id, children: j.name },
                                      j.id,
                                    ),
                                  ),
                                }),
                              ],
                            }),
                            e.jsxs("label", {
                              className:
                                "inline-flex items-center gap-2 text-sm text-gray-700",
                              children: [
                                e.jsx("input", {
                                  type: "checkbox",
                                  checked: !!l.isActive,
                                  onChange: (j) =>
                                    v("isActive", j.target.checked),
                                  disabled: d,
                                }),
                                "Активен на витрине",
                              ],
                            }),
                          ],
                        }),
                        e.jsxs("div", {
                          className: "space-y-4",
                          children: [
                            e.jsx(dr, {
                              label: "Изображение товара",
                              value: l.imageUrl,
                              onChange: (j) => v("imageUrl", j),
                              folder: "products",
                            }),
                            e.jsxs("div", {
                              children: [
                                e.jsx("label", {
                                  htmlFor: "product-description",
                                  className:
                                    "block text-sm font-medium text-gray-700 mb-2",
                                  children: "Описание *",
                                }),
                                e.jsx("textarea", {
                                  id: "product-description",
                                  value: l.description,
                                  onChange: (j) =>
                                    v("description", j.target.value),
                                  rows: 4,
                                  className: `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#ff398b] focus:border-transparent ${g.description ? "border-red-500" : "border-gray-300"}`,
                                  placeholder: "Опишите ваш товар...",
                                  disabled: d,
                                }),
                                g.description &&
                                  e.jsx("p", {
                                    className: "mt-1 text-sm text-red-600",
                                    children: g.description,
                                  }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className:
                        "flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-6 mt-6 border-t",
                      children: [
                        e.jsx("button", {
                          type: "button",
                          onClick: s,
                          className:
                            "w-full sm:w-auto px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium",
                          disabled: d,
                          children: "Отмена",
                        }),
                        e.jsx("button", {
                          type: "submit",
                          className:
                            "w-full sm:w-auto px-6 py-3 bg-[#ff398b] text-white rounded-lg hover:bg-[#e0327a] transition-colors font-medium disabled:opacity-50",
                          disabled: d,
                          children: d
                            ? e.jsxs("span", {
                                className: "flex items-center gap-2",
                                children: [
                                  e.jsx("div", {
                                    className:
                                      "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin",
                                  }),
                                  "Сохранение...",
                                ],
                              })
                            : n
                              ? "Сохранить изменения"
                              : "Создать товар",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      })
    : null;
}
function Qn() {
  const {
      products: t,
      createProduct: s,
      updateProduct: r,
      deleteProduct: a,
    } = Je(),
    [n, l] = c.useState(!1),
    [o, d] = c.useState(null),
    i = async (m) => {
      await s(m);
    },
    u = async (m, p) => {
      await r(m, p);
    },
    x = async (m) => {
      window.confirm("Удалить товар?") && (await a(m));
    },
    g = (m) => {
      (d(m), l(!0));
    },
    h = () => {
      (d(null), l(!0));
    };
  return e.jsxs(gt, {
    title: "Управление товарами",
    children: [
      e.jsxs("button", {
        onClick: h,
        className:
          "mb-6 inline-flex w-full sm:w-auto items-center justify-center gap-2 px-4 py-2 bg-[#ff398b] text-white rounded-lg hover:bg-[#e0327a]",
        children: [
          e.jsx(Kt, { size: 18, className: "shrink-0" }),
          e.jsx("span", { children: "Добавить товар" }),
        ],
      }),
      e.jsx(Yn, {
        isOpen: n,
        onClose: () => l(!1),
        onCreate: i,
        onUpdate: u,
        product: o,
      }),
      e.jsx("div", {
        className: "bg-white rounded-lg shadow overflow-hidden",
        children: e.jsx("div", {
          className: "overflow-x-auto",
          children: e.jsxs("table", {
            className: "w-full min-w-[920px]",
            children: [
              e.jsx("thead", {
                className: "bg-gray-50",
                children: e.jsxs("tr", {
                  children: [
                    e.jsx("th", {
                      className: "px-6 py-3 text-left",
                      children: "Изображение",
                    }),
                    e.jsx("th", {
                      className: "px-6 py-3 text-left",
                      children: "Название",
                    }),
                    e.jsx("th", {
                      className: "px-6 py-3 text-left",
                      children: "SKU",
                    }),
                    e.jsx("th", {
                      className: "px-6 py-3 text-left",
                      children: "Категория",
                    }),
                    e.jsx("th", {
                      className: "px-6 py-3 text-left",
                      children: "Цена",
                    }),
                    e.jsx("th", {
                      className: "px-6 py-3 text-left",
                      children: "В наличии",
                    }),
                    e.jsx("th", {
                      className: "px-6 py-3 text-left",
                      children: "Статус",
                    }),
                    e.jsx("th", {
                      className: "px-6 py-3 text-left",
                      children: "Действия",
                    }),
                  ],
                }),
              }),
              e.jsx("tbody", {
                children: t.map((m) =>
                  e.jsxs(
                    "tr",
                    {
                      className: "border-t hover:bg-gray-50",
                      children: [
                        e.jsxs("td", {
                          className: "px-6 py-4",
                          children: [
                            " ",
                            e.jsx("img", {
                              src: m.imageUrl,
                              alt: m.name,
                              className: "w-14 h-14 object-cover rounded",
                            }),
                          ],
                        }),
                        e.jsx("td", {
                          className: "px-6 py-4",
                          children: m.name,
                        }),
                        e.jsx("td", {
                          className: "px-6 py-4",
                          children: m.sku,
                        }),
                        e.jsx("td", {
                          className: "px-6 py-4",
                          children: m.category.name,
                        }),
                        e.jsxs("td", {
                          className: "px-6 py-4",
                          children: [m.price, " ₽"],
                        }),
                        e.jsxs("td", {
                          className: "px-6 py-4",
                          children: [m.inStock, " шт"],
                        }),
                        e.jsx("td", {
                          className: "px-6 py-4",
                          children: m.isActive ? "Активен" : "Скрыт",
                        }),
                        e.jsx("td", {
                          className: "px-6 py-4",
                          children: e.jsxs("div", {
                            className: "flex gap-2",
                            children: [
                              e.jsx("button", {
                                onClick: () => g(m),
                                "aria-label": `Редактировать товар ${m.name}`,
                                className:
                                  "p-2 text-blue-600 hover:bg-blue-50 rounded",
                                children: e.jsx(Xt, { size: 16 }),
                              }),
                              e.jsx("button", {
                                onClick: () => x(m.id),
                                "aria-label": `Удалить товар ${m.name}`,
                                className:
                                  "p-2 text-red-600 hover:bg-red-50 rounded",
                                children: e.jsx(pt, { size: 16 }),
                              }),
                            ],
                          }),
                        }),
                      ],
                    },
                    m.id,
                  ),
                ),
              }),
            ],
          }),
        }),
      }),
    ],
  });
}
function lt({ children: t }) {
  const { user: s, isLoading: r } = xe(),
    a = qs();
  return r
    ? e.jsx("div", {
        className:
          "min-h-screen bg-gray-50 flex items-center justify-center px-4",
        children: e.jsxs("div", {
          className:
            "w-full max-w-sm rounded-lg bg-white border border-gray-200 shadow-sm p-6 text-center",
          children: [
            e.jsx("div", {
              className:
                "mx-auto mb-4 h-8 w-8 rounded-full border-4 border-gray-200 border-t-[#ff398b] animate-spin",
            }),
            e.jsx("p", {
              className: "text-sm font-medium text-gray-700",
              children: "Проверяем доступ к админке...",
            }),
          ],
        }),
      })
    : s
      ? s.role !== "ADMIN"
        ? e.jsx(os, { to: "/", replace: !0 })
        : e.jsx(e.Fragment, { children: t })
      : e.jsx(os, {
          to: "/account/login",
          replace: !0,
          state: { from: a.pathname },
        });
}
function Zn() {
  return e.jsxs("footer", {
    className: "border-t mt-16 bg-white",
    children: [
      e.jsxs("div", {
        className: "max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3",
        children: [
          e.jsxs("div", {
            children: [
              e.jsx("h3", {
                className: "text-lg font-semibold",
                children: "CandyCraft",
              }),
              e.jsx("p", {
                className: "text-sm text-gray-500 mt-2",
                children: "Sweet gifts and chocolate cake sets made with care.",
              }),
            ],
          }),
          e.jsxs("div", {
            children: [
              e.jsx("h4", {
                className: "font-medium mb-3",
                children: "Information",
              }),
              e.jsxs("ul", {
                className: "space-y-2 text-sm text-gray-600",
                children: [
                  e.jsx("li", {
                    children: e.jsx("a", {
                      href: "/privacy",
                      className: "hover:text-black",
                      children: "Privacy Policy",
                    }),
                  }),
                  e.jsx("li", {
                    children: e.jsx("a", {
                      href: "/contacts",
                      className: "hover:text-black",
                      children: "Contacts",
                    }),
                  }),
                  e.jsx("li", {
                    children: e.jsx("a", {
                      href: "/delivery",
                      className: "hover:text-black",
                      children: "Delivery & Payment",
                    }),
                  }),
                ],
              }),
            ],
          }),
          e.jsxs("div", {
            children: [
              e.jsx("h4", {
                className: "font-medium mb-3",
                children: "Contact",
              }),
              e.jsx("p", {
                className: "text-sm text-gray-600",
                children: "Email: your@email.com",
              }),
              e.jsx("p", {
                className: "text-sm text-gray-600",
                children: "Phone: +7 XXX XXX-XX-XX",
              }),
            ],
          }),
        ],
      }),
      e.jsxs("div", {
        className: "border-t text-center text-sm text-gray-500 py-4",
        children: [
          "© ",
          new Date().getFullYear(),
          " CandyCraft. All rights reserved.",
        ],
      }),
    ],
  });
}
var Qt = {};
(function t(s, r, a, n) {
  var l = !!(
      s.Worker &&
      s.Blob &&
      s.Promise &&
      s.OffscreenCanvas &&
      s.OffscreenCanvasRenderingContext2D &&
      s.HTMLCanvasElement &&
      s.HTMLCanvasElement.prototype.transferControlToOffscreen &&
      s.URL &&
      s.URL.createObjectURL
    ),
    o = typeof Path2D == "function" && typeof DOMMatrix == "function",
    d = (function () {
      if (!s.OffscreenCanvas) return !1;
      try {
        var b = new OffscreenCanvas(1, 1),
          f = b.getContext("2d");
        f.fillRect(0, 0, 1, 1);
        var M = b.transferToImageBitmap();
        f.createPattern(M, "no-repeat");
      } catch {
        return !1;
      }
      return !0;
    })();
  function i() {}
  function u(b) {
    var f = r.exports.Promise,
      M = f !== void 0 ? f : s.Promise;
    return typeof M == "function" ? new M(b) : (b(i, i), null);
  }
  var x = (function (b, f) {
      return {
        transform: function (M) {
          if (b) return M;
          if (f.has(M)) return f.get(M);
          var C = new OffscreenCanvas(M.width, M.height),
            F = C.getContext("2d");
          return (F.drawImage(M, 0, 0), f.set(M, C), C);
        },
        clear: function () {
          f.clear();
        },
      };
    })(d, new Map()),
    g = (function () {
      var b = Math.floor(16.666666666666668),
        f,
        M,
        C = {},
        F = 0;
      return (
        typeof requestAnimationFrame == "function" &&
        typeof cancelAnimationFrame == "function"
          ? ((f = function (L) {
              var _ = Math.random();
              return (
                (C[_] = requestAnimationFrame(function I(T) {
                  F === T || F + b - 1 < T
                    ? ((F = T), delete C[_], L())
                    : (C[_] = requestAnimationFrame(I));
                })),
                _
              );
            }),
            (M = function (L) {
              C[L] && cancelAnimationFrame(C[L]);
            }))
          : ((f = function (L) {
              return setTimeout(L, b);
            }),
            (M = function (L) {
              return clearTimeout(L);
            })),
        { frame: f, cancel: M }
      );
    })(),
    h = (function () {
      var b,
        f,
        M = {};
      function C(F) {
        function L(_, I) {
          F.postMessage({ options: _ || {}, callback: I });
        }
        ((F.init = function (I) {
          var T = I.transferControlToOffscreen();
          F.postMessage({ canvas: T }, [T]);
        }),
          (F.fire = function (I, T, B) {
            if (f) return (L(I, null), f);
            var K = Math.random().toString(36).slice(2);
            return (
              (f = u(function (V) {
                function X(Z) {
                  Z.data.callback === K &&
                    (delete M[K],
                    F.removeEventListener("message", X),
                    (f = null),
                    x.clear(),
                    B(),
                    V());
                }
                (F.addEventListener("message", X),
                  L(I, K),
                  (M[K] = X.bind(null, { data: { callback: K } })));
              })),
              f
            );
          }),
          (F.reset = function () {
            F.postMessage({ reset: !0 });
            for (var I in M) (M[I](), delete M[I]);
          }));
      }
      return function () {
        if (b) return b;
        if (!a && l) {
          var F = [
            "var CONFETTI, SIZE = {}, module = {};",
            "(" + t.toString() + ")(this, module, true, SIZE);",
            "onmessage = function(msg) {",
            "  if (msg.data.options) {",
            "    CONFETTI(msg.data.options).then(function () {",
            "      if (msg.data.callback) {",
            "        postMessage({ callback: msg.data.callback });",
            "      }",
            "    });",
            "  } else if (msg.data.reset) {",
            "    CONFETTI && CONFETTI.reset();",
            "  } else if (msg.data.resize) {",
            "    SIZE.width = msg.data.resize.width;",
            "    SIZE.height = msg.data.resize.height;",
            "  } else if (msg.data.canvas) {",
            "    SIZE.width = msg.data.canvas.width;",
            "    SIZE.height = msg.data.canvas.height;",
            "    CONFETTI = module.exports.create(msg.data.canvas);",
            "  }",
            "}",
          ].join(`
`);
          try {
            b = new Worker(URL.createObjectURL(new Blob([F])));
          } catch (L) {
            return (
              typeof console < "u" &&
                typeof console.warn == "function" &&
                console.warn("🎊 Could not load worker", L),
              null
            );
          }
          C(b);
        }
        return b;
      };
    })(),
    m = {
      particleCount: 50,
      angle: 90,
      spread: 45,
      startVelocity: 45,
      decay: 0.9,
      gravity: 1,
      drift: 0,
      ticks: 200,
      x: 0.5,
      y: 0.5,
      shapes: ["square", "circle"],
      zIndex: 100,
      colors: [
        "#26ccff",
        "#a25afd",
        "#ff5e7e",
        "#88ff5a",
        "#fcff42",
        "#ffa62d",
        "#ff36ff",
      ],
      disableForReducedMotion: !1,
      scalar: 1,
    };
  function p(b, f) {
    return f ? f(b) : b;
  }
  function y(b) {
    return b != null;
  }
  function v(b, f, M) {
    return p(b && y(b[f]) ? b[f] : m[f], M);
  }
  function j(b) {
    return b < 0 ? 0 : Math.floor(b);
  }
  function k(b, f) {
    return Math.floor(Math.random() * (f - b)) + b;
  }
  function w(b) {
    return parseInt(b, 16);
  }
  function N(b) {
    return b.map($);
  }
  function $(b) {
    var f = String(b).replace(/[^0-9a-f]/gi, "");
    return (
      f.length < 6 && (f = f[0] + f[0] + f[1] + f[1] + f[2] + f[2]),
      {
        r: w(f.substring(0, 2)),
        g: w(f.substring(2, 4)),
        b: w(f.substring(4, 6)),
      }
    );
  }
  function S(b) {
    var f = v(b, "origin", Object);
    return ((f.x = v(f, "x", Number)), (f.y = v(f, "y", Number)), f);
  }
  function A(b) {
    ((b.width = document.documentElement.clientWidth),
      (b.height = document.documentElement.clientHeight));
  }
  function q(b) {
    var f = b.getBoundingClientRect();
    ((b.width = f.width), (b.height = f.height));
  }
  function ee(b) {
    var f = document.createElement("canvas");
    return (
      (f.style.position = "fixed"),
      (f.style.top = "0px"),
      (f.style.left = "0px"),
      (f.style.pointerEvents = "none"),
      (f.style.zIndex = b),
      f
    );
  }
  function P(b, f, M, C, F, L, _, I, T) {
    (b.save(),
      b.translate(f, M),
      b.rotate(L),
      b.scale(C, F),
      b.arc(0, 0, 1, _, I, T),
      b.restore());
  }
  function D(b) {
    var f = b.angle * (Math.PI / 180),
      M = b.spread * (Math.PI / 180);
    return {
      x: b.x,
      y: b.y,
      wobble: Math.random() * 10,
      wobbleSpeed: Math.min(0.11, Math.random() * 0.1 + 0.05),
      velocity: b.startVelocity * 0.5 + Math.random() * b.startVelocity,
      angle2D: -f + (0.5 * M - Math.random() * M),
      tiltAngle: (Math.random() * (0.75 - 0.25) + 0.25) * Math.PI,
      color: b.color,
      shape: b.shape,
      tick: 0,
      totalTicks: b.ticks,
      decay: b.decay,
      drift: b.drift,
      random: Math.random() + 2,
      tiltSin: 0,
      tiltCos: 0,
      wobbleX: 0,
      wobbleY: 0,
      gravity: b.gravity * 3,
      ovalScalar: 0.6,
      scalar: b.scalar,
      flat: b.flat,
    };
  }
  function E(b, f) {
    ((f.x += Math.cos(f.angle2D) * f.velocity + f.drift),
      (f.y += Math.sin(f.angle2D) * f.velocity + f.gravity),
      (f.velocity *= f.decay),
      f.flat
        ? ((f.wobble = 0),
          (f.wobbleX = f.x + 10 * f.scalar),
          (f.wobbleY = f.y + 10 * f.scalar),
          (f.tiltSin = 0),
          (f.tiltCos = 0),
          (f.random = 1))
        : ((f.wobble += f.wobbleSpeed),
          (f.wobbleX = f.x + 10 * f.scalar * Math.cos(f.wobble)),
          (f.wobbleY = f.y + 10 * f.scalar * Math.sin(f.wobble)),
          (f.tiltAngle += 0.1),
          (f.tiltSin = Math.sin(f.tiltAngle)),
          (f.tiltCos = Math.cos(f.tiltAngle)),
          (f.random = Math.random() + 2)));
    var M = f.tick++ / f.totalTicks,
      C = f.x + f.random * f.tiltCos,
      F = f.y + f.random * f.tiltSin,
      L = f.wobbleX + f.random * f.tiltCos,
      _ = f.wobbleY + f.random * f.tiltSin;
    if (
      ((b.fillStyle =
        "rgba(" +
        f.color.r +
        ", " +
        f.color.g +
        ", " +
        f.color.b +
        ", " +
        (1 - M) +
        ")"),
      b.beginPath(),
      o &&
        f.shape.type === "path" &&
        typeof f.shape.path == "string" &&
        Array.isArray(f.shape.matrix))
    )
      b.fill(
        Re(
          f.shape.path,
          f.shape.matrix,
          f.x,
          f.y,
          Math.abs(L - C) * 0.1,
          Math.abs(_ - F) * 0.1,
          (Math.PI / 10) * f.wobble,
        ),
      );
    else if (f.shape.type === "bitmap") {
      var I = (Math.PI / 10) * f.wobble,
        T = Math.abs(L - C) * 0.1,
        B = Math.abs(_ - F) * 0.1,
        K = f.shape.bitmap.width * f.scalar,
        V = f.shape.bitmap.height * f.scalar,
        X = new DOMMatrix([
          Math.cos(I) * T,
          Math.sin(I) * T,
          -Math.sin(I) * B,
          Math.cos(I) * B,
          f.x,
          f.y,
        ]);
      X.multiplySelf(new DOMMatrix(f.shape.matrix));
      var Z = b.createPattern(x.transform(f.shape.bitmap), "no-repeat");
      (Z.setTransform(X),
        (b.globalAlpha = 1 - M),
        (b.fillStyle = Z),
        b.fillRect(f.x - K / 2, f.y - V / 2, K, V),
        (b.globalAlpha = 1));
    } else if (f.shape === "circle")
      b.ellipse
        ? b.ellipse(
            f.x,
            f.y,
            Math.abs(L - C) * f.ovalScalar,
            Math.abs(_ - F) * f.ovalScalar,
            (Math.PI / 10) * f.wobble,
            0,
            2 * Math.PI,
          )
        : P(
            b,
            f.x,
            f.y,
            Math.abs(L - C) * f.ovalScalar,
            Math.abs(_ - F) * f.ovalScalar,
            (Math.PI / 10) * f.wobble,
            0,
            2 * Math.PI,
          );
    else if (f.shape === "star")
      for (
        var U = (Math.PI / 2) * 3,
          te = 4 * f.scalar,
          ie = 8 * f.scalar,
          oe = f.x,
          fe = f.y,
          Me = 5,
          de = Math.PI / Me;
        Me--;
      )
        ((oe = f.x + Math.cos(U) * ie),
          (fe = f.y + Math.sin(U) * ie),
          b.lineTo(oe, fe),
          (U += de),
          (oe = f.x + Math.cos(U) * te),
          (fe = f.y + Math.sin(U) * te),
          b.lineTo(oe, fe),
          (U += de));
    else
      (b.moveTo(Math.floor(f.x), Math.floor(f.y)),
        b.lineTo(Math.floor(f.wobbleX), Math.floor(F)),
        b.lineTo(Math.floor(L), Math.floor(_)),
        b.lineTo(Math.floor(C), Math.floor(f.wobbleY)));
    return (b.closePath(), b.fill(), f.tick < f.totalTicks);
  }
  function W(b, f, M, C, F) {
    var L = f.slice(),
      _ = b.getContext("2d"),
      I,
      T,
      B = u(function (K) {
        function V() {
          ((I = T = null),
            _.clearRect(0, 0, C.width, C.height),
            x.clear(),
            F(),
            K());
        }
        function X() {
          (a &&
            !(C.width === n.width && C.height === n.height) &&
            ((C.width = b.width = n.width), (C.height = b.height = n.height)),
            !C.width &&
              !C.height &&
              (M(b), (C.width = b.width), (C.height = b.height)),
            _.clearRect(0, 0, C.width, C.height),
            (L = L.filter(function (Z) {
              return E(_, Z);
            })),
            L.length ? (I = g.frame(X)) : V());
        }
        ((I = g.frame(X)), (T = V));
      });
    return {
      addFettis: function (K) {
        return ((L = L.concat(K)), B);
      },
      canvas: b,
      promise: B,
      reset: function () {
        (I && g.cancel(I), T && T());
      },
    };
  }
  function J(b, f) {
    var M = !b,
      C = !!v(f || {}, "resize"),
      F = !1,
      L = v(f, "disableForReducedMotion", Boolean),
      _ = l && !!v(f || {}, "useWorker"),
      I = _ ? h() : null,
      T = M ? A : q,
      B = b && I ? !!b.__confetti_initialized : !1,
      K =
        typeof matchMedia == "function" &&
        matchMedia("(prefers-reduced-motion)").matches,
      V;
    function X(U, te, ie) {
      for (
        var oe = v(U, "particleCount", j),
          fe = v(U, "angle", Number),
          Me = v(U, "spread", Number),
          de = v(U, "startVelocity", Number),
          Wr = v(U, "decay", Number),
          Hr = v(U, "gravity", Number),
          Vr = v(U, "drift", Number),
          as = v(U, "colors", N),
          Gr = v(U, "ticks", Number),
          ns = v(U, "shapes"),
          Kr = v(U, "scalar"),
          Xr = !!v(U, "flat"),
          ls = S(U),
          is = oe,
          St = [],
          Yr = b.width * ls.x,
          Qr = b.height * ls.y;
        is--;
      )
        St.push(
          D({
            x: Yr,
            y: Qr,
            angle: fe,
            spread: Me,
            startVelocity: de,
            color: as[is % as.length],
            shape: ns[k(0, ns.length)],
            ticks: Gr,
            decay: Wr,
            gravity: Hr,
            drift: Vr,
            scalar: Kr,
            flat: Xr,
          }),
        );
      return V ? V.addFettis(St) : ((V = W(b, St, T, te, ie)), V.promise);
    }
    function Z(U) {
      var te = L || v(U, "disableForReducedMotion", Boolean),
        ie = v(U, "zIndex", Number);
      if (te && K)
        return u(function (de) {
          de();
        });
      (M && V
        ? (b = V.canvas)
        : M && !b && ((b = ee(ie)), document.body.appendChild(b)),
        C && !B && T(b));
      var oe = { width: b.width, height: b.height };
      (I && !B && I.init(b), (B = !0), I && (b.__confetti_initialized = !0));
      function fe() {
        if (I) {
          var de = {
            getBoundingClientRect: function () {
              if (!M) return b.getBoundingClientRect();
            },
          };
          (T(de),
            I.postMessage({ resize: { width: de.width, height: de.height } }));
          return;
        }
        oe.width = oe.height = null;
      }
      function Me() {
        ((V = null),
          C && ((F = !1), s.removeEventListener("resize", fe)),
          M &&
            b &&
            (document.body.contains(b) && document.body.removeChild(b),
            (b = null),
            (B = !1)));
      }
      return (
        C && !F && ((F = !0), s.addEventListener("resize", fe, !1)),
        I ? I.fire(U, oe, Me) : X(U, oe, Me)
      );
    }
    return (
      (Z.reset = function () {
        (I && I.reset(), V && V.reset());
      }),
      Z
    );
  }
  var Q;
  function Te() {
    return (Q || (Q = J(null, { useWorker: !0, resize: !0 })), Q);
  }
  function Re(b, f, M, C, F, L, _) {
    var I = new Path2D(b),
      T = new Path2D();
    T.addPath(I, new DOMMatrix(f));
    var B = new Path2D();
    return (
      B.addPath(
        T,
        new DOMMatrix([
          Math.cos(_) * F,
          Math.sin(_) * F,
          -Math.sin(_) * L,
          Math.cos(_) * L,
          M,
          C,
        ]),
      ),
      B
    );
  }
  function Ne(b) {
    if (!o) throw new Error("path confetti are not supported in this browser");
    var f, M;
    typeof b == "string" ? (f = b) : ((f = b.path), (M = b.matrix));
    var C = new Path2D(f),
      F = document.createElement("canvas"),
      L = F.getContext("2d");
    if (!M) {
      for (var _ = 1e3, I = _, T = _, B = 0, K = 0, V, X, Z = 0; Z < _; Z += 2)
        for (var U = 0; U < _; U += 2)
          L.isPointInPath(C, Z, U, "nonzero") &&
            ((I = Math.min(I, Z)),
            (T = Math.min(T, U)),
            (B = Math.max(B, Z)),
            (K = Math.max(K, U)));
      ((V = B - I), (X = K - T));
      var te = 10,
        ie = Math.min(te / V, te / X);
      M = [
        ie,
        0,
        0,
        ie,
        -Math.round(V / 2 + I) * ie,
        -Math.round(X / 2 + T) * ie,
      ];
    }
    return { type: "path", path: f, matrix: M };
  }
  function we(b) {
    var f,
      M = 1,
      C = "#000000",
      F =
        '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';
    typeof b == "string"
      ? (f = b)
      : ((f = b.text),
        (M = "scalar" in b ? b.scalar : M),
        (F = "fontFamily" in b ? b.fontFamily : F),
        (C = "color" in b ? b.color : C));
    var L = 10 * M,
      _ = "" + L + "px " + F,
      I = new OffscreenCanvas(L, L),
      T = I.getContext("2d");
    T.font = _;
    var B = T.measureText(f),
      K = Math.ceil(B.actualBoundingBoxRight + B.actualBoundingBoxLeft),
      V = Math.ceil(B.actualBoundingBoxAscent + B.actualBoundingBoxDescent),
      X = 2,
      Z = B.actualBoundingBoxLeft + X,
      U = B.actualBoundingBoxAscent + X;
    ((K += X + X),
      (V += X + X),
      (I = new OffscreenCanvas(K, V)),
      (T = I.getContext("2d")),
      (T.font = _),
      (T.fillStyle = C),
      T.fillText(f, Z, U));
    var te = 1 / M;
    return {
      type: "bitmap",
      bitmap: I.transferToImageBitmap(),
      matrix: [te, 0, 0, te, (-K * te) / 2, (-V * te) / 2],
    };
  }
  ((r.exports = function () {
    return Te().apply(this, arguments);
  }),
    (r.exports.reset = function () {
      Te().reset();
    }),
    (r.exports.create = J),
    (r.exports.shapeFromPath = Ne),
    (r.exports.shapeFromText = we));
})(
  (function () {
    return typeof window < "u" ? window : typeof self < "u" ? self : this || {};
  })(),
  Qt,
  !1,
);
const Jn = Qt.exports;
Qt.exports.create;
const ur = c.createContext(null);
function el({ children: t }) {
  const [s, r] = c.useState(1),
    [a, n] = c.useState({
      name: "",
      phone: "",
      email: "",
      address: "",
      apartment: "",
      entrance: "",
      floor: "",
      intercom: "",
    }),
    [l, o] = c.useState(null),
    [d, i] = c.useState(null),
    [u, x] = c.useState(""),
    { cartItems: g } = ye(),
    h = g.reduce((v, j) => v + j.price * j.quantity, 0),
    m = l?.price || 0,
    p = d?.price || 0,
    y = h + m + p;
  return e.jsx(ur.Provider, {
    value: {
      step: s,
      setStep: r,
      formData: a,
      setFormData: n,
      selectedDelivery: l,
      setSelectedDelivery: o,
      selectedGift: d,
      setSelectedGift: i,
      customerNote: u,
      setCustomerNote: x,
      subtotal: h,
      totalAmount: y,
      deliveryPrice: m,
      giftPrice: p,
    },
    children: t,
  });
}
function ze() {
  const t = c.useContext(ur);
  if (!t) throw new Error("useCheckout must be used inside CheckoutProvider");
  return t;
}
function tl(t, s = 350) {
  const [r, a] = c.useState(t);
  return (
    c.useEffect(() => {
      const n = setTimeout(() => a(t), s);
      return () => clearTimeout(n);
    }, [t, s]),
    r
  );
}
function sl({ value: t, onChange: s, apiUrl: r }) {
  const [a, n] = c.useState([]),
    [l, o] = c.useState(!1),
    [d, i] = c.useState(!1),
    u = c.useRef(null),
    x = tl(t, 350);
  (c.useEffect(() => {
    const h = (m) => {
      u.current && (u.current.contains(m.target) || o(!1));
    };
    return (
      document.addEventListener("mousedown", h),
      () => document.removeEventListener("mousedown", h)
    );
  }, []),
    c.useEffect(() => {
      let h = !0;
      async function m() {
        const p = (x ?? "").trim();
        if (p.length < 3) {
          n([]);
          return;
        }
        i(!0);
        try {
          const v = await (
            await fetch(`${r}/suggest/address`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({ query: p, count: 8 }),
            })
          ).json();
          if (!h) return;
          (n(Array.isArray(v?.suggestions) ? v.suggestions : []), o(!0));
        } catch {
          if (!h) return;
          n([]);
        } finally {
          h && i(!1);
        }
      }
      return (
        m(),
        () => {
          h = !1;
        }
      );
    }, [x, r]));
  const g = l && (d || a.length > 0);
  return e.jsxs("div", {
    ref: u,
    className: "relative",
    children: [
      e.jsx("input", {
        type: "text",
        value: t,
        onChange: (h) => {
          (s(h.target.value), o(!0));
        },
        onFocus: () => t.trim().length >= 3 && o(!0),
        className:
          "w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#ff398b] focus:ring-4 focus:ring-pink-100 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-pink-200 text-gray-900 placeholder-gray-400",
        placeholder: "Город, улица, дом",
        autoComplete: "off",
      }),
      g &&
        e.jsxs("div", {
          className:
            "absolute z-50 mt-2 w-full max-h-80 overflow-y-auto custom-scroll rounded-2xl border border-gray-200 bg-white shadow-xl",
          children: [
            d &&
              e.jsx("div", {
                className: "px-4 py-3 text-sm text-gray-500",
                children: "Поиск адреса…",
              }),
            !d &&
              a.map((h, m) =>
                e.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      (s(h.unrestricted_value || h.value), o(!1), n([]));
                    },
                    className:
                      "w-full text-left px-4 py-3 text-sm hover:bg-pink-50",
                    children: [
                      e.jsx("div", {
                        className: "font-medium text-gray-900",
                        children: h.value,
                      }),
                      h.unrestricted_value &&
                        h.unrestricted_value !== h.value &&
                        e.jsx("div", {
                          className: "text-xs text-gray-500 mt-0.5",
                          children: h.unrestricted_value,
                        }),
                    ],
                  },
                  `${h.value}-${m}`,
                ),
              ),
          ],
        }),
    ],
  });
}
const rl = () => {
  const { formData: t, setFormData: s } = ze(),
    { user: r } = xe(),
    [a, n] = c.useState([]),
    [l, o] = c.useState("");
  c.useEffect(() => {
    let i = !0;
    return (
      (async () => {
        if (!r?.id) {
          n([]);
          return;
        }
        try {
          const x = await z.get("/auth/me/addresses");
          if (!i) return;
          n(x ?? []);
        } catch {
          if (!i) return;
          n([]);
        }
      })(),
      () => {
        i = !1;
      }
    );
  }, [r?.id]);
  const d = (i) => {
    o(i);
    const u = a.find((x) => String(x.id) === i);
    u &&
      s((x) => ({
        ...x,
        name: u.recipientName || x.name,
        phone: u.recipientPhone || x.phone,
        address: u.fullAddress || x.address,
        apartment: u.apartment || "",
        entrance: u.entrance || "",
        floor: u.floor || "",
        intercom: u.intercom || "",
      }));
  };
  return e.jsxs("div", {
    className: "space-y-6 sm:space-y-8",
    children: [
      e.jsxs("div", {
        className: "text-center mb-6 sm:mb-10",
        children: [
          e.jsx("div", {
            className:
              "inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 bg-linear-to-br from-[#ff398b] to-pink-500 rounded-2xl mb-4 shadow-lg shadow-pink-200/50",
            children: e.jsx(Fe, {
              className: "w-7 h-7 sm:w-10 sm:h-10 text-white",
            }),
          }),
          e.jsx("h2", {
            className: "text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2",
            children: "Адрес доставки",
          }),
          e.jsx("p", {
            className: "text-gray-600 text-base sm:text-lg",
            children: "Расскажите, куда доставить сладости",
          }),
        ],
      }),
      e.jsxs("div", {
        className: "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6",
        children: [
          a.length > 0 &&
            e.jsxs("div", {
              className: "md:col-span-2",
              children: [
                e.jsx("label", {
                  className: "block text-sm font-semibold text-gray-700 mb-3",
                  children: "Сохранённые адреса",
                }),
                e.jsxs("select", {
                  value: l,
                  onChange: (i) => d(i.target.value),
                  className:
                    "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-200",
                  children: [
                    e.jsx("option", { value: "", children: "Выберите адрес" }),
                    a.map((i) =>
                      e.jsx(
                        "option",
                        {
                          value: i.id,
                          children: (i.label || "Адрес") + ": " + i.fullAddress,
                        },
                        i.id,
                      ),
                    ),
                  ],
                }),
              ],
            }),
          e.jsxs("div", {
            className: "md:col-span-2 group",
            children: [
              e.jsx("label", {
                className: "block text-sm font-semibold text-gray-700 mb-3",
                children: e.jsxs("span", {
                  className: "flex items-center gap-2",
                  children: [
                    e.jsx("div", {
                      className:
                        "p-1.5 bg-pink-100 rounded-lg group-focus-within:bg-pink-200 transition-colors",
                      children: e.jsx(Gt, {
                        className: "w-4 h-4 text-[#ff398b]",
                      }),
                    }),
                    e.jsx("span", { children: "Адрес доставки" }),
                  ],
                }),
              }),
              e.jsx(sl, {
                apiUrl: Ee,
                value: t.address,
                onChange: (i) => s((u) => ({ ...u, address: i })),
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
function mr() {
  return z.get("/orders/options");
}
const al = {
    1: e.jsx(vn, { className: "w-5 h-5" }),
    2: e.jsx(Qe, { className: "w-5 h-5" }),
    3: e.jsx(ft, { className: "w-5 h-5" }),
  },
  nl = () => {
    const { selectedDelivery: t, setSelectedDelivery: s } = ze(),
      [r, a] = c.useState([]),
      [n, l] = c.useState(!0),
      [o, d] = c.useState("");
    return (
      c.useEffect(() => {
        let i = !1;
        return (
          mr()
            .then((u) => {
              i ||
                a(
                  u.delivery
                    .filter((x) => x.available !== !1)
                    .map((x) => ({
                      id: x.id,
                      name: x.name,
                      description: x.description,
                      price: x.price,
                      time: x.time ?? "",
                      icon: al[x.id] ?? e.jsx(Qe, { className: "w-5 h-5" }),
                    })),
                );
            })
            .catch(() => {
              i || d("Не удалось загрузить способы доставки");
            })
            .finally(() => {
              i || l(!1);
            }),
          () => {
            i = !0;
          }
        );
      }, []),
      e.jsxs("div", {
        className: "space-y-6 sm:space-y-8",
        children: [
          e.jsxs("div", {
            className: "text-center mb-6 sm:mb-10",
            children: [
              e.jsx("div", {
                className:
                  "inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 bg-linear-to-br from-blue-500 to-purple-500 rounded-2xl mb-4 shadow-lg shadow-purple-200/50",
                children: e.jsx(Qe, {
                  className: "w-7 h-7 sm:w-10 sm:h-10 text-white",
                }),
              }),
              e.jsx("h2", {
                className:
                  "text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2",
                children: "Способ доставки",
              }),
              e.jsx("p", {
                className: "text-gray-600 text-base sm:text-lg",
                children: "Как быстро хотите получить сладости?",
              }),
            ],
          }),
          o &&
            e.jsx("div", {
              className:
                "rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700",
              children: o,
            }),
          e.jsxs("div", {
            className: "grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5",
            children: [
              n &&
                [1, 2, 3].map((i) =>
                  e.jsx(
                    "div",
                    {
                      className:
                        "h-48 animate-pulse rounded-2xl border-2 border-gray-100 bg-gray-50",
                    },
                    i,
                  ),
                ),
              r.map((i) =>
                e.jsxs(
                  "button",
                  {
                    onClick: () => s(i),
                    className: `group relative p-4 sm:p-6 rounded-2xl border-2 transition-all duration-300 text-left overflow-hidden ${t?.id === i.id ? "border-[#ff398b] bg-linear-to-br from-pink-50 via-purple-50/30 to-rose-50 shadow-xl shadow-pink-200/50 scale-105" : "border-gray-200 hover:border-pink-300 hover:shadow-lg bg-white/80 backdrop-blur-sm"}`,
                    children: [
                      t?.id === i.id &&
                        e.jsx("div", {
                          className:
                            "absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-[#ff398b]/10 to-transparent rounded-bl-full",
                        }),
                      e.jsxs("div", {
                        className: "relative z-10",
                        children: [
                          e.jsxs("div", {
                            className: "flex items-center gap-3 mb-4",
                            children: [
                              e.jsx("div", {
                                className: `p-3 rounded-xl transition-all duration-300 ${t?.id === i.id ? "bg-linear-to-br from-[#ff398b] to-pink-500 text-white shadow-lg shadow-pink-300/50" : "bg-gray-100 text-gray-600 group-hover:bg-pink-100 group-hover:text-[#ff398b]"}`,
                                children: i.icon,
                              }),
                              e.jsx("h3", {
                                className:
                                  "font-bold text-base sm:text-lg text-gray-900",
                                children: i.name,
                              }),
                            ],
                          }),
                          e.jsx("p", {
                            className:
                              "text-gray-600 mb-4 text-sm leading-relaxed",
                            children: i.description,
                          }),
                          e.jsxs("div", {
                            className:
                              "flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-gray-100",
                            children: [
                              e.jsx("span", {
                                className:
                                  "text-sm font-semibold text-gray-700",
                                children: i.time,
                              }),
                              e.jsxs("span", {
                                className: `font-bold text-lg transition-colors ${t?.id === i.id ? "text-[#ff398b]" : "text-gray-700"}`,
                                children: [i.price, " ₽"],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  },
                  i.id,
                ),
              ),
            ],
          }),
        ],
      })
    );
  },
  ll = {
    1: e.jsx(_t, { className: "w-5 h-5" }),
    2: e.jsx(Oa, { className: "w-5 h-5" }),
    3: e.jsx(Fe, { className: "w-5 h-5" }),
    4: e.jsx(mn, { className: "w-5 h-5" }),
  },
  il = () => {
    const {
        selectedGift: t,
        setSelectedGift: s,
        customerNote: r,
        setCustomerNote: a,
      } = ze(),
      [n, l] = c.useState([]),
      [o, d] = c.useState(!0),
      [i, u] = c.useState("");
    return (
      c.useEffect(() => {
        let x = !1;
        return (
          mr()
            .then((g) => {
              x ||
                l(
                  g.gifts.map((h) => ({
                    id: h.id,
                    name: h.name,
                    description: h.description,
                    price: h.price,
                    icon: ll[h.id] ?? e.jsx(_t, { className: "w-5 h-5" }),
                    available: h.available !== !1,
                  })),
                );
            })
            .catch(() => {
              x || u("Не удалось загрузить дополнительные опции");
            })
            .finally(() => {
              x || d(!1);
            }),
          () => {
            x = !0;
          }
        );
      }, []),
      e.jsxs("div", {
        className: "space-y-6 sm:space-y-8",
        children: [
          e.jsxs("div", {
            className: "text-center mb-6 sm:mb-10",
            children: [
              e.jsx("div", {
                className:
                  "inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 bg-linear-to-br from-amber-400 to-orange-500 rounded-2xl mb-4 shadow-lg shadow-amber-200/50",
                children: e.jsx(_t, {
                  className: "w-7 h-7 sm:w-10 sm:h-10 text-white",
                }),
              }),
              e.jsx("h2", {
                className:
                  "text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2",
                children: "Дополнительные опции",
              }),
              e.jsx("p", {
                className: "text-gray-600 text-base sm:text-lg",
                children: "Добавьте магии в вашу коробку сладостей",
              }),
            ],
          }),
          i &&
            e.jsx("div", {
              className:
                "rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700",
              children: i,
            }),
          e.jsxs("div", {
            className:
              "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5",
            children: [
              o &&
                [1, 2, 3, 4].map((x) =>
                  e.jsx(
                    "div",
                    {
                      className:
                        "h-48 animate-pulse rounded-2xl border-2 border-gray-100 bg-gray-50",
                    },
                    x,
                  ),
                ),
              n.map((x) =>
                e.jsxs(
                  "button",
                  {
                    onClick: () => x.available && s(x),
                    className: `group relative p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 overflow-hidden ${t?.id === x.id ? "border-[#ff398b] bg-linear-to-br from-pink-50 via-amber-50/30 to-orange-50 shadow-xl shadow-pink-200/50 scale-105" : x.available ? "border-gray-200 hover:border-pink-300 hover:shadow-lg bg-white/80 backdrop-blur-sm" : "border-gray-200 opacity-50 cursor-not-allowed bg-gray-50"}`,
                    disabled: !x.available,
                    children: [
                      t?.id === x.id &&
                        e.jsx("div", {
                          className:
                            "absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-[#ff398b]/10 to-transparent rounded-bl-full",
                        }),
                      e.jsxs("div", {
                        className: "relative z-10",
                        children: [
                          e.jsxs("div", {
                            className: "flex items-center gap-3 mb-3",
                            children: [
                              e.jsx("div", {
                                className: `p-2.5 rounded-xl transition-all duration-300 ${t?.id === x.id ? "bg-linear-to-br from-[#ff398b] to-pink-500 text-white shadow-lg shadow-pink-300/50" : x.available ? "bg-gray-100 text-gray-600 group-hover:bg-pink-100 group-hover:text-[#ff398b]" : "bg-gray-100 text-gray-400"}`,
                                children: x.icon,
                              }),
                              e.jsx("h3", {
                                className:
                                  "font-semibold text-sm text-gray-900 leading-tight",
                                children: x.name,
                              }),
                            ],
                          }),
                          e.jsx("p", {
                            className:
                              "text-xs text-gray-600 mb-4 leading-relaxed",
                            children: x.description,
                          }),
                          e.jsx("div", {
                            className:
                              "text-right pt-3 border-t border-gray-100",
                            children: e.jsxs("span", {
                              className: `font-bold text-lg transition-colors ${t?.id === x.id ? "text-[#ff398b]" : "text-gray-700"}`,
                              children: ["+", x.price, " ₽"],
                            }),
                          }),
                        ],
                      }),
                    ],
                  },
                  x.id,
                ),
              ),
            ],
          }),
          e.jsxs("div", {
            className: "group",
            children: [
              e.jsx("label", {
                className: "block text-sm font-semibold text-gray-700 mb-3",
                children: e.jsxs("span", {
                  className: "flex items-center gap-2",
                  children: [
                    e.jsx("div", {
                      className:
                        "p-1.5 bg-pink-100 rounded-lg group-focus-within:bg-pink-200 transition-colors",
                      children: e.jsx(Qs, {
                        className: "w-4 h-4 text-[#ff398b]",
                      }),
                    }),
                    e.jsx("span", { children: "Ваши пожелания к заказу" }),
                  ],
                }),
              }),
              e.jsx("textarea", {
                value: r,
                onChange: (x) => a(x.target.value),
                className:
                  "w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 rounded-2xl focus:border-[#ff398b] focus:ring-4 focus:ring-pink-100 transition-all duration-300 h-32 bg-white/50 backdrop-blur-sm hover:border-pink-200 text-gray-900 placeholder-gray-400 resize-none",
                placeholder:
                  "Напишите здесь ваши пожелания, аллергии, особые указания...",
              }),
            ],
          }),
        ],
      })
    );
  },
  ol = () => {
    const { cartItems: t } = ye(),
      {
        selectedGift: s,
        selectedDelivery: r,
        subtotal: a,
        totalAmount: n,
        deliveryPrice: l,
        giftPrice: o,
      } = ze(),
      d = {
        milka: "Milka",
        raffaello: "Raffaello",
        kinder: "Kinder",
        ferrero: "Ferrero",
        merci: "Merci",
      },
      i = (u) =>
        (u?.length &&
          u
            .filter((g) => g.percentage > 0)
            .map((g) => `${d[g.candyId] ?? g.candyId} ${g.percentage}%`)
            .join(", ")) ||
        "внутренний слой не указан";
    return e.jsxs("div", {
      className: "space-y-6 sm:space-y-8",
      children: [
        e.jsxs("div", {
          className: "text-center",
          children: [
            e.jsx("div", {
              className:
                "inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 bg-linear-to-br from-green-400 to-emerald-500 rounded-2xl mb-4 shadow-lg shadow-green-200/50",
              children: e.jsx(Ye, {
                className: "w-7 h-7 sm:w-10 sm:h-10 text-white",
              }),
            }),
            e.jsx("h2", {
              className:
                "text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2",
              children: "Проверьте заказ",
            }),
            e.jsx("p", {
              className: "text-gray-600 text-base sm:text-lg",
              children: "Убедитесь, что всё верно перед оформлением",
            }),
          ],
        }),
        e.jsxs("div", {
          className:
            "relative bg-linear-to-br from-pink-50/80 via-purple-50/30 to-amber-50/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border-2 border-pink-200/50 shadow-xl overflow-hidden",
          children: [
            e.jsx("div", {
              className:
                "absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-[#ff398b]/5 to-transparent rounded-bl-full",
            }),
            e.jsx("div", {
              className:
                "absolute bottom-0 left-0 w-48 h-48 bg-linear-to-tr from-purple-400/5 to-transparent rounded-tr-full",
            }),
            e.jsx("div", {
              className:
                "absolute -top-4 left-1/2 transform -translate-x-1/2 z-10",
              children: e.jsx("div", {
                className:
                  "bg-linear-to-r from-[#ff398b] to-pink-500 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg shadow-pink-300/50",
                children: "🍬 Ваша коробка конфет 🍬",
              }),
            }),
            e.jsxs("div", {
              className:
                "grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-10 mt-6 sm:mt-4",
              children: [
                e.jsxs("div", {
                  children: [
                    e.jsxs("h3", {
                      className:
                        "font-bold text-lg sm:text-xl mb-4 sm:mb-6 flex items-center gap-3",
                      children: [
                        e.jsx("div", {
                          className:
                            "p-2 bg-linear-to-br from-[#ff398b] to-pink-500 rounded-xl shadow-lg shadow-pink-300/50",
                          children: e.jsx(ge, {
                            className: "w-5 h-5 text-white",
                          }),
                        }),
                        e.jsx("span", {
                          className: "text-gray-900",
                          children: "Содержимое заказа",
                        }),
                      ],
                    }),
                    e.jsx("div", {
                      className: "space-y-4",
                      children: t.map((u, x) =>
                        e.jsxs(
                          "div",
                          {
                            className:
                              "flex flex-col min-[420px]:flex-row min-[420px]:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-pink-100/50 hover:shadow-md transition-all",
                            children: [
                              e.jsx("div", {
                                className:
                                  "w-12 h-12 sm:w-14 sm:h-14 bg-linear-to-br from-pink-200 to-rose-200 rounded-xl flex shrink-0 items-center justify-center text-xl sm:text-2xl shadow-md",
                                children: u.isCustom
                                  ? "🎁"
                                  : x % 3 === 0
                                    ? "🍰"
                                    : x % 3 === 1
                                      ? "🍬"
                                      : "🎂",
                              }),
                              e.jsxs("div", {
                                className: "flex-1 min-w-0",
                                children: [
                                  e.jsx("div", {
                                    className: "font-semibold text-gray-900",
                                    children: u.name,
                                  }),
                                  e.jsxs("div", {
                                    className: "text-sm text-gray-600 mt-1",
                                    children: [
                                      u.quantity,
                                      " × ",
                                      u.price.toLocaleString(),
                                      " ₽",
                                    ],
                                  }),
                                  u.customConfig &&
                                    e.jsx("div", {
                                      className: "mt-1 text-xs text-[#ff398b]",
                                      children:
                                        u.customConfig.type === "custom_cake"
                                          ? `Индивидуальный торт: ${u.customConfig.base}, ${u.customConfig.size.toUpperCase()}, ${i(u.customConfig.innerLayer)}, ${u.customConfig.packaging}`
                                          : `Индивидуальный конфетный торт: ${u.customConfig.candies.reduce((g, h) => g + h.quantity, 0)} конфет`,
                                    }),
                                ],
                              }),
                              e.jsxs("div", {
                                className:
                                  "font-bold text-base sm:text-lg text-[#ff398b]",
                                children: [
                                  (u.price * u.quantity).toLocaleString(),
                                  " ₽",
                                ],
                              }),
                            ],
                          },
                          u.id,
                        ),
                      ),
                    }),
                    s &&
                      e.jsx("div", {
                        className:
                          "mt-6 p-4 sm:p-5 bg-linear-to-r from-pink-100/70 to-amber-100/70 backdrop-blur-sm rounded-xl border border-pink-200/50 shadow-md",
                        children: e.jsxs("div", {
                          className:
                            "flex flex-col min-[420px]:flex-row min-[420px]:items-center gap-4",
                          children: [
                            e.jsx("div", {
                              className:
                                "p-3 bg-linear-to-br from-[#ff398b] to-pink-500 text-white rounded-xl shadow-lg",
                              children: s.icon,
                            }),
                            e.jsxs("div", {
                              className: "flex-1",
                              children: [
                                e.jsx("div", {
                                  className: "font-semibold text-gray-900",
                                  children: s.name,
                                }),
                                e.jsx("div", {
                                  className: "text-sm text-gray-600 mt-1",
                                  children: s.description,
                                }),
                              ],
                            }),
                            e.jsxs("div", {
                              className: "font-bold text-lg text-[#ff398b]",
                              children: ["+", s.price, " ₽"],
                            }),
                          ],
                        }),
                      }),
                  ],
                }),
                e.jsxs("div", {
                  children: [
                    e.jsxs("h3", {
                      className:
                        "font-bold text-lg sm:text-xl mb-4 sm:mb-6 flex items-center gap-3",
                      children: [
                        e.jsx("div", {
                          className:
                            "p-2 bg-linear-to-br from-blue-500 to-purple-500 rounded-xl shadow-lg shadow-purple-300/50",
                          children: e.jsx(Qe, {
                            className: "w-5 h-5 text-white",
                          }),
                        }),
                        e.jsx("span", {
                          className: "text-gray-900",
                          children: "Доставка",
                        }),
                      ],
                    }),
                    r &&
                      e.jsxs("div", {
                        className:
                          "p-4 sm:p-5 bg-white/60 backdrop-blur-sm rounded-xl border border-pink-100/50 shadow-md mb-6",
                        children: [
                          e.jsxs("div", {
                            className: "flex items-center gap-4 mb-4",
                            children: [
                              e.jsx("div", {
                                className:
                                  "p-3 bg-linear-to-br from-[#ff398b] to-pink-500 text-white rounded-xl shadow-lg",
                                children: r.icon,
                              }),
                              e.jsxs("div", {
                                className: "flex-1",
                                children: [
                                  e.jsx("div", {
                                    className: "font-semibold text-gray-900",
                                    children: r.name,
                                  }),
                                  e.jsx("div", {
                                    className: "text-sm text-gray-600 mt-1",
                                    children: r.time,
                                  }),
                                ],
                              }),
                            ],
                          }),
                          e.jsxs("div", {
                            className:
                              "text-right font-bold text-xl text-[#ff398b] pt-4 border-t border-gray-200",
                            children: [r.price, " ₽"],
                          }),
                        ],
                      }),
                    e.jsxs("div", {
                      className:
                        "p-4 sm:p-6 bg-linear-to-br from-blue-50/80 via-purple-50/50 to-cyan-50/80 backdrop-blur-sm rounded-2xl border-2 border-blue-200/50 shadow-xl",
                      children: [
                        e.jsxs("h4", {
                          className:
                            "font-bold text-lg sm:text-xl mb-5 flex items-center gap-3",
                          children: [
                            e.jsx("div", {
                              className:
                                "p-2 bg-linear-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg",
                              children: e.jsx(ut, {
                                className: "w-5 h-5 text-white",
                              }),
                            }),
                            e.jsx("span", {
                              className: "text-gray-900",
                              children: "Итоговая сумма",
                            }),
                          ],
                        }),
                        e.jsxs("div", {
                          className: "space-y-3",
                          children: [
                            e.jsxs("div", {
                              className: "flex justify-between text-gray-700",
                              children: [
                                e.jsx("span", { children: "Товары:" }),
                                e.jsxs("span", {
                                  className: "font-semibold",
                                  children: [a.toLocaleString(), " ₽"],
                                }),
                              ],
                            }),
                            e.jsxs("div", {
                              className: "flex justify-between text-gray-700",
                              children: [
                                e.jsx("span", { children: "Доставка:" }),
                                e.jsxs("span", {
                                  className: "font-semibold",
                                  children: [l.toLocaleString(), " ₽"],
                                }),
                              ],
                            }),
                            s &&
                              e.jsxs("div", {
                                className: "flex justify-between text-gray-700",
                                children: [
                                  e.jsx("span", { children: "Доп. опции:" }),
                                  e.jsxs("span", {
                                    className: "font-semibold",
                                    children: [o.toLocaleString(), " ₽"],
                                  }),
                                ],
                              }),
                            e.jsx("div", {
                              className: "border-t-2 border-gray-300 pt-4 mt-4",
                              children: e.jsxs("div", {
                                className:
                                  "flex flex-col min-[420px]:flex-row min-[420px]:justify-between gap-1 text-xl sm:text-2xl font-extrabold bg-linear-to-r from-[#ff398b] to-pink-600 bg-clip-text text-transparent",
                                children: [
                                  e.jsx("span", { children: "Итого:" }),
                                  e.jsxs("span", {
                                    className: "text-[#ff398b]",
                                    children: [n.toLocaleString(), " ₽"],
                                  }),
                                ],
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    });
  };
function cl() {
  const { cartCount: t, refreshCart: s, clearCart: r, cartItems: a } = ye(),
    [n, l] = c.useState(1),
    [o, d] = c.useState(!1),
    {
      selectedDelivery: i,
      selectedGift: u,
      totalAmount: x,
      customerNote: g,
    } = ze(),
    [h, m] = c.useState(!1),
    [p, y] = c.useState(""),
    [v, j] = c.useState(null),
    [k, w] = c.useState(null),
    N = c.useRef(null),
    { user: $ } = xe(),
    S = $?.id,
    { formData: A } = ze(),
    q = () => {
      Jn({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ff398b", "#ff6ba9", "#ff9ec0", "#ffcfe0", "#fff"],
      });
    },
    ee = async () => {
      if ((y(""), !i)) {
        y("Выберите способ доставки");
        return;
      }
      if (!S) {
        y("Нужно войти в аккаунт перед оплатой");
        return;
      }
      if (!a.length) {
        y("Корзина пуста");
        return;
      }
      m(!0);
      try {
        N.current ||
          (N.current =
            typeof crypto < "u" && "randomUUID" in crypto
              ? crypto.randomUUID()
              : `order-${S}-${Date.now()}`);
        const E = await z.post(
          `/orders/${S}`,
          {
            fullName: A.name,
            phone: A.phone,
            address: A.address,
            apartment: A.apartment,
            entrance: A.entrance,
            floor: A.floor,
            intercom: A.intercom,
            comment: g.trim() || void 0,
            currency: "RUB",
            deliveryOptionId: i.id,
            giftOptionId: u?.id,
          },
          { headers: { "Idempotency-Key": N.current } },
        );
        (j(E.id), w(E.publicOrderNumber ?? null));
        const W = await z.post(`/payments/orders/${E.id}/yookassa`, void 0, {
          headers: { "Idempotency-Key": `order-${E.id}-yookassa` },
        });
        if (W.confirmationUrl) {
          window.location.href = W.confirmationUrl;
          return;
        }
        W.status === "SUCCEEDED"
          ? (q(), d(!0), r(), s())
          : y("Платеж создан, но ссылка на оплату не получена");
      } catch (E) {
        y(E instanceof ne ? E.message : "Не удалось создать заказ/платеж");
      } finally {
        m(!1);
      }
    },
    P = A.address,
    D = () =>
      e.jsxs("div", {
        className: "text-center py-20",
        children: [
          e.jsxs("div", {
            className: "relative inline-block mb-10",
            children: [
              e.jsx("div", {
                className:
                  "w-40 h-40 bg-linear-to-br from-green-400 via-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse shadow-2xl shadow-green-300/50",
                children: e.jsx(Ye, { className: "w-24 h-24 text-white" }),
              }),
              e.jsx("div", {
                className: "absolute -top-4 -right-4 animate-bounce",
                children: e.jsx(Fe, {
                  className: "w-12 h-12 text-yellow-400 drop-shadow-lg",
                }),
              }),
              e.jsx("div", {
                className:
                  "absolute -bottom-2 -left-4 animate-bounce delay-300",
                children: e.jsx(Fe, {
                  className: "w-10 h-10 text-pink-400 drop-shadow-lg",
                }),
              }),
            ],
          }),
          e.jsx("h2", {
            className:
              "text-5xl font-extrabold bg-linear-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent mb-4",
            children: "🎉 Заказ создан!",
          }),
          e.jsx("p", {
            className:
              "text-xl text-gray-600 mb-10 max-w-lg mx-auto leading-relaxed",
            children:
              "Ваша волшебная коробка конфет уже собирается нашими кондитерами!",
          }),
          e.jsxs("div", {
            className: "space-y-8 max-w-2xl mx-auto",
            children: [
              e.jsxs("div", {
                className:
                  "p-6 bg-linear-to-r from-green-50/80 via-emerald-50/80 to-teal-50/80 backdrop-blur-sm rounded-2xl border-2 border-green-200/50 shadow-xl",
                children: [
                  e.jsxs("div", {
                    className: "font-bold text-2xl text-green-800 mb-3",
                    children: ["Номер заказа:", " ", k ?? `#${v ?? "—"}`],
                  }),
                  e.jsx("p", {
                    className: "text-green-700 text-lg",
                    children:
                      "Ожидайте звонка от нашего курьера в течение 30 минут",
                  }),
                ],
              }),
              e.jsxs("div", {
                className: "grid grid-cols-1 md:grid-cols-3 gap-5",
                children: [
                  e.jsxs("div", {
                    className:
                      "p-6 bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-pink-100/50 shadow-lg hover:shadow-xl transition-all hover:scale-105",
                    children: [
                      e.jsx("div", {
                        className:
                          "p-3 bg-linear-to-br from-[#ff398b] to-pink-500 rounded-xl w-fit mx-auto mb-4 shadow-md",
                        children: e.jsx(ft, {
                          className: "w-8 h-8 text-white",
                        }),
                      }),
                      e.jsx("div", {
                        className: "font-bold text-gray-900 mb-2",
                        children: "Доставка",
                      }),
                      e.jsx("div", {
                        className: "text-sm text-gray-600",
                        children: i?.time,
                      }),
                    ],
                  }),
                  e.jsxs("div", {
                    className:
                      "p-6 bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-pink-100/50 shadow-lg hover:shadow-xl transition-all hover:scale-105",
                    children: [
                      e.jsx("div", {
                        className:
                          "p-3 bg-linear-to-br from-[#ff398b] to-pink-500 rounded-xl w-fit mx-auto mb-4 shadow-md",
                        children: e.jsx(ge, {
                          className: "w-8 h-8 text-white",
                        }),
                      }),
                      e.jsx("div", {
                        className: "font-bold text-gray-900 mb-2",
                        children: "Сборка",
                      }),
                      e.jsx("div", {
                        className: "text-sm text-gray-600",
                        children: "Начинается сейчас",
                      }),
                    ],
                  }),
                  e.jsxs("div", {
                    className:
                      "p-6 bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-pink-100/50 shadow-lg hover:shadow-xl transition-all hover:scale-105",
                    children: [
                      e.jsx("div", {
                        className:
                          "p-3 bg-linear-to-br from-[#ff398b] to-pink-500 rounded-xl w-fit mx-auto mb-4 shadow-md",
                        children: e.jsx(Qs, {
                          className: "w-8 h-8 text-white",
                        }),
                      }),
                      e.jsx("div", {
                        className: "font-bold text-gray-900 mb-2",
                        children: "СМС уведомление",
                      }),
                      e.jsxs("div", {
                        className: "text-sm text-gray-600",
                        children: ["Отправили на ", A.phone],
                      }),
                    ],
                  }),
                ],
              }),
              e.jsx("div", {
                className: "pt-8",
                children: e.jsxs(G, {
                  to: "/",
                  className:
                    "group inline-flex items-center gap-3 px-10 py-5 bg-linear-to-r from-[#ff398b] via-pink-500 to-purple-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-pink-400/50 transform hover:scale-105 active:scale-95 transition-all duration-300",
                  children: [
                    "Вернуться в магазин",
                    e.jsx(hs, {
                      className:
                        "w-6 h-6 group-hover:translate-x-1 transition-transform",
                    }),
                  ],
                }),
              }),
            ],
          }),
        ],
      });
  return e.jsxs("div", {
    className:
      "min-h-screen bg-linear-to-br from-pink-50 via-purple-50/30 to-rose-50 relative overflow-x-hidden",
    children: [
      e.jsxs("div", {
        className: "absolute inset-0 overflow-hidden pointer-events-none",
        children: [
          e.jsx("div", {
            className:
              "absolute top-0 left-1/4 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl animate-pulse",
          }),
          e.jsx("div", {
            className:
              "absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000",
          }),
        ],
      }),
      e.jsxs("div", {
        className:
          "container mx-auto px-4 py-5 sm:py-8 max-w-6xl relative z-10",
        children: [
          e.jsxs("div", {
            className:
              "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8",
            children: [
              e.jsxs(G, {
                to: "/cart",
                className:
                  "group flex items-center gap-2 text-gray-700 hover:text-[#ff398b] transition-all duration-300 font-medium",
                children: [
                  e.jsx(xs, {
                    className:
                      "w-5 h-5 group-hover:-translate-x-1 transition-transform",
                  }),
                  e.jsx("span", { children: "Назад к корзине" }),
                ],
              }),
              e.jsx("div", {
                className:
                  "flex w-full sm:w-auto items-center justify-center gap-1 sm:gap-2 bg-white/80 backdrop-blur-md rounded-full px-3 sm:px-6 py-2 sm:py-3 shadow-lg border border-pink-100/50 overflow-x-auto",
                children: [1, 2, 3, 4].map((E) =>
                  e.jsxs(
                    "div",
                    {
                      className: "flex shrink-0 items-center",
                      children: [
                        e.jsx("div", {
                          className: `w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 ${n > E ? "bg-linear-to-br from-[#ff398b] to-pink-500 text-white shadow-lg shadow-pink-200 scale-110" : n === E ? "bg-linear-to-br from-[#ff398b] to-pink-500 text-white ring-4 ring-pink-200/50 ring-offset-2 scale-110 shadow-xl shadow-pink-300/50" : "bg-gray-100 text-gray-400"}`,
                          children:
                            n > E ? e.jsx(Ye, { className: "w-5 h-5" }) : E,
                        }),
                        E < 4 &&
                          e.jsx("div", {
                            className: `w-5 sm:w-8 h-1 mx-1 rounded-full transition-all duration-500 ${n > E ? "bg-linear-to-r from-[#ff398b] to-pink-400" : "bg-gray-200"}`,
                          }),
                      ],
                    },
                    E,
                  ),
                ),
              }),
            ],
          }),
          o
            ? e.jsx(D, {})
            : e.jsxs("div", {
                className:
                  "bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-white/50 relative overflow-hidden",
                children: [
                  e.jsx("div", {
                    className:
                      "absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-[#ff398b] via-pink-400 to-purple-400",
                  }),
                  e.jsx("div", {
                    className:
                      "bg-linear-to-br from-pink-50/80 via-purple-50/50 to-rose-50/80 backdrop-blur-sm p-4 sm:p-6 md:p-8 border-b border-pink-100/50",
                    children: e.jsxs("div", {
                      className:
                        "flex flex-col md:flex-row md:items-center justify-between gap-4",
                      children: [
                        e.jsxs("div", {
                          children: [
                            e.jsx("h1", {
                              className:
                                "text-2xl sm:text-3xl md:text-4xl font-extrabold bg-linear-to-r from-[#ff398b] to-pink-600 bg-clip-text text-transparent mb-2",
                              children: "Оформление заказа",
                            }),
                            e.jsxs("p", {
                              className: "text-gray-600 font-medium",
                              children: [
                                "Шаг ",
                                n,
                                " из 4 •",
                                " ",
                                e.jsxs("span", {
                                  className: "text-[#ff398b] font-semibold",
                                  children: [
                                    n === 1 && "Контактные данные",
                                    n === 2 && "Способ доставки",
                                    n === 3 && "Дополнительные опции",
                                    n === 4 && "Подтверждение",
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        e.jsx("div", {
                          className: "hidden md:block",
                          children: e.jsxs("div", {
                            className:
                              "flex items-center gap-2 bg-white/90 backdrop-blur-md px-5 py-3 rounded-full shadow-lg border border-pink-100/50",
                            children: [
                              e.jsx("div", {
                                className:
                                  "p-1.5 bg-linear-to-br from-[#ff398b] to-pink-500 rounded-lg",
                                children: e.jsx(ge, {
                                  className: "w-4 h-4 text-white",
                                }),
                              }),
                              e.jsx("span", {
                                className: "font-bold text-lg text-gray-900",
                                children: t,
                              }),
                              e.jsx("span", {
                                className: "text-gray-600 text-sm",
                                children: "товаров",
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                  }),
                  e.jsxs("div", {
                    className: "p-4 sm:p-6 md:p-8",
                    children: [
                      n === 1 && e.jsx(rl, {}),
                      n === 2 && e.jsx(nl, {}),
                      n === 3 && e.jsx(il, {}),
                      n === 4 && e.jsx(ol, {}),
                    ],
                  }),
                  e.jsxs("div", {
                    className:
                      "p-4 sm:p-6 md:p-8 border-t border-pink-100/50 bg-linear-to-r from-pink-50/30 via-white/50 to-purple-50/30 backdrop-blur-sm",
                    children: [
                      e.jsxs("div", {
                        className:
                          "flex flex-col-reverse min-[420px]:flex-row justify-between min-[420px]:items-center gap-3",
                        children: [
                          n > 1
                            ? e.jsxs("button", {
                                onClick: () => l(n - 1),
                                className:
                                  "group w-full min-[420px]:w-auto justify-center px-5 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold hover:border-pink-300 hover:bg-pink-50 transition-all duration-300 flex items-center gap-2",
                                children: [
                                  e.jsx(xs, {
                                    className:
                                      "w-5 h-5 group-hover:-translate-x-1 transition-transform",
                                  }),
                                  "Назад",
                                ],
                              })
                            : e.jsx("div", {}),
                          n < 4
                            ? e.jsxs("button", {
                                onClick: () => l(n + 1),
                                disabled: n === 1 && !P,
                                className: `group w-full min-[420px]:w-auto justify-center px-6 sm:px-10 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 flex items-center gap-2 ${n === 1 && !P ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-linear-to-r from-[#ff398b] to-pink-500 text-white hover:shadow-2xl hover:shadow-pink-300/50 hover:scale-105 active:scale-95"}`,
                                children: [
                                  "Продолжить",
                                  e.jsx(hs, {
                                    className:
                                      "w-5 h-5 group-hover:translate-x-1 transition-transform",
                                  }),
                                ],
                              })
                            : e.jsx("button", {
                                onClick: ee,
                                disabled: h || !i,
                                className: `group relative w-full min-[420px]:w-auto px-6 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 overflow-hidden ${h || !i ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-linear-to-r from-[#ff398b] via-pink-500 to-purple-500 text-white hover:shadow-2xl hover:shadow-pink-400/50 hover:scale-105 active:scale-95"}`,
                                children: h
                                  ? e.jsxs(e.Fragment, {
                                      children: [
                                        e.jsxs("span", {
                                          className:
                                            "flex items-center gap-3 relative z-10",
                                          children: [
                                            e.jsx(en, {
                                              className: "w-6 h-6 animate-spin",
                                            }),
                                            "Оформляем...",
                                          ],
                                        }),
                                        e.jsx("div", {
                                          className:
                                            "absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent animate-shimmer",
                                        }),
                                      ],
                                    })
                                  : e.jsx(e.Fragment, {
                                      children: e.jsxs("div", {
                                        className:
                                          "flex flex-col items-center gap-1 relative z-10",
                                        children: [
                                          e.jsxs("span", {
                                            className:
                                              "flex items-center gap-2",
                                            children: [
                                              e.jsx(Fe, {
                                                className: "w-6 h-6",
                                              }),
                                              "Завершить заказ",
                                            ],
                                          }),
                                          e.jsxs("span", {
                                            className:
                                              "text-sm font-normal opacity-90",
                                            children: [
                                              "Итого: ",
                                              x.toLocaleString(),
                                              " ₽",
                                            ],
                                          }),
                                        ],
                                      }),
                                    }),
                              }),
                        ],
                      }),
                      p &&
                        e.jsx("div", {
                          className:
                            "mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700",
                          children: p,
                        }),
                    ],
                  }),
                ],
              }),
        ],
      }),
      e.jsx("style", {
        children: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
      `,
      }),
    ],
  });
}
var dl = Object.defineProperty,
  ul = (t, s, r) =>
    s in t
      ? dl(t, s, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (t[s] = r),
  Mt = (t, s, r) => (ul(t, typeof s != "symbol" ? s + "" : s, r), r);
let ml = class {
    constructor() {
      (Mt(this, "current", this.detect()),
        Mt(this, "handoffState", "pending"),
        Mt(this, "currentId", 0));
    }
    set(s) {
      this.current !== s &&
        ((this.handoffState = "pending"),
        (this.currentId = 0),
        (this.current = s));
    }
    reset() {
      this.set(this.detect());
    }
    nextId() {
      return ++this.currentId;
    }
    get isServer() {
      return this.current === "server";
    }
    get isClient() {
      return this.current === "client";
    }
    detect() {
      return typeof window > "u" || typeof document > "u" ? "server" : "client";
    }
    handoff() {
      this.handoffState === "pending" && (this.handoffState = "complete");
    }
    get isHandoffComplete() {
      return this.handoffState === "complete";
    }
  },
  me = new ml();
function et(t) {
  var s;
  return me.isServer
    ? null
    : t == null
      ? document
      : (s = t?.ownerDocument) != null
        ? s
        : document;
}
function zt(t) {
  var s, r;
  return me.isServer
    ? null
    : t == null
      ? document
      : (r = (s = t?.getRootNode) == null ? void 0 : s.call(t)) != null
        ? r
        : document;
}
function xr(t) {
  var s, r;
  return (r = (s = zt(t)) == null ? void 0 : s.activeElement) != null
    ? r
    : null;
}
function xl(t) {
  return xr(t) === t;
}
function bt(t) {
  typeof queueMicrotask == "function"
    ? queueMicrotask(t)
    : Promise.resolve()
        .then(t)
        .catch((s) =>
          setTimeout(() => {
            throw s;
          }),
        );
}
function je() {
  let t = [],
    s = {
      addEventListener(r, a, n, l) {
        return (
          r.addEventListener(a, n, l),
          s.add(() => r.removeEventListener(a, n, l))
        );
      },
      requestAnimationFrame(...r) {
        let a = requestAnimationFrame(...r);
        return s.add(() => cancelAnimationFrame(a));
      },
      nextFrame(...r) {
        return s.requestAnimationFrame(() => s.requestAnimationFrame(...r));
      },
      setTimeout(...r) {
        let a = setTimeout(...r);
        return s.add(() => clearTimeout(a));
      },
      microTask(...r) {
        let a = { current: !0 };
        return (
          bt(() => {
            a.current && r[0]();
          }),
          s.add(() => {
            a.current = !1;
          })
        );
      },
      style(r, a, n) {
        let l = r.style.getPropertyValue(a);
        return (
          Object.assign(r.style, { [a]: n }),
          this.add(() => {
            Object.assign(r.style, { [a]: l });
          })
        );
      },
      group(r) {
        let a = je();
        return (r(a), this.add(() => a.dispose()));
      },
      add(r) {
        return (
          t.includes(r) || t.push(r),
          () => {
            let a = t.indexOf(r);
            if (a >= 0) for (let n of t.splice(a, 1)) n();
          }
        );
      },
      dispose() {
        for (let r of t.splice(0)) r();
      },
    };
  return s;
}
function yt() {
  let [t] = c.useState(je);
  return (c.useEffect(() => () => t.dispose(), [t]), t);
}
let se = (t, s) => {
  me.isServer ? c.useEffect(t, s) : c.useLayoutEffect(t, s);
};
function Oe(t) {
  let s = c.useRef(t);
  return (
    se(() => {
      s.current = t;
    }, [t]),
    s
  );
}
let H = function (t) {
  let s = Oe(t);
  return O.useCallback((...r) => s.current(...r), [s]);
};
function tt(t) {
  return c.useMemo(() => t, Object.values(t));
}
let hl = c.createContext(void 0);
function fl() {
  return c.useContext(hl);
}
function Ut(...t) {
  return Array.from(
    new Set(t.flatMap((s) => (typeof s == "string" ? s.split(" ") : []))),
  )
    .filter(Boolean)
    .join(" ");
}
function ve(t, s, ...r) {
  if (t in s) {
    let n = s[t];
    return typeof n == "function" ? n(...r) : n;
  }
  let a = new Error(
    `Tried to handle "${t}" but there is no handler defined. Only defined handlers are: ${Object.keys(
      s,
    )
      .map((n) => `"${n}"`)
      .join(", ")}.`,
  );
  throw (Error.captureStackTrace && Error.captureStackTrace(a, ve), a);
}
var mt = ((t) => (
    (t[(t.None = 0)] = "None"),
    (t[(t.RenderStrategy = 1)] = "RenderStrategy"),
    (t[(t.Static = 2)] = "Static"),
    t
  ))(mt || {}),
  Ce = ((t) => (
    (t[(t.Unmount = 0)] = "Unmount"),
    (t[(t.Hidden = 1)] = "Hidden"),
    t
  ))(Ce || {});
function le() {
  let t = gl();
  return c.useCallback((s) => pl({ mergeRefs: t, ...s }), [t]);
}
function pl({
  ourProps: t,
  theirProps: s,
  slot: r,
  defaultTag: a,
  features: n,
  visible: l = !0,
  name: o,
  mergeRefs: d,
}) {
  d = d ?? bl;
  let i = hr(s, t);
  if (l) return it(i, r, a, o, d);
  let u = n ?? 0;
  if (u & 2) {
    let { static: x = !1, ...g } = i;
    if (x) return it(g, r, a, o, d);
  }
  if (u & 1) {
    let { unmount: x = !0, ...g } = i;
    return ve(x ? 0 : 1, {
      0() {
        return null;
      },
      1() {
        return it({ ...g, hidden: !0, style: { display: "none" } }, r, a, o, d);
      },
    });
  }
  return it(i, r, a, o, d);
}
function it(t, s = {}, r, a, n) {
  let {
      as: l = r,
      children: o,
      refName: d = "ref",
      ...i
    } = Pt(t, ["unmount", "static"]),
    u = t.ref !== void 0 ? { [d]: t.ref } : {},
    x = typeof o == "function" ? o(s) : o;
  ((x = fr(x)),
    "className" in i &&
      i.className &&
      typeof i.className == "function" &&
      (i.className = i.className(s)),
    i["aria-labelledby"] &&
      i["aria-labelledby"] === i.id &&
      (i["aria-labelledby"] = void 0));
  let g = {};
  if (s) {
    let h = !1,
      m = [];
    for (let [p, y] of Object.entries(s))
      (typeof y == "boolean" && (h = !0),
        y === !0 &&
          m.push(p.replace(/([A-Z])/g, (v) => `-${v.toLowerCase()}`)));
    if (h) {
      g["data-headlessui-state"] = m.join(" ");
      for (let p of m) g[`data-${p}`] = "";
    }
  }
  if (Ge(l) && (Object.keys(Pe(i)).length > 0 || Object.keys(Pe(g)).length > 0))
    if (!c.isValidElement(x) || (Array.isArray(x) && x.length > 1) || vl(x)) {
      if (Object.keys(Pe(i)).length > 0)
        throw new Error(
          [
            'Passing props on "Fragment"!',
            "",
            `The current component <${a} /> is rendering a "Fragment".`,
            "However we need to passthrough the following props:",
            Object.keys(Pe(i))
              .concat(Object.keys(Pe(g)))
              .map((h) => `  - ${h}`).join(`
`),
            "",
            "You can apply a few solutions:",
            [
              'Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".',
              "Render a single element as the child so that we can forward the props onto that element.",
            ].map((h) => `  - ${h}`).join(`
`),
          ].join(`
`),
        );
    } else {
      let h = x.props,
        m = h?.className,
        p =
          typeof m == "function"
            ? (...j) => Ut(m(...j), i.className)
            : Ut(m, i.className),
        y = p ? { className: p } : {},
        v = hr(x.props, Pe(Pt(i, ["ref"])));
      for (let j in g) j in v && delete g[j];
      return c.cloneElement(
        x,
        Object.assign({}, v, g, u, { ref: n(yl(x), u.ref) }, y),
      );
    }
  return c.createElement(
    l,
    Object.assign({}, Pt(i, ["ref"]), !Ge(l) && u, !Ge(l) && g),
    x,
  );
}
function gl() {
  let t = c.useRef([]),
    s = c.useCallback((r) => {
      for (let a of t.current)
        a != null && (typeof a == "function" ? a(r) : (a.current = r));
    }, []);
  return (...r) => {
    if (!r.every((a) => a == null)) return ((t.current = r), s);
  };
}
function bl(...t) {
  return t.every((s) => s == null)
    ? void 0
    : (s) => {
        for (let r of t)
          r != null && (typeof r == "function" ? r(s) : (r.current = s));
      };
}
function hr(...t) {
  if (t.length === 0) return {};
  if (t.length === 1) return t[0];
  let s = {},
    r = {};
  for (let a of t)
    for (let n in a)
      n.startsWith("on") && typeof a[n] == "function"
        ? (r[n] != null || (r[n] = []), r[n].push(a[n]))
        : (s[n] = a[n]);
  if (s.disabled || s["aria-disabled"])
    for (let a in r)
      /^(on(?:Click|Pointer|Mouse|Key)(?:Down|Up|Press)?)$/.test(a) &&
        (r[a] = [
          (n) => {
            var l;
            return (l = n?.preventDefault) == null ? void 0 : l.call(n);
          },
        ]);
  for (let a in r)
    Object.assign(s, {
      [a](n, ...l) {
        let o = r[a];
        for (let d of o) {
          if (
            (n instanceof Event || n?.nativeEvent instanceof Event) &&
            n.defaultPrevented
          )
            return;
          d(n, ...l);
        }
      },
    });
  return s;
}
function re(t) {
  var s;
  return Object.assign(c.forwardRef(t), {
    displayName: (s = t.displayName) != null ? s : t.name,
  });
}
function Pe(t) {
  let s = Object.assign({}, t);
  for (let r in s) s[r] === void 0 && delete s[r];
  return s;
}
function Pt(t, s = []) {
  let r = Object.assign({}, t);
  for (let a of s) a in r && delete r[a];
  return r;
}
function yl(t) {
  return O.version.split(".")[0] >= "19" ? t.props.ref : t.ref;
}
function fr(t) {
  if (t != null && t.$$typeof === Symbol.for("react.lazy")) {
    let s = t._payload;
    if (s != null && s.status === "fulfilled") return fr(s.value);
  }
  return t;
}
function Ge(t) {
  return t === c.Fragment || t === Symbol.for("react.fragment");
}
function vl(t) {
  return Ge(t.type);
}
let jl = "span";
var xt = ((t) => (
  (t[(t.None = 1)] = "None"),
  (t[(t.Focusable = 2)] = "Focusable"),
  (t[(t.Hidden = 4)] = "Hidden"),
  t
))(xt || {});
function Nl(t, s) {
  var r;
  let { features: a = 1, ...n } = t,
    l = {
      ref: s,
      "aria-hidden":
        (a & 2) === 2 ? !0 : (r = n["aria-hidden"]) != null ? r : void 0,
      hidden: (a & 4) === 4 ? !0 : void 0,
      style: {
        position: "fixed",
        top: 1,
        left: 1,
        width: 1,
        height: 0,
        padding: 0,
        margin: -1,
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        borderWidth: "0",
        ...((a & 4) === 4 && (a & 2) !== 2 && { display: "none" }),
      },
    };
  return le()({
    ourProps: l,
    theirProps: n,
    slot: {},
    defaultTag: jl,
    name: "Hidden",
  });
}
let Bt = re(Nl);
function wl(t) {
  return typeof t != "object" || t === null ? !1 : "nodeType" in t;
}
function $e(t) {
  return wl(t) && "tagName" in t;
}
function Le(t) {
  return $e(t) && "accessKey" in t;
}
function Se(t) {
  return $e(t) && "tabIndex" in t;
}
function kl(t) {
  return $e(t) && "style" in t;
}
function Cl(t) {
  return Le(t) && t.nodeName === "IFRAME";
}
function Sl(t) {
  return Le(t) && t.nodeName === "INPUT";
}
let pr = Symbol();
function El(t, s = !0) {
  return Object.assign(t, { [pr]: s });
}
function he(...t) {
  let s = c.useRef(t);
  c.useEffect(() => {
    s.current = t;
  }, [t]);
  let r = H((a) => {
    for (let n of s.current)
      n != null && (typeof n == "function" ? n(a) : (n.current = a));
  });
  return t.every((a) => a == null || a?.[pr]) ? void 0 : r;
}
let Zt = c.createContext(null);
Zt.displayName = "DescriptionContext";
function gr() {
  let t = c.useContext(Zt);
  if (t === null) {
    let s = new Error(
      "You used a <Description /> component, but it is not inside a relevant parent.",
    );
    throw (Error.captureStackTrace && Error.captureStackTrace(s, gr), s);
  }
  return t;
}
function $l() {
  let [t, s] = c.useState([]);
  return [
    t.length > 0 ? t.join(" ") : void 0,
    c.useMemo(
      () =>
        function (r) {
          let a = H(
              (l) => (
                s((o) => [...o, l]),
                () =>
                  s((o) => {
                    let d = o.slice(),
                      i = d.indexOf(l);
                    return (i !== -1 && d.splice(i, 1), d);
                  })
              ),
            ),
            n = c.useMemo(
              () => ({
                register: a,
                slot: r.slot,
                name: r.name,
                props: r.props,
                value: r.value,
              }),
              [a, r.slot, r.name, r.props, r.value],
            );
          return O.createElement(Zt.Provider, { value: n }, r.children);
        },
      [s],
    ),
  ];
}
let Ml = "p";
function Pl(t, s) {
  let r = c.useId(),
    a = fl(),
    { id: n = `headlessui-description-${r}`, ...l } = t,
    o = gr(),
    d = he(s);
  se(() => o.register(n), [n, o.register]);
  let i = tt({ ...o.slot, disabled: a || !1 }),
    u = { ref: d, ...o.props, id: n };
  return le()({
    ourProps: u,
    theirProps: l,
    slot: i,
    defaultTag: Ml,
    name: o.name || "Description",
  });
}
let Il = re(Pl),
  Al = Object.assign(Il, {});
var br = ((t) => (
  (t.Space = " "),
  (t.Enter = "Enter"),
  (t.Escape = "Escape"),
  (t.Backspace = "Backspace"),
  (t.Delete = "Delete"),
  (t.ArrowLeft = "ArrowLeft"),
  (t.ArrowUp = "ArrowUp"),
  (t.ArrowRight = "ArrowRight"),
  (t.ArrowDown = "ArrowDown"),
  (t.Home = "Home"),
  (t.End = "End"),
  (t.PageUp = "PageUp"),
  (t.PageDown = "PageDown"),
  (t.Tab = "Tab"),
  t
))(br || {});
let Fl = c.createContext(() => {});
function Ll({ value: t, children: s }) {
  return O.createElement(Fl.Provider, { value: t }, s);
}
let yr = class extends Map {
  constructor(s) {
    (super(), (this.factory = s));
  }
  get(s) {
    let r = super.get(s);
    return (r === void 0 && ((r = this.factory(s)), this.set(s, r)), r);
  }
};
var Ol = Object.defineProperty,
  Tl = (t, s, r) =>
    s in t
      ? Ol(t, s, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (t[s] = r),
  Rl = (t, s, r) => (Tl(t, s + "", r), r),
  vr = (t, s, r) => {
    if (!s.has(t)) throw TypeError("Cannot " + r);
  },
  ae = (t, s, r) => (
    vr(t, s, "read from private field"),
    r ? r.call(t) : s.get(t)
  ),
  It = (t, s, r) => {
    if (s.has(t))
      throw TypeError("Cannot add the same private member more than once");
    s instanceof WeakSet ? s.add(t) : s.set(t, r);
  },
  Ns = (t, s, r, a) => (vr(t, s, "write to private field"), s.set(t, r), r),
  ue,
  We,
  He;
let Dl = class {
  constructor(s) {
    (It(this, ue, {}),
      It(this, We, new yr(() => new Set())),
      It(this, He, new Set()),
      Rl(this, "disposables", je()),
      Ns(this, ue, s),
      me.isServer &&
        this.disposables.microTask(() => {
          this.dispose();
        }));
  }
  dispose() {
    this.disposables.dispose();
  }
  get state() {
    return ae(this, ue);
  }
  subscribe(s, r) {
    if (me.isServer) return () => {};
    let a = { selector: s, callback: r, current: s(ae(this, ue)) };
    return (
      ae(this, He).add(a),
      this.disposables.add(() => {
        ae(this, He).delete(a);
      })
    );
  }
  on(s, r) {
    return me.isServer
      ? () => {}
      : (ae(this, We).get(s).add(r),
        this.disposables.add(() => {
          ae(this, We).get(s).delete(r);
        }));
  }
  send(s) {
    let r = this.reduce(ae(this, ue), s);
    if (r !== ae(this, ue)) {
      Ns(this, ue, r);
      for (let a of ae(this, He)) {
        let n = a.selector(ae(this, ue));
        jr(a.current, n) || ((a.current = n), a.callback(n));
      }
      for (let a of ae(this, We).get(s.type)) a(ae(this, ue), s);
    }
  }
};
((ue = new WeakMap()), (We = new WeakMap()), (He = new WeakMap()));
function jr(t, s) {
  return Object.is(t, s)
    ? !0
    : typeof t != "object" || t === null || typeof s != "object" || s === null
      ? !1
      : Array.isArray(t) && Array.isArray(s)
        ? t.length !== s.length
          ? !1
          : At(t[Symbol.iterator](), s[Symbol.iterator]())
        : (t instanceof Map && s instanceof Map) ||
            (t instanceof Set && s instanceof Set)
          ? t.size !== s.size
            ? !1
            : At(t.entries(), s.entries())
          : ws(t) && ws(s)
            ? At(
                Object.entries(t)[Symbol.iterator](),
                Object.entries(s)[Symbol.iterator](),
              )
            : !1;
}
function At(t, s) {
  do {
    let r = t.next(),
      a = s.next();
    if (r.done && a.done) return !0;
    if (r.done || a.done || !Object.is(r.value, a.value)) return !1;
  } while (!0);
}
function ws(t) {
  if (Object.prototype.toString.call(t) !== "[object Object]") return !1;
  let s = Object.getPrototypeOf(t);
  return s === null || Object.getPrototypeOf(s) === null;
}
var _l = Object.defineProperty,
  zl = (t, s, r) =>
    s in t
      ? _l(t, s, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (t[s] = r),
  ks = (t, s, r) => (zl(t, typeof s != "symbol" ? s + "" : s, r), r),
  Ul = ((t) => ((t[(t.Push = 0)] = "Push"), (t[(t.Pop = 1)] = "Pop"), t))(
    Ul || {},
  );
let Bl = {
    0(t, s) {
      let r = s.id,
        a = t.stack,
        n = t.stack.indexOf(r);
      if (n !== -1) {
        let l = t.stack.slice();
        return (l.splice(n, 1), l.push(r), (a = l), { ...t, stack: a });
      }
      return { ...t, stack: [...t.stack, r] };
    },
    1(t, s) {
      let r = s.id,
        a = t.stack.indexOf(r);
      if (a === -1) return t;
      let n = t.stack.slice();
      return (n.splice(a, 1), { ...t, stack: n });
    },
  },
  ql = class Nr extends Dl {
    constructor() {
      (super(...arguments),
        ks(this, "actions", {
          push: (s) => this.send({ type: 0, id: s }),
          pop: (s) => this.send({ type: 1, id: s }),
        }),
        ks(this, "selectors", {
          isTop: (s, r) => s.stack[s.stack.length - 1] === r,
          inStack: (s, r) => s.stack.includes(r),
        }));
    }
    static new() {
      return new Nr({ stack: [] });
    }
    reduce(s, r) {
      return ve(r.type, Bl, s, r);
    }
  };
const wr = new yr(() => ql.new());
var Ft = { exports: {} },
  Lt = {};
var Cs;
function Wl() {
  if (Cs) return Lt;
  Cs = 1;
  var t = Jr();
  function s(i, u) {
    return (i === u && (i !== 0 || 1 / i === 1 / u)) || (i !== i && u !== u);
  }
  var r = typeof Object.is == "function" ? Object.is : s,
    a = t.useSyncExternalStore,
    n = t.useRef,
    l = t.useEffect,
    o = t.useMemo,
    d = t.useDebugValue;
  return (
    (Lt.useSyncExternalStoreWithSelector = function (i, u, x, g, h) {
      var m = n(null);
      if (m.current === null) {
        var p = { hasValue: !1, value: null };
        m.current = p;
      } else p = m.current;
      m = o(
        function () {
          function v($) {
            if (!j) {
              if (((j = !0), (k = $), ($ = g($)), h !== void 0 && p.hasValue)) {
                var S = p.value;
                if (h(S, $)) return (w = S);
              }
              return (w = $);
            }
            if (((S = w), r(k, $))) return S;
            var A = g($);
            return h !== void 0 && h(S, A) ? ((k = $), S) : ((k = $), (w = A));
          }
          var j = !1,
            k,
            w,
            N = x === void 0 ? null : x;
          return [
            function () {
              return v(u());
            },
            N === null
              ? void 0
              : function () {
                  return v(N());
                },
          ];
        },
        [u, x, g, h],
      );
      var y = a(i, m[0], m[1]);
      return (
        l(
          function () {
            ((p.hasValue = !0), (p.value = y));
          },
          [y],
        ),
        d(y),
        y
      );
    }),
    Lt
  );
}
var Ss;
function Hl() {
  return (Ss || ((Ss = 1), (Ft.exports = Wl())), Ft.exports);
}
var Vl = Hl();
function kr(t, s, r = jr) {
  return Vl.useSyncExternalStoreWithSelector(
    H((a) => t.subscribe(Gl, a)),
    H(() => t.state),
    H(() => t.state),
    H(s),
    r,
  );
}
function Gl(t) {
  return t;
}
function st(t, s) {
  let r = c.useId(),
    a = wr.get(s),
    [n, l] = kr(
      a,
      c.useCallback(
        (o) => [a.selectors.isTop(o, r), a.selectors.inStack(o, r)],
        [a, r],
      ),
    );
  return (
    se(() => {
      if (t) return (a.actions.push(r), () => a.actions.pop(r));
    }, [a, t, r]),
    t ? (l ? n : !0) : !1
  );
}
let qt = new Map(),
  Ke = new Map();
function Es(t) {
  var s;
  let r = (s = Ke.get(t)) != null ? s : 0;
  return (
    Ke.set(t, r + 1),
    r !== 0
      ? () => $s(t)
      : (qt.set(t, {
          "aria-hidden": t.getAttribute("aria-hidden"),
          inert: t.inert,
        }),
        t.setAttribute("aria-hidden", "true"),
        (t.inert = !0),
        () => $s(t))
  );
}
function $s(t) {
  var s;
  let r = (s = Ke.get(t)) != null ? s : 1;
  if ((r === 1 ? Ke.delete(t) : Ke.set(t, r - 1), r !== 1)) return;
  let a = qt.get(t);
  a &&
    (a["aria-hidden"] === null
      ? t.removeAttribute("aria-hidden")
      : t.setAttribute("aria-hidden", a["aria-hidden"]),
    (t.inert = a.inert),
    qt.delete(t));
}
function Kl(t, { allowed: s, disallowed: r } = {}) {
  let a = st(t, "inert-others");
  se(() => {
    var n, l;
    if (!a) return;
    let o = je();
    for (let i of (n = r?.()) != null ? n : []) i && o.add(Es(i));
    let d = (l = s?.()) != null ? l : [];
    for (let i of d) {
      if (!i) continue;
      let u = et(i);
      if (!u) continue;
      let x = i.parentElement;
      for (; x && x !== u.body; ) {
        for (let g of x.children) d.some((h) => g.contains(h)) || o.add(Es(g));
        x = x.parentElement;
      }
    }
    return o.dispose;
  }, [a, s, r]);
}
function Xl(t, s, r) {
  let a = Oe((n) => {
    let l = n.getBoundingClientRect();
    l.x === 0 && l.y === 0 && l.width === 0 && l.height === 0 && r();
  });
  c.useEffect(() => {
    if (!t) return;
    let n = s === null ? null : Le(s) ? s : s.current;
    if (!n) return;
    let l = je();
    if (typeof ResizeObserver < "u") {
      let o = new ResizeObserver(() => a.current(n));
      (o.observe(n), l.add(() => o.disconnect()));
    }
    if (typeof IntersectionObserver < "u") {
      let o = new IntersectionObserver(() => a.current(n));
      (o.observe(n), l.add(() => o.disconnect()));
    }
    return () => l.dispose();
  }, [s, a, t]);
}
let ht = [
    "[contentEditable=true]",
    "[tabindex]",
    "a[href]",
    "area[href]",
    "button:not([disabled])",
    "iframe",
    "input:not([disabled])",
    "select:not([disabled])",
    "details>summary",
    "textarea:not([disabled])",
  ]
    .map((t) => `${t}:not([tabindex='-1'])`)
    .join(","),
  Yl = ["[data-autofocus]"].map((t) => `${t}:not([tabindex='-1'])`).join(",");
var pe = ((t) => (
    (t[(t.First = 1)] = "First"),
    (t[(t.Previous = 2)] = "Previous"),
    (t[(t.Next = 4)] = "Next"),
    (t[(t.Last = 8)] = "Last"),
    (t[(t.WrapAround = 16)] = "WrapAround"),
    (t[(t.NoScroll = 32)] = "NoScroll"),
    (t[(t.AutoFocus = 64)] = "AutoFocus"),
    t
  ))(pe || {}),
  Wt = ((t) => (
    (t[(t.Error = 0)] = "Error"),
    (t[(t.Overflow = 1)] = "Overflow"),
    (t[(t.Success = 2)] = "Success"),
    (t[(t.Underflow = 3)] = "Underflow"),
    t
  ))(Wt || {}),
  Ql = ((t) => (
    (t[(t.Previous = -1)] = "Previous"),
    (t[(t.Next = 1)] = "Next"),
    t
  ))(Ql || {});
function Zl(t = document.body) {
  return t == null
    ? []
    : Array.from(t.querySelectorAll(ht)).sort((s, r) =>
        Math.sign(
          (s.tabIndex || Number.MAX_SAFE_INTEGER) -
            (r.tabIndex || Number.MAX_SAFE_INTEGER),
        ),
      );
}
function Jl(t = document.body) {
  return t == null
    ? []
    : Array.from(t.querySelectorAll(Yl)).sort((s, r) =>
        Math.sign(
          (s.tabIndex || Number.MAX_SAFE_INTEGER) -
            (r.tabIndex || Number.MAX_SAFE_INTEGER),
        ),
      );
}
var Cr = ((t) => (
  (t[(t.Strict = 0)] = "Strict"),
  (t[(t.Loose = 1)] = "Loose"),
  t
))(Cr || {});
function ei(t, s = 0) {
  var r;
  return t === ((r = et(t)) == null ? void 0 : r.body)
    ? !1
    : ve(s, {
        0() {
          return t.matches(ht);
        },
        1() {
          let a = t;
          for (; a !== null; ) {
            if (a.matches(ht)) return !0;
            a = a.parentElement;
          }
          return !1;
        },
      });
}
var ti = ((t) => (
  (t[(t.Keyboard = 0)] = "Keyboard"),
  (t[(t.Mouse = 1)] = "Mouse"),
  t
))(ti || {});
typeof window < "u" &&
  typeof document < "u" &&
  (document.addEventListener(
    "keydown",
    (t) => {
      t.metaKey ||
        t.altKey ||
        t.ctrlKey ||
        (document.documentElement.dataset.headlessuiFocusVisible = "");
    },
    !0,
  ),
  document.addEventListener(
    "click",
    (t) => {
      t.detail === 1
        ? delete document.documentElement.dataset.headlessuiFocusVisible
        : t.detail === 0 &&
          (document.documentElement.dataset.headlessuiFocusVisible = "");
    },
    !0,
  ));
function be(t) {
  t?.focus({ preventScroll: !0 });
}
let si = ["textarea", "input"].join(",");
function ri(t) {
  var s, r;
  return (r = (s = t?.matches) == null ? void 0 : s.call(t, si)) != null
    ? r
    : !1;
}
function ai(t, s = (r) => r) {
  return t.slice().sort((r, a) => {
    let n = s(r),
      l = s(a);
    if (n === null || l === null) return 0;
    let o = n.compareDocumentPosition(l);
    return o & Node.DOCUMENT_POSITION_FOLLOWING
      ? -1
      : o & Node.DOCUMENT_POSITION_PRECEDING
        ? 1
        : 0;
  });
}
function Xe(
  t,
  s,
  { sorted: r = !0, relativeTo: a = null, skipElements: n = [] } = {},
) {
  let l = Array.isArray(t) ? (t.length > 0 ? zt(t[0]) : document) : zt(t),
    o = Array.isArray(t) ? (r ? ai(t) : t) : s & 64 ? Jl(t) : Zl(t);
  (n.length > 0 &&
    o.length > 1 &&
    (o = o.filter(
      (m) =>
        !n.some((p) =>
          p != null && "current" in p ? p?.current === m : p === m,
        ),
    )),
    (a = a ?? l?.activeElement));
  let d = (() => {
      if (s & 5) return 1;
      if (s & 10) return -1;
      throw new Error(
        "Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last",
      );
    })(),
    i = (() => {
      if (s & 1) return 0;
      if (s & 2) return Math.max(0, o.indexOf(a)) - 1;
      if (s & 4) return Math.max(0, o.indexOf(a)) + 1;
      if (s & 8) return o.length - 1;
      throw new Error(
        "Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last",
      );
    })(),
    u = s & 32 ? { preventScroll: !0 } : {},
    x = 0,
    g = o.length,
    h;
  do {
    if (x >= g || x + g <= 0) return 0;
    let m = i + x;
    if (s & 16) m = (m + g) % g;
    else {
      if (m < 0) return 3;
      if (m >= g) return 1;
    }
    ((h = o[m]), h?.focus(u), (x += d));
  } while (h !== xr(h));
  return (s & 6 && ri(h) && h.select(), 2);
}
function Sr() {
  return (
    /iPhone/gi.test(window.navigator.platform) ||
    (/Mac/gi.test(window.navigator.platform) &&
      window.navigator.maxTouchPoints > 0)
  );
}
function ni() {
  return /Android/gi.test(window.navigator.userAgent);
}
function Ms() {
  return Sr() || ni();
}
function ot(t, s, r, a) {
  let n = Oe(r);
  c.useEffect(() => {
    if (!t) return;
    function l(o) {
      n.current(o);
    }
    return (
      document.addEventListener(s, l, a),
      () => document.removeEventListener(s, l, a)
    );
  }, [t, s, a]);
}
function Er(t, s, r, a) {
  let n = Oe(r);
  c.useEffect(() => {
    if (!t) return;
    function l(o) {
      n.current(o);
    }
    return (
      window.addEventListener(s, l, a),
      () => window.removeEventListener(s, l, a)
    );
  }, [t, s, a]);
}
const Ps = 30;
function li(t, s, r) {
  let a = Oe(r),
    n = c.useCallback(
      function (d, i) {
        if (d.defaultPrevented) return;
        let u = i(d);
        if (u === null || !u.getRootNode().contains(u) || !u.isConnected)
          return;
        let x = (function g(h) {
          return typeof h == "function"
            ? g(h())
            : Array.isArray(h) || h instanceof Set
              ? h
              : [h];
        })(s);
        for (let g of x)
          if (
            g !== null &&
            (g.contains(u) || (d.composed && d.composedPath().includes(g)))
          )
            return;
        return (
          !ei(u, Cr.Loose) && u.tabIndex !== -1 && d.preventDefault(),
          a.current(d, u)
        );
      },
      [a, s],
    ),
    l = c.useRef(null);
  (ot(
    t,
    "pointerdown",
    (d) => {
      var i, u;
      Ms() ||
        (l.current =
          ((u = (i = d.composedPath) == null ? void 0 : i.call(d)) == null
            ? void 0
            : u[0]) || d.target);
    },
    !0,
  ),
    ot(
      t,
      "pointerup",
      (d) => {
        if (Ms() || !l.current) return;
        let i = l.current;
        return ((l.current = null), n(d, () => i));
      },
      !0,
    ));
  let o = c.useRef({ x: 0, y: 0 });
  (ot(
    t,
    "touchstart",
    (d) => {
      ((o.current.x = d.touches[0].clientX),
        (o.current.y = d.touches[0].clientY));
    },
    !0,
  ),
    ot(
      t,
      "touchend",
      (d) => {
        let i = {
          x: d.changedTouches[0].clientX,
          y: d.changedTouches[0].clientY,
        };
        if (
          !(
            Math.abs(i.x - o.current.x) >= Ps ||
            Math.abs(i.y - o.current.y) >= Ps
          )
        )
          return n(d, () => (Se(d.target) ? d.target : null));
      },
      !0,
    ),
    Er(
      t,
      "blur",
      (d) =>
        n(d, () =>
          Cl(window.document.activeElement)
            ? window.document.activeElement
            : null,
        ),
      !0,
    ));
}
function Jt(...t) {
  return c.useMemo(() => et(...t), [...t]);
}
function $r(t, s, r, a) {
  let n = Oe(r);
  c.useEffect(() => {
    t = t ?? window;
    function l(o) {
      n.current(o);
    }
    return (t.addEventListener(s, l, a), () => t.removeEventListener(s, l, a));
  }, [t, s, a]);
}
function ii(t) {
  return c.useSyncExternalStore(t.subscribe, t.getSnapshot, t.getSnapshot);
}
function oi(t, s) {
  let r = t(),
    a = new Set();
  return {
    getSnapshot() {
      return r;
    },
    subscribe(n) {
      return (a.add(n), () => a.delete(n));
    },
    dispatch(n, ...l) {
      let o = s[n].call(r, ...l);
      o && ((r = o), a.forEach((d) => d()));
    },
  };
}
function ci() {
  let t;
  return {
    before({ doc: s }) {
      var r;
      let a = s.documentElement,
        n = (r = s.defaultView) != null ? r : window;
      t = Math.max(0, n.innerWidth - a.clientWidth);
    },
    after({ doc: s, d: r }) {
      let a = s.documentElement,
        n = Math.max(0, a.clientWidth - a.offsetWidth),
        l = Math.max(0, t - n);
      r.style(a, "paddingRight", `${l}px`);
    },
  };
}
function di() {
  return Sr()
    ? {
        before({ doc: t, d: s, meta: r }) {
          function a(n) {
            for (let l of r().containers)
              for (let o of l()) if (o.contains(n)) return !0;
            return !1;
          }
          s.microTask(() => {
            var n;
            if (
              window.getComputedStyle(t.documentElement).scrollBehavior !==
              "auto"
            ) {
              let d = je();
              (d.style(t.documentElement, "scrollBehavior", "auto"),
                s.add(() => s.microTask(() => d.dispose())));
            }
            let l = (n = window.scrollY) != null ? n : window.pageYOffset,
              o = null;
            (s.addEventListener(
              t,
              "click",
              (d) => {
                if (Se(d.target))
                  try {
                    let i = d.target.closest("a");
                    if (!i) return;
                    let { hash: u } = new URL(i.href),
                      x = t.querySelector(u);
                    Se(x) && !a(x) && (o = x);
                  } catch {}
              },
              !0,
            ),
              s.group((d) => {
                s.addEventListener(t, "touchstart", (i) => {
                  if ((d.dispose(), Se(i.target) && kl(i.target)))
                    if (a(i.target)) {
                      let u = i.target;
                      for (; u.parentElement && a(u.parentElement); )
                        u = u.parentElement;
                      d.style(u, "overscrollBehavior", "contain");
                    } else d.style(i.target, "touchAction", "none");
                });
              }),
              s.addEventListener(
                t,
                "touchmove",
                (d) => {
                  if (Se(d.target)) {
                    if (Sl(d.target)) return;
                    if (a(d.target)) {
                      let i = d.target;
                      for (
                        ;
                        i.parentElement &&
                        i.dataset.headlessuiPortal !== "" &&
                        !(
                          i.scrollHeight > i.clientHeight ||
                          i.scrollWidth > i.clientWidth
                        );
                      )
                        i = i.parentElement;
                      i.dataset.headlessuiPortal === "" && d.preventDefault();
                    } else d.preventDefault();
                  }
                },
                { passive: !1 },
              ),
              s.add(() => {
                var d;
                let i = (d = window.scrollY) != null ? d : window.pageYOffset;
                (l !== i && window.scrollTo(0, l),
                  o &&
                    o.isConnected &&
                    (o.scrollIntoView({ block: "nearest" }), (o = null)));
              }));
          });
        },
      }
    : {};
}
function ui() {
  return {
    before({ doc: t, d: s }) {
      s.style(t.documentElement, "overflow", "hidden");
    },
  };
}
function Is(t) {
  let s = {};
  for (let r of t) Object.assign(s, r(s));
  return s;
}
let Ae = oi(() => new Map(), {
  PUSH(t, s) {
    var r;
    let a =
      (r = this.get(t)) != null
        ? r
        : { doc: t, count: 0, d: je(), meta: new Set(), computedMeta: {} };
    return (
      a.count++,
      a.meta.add(s),
      (a.computedMeta = Is(a.meta)),
      this.set(t, a),
      this
    );
  },
  POP(t, s) {
    let r = this.get(t);
    return (
      r && (r.count--, r.meta.delete(s), (r.computedMeta = Is(r.meta))),
      this
    );
  },
  SCROLL_PREVENT(t) {
    let s = {
        doc: t.doc,
        d: t.d,
        meta() {
          return t.computedMeta;
        },
      },
      r = [di(), ci(), ui()];
    (r.forEach(({ before: a }) => a?.(s)), r.forEach(({ after: a }) => a?.(s)));
  },
  SCROLL_ALLOW({ d: t }) {
    t.dispose();
  },
  TEARDOWN({ doc: t }) {
    this.delete(t);
  },
});
Ae.subscribe(() => {
  let t = Ae.getSnapshot(),
    s = new Map();
  for (let [r] of t) s.set(r, r.documentElement.style.overflow);
  for (let r of t.values()) {
    let a = s.get(r.doc) === "hidden",
      n = r.count !== 0;
    (((n && !a) || (!n && a)) &&
      Ae.dispatch(r.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", r),
      r.count === 0 && Ae.dispatch("TEARDOWN", r));
  }
});
function mi(t, s, r = () => ({ containers: [] })) {
  let a = ii(Ae),
    n = s ? a.get(s) : void 0,
    l = n ? n.count > 0 : !1;
  return (
    se(() => {
      if (!(!s || !t))
        return (Ae.dispatch("PUSH", s, r), () => Ae.dispatch("POP", s, r));
    }, [t, s]),
    l
  );
}
function xi(t, s, r = () => [document.body]) {
  let a = st(t, "scroll-lock");
  mi(a, s, (n) => {
    var l;
    return { containers: [...((l = n.containers) != null ? l : []), r] };
  });
}
function hi(t = 0) {
  let [s, r] = c.useState(t),
    a = c.useCallback((i) => r(i), []),
    n = c.useCallback((i) => r((u) => u | i), []),
    l = c.useCallback((i) => (s & i) === i, [s]),
    o = c.useCallback((i) => r((u) => u & ~i), []),
    d = c.useCallback((i) => r((u) => u ^ i), []);
  return {
    flags: s,
    setFlag: a,
    addFlag: n,
    hasFlag: l,
    removeFlag: o,
    toggleFlag: d,
  };
}
var fi = {},
  As,
  Fs;
typeof process < "u" &&
  typeof globalThis < "u" &&
  typeof Element < "u" &&
  ((As = process == null ? void 0 : fi) == null ? void 0 : As.NODE_ENV) ===
    "test" &&
  typeof ((Fs = Element?.prototype) == null ? void 0 : Fs.getAnimations) >
    "u" &&
  (Element.prototype.getAnimations = function () {
    return (
      console.warn(
        [
          "Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.",
          "Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.",
          "",
          "Example usage:",
          "```js",
          "import { mockAnimationsApi } from 'jsdom-testing-mocks'",
          "mockAnimationsApi()",
          "```",
        ].join(`
`),
      ),
      []
    );
  });
var pi = ((t) => (
  (t[(t.None = 0)] = "None"),
  (t[(t.Closed = 1)] = "Closed"),
  (t[(t.Enter = 2)] = "Enter"),
  (t[(t.Leave = 4)] = "Leave"),
  t
))(pi || {});
function gi(t) {
  let s = {};
  for (let r in t) t[r] === !0 && (s[`data-${r}`] = "");
  return s;
}
function bi(t, s, r, a) {
  let [n, l] = c.useState(r),
    { hasFlag: o, addFlag: d, removeFlag: i } = hi(t && n ? 3 : 0),
    u = c.useRef(!1),
    x = c.useRef(!1),
    g = yt();
  return (
    se(() => {
      var h;
      if (t) {
        if ((r && l(!0), !s)) {
          r && d(3);
          return;
        }
        return (
          (h = a?.start) == null || h.call(a, r),
          yi(s, {
            inFlight: u,
            prepare() {
              (x.current ? (x.current = !1) : (x.current = u.current),
                (u.current = !0),
                !x.current && (r ? (d(3), i(4)) : (d(4), i(2))));
            },
            run() {
              x.current ? (r ? (i(3), d(4)) : (i(4), d(3))) : r ? i(1) : d(1);
            },
            done() {
              var m;
              (x.current && Ni(s)) ||
                ((u.current = !1),
                i(7),
                r || l(!1),
                (m = a?.end) == null || m.call(a, r));
            },
          })
        );
      }
    }, [t, r, s, g]),
    t
      ? [
          n,
          { closed: o(1), enter: o(2), leave: o(4), transition: o(2) || o(4) },
        ]
      : [
          r,
          { closed: void 0, enter: void 0, leave: void 0, transition: void 0 },
        ]
  );
}
function yi(t, { prepare: s, run: r, done: a, inFlight: n }) {
  let l = je();
  return (
    ji(t, { prepare: s, inFlight: n }),
    l.nextFrame(() => {
      (r(),
        l.requestAnimationFrame(() => {
          l.add(vi(t, a));
        }));
    }),
    l.dispose
  );
}
function vi(t, s) {
  var r, a;
  let n = je();
  if (!t) return n.dispose;
  let l = !1;
  n.add(() => {
    l = !0;
  });
  let o =
    (a =
      (r = t.getAnimations) == null
        ? void 0
        : r.call(t).filter((d) => d instanceof CSSTransition)) != null
      ? a
      : [];
  return o.length === 0
    ? (s(), n.dispose)
    : (Promise.allSettled(o.map((d) => d.finished)).then(() => {
        l || s();
      }),
      n.dispose);
}
function ji(t, { inFlight: s, prepare: r }) {
  if (s != null && s.current) {
    r();
    return;
  }
  let a = t.style.transition;
  ((t.style.transition = "none"),
    r(),
    t.offsetHeight,
    (t.style.transition = a));
}
function Ni(t) {
  var s, r;
  return (
    (r = (s = t.getAnimations) == null ? void 0 : s.call(t)) != null ? r : []
  ).some((a) => a instanceof CSSTransition && a.playState !== "finished");
}
function es(t, s) {
  let r = c.useRef([]),
    a = H(t);
  c.useEffect(() => {
    let n = [...r.current];
    for (let [l, o] of s.entries())
      if (r.current[l] !== o) {
        let d = a(s, n);
        return ((r.current = s), d);
      }
  }, [a, ...s]);
}
let vt = c.createContext(null);
vt.displayName = "OpenClosedContext";
var ce = ((t) => (
  (t[(t.Open = 1)] = "Open"),
  (t[(t.Closed = 2)] = "Closed"),
  (t[(t.Closing = 4)] = "Closing"),
  (t[(t.Opening = 8)] = "Opening"),
  t
))(ce || {});
function jt() {
  return c.useContext(vt);
}
function wi({ value: t, children: s }) {
  return O.createElement(vt.Provider, { value: t }, s);
}
function ki({ children: t }) {
  return O.createElement(vt.Provider, { value: null }, t);
}
function Ci(t) {
  function s() {
    document.readyState !== "loading" &&
      (t(), document.removeEventListener("DOMContentLoaded", s));
  }
  typeof window < "u" &&
    typeof document < "u" &&
    (document.addEventListener("DOMContentLoaded", s), s());
}
let ke = [];
Ci(() => {
  function t(s) {
    if (!Se(s.target) || s.target === document.body || ke[0] === s.target)
      return;
    let r = s.target;
    ((r = r.closest(ht)),
      ke.unshift(r ?? s.target),
      (ke = ke.filter((a) => a != null && a.isConnected)),
      ke.splice(10));
  }
  (window.addEventListener("click", t, { capture: !0 }),
    window.addEventListener("mousedown", t, { capture: !0 }),
    window.addEventListener("focus", t, { capture: !0 }),
    document.body.addEventListener("click", t, { capture: !0 }),
    document.body.addEventListener("mousedown", t, { capture: !0 }),
    document.body.addEventListener("focus", t, { capture: !0 }));
});
function Mr(t) {
  let s = H(t),
    r = c.useRef(!1);
  c.useEffect(
    () => (
      (r.current = !1),
      () => {
        ((r.current = !0),
          bt(() => {
            r.current && s();
          }));
      }
    ),
    [s],
  );
}
function Si() {
  let t = typeof document > "u";
  return "useSyncExternalStore" in cs
    ? ((s) => s.useSyncExternalStore)(cs)(
        () => () => {},
        () => !1,
        () => !t,
      )
    : !1;
}
function rt() {
  let t = Si(),
    [s, r] = c.useState(me.isHandoffComplete);
  return (
    s && me.isHandoffComplete === !1 && r(!1),
    c.useEffect(() => {
      s !== !0 && r(!0);
    }, [s]),
    c.useEffect(() => me.handoff(), []),
    t ? !1 : s
  );
}
let Pr = c.createContext(!1);
function Ei() {
  return c.useContext(Pr);
}
function Ls(t) {
  return O.createElement(Pr.Provider, { value: t.force }, t.children);
}
function $i(t) {
  let s = Ei(),
    r = c.useContext(Ar),
    [a, n] = c.useState(() => {
      var l;
      if (!s && r !== null) return (l = r.current) != null ? l : null;
      if (me.isServer) return null;
      let o = t?.getElementById("headlessui-portal-root");
      if (o) return o;
      if (t === null) return null;
      let d = t.createElement("div");
      return (
        d.setAttribute("id", "headlessui-portal-root"),
        t.body.appendChild(d)
      );
    });
  return (
    c.useEffect(() => {
      a !== null &&
        ((t != null && t.body.contains(a)) ||
          t == null ||
          t.body.appendChild(a));
    }, [a, t]),
    c.useEffect(() => {
      s || (r !== null && n(r.current));
    }, [r, n, s]),
    a
  );
}
let Ir = c.Fragment,
  Mi = re(function (t, s) {
    let { ownerDocument: r = null, ...a } = t,
      n = c.useRef(null),
      l = he(
        El((m) => {
          n.current = m;
        }),
        s,
      ),
      o = Jt(n.current),
      d = r ?? o,
      i = $i(d),
      u = c.useContext(Ht),
      x = yt(),
      g = rt(),
      h = le();
    return (
      Mr(() => {
        var m;
        i &&
          i.childNodes.length <= 0 &&
          ((m = i.parentElement) == null || m.removeChild(i));
      }),
      !i || !g
        ? null
        : ea.createPortal(
            O.createElement(
              "div",
              {
                "data-headlessui-portal": "",
                ref: (m) => {
                  (x.dispose(), u && m && x.add(u.register(m)));
                },
              },
              h({
                ourProps: { ref: l },
                theirProps: a,
                slot: {},
                defaultTag: Ir,
                name: "Portal",
              }),
            ),
            i,
          )
    );
  });
function Pi(t, s) {
  let r = he(s),
    { enabled: a = !0, ownerDocument: n, ...l } = t,
    o = le();
  return a
    ? O.createElement(Mi, { ...l, ownerDocument: n, ref: r })
    : o({
        ourProps: { ref: r },
        theirProps: l,
        slot: {},
        defaultTag: Ir,
        name: "Portal",
      });
}
let Ii = c.Fragment,
  Ar = c.createContext(null);
function Ai(t, s) {
  let { target: r, ...a } = t,
    n = { ref: he(s) },
    l = le();
  return O.createElement(
    Ar.Provider,
    { value: r },
    l({ ourProps: n, theirProps: a, defaultTag: Ii, name: "Popover.Group" }),
  );
}
let Ht = c.createContext(null);
function Fi() {
  let t = c.useContext(Ht),
    s = c.useRef([]),
    r = H((l) => (s.current.push(l), t && t.register(l), () => a(l))),
    a = H((l) => {
      let o = s.current.indexOf(l);
      (o !== -1 && s.current.splice(o, 1), t && t.unregister(l));
    }),
    n = c.useMemo(
      () => ({ register: r, unregister: a, portals: s }),
      [r, a, s],
    );
  return [
    s,
    c.useMemo(
      () =>
        function ({ children: l }) {
          return O.createElement(Ht.Provider, { value: n }, l);
        },
      [n],
    ),
  ];
}
let Li = re(Pi),
  Fr = re(Ai),
  Oi = Object.assign(Li, { Group: Fr });
function Ti(t, s = typeof document < "u" ? document.defaultView : null, r) {
  let a = st(t, "escape");
  $r(s, "keydown", (n) => {
    a && (n.defaultPrevented || (n.key === br.Escape && r(n)));
  });
}
function Ri() {
  var t;
  let [s] = c.useState(() =>
      typeof window < "u" && typeof window.matchMedia == "function"
        ? window.matchMedia("(pointer: coarse)")
        : null,
    ),
    [r, a] = c.useState((t = s?.matches) != null ? t : !1);
  return (
    se(() => {
      if (!s) return;
      function n(l) {
        a(l.matches);
      }
      return (
        s.addEventListener("change", n),
        () => s.removeEventListener("change", n)
      );
    }, [s]),
    r
  );
}
function Di({ defaultContainers: t = [], portals: s, mainTreeNode: r } = {}) {
  let a = H(() => {
    var n, l;
    let o = et(r),
      d = [];
    for (let i of t)
      i !== null &&
        ($e(i)
          ? d.push(i)
          : "current" in i && $e(i.current) && d.push(i.current));
    if (s != null && s.current) for (let i of s.current) d.push(i);
    for (let i of (n = o?.querySelectorAll("html > *, body > *")) != null
      ? n
      : [])
      i !== document.body &&
        i !== document.head &&
        $e(i) &&
        i.id !== "headlessui-portal-root" &&
        ((r &&
          (i.contains(r) ||
            i.contains((l = r?.getRootNode()) == null ? void 0 : l.host))) ||
          d.some((u) => i.contains(u)) ||
          d.push(i));
    return d;
  });
  return {
    resolveContainers: a,
    contains: H((n) => a().some((l) => l.contains(n))),
  };
}
let Lr = c.createContext(null);
function Os({ children: t, node: s }) {
  let [r, a] = c.useState(null),
    n = Or(s ?? r);
  return O.createElement(
    Lr.Provider,
    { value: n },
    t,
    n === null &&
      O.createElement(Bt, {
        features: xt.Hidden,
        ref: (l) => {
          var o, d;
          if (l) {
            for (let i of (d =
              (o = et(l)) == null
                ? void 0
                : o.querySelectorAll("html > *, body > *")) != null
              ? d
              : [])
              if (
                i !== document.body &&
                i !== document.head &&
                $e(i) &&
                i != null &&
                i.contains(l)
              ) {
                a(i);
                break;
              }
          }
        },
      }),
  );
}
function Or(t = null) {
  var s;
  return (s = c.useContext(Lr)) != null ? s : t;
}
function ts() {
  let t = c.useRef(!1);
  return (
    se(
      () => (
        (t.current = !0),
        () => {
          t.current = !1;
        }
      ),
      [],
    ),
    t
  );
}
var Ve = ((t) => (
  (t[(t.Forwards = 0)] = "Forwards"),
  (t[(t.Backwards = 1)] = "Backwards"),
  t
))(Ve || {});
function _i() {
  let t = c.useRef(0);
  return (
    Er(
      !0,
      "keydown",
      (s) => {
        s.key === "Tab" && (t.current = s.shiftKey ? 1 : 0);
      },
      !0,
    ),
    t
  );
}
function Tr(t) {
  if (!t) return new Set();
  if (typeof t == "function") return new Set(t());
  let s = new Set();
  for (let r of t.current) $e(r.current) && s.add(r.current);
  return s;
}
let zi = "div";
var Ie = ((t) => (
  (t[(t.None = 0)] = "None"),
  (t[(t.InitialFocus = 1)] = "InitialFocus"),
  (t[(t.TabLock = 2)] = "TabLock"),
  (t[(t.FocusLock = 4)] = "FocusLock"),
  (t[(t.RestoreFocus = 8)] = "RestoreFocus"),
  (t[(t.AutoFocus = 16)] = "AutoFocus"),
  t
))(Ie || {});
function Ui(t, s) {
  let r = c.useRef(null),
    a = he(r, s),
    {
      initialFocus: n,
      initialFocusFallback: l,
      containers: o,
      features: d = 15,
      ...i
    } = t;
  rt() || (d = 0);
  let u = Jt(r.current);
  Hi(d, { ownerDocument: u });
  let x = Vi(d, {
    ownerDocument: u,
    container: r,
    initialFocus: n,
    initialFocusFallback: l,
  });
  Gi(d, {
    ownerDocument: u,
    container: r,
    containers: o,
    previousActiveElement: x,
  });
  let g = _i(),
    h = H((k) => {
      if (!Le(r.current)) return;
      let w = r.current;
      ((N) => N())(() => {
        ve(g.current, {
          [Ve.Forwards]: () => {
            Xe(w, pe.First, { skipElements: [k.relatedTarget, l] });
          },
          [Ve.Backwards]: () => {
            Xe(w, pe.Last, { skipElements: [k.relatedTarget, l] });
          },
        });
      });
    }),
    m = st(!!(d & 2), "focus-trap#tab-lock"),
    p = yt(),
    y = c.useRef(!1),
    v = {
      ref: a,
      onKeyDown(k) {
        k.key == "Tab" &&
          ((y.current = !0),
          p.requestAnimationFrame(() => {
            y.current = !1;
          }));
      },
      onBlur(k) {
        if (!(d & 4)) return;
        let w = Tr(o);
        Le(r.current) && w.add(r.current);
        let N = k.relatedTarget;
        Se(N) &&
          N.dataset.headlessuiFocusGuard !== "true" &&
          (Rr(w, N) ||
            (y.current
              ? Xe(
                  r.current,
                  ve(g.current, {
                    [Ve.Forwards]: () => pe.Next,
                    [Ve.Backwards]: () => pe.Previous,
                  }) | pe.WrapAround,
                  { relativeTo: k.target },
                )
              : Se(k.target) && be(k.target)));
      },
    },
    j = le();
  return O.createElement(
    O.Fragment,
    null,
    m &&
      O.createElement(Bt, {
        as: "button",
        type: "button",
        "data-headlessui-focus-guard": !0,
        onFocus: h,
        features: xt.Focusable,
      }),
    j({ ourProps: v, theirProps: i, defaultTag: zi, name: "FocusTrap" }),
    m &&
      O.createElement(Bt, {
        as: "button",
        type: "button",
        "data-headlessui-focus-guard": !0,
        onFocus: h,
        features: xt.Focusable,
      }),
  );
}
let Bi = re(Ui),
  qi = Object.assign(Bi, { features: Ie });
function Wi(t = !0) {
  let s = c.useRef(ke.slice());
  return (
    es(
      ([r], [a]) => {
        (a === !0 &&
          r === !1 &&
          bt(() => {
            s.current.splice(0);
          }),
          a === !1 && r === !0 && (s.current = ke.slice()));
      },
      [t, ke, s],
    ),
    H(() => {
      var r;
      return (r = s.current.find((a) => a != null && a.isConnected)) != null
        ? r
        : null;
    })
  );
}
function Hi(t, { ownerDocument: s }) {
  let r = !!(t & 8),
    a = Wi(r);
  (es(() => {
    r || (xl(s?.body) && be(a()));
  }, [r]),
    Mr(() => {
      r && be(a());
    }));
}
function Vi(
  t,
  { ownerDocument: s, container: r, initialFocus: a, initialFocusFallback: n },
) {
  let l = c.useRef(null),
    o = st(!!(t & 1), "focus-trap#initial-focus"),
    d = ts();
  return (
    es(() => {
      if (t === 0) return;
      if (!o) {
        n != null && n.current && be(n.current);
        return;
      }
      let i = r.current;
      i &&
        bt(() => {
          if (!d.current) return;
          let u = s?.activeElement;
          if (a != null && a.current) {
            if (a?.current === u) {
              l.current = u;
              return;
            }
          } else if (i.contains(u)) {
            l.current = u;
            return;
          }
          if (a != null && a.current) be(a.current);
          else {
            if (t & 16) {
              if (Xe(i, pe.First | pe.AutoFocus) !== Wt.Error) return;
            } else if (Xe(i, pe.First) !== Wt.Error) return;
            if (
              n != null &&
              n.current &&
              (be(n.current), s?.activeElement === n.current)
            )
              return;
            console.warn(
              "There are no focusable elements inside the <FocusTrap />",
            );
          }
          l.current = s?.activeElement;
        });
    }, [n, o, t]),
    l
  );
}
function Gi(
  t,
  { ownerDocument: s, container: r, containers: a, previousActiveElement: n },
) {
  let l = ts(),
    o = !!(t & 4);
  $r(
    s?.defaultView,
    "focus",
    (d) => {
      if (!o || !l.current) return;
      let i = Tr(a);
      Le(r.current) && i.add(r.current);
      let u = n.current;
      if (!u) return;
      let x = d.target;
      Le(x)
        ? Rr(i, x)
          ? ((n.current = x), be(x))
          : (d.preventDefault(), d.stopPropagation(), be(u))
        : be(n.current);
    },
    !0,
  );
}
function Rr(t, s) {
  for (let r of t) if (r.contains(s)) return !0;
  return !1;
}
function Dr(t) {
  var s;
  return (
    !!(
      t.enter ||
      t.enterFrom ||
      t.enterTo ||
      t.leave ||
      t.leaveFrom ||
      t.leaveTo
    ) ||
    !Ge((s = t.as) != null ? s : zr) ||
    O.Children.count(t.children) === 1
  );
}
let Nt = c.createContext(null);
Nt.displayName = "TransitionContext";
var Ki = ((t) => ((t.Visible = "visible"), (t.Hidden = "hidden"), t))(Ki || {});
function Xi() {
  let t = c.useContext(Nt);
  if (t === null)
    throw new Error(
      "A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.",
    );
  return t;
}
function Yi() {
  let t = c.useContext(wt);
  if (t === null)
    throw new Error(
      "A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.",
    );
  return t;
}
let wt = c.createContext(null);
wt.displayName = "NestingContext";
function kt(t) {
  return "children" in t
    ? kt(t.children)
    : t.current
        .filter(({ el: s }) => s.current !== null)
        .filter(({ state: s }) => s === "visible").length > 0;
}
function _r(t, s) {
  let r = Oe(t),
    a = c.useRef([]),
    n = ts(),
    l = yt(),
    o = H((m, p = Ce.Hidden) => {
      let y = a.current.findIndex(({ el: v }) => v === m);
      y !== -1 &&
        (ve(p, {
          [Ce.Unmount]() {
            a.current.splice(y, 1);
          },
          [Ce.Hidden]() {
            a.current[y].state = "hidden";
          },
        }),
        l.microTask(() => {
          var v;
          !kt(a) && n.current && ((v = r.current) == null || v.call(r));
        }));
    }),
    d = H((m) => {
      let p = a.current.find(({ el: y }) => y === m);
      return (
        p
          ? p.state !== "visible" && (p.state = "visible")
          : a.current.push({ el: m, state: "visible" }),
        () => o(m, Ce.Unmount)
      );
    }),
    i = c.useRef([]),
    u = c.useRef(Promise.resolve()),
    x = c.useRef({ enter: [], leave: [] }),
    g = H((m, p, y) => {
      (i.current.splice(0),
        s &&
          (s.chains.current[p] = s.chains.current[p].filter(([v]) => v !== m)),
        s?.chains.current[p].push([
          m,
          new Promise((v) => {
            i.current.push(v);
          }),
        ]),
        s?.chains.current[p].push([
          m,
          new Promise((v) => {
            Promise.all(x.current[p].map(([j, k]) => k)).then(() => v());
          }),
        ]),
        p === "enter"
          ? (u.current = u.current.then(() => s?.wait.current).then(() => y(p)))
          : y(p));
    }),
    h = H((m, p, y) => {
      Promise.all(x.current[p].splice(0).map(([v, j]) => j))
        .then(() => {
          var v;
          (v = i.current.shift()) == null || v();
        })
        .then(() => y(p));
    });
  return c.useMemo(
    () => ({
      children: a,
      register: d,
      unregister: o,
      onStart: g,
      onStop: h,
      wait: u,
      chains: x,
    }),
    [d, o, a, g, h, x, u],
  );
}
let zr = c.Fragment,
  Ur = mt.RenderStrategy;
function Qi(t, s) {
  var r, a;
  let {
      transition: n = !0,
      beforeEnter: l,
      afterEnter: o,
      beforeLeave: d,
      afterLeave: i,
      enter: u,
      enterFrom: x,
      enterTo: g,
      entered: h,
      leave: m,
      leaveFrom: p,
      leaveTo: y,
      ...v
    } = t,
    [j, k] = c.useState(null),
    w = c.useRef(null),
    N = Dr(t),
    $ = he(...(N ? [w, s, k] : s === null ? [] : [s])),
    S = (r = v.unmount) == null || r ? Ce.Unmount : Ce.Hidden,
    { show: A, appear: q, initial: ee } = Xi(),
    [P, D] = c.useState(A ? "visible" : "hidden"),
    E = Yi(),
    { register: W, unregister: J } = E;
  (se(() => W(w), [W, w]),
    se(() => {
      if (S === Ce.Hidden && w.current) {
        if (A && P !== "visible") {
          D("visible");
          return;
        }
        return ve(P, { hidden: () => J(w), visible: () => W(w) });
      }
    }, [P, w, W, J, A, S]));
  let Q = rt();
  se(() => {
    if (N && Q && P === "visible" && w.current === null)
      throw new Error(
        "Did you forget to passthrough the `ref` to the actual DOM node?",
      );
  }, [w, P, Q, N]);
  let Te = ee && !q,
    Re = q && A && ee,
    Ne = c.useRef(!1),
    we = _r(() => {
      Ne.current || (D("hidden"), J(w));
    }, E),
    b = H((I) => {
      Ne.current = !0;
      let T = I ? "enter" : "leave";
      we.onStart(w, T, (B) => {
        B === "enter" ? l?.() : B === "leave" && d?.();
      });
    }),
    f = H((I) => {
      let T = I ? "enter" : "leave";
      ((Ne.current = !1),
        we.onStop(w, T, (B) => {
          B === "enter" ? o?.() : B === "leave" && i?.();
        }),
        T === "leave" && !kt(we) && (D("hidden"), J(w)));
    });
  c.useEffect(() => {
    (N && n) || (b(A), f(A));
  }, [A, N, n]);
  let M = !(!n || !N || !Q || Te),
    [, C] = bi(M, j, A, { start: b, end: f }),
    F = Pe({
      ref: $,
      className:
        ((a = Ut(
          v.className,
          Re && u,
          Re && x,
          C.enter && u,
          C.enter && C.closed && x,
          C.enter && !C.closed && g,
          C.leave && m,
          C.leave && !C.closed && p,
          C.leave && C.closed && y,
          !C.transition && A && h,
        )) == null
          ? void 0
          : a.trim()) || void 0,
      ...gi(C),
    }),
    L = 0;
  (P === "visible" && (L |= ce.Open),
    P === "hidden" && (L |= ce.Closed),
    A && P === "hidden" && (L |= ce.Opening),
    !A && P === "visible" && (L |= ce.Closing));
  let _ = le();
  return O.createElement(
    wt.Provider,
    { value: we },
    O.createElement(
      wi,
      { value: L },
      _({
        ourProps: F,
        theirProps: v,
        defaultTag: zr,
        features: Ur,
        visible: P === "visible",
        name: "Transition.Child",
      }),
    ),
  );
}
function Zi(t, s) {
  let { show: r, appear: a = !1, unmount: n = !0, ...l } = t,
    o = c.useRef(null),
    d = Dr(t),
    i = he(...(d ? [o, s] : s === null ? [] : [s]));
  rt();
  let u = jt();
  if (
    (r === void 0 && u !== null && (r = (u & ce.Open) === ce.Open),
    r === void 0)
  )
    throw new Error(
      "A <Transition /> is used but it is missing a `show={true | false}` prop.",
    );
  let [x, g] = c.useState(r ? "visible" : "hidden"),
    h = _r(() => {
      r || g("hidden");
    }),
    [m, p] = c.useState(!0),
    y = c.useRef([r]);
  se(() => {
    m !== !1 &&
      y.current[y.current.length - 1] !== r &&
      (y.current.push(r), p(!1));
  }, [y, r]);
  let v = c.useMemo(() => ({ show: r, appear: a, initial: m }), [r, a, m]);
  se(() => {
    r ? g("visible") : !kt(h) && o.current !== null && g("hidden");
  }, [r, h]);
  let j = { unmount: n },
    k = H(() => {
      var $;
      (m && p(!1), ($ = t.beforeEnter) == null || $.call(t));
    }),
    w = H(() => {
      var $;
      (m && p(!1), ($ = t.beforeLeave) == null || $.call(t));
    }),
    N = le();
  return O.createElement(
    wt.Provider,
    { value: h },
    O.createElement(
      Nt.Provider,
      { value: v },
      N({
        ourProps: {
          ...j,
          as: c.Fragment,
          children: O.createElement(Br, {
            ref: i,
            ...j,
            ...l,
            beforeEnter: k,
            beforeLeave: w,
          }),
        },
        theirProps: {},
        defaultTag: c.Fragment,
        features: Ur,
        visible: x === "visible",
        name: "Transition",
      }),
    ),
  );
}
function Ji(t, s) {
  let r = c.useContext(Nt) !== null,
    a = jt() !== null;
  return O.createElement(
    O.Fragment,
    null,
    !r && a
      ? O.createElement(Vt, { ref: s, ...t })
      : O.createElement(Br, { ref: s, ...t }),
  );
}
let Vt = re(Zi),
  Br = re(Qi),
  ss = re(Ji),
  eo = Object.assign(Vt, { Child: ss, Root: Vt });
var to = ((t) => (
    (t[(t.Open = 0)] = "Open"),
    (t[(t.Closed = 1)] = "Closed"),
    t
  ))(to || {}),
  so = ((t) => ((t[(t.SetTitleId = 0)] = "SetTitleId"), t))(so || {});
let ro = {
    0(t, s) {
      return t.titleId === s.id ? t : { ...t, titleId: s.id };
    },
  },
  rs = c.createContext(null);
rs.displayName = "DialogContext";
function Ct(t) {
  let s = c.useContext(rs);
  if (s === null) {
    let r = new Error(`<${t} /> is missing a parent <Dialog /> component.`);
    throw (Error.captureStackTrace && Error.captureStackTrace(r, Ct), r);
  }
  return s;
}
function ao(t, s) {
  return ve(s.type, ro, t, s);
}
let Ts = re(function (t, s) {
    let r = c.useId(),
      {
        id: a = `headlessui-dialog-${r}`,
        open: n,
        onClose: l,
        initialFocus: o,
        role: d = "dialog",
        autoFocus: i = !0,
        __demoMode: u = !1,
        unmount: x = !1,
        ...g
      } = t,
      h = c.useRef(!1);
    d = (function () {
      return d === "dialog" || d === "alertdialog"
        ? d
        : (h.current ||
            ((h.current = !0),
            console.warn(
              `Invalid role [${d}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`,
            )),
          "dialog");
    })();
    let m = jt();
    n === void 0 && m !== null && (n = (m & ce.Open) === ce.Open);
    let p = c.useRef(null),
      y = he(p, s),
      v = Jt(p.current),
      j = n ? 0 : 1,
      [k, w] = c.useReducer(ao, {
        titleId: null,
        descriptionId: null,
        panelRef: c.createRef(),
      }),
      N = H(() => l(!1)),
      $ = H((C) => w({ type: 0, id: C })),
      S = rt() ? j === 0 : !1,
      [A, q] = Fi(),
      ee = {
        get current() {
          var C;
          return (C = k.panelRef.current) != null ? C : p.current;
        },
      },
      P = Or(),
      { resolveContainers: D } = Di({
        mainTreeNode: P,
        portals: A,
        defaultContainers: [ee],
      }),
      E = m !== null ? (m & ce.Closing) === ce.Closing : !1;
    Kl(u || E ? !1 : S, {
      allowed: H(() => {
        var C, F;
        return [
          (F =
            (C = p.current) == null
              ? void 0
              : C.closest("[data-headlessui-portal]")) != null
            ? F
            : null,
        ];
      }),
      disallowed: H(() => {
        var C;
        return [
          (C = P?.closest("body > *:not(#headlessui-portal-root)")) != null
            ? C
            : null,
        ];
      }),
    });
    let W = wr.get(null);
    se(() => {
      if (S) return (W.actions.push(a), () => W.actions.pop(a));
    }, [W, a, S]);
    let J = kr(
      W,
      c.useCallback((C) => W.selectors.isTop(C, a), [W, a]),
    );
    (li(J, D, (C) => {
      (C.preventDefault(), N());
    }),
      Ti(J, v?.defaultView, (C) => {
        (C.preventDefault(),
          C.stopPropagation(),
          document.activeElement &&
            "blur" in document.activeElement &&
            typeof document.activeElement.blur == "function" &&
            document.activeElement.blur(),
          N());
      }),
      xi(u || E ? !1 : S, v, D),
      Xl(S, p, N));
    let [Q, Te] = $l(),
      Re = c.useMemo(
        () => [{ dialogState: j, close: N, setTitleId: $, unmount: x }, k],
        [j, N, $, x, k],
      ),
      Ne = tt({ open: j === 0 }),
      we = {
        ref: y,
        id: a,
        role: d,
        tabIndex: -1,
        "aria-modal": u ? void 0 : j === 0 ? !0 : void 0,
        "aria-labelledby": k.titleId,
        "aria-describedby": Q,
        unmount: x,
      },
      b = !Ri(),
      f = Ie.None;
    S &&
      !u &&
      ((f |= Ie.RestoreFocus),
      (f |= Ie.TabLock),
      i && (f |= Ie.AutoFocus),
      b && (f |= Ie.InitialFocus));
    let M = le();
    return O.createElement(
      ki,
      null,
      O.createElement(
        Ls,
        { force: !0 },
        O.createElement(
          Oi,
          null,
          O.createElement(
            rs.Provider,
            { value: Re },
            O.createElement(
              Fr,
              { target: p },
              O.createElement(
                Ls,
                { force: !1 },
                O.createElement(
                  Te,
                  { slot: Ne },
                  O.createElement(
                    q,
                    null,
                    O.createElement(
                      qi,
                      {
                        initialFocus: o,
                        initialFocusFallback: p,
                        containers: D,
                        features: f,
                      },
                      O.createElement(
                        Ll,
                        { value: N },
                        M({
                          ourProps: we,
                          theirProps: g,
                          slot: Ne,
                          defaultTag: no,
                          features: lo,
                          visible: j === 0,
                          name: "Dialog",
                        }),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }),
  no = "div",
  lo = mt.RenderStrategy | mt.Static;
function io(t, s) {
  let { transition: r = !1, open: a, ...n } = t,
    l = jt(),
    o = t.hasOwnProperty("open") || l !== null,
    d = t.hasOwnProperty("onClose");
  if (!o && !d)
    throw new Error(
      "You have to provide an `open` and an `onClose` prop to the `Dialog` component.",
    );
  if (!o)
    throw new Error(
      "You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.",
    );
  if (!d)
    throw new Error(
      "You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.",
    );
  if (!l && typeof t.open != "boolean")
    throw new Error(
      `You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${t.open}`,
    );
  if (typeof t.onClose != "function")
    throw new Error(
      `You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${t.onClose}`,
    );
  return (a !== void 0 || r) && !n.static
    ? O.createElement(
        Os,
        null,
        O.createElement(
          eo,
          { show: a, transition: r, unmount: n.unmount },
          O.createElement(Ts, { ref: s, ...n }),
        ),
      )
    : O.createElement(Os, null, O.createElement(Ts, { ref: s, open: a, ...n }));
}
let oo = "div";
function co(t, s) {
  let r = c.useId(),
    { id: a = `headlessui-dialog-panel-${r}`, transition: n = !1, ...l } = t,
    [{ dialogState: o, unmount: d }, i] = Ct("Dialog.Panel"),
    u = he(s, i.panelRef),
    x = tt({ open: o === 0 }),
    g = H((v) => {
      v.stopPropagation();
    }),
    h = { ref: u, id: a, onClick: g },
    m = n ? ss : c.Fragment,
    p = n ? { unmount: d } : {},
    y = le();
  return O.createElement(
    m,
    { ...p },
    y({
      ourProps: h,
      theirProps: l,
      slot: x,
      defaultTag: oo,
      name: "Dialog.Panel",
    }),
  );
}
let uo = "div";
function mo(t, s) {
  let { transition: r = !1, ...a } = t,
    [{ dialogState: n, unmount: l }] = Ct("Dialog.Backdrop"),
    o = tt({ open: n === 0 }),
    d = { ref: s, "aria-hidden": !0 },
    i = r ? ss : c.Fragment,
    u = r ? { unmount: l } : {},
    x = le();
  return O.createElement(
    i,
    { ...u },
    x({
      ourProps: d,
      theirProps: a,
      slot: o,
      defaultTag: uo,
      name: "Dialog.Backdrop",
    }),
  );
}
let xo = "h2";
function ho(t, s) {
  let r = c.useId(),
    { id: a = `headlessui-dialog-title-${r}`, ...n } = t,
    [{ dialogState: l, setTitleId: o }] = Ct("Dialog.Title"),
    d = he(s);
  c.useEffect(() => (o(a), () => o(null)), [a, o]);
  let i = tt({ open: l === 0 }),
    u = { ref: d, id: a };
  return le()({
    ourProps: u,
    theirProps: n,
    slot: i,
    defaultTag: xo,
    name: "Dialog.Title",
  });
}
let fo = re(io),
  po = re(co);
re(mo);
let go = re(ho),
  Rs = Object.assign(fo, { Panel: po, Title: go, Description: Al });
const Ds = { round: "круг", square: "квадрат", heart: "сердце" },
  bo = {
    small: "малый",
    medium: "средний",
    large: "большой",
    s: "S",
    m: "M",
    l: "L",
    xl: "XL",
  },
  yo = {
    milka: "Milka",
    raffaello: "Raffaello",
    kinder: "Kinder",
    ferrero: "Ferrero",
    merci: "Merci",
  },
  vo = {
    box: "коробка",
    "round-basket": "корзина",
    "tiered-tower": "башня",
    "heart-box": "сердце",
  },
  jo = {
    "kinder-chocolate": "Kinder Chocolate",
    "kinder-bueno": "Kinder Bueno",
    "milka-baton": "Milka Baton",
    twix: "Twix",
    rittersport: "RitterSport",
    kitkat: "Kitkat",
    snikers: "Snikers",
    milkiway: "MilkiWay",
  },
  No = {
    standard: "фирменная коробка",
    window: "коробка с окном",
    gift: "подарочная упаковка",
    "premium-box": "премиум-бокс",
  };
function wo(t) {
  return !!(
    t &&
    typeof t == "object" &&
    ("candies" in t || t.type === "custom_cake")
  );
}
const ko = ({ isOpen: t, onClose: s, order: r, onUpdate: a }) => {
  const [n, l] = c.useState(r.status),
    [o, d] = c.useState(() => r.items.map((p) => ({ ...p }))),
    i = c.useMemo(
      () => o.reduce((p, y) => p + y.price * y.quantity * 100, 0),
      [o],
    ),
    u = c.useMemo(
      () =>
        new Intl.NumberFormat("ru-RU", {
          style: "currency",
          currency: r.currency || "RUB",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(i / 100),
      [r.currency, i],
    ),
    x = async () => {
      const p = o.some((y) => y.productId === null);
      (await a(r.id, {
        status: n,
        items: p
          ? void 0
          : o.map(({ productId: y, quantity: v }) => ({
              productId: y,
              quantity: v,
            })),
      }),
        s());
    },
    { products: g } = Je(),
    h = c.useMemo(() => new Map(g.map((p) => [p.id, p])), [g]),
    m = c.useMemo(
      () =>
        Object.fromEntries(
          r.items
            .filter((p) => p.productId !== null)
            .map((p) => [p.productId, p.quantity]),
        ),
      [r.items],
    );
  return e.jsxs(Rs, {
    open: t,
    onClose: s,
    className:
      "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4",
    children: [
      e.jsx("div", {
        className: "fixed inset-0 bg-black bg-opacity-30",
        "aria-hidden": "true",
      }),
      e.jsxs("div", {
        className:
          "bg-white rounded-lg shadow p-4 sm:p-6 z-10 w-full max-w-xl max-h-[92vh] overflow-y-auto",
        children: [
          e.jsxs(Rs.Title, {
            className: "text-lg font-bold mb-4",
            children: ["Заказ #", r.id],
          }),
          e.jsxs("div", {
            className: "mb-4",
            children: [
              e.jsxs("p", {
                className: "font-semibold",
                children: ["Пользователь ID: ", r.userId],
              }),
              e.jsxs("p", {
                className: "font-semibold",
                children: ["Сумма: ", u],
              }),
            ],
          }),
          e.jsxs("div", {
            className: "mb-4",
            children: [
              e.jsx("label", {
                htmlFor: "order-status",
                className: "block font-semibold mb-1",
                children: "Статус:",
              }),
              e.jsx("select", {
                id: "order-status",
                className: "w-full border rounded px-2 py-1",
                value: n,
                onChange: (p) => l(p.target.value),
                children: Object.entries(Yt).map(([p, y]) =>
                  e.jsx("option", { value: p, children: y }, p),
                ),
              }),
            ],
          }),
          e.jsxs("div", {
            className: "mb-4",
            children: [
              e.jsx("label", {
                className: "block font-semibold mb-1",
                children: "Товары:",
              }),
              e.jsx("ul", {
                className: "max-h-72 overflow-auto",
                children: o.map((p, y) => {
                  const v = p.productId,
                    j = v === null,
                    w = (v === null ? void 0 : h.get(v))?.inStock ?? 0,
                    N = wo(p.customConfig) ? p.customConfig : null,
                    $ =
                      N?.type === "custom_cake"
                        ? (N.innerLayer
                            ?.filter((q) => Number(q.percentage) > 0)
                            .map(
                              (q) =>
                                `${q.candyId ? yo[q.candyId] : "конфета"} ${q.percentage}%`,
                            )
                            .join(", ") ?? "")
                        : (N?.candies
                            ?.filter((q) => Number(q.quantity) > 0)
                            .map(
                              (q) =>
                                `${q.name ?? q.id ?? "конфета"} x${q.quantity}`,
                            )
                            .join(", ") ?? ""),
                    S = v === null ? p.quantity : (m[v] ?? p.quantity),
                    A = w + S;
                  return e.jsxs(
                    "li",
                    {
                      className:
                        "flex flex-col gap-2 border-b border-gray-100 py-3 last:border-b-0",
                      children: [
                        e.jsxs("div", {
                          className:
                            "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2",
                          children: [
                            e.jsxs("span", {
                              className: "truncate",
                              children: [
                                p.productName,
                                e.jsx("span", {
                                  className: "ml-2 text-xs text-gray-500",
                                  children: j
                                    ? "(индивидуальная сборка)"
                                    : `(доступно: ${w}, максимум: ${A})`,
                                }),
                              ],
                            }),
                            e.jsxs("div", {
                              className:
                                "flex items-center gap-2 self-stretch sm:self-auto",
                              children: [
                                e.jsx("input", {
                                  type: "number",
                                  value: p.quantity,
                                  min: 0,
                                  max: A,
                                  disabled: j,
                                  onChange: (q) => {
                                    const ee = Number(q.target.value),
                                      P = Number.isFinite(ee) ? ee : 0,
                                      D = Math.min(Math.max(P, 0), A);
                                    d((E) =>
                                      E.map((W, J) =>
                                        J === y ? { ...W, quantity: D } : W,
                                      ),
                                    );
                                  },
                                  className:
                                    "border rounded px-2 py-1 w-20 disabled:bg-gray-100",
                                }),
                                e.jsxs("span", {
                                  className: "text-sm text-gray-600",
                                  children: ["× ", p.price, " ₽"],
                                }),
                              ],
                            }),
                          ],
                        }),
                        N &&
                          e.jsxs("div", {
                            className:
                              "rounded-lg border border-rose-100 bg-rose-50 px-3 py-2 text-xs text-gray-700",
                            children: [
                              e.jsxs("div", {
                                children: [
                                  "Тип:",
                                  " ",
                                  N.type === "custom_cake"
                                    ? "PNG-слои"
                                    : N.layout
                                      ? vo[N.layout]
                                      : "—",
                                  ", Форма:",
                                  " ",
                                  N.type === "custom_cake" && N.base
                                    ? Ds[N.base]
                                    : N.shape
                                      ? Ds[N.shape]
                                      : "—",
                                  ", размер:",
                                  " ",
                                  N.size ? bo[N.size] : "—",
                                ],
                              }),
                              $ &&
                                e.jsxs("div", {
                                  className: "mt-1",
                                  children: [
                                    N.type === "custom_cake"
                                      ? "Внутренний слой"
                                      : "Конфеты",
                                    ": ",
                                    $,
                                  ],
                                }),
                              N.type === "custom_cake" &&
                                e.jsxs("div", {
                                  className: "mt-1",
                                  children: [
                                    N.outerLayer
                                      ? jo[N.outerLayer]
                                      : "наружный ряд не указан",
                                    ",",
                                    " ",
                                    N.packaging
                                      ? No[N.packaging]
                                      : "упаковка не указана",
                                  ],
                                }),
                              (N.inscription || N.messageText) &&
                                e.jsxs("div", {
                                  className: "mt-1",
                                  children: [
                                    "Надпись:",
                                    " ",
                                    N.inscription || N.messageText,
                                  ],
                                }),
                            ],
                          }),
                      ],
                    },
                    p.id || y,
                  );
                }),
              }),
            ],
          }),
          e.jsxs("div", {
            className: "flex flex-col-reverse sm:flex-row sm:justify-end gap-2",
            children: [
              e.jsx("button", {
                onClick: s,
                className:
                  "w-full sm:w-auto px-4 py-2 rounded border hover:bg-gray-100",
                children: "Закрыть",
              }),
              e.jsx("button", {
                onClick: x,
                className:
                  "w-full sm:w-auto px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700",
                children: "Сохранить",
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
function Co(t) {
  if (typeof t.finalAmountMinor != "number") return "—";
  const s = t.currency || "RUB",
    r = t.finalAmountMinor;
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: s,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(r / 100);
}
function So() {
  const { orders: t, updateOrder: s, deleteOrder: r } = or(),
    [a, n] = c.useState(!1),
    [l, o] = c.useState(null),
    d = async (g, h) => {
      await s(g, h);
    },
    i = async (g) => {
      window.confirm("Удалить заказ?") && (await r(g));
    },
    u = (g) => {
      (o(g), n(!0));
    },
    x = () => {
      (o(null), n(!1));
    };
  return e.jsxs(gt, {
    title: "Управление заказами",
    children: [
      e.jsx("div", {
        className: "bg-white rounded-lg shadow overflow-hidden",
        children: e.jsx("div", {
          className: "overflow-x-auto",
          children: e.jsxs("table", {
            className: "w-full min-w-[760px]",
            children: [
              e.jsx("thead", {
                className: "bg-gray-50",
                children: e.jsxs("tr", {
                  children: [
                    e.jsx("th", {
                      className: "px-6 py-3 text-left",
                      children: "ID заказа",
                    }),
                    e.jsx("th", {
                      className: "px-6 py-3 text-left",
                      children: "Пользователь",
                    }),
                    e.jsx("th", {
                      className: "px-6 py-3 text-left",
                      children: "Статус",
                    }),
                    e.jsx("th", {
                      className: "px-6 py-3 text-left",
                      children: "Сумма",
                    }),
                    e.jsx("th", {
                      className: "px-6 py-3 text-left",
                      children: "Товары",
                    }),
                    e.jsx("th", {
                      className: "px-6 py-3 text-left",
                      children: "Действия",
                    }),
                  ],
                }),
              }),
              e.jsx("tbody", {
                children: t.map((g) =>
                  e.jsxs(
                    "tr",
                    {
                      className: "border-t hover:bg-gray-50",
                      children: [
                        e.jsx("td", { className: "px-6 py-4", children: g.id }),
                        e.jsx("td", {
                          className: "px-6 py-4",
                          children: g.fullName,
                        }),
                        e.jsx("td", {
                          className: "px-6 py-4",
                          children: Yt[g.status],
                        }),
                        e.jsx("td", {
                          className: "px-6 py-4",
                          children: Co(g),
                        }),
                        e.jsx("td", {
                          className: "px-6 py-4",
                          children: e.jsx("ul", {
                            children: g.items?.map((h) =>
                              e.jsxs(
                                "li",
                                {
                                  children: [
                                    h.productName,
                                    h.productId === null
                                      ? " (индивидуальный)"
                                      : "",
                                    " — ",
                                    h.quantity,
                                    "шт.",
                                  ],
                                },
                                h.id,
                              ),
                            ),
                          }),
                        }),
                        e.jsx("td", {
                          className: "px-6 py-4",
                          children: e.jsxs("div", {
                            className: "flex gap-2",
                            children: [
                              e.jsx("button", {
                                onClick: () => u(g),
                                "aria-label": `Редактировать заказ ${g.id}`,
                                className:
                                  "p-2 text-blue-600 hover:bg-blue-50 rounded",
                                children: e.jsx(Xt, { size: 16 }),
                              }),
                              e.jsx("button", {
                                onClick: () => i(g.id),
                                "aria-label": `Удалить заказ ${g.id}`,
                                className:
                                  "p-2 text-red-600 hover:bg-red-50 rounded",
                                children: e.jsx(pt, { size: 16 }),
                              }),
                            ],
                          }),
                        }),
                      ],
                    },
                    g.id,
                  ),
                ),
              }),
            ],
          }),
        }),
      }),
      a && l && e.jsx(ko, { isOpen: a, onClose: x, order: l, onUpdate: d }),
    ],
  });
}
const qr = c.createContext(void 0);
function Eo({ children: t }) {
  const [s, r] = c.useState([]),
    [a, n] = c.useState(!1),
    [l, o] = c.useState(null),
    d = async () => {
      (n(!0), o(null));
      try {
        const h = await z.get("/categories");
        r(h);
      } catch (h) {
        o(h?.message ?? "Ошибка загрузки категорий");
      } finally {
        n(!1);
      }
    };
  c.useEffect(() => {
    d();
  }, []);
  const i = async (h) => {
      const m = await z.post("/categories", h);
      return (r((p) => [m, ...p]), m);
    },
    u = async (h, m) => {
      const p = await z.put(`/categories/${h}`, m);
      return (r((y) => y.map((v) => (v.id === h ? p : v))), p);
    },
    x = async (h) => {
      (await z.del(`/categories/${h}`), r((m) => m.filter((p) => p.id !== h)));
    },
    g = c.useMemo(
      () => ({
        categories: s,
        isLoading: a,
        error: l,
        refetch: d,
        createCategory: i,
        updateCategory: u,
        deleteCategory: x,
      }),
      [s, a, l],
    );
  return e.jsx(qr.Provider, { value: g, children: t });
}
function $o() {
  const t = c.useContext(qr);
  if (!t)
    throw new Error("useCategories must be used within a CategoryProvider");
  return t;
}
const _s = { name: "", description: "", imageUrl: "" };
function Mo({ isOpen: t, onClose: s, onCreate: r, onUpdate: a, category: n }) {
  const l = c.useMemo(() => !!n?.id, [n]),
    [o, d] = c.useState(_s),
    [i, u] = c.useState(!1);
  c.useEffect(() => {
    t &&
      d(
        n
          ? {
              name: n.name ?? "",
              description: n.description ?? "",
              imageUrl: n.imageUrl ?? "",
            }
          : _s,
      );
  }, [t, n]);
  const x = (m, p) => {
      d((y) => ({ ...y, [m]: p }));
    },
    g = () =>
      o.name.trim()
        ? o.description.trim()
          ? null
          : "Введите описание"
        : "Введите название",
    h = async (m) => {
      m.preventDefault();
      const p = g();
      if (p) {
        alert(p);
        return;
      }
      u(!0);
      try {
        (l && n ? await a(n.id, o) : await r(o), s());
      } finally {
        u(!1);
      }
    };
  return t
    ? e.jsxs("div", {
        className:
          "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4",
        children: [
          e.jsx("button", {
            type: "button",
            onClick: s,
            className: "absolute inset-0 bg-black/40",
            "aria-label": "Close modal overlay",
          }),
          e.jsxs("div", {
            className:
              "relative z-10 w-full max-w-xl bg-white rounded-lg shadow-lg max-h-[90vh] flex flex-col overflow-hidden",
            children: [
              e.jsxs("div", {
                className:
                  "px-4 sm:px-6 py-4 border-b flex items-center justify-between gap-4",
                children: [
                  e.jsx("h2", {
                    className: "text-lg font-semibold",
                    children: l
                      ? "Редактировать категорию"
                      : "Добавить категорию",
                  }),
                  e.jsx("button", {
                    type: "button",
                    onClick: s,
                    className:
                      "px-2 py-1 rounded hover:bg-gray-100 text-gray-600",
                    children: "✕",
                  }),
                ],
              }),
              e.jsxs("form", {
                onSubmit: h,
                className: "px-4 sm:px-6 py-5 space-y-4 overflow-y-auto",
                children: [
                  e.jsxs("div", {
                    children: [
                      e.jsx("label", {
                        className:
                          "block text-sm font-medium text-gray-700 mb-1",
                        children: "Название",
                      }),
                      e.jsx("input", {
                        value: o.name,
                        onChange: (m) => x("name", m.target.value),
                        className:
                          "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300",
                        placeholder: "Например: Торты",
                      }),
                    ],
                  }),
                  e.jsxs("div", {
                    children: [
                      e.jsx("label", {
                        className:
                          "block text-sm font-medium text-gray-700 mb-1",
                        children: "Описание",
                      }),
                      e.jsx("textarea", {
                        value: o.description,
                        onChange: (m) => x("description", m.target.value),
                        className:
                          "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 min-h-22.5",
                        placeholder: "Короткое описание категории",
                      }),
                    ],
                  }),
                  e.jsx(dr, {
                    label: "Изображение категории",
                    value: o.imageUrl,
                    onChange: (m) => x("imageUrl", m),
                    folder: "categories",
                  }),
                  e.jsxs("div", {
                    className:
                      "pt-2 flex flex-col-reverse sm:flex-row sm:justify-end gap-2",
                    children: [
                      e.jsx("button", {
                        type: "button",
                        onClick: s,
                        className:
                          "w-full sm:w-auto px-4 py-2 rounded-lg border hover:bg-gray-50",
                        disabled: i,
                        children: "Отмена",
                      }),
                      e.jsx("button", {
                        type: "submit",
                        className:
                          "w-full sm:w-auto px-4 py-2 rounded-lg bg-[#ff398b] text-white hover:bg-[#e0327a] disabled:opacity-60",
                        disabled: i,
                        children: i
                          ? "Сохранение..."
                          : l
                            ? "Сохранить"
                            : "Создать",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      })
    : null;
}
function Po() {
  const {
      categories: t,
      createCategory: s,
      updateCategory: r,
      deleteCategory: a,
    } = $o(),
    [n, l] = c.useState(!1),
    [o, d] = c.useState(null),
    i = async (m) => {
      await s(m);
    },
    u = async (m, p) => {
      await r(m, p);
    },
    x = async (m) => {
      window.confirm("Удалить категорию?") && (await a(m));
    },
    g = (m) => {
      (d(m), l(!0));
    },
    h = () => {
      (d(null), l(!0));
    };
  return e.jsxs(gt, {
    title: "Управление категориями",
    children: [
      e.jsxs("button", {
        onClick: h,
        className:
          "mb-6 inline-flex w-full sm:w-auto items-center justify-center gap-2 px-4 py-2 bg-[#ff398b] text-white rounded-lg hover:bg-[#e0327a]",
        children: [
          e.jsx(Kt, { size: 18, className: "shrink-0" }),
          e.jsx("span", { children: "Добавить категорию" }),
        ],
      }),
      e.jsx(Mo, {
        isOpen: n,
        onClose: () => l(!1),
        onCreate: i,
        onUpdate: u,
        category: o,
      }),
      e.jsx("div", {
        className: "bg-white rounded-lg shadow overflow-hidden",
        children: e.jsx("div", {
          className: "overflow-x-auto",
          children: e.jsxs("table", {
            className: "w-full min-w-[720px]",
            children: [
              e.jsx("thead", {
                className: "bg-gray-50",
                children: e.jsxs("tr", {
                  children: [
                    e.jsx("th", {
                      className: "px-6 py-3 text-left",
                      children: "Картинка",
                    }),
                    e.jsx("th", {
                      className: "px-6 py-3 text-left",
                      children: "Название",
                    }),
                    e.jsx("th", {
                      className: "px-6 py-3 text-left",
                      children: "Описание",
                    }),
                    e.jsx("th", {
                      className: "px-6 py-3 text-left",
                      children: "Действия",
                    }),
                  ],
                }),
              }),
              e.jsxs("tbody", {
                children: [
                  t.map((m) =>
                    e.jsxs(
                      "tr",
                      {
                        className: "border-t hover:bg-gray-50",
                        children: [
                          e.jsx("td", {
                            className: "px-6 py-4",
                            children: e.jsx("img", {
                              src: m.imageUrl,
                              alt: m.name,
                              className: "w-14 h-14 object-cover rounded",
                            }),
                          }),
                          e.jsx("td", {
                            className: "px-6 py-4",
                            children: m.name,
                          }),
                          e.jsx("td", {
                            className: "px-6 py-4",
                            children: e.jsx("div", {
                              className: "max-w-md text-gray-700 line-clamp-2",
                              children: m.description,
                            }),
                          }),
                          e.jsx("td", {
                            className: "px-6 py-4",
                            children: e.jsxs("div", {
                              className: "flex gap-2",
                              children: [
                                e.jsx("button", {
                                  onClick: () => g(m),
                                  className:
                                    "p-2 text-blue-600 hover:bg-blue-50 rounded",
                                  children: e.jsx(Xt, { size: 16 }),
                                }),
                                e.jsx("button", {
                                  onClick: () => x(m.id),
                                  className:
                                    "p-2 text-red-600 hover:bg-red-50 rounded",
                                  children: e.jsx(pt, { size: 16 }),
                                }),
                              ],
                            }),
                          }),
                        ],
                      },
                      m.id,
                    ),
                  ),
                  t.length === 0 &&
                    e.jsx("tr", {
                      children: e.jsx("td", {
                        className: "px-6 py-8 text-gray-500",
                        colSpan: 4,
                        children: "Категорий пока нет",
                      }),
                    }),
                ],
              }),
            ],
          }),
        }),
      }),
    ],
  });
}
function zs() {
  return e.jsx("span", {
    className: "ml-0.5 text-red-600 align-super",
    children: "*",
  });
}
function Io(t) {
  const s = {},
    r = t.email.trim().toLowerCase();
  return (
    r
      ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r) || (s.email = "Некорректный email")
      : (s.email = "Введите email"),
    t.password
      ? t.password.length < 6 && (s.password = "Минимум 6 символов")
      : (s.password = "Введите пароль"),
    s
  );
}
function Ao() {
  const t = Ue(),
    s = qs(),
    { login: r } = xe(),
    a = s.state?.from,
    [n, l] = c.useState({ email: "", password: "" }),
    [o, d] = c.useState({}),
    [i, u] = c.useState(""),
    [x, g] = c.useState(!1),
    [h, m] = c.useState(!1),
    p = `${Ee}/auth/google`,
    y = `${Ee}/auth/yandex`,
    v = `${Ee}/auth/vk`,
    j = c.useMemo(() => (x ? !1 : n.email.trim() && n.password), [n, x]),
    k = (N) => ($) => {
      (l((S) => ({ ...S, [N]: $.target.value })),
        d((S) => ({ ...S, [N]: void 0 })),
        u(""));
    },
    w = async (N) => {
      N.preventDefault();
      const $ = Io(n);
      if ((d($), !Object.keys($).length)) {
        (g(!0), u(""));
        try {
          if (
            (await r(n.email.trim().toLowerCase(), n.password)).role === "ADMIN"
          ) {
            const A = a?.startsWith("/admin") ? a : "/admin";
            t(A, { replace: !0 });
          } else t("/account", { replace: !0 });
        } catch (S) {
          S instanceof ne ? u(S.message) : u("Не удалось войти");
        } finally {
          g(!1);
        }
      }
    };
  return e.jsx(lr, {
    title: "С возвращением 🍫",
    subtitle: "Войдите, чтобы быстрее оформлять заказы и отслеживать доставку.",
    bottomText: "Нет аккаунта?",
    bottomLinkText: "Зарегистрироваться",
    bottomLinkTo: "/account/register",
    children: e.jsxs("form", {
      onSubmit: w,
      className: "space-y-5",
      children: [
        i &&
          e.jsx("div", {
            className:
              "rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700",
            children: i,
          }),
        e.jsxs("div", {
          className: "grid gap-2",
          children: [
            e.jsx("button", {
              type: "button",
              onClick: () => {
                window.location.href = p;
              },
              className:
                "w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 hover:bg-gray-50",
              children: "Войти через Google",
            }),
            e.jsxs("div", {
              className: "grid gap-2 sm:grid-cols-2",
              children: [
                e.jsx("button", {
                  type: "button",
                  onClick: () => {
                    window.location.href = y;
                  },
                  className:
                    "w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 hover:bg-gray-50",
                  children: "Войти через Яндекс",
                }),
                e.jsx("button", {
                  type: "button",
                  onClick: () => {
                    window.location.href = v;
                  },
                  className:
                    "w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 hover:bg-gray-50",
                  children: "Войти через VK",
                }),
              ],
            }),
          ],
        }),
        e.jsxs("div", {
          children: [
            e.jsxs("label", {
              className: "text-sm font-medium",
              htmlFor: "email",
              children: ["Email ", e.jsx(zs, {})],
            }),
            e.jsx("input", {
              id: "email",
              type: "email",
              value: n.email,
              onChange: k("email"),
              placeholder: "куда отправлять чек 🍫",
              className: `mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 ${o.email ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-gray-200"}`,
              autoComplete: "email",
            }),
            o.email &&
              e.jsx("p", {
                className: "mt-1 text-xs text-red-600",
                children: o.email,
              }),
          ],
        }),
        e.jsxs("div", {
          children: [
            e.jsxs("div", {
              className: "flex items-baseline justify-between",
              children: [
                e.jsxs("label", {
                  className: "text-sm font-medium",
                  htmlFor: "password",
                  children: ["Пароль ", e.jsx(zs, {})],
                }),
                e.jsx(G, {
                  to: "/account/forgot-password",
                  className: "text-xs text-gray-600 underline",
                  children: "Забыли пароль?",
                }),
              ],
            }),
            e.jsxs("div", {
              className:
                "mt-1 flex rounded-lg border border-gray-200 bg-white focus-within:ring-2 focus-within:ring-gray-200",
              children: [
                e.jsx("input", {
                  id: "password",
                  type: h ? "text" : "password",
                  value: n.password,
                  onChange: k("password"),
                  placeholder: "секретный ингредиент",
                  className: "w-full rounded-lg px-3 py-2 outline-none",
                  autoComplete: "current-password",
                }),
                e.jsx("button", {
                  type: "button",
                  onClick: () => m((N) => !N),
                  className: "px-3 text-sm text-gray-600",
                  children: h ? "Скрыть" : "Показать",
                }),
              ],
            }),
            o.password &&
              e.jsx("p", {
                className: "mt-1 text-xs text-red-600",
                children: o.password,
              }),
          ],
        }),
        e.jsx("button", {
          type: "submit",
          disabled: !j,
          className:
            "w-full rounded-lg bg-rose-500 px-4 py-2.5 text-white hover:bg-rose-600 disabled:opacity-50",
          children: x ? "Вхожу..." : "Войти",
        }),
      ],
    }),
  });
}
function Ot(...t) {
  return t.filter(Boolean).join(" ");
}
function Fo(t) {
  if (typeof t.finalAmountMinor != "number") return "—";
  const s = t.currency || "RUB",
    r = t.finalAmountMinor;
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: s,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(r / 100);
}
function Us(t) {
  let r = t.replace(/\D/g, "");
  if (
    ((r.startsWith("7") || r.startsWith("8")) && (r = r.slice(1)),
    (r = r.slice(0, 10)),
    !r)
  )
    return "";
  let a = "+7";
  return (
    r.length > 0 && (a += ` (${r.slice(0, 3)}`),
    r.length >= 3 && (a += ")"),
    r.length > 3 && (a += ` ${r.slice(3, 6)}`),
    r.length > 6 && (a += `-${r.slice(6, 8)}`),
    r.length > 8 && (a += `-${r.slice(8, 10)}`),
    a
  );
}
function Bs(t) {
  let s = t.replace(/\D/g, "");
  return (
    s.length === 10 && (s = `7${s}`),
    s.length === 11 && s.startsWith("8") && (s = `7${s.slice(1)}`),
    s.length === 11 && s.startsWith("7") ? `+${s}` : null
  );
}
function Lo(t) {
  const s = new Date(t);
  return new Intl.DateTimeFormat("ru-RU", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(s);
}
function Tt(t) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(t);
}
function Oo(t) {
  switch (t) {
    case "PENDING":
      return "Создан";
    case "PAID":
      return "Оплачен";
    case "PROCESSING":
      return "Готовим";
    case "SHIPPED":
      return "Отправлен";
    case "COMPLETED":
      return "Выполнен";
    case "CANCELED":
      return "Отменён";
    default:
      return t;
  }
}
function Rt() {
  return e.jsx("span", {
    className: "ml-0.5 text-red-600 align-super",
    children: "*",
  });
}
function To() {
  const t = Ue(),
    [s, r] = c.useState(""),
    [a, n] = c.useState("profile"),
    [l, o] = c.useState(null),
    [d, i] = c.useState([]),
    [u, x] = c.useState(!0),
    [g, h] = c.useState(!1),
    [m, p] = c.useState(""),
    [y, v] = c.useState({ firstName: "", lastName: "", phone: "", email: "" }),
    [j, k] = c.useState(!1),
    [w, N] = c.useState(""),
    $ = c.useMemo(() => {
      if (!l) return !1;
      const P = y.firstName.trim(),
        D = y.lastName.trim(),
        E = y.email.trim(),
        W = Bs(y.phone);
      return !P || !D || !W || (E && !Tt(E)) ? !1 : !j;
    }, [y, j, l]);
  (c.useEffect(() => {
    let P = !0;
    async function D() {
      (x(!0), p(""));
      try {
        const E = await z.get("/auth/me");
        if (!P) return;
        (o(E),
          v({
            firstName: E.firstName || "",
            lastName: E.lastName || "",
            email: E.email || "",
            phone: Us(E.phone || ""),
          }));
      } catch (E) {
        if (!P) return;
        if (E instanceof ne && (E.status === 401 || E.status === 403)) {
          t("/account/login", { replace: !0 });
          return;
        }
        p(E instanceof ne ? E.message : "Не удалось загрузить профиль");
      } finally {
        P && x(!1);
      }
    }
    return (
      D(),
      () => {
        P = !1;
      }
    );
  }, [t]),
    c.useEffect(() => {
      let P = !0;
      async function D() {
        if (a === "orders") {
          (h(!0), p(""));
          try {
            const E = await z.get("/orders/me");
            if (!P) return;
            i(E);
          } catch (E) {
            if (!P) return;
            if (E instanceof ne && (E.status === 401 || E.status === 403)) {
              t("/account/login", { replace: !0 });
              return;
            }
            p(E instanceof ne ? E.message : "Не удалось загрузить заказы");
          } finally {
            P && h(!1);
          }
        }
      }
      return (
        D(),
        () => {
          P = !1;
        }
      );
    }, [a, t]));
  const S = (P) => (D) => {
      const E = P === "phone" ? Us(D.target.value) : D.target.value;
      (v((W) => ({ ...W, [P]: E })), N(""), P === "email" && r(""));
    },
    A = async () => {
      if (!l) return;
      const P = y.firstName.trim(),
        D = y.lastName.trim(),
        E = y.email.trim(),
        W = y.phone.trim(),
        J = W ? Bs(W) : void 0;
      if (!P || !D) {
        N("Заполните имя и фамилию");
        return;
      }
      if (E && !Tt(E)) {
        (r("Введите корректный email"), N("Проверьте email"));
        return;
      }
      if (!J) {
        N("Введите телефон в формате +7 (999) 999-99-99");
        return;
      }
      (k(!0), N(""));
      try {
        const Q = await z.patch("/auth/me", {
          firstName: P,
          lastName: D,
          email: E || void 0,
          phone: J,
        });
        (o(Q),
          v({
            firstName: Q.firstName || "",
            lastName: Q.lastName || "",
            email: Q.email || "",
            phone: Q.phone || "",
          }),
          N("Сохранено ✅"));
      } catch (Q) {
        N(Q instanceof ne ? Q.message : "Не удалось сохранить");
      } finally {
        k(!1);
      }
    },
    { logout: q } = xe(),
    ee = async () => {
      try {
        await q();
      } catch {
      } finally {
        t("/account/login", { replace: !0 });
      }
    };
  return u
    ? e.jsx("section", {
        className: "pt-24 mx-auto max-w-5xl px-4",
        children: e.jsxs("div", {
          className:
            "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm",
          children: [
            e.jsx("div", { className: "h-6 w-44 rounded bg-gray-100" }),
            e.jsx("div", { className: "mt-4 h-4 w-72 rounded bg-gray-100" }),
            e.jsxs("div", {
              className: "mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2",
              children: [
                e.jsx("div", { className: "h-10 rounded bg-gray-100" }),
                e.jsx("div", { className: "h-10 rounded bg-gray-100" }),
                e.jsx("div", {
                  className: "h-10 rounded bg-gray-100 sm:col-span-2",
                }),
              ],
            }),
          ],
        }),
      })
    : e.jsx("section", {
        className: "pt-24 mx-auto max-w-5xl px-4",
        children: e.jsxs("div", {
          className:
            "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm",
          children: [
            e.jsxs("div", {
              className:
                "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
              children: [
                e.jsxs("div", {
                  children: [
                    e.jsxs("div", {
                      className: "inline-flex items-center gap-2",
                      children: [
                        e.jsx("span", {
                          className: "text-xl font-semibold",
                          children: "Личный кабинет",
                        }),
                        e.jsx("span", {
                          className:
                            "rounded-full bg-rose-50 px-2 py-0.5 text-xs text-rose-700",
                          children: "Candy Craft 🍰",
                        }),
                        l?.role === "ADMIN" &&
                          e.jsx("span", {
                            className:
                              "rounded-full bg-amber-50 px-2 py-0.5 text-xs text-amber-700",
                            children: "ADMIN",
                          }),
                      ],
                    }),
                    e.jsxs("p", {
                      className: "mt-1 text-sm text-gray-600",
                      children: [
                        "Привет, ",
                        l?.firstName,
                        " 👋 Здесь — профиль и ваши заказы.",
                      ],
                    }),
                  ],
                }),
                e.jsxs("div", {
                  className: "flex items-center gap-2",
                  children: [
                    l?.role === "ADMIN" &&
                      e.jsx(G, {
                        to: "/admin",
                        className:
                          "rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50",
                        children: "В админку",
                      }),
                    e.jsx("button", {
                      onClick: ee,
                      className:
                        "rounded-lg bg-gray-900 px-3 py-2 text-sm text-white hover:bg-black",
                      children: "Выйти",
                    }),
                  ],
                }),
              ],
            }),
            e.jsxs("div", {
              className: "mt-6 flex gap-2",
              children: [
                e.jsx("button", {
                  onClick: () => n("profile"),
                  className: Ot(
                    "rounded-full px-4 py-2 text-sm border",
                    a === "profile"
                      ? "border-rose-200 bg-rose-50 text-rose-700"
                      : "border-gray-200 hover:bg-gray-50",
                  ),
                  children: "Профиль",
                }),
                e.jsx("button", {
                  onClick: () => {
                    n("orders");
                  },
                  className: Ot(
                    "rounded-full px-4 py-2 text-sm border",
                    a === "orders"
                      ? "border-amber-200 bg-amber-50 text-amber-800"
                      : "border-gray-200 hover:bg-gray-50",
                  ),
                  children: "Заказы",
                }),
              ],
            }),
            m &&
              e.jsx("div", {
                className:
                  "mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700",
                children: m,
              }),
            a === "profile" &&
              e.jsx("div", {
                className: "mt-6",
                children: e.jsxs("div", {
                  className: "rounded-2xl border border-gray-200 p-5",
                  children: [
                    e.jsxs("div", {
                      className: "flex items-center justify-between",
                      children: [
                        e.jsx("h3", {
                          className: "font-semibold",
                          children: "Данные профиля",
                        }),
                        e.jsx("span", {
                          className: "text-xs text-gray-500",
                          children:
                            "Обновите контакты для уведомлений по заказам",
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className: "mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2",
                      children: [
                        e.jsxs("div", {
                          children: [
                            e.jsxs("label", {
                              className: "text-sm font-medium",
                              htmlFor: "firstName",
                              children: ["Имя ", e.jsx(Rt, {})],
                            }),
                            e.jsx("input", {
                              id: "firstName",
                              value: y.firstName,
                              onChange: S("firstName"),
                              className:
                                "mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-rose-100",
                              placeholder: "Никита",
                              autoComplete: "given-name",
                            }),
                          ],
                        }),
                        e.jsxs("div", {
                          children: [
                            e.jsxs("label", {
                              className: "text-sm font-medium",
                              htmlFor: "lastName",
                              children: ["Фамилия ", e.jsx(Rt, {})],
                            }),
                            e.jsx("input", {
                              id: "lastName",
                              value: y.lastName,
                              onChange: S("lastName"),
                              className:
                                "mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-rose-100",
                              placeholder: "Беляк",
                              autoComplete: "family-name",
                            }),
                          ],
                        }),
                        e.jsxs("div", {
                          className: "sm:col-span-2",
                          children: [
                            e.jsx("label", {
                              className: "text-sm font-medium",
                              htmlFor: "email",
                              children: "Email",
                            }),
                            e.jsx("input", {
                              id: "email",
                              type: "email",
                              value: y.email,
                              onChange: S("email"),
                              onBlur: () => {
                                const P = y.email.trim();
                                P && !Tt(P)
                                  ? r("Введите корректный email")
                                  : r("");
                              },
                              className: Ot(
                                "mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2",
                                s
                                  ? "border-red-300 focus:ring-red-100"
                                  : "border-gray-200 focus:ring-rose-100",
                              ),
                              autoComplete: "email",
                              placeholder: "name@example.com",
                            }),
                            s &&
                              e.jsx("p", {
                                className: "mt-1 text-xs text-red-600",
                                children: s,
                              }),
                          ],
                        }),
                        e.jsxs("div", {
                          className: "sm:col-span-2",
                          children: [
                            e.jsxs("label", {
                              className: "text-sm font-medium",
                              htmlFor: "phone",
                              children: ["Телефон (РФ) ", e.jsx(Rt, {})],
                            }),
                            e.jsx("input", {
                              id: "phone",
                              type: "tel",
                              inputMode: "tel",
                              value: y.phone,
                              onChange: S("phone"),
                              className:
                                "mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-rose-100",
                              placeholder: "+7 (999) 999-99-99",
                              autoComplete: "tel",
                              maxLength: 18,
                            }),
                            e.jsx("p", {
                              className: "mt-1 text-xs text-gray-500",
                              children: "Обязателен для связи по заказу.",
                            }),
                          ],
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className:
                        "mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
                      children: [
                        e.jsx("button", {
                          onClick: A,
                          disabled: !$,
                          className:
                            "rounded-lg bg-rose-500 px-4 py-2.5 text-sm text-white hover:bg-rose-600 disabled:opacity-50",
                          children: j ? "Сохраняю..." : "Сохранить",
                        }),
                        w &&
                          e.jsx("div", {
                            className: "text-sm text-gray-700",
                            children: w,
                          }),
                      ],
                    }),
                  ],
                }),
              }),
            a === "orders" &&
              e.jsxs("div", {
                className: "mt-6 rounded-2xl border border-gray-200 p-5",
                children: [
                  e.jsxs("div", {
                    className: "flex items-center justify-between",
                    children: [
                      e.jsx("h3", {
                        className: "font-semibold",
                        children: "Мои заказы",
                      }),
                      e.jsx(G, {
                        to: "/",
                        className:
                          "text-sm text-amber-700 underline hover:text-amber-800",
                        children: "Сделать новый заказ 🍬",
                      }),
                    ],
                  }),
                  g
                    ? e.jsxs("div", {
                        className: "mt-4 space-y-3",
                        children: [
                          e.jsx("div", {
                            className: "h-12 rounded bg-gray-100",
                          }),
                          e.jsx("div", {
                            className: "h-12 rounded bg-gray-100",
                          }),
                          e.jsx("div", {
                            className: "h-12 rounded bg-gray-100",
                          }),
                        ],
                      })
                    : d.length === 0
                      ? e.jsx("div", {
                          className:
                            "mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-800",
                          children:
                            "Пока нет заказов. Самое время собрать сладкий шедевр 🍰",
                        })
                      : e.jsxs("div", {
                          className: "mt-4 overflow-x-auto",
                          children: [
                            e.jsxs("table", {
                              className: "w-full min-w-140 text-left text-sm",
                              children: [
                                e.jsx("thead", {
                                  className: "text-gray-500",
                                  children: e.jsxs("tr", {
                                    children: [
                                      e.jsx("th", {
                                        className: "py-2",
                                        children: "№",
                                      }),
                                      e.jsx("th", {
                                        className: "py-2",
                                        children: "Дата",
                                      }),
                                      e.jsx("th", {
                                        className: "py-2",
                                        children: "Статус",
                                      }),
                                      e.jsx("th", {
                                        className: "py-2",
                                        children: "Сумма",
                                      }),
                                      e.jsx("th", { className: "py-2" }),
                                    ],
                                  }),
                                }),
                                e.jsx("tbody", {
                                  children: d.map((P) =>
                                    e.jsxs(
                                      "tr",
                                      {
                                        className:
                                          "border-t border-gray-100 hover:bg-gray-50",
                                        children: [
                                          e.jsxs("td", {
                                            className: "py-3 font-medium",
                                            children: ["#", P.id],
                                          }),
                                          e.jsx("td", {
                                            className: "py-3",
                                            children: Lo(P.createdAt),
                                          }),
                                          e.jsx("td", {
                                            className: "py-3",
                                            children: e.jsx("span", {
                                              className:
                                                "rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700",
                                              children: Oo(P.status),
                                            }),
                                          }),
                                          e.jsx("td", {
                                            className: "py-3 font-semibold",
                                            children: Fo(P),
                                          }),
                                          e.jsx("td", {
                                            className: "py-3 text-right",
                                            children: e.jsx("span", {
                                              className:
                                                "text-xs text-gray-400",
                                              children: "скоро “детали”",
                                            }),
                                          }),
                                        ],
                                      },
                                      P.id,
                                    ),
                                  ),
                                }),
                              ],
                            }),
                            e.jsx("p", {
                              className: "mt-3 text-xs text-gray-500",
                              children:
                                "Статусы обновляются автоматически, когда заказ меняет этап.",
                            }),
                          ],
                        }),
                ],
              }),
          ],
        }),
      });
}
function Ro() {
  return e.jsx("main", {
    className: "min-h-[calc(100vh-120px)] bg-white",
    children: e.jsxs("div", {
      className: "max-w-3xl mx-auto px-4 py-10",
      children: [
        e.jsx("div", {
          className: "mb-6",
          children: e.jsx(G, {
            to: "/",
            className:
              "text-sm text-gray-500 hover:text-gray-900 transition-colors",
            children: "← Back to shop",
          }),
        }),
        e.jsxs("header", {
          className: "mb-8",
          children: [
            e.jsx("h1", {
              className: "text-3xl md:text-4xl font-semibold tracking-tight",
              children: "Privacy Policy",
            }),
            e.jsxs("p", {
              className: "text-sm text-gray-500 mt-2",
              children: ["Last updated: ", "February 6, 2026"],
            }),
          ],
        }),
        e.jsxs("article", {
          className: "prose prose-gray max-w-none",
          children: [
            e.jsx("p", {
              children:
                "CandyCraft respects your privacy and is committed to protecting your personal data.",
            }),
            e.jsx("h2", { children: "1. Information We Collect" }),
            e.jsx("p", {
              children: "We may collect the following personal information:",
            }),
            e.jsxs("ul", {
              children: [
                e.jsx("li", { children: "First and last name" }),
                e.jsx("li", { children: "Email address" }),
                e.jsx("li", { children: "Phone number" }),
                e.jsx("li", { children: "Delivery address" }),
                e.jsx("li", { children: "Order details" }),
              ],
            }),
            e.jsx("h2", { children: "2. How We Use Information" }),
            e.jsx("p", { children: "We use personal data only for:" }),
            e.jsxs("ul", {
              children: [
                e.jsx("li", { children: "Processing and delivering orders" }),
                e.jsx("li", {
                  children: "Contacting customers regarding orders",
                }),
                e.jsx("li", { children: "Improving our service" }),
              ],
            }),
            e.jsx("p", {
              children:
                "We do not sell or rent personal data to third parties.",
            }),
            e.jsx("h2", { children: "3. Sharing of Data" }),
            e.jsx("p", {
              children:
                "Information may be shared only when necessary to fulfill an order, for example:",
            }),
            e.jsxs("ul", {
              children: [
                e.jsx("li", { children: "Delivery services" }),
                e.jsx("li", { children: "Payment providers" }),
              ],
            }),
            e.jsx("h2", { children: "4. Cookies" }),
            e.jsx("p", { children: "We use cookies for:" }),
            e.jsxs("ul", {
              children: [
                e.jsx("li", { children: "User authentication" }),
                e.jsx("li", { children: "Shopping cart functionality" }),
                e.jsx("li", { children: "Basic website operation" }),
              ],
            }),
            e.jsx("h2", { children: "5. Data Storage" }),
            e.jsx("p", {
              children:
                "Your data is stored securely and accessed only when necessary to provide services.",
            }),
            e.jsx("h2", { children: "6. User Rights" }),
            e.jsx("p", { children: "You may request:" }),
            e.jsxs("ul", {
              children: [
                e.jsx("li", { children: "Access to your data" }),
                e.jsx("li", { children: "Correction of your data" }),
                e.jsx("li", { children: "Deletion of your account" }),
              ],
            }),
            e.jsxs("p", {
              children: [
                "To make a request, contact us at:",
                " ",
                e.jsx("a", {
                  href: "mailto:your@email.com",
                  children: "your@email.com",
                }),
              ],
            }),
            e.jsx("h2", { children: "7. Changes" }),
            e.jsx("p", {
              children:
                "We may update this Privacy Policy from time to time. Updates will be posted on this page.",
            }),
            e.jsx("h2", { children: "Contact" }),
            e.jsxs("p", {
              children: [
                "CandyCraft",
                e.jsx("br", {}),
                "Email: ",
                e.jsx("a", {
                  href: "mailto:your@email.com",
                  children: "your@email.com",
                }),
              ],
            }),
          ],
        }),
        e.jsxs("div", {
          className: "mt-10 flex flex-col sm:flex-row gap-3",
          children: [
            e.jsx(G, {
              to: "/",
              className:
                "inline-flex items-center justify-center rounded-xl border px-4 py-2.5 text-sm font-medium hover:bg-gray-50 transition",
              children: "Continue shopping",
            }),
            e.jsx("a", {
              href: "mailto:belakdanila9@gmail.com",
              className:
                "inline-flex items-center justify-center rounded-xl bg-black text-white px-4 py-2.5 text-sm font-medium hover:opacity-90 transition",
              children: "Contact us",
            }),
          ],
        }),
      ],
    }),
  });
}
const ct = ({ icon: t, title: s, subtitle: r }) =>
    e.jsxs("div", {
      className: "flex items-start gap-3",
      children: [
        e.jsx("div", {
          className:
            "mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-50 text-[#ff398b] border border-rose-100",
          children: t,
        }),
        e.jsxs("div", {
          children: [
            e.jsx("h2", {
              className: "text-lg md:text-xl font-semibold text-gray-900",
              children: s,
            }),
            r &&
              e.jsx("p", {
                className: "mt-1 text-sm text-gray-600 leading-relaxed",
                children: r,
              }),
          ],
        }),
      ],
    }),
  De = ({ title: t, icon: s, children: r }) =>
    e.jsxs("div", {
      className:
        "h-full rounded-2xl border border-rose-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow",
      children: [
        e.jsxs("div", {
          className: "flex items-center gap-2",
          children: [
            e.jsx("div", {
              className:
                "inline-flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-[#ff398b] border border-rose-100",
              children: s,
            }),
            e.jsx("h3", {
              className: "text-base font-semibold text-gray-900",
              children: t,
            }),
          ],
        }),
        e.jsx("div", {
          className: "mt-3 text-sm text-gray-600 leading-relaxed",
          children: r,
        }),
      ],
    }),
  Dt = ({ children: t }) =>
    e.jsx("span", {
      className:
        "inline-flex items-center rounded-full border border-rose-100 bg-rose-50 px-3 py-1 text-xs font-medium text-[#ff398b]",
      children: t,
    }),
  dt = ({ q: t, a: s }) =>
    e.jsxs("details", {
      className:
        "group rounded-2xl border border-rose-100 bg-white p-4 shadow-sm",
      children: [
        e.jsxs("summary", {
          className:
            "flex cursor-pointer list-none items-center justify-between gap-3",
          children: [
            e.jsxs("div", {
              className: "flex items-center gap-2",
              children: [
                e.jsx(Ks, { className: "h-4 w-4 text-[#ff398b]" }),
                e.jsx("span", {
                  className: "text-sm font-semibold text-gray-900",
                  children: t,
                }),
              ],
            }),
            e.jsx("span", {
              className:
                "text-gray-400 group-open:rotate-180 transition-transform",
              children: "⌄",
            }),
          ],
        }),
        e.jsx("div", {
          className: "mt-3 text-sm text-gray-600 leading-relaxed",
          children: s,
        }),
      ],
    });
function Do() {
  return e.jsxs("main", {
    className: "min-h-screen bg-white",
    children: [
      e.jsx("section", {
        className:
          "border-b border-rose-100 bg-linear-to-br from-rose-50 via-pink-50 to-white",
        children: e.jsx("div", {
          className: "container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14",
          children: e.jsxs("div", {
            className: "max-w-3xl",
            children: [
              e.jsxs("div", {
                className: "flex flex-wrap gap-2",
                children: [
                  e.jsx(Dt, { children: "Доставка" }),
                  e.jsx(Dt, { children: "Оплата" }),
                  e.jsx(Dt, { children: "Возврат" }),
                ],
              }),
              e.jsx("h1", {
                className:
                  "mt-4 text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight",
                children: "Доставка и оплата",
              }),
              e.jsx("p", {
                className:
                  "mt-3 text-sm md:text-base text-gray-600 leading-relaxed",
                children:
                  "Здесь собрали все важное: сроки, способы доставки, варианты оплаты и ответы на частые вопросы. Если нужна помощь — напишите нам, подскажем.",
              }),
              e.jsxs("div", {
                className: "mt-6 flex flex-wrap gap-3",
                children: [
                  e.jsx(G, {
                    to: "/catalog",
                    className:
                      "inline-flex items-center justify-center rounded-xl bg-[#ff398b] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#ff2a81] active:scale-95 transition",
                    children: "Перейти в каталог",
                  }),
                  e.jsx("a", {
                    href: "#faq",
                    className:
                      "inline-flex items-center justify-center rounded-xl border border-rose-100 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-rose-50 transition",
                    children: "Частые вопросы",
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
      e.jsxs("section", {
        className: "container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10",
        children: [
          e.jsxs("div", {
            className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
            children: [
              e.jsxs("div", {
                className: "lg:col-span-2 space-y-6",
                children: [
                  e.jsxs("div", {
                    className:
                      "rounded-2xl border border-rose-100 bg-white p-6 shadow-sm",
                    children: [
                      e.jsx(ct, {
                        icon: e.jsx(Qe, { className: "h-5 w-5" }),
                        title: "Доставка",
                        subtitle:
                          "Доставляем аккуратно, чтобы сладости приехали красивыми и целыми.",
                      }),
                      e.jsxs("div", {
                        className: "mt-5 grid grid-cols-1 md:grid-cols-2 gap-4",
                        children: [
                          e.jsxs(De, {
                            title: "Курьер по городу",
                            icon: e.jsx(Gt, { className: "h-4 w-4" }),
                            children: [
                              "Доставка курьером по городу и ближайшим районам. Стоимость и время зависят от адреса.",
                              e.jsxs("div", {
                                className: "mt-2",
                                children: [
                                  e.jsx("span", {
                                    className: "font-semibold text-gray-900",
                                    children: "Ориентир:",
                                  }),
                                  " ",
                                  "1–3 часа или в удобный интервал.",
                                ],
                              }),
                            ],
                          }),
                          e.jsxs(De, {
                            title: "Самовывоз",
                            icon: e.jsx(ge, { className: "h-4 w-4" }),
                            children: [
                              "Можно забрать заказ самостоятельно по предварительной договоренности.",
                              e.jsxs("div", {
                                className: "mt-2",
                                children: [
                                  e.jsx("span", {
                                    className: "font-semibold text-gray-900",
                                    children: "Важно:",
                                  }),
                                  " ",
                                  "подтвердим время выдачи в сообщениях.",
                                ],
                              }),
                            ],
                          }),
                          e.jsxs(De, {
                            title: "Сроки",
                            icon: e.jsx(ft, { className: "h-4 w-4" }),
                            children: [
                              "Обычно готовим и отправляем в день заказа или на следующий — зависит от загруженности и наличия.",
                              e.jsx("div", {
                                className: "mt-2",
                                children:
                                  "Для больших заказов — согласуем заранее.",
                              }),
                            ],
                          }),
                          e.jsxs(De, {
                            title: "Упаковка",
                            icon: e.jsx(ps, { className: "h-4 w-4" }),
                            children: [
                              "Упаковываем так, чтобы ничего не помялось: фиксация внутри коробки, защитные слои, аккуратная подача.",
                              e.jsx("div", {
                                className: "mt-2",
                                children:
                                  "Можно добавить открытку и пожелание.",
                              }),
                            ],
                          }),
                        ],
                      }),
                      e.jsx("div", {
                        className:
                          "mt-5 rounded-2xl bg-rose-50 border border-rose-100 p-4",
                        children: e.jsxs("p", {
                          className: "text-sm text-gray-700",
                          children: [
                            e.jsx("span", {
                              className: "font-semibold text-gray-900",
                              children: "Совет:",
                            }),
                            " ",
                            "если заказ на подарок к точному времени — оформляйте заранее, чтобы мы закрепили слот доставки.",
                          ],
                        }),
                      }),
                    ],
                  }),
                  e.jsxs("div", {
                    className:
                      "rounded-2xl border border-rose-100 bg-white p-6 shadow-sm",
                    children: [
                      e.jsx(ct, {
                        icon: e.jsx(ut, { className: "h-5 w-5" }),
                        title: "Оплата",
                        subtitle:
                          "Выберите удобный способ оплаты — быстро и безопасно.",
                      }),
                      e.jsxs("div", {
                        className: "mt-5 grid grid-cols-1 md:grid-cols-2 gap-4",
                        children: [
                          e.jsxs(De, {
                            title: "Картой онлайн",
                            icon: e.jsx(ut, { className: "h-4 w-4" }),
                            children: [
                              "Оплата банковской картой через безопасный платежный сервис (при наличии в проекте).",
                              e.jsxs("div", {
                                className: "mt-2",
                                children: [
                                  e.jsx("span", {
                                    className: "font-semibold text-gray-900",
                                    children: "Плюс:",
                                  }),
                                  " ",
                                  "быстрее подтверждение заказа.",
                                ],
                              }),
                            ],
                          }),
                          e.jsxs(De, {
                            title: "Перевод",
                            icon: e.jsx(Na, { className: "h-4 w-4" }),
                            children: [
                              "Перевод на карту/счет. Реквизиты отправим после оформления.",
                              e.jsxs("div", {
                                className: "mt-2",
                                children: [
                                  e.jsx("span", {
                                    className: "font-semibold text-gray-900",
                                    children: "Важно:",
                                  }),
                                  " ",
                                  "сохраните чек до получения.",
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      e.jsx("div", {
                        className:
                          "mt-5 rounded-2xl bg-white border border-rose-100 p-4",
                        children: e.jsxs("p", {
                          className: "text-sm text-gray-600 leading-relaxed",
                          children: [
                            "Для некоторых товаров/дат можем попросить",
                            " ",
                            e.jsx("span", {
                              className: "font-semibold text-gray-900",
                              children: "предоплату",
                            }),
                            " ",
                            "— это фиксирует бронь и время доставки.",
                          ],
                        }),
                      }),
                    ],
                  }),
                  e.jsxs("div", {
                    className:
                      "rounded-2xl border border-rose-100 bg-white p-6 shadow-sm",
                    children: [
                      e.jsx(ct, {
                        icon: e.jsx(ps, { className: "h-5 w-5" }),
                        title: "Возврат и замена",
                        subtitle:
                          "Сладости — товар деликатный, но мы решаем вопросы по-человечески.",
                      }),
                      e.jsxs("div", {
                        className:
                          "mt-4 text-sm text-gray-600 leading-relaxed space-y-2",
                        children: [
                          e.jsxs("p", {
                            children: [
                              "Если вы получили заказ с проблемой (повреждение, ошибка в позиции), напишите нам в течение",
                              " ",
                              e.jsx("span", {
                                className: "font-semibold text-gray-900",
                                children: "2 часов",
                              }),
                              " ",
                              "после получения и приложите фото.",
                            ],
                          }),
                          e.jsx("p", {
                            children:
                              "Мы предложим замену/компенсацию в зависимости от ситуации. Для заказов на самовывоз — проверяйте заказ при получении.",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              e.jsx("aside", {
                className: "lg:col-span-1",
                children: e.jsxs("div", {
                  className: "sticky top-6 space-y-4",
                  children: [
                    e.jsxs("div", {
                      className:
                        "rounded-2xl border border-rose-100 bg-white p-5 shadow-sm",
                      children: [
                        e.jsx("h3", {
                          className: "text-base font-semibold text-gray-900",
                          children: "Как заказать",
                        }),
                        e.jsxs("ol", {
                          className: "mt-3 space-y-3 text-sm text-gray-600",
                          children: [
                            e.jsxs("li", {
                              className: "flex gap-3",
                              children: [
                                e.jsx("span", {
                                  className:
                                    "mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-50 border border-rose-100 text-[#ff398b] text-xs font-bold",
                                  children: "1",
                                }),
                                e.jsx("span", {
                                  children:
                                    "Выберите товары и добавьте в корзину.",
                                }),
                              ],
                            }),
                            e.jsxs("li", {
                              className: "flex gap-3",
                              children: [
                                e.jsx("span", {
                                  className:
                                    "mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-50 border border-rose-100 text-[#ff398b] text-xs font-bold",
                                  children: "2",
                                }),
                                e.jsx("span", {
                                  children:
                                    "Оформите заказ и укажите адрес/время.",
                                }),
                              ],
                            }),
                            e.jsxs("li", {
                              className: "flex gap-3",
                              children: [
                                e.jsx("span", {
                                  className:
                                    "mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-50 border border-rose-100 text-[#ff398b] text-xs font-bold",
                                  children: "3",
                                }),
                                e.jsx("span", {
                                  children: "Оплатите удобным способом.",
                                }),
                              ],
                            }),
                            e.jsxs("li", {
                              className: "flex gap-3",
                              children: [
                                e.jsx("span", {
                                  className:
                                    "mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-50 border border-rose-100 text-[#ff398b] text-xs font-bold",
                                  children: "4",
                                }),
                                e.jsx("span", {
                                  children:
                                    "Получите заказ — красиво и вовремя.",
                                }),
                              ],
                            }),
                          ],
                        }),
                        e.jsxs("div", {
                          className: "mt-5 flex flex-col gap-2",
                          children: [
                            e.jsx(G, {
                              to: "/cart",
                              className:
                                "inline-flex items-center justify-center rounded-xl bg-[#ff398b] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#ff2a81] active:scale-95 transition",
                              children: "Перейти в корзину",
                            }),
                            e.jsx(G, {
                              to: "/contacts",
                              className:
                                "inline-flex items-center justify-center rounded-xl border border-rose-100 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-rose-50 transition",
                              children: "Контакты",
                            }),
                          ],
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className:
                        "rounded-2xl border border-rose-100 bg-white p-5 shadow-sm",
                      children: [
                        e.jsx("h3", {
                          className: "text-base font-semibold text-gray-900",
                          children: "Нужна помощь?",
                        }),
                        e.jsx("p", {
                          className: "mt-2 text-sm text-gray-600",
                          children:
                            "Напишите нам — ответим быстро и поможем оформить заказ.",
                        }),
                        e.jsxs("div", {
                          className: "mt-4 space-y-2 text-sm",
                          children: [
                            e.jsxs("div", {
                              className:
                                "flex items-center gap-2 text-gray-700",
                              children: [
                                e.jsx(Zs, {
                                  className: "h-4 w-4 text-[#ff398b]",
                                }),
                                e.jsx("span", {
                                  children: "Телефон: +7 (999) 000-00-00",
                                }),
                              ],
                            }),
                            e.jsxs("div", {
                              className:
                                "flex items-center gap-2 text-gray-700",
                              children: [
                                e.jsx(Ys, {
                                  className: "h-4 w-4 text-[#ff398b]",
                                }),
                                e.jsx("span", {
                                  children: "WhatsApp/Telegram: @candycraft",
                                }),
                              ],
                            }),
                          ],
                        }),
                        e.jsx("div", {
                          className:
                            "mt-4 rounded-2xl bg-rose-50 border border-rose-100 p-3 text-xs text-gray-700",
                          children:
                            "Сроки и стоимость доставки могут меняться в праздничные дни — уточним при оформлении.",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          }),
          e.jsxs("div", {
            id: "faq",
            className: "mt-10 md:mt-12",
            children: [
              e.jsx(ct, {
                icon: e.jsx(Ks, { className: "h-5 w-5" }),
                title: "Частые вопросы",
                subtitle:
                  "Собрали ответы на самые популярные вопросы по доставке и оплате.",
              }),
              e.jsxs("div", {
                className: "mt-5 grid grid-cols-1 md:grid-cols-2 gap-4",
                children: [
                  e.jsx(dt, {
                    q: "Можно ли доставить в определенное время?",
                    a: e.jsx(e.Fragment, {
                      children:
                        "Да. Укажите желаемый интервал при оформлении — мы подтвердим, если слот свободен. В праздники лучше оформлять заранее.",
                    }),
                  }),
                  e.jsx(dt, {
                    q: "Можно ли изменить адрес после оформления?",
                    a: e.jsx(e.Fragment, {
                      children:
                        "Можно, если заказ ещё не передан курьеру. Напишите нам как можно быстрее — скорректируем.",
                    }),
                  }),
                  e.jsx(dt, {
                    q: "Есть ли доставка в другие города?",
                    a: e.jsx(e.Fragment, {
                      children:
                        "Пока работаем в пределах города/районов. Если нужно — напишите, иногда можем согласовать индивидуально.",
                    }),
                  }),
                  e.jsx(dt, {
                    q: "Как работает предоплата?",
                    a: e.jsx(e.Fragment, {
                      children:
                        "Предоплата фиксирует заказ и время доставки, особенно на популярные даты. Реквизиты пришлём после оформления.",
                    }),
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function _o(t) {
  switch (t) {
    case "SUCCEEDED":
      return "Оплата прошла успешно";
    case "PENDING":
      return "Платеж создается";
    case "WAITING_FOR_CAPTURE":
      return "Платеж ожидает подтверждения";
    case "CANCELED":
      return "Платеж отменен";
    default:
      return "Ошибка оплаты";
  }
}
function zo() {
  const [t] = ta(),
    s = Number(t.get("orderId") ?? 0),
    [r, a] = c.useState(!0),
    [n, l] = c.useState(""),
    [o, d] = c.useState(null);
  c.useEffect(() => {
    let u = !0;
    async function x() {
      if (!s || Number.isNaN(s)) {
        (l("Некорректный номер заказа"), a(!1));
        return;
      }
      try {
        const g = await z.get(`/payments/orders/${s}`);
        if (!u) return;
        d(g?.[0] ?? null);
      } catch (g) {
        if (!u) return;
        l(g instanceof ne ? g.message : "Не удалось получить статус оплаты");
      } finally {
        u && a(!1);
      }
    }
    return (
      x(),
      () => {
        u = !1;
      }
    );
  }, [s]);
  const i = c.useMemo(
    () =>
      o
        ? new Intl.NumberFormat("ru-RU", {
            style: "currency",
            currency: o.currency || "RUB",
            maximumFractionDigits: 2,
          }).format(o.amountMinor / 100)
        : null,
    [o],
  );
  return e.jsx("main", {
    className: "mx-auto w-full max-w-3xl px-4 py-16",
    children: e.jsxs("div", {
      className: "rounded-2xl border bg-white p-8 shadow-sm",
      children: [
        e.jsx("h1", {
          className: "text-2xl font-bold",
          children: "Результат оплаты",
        }),
        r &&
          e.jsx("p", {
            className: "mt-4 text-gray-600",
            children: "Проверяем статус...",
          }),
        !r &&
          n &&
          e.jsx("div", {
            className:
              "mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700",
            children: n,
          }),
        !r &&
          !n &&
          o &&
          e.jsxs("div", {
            className: "mt-5 space-y-3",
            children: [
              e.jsx("p", {
                className: "text-lg font-medium",
                children: _o(o.status),
              }),
              e.jsxs("p", {
                className: "text-gray-700",
                children: ["Заказ: #", s],
              }),
              i &&
                e.jsxs("p", {
                  className: "text-gray-700",
                  children: ["Сумма: ", i],
                }),
              e.jsxs("p", {
                className: "text-gray-700",
                children: ["Статус: ", o.status],
              }),
            ],
          }),
        !r &&
          !n &&
          !o &&
          e.jsxs("p", {
            className: "mt-4 text-gray-700",
            children: ["Платеж пока не найден для заказа #", s],
          }),
        e.jsxs("div", {
          className: "mt-8 flex gap-3",
          children: [
            e.jsx(G, {
              to: "/account",
              className:
                "rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-black",
              children: "В личный кабинет",
            }),
            e.jsx(G, {
              to: "/",
              className: "rounded-lg border px-4 py-2 text-sm hover:bg-gray-50",
              children: "В каталог",
            }),
          ],
        }),
      ],
    }),
  });
}
const Uo = c.lazy(() =>
  ia(
    () => import("./CakeConstructorPage-Dm-II_bP.js"),
    __vite__mapDeps([0, 1]),
  ).then((t) => ({ default: t.CakeConstructorPage })),
);
function Bo() {
  return e.jsxs(e.Fragment, {
    children: [e.jsx(rr, {}), e.jsx(Ws, {}), e.jsx(Zn, {})],
  });
}
function qo() {
  return e.jsxs(e.Fragment, { children: [e.jsx(rr, {}), e.jsx(Ws, {})] });
}
function Wo() {
  return e.jsxs("main", {
    className:
      "container px-4 py-20 min-h-[60vh] flex flex-col items-center justify-center text-center",
    children: [
      e.jsx("p", {
        className: "text-sm font-semibold text-[#ff398b]",
        children: "404",
      }),
      e.jsx("h1", {
        className: "mt-3 text-3xl font-bold text-gray-900",
        children: "Страница не найдена",
      }),
      e.jsx("p", {
        className: "mt-3 max-w-md text-gray-600",
        children: "Проверьте адрес или вернитесь в каталог.",
      }),
      e.jsx(G, {
        to: "/",
        className:
          "mt-8 inline-flex items-center justify-center rounded-lg bg-[#ff398b] px-5 py-3 text-sm font-semibold text-white hover:bg-[#e0327a]",
        children: "На главную",
      }),
    ],
  });
}
function Ho() {
  return e.jsx("main", {
    className:
      "container px-4 py-20 min-h-[60vh] flex items-center justify-center text-center",
    children: e.jsxs("div", {
      children: [
        e.jsx("div", {
          className:
            "mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-rose-100 border-t-[#ff398b]",
        }),
        e.jsx("p", {
          className: "text-sm font-semibold text-gray-600",
          children: "Загружаем...",
        }),
      ],
    }),
  });
}
function Vo() {
  return e.jsx(ua, {
    children: e.jsx(Nn, {
      children: e.jsx(ma, {
        children: e.jsx(sa, {
          children: e.jsxs(ra, {
            children: [
              e.jsxs(Y, {
                element: e.jsx(Bo, {}),
                children: [
                  e.jsx(Y, { path: "/", element: e.jsx(En, {}) }),
                  e.jsx(Y, { path: "/product/:id", element: e.jsx(Rn, {}) }),
                  e.jsx(Y, { path: "/cart", element: e.jsx(Fn, {}) }),
                  e.jsx(Y, { path: "/account", element: e.jsx(To, {}) }),
                  e.jsx(Y, { path: "/delivery", element: e.jsx(Do, {}) }),
                  e.jsx(Y, { path: "/contacts", element: e.jsx(Dn, {}) }),
                  e.jsx(Y, { path: "/privacy", element: e.jsx(Ro, {}) }),
                  e.jsx(Y, {
                    path: "/constructor",
                    element: e.jsx(c.Suspense, {
                      fallback: e.jsx(Ho, {}),
                      children: e.jsx(Uo, {}),
                    }),
                  }),
                  e.jsx(Y, { path: "/payment/result", element: e.jsx(zo, {}) }),
                ],
              }),
              e.jsxs(Y, {
                element: e.jsx(qo, {}),
                children: [
                  e.jsx(Y, { path: "/account/login", element: e.jsx(Ao, {}) }),
                  e.jsx(Y, {
                    path: "/account/register",
                    element: e.jsx(zn, {}),
                  }),
                ],
              }),
              e.jsx(Y, {
                path: "/checkout",
                element: e.jsx($t, {
                  children: e.jsx(el, { children: e.jsx(cl, {}) }),
                }),
              }),
              e.jsx(Y, {
                path: "/admin",
                element: e.jsx(lt, {
                  children: e.jsx($t, { children: e.jsx(Vn, {}) }),
                }),
              }),
              e.jsx(Y, {
                path: "/admin/products",
                element: e.jsx(lt, { children: e.jsx(Qn, {}) }),
              }),
              e.jsx(Y, {
                path: "/admin/categories",
                element: e.jsx(lt, {
                  children: e.jsx(Eo, { children: e.jsx(Po, {}) }),
                }),
              }),
              e.jsx(Y, {
                path: "/admin/orders",
                element: e.jsx(lt, {
                  children: e.jsx($t, { children: e.jsx(So, {}) }),
                }),
              }),
              e.jsx(Y, { path: "*", element: e.jsx(Wo, {}) }),
            ],
          }),
        }),
      }),
    }),
  });
}
aa.createRoot(document.getElementById("root")).render(e.jsx(Vo, {}));
export { ne as A, hs as C, Ze as S, xe as a, xs as b, R as c, ye as u };
