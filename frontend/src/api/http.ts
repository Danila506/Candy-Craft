// src/api/http.ts
import { API_URL } from "./config";

type ApiErrorShape = {
  statusCode?: number;
  message?: string | string[];
  error?: string;
};

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

function parseErrorMessage(data: ApiErrorShape | any, fallback: string) {
  const msg = data?.message ?? data?.error;
  if (Array.isArray(msg)) return msg.join(", ");
  if (typeof msg === "string" && msg.trim()) return msg;
  return fallback;
}

async function readJsonSafe(res: Response) {
  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("application/json")) return null;
  return await res.json().catch(() => null);
}

/**
 * Чтобы не было 10 параллельных refresh запросов
 */
let refreshPromise: Promise<boolean> | null = null;

async function tryRefresh(): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const res = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      // refresh endpoint обычно может вернуть user/token,
      // но нам достаточно знать ok / not ok
      return res.ok;
    })().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

export type RequestOptions = Omit<RequestInit, "body" | "headers"> & {
  headers?: Record<string, string>;
  body?: any;
  retryOn401?: boolean; // по умолчанию true
};

export async function api<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { headers = {}, body, retryOn401 = true, ...rest } = options;

  const res = await fetch(`${API_URL}${path}`, {
    ...rest,
    method: rest.method ?? "GET",
    credentials: "include", // ✅ cookie будут отправляться/приниматься
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  // ✅ Если 401 — пробуем refresh и повторяем запрос
  if (res.status === 401 && retryOn401) {
    const refreshed = await tryRefresh();
    if (refreshed) {
      return api<T>(path, { ...options, retryOn401: false }); // повтор без бесконечного цикла
    }
    throw new ApiError("Сессия истекла. Войдите снова.", 401);
  }

  if (!res.ok) {
    const data = await readJsonSafe(res);
    const msg = parseErrorMessage(data, `Ошибка ${res.status}`);
    throw new ApiError(msg, res.status, data);
  }

  // Если ответ пустой (204) — вернём null как T
  if (res.status === 204) return null as T;

  const data = await readJsonSafe(res);
  return data as T;
}

/**
 * Удобные хелперы
 */
export const http = {
  get: <T>(path: string, options?: RequestOptions) =>
    api<T>(path, { ...options, method: "GET" }),
  post: <T>(path: string, body?: any, options?: RequestOptions) =>
    api<T>(path, { ...options, method: "POST", body }),
  put: <T>(path: string, body?: any, options?: RequestOptions) =>
    api<T>(path, { ...options, method: "PUT", body }),
  patch: <T>(path: string, body?: any, options?: RequestOptions) =>
    api<T>(path, { ...options, method: "PATCH", body }),
  del: <T>(path: string, options?: RequestOptions) =>
    api<T>(path, { ...options, method: "DELETE" }),
};
