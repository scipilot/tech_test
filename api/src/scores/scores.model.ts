import {prisma} from '../prisma/prisma'
import {BaseScore, type Score} from './score.interface'
import {ScoreModel} from '../../generated/prisma/models/Score'

export async function createScore(score: BaseScore) {
	const newScore = await prisma.score.create({
		data: {
			userId: Number(score.player), // TODO FUTURE, any user via authentication, currently just Player1/2
			score: 1, // TODO FUTURE e.g. store number of moves?
		},
	})

	return mapScoreDToA(newScore)
}

export async function getScore(id: number) {
	const score = await prisma.score.findUnique({
		where: {
			id,
		},
	})

	return mapScoreDToA(score)
}

export async function getScores() {
	const scores = await prisma.score.findMany({
		include: {
			user: true,
		},
	})

	return scores.map(mapScoreDToA)
}

// Map data model to API domain
function mapScoreDToA(score: ScoreModel): Score {
	return {
		id: score.id,
		player: score.userId,
		score: score.score,
		when: score.createdAt
	}
}
