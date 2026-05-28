import React, {useEffect, useState} from 'react'
import {XorO} from './types'
import {Scoreboard} from './components/Scoreboard'
import {SubmitScore} from './api/api'
import {UserList} from './components/UserList'

export const Main = () => {
	const initialBoard = [
		[undefined, undefined, undefined],
		[undefined, undefined, undefined],
		[undefined, undefined, undefined]
	]
	// winning combination masks (3x3 only)
	const winMap = [
		[[0, 0], [0, 1], [0, 2]],//H
		[[1, 0], [1, 1], [1, 2]],//H
		[[2, 0], [2, 1], [2, 2]],//H
		[[0, 0], [1, 0], [2, 0]],//V
		[[0, 1], [1, 1], [2, 1]],//V
		[[0, 2], [1, 2], [2, 2]],//V
		[[0, 0], [1, 1], [2, 2]],//D
		[[0, 2], [1, 1], [2, 0]],//D
	]

	const [board, setBoard] = useState<(XorO | undefined)[][]>([...initialBoard])
	const [player, setPlayer] = useState<number>(1)
	const [winner, setWinner] = useState<number | undefined>(undefined)
	const [scale, setScale] = useState<number>(3)
	const [ready, setReady] = useState<Boolean>(false)
	const playerMarks: (XorO | undefined)[] = [undefined, 'X', 'O']

	function initialiseBoard() {
		setBoard(new Array(scale).fill(undefined).map(() => new Array(scale).fill(undefined)))
	}

	function handleClick(row, column) {
		if (board[row][column] !== undefined) return
		if (winner !== undefined) return

		setBoard((state) => {
			const newstate = [...state]
			newstate[row][column] = playerMarks[player]
			return newstate
		})
		setPlayer(player === 1 ? 2 : 1)
		setReady(true)
	}

	// static size win detection
	function checkWin(player: number) {
		for (let m of winMap) {
			let h = 0
			for (let i = 0; i < 3; i++) {
				if (board[m[i][0]][m[i][1]] === playerMarks[player]) h++
			}
			if (h === 3) return true
		}
	}

	// scalable win detection
	function checkWinMNK(scale, player: number) {
		let h = 0

		// Horizontal
		for (let i = 0; i < scale; i++) {
			h = 0
			for (let j = 0; j < scale; j++) {
				if (board[i][j] === playerMarks[player]) h++
			}
			if (h === scale) return true
		}
		// Vertical
		for (let i = 0; i < scale; i++) {
			h = 0
			for (let j = 0; j < scale; j++) {
				if (board[j][i] === playerMarks[player]) h++
			}
			if (h === scale) return true
		}
		// Diagonals
		h = 0
		for (let i = 0; i < scale; i++) {
			if (board[i][i] === playerMarks[player]) h++
			if (h === scale) return true
		}
		h = 0
		for (let i = 0; i < scale; i++) {
			if (board[scale - 1 - i][i] === playerMarks[player]) h++
			if (h === scale) return true
		}

	}

	function resetGame() {
		setReady(false)
		initialiseBoard()
		setPlayer(1)
		setWinner(undefined)
	}

	async function handleWin(player) {
		setWinner(player)

		await SubmitScore(player, 1 /*TODO SCORE ON LEAST NUMBER OF MOVES?*/)
	}

	useEffect(() => {
		initialiseBoard()
	}, [scale])

	// TODO DETECT DRAW and stop game
	// wait for board update
	useEffect(() => {
		if (!ready) return

		if (checkWinMNK(scale, 1)) {
			handleWin(1).then()
		}
		if (checkWinMNK(scale, 2)) {
			handleWin(2).then()
		}
	})

	return <div className='flex flex-col mt-10 items-center gap-10'>
		<div className='font-bold text-2xl'>Tic Tac Toe</div>
		<div className='flex flex-col gap-1'>
			{board.map((row, r) => <div className='flex gap-1' key={"R" + r}>
				{row.map((column, c) => <div className='border-2 border-gray-900 w-10 h-10 cursor-pointer items-center justify-center text-2xl font-bold flex'
											 onClick={() => handleClick(r, c)}
											 key={"R" + r + "C" + c}
				>
					{column}
				</div>)}
			</div>)}
		</div>
		{winner ? <div>
				<div className='text-2xl font-bold'>Player {winner} wins!</div>
				<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={resetGame}>Play Again</button>
			</div>
			:
			<div>Next Player: {player}</div>
		}

		{!ready && <div>
			<label htmlFor="scale" className="block text-sm font-medium text-gray-700">Board Size: {scale}x{scale}</label>
			<input type="range" min="3" max="15" value={scale} onChange={e => setScale(Number(e.target.value))} className="slider"/>
		</div>}

		<div>
			<div className='text-2xl font-bold'>Scoreboard</div>
			<Scoreboard/>
		</div>

		<div>
			<div className='text-2xl font-bold'>Users</div>
			<UserList/>
		</div>
	</div>
}
