import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["error", "warn"]
        : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export async function withPrismaFallback<T>(
  operation: () => Promise<T>,
  fallback: T,
  label = "database query",
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    console.error(`[prisma] ${label} failed:`, error);
    return fallback;
  }
}
