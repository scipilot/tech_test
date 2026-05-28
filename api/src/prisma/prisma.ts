import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaBetterSqlite3({ url: connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };

/*
Add this to /api/prisma/schema.prisma (if it gets overwritten!)

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  scores Score[]
  createdAt DateTime   @default(now())
}
model Score {
  id        Int     @id @default(autoincrement())
  user    User    @relation(fields: [userId], references: [id])
  userId  Int
  score   Int
  createdAt DateTime   @default(now())
}

*/
