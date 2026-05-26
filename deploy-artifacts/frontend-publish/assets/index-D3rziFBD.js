const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "assets/CakeConstructorPage-CMMDqkl2.js",
      "assets/react-vendor-s-vpvnqi.js",
    ]),
) => i.map((i) => d[i]);
import {
  r as c,
  j as e,
  L as V,
  N as Be,
  u as Ue,
  a as Qr,
  b as qs,
  c as os,
  G as O,
  d as Zr,
  t as cs,
  e as Jr,
  f as ea,
  B as ta,
  R as sa,
  g as Y,
  O as Bs,
  h as ra,
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
const aa = "modulepreload",
  na = function (t) {
    return "/" + t;
  },
  ds = {},
  la = function (s, r, a) {
    let n = Promise.resolve();
    if (r && r.length > 0) {
      let i = function (u) {
        return Promise.all(
          u.map((m) =>
            Promise.resolve(m).then(
              (f) => ({ status: "fulfilled", value: f }),
              (f) => ({ status: "rejected", reason: f }),
            ),
          ),
        );
      };
      document.getElementsByTagName("link");
      const o = document.querySelector("meta[property=csp-nonce]"),
        d = o?.nonce || o?.getAttribute("nonce");
      n = i(
        r.map((u) => {
          if (((u = na(u)), u in ds)) return;
          ds[u] = !0;
          const m = u.endsWith(".css"),
            f = m ? '[rel="stylesheet"]' : "";
          if (document.querySelector(`link[href="${u}"]${f}`)) return;
          const x = document.createElement("link");
          if (
            ((x.rel = m ? "stylesheet" : aa),
            m || (x.as = "script"),
            (x.crossOrigin = ""),
            (x.href = u),
            d && x.setAttribute("nonce", d),
            document.head.appendChild(x),
            m)
          )
            return new Promise((p, g) => {
              (x.addEventListener("load", p),
                x.addEventListener("error", () =>
                  g(new Error(`Unable to preload CSS for ${u}`)),
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
  ia = "/assets/candyLogo-Bmg3kgnv.png",
  Ee = "https://candy-craft.onrender.com";
class ne extends Error {
  status;
  details;
  constructor(s, r, a) {
    (super(s), (this.status = r), (this.details = a));
  }
}
function oa(t, s) {
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
async function ca() {
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
    if (await ca()) return _e(t, { ...s, retryOn401: !1 });
    throw new ne("Сессия истекла. Войдите снова.", 401);
  }
  if (!o.ok) {
    const i = await us(o),
      u = oa(i, `Ошибка ${o.status}`);
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
  Ws = c.createContext(void 0);
function da({ children: t }) {
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
  const o = async (u, m) => {
      const f = await z.post("/auth/login", { email: u, password: m });
      return (r(f.user), f.user);
    },
    d = async () => {
      (await z.post("/auth/logout"), r(null));
    },
    i = c.useMemo(
      () => ({ user: s, isLoading: a, login: o, logout: d, refreshUser: l }),
      [s, a],
    );
  return e.jsx(Ws.Provider, { value: i, children: t });
}
function xe() {
  const t = c.useContext(Ws);
  if (!t) throw new Error("useAuth must be used within an AuthProvider");
  return t;
}
const Hs = c.createContext(void 0),
  ua = ({ children: t }) => {
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
    const S = {
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
          r((M) => {
            const C = M.findIndex((A) => A.id === N.item.id);
            return C === -1
              ? [...M, N.item]
              : M.map((A, X) => (X === C ? { ...A, ...N.item } : A));
          });
        } catch (N) {
          console.error("Не удалось добавить товар:", N);
        }
      },
      addCustomCandyCake: async (w) => {
        try {
          if (!l) throw new Error("Пользователь не авторизован");
          const N = await z.post(`/cart/${l}/custom-candy-cakes`, w);
          r((M) => [...M, N.item]);
        } catch (N) {
          throw (console.error("Не удалось добавить конфетный торт:", N), N);
        }
      },
      removeItem: async (w) => {
        try {
          if (!l) return;
          (await z.del(`/cart/${l}/items/${w}`),
            r((N) => N.filter((M) => M.productId !== w)));
        } catch (N) {
          console.error("Ошибка удаления:", N);
        }
      },
      removeCartEntry: async (w) => {
        try {
          if (!l) return;
          if (w.isCustom || w.productId === null) {
            (await z.del(`/cart/${l}/custom-items/${w.id}`),
              r((N) => N.filter((M) => M.id !== w.id)));
            return;
          }
          (await z.del(`/cart/${l}/items/${w.productId}`),
            r((N) => N.filter((M) => M.productId !== w.productId)));
        } catch (N) {
          console.error("Ошибка удаления:", N);
        }
      },
      updateItemQuantity: async (w, N) => {
        try {
          if (!l) return;
          (await z.patch(`/cart/${l}/items/${w}`, { quantity: N }), await i());
        } catch (M) {
          throw (console.error("Ошибка обновления количества:", M), M);
        }
      },
      updateCartEntryQuantity: async (w, N) => {
        try {
          if (!l) return;
          (w.isCustom || w.productId === null
            ? await z.patch(`/cart/${l}/custom-items/${w.id}`, { quantity: N })
            : await z.patch(`/cart/${l}/items/${w.productId}`, { quantity: N }),
            await i());
        } catch (M) {
          throw (console.error("Ошибка обновления количества:", M), M);
        }
      },
      showAuthWarn: o,
      setShowAuthWarn: d,
    };
    return e.jsx(Hs.Provider, { value: S, children: t });
  },
  ye = () => {
    const t = c.useContext(Hs);
    if (!t)
      throw new Error("useCart должен использоваться внутри CartProvider");
    return t;
  };
const ma = (t) => t.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  xa = (t) =>
    t.replace(/^([A-Z])|[\s-_]+(\w)/g, (s, r, a) =>
      a ? a.toUpperCase() : r.toLowerCase(),
    ),
  ms = (t) => {
    const s = xa(t);
    return s.charAt(0).toUpperCase() + s.slice(1);
  },
  Vs = (...t) =>
    t
      .filter((s, r, a) => !!s && s.trim() !== "" && a.indexOf(s) === r)
      .join(" ")
      .trim(),
  ha = (t) => {
    for (const s in t)
      if (s.startsWith("aria-") || s === "role" || s === "title") return !0;
  };
var fa = {
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
const pa = c.forwardRef(
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
        ...fa,
        width: s,
        height: s,
        stroke: t,
        strokeWidth: a ? (Number(r) * 24) / Number(s) : r,
        className: Vs("lucide", n),
        ...(!l && !ha(d) && { "aria-hidden": "true" }),
        ...d,
      },
      [
        ...o.map(([u, m]) => c.createElement(u, m)),
        ...(Array.isArray(l) ? l : [l]),
      ],
    ),
);
const D = (t, s) => {
  const r = c.forwardRef(({ className: a, ...n }, l) =>
    c.createElement(pa, {
      ref: l,
      iconNode: s,
      className: Vs(`lucide-${ma(ms(t))}`, `lucide-${t}`, a),
      ...n,
    }),
  );
  return ((r.displayName = ms(t)), r);
};
const ga = [
    ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
    ["path", { d: "M19 12H5", key: "x3x0zl" }],
  ],
  xs = D("arrow-left", ga);
const ba = [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }],
  ],
  ya = D("arrow-right", ba);
const va = [
    [
      "rect",
      { width: "20", height: "12", x: "2", y: "6", rx: "2", key: "9lu3g6" },
    ],
    ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
    ["path", { d: "M6 12h.01M18 12h.01", key: "113zkx" }],
  ],
  ja = D("banknote", va);
const Na = [
    ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
    [
      "path",
      {
        d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
        key: "11g9vi",
      },
    ],
  ],
  wa = D("bell", Na);
const ka = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]],
  hs = D("chevron-right", ka);
const Ca = [
    ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
    ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }],
  ],
  Ye = D("circle-check-big", Ca);
const Sa = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
    ["path", { d: "M12 17h.01", key: "p32p05" }],
  ],
  Gs = D("circle-question-mark", Sa);
const Ea = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
    ["path", { d: "m9 9 6 6", key: "z0biqf" }],
  ],
  fs = D("circle-x", Ea);
const $a = [
    ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }],
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ],
  ft = D("clock", $a);
const Ma = [
    [
      "rect",
      { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" },
    ],
    ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }],
  ],
  ut = D("credit-card", Ma);
const Pa = [
    ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }],
    [
      "path",
      { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", key: "1b0p4s" },
    ],
  ],
  Ia = D("dollar-sign", Pa);
const Aa = [
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
  _t = D("gift", Aa);
const Fa = [
    [
      "path",
      {
        d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
        key: "mvr1a0",
      },
    ],
  ],
  La = D("heart", Fa);
const Oa = [
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
  Ta = D("image-off", Oa);
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
  Ra = D("layout-dashboard", Da);
const _a = [
    ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
    ["path", { d: "M21 12H9", key: "dn1m92" }],
    ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }],
  ],
  za = D("log-out", _a);
const Ua = [
    ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
    [
      "rect",
      { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" },
    ],
  ],
  qa = D("mail", Ua);
const Ba = [
    [
      "path",
      {
        d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
        key: "1r0f0z",
      },
    ],
    ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }],
  ],
  Gt = D("map-pin", Ba);
const Wa = [
    ["path", { d: "M4 5h16", key: "1tepv9" }],
    ["path", { d: "M4 12h16", key: "1lakjw" }],
    ["path", { d: "M4 19h16", key: "1djgab" }],
  ],
  Ks = D("menu", Wa);
const Ha = [
    [
      "path",
      {
        d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
        key: "1sd12s",
      },
    ],
  ],
  Xs = D("message-circle", Ha);
const Va = [
    [
      "path",
      {
        d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
        key: "18887p",
      },
    ],
  ],
  Ys = D("message-square", Va);
const Ga = [["path", { d: "M5 12h14", key: "1ays0h" }]],
  Ka = D("minus", Ga);
const Xa = [
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
  ge = D("package", Xa);
const Ya = [
    [
      "path",
      {
        d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
        key: "9njp5v",
      },
    ],
  ],
  Qs = D("phone", Ya);
const Qa = [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }],
  ],
  Kt = D("plus", Qa);
const Za = [
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
  Ja = D("refresh-cw", Za);
const en = [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ],
  Zs = D("search", en);
const tn = [
    [
      "path",
      {
        d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
        key: "1i5ecw",
      },
    ],
    ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
  ],
  sn = D("settings", tn);
const rn = [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
        key: "oel41y",
      },
    ],
    ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
  ],
  ps = D("shield-check", rn);
const an = [
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
  Ze = D("shopping-cart", an);
const nn = [
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
  ln = D("sliders-horizontal", nn);
const on = [
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
  Fe = D("sparkles", on);
const cn = [
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
  Xt = D("square-pen", cn);
const dn = [
    [
      "path",
      {
        d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
        key: "r04s7s",
      },
    ],
  ],
  un = D("star", dn);
const mn = [
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
  Js = D("tag", mn);
const xn = [
    ["path", { d: "M10 11v6", key: "nco0om" }],
    ["path", { d: "M14 11v6", key: "outv1u" }],
    ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
    ["path", { d: "M3 6h18", key: "d0wm0j" }],
    ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }],
  ],
  pt = D("trash-2", xn);
const hn = [
    ["path", { d: "M16 7h6v6", key: "box55l" }],
    ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }],
  ],
  gs = D("trending-up", hn);
const fn = [
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
  Qe = D("truck", fn);
const pn = [
    ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
    ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }],
  ],
  er = D("user", pn);
const gn = [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
  ],
  tr = D("x", gn);
const bn = [
    [
      "path",
      {
        d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
        key: "1xq2db",
      },
    ],
  ],
  yn = D("zap", bn);
function sr() {
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
                children: r ? e.jsx(tr, { size: 18 }) : e.jsx(Ks, { size: 18 }),
              }),
              e.jsx(V, {
                to: "/",
                className: "inline-flex items-center",
                "aria-label": "CandyCraft — на главную",
                children: e.jsx("img", {
                  src: ia,
                  alt: "CandyCraft",
                  className:
                    "h-16 sm:h-20 md:h-24 lg:h-28 w-auto max-w-[150px] sm:max-w-[190px] object-contain",
                }),
              }),
            ],
          }),
          e.jsxs("nav", {
            className: "hidden lg:flex items-center gap-6 text-sm",
            children: [
              e.jsx(Be, { to: "/", className: l, children: "Каталог" }),
              e.jsx(Be, {
                to: "/constructor",
                className: l,
                children: "Конструктор",
              }),
              e.jsx(Be, {
                to: "/delivery",
                className: l,
                children: "Доставка и оплата",
              }),
              e.jsx(Be, {
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
                  children: e.jsx(Zs, { size: 20 }),
                }),
              }),
              e.jsx("li", {
                children: e.jsx(V, {
                  to: n,
                  className:
                    "p-2 rounded-xl text-gray-700 hover:bg-rose-50 inline-flex focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#ff398b]",
                  "aria-label": "Аккаунт",
                  children: e.jsx(er, { size: 20 }),
                }),
              }),
              e.jsx("li", {
                children: e.jsxs(V, {
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
                children: e.jsx(V, {
                  className: "text-gray-700 hover:text-[#ff398b]",
                  to: "/constructor",
                  onClick: () => a(!1),
                  children: "Конструктор",
                }),
              }),
              e.jsx("li", {
                children: e.jsx(V, {
                  className: "text-gray-700 hover:text-[#ff398b]",
                  to: "/",
                  onClick: () => a(!1),
                  children: "Каталог",
                }),
              }),
              e.jsx("li", {
                children: e.jsx(V, {
                  className: "text-gray-700 hover:text-[#ff398b]",
                  to: "/delivery",
                  onClick: () => a(!1),
                  children: "Доставка и оплата",
                }),
              }),
              e.jsx("li", {
                children: e.jsx(V, {
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
function vn(t) {
  const { user: s } = xe(),
    r = s?.id,
    { isItemInCart: a, addToCart: n } = ye(),
    {
      imageUrl: l,
      name: o,
      description: d,
      price: i,
      id: u,
      inStock: m,
      reservedQty: f,
      category: x,
    } = t,
    [p, g] = c.useState(!l),
    v = a(u),
    b = Math.max(0, m - (f ?? 0)),
    j = b < 1,
    { setShowAuthWarn: S } = ye(),
    w = async () => {
      if (!r) {
        S(!0);
        return;
      }
      v || j || (await n(u));
    };
  return e.jsx("li", {
    className: "list-none ",
    children: e.jsxs("div", {
      className:
        "group h-full bg-white rounded-2xl shadow-sm border border-rose-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200",
      children: [
        e.jsxs(V, {
          to: `/product/${u}`,
          className: "block",
          children: [
            e.jsxs("div", {
              className:
                "relative overflow-hidden bg-linear-to-br from-rose-100 via-pink-100 to-rose-50 aspect-square",
              children: [
                p
                  ? e.jsxs("div", {
                      className:
                        "absolute inset-0 flex flex-col items-center justify-center text-rose-300 gap-2",
                      children: [
                        e.jsx(Ta, { className: "w-8 h-8" }),
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
                      onError: () => g(!0),
                    }),
                e.jsxs("div", {
                  className:
                    "absolute top-2 left-2 sm:top-3 sm:left-3 flex max-w-[calc(100%-1rem)] flex-col gap-1.5 sm:gap-2 z-10",
                  children: [
                    e.jsx("span", {
                      className:
                        "inline-flex max-w-full items-center rounded-full border border-rose-100 bg-white/85 px-2 sm:px-2.5 py-1 text-[10px] sm:text-[11px] font-medium text-gray-700 backdrop-blur truncate",
                      children: x?.name ?? "Категория",
                    }),
                    e.jsx("span", {
                      className: `inline-flex max-w-full items-center rounded-full px-2 sm:px-2.5 py-1 text-[10px] sm:text-[11px] font-medium border backdrop-blur truncate ${j ? "bg-white/85 text-red-600 border-red-100" : "bg-white/85 text-emerald-700 border-emerald-100"}`,
                      children: j ? "Нет в наличии" : `В наличии: ${b}`,
                    }),
                  ],
                }),
                v &&
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
              className: "bg-white p-3 sm:p-4",
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
            "border-t border-rose-100 bg-white px-3 sm:px-4 py-3 sm:py-3.5",
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
                disabled: v || j,
                className: `inline-flex w-full min-[360px]:w-auto justify-center items-center font-semibold gap-2 px-3 py-2 rounded-xl text-xs md:text-sm transition-all duration-200 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#ff398b] ${v ? "bg-rose-50 text-[#ff398b] border border-rose-100 cursor-not-allowed" : j ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-[#ff398b] text-white hover:bg-[#ff2a81] active:scale-95 shadow-sm"}`,
                "aria-label": v
                  ? "Товар уже в корзине"
                  : j
                    ? "Товара нет в наличии"
                    : `Добавить ${o} в корзину`,
                children: [
                  v
                    ? e.jsx(Ye, { className: "w-4 h-4" })
                    : e.jsx(Ze, { className: "w-4 h-4" }),
                  v ? "В корзине" : j ? "Нет в наличии" : "В корзину",
                ],
              }),
            ],
          }),
        }),
      ],
    }),
  });
}
const rr = c.createContext(void 0),
  jn = ({ children: t }) => {
    const { user: s } = xe(),
      [r, a] = c.useState([]),
      [n, l] = c.useState(!0),
      [o, d] = c.useState(null),
      i = async (v) => {
        l(!0);
        try {
          const b = await z.del(`/products/${v}`);
          (a((j) => j.filter((S) => S.id !== v)),
            d(null),
            console.log(b.message));
        } catch (b) {
          (d("Не удалось удалить товар"), console.error(b));
        } finally {
          l(!1);
        }
      },
      u = async (v, b) => {
        l(!0);
        try {
          const S = (await z.put(`/products/${v}`, b)).changedProduct;
          return (
            a((w) => w.map((N) => (N.id === v ? { ...N, ...S } : N))),
            d(null),
            S
          );
        } catch (j) {
          throw (d("Не удалось обновить товар"), console.error(j), j);
        } finally {
          l(!1);
        }
      },
      m = async (v) => {
        l(!0);
        try {
          const b = await z.post("/products", v);
          return (
            console.log("Товар успешно создан:", b),
            a((j) => [...j, b]),
            d(null),
            b
          );
        } catch (b) {
          const j = b instanceof Error ? b.message : "Не удалось создать товар";
          throw (d(j), console.error("Ошибка создания товара:", b), b);
        } finally {
          l(!1);
        }
      },
      f = async () => {
        l(!0);
        try {
          const v =
              s?.role === "ADMIN"
                ? "/products?includeInactive=true"
                : "/products",
            b = await z.get(v);
          (a(b ?? []), d(null));
        } catch (v) {
          (d("Не удалось загрузить товары"), console.error(v));
        } finally {
          l(!1);
        }
      };
    c.useEffect(() => {
      f();
    }, [s?.role]);
    const g = {
      products: r,
      loading: n,
      error: o,
      getProductById: (v) => r.find((b) => b.id === v),
      getProductsByCategory: (v) => r.filter((b) => b.categoryId === v),
      refreshProducts: f,
      deleteProduct: i,
      updateProduct: u,
      createProduct: m,
    };
    return e.jsx(rr.Provider, { value: g, children: t });
  },
  Je = () => {
    const t = c.useContext(rr);
    if (!t)
      throw new Error(
        "useProducts должен использоваться внутри ProductsProvider",
      );
    return t;
  },
  Nn = [
    { value: "popular", label: "Сначала популярные" },
    { value: "cheap", label: "Сначала дешевле" },
    { value: "expensive", label: "Сначала дороже" },
    { value: "new", label: "Сначала новые" },
  ];
function wn() {
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
function kn() {
  const { products: t, loading: s } = Je(),
    [r, a] = c.useState([]),
    [n, l] = c.useState(!0),
    [o, d] = c.useState(""),
    [i, u] = c.useState(null),
    [m, f] = c.useState("popular"),
    [x, p] = c.useState(!1),
    [g, v] = c.useState(null),
    [b, j] = c.useState(!1);
  c.useEffect(() => {
    fetch(`${Ee}/categories`)
      .then((C) => C.json())
      .then((C) => {
        (a(C), l(!1));
      })
      .catch(() => l(!1));
  }, []);
  const S = c.useMemo(
    () => (t.length ? Math.max(...t.map((C) => C.price)) : 0),
    [t],
  );
  c.useEffect(() => {
    !g && S > 0 && v(S);
  }, [S, g]);
  const w = c.useMemo(() => {
      const A = (i ? t.filter((R) => R.categoryId === i) : t).filter((R) => {
          const E = o.trim().toLowerCase();
          return E
            ? R.name.toLowerCase().includes(E) ||
                R.description.toLowerCase().includes(E)
            : !0;
        }),
        P = [
          ...(x ? A.filter((R) => R.inStock > 0) : A).filter((R) =>
            g ? R.price <= g : !0,
          ),
        ];
      return (
        m === "cheap" && P.sort((R, E) => R.price - E.price),
        m === "expensive" && P.sort((R, E) => E.price - R.price),
        m === "new" && P.sort((R, E) => E.id - R.id),
        P
      );
    }, [t, i, o, x, g, m]),
    N = () => {
      (u(null), f("popular"), d(""), p(!1), v(S || null));
    },
    M = s || n;
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
                  r.map((C) =>
                    e.jsx(
                      "button",
                      {
                        onClick: () => u(C.id),
                        className: `px-4 py-2 rounded-full text-sm border whitespace-nowrap transition-colors ${i === C.id ? "bg-[#ff398b] text-white border-[#ff398b] shadow-sm" : "bg-white text-gray-700 border-rose-100 hover:border-[#ff398b]/40 hover:text-[#ff398b]"}`,
                        children: C.name,
                      },
                      C.id,
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
                  onChange: (C) => d(C.target.value),
                  placeholder: "Поиск по каталогу",
                  className:
                    "h-10 w-full sm:w-72 rounded-xl border border-rose-100 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-[#ff398b]/15 focus:border-[#ff398b]/40",
                  "aria-label": "Поиск по товарам",
                }),
                e.jsx("select", {
                  className:
                    "h-10 rounded-xl border border-rose-100 bg-white px-3 text-sm text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#ff398b]/15 focus:border-[#ff398b]/40",
                  value: m,
                  onChange: (C) => f(C.target.value),
                  "aria-label": "Сортировка товаров",
                  children: Nn.map((C) =>
                    e.jsx(
                      "option",
                      { value: C.value, children: C.label },
                      C.value,
                    ),
                  ),
                }),
                e.jsxs("button", {
                  onClick: () => j(!0),
                  className:
                    "lg:hidden h-10 px-4 rounded-xl border border-rose-100 bg-white text-sm inline-flex items-center justify-center gap-2 hover:border-[#ff398b]/40 hover:text-[#ff398b] transition-colors",
                  children: [e.jsx(ln, { size: 16 }), " Фильтры"],
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
                    checked: x,
                    onChange: (C) => p(C.target.checked),
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
                        children: [g ?? S, " ₽"],
                      }),
                    ],
                  }),
                  e.jsx("input", {
                    type: "range",
                    min: 0,
                    max: S || 0,
                    value: g ?? S,
                    onChange: (C) => v(Number(C.target.value)),
                    className: "w-full accent-[#ff398b]",
                  }),
                ],
              }),
            ],
          }),
          e.jsx("div", {
            className:
              "rounded-2xl bg-rose-50/60 p-2 sm:p-3 md:p-4 border border-rose-100",
            children: M
              ? e.jsx("div", {
                  className:
                    "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5",
                  children: Array.from({ length: 8 }).map((C, A) =>
                    e.jsx(wn, {}, A),
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
                    children: w.map((C) =>
                      e.jsx(
                        vn,
                        {
                          ...C,
                          imageUrl: `https://img.gs/wgbfglmcbt/full/${C.imageUrl}`,
                        },
                        C.id,
                      ),
                    ),
                  }),
          }),
        ],
      }),
      b &&
        e.jsx("div", {
          className: "fixed inset-0 z-50 lg:hidden bg-black/40",
          onClick: () => j(!1),
          children: e.jsxs("div", {
            className:
              "absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-5 space-y-4 border-t border-rose-100",
            onClick: (C) => C.stopPropagation(),
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
                    checked: x,
                    onChange: (C) => p(C.target.checked),
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
                        children: [g ?? S, " ₽"],
                      }),
                    ],
                  }),
                  e.jsx("input", {
                    type: "range",
                    min: 0,
                    max: S || 0,
                    value: g ?? S,
                    onChange: (C) => v(Number(C.target.value)),
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
function Cn() {
  const [t, s] = c.useState({ name: "", email: "", phone: "", message: "" }),
    [r, a] = c.useState({}),
    [n, l] = c.useState("idle"),
    [o, d] = c.useState(""),
    i = (x) => (p) => {
      const g = p.target.value;
      (s((v) => ({ ...v, [x]: g })), d(""), a((v) => ({ ...v, [x]: "" })));
    },
    u = () => {
      const x = {},
        p = t.name.trim(),
        g = t.email.trim(),
        v = t.message.trim(),
        b = t.phone.trim();
      return (
        p || (x.name = "Введите имя"),
        g
          ? Et(g) || (x.email = "Введите корректный email")
          : (x.email = "Введите email"),
        v || (x.message = "Напишите сообщение"),
        b &&
          b.replace(/[^\d]/g, "").length < 7 &&
          (x.phone = "Похоже, телефон слишком короткий"),
        a(x),
        Object.keys(x).length === 0
      );
    },
    m = c.useMemo(() => {
      if (n === "loading") return !1;
      const x = t.name.trim(),
        p = t.email.trim(),
        g = t.message.trim();
      return !(!x || !p || !g || !Et(p));
    }, [t, n]),
    f = async (x) => {
      if ((x.preventDefault(), !!u())) {
        (l("loading"), d(""));
        try {
          const p = {
            name: t.name.trim(),
            email: t.email.trim(),
            phone: t.phone.trim() || void 0,
            message: t.message.trim(),
          };
          (await z.post("/contact", p),
            l("success"),
            s({ name: "", email: "", phone: "", message: "" }),
            a({}));
        } catch (p) {
          (l("idle"),
            d(
              p instanceof ne
                ? p.message
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
                    onSubmit: f,
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
                                a((x) => ({ ...x, name: "Введите имя" }));
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
                              const x = t.email.trim();
                              x
                                ? Et(x) ||
                                  a((p) => ({
                                    ...p,
                                    email: "Введите корректный email",
                                  }))
                                : a((p) => ({ ...p, email: "Введите email" }));
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
                              const x = t.phone.replace(/[^\d]/g, "");
                              t.phone.trim() &&
                                x.length < 7 &&
                                a((p) => ({
                                  ...p,
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
                                a((x) => ({
                                  ...x,
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
                        disabled: !m,
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
function Sn() {
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
        children: e.jsx(kn, {}),
      }),
      e.jsx(Cn, {}),
    ],
  });
}
function ar({ items: t }) {
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
                : e.jsx(V, {
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
function En(t) {
  return e.jsx("h2", {
    className: `text-[30px] font-semibold ${t.className}`,
    children: t.text,
  });
}
const bs = { round: "круг", square: "квадрат", heart: "сердце" },
  ys = { small: "малый", medium: "средний", large: "большой", m: "M", l: "L" },
  $n = { kinder: "Kinder", merci: "Merci", mix: "Mix", premium: "Premium" },
  Mn = { pink: "розовый", gold: "золотой", white: "белый" },
  Pn = { none: "без декора", flowers: "цветы", bow: "бант", topper: "топпер" },
  In = {
    "kinder-sticks": "Kinder по борту",
    kitkat: "KitKat по борту",
    "merci-bars": "Merci по борту",
    "wafer-rolls": "вафельные трубочки",
  },
  An = {
    satin: "атласная лента",
    lace: "кружевная обёртка",
    kraft: "крафт-бортик",
    transparent: "прозрачный борт",
  },
  Fn = {
    standard: "фирменная коробка",
    window: "коробка с окном",
    gift: "подарочная упаковка",
    "premium-box": "премиум-бокс",
  };
function Ln() {
  const { cartItems: t, removeCartEntry: s, updateCartEntryQuantity: r } = ye(),
    [a, n] = c.useState(null),
    l = Ue(),
    o = async (f) => {
      n(f.id);
      try {
        await r(f, f.quantity + 1);
      } finally {
        n(null);
      }
    },
    d = async (f) => {
      if (!(f.quantity <= 1)) {
        n(f.id);
        try {
          await r(f, f.quantity - 1);
        } finally {
          n(null);
        }
      }
    },
    i = () => {
      l("/checkout");
    },
    u = c.useMemo(
      () => t.reduce((f, x) => f + Number(x.price) * x.quantity, 0),
      [t],
    ),
    m = c.useMemo(() => t.reduce((f, x) => f + x.quantity, 0), [t]);
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
              e.jsx(En, { text: "Корзина покупок" }),
              e.jsx(ar, {
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
                    e.jsxs(V, {
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
                    children: t.map((f) => {
                      const x = f.quantity,
                        p = Number(f.price) * x,
                        g = a === f.id,
                        v = f.isCustom
                          ? 5
                          : Math.max(0, f.inStock - (f.reservedQty ?? 0)),
                        b = f.customConfig,
                        j = b?.type === "custom_cake";
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
                                children: f.imageUrl
                                  ? e.jsx("img", {
                                      className:
                                        "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
                                      src: f.imageUrl,
                                      alt: f.name,
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
                                    children: f.name,
                                  }),
                                  e.jsx("div", {
                                    className: "flex items-center gap-2 mb-4",
                                    children: e.jsx("div", {
                                      className:
                                        "px-2.5 py-1 bg-emerald-50 rounded-lg border border-emerald-100",
                                      children: e.jsx("span", {
                                        className:
                                          "text-xs font-medium text-emerald-700",
                                        children: f.isCustom
                                          ? "Индивидуальная сборка"
                                          : `Доступно: ${v} шт`,
                                      }),
                                    }),
                                  }),
                                  b &&
                                    e.jsx("div", {
                                      className:
                                        "mb-4 rounded-xl border border-rose-100 bg-rose-50/70 px-3 py-2 text-xs text-slate-600",
                                      children: j
                                        ? e.jsxs(e.Fragment, {
                                            children: [
                                              bs[b.base],
                                              ",",
                                              " ",
                                              ys[b.size],
                                              ",",
                                              " ",
                                              In[b.outerLayer],
                                              ", ",
                                              $n[b.sweetSet],
                                              ",",
                                              " ",
                                              Mn[b.color],
                                              ",",
                                              " ",
                                              An[b.wrapper],
                                              ",",
                                              " ",
                                              Fn[b.packaging],
                                              ",",
                                              " ",
                                              Pn[b.decor],
                                              b.messageText
                                                ? `, надпись: "${b.messageText}"`
                                                : "",
                                            ],
                                          })
                                        : e.jsxs(e.Fragment, {
                                            children: [
                                              bs[b.shape],
                                              ",",
                                              " ",
                                              ys[b.size],
                                              ", конфет:",
                                              " ",
                                              b.candies.reduce(
                                                (S, w) => S + w.quantity,
                                                0,
                                              ),
                                              b.inscription
                                                ? `, надпись: "${b.inscription}"`
                                                : "",
                                            ],
                                          }),
                                    }),
                                  e.jsxs("div", {
                                    className: "flex items-center gap-3 mb-4",
                                    children: [
                                      e.jsx("button", {
                                        onClick: () => d(f),
                                        disabled: x <= 1 || g,
                                        className:
                                          "w-9 h-9 rounded-lg border border-slate-200 bg-white flex items-center justify-center hover:border-indigo-300 hover:bg-indigo-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200",
                                        title: "Уменьшить",
                                        children: e.jsx(Ka, {
                                          className: "w-4 h-4 text-slate-600",
                                        }),
                                      }),
                                      e.jsx("div", {
                                        className: "min-w-12 text-center",
                                        children: e.jsx("span", {
                                          className:
                                            "text-lg font-semibold text-slate-800",
                                          children: x,
                                        }),
                                      }),
                                      e.jsx("button", {
                                        onClick: () => o(f),
                                        disabled: x >= v || g,
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
                                          p.toLocaleString("ru-RU"),
                                          " ₽",
                                        ],
                                      }),
                                      x > 1 &&
                                        e.jsxs("span", {
                                          className: "text-sm text-slate-400",
                                          children: [
                                            f.price.toLocaleString("ru-RU"),
                                            " ₽ ×",
                                            " ",
                                            x,
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
                                  onClick: () => s(f),
                                  className:
                                    "ml-auto p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-500 hover:text-rose-600 border border-rose-100 transition-all duration-200",
                                  title: "Удалить товар",
                                  children: e.jsx(pt, { className: "w-5 h-5" }),
                                }),
                              }),
                            ],
                          }),
                        },
                        f.id,
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
                                    children: ["Товары (", m, ")"],
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
                                      e.jsx(Js, { className: "w-4 h-4" }),
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
                              e.jsx(ya, {
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
function On({ mainImage: t, alt: s, images: r = [] }) {
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
function Tn(t) {
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
function Dn({ product: t, isInCart: s, onAddToCart: r }) {
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
          e.jsx(Tn, { size: 24 }),
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
  const { id: t } = Qr(),
    s = Ue(),
    { getProductById: r, loading: a } = Je(),
    { isItemInCart: n, addToCart: l } = ye(),
    [o, d] = c.useState(!1);
  c.useEffect(() => {
    const f = () => d(window.innerWidth < 768);
    return (
      f(),
      window.addEventListener("resize", f),
      () => window.removeEventListener("resize", f)
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
    m = async () => {
      u || (await l(i.id));
    };
  return e.jsxs("main", {
    className: "container py-4 md:py-8 px-4 sm:px-6",
    children: [
      e.jsx("div", {
        className: "mb-4 md:mb-6",
        children: e.jsx(ar, {
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
            children: e.jsx(On, {
              mainImage: i.imageUrl,
              alt: i.name,
              isMobile: o,
            }),
          }),
          e.jsx("div", {
            className: "lg:pl-0",
            children: e.jsx(Dn, {
              product: i,
              isInCart: u,
              onAddToCart: m,
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
      e.jsxs("div", {
        className: "mb-10 md:mb-16",
        children: [
          e.jsx("h2", {
            className: "text-xl md:text-2xl font-bold mb-4 md:mb-6",
            children: "Характеристики",
          }),
          e.jsx("div", {
            className:
              "bg-white rounded-lg border border-gray-200 overflow-hidden",
            children: e.jsx("div", {
              className: "divide-y divide-gray-200",
              children: [
                { name: "Срок годности", value: "72 часа" },
                { name: "Условия хранения", value: "+2°C до +6°C" },
                { name: "Размер", value: "Ø 20 см" },
                { name: "Калорийность", value: "350 ккал/100г" },
              ].map((f, x) =>
                e.jsx(
                  "div",
                  {
                    className: `p-3 md:p-4 ${x % 2 === 0 ? "bg-gray-50" : "bg-white"}`,
                    children: e.jsxs("div", {
                      className: "flex flex-col sm:flex-row sm:items-center",
                      children: [
                        e.jsx("div", {
                          className:
                            "font-medium text-gray-700 text-sm md:text-base mb-1 sm:mb-0 sm:w-1/3",
                          children: f.name,
                        }),
                        e.jsx("div", {
                          className:
                            "text-gray-600 text-sm md:text-base sm:w-2/3",
                          children: f.value,
                        }),
                      ],
                    }),
                  },
                  x,
                ),
              ),
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
function _n() {
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
                    e.jsx(Qs, { className: "mt-1", size: 20 }),
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
                        e.jsx(Xs, { className: "mt-1", size: 18 }),
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
function nr({
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
              e.jsx(V, {
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
function qe() {
  return e.jsx("span", {
    className: "ml-0.5 text-red-600 align-super",
    children: "*",
  });
}
function zn(t) {
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
function Un() {
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
    [u, m] = c.useState(!1),
    f = c.useMemo(
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
    x = (g) => (v) => {
      (r((b) => ({ ...b, [g]: v.target.value })),
        n((b) => ({ ...b, [g]: void 0 })),
        o(""));
    },
    p = async (g) => {
      g.preventDefault();
      const v = zn(s);
      if ((n(v), !Object.keys(v).length)) {
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
        } catch (b) {
          b instanceof ne ? o(b.message) : o("Не удалось зарегистрироваться");
        } finally {
          i(!1);
        }
      }
    };
  return e.jsx(nr, {
    title: "Создадим аккаунт 🍰",
    subtitle: "Пара секунд — и ваш Candy Craft профиль готов.",
    bottomText: "Уже есть аккаунт?",
    bottomLinkText: "Войти",
    bottomLinkTo: "/account/login",
    children: e.jsxs("form", {
      onSubmit: p,
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
                  children: ["Имя ", e.jsx(qe, {})],
                }),
                e.jsx("input", {
                  id: "firstName",
                  type: "text",
                  value: s.firstName,
                  onChange: x("firstName"),
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
                  children: ["Фамилия ", e.jsx(qe, {})],
                }),
                e.jsx("input", {
                  id: "lastName",
                  type: "text",
                  value: s.lastName,
                  onChange: x("lastName"),
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
              children: ["Email ", e.jsx(qe, {})],
            }),
            e.jsx("input", {
              id: "email",
              type: "email",
              value: s.email,
              onChange: x("email"),
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
              onChange: x("phone"),
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
              children: ["Пароль ", e.jsx(qe, {})],
            }),
            e.jsxs("div", {
              className:
                "mt-1 flex rounded-lg border border-gray-200 bg-white focus-within:ring-2 focus-within:ring-gray-200",
              children: [
                e.jsx("input", {
                  id: "password",
                  type: u ? "text" : "password",
                  value: s.password,
                  onChange: x("password"),
                  placeholder: "секретный ингредиент",
                  className: "w-full rounded-lg px-3 py-2 outline-none",
                  autoComplete: "new-password",
                }),
                e.jsx("button", {
                  type: "button",
                  onClick: () => m((g) => !g),
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
              children: ["Повтор пароля ", e.jsx(qe, {})],
            }),
            e.jsx("input", {
              id: "confirmPassword",
              type: u ? "text" : "password",
              value: s.confirmPassword,
              onChange: x("confirmPassword"),
              placeholder: "ещё раз, чтобы точно 🍰",
              onPaste: (g) => g.preventDefault(),
              onDrop: (g) => g.preventDefault(),
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
          disabled: !f,
          className:
            "w-full rounded-lg bg-amber-500 px-4 py-2.5 text-white hover:bg-amber-600 disabled:opacity-50",
          children: d ? "Создаю аккаунт..." : "Зарегистрироваться",
        }),
      ],
    }),
  });
}
const qn = [
  { path: "/admin", label: "Дашборд", icon: e.jsx(Ra, { size: 20 }) },
  { path: "/admin/products", label: "Товары", icon: e.jsx(ge, { size: 20 }) },
  { path: "/admin/orders", label: "Заказы", icon: e.jsx(Ze, { size: 20 }) },
  {
    path: "/admin/categories",
    label: "Категории",
    icon: e.jsx(Js, { size: 20 }),
  },
  {
    path: "/admin/settings",
    label: "Настройки",
    icon: e.jsx(sn, { size: 20 }),
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
              children: qn.map((r) =>
                e.jsx(
                  "li",
                  {
                    children: e.jsxs(Be, {
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
                e.jsx(za, { size: 20 }),
                e.jsx("span", { children: "Выйти" }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
}
function Wn({ title: t, onMenuClick: s, sidebarOpen: r }) {
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
                children: e.jsx(Ks, { size: 22, className: "text-gray-700" }),
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
                    e.jsx(Zs, {
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
                    children: e.jsx(wa, {
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
                    children: e.jsx(er, { size: 18, className: "text-white" }),
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
          e.jsx(Wn, { title: s, onMenuClick: () => a(!r), sidebarOpen: r }),
          e.jsx("main", { className: "p-4 md:p-6", children: t }),
        ],
      }),
    ],
  });
}
const lr = c.createContext(void 0),
  ir = () => {
    const t = c.useContext(lr);
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
          const m = await z.post(`/orders/${u}`, i);
          r((f) => [...f, m]);
        } catch (u) {
          console.error(u);
        }
      },
      o = async (i, u) => {
        try {
          const m = await z.patch(`/orders/${i}`, u);
          r((f) => f.map((x) => (x.id === i ? m : x)));
        } catch (m) {
          console.error(m);
        }
      },
      d = async (i) => {
        try {
          (await z.del(`/orders/${i}`), r((u) => u.filter((m) => m.id !== i)));
        } catch (u) {
          console.error(u);
        }
      };
    return (
      c.useEffect(() => {
        a?.role === "ADMIN" && n();
      }, [a?.role]),
      e.jsx(lr.Provider, {
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
function Hn(t) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(t));
}
function vs(t) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(t);
}
function or(t) {
  return typeof t.finalAmountMinor == "number" ? t.finalAmountMinor : 0;
}
function Vn(t) {
  const s = t.currency || "RUB",
    r = or(t);
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: s,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(r / 100);
}
function Gn() {
  const { products: t } = Je(),
    { orders: s } = ir(),
    r = s.length,
    a = t.length,
    n = t.filter((i) => i.inStock <= 0).length,
    l = s.reduce((i, u) => {
      const m = or(u) / 100;
      return i + (Number.isFinite(m) ? m : 0);
    }, 0),
    d = (() => {
      const i = new Map();
      for (const m of s) {
        const f = m.items ?? m.orderItems ?? [];
        if (Array.isArray(f))
          for (const x of f) {
            const p = Number(x.productId);
            if (!Number.isFinite(p)) continue;
            const g = Number(x.quantity ?? 1),
              v = Number(x.price ?? 0),
              b = x.productName ?? x.name,
              j = i.get(p) ?? { sales: 0, revenue: 0, name: b };
            ((j.sales += Number.isFinite(g) ? g : 1),
              (j.revenue +=
                (Number.isFinite(g) ? g : 1) * (Number.isFinite(v) ? v : 0)),
              (j.name = j.name ?? b),
              i.set(p, j));
          }
      }
      const u = Array.from(i.entries())
        .map(([m, f]) => {
          const x = t.find((p) => p.id === m);
          return {
            id: m,
            name: x?.name ?? f.name ?? `Product #${m}`,
            sales: f.sales,
            revenue: f.revenue,
            imageUrl: x?.imageUrl,
          };
        })
        .sort((m, f) => f.sales - m.sales)
        .slice(0, 6);
      return u.length === 0
        ? t
            .slice(0, 6)
            .map((m) => ({
              id: m.id,
              name: m.name,
              sales: 0,
              revenue: 0,
              imageUrl: m.imageUrl,
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
                    children: e.jsx(Ia, { size: 20 }),
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
                                      ? Hn(i.createdAt)
                                      : "—",
                                  }),
                                  e.jsx("td", {
                                    className: "py-3 text-gray-500",
                                    children: Vn(i),
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
                                children: i.revenue > 0 ? vs(i.revenue) : "—",
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
                      children: vs(l),
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
const Kn = 5 * 1024 * 1024,
  Xn = ["image/jpeg", "image/png", "image/webp", "image/gif"];
async function Yn(t, s) {
  if (t.size > Kn) throw new Error("Файл больше 5 МБ");
  if (!Xn.includes(t.type))
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
function cr({
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
        const m = await Yn(u, r);
        s(m);
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
function Qn({ isOpen: t, onClose: s, onCreate: r, onUpdate: a, product: n }) {
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
    [u, m] = c.useState([]),
    [f, x] = c.useState({});
  c.useEffect(() => {
    t &&
      (p(),
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
      x({}));
  }, [t, n]);
  const p = async () => {
      try {
        const S = await (await fetch(`${Ee}/categories`)).json();
        m(S);
      } catch (j) {
        console.error("Ошибка загрузки категорий:", j);
      }
    },
    g = () => {
      const j = {};
      return (
        l.name.trim() || (j.name = "Введите название товара"),
        l.price <= 0 && (j.price = "Цена должна быть больше 0"),
        l.inStock < 0 &&
          (j.inStock = "Количество должно быть больше либо равно 0"),
        l.imageUrl.trim() || (j.imageUrl = "Добавьте ссылку на изображение"),
        l.description.trim() || (j.description = "Введите описание"),
        x(j),
        Object.keys(j).length === 0
      );
    },
    v = async (j) => {
      if ((j.preventDefault(), !!g())) {
        i(!0);
        try {
          const S = {
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
          (n && a ? await a(n.id, S) : await r(S), s());
        } catch (S) {
          (console.error("Ошибка сохранения:", S),
            x({ submit: "Ошибка при сохранении товара" }));
        } finally {
          i(!1);
        }
      }
    },
    b = (j, S) => {
      (o((w) => ({ ...w, [j]: S })), f[j] && x((w) => ({ ...w, [j]: "" })));
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
                      children: e.jsx(tr, { size: 24 }),
                    }),
                  ],
                }),
                e.jsxs("form", {
                  onSubmit: v,
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
                                      onChange: (j) => b("sku", j.target.value),
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
                                        b("slug", j.target.value),
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
                                  onChange: (j) => b("name", j.target.value),
                                  className: `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#ff398b] focus:border-transparent ${f.name ? "border-red-500" : "border-gray-300"}`,
                                  placeholder: "Например: Торт 'Медовик'",
                                  disabled: d,
                                }),
                                f.name &&
                                  e.jsx("p", {
                                    className: "mt-1 text-sm text-red-600",
                                    children: f.name,
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
                                        b(
                                          "price",
                                          parseFloat(j.target.value) || 0,
                                        ),
                                      className: `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#ff398b] focus:border-transparent ${f.price ? "border-red-500" : "border-gray-300"}`,
                                      placeholder: "999.99",
                                      disabled: d,
                                    }),
                                    f.price &&
                                      e.jsx("p", {
                                        className: "mt-1 text-sm text-red-600",
                                        children: f.price,
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
                                        b(
                                          "inStock",
                                          parseInt(j.target.value) || 0,
                                        ),
                                      className: `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#ff398b] focus:border-transparent ${f.inStock ? "border-red-500" : "border-gray-300"}`,
                                      placeholder: "10",
                                      disabled: d,
                                    }),
                                    f.inStock &&
                                      e.jsx("p", {
                                        className: "mt-1 text-sm text-red-600",
                                        children: f.inStock,
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
                                    b("categoryId", parseInt(j.target.value)),
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
                                    b("isActive", j.target.checked),
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
                            e.jsx(cr, {
                              label: "Изображение товара",
                              value: l.imageUrl,
                              onChange: (j) => b("imageUrl", j),
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
                                    b("description", j.target.value),
                                  rows: 4,
                                  className: `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#ff398b] focus:border-transparent ${f.description ? "border-red-500" : "border-gray-300"}`,
                                  placeholder: "Опишите ваш товар...",
                                  disabled: d,
                                }),
                                f.description &&
                                  e.jsx("p", {
                                    className: "mt-1 text-sm text-red-600",
                                    children: f.description,
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
function Zn() {
  const {
      products: t,
      createProduct: s,
      updateProduct: r,
      deleteProduct: a,
    } = Je(),
    [n, l] = c.useState(!1),
    [o, d] = c.useState(null),
    i = async (p) => {
      await s(p);
    },
    u = async (p, g) => {
      await r(p, g);
    },
    m = async (p) => {
      window.confirm("Удалить товар?") && (await a(p));
    },
    f = (p) => {
      (d(p), l(!0));
    },
    x = () => {
      (d(null), l(!0));
    };
  return e.jsxs(gt, {
    title: "Управление товарами",
    children: [
      e.jsxs("button", {
        onClick: x,
        className:
          "mb-6 inline-flex w-full sm:w-auto items-center justify-center gap-2 px-4 py-2 bg-[#ff398b] text-white rounded-lg hover:bg-[#e0327a]",
        children: [
          e.jsx(Kt, { size: 18, className: "shrink-0" }),
          e.jsx("span", { children: "Добавить товар" }),
        ],
      }),
      e.jsx(Qn, {
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
                children: t.map((p) =>
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
                              src: p.imageUrl,
                              alt: p.name,
                              className: "w-14 h-14 object-cover rounded",
                            }),
                          ],
                        }),
                        e.jsx("td", {
                          className: "px-6 py-4",
                          children: p.name,
                        }),
                        e.jsx("td", {
                          className: "px-6 py-4",
                          children: p.sku,
                        }),
                        e.jsx("td", {
                          className: "px-6 py-4",
                          children: p.category.name,
                        }),
                        e.jsxs("td", {
                          className: "px-6 py-4",
                          children: [p.price, " ₽"],
                        }),
                        e.jsxs("td", {
                          className: "px-6 py-4",
                          children: [p.inStock, " шт"],
                        }),
                        e.jsx("td", {
                          className: "px-6 py-4",
                          children: p.isActive ? "Активен" : "Скрыт",
                        }),
                        e.jsx("td", {
                          className: "px-6 py-4",
                          children: e.jsxs("div", {
                            className: "flex gap-2",
                            children: [
                              e.jsx("button", {
                                onClick: () => f(p),
                                "aria-label": `Редактировать товар ${p.name}`,
                                className:
                                  "p-2 text-blue-600 hover:bg-blue-50 rounded",
                                children: e.jsx(Xt, { size: 16 }),
                              }),
                              e.jsx("button", {
                                onClick: () => m(p.id),
                                "aria-label": `Удалить товар ${p.name}`,
                                className:
                                  "p-2 text-red-600 hover:bg-red-50 rounded",
                                children: e.jsx(pt, { size: 16 }),
                              }),
                            ],
                          }),
                        }),
                      ],
                    },
                    p.id,
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
function Jn() {
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
        var y = new OffscreenCanvas(1, 1),
          h = y.getContext("2d");
        h.fillRect(0, 0, 1, 1);
        var $ = y.transferToImageBitmap();
        h.createPattern($, "no-repeat");
      } catch {
        return !1;
      }
      return !0;
    })();
  function i() {}
  function u(y) {
    var h = r.exports.Promise,
      $ = h !== void 0 ? h : s.Promise;
    return typeof $ == "function" ? new $(y) : (y(i, i), null);
  }
  var m = (function (y, h) {
      return {
        transform: function ($) {
          if (y) return $;
          if (h.has($)) return h.get($);
          var k = new OffscreenCanvas($.width, $.height),
            F = k.getContext("2d");
          return (F.drawImage($, 0, 0), h.set($, k), k);
        },
        clear: function () {
          h.clear();
        },
      };
    })(d, new Map()),
    f = (function () {
      var y = Math.floor(16.666666666666668),
        h,
        $,
        k = {},
        F = 0;
      return (
        typeof requestAnimationFrame == "function" &&
        typeof cancelAnimationFrame == "function"
          ? ((h = function (L) {
              var _ = Math.random();
              return (
                (k[_] = requestAnimationFrame(function I(T) {
                  F === T || F + y - 1 < T
                    ? ((F = T), delete k[_], L())
                    : (k[_] = requestAnimationFrame(I));
                })),
                _
              );
            }),
            ($ = function (L) {
              k[L] && cancelAnimationFrame(k[L]);
            }))
          : ((h = function (L) {
              return setTimeout(L, y);
            }),
            ($ = function (L) {
              return clearTimeout(L);
            })),
        { frame: h, cancel: $ }
      );
    })(),
    x = (function () {
      var y,
        h,
        $ = {};
      function k(F) {
        function L(_, I) {
          F.postMessage({ options: _ || {}, callback: I });
        }
        ((F.init = function (I) {
          var T = I.transferControlToOffscreen();
          F.postMessage({ canvas: T }, [T]);
        }),
          (F.fire = function (I, T, q) {
            if (h) return (L(I, null), h);
            var G = Math.random().toString(36).slice(2);
            return (
              (h = u(function (H) {
                function K(Z) {
                  Z.data.callback === G &&
                    (delete $[G],
                    F.removeEventListener("message", K),
                    (h = null),
                    m.clear(),
                    q(),
                    H());
                }
                (F.addEventListener("message", K),
                  L(I, G),
                  ($[G] = K.bind(null, { data: { callback: G } })));
              })),
              h
            );
          }),
          (F.reset = function () {
            F.postMessage({ reset: !0 });
            for (var I in $) ($[I](), delete $[I]);
          }));
      }
      return function () {
        if (y) return y;
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
            y = new Worker(URL.createObjectURL(new Blob([F])));
          } catch (L) {
            return (
              typeof console < "u" &&
                typeof console.warn == "function" &&
                console.warn("🎊 Could not load worker", L),
              null
            );
          }
          k(y);
        }
        return y;
      };
    })(),
    p = {
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
  function g(y, h) {
    return h ? h(y) : y;
  }
  function v(y) {
    return y != null;
  }
  function b(y, h, $) {
    return g(y && v(y[h]) ? y[h] : p[h], $);
  }
  function j(y) {
    return y < 0 ? 0 : Math.floor(y);
  }
  function S(y, h) {
    return Math.floor(Math.random() * (h - y)) + y;
  }
  function w(y) {
    return parseInt(y, 16);
  }
  function N(y) {
    return y.map(M);
  }
  function M(y) {
    var h = String(y).replace(/[^0-9a-f]/gi, "");
    return (
      h.length < 6 && (h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2]),
      {
        r: w(h.substring(0, 2)),
        g: w(h.substring(2, 4)),
        b: w(h.substring(4, 6)),
      }
    );
  }
  function C(y) {
    var h = b(y, "origin", Object);
    return ((h.x = b(h, "x", Number)), (h.y = b(h, "y", Number)), h);
  }
  function A(y) {
    ((y.width = document.documentElement.clientWidth),
      (y.height = document.documentElement.clientHeight));
  }
  function X(y) {
    var h = y.getBoundingClientRect();
    ((y.width = h.width), (y.height = h.height));
  }
  function ee(y) {
    var h = document.createElement("canvas");
    return (
      (h.style.position = "fixed"),
      (h.style.top = "0px"),
      (h.style.left = "0px"),
      (h.style.pointerEvents = "none"),
      (h.style.zIndex = y),
      h
    );
  }
  function P(y, h, $, k, F, L, _, I, T) {
    (y.save(),
      y.translate(h, $),
      y.rotate(L),
      y.scale(k, F),
      y.arc(0, 0, 1, _, I, T),
      y.restore());
  }
  function R(y) {
    var h = y.angle * (Math.PI / 180),
      $ = y.spread * (Math.PI / 180);
    return {
      x: y.x,
      y: y.y,
      wobble: Math.random() * 10,
      wobbleSpeed: Math.min(0.11, Math.random() * 0.1 + 0.05),
      velocity: y.startVelocity * 0.5 + Math.random() * y.startVelocity,
      angle2D: -h + (0.5 * $ - Math.random() * $),
      tiltAngle: (Math.random() * (0.75 - 0.25) + 0.25) * Math.PI,
      color: y.color,
      shape: y.shape,
      tick: 0,
      totalTicks: y.ticks,
      decay: y.decay,
      drift: y.drift,
      random: Math.random() + 2,
      tiltSin: 0,
      tiltCos: 0,
      wobbleX: 0,
      wobbleY: 0,
      gravity: y.gravity * 3,
      ovalScalar: 0.6,
      scalar: y.scalar,
      flat: y.flat,
    };
  }
  function E(y, h) {
    ((h.x += Math.cos(h.angle2D) * h.velocity + h.drift),
      (h.y += Math.sin(h.angle2D) * h.velocity + h.gravity),
      (h.velocity *= h.decay),
      h.flat
        ? ((h.wobble = 0),
          (h.wobbleX = h.x + 10 * h.scalar),
          (h.wobbleY = h.y + 10 * h.scalar),
          (h.tiltSin = 0),
          (h.tiltCos = 0),
          (h.random = 1))
        : ((h.wobble += h.wobbleSpeed),
          (h.wobbleX = h.x + 10 * h.scalar * Math.cos(h.wobble)),
          (h.wobbleY = h.y + 10 * h.scalar * Math.sin(h.wobble)),
          (h.tiltAngle += 0.1),
          (h.tiltSin = Math.sin(h.tiltAngle)),
          (h.tiltCos = Math.cos(h.tiltAngle)),
          (h.random = Math.random() + 2)));
    var $ = h.tick++ / h.totalTicks,
      k = h.x + h.random * h.tiltCos,
      F = h.y + h.random * h.tiltSin,
      L = h.wobbleX + h.random * h.tiltCos,
      _ = h.wobbleY + h.random * h.tiltSin;
    if (
      ((y.fillStyle =
        "rgba(" +
        h.color.r +
        ", " +
        h.color.g +
        ", " +
        h.color.b +
        ", " +
        (1 - $) +
        ")"),
      y.beginPath(),
      o &&
        h.shape.type === "path" &&
        typeof h.shape.path == "string" &&
        Array.isArray(h.shape.matrix))
    )
      y.fill(
        De(
          h.shape.path,
          h.shape.matrix,
          h.x,
          h.y,
          Math.abs(L - k) * 0.1,
          Math.abs(_ - F) * 0.1,
          (Math.PI / 10) * h.wobble,
        ),
      );
    else if (h.shape.type === "bitmap") {
      var I = (Math.PI / 10) * h.wobble,
        T = Math.abs(L - k) * 0.1,
        q = Math.abs(_ - F) * 0.1,
        G = h.shape.bitmap.width * h.scalar,
        H = h.shape.bitmap.height * h.scalar,
        K = new DOMMatrix([
          Math.cos(I) * T,
          Math.sin(I) * T,
          -Math.sin(I) * q,
          Math.cos(I) * q,
          h.x,
          h.y,
        ]);
      K.multiplySelf(new DOMMatrix(h.shape.matrix));
      var Z = y.createPattern(m.transform(h.shape.bitmap), "no-repeat");
      (Z.setTransform(K),
        (y.globalAlpha = 1 - $),
        (y.fillStyle = Z),
        y.fillRect(h.x - G / 2, h.y - H / 2, G, H),
        (y.globalAlpha = 1));
    } else if (h.shape === "circle")
      y.ellipse
        ? y.ellipse(
            h.x,
            h.y,
            Math.abs(L - k) * h.ovalScalar,
            Math.abs(_ - F) * h.ovalScalar,
            (Math.PI / 10) * h.wobble,
            0,
            2 * Math.PI,
          )
        : P(
            y,
            h.x,
            h.y,
            Math.abs(L - k) * h.ovalScalar,
            Math.abs(_ - F) * h.ovalScalar,
            (Math.PI / 10) * h.wobble,
            0,
            2 * Math.PI,
          );
    else if (h.shape === "star")
      for (
        var U = (Math.PI / 2) * 3,
          te = 4 * h.scalar,
          ie = 8 * h.scalar,
          oe = h.x,
          fe = h.y,
          Me = 5,
          de = Math.PI / Me;
        Me--;
      )
        ((oe = h.x + Math.cos(U) * ie),
          (fe = h.y + Math.sin(U) * ie),
          y.lineTo(oe, fe),
          (U += de),
          (oe = h.x + Math.cos(U) * te),
          (fe = h.y + Math.sin(U) * te),
          y.lineTo(oe, fe),
          (U += de));
    else
      (y.moveTo(Math.floor(h.x), Math.floor(h.y)),
        y.lineTo(Math.floor(h.wobbleX), Math.floor(F)),
        y.lineTo(Math.floor(L), Math.floor(_)),
        y.lineTo(Math.floor(k), Math.floor(h.wobbleY)));
    return (y.closePath(), y.fill(), h.tick < h.totalTicks);
  }
  function B(y, h, $, k, F) {
    var L = h.slice(),
      _ = y.getContext("2d"),
      I,
      T,
      q = u(function (G) {
        function H() {
          ((I = T = null),
            _.clearRect(0, 0, k.width, k.height),
            m.clear(),
            F(),
            G());
        }
        function K() {
          (a &&
            !(k.width === n.width && k.height === n.height) &&
            ((k.width = y.width = n.width), (k.height = y.height = n.height)),
            !k.width &&
              !k.height &&
              ($(y), (k.width = y.width), (k.height = y.height)),
            _.clearRect(0, 0, k.width, k.height),
            (L = L.filter(function (Z) {
              return E(_, Z);
            })),
            L.length ? (I = f.frame(K)) : H());
        }
        ((I = f.frame(K)), (T = H));
      });
    return {
      addFettis: function (G) {
        return ((L = L.concat(G)), q);
      },
      canvas: y,
      promise: q,
      reset: function () {
        (I && f.cancel(I), T && T());
      },
    };
  }
  function J(y, h) {
    var $ = !y,
      k = !!b(h || {}, "resize"),
      F = !1,
      L = b(h, "disableForReducedMotion", Boolean),
      _ = l && !!b(h || {}, "useWorker"),
      I = _ ? x() : null,
      T = $ ? A : X,
      q = y && I ? !!y.__confetti_initialized : !1,
      G =
        typeof matchMedia == "function" &&
        matchMedia("(prefers-reduced-motion)").matches,
      H;
    function K(U, te, ie) {
      for (
        var oe = b(U, "particleCount", j),
          fe = b(U, "angle", Number),
          Me = b(U, "spread", Number),
          de = b(U, "startVelocity", Number),
          Br = b(U, "decay", Number),
          Wr = b(U, "gravity", Number),
          Hr = b(U, "drift", Number),
          as = b(U, "colors", N),
          Vr = b(U, "ticks", Number),
          ns = b(U, "shapes"),
          Gr = b(U, "scalar"),
          Kr = !!b(U, "flat"),
          ls = C(U),
          is = oe,
          St = [],
          Xr = y.width * ls.x,
          Yr = y.height * ls.y;
        is--;
      )
        St.push(
          R({
            x: Xr,
            y: Yr,
            angle: fe,
            spread: Me,
            startVelocity: de,
            color: as[is % as.length],
            shape: ns[S(0, ns.length)],
            ticks: Vr,
            decay: Br,
            gravity: Wr,
            drift: Hr,
            scalar: Gr,
            flat: Kr,
          }),
        );
      return H ? H.addFettis(St) : ((H = B(y, St, T, te, ie)), H.promise);
    }
    function Z(U) {
      var te = L || b(U, "disableForReducedMotion", Boolean),
        ie = b(U, "zIndex", Number);
      if (te && G)
        return u(function (de) {
          de();
        });
      ($ && H
        ? (y = H.canvas)
        : $ && !y && ((y = ee(ie)), document.body.appendChild(y)),
        k && !q && T(y));
      var oe = { width: y.width, height: y.height };
      (I && !q && I.init(y), (q = !0), I && (y.__confetti_initialized = !0));
      function fe() {
        if (I) {
          var de = {
            getBoundingClientRect: function () {
              if (!$) return y.getBoundingClientRect();
            },
          };
          (T(de),
            I.postMessage({ resize: { width: de.width, height: de.height } }));
          return;
        }
        oe.width = oe.height = null;
      }
      function Me() {
        ((H = null),
          k && ((F = !1), s.removeEventListener("resize", fe)),
          $ &&
            y &&
            (document.body.contains(y) && document.body.removeChild(y),
            (y = null),
            (q = !1)));
      }
      return (
        k && !F && ((F = !0), s.addEventListener("resize", fe, !1)),
        I ? I.fire(U, oe, Me) : K(U, oe, Me)
      );
    }
    return (
      (Z.reset = function () {
        (I && I.reset(), H && H.reset());
      }),
      Z
    );
  }
  var Q;
  function Te() {
    return (Q || (Q = J(null, { useWorker: !0, resize: !0 })), Q);
  }
  function De(y, h, $, k, F, L, _) {
    var I = new Path2D(y),
      T = new Path2D();
    T.addPath(I, new DOMMatrix(h));
    var q = new Path2D();
    return (
      q.addPath(
        T,
        new DOMMatrix([
          Math.cos(_) * F,
          Math.sin(_) * F,
          -Math.sin(_) * L,
          Math.cos(_) * L,
          $,
          k,
        ]),
      ),
      q
    );
  }
  function Ne(y) {
    if (!o) throw new Error("path confetti are not supported in this browser");
    var h, $;
    typeof y == "string" ? (h = y) : ((h = y.path), ($ = y.matrix));
    var k = new Path2D(h),
      F = document.createElement("canvas"),
      L = F.getContext("2d");
    if (!$) {
      for (var _ = 1e3, I = _, T = _, q = 0, G = 0, H, K, Z = 0; Z < _; Z += 2)
        for (var U = 0; U < _; U += 2)
          L.isPointInPath(k, Z, U, "nonzero") &&
            ((I = Math.min(I, Z)),
            (T = Math.min(T, U)),
            (q = Math.max(q, Z)),
            (G = Math.max(G, U)));
      ((H = q - I), (K = G - T));
      var te = 10,
        ie = Math.min(te / H, te / K);
      $ = [
        ie,
        0,
        0,
        ie,
        -Math.round(H / 2 + I) * ie,
        -Math.round(K / 2 + T) * ie,
      ];
    }
    return { type: "path", path: h, matrix: $ };
  }
  function we(y) {
    var h,
      $ = 1,
      k = "#000000",
      F =
        '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';
    typeof y == "string"
      ? (h = y)
      : ((h = y.text),
        ($ = "scalar" in y ? y.scalar : $),
        (F = "fontFamily" in y ? y.fontFamily : F),
        (k = "color" in y ? y.color : k));
    var L = 10 * $,
      _ = "" + L + "px " + F,
      I = new OffscreenCanvas(L, L),
      T = I.getContext("2d");
    T.font = _;
    var q = T.measureText(h),
      G = Math.ceil(q.actualBoundingBoxRight + q.actualBoundingBoxLeft),
      H = Math.ceil(q.actualBoundingBoxAscent + q.actualBoundingBoxDescent),
      K = 2,
      Z = q.actualBoundingBoxLeft + K,
      U = q.actualBoundingBoxAscent + K;
    ((G += K + K),
      (H += K + K),
      (I = new OffscreenCanvas(G, H)),
      (T = I.getContext("2d")),
      (T.font = _),
      (T.fillStyle = k),
      T.fillText(h, Z, U));
    var te = 1 / $;
    return {
      type: "bitmap",
      bitmap: I.transferToImageBitmap(),
      matrix: [te, 0, 0, te, (-G * te) / 2, (-H * te) / 2],
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
const el = Qt.exports;
Qt.exports.create;
const dr = c.createContext(null);
function tl({ children: t }) {
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
    [u, m] = c.useState(""),
    { cartItems: f } = ye(),
    x = f.reduce((b, j) => b + j.price * j.quantity, 0),
    p = l?.price || 0,
    g = d?.price || 0,
    v = x + p + g;
  return e.jsx(dr.Provider, {
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
      setCustomerNote: m,
      subtotal: x,
      totalAmount: v,
      deliveryPrice: p,
      giftPrice: g,
    },
    children: t,
  });
}
function ze() {
  const t = c.useContext(dr);
  if (!t) throw new Error("useCheckout must be used inside CheckoutProvider");
  return t;
}
function sl(t, s = 350) {
  const [r, a] = c.useState(t);
  return (
    c.useEffect(() => {
      const n = setTimeout(() => a(t), s);
      return () => clearTimeout(n);
    }, [t, s]),
    r
  );
}
function rl({ value: t, onChange: s, apiUrl: r }) {
  const [a, n] = c.useState([]),
    [l, o] = c.useState(!1),
    [d, i] = c.useState(!1),
    u = c.useRef(null),
    m = sl(t, 350);
  (c.useEffect(() => {
    const x = (p) => {
      u.current && (u.current.contains(p.target) || o(!1));
    };
    return (
      document.addEventListener("mousedown", x),
      () => document.removeEventListener("mousedown", x)
    );
  }, []),
    c.useEffect(() => {
      let x = !0;
      async function p() {
        const g = (m ?? "").trim();
        if (g.length < 3) {
          n([]);
          return;
        }
        i(!0);
        try {
          const b = await (
            await fetch(`${r}/suggest/address`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({ query: g, count: 8 }),
            })
          ).json();
          if (!x) return;
          (n(Array.isArray(b?.suggestions) ? b.suggestions : []), o(!0));
        } catch {
          if (!x) return;
          n([]);
        } finally {
          x && i(!1);
        }
      }
      return (
        p(),
        () => {
          x = !1;
        }
      );
    }, [m, r]));
  const f = l && (d || a.length > 0);
  return e.jsxs("div", {
    ref: u,
    className: "relative",
    children: [
      e.jsx("input", {
        type: "text",
        value: t,
        onChange: (x) => {
          (s(x.target.value), o(!0));
        },
        onFocus: () => t.trim().length >= 3 && o(!0),
        className:
          "w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#ff398b] focus:ring-4 focus:ring-pink-100 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-pink-200 text-gray-900 placeholder-gray-400",
        placeholder: "Город, улица, дом",
        autoComplete: "off",
      }),
      f &&
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
              a.map((x, p) =>
                e.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      (s(x.unrestricted_value || x.value), o(!1), n([]));
                    },
                    className:
                      "w-full text-left px-4 py-3 text-sm hover:bg-pink-50",
                    children: [
                      e.jsx("div", {
                        className: "font-medium text-gray-900",
                        children: x.value,
                      }),
                      x.unrestricted_value &&
                        x.unrestricted_value !== x.value &&
                        e.jsx("div", {
                          className: "text-xs text-gray-500 mt-0.5",
                          children: x.unrestricted_value,
                        }),
                    ],
                  },
                  `${x.value}-${p}`,
                ),
              ),
          ],
        }),
    ],
  });
}
const al = () => {
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
          const m = await z.get("/auth/me/addresses");
          if (!i) return;
          n(m ?? []);
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
    const u = a.find((m) => String(m.id) === i);
    u &&
      s((m) => ({
        ...m,
        name: u.recipientName || m.name,
        phone: u.recipientPhone || m.phone,
        address: u.fullAddress || m.address,
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
              e.jsx(rl, {
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
function ur() {
  return z.get("/orders/options");
}
const nl = {
    1: e.jsx(yn, { className: "w-5 h-5" }),
    2: e.jsx(Qe, { className: "w-5 h-5" }),
    3: e.jsx(ft, { className: "w-5 h-5" }),
  },
  ll = () => {
    const { selectedDelivery: t, setSelectedDelivery: s } = ze(),
      [r, a] = c.useState([]),
      [n, l] = c.useState(!0),
      [o, d] = c.useState("");
    return (
      c.useEffect(() => {
        let i = !1;
        return (
          ur()
            .then((u) => {
              i ||
                a(
                  u.delivery
                    .filter((m) => m.available !== !1)
                    .map((m) => ({
                      id: m.id,
                      name: m.name,
                      description: m.description,
                      price: m.price,
                      time: m.time ?? "",
                      icon: nl[m.id] ?? e.jsx(Qe, { className: "w-5 h-5" }),
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
  il = {
    1: e.jsx(_t, { className: "w-5 h-5" }),
    2: e.jsx(La, { className: "w-5 h-5" }),
    3: e.jsx(Fe, { className: "w-5 h-5" }),
    4: e.jsx(un, { className: "w-5 h-5" }),
  },
  ol = () => {
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
        let m = !1;
        return (
          ur()
            .then((f) => {
              m ||
                l(
                  f.gifts.map((x) => ({
                    id: x.id,
                    name: x.name,
                    description: x.description,
                    price: x.price,
                    icon: il[x.id] ?? e.jsx(_t, { className: "w-5 h-5" }),
                    available: x.available !== !1,
                  })),
                );
            })
            .catch(() => {
              m || u("Не удалось загрузить дополнительные опции");
            })
            .finally(() => {
              m || d(!1);
            }),
          () => {
            m = !0;
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
                [1, 2, 3, 4].map((m) =>
                  e.jsx(
                    "div",
                    {
                      className:
                        "h-48 animate-pulse rounded-2xl border-2 border-gray-100 bg-gray-50",
                    },
                    m,
                  ),
                ),
              n.map((m) =>
                e.jsxs(
                  "button",
                  {
                    onClick: () => m.available && s(m),
                    className: `group relative p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 overflow-hidden ${t?.id === m.id ? "border-[#ff398b] bg-linear-to-br from-pink-50 via-amber-50/30 to-orange-50 shadow-xl shadow-pink-200/50 scale-105" : m.available ? "border-gray-200 hover:border-pink-300 hover:shadow-lg bg-white/80 backdrop-blur-sm" : "border-gray-200 opacity-50 cursor-not-allowed bg-gray-50"}`,
                    disabled: !m.available,
                    children: [
                      t?.id === m.id &&
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
                                className: `p-2.5 rounded-xl transition-all duration-300 ${t?.id === m.id ? "bg-linear-to-br from-[#ff398b] to-pink-500 text-white shadow-lg shadow-pink-300/50" : m.available ? "bg-gray-100 text-gray-600 group-hover:bg-pink-100 group-hover:text-[#ff398b]" : "bg-gray-100 text-gray-400"}`,
                                children: m.icon,
                              }),
                              e.jsx("h3", {
                                className:
                                  "font-semibold text-sm text-gray-900 leading-tight",
                                children: m.name,
                              }),
                            ],
                          }),
                          e.jsx("p", {
                            className:
                              "text-xs text-gray-600 mb-4 leading-relaxed",
                            children: m.description,
                          }),
                          e.jsx("div", {
                            className:
                              "text-right pt-3 border-t border-gray-100",
                            children: e.jsxs("span", {
                              className: `font-bold text-lg transition-colors ${t?.id === m.id ? "text-[#ff398b]" : "text-gray-700"}`,
                              children: ["+", m.price, " ₽"],
                            }),
                          }),
                        ],
                      }),
                    ],
                  },
                  m.id,
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
                      children: e.jsx(Ys, {
                        className: "w-4 h-4 text-[#ff398b]",
                      }),
                    }),
                    e.jsx("span", { children: "Ваши пожелания к заказу" }),
                  ],
                }),
              }),
              e.jsx("textarea", {
                value: r,
                onChange: (m) => a(m.target.value),
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
  cl = () => {
    const { cartItems: t } = ye(),
      {
        selectedGift: s,
        selectedDelivery: r,
        subtotal: a,
        totalAmount: n,
        deliveryPrice: l,
        giftPrice: o,
      } = ze();
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
                      children: t.map((d, i) =>
                        e.jsxs(
                          "div",
                          {
                            className:
                              "flex flex-col min-[420px]:flex-row min-[420px]:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-pink-100/50 hover:shadow-md transition-all",
                            children: [
                              e.jsx("div", {
                                className:
                                  "w-12 h-12 sm:w-14 sm:h-14 bg-linear-to-br from-pink-200 to-rose-200 rounded-xl flex shrink-0 items-center justify-center text-xl sm:text-2xl shadow-md",
                                children: d.isCustom
                                  ? "🎁"
                                  : i % 3 === 0
                                    ? "🍰"
                                    : i % 3 === 1
                                      ? "🍬"
                                      : "🎂",
                              }),
                              e.jsxs("div", {
                                className: "flex-1 min-w-0",
                                children: [
                                  e.jsx("div", {
                                    className: "font-semibold text-gray-900",
                                    children: d.name,
                                  }),
                                  e.jsxs("div", {
                                    className: "text-sm text-gray-600 mt-1",
                                    children: [
                                      d.quantity,
                                      " × ",
                                      d.price.toLocaleString(),
                                      " ₽",
                                    ],
                                  }),
                                  d.customConfig &&
                                    e.jsx("div", {
                                      className: "mt-1 text-xs text-[#ff398b]",
                                      children:
                                        d.customConfig.type === "custom_cake"
                                          ? `Индивидуальный торт: ${d.customConfig.base}, ${d.customConfig.size.toUpperCase()}, ${d.customConfig.sweetSet}, ${d.customConfig.packaging}`
                                          : `Индивидуальный конфетный торт: ${d.customConfig.candies.reduce((u, m) => u + m.quantity, 0)} конфет`,
                                    }),
                                ],
                              }),
                              e.jsxs("div", {
                                className:
                                  "font-bold text-base sm:text-lg text-[#ff398b]",
                                children: [
                                  (d.price * d.quantity).toLocaleString(),
                                  " ₽",
                                ],
                              }),
                            ],
                          },
                          d.id,
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
function dl() {
  const { cartCount: t, refreshCart: s, clearCart: r, cartItems: a } = ye(),
    [n, l] = c.useState(1),
    [o, d] = c.useState(!1),
    {
      selectedDelivery: i,
      selectedGift: u,
      totalAmount: m,
      customerNote: f,
    } = ze(),
    [x, p] = c.useState(!1),
    [g, v] = c.useState(""),
    [b, j] = c.useState(null),
    [S, w] = c.useState(null),
    N = c.useRef(null),
    { user: M } = xe(),
    C = M?.id,
    { formData: A } = ze(),
    X = () => {
      el({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ff398b", "#ff6ba9", "#ff9ec0", "#ffcfe0", "#fff"],
      });
    },
    ee = async () => {
      if ((v(""), !i)) {
        v("Выберите способ доставки");
        return;
      }
      if (!C) {
        v("Нужно войти в аккаунт перед оплатой");
        return;
      }
      if (!a.length) {
        v("Корзина пуста");
        return;
      }
      p(!0);
      try {
        N.current ||
          (N.current =
            typeof crypto < "u" && "randomUUID" in crypto
              ? crypto.randomUUID()
              : `order-${C}-${Date.now()}`);
        const E = await z.post(
          `/orders/${C}`,
          {
            fullName: A.name,
            phone: A.phone,
            address: A.address,
            apartment: A.apartment,
            entrance: A.entrance,
            floor: A.floor,
            intercom: A.intercom,
            comment: f.trim() || void 0,
            currency: "RUB",
            deliveryOptionId: i.id,
            giftOptionId: u?.id,
          },
          { headers: { "Idempotency-Key": N.current } },
        );
        (j(E.id), w(E.publicOrderNumber ?? null));
        const B = await z.post(`/payments/orders/${E.id}/yookassa`, void 0, {
          headers: { "Idempotency-Key": `order-${E.id}-yookassa` },
        });
        if (B.confirmationUrl) {
          window.location.href = B.confirmationUrl;
          return;
        }
        B.status === "SUCCEEDED"
          ? (X(), d(!0), r(), s())
          : v("Платеж создан, но ссылка на оплату не получена");
      } catch (E) {
        v(E instanceof ne ? E.message : "Не удалось создать заказ/платеж");
      } finally {
        p(!1);
      }
    },
    P = A.address,
    R = () =>
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
                    children: ["Номер заказа:", " ", S ?? `#${b ?? "—"}`],
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
                        children: e.jsx(Ys, {
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
                children: e.jsxs(V, {
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
              e.jsxs(V, {
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
            ? e.jsx(R, {})
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
                      n === 1 && e.jsx(al, {}),
                      n === 2 && e.jsx(ll, {}),
                      n === 3 && e.jsx(ol, {}),
                      n === 4 && e.jsx(cl, {}),
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
                                disabled: x || !i,
                                className: `group relative w-full min-[420px]:w-auto px-6 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 overflow-hidden ${x || !i ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-linear-to-r from-[#ff398b] via-pink-500 to-purple-500 text-white hover:shadow-2xl hover:shadow-pink-400/50 hover:scale-105 active:scale-95"}`,
                                children: x
                                  ? e.jsxs(e.Fragment, {
                                      children: [
                                        e.jsxs("span", {
                                          className:
                                            "flex items-center gap-3 relative z-10",
                                          children: [
                                            e.jsx(Ja, {
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
                                              m.toLocaleString(),
                                              " ₽",
                                            ],
                                          }),
                                        ],
                                      }),
                                    }),
                              }),
                        ],
                      }),
                      g &&
                        e.jsx("div", {
                          className:
                            "mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700",
                          children: g,
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
var ul = Object.defineProperty,
  ml = (t, s, r) =>
    s in t
      ? ul(t, s, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (t[s] = r),
  Mt = (t, s, r) => (ml(t, typeof s != "symbol" ? s + "" : s, r), r);
let xl = class {
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
  me = new xl();
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
function mr(t) {
  var s, r;
  return (r = (s = zt(t)) == null ? void 0 : s.activeElement) != null
    ? r
    : null;
}
function hl(t) {
  return mr(t) === t;
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
let W = function (t) {
  let s = Oe(t);
  return O.useCallback((...r) => s.current(...r), [s]);
};
function tt(t) {
  return c.useMemo(() => t, Object.values(t));
}
let fl = c.createContext(void 0);
function pl() {
  return c.useContext(fl);
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
  let t = bl();
  return c.useCallback((s) => gl({ mergeRefs: t, ...s }), [t]);
}
function gl({
  ourProps: t,
  theirProps: s,
  slot: r,
  defaultTag: a,
  features: n,
  visible: l = !0,
  name: o,
  mergeRefs: d,
}) {
  d = d ?? yl;
  let i = xr(s, t);
  if (l) return it(i, r, a, o, d);
  let u = n ?? 0;
  if (u & 2) {
    let { static: m = !1, ...f } = i;
    if (m) return it(f, r, a, o, d);
  }
  if (u & 1) {
    let { unmount: m = !0, ...f } = i;
    return ve(m ? 0 : 1, {
      0() {
        return null;
      },
      1() {
        return it({ ...f, hidden: !0, style: { display: "none" } }, r, a, o, d);
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
    m = typeof o == "function" ? o(s) : o;
  ((m = hr(m)),
    "className" in i &&
      i.className &&
      typeof i.className == "function" &&
      (i.className = i.className(s)),
    i["aria-labelledby"] &&
      i["aria-labelledby"] === i.id &&
      (i["aria-labelledby"] = void 0));
  let f = {};
  if (s) {
    let x = !1,
      p = [];
    for (let [g, v] of Object.entries(s))
      (typeof v == "boolean" && (x = !0),
        v === !0 &&
          p.push(g.replace(/([A-Z])/g, (b) => `-${b.toLowerCase()}`)));
    if (x) {
      f["data-headlessui-state"] = p.join(" ");
      for (let g of p) f[`data-${g}`] = "";
    }
  }
  if (Ge(l) && (Object.keys(Pe(i)).length > 0 || Object.keys(Pe(f)).length > 0))
    if (!c.isValidElement(m) || (Array.isArray(m) && m.length > 1) || jl(m)) {
      if (Object.keys(Pe(i)).length > 0)
        throw new Error(
          [
            'Passing props on "Fragment"!',
            "",
            `The current component <${a} /> is rendering a "Fragment".`,
            "However we need to passthrough the following props:",
            Object.keys(Pe(i))
              .concat(Object.keys(Pe(f)))
              .map((x) => `  - ${x}`).join(`
`),
            "",
            "You can apply a few solutions:",
            [
              'Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".',
              "Render a single element as the child so that we can forward the props onto that element.",
            ].map((x) => `  - ${x}`).join(`
`),
          ].join(`
`),
        );
    } else {
      let x = m.props,
        p = x?.className,
        g =
          typeof p == "function"
            ? (...j) => Ut(p(...j), i.className)
            : Ut(p, i.className),
        v = g ? { className: g } : {},
        b = xr(m.props, Pe(Pt(i, ["ref"])));
      for (let j in f) j in b && delete f[j];
      return c.cloneElement(
        m,
        Object.assign({}, b, f, u, { ref: n(vl(m), u.ref) }, v),
      );
    }
  return c.createElement(
    l,
    Object.assign({}, Pt(i, ["ref"]), !Ge(l) && u, !Ge(l) && f),
    m,
  );
}
function bl() {
  let t = c.useRef([]),
    s = c.useCallback((r) => {
      for (let a of t.current)
        a != null && (typeof a == "function" ? a(r) : (a.current = r));
    }, []);
  return (...r) => {
    if (!r.every((a) => a == null)) return ((t.current = r), s);
  };
}
function yl(...t) {
  return t.every((s) => s == null)
    ? void 0
    : (s) => {
        for (let r of t)
          r != null && (typeof r == "function" ? r(s) : (r.current = s));
      };
}
function xr(...t) {
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
function vl(t) {
  return O.version.split(".")[0] >= "19" ? t.props.ref : t.ref;
}
function hr(t) {
  if (t != null && t.$$typeof === Symbol.for("react.lazy")) {
    let s = t._payload;
    if (s != null && s.status === "fulfilled") return hr(s.value);
  }
  return t;
}
function Ge(t) {
  return t === c.Fragment || t === Symbol.for("react.fragment");
}
function jl(t) {
  return Ge(t.type);
}
let Nl = "span";
var xt = ((t) => (
  (t[(t.None = 1)] = "None"),
  (t[(t.Focusable = 2)] = "Focusable"),
  (t[(t.Hidden = 4)] = "Hidden"),
  t
))(xt || {});
function wl(t, s) {
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
    defaultTag: Nl,
    name: "Hidden",
  });
}
let qt = re(wl);
function kl(t) {
  return typeof t != "object" || t === null ? !1 : "nodeType" in t;
}
function $e(t) {
  return kl(t) && "tagName" in t;
}
function Le(t) {
  return $e(t) && "accessKey" in t;
}
function Se(t) {
  return $e(t) && "tabIndex" in t;
}
function Cl(t) {
  return $e(t) && "style" in t;
}
function Sl(t) {
  return Le(t) && t.nodeName === "IFRAME";
}
function El(t) {
  return Le(t) && t.nodeName === "INPUT";
}
let fr = Symbol();
function $l(t, s = !0) {
  return Object.assign(t, { [fr]: s });
}
function he(...t) {
  let s = c.useRef(t);
  c.useEffect(() => {
    s.current = t;
  }, [t]);
  let r = W((a) => {
    for (let n of s.current)
      n != null && (typeof n == "function" ? n(a) : (n.current = a));
  });
  return t.every((a) => a == null || a?.[fr]) ? void 0 : r;
}
let Zt = c.createContext(null);
Zt.displayName = "DescriptionContext";
function pr() {
  let t = c.useContext(Zt);
  if (t === null) {
    let s = new Error(
      "You used a <Description /> component, but it is not inside a relevant parent.",
    );
    throw (Error.captureStackTrace && Error.captureStackTrace(s, pr), s);
  }
  return t;
}
function Ml() {
  let [t, s] = c.useState([]);
  return [
    t.length > 0 ? t.join(" ") : void 0,
    c.useMemo(
      () =>
        function (r) {
          let a = W(
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
let Pl = "p";
function Il(t, s) {
  let r = c.useId(),
    a = pl(),
    { id: n = `headlessui-description-${r}`, ...l } = t,
    o = pr(),
    d = he(s);
  se(() => o.register(n), [n, o.register]);
  let i = tt({ ...o.slot, disabled: a || !1 }),
    u = { ref: d, ...o.props, id: n };
  return le()({
    ourProps: u,
    theirProps: l,
    slot: i,
    defaultTag: Pl,
    name: o.name || "Description",
  });
}
let Al = re(Il),
  Fl = Object.assign(Al, {});
var gr = ((t) => (
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
))(gr || {});
let Ll = c.createContext(() => {});
function Ol({ value: t, children: s }) {
  return O.createElement(Ll.Provider, { value: t }, s);
}
let br = class extends Map {
  constructor(s) {
    (super(), (this.factory = s));
  }
  get(s) {
    let r = super.get(s);
    return (r === void 0 && ((r = this.factory(s)), this.set(s, r)), r);
  }
};
var Tl = Object.defineProperty,
  Dl = (t, s, r) =>
    s in t
      ? Tl(t, s, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (t[s] = r),
  Rl = (t, s, r) => (Dl(t, s + "", r), r),
  yr = (t, s, r) => {
    if (!s.has(t)) throw TypeError("Cannot " + r);
  },
  ae = (t, s, r) => (
    yr(t, s, "read from private field"),
    r ? r.call(t) : s.get(t)
  ),
  It = (t, s, r) => {
    if (s.has(t))
      throw TypeError("Cannot add the same private member more than once");
    s instanceof WeakSet ? s.add(t) : s.set(t, r);
  },
  js = (t, s, r, a) => (yr(t, s, "write to private field"), s.set(t, r), r),
  ue,
  We,
  He;
let _l = class {
  constructor(s) {
    (It(this, ue, {}),
      It(this, We, new br(() => new Set())),
      It(this, He, new Set()),
      Rl(this, "disposables", je()),
      js(this, ue, s),
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
      js(this, ue, r);
      for (let a of ae(this, He)) {
        let n = a.selector(ae(this, ue));
        vr(a.current, n) || ((a.current = n), a.callback(n));
      }
      for (let a of ae(this, We).get(s.type)) a(ae(this, ue), s);
    }
  }
};
((ue = new WeakMap()), (We = new WeakMap()), (He = new WeakMap()));
function vr(t, s) {
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
          : Ns(t) && Ns(s)
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
function Ns(t) {
  if (Object.prototype.toString.call(t) !== "[object Object]") return !1;
  let s = Object.getPrototypeOf(t);
  return s === null || Object.getPrototypeOf(s) === null;
}
var zl = Object.defineProperty,
  Ul = (t, s, r) =>
    s in t
      ? zl(t, s, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (t[s] = r),
  ws = (t, s, r) => (Ul(t, typeof s != "symbol" ? s + "" : s, r), r),
  ql = ((t) => ((t[(t.Push = 0)] = "Push"), (t[(t.Pop = 1)] = "Pop"), t))(
    ql || {},
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
  Wl = class jr extends _l {
    constructor() {
      (super(...arguments),
        ws(this, "actions", {
          push: (s) => this.send({ type: 0, id: s }),
          pop: (s) => this.send({ type: 1, id: s }),
        }),
        ws(this, "selectors", {
          isTop: (s, r) => s.stack[s.stack.length - 1] === r,
          inStack: (s, r) => s.stack.includes(r),
        }));
    }
    static new() {
      return new jr({ stack: [] });
    }
    reduce(s, r) {
      return ve(r.type, Bl, s, r);
    }
  };
const Nr = new br(() => Wl.new());
var Ft = { exports: {} },
  Lt = {};
var ks;
function Hl() {
  if (ks) return Lt;
  ks = 1;
  var t = Zr();
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
    (Lt.useSyncExternalStoreWithSelector = function (i, u, m, f, x) {
      var p = n(null);
      if (p.current === null) {
        var g = { hasValue: !1, value: null };
        p.current = g;
      } else g = p.current;
      p = o(
        function () {
          function b(M) {
            if (!j) {
              if (((j = !0), (S = M), (M = f(M)), x !== void 0 && g.hasValue)) {
                var C = g.value;
                if (x(C, M)) return (w = C);
              }
              return (w = M);
            }
            if (((C = w), r(S, M))) return C;
            var A = f(M);
            return x !== void 0 && x(C, A) ? ((S = M), C) : ((S = M), (w = A));
          }
          var j = !1,
            S,
            w,
            N = m === void 0 ? null : m;
          return [
            function () {
              return b(u());
            },
            N === null
              ? void 0
              : function () {
                  return b(N());
                },
          ];
        },
        [u, m, f, x],
      );
      var v = a(i, p[0], p[1]);
      return (
        l(
          function () {
            ((g.hasValue = !0), (g.value = v));
          },
          [v],
        ),
        d(v),
        v
      );
    }),
    Lt
  );
}
var Cs;
function Vl() {
  return (Cs || ((Cs = 1), (Ft.exports = Hl())), Ft.exports);
}
var Gl = Vl();
function wr(t, s, r = vr) {
  return Gl.useSyncExternalStoreWithSelector(
    W((a) => t.subscribe(Kl, a)),
    W(() => t.state),
    W(() => t.state),
    W(s),
    r,
  );
}
function Kl(t) {
  return t;
}
function st(t, s) {
  let r = c.useId(),
    a = Nr.get(s),
    [n, l] = wr(
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
let Bt = new Map(),
  Ke = new Map();
function Ss(t) {
  var s;
  let r = (s = Ke.get(t)) != null ? s : 0;
  return (
    Ke.set(t, r + 1),
    r !== 0
      ? () => Es(t)
      : (Bt.set(t, {
          "aria-hidden": t.getAttribute("aria-hidden"),
          inert: t.inert,
        }),
        t.setAttribute("aria-hidden", "true"),
        (t.inert = !0),
        () => Es(t))
  );
}
function Es(t) {
  var s;
  let r = (s = Ke.get(t)) != null ? s : 1;
  if ((r === 1 ? Ke.delete(t) : Ke.set(t, r - 1), r !== 1)) return;
  let a = Bt.get(t);
  a &&
    (a["aria-hidden"] === null
      ? t.removeAttribute("aria-hidden")
      : t.setAttribute("aria-hidden", a["aria-hidden"]),
    (t.inert = a.inert),
    Bt.delete(t));
}
function Xl(t, { allowed: s, disallowed: r } = {}) {
  let a = st(t, "inert-others");
  se(() => {
    var n, l;
    if (!a) return;
    let o = je();
    for (let i of (n = r?.()) != null ? n : []) i && o.add(Ss(i));
    let d = (l = s?.()) != null ? l : [];
    for (let i of d) {
      if (!i) continue;
      let u = et(i);
      if (!u) continue;
      let m = i.parentElement;
      for (; m && m !== u.body; ) {
        for (let f of m.children) d.some((x) => f.contains(x)) || o.add(Ss(f));
        m = m.parentElement;
      }
    }
    return o.dispose;
  }, [a, s, r]);
}
function Yl(t, s, r) {
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
  Ql = ["[data-autofocus]"].map((t) => `${t}:not([tabindex='-1'])`).join(",");
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
  Zl = ((t) => (
    (t[(t.Previous = -1)] = "Previous"),
    (t[(t.Next = 1)] = "Next"),
    t
  ))(Zl || {});
function Jl(t = document.body) {
  return t == null
    ? []
    : Array.from(t.querySelectorAll(ht)).sort((s, r) =>
        Math.sign(
          (s.tabIndex || Number.MAX_SAFE_INTEGER) -
            (r.tabIndex || Number.MAX_SAFE_INTEGER),
        ),
      );
}
function ei(t = document.body) {
  return t == null
    ? []
    : Array.from(t.querySelectorAll(Ql)).sort((s, r) =>
        Math.sign(
          (s.tabIndex || Number.MAX_SAFE_INTEGER) -
            (r.tabIndex || Number.MAX_SAFE_INTEGER),
        ),
      );
}
var kr = ((t) => (
  (t[(t.Strict = 0)] = "Strict"),
  (t[(t.Loose = 1)] = "Loose"),
  t
))(kr || {});
function ti(t, s = 0) {
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
var si = ((t) => (
  (t[(t.Keyboard = 0)] = "Keyboard"),
  (t[(t.Mouse = 1)] = "Mouse"),
  t
))(si || {});
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
let ri = ["textarea", "input"].join(",");
function ai(t) {
  var s, r;
  return (r = (s = t?.matches) == null ? void 0 : s.call(t, ri)) != null
    ? r
    : !1;
}
function ni(t, s = (r) => r) {
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
    o = Array.isArray(t) ? (r ? ni(t) : t) : s & 64 ? ei(t) : Jl(t);
  (n.length > 0 &&
    o.length > 1 &&
    (o = o.filter(
      (p) =>
        !n.some((g) =>
          g != null && "current" in g ? g?.current === p : g === p,
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
    m = 0,
    f = o.length,
    x;
  do {
    if (m >= f || m + f <= 0) return 0;
    let p = i + m;
    if (s & 16) p = (p + f) % f;
    else {
      if (p < 0) return 3;
      if (p >= f) return 1;
    }
    ((x = o[p]), x?.focus(u), (m += d));
  } while (x !== mr(x));
  return (s & 6 && ai(x) && x.select(), 2);
}
function Cr() {
  return (
    /iPhone/gi.test(window.navigator.platform) ||
    (/Mac/gi.test(window.navigator.platform) &&
      window.navigator.maxTouchPoints > 0)
  );
}
function li() {
  return /Android/gi.test(window.navigator.userAgent);
}
function $s() {
  return Cr() || li();
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
function Sr(t, s, r, a) {
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
const Ms = 30;
function ii(t, s, r) {
  let a = Oe(r),
    n = c.useCallback(
      function (d, i) {
        if (d.defaultPrevented) return;
        let u = i(d);
        if (u === null || !u.getRootNode().contains(u) || !u.isConnected)
          return;
        let m = (function f(x) {
          return typeof x == "function"
            ? f(x())
            : Array.isArray(x) || x instanceof Set
              ? x
              : [x];
        })(s);
        for (let f of m)
          if (
            f !== null &&
            (f.contains(u) || (d.composed && d.composedPath().includes(f)))
          )
            return;
        return (
          !ti(u, kr.Loose) && u.tabIndex !== -1 && d.preventDefault(),
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
      $s() ||
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
        if ($s() || !l.current) return;
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
            Math.abs(i.x - o.current.x) >= Ms ||
            Math.abs(i.y - o.current.y) >= Ms
          )
        )
          return n(d, () => (Se(d.target) ? d.target : null));
      },
      !0,
    ),
    Sr(
      t,
      "blur",
      (d) =>
        n(d, () =>
          Sl(window.document.activeElement)
            ? window.document.activeElement
            : null,
        ),
      !0,
    ));
}
function Jt(...t) {
  return c.useMemo(() => et(...t), [...t]);
}
function Er(t, s, r, a) {
  let n = Oe(r);
  c.useEffect(() => {
    t = t ?? window;
    function l(o) {
      n.current(o);
    }
    return (t.addEventListener(s, l, a), () => t.removeEventListener(s, l, a));
  }, [t, s, a]);
}
function oi(t) {
  return c.useSyncExternalStore(t.subscribe, t.getSnapshot, t.getSnapshot);
}
function ci(t, s) {
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
function di() {
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
function ui() {
  return Cr()
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
                      m = t.querySelector(u);
                    Se(m) && !a(m) && (o = m);
                  } catch {}
              },
              !0,
            ),
              s.group((d) => {
                s.addEventListener(t, "touchstart", (i) => {
                  if ((d.dispose(), Se(i.target) && Cl(i.target)))
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
                    if (El(d.target)) return;
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
function mi() {
  return {
    before({ doc: t, d: s }) {
      s.style(t.documentElement, "overflow", "hidden");
    },
  };
}
function Ps(t) {
  let s = {};
  for (let r of t) Object.assign(s, r(s));
  return s;
}
let Ae = ci(() => new Map(), {
  PUSH(t, s) {
    var r;
    let a =
      (r = this.get(t)) != null
        ? r
        : { doc: t, count: 0, d: je(), meta: new Set(), computedMeta: {} };
    return (
      a.count++,
      a.meta.add(s),
      (a.computedMeta = Ps(a.meta)),
      this.set(t, a),
      this
    );
  },
  POP(t, s) {
    let r = this.get(t);
    return (
      r && (r.count--, r.meta.delete(s), (r.computedMeta = Ps(r.meta))),
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
      r = [ui(), di(), mi()];
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
function xi(t, s, r = () => ({ containers: [] })) {
  let a = oi(Ae),
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
function hi(t, s, r = () => [document.body]) {
  let a = st(t, "scroll-lock");
  xi(a, s, (n) => {
    var l;
    return { containers: [...((l = n.containers) != null ? l : []), r] };
  });
}
function fi(t = 0) {
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
var pi = {},
  Is,
  As;
typeof process < "u" &&
  typeof globalThis < "u" &&
  typeof Element < "u" &&
  ((Is = process == null ? void 0 : pi) == null ? void 0 : Is.NODE_ENV) ===
    "test" &&
  typeof ((As = Element?.prototype) == null ? void 0 : As.getAnimations) >
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
var gi = ((t) => (
  (t[(t.None = 0)] = "None"),
  (t[(t.Closed = 1)] = "Closed"),
  (t[(t.Enter = 2)] = "Enter"),
  (t[(t.Leave = 4)] = "Leave"),
  t
))(gi || {});
function bi(t) {
  let s = {};
  for (let r in t) t[r] === !0 && (s[`data-${r}`] = "");
  return s;
}
function yi(t, s, r, a) {
  let [n, l] = c.useState(r),
    { hasFlag: o, addFlag: d, removeFlag: i } = fi(t && n ? 3 : 0),
    u = c.useRef(!1),
    m = c.useRef(!1),
    f = yt();
  return (
    se(() => {
      var x;
      if (t) {
        if ((r && l(!0), !s)) {
          r && d(3);
          return;
        }
        return (
          (x = a?.start) == null || x.call(a, r),
          vi(s, {
            inFlight: u,
            prepare() {
              (m.current ? (m.current = !1) : (m.current = u.current),
                (u.current = !0),
                !m.current && (r ? (d(3), i(4)) : (d(4), i(2))));
            },
            run() {
              m.current ? (r ? (i(3), d(4)) : (i(4), d(3))) : r ? i(1) : d(1);
            },
            done() {
              var p;
              (m.current && wi(s)) ||
                ((u.current = !1),
                i(7),
                r || l(!1),
                (p = a?.end) == null || p.call(a, r));
            },
          })
        );
      }
    }, [t, r, s, f]),
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
function vi(t, { prepare: s, run: r, done: a, inFlight: n }) {
  let l = je();
  return (
    Ni(t, { prepare: s, inFlight: n }),
    l.nextFrame(() => {
      (r(),
        l.requestAnimationFrame(() => {
          l.add(ji(t, a));
        }));
    }),
    l.dispose
  );
}
function ji(t, s) {
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
function Ni(t, { inFlight: s, prepare: r }) {
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
function wi(t) {
  var s, r;
  return (
    (r = (s = t.getAnimations) == null ? void 0 : s.call(t)) != null ? r : []
  ).some((a) => a instanceof CSSTransition && a.playState !== "finished");
}
function es(t, s) {
  let r = c.useRef([]),
    a = W(t);
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
function ki({ value: t, children: s }) {
  return O.createElement(vt.Provider, { value: t }, s);
}
function Ci({ children: t }) {
  return O.createElement(vt.Provider, { value: null }, t);
}
function Si(t) {
  function s() {
    document.readyState !== "loading" &&
      (t(), document.removeEventListener("DOMContentLoaded", s));
  }
  typeof window < "u" &&
    typeof document < "u" &&
    (document.addEventListener("DOMContentLoaded", s), s());
}
let ke = [];
Si(() => {
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
function $r(t) {
  let s = W(t),
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
function Ei() {
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
  let t = Ei(),
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
let Mr = c.createContext(!1);
function $i() {
  return c.useContext(Mr);
}
function Fs(t) {
  return O.createElement(Mr.Provider, { value: t.force }, t.children);
}
function Mi(t) {
  let s = $i(),
    r = c.useContext(Ir),
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
let Pr = c.Fragment,
  Pi = re(function (t, s) {
    let { ownerDocument: r = null, ...a } = t,
      n = c.useRef(null),
      l = he(
        $l((p) => {
          n.current = p;
        }),
        s,
      ),
      o = Jt(n.current),
      d = r ?? o,
      i = Mi(d),
      u = c.useContext(Ht),
      m = yt(),
      f = rt(),
      x = le();
    return (
      $r(() => {
        var p;
        i &&
          i.childNodes.length <= 0 &&
          ((p = i.parentElement) == null || p.removeChild(i));
      }),
      !i || !f
        ? null
        : Jr.createPortal(
            O.createElement(
              "div",
              {
                "data-headlessui-portal": "",
                ref: (p) => {
                  (m.dispose(), u && p && m.add(u.register(p)));
                },
              },
              x({
                ourProps: { ref: l },
                theirProps: a,
                slot: {},
                defaultTag: Pr,
                name: "Portal",
              }),
            ),
            i,
          )
    );
  });
function Ii(t, s) {
  let r = he(s),
    { enabled: a = !0, ownerDocument: n, ...l } = t,
    o = le();
  return a
    ? O.createElement(Pi, { ...l, ownerDocument: n, ref: r })
    : o({
        ourProps: { ref: r },
        theirProps: l,
        slot: {},
        defaultTag: Pr,
        name: "Portal",
      });
}
let Ai = c.Fragment,
  Ir = c.createContext(null);
function Fi(t, s) {
  let { target: r, ...a } = t,
    n = { ref: he(s) },
    l = le();
  return O.createElement(
    Ir.Provider,
    { value: r },
    l({ ourProps: n, theirProps: a, defaultTag: Ai, name: "Popover.Group" }),
  );
}
let Ht = c.createContext(null);
function Li() {
  let t = c.useContext(Ht),
    s = c.useRef([]),
    r = W((l) => (s.current.push(l), t && t.register(l), () => a(l))),
    a = W((l) => {
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
let Oi = re(Ii),
  Ar = re(Fi),
  Ti = Object.assign(Oi, { Group: Ar });
function Di(t, s = typeof document < "u" ? document.defaultView : null, r) {
  let a = st(t, "escape");
  Er(s, "keydown", (n) => {
    a && (n.defaultPrevented || (n.key === gr.Escape && r(n)));
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
function _i({ defaultContainers: t = [], portals: s, mainTreeNode: r } = {}) {
  let a = W(() => {
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
    contains: W((n) => a().some((l) => l.contains(n))),
  };
}
let Fr = c.createContext(null);
function Ls({ children: t, node: s }) {
  let [r, a] = c.useState(null),
    n = Lr(s ?? r);
  return O.createElement(
    Fr.Provider,
    { value: n },
    t,
    n === null &&
      O.createElement(qt, {
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
function Lr(t = null) {
  var s;
  return (s = c.useContext(Fr)) != null ? s : t;
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
function zi() {
  let t = c.useRef(0);
  return (
    Sr(
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
function Or(t) {
  if (!t) return new Set();
  if (typeof t == "function") return new Set(t());
  let s = new Set();
  for (let r of t.current) $e(r.current) && s.add(r.current);
  return s;
}
let Ui = "div";
var Ie = ((t) => (
  (t[(t.None = 0)] = "None"),
  (t[(t.InitialFocus = 1)] = "InitialFocus"),
  (t[(t.TabLock = 2)] = "TabLock"),
  (t[(t.FocusLock = 4)] = "FocusLock"),
  (t[(t.RestoreFocus = 8)] = "RestoreFocus"),
  (t[(t.AutoFocus = 16)] = "AutoFocus"),
  t
))(Ie || {});
function qi(t, s) {
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
  Vi(d, { ownerDocument: u });
  let m = Gi(d, {
    ownerDocument: u,
    container: r,
    initialFocus: n,
    initialFocusFallback: l,
  });
  Ki(d, {
    ownerDocument: u,
    container: r,
    containers: o,
    previousActiveElement: m,
  });
  let f = zi(),
    x = W((S) => {
      if (!Le(r.current)) return;
      let w = r.current;
      ((N) => N())(() => {
        ve(f.current, {
          [Ve.Forwards]: () => {
            Xe(w, pe.First, { skipElements: [S.relatedTarget, l] });
          },
          [Ve.Backwards]: () => {
            Xe(w, pe.Last, { skipElements: [S.relatedTarget, l] });
          },
        });
      });
    }),
    p = st(!!(d & 2), "focus-trap#tab-lock"),
    g = yt(),
    v = c.useRef(!1),
    b = {
      ref: a,
      onKeyDown(S) {
        S.key == "Tab" &&
          ((v.current = !0),
          g.requestAnimationFrame(() => {
            v.current = !1;
          }));
      },
      onBlur(S) {
        if (!(d & 4)) return;
        let w = Or(o);
        Le(r.current) && w.add(r.current);
        let N = S.relatedTarget;
        Se(N) &&
          N.dataset.headlessuiFocusGuard !== "true" &&
          (Tr(w, N) ||
            (v.current
              ? Xe(
                  r.current,
                  ve(f.current, {
                    [Ve.Forwards]: () => pe.Next,
                    [Ve.Backwards]: () => pe.Previous,
                  }) | pe.WrapAround,
                  { relativeTo: S.target },
                )
              : Se(S.target) && be(S.target)));
      },
    },
    j = le();
  return O.createElement(
    O.Fragment,
    null,
    p &&
      O.createElement(qt, {
        as: "button",
        type: "button",
        "data-headlessui-focus-guard": !0,
        onFocus: x,
        features: xt.Focusable,
      }),
    j({ ourProps: b, theirProps: i, defaultTag: Ui, name: "FocusTrap" }),
    p &&
      O.createElement(qt, {
        as: "button",
        type: "button",
        "data-headlessui-focus-guard": !0,
        onFocus: x,
        features: xt.Focusable,
      }),
  );
}
let Bi = re(qi),
  Wi = Object.assign(Bi, { features: Ie });
function Hi(t = !0) {
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
    W(() => {
      var r;
      return (r = s.current.find((a) => a != null && a.isConnected)) != null
        ? r
        : null;
    })
  );
}
function Vi(t, { ownerDocument: s }) {
  let r = !!(t & 8),
    a = Hi(r);
  (es(() => {
    r || (hl(s?.body) && be(a()));
  }, [r]),
    $r(() => {
      r && be(a());
    }));
}
function Gi(
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
function Ki(
  t,
  { ownerDocument: s, container: r, containers: a, previousActiveElement: n },
) {
  let l = ts(),
    o = !!(t & 4);
  Er(
    s?.defaultView,
    "focus",
    (d) => {
      if (!o || !l.current) return;
      let i = Or(a);
      Le(r.current) && i.add(r.current);
      let u = n.current;
      if (!u) return;
      let m = d.target;
      Le(m)
        ? Tr(i, m)
          ? ((n.current = m), be(m))
          : (d.preventDefault(), d.stopPropagation(), be(u))
        : be(n.current);
    },
    !0,
  );
}
function Tr(t, s) {
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
    !Ge((s = t.as) != null ? s : _r) ||
    O.Children.count(t.children) === 1
  );
}
let Nt = c.createContext(null);
Nt.displayName = "TransitionContext";
var Xi = ((t) => ((t.Visible = "visible"), (t.Hidden = "hidden"), t))(Xi || {});
function Yi() {
  let t = c.useContext(Nt);
  if (t === null)
    throw new Error(
      "A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.",
    );
  return t;
}
function Qi() {
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
function Rr(t, s) {
  let r = Oe(t),
    a = c.useRef([]),
    n = ts(),
    l = yt(),
    o = W((p, g = Ce.Hidden) => {
      let v = a.current.findIndex(({ el: b }) => b === p);
      v !== -1 &&
        (ve(g, {
          [Ce.Unmount]() {
            a.current.splice(v, 1);
          },
          [Ce.Hidden]() {
            a.current[v].state = "hidden";
          },
        }),
        l.microTask(() => {
          var b;
          !kt(a) && n.current && ((b = r.current) == null || b.call(r));
        }));
    }),
    d = W((p) => {
      let g = a.current.find(({ el: v }) => v === p);
      return (
        g
          ? g.state !== "visible" && (g.state = "visible")
          : a.current.push({ el: p, state: "visible" }),
        () => o(p, Ce.Unmount)
      );
    }),
    i = c.useRef([]),
    u = c.useRef(Promise.resolve()),
    m = c.useRef({ enter: [], leave: [] }),
    f = W((p, g, v) => {
      (i.current.splice(0),
        s &&
          (s.chains.current[g] = s.chains.current[g].filter(([b]) => b !== p)),
        s?.chains.current[g].push([
          p,
          new Promise((b) => {
            i.current.push(b);
          }),
        ]),
        s?.chains.current[g].push([
          p,
          new Promise((b) => {
            Promise.all(m.current[g].map(([j, S]) => S)).then(() => b());
          }),
        ]),
        g === "enter"
          ? (u.current = u.current.then(() => s?.wait.current).then(() => v(g)))
          : v(g));
    }),
    x = W((p, g, v) => {
      Promise.all(m.current[g].splice(0).map(([b, j]) => j))
        .then(() => {
          var b;
          (b = i.current.shift()) == null || b();
        })
        .then(() => v(g));
    });
  return c.useMemo(
    () => ({
      children: a,
      register: d,
      unregister: o,
      onStart: f,
      onStop: x,
      wait: u,
      chains: m,
    }),
    [d, o, a, f, x, m, u],
  );
}
let _r = c.Fragment,
  zr = mt.RenderStrategy;
function Zi(t, s) {
  var r, a;
  let {
      transition: n = !0,
      beforeEnter: l,
      afterEnter: o,
      beforeLeave: d,
      afterLeave: i,
      enter: u,
      enterFrom: m,
      enterTo: f,
      entered: x,
      leave: p,
      leaveFrom: g,
      leaveTo: v,
      ...b
    } = t,
    [j, S] = c.useState(null),
    w = c.useRef(null),
    N = Dr(t),
    M = he(...(N ? [w, s, S] : s === null ? [] : [s])),
    C = (r = b.unmount) == null || r ? Ce.Unmount : Ce.Hidden,
    { show: A, appear: X, initial: ee } = Yi(),
    [P, R] = c.useState(A ? "visible" : "hidden"),
    E = Qi(),
    { register: B, unregister: J } = E;
  (se(() => B(w), [B, w]),
    se(() => {
      if (C === Ce.Hidden && w.current) {
        if (A && P !== "visible") {
          R("visible");
          return;
        }
        return ve(P, { hidden: () => J(w), visible: () => B(w) });
      }
    }, [P, w, B, J, A, C]));
  let Q = rt();
  se(() => {
    if (N && Q && P === "visible" && w.current === null)
      throw new Error(
        "Did you forget to passthrough the `ref` to the actual DOM node?",
      );
  }, [w, P, Q, N]);
  let Te = ee && !X,
    De = X && A && ee,
    Ne = c.useRef(!1),
    we = Rr(() => {
      Ne.current || (R("hidden"), J(w));
    }, E),
    y = W((I) => {
      Ne.current = !0;
      let T = I ? "enter" : "leave";
      we.onStart(w, T, (q) => {
        q === "enter" ? l?.() : q === "leave" && d?.();
      });
    }),
    h = W((I) => {
      let T = I ? "enter" : "leave";
      ((Ne.current = !1),
        we.onStop(w, T, (q) => {
          q === "enter" ? o?.() : q === "leave" && i?.();
        }),
        T === "leave" && !kt(we) && (R("hidden"), J(w)));
    });
  c.useEffect(() => {
    (N && n) || (y(A), h(A));
  }, [A, N, n]);
  let $ = !(!n || !N || !Q || Te),
    [, k] = yi($, j, A, { start: y, end: h }),
    F = Pe({
      ref: M,
      className:
        ((a = Ut(
          b.className,
          De && u,
          De && m,
          k.enter && u,
          k.enter && k.closed && m,
          k.enter && !k.closed && f,
          k.leave && p,
          k.leave && !k.closed && g,
          k.leave && k.closed && v,
          !k.transition && A && x,
        )) == null
          ? void 0
          : a.trim()) || void 0,
      ...bi(k),
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
      ki,
      { value: L },
      _({
        ourProps: F,
        theirProps: b,
        defaultTag: _r,
        features: zr,
        visible: P === "visible",
        name: "Transition.Child",
      }),
    ),
  );
}
function Ji(t, s) {
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
  let [m, f] = c.useState(r ? "visible" : "hidden"),
    x = Rr(() => {
      r || f("hidden");
    }),
    [p, g] = c.useState(!0),
    v = c.useRef([r]);
  se(() => {
    p !== !1 &&
      v.current[v.current.length - 1] !== r &&
      (v.current.push(r), g(!1));
  }, [v, r]);
  let b = c.useMemo(() => ({ show: r, appear: a, initial: p }), [r, a, p]);
  se(() => {
    r ? f("visible") : !kt(x) && o.current !== null && f("hidden");
  }, [r, x]);
  let j = { unmount: n },
    S = W(() => {
      var M;
      (p && g(!1), (M = t.beforeEnter) == null || M.call(t));
    }),
    w = W(() => {
      var M;
      (p && g(!1), (M = t.beforeLeave) == null || M.call(t));
    }),
    N = le();
  return O.createElement(
    wt.Provider,
    { value: x },
    O.createElement(
      Nt.Provider,
      { value: b },
      N({
        ourProps: {
          ...j,
          as: c.Fragment,
          children: O.createElement(Ur, {
            ref: i,
            ...j,
            ...l,
            beforeEnter: S,
            beforeLeave: w,
          }),
        },
        theirProps: {},
        defaultTag: c.Fragment,
        features: zr,
        visible: m === "visible",
        name: "Transition",
      }),
    ),
  );
}
function eo(t, s) {
  let r = c.useContext(Nt) !== null,
    a = jt() !== null;
  return O.createElement(
    O.Fragment,
    null,
    !r && a
      ? O.createElement(Vt, { ref: s, ...t })
      : O.createElement(Ur, { ref: s, ...t }),
  );
}
let Vt = re(Ji),
  Ur = re(Zi),
  ss = re(eo),
  to = Object.assign(Vt, { Child: ss, Root: Vt });
var so = ((t) => (
    (t[(t.Open = 0)] = "Open"),
    (t[(t.Closed = 1)] = "Closed"),
    t
  ))(so || {}),
  ro = ((t) => ((t[(t.SetTitleId = 0)] = "SetTitleId"), t))(ro || {});
let ao = {
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
function no(t, s) {
  return ve(s.type, ao, t, s);
}
let Os = re(function (t, s) {
    let r = c.useId(),
      {
        id: a = `headlessui-dialog-${r}`,
        open: n,
        onClose: l,
        initialFocus: o,
        role: d = "dialog",
        autoFocus: i = !0,
        __demoMode: u = !1,
        unmount: m = !1,
        ...f
      } = t,
      x = c.useRef(!1);
    d = (function () {
      return d === "dialog" || d === "alertdialog"
        ? d
        : (x.current ||
            ((x.current = !0),
            console.warn(
              `Invalid role [${d}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`,
            )),
          "dialog");
    })();
    let p = jt();
    n === void 0 && p !== null && (n = (p & ce.Open) === ce.Open);
    let g = c.useRef(null),
      v = he(g, s),
      b = Jt(g.current),
      j = n ? 0 : 1,
      [S, w] = c.useReducer(no, {
        titleId: null,
        descriptionId: null,
        panelRef: c.createRef(),
      }),
      N = W(() => l(!1)),
      M = W((k) => w({ type: 0, id: k })),
      C = rt() ? j === 0 : !1,
      [A, X] = Li(),
      ee = {
        get current() {
          var k;
          return (k = S.panelRef.current) != null ? k : g.current;
        },
      },
      P = Lr(),
      { resolveContainers: R } = _i({
        mainTreeNode: P,
        portals: A,
        defaultContainers: [ee],
      }),
      E = p !== null ? (p & ce.Closing) === ce.Closing : !1;
    Xl(u || E ? !1 : C, {
      allowed: W(() => {
        var k, F;
        return [
          (F =
            (k = g.current) == null
              ? void 0
              : k.closest("[data-headlessui-portal]")) != null
            ? F
            : null,
        ];
      }),
      disallowed: W(() => {
        var k;
        return [
          (k = P?.closest("body > *:not(#headlessui-portal-root)")) != null
            ? k
            : null,
        ];
      }),
    });
    let B = Nr.get(null);
    se(() => {
      if (C) return (B.actions.push(a), () => B.actions.pop(a));
    }, [B, a, C]);
    let J = wr(
      B,
      c.useCallback((k) => B.selectors.isTop(k, a), [B, a]),
    );
    (ii(J, R, (k) => {
      (k.preventDefault(), N());
    }),
      Di(J, b?.defaultView, (k) => {
        (k.preventDefault(),
          k.stopPropagation(),
          document.activeElement &&
            "blur" in document.activeElement &&
            typeof document.activeElement.blur == "function" &&
            document.activeElement.blur(),
          N());
      }),
      hi(u || E ? !1 : C, b, R),
      Yl(C, g, N));
    let [Q, Te] = Ml(),
      De = c.useMemo(
        () => [{ dialogState: j, close: N, setTitleId: M, unmount: m }, S],
        [j, N, M, m, S],
      ),
      Ne = tt({ open: j === 0 }),
      we = {
        ref: v,
        id: a,
        role: d,
        tabIndex: -1,
        "aria-modal": u ? void 0 : j === 0 ? !0 : void 0,
        "aria-labelledby": S.titleId,
        "aria-describedby": Q,
        unmount: m,
      },
      y = !Ri(),
      h = Ie.None;
    C &&
      !u &&
      ((h |= Ie.RestoreFocus),
      (h |= Ie.TabLock),
      i && (h |= Ie.AutoFocus),
      y && (h |= Ie.InitialFocus));
    let $ = le();
    return O.createElement(
      Ci,
      null,
      O.createElement(
        Fs,
        { force: !0 },
        O.createElement(
          Ti,
          null,
          O.createElement(
            rs.Provider,
            { value: De },
            O.createElement(
              Ar,
              { target: g },
              O.createElement(
                Fs,
                { force: !1 },
                O.createElement(
                  Te,
                  { slot: Ne },
                  O.createElement(
                    X,
                    null,
                    O.createElement(
                      Wi,
                      {
                        initialFocus: o,
                        initialFocusFallback: g,
                        containers: R,
                        features: h,
                      },
                      O.createElement(
                        Ol,
                        { value: N },
                        $({
                          ourProps: we,
                          theirProps: f,
                          slot: Ne,
                          defaultTag: lo,
                          features: io,
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
  lo = "div",
  io = mt.RenderStrategy | mt.Static;
function oo(t, s) {
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
        Ls,
        null,
        O.createElement(
          to,
          { show: a, transition: r, unmount: n.unmount },
          O.createElement(Os, { ref: s, ...n }),
        ),
      )
    : O.createElement(Ls, null, O.createElement(Os, { ref: s, open: a, ...n }));
}
let co = "div";
function uo(t, s) {
  let r = c.useId(),
    { id: a = `headlessui-dialog-panel-${r}`, transition: n = !1, ...l } = t,
    [{ dialogState: o, unmount: d }, i] = Ct("Dialog.Panel"),
    u = he(s, i.panelRef),
    m = tt({ open: o === 0 }),
    f = W((b) => {
      b.stopPropagation();
    }),
    x = { ref: u, id: a, onClick: f },
    p = n ? ss : c.Fragment,
    g = n ? { unmount: d } : {},
    v = le();
  return O.createElement(
    p,
    { ...g },
    v({
      ourProps: x,
      theirProps: l,
      slot: m,
      defaultTag: co,
      name: "Dialog.Panel",
    }),
  );
}
let mo = "div";
function xo(t, s) {
  let { transition: r = !1, ...a } = t,
    [{ dialogState: n, unmount: l }] = Ct("Dialog.Backdrop"),
    o = tt({ open: n === 0 }),
    d = { ref: s, "aria-hidden": !0 },
    i = r ? ss : c.Fragment,
    u = r ? { unmount: l } : {},
    m = le();
  return O.createElement(
    i,
    { ...u },
    m({
      ourProps: d,
      theirProps: a,
      slot: o,
      defaultTag: mo,
      name: "Dialog.Backdrop",
    }),
  );
}
let ho = "h2";
function fo(t, s) {
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
    defaultTag: ho,
    name: "Dialog.Title",
  });
}
let po = re(oo),
  go = re(uo);
re(xo);
let bo = re(fo),
  Ts = Object.assign(po, { Panel: go, Title: bo, Description: Fl });
const Ds = { round: "круг", square: "квадрат", heart: "сердце" },
  yo = { small: "малый", medium: "средний", large: "большой", m: "M", l: "L" },
  vo = { kinder: "Kinder", merci: "Merci", mix: "Mix", premium: "Premium" },
  jo = {
    box: "коробка",
    "round-basket": "корзина",
    "tiered-tower": "башня",
    "heart-box": "сердце",
  },
  No = {
    "kinder-sticks": "Kinder по борту",
    kitkat: "KitKat по борту",
    "merci-bars": "Merci по борту",
    "wafer-rolls": "вафельные трубочки",
  },
  wo = {
    standard: "фирменная коробка",
    window: "коробка с окном",
    gift: "подарочная упаковка",
    "premium-box": "премиум-бокс",
  };
function ko(t) {
  return !!(
    t &&
    typeof t == "object" &&
    ("candies" in t || t.type === "custom_cake")
  );
}
const Co = ({ isOpen: t, onClose: s, order: r, onUpdate: a }) => {
  const [n, l] = c.useState(r.status),
    [o, d] = c.useState(() => r.items.map((g) => ({ ...g }))),
    i = c.useMemo(
      () => o.reduce((g, v) => g + v.price * v.quantity * 100, 0),
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
    m = async () => {
      const g = o.some((v) => v.productId === null);
      (await a(r.id, {
        status: n,
        items: g
          ? void 0
          : o.map(({ productId: v, quantity: b }) => ({
              productId: v,
              quantity: b,
            })),
      }),
        s());
    },
    { products: f } = Je(),
    x = c.useMemo(() => new Map(f.map((g) => [g.id, g])), [f]),
    p = c.useMemo(
      () =>
        Object.fromEntries(
          r.items
            .filter((g) => g.productId !== null)
            .map((g) => [g.productId, g.quantity]),
        ),
      [r.items],
    );
  return e.jsxs(Ts, {
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
          e.jsxs(Ts.Title, {
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
                onChange: (g) => l(g.target.value),
                children: Object.entries(Yt).map(([g, v]) =>
                  e.jsx("option", { value: g, children: v }, g),
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
                children: o.map((g, v) => {
                  const b = g.productId,
                    j = b === null,
                    w = (b === null ? void 0 : x.get(b))?.inStock ?? 0,
                    N = ko(g.customConfig) ? g.customConfig : null,
                    M =
                      N?.type === "custom_cake"
                        ? N.sweetSet
                          ? vo[N.sweetSet]
                          : ""
                        : (N?.candies
                            ?.filter((X) => Number(X.quantity) > 0)
                            .map(
                              (X) =>
                                `${X.name ?? X.id ?? "конфета"} x${X.quantity}`,
                            )
                            .join(", ") ?? ""),
                    C = b === null ? g.quantity : (p[b] ?? g.quantity),
                    A = w + C;
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
                                g.productName,
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
                                  value: g.quantity,
                                  min: 0,
                                  max: A,
                                  disabled: j,
                                  onChange: (X) => {
                                    const ee = Number(X.target.value),
                                      P = Number.isFinite(ee) ? ee : 0,
                                      R = Math.min(Math.max(P, 0), A);
                                    d((E) =>
                                      E.map((B, J) =>
                                        J === v ? { ...B, quantity: R } : B,
                                      ),
                                    );
                                  },
                                  className:
                                    "border rounded px-2 py-1 w-20 disabled:bg-gray-100",
                                }),
                                e.jsxs("span", {
                                  className: "text-sm text-gray-600",
                                  children: ["× ", g.price, " ₽"],
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
                                      ? jo[N.layout]
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
                                  N.size ? yo[N.size] : "—",
                                ],
                              }),
                              M &&
                                e.jsxs("div", {
                                  className: "mt-1",
                                  children: [
                                    N.type === "custom_cake"
                                      ? "Внутренний слой"
                                      : "Конфеты",
                                    ": ",
                                    M,
                                  ],
                                }),
                              N.type === "custom_cake" &&
                                e.jsxs("div", {
                                  className: "mt-1",
                                  children: [
                                    N.outerLayer
                                      ? No[N.outerLayer]
                                      : "наружный ряд не указан",
                                    ",",
                                    " ",
                                    N.packaging
                                      ? wo[N.packaging]
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
                    g.id || v,
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
                onClick: m,
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
function So(t) {
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
function Eo() {
  const { orders: t, updateOrder: s, deleteOrder: r } = ir(),
    [a, n] = c.useState(!1),
    [l, o] = c.useState(null),
    d = async (f, x) => {
      await s(f, x);
    },
    i = async (f) => {
      window.confirm("Удалить заказ?") && (await r(f));
    },
    u = (f) => {
      (o(f), n(!0));
    },
    m = () => {
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
                children: t.map((f) =>
                  e.jsxs(
                    "tr",
                    {
                      className: "border-t hover:bg-gray-50",
                      children: [
                        e.jsx("td", { className: "px-6 py-4", children: f.id }),
                        e.jsx("td", {
                          className: "px-6 py-4",
                          children: f.fullName,
                        }),
                        e.jsx("td", {
                          className: "px-6 py-4",
                          children: Yt[f.status],
                        }),
                        e.jsx("td", {
                          className: "px-6 py-4",
                          children: So(f),
                        }),
                        e.jsx("td", {
                          className: "px-6 py-4",
                          children: e.jsx("ul", {
                            children: f.items?.map((x) =>
                              e.jsxs(
                                "li",
                                {
                                  children: [
                                    x.productName,
                                    x.productId === null
                                      ? " (индивидуальный)"
                                      : "",
                                    " — ",
                                    x.quantity,
                                    "шт.",
                                  ],
                                },
                                x.id,
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
                                onClick: () => u(f),
                                "aria-label": `Редактировать заказ ${f.id}`,
                                className:
                                  "p-2 text-blue-600 hover:bg-blue-50 rounded",
                                children: e.jsx(Xt, { size: 16 }),
                              }),
                              e.jsx("button", {
                                onClick: () => i(f.id),
                                "aria-label": `Удалить заказ ${f.id}`,
                                className:
                                  "p-2 text-red-600 hover:bg-red-50 rounded",
                                children: e.jsx(pt, { size: 16 }),
                              }),
                            ],
                          }),
                        }),
                      ],
                    },
                    f.id,
                  ),
                ),
              }),
            ],
          }),
        }),
      }),
      a && l && e.jsx(Co, { isOpen: a, onClose: m, order: l, onUpdate: d }),
    ],
  });
}
const qr = c.createContext(void 0);
function $o({ children: t }) {
  const [s, r] = c.useState([]),
    [a, n] = c.useState(!1),
    [l, o] = c.useState(null),
    d = async () => {
      (n(!0), o(null));
      try {
        const x = await z.get("/categories");
        r(x);
      } catch (x) {
        o(x?.message ?? "Ошибка загрузки категорий");
      } finally {
        n(!1);
      }
    };
  c.useEffect(() => {
    d();
  }, []);
  const i = async (x) => {
      const p = await z.post("/categories", x);
      return (r((g) => [p, ...g]), p);
    },
    u = async (x, p) => {
      const g = await z.put(`/categories/${x}`, p);
      return (r((v) => v.map((b) => (b.id === x ? g : b))), g);
    },
    m = async (x) => {
      (await z.del(`/categories/${x}`), r((p) => p.filter((g) => g.id !== x)));
    },
    f = c.useMemo(
      () => ({
        categories: s,
        isLoading: a,
        error: l,
        refetch: d,
        createCategory: i,
        updateCategory: u,
        deleteCategory: m,
      }),
      [s, a, l],
    );
  return e.jsx(qr.Provider, { value: f, children: t });
}
function Mo() {
  const t = c.useContext(qr);
  if (!t)
    throw new Error("useCategories must be used within a CategoryProvider");
  return t;
}
const Rs = { name: "", description: "", imageUrl: "" };
function Po({ isOpen: t, onClose: s, onCreate: r, onUpdate: a, category: n }) {
  const l = c.useMemo(() => !!n?.id, [n]),
    [o, d] = c.useState(Rs),
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
          : Rs,
      );
  }, [t, n]);
  const m = (p, g) => {
      d((v) => ({ ...v, [p]: g }));
    },
    f = () =>
      o.name.trim()
        ? o.description.trim()
          ? null
          : "Введите описание"
        : "Введите название",
    x = async (p) => {
      p.preventDefault();
      const g = f();
      if (g) {
        alert(g);
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
                onSubmit: x,
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
                        onChange: (p) => m("name", p.target.value),
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
                        onChange: (p) => m("description", p.target.value),
                        className:
                          "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 min-h-22.5",
                        placeholder: "Короткое описание категории",
                      }),
                    ],
                  }),
                  e.jsx(cr, {
                    label: "Изображение категории",
                    value: o.imageUrl,
                    onChange: (p) => m("imageUrl", p),
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
function Io() {
  const {
      categories: t,
      createCategory: s,
      updateCategory: r,
      deleteCategory: a,
    } = Mo(),
    [n, l] = c.useState(!1),
    [o, d] = c.useState(null),
    i = async (p) => {
      await s(p);
    },
    u = async (p, g) => {
      await r(p, g);
    },
    m = async (p) => {
      window.confirm("Удалить категорию?") && (await a(p));
    },
    f = (p) => {
      (d(p), l(!0));
    },
    x = () => {
      (d(null), l(!0));
    };
  return e.jsxs(gt, {
    title: "Управление категориями",
    children: [
      e.jsxs("button", {
        onClick: x,
        className:
          "mb-6 inline-flex w-full sm:w-auto items-center justify-center gap-2 px-4 py-2 bg-[#ff398b] text-white rounded-lg hover:bg-[#e0327a]",
        children: [
          e.jsx(Kt, { size: 18, className: "shrink-0" }),
          e.jsx("span", { children: "Добавить категорию" }),
        ],
      }),
      e.jsx(Po, {
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
                  t.map((p) =>
                    e.jsxs(
                      "tr",
                      {
                        className: "border-t hover:bg-gray-50",
                        children: [
                          e.jsx("td", {
                            className: "px-6 py-4",
                            children: e.jsx("img", {
                              src: p.imageUrl,
                              alt: p.name,
                              className: "w-14 h-14 object-cover rounded",
                            }),
                          }),
                          e.jsx("td", {
                            className: "px-6 py-4",
                            children: p.name,
                          }),
                          e.jsx("td", {
                            className: "px-6 py-4",
                            children: e.jsx("div", {
                              className: "max-w-md text-gray-700 line-clamp-2",
                              children: p.description,
                            }),
                          }),
                          e.jsx("td", {
                            className: "px-6 py-4",
                            children: e.jsxs("div", {
                              className: "flex gap-2",
                              children: [
                                e.jsx("button", {
                                  onClick: () => f(p),
                                  className:
                                    "p-2 text-blue-600 hover:bg-blue-50 rounded",
                                  children: e.jsx(Xt, { size: 16 }),
                                }),
                                e.jsx("button", {
                                  onClick: () => m(p.id),
                                  className:
                                    "p-2 text-red-600 hover:bg-red-50 rounded",
                                  children: e.jsx(pt, { size: 16 }),
                                }),
                              ],
                            }),
                          }),
                        ],
                      },
                      p.id,
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
function _s() {
  return e.jsx("span", {
    className: "ml-0.5 text-red-600 align-super",
    children: "*",
  });
}
function Ao(t) {
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
function Fo() {
  const t = Ue(),
    s = qs(),
    { login: r } = xe(),
    a = s.state?.from,
    [n, l] = c.useState({ email: "", password: "" }),
    [o, d] = c.useState({}),
    [i, u] = c.useState(""),
    [m, f] = c.useState(!1),
    [x, p] = c.useState(!1),
    g = `${Ee}/auth/google`,
    v = `${Ee}/auth/yandex`,
    b = `${Ee}/auth/vk`,
    j = c.useMemo(() => (m ? !1 : n.email.trim() && n.password), [n, m]),
    S = (N) => (M) => {
      (l((C) => ({ ...C, [N]: M.target.value })),
        d((C) => ({ ...C, [N]: void 0 })),
        u(""));
    },
    w = async (N) => {
      N.preventDefault();
      const M = Ao(n);
      if ((d(M), !Object.keys(M).length)) {
        (f(!0), u(""));
        try {
          if (
            (await r(n.email.trim().toLowerCase(), n.password)).role === "ADMIN"
          ) {
            const A = a?.startsWith("/admin") ? a : "/admin";
            t(A, { replace: !0 });
          } else t("/account", { replace: !0 });
        } catch (C) {
          C instanceof ne ? u(C.message) : u("Не удалось войти");
        } finally {
          f(!1);
        }
      }
    };
  return e.jsx(nr, {
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
                window.location.href = g;
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
                    window.location.href = v;
                  },
                  className:
                    "w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 hover:bg-gray-50",
                  children: "Войти через Яндекс",
                }),
                e.jsx("button", {
                  type: "button",
                  onClick: () => {
                    window.location.href = b;
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
              children: ["Email ", e.jsx(_s, {})],
            }),
            e.jsx("input", {
              id: "email",
              type: "email",
              value: n.email,
              onChange: S("email"),
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
                  children: ["Пароль ", e.jsx(_s, {})],
                }),
                e.jsx(V, {
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
                  type: x ? "text" : "password",
                  value: n.password,
                  onChange: S("password"),
                  placeholder: "секретный ингредиент",
                  className: "w-full rounded-lg px-3 py-2 outline-none",
                  autoComplete: "current-password",
                }),
                e.jsx("button", {
                  type: "button",
                  onClick: () => p((N) => !N),
                  className: "px-3 text-sm text-gray-600",
                  children: x ? "Скрыть" : "Показать",
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
          children: m ? "Вхожу..." : "Войти",
        }),
      ],
    }),
  });
}
function Ot(...t) {
  return t.filter(Boolean).join(" ");
}
function Lo(t) {
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
function zs(t) {
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
function Us(t) {
  let s = t.replace(/\D/g, "");
  return (
    s.length === 10 && (s = `7${s}`),
    s.length === 11 && s.startsWith("8") && (s = `7${s.slice(1)}`),
    s.length === 11 && s.startsWith("7") ? `+${s}` : null
  );
}
function Oo(t) {
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
function To(t) {
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
function Dt() {
  return e.jsx("span", {
    className: "ml-0.5 text-red-600 align-super",
    children: "*",
  });
}
function Do() {
  const t = Ue(),
    [s, r] = c.useState(""),
    [a, n] = c.useState("profile"),
    [l, o] = c.useState(null),
    [d, i] = c.useState([]),
    [u, m] = c.useState(!0),
    [f, x] = c.useState(!1),
    [p, g] = c.useState(""),
    [v, b] = c.useState({ firstName: "", lastName: "", phone: "", email: "" }),
    [j, S] = c.useState(!1),
    [w, N] = c.useState(""),
    M = c.useMemo(() => {
      if (!l) return !1;
      const P = v.firstName.trim(),
        R = v.lastName.trim(),
        E = v.email.trim(),
        B = Us(v.phone);
      return !P || !R || !B || (E && !Tt(E)) ? !1 : !j;
    }, [v, j, l]);
  (c.useEffect(() => {
    let P = !0;
    async function R() {
      (m(!0), g(""));
      try {
        const E = await z.get("/auth/me");
        if (!P) return;
        (o(E),
          b({
            firstName: E.firstName || "",
            lastName: E.lastName || "",
            email: E.email || "",
            phone: zs(E.phone || ""),
          }));
      } catch (E) {
        if (!P) return;
        if (E instanceof ne && (E.status === 401 || E.status === 403)) {
          t("/account/login", { replace: !0 });
          return;
        }
        g(E instanceof ne ? E.message : "Не удалось загрузить профиль");
      } finally {
        P && m(!1);
      }
    }
    return (
      R(),
      () => {
        P = !1;
      }
    );
  }, [t]),
    c.useEffect(() => {
      let P = !0;
      async function R() {
        if (a === "orders") {
          (x(!0), g(""));
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
            g(E instanceof ne ? E.message : "Не удалось загрузить заказы");
          } finally {
            P && x(!1);
          }
        }
      }
      return (
        R(),
        () => {
          P = !1;
        }
      );
    }, [a, t]));
  const C = (P) => (R) => {
      const E = P === "phone" ? zs(R.target.value) : R.target.value;
      (b((B) => ({ ...B, [P]: E })), N(""), P === "email" && r(""));
    },
    A = async () => {
      if (!l) return;
      const P = v.firstName.trim(),
        R = v.lastName.trim(),
        E = v.email.trim(),
        B = v.phone.trim(),
        J = B ? Us(B) : void 0;
      if (!P || !R) {
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
      (S(!0), N(""));
      try {
        const Q = await z.patch("/auth/me", {
          firstName: P,
          lastName: R,
          email: E || void 0,
          phone: J,
        });
        (o(Q),
          b({
            firstName: Q.firstName || "",
            lastName: Q.lastName || "",
            email: Q.email || "",
            phone: Q.phone || "",
          }),
          N("Сохранено ✅"));
      } catch (Q) {
        N(Q instanceof ne ? Q.message : "Не удалось сохранить");
      } finally {
        S(!1);
      }
    },
    { logout: X } = xe(),
    ee = async () => {
      try {
        await X();
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
                      e.jsx(V, {
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
            p &&
              e.jsx("div", {
                className:
                  "mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700",
                children: p,
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
                              children: ["Имя ", e.jsx(Dt, {})],
                            }),
                            e.jsx("input", {
                              id: "firstName",
                              value: v.firstName,
                              onChange: C("firstName"),
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
                              children: ["Фамилия ", e.jsx(Dt, {})],
                            }),
                            e.jsx("input", {
                              id: "lastName",
                              value: v.lastName,
                              onChange: C("lastName"),
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
                              value: v.email,
                              onChange: C("email"),
                              onBlur: () => {
                                const P = v.email.trim();
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
                              children: ["Телефон (РФ) ", e.jsx(Dt, {})],
                            }),
                            e.jsx("input", {
                              id: "phone",
                              type: "tel",
                              inputMode: "tel",
                              value: v.phone,
                              onChange: C("phone"),
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
                          disabled: !M,
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
                      e.jsx(V, {
                        to: "/",
                        className:
                          "text-sm text-amber-700 underline hover:text-amber-800",
                        children: "Сделать новый заказ 🍬",
                      }),
                    ],
                  }),
                  f
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
                                            children: Oo(P.createdAt),
                                          }),
                                          e.jsx("td", {
                                            className: "py-3",
                                            children: e.jsx("span", {
                                              className:
                                                "rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700",
                                              children: To(P.status),
                                            }),
                                          }),
                                          e.jsx("td", {
                                            className: "py-3 font-semibold",
                                            children: Lo(P),
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
          children: e.jsx(V, {
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
            e.jsx(V, {
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
  Re = ({ title: t, icon: s, children: r }) =>
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
  Rt = ({ children: t }) =>
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
                e.jsx(Gs, { className: "h-4 w-4 text-[#ff398b]" }),
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
function _o() {
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
                  e.jsx(Rt, { children: "Доставка" }),
                  e.jsx(Rt, { children: "Оплата" }),
                  e.jsx(Rt, { children: "Возврат" }),
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
                  e.jsx(V, {
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
                          e.jsxs(Re, {
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
                          e.jsxs(Re, {
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
                          e.jsxs(Re, {
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
                          e.jsxs(Re, {
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
                          e.jsxs(Re, {
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
                          e.jsxs(Re, {
                            title: "Перевод",
                            icon: e.jsx(ja, { className: "h-4 w-4" }),
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
                            e.jsx(V, {
                              to: "/cart",
                              className:
                                "inline-flex items-center justify-center rounded-xl bg-[#ff398b] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#ff2a81] active:scale-95 transition",
                              children: "Перейти в корзину",
                            }),
                            e.jsx(V, {
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
                                e.jsx(Qs, {
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
                                e.jsx(Xs, {
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
                icon: e.jsx(Gs, { className: "h-5 w-5" }),
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
function zo(t) {
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
function Uo() {
  const [t] = ea(),
    s = Number(t.get("orderId") ?? 0),
    [r, a] = c.useState(!0),
    [n, l] = c.useState(""),
    [o, d] = c.useState(null);
  c.useEffect(() => {
    let u = !0;
    async function m() {
      if (!s || Number.isNaN(s)) {
        (l("Некорректный номер заказа"), a(!1));
        return;
      }
      try {
        const f = await z.get(`/payments/orders/${s}`);
        if (!u) return;
        d(f?.[0] ?? null);
      } catch (f) {
        if (!u) return;
        l(f instanceof ne ? f.message : "Не удалось получить статус оплаты");
      } finally {
        u && a(!1);
      }
    }
    return (
      m(),
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
                children: zo(o.status),
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
            e.jsx(V, {
              to: "/account",
              className:
                "rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-black",
              children: "В личный кабинет",
            }),
            e.jsx(V, {
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
const qo = c.lazy(() =>
  la(
    () => import("./CakeConstructorPage-CMMDqkl2.js"),
    __vite__mapDeps([0, 1]),
  ).then((t) => ({ default: t.CakeConstructorPage })),
);
function Bo() {
  return e.jsxs(e.Fragment, {
    children: [e.jsx(sr, {}), e.jsx(Bs, {}), e.jsx(Jn, {})],
  });
}
function Wo() {
  return e.jsxs(e.Fragment, { children: [e.jsx(sr, {}), e.jsx(Bs, {})] });
}
function Ho() {
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
      e.jsx(V, {
        to: "/",
        className:
          "mt-8 inline-flex items-center justify-center rounded-lg bg-[#ff398b] px-5 py-3 text-sm font-semibold text-white hover:bg-[#e0327a]",
        children: "На главную",
      }),
    ],
  });
}
function Vo() {
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
function Go() {
  return e.jsx(da, {
    children: e.jsx(jn, {
      children: e.jsx(ua, {
        children: e.jsx(ta, {
          children: e.jsxs(sa, {
            children: [
              e.jsxs(Y, {
                element: e.jsx(Bo, {}),
                children: [
                  e.jsx(Y, { path: "/", element: e.jsx(Sn, {}) }),
                  e.jsx(Y, { path: "/product/:id", element: e.jsx(Rn, {}) }),
                  e.jsx(Y, { path: "/cart", element: e.jsx(Ln, {}) }),
                  e.jsx(Y, { path: "/account", element: e.jsx(Do, {}) }),
                  e.jsx(Y, { path: "/delivery", element: e.jsx(_o, {}) }),
                  e.jsx(Y, { path: "/contacts", element: e.jsx(_n, {}) }),
                  e.jsx(Y, { path: "/privacy", element: e.jsx(Ro, {}) }),
                  e.jsx(Y, {
                    path: "/constructor",
                    element: e.jsx(c.Suspense, {
                      fallback: e.jsx(Vo, {}),
                      children: e.jsx(qo, {}),
                    }),
                  }),
                  e.jsx(Y, { path: "/payment/result", element: e.jsx(Uo, {}) }),
                ],
              }),
              e.jsxs(Y, {
                element: e.jsx(Wo, {}),
                children: [
                  e.jsx(Y, { path: "/account/login", element: e.jsx(Fo, {}) }),
                  e.jsx(Y, {
                    path: "/account/register",
                    element: e.jsx(Un, {}),
                  }),
                ],
              }),
              e.jsx(Y, {
                path: "/checkout",
                element: e.jsx($t, {
                  children: e.jsx(tl, { children: e.jsx(dl, {}) }),
                }),
              }),
              e.jsx(Y, {
                path: "/admin",
                element: e.jsx(lt, {
                  children: e.jsx($t, { children: e.jsx(Gn, {}) }),
                }),
              }),
              e.jsx(Y, {
                path: "/admin/products",
                element: e.jsx(lt, { children: e.jsx(Zn, {}) }),
              }),
              e.jsx(Y, {
                path: "/admin/categories",
                element: e.jsx(lt, {
                  children: e.jsx($o, { children: e.jsx(Io, {}) }),
                }),
              }),
              e.jsx(Y, {
                path: "/admin/orders",
                element: e.jsx(lt, {
                  children: e.jsx($t, { children: e.jsx(Eo, {}) }),
                }),
              }),
              e.jsx(Y, { path: "*", element: e.jsx(Ho, {}) }),
            ],
          }),
        }),
      }),
    }),
  });
}
ra.createRoot(document.getElementById("root")).render(e.jsx(Go, {}));
export { ne as A, hs as C, Ze as S, xe as a, xs as b, D as c, ye as u };
