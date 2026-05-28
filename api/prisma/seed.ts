/**
 * The DB Seed just adds the default anonymous Player 1 and 2 for the game demo.
 * Should be added to prisma.config like
 *   migrations: {
 *       path: "prisma/migrations",
 *       seed: "tsx src/prisma/seed.ts",
 *   },
 *
 * @todo not sure if it's quite working? (might just be my local machine)
 * 		If not: use `npx prisma studio` and add two users at ID 1 and 2
 */

import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaBetterSqlite3({ url: connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
	const alice = await prisma.user.upsert({
		where: { id: 1 },
		update: {},
		create: {
			id: 1,
			name: "Player 1",
			email: "player1@localhost",
			createdAt: new Date(),
		},
	});
	const bob = await prisma.user.upsert({
		where: { id: 2 },
		update: {},
		create: {
			id: 2,
			name: "Player 2",
			email: "player2@localhost",
			createdAt: new Date(),
		},
	});
	console.log("Added default players", { alice, bob });
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
