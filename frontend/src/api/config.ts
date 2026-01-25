const DEFAULT_USER_ID = 1;

export const API_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3000  ";

export const USER_ID = Number(
  import.meta.env.VITE_DEFAULT_USER_ID ?? DEFAULT_USER_ID,
);
