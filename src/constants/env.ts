// src/config/env.ts

export const BASE_DOMAIN =
  process.env.NODE_ENV === "development"
    ? "localhost:5173"
    : "lms.co.tz";