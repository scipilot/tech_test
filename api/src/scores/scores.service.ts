import type { BaseScore, Score } from "./score.interface"
import * as scoreModel from "./scores.model"

// Service Methods
// Currently just wraps the chosen model (thin service smell!) but more logic would be added in this layer

export const findAll = async ()=>scoreModel.getScores()

export const find = async (id: number): Promise<Score> => scoreModel.getScore(id)

export  async function create (newItem: BaseScore): Promise<Score>{
	return scoreModel.createScore(newItem)
}
