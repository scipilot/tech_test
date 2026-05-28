import React from 'react'
import {useEffect, useState} from 'react'
import {GetUsers} from '../api/api'
import {User} from '../api/types'


export const UserList = () => {
	const [users, setUsers] = useState<User[]>([])

	// TODO RELOAD ON WIN
	useEffect(() => {
			(async () => {
			let newusers = await GetUsers()
			setUsers(newusers.data.users)
			})()
		},
		[])

	return <div className='flex flex-col mt-10 items-center gap-10'>
		<table>
			<tr><th>Name</th><th>Email</th><th>Since</th></tr>
			{users.map((row, r) => <tr key={"R"+r}>
				<td>{row.name}</td>
				<td>{row.email}</td>	{/* --TODO PRIVACY -- */}
				<td>{new Date(row.since).toLocaleDateString()}</td>
			</tr>)}
		</table>
	</div>
}
