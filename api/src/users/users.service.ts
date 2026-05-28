/**
 * User Service would be used in future if allowing users to register and login etc.
 * Currently we just have two prefab users: player1 / 2
 */
import * as usersModel from "./users.model"
import {BaseUser, User} from './user.interface'

// Service Methods

export  async function create (newUser: BaseUser): Promise<User>{
	return await usersModel.create(newUser.name, newUser.email)
}

export const findAll = async ()=> usersModel.getAll()

// export const find = async (id: number): Promise<Score> => usersModel.find(id)

/* DEPRECATED: DB Init should be done in Prisma seed
export  async function init (): Promise<void>{
	await usersModel.deleteOne(1)
	await usersModel.deleteOne(2)
	await usersModel.create("Player 1","player1@email.com")
	await usersModel.create("Player 2","player2@email.com")
}
*/
