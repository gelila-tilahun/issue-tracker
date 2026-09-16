import { PrismaClient } from "../app/generated/client";

const createPrismaClient = () => {
  const dbUrl = process.env.DATABASE_URL;
  const isServer = typeof window === "undefined";
  const urlToUse = dbUrl || (isServer ? undefined : "mysql://mock:mock@localhost:3306/mock");

  // Append connection_limit and pool_timeout if not already present
  const finalUrl = urlToUse
    ? urlToUse.includes("connection_limit")
      ? urlToUse
      : `${urlToUse}${urlToUse.includes("?") ? "&" : "?"}connection_limit=1&pool_timeout=20`
    : urlToUse;

  return new PrismaClient({
    datasources: {
      db: {
        url: finalUrl,
      },
    },
    log:
      process.env.NODE_ENV === "development"
        ? ["error", "warn"]
        : ["error"],
  });
};

declare global {
  var prismaClient: PrismaClient | undefined;
}

const prisma = globalThis.prismaClient ?? createPrismaClient();

export default prisma;

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaClient = prisma;
}