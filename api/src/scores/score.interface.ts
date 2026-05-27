
export interface BaseScore {
	player: string;
	score: number;
	when: Date;
}

export interface Score extends BaseScore {
	id: number;
}
