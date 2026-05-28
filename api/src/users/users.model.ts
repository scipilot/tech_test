
import {prisma} from '../prisma/prisma'
import {UserModel} from '../../generated/prisma/models/User'
import {User} from './user.interface'

// TODO FUTURE: might allow users to register beyond seed "Player 1" and "Player 2"
// Create a new user
export async function create(name: string, email: string) {
	const user = await prisma.user.create({
		data: {
			name, 	// todo validate/sanitise?
			email,	// todo validate/sanitise?
			createdAt: new Date(),
		},
	})
	return mapUserDtoA(user)
}

/** todo finish securely
export async function deleteOne(id: number) {
	const deleteUsers = await prisma.user.delete({
		where: {
			id,
		},
	});
}
*/

export async function getAll() {
	const users = await prisma.user.findMany()
	// {
	// 	// include: {
	// 	// 	score: true, // TODO use this to aggregate all scores for leaderboard?
	// 	// },
	// });

	return users.map(mapUserDtoA)
}

// Map data model to API domain
function mapUserDtoA(user: UserModel): User {
	return {
		id: user.id,
		name: user.name,
		email: user.email,
		since: user.createdAt,
	}
}
