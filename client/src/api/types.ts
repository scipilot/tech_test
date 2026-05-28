
export type ApiResponse<T> = {
	data: T;
	success: boolean;
	message: string;
}

export type SimpleResponse = {
	success: boolean;
	message: string;
}

export type GetScoresResponse = ApiResponse<GetScoresResponseData>
export type GetScoresResponseData = {
	scores: Score[]
}

export interface Score {
	id: string
	player: string
	score: number
	when: Date
}

export type GetUsersResponse = ApiResponse<GetUsersResponseData>
export type GetUsersResponseData = {
	users: User[]
}

export interface User {
	id: string
	name: string
	email: string
	since: Date
}
