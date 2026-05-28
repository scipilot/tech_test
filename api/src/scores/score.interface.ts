
export interface BaseScore {
	player: number
	score: number
	when: Date
}

export interface Score extends BaseScore {
	id: number
}
