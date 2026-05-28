import * as dotenv from "dotenv"
import express from "express"
import cors from "cors"
import helmet from "helmet"
import { scoresRouter } from "./scores/scores.router"
import { usersRouter } from "./users/users.router"

// Environment
dotenv.config();
if (!process.env.PORT) {
	process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10);

// App
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

// Noun Routes
app.use("/api/scores", scoresRouter);
app.use("/api/users", usersRouter); // TODO FUTURE for user reg/auth, leaderboard, admin

// Server
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
