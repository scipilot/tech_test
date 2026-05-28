/**
 * In-Memory Store DEMO (strategy)
 *  See SQL version
 */

import type {BaseScore, Score} from './score.interface'
import {Scores} from './scores.interface'

let scores: Scores = {
	1: {
		id: 1,
		player:1,
		score:100,
		when: new Date()
	}
}

export const findAll = async (): Promise<Score[]> => Object.values(scores)

export const find = async (id: number): Promise<Score> => scores[id]

export const create = async (newItem: BaseScore): Promise<Score> => {
	const id = new Date().valueOf()

	scores[id] = {
		id,
		...newItem,
		when: new Date()
	}

	return scores[id]
}
