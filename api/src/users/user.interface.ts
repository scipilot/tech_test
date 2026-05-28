
export interface BaseUser {
	name: string;
	email: string;
	since: Date;
}

export interface User extends BaseUser {
	id: number;
}
