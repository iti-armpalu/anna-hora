// lib/prisma.ts

import { PrismaPg } from "@prisma/adapter-pg";
import pkg from "pg";
import { PrismaClient } from "./generated/prisma/client";

const { Pool } = pkg;

// Create a connection pool using your Neon DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Wrap it with Prisma's Postgres adapter
const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
