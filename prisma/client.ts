import { PrismaClient } from "../app/generated/client";

const createPrismaClient = () => {
  const dbUrl = process.env.DATABASE_URL;

  // Next.js static compilation/Turbopack might run this code before env is injected.
  // We use a fallback during static analysis to prevent the constructor from crashing.
  const isServer = typeof window === "undefined";
  const urlToUse = dbUrl || (isServer ? undefined : "mysql://mock:mock@localhost:3306/mock");

  return new PrismaClient({
    datasources: {
      db: {
        url: urlToUse,
      },
    },
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
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