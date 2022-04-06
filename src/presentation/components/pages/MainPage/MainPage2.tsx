import * as jsonFile from 'presentation/assets/json/global_database.json'
import * as d3 from 'd3'
import React, { RefObject, useEffect, useRef } from 'react'
import './MainPage2.css'
import GaltonBoard from './GaltonBoard'

export type Board = Array<{
  name: string
  amount: number
}>

type AppState = Array<{
  board: Board
  totalAmount: number
}>

const boardSize = 10

// Initial app state
const initialState: AppState = [
  {
    board: distributeBalls(createEmptyBoard(), 10000),
    totalAmount: 10000,
  },
]

// Distribute N number of balls to the board
function distributeBalls(board: Board, amount: number): Board {
  for (let i = 0; i < amount; i++) {
    let index = 0
    for (let j = 0; j < board.length - 1; j++) {
      // Generate 0 or 1
      if (Math.round(Math.random())) {
        index += 1
      }
    }
    board[index].amount = board[index].amount + 1
  }
  return board
}

// An initial data structure that represents data for GaltonBoard
function createEmptyBoard(): Board {
  return new Array(boardSize + 1).fill({}).map((_, index) => {
    return {
      name: `B${index + 1}`,
      amount: 0,
    }
  })
}

function scrollToBottom() {
  setTimeout(
    () =>
      window.scrollTo({
        left: 0,
        top: document.body.scrollHeight,
        behavior: 'smooth',
      }),
    250,
  )
}

export default function App() {
  const [state, setState] = React.useState(initialState)

  const handleBarClick = React.useCallback(
    (boardIndex: number, barIndex: number) => {
      // Create new board
      if (boardIndex === state.length - 1) {
        const amount = state[boardIndex].board[barIndex].amount
        const newState = [
          ...state,
          {
            board: distributeBalls(createEmptyBoard(), amount),
            totalAmount: amount,
          },
        ]
        newState[boardIndex].board[barIndex].amount = 0
        setState(newState)
        scrollToBottom()
      }
    },
    [state],
  )

  return (
    <div className="App">
      {state.map((boardState, index) => (
        <GaltonBoard
          key={`board-${index}`}
          totalAmount={boardState.totalAmount}
          board={boardState.board}
          index={index}
          onBarClick={handleBarClick}
        />
      ))}
    </div>
  )
}
