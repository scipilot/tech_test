import React, {useEffect, useState} from 'react'
import { XorO } from './types'

export const Main = () => {
  const initialBoard = [
	  [undefined, undefined, undefined],
	  [undefined, undefined, undefined],
	  [undefined, undefined, undefined]
  ]
  // winning combination masks
  const winMap = [
  	[[0,0], [0,1], [0,2]],//H
  	[[1,0], [1,1], [1,2]],//H
  	[[2,0], [2,1], [2,2]],//H
  	[[0,0], [1,0], [2,0]],//V
  	[[0,1], [1,1], [2,1]],//V
  	[[0,2], [1,2], [2,2]],//V
  	[[0,0], [1,1], [2,2]],//D
  	[[0,2], [1,1], [2,0]],//D
  ]

  const [board, setBoard] = useState<(XorO | undefined)[][]>([...initialBoard])
  const [player, setPlayer] = useState<number>(1)
  const [winner, setWinner] = useState<number|undefined>(undefined)
  const playerMarks: (XorO|undefined)[] = [undefined, 'X', 'O']

  function handleClick(row, column){
	if(board[row][column] !== undefined) return
	if(winner !== undefined) return

  	setBoard((state)=>{
		const newstate = [...state]
  		newstate[row][column] = playerMarks[player]
  		return newstate
  	})
  	setPlayer(player === 1 ? 2 : 1)
  }

    function checkWin(player:number){
		for(let m of winMap){
			let h = 0
			for(let i=0; i<3; i++) {
				if(board[m[i][0]][m[i][1]] === playerMarks[player]) h++
			}
			if(h === 3) return true
		}
    }

	function resetGame(){
	  setBoard(initialBoard)
	  setPlayer(1)
	  setWinner(undefined)
  }

  // wait for board update
  useEffect(()=>{
    if(checkWin(1)){
		setWinner(1)
	}
    if(checkWin(2)){
		setWinner(2)
	}
  })

  return <div className='flex flex-col mt-10 items-center gap-10'>
    <div className='font-bold text-2xl'>Tic Tac Toe</div>
    <div className='flex flex-col gap-1'>
      {board.map((row, r) => <div className='flex gap-1'>
        {row.map((column, c) => <div className='border-2 border-gray-900 w-10 h-10 cursor-pointer items-center justify-center text-2xl font-bold flex'
        	onClick={()=>handleClick(r, c)}
        >
          {column}
        </div>)}
      </div>)}
    </div>
	{winner ? <div> <div className='text-2xl font-bold'>Player {winner} wins!</div>
			<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={resetGame}>Play Again</button>
		</div>
		:
    	<div>Next Player: {player}</div>
	}
  </div>
}
