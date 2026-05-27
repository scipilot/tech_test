import express, { Request, Response } from "express"
import * as scoreService from "./scores.service"
import { BaseScore, Score } from "./score.interface"
import {wrap} from '../api'

// Define Router
export const scoresRouter = express.Router()

// Define controllers

// GET scores
scoresRouter.get("/", async (req: Request, res: Response) => {
	try {
		const scores: Score[] = await scoreService.findAll();

		res.status(200).send(wrap(scores, "scores"))
	} catch (e) {
		res.status(500).send(e.message);
	}
});

// GET scores/:id
scoresRouter.get("/:id", async (req: Request, res: Response) => {
	const id: number = parseInt(req.params.id, 10);

	try {
		const item: Score = await scoreService.find(id);

		if (item) {
			return res.status(200).send(wrap(item, "score"))
		}

		res.status(404).send("item not found")
	} catch (e) {
		res.status(500).send(e.message)
	}
});

// POST scores
scoresRouter.post("/", async (req: Request, res: Response) => {
	try {
		const score: BaseScore = req.body;

		const newscore = await scoreService.create(score)

		res.status(201).json(wrap(newscore, "score"))
	} catch (e) {
		res.status(500).send(e.message)
	}
});

// PUT scores/:id
// NOT USED YET

// DELETE scores/:id
// NOT USED YET
