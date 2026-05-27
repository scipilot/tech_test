import React from 'react'
import {useEffect, useState} from 'react'
import {GetScores} from '../api/api'
import {Score} from '../api/types'


export const Scoreboard = () => {
	const [scores, setScores] = useState<Score[]>([])

	// TODO RELOAD ON WIN
	useEffect(() => {
			(async () => {
			let newscores = await GetScores()
			setScores(newscores.data.scores)
			})()
		},
		[])

	return <div className='flex flex-col mt-10 items-center gap-10'>
		<table>
			<tr><th>Player</th><th>Score</th><th>When</th></tr>
			{scores.map((row, r) => <tr key={"R"+r}>
				<td>{row.player}</td>
				<td>{row.score}</td>
				<td>{new Date(row.when).toLocaleDateString()}</td>
			</tr>)}
		</table>
	</div>
}
