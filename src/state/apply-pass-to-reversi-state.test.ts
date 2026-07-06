import { expect, test } from "bun:test"
import { createReversiBoard } from "@/board/create-reversi-board"
import { updateReversiBoard } from "@/board/update-reversi-board"
import { applyPassToReversiState } from "@/state/apply-pass-to-reversi-state"
import { createReversiState } from "@/state/create-reversi-state"
import type { ReversiBoard, ReversiPosition, ReversiState } from "@/types"

function createSparseBoard(props: {
  blacks: ReadonlyArray<ReversiPosition>
  whites: ReadonlyArray<ReversiPosition>
}): ReversiBoard {
  const cleared = updateReversiBoard({
    board: createReversiBoard(),
    positions: [
      { row: 3, col: 3 },
      { row: 3, col: 4 },
      { row: 4, col: 3 },
      { row: 4, col: 4 },
    ],
    cell: "empty",
  })

  const withBlack = updateReversiBoard({
    board: cleared,
    positions: props.blacks,
    cell: "black",
  })

  return updateReversiBoard({
    board: withBlack,
    positions: props.whites,
    cell: "white",
  })
}

test("returns error when valid moves exist", () => {
  const state = createReversiState()
  const result = applyPassToReversiState({ state })
  expect(result).toBeInstanceOf(Error)
  if (result instanceof Error) {
    expect(result.message).toContain("Cannot pass when valid moves exist")
  }
})

test("returns error when game is over", () => {
  const state = createReversiState()
  const gameOver = { ...state, isGameOver: true }
  const result = applyPassToReversiState({ state: gameOver })
  expect(result).toBeInstanceOf(Error)
  if (result instanceof Error) {
    expect(result.message).toContain("Game is already over")
  }
})

test("pass succeeds when current player has no moves", () => {
  const board = createSparseBoard({
    blacks: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
      { row: 7, col: 0 },
    ],
    whites: [{ row: 7, col: 1 }],
  })
  const state: ReversiState = {
    board,
    currentPlayer: "white",
    isGameOver: false,
  }
  const result = applyPassToReversiState({ state })
  expect(result).not.toBeInstanceOf(Error)
  if (!(result instanceof Error)) {
    expect(result.currentPlayer).toBe("black")
    expect(result.isGameOver).toBe(false)
    expect(result.board).toBe(board)
  }
})

test("pass ends game when opponent also has no moves", () => {
  const board = createSparseBoard({
    blacks: [{ row: 0, col: 0 }],
    whites: [],
  })
  const state: ReversiState = {
    board,
    currentPlayer: "white",
    isGameOver: false,
  }
  const result = applyPassToReversiState({ state })
  expect(result).not.toBeInstanceOf(Error)
  if (!(result instanceof Error)) {
    expect(result.currentPlayer).toBe("black")
    expect(result.isGameOver).toBe(true)
  }
})
