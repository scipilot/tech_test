import express, { Request, Response } from "express"
import * as usersService from "./users.service"
import {wrap} from '../api'
import {User} from './user.interface'

// Define Router
export const usersRouter = express.Router()

// Define controllers

/* DEPRECATED: DB Init should be done in Prisma seed
// INITIALISE users - used once to set up anonymous Player 1 and Player 2
usersRouter.post("/init", async (req: Request, res: Response) => {
	try {
		await usersService.init()

		res.status(201).json(wrap({}}))
	}
	catch (e) {
		res.status(500).send(e.message)
	}
});
*/

// TODO: note get-users was just for development to check the default users. Could be used for a league table or admin, if enhanced with basic security etc.
// GET users
usersRouter.get("/", async (req: Request, res: Response) => {
	try {
		const users: User[] = await usersService.findAll();

		res.status(200).send(wrap(users, "users"))
	} catch (e) {
		res.status(500).send(e.message);
	}
})
