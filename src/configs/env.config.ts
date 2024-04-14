const ENV = (import.meta.env.VITE_NODE_ENV) || "development";

export const envConfig = {
  test: ENV === "test",
  dev: ENV === "development",
  prod: ENV === "production",
};
