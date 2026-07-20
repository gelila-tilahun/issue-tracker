import "dotenv/config"; // <--- Add this at the absolute top
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL ?? "mysql://root:pass@localhost:3306/issue-tracker"
  },
});