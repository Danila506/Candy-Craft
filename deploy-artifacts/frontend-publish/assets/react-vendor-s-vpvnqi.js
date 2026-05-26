function tv(f, o) {
  for (var s = 0; s < o.length; s++) {
    const c = o[s];
    if (typeof c != "string" && !Array.isArray(c)) {
      for (const d in c)
        if (d !== "default" && !(d in f)) {
          const y = Object.getOwnPropertyDescriptor(c, d);
          y &&
            Object.defineProperty(
              f,
              d,
              y.get ? y : { enumerable: !0, get: () => c[d] },
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(f, Symbol.toStringTag, { value: "Module" }),
  );
}
function ev(f) {
  return f && f.__esModule && Object.prototype.hasOwnProperty.call(f, "default")
    ? f.default
    : f;
}
var Rc = { exports: {} },
  Mu = {};
var Wd;
function lv() {
  if (Wd) return Mu;
  Wd = 1;
  var f = Symbol.for("react.transitional.element"),
    o = Symbol.for("react.fragment");
  function s(c, d, y) {
    var b = null;
    if (
      (y !== void 0 && (b = "" + y),
      d.key !== void 0 && (b = "" + d.key),
      "key" in d)
    ) {
      y = {};
      for (var O in d) O !== "key" && (y[O] = d[O]);
    } else y = d;
    return (
      (d = y.ref),
      { $$typeof: f, type: c, key: b, ref: d !== void 0 ? d : null, props: y }
    );
  }
  return ((Mu.Fragment = o), (Mu.jsx = s), (Mu.jsxs = s), Mu);
}
var kd;
function av() {
  return (kd || ((kd = 1), (Rc.exports = lv())), Rc.exports);
}
var Z0 = av(),
  _c = { exports: {} },
  Du = {},
  Oc = { exports: {} },
  Mc = {};
var Fd;
function uv() {
  return (
    Fd ||
      ((Fd = 1),
      (function (f) {
        function o(D, B) {
          var $ = D.length;
          D.push(B);
          t: for (; 0 < $; ) {
            var ht = ($ - 1) >>> 1,
              pt = D[ht];
            if (0 < d(pt, B)) ((D[ht] = B), (D[$] = pt), ($ = ht));
            else break t;
          }
        }
        function s(D) {
          return D.length === 0 ? null : D[0];
        }
        function c(D) {
          if (D.length === 0) return null;
          var B = D[0],
            $ = D.pop();
          if ($ !== B) {
            D[0] = $;
            t: for (var ht = 0, pt = D.length, g = pt >>> 1; ht < g; ) {
              var H = 2 * (ht + 1) - 1,
                Y = D[H],
                j = H + 1,
                F = D[j];
              if (0 > d(Y, $))
                j < pt && 0 > d(F, Y)
                  ? ((D[ht] = F), (D[j] = $), (ht = j))
                  : ((D[ht] = Y), (D[H] = $), (ht = H));
              else if (j < pt && 0 > d(F, $))
                ((D[ht] = F), (D[j] = $), (ht = j));
              else break t;
            }
          }
          return B;
        }
        function d(D, B) {
          var $ = D.sortIndex - B.sortIndex;
          return $ !== 0 ? $ : D.id - B.id;
        }
        if (
          ((f.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var y = performance;
          f.unstable_now = function () {
            return y.now();
          };
        } else {
          var b = Date,
            O = b.now();
          f.unstable_now = function () {
            return b.now() - O;
          };
        }
        var p = [],
          v = [],
          N = 1,
          A = null,
          q = 3,
          K = !1,
          Z = !1,
          G = !1,
          x = !1,
          J = typeof setTimeout == "function" ? setTimeout : null,
          P = typeof clearTimeout == "function" ? clearTimeout : null,
          w = typeof setImmediate < "u" ? setImmediate : null;
        function gt(D) {
          for (var B = s(v); B !== null; ) {
            if (B.callback === null) c(v);
            else if (B.startTime <= D)
              (c(v), (B.sortIndex = B.expirationTime), o(p, B));
            else break;
            B = s(v);
          }
        }
        function St(D) {
          if (((G = !1), gt(D), !Z))
            if (s(p) !== null) ((Z = !0), Rt || ((Rt = !0), Jt()));
            else {
              var B = s(v);
              B !== null && Nt(St, B.startTime - D);
            }
        }
        var Rt = !1,
          W = -1,
          Mt = 5,
          Kt = -1;
        function Ne() {
          return x ? !0 : !(f.unstable_now() - Kt < Mt);
        }
        function me() {
          if (((x = !1), Rt)) {
            var D = f.unstable_now();
            Kt = D;
            var B = !0;
            try {
              t: {
                ((Z = !1), G && ((G = !1), P(W), (W = -1)), (K = !0));
                var $ = q;
                try {
                  e: {
                    for (
                      gt(D), A = s(p);
                      A !== null && !(A.expirationTime > D && Ne());
                    ) {
                      var ht = A.callback;
                      if (typeof ht == "function") {
                        ((A.callback = null), (q = A.priorityLevel));
                        var pt = ht(A.expirationTime <= D);
                        if (((D = f.unstable_now()), typeof pt == "function")) {
                          ((A.callback = pt), gt(D), (B = !0));
                          break e;
                        }
                        (A === s(p) && c(p), gt(D));
                      } else c(p);
                      A = s(p);
                    }
                    if (A !== null) B = !0;
                    else {
                      var g = s(v);
                      (g !== null && Nt(St, g.startTime - D), (B = !1));
                    }
                  }
                  break t;
                } finally {
                  ((A = null), (q = $), (K = !1));
                }
                B = void 0;
              }
            } finally {
              B ? Jt() : (Rt = !1);
            }
          }
        }
        var Jt;
        if (typeof w == "function")
          Jt = function () {
            w(me);
          };
        else if (typeof MessageChannel < "u") {
          var He = new MessageChannel(),
            ye = He.port2;
          ((He.port1.onmessage = me),
            (Jt = function () {
              ye.postMessage(null);
            }));
        } else
          Jt = function () {
            J(me, 0);
          };
        function Nt(D, B) {
          W = J(function () {
            D(f.unstable_now());
          }, B);
        }
        ((f.unstable_IdlePriority = 5),
          (f.unstable_ImmediatePriority = 1),
          (f.unstable_LowPriority = 4),
          (f.unstable_NormalPriority = 3),
          (f.unstable_Profiling = null),
          (f.unstable_UserBlockingPriority = 2),
          (f.unstable_cancelCallback = function (D) {
            D.callback = null;
          }),
          (f.unstable_forceFrameRate = function (D) {
            0 > D || 125 < D
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (Mt = 0 < D ? Math.floor(1e3 / D) : 5);
          }),
          (f.unstable_getCurrentPriorityLevel = function () {
            return q;
          }),
          (f.unstable_next = function (D) {
            switch (q) {
              case 1:
              case 2:
              case 3:
                var B = 3;
                break;
              default:
                B = q;
            }
            var $ = q;
            q = B;
            try {
              return D();
            } finally {
              q = $;
            }
          }),
          (f.unstable_requestPaint = function () {
            x = !0;
          }),
          (f.unstable_runWithPriority = function (D, B) {
            switch (D) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                D = 3;
            }
            var $ = q;
            q = D;
            try {
              return B();
            } finally {
              q = $;
            }
          }),
          (f.unstable_scheduleCallback = function (D, B, $) {
            var ht = f.unstable_now();
            switch (
              (typeof $ == "object" && $ !== null
                ? (($ = $.delay),
                  ($ = typeof $ == "number" && 0 < $ ? ht + $ : ht))
                : ($ = ht),
              D)
            ) {
              case 1:
                var pt = -1;
                break;
              case 2:
                pt = 250;
                break;
              case 5:
                pt = 1073741823;
                break;
              case 4:
                pt = 1e4;
                break;
              default:
                pt = 5e3;
            }
            return (
              (pt = $ + pt),
              (D = {
                id: N++,
                callback: B,
                priorityLevel: D,
                startTime: $,
                expirationTime: pt,
                sortIndex: -1,
              }),
              $ > ht
                ? ((D.sortIndex = $),
                  o(v, D),
                  s(p) === null &&
                    D === s(v) &&
                    (G ? (P(W), (W = -1)) : (G = !0), Nt(St, $ - ht)))
                : ((D.sortIndex = pt),
                  o(p, D),
                  Z || K || ((Z = !0), Rt || ((Rt = !0), Jt()))),
              D
            );
          }),
          (f.unstable_shouldYield = Ne),
          (f.unstable_wrapCallback = function (D) {
            var B = q;
            return function () {
              var $ = q;
              q = B;
              try {
                return D.apply(this, arguments);
              } finally {
                q = $;
              }
            };
          }));
      })(Mc)),
    Mc
  );
}
var Id;
function nv() {
  return (Id || ((Id = 1), (Oc.exports = uv())), Oc.exports);
}
var Dc = { exports: {} },
  k = {};
var Pd;
function iv() {
  if (Pd) return k;
  Pd = 1;
  var f = Symbol.for("react.transitional.element"),
    o = Symbol.for("react.portal"),
    s = Symbol.for("react.fragment"),
    c = Symbol.for("react.strict_mode"),
    d = Symbol.for("react.profiler"),
    y = Symbol.for("react.consumer"),
    b = Symbol.for("react.context"),
    O = Symbol.for("react.forward_ref"),
    p = Symbol.for("react.suspense"),
    v = Symbol.for("react.memo"),
    N = Symbol.for("react.lazy"),
    A = Symbol.for("react.activity"),
    q = Symbol.iterator;
  function K(g) {
    return g === null || typeof g != "object"
      ? null
      : ((g = (q && g[q]) || g["@@iterator"]),
        typeof g == "function" ? g : null);
  }
  var Z = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    G = Object.assign,
    x = {};
  function J(g, H, Y) {
    ((this.props = g),
      (this.context = H),
      (this.refs = x),
      (this.updater = Y || Z));
  }
  ((J.prototype.isReactComponent = {}),
    (J.prototype.setState = function (g, H) {
      if (typeof g != "object" && typeof g != "function" && g != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, g, H, "setState");
    }),
    (J.prototype.forceUpdate = function (g) {
      this.updater.enqueueForceUpdate(this, g, "forceUpdate");
    }));
  function P() {}
  P.prototype = J.prototype;
  function w(g, H, Y) {
    ((this.props = g),
      (this.context = H),
      (this.refs = x),
      (this.updater = Y || Z));
  }
  var gt = (w.prototype = new P());
  ((gt.constructor = w), G(gt, J.prototype), (gt.isPureReactComponent = !0));
  var St = Array.isArray;
  function Rt() {}
  var W = { H: null, A: null, T: null, S: null },
    Mt = Object.prototype.hasOwnProperty;
  function Kt(g, H, Y) {
    var j = Y.ref;
    return {
      $$typeof: f,
      type: g,
      key: H,
      ref: j !== void 0 ? j : null,
      props: Y,
    };
  }
  function Ne(g, H) {
    return Kt(g.type, H, g.props);
  }
  function me(g) {
    return typeof g == "object" && g !== null && g.$$typeof === f;
  }
  function Jt(g) {
    var H = { "=": "=0", ":": "=2" };
    return (
      "$" +
      g.replace(/[=:]/g, function (Y) {
        return H[Y];
      })
    );
  }
  var He = /\/+/g;
  function ye(g, H) {
    return typeof g == "object" && g !== null && g.key != null
      ? Jt("" + g.key)
      : H.toString(36);
  }
  function Nt(g) {
    switch (g.status) {
      case "fulfilled":
        return g.value;
      case "rejected":
        throw g.reason;
      default:
        switch (
          (typeof g.status == "string"
            ? g.then(Rt, Rt)
            : ((g.status = "pending"),
              g.then(
                function (H) {
                  g.status === "pending" &&
                    ((g.status = "fulfilled"), (g.value = H));
                },
                function (H) {
                  g.status === "pending" &&
                    ((g.status = "rejected"), (g.reason = H));
                },
              )),
          g.status)
        ) {
          case "fulfilled":
            return g.value;
          case "rejected":
            throw g.reason;
        }
    }
    throw g;
  }
  function D(g, H, Y, j, F) {
    var et = typeof g;
    (et === "undefined" || et === "boolean") && (g = null);
    var ot = !1;
    if (g === null) ot = !0;
    else
      switch (et) {
        case "bigint":
        case "string":
        case "number":
          ot = !0;
          break;
        case "object":
          switch (g.$$typeof) {
            case f:
            case o:
              ot = !0;
              break;
            case N:
              return ((ot = g._init), D(ot(g._payload), H, Y, j, F));
          }
      }
    if (ot)
      return (
        (F = F(g)),
        (ot = j === "" ? "." + ye(g, 0) : j),
        St(F)
          ? ((Y = ""),
            ot != null && (Y = ot.replace(He, "$&/") + "/"),
            D(F, H, Y, "", function (Ba) {
              return Ba;
            }))
          : F != null &&
            (me(F) &&
              (F = Ne(
                F,
                Y +
                  (F.key == null || (g && g.key === F.key)
                    ? ""
                    : ("" + F.key).replace(He, "$&/") + "/") +
                  ot,
              )),
            H.push(F)),
        1
      );
    ot = 0;
    var $t = j === "" ? "." : j + ":";
    if (St(g))
      for (var Dt = 0; Dt < g.length; Dt++)
        ((j = g[Dt]), (et = $t + ye(j, Dt)), (ot += D(j, H, Y, et, F)));
    else if (((Dt = K(g)), typeof Dt == "function"))
      for (g = Dt.call(g), Dt = 0; !(j = g.next()).done; )
        ((j = j.value), (et = $t + ye(j, Dt++)), (ot += D(j, H, Y, et, F)));
    else if (et === "object") {
      if (typeof g.then == "function") return D(Nt(g), H, Y, j, F);
      throw (
        (H = String(g)),
        Error(
          "Objects are not valid as a React child (found: " +
            (H === "[object Object]"
              ? "object with keys {" + Object.keys(g).join(", ") + "}"
              : H) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    }
    return ot;
  }
  function B(g, H, Y) {
    if (g == null) return g;
    var j = [],
      F = 0;
    return (
      D(g, j, "", "", function (et) {
        return H.call(Y, et, F++);
      }),
      j
    );
  }
  function $(g) {
    if (g._status === -1) {
      var H = g._result;
      ((H = H()),
        H.then(
          function (Y) {
            (g._status === 0 || g._status === -1) &&
              ((g._status = 1), (g._result = Y));
          },
          function (Y) {
            (g._status === 0 || g._status === -1) &&
              ((g._status = 2), (g._result = Y));
          },
        ),
        g._status === -1 && ((g._status = 0), (g._result = H)));
    }
    if (g._status === 1) return g._result.default;
    throw g._result;
  }
  var ht =
      typeof reportError == "function"
        ? reportError
        : function (g) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var H = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof g == "object" &&
                  g !== null &&
                  typeof g.message == "string"
                    ? String(g.message)
                    : String(g),
                error: g,
              });
              if (!window.dispatchEvent(H)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", g);
              return;
            }
            console.error(g);
          },
    pt = {
      map: B,
      forEach: function (g, H, Y) {
        B(
          g,
          function () {
            H.apply(this, arguments);
          },
          Y,
        );
      },
      count: function (g) {
        var H = 0;
        return (
          B(g, function () {
            H++;
          }),
          H
        );
      },
      toArray: function (g) {
        return (
          B(g, function (H) {
            return H;
          }) || []
        );
      },
      only: function (g) {
        if (!me(g))
          throw Error(
            "React.Children.only expected to receive a single React element child.",
          );
        return g;
      },
    };
  return (
    (k.Activity = A),
    (k.Children = pt),
    (k.Component = J),
    (k.Fragment = s),
    (k.Profiler = d),
    (k.PureComponent = w),
    (k.StrictMode = c),
    (k.Suspense = p),
    (k.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = W),
    (k.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (g) {
        return W.H.useMemoCache(g);
      },
    }),
    (k.cache = function (g) {
      return function () {
        return g.apply(null, arguments);
      };
    }),
    (k.cacheSignal = function () {
      return null;
    }),
    (k.cloneElement = function (g, H, Y) {
      if (g == null)
        throw Error(
          "The argument must be a React element, but you passed " + g + ".",
        );
      var j = G({}, g.props),
        F = g.key;
      if (H != null)
        for (et in (H.key !== void 0 && (F = "" + H.key), H))
          !Mt.call(H, et) ||
            et === "key" ||
            et === "__self" ||
            et === "__source" ||
            (et === "ref" && H.ref === void 0) ||
            (j[et] = H[et]);
      var et = arguments.length - 2;
      if (et === 1) j.children = Y;
      else if (1 < et) {
        for (var ot = Array(et), $t = 0; $t < et; $t++)
          ot[$t] = arguments[$t + 2];
        j.children = ot;
      }
      return Kt(g.type, F, j);
    }),
    (k.createContext = function (g) {
      return (
        (g = {
          $$typeof: b,
          _currentValue: g,
          _currentValue2: g,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (g.Provider = g),
        (g.Consumer = { $$typeof: y, _context: g }),
        g
      );
    }),
    (k.createElement = function (g, H, Y) {
      var j,
        F = {},
        et = null;
      if (H != null)
        for (j in (H.key !== void 0 && (et = "" + H.key), H))
          Mt.call(H, j) &&
            j !== "key" &&
            j !== "__self" &&
            j !== "__source" &&
            (F[j] = H[j]);
      var ot = arguments.length - 2;
      if (ot === 1) F.children = Y;
      else if (1 < ot) {
        for (var $t = Array(ot), Dt = 0; Dt < ot; Dt++)
          $t[Dt] = arguments[Dt + 2];
        F.children = $t;
      }
      if (g && g.defaultProps)
        for (j in ((ot = g.defaultProps), ot))
          F[j] === void 0 && (F[j] = ot[j]);
      return Kt(g, et, F);
    }),
    (k.createRef = function () {
      return { current: null };
    }),
    (k.forwardRef = function (g) {
      return { $$typeof: O, render: g };
    }),
    (k.isValidElement = me),
    (k.lazy = function (g) {
      return { $$typeof: N, _payload: { _status: -1, _result: g }, _init: $ };
    }),
    (k.memo = function (g, H) {
      return { $$typeof: v, type: g, compare: H === void 0 ? null : H };
    }),
    (k.startTransition = function (g) {
      var H = W.T,
        Y = {};
      W.T = Y;
      try {
        var j = g(),
          F = W.S;
        (F !== null && F(Y, j),
          typeof j == "object" &&
            j !== null &&
            typeof j.then == "function" &&
            j.then(Rt, ht));
      } catch (et) {
        ht(et);
      } finally {
        (H !== null && Y.types !== null && (H.types = Y.types), (W.T = H));
      }
    }),
    (k.unstable_useCacheRefresh = function () {
      return W.H.useCacheRefresh();
    }),
    (k.use = function (g) {
      return W.H.use(g);
    }),
    (k.useActionState = function (g, H, Y) {
      return W.H.useActionState(g, H, Y);
    }),
    (k.useCallback = function (g, H) {
      return W.H.useCallback(g, H);
    }),
    (k.useContext = function (g) {
      return W.H.useContext(g);
    }),
    (k.useDebugValue = function () {}),
    (k.useDeferredValue = function (g, H) {
      return W.H.useDeferredValue(g, H);
    }),
    (k.useEffect = function (g, H) {
      return W.H.useEffect(g, H);
    }),
    (k.useEffectEvent = function (g) {
      return W.H.useEffectEvent(g);
    }),
    (k.useId = function () {
      return W.H.useId();
    }),
    (k.useImperativeHandle = function (g, H, Y) {
      return W.H.useImperativeHandle(g, H, Y);
    }),
    (k.useInsertionEffect = function (g, H) {
      return W.H.useInsertionEffect(g, H);
    }),
    (k.useLayoutEffect = function (g, H) {
      return W.H.useLayoutEffect(g, H);
    }),
    (k.useMemo = function (g, H) {
      return W.H.useMemo(g, H);
    }),
    (k.useOptimistic = function (g, H) {
      return W.H.useOptimistic(g, H);
    }),
    (k.useReducer = function (g, H, Y) {
      return W.H.useReducer(g, H, Y);
    }),
    (k.useRef = function (g) {
      return W.H.useRef(g);
    }),
    (k.useState = function (g) {
      return W.H.useState(g);
    }),
    (k.useSyncExternalStore = function (g, H, Y) {
      return W.H.useSyncExternalStore(g, H, Y);
    }),
    (k.useTransition = function () {
      return W.H.useTransition();
    }),
    (k.version = "19.2.5"),
    k
  );
}
var th;
function Yc() {
  return (th || ((th = 1), (Dc.exports = iv())), Dc.exports);
}
var Uc = { exports: {} },
  wt = {};
var eh;
function fv() {
  if (eh) return wt;
  eh = 1;
  var f = Yc();
  function o(p) {
    var v = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      v += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var N = 2; N < arguments.length; N++)
        v += "&args[]=" + encodeURIComponent(arguments[N]);
    }
    return (
      "Minified React error #" +
      p +
      "; visit " +
      v +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function s() {}
  var c = {
      d: {
        f: s,
        r: function () {
          throw Error(o(522));
        },
        D: s,
        C: s,
        L: s,
        m: s,
        X: s,
        S: s,
        M: s,
      },
      p: 0,
      findDOMNode: null,
    },
    d = Symbol.for("react.portal");
  function y(p, v, N) {
    var A =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: d,
      key: A == null ? null : "" + A,
      children: p,
      containerInfo: v,
      implementation: N,
    };
  }
  var b = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function O(p, v) {
    if (p === "font") return "";
    if (typeof v == "string") return v === "use-credentials" ? v : "";
  }
  return (
    (wt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = c),
    (wt.createPortal = function (p, v) {
      var N =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!v || (v.nodeType !== 1 && v.nodeType !== 9 && v.nodeType !== 11))
        throw Error(o(299));
      return y(p, v, null, N);
    }),
    (wt.flushSync = function (p) {
      var v = b.T,
        N = c.p;
      try {
        if (((b.T = null), (c.p = 2), p)) return p();
      } finally {
        ((b.T = v), (c.p = N), c.d.f());
      }
    }),
    (wt.preconnect = function (p, v) {
      typeof p == "string" &&
        (v
          ? ((v = v.crossOrigin),
            (v =
              typeof v == "string"
                ? v === "use-credentials"
                  ? v
                  : ""
                : void 0))
          : (v = null),
        c.d.C(p, v));
    }),
    (wt.prefetchDNS = function (p) {
      typeof p == "string" && c.d.D(p);
    }),
    (wt.preinit = function (p, v) {
      if (typeof p == "string" && v && typeof v.as == "string") {
        var N = v.as,
          A = O(N, v.crossOrigin),
          q = typeof v.integrity == "string" ? v.integrity : void 0,
          K = typeof v.fetchPriority == "string" ? v.fetchPriority : void 0;
        N === "style"
          ? c.d.S(p, typeof v.precedence == "string" ? v.precedence : void 0, {
              crossOrigin: A,
              integrity: q,
              fetchPriority: K,
            })
          : N === "script" &&
            c.d.X(p, {
              crossOrigin: A,
              integrity: q,
              fetchPriority: K,
              nonce: typeof v.nonce == "string" ? v.nonce : void 0,
            });
      }
    }),
    (wt.preinitModule = function (p, v) {
      if (typeof p == "string")
        if (typeof v == "object" && v !== null) {
          if (v.as == null || v.as === "script") {
            var N = O(v.as, v.crossOrigin);
            c.d.M(p, {
              crossOrigin: N,
              integrity: typeof v.integrity == "string" ? v.integrity : void 0,
              nonce: typeof v.nonce == "string" ? v.nonce : void 0,
            });
          }
        } else v == null && c.d.M(p);
    }),
    (wt.preload = function (p, v) {
      if (
        typeof p == "string" &&
        typeof v == "object" &&
        v !== null &&
        typeof v.as == "string"
      ) {
        var N = v.as,
          A = O(N, v.crossOrigin);
        c.d.L(p, N, {
          crossOrigin: A,
          integrity: typeof v.integrity == "string" ? v.integrity : void 0,
          nonce: typeof v.nonce == "string" ? v.nonce : void 0,
          type: typeof v.type == "string" ? v.type : void 0,
          fetchPriority:
            typeof v.fetchPriority == "string" ? v.fetchPriority : void 0,
          referrerPolicy:
            typeof v.referrerPolicy == "string" ? v.referrerPolicy : void 0,
          imageSrcSet:
            typeof v.imageSrcSet == "string" ? v.imageSrcSet : void 0,
          imageSizes: typeof v.imageSizes == "string" ? v.imageSizes : void 0,
          media: typeof v.media == "string" ? v.media : void 0,
        });
      }
    }),
    (wt.preloadModule = function (p, v) {
      if (typeof p == "string")
        if (v) {
          var N = O(v.as, v.crossOrigin);
          c.d.m(p, {
            as: typeof v.as == "string" && v.as !== "script" ? v.as : void 0,
            crossOrigin: N,
            integrity: typeof v.integrity == "string" ? v.integrity : void 0,
          });
        } else c.d.m(p);
    }),
    (wt.requestFormReset = function (p) {
      c.d.r(p);
    }),
    (wt.unstable_batchedUpdates = function (p, v) {
      return p(v);
    }),
    (wt.useFormState = function (p, v, N) {
      return b.H.useFormState(p, v, N);
    }),
    (wt.useFormStatus = function () {
      return b.H.useHostTransitionStatus();
    }),
    (wt.version = "19.2.5"),
    wt
  );
}
var lh;
function dh() {
  if (lh) return Uc.exports;
  lh = 1;
  function f() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (o) {
        console.error(o);
      }
  }
  return (f(), (Uc.exports = fv()), Uc.exports);
}
var ah;
function cv() {
  if (ah) return Du;
  ah = 1;
  var f = nv(),
    o = Yc(),
    s = dh();
  function c(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        e += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return (
      "Minified React error #" +
      t +
      "; visit " +
      e +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function d(t) {
    return !(!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11));
  }
  function y(t) {
    var e = t,
      l = t;
    if (t.alternate) for (; e.return; ) e = e.return;
    else {
      t = e;
      do ((e = t), (e.flags & 4098) !== 0 && (l = e.return), (t = e.return));
      while (t);
    }
    return e.tag === 3 ? l : null;
  }
  function b(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if (
        (e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)),
        e !== null)
      )
        return e.dehydrated;
    }
    return null;
  }
  function O(t) {
    if (t.tag === 31) {
      var e = t.memoizedState;
      if (
        (e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)),
        e !== null)
      )
        return e.dehydrated;
    }
    return null;
  }
  function p(t) {
    if (y(t) !== t) throw Error(c(188));
  }
  function v(t) {
    var e = t.alternate;
    if (!e) {
      if (((e = y(t)), e === null)) throw Error(c(188));
      return e !== t ? null : t;
    }
    for (var l = t, a = e; ; ) {
      var u = l.return;
      if (u === null) break;
      var n = u.alternate;
      if (n === null) {
        if (((a = u.return), a !== null)) {
          l = a;
          continue;
        }
        break;
      }
      if (u.child === n.child) {
        for (n = u.child; n; ) {
          if (n === l) return (p(u), t);
          if (n === a) return (p(u), e);
          n = n.sibling;
        }
        throw Error(c(188));
      }
      if (l.return !== a.return) ((l = u), (a = n));
      else {
        for (var i = !1, r = u.child; r; ) {
          if (r === l) {
            ((i = !0), (l = u), (a = n));
            break;
          }
          if (r === a) {
            ((i = !0), (a = u), (l = n));
            break;
          }
          r = r.sibling;
        }
        if (!i) {
          for (r = n.child; r; ) {
            if (r === l) {
              ((i = !0), (l = n), (a = u));
              break;
            }
            if (r === a) {
              ((i = !0), (a = n), (l = u));
              break;
            }
            r = r.sibling;
          }
          if (!i) throw Error(c(189));
        }
      }
      if (l.alternate !== a) throw Error(c(190));
    }
    if (l.tag !== 3) throw Error(c(188));
    return l.stateNode.current === l ? t : e;
  }
  function N(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (((e = N(t)), e !== null)) return e;
      t = t.sibling;
    }
    return null;
  }
  var A = Object.assign,
    q = Symbol.for("react.element"),
    K = Symbol.for("react.transitional.element"),
    Z = Symbol.for("react.portal"),
    G = Symbol.for("react.fragment"),
    x = Symbol.for("react.strict_mode"),
    J = Symbol.for("react.profiler"),
    P = Symbol.for("react.consumer"),
    w = Symbol.for("react.context"),
    gt = Symbol.for("react.forward_ref"),
    St = Symbol.for("react.suspense"),
    Rt = Symbol.for("react.suspense_list"),
    W = Symbol.for("react.memo"),
    Mt = Symbol.for("react.lazy"),
    Kt = Symbol.for("react.activity"),
    Ne = Symbol.for("react.memo_cache_sentinel"),
    me = Symbol.iterator;
  function Jt(t) {
    return t === null || typeof t != "object"
      ? null
      : ((t = (me && t[me]) || t["@@iterator"]),
        typeof t == "function" ? t : null);
  }
  var He = Symbol.for("react.client.reference");
  function ye(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === He ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case G:
        return "Fragment";
      case J:
        return "Profiler";
      case x:
        return "StrictMode";
      case St:
        return "Suspense";
      case Rt:
        return "SuspenseList";
      case Kt:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case Z:
          return "Portal";
        case w:
          return t.displayName || "Context";
        case P:
          return (t._context.displayName || "Context") + ".Consumer";
        case gt:
          var e = t.render;
          return (
            (t = t.displayName),
            t ||
              ((t = e.displayName || e.name || ""),
              (t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")),
            t
          );
        case W:
          return (
            (e = t.displayName || null),
            e !== null ? e : ye(t.type) || "Memo"
          );
        case Mt:
          ((e = t._payload), (t = t._init));
          try {
            return ye(t(e));
          } catch {}
      }
    return null;
  }
  var Nt = Array.isArray,
    D = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    B = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    $ = { pending: !1, data: null, method: null, action: null },
    ht = [],
    pt = -1;
  function g(t) {
    return { current: t };
  }
  function H(t) {
    0 > pt || ((t.current = ht[pt]), (ht[pt] = null), pt--);
  }
  function Y(t, e) {
    (pt++, (ht[pt] = t.current), (t.current = e));
  }
  var j = g(null),
    F = g(null),
    et = g(null),
    ot = g(null);
  function $t(t, e) {
    switch ((Y(et, e), Y(F, t), Y(j, null), e.nodeType)) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? Sd(t) : 0;
        break;
      default:
        if (((t = e.tagName), (e = e.namespaceURI)))
          ((e = Sd(e)), (t = pd(e, t)));
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    (H(j), Y(j, t));
  }
  function Dt() {
    (H(j), H(F), H(et));
  }
  function Ba(t) {
    t.memoizedState !== null && Y(ot, t);
    var e = j.current,
      l = pd(e, t.type);
    e !== l && (Y(F, t), Y(j, l));
  }
  function xu(t) {
    (F.current === t && (H(j), H(F)),
      ot.current === t && (H(ot), (Au._currentValue = $)));
  }
  var ii, wc;
  function Dl(t) {
    if (ii === void 0)
      try {
        throw Error();
      } catch (l) {
        var e = l.stack.trim().match(/\n( *(at )?)/);
        ((ii = (e && e[1]) || ""),
          (wc =
            -1 <
            l.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < l.stack.indexOf("@")
                ? "@unknown:0:0"
                : ""));
      }
    return (
      `
` +
      ii +
      t +
      wc
    );
  }
  var fi = !1;
  function ci(t, e) {
    if (!t || fi) return "";
    fi = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function () {
          try {
            if (e) {
              var C = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(C.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(C, []);
                } catch (R) {
                  var z = R;
                }
                Reflect.construct(t, [], C);
              } else {
                try {
                  C.call();
                } catch (R) {
                  z = R;
                }
                t.call(C.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (R) {
                z = R;
              }
              (C = t()) &&
                typeof C.catch == "function" &&
                C.catch(function () {});
            }
          } catch (R) {
            if (R && z && typeof R.stack == "string") return [R.stack, z.stack];
          }
          return [null, null];
        },
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name",
      );
      u &&
        u.configurable &&
        Object.defineProperty(a.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var n = a.DetermineComponentFrameRoot(),
        i = n[0],
        r = n[1];
      if (i && r) {
        var h = i.split(`
`),
          T = r.split(`
`);
        for (
          u = a = 0;
          a < h.length && !h[a].includes("DetermineComponentFrameRoot");
        )
          a++;
        for (; u < T.length && !T[u].includes("DetermineComponentFrameRoot"); )
          u++;
        if (a === h.length || u === T.length)
          for (
            a = h.length - 1, u = T.length - 1;
            1 <= a && 0 <= u && h[a] !== T[u];
          )
            u--;
        for (; 1 <= a && 0 <= u; a--, u--)
          if (h[a] !== T[u]) {
            if (a !== 1 || u !== 1)
              do
                if ((a--, u--, 0 > u || h[a] !== T[u])) {
                  var M =
                    `
` + h[a].replace(" at new ", " at ");
                  return (
                    t.displayName &&
                      M.includes("<anonymous>") &&
                      (M = M.replace("<anonymous>", t.displayName)),
                    M
                  );
                }
              while (1 <= a && 0 <= u);
            break;
          }
      }
    } finally {
      ((fi = !1), (Error.prepareStackTrace = l));
    }
    return (l = t ? t.displayName || t.name : "") ? Dl(l) : "";
  }
  function Ch(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Dl(t.type);
      case 16:
        return Dl("Lazy");
      case 13:
        return t.child !== e && e !== null
          ? Dl("Suspense Fallback")
          : Dl("Suspense");
      case 19:
        return Dl("SuspenseList");
      case 0:
      case 15:
        return ci(t.type, !1);
      case 11:
        return ci(t.type.render, !1);
      case 1:
        return ci(t.type, !0);
      case 31:
        return Dl("Activity");
      default:
        return "";
    }
  }
  function $c(t) {
    try {
      var e = "",
        l = null;
      do ((e += Ch(t, l)), (l = t), (t = t.return));
      while (t);
      return e;
    } catch (a) {
      return (
        `
Error generating stack: ` +
        a.message +
        `
` +
        a.stack
      );
    }
  }
  var ri = Object.prototype.hasOwnProperty,
    oi = f.unstable_scheduleCallback,
    si = f.unstable_cancelCallback,
    Nh = f.unstable_shouldYield,
    Hh = f.unstable_requestPaint,
    ae = f.unstable_now,
    xh = f.unstable_getCurrentPriorityLevel,
    Wc = f.unstable_ImmediatePriority,
    kc = f.unstable_UserBlockingPriority,
    Bu = f.unstable_NormalPriority,
    Bh = f.unstable_LowPriority,
    Fc = f.unstable_IdlePriority,
    qh = f.log,
    Yh = f.unstable_setDisableYieldValue,
    qa = null,
    ue = null;
  function ul(t) {
    if (
      (typeof qh == "function" && Yh(t),
      ue && typeof ue.setStrictMode == "function")
    )
      try {
        ue.setStrictMode(qa, t);
      } catch {}
  }
  var ne = Math.clz32 ? Math.clz32 : jh,
    Lh = Math.log,
    Gh = Math.LN2;
  function jh(t) {
    return ((t >>>= 0), t === 0 ? 32 : (31 - ((Lh(t) / Gh) | 0)) | 0);
  }
  var qu = 256,
    Yu = 262144,
    Lu = 4194304;
  function Ul(t) {
    var e = t & 42;
    if (e !== 0) return e;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return t & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function Gu(t, e, l) {
    var a = t.pendingLanes;
    if (a === 0) return 0;
    var u = 0,
      n = t.suspendedLanes,
      i = t.pingedLanes;
    t = t.warmLanes;
    var r = a & 134217727;
    return (
      r !== 0
        ? ((a = r & ~n),
          a !== 0
            ? (u = Ul(a))
            : ((i &= r),
              i !== 0
                ? (u = Ul(i))
                : l || ((l = r & ~t), l !== 0 && (u = Ul(l)))))
        : ((r = a & ~n),
          r !== 0
            ? (u = Ul(r))
            : i !== 0
              ? (u = Ul(i))
              : l || ((l = a & ~t), l !== 0 && (u = Ul(l)))),
      u === 0
        ? 0
        : e !== 0 &&
            e !== u &&
            (e & n) === 0 &&
            ((n = u & -u),
            (l = e & -e),
            n >= l || (n === 32 && (l & 4194048) !== 0))
          ? e
          : u
    );
  }
  function Ya(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function Xh(t, e) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return e + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Ic() {
    var t = Lu;
    return ((Lu <<= 1), (Lu & 62914560) === 0 && (Lu = 4194304), t);
  }
  function di(t) {
    for (var e = [], l = 0; 31 > l; l++) e.push(t);
    return e;
  }
  function La(t, e) {
    ((t.pendingLanes |= e),
      e !== 268435456 &&
        ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)));
  }
  function Qh(t, e, l, a, u, n) {
    var i = t.pendingLanes;
    ((t.pendingLanes = l),
      (t.suspendedLanes = 0),
      (t.pingedLanes = 0),
      (t.warmLanes = 0),
      (t.expiredLanes &= l),
      (t.entangledLanes &= l),
      (t.errorRecoveryDisabledLanes &= l),
      (t.shellSuspendCounter = 0));
    var r = t.entanglements,
      h = t.expirationTimes,
      T = t.hiddenUpdates;
    for (l = i & ~l; 0 < l; ) {
      var M = 31 - ne(l),
        C = 1 << M;
      ((r[M] = 0), (h[M] = -1));
      var z = T[M];
      if (z !== null)
        for (T[M] = null, M = 0; M < z.length; M++) {
          var R = z[M];
          R !== null && (R.lane &= -536870913);
        }
      l &= ~C;
    }
    (a !== 0 && Pc(t, a, 0),
      n !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= n & ~(i & ~e)));
  }
  function Pc(t, e, l) {
    ((t.pendingLanes |= e), (t.suspendedLanes &= ~e));
    var a = 31 - ne(e);
    ((t.entangledLanes |= e),
      (t.entanglements[a] = t.entanglements[a] | 1073741824 | (l & 261930)));
  }
  function tr(t, e) {
    var l = (t.entangledLanes |= e);
    for (t = t.entanglements; l; ) {
      var a = 31 - ne(l),
        u = 1 << a;
      ((u & e) | (t[a] & e) && (t[a] |= e), (l &= ~u));
    }
  }
  function er(t, e) {
    var l = e & -e;
    return (
      (l = (l & 42) !== 0 ? 1 : hi(l)),
      (l & (t.suspendedLanes | e)) !== 0 ? 0 : l
    );
  }
  function hi(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function mi(t) {
    return (
      (t &= -t),
      2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function lr() {
    var t = B.p;
    return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : Qd(t.type));
  }
  function ar(t, e) {
    var l = B.p;
    try {
      return ((B.p = t), e());
    } finally {
      B.p = l;
    }
  }
  var nl = Math.random().toString(36).slice(2),
    jt = "__reactFiber$" + nl,
    kt = "__reactProps$" + nl,
    $l = "__reactContainer$" + nl,
    yi = "__reactEvents$" + nl,
    Zh = "__reactListeners$" + nl,
    Vh = "__reactHandles$" + nl,
    ur = "__reactResources$" + nl,
    Ga = "__reactMarker$" + nl;
  function vi(t) {
    (delete t[jt], delete t[kt], delete t[yi], delete t[Zh], delete t[Vh]);
  }
  function Wl(t) {
    var e = t[jt];
    if (e) return e;
    for (var l = t.parentNode; l; ) {
      if ((e = l[$l] || l[jt])) {
        if (
          ((l = e.alternate),
          e.child !== null || (l !== null && l.child !== null))
        )
          for (t = _d(t); t !== null; ) {
            if ((l = t[jt])) return l;
            t = _d(t);
          }
        return e;
      }
      ((t = l), (l = t.parentNode));
    }
    return null;
  }
  function kl(t) {
    if ((t = t[jt] || t[$l])) {
      var e = t.tag;
      if (
        e === 5 ||
        e === 6 ||
        e === 13 ||
        e === 31 ||
        e === 26 ||
        e === 27 ||
        e === 3
      )
        return t;
    }
    return null;
  }
  function ja(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(c(33));
  }
  function Fl(t) {
    var e = t[ur];
    return (
      e ||
        (e = t[ur] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      e
    );
  }
  function Lt(t) {
    t[Ga] = !0;
  }
  var nr = new Set(),
    ir = {};
  function Cl(t, e) {
    (Il(t, e), Il(t + "Capture", e));
  }
  function Il(t, e) {
    for (ir[t] = e, t = 0; t < e.length; t++) nr.add(e[t]);
  }
  var Kh = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
    ),
    fr = {},
    cr = {};
  function Jh(t) {
    return ri.call(cr, t)
      ? !0
      : ri.call(fr, t)
        ? !1
        : Kh.test(t)
          ? (cr[t] = !0)
          : ((fr[t] = !0), !1);
  }
  function ju(t, e, l) {
    if (Jh(e))
      if (l === null) t.removeAttribute(e);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(e);
            return;
          case "boolean":
            var a = e.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              t.removeAttribute(e);
              return;
            }
        }
        t.setAttribute(e, "" + l);
      }
  }
  function Xu(t, e, l) {
    if (l === null) t.removeAttribute(e);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttribute(e, "" + l);
    }
  }
  function Ge(t, e, l, a) {
    if (a === null) t.removeAttribute(l);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(l);
          return;
      }
      t.setAttributeNS(e, l, "" + a);
    }
  }
  function ve(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function rr(t) {
    var e = t.type;
    return (
      (t = t.nodeName) &&
      t.toLowerCase() === "input" &&
      (e === "checkbox" || e === "radio")
    );
  }
  function wh(t, e, l) {
    var a = Object.getOwnPropertyDescriptor(t.constructor.prototype, e);
    if (
      !t.hasOwnProperty(e) &&
      typeof a < "u" &&
      typeof a.get == "function" &&
      typeof a.set == "function"
    ) {
      var u = a.get,
        n = a.set;
      return (
        Object.defineProperty(t, e, {
          configurable: !0,
          get: function () {
            return u.call(this);
          },
          set: function (i) {
            ((l = "" + i), n.call(this, i));
          },
        }),
        Object.defineProperty(t, e, { enumerable: a.enumerable }),
        {
          getValue: function () {
            return l;
          },
          setValue: function (i) {
            l = "" + i;
          },
          stopTracking: function () {
            ((t._valueTracker = null), delete t[e]);
          },
        }
      );
    }
  }
  function gi(t) {
    if (!t._valueTracker) {
      var e = rr(t) ? "checked" : "value";
      t._valueTracker = wh(t, e, "" + t[e]);
    }
  }
  function or(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var l = e.getValue(),
      a = "";
    return (
      t && (a = rr(t) ? (t.checked ? "true" : "false") : t.value),
      (t = a),
      t !== l ? (e.setValue(t), !0) : !1
    );
  }
  function Qu(t) {
    if (
      ((t = t || (typeof document < "u" ? document : void 0)), typeof t > "u")
    )
      return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var $h = /[\n"\\]/g;
  function ge(t) {
    return t.replace($h, function (e) {
      return "\\" + e.charCodeAt(0).toString(16) + " ";
    });
  }
  function Si(t, e, l, a, u, n, i, r) {
    ((t.name = ""),
      i != null &&
      typeof i != "function" &&
      typeof i != "symbol" &&
      typeof i != "boolean"
        ? (t.type = i)
        : t.removeAttribute("type"),
      e != null
        ? i === "number"
          ? ((e === 0 && t.value === "") || t.value != e) &&
            (t.value = "" + ve(e))
          : t.value !== "" + ve(e) && (t.value = "" + ve(e))
        : (i !== "submit" && i !== "reset") || t.removeAttribute("value"),
      e != null
        ? pi(t, i, ve(e))
        : l != null
          ? pi(t, i, ve(l))
          : a != null && t.removeAttribute("value"),
      u == null && n != null && (t.defaultChecked = !!n),
      u != null &&
        (t.checked = u && typeof u != "function" && typeof u != "symbol"),
      r != null &&
      typeof r != "function" &&
      typeof r != "symbol" &&
      typeof r != "boolean"
        ? (t.name = "" + ve(r))
        : t.removeAttribute("name"));
  }
  function sr(t, e, l, a, u, n, i, r) {
    if (
      (n != null &&
        typeof n != "function" &&
        typeof n != "symbol" &&
        typeof n != "boolean" &&
        (t.type = n),
      e != null || l != null)
    ) {
      if (!((n !== "submit" && n !== "reset") || e != null)) {
        gi(t);
        return;
      }
      ((l = l != null ? "" + ve(l) : ""),
        (e = e != null ? "" + ve(e) : l),
        r || e === t.value || (t.value = e),
        (t.defaultValue = e));
    }
    ((a = a ?? u),
      (a = typeof a != "function" && typeof a != "symbol" && !!a),
      (t.checked = r ? t.checked : !!a),
      (t.defaultChecked = !!a),
      i != null &&
        typeof i != "function" &&
        typeof i != "symbol" &&
        typeof i != "boolean" &&
        (t.name = i),
      gi(t));
  }
  function pi(t, e, l) {
    (e === "number" && Qu(t.ownerDocument) === t) ||
      t.defaultValue === "" + l ||
      (t.defaultValue = "" + l);
  }
  function Pl(t, e, l, a) {
    if (((t = t.options), e)) {
      e = {};
      for (var u = 0; u < l.length; u++) e["$" + l[u]] = !0;
      for (l = 0; l < t.length; l++)
        ((u = e.hasOwnProperty("$" + t[l].value)),
          t[l].selected !== u && (t[l].selected = u),
          u && a && (t[l].defaultSelected = !0));
    } else {
      for (l = "" + ve(l), e = null, u = 0; u < t.length; u++) {
        if (t[u].value === l) {
          ((t[u].selected = !0), a && (t[u].defaultSelected = !0));
          return;
        }
        e !== null || t[u].disabled || (e = t[u]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function dr(t, e, l) {
    if (
      e != null &&
      ((e = "" + ve(e)), e !== t.value && (t.value = e), l == null)
    ) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = l != null ? "" + ve(l) : "";
  }
  function hr(t, e, l, a) {
    if (e == null) {
      if (a != null) {
        if (l != null) throw Error(c(92));
        if (Nt(a)) {
          if (1 < a.length) throw Error(c(93));
          a = a[0];
        }
        l = a;
      }
      (l == null && (l = ""), (e = l));
    }
    ((l = ve(e)),
      (t.defaultValue = l),
      (a = t.textContent),
      a === l && a !== "" && a !== null && (t.value = a),
      gi(t));
  }
  function ta(t, e) {
    if (e) {
      var l = t.firstChild;
      if (l && l === t.lastChild && l.nodeType === 3) {
        l.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var Wh = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " ",
    ),
  );
  function mr(t, e, l) {
    var a = e.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === ""
      ? a
        ? t.setProperty(e, "")
        : e === "float"
          ? (t.cssFloat = "")
          : (t[e] = "")
      : a
        ? t.setProperty(e, l)
        : typeof l != "number" || l === 0 || Wh.has(e)
          ? e === "float"
            ? (t.cssFloat = l)
            : (t[e] = ("" + l).trim())
          : (t[e] = l + "px");
  }
  function yr(t, e, l) {
    if (e != null && typeof e != "object") throw Error(c(62));
    if (((t = t.style), l != null)) {
      for (var a in l)
        !l.hasOwnProperty(a) ||
          (e != null && e.hasOwnProperty(a)) ||
          (a.indexOf("--") === 0
            ? t.setProperty(a, "")
            : a === "float"
              ? (t.cssFloat = "")
              : (t[a] = ""));
      for (var u in e)
        ((a = e[u]), e.hasOwnProperty(u) && l[u] !== a && mr(t, u, a));
    } else for (var n in e) e.hasOwnProperty(n) && mr(t, n, e[n]);
  }
  function bi(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var kh = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    Fh =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Zu(t) {
    return Fh.test("" + t)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : t;
  }
  function je() {}
  var Ei = null;
  function Ti(t) {
    return (
      (t = t.target || t.srcElement || window),
      t.correspondingUseElement && (t = t.correspondingUseElement),
      t.nodeType === 3 ? t.parentNode : t
    );
  }
  var ea = null,
    la = null;
  function vr(t) {
    var e = kl(t);
    if (e && (t = e.stateNode)) {
      var l = t[kt] || null;
      t: switch (((t = e.stateNode), e.type)) {
        case "input":
          if (
            (Si(
              t,
              l.value,
              l.defaultValue,
              l.defaultValue,
              l.checked,
              l.defaultChecked,
              l.type,
              l.name,
            ),
            (e = l.name),
            l.type === "radio" && e != null)
          ) {
            for (l = t; l.parentNode; ) l = l.parentNode;
            for (
              l = l.querySelectorAll(
                'input[name="' + ge("" + e) + '"][type="radio"]',
              ),
                e = 0;
              e < l.length;
              e++
            ) {
              var a = l[e];
              if (a !== t && a.form === t.form) {
                var u = a[kt] || null;
                if (!u) throw Error(c(90));
                Si(
                  a,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name,
                );
              }
            }
            for (e = 0; e < l.length; e++)
              ((a = l[e]), a.form === t.form && or(a));
          }
          break t;
        case "textarea":
          dr(t, l.value, l.defaultValue);
          break t;
        case "select":
          ((e = l.value), e != null && Pl(t, !!l.multiple, e, !1));
      }
    }
  }
  var zi = !1;
  function gr(t, e, l) {
    if (zi) return t(e, l);
    zi = !0;
    try {
      var a = t(e);
      return a;
    } finally {
      if (
        ((zi = !1),
        (ea !== null || la !== null) &&
          (Cn(), ea && ((e = ea), (t = la), (la = ea = null), vr(e), t)))
      )
        for (e = 0; e < t.length; e++) vr(t[e]);
    }
  }
  function Xa(t, e) {
    var l = t.stateNode;
    if (l === null) return null;
    var a = l[kt] || null;
    if (a === null) return null;
    l = a[e];
    t: switch (e) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ((a = !a.disabled) ||
          ((t = t.type),
          (a = !(
            t === "button" ||
            t === "input" ||
            t === "select" ||
            t === "textarea"
          ))),
          (t = !a));
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (l && typeof l != "function") throw Error(c(231, e, typeof l));
    return l;
  }
  var Xe = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    Ai = !1;
  if (Xe)
    try {
      var Qa = {};
      (Object.defineProperty(Qa, "passive", {
        get: function () {
          Ai = !0;
        },
      }),
        window.addEventListener("test", Qa, Qa),
        window.removeEventListener("test", Qa, Qa));
    } catch {
      Ai = !1;
    }
  var il = null,
    Ri = null,
    Vu = null;
  function Sr() {
    if (Vu) return Vu;
    var t,
      e = Ri,
      l = e.length,
      a,
      u = "value" in il ? il.value : il.textContent,
      n = u.length;
    for (t = 0; t < l && e[t] === u[t]; t++);
    var i = l - t;
    for (a = 1; a <= i && e[l - a] === u[n - a]; a++);
    return (Vu = u.slice(t, 1 < a ? 1 - a : void 0));
  }
  function Ku(t) {
    var e = t.keyCode;
    return (
      "charCode" in t
        ? ((t = t.charCode), t === 0 && e === 13 && (t = 13))
        : (t = e),
      t === 10 && (t = 13),
      32 <= t || t === 13 ? t : 0
    );
  }
  function Ju() {
    return !0;
  }
  function pr() {
    return !1;
  }
  function Ft(t) {
    function e(l, a, u, n, i) {
      ((this._reactName = l),
        (this._targetInst = u),
        (this.type = a),
        (this.nativeEvent = n),
        (this.target = i),
        (this.currentTarget = null));
      for (var r in t)
        t.hasOwnProperty(r) && ((l = t[r]), (this[r] = l ? l(n) : n[r]));
      return (
        (this.isDefaultPrevented = (
          n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1
        )
          ? Ju
          : pr),
        (this.isPropagationStopped = pr),
        this
      );
    }
    return (
      A(e.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var l = this.nativeEvent;
          l &&
            (l.preventDefault
              ? l.preventDefault()
              : typeof l.returnValue != "unknown" && (l.returnValue = !1),
            (this.isDefaultPrevented = Ju));
        },
        stopPropagation: function () {
          var l = this.nativeEvent;
          l &&
            (l.stopPropagation
              ? l.stopPropagation()
              : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0),
            (this.isPropagationStopped = Ju));
        },
        persist: function () {},
        isPersistent: Ju,
      }),
      e
    );
  }
  var Nl = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (t) {
        return t.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    wu = Ft(Nl),
    Za = A({}, Nl, { view: 0, detail: 0 }),
    Ih = Ft(Za),
    _i,
    Oi,
    Va,
    $u = A({}, Za, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Di,
      button: 0,
      buttons: 0,
      relatedTarget: function (t) {
        return t.relatedTarget === void 0
          ? t.fromElement === t.srcElement
            ? t.toElement
            : t.fromElement
          : t.relatedTarget;
      },
      movementX: function (t) {
        return "movementX" in t
          ? t.movementX
          : (t !== Va &&
              (Va && t.type === "mousemove"
                ? ((_i = t.screenX - Va.screenX), (Oi = t.screenY - Va.screenY))
                : (Oi = _i = 0),
              (Va = t)),
            _i);
      },
      movementY: function (t) {
        return "movementY" in t ? t.movementY : Oi;
      },
    }),
    br = Ft($u),
    Ph = A({}, $u, { dataTransfer: 0 }),
    tm = Ft(Ph),
    em = A({}, Za, { relatedTarget: 0 }),
    Mi = Ft(em),
    lm = A({}, Nl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    am = Ft(lm),
    um = A({}, Nl, {
      clipboardData: function (t) {
        return "clipboardData" in t ? t.clipboardData : window.clipboardData;
      },
    }),
    nm = Ft(um),
    im = A({}, Nl, { data: 0 }),
    Er = Ft(im),
    fm = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    cm = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    rm = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function om(t) {
    var e = this.nativeEvent;
    return e.getModifierState
      ? e.getModifierState(t)
      : (t = rm[t])
        ? !!e[t]
        : !1;
  }
  function Di() {
    return om;
  }
  var sm = A({}, Za, {
      key: function (t) {
        if (t.key) {
          var e = fm[t.key] || t.key;
          if (e !== "Unidentified") return e;
        }
        return t.type === "keypress"
          ? ((t = Ku(t)), t === 13 ? "Enter" : String.fromCharCode(t))
          : t.type === "keydown" || t.type === "keyup"
            ? cm[t.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Di,
      charCode: function (t) {
        return t.type === "keypress" ? Ku(t) : 0;
      },
      keyCode: function (t) {
        return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
      },
      which: function (t) {
        return t.type === "keypress"
          ? Ku(t)
          : t.type === "keydown" || t.type === "keyup"
            ? t.keyCode
            : 0;
      },
    }),
    dm = Ft(sm),
    hm = A({}, $u, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Tr = Ft(hm),
    mm = A({}, Za, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Di,
    }),
    ym = Ft(mm),
    vm = A({}, Nl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    gm = Ft(vm),
    Sm = A({}, $u, {
      deltaX: function (t) {
        return "deltaX" in t
          ? t.deltaX
          : "wheelDeltaX" in t
            ? -t.wheelDeltaX
            : 0;
      },
      deltaY: function (t) {
        return "deltaY" in t
          ? t.deltaY
          : "wheelDeltaY" in t
            ? -t.wheelDeltaY
            : "wheelDelta" in t
              ? -t.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    pm = Ft(Sm),
    bm = A({}, Nl, { newState: 0, oldState: 0 }),
    Em = Ft(bm),
    Tm = [9, 13, 27, 32],
    Ui = Xe && "CompositionEvent" in window,
    Ka = null;
  Xe && "documentMode" in document && (Ka = document.documentMode);
  var zm = Xe && "TextEvent" in window && !Ka,
    zr = Xe && (!Ui || (Ka && 8 < Ka && 11 >= Ka)),
    Ar = " ",
    Rr = !1;
  function _r(t, e) {
    switch (t) {
      case "keyup":
        return Tm.indexOf(e.keyCode) !== -1;
      case "keydown":
        return e.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Or(t) {
    return (
      (t = t.detail),
      typeof t == "object" && "data" in t ? t.data : null
    );
  }
  var aa = !1;
  function Am(t, e) {
    switch (t) {
      case "compositionend":
        return Or(e);
      case "keypress":
        return e.which !== 32 ? null : ((Rr = !0), Ar);
      case "textInput":
        return ((t = e.data), t === Ar && Rr ? null : t);
      default:
        return null;
    }
  }
  function Rm(t, e) {
    if (aa)
      return t === "compositionend" || (!Ui && _r(t, e))
        ? ((t = Sr()), (Vu = Ri = il = null), (aa = !1), t)
        : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(e.ctrlKey || e.altKey || e.metaKey) || (e.ctrlKey && e.altKey)) {
          if (e.char && 1 < e.char.length) return e.char;
          if (e.which) return String.fromCharCode(e.which);
        }
        return null;
      case "compositionend":
        return zr && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var _m = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function Mr(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!_m[t.type] : e === "textarea";
  }
  function Dr(t, e, l, a) {
    (ea ? (la ? la.push(a) : (la = [a])) : (ea = a),
      (e = Ln(e, "onChange")),
      0 < e.length &&
        ((l = new wu("onChange", "change", null, l, a)),
        t.push({ event: l, listeners: e })));
  }
  var Ja = null,
    wa = null;
  function Om(t) {
    dd(t, 0);
  }
  function Wu(t) {
    var e = ja(t);
    if (or(e)) return t;
  }
  function Ur(t, e) {
    if (t === "change") return e;
  }
  var Cr = !1;
  if (Xe) {
    var Ci;
    if (Xe) {
      var Ni = "oninput" in document;
      if (!Ni) {
        var Nr = document.createElement("div");
        (Nr.setAttribute("oninput", "return;"),
          (Ni = typeof Nr.oninput == "function"));
      }
      Ci = Ni;
    } else Ci = !1;
    Cr = Ci && (!document.documentMode || 9 < document.documentMode);
  }
  function Hr() {
    Ja && (Ja.detachEvent("onpropertychange", xr), (wa = Ja = null));
  }
  function xr(t) {
    if (t.propertyName === "value" && Wu(wa)) {
      var e = [];
      (Dr(e, wa, t, Ti(t)), gr(Om, e));
    }
  }
  function Mm(t, e, l) {
    t === "focusin"
      ? (Hr(), (Ja = e), (wa = l), Ja.attachEvent("onpropertychange", xr))
      : t === "focusout" && Hr();
  }
  function Dm(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Wu(wa);
  }
  function Um(t, e) {
    if (t === "click") return Wu(e);
  }
  function Cm(t, e) {
    if (t === "input" || t === "change") return Wu(e);
  }
  function Nm(t, e) {
    return (t === e && (t !== 0 || 1 / t === 1 / e)) || (t !== t && e !== e);
  }
  var ie = typeof Object.is == "function" ? Object.is : Nm;
  function $a(t, e) {
    if (ie(t, e)) return !0;
    if (
      typeof t != "object" ||
      t === null ||
      typeof e != "object" ||
      e === null
    )
      return !1;
    var l = Object.keys(t),
      a = Object.keys(e);
    if (l.length !== a.length) return !1;
    for (a = 0; a < l.length; a++) {
      var u = l[a];
      if (!ri.call(e, u) || !ie(t[u], e[u])) return !1;
    }
    return !0;
  }
  function Br(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function qr(t, e) {
    var l = Br(t);
    t = 0;
    for (var a; l; ) {
      if (l.nodeType === 3) {
        if (((a = t + l.textContent.length), t <= e && a >= e))
          return { node: l, offset: e - t };
        t = a;
      }
      t: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break t;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = Br(l);
    }
  }
  function Yr(t, e) {
    return t && e
      ? t === e
        ? !0
        : t && t.nodeType === 3
          ? !1
          : e && e.nodeType === 3
            ? Yr(t, e.parentNode)
            : "contains" in t
              ? t.contains(e)
              : t.compareDocumentPosition
                ? !!(t.compareDocumentPosition(e) & 16)
                : !1
      : !1;
  }
  function Lr(t) {
    t =
      t != null &&
      t.ownerDocument != null &&
      t.ownerDocument.defaultView != null
        ? t.ownerDocument.defaultView
        : window;
    for (var e = Qu(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var l = typeof e.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) t = e.contentWindow;
      else break;
      e = Qu(t.document);
    }
    return e;
  }
  function Hi(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return (
      e &&
      ((e === "input" &&
        (t.type === "text" ||
          t.type === "search" ||
          t.type === "tel" ||
          t.type === "url" ||
          t.type === "password")) ||
        e === "textarea" ||
        t.contentEditable === "true")
    );
  }
  var Hm = Xe && "documentMode" in document && 11 >= document.documentMode,
    ua = null,
    xi = null,
    Wa = null,
    Bi = !1;
  function Gr(t, e, l) {
    var a =
      l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Bi ||
      ua == null ||
      ua !== Qu(a) ||
      ((a = ua),
      "selectionStart" in a && Hi(a)
        ? (a = { start: a.selectionStart, end: a.selectionEnd })
        : ((a = (
            (a.ownerDocument && a.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (a = {
            anchorNode: a.anchorNode,
            anchorOffset: a.anchorOffset,
            focusNode: a.focusNode,
            focusOffset: a.focusOffset,
          })),
      (Wa && $a(Wa, a)) ||
        ((Wa = a),
        (a = Ln(xi, "onSelect")),
        0 < a.length &&
          ((e = new wu("onSelect", "select", null, e, l)),
          t.push({ event: e, listeners: a }),
          (e.target = ua))));
  }
  function Hl(t, e) {
    var l = {};
    return (
      (l[t.toLowerCase()] = e.toLowerCase()),
      (l["Webkit" + t] = "webkit" + e),
      (l["Moz" + t] = "moz" + e),
      l
    );
  }
  var na = {
      animationend: Hl("Animation", "AnimationEnd"),
      animationiteration: Hl("Animation", "AnimationIteration"),
      animationstart: Hl("Animation", "AnimationStart"),
      transitionrun: Hl("Transition", "TransitionRun"),
      transitionstart: Hl("Transition", "TransitionStart"),
      transitioncancel: Hl("Transition", "TransitionCancel"),
      transitionend: Hl("Transition", "TransitionEnd"),
    },
    qi = {},
    jr = {};
  Xe &&
    ((jr = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete na.animationend.animation,
      delete na.animationiteration.animation,
      delete na.animationstart.animation),
    "TransitionEvent" in window || delete na.transitionend.transition);
  function xl(t) {
    if (qi[t]) return qi[t];
    if (!na[t]) return t;
    var e = na[t],
      l;
    for (l in e) if (e.hasOwnProperty(l) && l in jr) return (qi[t] = e[l]);
    return t;
  }
  var Xr = xl("animationend"),
    Qr = xl("animationiteration"),
    Zr = xl("animationstart"),
    xm = xl("transitionrun"),
    Bm = xl("transitionstart"),
    qm = xl("transitioncancel"),
    Vr = xl("transitionend"),
    Kr = new Map(),
    Yi =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  Yi.push("scrollEnd");
  function Me(t, e) {
    (Kr.set(t, e), Cl(e, [t]));
  }
  var ku =
      typeof reportError == "function"
        ? reportError
        : function (t) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var e = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof t == "object" &&
                  t !== null &&
                  typeof t.message == "string"
                    ? String(t.message)
                    : String(t),
                error: t,
              });
              if (!window.dispatchEvent(e)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", t);
              return;
            }
            console.error(t);
          },
    Se = [],
    ia = 0,
    Li = 0;
  function Fu() {
    for (var t = ia, e = (Li = ia = 0); e < t; ) {
      var l = Se[e];
      Se[e++] = null;
      var a = Se[e];
      Se[e++] = null;
      var u = Se[e];
      Se[e++] = null;
      var n = Se[e];
      if (((Se[e++] = null), a !== null && u !== null)) {
        var i = a.pending;
        (i === null ? (u.next = u) : ((u.next = i.next), (i.next = u)),
          (a.pending = u));
      }
      n !== 0 && Jr(l, u, n);
    }
  }
  function Iu(t, e, l, a) {
    ((Se[ia++] = t),
      (Se[ia++] = e),
      (Se[ia++] = l),
      (Se[ia++] = a),
      (Li |= a),
      (t.lanes |= a),
      (t = t.alternate),
      t !== null && (t.lanes |= a));
  }
  function Gi(t, e, l, a) {
    return (Iu(t, e, l, a), Pu(t));
  }
  function Bl(t, e) {
    return (Iu(t, null, null, e), Pu(t));
  }
  function Jr(t, e, l) {
    t.lanes |= l;
    var a = t.alternate;
    a !== null && (a.lanes |= l);
    for (var u = !1, n = t.return; n !== null; )
      ((n.childLanes |= l),
        (a = n.alternate),
        a !== null && (a.childLanes |= l),
        n.tag === 22 &&
          ((t = n.stateNode), t === null || t._visibility & 1 || (u = !0)),
        (t = n),
        (n = n.return));
    return t.tag === 3
      ? ((n = t.stateNode),
        u &&
          e !== null &&
          ((u = 31 - ne(l)),
          (t = n.hiddenUpdates),
          (a = t[u]),
          a === null ? (t[u] = [e]) : a.push(e),
          (e.lane = l | 536870912)),
        n)
      : null;
  }
  function Pu(t) {
    if (50 < gu) throw ((gu = 0), (Wf = null), Error(c(185)));
    for (var e = t.return; e !== null; ) ((t = e), (e = t.return));
    return t.tag === 3 ? t.stateNode : null;
  }
  var fa = {};
  function Ym(t, e, l, a) {
    ((this.tag = t),
      (this.key = l),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = e),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = a),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function fe(t, e, l, a) {
    return new Ym(t, e, l, a);
  }
  function ji(t) {
    return ((t = t.prototype), !(!t || !t.isReactComponent));
  }
  function Qe(t, e) {
    var l = t.alternate;
    return (
      l === null
        ? ((l = fe(t.tag, e, t.key, t.mode)),
          (l.elementType = t.elementType),
          (l.type = t.type),
          (l.stateNode = t.stateNode),
          (l.alternate = t),
          (t.alternate = l))
        : ((l.pendingProps = e),
          (l.type = t.type),
          (l.flags = 0),
          (l.subtreeFlags = 0),
          (l.deletions = null)),
      (l.flags = t.flags & 65011712),
      (l.childLanes = t.childLanes),
      (l.lanes = t.lanes),
      (l.child = t.child),
      (l.memoizedProps = t.memoizedProps),
      (l.memoizedState = t.memoizedState),
      (l.updateQueue = t.updateQueue),
      (e = t.dependencies),
      (l.dependencies =
        e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }),
      (l.sibling = t.sibling),
      (l.index = t.index),
      (l.ref = t.ref),
      (l.refCleanup = t.refCleanup),
      l
    );
  }
  function wr(t, e) {
    t.flags &= 65011714;
    var l = t.alternate;
    return (
      l === null
        ? ((t.childLanes = 0),
          (t.lanes = e),
          (t.child = null),
          (t.subtreeFlags = 0),
          (t.memoizedProps = null),
          (t.memoizedState = null),
          (t.updateQueue = null),
          (t.dependencies = null),
          (t.stateNode = null))
        : ((t.childLanes = l.childLanes),
          (t.lanes = l.lanes),
          (t.child = l.child),
          (t.subtreeFlags = 0),
          (t.deletions = null),
          (t.memoizedProps = l.memoizedProps),
          (t.memoizedState = l.memoizedState),
          (t.updateQueue = l.updateQueue),
          (t.type = l.type),
          (e = l.dependencies),
          (t.dependencies =
            e === null
              ? null
              : { lanes: e.lanes, firstContext: e.firstContext })),
      t
    );
  }
  function tn(t, e, l, a, u, n) {
    var i = 0;
    if (((a = t), typeof t == "function")) ji(t) && (i = 1);
    else if (typeof t == "string")
      i = Qy(t, l, j.current)
        ? 26
        : t === "html" || t === "head" || t === "body"
          ? 27
          : 5;
    else
      t: switch (t) {
        case Kt:
          return (
            (t = fe(31, l, e, u)),
            (t.elementType = Kt),
            (t.lanes = n),
            t
          );
        case G:
          return ql(l.children, u, n, e);
        case x:
          ((i = 8), (u |= 24));
          break;
        case J:
          return (
            (t = fe(12, l, e, u | 2)),
            (t.elementType = J),
            (t.lanes = n),
            t
          );
        case St:
          return (
            (t = fe(13, l, e, u)),
            (t.elementType = St),
            (t.lanes = n),
            t
          );
        case Rt:
          return (
            (t = fe(19, l, e, u)),
            (t.elementType = Rt),
            (t.lanes = n),
            t
          );
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case w:
                i = 10;
                break t;
              case P:
                i = 9;
                break t;
              case gt:
                i = 11;
                break t;
              case W:
                i = 14;
                break t;
              case Mt:
                ((i = 16), (a = null));
                break t;
            }
          ((i = 29),
            (l = Error(c(130, t === null ? "null" : typeof t, ""))),
            (a = null));
      }
    return (
      (e = fe(i, l, e, u)),
      (e.elementType = t),
      (e.type = a),
      (e.lanes = n),
      e
    );
  }
  function ql(t, e, l, a) {
    return ((t = fe(7, t, a, e)), (t.lanes = l), t);
  }
  function Xi(t, e, l) {
    return ((t = fe(6, t, null, e)), (t.lanes = l), t);
  }
  function $r(t) {
    var e = fe(18, null, null, 0);
    return ((e.stateNode = t), e);
  }
  function Qi(t, e, l) {
    return (
      (e = fe(4, t.children !== null ? t.children : [], t.key, e)),
      (e.lanes = l),
      (e.stateNode = {
        containerInfo: t.containerInfo,
        pendingChildren: null,
        implementation: t.implementation,
      }),
      e
    );
  }
  var Wr = new WeakMap();
  function pe(t, e) {
    if (typeof t == "object" && t !== null) {
      var l = Wr.get(t);
      return l !== void 0
        ? l
        : ((e = { value: t, source: e, stack: $c(e) }), Wr.set(t, e), e);
    }
    return { value: t, source: e, stack: $c(e) };
  }
  var ca = [],
    ra = 0,
    en = null,
    ka = 0,
    be = [],
    Ee = 0,
    fl = null,
    xe = 1,
    Be = "";
  function Ze(t, e) {
    ((ca[ra++] = ka), (ca[ra++] = en), (en = t), (ka = e));
  }
  function kr(t, e, l) {
    ((be[Ee++] = xe), (be[Ee++] = Be), (be[Ee++] = fl), (fl = t));
    var a = xe;
    t = Be;
    var u = 32 - ne(a) - 1;
    ((a &= ~(1 << u)), (l += 1));
    var n = 32 - ne(e) + u;
    if (30 < n) {
      var i = u - (u % 5);
      ((n = (a & ((1 << i) - 1)).toString(32)),
        (a >>= i),
        (u -= i),
        (xe = (1 << (32 - ne(e) + u)) | (l << u) | a),
        (Be = n + t));
    } else ((xe = (1 << n) | (l << u) | a), (Be = t));
  }
  function Zi(t) {
    t.return !== null && (Ze(t, 1), kr(t, 1, 0));
  }
  function Vi(t) {
    for (; t === en; )
      ((en = ca[--ra]), (ca[ra] = null), (ka = ca[--ra]), (ca[ra] = null));
    for (; t === fl; )
      ((fl = be[--Ee]),
        (be[Ee] = null),
        (Be = be[--Ee]),
        (be[Ee] = null),
        (xe = be[--Ee]),
        (be[Ee] = null));
  }
  function Fr(t, e) {
    ((be[Ee++] = xe),
      (be[Ee++] = Be),
      (be[Ee++] = fl),
      (xe = e.id),
      (Be = e.overflow),
      (fl = t));
  }
  var Xt = null,
    Et = null,
    it = !1,
    cl = null,
    Te = !1,
    Ki = Error(c(519));
  function rl(t) {
    var e = Error(
      c(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1]
          ? "text"
          : "HTML",
        "",
      ),
    );
    throw (Fa(pe(e, t)), Ki);
  }
  function Ir(t) {
    var e = t.stateNode,
      l = t.type,
      a = t.memoizedProps;
    switch (((e[jt] = t), (e[kt] = a), l)) {
      case "dialog":
        (at("cancel", e), at("close", e));
        break;
      case "iframe":
      case "object":
      case "embed":
        at("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < pu.length; l++) at(pu[l], e);
        break;
      case "source":
        at("error", e);
        break;
      case "img":
      case "image":
      case "link":
        (at("error", e), at("load", e));
        break;
      case "details":
        at("toggle", e);
        break;
      case "input":
        (at("invalid", e),
          sr(
            e,
            a.value,
            a.defaultValue,
            a.checked,
            a.defaultChecked,
            a.type,
            a.name,
            !0,
          ));
        break;
      case "select":
        at("invalid", e);
        break;
      case "textarea":
        (at("invalid", e), hr(e, a.value, a.defaultValue, a.children));
    }
    ((l = a.children),
      (typeof l != "string" && typeof l != "number" && typeof l != "bigint") ||
      e.textContent === "" + l ||
      a.suppressHydrationWarning === !0 ||
      vd(e.textContent, l)
        ? (a.popover != null && (at("beforetoggle", e), at("toggle", e)),
          a.onScroll != null && at("scroll", e),
          a.onScrollEnd != null && at("scrollend", e),
          a.onClick != null && (e.onclick = je),
          (e = !0))
        : (e = !1),
      e || rl(t, !0));
  }
  function Pr(t) {
    for (Xt = t.return; Xt; )
      switch (Xt.tag) {
        case 5:
        case 31:
        case 13:
          Te = !1;
          return;
        case 27:
        case 3:
          Te = !0;
          return;
        default:
          Xt = Xt.return;
      }
  }
  function oa(t) {
    if (t !== Xt) return !1;
    if (!it) return (Pr(t), (it = !0), !1);
    var e = t.tag,
      l;
    if (
      ((l = e !== 3 && e !== 27) &&
        ((l = e === 5) &&
          ((l = t.type),
          (l =
            !(l !== "form" && l !== "button") || oc(t.type, t.memoizedProps))),
        (l = !l)),
      l && Et && rl(t),
      Pr(t),
      e === 13)
    ) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
        throw Error(c(317));
      Et = Rd(t);
    } else if (e === 31) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
        throw Error(c(317));
      Et = Rd(t);
    } else
      e === 27
        ? ((e = Et), zl(t.type) ? ((t = yc), (yc = null), (Et = t)) : (Et = e))
        : (Et = Xt ? Ae(t.stateNode.nextSibling) : null);
    return !0;
  }
  function Yl() {
    ((Et = Xt = null), (it = !1));
  }
  function Ji() {
    var t = cl;
    return (
      t !== null &&
        (ee === null ? (ee = t) : ee.push.apply(ee, t), (cl = null)),
      t
    );
  }
  function Fa(t) {
    cl === null ? (cl = [t]) : cl.push(t);
  }
  var wi = g(null),
    Ll = null,
    Ve = null;
  function ol(t, e, l) {
    (Y(wi, e._currentValue), (e._currentValue = l));
  }
  function Ke(t) {
    ((t._currentValue = wi.current), H(wi));
  }
  function $i(t, e, l) {
    for (; t !== null; ) {
      var a = t.alternate;
      if (
        ((t.childLanes & e) !== e
          ? ((t.childLanes |= e), a !== null && (a.childLanes |= e))
          : a !== null && (a.childLanes & e) !== e && (a.childLanes |= e),
        t === l)
      )
        break;
      t = t.return;
    }
  }
  function Wi(t, e, l, a) {
    var u = t.child;
    for (u !== null && (u.return = t); u !== null; ) {
      var n = u.dependencies;
      if (n !== null) {
        var i = u.child;
        n = n.firstContext;
        t: for (; n !== null; ) {
          var r = n;
          n = u;
          for (var h = 0; h < e.length; h++)
            if (r.context === e[h]) {
              ((n.lanes |= l),
                (r = n.alternate),
                r !== null && (r.lanes |= l),
                $i(n.return, l, t),
                a || (i = null));
              break t;
            }
          n = r.next;
        }
      } else if (u.tag === 18) {
        if (((i = u.return), i === null)) throw Error(c(341));
        ((i.lanes |= l),
          (n = i.alternate),
          n !== null && (n.lanes |= l),
          $i(i, l, t),
          (i = null));
      } else i = u.child;
      if (i !== null) i.return = u;
      else
        for (i = u; i !== null; ) {
          if (i === t) {
            i = null;
            break;
          }
          if (((u = i.sibling), u !== null)) {
            ((u.return = i.return), (i = u));
            break;
          }
          i = i.return;
        }
      u = i;
    }
  }
  function sa(t, e, l, a) {
    t = null;
    for (var u = e, n = !1; u !== null; ) {
      if (!n) {
        if ((u.flags & 524288) !== 0) n = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var i = u.alternate;
        if (i === null) throw Error(c(387));
        if (((i = i.memoizedProps), i !== null)) {
          var r = u.type;
          ie(u.pendingProps.value, i.value) ||
            (t !== null ? t.push(r) : (t = [r]));
        }
      } else if (u === ot.current) {
        if (((i = u.alternate), i === null)) throw Error(c(387));
        i.memoizedState.memoizedState !== u.memoizedState.memoizedState &&
          (t !== null ? t.push(Au) : (t = [Au]));
      }
      u = u.return;
    }
    (t !== null && Wi(e, t, l, a), (e.flags |= 262144));
  }
  function ln(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!ie(t.context._currentValue, t.memoizedValue)) return !0;
      t = t.next;
    }
    return !1;
  }
  function Gl(t) {
    ((Ll = t),
      (Ve = null),
      (t = t.dependencies),
      t !== null && (t.firstContext = null));
  }
  function Qt(t) {
    return to(Ll, t);
  }
  function an(t, e) {
    return (Ll === null && Gl(t), to(t, e));
  }
  function to(t, e) {
    var l = e._currentValue;
    if (((e = { context: e, memoizedValue: l, next: null }), Ve === null)) {
      if (t === null) throw Error(c(308));
      ((Ve = e),
        (t.dependencies = { lanes: 0, firstContext: e }),
        (t.flags |= 524288));
    } else Ve = Ve.next = e;
    return l;
  }
  var Lm =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var t = [],
              e = (this.signal = {
                aborted: !1,
                addEventListener: function (l, a) {
                  t.push(a);
                },
              });
            this.abort = function () {
              ((e.aborted = !0),
                t.forEach(function (l) {
                  return l();
                }));
            };
          },
    Gm = f.unstable_scheduleCallback,
    jm = f.unstable_NormalPriority,
    Ht = {
      $$typeof: w,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function ki() {
    return { controller: new Lm(), data: new Map(), refCount: 0 };
  }
  function Ia(t) {
    (t.refCount--,
      t.refCount === 0 &&
        Gm(jm, function () {
          t.controller.abort();
        }));
  }
  var Pa = null,
    Fi = 0,
    da = 0,
    ha = null;
  function Xm(t, e) {
    if (Pa === null) {
      var l = (Pa = []);
      ((Fi = 0),
        (da = ec()),
        (ha = {
          status: "pending",
          value: void 0,
          then: function (a) {
            l.push(a);
          },
        }));
    }
    return (Fi++, e.then(eo, eo), e);
  }
  function eo() {
    if (--Fi === 0 && Pa !== null) {
      ha !== null && (ha.status = "fulfilled");
      var t = Pa;
      ((Pa = null), (da = 0), (ha = null));
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function Qm(t, e) {
    var l = [],
      a = {
        status: "pending",
        value: null,
        reason: null,
        then: function (u) {
          l.push(u);
        },
      };
    return (
      t.then(
        function () {
          ((a.status = "fulfilled"), (a.value = e));
          for (var u = 0; u < l.length; u++) (0, l[u])(e);
        },
        function (u) {
          for (a.status = "rejected", a.reason = u, u = 0; u < l.length; u++)
            (0, l[u])(void 0);
        },
      ),
      a
    );
  }
  var lo = D.S;
  D.S = function (t, e) {
    ((js = ae()),
      typeof e == "object" &&
        e !== null &&
        typeof e.then == "function" &&
        Xm(t, e),
      lo !== null && lo(t, e));
  };
  var jl = g(null);
  function Ii() {
    var t = jl.current;
    return t !== null ? t : bt.pooledCache;
  }
  function un(t, e) {
    e === null ? Y(jl, jl.current) : Y(jl, e.pool);
  }
  function ao() {
    var t = Ii();
    return t === null ? null : { parent: Ht._currentValue, pool: t };
  }
  var ma = Error(c(460)),
    Pi = Error(c(474)),
    nn = Error(c(542)),
    fn = { then: function () {} };
  function uo(t) {
    return ((t = t.status), t === "fulfilled" || t === "rejected");
  }
  function no(t, e, l) {
    switch (
      ((l = t[l]),
      l === void 0 ? t.push(e) : l !== e && (e.then(je, je), (e = l)),
      e.status)
    ) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw ((t = e.reason), fo(t), t);
      default:
        if (typeof e.status == "string") e.then(je, je);
        else {
          if (((t = bt), t !== null && 100 < t.shellSuspendCounter))
            throw Error(c(482));
          ((t = e),
            (t.status = "pending"),
            t.then(
              function (a) {
                if (e.status === "pending") {
                  var u = e;
                  ((u.status = "fulfilled"), (u.value = a));
                }
              },
              function (a) {
                if (e.status === "pending") {
                  var u = e;
                  ((u.status = "rejected"), (u.reason = a));
                }
              },
            ));
        }
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw ((t = e.reason), fo(t), t);
        }
        throw ((Ql = e), ma);
    }
  }
  function Xl(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function"
        ? ((Ql = l), ma)
        : l;
    }
  }
  var Ql = null;
  function io() {
    if (Ql === null) throw Error(c(459));
    var t = Ql;
    return ((Ql = null), t);
  }
  function fo(t) {
    if (t === ma || t === nn) throw Error(c(483));
  }
  var ya = null,
    tu = 0;
  function cn(t) {
    var e = tu;
    return ((tu += 1), ya === null && (ya = []), no(ya, t, e));
  }
  function eu(t, e) {
    ((e = e.props.ref), (t.ref = e !== void 0 ? e : null));
  }
  function rn(t, e) {
    throw e.$$typeof === q
      ? Error(c(525))
      : ((t = Object.prototype.toString.call(e)),
        Error(
          c(
            31,
            t === "[object Object]"
              ? "object with keys {" + Object.keys(e).join(", ") + "}"
              : t,
          ),
        ));
  }
  function co(t) {
    function e(S, m) {
      if (t) {
        var E = S.deletions;
        E === null ? ((S.deletions = [m]), (S.flags |= 16)) : E.push(m);
      }
    }
    function l(S, m) {
      if (!t) return null;
      for (; m !== null; ) (e(S, m), (m = m.sibling));
      return null;
    }
    function a(S) {
      for (var m = new Map(); S !== null; )
        (S.key !== null ? m.set(S.key, S) : m.set(S.index, S), (S = S.sibling));
      return m;
    }
    function u(S, m) {
      return ((S = Qe(S, m)), (S.index = 0), (S.sibling = null), S);
    }
    function n(S, m, E) {
      return (
        (S.index = E),
        t
          ? ((E = S.alternate),
            E !== null
              ? ((E = E.index), E < m ? ((S.flags |= 67108866), m) : E)
              : ((S.flags |= 67108866), m))
          : ((S.flags |= 1048576), m)
      );
    }
    function i(S) {
      return (t && S.alternate === null && (S.flags |= 67108866), S);
    }
    function r(S, m, E, U) {
      return m === null || m.tag !== 6
        ? ((m = Xi(E, S.mode, U)), (m.return = S), m)
        : ((m = u(m, E)), (m.return = S), m);
    }
    function h(S, m, E, U) {
      var Q = E.type;
      return Q === G
        ? M(S, m, E.props.children, U, E.key)
        : m !== null &&
            (m.elementType === Q ||
              (typeof Q == "object" &&
                Q !== null &&
                Q.$$typeof === Mt &&
                Xl(Q) === m.type))
          ? ((m = u(m, E.props)), eu(m, E), (m.return = S), m)
          : ((m = tn(E.type, E.key, E.props, null, S.mode, U)),
            eu(m, E),
            (m.return = S),
            m);
    }
    function T(S, m, E, U) {
      return m === null ||
        m.tag !== 4 ||
        m.stateNode.containerInfo !== E.containerInfo ||
        m.stateNode.implementation !== E.implementation
        ? ((m = Qi(E, S.mode, U)), (m.return = S), m)
        : ((m = u(m, E.children || [])), (m.return = S), m);
    }
    function M(S, m, E, U, Q) {
      return m === null || m.tag !== 7
        ? ((m = ql(E, S.mode, U, Q)), (m.return = S), m)
        : ((m = u(m, E)), (m.return = S), m);
    }
    function C(S, m, E) {
      if (
        (typeof m == "string" && m !== "") ||
        typeof m == "number" ||
        typeof m == "bigint"
      )
        return ((m = Xi("" + m, S.mode, E)), (m.return = S), m);
      if (typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case K:
            return (
              (E = tn(m.type, m.key, m.props, null, S.mode, E)),
              eu(E, m),
              (E.return = S),
              E
            );
          case Z:
            return ((m = Qi(m, S.mode, E)), (m.return = S), m);
          case Mt:
            return ((m = Xl(m)), C(S, m, E));
        }
        if (Nt(m) || Jt(m))
          return ((m = ql(m, S.mode, E, null)), (m.return = S), m);
        if (typeof m.then == "function") return C(S, cn(m), E);
        if (m.$$typeof === w) return C(S, an(S, m), E);
        rn(S, m);
      }
      return null;
    }
    function z(S, m, E, U) {
      var Q = m !== null ? m.key : null;
      if (
        (typeof E == "string" && E !== "") ||
        typeof E == "number" ||
        typeof E == "bigint"
      )
        return Q !== null ? null : r(S, m, "" + E, U);
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case K:
            return E.key === Q ? h(S, m, E, U) : null;
          case Z:
            return E.key === Q ? T(S, m, E, U) : null;
          case Mt:
            return ((E = Xl(E)), z(S, m, E, U));
        }
        if (Nt(E) || Jt(E)) return Q !== null ? null : M(S, m, E, U, null);
        if (typeof E.then == "function") return z(S, m, cn(E), U);
        if (E.$$typeof === w) return z(S, m, an(S, E), U);
        rn(S, E);
      }
      return null;
    }
    function R(S, m, E, U, Q) {
      if (
        (typeof U == "string" && U !== "") ||
        typeof U == "number" ||
        typeof U == "bigint"
      )
        return ((S = S.get(E) || null), r(m, S, "" + U, Q));
      if (typeof U == "object" && U !== null) {
        switch (U.$$typeof) {
          case K:
            return (
              (S = S.get(U.key === null ? E : U.key) || null),
              h(m, S, U, Q)
            );
          case Z:
            return (
              (S = S.get(U.key === null ? E : U.key) || null),
              T(m, S, U, Q)
            );
          case Mt:
            return ((U = Xl(U)), R(S, m, E, U, Q));
        }
        if (Nt(U) || Jt(U))
          return ((S = S.get(E) || null), M(m, S, U, Q, null));
        if (typeof U.then == "function") return R(S, m, E, cn(U), Q);
        if (U.$$typeof === w) return R(S, m, E, an(m, U), Q);
        rn(m, U);
      }
      return null;
    }
    function L(S, m, E, U) {
      for (
        var Q = null, ft = null, X = m, tt = (m = 0), nt = null;
        X !== null && tt < E.length;
        tt++
      ) {
        X.index > tt ? ((nt = X), (X = null)) : (nt = X.sibling);
        var ct = z(S, X, E[tt], U);
        if (ct === null) {
          X === null && (X = nt);
          break;
        }
        (t && X && ct.alternate === null && e(S, X),
          (m = n(ct, m, tt)),
          ft === null ? (Q = ct) : (ft.sibling = ct),
          (ft = ct),
          (X = nt));
      }
      if (tt === E.length) return (l(S, X), it && Ze(S, tt), Q);
      if (X === null) {
        for (; tt < E.length; tt++)
          ((X = C(S, E[tt], U)),
            X !== null &&
              ((m = n(X, m, tt)),
              ft === null ? (Q = X) : (ft.sibling = X),
              (ft = X)));
        return (it && Ze(S, tt), Q);
      }
      for (X = a(X); tt < E.length; tt++)
        ((nt = R(X, S, tt, E[tt], U)),
          nt !== null &&
            (t &&
              nt.alternate !== null &&
              X.delete(nt.key === null ? tt : nt.key),
            (m = n(nt, m, tt)),
            ft === null ? (Q = nt) : (ft.sibling = nt),
            (ft = nt)));
      return (
        t &&
          X.forEach(function (Ml) {
            return e(S, Ml);
          }),
        it && Ze(S, tt),
        Q
      );
    }
    function V(S, m, E, U) {
      if (E == null) throw Error(c(151));
      for (
        var Q = null, ft = null, X = m, tt = (m = 0), nt = null, ct = E.next();
        X !== null && !ct.done;
        tt++, ct = E.next()
      ) {
        X.index > tt ? ((nt = X), (X = null)) : (nt = X.sibling);
        var Ml = z(S, X, ct.value, U);
        if (Ml === null) {
          X === null && (X = nt);
          break;
        }
        (t && X && Ml.alternate === null && e(S, X),
          (m = n(Ml, m, tt)),
          ft === null ? (Q = Ml) : (ft.sibling = Ml),
          (ft = Ml),
          (X = nt));
      }
      if (ct.done) return (l(S, X), it && Ze(S, tt), Q);
      if (X === null) {
        for (; !ct.done; tt++, ct = E.next())
          ((ct = C(S, ct.value, U)),
            ct !== null &&
              ((m = n(ct, m, tt)),
              ft === null ? (Q = ct) : (ft.sibling = ct),
              (ft = ct)));
        return (it && Ze(S, tt), Q);
      }
      for (X = a(X); !ct.done; tt++, ct = E.next())
        ((ct = R(X, S, tt, ct.value, U)),
          ct !== null &&
            (t &&
              ct.alternate !== null &&
              X.delete(ct.key === null ? tt : ct.key),
            (m = n(ct, m, tt)),
            ft === null ? (Q = ct) : (ft.sibling = ct),
            (ft = ct)));
      return (
        t &&
          X.forEach(function (Py) {
            return e(S, Py);
          }),
        it && Ze(S, tt),
        Q
      );
    }
    function vt(S, m, E, U) {
      if (
        (typeof E == "object" &&
          E !== null &&
          E.type === G &&
          E.key === null &&
          (E = E.props.children),
        typeof E == "object" && E !== null)
      ) {
        switch (E.$$typeof) {
          case K:
            t: {
              for (var Q = E.key; m !== null; ) {
                if (m.key === Q) {
                  if (((Q = E.type), Q === G)) {
                    if (m.tag === 7) {
                      (l(S, m.sibling),
                        (U = u(m, E.props.children)),
                        (U.return = S),
                        (S = U));
                      break t;
                    }
                  } else if (
                    m.elementType === Q ||
                    (typeof Q == "object" &&
                      Q !== null &&
                      Q.$$typeof === Mt &&
                      Xl(Q) === m.type)
                  ) {
                    (l(S, m.sibling),
                      (U = u(m, E.props)),
                      eu(U, E),
                      (U.return = S),
                      (S = U));
                    break t;
                  }
                  l(S, m);
                  break;
                } else e(S, m);
                m = m.sibling;
              }
              E.type === G
                ? ((U = ql(E.props.children, S.mode, U, E.key)),
                  (U.return = S),
                  (S = U))
                : ((U = tn(E.type, E.key, E.props, null, S.mode, U)),
                  eu(U, E),
                  (U.return = S),
                  (S = U));
            }
            return i(S);
          case Z:
            t: {
              for (Q = E.key; m !== null; ) {
                if (m.key === Q)
                  if (
                    m.tag === 4 &&
                    m.stateNode.containerInfo === E.containerInfo &&
                    m.stateNode.implementation === E.implementation
                  ) {
                    (l(S, m.sibling),
                      (U = u(m, E.children || [])),
                      (U.return = S),
                      (S = U));
                    break t;
                  } else {
                    l(S, m);
                    break;
                  }
                else e(S, m);
                m = m.sibling;
              }
              ((U = Qi(E, S.mode, U)), (U.return = S), (S = U));
            }
            return i(S);
          case Mt:
            return ((E = Xl(E)), vt(S, m, E, U));
        }
        if (Nt(E)) return L(S, m, E, U);
        if (Jt(E)) {
          if (((Q = Jt(E)), typeof Q != "function")) throw Error(c(150));
          return ((E = Q.call(E)), V(S, m, E, U));
        }
        if (typeof E.then == "function") return vt(S, m, cn(E), U);
        if (E.$$typeof === w) return vt(S, m, an(S, E), U);
        rn(S, E);
      }
      return (typeof E == "string" && E !== "") ||
        typeof E == "number" ||
        typeof E == "bigint"
        ? ((E = "" + E),
          m !== null && m.tag === 6
            ? (l(S, m.sibling), (U = u(m, E)), (U.return = S), (S = U))
            : (l(S, m), (U = Xi(E, S.mode, U)), (U.return = S), (S = U)),
          i(S))
        : l(S, m);
    }
    return function (S, m, E, U) {
      try {
        tu = 0;
        var Q = vt(S, m, E, U);
        return ((ya = null), Q);
      } catch (X) {
        if (X === ma || X === nn) throw X;
        var ft = fe(29, X, null, S.mode);
        return ((ft.lanes = U), (ft.return = S), ft);
      }
    };
  }
  var Zl = co(!0),
    ro = co(!1),
    sl = !1;
  function tf(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function ef(t, e) {
    ((t = t.updateQueue),
      e.updateQueue === t &&
        (e.updateQueue = {
          baseState: t.baseState,
          firstBaseUpdate: t.firstBaseUpdate,
          lastBaseUpdate: t.lastBaseUpdate,
          shared: t.shared,
          callbacks: null,
        }));
  }
  function dl(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function hl(t, e, l) {
    var a = t.updateQueue;
    if (a === null) return null;
    if (((a = a.shared), (rt & 2) !== 0)) {
      var u = a.pending;
      return (
        u === null ? (e.next = e) : ((e.next = u.next), (u.next = e)),
        (a.pending = e),
        (e = Pu(t)),
        Jr(t, null, l),
        e
      );
    }
    return (Iu(t, a, e, l), Pu(t));
  }
  function lu(t, e, l) {
    if (
      ((e = e.updateQueue), e !== null && ((e = e.shared), (l & 4194048) !== 0))
    ) {
      var a = e.lanes;
      ((a &= t.pendingLanes), (l |= a), (e.lanes = l), tr(t, l));
    }
  }
  function lf(t, e) {
    var l = t.updateQueue,
      a = t.alternate;
    if (a !== null && ((a = a.updateQueue), l === a)) {
      var u = null,
        n = null;
      if (((l = l.firstBaseUpdate), l !== null)) {
        do {
          var i = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null,
          };
          (n === null ? (u = n = i) : (n = n.next = i), (l = l.next));
        } while (l !== null);
        n === null ? (u = n = e) : (n = n.next = e);
      } else u = n = e;
      ((l = {
        baseState: a.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: n,
        shared: a.shared,
        callbacks: a.callbacks,
      }),
        (t.updateQueue = l));
      return;
    }
    ((t = l.lastBaseUpdate),
      t === null ? (l.firstBaseUpdate = e) : (t.next = e),
      (l.lastBaseUpdate = e));
  }
  var af = !1;
  function au() {
    if (af) {
      var t = ha;
      if (t !== null) throw t;
    }
  }
  function uu(t, e, l, a) {
    af = !1;
    var u = t.updateQueue;
    sl = !1;
    var n = u.firstBaseUpdate,
      i = u.lastBaseUpdate,
      r = u.shared.pending;
    if (r !== null) {
      u.shared.pending = null;
      var h = r,
        T = h.next;
      ((h.next = null), i === null ? (n = T) : (i.next = T), (i = h));
      var M = t.alternate;
      M !== null &&
        ((M = M.updateQueue),
        (r = M.lastBaseUpdate),
        r !== i &&
          (r === null ? (M.firstBaseUpdate = T) : (r.next = T),
          (M.lastBaseUpdate = h)));
    }
    if (n !== null) {
      var C = u.baseState;
      ((i = 0), (M = T = h = null), (r = n));
      do {
        var z = r.lane & -536870913,
          R = z !== r.lane;
        if (R ? (ut & z) === z : (a & z) === z) {
          (z !== 0 && z === da && (af = !0),
            M !== null &&
              (M = M.next =
                {
                  lane: 0,
                  tag: r.tag,
                  payload: r.payload,
                  callback: null,
                  next: null,
                }));
          t: {
            var L = t,
              V = r;
            z = e;
            var vt = l;
            switch (V.tag) {
              case 1:
                if (((L = V.payload), typeof L == "function")) {
                  C = L.call(vt, C, z);
                  break t;
                }
                C = L;
                break t;
              case 3:
                L.flags = (L.flags & -65537) | 128;
              case 0:
                if (
                  ((L = V.payload),
                  (z = typeof L == "function" ? L.call(vt, C, z) : L),
                  z == null)
                )
                  break t;
                C = A({}, C, z);
                break t;
              case 2:
                sl = !0;
            }
          }
          ((z = r.callback),
            z !== null &&
              ((t.flags |= 64),
              R && (t.flags |= 8192),
              (R = u.callbacks),
              R === null ? (u.callbacks = [z]) : R.push(z)));
        } else
          ((R = {
            lane: z,
            tag: r.tag,
            payload: r.payload,
            callback: r.callback,
            next: null,
          }),
            M === null ? ((T = M = R), (h = C)) : (M = M.next = R),
            (i |= z));
        if (((r = r.next), r === null)) {
          if (((r = u.shared.pending), r === null)) break;
          ((R = r),
            (r = R.next),
            (R.next = null),
            (u.lastBaseUpdate = R),
            (u.shared.pending = null));
        }
      } while (!0);
      (M === null && (h = C),
        (u.baseState = h),
        (u.firstBaseUpdate = T),
        (u.lastBaseUpdate = M),
        n === null && (u.shared.lanes = 0),
        (Sl |= i),
        (t.lanes = i),
        (t.memoizedState = C));
    }
  }
  function oo(t, e) {
    if (typeof t != "function") throw Error(c(191, t));
    t.call(e);
  }
  function so(t, e) {
    var l = t.callbacks;
    if (l !== null)
      for (t.callbacks = null, t = 0; t < l.length; t++) oo(l[t], e);
  }
  var va = g(null),
    on = g(0);
  function ho(t, e) {
    ((t = tl), Y(on, t), Y(va, e), (tl = t | e.baseLanes));
  }
  function uf() {
    (Y(on, tl), Y(va, va.current));
  }
  function nf() {
    ((tl = on.current), H(va), H(on));
  }
  var ce = g(null),
    ze = null;
  function ml(t) {
    var e = t.alternate;
    (Y(Ut, Ut.current & 1),
      Y(ce, t),
      ze === null &&
        (e === null || va.current !== null || e.memoizedState !== null) &&
        (ze = t));
  }
  function ff(t) {
    (Y(Ut, Ut.current), Y(ce, t), ze === null && (ze = t));
  }
  function mo(t) {
    t.tag === 22
      ? (Y(Ut, Ut.current), Y(ce, t), ze === null && (ze = t))
      : yl();
  }
  function yl() {
    (Y(Ut, Ut.current), Y(ce, ce.current));
  }
  function re(t) {
    (H(ce), ze === t && (ze = null), H(Ut));
  }
  var Ut = g(0);
  function sn(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var l = e.memoizedState;
        if (l !== null && ((l = l.dehydrated), l === null || hc(l) || mc(l)))
          return e;
      } else if (
        e.tag === 19 &&
        (e.memoizedProps.revealOrder === "forwards" ||
          e.memoizedProps.revealOrder === "backwards" ||
          e.memoizedProps.revealOrder === "unstable_legacy-backwards" ||
          e.memoizedProps.revealOrder === "together")
      ) {
        if ((e.flags & 128) !== 0) return e;
      } else if (e.child !== null) {
        ((e.child.return = e), (e = e.child));
        continue;
      }
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return null;
        e = e.return;
      }
      ((e.sibling.return = e.return), (e = e.sibling));
    }
    return null;
  }
  var Je = 0,
    I = null,
    mt = null,
    xt = null,
    dn = !1,
    ga = !1,
    Vl = !1,
    hn = 0,
    nu = 0,
    Sa = null,
    Zm = 0;
  function _t() {
    throw Error(c(321));
  }
  function cf(t, e) {
    if (e === null) return !1;
    for (var l = 0; l < e.length && l < t.length; l++)
      if (!ie(t[l], e[l])) return !1;
    return !0;
  }
  function rf(t, e, l, a, u, n) {
    return (
      (Je = n),
      (I = e),
      (e.memoizedState = null),
      (e.updateQueue = null),
      (e.lanes = 0),
      (D.H = t === null || t.memoizedState === null ? Fo : Af),
      (Vl = !1),
      (n = l(a, u)),
      (Vl = !1),
      ga && (n = vo(e, l, a, u)),
      yo(t),
      n
    );
  }
  function yo(t) {
    D.H = cu;
    var e = mt !== null && mt.next !== null;
    if (((Je = 0), (xt = mt = I = null), (dn = !1), (nu = 0), (Sa = null), e))
      throw Error(c(300));
    t === null ||
      Bt ||
      ((t = t.dependencies), t !== null && ln(t) && (Bt = !0));
  }
  function vo(t, e, l, a) {
    I = t;
    var u = 0;
    do {
      if ((ga && (Sa = null), (nu = 0), (ga = !1), 25 <= u))
        throw Error(c(301));
      if (((u += 1), (xt = mt = null), t.updateQueue != null)) {
        var n = t.updateQueue;
        ((n.lastEffect = null),
          (n.events = null),
          (n.stores = null),
          n.memoCache != null && (n.memoCache.index = 0));
      }
      ((D.H = Io), (n = e(l, a)));
    } while (ga);
    return n;
  }
  function Vm() {
    var t = D.H,
      e = t.useState()[0];
    return (
      (e = typeof e.then == "function" ? iu(e) : e),
      (t = t.useState()[0]),
      (mt !== null ? mt.memoizedState : null) !== t && (I.flags |= 1024),
      e
    );
  }
  function of() {
    var t = hn !== 0;
    return ((hn = 0), t);
  }
  function sf(t, e, l) {
    ((e.updateQueue = t.updateQueue), (e.flags &= -2053), (t.lanes &= ~l));
  }
  function df(t) {
    if (dn) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        (e !== null && (e.pending = null), (t = t.next));
      }
      dn = !1;
    }
    ((Je = 0), (xt = mt = I = null), (ga = !1), (nu = hn = 0), (Sa = null));
  }
  function Wt() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return (xt === null ? (I.memoizedState = xt = t) : (xt = xt.next = t), xt);
  }
  function Ct() {
    if (mt === null) {
      var t = I.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = mt.next;
    var e = xt === null ? I.memoizedState : xt.next;
    if (e !== null) ((xt = e), (mt = t));
    else {
      if (t === null)
        throw I.alternate === null ? Error(c(467)) : Error(c(310));
      ((mt = t),
        (t = {
          memoizedState: mt.memoizedState,
          baseState: mt.baseState,
          baseQueue: mt.baseQueue,
          queue: mt.queue,
          next: null,
        }),
        xt === null ? (I.memoizedState = xt = t) : (xt = xt.next = t));
    }
    return xt;
  }
  function mn() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function iu(t) {
    var e = nu;
    return (
      (nu += 1),
      Sa === null && (Sa = []),
      (t = no(Sa, t, e)),
      (e = I),
      (xt === null ? e.memoizedState : xt.next) === null &&
        ((e = e.alternate),
        (D.H = e === null || e.memoizedState === null ? Fo : Af)),
      t
    );
  }
  function yn(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return iu(t);
      if (t.$$typeof === w) return Qt(t);
    }
    throw Error(c(438, String(t)));
  }
  function hf(t) {
    var e = null,
      l = I.updateQueue;
    if ((l !== null && (e = l.memoCache), e == null)) {
      var a = I.alternate;
      a !== null &&
        ((a = a.updateQueue),
        a !== null &&
          ((a = a.memoCache),
          a != null &&
            (e = {
              data: a.data.map(function (u) {
                return u.slice();
              }),
              index: 0,
            })));
    }
    if (
      (e == null && (e = { data: [], index: 0 }),
      l === null && ((l = mn()), (I.updateQueue = l)),
      (l.memoCache = e),
      (l = e.data[e.index]),
      l === void 0)
    )
      for (l = e.data[e.index] = Array(t), a = 0; a < t; a++) l[a] = Ne;
    return (e.index++, l);
  }
  function we(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function vn(t) {
    var e = Ct();
    return mf(e, mt, t);
  }
  function mf(t, e, l) {
    var a = t.queue;
    if (a === null) throw Error(c(311));
    a.lastRenderedReducer = l;
    var u = t.baseQueue,
      n = a.pending;
    if (n !== null) {
      if (u !== null) {
        var i = u.next;
        ((u.next = n.next), (n.next = i));
      }
      ((e.baseQueue = u = n), (a.pending = null));
    }
    if (((n = t.baseState), u === null)) t.memoizedState = n;
    else {
      e = u.next;
      var r = (i = null),
        h = null,
        T = e,
        M = !1;
      do {
        var C = T.lane & -536870913;
        if (C !== T.lane ? (ut & C) === C : (Je & C) === C) {
          var z = T.revertLane;
          if (z === 0)
            (h !== null &&
              (h = h.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: T.action,
                  hasEagerState: T.hasEagerState,
                  eagerState: T.eagerState,
                  next: null,
                }),
              C === da && (M = !0));
          else if ((Je & z) === z) {
            ((T = T.next), z === da && (M = !0));
            continue;
          } else
            ((C = {
              lane: 0,
              revertLane: T.revertLane,
              gesture: null,
              action: T.action,
              hasEagerState: T.hasEagerState,
              eagerState: T.eagerState,
              next: null,
            }),
              h === null ? ((r = h = C), (i = n)) : (h = h.next = C),
              (I.lanes |= z),
              (Sl |= z));
          ((C = T.action),
            Vl && l(n, C),
            (n = T.hasEagerState ? T.eagerState : l(n, C)));
        } else
          ((z = {
            lane: C,
            revertLane: T.revertLane,
            gesture: T.gesture,
            action: T.action,
            hasEagerState: T.hasEagerState,
            eagerState: T.eagerState,
            next: null,
          }),
            h === null ? ((r = h = z), (i = n)) : (h = h.next = z),
            (I.lanes |= C),
            (Sl |= C));
        T = T.next;
      } while (T !== null && T !== e);
      if (
        (h === null ? (i = n) : (h.next = r),
        !ie(n, t.memoizedState) && ((Bt = !0), M && ((l = ha), l !== null)))
      )
        throw l;
      ((t.memoizedState = n),
        (t.baseState = i),
        (t.baseQueue = h),
        (a.lastRenderedState = n));
    }
    return (u === null && (a.lanes = 0), [t.memoizedState, a.dispatch]);
  }
  function yf(t) {
    var e = Ct(),
      l = e.queue;
    if (l === null) throw Error(c(311));
    l.lastRenderedReducer = t;
    var a = l.dispatch,
      u = l.pending,
      n = e.memoizedState;
    if (u !== null) {
      l.pending = null;
      var i = (u = u.next);
      do ((n = t(n, i.action)), (i = i.next));
      while (i !== u);
      (ie(n, e.memoizedState) || (Bt = !0),
        (e.memoizedState = n),
        e.baseQueue === null && (e.baseState = n),
        (l.lastRenderedState = n));
    }
    return [n, a];
  }
  function go(t, e, l) {
    var a = I,
      u = Ct(),
      n = it;
    if (n) {
      if (l === void 0) throw Error(c(407));
      l = l();
    } else l = e();
    var i = !ie((mt || u).memoizedState, l);
    if (
      (i && ((u.memoizedState = l), (Bt = !0)),
      (u = u.queue),
      Sf(bo.bind(null, a, u, t), [t]),
      u.getSnapshot !== e || i || (xt !== null && xt.memoizedState.tag & 1))
    ) {
      if (
        ((a.flags |= 2048),
        pa(9, { destroy: void 0 }, po.bind(null, a, u, l, e), null),
        bt === null)
      )
        throw Error(c(349));
      n || (Je & 127) !== 0 || So(a, e, l);
    }
    return l;
  }
  function So(t, e, l) {
    ((t.flags |= 16384),
      (t = { getSnapshot: e, value: l }),
      (e = I.updateQueue),
      e === null
        ? ((e = mn()), (I.updateQueue = e), (e.stores = [t]))
        : ((l = e.stores), l === null ? (e.stores = [t]) : l.push(t)));
  }
  function po(t, e, l, a) {
    ((e.value = l), (e.getSnapshot = a), Eo(e) && To(t));
  }
  function bo(t, e, l) {
    return l(function () {
      Eo(e) && To(t);
    });
  }
  function Eo(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var l = e();
      return !ie(t, l);
    } catch {
      return !0;
    }
  }
  function To(t) {
    var e = Bl(t, 2);
    e !== null && le(e, t, 2);
  }
  function vf(t) {
    var e = Wt();
    if (typeof t == "function") {
      var l = t;
      if (((t = l()), Vl)) {
        ul(!0);
        try {
          l();
        } finally {
          ul(!1);
        }
      }
    }
    return (
      (e.memoizedState = e.baseState = t),
      (e.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: we,
        lastRenderedState: t,
      }),
      e
    );
  }
  function zo(t, e, l, a) {
    return ((t.baseState = l), mf(t, mt, typeof a == "function" ? a : we));
  }
  function Km(t, e, l, a, u) {
    if (pn(t)) throw Error(c(485));
    if (((t = e.action), t !== null)) {
      var n = {
        payload: u,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (i) {
          n.listeners.push(i);
        },
      };
      (D.T !== null ? l(!0) : (n.isTransition = !1),
        a(n),
        (l = e.pending),
        l === null
          ? ((n.next = e.pending = n), Ao(e, n))
          : ((n.next = l.next), (e.pending = l.next = n)));
    }
  }
  function Ao(t, e) {
    var l = e.action,
      a = e.payload,
      u = t.state;
    if (e.isTransition) {
      var n = D.T,
        i = {};
      D.T = i;
      try {
        var r = l(u, a),
          h = D.S;
        (h !== null && h(i, r), Ro(t, e, r));
      } catch (T) {
        gf(t, e, T);
      } finally {
        (n !== null && i.types !== null && (n.types = i.types), (D.T = n));
      }
    } else
      try {
        ((n = l(u, a)), Ro(t, e, n));
      } catch (T) {
        gf(t, e, T);
      }
  }
  function Ro(t, e, l) {
    l !== null && typeof l == "object" && typeof l.then == "function"
      ? l.then(
          function (a) {
            _o(t, e, a);
          },
          function (a) {
            return gf(t, e, a);
          },
        )
      : _o(t, e, l);
  }
  function _o(t, e, l) {
    ((e.status = "fulfilled"),
      (e.value = l),
      Oo(e),
      (t.state = l),
      (e = t.pending),
      e !== null &&
        ((l = e.next),
        l === e ? (t.pending = null) : ((l = l.next), (e.next = l), Ao(t, l))));
  }
  function gf(t, e, l) {
    var a = t.pending;
    if (((t.pending = null), a !== null)) {
      a = a.next;
      do ((e.status = "rejected"), (e.reason = l), Oo(e), (e = e.next));
      while (e !== a);
    }
    t.action = null;
  }
  function Oo(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function Mo(t, e) {
    return e;
  }
  function Do(t, e) {
    if (it) {
      var l = bt.formState;
      if (l !== null) {
        t: {
          var a = I;
          if (it) {
            if (Et) {
              e: {
                for (var u = Et, n = Te; u.nodeType !== 8; ) {
                  if (!n) {
                    u = null;
                    break e;
                  }
                  if (((u = Ae(u.nextSibling)), u === null)) {
                    u = null;
                    break e;
                  }
                }
                ((n = u.data), (u = n === "F!" || n === "F" ? u : null));
              }
              if (u) {
                ((Et = Ae(u.nextSibling)), (a = u.data === "F!"));
                break t;
              }
            }
            rl(a);
          }
          a = !1;
        }
        a && (e = l[0]);
      }
    }
    return (
      (l = Wt()),
      (l.memoizedState = l.baseState = e),
      (a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Mo,
        lastRenderedState: e,
      }),
      (l.queue = a),
      (l = $o.bind(null, I, a)),
      (a.dispatch = l),
      (a = vf(!1)),
      (n = zf.bind(null, I, !1, a.queue)),
      (a = Wt()),
      (u = { state: e, dispatch: null, action: t, pending: null }),
      (a.queue = u),
      (l = Km.bind(null, I, u, n, l)),
      (u.dispatch = l),
      (a.memoizedState = t),
      [e, l, !1]
    );
  }
  function Uo(t) {
    var e = Ct();
    return Co(e, mt, t);
  }
  function Co(t, e, l) {
    if (
      ((e = mf(t, e, Mo)[0]),
      (t = vn(we)[0]),
      typeof e == "object" && e !== null && typeof e.then == "function")
    )
      try {
        var a = iu(e);
      } catch (i) {
        throw i === ma ? nn : i;
      }
    else a = e;
    e = Ct();
    var u = e.queue,
      n = u.dispatch;
    return (
      l !== e.memoizedState &&
        ((I.flags |= 2048),
        pa(9, { destroy: void 0 }, Jm.bind(null, u, l), null)),
      [a, n, t]
    );
  }
  function Jm(t, e) {
    t.action = e;
  }
  function No(t) {
    var e = Ct(),
      l = mt;
    if (l !== null) return Co(e, l, t);
    (Ct(), (e = e.memoizedState), (l = Ct()));
    var a = l.queue.dispatch;
    return ((l.memoizedState = t), [e, a, !1]);
  }
  function pa(t, e, l, a) {
    return (
      (t = { tag: t, create: l, deps: a, inst: e, next: null }),
      (e = I.updateQueue),
      e === null && ((e = mn()), (I.updateQueue = e)),
      (l = e.lastEffect),
      l === null
        ? (e.lastEffect = t.next = t)
        : ((a = l.next), (l.next = t), (t.next = a), (e.lastEffect = t)),
      t
    );
  }
  function Ho() {
    return Ct().memoizedState;
  }
  function gn(t, e, l, a) {
    var u = Wt();
    ((I.flags |= t),
      (u.memoizedState = pa(
        1 | e,
        { destroy: void 0 },
        l,
        a === void 0 ? null : a,
      )));
  }
  function Sn(t, e, l, a) {
    var u = Ct();
    a = a === void 0 ? null : a;
    var n = u.memoizedState.inst;
    mt !== null && a !== null && cf(a, mt.memoizedState.deps)
      ? (u.memoizedState = pa(e, n, l, a))
      : ((I.flags |= t), (u.memoizedState = pa(1 | e, n, l, a)));
  }
  function xo(t, e) {
    gn(8390656, 8, t, e);
  }
  function Sf(t, e) {
    Sn(2048, 8, t, e);
  }
  function wm(t) {
    I.flags |= 4;
    var e = I.updateQueue;
    if (e === null) ((e = mn()), (I.updateQueue = e), (e.events = [t]));
    else {
      var l = e.events;
      l === null ? (e.events = [t]) : l.push(t);
    }
  }
  function Bo(t) {
    var e = Ct().memoizedState;
    return (
      wm({ ref: e, nextImpl: t }),
      function () {
        if ((rt & 2) !== 0) throw Error(c(440));
        return e.impl.apply(void 0, arguments);
      }
    );
  }
  function qo(t, e) {
    return Sn(4, 2, t, e);
  }
  function Yo(t, e) {
    return Sn(4, 4, t, e);
  }
  function Lo(t, e) {
    if (typeof e == "function") {
      t = t();
      var l = e(t);
      return function () {
        typeof l == "function" ? l() : e(null);
      };
    }
    if (e != null)
      return (
        (t = t()),
        (e.current = t),
        function () {
          e.current = null;
        }
      );
  }
  function Go(t, e, l) {
    ((l = l != null ? l.concat([t]) : null), Sn(4, 4, Lo.bind(null, e, t), l));
  }
  function pf() {}
  function jo(t, e) {
    var l = Ct();
    e = e === void 0 ? null : e;
    var a = l.memoizedState;
    return e !== null && cf(e, a[1]) ? a[0] : ((l.memoizedState = [t, e]), t);
  }
  function Xo(t, e) {
    var l = Ct();
    e = e === void 0 ? null : e;
    var a = l.memoizedState;
    if (e !== null && cf(e, a[1])) return a[0];
    if (((a = t()), Vl)) {
      ul(!0);
      try {
        t();
      } finally {
        ul(!1);
      }
    }
    return ((l.memoizedState = [a, e]), a);
  }
  function bf(t, e, l) {
    return l === void 0 || ((Je & 1073741824) !== 0 && (ut & 261930) === 0)
      ? (t.memoizedState = e)
      : ((t.memoizedState = l), (t = Qs()), (I.lanes |= t), (Sl |= t), l);
  }
  function Qo(t, e, l, a) {
    return ie(l, e)
      ? l
      : va.current !== null
        ? ((t = bf(t, l, a)), ie(t, e) || (Bt = !0), t)
        : (Je & 42) === 0 || ((Je & 1073741824) !== 0 && (ut & 261930) === 0)
          ? ((Bt = !0), (t.memoizedState = l))
          : ((t = Qs()), (I.lanes |= t), (Sl |= t), e);
  }
  function Zo(t, e, l, a, u) {
    var n = B.p;
    B.p = n !== 0 && 8 > n ? n : 8;
    var i = D.T,
      r = {};
    ((D.T = r), zf(t, !1, e, l));
    try {
      var h = u(),
        T = D.S;
      if (
        (T !== null && T(r, h),
        h !== null && typeof h == "object" && typeof h.then == "function")
      ) {
        var M = Qm(h, a);
        fu(t, e, M, de(t));
      } else fu(t, e, a, de(t));
    } catch (C) {
      fu(t, e, { then: function () {}, status: "rejected", reason: C }, de());
    } finally {
      ((B.p = n),
        i !== null && r.types !== null && (i.types = r.types),
        (D.T = i));
    }
  }
  function $m() {}
  function Ef(t, e, l, a) {
    if (t.tag !== 5) throw Error(c(476));
    var u = Vo(t).queue;
    Zo(
      t,
      u,
      e,
      $,
      l === null
        ? $m
        : function () {
            return (Ko(t), l(a));
          },
    );
  }
  function Vo(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: $,
      baseState: $,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: we,
        lastRenderedState: $,
      },
      next: null,
    };
    var l = {};
    return (
      (e.next = {
        memoizedState: l,
        baseState: l,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: we,
          lastRenderedState: l,
        },
        next: null,
      }),
      (t.memoizedState = e),
      (t = t.alternate),
      t !== null && (t.memoizedState = e),
      e
    );
  }
  function Ko(t) {
    var e = Vo(t);
    (e.next === null && (e = t.alternate.memoizedState),
      fu(t, e.next.queue, {}, de()));
  }
  function Tf() {
    return Qt(Au);
  }
  function Jo() {
    return Ct().memoizedState;
  }
  function wo() {
    return Ct().memoizedState;
  }
  function Wm(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var l = de();
          t = dl(l);
          var a = hl(e, t, l);
          (a !== null && (le(a, e, l), lu(a, e, l)),
            (e = { cache: ki() }),
            (t.payload = e));
          return;
      }
      e = e.return;
    }
  }
  function km(t, e, l) {
    var a = de();
    ((l = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      pn(t)
        ? Wo(e, l)
        : ((l = Gi(t, e, l, a)), l !== null && (le(l, t, a), ko(l, e, a))));
  }
  function $o(t, e, l) {
    var a = de();
    fu(t, e, l, a);
  }
  function fu(t, e, l, a) {
    var u = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (pn(t)) Wo(e, u);
    else {
      var n = t.alternate;
      if (
        t.lanes === 0 &&
        (n === null || n.lanes === 0) &&
        ((n = e.lastRenderedReducer), n !== null)
      )
        try {
          var i = e.lastRenderedState,
            r = n(i, l);
          if (((u.hasEagerState = !0), (u.eagerState = r), ie(r, i)))
            return (Iu(t, e, u, 0), bt === null && Fu(), !1);
        } catch {}
      if (((l = Gi(t, e, u, a)), l !== null))
        return (le(l, t, a), ko(l, e, a), !0);
    }
    return !1;
  }
  function zf(t, e, l, a) {
    if (
      ((a = {
        lane: 2,
        revertLane: ec(),
        gesture: null,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      pn(t))
    ) {
      if (e) throw Error(c(479));
    } else ((e = Gi(t, l, a, 2)), e !== null && le(e, t, 2));
  }
  function pn(t) {
    var e = t.alternate;
    return t === I || (e !== null && e === I);
  }
  function Wo(t, e) {
    ga = dn = !0;
    var l = t.pending;
    (l === null ? (e.next = e) : ((e.next = l.next), (l.next = e)),
      (t.pending = e));
  }
  function ko(t, e, l) {
    if ((l & 4194048) !== 0) {
      var a = e.lanes;
      ((a &= t.pendingLanes), (l |= a), (e.lanes = l), tr(t, l));
    }
  }
  var cu = {
    readContext: Qt,
    use: yn,
    useCallback: _t,
    useContext: _t,
    useEffect: _t,
    useImperativeHandle: _t,
    useLayoutEffect: _t,
    useInsertionEffect: _t,
    useMemo: _t,
    useReducer: _t,
    useRef: _t,
    useState: _t,
    useDebugValue: _t,
    useDeferredValue: _t,
    useTransition: _t,
    useSyncExternalStore: _t,
    useId: _t,
    useHostTransitionStatus: _t,
    useFormState: _t,
    useActionState: _t,
    useOptimistic: _t,
    useMemoCache: _t,
    useCacheRefresh: _t,
  };
  cu.useEffectEvent = _t;
  var Fo = {
      readContext: Qt,
      use: yn,
      useCallback: function (t, e) {
        return ((Wt().memoizedState = [t, e === void 0 ? null : e]), t);
      },
      useContext: Qt,
      useEffect: xo,
      useImperativeHandle: function (t, e, l) {
        ((l = l != null ? l.concat([t]) : null),
          gn(4194308, 4, Lo.bind(null, e, t), l));
      },
      useLayoutEffect: function (t, e) {
        return gn(4194308, 4, t, e);
      },
      useInsertionEffect: function (t, e) {
        gn(4, 2, t, e);
      },
      useMemo: function (t, e) {
        var l = Wt();
        e = e === void 0 ? null : e;
        var a = t();
        if (Vl) {
          ul(!0);
          try {
            t();
          } finally {
            ul(!1);
          }
        }
        return ((l.memoizedState = [a, e]), a);
      },
      useReducer: function (t, e, l) {
        var a = Wt();
        if (l !== void 0) {
          var u = l(e);
          if (Vl) {
            ul(!0);
            try {
              l(e);
            } finally {
              ul(!1);
            }
          }
        } else u = e;
        return (
          (a.memoizedState = a.baseState = u),
          (t = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: t,
            lastRenderedState: u,
          }),
          (a.queue = t),
          (t = t.dispatch = km.bind(null, I, t)),
          [a.memoizedState, t]
        );
      },
      useRef: function (t) {
        var e = Wt();
        return ((t = { current: t }), (e.memoizedState = t));
      },
      useState: function (t) {
        t = vf(t);
        var e = t.queue,
          l = $o.bind(null, I, e);
        return ((e.dispatch = l), [t.memoizedState, l]);
      },
      useDebugValue: pf,
      useDeferredValue: function (t, e) {
        var l = Wt();
        return bf(l, t, e);
      },
      useTransition: function () {
        var t = vf(!1);
        return (
          (t = Zo.bind(null, I, t.queue, !0, !1)),
          (Wt().memoizedState = t),
          [!1, t]
        );
      },
      useSyncExternalStore: function (t, e, l) {
        var a = I,
          u = Wt();
        if (it) {
          if (l === void 0) throw Error(c(407));
          l = l();
        } else {
          if (((l = e()), bt === null)) throw Error(c(349));
          (ut & 127) !== 0 || So(a, e, l);
        }
        u.memoizedState = l;
        var n = { value: l, getSnapshot: e };
        return (
          (u.queue = n),
          xo(bo.bind(null, a, n, t), [t]),
          (a.flags |= 2048),
          pa(9, { destroy: void 0 }, po.bind(null, a, n, l, e), null),
          l
        );
      },
      useId: function () {
        var t = Wt(),
          e = bt.identifierPrefix;
        if (it) {
          var l = Be,
            a = xe;
          ((l = (a & ~(1 << (32 - ne(a) - 1))).toString(32) + l),
            (e = "_" + e + "R_" + l),
            (l = hn++),
            0 < l && (e += "H" + l.toString(32)),
            (e += "_"));
        } else ((l = Zm++), (e = "_" + e + "r_" + l.toString(32) + "_"));
        return (t.memoizedState = e);
      },
      useHostTransitionStatus: Tf,
      useFormState: Do,
      useActionState: Do,
      useOptimistic: function (t) {
        var e = Wt();
        e.memoizedState = e.baseState = t;
        var l = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (e.queue = l),
          (e = zf.bind(null, I, !0, l)),
          (l.dispatch = e),
          [t, e]
        );
      },
      useMemoCache: hf,
      useCacheRefresh: function () {
        return (Wt().memoizedState = Wm.bind(null, I));
      },
      useEffectEvent: function (t) {
        var e = Wt(),
          l = { impl: t };
        return (
          (e.memoizedState = l),
          function () {
            if ((rt & 2) !== 0) throw Error(c(440));
            return l.impl.apply(void 0, arguments);
          }
        );
      },
    },
    Af = {
      readContext: Qt,
      use: yn,
      useCallback: jo,
      useContext: Qt,
      useEffect: Sf,
      useImperativeHandle: Go,
      useInsertionEffect: qo,
      useLayoutEffect: Yo,
      useMemo: Xo,
      useReducer: vn,
      useRef: Ho,
      useState: function () {
        return vn(we);
      },
      useDebugValue: pf,
      useDeferredValue: function (t, e) {
        var l = Ct();
        return Qo(l, mt.memoizedState, t, e);
      },
      useTransition: function () {
        var t = vn(we)[0],
          e = Ct().memoizedState;
        return [typeof t == "boolean" ? t : iu(t), e];
      },
      useSyncExternalStore: go,
      useId: Jo,
      useHostTransitionStatus: Tf,
      useFormState: Uo,
      useActionState: Uo,
      useOptimistic: function (t, e) {
        var l = Ct();
        return zo(l, mt, t, e);
      },
      useMemoCache: hf,
      useCacheRefresh: wo,
    };
  Af.useEffectEvent = Bo;
  var Io = {
    readContext: Qt,
    use: yn,
    useCallback: jo,
    useContext: Qt,
    useEffect: Sf,
    useImperativeHandle: Go,
    useInsertionEffect: qo,
    useLayoutEffect: Yo,
    useMemo: Xo,
    useReducer: yf,
    useRef: Ho,
    useState: function () {
      return yf(we);
    },
    useDebugValue: pf,
    useDeferredValue: function (t, e) {
      var l = Ct();
      return mt === null ? bf(l, t, e) : Qo(l, mt.memoizedState, t, e);
    },
    useTransition: function () {
      var t = yf(we)[0],
        e = Ct().memoizedState;
      return [typeof t == "boolean" ? t : iu(t), e];
    },
    useSyncExternalStore: go,
    useId: Jo,
    useHostTransitionStatus: Tf,
    useFormState: No,
    useActionState: No,
    useOptimistic: function (t, e) {
      var l = Ct();
      return mt !== null
        ? zo(l, mt, t, e)
        : ((l.baseState = t), [t, l.queue.dispatch]);
    },
    useMemoCache: hf,
    useCacheRefresh: wo,
  };
  Io.useEffectEvent = Bo;
  function Rf(t, e, l, a) {
    ((e = t.memoizedState),
      (l = l(a, e)),
      (l = l == null ? e : A({}, e, l)),
      (t.memoizedState = l),
      t.lanes === 0 && (t.updateQueue.baseState = l));
  }
  var _f = {
    enqueueSetState: function (t, e, l) {
      t = t._reactInternals;
      var a = de(),
        u = dl(a);
      ((u.payload = e),
        l != null && (u.callback = l),
        (e = hl(t, u, a)),
        e !== null && (le(e, t, a), lu(e, t, a)));
    },
    enqueueReplaceState: function (t, e, l) {
      t = t._reactInternals;
      var a = de(),
        u = dl(a);
      ((u.tag = 1),
        (u.payload = e),
        l != null && (u.callback = l),
        (e = hl(t, u, a)),
        e !== null && (le(e, t, a), lu(e, t, a)));
    },
    enqueueForceUpdate: function (t, e) {
      t = t._reactInternals;
      var l = de(),
        a = dl(l);
      ((a.tag = 2),
        e != null && (a.callback = e),
        (e = hl(t, a, l)),
        e !== null && (le(e, t, l), lu(e, t, l)));
    },
  };
  function Po(t, e, l, a, u, n, i) {
    return (
      (t = t.stateNode),
      typeof t.shouldComponentUpdate == "function"
        ? t.shouldComponentUpdate(a, n, i)
        : e.prototype && e.prototype.isPureReactComponent
          ? !$a(l, a) || !$a(u, n)
          : !0
    );
  }
  function ts(t, e, l, a) {
    ((t = e.state),
      typeof e.componentWillReceiveProps == "function" &&
        e.componentWillReceiveProps(l, a),
      typeof e.UNSAFE_componentWillReceiveProps == "function" &&
        e.UNSAFE_componentWillReceiveProps(l, a),
      e.state !== t && _f.enqueueReplaceState(e, e.state, null));
  }
  function Kl(t, e) {
    var l = e;
    if ("ref" in e) {
      l = {};
      for (var a in e) a !== "ref" && (l[a] = e[a]);
    }
    if ((t = t.defaultProps)) {
      l === e && (l = A({}, l));
      for (var u in t) l[u] === void 0 && (l[u] = t[u]);
    }
    return l;
  }
  function es(t) {
    ku(t);
  }
  function ls(t) {
    console.error(t);
  }
  function as(t) {
    ku(t);
  }
  function bn(t, e) {
    try {
      var l = t.onUncaughtError;
      l(e.value, { componentStack: e.stack });
    } catch (a) {
      setTimeout(function () {
        throw a;
      });
    }
  }
  function us(t, e, l) {
    try {
      var a = t.onCaughtError;
      a(l.value, {
        componentStack: l.stack,
        errorBoundary: e.tag === 1 ? e.stateNode : null,
      });
    } catch (u) {
      setTimeout(function () {
        throw u;
      });
    }
  }
  function Of(t, e, l) {
    return (
      (l = dl(l)),
      (l.tag = 3),
      (l.payload = { element: null }),
      (l.callback = function () {
        bn(t, e);
      }),
      l
    );
  }
  function ns(t) {
    return ((t = dl(t)), (t.tag = 3), t);
  }
  function is(t, e, l, a) {
    var u = l.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var n = a.value;
      ((t.payload = function () {
        return u(n);
      }),
        (t.callback = function () {
          us(e, l, a);
        }));
    }
    var i = l.stateNode;
    i !== null &&
      typeof i.componentDidCatch == "function" &&
      (t.callback = function () {
        (us(e, l, a),
          typeof u != "function" &&
            (pl === null ? (pl = new Set([this])) : pl.add(this)));
        var r = a.stack;
        this.componentDidCatch(a.value, {
          componentStack: r !== null ? r : "",
        });
      });
  }
  function Fm(t, e, l, a, u) {
    if (
      ((l.flags |= 32768),
      a !== null && typeof a == "object" && typeof a.then == "function")
    ) {
      if (
        ((e = l.alternate),
        e !== null && sa(e, l, u, !0),
        (l = ce.current),
        l !== null)
      ) {
        switch (l.tag) {
          case 31:
          case 13:
            return (
              ze === null ? Nn() : l.alternate === null && Ot === 0 && (Ot = 3),
              (l.flags &= -257),
              (l.flags |= 65536),
              (l.lanes = u),
              a === fn
                ? (l.flags |= 16384)
                : ((e = l.updateQueue),
                  e === null ? (l.updateQueue = new Set([a])) : e.add(a),
                  If(t, a, u)),
              !1
            );
          case 22:
            return (
              (l.flags |= 65536),
              a === fn
                ? (l.flags |= 16384)
                : ((e = l.updateQueue),
                  e === null
                    ? ((e = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([a]),
                      }),
                      (l.updateQueue = e))
                    : ((l = e.retryQueue),
                      l === null ? (e.retryQueue = new Set([a])) : l.add(a)),
                  If(t, a, u)),
              !1
            );
        }
        throw Error(c(435, l.tag));
      }
      return (If(t, a, u), Nn(), !1);
    }
    if (it)
      return (
        (e = ce.current),
        e !== null
          ? ((e.flags & 65536) === 0 && (e.flags |= 256),
            (e.flags |= 65536),
            (e.lanes = u),
            a !== Ki && ((t = Error(c(422), { cause: a })), Fa(pe(t, l))))
          : (a !== Ki && ((e = Error(c(423), { cause: a })), Fa(pe(e, l))),
            (t = t.current.alternate),
            (t.flags |= 65536),
            (u &= -u),
            (t.lanes |= u),
            (a = pe(a, l)),
            (u = Of(t.stateNode, a, u)),
            lf(t, u),
            Ot !== 4 && (Ot = 2)),
        !1
      );
    var n = Error(c(520), { cause: a });
    if (
      ((n = pe(n, l)),
      vu === null ? (vu = [n]) : vu.push(n),
      Ot !== 4 && (Ot = 2),
      e === null)
    )
      return !0;
    ((a = pe(a, l)), (l = e));
    do {
      switch (l.tag) {
        case 3:
          return (
            (l.flags |= 65536),
            (t = u & -u),
            (l.lanes |= t),
            (t = Of(l.stateNode, a, t)),
            lf(l, t),
            !1
          );
        case 1:
          if (
            ((e = l.type),
            (n = l.stateNode),
            (l.flags & 128) === 0 &&
              (typeof e.getDerivedStateFromError == "function" ||
                (n !== null &&
                  typeof n.componentDidCatch == "function" &&
                  (pl === null || !pl.has(n)))))
          )
            return (
              (l.flags |= 65536),
              (u &= -u),
              (l.lanes |= u),
              (u = ns(u)),
              is(u, t, l, a),
              lf(l, u),
              !1
            );
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Mf = Error(c(461)),
    Bt = !1;
  function Zt(t, e, l, a) {
    e.child = t === null ? ro(e, null, l, a) : Zl(e, t.child, l, a);
  }
  function fs(t, e, l, a, u) {
    l = l.render;
    var n = e.ref;
    if ("ref" in a) {
      var i = {};
      for (var r in a) r !== "ref" && (i[r] = a[r]);
    } else i = a;
    return (
      Gl(e),
      (a = rf(t, e, l, i, n, u)),
      (r = of()),
      t !== null && !Bt
        ? (sf(t, e, u), $e(t, e, u))
        : (it && r && Zi(e), (e.flags |= 1), Zt(t, e, a, u), e.child)
    );
  }
  function cs(t, e, l, a, u) {
    if (t === null) {
      var n = l.type;
      return typeof n == "function" &&
        !ji(n) &&
        n.defaultProps === void 0 &&
        l.compare === null
        ? ((e.tag = 15), (e.type = n), rs(t, e, n, a, u))
        : ((t = tn(l.type, null, a, e, e.mode, u)),
          (t.ref = e.ref),
          (t.return = e),
          (e.child = t));
    }
    if (((n = t.child), !qf(t, u))) {
      var i = n.memoizedProps;
      if (
        ((l = l.compare), (l = l !== null ? l : $a), l(i, a) && t.ref === e.ref)
      )
        return $e(t, e, u);
    }
    return (
      (e.flags |= 1),
      (t = Qe(n, a)),
      (t.ref = e.ref),
      (t.return = e),
      (e.child = t)
    );
  }
  function rs(t, e, l, a, u) {
    if (t !== null) {
      var n = t.memoizedProps;
      if ($a(n, a) && t.ref === e.ref)
        if (((Bt = !1), (e.pendingProps = a = n), qf(t, u)))
          (t.flags & 131072) !== 0 && (Bt = !0);
        else return ((e.lanes = t.lanes), $e(t, e, u));
    }
    return Df(t, e, l, a, u);
  }
  function os(t, e, l, a) {
    var u = a.children,
      n = t !== null ? t.memoizedState : null;
    if (
      (t === null &&
        e.stateNode === null &&
        (e.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      a.mode === "hidden")
    ) {
      if ((e.flags & 128) !== 0) {
        if (((n = n !== null ? n.baseLanes | l : l), t !== null)) {
          for (a = e.child = t.child, u = 0; a !== null; )
            ((u = u | a.lanes | a.childLanes), (a = a.sibling));
          a = u & ~n;
        } else ((a = 0), (e.child = null));
        return ss(t, e, n, l, a);
      }
      if ((l & 536870912) !== 0)
        ((e.memoizedState = { baseLanes: 0, cachePool: null }),
          t !== null && un(e, n !== null ? n.cachePool : null),
          n !== null ? ho(e, n) : uf(),
          mo(e));
      else
        return (
          (a = e.lanes = 536870912),
          ss(t, e, n !== null ? n.baseLanes | l : l, l, a)
        );
    } else
      n !== null
        ? (un(e, n.cachePool), ho(e, n), yl(), (e.memoizedState = null))
        : (t !== null && un(e, null), uf(), yl());
    return (Zt(t, e, u, l), e.child);
  }
  function ru(t, e) {
    return (
      (t !== null && t.tag === 22) ||
        e.stateNode !== null ||
        (e.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      e.sibling
    );
  }
  function ss(t, e, l, a, u) {
    var n = Ii();
    return (
      (n = n === null ? null : { parent: Ht._currentValue, pool: n }),
      (e.memoizedState = { baseLanes: l, cachePool: n }),
      t !== null && un(e, null),
      uf(),
      mo(e),
      t !== null && sa(t, e, a, !0),
      (e.childLanes = u),
      null
    );
  }
  function En(t, e) {
    return (
      (e = zn({ mode: e.mode, children: e.children }, t.mode)),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function ds(t, e, l) {
    return (
      Zl(e, t.child, null, l),
      (t = En(e, e.pendingProps)),
      (t.flags |= 2),
      re(e),
      (e.memoizedState = null),
      t
    );
  }
  function Im(t, e, l) {
    var a = e.pendingProps,
      u = (e.flags & 128) !== 0;
    if (((e.flags &= -129), t === null)) {
      if (it) {
        if (a.mode === "hidden")
          return ((t = En(e, a)), (e.lanes = 536870912), ru(null, t));
        if (
          (ff(e),
          (t = Et)
            ? ((t = Ad(t, Te)),
              (t = t !== null && t.data === "&" ? t : null),
              t !== null &&
                ((e.memoizedState = {
                  dehydrated: t,
                  treeContext: fl !== null ? { id: xe, overflow: Be } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = $r(t)),
                (l.return = e),
                (e.child = l),
                (Xt = e),
                (Et = null)))
            : (t = null),
          t === null)
        )
          throw rl(e);
        return ((e.lanes = 536870912), null);
      }
      return En(e, a);
    }
    var n = t.memoizedState;
    if (n !== null) {
      var i = n.dehydrated;
      if ((ff(e), u))
        if (e.flags & 256) ((e.flags &= -257), (e = ds(t, e, l)));
        else if (e.memoizedState !== null)
          ((e.child = t.child), (e.flags |= 128), (e = null));
        else throw Error(c(558));
      else if (
        (Bt || sa(t, e, l, !1), (u = (l & t.childLanes) !== 0), Bt || u)
      ) {
        if (
          ((a = bt),
          a !== null && ((i = er(a, l)), i !== 0 && i !== n.retryLane))
        )
          throw ((n.retryLane = i), Bl(t, i), le(a, t, i), Mf);
        (Nn(), (e = ds(t, e, l)));
      } else
        ((t = n.treeContext),
          (Et = Ae(i.nextSibling)),
          (Xt = e),
          (it = !0),
          (cl = null),
          (Te = !1),
          t !== null && Fr(e, t),
          (e = En(e, a)),
          (e.flags |= 4096));
      return e;
    }
    return (
      (t = Qe(t.child, { mode: a.mode, children: a.children })),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function Tn(t, e) {
    var l = e.ref;
    if (l === null) t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object") throw Error(c(284));
      (t === null || t.ref !== l) && (e.flags |= 4194816);
    }
  }
  function Df(t, e, l, a, u) {
    return (
      Gl(e),
      (l = rf(t, e, l, a, void 0, u)),
      (a = of()),
      t !== null && !Bt
        ? (sf(t, e, u), $e(t, e, u))
        : (it && a && Zi(e), (e.flags |= 1), Zt(t, e, l, u), e.child)
    );
  }
  function hs(t, e, l, a, u, n) {
    return (
      Gl(e),
      (e.updateQueue = null),
      (l = vo(e, a, l, u)),
      yo(t),
      (a = of()),
      t !== null && !Bt
        ? (sf(t, e, n), $e(t, e, n))
        : (it && a && Zi(e), (e.flags |= 1), Zt(t, e, l, n), e.child)
    );
  }
  function ms(t, e, l, a, u) {
    if ((Gl(e), e.stateNode === null)) {
      var n = fa,
        i = l.contextType;
      (typeof i == "object" && i !== null && (n = Qt(i)),
        (n = new l(a, n)),
        (e.memoizedState =
          n.state !== null && n.state !== void 0 ? n.state : null),
        (n.updater = _f),
        (e.stateNode = n),
        (n._reactInternals = e),
        (n = e.stateNode),
        (n.props = a),
        (n.state = e.memoizedState),
        (n.refs = {}),
        tf(e),
        (i = l.contextType),
        (n.context = typeof i == "object" && i !== null ? Qt(i) : fa),
        (n.state = e.memoizedState),
        (i = l.getDerivedStateFromProps),
        typeof i == "function" && (Rf(e, l, i, a), (n.state = e.memoizedState)),
        typeof l.getDerivedStateFromProps == "function" ||
          typeof n.getSnapshotBeforeUpdate == "function" ||
          (typeof n.UNSAFE_componentWillMount != "function" &&
            typeof n.componentWillMount != "function") ||
          ((i = n.state),
          typeof n.componentWillMount == "function" && n.componentWillMount(),
          typeof n.UNSAFE_componentWillMount == "function" &&
            n.UNSAFE_componentWillMount(),
          i !== n.state && _f.enqueueReplaceState(n, n.state, null),
          uu(e, a, n, u),
          au(),
          (n.state = e.memoizedState)),
        typeof n.componentDidMount == "function" && (e.flags |= 4194308),
        (a = !0));
    } else if (t === null) {
      n = e.stateNode;
      var r = e.memoizedProps,
        h = Kl(l, r);
      n.props = h;
      var T = n.context,
        M = l.contextType;
      ((i = fa), typeof M == "object" && M !== null && (i = Qt(M)));
      var C = l.getDerivedStateFromProps;
      ((M =
        typeof C == "function" ||
        typeof n.getSnapshotBeforeUpdate == "function"),
        (r = e.pendingProps !== r),
        M ||
          (typeof n.UNSAFE_componentWillReceiveProps != "function" &&
            typeof n.componentWillReceiveProps != "function") ||
          ((r || T !== i) && ts(e, n, a, i)),
        (sl = !1));
      var z = e.memoizedState;
      ((n.state = z),
        uu(e, a, n, u),
        au(),
        (T = e.memoizedState),
        r || z !== T || sl
          ? (typeof C == "function" && (Rf(e, l, C, a), (T = e.memoizedState)),
            (h = sl || Po(e, l, h, a, z, T, i))
              ? (M ||
                  (typeof n.UNSAFE_componentWillMount != "function" &&
                    typeof n.componentWillMount != "function") ||
                  (typeof n.componentWillMount == "function" &&
                    n.componentWillMount(),
                  typeof n.UNSAFE_componentWillMount == "function" &&
                    n.UNSAFE_componentWillMount()),
                typeof n.componentDidMount == "function" &&
                  (e.flags |= 4194308))
              : (typeof n.componentDidMount == "function" &&
                  (e.flags |= 4194308),
                (e.memoizedProps = a),
                (e.memoizedState = T)),
            (n.props = a),
            (n.state = T),
            (n.context = i),
            (a = h))
          : (typeof n.componentDidMount == "function" && (e.flags |= 4194308),
            (a = !1)));
    } else {
      ((n = e.stateNode),
        ef(t, e),
        (i = e.memoizedProps),
        (M = Kl(l, i)),
        (n.props = M),
        (C = e.pendingProps),
        (z = n.context),
        (T = l.contextType),
        (h = fa),
        typeof T == "object" && T !== null && (h = Qt(T)),
        (r = l.getDerivedStateFromProps),
        (T =
          typeof r == "function" ||
          typeof n.getSnapshotBeforeUpdate == "function") ||
          (typeof n.UNSAFE_componentWillReceiveProps != "function" &&
            typeof n.componentWillReceiveProps != "function") ||
          ((i !== C || z !== h) && ts(e, n, a, h)),
        (sl = !1),
        (z = e.memoizedState),
        (n.state = z),
        uu(e, a, n, u),
        au());
      var R = e.memoizedState;
      i !== C ||
      z !== R ||
      sl ||
      (t !== null && t.dependencies !== null && ln(t.dependencies))
        ? (typeof r == "function" && (Rf(e, l, r, a), (R = e.memoizedState)),
          (M =
            sl ||
            Po(e, l, M, a, z, R, h) ||
            (t !== null && t.dependencies !== null && ln(t.dependencies)))
            ? (T ||
                (typeof n.UNSAFE_componentWillUpdate != "function" &&
                  typeof n.componentWillUpdate != "function") ||
                (typeof n.componentWillUpdate == "function" &&
                  n.componentWillUpdate(a, R, h),
                typeof n.UNSAFE_componentWillUpdate == "function" &&
                  n.UNSAFE_componentWillUpdate(a, R, h)),
              typeof n.componentDidUpdate == "function" && (e.flags |= 4),
              typeof n.getSnapshotBeforeUpdate == "function" &&
                (e.flags |= 1024))
            : (typeof n.componentDidUpdate != "function" ||
                (i === t.memoizedProps && z === t.memoizedState) ||
                (e.flags |= 4),
              typeof n.getSnapshotBeforeUpdate != "function" ||
                (i === t.memoizedProps && z === t.memoizedState) ||
                (e.flags |= 1024),
              (e.memoizedProps = a),
              (e.memoizedState = R)),
          (n.props = a),
          (n.state = R),
          (n.context = h),
          (a = M))
        : (typeof n.componentDidUpdate != "function" ||
            (i === t.memoizedProps && z === t.memoizedState) ||
            (e.flags |= 4),
          typeof n.getSnapshotBeforeUpdate != "function" ||
            (i === t.memoizedProps && z === t.memoizedState) ||
            (e.flags |= 1024),
          (a = !1));
    }
    return (
      (n = a),
      Tn(t, e),
      (a = (e.flags & 128) !== 0),
      n || a
        ? ((n = e.stateNode),
          (l =
            a && typeof l.getDerivedStateFromError != "function"
              ? null
              : n.render()),
          (e.flags |= 1),
          t !== null && a
            ? ((e.child = Zl(e, t.child, null, u)),
              (e.child = Zl(e, null, l, u)))
            : Zt(t, e, l, u),
          (e.memoizedState = n.state),
          (t = e.child))
        : (t = $e(t, e, u)),
      t
    );
  }
  function ys(t, e, l, a) {
    return (Yl(), (e.flags |= 256), Zt(t, e, l, a), e.child);
  }
  var Uf = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function Cf(t) {
    return { baseLanes: t, cachePool: ao() };
  }
  function Nf(t, e, l) {
    return ((t = t !== null ? t.childLanes & ~l : 0), e && (t |= se), t);
  }
  function vs(t, e, l) {
    var a = e.pendingProps,
      u = !1,
      n = (e.flags & 128) !== 0,
      i;
    if (
      ((i = n) ||
        (i =
          t !== null && t.memoizedState === null ? !1 : (Ut.current & 2) !== 0),
      i && ((u = !0), (e.flags &= -129)),
      (i = (e.flags & 32) !== 0),
      (e.flags &= -33),
      t === null)
    ) {
      if (it) {
        if (
          (u ? ml(e) : yl(),
          (t = Et)
            ? ((t = Ad(t, Te)),
              (t = t !== null && t.data !== "&" ? t : null),
              t !== null &&
                ((e.memoizedState = {
                  dehydrated: t,
                  treeContext: fl !== null ? { id: xe, overflow: Be } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = $r(t)),
                (l.return = e),
                (e.child = l),
                (Xt = e),
                (Et = null)))
            : (t = null),
          t === null)
        )
          throw rl(e);
        return (mc(t) ? (e.lanes = 32) : (e.lanes = 536870912), null);
      }
      var r = a.children;
      return (
        (a = a.fallback),
        u
          ? (yl(),
            (u = e.mode),
            (r = zn({ mode: "hidden", children: r }, u)),
            (a = ql(a, u, l, null)),
            (r.return = e),
            (a.return = e),
            (r.sibling = a),
            (e.child = r),
            (a = e.child),
            (a.memoizedState = Cf(l)),
            (a.childLanes = Nf(t, i, l)),
            (e.memoizedState = Uf),
            ru(null, a))
          : (ml(e), Hf(e, r))
      );
    }
    var h = t.memoizedState;
    if (h !== null && ((r = h.dehydrated), r !== null)) {
      if (n)
        e.flags & 256
          ? (ml(e), (e.flags &= -257), (e = xf(t, e, l)))
          : e.memoizedState !== null
            ? (yl(), (e.child = t.child), (e.flags |= 128), (e = null))
            : (yl(),
              (r = a.fallback),
              (u = e.mode),
              (a = zn({ mode: "visible", children: a.children }, u)),
              (r = ql(r, u, l, null)),
              (r.flags |= 2),
              (a.return = e),
              (r.return = e),
              (a.sibling = r),
              (e.child = a),
              Zl(e, t.child, null, l),
              (a = e.child),
              (a.memoizedState = Cf(l)),
              (a.childLanes = Nf(t, i, l)),
              (e.memoizedState = Uf),
              (e = ru(null, a)));
      else if ((ml(e), mc(r))) {
        if (((i = r.nextSibling && r.nextSibling.dataset), i)) var T = i.dgst;
        ((i = T),
          (a = Error(c(419))),
          (a.stack = ""),
          (a.digest = i),
          Fa({ value: a, source: null, stack: null }),
          (e = xf(t, e, l)));
      } else if (
        (Bt || sa(t, e, l, !1), (i = (l & t.childLanes) !== 0), Bt || i)
      ) {
        if (
          ((i = bt),
          i !== null && ((a = er(i, l)), a !== 0 && a !== h.retryLane))
        )
          throw ((h.retryLane = a), Bl(t, a), le(i, t, a), Mf);
        (hc(r) || Nn(), (e = xf(t, e, l)));
      } else
        hc(r)
          ? ((e.flags |= 192), (e.child = t.child), (e = null))
          : ((t = h.treeContext),
            (Et = Ae(r.nextSibling)),
            (Xt = e),
            (it = !0),
            (cl = null),
            (Te = !1),
            t !== null && Fr(e, t),
            (e = Hf(e, a.children)),
            (e.flags |= 4096));
      return e;
    }
    return u
      ? (yl(),
        (r = a.fallback),
        (u = e.mode),
        (h = t.child),
        (T = h.sibling),
        (a = Qe(h, { mode: "hidden", children: a.children })),
        (a.subtreeFlags = h.subtreeFlags & 65011712),
        T !== null ? (r = Qe(T, r)) : ((r = ql(r, u, l, null)), (r.flags |= 2)),
        (r.return = e),
        (a.return = e),
        (a.sibling = r),
        (e.child = a),
        ru(null, a),
        (a = e.child),
        (r = t.child.memoizedState),
        r === null
          ? (r = Cf(l))
          : ((u = r.cachePool),
            u !== null
              ? ((h = Ht._currentValue),
                (u = u.parent !== h ? { parent: h, pool: h } : u))
              : (u = ao()),
            (r = { baseLanes: r.baseLanes | l, cachePool: u })),
        (a.memoizedState = r),
        (a.childLanes = Nf(t, i, l)),
        (e.memoizedState = Uf),
        ru(t.child, a))
      : (ml(e),
        (l = t.child),
        (t = l.sibling),
        (l = Qe(l, { mode: "visible", children: a.children })),
        (l.return = e),
        (l.sibling = null),
        t !== null &&
          ((i = e.deletions),
          i === null ? ((e.deletions = [t]), (e.flags |= 16)) : i.push(t)),
        (e.child = l),
        (e.memoizedState = null),
        l);
  }
  function Hf(t, e) {
    return (
      (e = zn({ mode: "visible", children: e }, t.mode)),
      (e.return = t),
      (t.child = e)
    );
  }
  function zn(t, e) {
    return ((t = fe(22, t, null, e)), (t.lanes = 0), t);
  }
  function xf(t, e, l) {
    return (
      Zl(e, t.child, null, l),
      (t = Hf(e, e.pendingProps.children)),
      (t.flags |= 2),
      (e.memoizedState = null),
      t
    );
  }
  function gs(t, e, l) {
    t.lanes |= e;
    var a = t.alternate;
    (a !== null && (a.lanes |= e), $i(t.return, e, l));
  }
  function Bf(t, e, l, a, u, n) {
    var i = t.memoizedState;
    i === null
      ? (t.memoizedState = {
          isBackwards: e,
          rendering: null,
          renderingStartTime: 0,
          last: a,
          tail: l,
          tailMode: u,
          treeForkCount: n,
        })
      : ((i.isBackwards = e),
        (i.rendering = null),
        (i.renderingStartTime = 0),
        (i.last = a),
        (i.tail = l),
        (i.tailMode = u),
        (i.treeForkCount = n));
  }
  function Ss(t, e, l) {
    var a = e.pendingProps,
      u = a.revealOrder,
      n = a.tail;
    a = a.children;
    var i = Ut.current,
      r = (i & 2) !== 0;
    if (
      (r ? ((i = (i & 1) | 2), (e.flags |= 128)) : (i &= 1),
      Y(Ut, i),
      Zt(t, e, a, l),
      (a = it ? ka : 0),
      !r && t !== null && (t.flags & 128) !== 0)
    )
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13) t.memoizedState !== null && gs(t, l, e);
        else if (t.tag === 19) gs(t, l, e);
        else if (t.child !== null) {
          ((t.child.return = t), (t = t.child));
          continue;
        }
        if (t === e) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) break t;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    switch (u) {
      case "forwards":
        for (l = e.child, u = null; l !== null; )
          ((t = l.alternate),
            t !== null && sn(t) === null && (u = l),
            (l = l.sibling));
        ((l = u),
          l === null
            ? ((u = e.child), (e.child = null))
            : ((u = l.sibling), (l.sibling = null)),
          Bf(e, !1, u, l, n, a));
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (l = null, u = e.child, e.child = null; u !== null; ) {
          if (((t = u.alternate), t !== null && sn(t) === null)) {
            e.child = u;
            break;
          }
          ((t = u.sibling), (u.sibling = l), (l = u), (u = t));
        }
        Bf(e, !0, l, null, n, a);
        break;
      case "together":
        Bf(e, !1, null, null, void 0, a);
        break;
      default:
        e.memoizedState = null;
    }
    return e.child;
  }
  function $e(t, e, l) {
    if (
      (t !== null && (e.dependencies = t.dependencies),
      (Sl |= e.lanes),
      (l & e.childLanes) === 0)
    )
      if (t !== null) {
        if ((sa(t, e, l, !1), (l & e.childLanes) === 0)) return null;
      } else return null;
    if (t !== null && e.child !== t.child) throw Error(c(153));
    if (e.child !== null) {
      for (
        t = e.child, l = Qe(t, t.pendingProps), e.child = l, l.return = e;
        t.sibling !== null;
      )
        ((t = t.sibling),
          (l = l.sibling = Qe(t, t.pendingProps)),
          (l.return = e));
      l.sibling = null;
    }
    return e.child;
  }
  function qf(t, e) {
    return (t.lanes & e) !== 0
      ? !0
      : ((t = t.dependencies), !!(t !== null && ln(t)));
  }
  function Pm(t, e, l) {
    switch (e.tag) {
      case 3:
        ($t(e, e.stateNode.containerInfo),
          ol(e, Ht, t.memoizedState.cache),
          Yl());
        break;
      case 27:
      case 5:
        Ba(e);
        break;
      case 4:
        $t(e, e.stateNode.containerInfo);
        break;
      case 10:
        ol(e, e.type, e.memoizedProps.value);
        break;
      case 31:
        if (e.memoizedState !== null) return ((e.flags |= 128), ff(e), null);
        break;
      case 13:
        var a = e.memoizedState;
        if (a !== null)
          return a.dehydrated !== null
            ? (ml(e), (e.flags |= 128), null)
            : (l & e.child.childLanes) !== 0
              ? vs(t, e, l)
              : (ml(e), (t = $e(t, e, l)), t !== null ? t.sibling : null);
        ml(e);
        break;
      case 19:
        var u = (t.flags & 128) !== 0;
        if (
          ((a = (l & e.childLanes) !== 0),
          a || (sa(t, e, l, !1), (a = (l & e.childLanes) !== 0)),
          u)
        ) {
          if (a) return Ss(t, e, l);
          e.flags |= 128;
        }
        if (
          ((u = e.memoizedState),
          u !== null &&
            ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
          Y(Ut, Ut.current),
          a)
        )
          break;
        return null;
      case 22:
        return ((e.lanes = 0), os(t, e, l, e.pendingProps));
      case 24:
        ol(e, Ht, t.memoizedState.cache);
    }
    return $e(t, e, l);
  }
  function ps(t, e, l) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps) Bt = !0;
      else {
        if (!qf(t, l) && (e.flags & 128) === 0) return ((Bt = !1), Pm(t, e, l));
        Bt = (t.flags & 131072) !== 0;
      }
    else ((Bt = !1), it && (e.flags & 1048576) !== 0 && kr(e, ka, e.index));
    switch (((e.lanes = 0), e.tag)) {
      case 16:
        t: {
          var a = e.pendingProps;
          if (((t = Xl(e.elementType)), (e.type = t), typeof t == "function"))
            ji(t)
              ? ((a = Kl(t, a)), (e.tag = 1), (e = ms(null, e, t, a, l)))
              : ((e.tag = 0), (e = Df(null, e, t, a, l)));
          else {
            if (t != null) {
              var u = t.$$typeof;
              if (u === gt) {
                ((e.tag = 11), (e = fs(null, e, t, a, l)));
                break t;
              } else if (u === W) {
                ((e.tag = 14), (e = cs(null, e, t, a, l)));
                break t;
              }
            }
            throw ((e = ye(t) || t), Error(c(306, e, "")));
          }
        }
        return e;
      case 0:
        return Df(t, e, e.type, e.pendingProps, l);
      case 1:
        return ((a = e.type), (u = Kl(a, e.pendingProps)), ms(t, e, a, u, l));
      case 3:
        t: {
          if (($t(e, e.stateNode.containerInfo), t === null))
            throw Error(c(387));
          a = e.pendingProps;
          var n = e.memoizedState;
          ((u = n.element), ef(t, e), uu(e, a, null, l));
          var i = e.memoizedState;
          if (
            ((a = i.cache),
            ol(e, Ht, a),
            a !== n.cache && Wi(e, [Ht], l, !0),
            au(),
            (a = i.element),
            n.isDehydrated)
          )
            if (
              ((n = { element: a, isDehydrated: !1, cache: i.cache }),
              (e.updateQueue.baseState = n),
              (e.memoizedState = n),
              e.flags & 256)
            ) {
              e = ys(t, e, a, l);
              break t;
            } else if (a !== u) {
              ((u = pe(Error(c(424)), e)), Fa(u), (e = ys(t, e, a, l)));
              break t;
            } else
              for (
                t = e.stateNode.containerInfo,
                  t.nodeType === 9
                    ? (t = t.body)
                    : (t = t.nodeName === "HTML" ? t.ownerDocument.body : t),
                  Et = Ae(t.firstChild),
                  Xt = e,
                  it = !0,
                  cl = null,
                  Te = !0,
                  l = ro(e, null, a, l),
                  e.child = l;
                l;
              )
                ((l.flags = (l.flags & -3) | 4096), (l = l.sibling));
          else {
            if ((Yl(), a === u)) {
              e = $e(t, e, l);
              break t;
            }
            Zt(t, e, a, l);
          }
          e = e.child;
        }
        return e;
      case 26:
        return (
          Tn(t, e),
          t === null
            ? (l = Ud(e.type, null, e.pendingProps, null))
              ? (e.memoizedState = l)
              : it ||
                ((l = e.type),
                (t = e.pendingProps),
                (a = Gn(et.current).createElement(l)),
                (a[jt] = e),
                (a[kt] = t),
                Vt(a, l, t),
                Lt(a),
                (e.stateNode = a))
            : (e.memoizedState = Ud(
                e.type,
                t.memoizedProps,
                e.pendingProps,
                t.memoizedState,
              )),
          null
        );
      case 27:
        return (
          Ba(e),
          t === null &&
            it &&
            ((a = e.stateNode = Od(e.type, e.pendingProps, et.current)),
            (Xt = e),
            (Te = !0),
            (u = Et),
            zl(e.type) ? ((yc = u), (Et = Ae(a.firstChild))) : (Et = u)),
          Zt(t, e, e.pendingProps.children, l),
          Tn(t, e),
          t === null && (e.flags |= 4194304),
          e.child
        );
      case 5:
        return (
          t === null &&
            it &&
            ((u = a = Et) &&
              ((a = Dy(a, e.type, e.pendingProps, Te)),
              a !== null
                ? ((e.stateNode = a),
                  (Xt = e),
                  (Et = Ae(a.firstChild)),
                  (Te = !1),
                  (u = !0))
                : (u = !1)),
            u || rl(e)),
          Ba(e),
          (u = e.type),
          (n = e.pendingProps),
          (i = t !== null ? t.memoizedProps : null),
          (a = n.children),
          oc(u, n) ? (a = null) : i !== null && oc(u, i) && (e.flags |= 32),
          e.memoizedState !== null &&
            ((u = rf(t, e, Vm, null, null, l)), (Au._currentValue = u)),
          Tn(t, e),
          Zt(t, e, a, l),
          e.child
        );
      case 6:
        return (
          t === null &&
            it &&
            ((t = l = Et) &&
              ((l = Uy(l, e.pendingProps, Te)),
              l !== null
                ? ((e.stateNode = l), (Xt = e), (Et = null), (t = !0))
                : (t = !1)),
            t || rl(e)),
          null
        );
      case 13:
        return vs(t, e, l);
      case 4:
        return (
          $t(e, e.stateNode.containerInfo),
          (a = e.pendingProps),
          t === null ? (e.child = Zl(e, null, a, l)) : Zt(t, e, a, l),
          e.child
        );
      case 11:
        return fs(t, e, e.type, e.pendingProps, l);
      case 7:
        return (Zt(t, e, e.pendingProps, l), e.child);
      case 8:
        return (Zt(t, e, e.pendingProps.children, l), e.child);
      case 12:
        return (Zt(t, e, e.pendingProps.children, l), e.child);
      case 10:
        return (
          (a = e.pendingProps),
          ol(e, e.type, a.value),
          Zt(t, e, a.children, l),
          e.child
        );
      case 9:
        return (
          (u = e.type._context),
          (a = e.pendingProps.children),
          Gl(e),
          (u = Qt(u)),
          (a = a(u)),
          (e.flags |= 1),
          Zt(t, e, a, l),
          e.child
        );
      case 14:
        return cs(t, e, e.type, e.pendingProps, l);
      case 15:
        return rs(t, e, e.type, e.pendingProps, l);
      case 19:
        return Ss(t, e, l);
      case 31:
        return Im(t, e, l);
      case 22:
        return os(t, e, l, e.pendingProps);
      case 24:
        return (
          Gl(e),
          (a = Qt(Ht)),
          t === null
            ? ((u = Ii()),
              u === null &&
                ((u = bt),
                (n = ki()),
                (u.pooledCache = n),
                n.refCount++,
                n !== null && (u.pooledCacheLanes |= l),
                (u = n)),
              (e.memoizedState = { parent: a, cache: u }),
              tf(e),
              ol(e, Ht, u))
            : ((t.lanes & l) !== 0 && (ef(t, e), uu(e, null, null, l), au()),
              (u = t.memoizedState),
              (n = e.memoizedState),
              u.parent !== a
                ? ((u = { parent: a, cache: a }),
                  (e.memoizedState = u),
                  e.lanes === 0 &&
                    (e.memoizedState = e.updateQueue.baseState = u),
                  ol(e, Ht, a))
                : ((a = n.cache),
                  ol(e, Ht, a),
                  a !== u.cache && Wi(e, [Ht], l, !0))),
          Zt(t, e, e.pendingProps.children, l),
          e.child
        );
      case 29:
        throw e.pendingProps;
    }
    throw Error(c(156, e.tag));
  }
  function We(t) {
    t.flags |= 4;
  }
  function Yf(t, e, l, a, u) {
    if (((e = (t.mode & 32) !== 0) && (e = !1), e)) {
      if (((t.flags |= 16777216), (u & 335544128) === u))
        if (t.stateNode.complete) t.flags |= 8192;
        else if (Js()) t.flags |= 8192;
        else throw ((Ql = fn), Pi);
    } else t.flags &= -16777217;
  }
  function bs(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (((t.flags |= 16777216), !Bd(e)))
      if (Js()) t.flags |= 8192;
      else throw ((Ql = fn), Pi);
  }
  function An(t, e) {
    (e !== null && (t.flags |= 4),
      t.flags & 16384 &&
        ((e = t.tag !== 22 ? Ic() : 536870912), (t.lanes |= e), (za |= e)));
  }
  function ou(t, e) {
    if (!it)
      switch (t.tailMode) {
        case "hidden":
          e = t.tail;
          for (var l = null; e !== null; )
            (e.alternate !== null && (l = e), (e = e.sibling));
          l === null ? (t.tail = null) : (l.sibling = null);
          break;
        case "collapsed":
          l = t.tail;
          for (var a = null; l !== null; )
            (l.alternate !== null && (a = l), (l = l.sibling));
          a === null
            ? e || t.tail === null
              ? (t.tail = null)
              : (t.tail.sibling = null)
            : (a.sibling = null);
      }
  }
  function Tt(t) {
    var e = t.alternate !== null && t.alternate.child === t.child,
      l = 0,
      a = 0;
    if (e)
      for (var u = t.child; u !== null; )
        ((l |= u.lanes | u.childLanes),
          (a |= u.subtreeFlags & 65011712),
          (a |= u.flags & 65011712),
          (u.return = t),
          (u = u.sibling));
    else
      for (u = t.child; u !== null; )
        ((l |= u.lanes | u.childLanes),
          (a |= u.subtreeFlags),
          (a |= u.flags),
          (u.return = t),
          (u = u.sibling));
    return ((t.subtreeFlags |= a), (t.childLanes = l), e);
  }
  function ty(t, e, l) {
    var a = e.pendingProps;
    switch ((Vi(e), e.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (Tt(e), null);
      case 1:
        return (Tt(e), null);
      case 3:
        return (
          (l = e.stateNode),
          (a = null),
          t !== null && (a = t.memoizedState.cache),
          e.memoizedState.cache !== a && (e.flags |= 2048),
          Ke(Ht),
          Dt(),
          l.pendingContext &&
            ((l.context = l.pendingContext), (l.pendingContext = null)),
          (t === null || t.child === null) &&
            (oa(e)
              ? We(e)
              : t === null ||
                (t.memoizedState.isDehydrated && (e.flags & 256) === 0) ||
                ((e.flags |= 1024), Ji())),
          Tt(e),
          null
        );
      case 26:
        var u = e.type,
          n = e.memoizedState;
        return (
          t === null
            ? (We(e),
              n !== null ? (Tt(e), bs(e, n)) : (Tt(e), Yf(e, u, null, a, l)))
            : n
              ? n !== t.memoizedState
                ? (We(e), Tt(e), bs(e, n))
                : (Tt(e), (e.flags &= -16777217))
              : ((t = t.memoizedProps),
                t !== a && We(e),
                Tt(e),
                Yf(e, u, t, a, l)),
          null
        );
      case 27:
        if (
          (xu(e),
          (l = et.current),
          (u = e.type),
          t !== null && e.stateNode != null)
        )
          t.memoizedProps !== a && We(e);
        else {
          if (!a) {
            if (e.stateNode === null) throw Error(c(166));
            return (Tt(e), null);
          }
          ((t = j.current),
            oa(e) ? Ir(e) : ((t = Od(u, a, l)), (e.stateNode = t), We(e)));
        }
        return (Tt(e), null);
      case 5:
        if ((xu(e), (u = e.type), t !== null && e.stateNode != null))
          t.memoizedProps !== a && We(e);
        else {
          if (!a) {
            if (e.stateNode === null) throw Error(c(166));
            return (Tt(e), null);
          }
          if (((n = j.current), oa(e))) Ir(e);
          else {
            var i = Gn(et.current);
            switch (n) {
              case 1:
                n = i.createElementNS("http://www.w3.org/2000/svg", u);
                break;
              case 2:
                n = i.createElementNS("http://www.w3.org/1998/Math/MathML", u);
                break;
              default:
                switch (u) {
                  case "svg":
                    n = i.createElementNS("http://www.w3.org/2000/svg", u);
                    break;
                  case "math":
                    n = i.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u,
                    );
                    break;
                  case "script":
                    ((n = i.createElement("div")),
                      (n.innerHTML = "<script><\/script>"),
                      (n = n.removeChild(n.firstChild)));
                    break;
                  case "select":
                    ((n =
                      typeof a.is == "string"
                        ? i.createElement("select", { is: a.is })
                        : i.createElement("select")),
                      a.multiple
                        ? (n.multiple = !0)
                        : a.size && (n.size = a.size));
                    break;
                  default:
                    n =
                      typeof a.is == "string"
                        ? i.createElement(u, { is: a.is })
                        : i.createElement(u);
                }
            }
            ((n[jt] = e), (n[kt] = a));
            t: for (i = e.child; i !== null; ) {
              if (i.tag === 5 || i.tag === 6) n.appendChild(i.stateNode);
              else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
                ((i.child.return = i), (i = i.child));
                continue;
              }
              if (i === e) break t;
              for (; i.sibling === null; ) {
                if (i.return === null || i.return === e) break t;
                i = i.return;
              }
              ((i.sibling.return = i.return), (i = i.sibling));
            }
            e.stateNode = n;
            t: switch ((Vt(n, u, a), u)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus;
                break t;
              case "img":
                a = !0;
                break t;
              default:
                a = !1;
            }
            a && We(e);
          }
        }
        return (
          Tt(e),
          Yf(e, e.type, t === null ? null : t.memoizedProps, e.pendingProps, l),
          null
        );
      case 6:
        if (t && e.stateNode != null) t.memoizedProps !== a && We(e);
        else {
          if (typeof a != "string" && e.stateNode === null) throw Error(c(166));
          if (((t = et.current), oa(e))) {
            if (
              ((t = e.stateNode),
              (l = e.memoizedProps),
              (a = null),
              (u = Xt),
              u !== null)
            )
              switch (u.tag) {
                case 27:
                case 5:
                  a = u.memoizedProps;
              }
            ((t[jt] = e),
              (t = !!(
                t.nodeValue === l ||
                (a !== null && a.suppressHydrationWarning === !0) ||
                vd(t.nodeValue, l)
              )),
              t || rl(e, !0));
          } else
            ((t = Gn(t).createTextNode(a)), (t[jt] = e), (e.stateNode = t));
        }
        return (Tt(e), null);
      case 31:
        if (((l = e.memoizedState), t === null || t.memoizedState !== null)) {
          if (((a = oa(e)), l !== null)) {
            if (t === null) {
              if (!a) throw Error(c(318));
              if (
                ((t = e.memoizedState),
                (t = t !== null ? t.dehydrated : null),
                !t)
              )
                throw Error(c(557));
              t[jt] = e;
            } else
              (Yl(),
                (e.flags & 128) === 0 && (e.memoizedState = null),
                (e.flags |= 4));
            (Tt(e), (t = !1));
          } else
            ((l = Ji()),
              t !== null &&
                t.memoizedState !== null &&
                (t.memoizedState.hydrationErrors = l),
              (t = !0));
          if (!t) return e.flags & 256 ? (re(e), e) : (re(e), null);
          if ((e.flags & 128) !== 0) throw Error(c(558));
        }
        return (Tt(e), null);
      case 13:
        if (
          ((a = e.memoizedState),
          t === null ||
            (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
        ) {
          if (((u = oa(e)), a !== null && a.dehydrated !== null)) {
            if (t === null) {
              if (!u) throw Error(c(318));
              if (
                ((u = e.memoizedState),
                (u = u !== null ? u.dehydrated : null),
                !u)
              )
                throw Error(c(317));
              u[jt] = e;
            } else
              (Yl(),
                (e.flags & 128) === 0 && (e.memoizedState = null),
                (e.flags |= 4));
            (Tt(e), (u = !1));
          } else
            ((u = Ji()),
              t !== null &&
                t.memoizedState !== null &&
                (t.memoizedState.hydrationErrors = u),
              (u = !0));
          if (!u) return e.flags & 256 ? (re(e), e) : (re(e), null);
        }
        return (
          re(e),
          (e.flags & 128) !== 0
            ? ((e.lanes = l), e)
            : ((l = a !== null),
              (t = t !== null && t.memoizedState !== null),
              l &&
                ((a = e.child),
                (u = null),
                a.alternate !== null &&
                  a.alternate.memoizedState !== null &&
                  a.alternate.memoizedState.cachePool !== null &&
                  (u = a.alternate.memoizedState.cachePool.pool),
                (n = null),
                a.memoizedState !== null &&
                  a.memoizedState.cachePool !== null &&
                  (n = a.memoizedState.cachePool.pool),
                n !== u && (a.flags |= 2048)),
              l !== t && l && (e.child.flags |= 8192),
              An(e, e.updateQueue),
              Tt(e),
              null)
        );
      case 4:
        return (Dt(), t === null && nc(e.stateNode.containerInfo), Tt(e), null);
      case 10:
        return (Ke(e.type), Tt(e), null);
      case 19:
        if ((H(Ut), (a = e.memoizedState), a === null)) return (Tt(e), null);
        if (((u = (e.flags & 128) !== 0), (n = a.rendering), n === null))
          if (u) ou(a, !1);
          else {
            if (Ot !== 0 || (t !== null && (t.flags & 128) !== 0))
              for (t = e.child; t !== null; ) {
                if (((n = sn(t)), n !== null)) {
                  for (
                    e.flags |= 128,
                      ou(a, !1),
                      t = n.updateQueue,
                      e.updateQueue = t,
                      An(e, t),
                      e.subtreeFlags = 0,
                      t = l,
                      l = e.child;
                    l !== null;
                  )
                    (wr(l, t), (l = l.sibling));
                  return (
                    Y(Ut, (Ut.current & 1) | 2),
                    it && Ze(e, a.treeForkCount),
                    e.child
                  );
                }
                t = t.sibling;
              }
            a.tail !== null &&
              ae() > Dn &&
              ((e.flags |= 128), (u = !0), ou(a, !1), (e.lanes = 4194304));
          }
        else {
          if (!u)
            if (((t = sn(n)), t !== null)) {
              if (
                ((e.flags |= 128),
                (u = !0),
                (t = t.updateQueue),
                (e.updateQueue = t),
                An(e, t),
                ou(a, !0),
                a.tail === null &&
                  a.tailMode === "hidden" &&
                  !n.alternate &&
                  !it)
              )
                return (Tt(e), null);
            } else
              2 * ae() - a.renderingStartTime > Dn &&
                l !== 536870912 &&
                ((e.flags |= 128), (u = !0), ou(a, !1), (e.lanes = 4194304));
          a.isBackwards
            ? ((n.sibling = e.child), (e.child = n))
            : ((t = a.last),
              t !== null ? (t.sibling = n) : (e.child = n),
              (a.last = n));
        }
        return a.tail !== null
          ? ((t = a.tail),
            (a.rendering = t),
            (a.tail = t.sibling),
            (a.renderingStartTime = ae()),
            (t.sibling = null),
            (l = Ut.current),
            Y(Ut, u ? (l & 1) | 2 : l & 1),
            it && Ze(e, a.treeForkCount),
            t)
          : (Tt(e), null);
      case 22:
      case 23:
        return (
          re(e),
          nf(),
          (a = e.memoizedState !== null),
          t !== null
            ? (t.memoizedState !== null) !== a && (e.flags |= 8192)
            : a && (e.flags |= 8192),
          a
            ? (l & 536870912) !== 0 &&
              (e.flags & 128) === 0 &&
              (Tt(e), e.subtreeFlags & 6 && (e.flags |= 8192))
            : Tt(e),
          (l = e.updateQueue),
          l !== null && An(e, l.retryQueue),
          (l = null),
          t !== null &&
            t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (l = t.memoizedState.cachePool.pool),
          (a = null),
          e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (a = e.memoizedState.cachePool.pool),
          a !== l && (e.flags |= 2048),
          t !== null && H(jl),
          null
        );
      case 24:
        return (
          (l = null),
          t !== null && (l = t.memoizedState.cache),
          e.memoizedState.cache !== l && (e.flags |= 2048),
          Ke(Ht),
          Tt(e),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(c(156, e.tag));
  }
  function ey(t, e) {
    switch ((Vi(e), e.tag)) {
      case 1:
        return (
          (t = e.flags),
          t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 3:
        return (
          Ke(Ht),
          Dt(),
          (t = e.flags),
          (t & 65536) !== 0 && (t & 128) === 0
            ? ((e.flags = (t & -65537) | 128), e)
            : null
        );
      case 26:
      case 27:
      case 5:
        return (xu(e), null);
      case 31:
        if (e.memoizedState !== null) {
          if ((re(e), e.alternate === null)) throw Error(c(340));
          Yl();
        }
        return (
          (t = e.flags),
          t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 13:
        if (
          (re(e), (t = e.memoizedState), t !== null && t.dehydrated !== null)
        ) {
          if (e.alternate === null) throw Error(c(340));
          Yl();
        }
        return (
          (t = e.flags),
          t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 19:
        return (H(Ut), null);
      case 4:
        return (Dt(), null);
      case 10:
        return (Ke(e.type), null);
      case 22:
      case 23:
        return (
          re(e),
          nf(),
          t !== null && H(jl),
          (t = e.flags),
          t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 24:
        return (Ke(Ht), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Es(t, e) {
    switch ((Vi(e), e.tag)) {
      case 3:
        (Ke(Ht), Dt());
        break;
      case 26:
      case 27:
      case 5:
        xu(e);
        break;
      case 4:
        Dt();
        break;
      case 31:
        e.memoizedState !== null && re(e);
        break;
      case 13:
        re(e);
        break;
      case 19:
        H(Ut);
        break;
      case 10:
        Ke(e.type);
        break;
      case 22:
      case 23:
        (re(e), nf(), t !== null && H(jl));
        break;
      case 24:
        Ke(Ht);
    }
  }
  function su(t, e) {
    try {
      var l = e.updateQueue,
        a = l !== null ? l.lastEffect : null;
      if (a !== null) {
        var u = a.next;
        l = u;
        do {
          if ((l.tag & t) === t) {
            a = void 0;
            var n = l.create,
              i = l.inst;
            ((a = n()), (i.destroy = a));
          }
          l = l.next;
        } while (l !== u);
      }
    } catch (r) {
      dt(e, e.return, r);
    }
  }
  function vl(t, e, l) {
    try {
      var a = e.updateQueue,
        u = a !== null ? a.lastEffect : null;
      if (u !== null) {
        var n = u.next;
        a = n;
        do {
          if ((a.tag & t) === t) {
            var i = a.inst,
              r = i.destroy;
            if (r !== void 0) {
              ((i.destroy = void 0), (u = e));
              var h = l,
                T = r;
              try {
                T();
              } catch (M) {
                dt(u, h, M);
              }
            }
          }
          a = a.next;
        } while (a !== n);
      }
    } catch (M) {
      dt(e, e.return, M);
    }
  }
  function Ts(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var l = t.stateNode;
      try {
        so(e, l);
      } catch (a) {
        dt(t, t.return, a);
      }
    }
  }
  function zs(t, e, l) {
    ((l.props = Kl(t.type, t.memoizedProps)), (l.state = t.memoizedState));
    try {
      l.componentWillUnmount();
    } catch (a) {
      dt(t, e, a);
    }
  }
  function du(t, e) {
    try {
      var l = t.ref;
      if (l !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var a = t.stateNode;
            break;
          case 30:
            a = t.stateNode;
            break;
          default:
            a = t.stateNode;
        }
        typeof l == "function" ? (t.refCleanup = l(a)) : (l.current = a);
      }
    } catch (u) {
      dt(t, e, u);
    }
  }
  function qe(t, e) {
    var l = t.ref,
      a = t.refCleanup;
    if (l !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (u) {
          dt(t, e, u);
        } finally {
          ((t.refCleanup = null),
            (t = t.alternate),
            t != null && (t.refCleanup = null));
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (u) {
          dt(t, e, u);
        }
      else l.current = null;
  }
  function As(t) {
    var e = t.type,
      l = t.memoizedProps,
      a = t.stateNode;
    try {
      t: switch (e) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          l.autoFocus && a.focus();
          break t;
        case "img":
          l.src ? (a.src = l.src) : l.srcSet && (a.srcset = l.srcSet);
      }
    } catch (u) {
      dt(t, t.return, u);
    }
  }
  function Lf(t, e, l) {
    try {
      var a = t.stateNode;
      (zy(a, t.type, l, e), (a[kt] = e));
    } catch (u) {
      dt(t, t.return, u);
    }
  }
  function Rs(t) {
    return (
      t.tag === 5 ||
      t.tag === 3 ||
      t.tag === 26 ||
      (t.tag === 27 && zl(t.type)) ||
      t.tag === 4
    );
  }
  function Gf(t) {
    t: for (;;) {
      for (; t.sibling === null; ) {
        if (t.return === null || Rs(t.return)) return null;
        t = t.return;
      }
      for (
        t.sibling.return = t.return, t = t.sibling;
        t.tag !== 5 && t.tag !== 6 && t.tag !== 18;
      ) {
        if (
          (t.tag === 27 && zl(t.type)) ||
          t.flags & 2 ||
          t.child === null ||
          t.tag === 4
        )
          continue t;
        ((t.child.return = t), (t = t.child));
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function jf(t, e, l) {
    var a = t.tag;
    if (a === 5 || a === 6)
      ((t = t.stateNode),
        e
          ? (l.nodeType === 9
              ? l.body
              : l.nodeName === "HTML"
                ? l.ownerDocument.body
                : l
            ).insertBefore(t, e)
          : ((e =
              l.nodeType === 9
                ? l.body
                : l.nodeName === "HTML"
                  ? l.ownerDocument.body
                  : l),
            e.appendChild(t),
            (l = l._reactRootContainer),
            l != null || e.onclick !== null || (e.onclick = je)));
    else if (
      a !== 4 &&
      (a === 27 && zl(t.type) && ((l = t.stateNode), (e = null)),
      (t = t.child),
      t !== null)
    )
      for (jf(t, e, l), t = t.sibling; t !== null; )
        (jf(t, e, l), (t = t.sibling));
  }
  function Rn(t, e, l) {
    var a = t.tag;
    if (a === 5 || a === 6)
      ((t = t.stateNode), e ? l.insertBefore(t, e) : l.appendChild(t));
    else if (
      a !== 4 &&
      (a === 27 && zl(t.type) && (l = t.stateNode), (t = t.child), t !== null)
    )
      for (Rn(t, e, l), t = t.sibling; t !== null; )
        (Rn(t, e, l), (t = t.sibling));
  }
  function _s(t) {
    var e = t.stateNode,
      l = t.memoizedProps;
    try {
      for (var a = t.type, u = e.attributes; u.length; )
        e.removeAttributeNode(u[0]);
      (Vt(e, a, l), (e[jt] = t), (e[kt] = l));
    } catch (n) {
      dt(t, t.return, n);
    }
  }
  var ke = !1,
    qt = !1,
    Xf = !1,
    Os = typeof WeakSet == "function" ? WeakSet : Set,
    Gt = null;
  function ly(t, e) {
    if (((t = t.containerInfo), (cc = Jn), (t = Lr(t)), Hi(t))) {
      if ("selectionStart" in t)
        var l = { start: t.selectionStart, end: t.selectionEnd };
      else
        t: {
          l = ((l = t.ownerDocument) && l.defaultView) || window;
          var a = l.getSelection && l.getSelection();
          if (a && a.rangeCount !== 0) {
            l = a.anchorNode;
            var u = a.anchorOffset,
              n = a.focusNode;
            a = a.focusOffset;
            try {
              (l.nodeType, n.nodeType);
            } catch {
              l = null;
              break t;
            }
            var i = 0,
              r = -1,
              h = -1,
              T = 0,
              M = 0,
              C = t,
              z = null;
            e: for (;;) {
              for (
                var R;
                C !== l || (u !== 0 && C.nodeType !== 3) || (r = i + u),
                  C !== n || (a !== 0 && C.nodeType !== 3) || (h = i + a),
                  C.nodeType === 3 && (i += C.nodeValue.length),
                  (R = C.firstChild) !== null;
              )
                ((z = C), (C = R));
              for (;;) {
                if (C === t) break e;
                if (
                  (z === l && ++T === u && (r = i),
                  z === n && ++M === a && (h = i),
                  (R = C.nextSibling) !== null)
                )
                  break;
                ((C = z), (z = C.parentNode));
              }
              C = R;
            }
            l = r === -1 || h === -1 ? null : { start: r, end: h };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (
      rc = { focusedElem: t, selectionRange: l }, Jn = !1, Gt = e;
      Gt !== null;
    )
      if (
        ((e = Gt), (t = e.child), (e.subtreeFlags & 1028) !== 0 && t !== null)
      )
        ((t.return = e), (Gt = t));
      else
        for (; Gt !== null; ) {
          switch (((e = Gt), (n = e.alternate), (t = e.flags), e.tag)) {
            case 0:
              if (
                (t & 4) !== 0 &&
                ((t = e.updateQueue),
                (t = t !== null ? t.events : null),
                t !== null)
              )
                for (l = 0; l < t.length; l++)
                  ((u = t[l]), (u.ref.impl = u.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && n !== null) {
                ((t = void 0),
                  (l = e),
                  (u = n.memoizedProps),
                  (n = n.memoizedState),
                  (a = l.stateNode));
                try {
                  var L = Kl(l.type, u);
                  ((t = a.getSnapshotBeforeUpdate(L, n)),
                    (a.__reactInternalSnapshotBeforeUpdate = t));
                } catch (V) {
                  dt(l, l.return, V);
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (
                  ((t = e.stateNode.containerInfo), (l = t.nodeType), l === 9)
                )
                  dc(t);
                else if (l === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      dc(t);
                      break;
                    default:
                      t.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((t & 1024) !== 0) throw Error(c(163));
          }
          if (((t = e.sibling), t !== null)) {
            ((t.return = e.return), (Gt = t));
            break;
          }
          Gt = e.return;
        }
  }
  function Ms(t, e, l) {
    var a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        (Ie(t, l), a & 4 && su(5, l));
        break;
      case 1:
        if ((Ie(t, l), a & 4))
          if (((t = l.stateNode), e === null))
            try {
              t.componentDidMount();
            } catch (i) {
              dt(l, l.return, i);
            }
          else {
            var u = Kl(l.type, e.memoizedProps);
            e = e.memoizedState;
            try {
              t.componentDidUpdate(u, e, t.__reactInternalSnapshotBeforeUpdate);
            } catch (i) {
              dt(l, l.return, i);
            }
          }
        (a & 64 && Ts(l), a & 512 && du(l, l.return));
        break;
      case 3:
        if ((Ie(t, l), a & 64 && ((t = l.updateQueue), t !== null))) {
          if (((e = null), l.child !== null))
            switch (l.child.tag) {
              case 27:
              case 5:
                e = l.child.stateNode;
                break;
              case 1:
                e = l.child.stateNode;
            }
          try {
            so(t, e);
          } catch (i) {
            dt(l, l.return, i);
          }
        }
        break;
      case 27:
        e === null && a & 4 && _s(l);
      case 26:
      case 5:
        (Ie(t, l), e === null && a & 4 && As(l), a & 512 && du(l, l.return));
        break;
      case 12:
        Ie(t, l);
        break;
      case 31:
        (Ie(t, l), a & 4 && Cs(t, l));
        break;
      case 13:
        (Ie(t, l),
          a & 4 && Ns(t, l),
          a & 64 &&
            ((t = l.memoizedState),
            t !== null &&
              ((t = t.dehydrated),
              t !== null && ((l = sy.bind(null, l)), Cy(t, l)))));
        break;
      case 22:
        if (((a = l.memoizedState !== null || ke), !a)) {
          ((e = (e !== null && e.memoizedState !== null) || qt), (u = ke));
          var n = qt;
          ((ke = a),
            (qt = e) && !n ? Pe(t, l, (l.subtreeFlags & 8772) !== 0) : Ie(t, l),
            (ke = u),
            (qt = n));
        }
        break;
      case 30:
        break;
      default:
        Ie(t, l);
    }
  }
  function Ds(t) {
    var e = t.alternate;
    (e !== null && ((t.alternate = null), Ds(e)),
      (t.child = null),
      (t.deletions = null),
      (t.sibling = null),
      t.tag === 5 && ((e = t.stateNode), e !== null && vi(e)),
      (t.stateNode = null),
      (t.return = null),
      (t.dependencies = null),
      (t.memoizedProps = null),
      (t.memoizedState = null),
      (t.pendingProps = null),
      (t.stateNode = null),
      (t.updateQueue = null));
  }
  var zt = null,
    It = !1;
  function Fe(t, e, l) {
    for (l = l.child; l !== null; ) (Us(t, e, l), (l = l.sibling));
  }
  function Us(t, e, l) {
    if (ue && typeof ue.onCommitFiberUnmount == "function")
      try {
        ue.onCommitFiberUnmount(qa, l);
      } catch {}
    switch (l.tag) {
      case 26:
        (qt || qe(l, e),
          Fe(t, e, l),
          l.memoizedState
            ? l.memoizedState.count--
            : l.stateNode && ((l = l.stateNode), l.parentNode.removeChild(l)));
        break;
      case 27:
        qt || qe(l, e);
        var a = zt,
          u = It;
        (zl(l.type) && ((zt = l.stateNode), (It = !1)),
          Fe(t, e, l),
          Eu(l.stateNode),
          (zt = a),
          (It = u));
        break;
      case 5:
        qt || qe(l, e);
      case 6:
        if (
          ((a = zt),
          (u = It),
          (zt = null),
          Fe(t, e, l),
          (zt = a),
          (It = u),
          zt !== null)
        )
          if (It)
            try {
              (zt.nodeType === 9
                ? zt.body
                : zt.nodeName === "HTML"
                  ? zt.ownerDocument.body
                  : zt
              ).removeChild(l.stateNode);
            } catch (n) {
              dt(l, e, n);
            }
          else
            try {
              zt.removeChild(l.stateNode);
            } catch (n) {
              dt(l, e, n);
            }
        break;
      case 18:
        zt !== null &&
          (It
            ? ((t = zt),
              Td(
                t.nodeType === 9
                  ? t.body
                  : t.nodeName === "HTML"
                    ? t.ownerDocument.body
                    : t,
                l.stateNode,
              ),
              Ca(t))
            : Td(zt, l.stateNode));
        break;
      case 4:
        ((a = zt),
          (u = It),
          (zt = l.stateNode.containerInfo),
          (It = !0),
          Fe(t, e, l),
          (zt = a),
          (It = u));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (vl(2, l, e), qt || vl(4, l, e), Fe(t, e, l));
        break;
      case 1:
        (qt ||
          (qe(l, e),
          (a = l.stateNode),
          typeof a.componentWillUnmount == "function" && zs(l, e, a)),
          Fe(t, e, l));
        break;
      case 21:
        Fe(t, e, l);
        break;
      case 22:
        ((qt = (a = qt) || l.memoizedState !== null), Fe(t, e, l), (qt = a));
        break;
      default:
        Fe(t, e, l);
    }
  }
  function Cs(t, e) {
    if (
      e.memoizedState === null &&
      ((t = e.alternate), t !== null && ((t = t.memoizedState), t !== null))
    ) {
      t = t.dehydrated;
      try {
        Ca(t);
      } catch (l) {
        dt(e, e.return, l);
      }
    }
  }
  function Ns(t, e) {
    if (
      e.memoizedState === null &&
      ((t = e.alternate),
      t !== null &&
        ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
    )
      try {
        Ca(t);
      } catch (l) {
        dt(e, e.return, l);
      }
  }
  function ay(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return (e === null && (e = t.stateNode = new Os()), e);
      case 22:
        return (
          (t = t.stateNode),
          (e = t._retryCache),
          e === null && (e = t._retryCache = new Os()),
          e
        );
      default:
        throw Error(c(435, t.tag));
    }
  }
  function _n(t, e) {
    var l = ay(t);
    e.forEach(function (a) {
      if (!l.has(a)) {
        l.add(a);
        var u = dy.bind(null, t, a);
        a.then(u, u);
      }
    });
  }
  function Pt(t, e) {
    var l = e.deletions;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var u = l[a],
          n = t,
          i = e,
          r = i;
        t: for (; r !== null; ) {
          switch (r.tag) {
            case 27:
              if (zl(r.type)) {
                ((zt = r.stateNode), (It = !1));
                break t;
              }
              break;
            case 5:
              ((zt = r.stateNode), (It = !1));
              break t;
            case 3:
            case 4:
              ((zt = r.stateNode.containerInfo), (It = !0));
              break t;
          }
          r = r.return;
        }
        if (zt === null) throw Error(c(160));
        (Us(n, i, u),
          (zt = null),
          (It = !1),
          (n = u.alternate),
          n !== null && (n.return = null),
          (u.return = null));
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; ) (Hs(e, t), (e = e.sibling));
  }
  var De = null;
  function Hs(t, e) {
    var l = t.alternate,
      a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (Pt(e, t),
          te(t),
          a & 4 && (vl(3, t, t.return), su(3, t), vl(5, t, t.return)));
        break;
      case 1:
        (Pt(e, t),
          te(t),
          a & 512 && (qt || l === null || qe(l, l.return)),
          a & 64 &&
            ke &&
            ((t = t.updateQueue),
            t !== null &&
              ((a = t.callbacks),
              a !== null &&
                ((l = t.shared.hiddenCallbacks),
                (t.shared.hiddenCallbacks = l === null ? a : l.concat(a))))));
        break;
      case 26:
        var u = De;
        if (
          (Pt(e, t),
          te(t),
          a & 512 && (qt || l === null || qe(l, l.return)),
          a & 4)
        ) {
          var n = l !== null ? l.memoizedState : null;
          if (((a = t.memoizedState), l === null))
            if (a === null)
              if (t.stateNode === null) {
                t: {
                  ((a = t.type),
                    (l = t.memoizedProps),
                    (u = u.ownerDocument || u));
                  e: switch (a) {
                    case "title":
                      ((n = u.getElementsByTagName("title")[0]),
                        (!n ||
                          n[Ga] ||
                          n[jt] ||
                          n.namespaceURI === "http://www.w3.org/2000/svg" ||
                          n.hasAttribute("itemprop")) &&
                          ((n = u.createElement(a)),
                          u.head.insertBefore(
                            n,
                            u.querySelector("head > title"),
                          )),
                        Vt(n, a, l),
                        (n[jt] = t),
                        Lt(n),
                        (a = n));
                      break t;
                    case "link":
                      var i = Hd("link", "href", u).get(a + (l.href || ""));
                      if (i) {
                        for (var r = 0; r < i.length; r++)
                          if (
                            ((n = i[r]),
                            n.getAttribute("href") ===
                              (l.href == null || l.href === ""
                                ? null
                                : l.href) &&
                              n.getAttribute("rel") ===
                                (l.rel == null ? null : l.rel) &&
                              n.getAttribute("title") ===
                                (l.title == null ? null : l.title) &&
                              n.getAttribute("crossorigin") ===
                                (l.crossOrigin == null ? null : l.crossOrigin))
                          ) {
                            i.splice(r, 1);
                            break e;
                          }
                      }
                      ((n = u.createElement(a)),
                        Vt(n, a, l),
                        u.head.appendChild(n));
                      break;
                    case "meta":
                      if (
                        (i = Hd("meta", "content", u).get(
                          a + (l.content || ""),
                        ))
                      ) {
                        for (r = 0; r < i.length; r++)
                          if (
                            ((n = i[r]),
                            n.getAttribute("content") ===
                              (l.content == null ? null : "" + l.content) &&
                              n.getAttribute("name") ===
                                (l.name == null ? null : l.name) &&
                              n.getAttribute("property") ===
                                (l.property == null ? null : l.property) &&
                              n.getAttribute("http-equiv") ===
                                (l.httpEquiv == null ? null : l.httpEquiv) &&
                              n.getAttribute("charset") ===
                                (l.charSet == null ? null : l.charSet))
                          ) {
                            i.splice(r, 1);
                            break e;
                          }
                      }
                      ((n = u.createElement(a)),
                        Vt(n, a, l),
                        u.head.appendChild(n));
                      break;
                    default:
                      throw Error(c(468, a));
                  }
                  ((n[jt] = t), Lt(n), (a = n));
                }
                t.stateNode = a;
              } else xd(u, t.type, t.stateNode);
            else t.stateNode = Nd(u, a, t.memoizedProps);
          else
            n !== a
              ? (n === null
                  ? l.stateNode !== null &&
                    ((l = l.stateNode), l.parentNode.removeChild(l))
                  : n.count--,
                a === null
                  ? xd(u, t.type, t.stateNode)
                  : Nd(u, a, t.memoizedProps))
              : a === null &&
                t.stateNode !== null &&
                Lf(t, t.memoizedProps, l.memoizedProps);
        }
        break;
      case 27:
        (Pt(e, t),
          te(t),
          a & 512 && (qt || l === null || qe(l, l.return)),
          l !== null && a & 4 && Lf(t, t.memoizedProps, l.memoizedProps));
        break;
      case 5:
        if (
          (Pt(e, t),
          te(t),
          a & 512 && (qt || l === null || qe(l, l.return)),
          t.flags & 32)
        ) {
          u = t.stateNode;
          try {
            ta(u, "");
          } catch (L) {
            dt(t, t.return, L);
          }
        }
        (a & 4 &&
          t.stateNode != null &&
          ((u = t.memoizedProps), Lf(t, u, l !== null ? l.memoizedProps : u)),
          a & 1024 && (Xf = !0));
        break;
      case 6:
        if ((Pt(e, t), te(t), a & 4)) {
          if (t.stateNode === null) throw Error(c(162));
          ((a = t.memoizedProps), (l = t.stateNode));
          try {
            l.nodeValue = a;
          } catch (L) {
            dt(t, t.return, L);
          }
        }
        break;
      case 3:
        if (
          ((Qn = null),
          (u = De),
          (De = jn(e.containerInfo)),
          Pt(e, t),
          (De = u),
          te(t),
          a & 4 && l !== null && l.memoizedState.isDehydrated)
        )
          try {
            Ca(e.containerInfo);
          } catch (L) {
            dt(t, t.return, L);
          }
        Xf && ((Xf = !1), xs(t));
        break;
      case 4:
        ((a = De),
          (De = jn(t.stateNode.containerInfo)),
          Pt(e, t),
          te(t),
          (De = a));
        break;
      case 12:
        (Pt(e, t), te(t));
        break;
      case 31:
        (Pt(e, t),
          te(t),
          a & 4 &&
            ((a = t.updateQueue),
            a !== null && ((t.updateQueue = null), _n(t, a))));
        break;
      case 13:
        (Pt(e, t),
          te(t),
          t.child.flags & 8192 &&
            (t.memoizedState !== null) !=
              (l !== null && l.memoizedState !== null) &&
            (Mn = ae()),
          a & 4 &&
            ((a = t.updateQueue),
            a !== null && ((t.updateQueue = null), _n(t, a))));
        break;
      case 22:
        u = t.memoizedState !== null;
        var h = l !== null && l.memoizedState !== null,
          T = ke,
          M = qt;
        if (
          ((ke = T || u),
          (qt = M || h),
          Pt(e, t),
          (qt = M),
          (ke = T),
          te(t),
          a & 8192)
        )
          t: for (
            e = t.stateNode,
              e._visibility = u ? e._visibility & -2 : e._visibility | 1,
              u && (l === null || h || ke || qt || Jl(t)),
              l = null,
              e = t;
            ;
          ) {
            if (e.tag === 5 || e.tag === 26) {
              if (l === null) {
                h = l = e;
                try {
                  if (((n = h.stateNode), u))
                    ((i = n.style),
                      typeof i.setProperty == "function"
                        ? i.setProperty("display", "none", "important")
                        : (i.display = "none"));
                  else {
                    r = h.stateNode;
                    var C = h.memoizedProps.style,
                      z =
                        C != null && C.hasOwnProperty("display")
                          ? C.display
                          : null;
                    r.style.display =
                      z == null || typeof z == "boolean" ? "" : ("" + z).trim();
                  }
                } catch (L) {
                  dt(h, h.return, L);
                }
              }
            } else if (e.tag === 6) {
              if (l === null) {
                h = e;
                try {
                  h.stateNode.nodeValue = u ? "" : h.memoizedProps;
                } catch (L) {
                  dt(h, h.return, L);
                }
              }
            } else if (e.tag === 18) {
              if (l === null) {
                h = e;
                try {
                  var R = h.stateNode;
                  u ? zd(R, !0) : zd(h.stateNode, !1);
                } catch (L) {
                  dt(h, h.return, L);
                }
              }
            } else if (
              ((e.tag !== 22 && e.tag !== 23) ||
                e.memoizedState === null ||
                e === t) &&
              e.child !== null
            ) {
              ((e.child.return = e), (e = e.child));
              continue;
            }
            if (e === t) break t;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t) break t;
              (l === e && (l = null), (e = e.return));
            }
            (l === e && (l = null),
              (e.sibling.return = e.return),
              (e = e.sibling));
          }
        a & 4 &&
          ((a = t.updateQueue),
          a !== null &&
            ((l = a.retryQueue),
            l !== null && ((a.retryQueue = null), _n(t, l))));
        break;
      case 19:
        (Pt(e, t),
          te(t),
          a & 4 &&
            ((a = t.updateQueue),
            a !== null && ((t.updateQueue = null), _n(t, a))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (Pt(e, t), te(t));
    }
  }
  function te(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var l, a = t.return; a !== null; ) {
          if (Rs(a)) {
            l = a;
            break;
          }
          a = a.return;
        }
        if (l == null) throw Error(c(160));
        switch (l.tag) {
          case 27:
            var u = l.stateNode,
              n = Gf(t);
            Rn(t, n, u);
            break;
          case 5:
            var i = l.stateNode;
            l.flags & 32 && (ta(i, ""), (l.flags &= -33));
            var r = Gf(t);
            Rn(t, r, i);
            break;
          case 3:
          case 4:
            var h = l.stateNode.containerInfo,
              T = Gf(t);
            jf(t, T, h);
            break;
          default:
            throw Error(c(161));
        }
      } catch (M) {
        dt(t, t.return, M);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function xs(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        (xs(e),
          e.tag === 5 && e.flags & 1024 && e.stateNode.reset(),
          (t = t.sibling));
      }
  }
  function Ie(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; ) (Ms(t, e.alternate, e), (e = e.sibling));
  }
  function Jl(t) {
    for (t = t.child; t !== null; ) {
      var e = t;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (vl(4, e, e.return), Jl(e));
          break;
        case 1:
          qe(e, e.return);
          var l = e.stateNode;
          (typeof l.componentWillUnmount == "function" && zs(e, e.return, l),
            Jl(e));
          break;
        case 27:
          Eu(e.stateNode);
        case 26:
        case 5:
          (qe(e, e.return), Jl(e));
          break;
        case 22:
          e.memoizedState === null && Jl(e);
          break;
        case 30:
          Jl(e);
          break;
        default:
          Jl(e);
      }
      t = t.sibling;
    }
  }
  function Pe(t, e, l) {
    for (l = l && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
      var a = e.alternate,
        u = t,
        n = e,
        i = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          (Pe(u, n, l), su(4, n));
          break;
        case 1:
          if (
            (Pe(u, n, l),
            (a = n),
            (u = a.stateNode),
            typeof u.componentDidMount == "function")
          )
            try {
              u.componentDidMount();
            } catch (T) {
              dt(a, a.return, T);
            }
          if (((a = n), (u = a.updateQueue), u !== null)) {
            var r = a.stateNode;
            try {
              var h = u.shared.hiddenCallbacks;
              if (h !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < h.length; u++)
                  oo(h[u], r);
            } catch (T) {
              dt(a, a.return, T);
            }
          }
          (l && i & 64 && Ts(n), du(n, n.return));
          break;
        case 27:
          _s(n);
        case 26:
        case 5:
          (Pe(u, n, l), l && a === null && i & 4 && As(n), du(n, n.return));
          break;
        case 12:
          Pe(u, n, l);
          break;
        case 31:
          (Pe(u, n, l), l && i & 4 && Cs(u, n));
          break;
        case 13:
          (Pe(u, n, l), l && i & 4 && Ns(u, n));
          break;
        case 22:
          (n.memoizedState === null && Pe(u, n, l), du(n, n.return));
          break;
        case 30:
          break;
        default:
          Pe(u, n, l);
      }
      e = e.sibling;
    }
  }
  function Qf(t, e) {
    var l = null;
    (t !== null &&
      t.memoizedState !== null &&
      t.memoizedState.cachePool !== null &&
      (l = t.memoizedState.cachePool.pool),
      (t = null),
      e.memoizedState !== null &&
        e.memoizedState.cachePool !== null &&
        (t = e.memoizedState.cachePool.pool),
      t !== l && (t != null && t.refCount++, l != null && Ia(l)));
  }
  function Zf(t, e) {
    ((t = null),
      e.alternate !== null && (t = e.alternate.memoizedState.cache),
      (e = e.memoizedState.cache),
      e !== t && (e.refCount++, t != null && Ia(t)));
  }
  function Ue(t, e, l, a) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) (Bs(t, e, l, a), (e = e.sibling));
  }
  function Bs(t, e, l, a) {
    var u = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (Ue(t, e, l, a), u & 2048 && su(9, e));
        break;
      case 1:
        Ue(t, e, l, a);
        break;
      case 3:
        (Ue(t, e, l, a),
          u & 2048 &&
            ((t = null),
            e.alternate !== null && (t = e.alternate.memoizedState.cache),
            (e = e.memoizedState.cache),
            e !== t && (e.refCount++, t != null && Ia(t))));
        break;
      case 12:
        if (u & 2048) {
          (Ue(t, e, l, a), (t = e.stateNode));
          try {
            var n = e.memoizedProps,
              i = n.id,
              r = n.onPostCommit;
            typeof r == "function" &&
              r(
                i,
                e.alternate === null ? "mount" : "update",
                t.passiveEffectDuration,
                -0,
              );
          } catch (h) {
            dt(e, e.return, h);
          }
        } else Ue(t, e, l, a);
        break;
      case 31:
        Ue(t, e, l, a);
        break;
      case 13:
        Ue(t, e, l, a);
        break;
      case 23:
        break;
      case 22:
        ((n = e.stateNode),
          (i = e.alternate),
          e.memoizedState !== null
            ? n._visibility & 2
              ? Ue(t, e, l, a)
              : hu(t, e)
            : n._visibility & 2
              ? Ue(t, e, l, a)
              : ((n._visibility |= 2),
                ba(t, e, l, a, (e.subtreeFlags & 10256) !== 0 || !1)),
          u & 2048 && Qf(i, e));
        break;
      case 24:
        (Ue(t, e, l, a), u & 2048 && Zf(e.alternate, e));
        break;
      default:
        Ue(t, e, l, a);
    }
  }
  function ba(t, e, l, a, u) {
    for (
      u = u && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child;
      e !== null;
    ) {
      var n = t,
        i = e,
        r = l,
        h = a,
        T = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          (ba(n, i, r, h, u), su(8, i));
          break;
        case 23:
          break;
        case 22:
          var M = i.stateNode;
          (i.memoizedState !== null
            ? M._visibility & 2
              ? ba(n, i, r, h, u)
              : hu(n, i)
            : ((M._visibility |= 2), ba(n, i, r, h, u)),
            u && T & 2048 && Qf(i.alternate, i));
          break;
        case 24:
          (ba(n, i, r, h, u), u && T & 2048 && Zf(i.alternate, i));
          break;
        default:
          ba(n, i, r, h, u);
      }
      e = e.sibling;
    }
  }
  function hu(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var l = t,
          a = e,
          u = a.flags;
        switch (a.tag) {
          case 22:
            (hu(l, a), u & 2048 && Qf(a.alternate, a));
            break;
          case 24:
            (hu(l, a), u & 2048 && Zf(a.alternate, a));
            break;
          default:
            hu(l, a);
        }
        e = e.sibling;
      }
  }
  var mu = 8192;
  function Ea(t, e, l) {
    if (t.subtreeFlags & mu)
      for (t = t.child; t !== null; ) (qs(t, e, l), (t = t.sibling));
  }
  function qs(t, e, l) {
    switch (t.tag) {
      case 26:
        (Ea(t, e, l),
          t.flags & mu &&
            t.memoizedState !== null &&
            Zy(l, De, t.memoizedState, t.memoizedProps));
        break;
      case 5:
        Ea(t, e, l);
        break;
      case 3:
      case 4:
        var a = De;
        ((De = jn(t.stateNode.containerInfo)), Ea(t, e, l), (De = a));
        break;
      case 22:
        t.memoizedState === null &&
          ((a = t.alternate),
          a !== null && a.memoizedState !== null
            ? ((a = mu), (mu = 16777216), Ea(t, e, l), (mu = a))
            : Ea(t, e, l));
        break;
      default:
        Ea(t, e, l);
    }
  }
  function Ys(t) {
    var e = t.alternate;
    if (e !== null && ((t = e.child), t !== null)) {
      e.child = null;
      do ((e = t.sibling), (t.sibling = null), (t = e));
      while (t !== null);
    }
  }
  function yu(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var a = e[l];
          ((Gt = a), Gs(a, t));
        }
      Ys(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) (Ls(t), (t = t.sibling));
  }
  function Ls(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (yu(t), t.flags & 2048 && vl(9, t, t.return));
        break;
      case 3:
        yu(t);
        break;
      case 12:
        yu(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null &&
        e._visibility & 2 &&
        (t.return === null || t.return.tag !== 13)
          ? ((e._visibility &= -3), On(t))
          : yu(t);
        break;
      default:
        yu(t);
    }
  }
  function On(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var a = e[l];
          ((Gt = a), Gs(a, t));
        }
      Ys(t);
    }
    for (t = t.child; t !== null; ) {
      switch (((e = t), e.tag)) {
        case 0:
        case 11:
        case 15:
          (vl(8, e, e.return), On(e));
          break;
        case 22:
          ((l = e.stateNode),
            l._visibility & 2 && ((l._visibility &= -3), On(e)));
          break;
        default:
          On(e);
      }
      t = t.sibling;
    }
  }
  function Gs(t, e) {
    for (; Gt !== null; ) {
      var l = Gt;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          vl(8, l, e);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var a = l.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          Ia(l.memoizedState.cache);
      }
      if (((a = l.child), a !== null)) ((a.return = l), (Gt = a));
      else
        t: for (l = t; Gt !== null; ) {
          a = Gt;
          var u = a.sibling,
            n = a.return;
          if ((Ds(a), a === l)) {
            Gt = null;
            break t;
          }
          if (u !== null) {
            ((u.return = n), (Gt = u));
            break t;
          }
          Gt = n;
        }
    }
  }
  var uy = {
      getCacheForType: function (t) {
        var e = Qt(Ht),
          l = e.data.get(t);
        return (l === void 0 && ((l = t()), e.data.set(t, l)), l);
      },
      cacheSignal: function () {
        return Qt(Ht).controller.signal;
      },
    },
    ny = typeof WeakMap == "function" ? WeakMap : Map,
    rt = 0,
    bt = null,
    lt = null,
    ut = 0,
    st = 0,
    oe = null,
    gl = !1,
    Ta = !1,
    Vf = !1,
    tl = 0,
    Ot = 0,
    Sl = 0,
    wl = 0,
    Kf = 0,
    se = 0,
    za = 0,
    vu = null,
    ee = null,
    Jf = !1,
    Mn = 0,
    js = 0,
    Dn = 1 / 0,
    Un = null,
    pl = null,
    Yt = 0,
    bl = null,
    Aa = null,
    el = 0,
    wf = 0,
    $f = null,
    Xs = null,
    gu = 0,
    Wf = null;
  function de() {
    return (rt & 2) !== 0 && ut !== 0 ? ut & -ut : D.T !== null ? ec() : lr();
  }
  function Qs() {
    if (se === 0)
      if ((ut & 536870912) === 0 || it) {
        var t = Yu;
        ((Yu <<= 1), (Yu & 3932160) === 0 && (Yu = 262144), (se = t));
      } else se = 536870912;
    return ((t = ce.current), t !== null && (t.flags |= 32), se);
  }
  function le(t, e, l) {
    (((t === bt && (st === 2 || st === 9)) || t.cancelPendingCommit !== null) &&
      (Ra(t, 0), El(t, ut, se, !1)),
      La(t, l),
      ((rt & 2) === 0 || t !== bt) &&
        (t === bt &&
          ((rt & 2) === 0 && (wl |= l), Ot === 4 && El(t, ut, se, !1)),
        Ye(t)));
  }
  function Zs(t, e, l) {
    if ((rt & 6) !== 0) throw Error(c(327));
    var a = (!l && (e & 127) === 0 && (e & t.expiredLanes) === 0) || Ya(t, e),
      u = a ? cy(t, e) : Ff(t, e, !0),
      n = a;
    do {
      if (u === 0) {
        Ta && !a && El(t, e, 0, !1);
        break;
      } else {
        if (((l = t.current.alternate), n && !iy(l))) {
          ((u = Ff(t, e, !1)), (n = !1));
          continue;
        }
        if (u === 2) {
          if (((n = e), t.errorRecoveryDisabledLanes & n)) var i = 0;
          else
            ((i = t.pendingLanes & -536870913),
              (i = i !== 0 ? i : i & 536870912 ? 536870912 : 0));
          if (i !== 0) {
            e = i;
            t: {
              var r = t;
              u = vu;
              var h = r.current.memoizedState.isDehydrated;
              if ((h && (Ra(r, i).flags |= 256), (i = Ff(r, i, !1)), i !== 2)) {
                if (Vf && !h) {
                  ((r.errorRecoveryDisabledLanes |= n), (wl |= n), (u = 4));
                  break t;
                }
                ((n = ee),
                  (ee = u),
                  n !== null &&
                    (ee === null ? (ee = n) : ee.push.apply(ee, n)));
              }
              u = i;
            }
            if (((n = !1), u !== 2)) continue;
          }
        }
        if (u === 1) {
          (Ra(t, 0), El(t, e, 0, !0));
          break;
        }
        t: {
          switch (((a = t), (n = u), n)) {
            case 0:
            case 1:
              throw Error(c(345));
            case 4:
              if ((e & 4194048) !== e) break;
            case 6:
              El(a, e, se, !gl);
              break t;
            case 2:
              ee = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(c(329));
          }
          if ((e & 62914560) === e && ((u = Mn + 300 - ae()), 10 < u)) {
            if ((El(a, e, se, !gl), Gu(a, 0, !0) !== 0)) break t;
            ((el = e),
              (a.timeoutHandle = bd(
                Vs.bind(
                  null,
                  a,
                  l,
                  ee,
                  Un,
                  Jf,
                  e,
                  se,
                  wl,
                  za,
                  gl,
                  n,
                  "Throttled",
                  -0,
                  0,
                ),
                u,
              )));
            break t;
          }
          Vs(a, l, ee, Un, Jf, e, se, wl, za, gl, n, null, -0, 0);
        }
      }
      break;
    } while (!0);
    Ye(t);
  }
  function Vs(t, e, l, a, u, n, i, r, h, T, M, C, z, R) {
    if (
      ((t.timeoutHandle = -1),
      (C = e.subtreeFlags),
      C & 8192 || (C & 16785408) === 16785408)
    ) {
      ((C = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: je,
      }),
        qs(e, n, C));
      var L =
        (n & 62914560) === n ? Mn - ae() : (n & 4194048) === n ? js - ae() : 0;
      if (((L = Vy(C, L)), L !== null)) {
        ((el = n),
          (t.cancelPendingCommit = L(
            Is.bind(null, t, e, n, l, a, u, i, r, h, M, C, null, z, R),
          )),
          El(t, n, i, !T));
        return;
      }
    }
    Is(t, e, n, l, a, u, i, r, h);
  }
  function iy(t) {
    for (var e = t; ; ) {
      var l = e.tag;
      if (
        (l === 0 || l === 11 || l === 15) &&
        e.flags & 16384 &&
        ((l = e.updateQueue), l !== null && ((l = l.stores), l !== null))
      )
        for (var a = 0; a < l.length; a++) {
          var u = l[a],
            n = u.getSnapshot;
          u = u.value;
          try {
            if (!ie(n(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (((l = e.child), e.subtreeFlags & 16384 && l !== null))
        ((l.return = e), (e = l));
      else {
        if (e === t) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return !0;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    }
    return !0;
  }
  function El(t, e, l, a) {
    ((e &= ~Kf),
      (e &= ~wl),
      (t.suspendedLanes |= e),
      (t.pingedLanes &= ~e),
      a && (t.warmLanes |= e),
      (a = t.expirationTimes));
    for (var u = e; 0 < u; ) {
      var n = 31 - ne(u),
        i = 1 << n;
      ((a[n] = -1), (u &= ~i));
    }
    l !== 0 && Pc(t, l, e);
  }
  function Cn() {
    return (rt & 6) === 0 ? (Su(0), !1) : !0;
  }
  function kf() {
    if (lt !== null) {
      if (st === 0) var t = lt.return;
      else ((t = lt), (Ve = Ll = null), df(t), (ya = null), (tu = 0), (t = lt));
      for (; t !== null; ) (Es(t.alternate, t), (t = t.return));
      lt = null;
    }
  }
  function Ra(t, e) {
    var l = t.timeoutHandle;
    (l !== -1 && ((t.timeoutHandle = -1), _y(l)),
      (l = t.cancelPendingCommit),
      l !== null && ((t.cancelPendingCommit = null), l()),
      (el = 0),
      kf(),
      (bt = t),
      (lt = l = Qe(t.current, null)),
      (ut = e),
      (st = 0),
      (oe = null),
      (gl = !1),
      (Ta = Ya(t, e)),
      (Vf = !1),
      (za = se = Kf = wl = Sl = Ot = 0),
      (ee = vu = null),
      (Jf = !1),
      (e & 8) !== 0 && (e |= e & 32));
    var a = t.entangledLanes;
    if (a !== 0)
      for (t = t.entanglements, a &= e; 0 < a; ) {
        var u = 31 - ne(a),
          n = 1 << u;
        ((e |= t[u]), (a &= ~n));
      }
    return ((tl = e), Fu(), l);
  }
  function Ks(t, e) {
    ((I = null),
      (D.H = cu),
      e === ma || e === nn
        ? ((e = io()), (st = 3))
        : e === Pi
          ? ((e = io()), (st = 4))
          : (st =
              e === Mf
                ? 8
                : e !== null &&
                    typeof e == "object" &&
                    typeof e.then == "function"
                  ? 6
                  : 1),
      (oe = e),
      lt === null && ((Ot = 1), bn(t, pe(e, t.current))));
  }
  function Js() {
    var t = ce.current;
    return t === null
      ? !0
      : (ut & 4194048) === ut
        ? ze === null
        : (ut & 62914560) === ut || (ut & 536870912) !== 0
          ? t === ze
          : !1;
  }
  function ws() {
    var t = D.H;
    return ((D.H = cu), t === null ? cu : t);
  }
  function $s() {
    var t = D.A;
    return ((D.A = uy), t);
  }
  function Nn() {
    ((Ot = 4),
      gl || ((ut & 4194048) !== ut && ce.current !== null) || (Ta = !0),
      ((Sl & 134217727) === 0 && (wl & 134217727) === 0) ||
        bt === null ||
        El(bt, ut, se, !1));
  }
  function Ff(t, e, l) {
    var a = rt;
    rt |= 2;
    var u = ws(),
      n = $s();
    ((bt !== t || ut !== e) && ((Un = null), Ra(t, e)), (e = !1));
    var i = Ot;
    t: do
      try {
        if (st !== 0 && lt !== null) {
          var r = lt,
            h = oe;
          switch (st) {
            case 8:
              (kf(), (i = 6));
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              ce.current === null && (e = !0);
              var T = st;
              if (((st = 0), (oe = null), _a(t, r, h, T), l && Ta)) {
                i = 0;
                break t;
              }
              break;
            default:
              ((T = st), (st = 0), (oe = null), _a(t, r, h, T));
          }
        }
        (fy(), (i = Ot));
        break;
      } catch (M) {
        Ks(t, M);
      }
    while (!0);
    return (
      e && t.shellSuspendCounter++,
      (Ve = Ll = null),
      (rt = a),
      (D.H = u),
      (D.A = n),
      lt === null && ((bt = null), (ut = 0), Fu()),
      i
    );
  }
  function fy() {
    for (; lt !== null; ) Ws(lt);
  }
  function cy(t, e) {
    var l = rt;
    rt |= 2;
    var a = ws(),
      u = $s();
    bt !== t || ut !== e
      ? ((Un = null), (Dn = ae() + 500), Ra(t, e))
      : (Ta = Ya(t, e));
    t: do
      try {
        if (st !== 0 && lt !== null) {
          e = lt;
          var n = oe;
          e: switch (st) {
            case 1:
              ((st = 0), (oe = null), _a(t, e, n, 1));
              break;
            case 2:
            case 9:
              if (uo(n)) {
                ((st = 0), (oe = null), ks(e));
                break;
              }
              ((e = function () {
                ((st !== 2 && st !== 9) || bt !== t || (st = 7), Ye(t));
              }),
                n.then(e, e));
              break t;
            case 3:
              st = 7;
              break t;
            case 4:
              st = 5;
              break t;
            case 7:
              uo(n)
                ? ((st = 0), (oe = null), ks(e))
                : ((st = 0), (oe = null), _a(t, e, n, 7));
              break;
            case 5:
              var i = null;
              switch (lt.tag) {
                case 26:
                  i = lt.memoizedState;
                case 5:
                case 27:
                  var r = lt;
                  if (i ? Bd(i) : r.stateNode.complete) {
                    ((st = 0), (oe = null));
                    var h = r.sibling;
                    if (h !== null) lt = h;
                    else {
                      var T = r.return;
                      T !== null ? ((lt = T), Hn(T)) : (lt = null);
                    }
                    break e;
                  }
              }
              ((st = 0), (oe = null), _a(t, e, n, 5));
              break;
            case 6:
              ((st = 0), (oe = null), _a(t, e, n, 6));
              break;
            case 8:
              (kf(), (Ot = 6));
              break t;
            default:
              throw Error(c(462));
          }
        }
        ry();
        break;
      } catch (M) {
        Ks(t, M);
      }
    while (!0);
    return (
      (Ve = Ll = null),
      (D.H = a),
      (D.A = u),
      (rt = l),
      lt !== null ? 0 : ((bt = null), (ut = 0), Fu(), Ot)
    );
  }
  function ry() {
    for (; lt !== null && !Nh(); ) Ws(lt);
  }
  function Ws(t) {
    var e = ps(t.alternate, t, tl);
    ((t.memoizedProps = t.pendingProps), e === null ? Hn(t) : (lt = e));
  }
  function ks(t) {
    var e = t,
      l = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = hs(l, e, e.pendingProps, e.type, void 0, ut);
        break;
      case 11:
        e = hs(l, e, e.pendingProps, e.type.render, e.ref, ut);
        break;
      case 5:
        df(e);
      default:
        (Es(l, e), (e = lt = wr(e, tl)), (e = ps(l, e, tl)));
    }
    ((t.memoizedProps = t.pendingProps), e === null ? Hn(t) : (lt = e));
  }
  function _a(t, e, l, a) {
    ((Ve = Ll = null), df(e), (ya = null), (tu = 0));
    var u = e.return;
    try {
      if (Fm(t, u, e, l, ut)) {
        ((Ot = 1), bn(t, pe(l, t.current)), (lt = null));
        return;
      }
    } catch (n) {
      if (u !== null) throw ((lt = u), n);
      ((Ot = 1), bn(t, pe(l, t.current)), (lt = null));
      return;
    }
    e.flags & 32768
      ? (it || a === 1
          ? (t = !0)
          : Ta || (ut & 536870912) !== 0
            ? (t = !1)
            : ((gl = t = !0),
              (a === 2 || a === 9 || a === 3 || a === 6) &&
                ((a = ce.current),
                a !== null && a.tag === 13 && (a.flags |= 16384))),
        Fs(e, t))
      : Hn(e);
  }
  function Hn(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        Fs(e, gl);
        return;
      }
      t = e.return;
      var l = ty(e.alternate, e, tl);
      if (l !== null) {
        lt = l;
        return;
      }
      if (((e = e.sibling), e !== null)) {
        lt = e;
        return;
      }
      lt = e = t;
    } while (e !== null);
    Ot === 0 && (Ot = 5);
  }
  function Fs(t, e) {
    do {
      var l = ey(t.alternate, t);
      if (l !== null) {
        ((l.flags &= 32767), (lt = l));
        return;
      }
      if (
        ((l = t.return),
        l !== null &&
          ((l.flags |= 32768), (l.subtreeFlags = 0), (l.deletions = null)),
        !e && ((t = t.sibling), t !== null))
      ) {
        lt = t;
        return;
      }
      lt = t = l;
    } while (t !== null);
    ((Ot = 6), (lt = null));
  }
  function Is(t, e, l, a, u, n, i, r, h) {
    t.cancelPendingCommit = null;
    do xn();
    while (Yt !== 0);
    if ((rt & 6) !== 0) throw Error(c(327));
    if (e !== null) {
      if (e === t.current) throw Error(c(177));
      if (
        ((n = e.lanes | e.childLanes),
        (n |= Li),
        Qh(t, l, n, i, r, h),
        t === bt && ((lt = bt = null), (ut = 0)),
        (Aa = e),
        (bl = t),
        (el = l),
        (wf = n),
        ($f = u),
        (Xs = a),
        (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
          ? ((t.callbackNode = null),
            (t.callbackPriority = 0),
            hy(Bu, function () {
              return (ad(), null);
            }))
          : ((t.callbackNode = null), (t.callbackPriority = 0)),
        (a = (e.flags & 13878) !== 0),
        (e.subtreeFlags & 13878) !== 0 || a)
      ) {
        ((a = D.T), (D.T = null), (u = B.p), (B.p = 2), (i = rt), (rt |= 4));
        try {
          ly(t, e, l);
        } finally {
          ((rt = i), (B.p = u), (D.T = a));
        }
      }
      ((Yt = 1), Ps(), td(), ed());
    }
  }
  function Ps() {
    if (Yt === 1) {
      Yt = 0;
      var t = bl,
        e = Aa,
        l = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || l) {
        ((l = D.T), (D.T = null));
        var a = B.p;
        B.p = 2;
        var u = rt;
        rt |= 4;
        try {
          Hs(e, t);
          var n = rc,
            i = Lr(t.containerInfo),
            r = n.focusedElem,
            h = n.selectionRange;
          if (
            i !== r &&
            r &&
            r.ownerDocument &&
            Yr(r.ownerDocument.documentElement, r)
          ) {
            if (h !== null && Hi(r)) {
              var T = h.start,
                M = h.end;
              if ((M === void 0 && (M = T), "selectionStart" in r))
                ((r.selectionStart = T),
                  (r.selectionEnd = Math.min(M, r.value.length)));
              else {
                var C = r.ownerDocument || document,
                  z = (C && C.defaultView) || window;
                if (z.getSelection) {
                  var R = z.getSelection(),
                    L = r.textContent.length,
                    V = Math.min(h.start, L),
                    vt = h.end === void 0 ? V : Math.min(h.end, L);
                  !R.extend && V > vt && ((i = vt), (vt = V), (V = i));
                  var S = qr(r, V),
                    m = qr(r, vt);
                  if (
                    S &&
                    m &&
                    (R.rangeCount !== 1 ||
                      R.anchorNode !== S.node ||
                      R.anchorOffset !== S.offset ||
                      R.focusNode !== m.node ||
                      R.focusOffset !== m.offset)
                  ) {
                    var E = C.createRange();
                    (E.setStart(S.node, S.offset),
                      R.removeAllRanges(),
                      V > vt
                        ? (R.addRange(E), R.extend(m.node, m.offset))
                        : (E.setEnd(m.node, m.offset), R.addRange(E)));
                  }
                }
              }
            }
            for (C = [], R = r; (R = R.parentNode); )
              R.nodeType === 1 &&
                C.push({ element: R, left: R.scrollLeft, top: R.scrollTop });
            for (
              typeof r.focus == "function" && r.focus(), r = 0;
              r < C.length;
              r++
            ) {
              var U = C[r];
              ((U.element.scrollLeft = U.left), (U.element.scrollTop = U.top));
            }
          }
          ((Jn = !!cc), (rc = cc = null));
        } finally {
          ((rt = u), (B.p = a), (D.T = l));
        }
      }
      ((t.current = e), (Yt = 2));
    }
  }
  function td() {
    if (Yt === 2) {
      Yt = 0;
      var t = bl,
        e = Aa,
        l = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || l) {
        ((l = D.T), (D.T = null));
        var a = B.p;
        B.p = 2;
        var u = rt;
        rt |= 4;
        try {
          Ms(t, e.alternate, e);
        } finally {
          ((rt = u), (B.p = a), (D.T = l));
        }
      }
      Yt = 3;
    }
  }
  function ed() {
    if (Yt === 4 || Yt === 3) {
      ((Yt = 0), Hh());
      var t = bl,
        e = Aa,
        l = el,
        a = Xs;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
        ? (Yt = 5)
        : ((Yt = 0), (Aa = bl = null), ld(t, t.pendingLanes));
      var u = t.pendingLanes;
      if (
        (u === 0 && (pl = null),
        mi(l),
        (e = e.stateNode),
        ue && typeof ue.onCommitFiberRoot == "function")
      )
        try {
          ue.onCommitFiberRoot(qa, e, void 0, (e.current.flags & 128) === 128);
        } catch {}
      if (a !== null) {
        ((e = D.T), (u = B.p), (B.p = 2), (D.T = null));
        try {
          for (var n = t.onRecoverableError, i = 0; i < a.length; i++) {
            var r = a[i];
            n(r.value, { componentStack: r.stack });
          }
        } finally {
          ((D.T = e), (B.p = u));
        }
      }
      ((el & 3) !== 0 && xn(),
        Ye(t),
        (u = t.pendingLanes),
        (l & 261930) !== 0 && (u & 42) !== 0
          ? t === Wf
            ? gu++
            : ((gu = 0), (Wf = t))
          : (gu = 0),
        Su(0));
    }
  }
  function ld(t, e) {
    (t.pooledCacheLanes &= e) === 0 &&
      ((e = t.pooledCache), e != null && ((t.pooledCache = null), Ia(e)));
  }
  function xn() {
    return (Ps(), td(), ed(), ad());
  }
  function ad() {
    if (Yt !== 5) return !1;
    var t = bl,
      e = wf;
    wf = 0;
    var l = mi(el),
      a = D.T,
      u = B.p;
    try {
      ((B.p = 32 > l ? 32 : l), (D.T = null), (l = $f), ($f = null));
      var n = bl,
        i = el;
      if (((Yt = 0), (Aa = bl = null), (el = 0), (rt & 6) !== 0))
        throw Error(c(331));
      var r = rt;
      if (
        ((rt |= 4),
        Ls(n.current),
        Bs(n, n.current, i, l),
        (rt = r),
        Su(0, !1),
        ue && typeof ue.onPostCommitFiberRoot == "function")
      )
        try {
          ue.onPostCommitFiberRoot(qa, n);
        } catch {}
      return !0;
    } finally {
      ((B.p = u), (D.T = a), ld(t, e));
    }
  }
  function ud(t, e, l) {
    ((e = pe(l, e)),
      (e = Of(t.stateNode, e, 2)),
      (t = hl(t, e, 2)),
      t !== null && (La(t, 2), Ye(t)));
  }
  function dt(t, e, l) {
    if (t.tag === 3) ud(t, t, l);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          ud(e, t, l);
          break;
        } else if (e.tag === 1) {
          var a = e.stateNode;
          if (
            typeof e.type.getDerivedStateFromError == "function" ||
            (typeof a.componentDidCatch == "function" &&
              (pl === null || !pl.has(a)))
          ) {
            ((t = pe(l, t)),
              (l = ns(2)),
              (a = hl(e, l, 2)),
              a !== null && (is(l, a, e, t), La(a, 2), Ye(a)));
            break;
          }
        }
        e = e.return;
      }
  }
  function If(t, e, l) {
    var a = t.pingCache;
    if (a === null) {
      a = t.pingCache = new ny();
      var u = new Set();
      a.set(e, u);
    } else ((u = a.get(e)), u === void 0 && ((u = new Set()), a.set(e, u)));
    u.has(l) ||
      ((Vf = !0), u.add(l), (t = oy.bind(null, t, e, l)), e.then(t, t));
  }
  function oy(t, e, l) {
    var a = t.pingCache;
    (a !== null && a.delete(e),
      (t.pingedLanes |= t.suspendedLanes & l),
      (t.warmLanes &= ~l),
      bt === t &&
        (ut & l) === l &&
        (Ot === 4 || (Ot === 3 && (ut & 62914560) === ut && 300 > ae() - Mn)
          ? (rt & 2) === 0 && Ra(t, 0)
          : (Kf |= l),
        za === ut && (za = 0)),
      Ye(t));
  }
  function nd(t, e) {
    (e === 0 && (e = Ic()), (t = Bl(t, e)), t !== null && (La(t, e), Ye(t)));
  }
  function sy(t) {
    var e = t.memoizedState,
      l = 0;
    (e !== null && (l = e.retryLane), nd(t, l));
  }
  function dy(t, e) {
    var l = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var a = t.stateNode,
          u = t.memoizedState;
        u !== null && (l = u.retryLane);
        break;
      case 19:
        a = t.stateNode;
        break;
      case 22:
        a = t.stateNode._retryCache;
        break;
      default:
        throw Error(c(314));
    }
    (a !== null && a.delete(e), nd(t, l));
  }
  function hy(t, e) {
    return oi(t, e);
  }
  var Bn = null,
    Oa = null,
    Pf = !1,
    qn = !1,
    tc = !1,
    Tl = 0;
  function Ye(t) {
    (t !== Oa &&
      t.next === null &&
      (Oa === null ? (Bn = Oa = t) : (Oa = Oa.next = t)),
      (qn = !0),
      Pf || ((Pf = !0), yy()));
  }
  function Su(t, e) {
    if (!tc && qn) {
      tc = !0;
      do
        for (var l = !1, a = Bn; a !== null; ) {
          if (t !== 0) {
            var u = a.pendingLanes;
            if (u === 0) var n = 0;
            else {
              var i = a.suspendedLanes,
                r = a.pingedLanes;
              ((n = (1 << (31 - ne(42 | t) + 1)) - 1),
                (n &= u & ~(i & ~r)),
                (n = n & 201326741 ? (n & 201326741) | 1 : n ? n | 2 : 0));
            }
            n !== 0 && ((l = !0), rd(a, n));
          } else
            ((n = ut),
              (n = Gu(
                a,
                a === bt ? n : 0,
                a.cancelPendingCommit !== null || a.timeoutHandle !== -1,
              )),
              (n & 3) === 0 || Ya(a, n) || ((l = !0), rd(a, n)));
          a = a.next;
        }
      while (l);
      tc = !1;
    }
  }
  function my() {
    id();
  }
  function id() {
    qn = Pf = !1;
    var t = 0;
    Tl !== 0 && Ry() && (t = Tl);
    for (var e = ae(), l = null, a = Bn; a !== null; ) {
      var u = a.next,
        n = fd(a, e);
      (n === 0
        ? ((a.next = null),
          l === null ? (Bn = u) : (l.next = u),
          u === null && (Oa = l))
        : ((l = a), (t !== 0 || (n & 3) !== 0) && (qn = !0)),
        (a = u));
    }
    ((Yt !== 0 && Yt !== 5) || Su(t), Tl !== 0 && (Tl = 0));
  }
  function fd(t, e) {
    for (
      var l = t.suspendedLanes,
        a = t.pingedLanes,
        u = t.expirationTimes,
        n = t.pendingLanes & -62914561;
      0 < n;
    ) {
      var i = 31 - ne(n),
        r = 1 << i,
        h = u[i];
      (h === -1
        ? ((r & l) === 0 || (r & a) !== 0) && (u[i] = Xh(r, e))
        : h <= e && (t.expiredLanes |= r),
        (n &= ~r));
    }
    if (
      ((e = bt),
      (l = ut),
      (l = Gu(
        t,
        t === e ? l : 0,
        t.cancelPendingCommit !== null || t.timeoutHandle !== -1,
      )),
      (a = t.callbackNode),
      l === 0 ||
        (t === e && (st === 2 || st === 9)) ||
        t.cancelPendingCommit !== null)
    )
      return (
        a !== null && a !== null && si(a),
        (t.callbackNode = null),
        (t.callbackPriority = 0)
      );
    if ((l & 3) === 0 || Ya(t, l)) {
      if (((e = l & -l), e === t.callbackPriority)) return e;
      switch ((a !== null && si(a), mi(l))) {
        case 2:
        case 8:
          l = kc;
          break;
        case 32:
          l = Bu;
          break;
        case 268435456:
          l = Fc;
          break;
        default:
          l = Bu;
      }
      return (
        (a = cd.bind(null, t)),
        (l = oi(l, a)),
        (t.callbackPriority = e),
        (t.callbackNode = l),
        e
      );
    }
    return (
      a !== null && a !== null && si(a),
      (t.callbackPriority = 2),
      (t.callbackNode = null),
      2
    );
  }
  function cd(t, e) {
    if (Yt !== 0 && Yt !== 5)
      return ((t.callbackNode = null), (t.callbackPriority = 0), null);
    var l = t.callbackNode;
    if (xn() && t.callbackNode !== l) return null;
    var a = ut;
    return (
      (a = Gu(
        t,
        t === bt ? a : 0,
        t.cancelPendingCommit !== null || t.timeoutHandle !== -1,
      )),
      a === 0
        ? null
        : (Zs(t, a, e),
          fd(t, ae()),
          t.callbackNode != null && t.callbackNode === l
            ? cd.bind(null, t)
            : null)
    );
  }
  function rd(t, e) {
    if (xn()) return null;
    Zs(t, e, !0);
  }
  function yy() {
    Oy(function () {
      (rt & 6) !== 0 ? oi(Wc, my) : id();
    });
  }
  function ec() {
    if (Tl === 0) {
      var t = da;
      (t === 0 && ((t = qu), (qu <<= 1), (qu & 261888) === 0 && (qu = 256)),
        (Tl = t));
    }
    return Tl;
  }
  function od(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean"
      ? null
      : typeof t == "function"
        ? t
        : Zu("" + t);
  }
  function sd(t, e) {
    var l = e.ownerDocument.createElement("input");
    return (
      (l.name = e.name),
      (l.value = e.value),
      t.id && l.setAttribute("form", t.id),
      e.parentNode.insertBefore(l, e),
      (t = new FormData(t)),
      l.parentNode.removeChild(l),
      t
    );
  }
  function vy(t, e, l, a, u) {
    if (e === "submit" && l && l.stateNode === u) {
      var n = od((u[kt] || null).action),
        i = a.submitter;
      i &&
        ((e = (e = i[kt] || null)
          ? od(e.formAction)
          : i.getAttribute("formAction")),
        e !== null && ((n = e), (i = null)));
      var r = new wu("action", "action", null, a, u);
      t.push({
        event: r,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (a.defaultPrevented) {
                if (Tl !== 0) {
                  var h = i ? sd(u, i) : new FormData(u);
                  Ef(
                    l,
                    { pending: !0, data: h, method: u.method, action: n },
                    null,
                    h,
                  );
                }
              } else
                typeof n == "function" &&
                  (r.preventDefault(),
                  (h = i ? sd(u, i) : new FormData(u)),
                  Ef(
                    l,
                    { pending: !0, data: h, method: u.method, action: n },
                    n,
                    h,
                  ));
            },
            currentTarget: u,
          },
        ],
      });
    }
  }
  for (var lc = 0; lc < Yi.length; lc++) {
    var ac = Yi[lc],
      gy = ac.toLowerCase(),
      Sy = ac[0].toUpperCase() + ac.slice(1);
    Me(gy, "on" + Sy);
  }
  (Me(Xr, "onAnimationEnd"),
    Me(Qr, "onAnimationIteration"),
    Me(Zr, "onAnimationStart"),
    Me("dblclick", "onDoubleClick"),
    Me("focusin", "onFocus"),
    Me("focusout", "onBlur"),
    Me(xm, "onTransitionRun"),
    Me(Bm, "onTransitionStart"),
    Me(qm, "onTransitionCancel"),
    Me(Vr, "onTransitionEnd"),
    Il("onMouseEnter", ["mouseout", "mouseover"]),
    Il("onMouseLeave", ["mouseout", "mouseover"]),
    Il("onPointerEnter", ["pointerout", "pointerover"]),
    Il("onPointerLeave", ["pointerout", "pointerover"]),
    Cl(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " ",
      ),
    ),
    Cl(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    ),
    Cl("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    Cl(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" "),
    ),
    Cl(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    ),
    Cl(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    ));
  var pu =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    py = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(pu),
    );
  function dd(t, e) {
    e = (e & 4) !== 0;
    for (var l = 0; l < t.length; l++) {
      var a = t[l],
        u = a.event;
      a = a.listeners;
      t: {
        var n = void 0;
        if (e)
          for (var i = a.length - 1; 0 <= i; i--) {
            var r = a[i],
              h = r.instance,
              T = r.currentTarget;
            if (((r = r.listener), h !== n && u.isPropagationStopped()))
              break t;
            ((n = r), (u.currentTarget = T));
            try {
              n(u);
            } catch (M) {
              ku(M);
            }
            ((u.currentTarget = null), (n = h));
          }
        else
          for (i = 0; i < a.length; i++) {
            if (
              ((r = a[i]),
              (h = r.instance),
              (T = r.currentTarget),
              (r = r.listener),
              h !== n && u.isPropagationStopped())
            )
              break t;
            ((n = r), (u.currentTarget = T));
            try {
              n(u);
            } catch (M) {
              ku(M);
            }
            ((u.currentTarget = null), (n = h));
          }
      }
    }
  }
  function at(t, e) {
    var l = e[yi];
    l === void 0 && (l = e[yi] = new Set());
    var a = t + "__bubble";
    l.has(a) || (hd(e, t, 2, !1), l.add(a));
  }
  function uc(t, e, l) {
    var a = 0;
    (e && (a |= 4), hd(l, t, a, e));
  }
  var Yn = "_reactListening" + Math.random().toString(36).slice(2);
  function nc(t) {
    if (!t[Yn]) {
      ((t[Yn] = !0),
        nr.forEach(function (l) {
          l !== "selectionchange" && (py.has(l) || uc(l, !1, t), uc(l, !0, t));
        }));
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[Yn] || ((e[Yn] = !0), uc("selectionchange", !1, e));
    }
  }
  function hd(t, e, l, a) {
    switch (Qd(e)) {
      case 2:
        var u = wy;
        break;
      case 8:
        u = $y;
        break;
      default:
        u = bc;
    }
    ((l = u.bind(null, e, l, t)),
      (u = void 0),
      !Ai ||
        (e !== "touchstart" && e !== "touchmove" && e !== "wheel") ||
        (u = !0),
      a
        ? u !== void 0
          ? t.addEventListener(e, l, { capture: !0, passive: u })
          : t.addEventListener(e, l, !0)
        : u !== void 0
          ? t.addEventListener(e, l, { passive: u })
          : t.addEventListener(e, l, !1));
  }
  function ic(t, e, l, a, u) {
    var n = a;
    if ((e & 1) === 0 && (e & 2) === 0 && a !== null)
      t: for (;;) {
        if (a === null) return;
        var i = a.tag;
        if (i === 3 || i === 4) {
          var r = a.stateNode.containerInfo;
          if (r === u) break;
          if (i === 4)
            for (i = a.return; i !== null; ) {
              var h = i.tag;
              if ((h === 3 || h === 4) && i.stateNode.containerInfo === u)
                return;
              i = i.return;
            }
          for (; r !== null; ) {
            if (((i = Wl(r)), i === null)) return;
            if (((h = i.tag), h === 5 || h === 6 || h === 26 || h === 27)) {
              a = n = i;
              continue t;
            }
            r = r.parentNode;
          }
        }
        a = a.return;
      }
    gr(function () {
      var T = n,
        M = Ti(l),
        C = [];
      t: {
        var z = Kr.get(t);
        if (z !== void 0) {
          var R = wu,
            L = t;
          switch (t) {
            case "keypress":
              if (Ku(l) === 0) break t;
            case "keydown":
            case "keyup":
              R = dm;
              break;
            case "focusin":
              ((L = "focus"), (R = Mi));
              break;
            case "focusout":
              ((L = "blur"), (R = Mi));
              break;
            case "beforeblur":
            case "afterblur":
              R = Mi;
              break;
            case "click":
              if (l.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              R = br;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              R = tm;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              R = ym;
              break;
            case Xr:
            case Qr:
            case Zr:
              R = am;
              break;
            case Vr:
              R = gm;
              break;
            case "scroll":
            case "scrollend":
              R = Ih;
              break;
            case "wheel":
              R = pm;
              break;
            case "copy":
            case "cut":
            case "paste":
              R = nm;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              R = Tr;
              break;
            case "toggle":
            case "beforetoggle":
              R = Em;
          }
          var V = (e & 4) !== 0,
            vt = !V && (t === "scroll" || t === "scrollend"),
            S = V ? (z !== null ? z + "Capture" : null) : z;
          V = [];
          for (var m = T, E; m !== null; ) {
            var U = m;
            if (
              ((E = U.stateNode),
              (U = U.tag),
              (U !== 5 && U !== 26 && U !== 27) ||
                E === null ||
                S === null ||
                ((U = Xa(m, S)), U != null && V.push(bu(m, U, E))),
              vt)
            )
              break;
            m = m.return;
          }
          0 < V.length &&
            ((z = new R(z, L, null, l, M)), C.push({ event: z, listeners: V }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (
            ((z = t === "mouseover" || t === "pointerover"),
            (R = t === "mouseout" || t === "pointerout"),
            z &&
              l !== Ei &&
              (L = l.relatedTarget || l.fromElement) &&
              (Wl(L) || L[$l]))
          )
            break t;
          if (
            (R || z) &&
            ((z =
              M.window === M
                ? M
                : (z = M.ownerDocument)
                  ? z.defaultView || z.parentWindow
                  : window),
            R
              ? ((L = l.relatedTarget || l.toElement),
                (R = T),
                (L = L ? Wl(L) : null),
                L !== null &&
                  ((vt = y(L)),
                  (V = L.tag),
                  L !== vt || (V !== 5 && V !== 27 && V !== 6)) &&
                  (L = null))
              : ((R = null), (L = T)),
            R !== L)
          ) {
            if (
              ((V = br),
              (U = "onMouseLeave"),
              (S = "onMouseEnter"),
              (m = "mouse"),
              (t === "pointerout" || t === "pointerover") &&
                ((V = Tr),
                (U = "onPointerLeave"),
                (S = "onPointerEnter"),
                (m = "pointer")),
              (vt = R == null ? z : ja(R)),
              (E = L == null ? z : ja(L)),
              (z = new V(U, m + "leave", R, l, M)),
              (z.target = vt),
              (z.relatedTarget = E),
              (U = null),
              Wl(M) === T &&
                ((V = new V(S, m + "enter", L, l, M)),
                (V.target = E),
                (V.relatedTarget = vt),
                (U = V)),
              (vt = U),
              R && L)
            )
              e: {
                for (V = by, S = R, m = L, E = 0, U = S; U; U = V(U)) E++;
                U = 0;
                for (var Q = m; Q; Q = V(Q)) U++;
                for (; 0 < E - U; ) ((S = V(S)), E--);
                for (; 0 < U - E; ) ((m = V(m)), U--);
                for (; E--; ) {
                  if (S === m || (m !== null && S === m.alternate)) {
                    V = S;
                    break e;
                  }
                  ((S = V(S)), (m = V(m)));
                }
                V = null;
              }
            else V = null;
            (R !== null && md(C, z, R, V, !1),
              L !== null && vt !== null && md(C, vt, L, V, !0));
          }
        }
        t: {
          if (
            ((z = T ? ja(T) : window),
            (R = z.nodeName && z.nodeName.toLowerCase()),
            R === "select" || (R === "input" && z.type === "file"))
          )
            var ft = Ur;
          else if (Mr(z))
            if (Cr) ft = Cm;
            else {
              ft = Dm;
              var X = Mm;
            }
          else
            ((R = z.nodeName),
              !R ||
              R.toLowerCase() !== "input" ||
              (z.type !== "checkbox" && z.type !== "radio")
                ? T && bi(T.elementType) && (ft = Ur)
                : (ft = Um));
          if (ft && (ft = ft(t, T))) {
            Dr(C, ft, l, M);
            break t;
          }
          (X && X(t, z, T),
            t === "focusout" &&
              T &&
              z.type === "number" &&
              T.memoizedProps.value != null &&
              pi(z, "number", z.value));
        }
        switch (((X = T ? ja(T) : window), t)) {
          case "focusin":
            (Mr(X) || X.contentEditable === "true") &&
              ((ua = X), (xi = T), (Wa = null));
            break;
          case "focusout":
            Wa = xi = ua = null;
            break;
          case "mousedown":
            Bi = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((Bi = !1), Gr(C, l, M));
            break;
          case "selectionchange":
            if (Hm) break;
          case "keydown":
          case "keyup":
            Gr(C, l, M);
        }
        var tt;
        if (Ui)
          t: {
            switch (t) {
              case "compositionstart":
                var nt = "onCompositionStart";
                break t;
              case "compositionend":
                nt = "onCompositionEnd";
                break t;
              case "compositionupdate":
                nt = "onCompositionUpdate";
                break t;
            }
            nt = void 0;
          }
        else
          aa
            ? _r(t, l) && (nt = "onCompositionEnd")
            : t === "keydown" &&
              l.keyCode === 229 &&
              (nt = "onCompositionStart");
        (nt &&
          (zr &&
            l.locale !== "ko" &&
            (aa || nt !== "onCompositionStart"
              ? nt === "onCompositionEnd" && aa && (tt = Sr())
              : ((il = M),
                (Ri = "value" in il ? il.value : il.textContent),
                (aa = !0))),
          (X = Ln(T, nt)),
          0 < X.length &&
            ((nt = new Er(nt, t, null, l, M)),
            C.push({ event: nt, listeners: X }),
            tt
              ? (nt.data = tt)
              : ((tt = Or(l)), tt !== null && (nt.data = tt)))),
          (tt = zm ? Am(t, l) : Rm(t, l)) &&
            ((nt = Ln(T, "onBeforeInput")),
            0 < nt.length &&
              ((X = new Er("onBeforeInput", "beforeinput", null, l, M)),
              C.push({ event: X, listeners: nt }),
              (X.data = tt))),
          vy(C, t, T, l, M));
      }
      dd(C, e);
    });
  }
  function bu(t, e, l) {
    return { instance: t, listener: e, currentTarget: l };
  }
  function Ln(t, e) {
    for (var l = e + "Capture", a = []; t !== null; ) {
      var u = t,
        n = u.stateNode;
      if (
        ((u = u.tag),
        (u !== 5 && u !== 26 && u !== 27) ||
          n === null ||
          ((u = Xa(t, l)),
          u != null && a.unshift(bu(t, u, n)),
          (u = Xa(t, e)),
          u != null && a.push(bu(t, u, n))),
        t.tag === 3)
      )
        return a;
      t = t.return;
    }
    return [];
  }
  function by(t) {
    if (t === null) return null;
    do t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function md(t, e, l, a, u) {
    for (var n = e._reactName, i = []; l !== null && l !== a; ) {
      var r = l,
        h = r.alternate,
        T = r.stateNode;
      if (((r = r.tag), h !== null && h === a)) break;
      ((r !== 5 && r !== 26 && r !== 27) ||
        T === null ||
        ((h = T),
        u
          ? ((T = Xa(l, n)), T != null && i.unshift(bu(l, T, h)))
          : u || ((T = Xa(l, n)), T != null && i.push(bu(l, T, h)))),
        (l = l.return));
    }
    i.length !== 0 && t.push({ event: e, listeners: i });
  }
  var Ey = /\r\n?/g,
    Ty = /\u0000|\uFFFD/g;
  function yd(t) {
    return (typeof t == "string" ? t : "" + t)
      .replace(
        Ey,
        `
`,
      )
      .replace(Ty, "");
  }
  function vd(t, e) {
    return ((e = yd(e)), yd(t) === e);
  }
  function yt(t, e, l, a, u, n) {
    switch (l) {
      case "children":
        typeof a == "string"
          ? e === "body" || (e === "textarea" && a === "") || ta(t, a)
          : (typeof a == "number" || typeof a == "bigint") &&
            e !== "body" &&
            ta(t, "" + a);
        break;
      case "className":
        Xu(t, "class", a);
        break;
      case "tabIndex":
        Xu(t, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Xu(t, l, a);
        break;
      case "style":
        yr(t, a, n);
        break;
      case "data":
        if (e !== "object") {
          Xu(t, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (e !== "a" || l !== "href")) {
          t.removeAttribute(l);
          break;
        }
        if (
          a == null ||
          typeof a == "function" ||
          typeof a == "symbol" ||
          typeof a == "boolean"
        ) {
          t.removeAttribute(l);
          break;
        }
        ((a = Zu("" + a)), t.setAttribute(l, a));
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          t.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
          );
          break;
        } else
          typeof n == "function" &&
            (l === "formAction"
              ? (e !== "input" && yt(t, e, "name", u.name, u, null),
                yt(t, e, "formEncType", u.formEncType, u, null),
                yt(t, e, "formMethod", u.formMethod, u, null),
                yt(t, e, "formTarget", u.formTarget, u, null))
              : (yt(t, e, "encType", u.encType, u, null),
                yt(t, e, "method", u.method, u, null),
                yt(t, e, "target", u.target, u, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(l);
          break;
        }
        ((a = Zu("" + a)), t.setAttribute(l, a));
        break;
      case "onClick":
        a != null && (t.onclick = je);
        break;
      case "onScroll":
        a != null && at("scroll", t);
        break;
      case "onScrollEnd":
        a != null && at("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(c(61));
          if (((l = a.__html), l != null)) {
            if (u.children != null) throw Error(c(60));
            t.innerHTML = l;
          }
        }
        break;
      case "multiple":
        t.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        t.muted = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          a == null ||
          typeof a == "function" ||
          typeof a == "boolean" ||
          typeof a == "symbol"
        ) {
          t.removeAttribute("xlink:href");
          break;
        }
        ((l = Zu("" + a)),
          t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", l));
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        a != null && typeof a != "function" && typeof a != "symbol"
          ? t.setAttribute(l, "" + a)
          : t.removeAttribute(l);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        a && typeof a != "function" && typeof a != "symbol"
          ? t.setAttribute(l, "")
          : t.removeAttribute(l);
        break;
      case "capture":
      case "download":
        a === !0
          ? t.setAttribute(l, "")
          : a !== !1 &&
              a != null &&
              typeof a != "function" &&
              typeof a != "symbol"
            ? t.setAttribute(l, a)
            : t.removeAttribute(l);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null &&
        typeof a != "function" &&
        typeof a != "symbol" &&
        !isNaN(a) &&
        1 <= a
          ? t.setAttribute(l, a)
          : t.removeAttribute(l);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a)
          ? t.removeAttribute(l)
          : t.setAttribute(l, a);
        break;
      case "popover":
        (at("beforetoggle", t), at("toggle", t), ju(t, "popover", a));
        break;
      case "xlinkActuate":
        Ge(t, "http://www.w3.org/1999/xlink", "xlink:actuate", a);
        break;
      case "xlinkArcrole":
        Ge(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", a);
        break;
      case "xlinkRole":
        Ge(t, "http://www.w3.org/1999/xlink", "xlink:role", a);
        break;
      case "xlinkShow":
        Ge(t, "http://www.w3.org/1999/xlink", "xlink:show", a);
        break;
      case "xlinkTitle":
        Ge(t, "http://www.w3.org/1999/xlink", "xlink:title", a);
        break;
      case "xlinkType":
        Ge(t, "http://www.w3.org/1999/xlink", "xlink:type", a);
        break;
      case "xmlBase":
        Ge(t, "http://www.w3.org/XML/1998/namespace", "xml:base", a);
        break;
      case "xmlLang":
        Ge(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", a);
        break;
      case "xmlSpace":
        Ge(t, "http://www.w3.org/XML/1998/namespace", "xml:space", a);
        break;
      case "is":
        ju(t, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) ||
          (l[0] !== "o" && l[0] !== "O") ||
          (l[1] !== "n" && l[1] !== "N")) &&
          ((l = kh.get(l) || l), ju(t, l, a));
    }
  }
  function fc(t, e, l, a, u, n) {
    switch (l) {
      case "style":
        yr(t, a, n);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(c(61));
          if (((l = a.__html), l != null)) {
            if (u.children != null) throw Error(c(60));
            t.innerHTML = l;
          }
        }
        break;
      case "children":
        typeof a == "string"
          ? ta(t, a)
          : (typeof a == "number" || typeof a == "bigint") && ta(t, "" + a);
        break;
      case "onScroll":
        a != null && at("scroll", t);
        break;
      case "onScrollEnd":
        a != null && at("scrollend", t);
        break;
      case "onClick":
        a != null && (t.onclick = je);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!ir.hasOwnProperty(l))
          t: {
            if (
              l[0] === "o" &&
              l[1] === "n" &&
              ((u = l.endsWith("Capture")),
              (e = l.slice(2, u ? l.length - 7 : void 0)),
              (n = t[kt] || null),
              (n = n != null ? n[l] : null),
              typeof n == "function" && t.removeEventListener(e, n, u),
              typeof a == "function")
            ) {
              (typeof n != "function" &&
                n !== null &&
                (l in t
                  ? (t[l] = null)
                  : t.hasAttribute(l) && t.removeAttribute(l)),
                t.addEventListener(e, a, u));
              break t;
            }
            l in t
              ? (t[l] = a)
              : a === !0
                ? t.setAttribute(l, "")
                : ju(t, l, a);
          }
    }
  }
  function Vt(t, e, l) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        (at("error", t), at("load", t));
        var a = !1,
          u = !1,
          n;
        for (n in l)
          if (l.hasOwnProperty(n)) {
            var i = l[n];
            if (i != null)
              switch (n) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(c(137, e));
                default:
                  yt(t, e, n, i, l, null);
              }
          }
        (u && yt(t, e, "srcSet", l.srcSet, l, null),
          a && yt(t, e, "src", l.src, l, null));
        return;
      case "input":
        at("invalid", t);
        var r = (n = i = u = null),
          h = null,
          T = null;
        for (a in l)
          if (l.hasOwnProperty(a)) {
            var M = l[a];
            if (M != null)
              switch (a) {
                case "name":
                  u = M;
                  break;
                case "type":
                  i = M;
                  break;
                case "checked":
                  h = M;
                  break;
                case "defaultChecked":
                  T = M;
                  break;
                case "value":
                  n = M;
                  break;
                case "defaultValue":
                  r = M;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (M != null) throw Error(c(137, e));
                  break;
                default:
                  yt(t, e, a, M, l, null);
              }
          }
        sr(t, n, r, h, T, i, u, !1);
        return;
      case "select":
        (at("invalid", t), (a = i = n = null));
        for (u in l)
          if (l.hasOwnProperty(u) && ((r = l[u]), r != null))
            switch (u) {
              case "value":
                n = r;
                break;
              case "defaultValue":
                i = r;
                break;
              case "multiple":
                a = r;
              default:
                yt(t, e, u, r, l, null);
            }
        ((e = n),
          (l = i),
          (t.multiple = !!a),
          e != null ? Pl(t, !!a, e, !1) : l != null && Pl(t, !!a, l, !0));
        return;
      case "textarea":
        (at("invalid", t), (n = u = a = null));
        for (i in l)
          if (l.hasOwnProperty(i) && ((r = l[i]), r != null))
            switch (i) {
              case "value":
                a = r;
                break;
              case "defaultValue":
                u = r;
                break;
              case "children":
                n = r;
                break;
              case "dangerouslySetInnerHTML":
                if (r != null) throw Error(c(91));
                break;
              default:
                yt(t, e, i, r, l, null);
            }
        hr(t, a, u, n);
        return;
      case "option":
        for (h in l)
          l.hasOwnProperty(h) &&
            ((a = l[h]), a != null) &&
            (h === "selected"
              ? (t.selected =
                  a && typeof a != "function" && typeof a != "symbol")
              : yt(t, e, h, a, l, null));
        return;
      case "dialog":
        (at("beforetoggle", t),
          at("toggle", t),
          at("cancel", t),
          at("close", t));
        break;
      case "iframe":
      case "object":
        at("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < pu.length; a++) at(pu[a], t);
        break;
      case "image":
        (at("error", t), at("load", t));
        break;
      case "details":
        at("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        (at("error", t), at("load", t));
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (T in l)
          if (l.hasOwnProperty(T) && ((a = l[T]), a != null))
            switch (T) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(c(137, e));
              default:
                yt(t, e, T, a, l, null);
            }
        return;
      default:
        if (bi(e)) {
          for (M in l)
            l.hasOwnProperty(M) &&
              ((a = l[M]), a !== void 0 && fc(t, e, M, a, l, void 0));
          return;
        }
    }
    for (r in l)
      l.hasOwnProperty(r) && ((a = l[r]), a != null && yt(t, e, r, a, l, null));
  }
  function zy(t, e, l, a) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var u = null,
          n = null,
          i = null,
          r = null,
          h = null,
          T = null,
          M = null;
        for (R in l) {
          var C = l[R];
          if (l.hasOwnProperty(R) && C != null)
            switch (R) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                h = C;
              default:
                a.hasOwnProperty(R) || yt(t, e, R, null, a, C);
            }
        }
        for (var z in a) {
          var R = a[z];
          if (((C = l[z]), a.hasOwnProperty(z) && (R != null || C != null)))
            switch (z) {
              case "type":
                n = R;
                break;
              case "name":
                u = R;
                break;
              case "checked":
                T = R;
                break;
              case "defaultChecked":
                M = R;
                break;
              case "value":
                i = R;
                break;
              case "defaultValue":
                r = R;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (R != null) throw Error(c(137, e));
                break;
              default:
                R !== C && yt(t, e, z, R, a, C);
            }
        }
        Si(t, i, r, h, T, M, n, u);
        return;
      case "select":
        R = i = r = z = null;
        for (n in l)
          if (((h = l[n]), l.hasOwnProperty(n) && h != null))
            switch (n) {
              case "value":
                break;
              case "multiple":
                R = h;
              default:
                a.hasOwnProperty(n) || yt(t, e, n, null, a, h);
            }
        for (u in a)
          if (
            ((n = a[u]),
            (h = l[u]),
            a.hasOwnProperty(u) && (n != null || h != null))
          )
            switch (u) {
              case "value":
                z = n;
                break;
              case "defaultValue":
                r = n;
                break;
              case "multiple":
                i = n;
              default:
                n !== h && yt(t, e, u, n, a, h);
            }
        ((e = r),
          (l = i),
          (a = R),
          z != null
            ? Pl(t, !!l, z, !1)
            : !!a != !!l &&
              (e != null ? Pl(t, !!l, e, !0) : Pl(t, !!l, l ? [] : "", !1)));
        return;
      case "textarea":
        R = z = null;
        for (r in l)
          if (
            ((u = l[r]),
            l.hasOwnProperty(r) && u != null && !a.hasOwnProperty(r))
          )
            switch (r) {
              case "value":
                break;
              case "children":
                break;
              default:
                yt(t, e, r, null, a, u);
            }
        for (i in a)
          if (
            ((u = a[i]),
            (n = l[i]),
            a.hasOwnProperty(i) && (u != null || n != null))
          )
            switch (i) {
              case "value":
                z = u;
                break;
              case "defaultValue":
                R = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(c(91));
                break;
              default:
                u !== n && yt(t, e, i, u, a, n);
            }
        dr(t, z, R);
        return;
      case "option":
        for (var L in l)
          ((z = l[L]),
            l.hasOwnProperty(L) &&
              z != null &&
              !a.hasOwnProperty(L) &&
              (L === "selected" ? (t.selected = !1) : yt(t, e, L, null, a, z)));
        for (h in a)
          ((z = a[h]),
            (R = l[h]),
            a.hasOwnProperty(h) &&
              z !== R &&
              (z != null || R != null) &&
              (h === "selected"
                ? (t.selected =
                    z && typeof z != "function" && typeof z != "symbol")
                : yt(t, e, h, z, a, R)));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var V in l)
          ((z = l[V]),
            l.hasOwnProperty(V) &&
              z != null &&
              !a.hasOwnProperty(V) &&
              yt(t, e, V, null, a, z));
        for (T in a)
          if (
            ((z = a[T]),
            (R = l[T]),
            a.hasOwnProperty(T) && z !== R && (z != null || R != null))
          )
            switch (T) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (z != null) throw Error(c(137, e));
                break;
              default:
                yt(t, e, T, z, a, R);
            }
        return;
      default:
        if (bi(e)) {
          for (var vt in l)
            ((z = l[vt]),
              l.hasOwnProperty(vt) &&
                z !== void 0 &&
                !a.hasOwnProperty(vt) &&
                fc(t, e, vt, void 0, a, z));
          for (M in a)
            ((z = a[M]),
              (R = l[M]),
              !a.hasOwnProperty(M) ||
                z === R ||
                (z === void 0 && R === void 0) ||
                fc(t, e, M, z, a, R));
          return;
        }
    }
    for (var S in l)
      ((z = l[S]),
        l.hasOwnProperty(S) &&
          z != null &&
          !a.hasOwnProperty(S) &&
          yt(t, e, S, null, a, z));
    for (C in a)
      ((z = a[C]),
        (R = l[C]),
        !a.hasOwnProperty(C) ||
          z === R ||
          (z == null && R == null) ||
          yt(t, e, C, z, a, R));
  }
  function gd(t) {
    switch (t) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function Ay() {
    if (typeof performance.getEntriesByType == "function") {
      for (
        var t = 0, e = 0, l = performance.getEntriesByType("resource"), a = 0;
        a < l.length;
        a++
      ) {
        var u = l[a],
          n = u.transferSize,
          i = u.initiatorType,
          r = u.duration;
        if (n && r && gd(i)) {
          for (i = 0, r = u.responseEnd, a += 1; a < l.length; a++) {
            var h = l[a],
              T = h.startTime;
            if (T > r) break;
            var M = h.transferSize,
              C = h.initiatorType;
            M &&
              gd(C) &&
              ((h = h.responseEnd), (i += M * (h < r ? 1 : (r - T) / (h - T))));
          }
          if ((--a, (e += (8 * (n + i)) / (u.duration / 1e3)), t++, 10 < t))
            break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection &&
      ((t = navigator.connection.downlink), typeof t == "number")
      ? t
      : 5;
  }
  var cc = null,
    rc = null;
  function Gn(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Sd(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function pd(t, e) {
    if (t === 0)
      switch (e) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && e === "foreignObject" ? 0 : t;
  }
  function oc(t, e) {
    return (
      t === "textarea" ||
      t === "noscript" ||
      typeof e.children == "string" ||
      typeof e.children == "number" ||
      typeof e.children == "bigint" ||
      (typeof e.dangerouslySetInnerHTML == "object" &&
        e.dangerouslySetInnerHTML !== null &&
        e.dangerouslySetInnerHTML.__html != null)
    );
  }
  var sc = null;
  function Ry() {
    var t = window.event;
    return t && t.type === "popstate"
      ? t === sc
        ? !1
        : ((sc = t), !0)
      : ((sc = null), !1);
  }
  var bd = typeof setTimeout == "function" ? setTimeout : void 0,
    _y = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Ed = typeof Promise == "function" ? Promise : void 0,
    Oy =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof Ed < "u"
          ? function (t) {
              return Ed.resolve(null).then(t).catch(My);
            }
          : bd;
  function My(t) {
    setTimeout(function () {
      throw t;
    });
  }
  function zl(t) {
    return t === "head";
  }
  function Td(t, e) {
    var l = e,
      a = 0;
    do {
      var u = l.nextSibling;
      if ((t.removeChild(l), u && u.nodeType === 8))
        if (((l = u.data), l === "/$" || l === "/&")) {
          if (a === 0) {
            (t.removeChild(u), Ca(e));
            return;
          }
          a--;
        } else if (
          l === "$" ||
          l === "$?" ||
          l === "$~" ||
          l === "$!" ||
          l === "&"
        )
          a++;
        else if (l === "html") Eu(t.ownerDocument.documentElement);
        else if (l === "head") {
          ((l = t.ownerDocument.head), Eu(l));
          for (var n = l.firstChild; n; ) {
            var i = n.nextSibling,
              r = n.nodeName;
            (n[Ga] ||
              r === "SCRIPT" ||
              r === "STYLE" ||
              (r === "LINK" && n.rel.toLowerCase() === "stylesheet") ||
              l.removeChild(n),
              (n = i));
          }
        } else l === "body" && Eu(t.ownerDocument.body);
      l = u;
    } while (l);
    Ca(e);
  }
  function zd(t, e) {
    var l = t;
    t = 0;
    do {
      var a = l.nextSibling;
      if (
        (l.nodeType === 1
          ? e
            ? ((l._stashedDisplay = l.style.display),
              (l.style.display = "none"))
            : ((l.style.display = l._stashedDisplay || ""),
              l.getAttribute("style") === "" && l.removeAttribute("style"))
          : l.nodeType === 3 &&
            (e
              ? ((l._stashedText = l.nodeValue), (l.nodeValue = ""))
              : (l.nodeValue = l._stashedText || "")),
        a && a.nodeType === 8)
      )
        if (((l = a.data), l === "/$")) {
          if (t === 0) break;
          t--;
        } else (l !== "$" && l !== "$?" && l !== "$~" && l !== "$!") || t++;
      l = a;
    } while (l);
  }
  function dc(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var l = e;
      switch (((e = e.nextSibling), l.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          (dc(l), vi(l));
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (l.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(l);
    }
  }
  function Dy(t, e, l, a) {
    for (; t.nodeType === 1; ) {
      var u = l;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!a && (t.nodeName !== "INPUT" || t.type !== "hidden")) break;
      } else if (a) {
        if (!t[Ga])
          switch (e) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (
                ((n = t.getAttribute("rel")),
                n === "stylesheet" && t.hasAttribute("data-precedence"))
              )
                break;
              if (
                n !== u.rel ||
                t.getAttribute("href") !==
                  (u.href == null || u.href === "" ? null : u.href) ||
                t.getAttribute("crossorigin") !==
                  (u.crossOrigin == null ? null : u.crossOrigin) ||
                t.getAttribute("title") !== (u.title == null ? null : u.title)
              )
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (
                ((n = t.getAttribute("src")),
                (n !== (u.src == null ? null : u.src) ||
                  t.getAttribute("type") !== (u.type == null ? null : u.type) ||
                  t.getAttribute("crossorigin") !==
                    (u.crossOrigin == null ? null : u.crossOrigin)) &&
                  n &&
                  t.hasAttribute("async") &&
                  !t.hasAttribute("itemprop"))
              )
                break;
              return t;
            default:
              return t;
          }
      } else if (e === "input" && t.type === "hidden") {
        var n = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && t.getAttribute("name") === n) return t;
      } else return t;
      if (((t = Ae(t.nextSibling)), t === null)) break;
    }
    return null;
  }
  function Uy(t, e, l) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") &&
          !l) ||
        ((t = Ae(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function Ad(t, e) {
    for (; t.nodeType !== 8; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") &&
          !e) ||
        ((t = Ae(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function hc(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function mc(t) {
    return (
      t.data === "$!" ||
      (t.data === "$?" && t.ownerDocument.readyState !== "loading")
    );
  }
  function Cy(t, e) {
    var l = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = e;
    else if (t.data !== "$?" || l.readyState !== "loading") e();
    else {
      var a = function () {
        (e(), l.removeEventListener("DOMContentLoaded", a));
      };
      (l.addEventListener("DOMContentLoaded", a), (t._reactRetry = a));
    }
  }
  function Ae(t) {
    for (; t != null; t = t.nextSibling) {
      var e = t.nodeType;
      if (e === 1 || e === 3) break;
      if (e === 8) {
        if (
          ((e = t.data),
          e === "$" ||
            e === "$!" ||
            e === "$?" ||
            e === "$~" ||
            e === "&" ||
            e === "F!" ||
            e === "F")
        )
          break;
        if (e === "/$" || e === "/&") return null;
      }
    }
    return t;
  }
  var yc = null;
  function Rd(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === "/$" || l === "/&") {
          if (e === 0) return Ae(t.nextSibling);
          e--;
        } else
          (l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&") ||
            e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function _d(t) {
    t = t.previousSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&") {
          if (e === 0) return t;
          e--;
        } else (l !== "/$" && l !== "/&") || e++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function Od(t, e, l) {
    switch (((e = Gn(l)), t)) {
      case "html":
        if (((t = e.documentElement), !t)) throw Error(c(452));
        return t;
      case "head":
        if (((t = e.head), !t)) throw Error(c(453));
        return t;
      case "body":
        if (((t = e.body), !t)) throw Error(c(454));
        return t;
      default:
        throw Error(c(451));
    }
  }
  function Eu(t) {
    for (var e = t.attributes; e.length; ) t.removeAttributeNode(e[0]);
    vi(t);
  }
  var Re = new Map(),
    Md = new Set();
  function jn(t) {
    return typeof t.getRootNode == "function"
      ? t.getRootNode()
      : t.nodeType === 9
        ? t
        : t.ownerDocument;
  }
  var ll = B.d;
  B.d = { f: Ny, r: Hy, D: xy, C: By, L: qy, m: Yy, X: Gy, S: Ly, M: jy };
  function Ny() {
    var t = ll.f(),
      e = Cn();
    return t || e;
  }
  function Hy(t) {
    var e = kl(t);
    e !== null && e.tag === 5 && e.type === "form" ? Ko(e) : ll.r(t);
  }
  var Ma = typeof document > "u" ? null : document;
  function Dd(t, e, l) {
    var a = Ma;
    if (a && typeof e == "string" && e) {
      var u = ge(e);
      ((u = 'link[rel="' + t + '"][href="' + u + '"]'),
        typeof l == "string" && (u += '[crossorigin="' + l + '"]'),
        Md.has(u) ||
          (Md.add(u),
          (t = { rel: t, crossOrigin: l, href: e }),
          a.querySelector(u) === null &&
            ((e = a.createElement("link")),
            Vt(e, "link", t),
            Lt(e),
            a.head.appendChild(e))));
    }
  }
  function xy(t) {
    (ll.D(t), Dd("dns-prefetch", t, null));
  }
  function By(t, e) {
    (ll.C(t, e), Dd("preconnect", t, e));
  }
  function qy(t, e, l) {
    ll.L(t, e, l);
    var a = Ma;
    if (a && t && e) {
      var u = 'link[rel="preload"][as="' + ge(e) + '"]';
      e === "image" && l && l.imageSrcSet
        ? ((u += '[imagesrcset="' + ge(l.imageSrcSet) + '"]'),
          typeof l.imageSizes == "string" &&
            (u += '[imagesizes="' + ge(l.imageSizes) + '"]'))
        : (u += '[href="' + ge(t) + '"]');
      var n = u;
      switch (e) {
        case "style":
          n = Da(t);
          break;
        case "script":
          n = Ua(t);
      }
      Re.has(n) ||
        ((t = A(
          {
            rel: "preload",
            href: e === "image" && l && l.imageSrcSet ? void 0 : t,
            as: e,
          },
          l,
        )),
        Re.set(n, t),
        a.querySelector(u) !== null ||
          (e === "style" && a.querySelector(Tu(n))) ||
          (e === "script" && a.querySelector(zu(n))) ||
          ((e = a.createElement("link")),
          Vt(e, "link", t),
          Lt(e),
          a.head.appendChild(e)));
    }
  }
  function Yy(t, e) {
    ll.m(t, e);
    var l = Ma;
    if (l && t) {
      var a = e && typeof e.as == "string" ? e.as : "script",
        u =
          'link[rel="modulepreload"][as="' + ge(a) + '"][href="' + ge(t) + '"]',
        n = u;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = Ua(t);
      }
      if (
        !Re.has(n) &&
        ((t = A({ rel: "modulepreload", href: t }, e)),
        Re.set(n, t),
        l.querySelector(u) === null)
      ) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(zu(n))) return;
        }
        ((a = l.createElement("link")),
          Vt(a, "link", t),
          Lt(a),
          l.head.appendChild(a));
      }
    }
  }
  function Ly(t, e, l) {
    ll.S(t, e, l);
    var a = Ma;
    if (a && t) {
      var u = Fl(a).hoistableStyles,
        n = Da(t);
      e = e || "default";
      var i = u.get(n);
      if (!i) {
        var r = { loading: 0, preload: null };
        if ((i = a.querySelector(Tu(n)))) r.loading = 5;
        else {
          ((t = A({ rel: "stylesheet", href: t, "data-precedence": e }, l)),
            (l = Re.get(n)) && vc(t, l));
          var h = (i = a.createElement("link"));
          (Lt(h),
            Vt(h, "link", t),
            (h._p = new Promise(function (T, M) {
              ((h.onload = T), (h.onerror = M));
            })),
            h.addEventListener("load", function () {
              r.loading |= 1;
            }),
            h.addEventListener("error", function () {
              r.loading |= 2;
            }),
            (r.loading |= 4),
            Xn(i, e, a));
        }
        ((i = { type: "stylesheet", instance: i, count: 1, state: r }),
          u.set(n, i));
      }
    }
  }
  function Gy(t, e) {
    ll.X(t, e);
    var l = Ma;
    if (l && t) {
      var a = Fl(l).hoistableScripts,
        u = Ua(t),
        n = a.get(u);
      n ||
        ((n = l.querySelector(zu(u))),
        n ||
          ((t = A({ src: t, async: !0 }, e)),
          (e = Re.get(u)) && gc(t, e),
          (n = l.createElement("script")),
          Lt(n),
          Vt(n, "link", t),
          l.head.appendChild(n)),
        (n = { type: "script", instance: n, count: 1, state: null }),
        a.set(u, n));
    }
  }
  function jy(t, e) {
    ll.M(t, e);
    var l = Ma;
    if (l && t) {
      var a = Fl(l).hoistableScripts,
        u = Ua(t),
        n = a.get(u);
      n ||
        ((n = l.querySelector(zu(u))),
        n ||
          ((t = A({ src: t, async: !0, type: "module" }, e)),
          (e = Re.get(u)) && gc(t, e),
          (n = l.createElement("script")),
          Lt(n),
          Vt(n, "link", t),
          l.head.appendChild(n)),
        (n = { type: "script", instance: n, count: 1, state: null }),
        a.set(u, n));
    }
  }
  function Ud(t, e, l, a) {
    var u = (u = et.current) ? jn(u) : null;
    if (!u) throw Error(c(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string"
          ? ((e = Da(l.href)),
            (l = Fl(u).hoistableStyles),
            (a = l.get(e)),
            a ||
              ((a = { type: "style", instance: null, count: 0, state: null }),
              l.set(e, a)),
            a)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          l.rel === "stylesheet" &&
          typeof l.href == "string" &&
          typeof l.precedence == "string"
        ) {
          t = Da(l.href);
          var n = Fl(u).hoistableStyles,
            i = n.get(t);
          if (
            (i ||
              ((u = u.ownerDocument || u),
              (i = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              n.set(t, i),
              (n = u.querySelector(Tu(t))) &&
                !n._p &&
                ((i.instance = n), (i.state.loading = 5)),
              Re.has(t) ||
                ((l = {
                  rel: "preload",
                  as: "style",
                  href: l.href,
                  crossOrigin: l.crossOrigin,
                  integrity: l.integrity,
                  media: l.media,
                  hrefLang: l.hrefLang,
                  referrerPolicy: l.referrerPolicy,
                }),
                Re.set(t, l),
                n || Xy(u, t, l, i.state))),
            e && a === null)
          )
            throw Error(c(528, ""));
          return i;
        }
        if (e && a !== null) throw Error(c(529, ""));
        return null;
      case "script":
        return (
          (e = l.async),
          (l = l.src),
          typeof l == "string" &&
          e &&
          typeof e != "function" &&
          typeof e != "symbol"
            ? ((e = Ua(l)),
              (l = Fl(u).hoistableScripts),
              (a = l.get(e)),
              a ||
                ((a = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                l.set(e, a)),
              a)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(c(444, t));
    }
  }
  function Da(t) {
    return 'href="' + ge(t) + '"';
  }
  function Tu(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Cd(t) {
    return A({}, t, { "data-precedence": t.precedence, precedence: null });
  }
  function Xy(t, e, l, a) {
    t.querySelector('link[rel="preload"][as="style"][' + e + "]")
      ? (a.loading = 1)
      : ((e = t.createElement("link")),
        (a.preload = e),
        e.addEventListener("load", function () {
          return (a.loading |= 1);
        }),
        e.addEventListener("error", function () {
          return (a.loading |= 2);
        }),
        Vt(e, "link", l),
        Lt(e),
        t.head.appendChild(e));
  }
  function Ua(t) {
    return '[src="' + ge(t) + '"]';
  }
  function zu(t) {
    return "script[async]" + t;
  }
  function Nd(t, e, l) {
    if ((e.count++, e.instance === null))
      switch (e.type) {
        case "style":
          var a = t.querySelector('style[data-href~="' + ge(l.href) + '"]');
          if (a) return ((e.instance = a), Lt(a), a);
          var u = A({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null,
          });
          return (
            (a = (t.ownerDocument || t).createElement("style")),
            Lt(a),
            Vt(a, "style", u),
            Xn(a, l.precedence, t),
            (e.instance = a)
          );
        case "stylesheet":
          u = Da(l.href);
          var n = t.querySelector(Tu(u));
          if (n) return ((e.state.loading |= 4), (e.instance = n), Lt(n), n);
          ((a = Cd(l)),
            (u = Re.get(u)) && vc(a, u),
            (n = (t.ownerDocument || t).createElement("link")),
            Lt(n));
          var i = n;
          return (
            (i._p = new Promise(function (r, h) {
              ((i.onload = r), (i.onerror = h));
            })),
            Vt(n, "link", a),
            (e.state.loading |= 4),
            Xn(n, l.precedence, t),
            (e.instance = n)
          );
        case "script":
          return (
            (n = Ua(l.src)),
            (u = t.querySelector(zu(n)))
              ? ((e.instance = u), Lt(u), u)
              : ((a = l),
                (u = Re.get(n)) && ((a = A({}, l)), gc(a, u)),
                (t = t.ownerDocument || t),
                (u = t.createElement("script")),
                Lt(u),
                Vt(u, "link", a),
                t.head.appendChild(u),
                (e.instance = u))
          );
        case "void":
          return null;
        default:
          throw Error(c(443, e.type));
      }
    else
      e.type === "stylesheet" &&
        (e.state.loading & 4) === 0 &&
        ((a = e.instance), (e.state.loading |= 4), Xn(a, l.precedence, t));
    return e.instance;
  }
  function Xn(t, e, l) {
    for (
      var a = l.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]',
        ),
        u = a.length ? a[a.length - 1] : null,
        n = u,
        i = 0;
      i < a.length;
      i++
    ) {
      var r = a[i];
      if (r.dataset.precedence === e) n = r;
      else if (n !== u) break;
    }
    n
      ? n.parentNode.insertBefore(t, n.nextSibling)
      : ((e = l.nodeType === 9 ? l.head : l), e.insertBefore(t, e.firstChild));
  }
  function vc(t, e) {
    (t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.title == null && (t.title = e.title));
  }
  function gc(t, e) {
    (t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.integrity == null && (t.integrity = e.integrity));
  }
  var Qn = null;
  function Hd(t, e, l) {
    if (Qn === null) {
      var a = new Map(),
        u = (Qn = new Map());
      u.set(l, a);
    } else ((u = Qn), (a = u.get(l)), a || ((a = new Map()), u.set(l, a)));
    if (a.has(t)) return a;
    for (
      a.set(t, null), l = l.getElementsByTagName(t), u = 0;
      u < l.length;
      u++
    ) {
      var n = l[u];
      if (
        !(
          n[Ga] ||
          n[jt] ||
          (t === "link" && n.getAttribute("rel") === "stylesheet")
        ) &&
        n.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var i = n.getAttribute(e) || "";
        i = t + i;
        var r = a.get(i);
        r ? r.push(n) : a.set(i, [n]);
      }
    }
    return a;
  }
  function xd(t, e, l) {
    ((t = t.ownerDocument || t),
      t.head.insertBefore(
        l,
        e === "title" ? t.querySelector("head > title") : null,
      ));
  }
  function Qy(t, e, l) {
    if (l === 1 || e.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof e.precedence != "string" ||
          typeof e.href != "string" ||
          e.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof e.rel != "string" ||
          typeof e.href != "string" ||
          e.href === "" ||
          e.onLoad ||
          e.onError
        )
          break;
        return e.rel === "stylesheet"
          ? ((t = e.disabled), typeof e.precedence == "string" && t == null)
          : !0;
      case "script":
        if (
          e.async &&
          typeof e.async != "function" &&
          typeof e.async != "symbol" &&
          !e.onLoad &&
          !e.onError &&
          e.src &&
          typeof e.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function Bd(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function Zy(t, e, l, a) {
    if (
      l.type === "stylesheet" &&
      (typeof a.media != "string" || matchMedia(a.media).matches !== !1) &&
      (l.state.loading & 4) === 0
    ) {
      if (l.instance === null) {
        var u = Da(a.href),
          n = e.querySelector(Tu(u));
        if (n) {
          ((e = n._p),
            e !== null &&
              typeof e == "object" &&
              typeof e.then == "function" &&
              (t.count++, (t = Zn.bind(t)), e.then(t, t)),
            (l.state.loading |= 4),
            (l.instance = n),
            Lt(n));
          return;
        }
        ((n = e.ownerDocument || e),
          (a = Cd(a)),
          (u = Re.get(u)) && vc(a, u),
          (n = n.createElement("link")),
          Lt(n));
        var i = n;
        ((i._p = new Promise(function (r, h) {
          ((i.onload = r), (i.onerror = h));
        })),
          Vt(n, "link", a),
          (l.instance = n));
      }
      (t.stylesheets === null && (t.stylesheets = new Map()),
        t.stylesheets.set(l, e),
        (e = l.state.preload) &&
          (l.state.loading & 3) === 0 &&
          (t.count++,
          (l = Zn.bind(t)),
          e.addEventListener("load", l),
          e.addEventListener("error", l)));
    }
  }
  var Sc = 0;
  function Vy(t, e) {
    return (
      t.stylesheets && t.count === 0 && Kn(t, t.stylesheets),
      0 < t.count || 0 < t.imgCount
        ? function (l) {
            var a = setTimeout(function () {
              if ((t.stylesheets && Kn(t, t.stylesheets), t.unsuspend)) {
                var n = t.unsuspend;
                ((t.unsuspend = null), n());
              }
            }, 6e4 + e);
            0 < t.imgBytes && Sc === 0 && (Sc = 62500 * Ay());
            var u = setTimeout(
              function () {
                if (
                  ((t.waitingForImages = !1),
                  t.count === 0 &&
                    (t.stylesheets && Kn(t, t.stylesheets), t.unsuspend))
                ) {
                  var n = t.unsuspend;
                  ((t.unsuspend = null), n());
                }
              },
              (t.imgBytes > Sc ? 50 : 800) + e,
            );
            return (
              (t.unsuspend = l),
              function () {
                ((t.unsuspend = null), clearTimeout(a), clearTimeout(u));
              }
            );
          }
        : null
    );
  }
  function Zn() {
    if (
      (this.count--,
      this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
    ) {
      if (this.stylesheets) Kn(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        ((this.unsuspend = null), t());
      }
    }
  }
  var Vn = null;
  function Kn(t, e) {
    ((t.stylesheets = null),
      t.unsuspend !== null &&
        (t.count++,
        (Vn = new Map()),
        e.forEach(Ky, t),
        (Vn = null),
        Zn.call(t)));
  }
  function Ky(t, e) {
    if (!(e.state.loading & 4)) {
      var l = Vn.get(t);
      if (l) var a = l.get(null);
      else {
        ((l = new Map()), Vn.set(t, l));
        for (
          var u = t.querySelectorAll(
              "link[data-precedence],style[data-precedence]",
            ),
            n = 0;
          n < u.length;
          n++
        ) {
          var i = u[n];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") &&
            (l.set(i.dataset.precedence, i), (a = i));
        }
        a && l.set(null, a);
      }
      ((u = e.instance),
        (i = u.getAttribute("data-precedence")),
        (n = l.get(i) || a),
        n === a && l.set(null, u),
        l.set(i, u),
        this.count++,
        (a = Zn.bind(this)),
        u.addEventListener("load", a),
        u.addEventListener("error", a),
        n
          ? n.parentNode.insertBefore(u, n.nextSibling)
          : ((t = t.nodeType === 9 ? t.head : t),
            t.insertBefore(u, t.firstChild)),
        (e.state.loading |= 4));
    }
  }
  var Au = {
    $$typeof: w,
    Provider: null,
    Consumer: null,
    _currentValue: $,
    _currentValue2: $,
    _threadCount: 0,
  };
  function Jy(t, e, l, a, u, n, i, r, h) {
    ((this.tag = 1),
      (this.containerInfo = t),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = di(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = di(0)),
      (this.hiddenUpdates = di(null)),
      (this.identifierPrefix = a),
      (this.onUncaughtError = u),
      (this.onCaughtError = n),
      (this.onRecoverableError = i),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = h),
      (this.incompleteTransitions = new Map()));
  }
  function qd(t, e, l, a, u, n, i, r, h, T, M, C) {
    return (
      (t = new Jy(t, e, l, i, h, T, M, C, r)),
      (e = 1),
      n === !0 && (e |= 24),
      (n = fe(3, null, null, e)),
      (t.current = n),
      (n.stateNode = t),
      (e = ki()),
      e.refCount++,
      (t.pooledCache = e),
      e.refCount++,
      (n.memoizedState = { element: a, isDehydrated: l, cache: e }),
      tf(n),
      t
    );
  }
  function Yd(t) {
    return t ? ((t = fa), t) : fa;
  }
  function Ld(t, e, l, a, u, n) {
    ((u = Yd(u)),
      a.context === null ? (a.context = u) : (a.pendingContext = u),
      (a = dl(e)),
      (a.payload = { element: l }),
      (n = n === void 0 ? null : n),
      n !== null && (a.callback = n),
      (l = hl(t, a, e)),
      l !== null && (le(l, t, e), lu(l, t, e)));
  }
  function Gd(t, e) {
    if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
      var l = t.retryLane;
      t.retryLane = l !== 0 && l < e ? l : e;
    }
  }
  function pc(t, e) {
    (Gd(t, e), (t = t.alternate) && Gd(t, e));
  }
  function jd(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Bl(t, 67108864);
      (e !== null && le(e, t, 67108864), pc(t, 67108864));
    }
  }
  function Xd(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = de();
      e = hi(e);
      var l = Bl(t, e);
      (l !== null && le(l, t, e), pc(t, e));
    }
  }
  var Jn = !0;
  function wy(t, e, l, a) {
    var u = D.T;
    D.T = null;
    var n = B.p;
    try {
      ((B.p = 2), bc(t, e, l, a));
    } finally {
      ((B.p = n), (D.T = u));
    }
  }
  function $y(t, e, l, a) {
    var u = D.T;
    D.T = null;
    var n = B.p;
    try {
      ((B.p = 8), bc(t, e, l, a));
    } finally {
      ((B.p = n), (D.T = u));
    }
  }
  function bc(t, e, l, a) {
    if (Jn) {
      var u = Ec(a);
      if (u === null) (ic(t, e, a, wn, l), Zd(t, a));
      else if (ky(u, t, e, l, a)) a.stopPropagation();
      else if ((Zd(t, a), e & 4 && -1 < Wy.indexOf(t))) {
        for (; u !== null; ) {
          var n = kl(u);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (((n = n.stateNode), n.current.memoizedState.isDehydrated)) {
                  var i = Ul(n.pendingLanes);
                  if (i !== 0) {
                    var r = n;
                    for (r.pendingLanes |= 2, r.entangledLanes |= 2; i; ) {
                      var h = 1 << (31 - ne(i));
                      ((r.entanglements[1] |= h), (i &= ~h));
                    }
                    (Ye(n), (rt & 6) === 0 && ((Dn = ae() + 500), Su(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((r = Bl(n, 2)), r !== null && le(r, n, 2), Cn(), pc(n, 2));
            }
          if (((n = Ec(a)), n === null && ic(t, e, a, wn, l), n === u)) break;
          u = n;
        }
        u !== null && a.stopPropagation();
      } else ic(t, e, a, null, l);
    }
  }
  function Ec(t) {
    return ((t = Ti(t)), Tc(t));
  }
  var wn = null;
  function Tc(t) {
    if (((wn = null), (t = Wl(t)), t !== null)) {
      var e = y(t);
      if (e === null) t = null;
      else {
        var l = e.tag;
        if (l === 13) {
          if (((t = b(e)), t !== null)) return t;
          t = null;
        } else if (l === 31) {
          if (((t = O(e)), t !== null)) return t;
          t = null;
        } else if (l === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return ((wn = t), null);
  }
  function Qd(t) {
    switch (t) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (xh()) {
          case Wc:
            return 2;
          case kc:
            return 8;
          case Bu:
          case Bh:
            return 32;
          case Fc:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var zc = !1,
    Al = null,
    Rl = null,
    _l = null,
    Ru = new Map(),
    _u = new Map(),
    Ol = [],
    Wy =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " ",
      );
  function Zd(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        Al = null;
        break;
      case "dragenter":
      case "dragleave":
        Rl = null;
        break;
      case "mouseover":
      case "mouseout":
        _l = null;
        break;
      case "pointerover":
      case "pointerout":
        Ru.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        _u.delete(e.pointerId);
    }
  }
  function Ou(t, e, l, a, u, n) {
    return t === null || t.nativeEvent !== n
      ? ((t = {
          blockedOn: e,
          domEventName: l,
          eventSystemFlags: a,
          nativeEvent: n,
          targetContainers: [u],
        }),
        e !== null && ((e = kl(e)), e !== null && jd(e)),
        t)
      : ((t.eventSystemFlags |= a),
        (e = t.targetContainers),
        u !== null && e.indexOf(u) === -1 && e.push(u),
        t);
  }
  function ky(t, e, l, a, u) {
    switch (e) {
      case "focusin":
        return ((Al = Ou(Al, t, e, l, a, u)), !0);
      case "dragenter":
        return ((Rl = Ou(Rl, t, e, l, a, u)), !0);
      case "mouseover":
        return ((_l = Ou(_l, t, e, l, a, u)), !0);
      case "pointerover":
        var n = u.pointerId;
        return (Ru.set(n, Ou(Ru.get(n) || null, t, e, l, a, u)), !0);
      case "gotpointercapture":
        return (
          (n = u.pointerId),
          _u.set(n, Ou(_u.get(n) || null, t, e, l, a, u)),
          !0
        );
    }
    return !1;
  }
  function Vd(t) {
    var e = Wl(t.target);
    if (e !== null) {
      var l = y(e);
      if (l !== null) {
        if (((e = l.tag), e === 13)) {
          if (((e = b(l)), e !== null)) {
            ((t.blockedOn = e),
              ar(t.priority, function () {
                Xd(l);
              }));
            return;
          }
        } else if (e === 31) {
          if (((e = O(l)), e !== null)) {
            ((t.blockedOn = e),
              ar(t.priority, function () {
                Xd(l);
              }));
            return;
          }
        } else if (e === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function $n(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var l = Ec(t.nativeEvent);
      if (l === null) {
        l = t.nativeEvent;
        var a = new l.constructor(l.type, l);
        ((Ei = a), l.target.dispatchEvent(a), (Ei = null));
      } else return ((e = kl(l)), e !== null && jd(e), (t.blockedOn = l), !1);
      e.shift();
    }
    return !0;
  }
  function Kd(t, e, l) {
    $n(t) && l.delete(e);
  }
  function Fy() {
    ((zc = !1),
      Al !== null && $n(Al) && (Al = null),
      Rl !== null && $n(Rl) && (Rl = null),
      _l !== null && $n(_l) && (_l = null),
      Ru.forEach(Kd),
      _u.forEach(Kd));
  }
  function Wn(t, e) {
    t.blockedOn === e &&
      ((t.blockedOn = null),
      zc ||
        ((zc = !0),
        f.unstable_scheduleCallback(f.unstable_NormalPriority, Fy)));
  }
  var kn = null;
  function Jd(t) {
    kn !== t &&
      ((kn = t),
      f.unstable_scheduleCallback(f.unstable_NormalPriority, function () {
        kn === t && (kn = null);
        for (var e = 0; e < t.length; e += 3) {
          var l = t[e],
            a = t[e + 1],
            u = t[e + 2];
          if (typeof a != "function") {
            if (Tc(a || l) === null) continue;
            break;
          }
          var n = kl(l);
          n !== null &&
            (t.splice(e, 3),
            (e -= 3),
            Ef(n, { pending: !0, data: u, method: l.method, action: a }, a, u));
        }
      }));
  }
  function Ca(t) {
    function e(h) {
      return Wn(h, t);
    }
    (Al !== null && Wn(Al, t),
      Rl !== null && Wn(Rl, t),
      _l !== null && Wn(_l, t),
      Ru.forEach(e),
      _u.forEach(e));
    for (var l = 0; l < Ol.length; l++) {
      var a = Ol[l];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < Ol.length && ((l = Ol[0]), l.blockedOn === null); )
      (Vd(l), l.blockedOn === null && Ol.shift());
    if (((l = (t.ownerDocument || t).$$reactFormReplay), l != null))
      for (a = 0; a < l.length; a += 3) {
        var u = l[a],
          n = l[a + 1],
          i = u[kt] || null;
        if (typeof n == "function") i || Jd(l);
        else if (i) {
          var r = null;
          if (n && n.hasAttribute("formAction")) {
            if (((u = n), (i = n[kt] || null))) r = i.formAction;
            else if (Tc(u) !== null) continue;
          } else r = i.action;
          (typeof r == "function" ? (l[a + 1] = r) : (l.splice(a, 3), (a -= 3)),
            Jd(l));
        }
      }
  }
  function wd() {
    function t(n) {
      n.canIntercept &&
        n.info === "react-transition" &&
        n.intercept({
          handler: function () {
            return new Promise(function (i) {
              return (u = i);
            });
          },
          focusReset: "manual",
          scroll: "manual",
        });
    }
    function e() {
      (u !== null && (u(), (u = null)), a || setTimeout(l, 20));
    }
    function l() {
      if (!a && !navigation.transition) {
        var n = navigation.currentEntry;
        n &&
          n.url != null &&
          navigation.navigate(n.url, {
            state: n.getState(),
            info: "react-transition",
            history: "replace",
          });
      }
    }
    if (typeof navigation == "object") {
      var a = !1,
        u = null;
      return (
        navigation.addEventListener("navigate", t),
        navigation.addEventListener("navigatesuccess", e),
        navigation.addEventListener("navigateerror", e),
        setTimeout(l, 100),
        function () {
          ((a = !0),
            navigation.removeEventListener("navigate", t),
            navigation.removeEventListener("navigatesuccess", e),
            navigation.removeEventListener("navigateerror", e),
            u !== null && (u(), (u = null)));
        }
      );
    }
  }
  function Ac(t) {
    this._internalRoot = t;
  }
  ((Fn.prototype.render = Ac.prototype.render =
    function (t) {
      var e = this._internalRoot;
      if (e === null) throw Error(c(409));
      var l = e.current,
        a = de();
      Ld(l, a, t, e, null, null);
    }),
    (Fn.prototype.unmount = Ac.prototype.unmount =
      function () {
        var t = this._internalRoot;
        if (t !== null) {
          this._internalRoot = null;
          var e = t.containerInfo;
          (Ld(t.current, 2, null, t, null, null), Cn(), (e[$l] = null));
        }
      }));
  function Fn(t) {
    this._internalRoot = t;
  }
  Fn.prototype.unstable_scheduleHydration = function (t) {
    if (t) {
      var e = lr();
      t = { blockedOn: null, target: t, priority: e };
      for (var l = 0; l < Ol.length && e !== 0 && e < Ol[l].priority; l++);
      (Ol.splice(l, 0, t), l === 0 && Vd(t));
    }
  };
  var $d = o.version;
  if ($d !== "19.2.5") throw Error(c(527, $d, "19.2.5"));
  B.findDOMNode = function (t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function"
        ? Error(c(188))
        : ((t = Object.keys(t).join(",")), Error(c(268, t)));
    return (
      (t = v(e)),
      (t = t !== null ? N(t) : null),
      (t = t === null ? null : t.stateNode),
      t
    );
  };
  var Iy = {
    bundleType: 0,
    version: "19.2.5",
    rendererPackageName: "react-dom",
    currentDispatcherRef: D,
    reconcilerVersion: "19.2.5",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var In = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!In.isDisabled && In.supportsFiber)
      try {
        ((qa = In.inject(Iy)), (ue = In));
      } catch {}
  }
  return (
    (Du.createRoot = function (t, e) {
      if (!d(t)) throw Error(c(299));
      var l = !1,
        a = "",
        u = es,
        n = ls,
        i = as;
      return (
        e != null &&
          (e.unstable_strictMode === !0 && (l = !0),
          e.identifierPrefix !== void 0 && (a = e.identifierPrefix),
          e.onUncaughtError !== void 0 && (u = e.onUncaughtError),
          e.onCaughtError !== void 0 && (n = e.onCaughtError),
          e.onRecoverableError !== void 0 && (i = e.onRecoverableError)),
        (e = qd(t, 1, !1, null, null, l, a, null, u, n, i, wd)),
        (t[$l] = e.current),
        nc(t),
        new Ac(e)
      );
    }),
    (Du.hydrateRoot = function (t, e, l) {
      if (!d(t)) throw Error(c(299));
      var a = !1,
        u = "",
        n = es,
        i = ls,
        r = as,
        h = null;
      return (
        l != null &&
          (l.unstable_strictMode === !0 && (a = !0),
          l.identifierPrefix !== void 0 && (u = l.identifierPrefix),
          l.onUncaughtError !== void 0 && (n = l.onUncaughtError),
          l.onCaughtError !== void 0 && (i = l.onCaughtError),
          l.onRecoverableError !== void 0 && (r = l.onRecoverableError),
          l.formState !== void 0 && (h = l.formState)),
        (e = qd(t, 1, !0, e, l ?? null, a, u, h, n, i, r, wd)),
        (e.context = Yd(null)),
        (l = e.current),
        (a = de()),
        (a = hi(a)),
        (u = dl(a)),
        (u.callback = null),
        hl(l, u, a),
        (l = a),
        (e.current.lanes = l),
        La(e, l),
        Ye(e),
        (t[$l] = e.current),
        nc(t),
        new Fn(e)
      );
    }),
    (Du.version = "19.2.5"),
    Du
  );
}
var uh;
function rv() {
  if (uh) return _c.exports;
  uh = 1;
  function f() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (o) {
        console.error(o);
      }
  }
  return (f(), (_c.exports = cv()), _c.exports);
}
var V0 = rv(),
  _ = Yc();
const ov = ev(_),
  K0 = tv({ __proto__: null, default: ov }, [_]);
var nh = "popstate";
function ih(f) {
  return (
    typeof f == "object" &&
    f != null &&
    "pathname" in f &&
    "search" in f &&
    "hash" in f &&
    "state" in f &&
    "key" in f
  );
}
function sv(f = {}) {
  function o(c, d) {
    let y = d.state?.masked,
      { pathname: b, search: O, hash: p } = y || c.location;
    return xc(
      "",
      { pathname: b, search: O, hash: p },
      (d.state && d.state.usr) || null,
      (d.state && d.state.key) || "default",
      y
        ? {
            pathname: c.location.pathname,
            search: c.location.search,
            hash: c.location.hash,
          }
        : void 0,
    );
  }
  function s(c, d) {
    return typeof d == "string" ? d : Cu(d);
  }
  return hv(o, s, null, f);
}
function At(f, o) {
  if (f === !1 || f === null || typeof f > "u") throw new Error(o);
}
function _e(f, o) {
  if (!f) {
    typeof console < "u" && console.warn(o);
    try {
      throw new Error(o);
    } catch {}
  }
}
function dv() {
  return Math.random().toString(36).substring(2, 10);
}
function fh(f, o) {
  return {
    usr: f.state,
    key: f.key,
    idx: o,
    masked: f.unstable_mask
      ? { pathname: f.pathname, search: f.search, hash: f.hash }
      : void 0,
  };
}
function xc(f, o, s = null, c, d) {
  return {
    pathname: typeof f == "string" ? f : f.pathname,
    search: "",
    hash: "",
    ...(typeof o == "string" ? Na(o) : o),
    state: s,
    key: (o && o.key) || c || dv(),
    unstable_mask: d,
  };
}
function Cu({ pathname: f = "/", search: o = "", hash: s = "" }) {
  return (
    o && o !== "?" && (f += o.charAt(0) === "?" ? o : "?" + o),
    s && s !== "#" && (f += s.charAt(0) === "#" ? s : "#" + s),
    f
  );
}
function Na(f) {
  let o = {};
  if (f) {
    let s = f.indexOf("#");
    s >= 0 && ((o.hash = f.substring(s)), (f = f.substring(0, s)));
    let c = f.indexOf("?");
    (c >= 0 && ((o.search = f.substring(c)), (f = f.substring(0, c))),
      f && (o.pathname = f));
  }
  return o;
}
function hv(f, o, s, c = {}) {
  let { window: d = document.defaultView, v5Compat: y = !1 } = c,
    b = d.history,
    O = "POP",
    p = null,
    v = N();
  v == null && ((v = 0), b.replaceState({ ...b.state, idx: v }, ""));
  function N() {
    return (b.state || { idx: null }).idx;
  }
  function A() {
    O = "POP";
    let x = N(),
      J = x == null ? null : x - v;
    ((v = x), p && p({ action: O, location: G.location, delta: J }));
  }
  function q(x, J) {
    O = "PUSH";
    let P = ih(x) ? x : xc(G.location, x, J);
    v = N() + 1;
    let w = fh(P, v),
      gt = G.createHref(P.unstable_mask || P);
    try {
      b.pushState(w, "", gt);
    } catch (St) {
      if (St instanceof DOMException && St.name === "DataCloneError") throw St;
      d.location.assign(gt);
    }
    y && p && p({ action: O, location: G.location, delta: 1 });
  }
  function K(x, J) {
    O = "REPLACE";
    let P = ih(x) ? x : xc(G.location, x, J);
    v = N();
    let w = fh(P, v),
      gt = G.createHref(P.unstable_mask || P);
    (b.replaceState(w, "", gt),
      y && p && p({ action: O, location: G.location, delta: 0 }));
  }
  function Z(x) {
    return mv(x);
  }
  let G = {
    get action() {
      return O;
    },
    get location() {
      return f(d, b);
    },
    listen(x) {
      if (p) throw new Error("A history only accepts one active listener");
      return (
        d.addEventListener(nh, A),
        (p = x),
        () => {
          (d.removeEventListener(nh, A), (p = null));
        }
      );
    },
    createHref(x) {
      return o(d, x);
    },
    createURL: Z,
    encodeLocation(x) {
      let J = Z(x);
      return { pathname: J.pathname, search: J.search, hash: J.hash };
    },
    push: q,
    replace: K,
    go(x) {
      return b.go(x);
    },
  };
  return G;
}
function mv(f, o = !1) {
  let s = "http://localhost";
  (typeof window < "u" &&
    (s =
      window.location.origin !== "null"
        ? window.location.origin
        : window.location.href),
    At(s, "No window.location.(origin|href) available to create URL"));
  let c = typeof f == "string" ? f : Cu(f);
  return (
    (c = c.replace(/ $/, "%20")),
    !o && c.startsWith("//") && (c = s + c),
    new URL(c, s)
  );
}
function hh(f, o, s = "/") {
  return yv(f, o, s, !1);
}
function yv(f, o, s, c) {
  let d = typeof o == "string" ? Na(o) : o,
    y = al(d.pathname || "/", s);
  if (y == null) return null;
  let b = mh(f);
  vv(b);
  let O = null;
  for (let p = 0; O == null && p < b.length; ++p) {
    let v = Ov(y);
    O = Rv(b[p], v, c);
  }
  return O;
}
function mh(f, o = [], s = [], c = "", d = !1) {
  let y = (b, O, p = d, v) => {
    let N = {
      relativePath: v === void 0 ? b.path || "" : v,
      caseSensitive: b.caseSensitive === !0,
      childrenIndex: O,
      route: b,
    };
    if (N.relativePath.startsWith("/")) {
      if (!N.relativePath.startsWith(c) && p) return;
      (At(
        N.relativePath.startsWith(c),
        `Absolute route path "${N.relativePath}" nested under path "${c}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`,
      ),
        (N.relativePath = N.relativePath.slice(c.length)));
    }
    let A = Le([c, N.relativePath]),
      q = s.concat(N);
    (b.children &&
      b.children.length > 0 &&
      (At(
        b.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${A}".`,
      ),
      mh(b.children, o, q, A, p)),
      !(b.path == null && !b.index) &&
        o.push({ path: A, score: zv(A, b.index), routesMeta: q }));
  };
  return (
    f.forEach((b, O) => {
      if (b.path === "" || !b.path?.includes("?")) y(b, O);
      else for (let p of yh(b.path)) y(b, O, !0, p);
    }),
    o
  );
}
function yh(f) {
  let o = f.split("/");
  if (o.length === 0) return [];
  let [s, ...c] = o,
    d = s.endsWith("?"),
    y = s.replace(/\?$/, "");
  if (c.length === 0) return d ? [y, ""] : [y];
  let b = yh(c.join("/")),
    O = [];
  return (
    O.push(...b.map((p) => (p === "" ? y : [y, p].join("/")))),
    d && O.push(...b),
    O.map((p) => (f.startsWith("/") && p === "" ? "/" : p))
  );
}
function vv(f) {
  f.sort((o, s) =>
    o.score !== s.score
      ? s.score - o.score
      : Av(
          o.routesMeta.map((c) => c.childrenIndex),
          s.routesMeta.map((c) => c.childrenIndex),
        ),
  );
}
var gv = /^:[\w-]+$/,
  Sv = 3,
  pv = 2,
  bv = 1,
  Ev = 10,
  Tv = -2,
  ch = (f) => f === "*";
function zv(f, o) {
  let s = f.split("/"),
    c = s.length;
  return (
    s.some(ch) && (c += Tv),
    o && (c += pv),
    s
      .filter((d) => !ch(d))
      .reduce((d, y) => d + (gv.test(y) ? Sv : y === "" ? bv : Ev), c)
  );
}
function Av(f, o) {
  return f.length === o.length && f.slice(0, -1).every((c, d) => c === o[d])
    ? f[f.length - 1] - o[o.length - 1]
    : 0;
}
function Rv(f, o, s = !1) {
  let { routesMeta: c } = f,
    d = {},
    y = "/",
    b = [];
  for (let O = 0; O < c.length; ++O) {
    let p = c[O],
      v = O === c.length - 1,
      N = y === "/" ? o : o.slice(y.length) || "/",
      A = li(
        { path: p.relativePath, caseSensitive: p.caseSensitive, end: v },
        N,
      ),
      q = p.route;
    if (
      (!A &&
        v &&
        s &&
        !c[c.length - 1].route.index &&
        (A = li(
          { path: p.relativePath, caseSensitive: p.caseSensitive, end: !1 },
          N,
        )),
      !A)
    )
      return null;
    (Object.assign(d, A.params),
      b.push({
        params: d,
        pathname: Le([y, A.pathname]),
        pathnameBase: Cv(Le([y, A.pathnameBase])),
        route: q,
      }),
      A.pathnameBase !== "/" && (y = Le([y, A.pathnameBase])));
  }
  return b;
}
function li(f, o) {
  typeof f == "string" && (f = { path: f, caseSensitive: !1, end: !0 });
  let [s, c] = _v(f.path, f.caseSensitive, f.end),
    d = o.match(s);
  if (!d) return null;
  let y = d[0],
    b = y.replace(/(.)\/+$/, "$1"),
    O = d.slice(1);
  return {
    params: c.reduce((v, { paramName: N, isOptional: A }, q) => {
      if (N === "*") {
        let Z = O[q] || "";
        b = y.slice(0, y.length - Z.length).replace(/(.)\/+$/, "$1");
      }
      const K = O[q];
      return (
        A && !K ? (v[N] = void 0) : (v[N] = (K || "").replace(/%2F/g, "/")),
        v
      );
    }, {}),
    pathname: y,
    pathnameBase: b,
    pattern: f,
  };
}
function _v(f, o = !1, s = !0) {
  _e(
    f === "*" || !f.endsWith("*") || f.endsWith("/*"),
    `Route path "${f}" will be treated as if it were "${f.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${f.replace(/\*$/, "/*")}".`,
  );
  let c = [],
    d =
      "^" +
      f
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(/\/:([\w-]+)(\?)?/g, (b, O, p, v, N) => {
          if ((c.push({ paramName: O, isOptional: p != null }), p)) {
            let A = N.charAt(v + b.length);
            return A && A !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
          }
          return "/([^\\/]+)";
        })
        .replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return (
    f.endsWith("*")
      ? (c.push({ paramName: "*" }),
        (d += f === "*" || f === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : s
        ? (d += "\\/*$")
        : f !== "" && f !== "/" && (d += "(?:(?=\\/|$))"),
    [new RegExp(d, o ? void 0 : "i"), c]
  );
}
function Ov(f) {
  try {
    return f
      .split("/")
      .map((o) => decodeURIComponent(o).replace(/\//g, "%2F"))
      .join("/");
  } catch (o) {
    return (
      _e(
        !1,
        `The URL path "${f}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${o}).`,
      ),
      f
    );
  }
}
function al(f, o) {
  if (o === "/") return f;
  if (!f.toLowerCase().startsWith(o.toLowerCase())) return null;
  let s = o.endsWith("/") ? o.length - 1 : o.length,
    c = f.charAt(s);
  return c && c !== "/" ? null : f.slice(s) || "/";
}
var Mv = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function Dv(f, o = "/") {
  let {
      pathname: s,
      search: c = "",
      hash: d = "",
    } = typeof f == "string" ? Na(f) : f,
    y;
  return (
    s
      ? ((s = s.replace(/\/\/+/g, "/")),
        s.startsWith("/") ? (y = rh(s.substring(1), "/")) : (y = rh(s, o)))
      : (y = o),
    { pathname: y, search: Nv(c), hash: Hv(d) }
  );
}
function rh(f, o) {
  let s = o.replace(/\/+$/, "").split("/");
  return (
    f.split("/").forEach((d) => {
      d === ".." ? s.length > 1 && s.pop() : d !== "." && s.push(d);
    }),
    s.length > 1 ? s.join("/") : "/"
  );
}
function Cc(f, o, s, c) {
  return `Cannot include a '${f}' character in a manually specified \`to.${o}\` field [${JSON.stringify(c)}].  Please separate it out to the \`to.${s}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Uv(f) {
  return f.filter(
    (o, s) => s === 0 || (o.route.path && o.route.path.length > 0),
  );
}
function Lc(f) {
  let o = Uv(f);
  return o.map((s, c) => (c === o.length - 1 ? s.pathname : s.pathnameBase));
}
function ai(f, o, s, c = !1) {
  let d;
  typeof f == "string"
    ? (d = Na(f))
    : ((d = { ...f }),
      At(
        !d.pathname || !d.pathname.includes("?"),
        Cc("?", "pathname", "search", d),
      ),
      At(
        !d.pathname || !d.pathname.includes("#"),
        Cc("#", "pathname", "hash", d),
      ),
      At(!d.search || !d.search.includes("#"), Cc("#", "search", "hash", d)));
  let y = f === "" || d.pathname === "",
    b = y ? "/" : d.pathname,
    O;
  if (b == null) O = s;
  else {
    let A = o.length - 1;
    if (!c && b.startsWith("..")) {
      let q = b.split("/");
      for (; q[0] === ".."; ) (q.shift(), (A -= 1));
      d.pathname = q.join("/");
    }
    O = A >= 0 ? o[A] : "/";
  }
  let p = Dv(d, O),
    v = b && b !== "/" && b.endsWith("/"),
    N = (y || b === ".") && s.endsWith("/");
  return (!p.pathname.endsWith("/") && (v || N) && (p.pathname += "/"), p);
}
var Le = (f) => f.join("/").replace(/\/\/+/g, "/"),
  Cv = (f) => f.replace(/\/+$/, "").replace(/^\/*/, "/"),
  Nv = (f) => (!f || f === "?" ? "" : f.startsWith("?") ? f : "?" + f),
  Hv = (f) => (!f || f === "#" ? "" : f.startsWith("#") ? f : "#" + f),
  xv = class {
    constructor(f, o, s, c = !1) {
      ((this.status = f),
        (this.statusText = o || ""),
        (this.internal = c),
        s instanceof Error
          ? ((this.data = s.toString()), (this.error = s))
          : (this.data = s));
    }
  };
function Bv(f) {
  return (
    f != null &&
    typeof f.status == "number" &&
    typeof f.statusText == "string" &&
    typeof f.internal == "boolean" &&
    "data" in f
  );
}
function qv(f) {
  return (
    f
      .map((o) => o.route.path)
      .filter(Boolean)
      .join("/")
      .replace(/\/\/*/g, "/") || "/"
  );
}
var vh =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
function gh(f, o) {
  let s = f;
  if (typeof s != "string" || !Mv.test(s))
    return { absoluteURL: void 0, isExternal: !1, to: s };
  let c = s,
    d = !1;
  if (vh)
    try {
      let y = new URL(window.location.href),
        b = s.startsWith("//") ? new URL(y.protocol + s) : new URL(s),
        O = al(b.pathname, o);
      b.origin === y.origin && O != null
        ? (s = O + b.search + b.hash)
        : (d = !0);
    } catch {
      _e(
        !1,
        `<Link to="${s}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`,
      );
    }
  return { absoluteURL: c, isExternal: d, to: s };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var Sh = ["POST", "PUT", "PATCH", "DELETE"];
new Set(Sh);
var Yv = ["GET", ...Sh];
new Set(Yv);
var Ha = _.createContext(null);
Ha.displayName = "DataRouter";
var ui = _.createContext(null);
ui.displayName = "DataRouterState";
var ph = _.createContext(!1);
function Lv() {
  return _.useContext(ph);
}
var bh = _.createContext({ isTransitioning: !1 });
bh.displayName = "ViewTransition";
var Gv = _.createContext(new Map());
Gv.displayName = "Fetchers";
var jv = _.createContext(null);
jv.displayName = "Await";
var he = _.createContext(null);
he.displayName = "Navigation";
var Nu = _.createContext(null);
Nu.displayName = "Location";
var Oe = _.createContext({ outlet: null, matches: [], isDataRoute: !1 });
Oe.displayName = "Route";
var Gc = _.createContext(null);
Gc.displayName = "RouteError";
var Eh = "REACT_ROUTER_ERROR",
  Xv = "REDIRECT",
  Qv = "ROUTE_ERROR_RESPONSE";
function Zv(f) {
  if (f.startsWith(`${Eh}:${Xv}:{`))
    try {
      let o = JSON.parse(f.slice(28));
      if (
        typeof o == "object" &&
        o &&
        typeof o.status == "number" &&
        typeof o.statusText == "string" &&
        typeof o.location == "string" &&
        typeof o.reloadDocument == "boolean" &&
        typeof o.replace == "boolean"
      )
        return o;
    } catch {}
}
function Vv(f) {
  if (f.startsWith(`${Eh}:${Qv}:{`))
    try {
      let o = JSON.parse(f.slice(40));
      if (
        typeof o == "object" &&
        o &&
        typeof o.status == "number" &&
        typeof o.statusText == "string"
      )
        return new xv(o.status, o.statusText, o.data);
    } catch {}
}
function Kv(f, { relative: o } = {}) {
  At(
    xa(),
    "useHref() may be used only in the context of a <Router> component.",
  );
  let { basename: s, navigator: c } = _.useContext(he),
    { hash: d, pathname: y, search: b } = Hu(f, { relative: o }),
    O = y;
  return (
    s !== "/" && (O = y === "/" ? s : Le([s, y])),
    c.createHref({ pathname: O, search: b, hash: d })
  );
}
function xa() {
  return _.useContext(Nu) != null;
}
function Ce() {
  return (
    At(
      xa(),
      "useLocation() may be used only in the context of a <Router> component.",
    ),
    _.useContext(Nu).location
  );
}
var Th =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function zh(f) {
  _.useContext(he).static || _.useLayoutEffect(f);
}
function jc() {
  let { isDataRoute: f } = _.useContext(Oe);
  return f ? i0() : Jv();
}
function Jv() {
  At(
    xa(),
    "useNavigate() may be used only in the context of a <Router> component.",
  );
  let f = _.useContext(Ha),
    { basename: o, navigator: s } = _.useContext(he),
    { matches: c } = _.useContext(Oe),
    { pathname: d } = Ce(),
    y = JSON.stringify(Lc(c)),
    b = _.useRef(!1);
  return (
    zh(() => {
      b.current = !0;
    }),
    _.useCallback(
      (p, v = {}) => {
        if ((_e(b.current, Th), !b.current)) return;
        if (typeof p == "number") {
          s.go(p);
          return;
        }
        let N = ai(p, JSON.parse(y), d, v.relative === "path");
        (f == null &&
          o !== "/" &&
          (N.pathname = N.pathname === "/" ? o : Le([o, N.pathname])),
          (v.replace ? s.replace : s.push)(N, v.state, v));
      },
      [o, s, y, d, f],
    )
  );
}
var wv = _.createContext(null);
function $v(f) {
  let o = _.useContext(Oe).outlet;
  return _.useMemo(
    () => o && _.createElement(wv.Provider, { value: f }, o),
    [o, f],
  );
}
function J0() {
  let { matches: f } = _.useContext(Oe),
    o = f[f.length - 1];
  return o ? o.params : {};
}
function Hu(f, { relative: o } = {}) {
  let { matches: s } = _.useContext(Oe),
    { pathname: c } = Ce(),
    d = JSON.stringify(Lc(s));
  return _.useMemo(() => ai(f, JSON.parse(d), c, o === "path"), [f, d, c, o]);
}
function Wv(f, o) {
  return Ah(f, o);
}
function Ah(f, o, s) {
  At(
    xa(),
    "useRoutes() may be used only in the context of a <Router> component.",
  );
  let { navigator: c } = _.useContext(he),
    { matches: d } = _.useContext(Oe),
    y = d[d.length - 1],
    b = y ? y.params : {},
    O = y ? y.pathname : "/",
    p = y ? y.pathnameBase : "/",
    v = y && y.route;
  {
    let x = (v && v.path) || "";
    _h(
      O,
      !v || x.endsWith("*") || x.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${O}" (under <Route path="${x}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${x}"> to <Route path="${x === "/" ? "*" : `${x}/*`}">.`,
    );
  }
  let N = Ce(),
    A;
  if (o) {
    let x = typeof o == "string" ? Na(o) : o;
    (At(
      p === "/" || x.pathname?.startsWith(p),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${p}" but pathname "${x.pathname}" was given in the \`location\` prop.`,
    ),
      (A = x));
  } else A = N;
  let q = A.pathname || "/",
    K = q;
  if (p !== "/") {
    let x = p.replace(/^\//, "").split("/");
    K = "/" + q.replace(/^\//, "").split("/").slice(x.length).join("/");
  }
  let Z = hh(f, { pathname: K });
  (_e(
    v || Z != null,
    `No routes matched location "${A.pathname}${A.search}${A.hash}" `,
  ),
    _e(
      Z == null ||
        Z[Z.length - 1].route.element !== void 0 ||
        Z[Z.length - 1].route.Component !== void 0 ||
        Z[Z.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${A.pathname}${A.search}${A.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`,
    ));
  let G = t0(
    Z &&
      Z.map((x) =>
        Object.assign({}, x, {
          params: Object.assign({}, b, x.params),
          pathname: Le([
            p,
            c.encodeLocation
              ? c.encodeLocation(
                  x.pathname
                    .replace(/%/g, "%25")
                    .replace(/\?/g, "%3F")
                    .replace(/#/g, "%23"),
                ).pathname
              : x.pathname,
          ]),
          pathnameBase:
            x.pathnameBase === "/"
              ? p
              : Le([
                  p,
                  c.encodeLocation
                    ? c.encodeLocation(
                        x.pathnameBase
                          .replace(/%/g, "%25")
                          .replace(/\?/g, "%3F")
                          .replace(/#/g, "%23"),
                      ).pathname
                    : x.pathnameBase,
                ]),
        }),
      ),
    d,
    s,
  );
  return o && G
    ? _.createElement(
        Nu.Provider,
        {
          value: {
            location: {
              pathname: "/",
              search: "",
              hash: "",
              state: null,
              key: "default",
              unstable_mask: void 0,
              ...A,
            },
            navigationType: "POP",
          },
        },
        G,
      )
    : G;
}
function kv() {
  let f = n0(),
    o = Bv(f)
      ? `${f.status} ${f.statusText}`
      : f instanceof Error
        ? f.message
        : JSON.stringify(f),
    s = f instanceof Error ? f.stack : null,
    c = "rgba(200,200,200, 0.5)",
    d = { padding: "0.5rem", backgroundColor: c },
    y = { padding: "2px 4px", backgroundColor: c },
    b = null;
  return (
    console.error("Error handled by React Router default ErrorBoundary:", f),
    (b = _.createElement(
      _.Fragment,
      null,
      _.createElement("p", null, "💿 Hey developer 👋"),
      _.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        _.createElement("code", { style: y }, "ErrorBoundary"),
        " or",
        " ",
        _.createElement("code", { style: y }, "errorElement"),
        " prop on your route.",
      ),
    )),
    _.createElement(
      _.Fragment,
      null,
      _.createElement("h2", null, "Unexpected Application Error!"),
      _.createElement("h3", { style: { fontStyle: "italic" } }, o),
      s ? _.createElement("pre", { style: d }, s) : null,
      b,
    )
  );
}
var Fv = _.createElement(kv, null),
  Rh = class extends _.Component {
    constructor(f) {
      (super(f),
        (this.state = {
          location: f.location,
          revalidation: f.revalidation,
          error: f.error,
        }));
    }
    static getDerivedStateFromError(f) {
      return { error: f };
    }
    static getDerivedStateFromProps(f, o) {
      return o.location !== f.location ||
        (o.revalidation !== "idle" && f.revalidation === "idle")
        ? { error: f.error, location: f.location, revalidation: f.revalidation }
        : {
            error: f.error !== void 0 ? f.error : o.error,
            location: o.location,
            revalidation: f.revalidation || o.revalidation,
          };
    }
    componentDidCatch(f, o) {
      this.props.onError
        ? this.props.onError(f, o)
        : console.error(
            "React Router caught the following error during render",
            f,
          );
    }
    render() {
      let f = this.state.error;
      if (
        this.context &&
        typeof f == "object" &&
        f &&
        "digest" in f &&
        typeof f.digest == "string"
      ) {
        const s = Vv(f.digest);
        s && (f = s);
      }
      let o =
        f !== void 0
          ? _.createElement(
              Oe.Provider,
              { value: this.props.routeContext },
              _.createElement(Gc.Provider, {
                value: f,
                children: this.props.component,
              }),
            )
          : this.props.children;
      return this.context ? _.createElement(Iv, { error: f }, o) : o;
    }
  };
Rh.contextType = ph;
var Nc = new WeakMap();
function Iv({ children: f, error: o }) {
  let { basename: s } = _.useContext(he);
  if (
    typeof o == "object" &&
    o &&
    "digest" in o &&
    typeof o.digest == "string"
  ) {
    let c = Zv(o.digest);
    if (c) {
      let d = Nc.get(o);
      if (d) throw d;
      let y = gh(c.location, s);
      if (vh && !Nc.get(o))
        if (y.isExternal || c.reloadDocument)
          window.location.href = y.absoluteURL || y.to;
        else {
          const b = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(y.to, {
              replace: c.replace,
            }),
          );
          throw (Nc.set(o, b), b);
        }
      return _.createElement("meta", {
        httpEquiv: "refresh",
        content: `0;url=${y.absoluteURL || y.to}`,
      });
    }
  }
  return f;
}
function Pv({ routeContext: f, match: o, children: s }) {
  let c = _.useContext(Ha);
  return (
    c &&
      c.static &&
      c.staticContext &&
      (o.route.errorElement || o.route.ErrorBoundary) &&
      (c.staticContext._deepestRenderedBoundaryId = o.route.id),
    _.createElement(Oe.Provider, { value: f }, s)
  );
}
function t0(f, o = [], s) {
  let c = s?.state;
  if (f == null) {
    if (!c) return null;
    if (c.errors) f = c.matches;
    else if (o.length === 0 && !c.initialized && c.matches.length > 0)
      f = c.matches;
    else return null;
  }
  let d = f,
    y = c?.errors;
  if (y != null) {
    let N = d.findIndex((A) => A.route.id && y?.[A.route.id] !== void 0);
    (At(
      N >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(y).join(",")}`,
    ),
      (d = d.slice(0, Math.min(d.length, N + 1))));
  }
  let b = !1,
    O = -1;
  if (s && c) {
    b = c.renderFallback;
    for (let N = 0; N < d.length; N++) {
      let A = d[N];
      if (
        ((A.route.HydrateFallback || A.route.hydrateFallbackElement) && (O = N),
        A.route.id)
      ) {
        let { loaderData: q, errors: K } = c,
          Z =
            A.route.loader &&
            !q.hasOwnProperty(A.route.id) &&
            (!K || K[A.route.id] === void 0);
        if (A.route.lazy || Z) {
          (s.isStatic && (b = !0),
            O >= 0 ? (d = d.slice(0, O + 1)) : (d = [d[0]]));
          break;
        }
      }
    }
  }
  let p = s?.onError,
    v =
      c && p
        ? (N, A) => {
            p(N, {
              location: c.location,
              params: c.matches?.[0]?.params ?? {},
              unstable_pattern: qv(c.matches),
              errorInfo: A,
            });
          }
        : void 0;
  return d.reduceRight((N, A, q) => {
    let K,
      Z = !1,
      G = null,
      x = null;
    c &&
      ((K = y && A.route.id ? y[A.route.id] : void 0),
      (G = A.route.errorElement || Fv),
      b &&
        (O < 0 && q === 0
          ? (_h(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration",
            ),
            (Z = !0),
            (x = null))
          : O === q &&
            ((Z = !0), (x = A.route.hydrateFallbackElement || null))));
    let J = o.concat(d.slice(0, q + 1)),
      P = () => {
        let w;
        return (
          K
            ? (w = G)
            : Z
              ? (w = x)
              : A.route.Component
                ? (w = _.createElement(A.route.Component, null))
                : A.route.element
                  ? (w = A.route.element)
                  : (w = N),
          _.createElement(Pv, {
            match: A,
            routeContext: { outlet: N, matches: J, isDataRoute: c != null },
            children: w,
          })
        );
      };
    return c && (A.route.ErrorBoundary || A.route.errorElement || q === 0)
      ? _.createElement(Rh, {
          location: c.location,
          revalidation: c.revalidation,
          component: G,
          error: K,
          children: P(),
          routeContext: { outlet: null, matches: J, isDataRoute: !0 },
          onError: v,
        })
      : P();
  }, null);
}
function Xc(f) {
  return `${f} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function e0(f) {
  let o = _.useContext(Ha);
  return (At(o, Xc(f)), o);
}
function l0(f) {
  let o = _.useContext(ui);
  return (At(o, Xc(f)), o);
}
function a0(f) {
  let o = _.useContext(Oe);
  return (At(o, Xc(f)), o);
}
function Qc(f) {
  let o = a0(f),
    s = o.matches[o.matches.length - 1];
  return (
    At(
      s.route.id,
      `${f} can only be used on routes that contain a unique "id"`,
    ),
    s.route.id
  );
}
function u0() {
  return Qc("useRouteId");
}
function n0() {
  let f = _.useContext(Gc),
    o = l0("useRouteError"),
    s = Qc("useRouteError");
  return f !== void 0 ? f : o.errors?.[s];
}
function i0() {
  let { router: f } = e0("useNavigate"),
    o = Qc("useNavigate"),
    s = _.useRef(!1);
  return (
    zh(() => {
      s.current = !0;
    }),
    _.useCallback(
      async (d, y = {}) => {
        (_e(s.current, Th),
          s.current &&
            (typeof d == "number"
              ? await f.navigate(d)
              : await f.navigate(d, { fromRouteId: o, ...y })));
      },
      [f, o],
    )
  );
}
var oh = {};
function _h(f, o, s) {
  !o && !oh[f] && ((oh[f] = !0), _e(!1, s));
}
_.memo(f0);
function f0({ routes: f, future: o, state: s, isStatic: c, onError: d }) {
  return Ah(f, void 0, { state: s, isStatic: c, onError: d });
}
function w0({ to: f, replace: o, state: s, relative: c }) {
  At(
    xa(),
    "<Navigate> may be used only in the context of a <Router> component.",
  );
  let { static: d } = _.useContext(he);
  _e(
    !d,
    "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.",
  );
  let { matches: y } = _.useContext(Oe),
    { pathname: b } = Ce(),
    O = jc(),
    p = ai(f, Lc(y), b, c === "path"),
    v = JSON.stringify(p);
  return (
    _.useEffect(() => {
      O(JSON.parse(v), { replace: o, state: s, relative: c });
    }, [O, v, c, o, s]),
    null
  );
}
function $0(f) {
  return $v(f.context);
}
function c0(f) {
  At(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.",
  );
}
function r0({
  basename: f = "/",
  children: o = null,
  location: s,
  navigationType: c = "POP",
  navigator: d,
  static: y = !1,
  unstable_useTransitions: b,
}) {
  At(
    !xa(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.",
  );
  let O = f.replace(/^\/*/, "/"),
    p = _.useMemo(
      () => ({
        basename: O,
        navigator: d,
        static: y,
        unstable_useTransitions: b,
        future: {},
      }),
      [O, d, y, b],
    );
  typeof s == "string" && (s = Na(s));
  let {
      pathname: v = "/",
      search: N = "",
      hash: A = "",
      state: q = null,
      key: K = "default",
      unstable_mask: Z,
    } = s,
    G = _.useMemo(() => {
      let x = al(v, O);
      return x == null
        ? null
        : {
            location: {
              pathname: x,
              search: N,
              hash: A,
              state: q,
              key: K,
              unstable_mask: Z,
            },
            navigationType: c,
          };
    }, [O, v, N, A, q, K, c, Z]);
  return (
    _e(
      G != null,
      `<Router basename="${O}"> is not able to match the URL "${v}${N}${A}" because it does not start with the basename, so the <Router> won't render anything.`,
    ),
    G == null
      ? null
      : _.createElement(
          he.Provider,
          { value: p },
          _.createElement(Nu.Provider, { children: o, value: G }),
        )
  );
}
function W0({ children: f, location: o }) {
  return Wv(Bc(f), o);
}
function Bc(f, o = []) {
  let s = [];
  return (
    _.Children.forEach(f, (c, d) => {
      if (!_.isValidElement(c)) return;
      let y = [...o, d];
      if (c.type === _.Fragment) {
        s.push.apply(s, Bc(c.props.children, y));
        return;
      }
      (At(
        c.type === c0,
        `[${typeof c.type == "string" ? c.type : c.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`,
      ),
        At(
          !c.props.index || !c.props.children,
          "An index route cannot have child routes.",
        ));
      let b = {
        id: c.props.id || y.join("-"),
        caseSensitive: c.props.caseSensitive,
        element: c.props.element,
        Component: c.props.Component,
        index: c.props.index,
        path: c.props.path,
        middleware: c.props.middleware,
        loader: c.props.loader,
        action: c.props.action,
        hydrateFallbackElement: c.props.hydrateFallbackElement,
        HydrateFallback: c.props.HydrateFallback,
        errorElement: c.props.errorElement,
        ErrorBoundary: c.props.ErrorBoundary,
        hasErrorBoundary:
          c.props.hasErrorBoundary === !0 ||
          c.props.ErrorBoundary != null ||
          c.props.errorElement != null,
        shouldRevalidate: c.props.shouldRevalidate,
        handle: c.props.handle,
        lazy: c.props.lazy,
      };
      (c.props.children && (b.children = Bc(c.props.children, y)), s.push(b));
    }),
    s
  );
}
var ti = "get",
  ei = "application/x-www-form-urlencoded";
function ni(f) {
  return typeof HTMLElement < "u" && f instanceof HTMLElement;
}
function o0(f) {
  return ni(f) && f.tagName.toLowerCase() === "button";
}
function s0(f) {
  return ni(f) && f.tagName.toLowerCase() === "form";
}
function d0(f) {
  return ni(f) && f.tagName.toLowerCase() === "input";
}
function h0(f) {
  return !!(f.metaKey || f.altKey || f.ctrlKey || f.shiftKey);
}
function m0(f, o) {
  return f.button === 0 && (!o || o === "_self") && !h0(f);
}
function qc(f = "") {
  return new URLSearchParams(
    typeof f == "string" || Array.isArray(f) || f instanceof URLSearchParams
      ? f
      : Object.keys(f).reduce((o, s) => {
          let c = f[s];
          return o.concat(Array.isArray(c) ? c.map((d) => [s, d]) : [[s, c]]);
        }, []),
  );
}
function y0(f, o) {
  let s = qc(f);
  return (
    o &&
      o.forEach((c, d) => {
        s.has(d) ||
          o.getAll(d).forEach((y) => {
            s.append(d, y);
          });
      }),
    s
  );
}
var Pn = null;
function v0() {
  if (Pn === null)
    try {
      (new FormData(document.createElement("form"), 0), (Pn = !1));
    } catch {
      Pn = !0;
    }
  return Pn;
}
var g0 = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function Hc(f) {
  return f != null && !g0.has(f)
    ? (_e(
        !1,
        `"${f}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${ei}"`,
      ),
      null)
    : f;
}
function S0(f, o) {
  let s, c, d, y, b;
  if (s0(f)) {
    let O = f.getAttribute("action");
    ((c = O ? al(O, o) : null),
      (s = f.getAttribute("method") || ti),
      (d = Hc(f.getAttribute("enctype")) || ei),
      (y = new FormData(f)));
  } else if (o0(f) || (d0(f) && (f.type === "submit" || f.type === "image"))) {
    let O = f.form;
    if (O == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>',
      );
    let p = f.getAttribute("formaction") || O.getAttribute("action");
    if (
      ((c = p ? al(p, o) : null),
      (s = f.getAttribute("formmethod") || O.getAttribute("method") || ti),
      (d =
        Hc(f.getAttribute("formenctype")) ||
        Hc(O.getAttribute("enctype")) ||
        ei),
      (y = new FormData(O, f)),
      !v0())
    ) {
      let { name: v, type: N, value: A } = f;
      if (N === "image") {
        let q = v ? `${v}.` : "";
        (y.append(`${q}x`, "0"), y.append(`${q}y`, "0"));
      } else v && y.append(v, A);
    }
  } else {
    if (ni(f))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">',
      );
    ((s = ti), (c = null), (d = ei), (b = f));
  }
  return (
    y && d === "text/plain" && ((b = y), (y = void 0)),
    { action: c, method: s.toLowerCase(), encType: d, formData: y, body: b }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Zc(f, o) {
  if (f === !1 || f === null || typeof f > "u") throw new Error(o);
}
function Oh(f, o, s, c) {
  let d =
    typeof f == "string"
      ? new URL(
          f,
          typeof window > "u"
            ? "server://singlefetch/"
            : window.location.origin,
        )
      : f;
  return (
    s
      ? d.pathname.endsWith("/")
        ? (d.pathname = `${d.pathname}_.${c}`)
        : (d.pathname = `${d.pathname}.${c}`)
      : d.pathname === "/"
        ? (d.pathname = `_root.${c}`)
        : o && al(d.pathname, o) === "/"
          ? (d.pathname = `${o.replace(/\/$/, "")}/_root.${c}`)
          : (d.pathname = `${d.pathname.replace(/\/$/, "")}.${c}`),
    d
  );
}
async function p0(f, o) {
  if (f.id in o) return o[f.id];
  try {
    let s = await import(f.module);
    return ((o[f.id] = s), s);
  } catch (s) {
    return (
      console.error(
        `Error loading route module \`${f.module}\`, reloading page...`,
      ),
      console.error(s),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function b0(f) {
  return f == null
    ? !1
    : f.href == null
      ? f.rel === "preload" &&
        typeof f.imageSrcSet == "string" &&
        typeof f.imageSizes == "string"
      : typeof f.rel == "string" && typeof f.href == "string";
}
async function E0(f, o, s) {
  let c = await Promise.all(
    f.map(async (d) => {
      let y = o.routes[d.route.id];
      if (y) {
        let b = await p0(y, s);
        return b.links ? b.links() : [];
      }
      return [];
    }),
  );
  return R0(
    c
      .flat(1)
      .filter(b0)
      .filter((d) => d.rel === "stylesheet" || d.rel === "preload")
      .map((d) =>
        d.rel === "stylesheet"
          ? { ...d, rel: "prefetch", as: "style" }
          : { ...d, rel: "prefetch" },
      ),
  );
}
function sh(f, o, s, c, d, y) {
  let b = (p, v) => (s[v] ? p.route.id !== s[v].route.id : !0),
    O = (p, v) =>
      s[v].pathname !== p.pathname ||
      (s[v].route.path?.endsWith("*") && s[v].params["*"] !== p.params["*"]);
  return y === "assets"
    ? o.filter((p, v) => b(p, v) || O(p, v))
    : y === "data"
      ? o.filter((p, v) => {
          let N = c.routes[p.route.id];
          if (!N || !N.hasLoader) return !1;
          if (b(p, v) || O(p, v)) return !0;
          if (p.route.shouldRevalidate) {
            let A = p.route.shouldRevalidate({
              currentUrl: new URL(
                d.pathname + d.search + d.hash,
                window.origin,
              ),
              currentParams: s[0]?.params || {},
              nextUrl: new URL(f, window.origin),
              nextParams: p.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof A == "boolean") return A;
          }
          return !0;
        })
      : [];
}
function T0(f, o, { includeHydrateFallback: s } = {}) {
  return z0(
    f
      .map((c) => {
        let d = o.routes[c.route.id];
        if (!d) return [];
        let y = [d.module];
        return (
          d.clientActionModule && (y = y.concat(d.clientActionModule)),
          d.clientLoaderModule && (y = y.concat(d.clientLoaderModule)),
          s &&
            d.hydrateFallbackModule &&
            (y = y.concat(d.hydrateFallbackModule)),
          d.imports && (y = y.concat(d.imports)),
          y
        );
      })
      .flat(1),
  );
}
function z0(f) {
  return [...new Set(f)];
}
function A0(f) {
  let o = {},
    s = Object.keys(f).sort();
  for (let c of s) o[c] = f[c];
  return o;
}
function R0(f, o) {
  let s = new Set();
  return (
    new Set(o),
    f.reduce((c, d) => {
      let y = JSON.stringify(A0(d));
      return (s.has(y) || (s.add(y), c.push({ key: y, link: d })), c);
    }, [])
  );
}
function Vc() {
  let f = _.useContext(Ha);
  return (
    Zc(
      f,
      "You must render this element inside a <DataRouterContext.Provider> element",
    ),
    f
  );
}
function _0() {
  let f = _.useContext(ui);
  return (
    Zc(
      f,
      "You must render this element inside a <DataRouterStateContext.Provider> element",
    ),
    f
  );
}
var Kc = _.createContext(void 0);
Kc.displayName = "FrameworkContext";
function Jc() {
  let f = _.useContext(Kc);
  return (
    Zc(f, "You must render this element inside a <HydratedRouter> element"),
    f
  );
}
function O0(f, o) {
  let s = _.useContext(Kc),
    [c, d] = _.useState(!1),
    [y, b] = _.useState(!1),
    {
      onFocus: O,
      onBlur: p,
      onMouseEnter: v,
      onMouseLeave: N,
      onTouchStart: A,
    } = o,
    q = _.useRef(null);
  (_.useEffect(() => {
    if ((f === "render" && b(!0), f === "viewport")) {
      let G = (J) => {
          J.forEach((P) => {
            b(P.isIntersecting);
          });
        },
        x = new IntersectionObserver(G, { threshold: 0.5 });
      return (
        q.current && x.observe(q.current),
        () => {
          x.disconnect();
        }
      );
    }
  }, [f]),
    _.useEffect(() => {
      if (c) {
        let G = setTimeout(() => {
          b(!0);
        }, 100);
        return () => {
          clearTimeout(G);
        };
      }
    }, [c]));
  let K = () => {
      d(!0);
    },
    Z = () => {
      (d(!1), b(!1));
    };
  return s
    ? f !== "intent"
      ? [y, q, {}]
      : [
          y,
          q,
          {
            onFocus: Uu(O, K),
            onBlur: Uu(p, Z),
            onMouseEnter: Uu(v, K),
            onMouseLeave: Uu(N, Z),
            onTouchStart: Uu(A, K),
          },
        ]
    : [!1, q, {}];
}
function Uu(f, o) {
  return (s) => {
    (f && f(s), s.defaultPrevented || o(s));
  };
}
function M0({ page: f, ...o }) {
  let s = Lv(),
    { router: c } = Vc(),
    d = _.useMemo(() => hh(c.routes, f, c.basename), [c.routes, f, c.basename]);
  return d
    ? s
      ? _.createElement(U0, { page: f, matches: d, ...o })
      : _.createElement(C0, { page: f, matches: d, ...o })
    : null;
}
function D0(f) {
  let { manifest: o, routeModules: s } = Jc(),
    [c, d] = _.useState([]);
  return (
    _.useEffect(() => {
      let y = !1;
      return (
        E0(f, o, s).then((b) => {
          y || d(b);
        }),
        () => {
          y = !0;
        }
      );
    }, [f, o, s]),
    c
  );
}
function U0({ page: f, matches: o, ...s }) {
  let c = Ce(),
    { future: d } = Jc(),
    { basename: y } = Vc(),
    b = _.useMemo(() => {
      if (f === c.pathname + c.search + c.hash) return [];
      let O = Oh(f, y, d.unstable_trailingSlashAwareDataRequests, "rsc"),
        p = !1,
        v = [];
      for (let N of o)
        typeof N.route.shouldRevalidate == "function"
          ? (p = !0)
          : v.push(N.route.id);
      return (
        p && v.length > 0 && O.searchParams.set("_routes", v.join(",")),
        [O.pathname + O.search]
      );
    }, [y, d.unstable_trailingSlashAwareDataRequests, f, c, o]);
  return _.createElement(
    _.Fragment,
    null,
    b.map((O) =>
      _.createElement("link", {
        key: O,
        rel: "prefetch",
        as: "fetch",
        href: O,
        ...s,
      }),
    ),
  );
}
function C0({ page: f, matches: o, ...s }) {
  let c = Ce(),
    { future: d, manifest: y, routeModules: b } = Jc(),
    { basename: O } = Vc(),
    { loaderData: p, matches: v } = _0(),
    N = _.useMemo(() => sh(f, o, v, y, c, "data"), [f, o, v, y, c]),
    A = _.useMemo(() => sh(f, o, v, y, c, "assets"), [f, o, v, y, c]),
    q = _.useMemo(() => {
      if (f === c.pathname + c.search + c.hash) return [];
      let G = new Set(),
        x = !1;
      if (
        (o.forEach((P) => {
          let w = y.routes[P.route.id];
          !w ||
            !w.hasLoader ||
            ((!N.some((gt) => gt.route.id === P.route.id) &&
              P.route.id in p &&
              b[P.route.id]?.shouldRevalidate) ||
            w.hasClientLoader
              ? (x = !0)
              : G.add(P.route.id));
        }),
        G.size === 0)
      )
        return [];
      let J = Oh(f, O, d.unstable_trailingSlashAwareDataRequests, "data");
      return (
        x &&
          G.size > 0 &&
          J.searchParams.set(
            "_routes",
            o
              .filter((P) => G.has(P.route.id))
              .map((P) => P.route.id)
              .join(","),
          ),
        [J.pathname + J.search]
      );
    }, [O, d.unstable_trailingSlashAwareDataRequests, p, c, y, N, o, f, b]),
    K = _.useMemo(() => T0(A, y), [A, y]),
    Z = D0(A);
  return _.createElement(
    _.Fragment,
    null,
    q.map((G) =>
      _.createElement("link", {
        key: G,
        rel: "prefetch",
        as: "fetch",
        href: G,
        ...s,
      }),
    ),
    K.map((G) =>
      _.createElement("link", { key: G, rel: "modulepreload", href: G, ...s }),
    ),
    Z.map(({ key: G, link: x }) =>
      _.createElement("link", {
        key: G,
        nonce: s.nonce,
        ...x,
        crossOrigin: x.crossOrigin ?? s.crossOrigin,
      }),
    ),
  );
}
function N0(...f) {
  return (o) => {
    f.forEach((s) => {
      typeof s == "function" ? s(o) : s != null && (s.current = o);
    });
  };
}
var H0 =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  H0 && (window.__reactRouterVersion = "7.14.0");
} catch {}
function k0({
  basename: f,
  children: o,
  unstable_useTransitions: s,
  window: c,
}) {
  let d = _.useRef();
  d.current == null && (d.current = sv({ window: c, v5Compat: !0 }));
  let y = d.current,
    [b, O] = _.useState({ action: y.action, location: y.location }),
    p = _.useCallback(
      (v) => {
        s === !1 ? O(v) : _.startTransition(() => O(v));
      },
      [s],
    );
  return (
    _.useLayoutEffect(() => y.listen(p), [y, p]),
    _.createElement(r0, {
      basename: f,
      children: o,
      location: b.location,
      navigationType: b.action,
      navigator: y,
      unstable_useTransitions: s,
    })
  );
}
var Mh = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Dh = _.forwardRef(function (
    {
      onClick: o,
      discover: s = "render",
      prefetch: c = "none",
      relative: d,
      reloadDocument: y,
      replace: b,
      unstable_mask: O,
      state: p,
      target: v,
      to: N,
      preventScrollReset: A,
      viewTransition: q,
      unstable_defaultShouldRevalidate: K,
      ...Z
    },
    G,
  ) {
    let {
        basename: x,
        navigator: J,
        unstable_useTransitions: P,
      } = _.useContext(he),
      w = typeof N == "string" && Mh.test(N),
      gt = gh(N, x);
    N = gt.to;
    let St = Kv(N, { relative: d }),
      Rt = Ce(),
      W = null;
    if (O) {
      let Nt = ai(
        O,
        [],
        Rt.unstable_mask ? Rt.unstable_mask.pathname : "/",
        !0,
      );
      (x !== "/" &&
        (Nt.pathname = Nt.pathname === "/" ? x : Le([x, Nt.pathname])),
        (W = J.createHref(Nt)));
    }
    let [Mt, Kt, Ne] = O0(c, Z),
      me = Y0(N, {
        replace: b,
        unstable_mask: O,
        state: p,
        target: v,
        preventScrollReset: A,
        relative: d,
        viewTransition: q,
        unstable_defaultShouldRevalidate: K,
        unstable_useTransitions: P,
      });
    function Jt(Nt) {
      (o && o(Nt), Nt.defaultPrevented || me(Nt));
    }
    let He = !(gt.isExternal || y),
      ye = _.createElement("a", {
        ...Z,
        ...Ne,
        href: (He ? W : void 0) || gt.absoluteURL || St,
        onClick: He ? Jt : o,
        ref: N0(G, Kt),
        target: v,
        "data-discover": !w && s === "render" ? "true" : void 0,
      });
    return Mt && !w
      ? _.createElement(_.Fragment, null, ye, _.createElement(M0, { page: St }))
      : ye;
  });
Dh.displayName = "Link";
var x0 = _.forwardRef(function (
  {
    "aria-current": o = "page",
    caseSensitive: s = !1,
    className: c = "",
    end: d = !1,
    style: y,
    to: b,
    viewTransition: O,
    children: p,
    ...v
  },
  N,
) {
  let A = Hu(b, { relative: v.relative }),
    q = Ce(),
    K = _.useContext(ui),
    { navigator: Z, basename: G } = _.useContext(he),
    x = K != null && Q0(A) && O === !0,
    J = Z.encodeLocation ? Z.encodeLocation(A).pathname : A.pathname,
    P = q.pathname,
    w =
      K && K.navigation && K.navigation.location
        ? K.navigation.location.pathname
        : null;
  (s ||
    ((P = P.toLowerCase()),
    (w = w ? w.toLowerCase() : null),
    (J = J.toLowerCase())),
    w && G && (w = al(w, G) || w));
  const gt = J !== "/" && J.endsWith("/") ? J.length - 1 : J.length;
  let St = P === J || (!d && P.startsWith(J) && P.charAt(gt) === "/"),
    Rt =
      w != null &&
      (w === J || (!d && w.startsWith(J) && w.charAt(J.length) === "/")),
    W = { isActive: St, isPending: Rt, isTransitioning: x },
    Mt = St ? o : void 0,
    Kt;
  typeof c == "function"
    ? (Kt = c(W))
    : (Kt = [
        c,
        St ? "active" : null,
        Rt ? "pending" : null,
        x ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "));
  let Ne = typeof y == "function" ? y(W) : y;
  return _.createElement(
    Dh,
    {
      ...v,
      "aria-current": Mt,
      className: Kt,
      ref: N,
      style: Ne,
      to: b,
      viewTransition: O,
    },
    typeof p == "function" ? p(W) : p,
  );
});
x0.displayName = "NavLink";
var B0 = _.forwardRef(
  (
    {
      discover: f = "render",
      fetcherKey: o,
      navigate: s,
      reloadDocument: c,
      replace: d,
      state: y,
      method: b = ti,
      action: O,
      onSubmit: p,
      relative: v,
      preventScrollReset: N,
      viewTransition: A,
      unstable_defaultShouldRevalidate: q,
      ...K
    },
    Z,
  ) => {
    let { unstable_useTransitions: G } = _.useContext(he),
      x = j0(),
      J = X0(O, { relative: v }),
      P = b.toLowerCase() === "get" ? "get" : "post",
      w = typeof O == "string" && Mh.test(O),
      gt = (St) => {
        if ((p && p(St), St.defaultPrevented)) return;
        St.preventDefault();
        let Rt = St.nativeEvent.submitter,
          W = Rt?.getAttribute("formmethod") || b,
          Mt = () =>
            x(Rt || St.currentTarget, {
              fetcherKey: o,
              method: W,
              navigate: s,
              replace: d,
              state: y,
              relative: v,
              preventScrollReset: N,
              viewTransition: A,
              unstable_defaultShouldRevalidate: q,
            });
        G && s !== !1 ? _.startTransition(() => Mt()) : Mt();
      };
    return _.createElement("form", {
      ref: Z,
      method: P,
      action: J,
      onSubmit: c ? p : gt,
      ...K,
      "data-discover": !w && f === "render" ? "true" : void 0,
    });
  },
);
B0.displayName = "Form";
function q0(f) {
  return `${f} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Uh(f) {
  let o = _.useContext(Ha);
  return (At(o, q0(f)), o);
}
function Y0(
  f,
  {
    target: o,
    replace: s,
    unstable_mask: c,
    state: d,
    preventScrollReset: y,
    relative: b,
    viewTransition: O,
    unstable_defaultShouldRevalidate: p,
    unstable_useTransitions: v,
  } = {},
) {
  let N = jc(),
    A = Ce(),
    q = Hu(f, { relative: b });
  return _.useCallback(
    (K) => {
      if (m0(K, o)) {
        K.preventDefault();
        let Z = s !== void 0 ? s : Cu(A) === Cu(q),
          G = () =>
            N(f, {
              replace: Z,
              unstable_mask: c,
              state: d,
              preventScrollReset: y,
              relative: b,
              viewTransition: O,
              unstable_defaultShouldRevalidate: p,
            });
        v ? _.startTransition(() => G()) : G();
      }
    },
    [A, N, q, s, c, d, o, f, y, b, O, p, v],
  );
}
function F0(f) {
  _e(
    typeof URLSearchParams < "u",
    "You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.",
  );
  let o = _.useRef(qc(f)),
    s = _.useRef(!1),
    c = Ce(),
    d = _.useMemo(() => y0(c.search, s.current ? null : o.current), [c.search]),
    y = jc(),
    b = _.useCallback(
      (O, p) => {
        const v = qc(typeof O == "function" ? O(new URLSearchParams(d)) : O);
        ((s.current = !0), y("?" + v, p));
      },
      [y, d],
    );
  return [d, b];
}
var L0 = 0,
  G0 = () => `__${String(++L0)}__`;
function j0() {
  let { router: f } = Uh("useSubmit"),
    { basename: o } = _.useContext(he),
    s = u0(),
    c = f.fetch,
    d = f.navigate;
  return _.useCallback(
    async (y, b = {}) => {
      let { action: O, method: p, encType: v, formData: N, body: A } = S0(y, o);
      if (b.navigate === !1) {
        let q = b.fetcherKey || G0();
        await c(q, s, b.action || O, {
          unstable_defaultShouldRevalidate: b.unstable_defaultShouldRevalidate,
          preventScrollReset: b.preventScrollReset,
          formData: N,
          body: A,
          formMethod: b.method || p,
          formEncType: b.encType || v,
          flushSync: b.flushSync,
        });
      } else
        await d(b.action || O, {
          unstable_defaultShouldRevalidate: b.unstable_defaultShouldRevalidate,
          preventScrollReset: b.preventScrollReset,
          formData: N,
          body: A,
          formMethod: b.method || p,
          formEncType: b.encType || v,
          replace: b.replace,
          state: b.state,
          fromRouteId: s,
          flushSync: b.flushSync,
          viewTransition: b.viewTransition,
        });
    },
    [c, d, o, s],
  );
}
function X0(f, { relative: o } = {}) {
  let { basename: s } = _.useContext(he),
    c = _.useContext(Oe);
  At(c, "useFormAction must be used inside a RouteContext");
  let [d] = c.matches.slice(-1),
    y = { ...Hu(f || ".", { relative: o }) },
    b = Ce();
  if (f == null) {
    y.search = b.search;
    let O = new URLSearchParams(y.search),
      p = O.getAll("index");
    if (p.some((N) => N === "")) {
      (O.delete("index"),
        p.filter((A) => A).forEach((A) => O.append("index", A)));
      let N = O.toString();
      y.search = N ? `?${N}` : "";
    }
  }
  return (
    (!f || f === ".") &&
      d.route.index &&
      (y.search = y.search ? y.search.replace(/^\?/, "?index&") : "?index"),
    s !== "/" && (y.pathname = y.pathname === "/" ? s : Le([s, y.pathname])),
    Cu(y)
  );
}
function Q0(f, { relative: o } = {}) {
  let s = _.useContext(bh);
  At(
    s != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?",
  );
  let { basename: c } = Uh("useViewTransitionState"),
    d = Hu(f, { relative: o });
  if (!s.isTransitioning) return !1;
  let y = al(s.currentLocation.pathname, c) || s.currentLocation.pathname,
    b = al(s.nextLocation.pathname, c) || s.nextLocation.pathname;
  return li(d.pathname, b) != null || li(d.pathname, y) != null;
}
var I0 = dh();
export {
  k0 as B,
  ov as G,
  Dh as L,
  x0 as N,
  $0 as O,
  W0 as R,
  J0 as a,
  Ce as b,
  w0 as c,
  Yc as d,
  I0 as e,
  F0 as f,
  c0 as g,
  V0 as h,
  Z0 as j,
  _ as r,
  K0 as t,
  jc as u,
};
